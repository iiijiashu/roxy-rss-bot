import { describe, expect, it } from "vitest";
import {
  parseDailyStateBundle,
  resolveDailyInputState,
  sortNoveltyKeys,
  type DailyInputState,
} from "../daily.ts";

function inputState(date: string, marker: string): DailyInputState {
  return {
    schemaVersion: 1,
    date,
    webState: {
      anthropic: { lastChecked: marker, urls: {} },
      openai: { lastChecked: marker, urls: {} },
    },
    githubState: { schemaVersion: 1, items: {} },
    eventState: { schemaVersion: 2, events: {} },
  };
}

describe("daily input state", () => {
  it("reuses the first same-day input snapshot instead of the latest after-state", () => {
    const date = "2026-08-30";
    const before = "2026-08-29T00:00:00.000Z";
    const after = "2026-08-30T00:00:00.000Z";
    const first = resolveDailyInputState(undefined, date, inputState(date, before));
    expect(first.reused).toBe(false);

    const rerun = resolveDailyInputState(first.state, date, inputState(date, after));
    expect(rerun.reused).toBe(true);
    expect(rerun.state).toEqual(first.state);
    expect(rerun.state.webState.anthropic.lastChecked).toBe(before);
  });

  it("rejects a snapshot belonging to a different digest date", () => {
    expect(() =>
      resolveDailyInputState(
        inputState("2026-08-29", "2026-08-28T00:00:00.000Z"),
        "2026-08-30",
        inputState("2026-08-30", "2026-08-29T00:00:00.000Z"),
      ),
    ).toThrow(/date mismatch/u);
  });

  it("accepts legacy GitHub entries that predate persisted comment counts", () => {
    const date = "2026-08-30";
    const legacy = inputState(date, "2026-08-29T00:00:00.000Z");
    legacy.githubState.items["owner/repo:pr:1"] = {
      reactions: 0,
      state: "open",
      updatedAt: "2026-08-29T00:00:00.000Z",
      observedAt: "2026-08-29T00:00:00.000Z",
    };

    const resolved = resolveDailyInputState(legacy, date, inputState(date, "2026-08-30T00:00:00.000Z"));

    expect(resolved.reused).toBe(true);
    expect(resolved.state.githubState.items["owner/repo:pr:1"]?.comments).toBeUndefined();
  });

  it("sorts novelty keys with the same locale order used by publication validation", () => {
    const upperOwner = "model:https://github.com/HKUDS/nanobot/pull/5591";
    const lowerOwner = "model:https://github.com/anthropics/claude-code/issues/90564";

    expect(sortNoveltyKeys([upperOwner, lowerOwner])).toEqual(
      [upperOwner, lowerOwner].sort((left, right) => left.localeCompare(right)),
    );
  });

  it("accepts only a complete atomic state generation", () => {
    const state = inputState("2026-08-30", "2026-08-29T00:00:00.000Z");
    const bundle = parseDailyStateBundle({
      schemaVersion: 1,
      generation: "2026-08-30T01:00:00.000Z",
      webState: state.webState,
      githubState: state.githubState,
      eventState: state.eventState,
    });

    expect(bundle.generation).toBe("2026-08-30T01:00:00.000Z");
    expect(bundle.webState).toEqual(state.webState);
    expect(() =>
      parseDailyStateBundle({
        schemaVersion: 1,
        generation: "2026-08-30T01:00:00.000Z",
        webState: state.webState,
        githubState: state.githubState,
      }),
    ).toThrow(/daily state bundle/u);
  });
});
