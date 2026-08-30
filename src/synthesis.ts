import {
  buildSynthesisPrompt,
  synthesisSourceIds,
  validateSynthesis,
  type EvidenceRecord,
  type EventCandidate,
  type QualityReport,
  type SynthesisResult,
} from "./evidence.ts";

const STANDARD_SYNTHESIS_ATTEMPTS = 3;
const MAX_SYNTHESIS_ATTEMPTS = 7;
export const MAX_TOTAL_SYNTHESIS_ATTEMPTS = 36;
export const MAX_SYNTHESIS_EVENTS_PER_TASK = 2;
const SYNTHESIS_MAX_TOKENS = 8_000;
const MAX_SYNTHESIS_PROMPT_BYTES = 160_000;
const MAX_SYNTHESIS_CORRECTION_BYTES = 24_000;
const INVALID_JSON_CORRECTION =
  "\n\n上一轮不是合法且可验证的严格 JSON。重新输出完整 JSON，不要解释，不要 Markdown fence。\n";
const OUTPUT_LIMIT_CORRECTION =
  "上一轮达到输出上限。只输出当前 EVENTS 对应的紧凑 JSON，整个 JSON 不超过 2000 个字符，不得重复规则、evidence 或分析过程。";
const SAFE_REQUEST_FAILURE_CODES = new Set([
  "auth",
  "bad_request",
  "budget_exhausted",
  "empty_response",
  "input_limit",
  "invalid_envelope",
  "invalid_json",
  "invalid_result",
  "omitted_task",
  "output_limit",
  "provider_error",
  "rate_limit",
  "server_error",
  "timeout",
  "transport",
]);

class SynthesisFailure extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "SynthesisFailure";
  }
}

export type SynthesisAttemptOutcome =
  | { attempt: number; state: "ok"; normalizationsApplied: string[] }
  | {
      attempt: number;
      state: "degraded";
      reason: "quality_gate_failed";
      failedChecks: string[];
      developmentCount: number;
      eligibleEventCount: number;
      mechanicalTokenShapes: string[];
      lexicalTokens: string[];
      untranslatedActionTokens?: string[];
      inferenceLabels: string[];
      editorialLabels: string[];
      normalizationsApplied: string[];
    }
  | {
      attempt: number;
      state: "degraded";
      reason: "request_or_parse_failed";
      error: unknown;
    };

interface SynthesisDependencies {
  invoke: (prompt: string, maxTokens: number) => Promise<string>;
  parse: (raw: string) => unknown;
  onAttempt?: (outcome: SynthesisAttemptOutcome) => void;
  maxAttempts?: number;
  reservedTitles?: readonly string[];
}

interface ChunkedSynthesisDependencies {
  invoke: SynthesisDependencies["invoke"];
  parse: SynthesisDependencies["parse"];
  onAttempt?: (chunk: number, outcome: SynthesisAttemptOutcome) => void;
  maxTotalAttempts?: number;
}

function safeQualityFailureSummary(quality: QualityReport): string {
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  const safeDetails = quality.violations.filter(
    (violation) =>
      /^synthesis root /u.test(violation) ||
      /^development \d+ has an invalid schema:/u.test(violation) ||
      /^development count mismatch:/u.test(violation) ||
      /^development \d+: lifecycle language /u.test(violation) ||
      /^development \d+: thin issue impact must remain conditional$/u.test(violation) ||
      /^development \d+: duplicate title conflict$/u.test(violation) ||
      /^development \d+: (?:ticket-template title|title (?:exceeds|introduces)|summary (?:exceeds|declares)|summary contains|summary must|why_it_matters (?:exceeds|must|lacks|ends)|malformed (?:conditional phrase|pull-request reference)|noncanonical |untranslated English action|bare English phrase|missing CJK and Latin spacing)/u.test(
        violation,
      ) ||
      /^development \d+: why_it_matters duplicates development \d+$/u.test(violation) ||
      /^duplicate ratio too high:/u.test(violation) ||
      violation === "one or more events lack valid current evidence",
  );
  return [`failed checks: ${failedChecks.join(", ")}`, ...safeDetails].join("; ");
}

function safeMechanicalTokenShapes(quality: QualityReport): string[] {
  return quality.violations.flatMap((violation) => {
    const match = violation.match(/^development (\d+): unsupported mechanical token (\S+)$/u);
    if (!match) return [];
    const tokenShape = match[2]!.replace(/\d/gu, "#").slice(0, 32);
    return [`${match[1]}:${tokenShape}`];
  });
}

const SAFE_INFERENCE_LABELS = new Set([
  "community sentiment",
  "company ranking",
  "roadmap prediction",
  "imminent release speculation",
  "absolute qualitative claim",
  "unquantified impact claim",
  "guaranteed outcome claim",
  "overgeneralized evidence claim",
  "root-cause guarantee",
  "UI dissolution mistranslation",
  "session adoption mistranslation",
  "snapshot verb mistranslation",
  "binding capture mistranslation",
  "oversized mistranslation",
  "subjective temporal emphasis",
  "subjective adequacy claim",
  "session displayName uniqueness contradiction",
  "native-thread identity overclaim",
  "hook-gateway feature conflation",
  "binding-capture capability overclaim",
  "hook enforcement mistranslation",
  "absolute workflow failure",
  "multi-entity universal coverage conflation",
  "ungrounded semantic term 能耗",
  "ungrounded semantic term 日志",
  "ungrounded semantic term 多图",
  "ungrounded semantic term 缓存",
  "ungrounded semantic term 免费",
  "ungrounded semantic term 误删",
  "ungrounded semantic term 重复解析",
  "ungrounded semantic term 命令注入",
  "ungrounded semantic term 跨平台",
  "ungrounded semantic term 重构",
  "ungrounded semantic term 部署",
  "unestablished hosted timeout scope",
  "invented configuration dependency",
  "security training outcome extrapolation",
  "component metric scope expansion",
  "numeric entity binding mismatch",
  "restart-safe scope expansion",
  "MCP result-interference extrapolation",
  "session-container scope inversion",
  "cache coverage contradiction",
  "cache issue model-switch extrapolation",
  "lazy-import scope mistranslation",
  "permission mode-target inversion",
  "cron failure-stage conflation",
  "catalog completeness guarantee",
  "pane-session entity substitution",
  "worker-target scope loss",
  "benchmark adoption extrapolation",
  "release sibling scope drift",
  "percentage denominator scope loss",
  "scanner decision coverage-as-accuracy",
  "scanner coverage unit conflation",
  "non-comparable timing delta",
  "baseline qualifier loss",
  "multi-day count collapsed",
  "bounded preview completeness overclaim",
  "startup-restart mistranslation",
  "foreground subagent mistranslation",
  "multi-method metric attribution",
  "trusted-access response overstatement",
  "trusted-access workaround overstatement",
  "security-training domain mistranslation",
  "model downgrade config-or-retry advice",
]);

function normalizedSafeInferenceLabel(rawLabel: string): string | undefined {
  const label = /^numeric entity binding mismatch: (?:artifacts|families)=\d+$/u.test(rawLabel)
    ? "numeric entity binding mismatch"
    : rawLabel;
  return SAFE_INFERENCE_LABELS.has(label) ? label : undefined;
}

function safeIndexedInferenceLabels(quality: QualityReport): Array<{ index: number; label: string }> {
  return quality.violations.flatMap((violation) => {
    const match = violation.match(/^development (\d+): unsupported inference \(([^)]+)\)$/u);
    if (!match) return [];
    const label = normalizedSafeInferenceLabel(match[2]!);
    return label ? [{ index: Number(match[1]), label }] : [];
  });
}

function safeInferenceLabels(quality: QualityReport): string[] {
  return safeIndexedInferenceLabels(quality).map(({ label }) => label);
}

