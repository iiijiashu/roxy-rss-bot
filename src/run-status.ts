import fs from "node:fs";
import path from "node:path";
import type { LlmProviderDiagnostics } from "./providers/index.ts";

export type ComponentState = "ok" | "degraded" | "skipped";

export interface ComponentOutcome {
  component: string;
  state: ComponentState;
  code?: string;
}

export interface PublicationStatusFile {
  schemaVersion: 1;
  date: string;
  status: "ok" | "degraded";
  components: ComponentOutcome[];
}

function errorProperty(error: unknown, key: string): unknown {
  return error && typeof error === "object" ? (error as Record<string, unknown>)[key] : undefined;
}

/** Convert transient implementation-specific exceptions into stable log/status codes. */
export function classifyFailure(error: unknown): string {
  const code = errorProperty(error, "code");
  if (typeof code === "string" && /^[a-z][a-z0-9_-]{1,63}$/i.test(code)) {
    return code.toLowerCase();
  }
  const status = errorProperty(error, "status");
  const text = `${error instanceof Error ? error.name : ""} ${String(error)}`;
  if (status === 429 || /\b429\b|rate.?limit/i.test(text)) return "rate_limit";
  if (/timeout|timed out/i.test(text)) return "timeout";
  if (/invalid json|json parse|unexpected token|expected .* after/i.test(text)) return "invalid_json";
  if (/omitted task/i.test(text)) return "omitted_task";
  if (/budget.*exhausted/i.test(text)) return "budget_exhausted";
  if (/connection|network|fetch failed|econn|socket/i.test(text)) return "transport";
  if (typeof status === "number" && status >= 500) return "server_error";
  if (typeof status === "number" && status >= 400) return "http_error";
  return "unknown_error";
}

export function outcome(component: string, state: ComponentState, code?: string): ComponentOutcome {
  return code ? { component, state, code } : { component, state };
}

export class PublicationStatus {
  private readonly components = new Map<string, ComponentOutcome>();

  constructor(
    private readonly date: string,
    private readonly providerName: string,
  ) {}

  record(component: string, state: ComponentState, code?: string): void {
    const next = outcome(component, state, code);
    const previous = this.components.get(component);
    if (!previous || this.rank(next.state) >= this.rank(previous.state)) {
      this.components.set(component, next);
    }
  }

  recordOutcome(value: ComponentOutcome): void {
    this.record(value.component, value.state, value.code);
  }

  recordAll(values: ComponentOutcome[]): void {
    for (const value of values) this.recordOutcome(value);
  }

  toJSON(): PublicationStatusFile {
    const components = [...this.components.values()].sort((a, b) => a.component.localeCompare(b.component));
    return {
      schemaVersion: 1,
      date: this.date,
      status: components.some((component) => component.state === "degraded") ? "degraded" : "ok",
      components,
    };
  }

  save(): string {
    const filePath = path.posix.join("digests", this.date, "run-status.json");
    fs.mkdirSync(path.posix.dirname(filePath), { recursive: true });
    const tempPath = `${filePath}.${process.pid}.tmp`;
    fs.writeFileSync(tempPath, `${JSON.stringify(this.toJSON(), null, 2)}\n`, "utf-8");
    fs.renameSync(tempPath, filePath);
    return filePath;
  }

  logSummary(diagnostics?: LlmProviderDiagnostics): void {
    const publication = this.toJSON();
    const degraded = publication.components.filter((component) => component.state === "degraded");
    console.log(
      `[run-status] status=${publication.status} components=${publication.components.length} ` +
        `degraded=${degraded.length} provider=${this.providerName}`,
    );
    if (degraded.length > 0) {
      console.warn(
        `[run-status] degraded_components=${degraded
          .map((component) => `${component.component}:${component.code ?? "unknown"}`)
          .join(",")}`,
      );
    }
    if (diagnostics) console.log(`[llm-diagnostics] ${JSON.stringify(diagnostics)}`);
  }

  private rank(state: ComponentState): number {
    return state === "degraded" ? 2 : state === "ok" ? 1 : 0;
  }
}
