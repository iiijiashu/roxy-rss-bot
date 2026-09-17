import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchRecentReleases } from "../github.ts";

describe("public GitHub source authentication", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it.each([undefined, "", "   "])("omits authorization for an absent token (%s)", async (token) => {
    vi.stubEnv("GITHUB_TOKEN", token);
    const request = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]"));
    await fetchRecentReleases("openai/codex", new Date("2026-09-17T00:00:00Z"));
    const headers = new Headers(request.mock.calls[0]?.[1]?.headers);
    expect(headers.has("Authorization")).toBe(false);
    expect(headers.get("Accept")).toBe("application/vnd.github+json");
  });

  it("preserves authenticated reads when a token is configured", async () => {
    vi.stubEnv("GITHUB_TOKEN", "test-token");
    const request = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("[]"));
    await fetchRecentReleases("openai/codex", new Date("2026-09-17T00:00:00Z"));
    expect(new Headers(request.mock.calls[0]?.[1]?.headers).get("Authorization")).toBe("Bearer test-token");
  });
});