const GENERIC_INFERENCE_REWRITE =
  "删除失败字段中未被当前 event evidence 支持的推断、错误翻译、实体或分母错配、范围扩张和绝对因果，按原始 evidence 从零改写；不得用同义表达规避质量门。";

function safeMechanicalCorrectionDetails(quality: QualityReport): string[] {
  return quality.violations
    .filter((violation) =>
      /^development \d+: unsupported mechanical token (?:#\d+|20\d{2}[-/.]\d{1,2}(?:[-/.]\d{1,2})?|\d+(?:\.\d+)*(?:%|x|×|k|m|b|gb|mb|ms|亿|万|条|个|项|次|名|篇|小时|天|款|倍)?|[零〇一二两三四五六七八九十百千万亿]{1,16}(?:个|条|项|次|名|篇|小时|天|款|倍))$/iu.test(
        violation,
      ),
    )
    .slice(0, 32);
}

function safeLexicalCorrectionDetails(quality: QualityReport): string[] {
  return quality.violations
    .flatMap((violation) => {
      const match = violation.match(
        /^development (\d+): unsupported ASCII token ([A-Za-z][A-Za-z0-9]*(?:[-_.+][A-Za-z0-9]+)*)$/u,
      );
      return match ? [`development ${match[1]}: ${match[2]!.slice(0, 64)}`] : [];
    })
    .slice(0, 32);
}

function safeLexicalTokens(quality: QualityReport): string[] {
  return safeLexicalCorrectionDetails(quality).map((detail) =>
    detail.replace(/^development (\d+): /u, "$1:"),
  );
}

function safeEditorialActionDetails(quality: QualityReport): string[] {
  return quality.violations
    .flatMap((violation) => {
      const match = violation.match(
        /^development (\d+): summary exceeds two action claims \(tokens=([\p{Script=Han},]{3,64})\)$/u,
      );
      return match ? [`development ${match[1]}: ${match[2]}`] : [];
    })
    .slice(0, 16);
}

function safeEditorialFactDetails(quality: QualityReport): string[] {
  return quality.violations
    .flatMap((violation) => {
      const match = violation.match(/^development (\d+): summary declares more than two facts$/u);
      return match ? [`development ${match[1]}`] : [];
    })
    .slice(0, 16);
}

function safeDanglingWhyDetails(quality: QualityReport): string[] {
  return quality.violations
    .flatMap((violation) => {
      const match = violation.match(
        /^development (\d+): why_it_matters ends with a dangling impact predicate$/u,
      );
      return match ? [`development ${match[1]}`] : [];
    })
    .slice(0, 16);
}

function safeUntranslatedActionDetails(quality: QualityReport): string[] {
  return quality.violations
    .flatMap((violation) => {
      const match = violation.match(
        /^development (\d+): untranslated English action \(tokens=([a-z,-]{3,96})\)$/u,
      );
      return match ? [`development ${match[1]}: ${match[2]}`] : [];
    })
    .slice(0, 16);
}

function safeUntranslatedActionTokens(quality: QualityReport): string[] {
  return safeUntranslatedActionDetails(quality)
    .flatMap((detail) => {
      const match = detail.match(/^development (\d+): ([a-z,-]+)$/u);
      return match
        ? match[2]!.split(",").flatMap((token) => (token ? [`${match[1]}:${token.slice(0, 32)}`] : []))
        : [];
    })
    .slice(0, 32);
}

const UNTRANSLATED_TERM_GUIDANCE: Readonly<Record<string, string>> = {
  adopt: "adopt 按语境译为“采用”或“接入”",
  adopts: "adopts 按语境译为“采用”或“接入”",
  adopted: "adopted 按语境译为“已采用”或“已接入”",
  adopting: "adopting 按语境译为“采用”或“接入”",
  adoption: "adoption 按语境译为“采用”或“接入”",
  snapshot: "snapshot 按语境译为“快照”或“保存快照”",
  binding: "binding 译为“绑定”",
  capture: "capture 按语境译为“采集”",
  clone: "clone 译为“克隆”",
  clones: "clones 译为“克隆”",
  cloned: "cloned 译为“已克隆”",
  cloning: "cloning 译为“克隆”",
  pane: "pane 译为“窗格”",
  panes: "panes 译为“窗格”",
  broad: "broad 按语境译为“宽泛的”",
  barrel: "barrel 在 SDK 导入语境译为“聚合入口”",
  moded: "moded 按语境译为“模式化”",
  native: "native 按语境译为“原生”",
  mention: "删除 @mention/@mentions，并按语境改写为“用户提及”或“提及上下文”",
  session: "session 译为“会话”",
  sessions: "sessions 译为“会话”",
  tightening: "tightening 按语境译为“收紧”",
  hook: "hook 译为“钩子”",
  hooks: "hooks 译为“钩子”",
  block: "block 按语境译为“阻止”",
  confirm: "confirm 译为“确认”",
  annotate: "annotate 译为“标注”",
  operators: "Operators 译为“运维人员”",
  operator: "Operator 在角色语境译为“运维人员”",
  artifact: "artifact 在模型文件语境译为“制品”",
  attach: "attach 译为“附加”",
  exit: "exit 在退出状态语境译为“退出码”",
  workspace: "workspace 译为“工作区”",
  quote: "quote 在界面上下文中译为“引用”",
  cron: "cron 在用户可见日报中译为“定时任务”",
  crash: "crash 译为“崩溃”",
  detached: "detached 在值语义中译为“独立副本”",
  "json-safe": "JSON-safe 译为“可安全序列化为 JSON”",
  live: "live 在运行时对象语境中译为“实时”或删除",
  "runtime-context": "runtime-context 译为“运行时上下文”",
  blocks: "blocks 在上下文结构语境中译为“块”",
  agent: "agent 在普通角色语境译为“智能体”",
  wiki: "wiki 在普通知识库语境译为“知识库”",
  skill: "skill 在普通能力包语境译为“技能”",
  "root-level": "root-level 译为“顶层”",
  preview: "preview 译为“预览”",
  bug: "bug 译为“缺陷”",
  marketplace: "marketplace 在个人插件来源语境译为“个人市场”",
  exec: "exec 在普通叙述中译为“命令执行”",
  context: "context 在浏览器标识语境译为“上下文”",
  worker: "worker 在浏览器语境译为“后台工作器”",
  "per-turn": "per-turn 译为“单轮”",
  ground: "ground truth 译为“真值”",
  truth: "ground truth 译为“真值”",
};

function untranslatedTermGuidance(details: readonly string[]): string[] {
  const tokens = details.flatMap((detail) => {
    const separator = detail.indexOf(":");
    if (separator < 0) return [];
    return detail
      .slice(separator + 1)
      .split(",")
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean);
  });
  return [...new Set(tokens)].flatMap((token) => {
    const guidance = UNTRANSLATED_TERM_GUIDANCE[token];
    return guidance ? [guidance] : [];
  });
}

function lexicalTermGuidance(tokens: readonly string[]): string[] {
  return [...new Set(tokens.map((token) => token.trim().toLowerCase()).filter(Boolean))].flatMap((token) => {
    const guidance = UNTRANSLATED_TERM_GUIDANCE[token];
    return guidance ? [guidance] : [];
  });
}

