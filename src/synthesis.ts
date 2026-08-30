import {
  buildSynthesisPrompt,
  githubLifecycleState,
  qualifyUnmergedGithubActionClauses,
  synthesisPositiveFields,
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
      /^development \d+: unsupported inference \(ungrounded semantic term [\p{Script=Han}]+\)$/u.test(
        violation,
      ) ||
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

function terminologyCorrections(inferenceLabels: readonly string[]): string[] {
  const labels = new Set(inferenceLabels);
  return [
    ...(labels.has("session adoption mistranslation")
      ? ["session adoption 必须改写为“接入会话”或“采用会话机制”，不得用“采纳会话”。"]
      : []),
    ...(labels.has("snapshot verb mistranslation")
      ? [
          "snapshot 作动词时必须写“将标题快照存入 displayName”或“把标题保存到 displayName”，不得写“快照标题到”。",
        ]
      : []),
    ...(labels.has("binding capture mistranslation")
      ? ["binding capture 必须改写为“采集绑定信息”或“绑定信息采集阶段”，不得写“绑定捕获”。"]
      : []),
    ...(labels.has("oversized mistranslation")
      ? ["oversized JSON 必须改写为“大型 JSON”或“超大 JSON”，不得用“大幅 JSON”。"]
      : []),
    ...(labels.has("UI dissolution mistranslation")
      ? ["UI 分组的 dissolve 必须按语境改写为“解散、折叠或取消分组”，不得用“溶解”。"]
      : []),
    ...(labels.has("session displayName uniqueness contradiction")
      ? ["同名原生标题可以重复保存到 displayName；唯一的是可寻址 label，不得把唯一性转移给 displayName。"]
      : []),
    ...(labels.has("native-thread identity overclaim")
      ? [
          "同名会话修复依靠稳定的 source identity 与分离的 displayName/label 语义，不得声称通过“采用原生线程区分”来消除冲突。",
        ]
      : []),
    ...(labels.has("hook-gateway feature conflation")
      ? ["模型切换钩子与 Claude apps 网关的费用限制是不同功能，不得把网关场景写成钩子能力的适用前提或效果。"]
      : []),
    ...(labels.has("binding-capture capability overclaim")
      ? ["该变更只写为在绑定信息采集阶段保留并重新检查 MCP 工具缓存，不得声称它新增了多服务器并发连接能力。"]
      : []),
    ...(labels.has("hook enforcement mistranslation")
      ? [
          "必须区分钩子是否运行与拒绝结果是否生效：写“钩子已运行，但退出码 2 的拒绝信号被忽略”，不得写“钩子未执行拒绝”。",
        ]
      : []),
    ...(labels.has("absolute workflow failure")
      ? [
          "只描述 evidence 中明确受影响的命令或操作；不得扩大为核心工作流完全无法运行，尤其不能忽略 evidence 里的可用回退路径。",
        ]
      : []),
    ...(labels.has("multi-entity universal coverage conflation")
      ? [
          "只属于单一工具的覆盖数量或比例必须明确归给该工具，不得分摊给工具列表中的其他工具；无法简洁保留各工具数值时，只写“比较覆盖率与失败恢复能力”。",
        ]
      : []),
    ...(labels.has("ungrounded semantic term 免费")
      ? ["证据若写 paid customer，必须写“付费用户”，不得改写为免费用户或免费工具。"]
      : []),
    ...(labels.has("ungrounded semantic term 误删")
      ? ["普通删除窗格不得写成“误删”；只描述删除后分组标题或导航如何变化。"]
      : []),
    ...(labels.has("ungrounded semantic term 重复解析")
      ? ["只写 evidence 支持的预览字段可见性，不得推断模型会重复解析工具结果。"]
      : []),
    ...(labels.has("numeric entity binding mismatch")
      ? ["每个数字必须保留 evidence 中与它直接绑定的实体；不能把家族数写成工件数，不确定时删除数字。"]
      : []),
    ...(labels.has("component metric scope expansion")
      ? ["局部组件指标必须保持原作用域；ID 嵌入表大小不得扩大为整个模型或系统内存。"]
      : []),
    ...(labels.has("unestablished hosted timeout scope") || labels.has("invented configuration dependency")
      ? ["evidence 未确立托管超时根因或明确没有新配置时，删除部署范围、配置依赖和确定因果。"]
      : []),
    ...(labels.has("security training outcome extrapolation")
      ? ["安全训练中的模型降级只写实际使用版本偏离请求，不得推导评估结果或训练偏差。"]
      : []),
    ...(labels.has("restart-safe scope expansion")
      ? ["重启恢复的影响必须限定为已接纳的 restart-safe 运行，不得扩大成所有任务或多轮对话的连续性。"]
      : []),
    ...(labels.has("MCP result-interference extrapolation")
      ? ["MCP 结果扩展只写到达模型前可检查或替换，不得推导无关结果会干扰模型决策。"]
      : []),
    ...(labels.has("session-container scope inversion")
      ? ["同名会话场景是把不同原生会话接入同一智能体，不得写成向同一会话引入多个会话。"]
      : []),
    ...(labels.has("cache coverage contradiction")
      ? ["证据明确是大量已缓存上下文被重复处理，不得改写为缓存未覆盖；直接描述长序列调用和保留上下文。"]
      : []),
    ...(labels.has("cache issue model-switch extrapolation")
      ? ["该用户报告没有模型切换证据；why 只保留长上下文、多轮工具调用和五小时配额风险。"]
      : []),
    ...(labels.has("lazy-import scope mistranslation")
      ? ["只写移除宽泛 agent-runtime 导入，不得声称移除了懒加载模块。"]
      : []),
    ...(labels.has("permission mode-target inversion")
      ? ["丢失的是单轮命令执行收紧覆盖，不是会话权限模式；标题和摘要必须保留 mode 与 override 的关系。"]
      : []),
    ...(labels.has("cron failure-stage conflation")
      ? ["添加时是 JSON 序列化 TypeError，触发时是上下文块规范化失败；不得把两个阶段都写成 TypeError。"]
      : []),
    ...(labels.has("catalog completeness guarantee")
      ? ["只写减少并发等待或缓存过期窗口里的工具遗漏，不得保证全局工具目录完整。"]
      : []),
    ...(labels.has("pane-session entity substitution")
      ? ["删除对象必须保持为活动窗格，不得改写为活跃会话。"]
      : []),
    ...(labels.has("worker-target scope loss")
      ? ["缺少浏览器上下文 ID 的对象必须保留为 Worker 或 Worklet 目标，不得扩大成 Chrome 本身。"]
      : []),
    ...(labels.has("benchmark adoption extrapolation")
      ? ["论文 why 必须写证据中的评测发现或决策价值，不得预测评测社区采纳后的变化。"]
      : []),
    ...(labels.has("release sibling scope drift")
      ? ["标题、摘要和 why 只保留一个核心范围；删除同一发布中的 Codex runtime、TUI 权限等兄弟改动。"]
      : []),
    ...(labels.has("percentage denominator scope loss")
      ? ["百分比必须保留直接分母：ModelAudit 的 100% 只属于 135 个有标签家族，不是 145 个总家族。"]
      : []),
    ...(labels.has("scanner decision coverage-as-accuracy")
      ? ["明确安全判断覆盖率不得写成判定准确率；准确性与判断可用性必须分开。"]
      : []),
    ...(labels.has("scanner coverage unit conflation")
      ? ["明确判断覆盖率的统计单位是有标签样本家族，不得写成 170 个制品上的覆盖率。"]
      : []),
    ...(labels.has("non-comparable timing delta")
      ? ["不得把不同执行阶段的耗时写成前后对比；只比较 evidence 明确给出的同一搜索用例总耗时。"]
      : []),
    ...(labels.has("baseline qualifier loss")
      ? ["无技能基线收益必须保留“多数模型—基准组合”限定，不得写成所有设置都提升。"]
      : []),
    ...(labels.has("multi-day count collapsed")
      ? ["分日统计必须保留每一天的 26、15 和 209 次，不得把最后一天写成总数。"]
      : []),
    ...(labels.has("bounded preview completeness overclaim")
      ? ["有界预览只优先展示受限数量的根级标量字段，不得声称字段更完整。"]
      : []),
    ...(labels.has("startup-restart mistranslation") ? ["startup 译为“启动”，不得写成“重启”。"] : []),
    ...(labels.has("foreground subagent mistranslation")
      ? ["foreground subagent 必须译为“前台子智能体”，不得写成“前台中台”。"]
      : []),
    ...(labels.has("multi-method metric attribution")
      ? ["超过 98% 的 ID 嵌入表缩减只归因于多哈希 ID 嵌入；时序邻居采样属于另一项采样复杂度优化。"]
      : []),
    ...(labels.has("trusted-access response overstatement")
      ? ["来源只说明申请页面提交后无后续并再次提示重试，不得写成三次均未获回复。"]
      : []),
    ...(labels.has("trusted-access workaround overstatement")
      ? ["Trusted Access 申请流程在来源中未成功，不得把手动申请写成可继续使用的解决办法。"]
      : []),
    ...(labels.has("security-training domain mistranslation")
      ? ["security training 必须译为“安全培训”，不得改写为“编程训练”。"]
      : []),
    ...(labels.has("model downgrade config-or-retry advice")
      ? ["来源没有配置或重试能够解决降级的证据；why 只写指定模型任务意外使用旧版本的风险。"]
      : []),
    ...(labels.has("guaranteed outcome claim")
      ? [
          "若 SCOPED_RULES 为该 development 提供正向 why 骨架，必须逐字使用该 why；否则改写为“这会影响【evidence 中的具体对象】的【具体流程或风险】。”title、summary 和 why 均不得使用确保、保证、始终、不会、不再、将保留或得到保障，也不得换用同义结果承诺。",
        ]
      : []),
    ...(labels.has("subjective adequacy claim")
      ? ["删除“合理范围”等主观判断，只保留证据中的实测时间或直接变化。"]
      : []),
  ];
}

function normalizeCjkLatinSpacing(value: string): string {
  return value
    .replace(/([\p{Script=Han}])\s+(?=[\p{Script=Han}])/gu, "$1")
    .replace(/([\p{Script=Han}])([A-Za-z])/gu, "$1 $2")
    .replace(/([A-Za-z])([\p{Script=Han}])/gu, "$1 $2")
    .replace(/([\p{Script=Han}])(\d)/gu, "$1 $2")
    .replace(/(\d)([\p{Script=Han}])/gu, "$1 $2")
    .replace(/%([\p{Script=Han}])/gu, "% $1")
    .replace(/([，。；：！？])\s+/gu, "$1")
    .replace(/[ \t]{2,}/gu, " ")
    .trim();
}

function escapedRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function normalizeUiTerms(value: string, evidenceCorpus = ""): string {
  let normalized = value
    .replace(/@(?:mentions?\b|提及)/giu, "用户提及")
    .replace(/\bbug\b/giu, "缺陷")
    .replace(/缺陷\s+([\p{Script=Han}])/gu, "缺陷$1")
    .replace(/([\p{Script=Han}])\s+用户提及/gu, "$1用户提及")
    .replace(/用户提及\s+([\p{Script=Han}])/gu, "用户提及$1")
    .replace(/单\s+Agent\s*任务/gu, "单智能体任务")
    .replace(/\s*reasoning effort:\s*medium/giu, "推理强度为中等")
    .replace(/耗尽\s+(\d+(?:\.\d+)?)%\s+(\d+\s*小时配额)/gu, "消耗 $2的 $1%")
    .replace(/使用安全门禁项目的开发者/gu, "依赖安全门禁的项目开发者");
  if (/\badmitted turns?\b/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/安全对话/gu, "已接纳轮次");
  }
  if (/\bOpenAI Codex\b/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/用户报告\s+Code\s+在/gu, "用户报告 Codex 在");
  }
  if (/extensions? can (?:now )?inspect or replace MCP tool results?/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(
      /^OpenAI Codex 0\.151\.0 新增 MCP 结果预置$/u,
      "OpenAI Codex 0.151.0 开放 MCP 结果处理",
    );
  }
  if (/\bPaid customer here\b/iu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/^付费用户在/u, "有付费用户报告其在")
      .replace(/^付费用户报告/u, "有付费用户报告");
  }
  if (
    /\bPaid customer\b/iu.test(evidenceCorpus) &&
    /This content can't be shown/iu.test(evidenceCorpus) &&
    /cybersecurity warning/iu.test(evidenceCorpus)
  ) {
    normalized = normalized.replace(/网络安全警告弹窗/gu, "网络安全警告提示");
  }
  if (/\boversized JSON\b/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/\boversized\s+JSON\b/giu, "大型 JSON");
  }
  if (/foreground subagent's tool calls and results/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/前台中台/gu, "前台子智能体");
  }
  if (/PreModelSwitch.{0,80}PostModelSwitch.{0,80}hook events/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/模型切换回调/gu, "模型切换钩子");
  }
  if (/PreToolUse.{0,160}(?:exit code\s*2|exit\s*2)/isu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/\bexit code\s*2\b/giu, "退出码 2")
      .replace(/\bexit\s*2\b/giu, "退出码 2")
      .replace(/\bexit\b/giu, "退出")
      .replace(/\bhooks?\b/giu, "钩子");
  }
  if (/nested[- ]quote corruption/iu.test(evidenceCorpus) && /\bexec_command\b/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/\bexec\s+command\b/giu, "命令执行").replace(/\bexec\b/giu, "命令执行");
  }
  if (
    /nested[- ]quote corruption/iu.test(evidenceCorpus) &&
    /\b(?:PowerShell|pwsh)\b/iu.test(evidenceCorpus)
  ) {
    normalized = normalized
      .replace(/Windows 下命令执行/gu, "Windows 下 PowerShell 命令执行")
      .replace(/执行复杂命令/gu, "执行复杂 PowerShell 命令");
  }
  if (/\brestart-safe runs?\b/iu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/restart-safe\s*任务/giu, "可安全重启的运行")
      .replace(/restart-safe/giu, "可安全重启");
  }
  if (
    /\bpane groups?\b/iu.test(evidenceCorpus) &&
    /(?:custom title|named pane groups?)/iu.test(evidenceCorpus)
  ) {
    normalized = normalized
      .replace(/面板组重命名丢失问题/gu, "窗格组自定义标题丢失问题")
      .replace(/面板组/gu, "窗格组")
      .replace(/面板/gu, "窗格");
  }
  if (/\borigin metadata\b/iu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/原信息/gu, "来源元数据")
      .replace(/引用或提及上下文创建的提醒可降低/gu, "在包含引用或用户提及的上下文中创建提醒时可降低")
      .replace(
        /针对引用或用户提及上下文创建定时任务的提醒可降低/gu,
        "在包含引用或用户提及的上下文中创建提醒时可降低",
      );
  }
  if (
    /\bOpenClaw\b/iu.test(evidenceCorpus) &&
    /worker targets? no longer crash the gateway|worker.{0,40}without a browser context ID/iu.test(
      evidenceCorpus,
    )
  ) {
    normalized = normalized.replace(/^后台工作器目标崩溃修复提案$/u, "OpenClaw 后台工作器目标崩溃修复提案");
  }
  if (/\bOperators\b/iu.test(evidenceCorpus) && /attached Chrome profile/iu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/浏览器操作符/gu, "浏览器运维人员")
      .replace(/\bOperators?\b/giu, "运维人员");
  }
  const execToolCallCount = evidenceCorpus.match(/\bexec tool calls?\s*\|\s*(\d+)\b/iu)?.[1];
  if (execToolCallCount) {
    normalized = normalized.replace(
      new RegExp(`${escapedRegex(execToolCallCount)}\\s*轮执行`, "gu"),
      `${execToolCallCount} 次命令执行调用`,
    );
  }
  if (/\bmoded sessions?\b|permission modes?/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/模式化会话/gu, "已设置权限模式的会话");
  }
  if (/experience.{0,80}scattered|fragmented/iu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/解决(.{0,36}经验碎片化)/gu, "缓解$1")
      .replace(/智能体团队/gu, "智能体系统");
  }
  if (/catalog.{0,80}(?:published|expire)|published.{0,80}catalog/iu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/已在等待期间发布的服务/gu, "等待期间发布的工具目录")
      .replace(/提升多服务器环境稳定性/gu, "减少工具遗漏和不必要的服务器启动");
  }
  if (/represent nested containers by shape only/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/隐藏嵌套容器结构/gu, "以结构形状概括嵌套容器");
  }
  if (/personal GitHub marketplace|personal marketplace/iu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/个人\s+GitHub\s+marketplace/giu, "GitHub 个人市场")
      .replace(/准确版本信息/gu, "更新后的个人市场内容");
  }
  if (/security training/iu.test(evidenceCorpus) && /demot(?:e|ed|es|ing)/iu.test(evidenceCorpus)) {
    normalized = normalized
      .replace(/避免训练偏差/gu, "减少意外模型降级对安全训练输出的影响")
      .replace(/\bopus\s+4\.8\b/giu, "Opus 4.8");
  }
  if (/hack attempt|cybersecurity requests?/iu.test(evidenceCorpus)) {
    normalized = normalized.replace(/将常规操作误判为。/gu, "将常规代码审查误判为网络安全攻击请求。");
  }
  const versionRange = normalized.match(/\b(v?\d+(?:\.\d+){1,3})\s*至\s*(v?\d+(?:\.\d+){1,3})\b/iu);
  if (versionRange) {
    const left = versionRange[1]!;
    const right = versionRange[2]!;
    const explicitRange = new RegExp(
      `${escapedRegex(left)}\\s*(?:-|–|—|to|through|至|到)\\s*${escapedRegex(right)}`,
      "iu",
    );
    if (!explicitRange.test(evidenceCorpus)) {
      normalized = normalized.replace(versionRange[0], `${left} 和 ${right}`);
    }
  }
  return normalized;
}

