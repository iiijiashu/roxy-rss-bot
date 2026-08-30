const DEFAULT_HTTP_TIMEOUT_MS = 20_000;
const DEFAULT_HTTP_BODY_LIMIT_BYTES = 16 * 1024 * 1024;

function configuredTimeout(): number {
  const raw = process.env["HTTP_TIMEOUT_MS"]?.trim();
  if (!raw) return DEFAULT_HTTP_TIMEOUT_MS;
  if (!/^[1-9]\d*$/.test(raw)) throw new Error("HTTP_TIMEOUT_MS must be a positive integer");
  const value = Number(raw);
  if (!Number.isSafeInteger(value)) throw new Error("HTTP_TIMEOUT_MS must be a safe integer");
  return value;
}

/**
 * Fetch with a hard deadline. Source collectors are intentionally best effort,
 * but a request that never settles must not block every other source and the
 * publication phase.
 */
export async function fetchWithTimeout(
  input: string | URL | Request,
  init: RequestInit = {},
  timeoutMs = configuredTimeout(),
): Promise<Response> {
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
    throw new Error("fetch timeout must be a positive integer");
  }

  const controller = new AbortController();
  const upstreamSignal = init.signal;
  let timedOut = false;
  const forwardAbort = () => controller.abort(upstreamSignal?.reason);
  if (upstreamSignal?.aborted) forwardAbort();
  else upstreamSignal?.addEventListener("abort", forwardAbort, { once: true });
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (cause) {
    if (timedOut) {
      const error = new Error(`HTTP request timed out after ${timeoutMs}ms`, { cause });
      error.name = "HTTPTimeoutError";
      throw error;
    }
    throw cause;
  } finally {
    clearTimeout(timer);
    upstreamSignal?.removeEventListener("abort", forwardAbort);
  }
}

function assertPositiveInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer`);
  }
}

export async function discardResponseBody(response: Response): Promise<void> {
  if (!response.body || response.bodyUsed) return;
  await response.body.cancel("Response body intentionally discarded").catch(() => undefined);
}

/**
 * Consume a response body under an independent deadline and byte cap. Fetch
 * resolves as soon as response headers arrive, so its timeout cannot protect a
 * body that stalls mid-stream.
 */
export async function readResponseTextWithTimeout(
  response: Response,
  timeoutMs = configuredTimeout(),
  maxBytes = DEFAULT_HTTP_BODY_LIMIT_BYTES,
): Promise<string> {
  assertPositiveInteger(timeoutMs, "response body timeout");
  assertPositiveInteger(maxBytes, "response body byte limit");

  const declaredLength = response.headers.get("content-length");
  if (declaredLength !== null) {
    const declaredBytes = Number(declaredLength);
    if (Number.isFinite(declaredBytes) && declaredBytes > maxBytes) {
      await response.body?.cancel("Response body exceeds limit").catch(() => undefined);
      throw new Error(`Response body exceeds limit: HTTP response body exceeds ${maxBytes} bytes`);
    }
  }
  if (!response.body) return "";

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const chunks: string[] = [];
  let receivedBytes = 0;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const bodyTimeout = new Promise<never>((_resolve, reject) => {
    timeoutHandle = setTimeout(() => {
      const error = new Error(`HTTP response body timed out after ${timeoutMs}ms`);
      error.name = "HTTPTimeoutError";
      reject(error);
      void reader.cancel(error).catch(() => undefined);
    }, timeoutMs);
  });

  const consume = async (): Promise<string> => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        receivedBytes += value.byteLength;
        if (receivedBytes > maxBytes) {
          throw new Error(`Response body exceeds limit: HTTP response body exceeds ${maxBytes} bytes`);
        }
        try {
          chunks.push(decoder.decode(value, { stream: true }));
        } catch (cause) {
          throw new Error("HTTP response body was not valid UTF-8", { cause });
        }
      }
      try {
        chunks.push(decoder.decode());
      } catch (cause) {
        throw new Error("HTTP response body was not valid UTF-8", { cause });
      }
      return chunks.join("");
    } catch (error) {
      await reader.cancel(error).catch(() => undefined);
      throw error;
    }
  };

  try {
    return await Promise.race([consume(), bodyTimeout]);
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle);
    try {
      reader.releaseLock();
    } catch {
      // Cancellation can retain the lock until the underlying stream settles.
    }
  }
}

export async function readResponseJsonWithTimeout<T>(
  response: Response,
  timeoutMs = configuredTimeout(),
  maxBytes = DEFAULT_HTTP_BODY_LIMIT_BYTES,
): Promise<T> {
  const raw = await readResponseTextWithTimeout(response, timeoutMs, maxBytes);
  try {
    return JSON.parse(raw) as T;
  } catch (cause) {
    throw new Error("HTTP response body was not valid JSON", { cause });
  }
}
