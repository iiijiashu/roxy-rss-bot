import { afterEach, describe, expect, it, vi } from "vitest";
import {
  discardResponseBody,
  fetchWithTimeout,
  readResponseJsonWithTimeout,
  readResponseTextWithTimeout,
} from "../http.ts";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("fetchWithTimeout", () => {
  it("returns a completed response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("ok", { status: 200 })));
    const response = await fetchWithTimeout("https://example.test", {}, 100);
    expect(await response.text()).toBe("ok");
  });

  it("aborts a source request at its deadline", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_input: unknown, init?: RequestInit) =>
          new Promise((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
          }),
      ),
    );
    const pending = fetchWithTimeout("https://example.test", {}, 25);
    const assertion = expect(pending).rejects.toThrow("HTTP request timed out after 25ms");
    await vi.advanceTimersByTimeAsync(25);
    await assertion;
  });

  it("aborts a response body that never completes", async () => {
    vi.useFakeTimers();
    const cancel = vi.fn();
    const response = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("partial"));
        },
        cancel,
      }),
    );

    const pending = readResponseTextWithTimeout(response, 25, 1_024);
    const assertion = expect(pending).rejects.toThrow("HTTP response body timed out after 25ms");
    await vi.advanceTimersByTimeAsync(25);
    await assertion;
    expect(cancel).toHaveBeenCalledOnce();
  });

  it("rejects a response body larger than its byte budget", async () => {
    const response = new Response("12345", {
      headers: { "Content-Length": "5" },
    });

    await expect(readResponseTextWithTimeout(response, 100, 4)).rejects.toThrow(
      "HTTP response body exceeds 4 bytes",
    );
  });

  it("cancels a chunked response that exceeds its byte budget", async () => {
    const cancel = vi.fn();
    const response = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("123"));
          controller.enqueue(new TextEncoder().encode("45"));
        },
        cancel,
      }),
    );

    await expect(readResponseTextWithTimeout(response, 100, 4)).rejects.toThrow(
      "HTTP response body exceeds 4 bytes",
    );
    expect(cancel).toHaveBeenCalledOnce();
  });

  it("rejects malformed UTF-8 instead of accepting replacement text", async () => {
    const response = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(Uint8Array.from([0x7b, 0x22, 0x78, 0x22, 0x3a, 0x22, 0xc3, 0x28, 0x22, 0x7d]));
          controller.close();
        },
      }),
    );

    await expect(readResponseJsonWithTimeout(response, 100, 1_024)).rejects.toThrow(
      "HTTP response body was not valid UTF-8",
    );
  });

  it("cancels a body that the caller intentionally discards", async () => {
    const cancel = vi.fn();
    const response = new Response(new ReadableStream<Uint8Array>({ cancel }));

    await discardResponseBody(response);

    expect(cancel).toHaveBeenCalledOnce();
  });
});
