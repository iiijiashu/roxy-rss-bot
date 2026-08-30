import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  DAILY_SELECTION_POLICY,
  groupEvidence,
  MAX_DAILY_DEVELOPMENTS,
  MIN_DAILY_DEVELOPMENTS,
  renderChineseDigest,
  selectTopEvents,
  type EvidenceRecord,
  type QualityReport,
  type SynthesisResult,
} from "./evidence.ts";
import { createProvider, type LlmProvider } from "./providers/index.ts";
import { serializeJsonForPersistence } from "./redaction.ts";
import { classifyFailure } from "./run-status.ts";
import { synthesizeInChunksWithQualityGate } from "./synthesis.ts";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/u;

interface ReplayInput {
  schemaVersion: 2;
  observedAt: string;
  records: EvidenceRecord[];
  selectedEventIds: string[];
  selection: { previousNoveltyKeys: string[] };
}

interface EventState {
  schemaVersion: 2;
  events: Record<string, { eventKey: string; lastPublishedAt: string }>;
}

export interface ReplayDailyOptions {
  date: string;
  inputPath: string;
  rootDir?: string;
  outputDir?: string;
  apply?: boolean;
  acceptSelectionChange?: boolean;
  providerFactory?: () => LlmProvider;
}

export interface ReplayDailyResult {
  date: string;
  developmentCount: number;
  inputSha256: string;
  selectionIdentical: boolean;
  applied: boolean;
  outputDir: string;
  diagnostics: ReturnType<typeof safeDiagnostics>;
}

function validDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function readReplayInput(filePath: string): { input: ReplayInput; raw: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Replay input must be a JSON object");
  }
  const candidate = parsed as Partial<ReplayInput>;
  if (
    candidate.schemaVersion !== 2 ||
    typeof candidate.observedAt !== "string" ||
    !Number.isFinite(Date.parse(candidate.observedAt)) ||
    !Array.isArray(candidate.records) ||
    !Array.isArray(candidate.selectedEventIds) ||
    !candidate.selection ||
    !Array.isArray(candidate.selection.previousNoveltyKeys)
  ) {
    throw new Error("Replay input has an invalid schema");
  }
  return { input: candidate as ReplayInput, raw };
}

function serializeJson(value: unknown): string {
  return serializeJsonForPersistence(value);
}

function writeJsonAtomic(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryPath, serializeJson(value), "utf-8");
  fs.renameSync(temporaryPath, filePath);
}

function writeTextAtomic(filePath: string, value: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryPath, value, "utf-8");
  fs.renameSync(temporaryPath, filePath);
}

function safeDiagnostics(provider: LlmProvider): object {
  try {
    const diagnostics = provider.getDiagnostics?.();
    if (diagnostics) return diagnostics;
  } catch {
    // Diagnostics are optional and must never block a completed replay.
  }
  return { provider: provider.name, diagnosticsAvailable: false };
}

function readEventState(filePath: string): EventState {
  if (!fs.existsSync(filePath)) return { schemaVersion: 2, events: {} };
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf-8")) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Replay event state has an invalid schema");
  }
  const candidate = parsed as Partial<EventState>;
  if (candidate.schemaVersion !== 2 || !candidate.events || typeof candidate.events !== "object") {
    throw new Error("Replay event state has an invalid schema");
  }
  return candidate as EventState;
}