function normalizeSummaryStyle(value: string): string {
  const spaced = normalizeCjkLatinSpacing(value)
    .replace(/([\p{Script=Han}])(\d+(?:\.\d+)?%)/gu, "$1 $2")
    .replace(/,(?=\D|$)/gu, "，")
    .replace(/([A-Za-z][A-Za-z0-9._+-]*)、(?=[A-Za-z][A-Za-z0-9._+-]*)/gu, "$1，")
    .replace(/，{2,}/gu, "，")
    .replace(/\s+$/u, "");
  return spaced.endsWith("。") ? spaced : `${spaced}。`;
}

function normalizeWhyStyle(value: string): string {
  const normalized = normalizeCjkLatinSpacing(value)
    .replace(/,(?=\D|$)/gu, "，")
    .replace(/[，\s]+$/u, "");
  return normalized.endsWith("。") ? normalized : `${normalized}。`;
}

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

function eventGithubLifecycleState(event: EventCandidate, records: EvidenceRecord[]) {
  const sourceIds = new Set(event.sourceIds);
  return githubLifecycleState(records.filter((record) => sourceIds.has(record.id)));
}

function normalizeUnmergedPullRequestLanguage(
  value: string,
  event: EventCandidate,
  records: EvidenceRecord[],
  field: "title" | "summary" | "why_it_matters",
): string {
  const state = eventGithubLifecycleState(event, records);
  if (state !== "open" && state !== "closed_unmerged") return value;
  let normalized = value
    .replace(/已(?:经)?合并(?:了)?/gu, "尚未合并")
    .replace(
      /已(?:经)?(修复|新增|增加|添加|引入|更新|移除|删除|实现|支持|防止|解决|消除|修正|处理|根治|改进|优化|调整|部署|上线|启用|发布|交付|推出|完成|开发(?!者)|落地)(?:了)?/gu,
      "拟$1",
    )
    .replace(
      /(修复|新增|增加|添加|引入|更新|移除|删除|实现|支持|防止|解决|消除|修正|处理|根治|改进|优化|调整|部署|上线|启用|发布|交付|推出|完成|开发(?!者)|合并|落地)了/gu,
      "尝试$1",
    );
  if (field === "why_it_matters" && state === "open") {
    normalized = normalized
      .replace(/^(?:若|如|一旦)[^，,。]{0,24}(?:合并|落地|采纳|实施)[，,]\s*/u, "若合并，")
      .replace(/^若合并，[\s]*(?:若|如|一旦)[^，,。]{0,24}(?:合并|落地|采纳|实施)[，,]\s*/u, "若合并，")
      .replace(
        /^若合并，((?:该|这)(?:项)?(?:修复|提案|方案|提议|改动|变更))?(?:若|如|一旦)[^，,。]{0,16}(?:合并|落地|采纳|实施)\s*/u,
        "若合并，$1",
      );
  }
  if (field === "title" || field === "summary") {
    normalized = qualifyUnmergedGithubActionClauses(normalized);
  }
  if (
    field === "why_it_matters" &&
    state === "open" &&
    !/^(?:若合并|如落地|一旦采纳)[，,]/u.test(normalized)
  ) {
    normalized = `若合并，${normalized}`;
  }
  if (
    field === "summary" &&
    state === "closed_unmerged" &&
    !(/关闭/u.test(normalized) && /未合并/u.test(normalized))
  ) {
    normalized = `${normalized.replace(/。+$/u, "")}，现已关闭且未合并`;
  }
  return normalized;
}

