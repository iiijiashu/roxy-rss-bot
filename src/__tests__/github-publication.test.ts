import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createGitHubIssue } from "../github.ts";

const originalRepo = process.env["DIGEST_REPO"];

beforeEach(() => {
  process.env["DIGEST_REPO"] = "owner/digest";
});

afterEach(() => {
  vi.unstubAllGlobals();
  if (originalRepo === undefined) delete process.env["DIGEST_REPO"];
  else process.env["DIGEST_REPO"] = originalRepo;
});

describe("createGitHubIssue", () => {
  it("updates an existing same-title issue instead of creating a duplicate", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("{}", { status: 201 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([{ number: 42, title: "Daily 2026-08-29", html_url: "https://example.test/42" }]),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ html_url: "https://example.test/42" }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(createGitHubIssue("Daily 2026-08-29", "body", "digest-en")).resolves.toBe(
      "https://example.test/42",
    );

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(String(fetchMock.mock.calls[2]?.[0])).toContain("/issues/42");
    expect(fetchMock.mock.calls[2]?.[1]).toMatchObject({ method: "PATCH" });
    expect(JSON.parse(String((fetchMock.mock.calls[2]?.[1] as RequestInit).body))).toMatchObject({
      body: "body",
      labels: ["digest-en"],
      state: "open",
    });
  });

  it("creates an issue when no same-title issue exists", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("{}", { status: 201 }))
      .mockResolvedValueOnce(new Response("[]", { status: 200 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ html_url: "https://example.test/43" }), { status: 201 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(createGitHubIssue("Daily 2026-08-29", "body", "digest-en")).resolves.toBe(
      "https://example.test/43",
    );

    expect(String(fetchMock.mock.calls[2]?.[0])).toBe("https://api.github.com/repos/owner/digest/issues");
    expect(fetchMock.mock.calls[2]?.[1]).toMatchObject({ method: "POST" });
  });
});