export async function replayDaily(options: ReplayDailyOptions): Promise<ReplayDailyResult> {
  if (!validDate(options.date)) throw new Error("Replay date must use a valid YYYY-MM-DD value");
  const rootDir = path.resolve(options.rootDir ?? process.cwd());
  const inputPath = path.resolve(options.inputPath);
  const { input, raw } = readReplayInput(inputPath);
  const inputSha256 = crypto.createHash("sha256").update(raw).digest("hex");
  const events = groupEvidence(input.records);
  const selected = selectTopEvents(events, {
    previousKeys: new Set(input.selection.previousNoveltyKeys),
    ...DAILY_SELECTION_POLICY,
  });
  if (selected.length < MIN_DAILY_DEVELOPMENTS || selected.length > MAX_DAILY_DEVELOPMENTS) {
    throw new Error(
      `Replay selection must contain ${MIN_DAILY_DEVELOPMENTS}..${MAX_DAILY_DEVELOPMENTS} events, found ${selected.length}`,
    );
  }
  const recomputedIds = selected.map((event) => event.id);
  const selectionIdentical = JSON.stringify(input.selectedEventIds) === JSON.stringify(recomputedIds);
  if (!selectionIdentical && !options.acceptSelectionChange) {
    throw new Error(
      "Replay selection changed; inspect the added/removed events and pass --accept-selection-change explicitly",
    );
  }
  if (options.apply && options.outputDir) {
    throw new Error("Replay --apply cannot be combined with a custom output directory");
  }
  const applied = options.apply === true;
  const digestDir = applied
    ? path.join(rootDir, "digests", options.date)
    : path.resolve(
        options.outputDir ?? path.join(rootDir, "replay-output", options.date, inputSha256.slice(0, 16)),
      );

  const provider = (options.providerFactory ?? (() => createProvider()))();
  const components = new Map<
    string,
    { component: string; state: "ok" | "degraded" | "skipped"; code?: string }
  >();
  const recordComponent = (component: string, state: "ok" | "degraded" | "skipped", code?: string): void => {
    const value = code ? { component, state, code } : { component, state };
    const previous = components.get(component);
    if (!previous || state === "degraded" || previous.state === "skipped") components.set(component, value);
  };
  recordComponent("source/frozen-replay", "ok");
  recordComponent("state/network-fetch", "skipped", "frozen_replay");

  let synthesis: SynthesisResult;
  let quality: QualityReport;
  try {
    const result = await synthesizeInChunksWithQualityGate(selected, input.records, {
      invoke: (prompt, maxTokens) => provider.call(prompt, maxTokens, { responseFormat: "json_object" }),
      parse: (response) => JSON.parse(response) as unknown,
      onAttempt: (chunk, outcome) => {
        const component = `synthesis/zh/chunk-${chunk}/attempt-${outcome.attempt}`;
        if (outcome.state === "ok") recordComponent(component, "ok");
        else if (outcome.reason === "quality_gate_failed") {
          recordComponent(component, "degraded", "quality_gate_failed");
          console.warn(
            `[replay/synthesis] chunk=${chunk} attempt=${outcome.attempt} ` +
              `failed_checks=${outcome.failedChecks.join(",")} ` +
              `developments=${outcome.developmentCount}/${outcome.eligibleEventCount} ` +
              `mechanical_token_shapes=${outcome.mechanicalTokenShapes.join(",") || "none"} ` +
              `lexical_tokens=${outcome.lexicalTokens.join(",") || "none"} ` +
              `inference_labels=${outcome.inferenceLabels.join(",") || "none"}`,
          );
        } else recordComponent(component, "degraded", classifyFailure(outcome.error));
      },
    });
    synthesis = result.synthesis;
    quality = result.quality;
  } catch (error) {
    recordComponent("quality", "degraded", classifyFailure(error));
    if (
      classifyFailure(error) === "quality_gate_failed" &&
      error instanceof Error &&
      /^failed checks: /u.test(error.message)
    ) {
      console.warn(`[replay/quality] ${error.message}`);
    }
    throw error;
  }

  const evidenceArtifact = {
    schemaVersion: 2,
    observedAt: input.observedAt,
    records: input.records,
    events,
    selectedEventIds: recomputedIds,
    selection: {
      previousNoveltyKeys: [...input.selection.previousNoveltyKeys].sort(),
      policy: DAILY_SELECTION_POLICY,
    },
  };
  const digestArtifact = {
    schemaVersion: 1,
    date: options.date,
    observedAt: input.observedAt,
    developments: synthesis.developments,
  };
  const markdown = renderChineseDigest(options.date, synthesis.developments, selected, input.records);
  const outputEvidenceSha256 = crypto
    .createHash("sha256")
    .update(serializeJson(evidenceArtifact))
    .digest("hex");
  const diagnostics = safeDiagnostics(provider);
  recordComponent("quality", "ok");
  recordComponent("artifact/digest", "ok");
  writeJsonAtomic(path.join(digestDir, "evidence.json"), evidenceArtifact);
  writeJsonAtomic(path.join(digestDir, "quality-report.json"), quality);
  writeJsonAtomic(path.join(digestDir, "digest.json"), digestArtifact);
  writeJsonAtomic(path.join(digestDir, "highlights.json"), {
    schemaVersion: 1,
    date: options.date,
    zh: { digest: synthesis.developments.slice(0, 5).map((development) => development.title) },
    en: {},
  });
  writeTextAtomic(path.join(digestDir, "digest.md"), markdown);
  writeJsonAtomic(path.join(digestDir, "llm-diagnostics.json"), diagnostics);
  writeJsonAtomic(path.join(digestDir, "replay-provenance.json"), {
    schemaVersion: 2,
    date: options.date,
    mode: "frozen_evidence",
    observedAt: input.observedAt,
    inputSha256,
    recordCount: input.records.length,
    groupedEventCount: events.length,
    selectedEventCount: selected.length,
    selectionIdentical,
    selectionChangeAccepted: !selectionIdentical && options.acceptSelectionChange === true,
    applied,
    outputEvidenceSha256,
  });

  if (applied) {
    const eventStatePath = path.join(rootDir, "digests", "event-state.json");
    const eventState = readEventState(eventStatePath);
    for (const event of selected) {
      eventState.events[event.noveltyKey] = { eventKey: event.key, lastPublishedAt: input.observedAt };
    }
    eventState.events = Object.fromEntries(
      Object.entries(eventState.events).sort(([left], [right]) => left.localeCompare(right)),
    );
    writeJsonAtomic(eventStatePath, eventState);
  }
  const componentList = [...components.values()].sort((left, right) =>
    left.component.localeCompare(right.component),
  );
  writeJsonAtomic(path.join(digestDir, "run-status.json"), {
    schemaVersion: 1,
    date: options.date,
    status: componentList.some((component) => component.state === "degraded") ? "degraded" : "ok",
    components: componentList,
  });

  return {
    date: options.date,
    developmentCount: synthesis.developments.length,
    inputSha256,
    selectionIdentical,
    applied,
    outputDir: digestDir,
    diagnostics,
  };
}

