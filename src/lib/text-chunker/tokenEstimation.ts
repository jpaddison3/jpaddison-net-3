/**
 * Estimates the number of tokens in a text using a character-to-token heuristic.
 *
 * Uses the rule of thumb: ~4 characters = 1 token for English text.
 * This is approximate but sufficient for planning purposes.
 *
 * @param text - The text to estimate tokens for
 * @returns The estimated number of tokens
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
