/**
 * Abstract LLM provider interface.
 *
 * All concrete providers must implement this contract so the rest of the
 * codebase can stay provider-agnostic.
 */

export interface LlmCallOptions {
  /** Ask compatible providers to constrain the response to a JSON object. */
  responseFormat?: "json_object";
}

export interface LlmProvider {
  /** Human-readable provider identifier (e.g. "anthropic", "openai"). */
  readonly name: string;
  /** Provider owns transport/rate-limit retries, so callers must not fan out retries. */
  readonly handlesRetries?: boolean;
  /** Send a prompt and return the model's text response. */
  call(prompt: string, maxTokens: number, options?: LlmCallOptions): Promise<string>;
  /** Optional structured diagnostics for logs and job summaries. */
  getDiagnostics?(): LlmProviderDiagnostics;
}

export interface LlmProviderDiagnostics {
  provider: string;
  requests: number;
  retryRequests: number;
  tasksResolved: number;
  tasksRetried: number;
  tasksFailed: number;
  errors: Record<string, number>;
}

/** Factory function that creates an LlmProvider instance. */
export type ProviderFactory = () => LlmProvider;