function withTrustedSourceIds(
  candidate: unknown,
  events: EventCandidate[],
  records: EvidenceRecord[],
): { candidate: unknown; normalizationsApplied: string[] } {
  const normalizationsApplied: string[] = [];
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { candidate, normalizationsApplied };
  }
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) return { candidate, normalizationsApplied };
  const normalizedCandidate = {
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
      const normalizedFields: Record<string, string> = {};
      for (const field of ["title", "summary", "why_it_matters"] as const) {
        const value = (development as Record<string, unknown>)[field];
        if (typeof value !== "string") continue;
        const lifecycleSafeValue = normalizeUnmergedPullRequestLanguage(value, event, records, field);
        if (lifecycleSafeValue !== value) normalizationsApplied.push(`${index}:${field}_lifecycle`);
        const evidenceCorpus = event.sourceIds
          .map((sourceId) => records.find((record) => record.id === sourceId))
          .filter(Boolean)
          .map((record) => `${record!.title}\n${record!.content}`)
          .join("\n");
        const uiTermSafeValue = normalizeUiTerms(lifecycleSafeValue, evidenceCorpus);
        if (uiTermSafeValue !== lifecycleSafeValue) {
          normalizationsApplied.push(`${index}:${field}_ui_term`);
        }
        if (field === "summary") {
          const normalized = normalizeSummaryStyle(uiTermSafeValue);
          if (normalized !== uiTermSafeValue) normalizationsApplied.push(`${index}:summary_style`);
          normalizedFields[field] = normalized;
          continue;
        }
        if (field === "why_it_matters") {
          const normalized = normalizeWhyStyle(uiTermSafeValue);
          if (normalized !== uiTermSafeValue) normalizationsApplied.push(`${index}:why_style`);
          normalizedFields[field] = normalized;
          continue;
        }
        const normalized = normalizeCjkLatinSpacing(uiTermSafeValue);
        if (normalized !== uiTermSafeValue) normalizationsApplied.push(`${index}:title_spacing`);
        normalizedFields[field] = normalized;
      }
      const finalizedFields = { ...normalizedFields };
      if (typeof finalizedFields["title"] === "string" && typeof finalizedFields["summary"] === "string") {
        const scopeSafeTitle = finalizedFields["title"]
          .replace(
            /与成本统计/gu,
            /(?:成本|费用|配额|缓存命中)/u.test(finalizedFields["summary"]) ? "与成本统计" : "",
          )
          .replace(
            /与安装可靠性/gu,
            /(?:安装|Node|RPM|Linux)/iu.test(finalizedFields["summary"]) ? "与安装可靠性" : "",
          );
        if (scopeSafeTitle !== finalizedFields["title"]) {
          normalizationsApplied.push(`${index}:title_scope`);
          finalizedFields["title"] = scopeSafeTitle;
        }
      }
      if (
        typeof finalizedFields["title"] === "string" &&
        typeof finalizedFields["why_it_matters"] === "string" &&
        /自定义标题/u.test(finalizedFields["title"])
      ) {
        const alignedWhy = finalizedFields["why_it_matters"].replace(
          /用户删除活动窗格后可保留原会话上下文，避免跳至无关对话。/u,
          "用户删除窗格后仍可识别原有命名分组，避免自定义标题丢失。",
        );
        if (alignedWhy !== finalizedFields["why_it_matters"]) {
          normalizationsApplied.push(`${index}:why_evidence_alignment`);
          finalizedFields["why_it_matters"] = alignedWhy;
        }
      }
      return {
        ...(development as Record<string, unknown>),
        ...finalizedFields,
        source_ids: synthesisSourceIds(event, records),
      };
    }),
  };
  return { candidate: normalizedCandidate, normalizationsApplied };
}