export interface ReplayDailyArgs {
  date: string;
  inputPath: string;
  outputDir?: string;
  apply: boolean;
  acceptSelectionChange: boolean;
}

export function parseReplayArgs(args: string[]): ReplayDailyArgs {
  let date = "";
  let inputPath = "";
  let outputDir: string | undefined;
  let apply = false;
  let acceptSelectionChange = false;
  for (let index = 0; index < args.length; index++) {
    const value = args[index]!;
    if (value === "--apply") {
      apply = true;
      continue;
    }
    if (value === "--accept-selection-change") {
      acceptSelectionChange = true;
      continue;
    }
    if (value === "--output-dir") {
      outputDir = args[++index];
      if (!outputDir) throw new Error("Replay --output-dir requires a path");
      continue;
    }
    if (value.startsWith("--")) throw new Error(`Unexpected replay argument: ${value}`);
    if (!date) date = value;
    else if (!inputPath) inputPath = value;
    else throw new Error(`Unexpected replay argument: ${value}`);
  }
  if (!date || !inputPath) throw new Error("Replay requires a date and frozen evidence path");
  if (apply && outputDir) throw new Error("Replay --apply cannot be combined with --output-dir");
  return outputDir
    ? { date, inputPath, outputDir, apply, acceptSelectionChange }
    : { date, inputPath, apply, acceptSelectionChange };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const parsed = parseReplayArgs(process.argv.slice(2));
  replayDaily(parsed)
    .then((result) => {
      console.log(
        `[replay] date=${result.date} developments=${result.developmentCount} ` +
          `selection_identical=${result.selectionIdentical} applied=${result.applied} output=${result.outputDir}`,
      );
    })
    .catch((error) => {
      console.error(`[replay] fatal: ${classifyFailure(error)}`);
      process.exitCode = 1;
    });
}