function editorialViolationLabel(detail: string): string | undefined {
  if (detail === "ticket-template title") return "ticket_template_title";
  if (detail === "generic release title") return "generic_release_title";
  if (detail === "title exceeds 48 characters") return "title_too_long";
  if (detail === "title declares more than two facts") return "title_declares_many_facts";
  if (detail === "summary exceeds 140 characters") return "summary_too_long";
  if (detail === "summary ends with a dangling object") return "summary_dangling_object";
  if (detail === "title introduces a feature absent from summary") return "title_summary_scope_mismatch";
  if (detail === "summary exceeds two core facts") return "summary_too_many_facts";
  if (/^summary exceeds two action claims /u.test(detail)) return "summary_too_many_actions";
  if (detail === "summary declares more than two facts") return "summary_declares_many_facts";
  if (detail === "summary coordinates more than two facts") return "summary_too_many_actions";
  if (detail === "summary contains forbidden punctuation") return "summary_forbidden_punctuation";
  if (detail === "summary must contain one final full stop") return "summary_full_stop";
  if (detail === "why_it_matters exceeds 120 characters") return "why_too_long";
  if (detail === "missing CJK and Latin spacing") return "cjk_latin_spacing";
  if (/^noncanonical /u.test(detail)) return "noncanonical_term";
  if (/^untranslated English action /u.test(detail)) return "untranslated_action";
  if (detail === "bare English phrase before classifier") return "bare_english_phrase";
  if (detail === "malformed conditional phrase") return "malformed_conditional";
  if (detail === "malformed pull-request reference") return "malformed_pull_request_reference";
  if (detail === "why_it_matters must end with a full stop") return "why_full_stop";
  if (detail === "why_it_matters lacks an impact explanation") return "why_missing_impact";
  if (/^why_it_matters duplicates development \d+$/u.test(detail)) return "duplicate_why";
  return undefined;
}

function safeEditorialLabels(quality: QualityReport): string[] {
  return quality.violations
    .flatMap((violation) => {
      const match = violation.match(/^development (\d+): (.+)$/u);
      if (!match) return [];
      const label = editorialViolationLabel(match[2]!);
      return label ? [`${match[1]}:${label}`] : [];
    })
    .slice(0, 32);
}

function remapEditorialLabels(labels: string[], activeIndexes: readonly number[]): string[] {
  const localIndexes = new Map(activeIndexes.map((globalIndex, localIndex) => [globalIndex, localIndex]));
  return labels.flatMap((label) => {
    const match = label.match(/^(\d+):(.+)$/u);
    if (!match) return [];
    const localIndex = localIndexes.get(Number(match[1]));
    return localIndex === undefined ? [] : [`${localIndex}:${match[2]}`];
  });
}

function compactSummaryRepairIndexes(
  mechanicalDetails: readonly string[],
  editorialLabels: readonly string[],
): number[] {
  const mechanicalIndexes = new Set(
    mechanicalDetails.flatMap((detail) => {
      const match = detail.match(/^development (\d+):/u);
      return match ? [Number(match[1])] : [];
    }),
  );
  const summaryIndexes = new Set(
    editorialLabels.flatMap((label) => {
      const match = label.match(
        /^(\d+):(?:summary_too_long|summary_too_many_facts|summary_too_many_actions|summary_declares_many_facts|summary_forbidden_punctuation)$/u,
      );
      return match ? [Number(match[1])] : [];
    }),
  );
  return [...mechanicalIndexes]
    .filter((index) => summaryIndexes.has(index))
    .sort((left, right) => left - right);
}

function summaryStructureRepairIndexes(editorialLabels: readonly string[]): number[] {
  return [
    ...new Set(
      editorialLabels.flatMap((label) => {
        const match = label.match(
          /^(\d+):(?:summary_too_long|summary_too_many_facts|summary_too_many_actions|summary_declares_many_facts|summary_forbidden_punctuation|summary_full_stop|summary_dangling_object)$/u,
        );
        return match ? [Number(match[1])] : [];
      }),
    ),
  ].sort((left, right) => left - right);
}

function malformedConditionalRepairIndexes(editorialLabels: readonly string[]): number[] {
  return [
    ...new Set(
      editorialLabels.flatMap((label) => {
        const match = label.match(/^(\d+):malformed_conditional$/u);
        return match ? [Number(match[1])] : [];
      }),
    ),
  ].sort((left, right) => left - right);
}

function whyImpactRepairIndexes(editorialLabels: readonly string[]): number[] {
  return [
    ...new Set(
      editorialLabels.flatMap((label) => {
        const match = label.match(/^(\d+):why_missing_impact$/u);
        return match ? [Number(match[1])] : [];
      }),
    ),
  ].sort((left, right) => left - right);
}

type SurgicalRepairField = "title" | "summary" | "why_it_matters";

function scopedEditorialRepairFields(
  quality: QualityReport,
  developmentIndex: number,
): ReadonlySet<SurgicalRepairField> | undefined {
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  if (failedChecks.length === 0 || failedChecks.some((name) => name !== "editorial_style")) return undefined;
  const prefix = `${developmentIndex}:`;
  const labels = safeEditorialLabels(quality)
    .filter((label) => label.startsWith(prefix))
    .map((label) => label.slice(prefix.length));
  if (labels.length === 0) return undefined;

  const fields = new Set<SurgicalRepairField>();
  for (const label of labels) {
    if (
      label.startsWith("title_") ||
      label === "ticket_template_title" ||
      label === "generic_release_title"
    ) {
      fields.add("title");
    } else if (label.startsWith("summary_")) {
      fields.add("summary");
    } else if (label.startsWith("why_") || label === "duplicate_why") {
      fields.add("why_it_matters");
    } else {
      return undefined;
    }
  }
  return fields.size > 0 ? fields : undefined;
}

function withValidatedSummaryPunctuation(
  candidate: unknown,
  quality: QualityReport,
): { candidate: unknown; normalizationsApplied: string[] } {
  if (
    quality.violations.length === 0 ||
    !candidate ||
    typeof candidate !== "object" ||
    Array.isArray(candidate)
  ) {
    return { candidate, normalizationsApplied: [] };
  }
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) return { candidate, normalizationsApplied: [] };
  const indexes = new Set(
    quality.violations.flatMap((violation) => {
      const match = violation.match(/^development (\d+): summary contains forbidden punctuation$/u);
      return match ? [Number(match[1])] : [];
    }),
  );
  const unsafeIndexes = new Set(
    quality.violations.flatMap((violation) => {
      const match = violation.match(
        /^development (\d+): summary (?:exceeds two (?:core facts|action claims)|declares more than two facts|coordinates more than two facts)/u,
      );
      return match ? [Number(match[1])] : [];
    }),
  );
  const normalizationsApplied: string[] = [];
  const developments = root["developments"].map((development, index) => {
    if (
      !indexes.has(index) ||
      unsafeIndexes.has(index) ||
      !development ||
      typeof development !== "object" ||
      Array.isArray(development)
    ) {
      return development;
    }
    const summary = (development as Record<string, unknown>)["summary"];
    if (typeof summary !== "string") return development;
    const normalized = summary.replace(/[；;、]+/gu, "，").replace(/，{2,}/gu, "，");
    if (normalized === summary) return development;
    normalizationsApplied.push(`${index}:summary_punctuation`);
    return { ...(development as Record<string, unknown>), summary: normalized };
  });
  return {
    candidate: normalizationsApplied.length > 0 ? { ...root, developments } : candidate,
    normalizationsApplied,
  };
}

function withTrustedSourceIds(
  candidate: unknown,
  events: EventCandidate[],
  records: EvidenceRecord[],
): { candidate: unknown; normalizationsApplied: string[] } {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { candidate, normalizationsApplied: [] };
  }
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) {
    return { candidate, normalizationsApplied: [] };
  }
  return {
    candidate: {
      ...root,
      developments: root["developments"].map((development, index) => {
        const event = events[index];
        if (
          !event ||
          !development ||
          typeof development !== "object" ||
          Array.isArray(development) ||
          (development as Record<string, unknown>)["event_id"] !== event.id
        ) {
          return development;
        }
        return {
          ...(development as Record<string, unknown>),
          source_ids: synthesisSourceIds(event, records),
        };
      }),
    },
    normalizationsApplied: [],
  };
}