function withScopedCanonicalFields(
  candidate: unknown,
  events: EventCandidate[],
  records: EvidenceRecord[],
): { candidate: unknown; normalizationsApplied: string[] } {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { candidate, normalizationsApplied: [] };
  }
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) return { candidate, normalizationsApplied: [] };

  const normalizationsApplied: string[] = [];
  const developments = root["developments"].map((development, index) => {
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
    const fields = synthesisPositiveFields(event, records);
    if (!fields) return development;
    const record = development as Record<string, unknown>;
    if (
      record["title"] === fields.title &&
      record["summary"] === fields.summary &&
      record["why_it_matters"] === fields.why_it_matters
    ) {
      return development;
    }
    normalizationsApplied.push(`${index}:canonical_fields`);
    return { ...record, ...fields };
  });
  return {
    candidate: normalizationsApplied.length > 0 ? { ...root, developments } : candidate,
    normalizationsApplied,
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

function withScopedSummaryHints(
  candidate: unknown,
  quality: QualityReport,
  events: EventCandidate[],
  records: EvidenceRecord[],
): { candidate: unknown; normalizationsApplied: string[] } {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { candidate, normalizationsApplied: [] };
  }
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) return { candidate, normalizationsApplied: [] };
  const repairIndexes = new Set([
    ...safeEditorialLabels(quality).flatMap((label) => {
      const match = label.match(
        /^(\d+):(?:summary_too_many_actions|summary_too_many_facts|summary_declares_many_facts)$/u,
      );
      return match ? [Number(match[1])] : [];
    }),
    ...safeIndexedInferenceLabels(quality).flatMap(({ index, label }) =>
      [
        "release sibling scope drift",
        "scanner decision coverage-as-accuracy",
        "scanner coverage unit conflation",
        "non-comparable timing delta",
        "baseline qualifier loss",
        "multi-day count collapsed",
        "guaranteed outcome claim",
        "multi-method metric attribution",
        "trusted-access response overstatement",
        "security-training domain mistranslation",
      ].includes(label)
        ? [index]
        : [],
    ),
  ]);
  if (repairIndexes.size === 0) return { candidate, normalizationsApplied: [] };

  const normalizationsApplied: string[] = [];
  const developments = root["developments"].map((development, index) => {
    if (!repairIndexes.has(index) || !events[index]) return development;
    const fields = synthesisPositiveFields(events[index], records);
    if (!fields || !development || typeof development !== "object" || Array.isArray(development)) {
      return development;
    }
    const record = development as Record<string, unknown>;
    if (record["summary"] === fields.summary) return development;
    normalizationsApplied.push(`${index}:summary_scoped_hint`);
    return { ...record, summary: fields.summary };
  });
  return {
    candidate: normalizationsApplied.length > 0 ? { ...root, developments } : candidate,
    normalizationsApplied,
  };
}

