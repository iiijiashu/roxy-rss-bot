const DEFAULT_HTTP_TIMEOUT_MS = 20_000;

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