function remapActiveNormalizationLabels(
  labels: readonly string[],
  activeIndexes: readonly number[],
): string[] {
  return labels.flatMap((label) => {
    const match = label.match(/^(\d+):(.+)$/u);
    if (!match) return [];
    const originalIndex = activeIndexes[Number(match[1])];
    return originalIndex === undefined ? [] : [`${originalIndex}:${match[2]}`];
  });
}

function withLockedDevelopments(
  candidate: unknown,
  locked: ReadonlyMap<number, SynthesisResult["developments"][number]>,
): unknown {
  if (locked.size === 0 || !candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return candidate;
  }
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) return candidate;
  return {
    ...root,
    developments: root["developments"].map((development, index) => locked.get(index) ?? development),
  };
}

function expandSurgicalCandidate(
  candidate: unknown,
  activeIndexes: readonly number[],
  locked: ReadonlyMap<number, SynthesisResult["developments"][number]>,
  repairBases: ReadonlyMap<number, SynthesisResult["developments"][number]>,
  repairFields: ReadonlyMap<number, ReadonlySet<SurgicalRepairField>>,
  developmentCount: number,
): unknown {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return candidate;
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) return candidate;
  const developments = Array.from<unknown>({ length: developmentCount }).fill(undefined);
  for (const [index, development] of locked) developments[index] = development;
  for (const [localIndex, originalIndex] of activeIndexes.entries()) {
    const replacement = root["developments"][localIndex];
    const base = repairBases.get(originalIndex);
    const fields = repairFields.get(originalIndex);
    if (base && fields && replacement && typeof replacement === "object" && !Array.isArray(replacement)) {
      const merged = { ...base };
      const replacementRecord = replacement as Record<string, unknown>;
      for (const field of fields) {
        if (field in replacementRecord) (merged as Record<string, unknown>)[field] = replacementRecord[field];
      }
      developments[originalIndex] = merged;
    } else {
      developments[originalIndex] = replacement;
    }
  }
  return { ...root, developments };
}

function scopedFailureIndexes(quality: QualityReport, developmentCount: number): Set<number> | undefined {
  if (
    quality.checks.some(
      (check) => (check.name === "schema" || check.name === "development_count") && !check.passed,
    )
  ) {
    return undefined;
  }
  const indexes = new Set<number>();
  for (const violation of quality.violations) {
    if (/^duplicate ratio too high:/u.test(violation)) continue;
    const match = violation.match(/^development (\d+):/u);
    if (!match) return undefined;
    const index = Number(match[1]);
    if (!Number.isSafeInteger(index) || index < 0 || index >= developmentCount) return undefined;
    indexes.add(index);
  }
  return indexes.size > 0 ? indexes : undefined;
}

function assertByteLimit(value: string, label: string, limit: number): void {
  if (Buffer.byteLength(value, "utf8") > limit) {
    throw new SynthesisFailure("input_limit", `${label} exceeds the byte limit`);
  }
}

function safeRequestFailure(error: unknown): SynthesisFailure {
  const code =
    error && typeof error === "object" && typeof (error as { code?: unknown }).code === "string"
      ? (error as { code: string }).code.toLowerCase()
      : "";
  return new SynthesisFailure(
    SAFE_REQUEST_FAILURE_CODES.has(code) ? code : "request_failed",
    "Synthesis provider request failed",
  );
}

function canUseBoundedSecondQualityRepair(
  qualityFailureCount: number,
  quality: QualityReport,
  bestDevelopmentCount: number,
): boolean {
  if (qualityFailureCount !== 2) return false;
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  const inferenceLabels = safeInferenceLabels(quality);
  const hasRepairableInferenceCompanion =
    failedChecks.includes("unsupported_inference") &&
    inferenceLabels.length > 0 &&
    failedChecks.some((name) => name !== "unsupported_inference");
  const boundedRepairSet =
    failedChecks.length > 0 &&
    failedChecks.every(
      (name) =>
        name === "schema" ||
        name === "development_count" ||
        name === "chinese_only" ||
        name === "mechanical_grounding" ||
        name === "lexical_grounding" ||
        name === "lifecycle_language" ||
        name === "editorial_style" ||
        (name === "unsupported_inference" && hasRepairableInferenceCompanion),
    );
  const nearComplete =
    quality.developmentCount >= Math.max(0, quality.eligibleEventCount - 1) ||
    bestDevelopmentCount >= quality.eligibleEventCount;
  const mechanicalViolationCount = quality.violations.filter((violation) =>
    /^development \d+: unsupported mechanical token /u.test(violation),
  ).length;
  return (
    boundedRepairSet &&
    nearComplete &&
    (!failedChecks.includes("mechanical_grounding") || mechanicalViolationCount <= 2)
  );
}

function canUseLabeledInferenceOnlyRepair(
  qualityFailureCount: number,
  quality: QualityReport,
  previousInferenceLabels: readonly string[],
): boolean {
  if (qualityFailureCount !== 2 || quality.developmentCount !== quality.eligibleEventCount) return false;
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  const inferenceLabels = [...new Set(safeInferenceLabels(quality))].sort();
  const previousLabels = [...new Set(previousInferenceLabels)].sort();
  return (
    failedChecks.length === 1 &&
    failedChecks[0] === "unsupported_inference" &&
    inferenceLabels.length > 0 &&
    inferenceLabels.join("\n") !== previousLabels.join("\n")
  );
}

function canUseFinalEditorialQualityRepair(
  qualityFailureCount: number,
  quality: QualityReport,
  hasSurgicalRepair: boolean,
): boolean {
  if (
    qualityFailureCount !== 3 ||
    !hasSurgicalRepair ||
    safeInferenceLabels(quality).length > 0 ||
    quality.developmentCount !== quality.eligibleEventCount
  ) {
    return false;
  }
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  return (
    failedChecks.length === 1 &&
    failedChecks[0] === "editorial_style" &&
    safeEditorialLabels(quality).length > 0
  );
}

function canUseFinalInferenceQualityRepair(
  qualityFailureCount: number,
  quality: QualityReport,
  previousInferenceLabels: readonly string[],
  hasSurgicalRepair: boolean,
): boolean {
  if (qualityFailureCount !== 3 || quality.developmentCount !== quality.eligibleEventCount) {
    return false;
  }
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  if (failedChecks.length !== 1 || failedChecks[0] !== "unsupported_inference") return false;
  const inferenceLabels = [...new Set(safeInferenceLabels(quality))].sort();
  if (inferenceLabels.length === 0) return false;
  const previousLabels = [...new Set(previousInferenceLabels)].sort();
  return hasSurgicalRepair || inferenceLabels.join("\n") !== previousLabels.join("\n");
}

function canUseFinalLifecycleInferenceQualityRepair(
  qualityFailureCount: number,
  quality: QualityReport,
  surgicalIndexes: readonly number[],
): boolean {
  if (
    qualityFailureCount !== 3 ||
    quality.developmentCount !== quality.eligibleEventCount ||
    surgicalIndexes.length !== 1 ||
    safeInferenceLabels(quality).length === 0
  ) {
    return false;
  }
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  return (
    failedChecks.length === 2 &&
    failedChecks.includes("unsupported_inference") &&
    failedChecks.includes("lifecycle_language")
  );
}