function withScopedTitleHints(
  candidate: unknown,
  quality: QualityReport,
  events: EventCandidate[],
  records: EvidenceRecord[],
): { candidate: unknown; normalizationsApplied: string[] } {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { candidate, normalizationsApplied: [] };
  }
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) return { candidate, normalizationsApplied: [] };
  const repairIndexes = new Set(
    safeEditorialLabels(quality).flatMap((label) => {
      const match = label.match(/^(\d+):title_too_long$/u);
      return match ? [Number(match[1])] : [];
    }),
  );
  if (repairIndexes.size === 0) return { candidate, normalizationsApplied: [] };

  const normalizationsApplied: string[] = [];
  const developments = root["developments"].map((development, index) => {
    if (!repairIndexes.has(index) || !events[index]) return development;
    const fields = synthesisPositiveFields(events[index], records);
    if (!fields || !development || typeof development !== "object" || Array.isArray(development)) {
      return development;
    }
    const record = development as Record<string, unknown>;
    if (record["title"] === fields.title) return development;
    normalizationsApplied.push(`${index}:title_scoped_hint`);
    return { ...record, title: fields.title };
  });
  return {
    candidate: normalizationsApplied.length > 0 ? { ...root, developments } : candidate,
    normalizationsApplied,
  };
}

