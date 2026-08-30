import crypto from "node:crypto";
import type { SynthesisResult } from "./evidence.ts";

function canonicalJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalJsonValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nestedValue]) => [key, canonicalJsonValue(nestedValue)]),
  );
}

export function canonicalOutputSha256(value: unknown): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(canonicalJsonValue(value)))
    .digest("hex");
}

export function synthesisStructureSha256(synthesis: SynthesisResult): string {
  return canonicalOutputSha256(
    synthesis.developments.map((development) => ({
      event_id: development.event_id,
      source_ids: development.source_ids,
    })),
  );
}