function qualityCorrection(quality: QualityReport, events: EventCandidate[]): string {
  const mechanicalDetails = safeMechanicalCorrectionDetails(quality);
  const lexicalDetails = safeLexicalCorrectionDetails(quality);
  const editorialActionDetails = safeEditorialActionDetails(quality);
  const editorialFactDetails = safeEditorialFactDetails(quality);
  const danglingWhyDetails = safeDanglingWhyDetails(quality);
  const untranslatedActionDetails = safeUntranslatedActionDetails(quality);
  const editorialLabels = safeEditorialLabels(quality);
  const summaryRepairIndexes = summaryStructureRepairIndexes(editorialLabels);
  const impactRepairIndexes = whyImpactRepairIndexes(editorialLabels);
  const malformedConditionalIndexes = malformedConditionalRepairIndexes(editorialLabels);
  const compactSummaryIndexes = compactSummaryRepairIndexes(mechanicalDetails, editorialLabels);
  const hasDuplicateWhy = quality.violations.some((violation) =>
    /^development \d+: why_it_matters duplicates development \d+$/u.test(violation),
  );
  const correction = [
    "",
    "上一轮输出被机械质量门拒绝。必须修正后重新输出完整 JSON。",
    `脱敏诊断：${safeQualityFailureSummary(quality)}`,
    `developments 必须恰好包含 ${events.length} 条，并严格保持 EVENTS 顺序。`,
    "每条 development 只输出 event_id、summary、title、why_it_matters；source_ids 由程序确定性回填。",
    ...(mechanicalDetails.length > 0
      ? [
          "必须逐条修复以下数字、日期、版本或数量词证据问题：",
          ...mechanicalDetails,
          "数字、日期、版本和具体数量必须原样存在于该 development 的 source_ids 所指 evidence 中。",
          "source_ids 由程序确定性回填，不得尝试修改；如果当前 evidence 不支持具体数量，必须删除该数量及依赖它的量化表述，不得换一个数字或数量词。",
        ]
      : []),
    ...(compactSummaryIndexes.length > 0
      ? [
          `联合修复：先在任意字段删除上述无证据 token，再只重写 ${compactSummaryIndexes.map((index) => `development ${index}`).join("、")} 的 summary，为不超过 110 个字符的一个紧凑句子；只保留一个核心事实和最多一个动作，不用分号、顿号、冒号或列表。若 evidence 没有精确数量，直接使用无数量词名词，不得添加“三个、三款、多种”等概括。`,
        ]
      : []),
    ...(summaryRepairIndexes.length > 0
      ? [
          `严格摘要重写：只重写 ${summaryRepairIndexes.map((index) => `development ${index}`).join("、")} 的 summary，采用“主语 + 一个动作 + 一个宾语”的单事实句；只保留一个核心事实和最多一个动作，删除其他动作、枚举和从句，不使用分号、顿号、冒号或列表。`,
        ]
      : []),
    ...(impactRepairIndexes.length > 0
      ? [
          `严格影响句重写：只重写 ${impactRepairIndexes.map((index) => `development ${index}`).join("、")} 的 why_it_matters，采用“具体受影响对象 + 一个影响谓词 + 一个具体后果”的完整句；只使用当前 event evidence 支持的主体、动作和对象，不得复述 summary、使用套话、保证结果或添加新事实。`,
        ]
      : []),
    ...(malformedConditionalIndexes.length > 0
      ? [
          `条件影响句病句命中：只重写 ${malformedConditionalIndexes.map((index) => `development ${index}`).join("、")} 的 why_it_matters。禁止“防止/避免 X，影响 Y”和叠加条件；open PR 使用“若合并，【具体受影响对象】可降低【具体故障或后果】风险。”，其他事件使用同样的对象 + 风险结构但不添加合并条件。`,
        ]
      : []),
    ...(quality.checks.some((check) => check.name === "lifecycle_language" && !check.passed)
      ? [
          "必须按 evidence 的 metadata.activity/state 修正 GitHub 生命周期：created/open PR 写提议或尚未合并，why_it_matters 只保留一个若合并/如落地/一旦采纳条件；merged PR 写已合并后的实际影响，任何字段不得写若合并、若采用该修复/改动/逻辑；closed PR 未合并必须明确写已关闭且未合并。Bug/故障 Issue 必须写报告或反馈，不得写提议报告、拟降级或若合并；正文只是重开或链接旧 Issue 时，why_it_matters 必须写若该反馈可复现或可能影响。",
        ]
      : []),
    ...(quality.checks.some((check) => check.name === "editorial_style" && !check.passed)
      ? [
          "必须统一编辑风格：标题不要以 PR#/Issue# 模板开头，不得只写项目 + 版本 + 发布/更新或用三个缺陷等数量枚举；title、summary、why_it_matters 分别限制在 48、140、120 个字符以内；summary 必须重写为一个完整句子，最多两个动作事实，新增 A 和 B 并修复 C 按三项计算，句内只用逗号连接并以句号结尾；why_it_matters 以句号结尾并明确说明具体影响，不得只复述事件、复用套话、写若…如修复/被采纳修复、由…拟解决、影响…导致等病句或使用无条件结论；英文专名、版本号、百分比与中文之间保留一个空格，普通英文词或动作词必须译成中文。",
          ...(untranslatedActionDetails.length > 0
            ? [
                "以下普通英文词或动作词必须逐条翻译成中文或删除：",
                ...untranslatedActionDetails,
                ...untranslatedTermGuidance(untranslatedActionDetails),
                "上述 token 及其大小写变体不得在 title、summary 或 why_it_matters 中再次出现。",
              ]
            : []),
          ...(editorialActionDetails.length > 0
            ? [
                "以下摘要命中了超过两个动作词：",
                ...editorialActionDetails,
                "必须从零重写对应 summary，最多保留两项最核心且有证据的动作事实；其余命中词及其从句必须删除，不得只改其他字段或用同义动作规避计数。",
              ]
            : []),
          ...(editorialFactDetails.length > 0
            ? [
                `多事实枚举命中：${JSON.stringify(editorialFactDetails)}。必须从零重写对应 summary，只保留 1 个核心事实；不得写“三个/3 个”或列出多项缺陷、问题、改动、更新、修复。`,
              ]
            : []),
          ...(danglingWhyDetails.length > 0
            ? [
                `影响句谓词悬空命中：${JSON.stringify(danglingWhyDetails)}。必须从零重写对应 why_it_matters，为“避免/防止/影响/提升”等谓词补全具体对象或结果，不得以单独谓词直接收句。`,
              ]
            : []),
          ...(hasDuplicateWhy
            ? ["why_it_matters 不得复用其他条目的影响说明；必须写当前事件独有且由 evidence 支持的具体影响。"]
            : []),
          ...(editorialLabels.length > 0
            ? [
                `编辑子规则标签：${JSON.stringify(editorialLabels)}。必须逐项修正标签所指字段，不得只改其他字段。`,
              ]
            : []),
        ]
      : []),
    ...(quality.checks.some((check) => check.name === "lexical_grounding" && !check.passed)
      ? [
          "输出中的英文产品名、项目名、技术名词必须原样存在于对应 evidence；删除没有证据支持的英文专名，并保持英文与中文之间有空格。",
          ...(lexicalDetails.length > 0
            ? [
                "以下无证据英文词必须逐条翻译成中文或删除，不得改换另一个无证据英文词：",
                ...lexicalDetails,
                ...untranslatedTermGuidance(lexicalDetails),
                "上述 token 及其大小写变体不得在任何输出字段再次出现。",
              ]
            : []),
        ]
      : []),
    ...(quality.checks.some((check) => check.name === "chinese_only" && !check.passed)
      ? [
          "title、summary、why_it_matters 的正文必须使用中文；只保留 evidence 中原样出现的英文产品名、项目名和技术专名，其余英文正文必须翻译。",
        ]
      : []),
    ...(quality.checks.some((check) => check.name === "unsupported_inference" && !check.passed)
      ? [GENERIC_INFERENCE_REWRITE]
      : []),
    ...(quality.checks.some((check) => check.name === "duplicate_ratio" && !check.passed)
      ? ["标题必须突出各自事件独有的项目、版本或功能，不得让不同 developments 使用近重复模板标题。"]
      : []),
    "不要解释，不要 Markdown fence。",
    "",
  ].join("\n");
  assertByteLimit(correction, "Synthesis correction", MAX_SYNTHESIS_CORRECTION_BYTES);
  return correction;
}