function withScopedLifecycleHints(
  candidate: unknown,
  quality: QualityReport,
  events: EventCandidate[],
  records: EvidenceRecord[],
): { candidate: unknown; normalizationsApplied: string[] } {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    return { candidate, normalizationsApplied: [] };
  }
  const root = candidate as Record<string, unknown>;
  if (!Array.isArray(root["developments"])) return { candidate, normalizationsApplied: [] };
  const repairIndexes = new Set([
    ...whyImpactRepairIndexes(safeEditorialLabels(quality)),
    ...quality.violations.flatMap((violation) => {
      const match = violation.match(/^development (\d+): (?:thin )?issue impact must remain conditional$/u);
      return match ? [Number(match[1])] : [];
    }),
    ...safeIndexedInferenceLabels(quality).flatMap(({ index, label }) =>
      [
        "guaranteed outcome claim",
        "baseline qualifier loss",
        "bounded preview completeness overclaim",
        "cache issue model-switch extrapolation",
        "trusted-access workaround overstatement",
        "model downgrade config-or-retry advice",
      ].includes(label)
        ? [index]
        : [],
    ),
  ]);
  if (repairIndexes.size === 0) return { candidate, normalizationsApplied: [] };

  const normalizationsApplied: string[] = [];
  const developments = root["developments"].map((development, index) => {
    if (!repairIndexes.has(index) || !events[index]) return development;
    const fields = synthesisPositiveFields(events[index], records);
    if (!fields || !development || typeof development !== "object" || Array.isArray(development)) {
      return development;
    }
    const record = development as Record<string, unknown>;
    if (record["why_it_matters"] === fields.why_it_matters) return development;
    normalizationsApplied.push(`${index}:why_scoped_hint`);
    return { ...record, why_it_matters: fields.why_it_matters };
  });
  return {
    candidate: normalizationsApplied.length > 0 ? { ...root, developments } : candidate,
    normalizationsApplied,
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

function qualityCorrection(quality: QualityReport, events: EventCandidate[]): string {
  const mechanicalDetails = safeMechanicalCorrectionDetails(quality);
  const lexicalDetails = safeLexicalCorrectionDetails(quality);
  const editorialActionDetails = safeEditorialActionDetails(quality);
  const editorialFactDetails = safeEditorialFactDetails(quality);
  const danglingWhyDetails = safeDanglingWhyDetails(quality);
  const untranslatedActionDetails = safeUntranslatedActionDetails(quality);
  const inferenceLabels = safeInferenceLabels(quality);
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
                "若 SCOPED_RULES 为该 development 提供正向 summary 骨架，必须逐字使用该 summary；否则从零重写。",
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
      ? [
          "必须删除无证据推断：单条 issue/PR 只能写用户报告、反馈或提议，不能写揭示/暴露普遍问题、从根源解决、确保/始终/终于/不会/不再/将保留/得到保障、显著改善、公司排名、路线图或即将发布；session adoption 不得译为“采纳会话”，binding capture 不得译为“绑定捕获”，oversized 不得译为“大幅”；能耗、日志清洗、多图、缓存原因、命令注入、跨平台和重构等语义必须在该条 evidence 原文中出现。",
          ...(inferenceLabels.length > 0
            ? [
                `本轮命中的固定推断类别：${JSON.stringify(inferenceLabels)}。逐项修正对应推断或术语，不得换成另一个绝对、保证性或错误直译说法。`,
                ...terminologyCorrections(inferenceLabels),
              ]
            : []),
        ]
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
  const inferenceLabels = safeInferenceLabels(quality);
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
                `动作计数命中：${JSON.stringify(editorialActionDetails)}。若 SCOPED_RULES 为该 development 提供正向 summary 骨架，必须逐字使用该 summary；否则从零重写。最多保留两项最核心且有证据的动作事实；其余命中词及其从句必须删除，不得只改其他字段或用同义动作规避计数。`,
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
    ...(failedChecks.includes("unsupported_inference")
      ? [
          "删除无 evidence 支持的泛化、保证、根治、终于、不会、不再、将保留、显著改善、公司排名、路线图和即将发布推断；session adoption 不得译为“采纳会话”，binding capture 不得译为“绑定捕获”，oversized 不得译为“大幅”；issue 只写报告/反馈，PR 只写提议或已验证的合并状态。",
          ...(inferenceLabels.length > 0
            ? [
                `固定推断类别：${JSON.stringify(inferenceLabels)}。逐项修正，不能换成同义推断或错误直译。`,
                ...terminologyCorrections(inferenceLabels),
              ]
            : []),
        ]
      : []),
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
  const indexed = [...bans.entries()]
    .flatMap(([globalIndex, labels]) => {
      const localIndex = globalToLocal ? globalToLocal.get(globalIndex) : globalIndex;
      if (localIndex === undefined || labels.size === 0) return [];
      return [{ localIndex, labels: [...labels].sort() }];
    })
    .sort((left, right) => left.localIndex - right.localIndex)
    .slice(0, 32);
  if (indexed.length === 0) return "";
  const labels = [...new Set(indexed.flatMap((entry) => entry.labels))];
  return [
    "",
    "持续关系禁令：这些当前条目曾命中的受支持推断类别不得在后续修复中重新出现：",
    ...indexed.map((entry) => `development ${entry.localIndex}: ${entry.labels.join(",")}`),
    ...terminologyCorrections(labels),
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

    const canonicalCandidate = withScopedCanonicalFields(candidate, activeEvents, records);
    const trustedCandidate = withTrustedSourceIds(canonicalCandidate.candidate, activeEvents, records);
    candidate = trustedCandidate.candidate;
    const rawNormalizations = [
      ...canonicalCandidate.normalizationsApplied,
      ...trustedCandidate.normalizationsApplied,
    ];
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
    if (quality.status !== "pass") {
      const normalized = withScopedSummaryHints(candidate, quality, events, records);
      if (normalized.normalizationsApplied.length > 0) {
        candidate = normalized.candidate;
        normalizationsApplied.push(...normalized.normalizationsApplied);
        quality = validateSynthesis(candidate, events, records, {
          reservedTitles: dependencies.reservedTitles,
        });
      }
    }
    if (quality.status !== "pass") {
      const normalized = withScopedTitleHints(candidate, quality, events, records);
      if (normalized.normalizationsApplied.length > 0) {
        candidate = normalized.candidate;
        normalizationsApplied.push(...normalized.normalizationsApplied);
        quality = validateSynthesis(candidate, events, records, {
          reservedTitles: dependencies.reservedTitles,
        });
      }
    }
    if (quality.status !== "pass") {
      const normalized = withScopedLifecycleHints(candidate, quality, events, records);
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
