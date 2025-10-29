import { estimateTokens } from "./tokenEstimation";
import type { ChunkResult, ChunkingConfig } from "./types";

/**
 * Finds the best boundary to split text at, searching backwards from a position.
 * Returns the index of where to split, or -1 if no suitable boundary found.
 */
function findBestSplitPoint(
  text: string,
  maxPosition: number,
  searchDistance: number,
): number {
  const minPosition = Math.max(0, maxPosition - searchDistance);

  // Priority 1: Double newline (paragraph break)
  for (let i = maxPosition; i >= minPosition; i--) {
    if (text[i] === "\n" && text[i - 1] === "\n") {
      return i + 1; // Split after the double newline
    }
  }

  // Priority 2: Single newline (line break)
  for (let i = maxPosition; i >= minPosition; i--) {
    if (text[i] === "\n") {
      return i + 1; // Split after the newline
    }
  }

  // Priority 3: Period followed by space (sentence boundary)
  for (let i = maxPosition; i >= minPosition; i--) {
    if (text[i] === "." && text[i + 1] === " ") {
      return i + 1; // Split after the period
    }
  }

  // Priority 4: Space (word boundary)
  for (let i = maxPosition; i >= minPosition; i--) {
    if (text[i] === " ") {
      return i + 1; // Split after the space
    }
  }

  // No good boundary found
  return -1;
}

/**
 * Chunks text into smaller pieces based on a token limit.
 * Uses priority-based splitting to preserve semantic boundaries.
 * Applies a 5% buffer to account for estimation imprecision.
 */
export function chunkText(config: ChunkingConfig): ChunkResult[] {
  const { text, maxTokens } = config;

  // Handle empty input
  if (!text.trim()) {
    return [];
  }

  const chunks: ChunkResult[] = [];
  let currentPosition = 0;
  let chunkNumber = 1;

  // Convert token limit to approximate character limit
  // Apply 5% buffer to stay safely under the limit
  const maxChars = Math.floor(maxTokens * 0.95 * 4);
  // Search distance: 10% of max chars
  const searchDistance = Math.floor(maxChars * 0.1);

  while (currentPosition < text.length) {
    const remainingText = text.length - currentPosition;

    // If remaining text fits in one chunk, take it all
    if (remainingText <= maxChars) {
      const content = text.slice(currentPosition).trim();
      chunks.push({
        content,
        estimatedTokens: estimateTokens(content),
        chunkNumber,
      });
      break;
    }

    // Find the best split point
    const idealEndPosition = currentPosition + maxChars;
    const splitPoint = findBestSplitPoint(
      text,
      idealEndPosition,
      searchDistance,
    );

    let endPosition: number;

    if (splitPoint !== -1) {
      // Found a good boundary
      endPosition = splitPoint;
    } else {
      // No good boundary found in search distance
      // Search for any space at all up to maxChars
      let lastSpace = -1;
      for (let i = idealEndPosition; i > currentPosition; i--) {
        if (text[i] === " ") {
          lastSpace = i + 1;
          break;
        }
      }

      if (lastSpace !== -1) {
        endPosition = lastSpace;
      } else {
        // No space found at all - split at character boundary (edge case)
        endPosition = idealEndPosition;
      }
    }

    const content = text.slice(currentPosition, endPosition).trim();
    chunks.push({
      content,
      estimatedTokens: estimateTokens(content),
      chunkNumber,
    });

    currentPosition = endPosition;
    chunkNumber++;
  }

  return chunks;
}
