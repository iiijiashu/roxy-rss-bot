import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  closeStaleIssues,
  createGitHubIssue,
  fetchRecentItemsWithMeta,
  fetchRecentReleasesWithMeta,
  GITHUB_PAGE_SIZE,
  githubActivityTimestamp,
  type GitHubItem,
} from "../github.ts";

const originalRepo = process.env["DIGEST_REPO"];
const originalToken = process.env["GITHUB_TOKEN"];

beforeEach(() => {
  process.env["DIGEST_REPO"] = "owner/digest";
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  if (originalRepo === undefined) delete process.env["DIGEST_REPO"];
  else process.env["DIGEST_REPO"] = originalRepo;
  if (originalToken === undefined) delete process.env["GITHUB_TOKEN"];
  else process.env["GITHUB_TOKEN"] = originalToken;
});

describe("createGitHubIssue", () => {
  it("updates an existing same-title issue instead of creating a duplicate", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([{ number: 42, title: "Daily 2026-08-29", html_url: "https://example.test/42" }]),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(new Response("{}", { status: 201 }))
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
      .mockResolvedValueOnce(new Response("[]", { status: 200 }))
      .mockResolvedValueOnce(new Response("{}", { status: 201 }))
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

  it("finds an older same-title issue on a later page before deciding to create", async () => {
    const pageOne = Array.from({ length: 100 }, (_, index) => ({
      number: index + 1,
      title: `Older report ${index}`,
      html_url: `https://example.test/${index + 1}`,
    }));
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(pageOne), { status: 200 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([{ number: 142, title: "Daily 2026-08-29", html_url: "https://example.test/142" }]),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(new Response("{}", { status: 201 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ html_url: "https://example.test/142" }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(createGitHubIssue("Daily 2026-08-29", "body", "digest-en")).resolves.toBe(
      "https://example.test/142",
    );

    expect(new URL(String(fetchMock.mock.calls[1]?.[0])).searchParams.get("page")).toBe("2");
    expect(String(fetchMock.mock.calls[3]?.[0])).toContain("/issues/142");
    expect(fetchMock.mock.calls[3]?.[1]).toMatchObject({ method: "PATCH" });
  });

  it("fails closed before any write when duplicate lookup reaches its traversal cap", async () => {
    const page = Array.from({ length: 100 }, (_, index) => ({
      number: index + 1,
      title: `Unrelated report ${index}`,
      html_url: `https://example.test/${index + 1}`,
    }));
    const fetchMock = vi
      .fn()
      .mockImplementation(async () => new Response(JSON.stringify(page), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(createGitHubIssue("Daily 2026-08-29", "body", "digest-en")).rejects.toThrow(
      "refusing to create a possible duplicate",
    );
    expect(fetchMock).toHaveBeenCalledTimes(20);
    expect(fetchMock.mock.calls.every((call) => !(call[1] as RequestInit | undefined)?.method)).toBe(true);
  });
});

describe("closeStaleIssues", () => {
  it("fails closed when GitHub refuses to close a stale issue", async () => {
    const staleIssue = { number: 7, created_at: "2026-01-01T00:00:00.000Z" };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify([staleIssue]), { status: 200 }))
      .mockResolvedValueOnce(new Response("denied", { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(closeStaleIssues(30)).rejects.toThrow("Failed to close stale GitHub issue: HTTP 500");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("stops when a successful close does not advance the open-issue page", async () => {
    const staleIssue = { number: 7, created_at: "2026-01-01T00:00:00.000Z" };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify([staleIssue]), { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify([staleIssue]), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(closeStaleIssues(30)).rejects.toThrow("GitHub stale-issue traversal did not make progress");
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});

function githubItem(number: number, updatedAt = "2026-08-29T02:00:00.000Z"): GitHubItem {
  return {
    number,
    title: `Change ${number}`,
    state: "open",
    user: { login: "maintainer" },
    labels: [],
    created_at: updatedAt,
    updated_at: updatedAt,
    comments: 0,
    html_url: `https://github.com/owner/repo/pull/${number}`,
  };
}

describe("bounded GitHub pagination", () => {
  it("omits the Authorization header when no GitHub token is configured", async () => {
    delete process.env["GITHUB_TOKEN"];
    const fetchMock = vi.fn().mockResolvedValue(new Response("[]", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await fetchRecentItemsWithMeta(
      { id: "repo", repo: "owner/repo", name: "Repo", paginated: false },
      "pulls",
      new Date("2026-08-28T00:00:00.000Z"),
    );

    const requestHeaders = (fetchMock.mock.calls[0]?.[1] as RequestInit | undefined)?.headers as
      | Record<string, string>
      | undefined;
    expect(requestHeaders?.Authorization).toBeUndefined();
    expect(new URL(String(fetchMock.mock.calls[0]?.[0])).searchParams.get("per_page")).toBe(
      String(GITHUB_PAGE_SIZE),
    );
  });

  it("allows a bounded GitHub body to complete after the global twenty-second source budget", async () => {
    vi.useFakeTimers();
    const response = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          setTimeout(() => {
            controller.enqueue(new TextEncoder().encode(JSON.stringify([githubItem(1)])));
            controller.close();
          }, 25_000);
        },
      }),
      { status: 200 },
    );
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));

    const pending = fetchRecentItemsWithMeta(
      { id: "repo", repo: "owner/repo", name: "Repo", paginated: false },
      "pulls",
      new Date("2026-08-28T00:00:00.000Z"),
    );
    const settled = pending.then(
      (value) => ({ state: "resolved" as const, value }),
      (error: unknown) => ({ state: "rejected" as const, error }),
    );

    await vi.advanceTimersByTimeAsync(25_000);
    await expect(settled).resolves.toMatchObject({
      state: "resolved",
      value: { items: [{ number: 1 }] },
    });
  });

  it("uses updated_at for a new engagement delta instead of an old merge/close timestamp", () => {
    const item = githubItem(1, "2026-08-29T02:00:00.000Z");
    item.merged_at = "2026-08-01T00:00:00.000Z";
    item.closed_at = "2026-08-01T00:00:00.000Z";
    expect(githubActivityTimestamp(item, "engagement_delta")).toBe("2026-08-29T02:00:00.000Z");
    expect(githubActivityTimestamp(item, "merged")).toBe("2026-08-01T00:00:00.000Z");
  });

  it("marks a pull traversal truncated when all five full pages are still inside the time window", async () => {
    const fetchMock = vi.fn().mockImplementation(async (input: string | URL | Request) => {
      const page = Number(new URL(String(input)).searchParams.get("page"));
      const items = Array.from({ length: GITHUB_PAGE_SIZE }, (_, index) =>
        githubItem((page - 1) * GITHUB_PAGE_SIZE + index + 1),
      );
      return new Response(JSON.stringify(items), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchRecentItemsWithMeta(
      { id: "repo", repo: "owner/repo", name: "Repo", paginated: true },
      "pulls",
      new Date("2026-08-28T00:00:00.000Z"),
    );
    expect(result).toMatchObject({ pagesFetched: 5, truncated: true });
    expect(result.items).toHaveLength(GITHUB_PAGE_SIZE * 5);
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("deduplicates an item that moves across GitHub pagination boundaries", async () => {
    const fetchMock = vi.fn().mockImplementation(async (input: string | URL | Request) => {
      const page = Number(new URL(String(input)).searchParams.get("page"));
      const items =
        page === 1
          ? Array.from({ length: GITHUB_PAGE_SIZE }, (_, index) => githubItem(index + 1))
          : [githubItem(GITHUB_PAGE_SIZE), githubItem(GITHUB_PAGE_SIZE + 1)];
      return new Response(JSON.stringify(items), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchRecentItemsWithMeta(
      { id: "repo", repo: "owner/repo", name: "Repo", paginated: true },
      "pulls",
      new Date("2026-08-28T00:00:00.000Z"),
    );

    expect(result.pagesFetched).toBe(2);
    expect(result.items).toHaveLength(GITHUB_PAGE_SIZE + 1);
    expect(result.items.filter((item) => item.number === GITHUB_PAGE_SIZE)).toHaveLength(1);
  });

  it("filters old releases but continues until a short page ends the bounded traversal", async () => {
    const fetchMock = vi.fn().mockImplementation(async (input: string | URL | Request) => {
      const page = Number(new URL(String(input)).searchParams.get("page"));
      const releases =
        page === 1
          ? Array.from({ length: GITHUB_PAGE_SIZE }, (_, index) => ({
              tag_name: `v1.${index}`,
              name: `Release ${index}`,
              published_at: "2026-08-20T02:00:00.000Z",
            }))
          : [
              { tag_name: "v2.current", name: "Current", published_at: "2026-08-29T01:00:00.000Z" },
              { tag_name: "v2.old", name: "Old", published_at: "2026-08-20T01:00:00.000Z" },
            ];
      return new Response(JSON.stringify(releases), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchRecentReleasesWithMeta("owner/repo", new Date("2026-08-28T00:00:00.000Z"));
    expect(result).toMatchObject({ pagesFetched: 2, truncated: false });
    expect(result.releases).toHaveLength(1);
    expect(result.releases[0]?.tag_name).toBe("v2.current");
    expect(result.releases.some((release) => release.tag_name === "v2.old")).toBe(false);
  });

  it("deduplicates a release that moves across GitHub pagination boundaries", async () => {
    const fetchMock = vi.fn().mockImplementation(async (input: string | URL | Request) => {
      const page = Number(new URL(String(input)).searchParams.get("page"));
      const releases =
        page === 1
          ? Array.from({ length: GITHUB_PAGE_SIZE }, (_, index) => ({
              tag_name: `v${index + 1}`,
              name: `Release ${index + 1}`,
              published_at: "2026-08-29T01:00:00.000Z",
            }))
          : [
              {
                tag_name: `v${GITHUB_PAGE_SIZE}`,
                name: `Release ${GITHUB_PAGE_SIZE}`,
                published_at: "2026-08-29T01:00:00.000Z",
              },
              {
                tag_name: `v${GITHUB_PAGE_SIZE + 1}`,
                name: `Release ${GITHUB_PAGE_SIZE + 1}`,
                published_at: "2026-08-29T01:00:00.000Z",
              },
            ];
      return new Response(JSON.stringify(releases), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchRecentReleasesWithMeta("owner/repo", new Date("2026-08-28T00:00:00.000Z"));

    expect(result.pagesFetched).toBe(2);
    expect(result.releases).toHaveLength(GITHUB_PAGE_SIZE + 1);
    expect(result.releases.filter((release) => release.tag_name === `v${GITHUB_PAGE_SIZE}`)).toHaveLength(1);
  });
});