function remapDevelopmentDetailIndexes(details: string[], activeIndexes: readonly number[]): string[] {
  const localIndexes = new Map(activeIndexes.map((globalIndex, localIndex) => [globalIndex, localIndex]));
  return details.flatMap((detail) => {
    const match = detail.match(/^development (\d+)(:.*)?$/u);
    if (!match) return [detail];
    const localIndex = localIndexes.get(Number(match[1]));
    return localIndex === undefined ? [] : [`development ${localIndex}${match[2] ?? ""}`];
  });
}

function surgicalQualityCorrection(
  quality: QualityReport,
  activeIndexes: readonly number[],
  repairOrdinal: number,
): string {
  const failedChecks = quality.checks.filter((check) => !check.passed).map((check) => check.name);
  const mechanicalDetails = remapDevelopmentDetailIndexes(
    safeMechanicalCorrectionDetails(quality),
    activeIndexes,
  );
  const lexicalTokens = safeLexicalCorrectionDetails(quality).map((detail) =>
    detail.replace(/^development \d+: /u, ""),
  );
  const editorialActionDetails = remapDevelopmentDetailIndexes(
    safeEditorialActionDetails(quality),
    activeIndexes,
  );
  const editorialFactDetails = remapDevelopmentDetailIndexes(
    safeEditorialFactDetails(quality),
    activeIndexes,
  );
  const danglingWhyDetails = remapDevelopmentDetailIndexes(safeDanglingWhyDetails(quality), activeIndexes);
  const untranslatedActionDetails = remapDevelopmentDetailIndexes(
    safeUntranslatedActionDetails(quality),
    activeIndexes,
  );
  const editorialLabels = remapEditorialLabels(safeEditorialLabels(quality), activeIndexes);
  const summaryRepairIndexes = summaryStructureRepairIndexes(editorialLabels);
  const impactRepairIndexes = whyImpactRepairIndexes(editorialLabels);
  const malformedConditionalIndexes = malformedConditionalRepairIndexes(editorialLabels);
  const compactSummaryIndexes = compactSummaryRepairIndexes(mechanicalDetails, editorialLabels);
  const hasDuplicateWhy = quality.violations.some((violation) =>
    /^development \d+: why_it_matters duplicates development \d+$/u.test(violation),
  );
  const correction = [
    "",
    `上一轮当前条目未通过这些检查：${failedChecks.join(", ")}。只修正当前 EVENTS 并重新输出完整 JSON。`,
    `这是第 ${repairOrdinal} 次质量修复（序号用于避免缓存复用）；只改命中的字段，不得引入新的数量、专名、动作或因果关系。`,
    ...(mechanicalDetails.length > 0
      ? [
          `先在任意字段删除这些没有 evidence 支持的数字、日期、版本或数量词：${JSON.stringify(mechanicalDetails)}。不得换成另一个数字或数量词；若无精确数量证据，直接使用无数量词名词。`,
        ]
      : []),
    ...(compactSummaryIndexes.length > 0
      ? [
          `联合修复：删除上述 token 后，只重写 ${compactSummaryIndexes.map((index) => `development ${index}`).join("、")} 的 summary，为不超过 110 个字符的一个紧凑句子；只保留一个核心事实和最多一个动作，不用分号、顿号、冒号或列表。若 evidence 没有精确数量，直接使用无数量词名词，不得添加“三个、三款、多种”等概括。`,
        ]
      : []),
    ...(summaryRepairIndexes.length > 0
      ? [
          `严格摘要重写：只重写 ${summaryRepairIndexes.map((index) => `development ${index}`).join("、")} 的 summary，采用“主语 + 一个动作 + 一个宾语”的单事实句；只保留一个核心事实和最多一个动作，删除其他动作、枚举和从句，不使用分号、顿号、冒号或列表。`,
        ]
      : []),
    ...(impactRepairIndexes.length > 0
      ? [
          `严格影响句重写：只重写 ${impactRepairIndexes.map((index) => `development ${index}`).join("、")} 的 why_it_matters，采用“具体受影响对象 + 一个影响谓词 + 一个具体后果”的完整句；只使用当前 event evidence 支持的主体、动作和对象，不得复述 summary、使用套话、保证结果或添加新事实。`,
        ]
      : []),
    ...(malformedConditionalIndexes.length > 0
      ? [
          `条件影响句病句命中：只重写 ${malformedConditionalIndexes.map((index) => `development ${index}`).join("、")} 的 why_it_matters。禁止“防止/避免 X，影响 Y”和叠加条件；open PR 使用“若合并，【具体受影响对象】可降低【具体故障或后果】风险。”，其他事件使用同样的对象 + 风险结构但不添加合并条件。`,
        ]
      : []),
    ...(lexicalTokens.length > 0
      ? [
          `把这些没有 evidence 支持的英文词翻译成中文或删除：${JSON.stringify(lexicalTokens)}。不得换成另一个英文词。`,
          ...lexicalTermGuidance(lexicalTokens),
          "上述 token 及其大小写变体不得在任何输出字段再次出现。",
        ]
      : []),
    ...(failedChecks.includes("lifecycle_language")
      ? [
          "严格按 metadata.activity/state 写 GitHub 生命周期：open PR 写提议或尚未合并，why_it_matters 只保留一个若合并/如落地/一旦采纳条件；merged PR 写已合并后的实际影响，任何字段不得写若合并、若采用该修复/改动/逻辑；Bug/故障 Issue 写报告或反馈，不得写提议报告、拟降级或若合并；正文只是重开或链接旧 Issue 时，why_it_matters 必须写若该反馈可复现或可能影响；closed PR 明确已关闭且未合并。",
        ]
      : []),
    ...(failedChecks.includes("chinese_only")
      ? [
          "title、summary、why_it_matters 必须使用中文；英文只保留 evidence 中的产品名、项目名和技术专名，俄文、西里尔字母、希腊文、日文、韩文等其他脚本必须翻译成中文或删除。",
        ]
      : []),
    ...(failedChecks.includes("editorial_style")
      ? [
          "title、summary、why_it_matters 分别不超过 48、140、120 个字符；标题必须独特且不得只写项目 + 版本 + 发布/更新或用三个缺陷等数量枚举；摘要只写一个紧凑句子且最多两个动作事实，新增 A 和 B 并修复 C 按三项计算；why_it_matters 以句号结尾并说明具体影响，不得只复述事件或写若…如修复/被采纳修复、由…拟解决、影响…导致等病句。",
          ...(untranslatedActionDetails.length > 0
            ? [
                `把这些普通英文词或动作词翻译成中文或删除：${JSON.stringify(untranslatedActionDetails)}。`,
                ...untranslatedTermGuidance(untranslatedActionDetails),
                "上述 token 及其大小写变体不得在 title、summary 或 why_it_matters 中再次出现。",
              ]
            : []),
          ...(editorialActionDetails.length > 0
            ? [
                `动作计数命中：${JSON.stringify(editorialActionDetails)}。必须从零重写对应 summary，最多保留两项最核心且有证据的动作事实；其余命中词及其从句必须删除，不得只改其他字段或用同义动作规避计数。`,
              ]
            : []),
          ...(editorialFactDetails.length > 0
            ? [
                `多事实枚举命中：${JSON.stringify(editorialFactDetails)}。必须从零重写对应 summary，只保留 1 个核心事实；不得写“三个/3 个”或列出多项缺陷、问题、改动、更新、修复。`,
              ]
            : []),
          ...(danglingWhyDetails.length > 0
            ? [
                `影响句谓词悬空命中：${JSON.stringify(danglingWhyDetails)}。必须从零重写对应 why_it_matters，为“避免/防止/影响/提升”等谓词补全具体对象或结果，不得以单独谓词直接收句。`,
              ]
            : []),
          ...(hasDuplicateWhy
            ? ["why_it_matters 不得复用已锁定条目的影响说明；只写当前事件独有且由 evidence 支持的具体影响。"]
            : []),
          ...(editorialLabels.length > 0
            ? [
                `编辑子规则标签：${JSON.stringify(editorialLabels)}。必须逐项修正标签所指字段，不得只改其他字段。`,
              ]
            : []),
        ]
      : []),
    ...(failedChecks.includes("duplicate_ratio")
      ? ["标题必须突出当前事件独有的产品、版本或功能，不得复用已锁定标题模板。"]
      : []),
    ...(failedChecks.includes("unsupported_inference") ? [GENERIC_INFERENCE_REWRITE] : []),
    "不要解释，不要 Markdown fence，也不要复述 evidence。",
    "",
  ].join("\n");
  assertByteLimit(correction, "Surgical synthesis correction", MAX_SYNTHESIS_CORRECTION_BYTES);
  return correction;
}

