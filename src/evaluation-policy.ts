export const FORMAL_EVALUATION_CLEAN_RUNS = 3;
export const MAX_EVALUATION_REPLACEMENT_RUNS = 2;
export const MAX_EVALUATION_SYNTHESIS_ATTEMPTS = 24;
export const MAX_QUALITY_REPAIR_ATTEMPTS_PER_RUN = 2;
export const MAX_TOTAL_QUALITY_REPAIR_ATTEMPTS = 4;
export const MIN_FORMAL_FIRST_PASS_RUNS = 1;

export const EVALUATION_NORMALIZATION_CODES = new Set(["summary_punctuation"]);
export const EVALUATION_REPAIR_NORMALIZATION_CODES = new Set(["summary_punctuation"]);
export const FORBIDDEN_STORED_ANSWER_NORMALIZATION_CODES = new Set([
  "canonical_fields",
  "summary_scoped_hint",
  "title_scoped_hint",
  "why_scoped_hint",
]);

export function evaluationNormalizationCode(label: string): string | undefined {
  return label.match(/^\d+:([a-z_]+)$/u)?.[1];
}

export function isEvaluationRepairNormalization(label: string): boolean {
  const code = evaluationNormalizationCode(label);
  return code !== undefined && EVALUATION_REPAIR_NORMALIZATION_CODES.has(code);
}

export function isForbiddenStoredAnswerNormalization(label: string): boolean {
  const code = evaluationNormalizationCode(label);
  return code !== undefined && FORBIDDEN_STORED_ANSWER_NORMALIZATION_CODES.has(code);
}
