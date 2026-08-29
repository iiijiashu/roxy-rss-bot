import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchWithTimeout } from "../http.ts";

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
});