function appendCorrection(current: string, next: string): string {
  const combined = current + next;
  assertByteLimit(combined, "Synthesis correction", MAX_SYNTHESIS_CORRECTION_BYTES);
  return combined;
}

function stickyUntranslatedCorrection(
  bans: ReadonlyMap<number, ReadonlySet<string>>,
  activeIndexes: readonly number[] | undefined,
): string {
  const globalToLocal = activeIndexes
    ? new Map(activeIndexes.map((globalIndex, localIndex) => [globalIndex, localIndex]))
    : undefined;
  const details = [...bans.entries()]
    .flatMap(([globalIndex, tokens]) => {
      const localIndex = globalToLocal ? globalToLocal.get(globalIndex) : globalIndex;
      if (localIndex === undefined || tokens.size === 0) return [];
      return [`development ${localIndex}: ${[...tokens].sort().join(",")}`];
    })
    .slice(0, 32);
  if (details.length === 0) return "";
  const tokens = details.flatMap((detail) => detail.slice(detail.indexOf(":") + 1).split(","));
  return [
    "",
    "持续术语禁令：这些普通英文词此前已被当前条目的质量门拒绝，即使上一轮暂时消失也不得重新引入：",
    ...details,
    ...lexicalTermGuidance(tokens),
    "上述 token 及其大小写变体不得在 title、summary 或 why_it_matters 中再次出现。",
    "",
  ].join("\n");
}

function stickyInferenceCorrection(
  bans: ReadonlyMap<number, ReadonlySet<string>>,
  activeIndexes: readonly number[] | undefined,
): string {
  const globalToLocal = activeIndexes
    ? new Map(activeIndexes.map((globalIndex, localIndex) => [globalIndex, localIndex]))
    : undefined;
  const indexes = [
    ...new Set(
      [...bans.entries()].flatMap(([globalIndex, labels]) => {
        const localIndex = globalToLocal ? globalToLocal.get(globalIndex) : globalIndex;
        return localIndex === undefined || labels.size === 0 ? [] : [localIndex];
      }),
    ),
  ]
    .sort((left, right) => left - right)
    .slice(0, 32);
  if (indexes.length === 0) return "";
  return [
    "",
    "持续关系禁令：这些当前条目曾命中的受支持推断类别不得在后续修复中重新出现：",
    ...indexes.map((index) => `development ${index}`),
    GENERIC_INFERENCE_REWRITE,
    "只修正当前失败字段，同时保持这些已确认的实体、范围、条件和措辞边界。",
    "",
  ].join("\n");
}

function strictResponseContract(developmentCount: number): string {
  const item =
    '{"event_id":"event:...","title":"中文标题","summary":"发生了什么","why_it_matters":"为什么值得看"}';
  return (
    `\n最终响应契约：根对象只能有 developments；developments 必须恰好包含 ${developmentCount} 条，按 EVENTS 顺序；` +
    "每项只能有 event_id、title、summary、why_it_matters；禁止空对象、单个 development、分析或额外根字段。" +
    `格式：{"developments":[${Array.from({ length: developmentCount }, () => item).join(",")}]}` +
    "\n"
  );
}

