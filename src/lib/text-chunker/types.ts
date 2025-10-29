export interface ChunkResult {
  /** The chunked text content */
  content: string;
  /** Estimated token count for this chunk */
  estimatedTokens: number;
  /** 1-based index of this chunk */
  chunkNumber: number;
}

export interface ChunkingConfig {
  /** Maximum tokens allowed per chunk */
  maxTokens: number;
  /** The text to be chunked */
  text: string;
}

export interface ChunkingStats {
  /** Total number of chunks created */
  totalChunks: number;
  /** Estimated tokens in original text */
  originalTokens: number;
  /** Average tokens per chunk */
  averageTokensPerChunk: number;
  /** Largest chunk size in tokens */
  maxChunkTokens: number;
}

/** Boundary types for splitting text, in order of preference */
export type SplitBoundary =
  | "paragraph"
  | "line"
  | "sentence"
  | "word"
  | "character";
