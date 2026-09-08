import { describe, it, expect } from "vitest";
import { toRfc822, escapeXml, normalizeSiteUrl } from "../generate-manifest.ts";

// ---------------------------------------------------------------------------
// toRfc822
// ---------------------------------------------------------------------------

describe("toRfc822", () => {
  it("formats a known date correctly", () => {
    // 2026-03-09 is a Monday
    const date = new Date(Date.UTC(2026, 2, 9, 14, 30, 0));
    const result = toRfc822(date);
    expect(result).toBe("Mon, 09 Mar 2026 14:30:00 +0000");
  });

  it("pads single-digit day and hours", () => {
    const date = new Date(Date.UTC(2026, 0, 5, 3, 7, 9));
    const result = toRfc822(date);
    expect(result).toBe("Mon, 05 Jan 2026 03:07:09 +0000");
  });

  it("handles midnight correctly", () => {
    const date = new Date(Date.UTC(2026, 5, 15, 0, 0, 0));
    const result = toRfc822(date);
    expect(result).toContain("00:00:00 +0000");
  });

  it("handles end of year", () => {
    const date = new Date(Date.UTC(2026, 11, 31, 23, 59, 59));
    const result = toRfc822(date);
    expect(result).toContain("Dec 2026");
    expect(result).toContain("23:59:59");
  });
});

// ---------------------------------------------------------------------------
// escapeXml
// ---------------------------------------------------------------------------

describe("escapeXml", () => {
  it("escapes ampersand", () => {
    expect(escapeXml("A & B")).toBe("A &amp; B");
  });

  it("escapes angle brackets", () => {
    expect(escapeXml("<tag>")).toBe("&lt;tag&gt;");
  });

  it("escapes double quotes", () => {
    expect(escapeXml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("handles multiple escapes in one string", () => {
    expect(escapeXml('A & B < C > D "E"')).toBe("A &amp; B &lt; C &gt; D &quot;E&quot;");
  });

  it("returns unchanged string if no special chars", () => {
    expect(escapeXml("plain text")).toBe("plain text");
  });

  it("handles empty string", () => {
    expect(escapeXml("")).toBe("");
  });
});

describe("normalizeSiteUrl", () => {
  it("uses the upstream URL by default", () => {
    expect(normalizeSiteUrl()).toBe("https://duanyytop.github.io/agents-radar");
  });

  it("accepts a fork-specific GitHub Pages URL and removes trailing slashes", () => {
    expect(normalizeSiteUrl("https://student.example.github.io/roxy-radar///")).toBe(
      "https://student.example.github.io/roxy-radar",
    );
  });

  it.each([
    "http://example.com/roxy-radar",
    "https://user:secret@example.com/roxy-radar",
    "https://example.com/roxy-radar?token=secret",
    "https://example.com/roxy-radar#fragment",
    "   ",
  ])("rejects unsafe or ambiguous URL %s", (value) => {
    expect(() => normalizeSiteUrl(value)).toThrow();
  });
});