export async function synthesizeWithQualityGate(
  basePrompt: string,
  events: EventCandidate[],
  records: EvidenceRecord[],
  dependencies: SynthesisDependencies,
): Promise<{ synthesis: SynthesisResult; quality: QualityReport }> {
  let correction = "";
  let lastError: unknown;
  let qualityFailureCount = 0;
  let requestOrParseFailureCount = 0;
  let bestDevelopmentCount = 0;
  let previousInferenceLabels: string[] = [];
  const lockedDevelopments = new Map<number, SynthesisResult["developments"][number]>();
  const surgicalBases = new Map<number, SynthesisResult["developments"][number]>();
  const surgicalRepairFields = new Map<number, ReadonlySet<SurgicalRepairField>>();
  const persistentUntranslatedBans = new Map<number, Set<string>>();
  const persistentInferenceBans = new Map<number, Set<string>>();
  let activeIndexes: number[] | undefined;
  const maxAttempts = Math.max(
    1,
    Math.min(dependencies.maxAttempts ?? MAX_SYNTHESIS_ATTEMPTS, MAX_SYNTHESIS_ATTEMPTS),
  );

  assertByteLimit(basePrompt, "Synthesis base prompt", MAX_SYNTHESIS_PROMPT_BYTES);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const activeEvents = activeIndexes ? activeIndexes.map((index) => events[index]!) : events;
    const activeBasePrompt = activeIndexes
      ? buildSynthesisPrompt(
          activeEvents,
          records,
          [...lockedDevelopments.values()].map((development) => development.title),
        )
      : basePrompt;
    const prompt = `${activeBasePrompt}${correction}${stickyUntranslatedCorrection(
      persistentUntranslatedBans,
      activeIndexes,
    )}${stickyInferenceCorrection(persistentInferenceBans, activeIndexes)}${
      qualityFailureCount > 0 ? strictResponseContract(activeEvents.length) : ""
    }`;
    try {
      assertByteLimit(prompt, "Synthesis request prompt", MAX_SYNTHESIS_PROMPT_BYTES);
    } catch (error) {
      const failure =
        error instanceof SynthesisFailure
          ? error
          : new SynthesisFailure("input_limit", "Synthesis request prompt exceeds the byte limit");
      dependencies.onAttempt?.({
        attempt,
        state: "degraded",
        reason: "request_or_parse_failed",
        error: failure,
      });
      throw failure;
    }

    let raw: string;
    try {
      raw = await dependencies.invoke(prompt, SYNTHESIS_MAX_TOKENS);
    } catch (error) {
      const failure = safeRequestFailure(error);
      lastError = failure;
      requestOrParseFailureCount++;
      dependencies.onAttempt?.({
        attempt,
        state: "degraded",
        reason: "request_or_parse_failed",
        error: failure,
      });
      if (attempt >= maxAttempts || requestOrParseFailureCount >= STANDARD_SYNTHESIS_ATTEMPTS) break;
      if (failure.code === "output_limit") {
        correction = appendCorrection(
          correction,
          `\n${OUTPUT_LIMIT_CORRECTION} 这是第 ${requestOrParseFailureCount} 次输出超限。\n`,
        );
      }
      continue;
    }

    let candidate: unknown;
    try {
      candidate = dependencies.parse(raw);
    } catch {
      const failure = new SynthesisFailure("invalid_json", "Synthesis response was not valid JSON");
      lastError = failure;
      requestOrParseFailureCount++;
      dependencies.onAttempt?.({
        attempt,
        state: "degraded",
        reason: "request_or_parse_failed",
        error: failure,
      });
      if (attempt >= maxAttempts || requestOrParseFailureCount >= STANDARD_SYNTHESIS_ATTEMPTS) break;
      correction = appendCorrection(correction, INVALID_JSON_CORRECTION);
      continue;
    }
    requestOrParseFailureCount = 0;

    const trustedCandidate = withTrustedSourceIds(candidate, activeEvents, records);
    candidate = trustedCandidate.candidate;
    const rawNormalizations = trustedCandidate.normalizationsApplied;
    const normalizationsApplied = activeIndexes
      ? remapActiveNormalizationLabels(rawNormalizations, activeIndexes)
      : rawNormalizations;
    candidate = activeIndexes
      ? expandSurgicalCandidate(
          candidate,
          activeIndexes,
          lockedDevelopments,
          surgicalBases,
          surgicalRepairFields,
          events.length,
        )
      : withLockedDevelopments(candidate, lockedDevelopments);
    let quality = validateSynthesis(candidate, events, records, {
      reservedTitles: dependencies.reservedTitles,
    });
    if (quality.status !== "pass") {
      const normalized = withValidatedSummaryPunctuation(candidate, quality);
      if (normalized.normalizationsApplied.length > 0) {
        candidate = normalized.candidate;
        normalizationsApplied.push(...normalized.normalizationsApplied);
        quality = validateSynthesis(candidate, events, records, {
          reservedTitles: dependencies.reservedTitles,
        });
      }
    }
    if (quality.status === "pass") {
      dependencies.onAttempt?.({ attempt, state: "ok", normalizationsApplied });
      return { synthesis: candidate as SynthesisResult, quality };
    }

    const untranslatedActionTokens = safeUntranslatedActionTokens(quality);
    const inferenceLabels = safeInferenceLabels(quality);
    for (const indexedLabel of safeIndexedInferenceLabels(quality)) {
      const labels = persistentInferenceBans.get(indexedLabel.index) ?? new Set<string>();
      labels.add(indexedLabel.label);
      persistentInferenceBans.set(indexedLabel.index, labels);
    }
    for (const indexedToken of untranslatedActionTokens) {
      const match = indexedToken.match(/^(\d+):([a-z-]+)$/u);
      if (!match) continue;
      const index = Number(match[1]);
      const tokens = persistentUntranslatedBans.get(index) ?? new Set<string>();
      tokens.add(match[2]!);
      persistentUntranslatedBans.set(index, tokens);
    }
    dependencies.onAttempt?.({
      attempt,
      state: "degraded",
      reason: "quality_gate_failed",
      failedChecks: quality.checks.filter((check) => !check.passed).map((check) => check.name),
      developmentCount: quality.developmentCount,
      eligibleEventCount: quality.eligibleEventCount,
      mechanicalTokenShapes: safeMechanicalTokenShapes(quality),
      lexicalTokens: safeLexicalTokens(quality),
      ...(untranslatedActionTokens.length > 0 ? { untranslatedActionTokens } : {}),
      inferenceLabels,
      editorialLabels: safeEditorialLabels(quality),
      normalizationsApplied,
    });
    qualityFailureCount++;
    bestDevelopmentCount = Math.max(bestDevelopmentCount, quality.developmentCount);
    lastError = new SynthesisFailure("quality_gate_failed", safeQualityFailureSummary(quality));
    const repairIndexes = scopedFailureIndexes(quality, events.length);
    if (repairIndexes && candidate && typeof candidate === "object" && !Array.isArray(candidate)) {
      const candidateDevelopments = (candidate as { developments?: unknown }).developments;
      if (Array.isArray(candidateDevelopments)) {
        for (let index = 0; index < candidateDevelopments.length; index++) {
          if (repairIndexes.has(index)) {
            surgicalBases.set(index, candidateDevelopments[index] as SynthesisResult["developments"][number]);
            const fields = scopedEditorialRepairFields(quality, index);
            if (fields) surgicalRepairFields.set(index, fields);
            else surgicalRepairFields.delete(index);
          }
          if (!repairIndexes.has(index) && !lockedDevelopments.has(index)) {
            lockedDevelopments.set(
              index,
              candidateDevelopments[index] as SynthesisResult["developments"][number],
            );
          }
        }
      }
    }
    if (repairIndexes && lockedDevelopments.size > 0 && lockedDevelopments.size < events.length) {
      activeIndexes = [...repairIndexes]
        .filter((index) => !lockedDevelopments.has(index))
        .sort((left, right) => left - right);
    }
    const surgicalIndexes = activeIndexes ?? [];
    const hasSurgicalRepair = surgicalIndexes.length > 0;
    const priorInferenceLabels = previousInferenceLabels;
    previousInferenceLabels = inferenceLabels;
    if (
      attempt < maxAttempts &&
      (qualityFailureCount === 1 ||
        canUseBoundedSecondQualityRepair(qualityFailureCount, quality, bestDevelopmentCount) ||
        canUseLabeledInferenceOnlyRepair(qualityFailureCount, quality, priorInferenceLabels) ||
        canUseFinalEditorialQualityRepair(qualityFailureCount, quality, hasSurgicalRepair) ||
        canUseFinalInferenceQualityRepair(
          qualityFailureCount,
          quality,
          priorInferenceLabels,
          hasSurgicalRepair,
        ) ||
        canUseFinalLifecycleInferenceQualityRepair(qualityFailureCount, quality, surgicalIndexes) ||
        (qualityFailureCount === 2 && hasSurgicalRepair))
    ) {
      correction = hasSurgicalRepair
        ? surgicalQualityCorrection(quality, surgicalIndexes, qualityFailureCount)
        : qualityCorrection(quality, events);
      continue;
    }
    break;
  }

  throw lastError ?? new Error("Synthesis failed after bounded attempts");
}

export async function synthesizeInChunksWithQualityGate(
  events: EventCandidate[],
  records: EvidenceRecord[],
  dependencies: ChunkedSynthesisDependencies,
): Promise<{ synthesis: SynthesisResult; quality: QualityReport }> {
  const developments: SynthesisResult["developments"] = [];
  let chunkNumber = 0;
  let attemptsUsed = 0;
  const totalChunks = Math.ceil(events.length / MAX_SYNTHESIS_EVENTS_PER_TASK);
  const maxTotalAttempts = dependencies.maxTotalAttempts ?? MAX_TOTAL_SYNTHESIS_ATTEMPTS;
  if (
    !Number.isSafeInteger(maxTotalAttempts) ||
    maxTotalAttempts < Math.max(1, totalChunks) ||
    maxTotalAttempts > MAX_TOTAL_SYNTHESIS_ATTEMPTS
  ) {
    throw new Error(
      `Synthesis total attempt budget must be an integer from ${Math.max(1, totalChunks)} to ${MAX_TOTAL_SYNTHESIS_ATTEMPTS}`,
    );
  }

  for (let offset = 0; offset < events.length; offset += MAX_SYNTHESIS_EVENTS_PER_TASK) {
    chunkNumber++;
    const chunkEvents = events.slice(offset, offset + MAX_SYNTHESIS_EVENTS_PER_TASK);
    const remainingChunks = totalChunks - chunkNumber;
    const maxAttemptsForChunk = Math.max(
      1,
      Math.min(MAX_SYNTHESIS_ATTEMPTS, maxTotalAttempts - attemptsUsed - remainingChunks),
    );
    const result = await synthesizeWithQualityGate(
      buildSynthesisPrompt(
        chunkEvents,
        records,
        developments.map((development) => development.title),
      ),
      chunkEvents,
      records,
      {
        invoke: dependencies.invoke,
        parse: dependencies.parse,
        reservedTitles: developments.map((development) => development.title),
        maxAttempts: maxAttemptsForChunk,
        onAttempt: (outcome) => {
          attemptsUsed++;
          dependencies.onAttempt?.(chunkNumber, outcome);
        },
      },
    );
    developments.push(...result.synthesis.developments);
  }

  const synthesis: SynthesisResult = { developments };
  const quality = validateSynthesis(synthesis, events, records);
  if (quality.status !== "pass") {
    throw new SynthesisFailure("quality_gate_failed", safeQualityFailureSummary(quality));
  }
  return { synthesis, quality };
}
