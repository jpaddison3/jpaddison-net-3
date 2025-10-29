"use client";

import { useState, useEffect } from "react";
import { estimateTokens } from "~/lib/text-chunker/tokenEstimation";
import { chunkText } from "~/lib/text-chunker/chunker";
import type { ChunkResult, ChunkingStats } from "~/lib/text-chunker/types";
import { Button, Card, CardContent } from "~/components/ui";
import { createLogger } from "~/lib/logger";

const logger = createLogger("TEXT_CHUNKER");
const TOKEN_LIMIT_STORAGE_KEY = "textChunker.tokenLimit";

export default function TextChunkerPage() {
  const [tokenLimitInput, setTokenLimitInput] = useState("100000");
  const [inputText, setInputText] = useState("");
  const [chunks, setChunks] = useState<ChunkResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isTokenLimitFocused, setIsTokenLimitFocused] = useState(false);

  // Load token limit from localStorage on mount
  useEffect(() => {
    const savedLimit = localStorage.getItem(TOKEN_LIMIT_STORAGE_KEY);
    if (savedLimit) {
      setTokenLimitInput(savedLimit);
    }
  }, []);

  // Save token limit to localStorage when it changes
  useEffect(() => {
    if (tokenLimitInput) {
      localStorage.setItem(TOKEN_LIMIT_STORAGE_KEY, tokenLimitInput);
    }
  }, [tokenLimitInput]);

  const tokenLimit = Number(tokenLimitInput) || 0;
  const estimatedTokens = estimateTokens(inputText);
  const estimatedChunks =
    inputText.trim() && tokenLimit > 0
      ? Math.ceil(estimatedTokens / tokenLimit)
      : 0;

  const hasTokenLimitError = tokenLimitInput !== "" && tokenLimit <= 0;

  const tokenLimitDisplayValue = isTokenLimitFocused
    ? tokenLimitInput
    : tokenLimit > 0
      ? tokenLimit.toLocaleString()
      : tokenLimitInput;

  const handleChunk = () => {
    if (!inputText.trim() || tokenLimit <= 0) {
      return;
    }

    const result = chunkText({
      text: inputText,
      maxTokens: tokenLimit,
    });

    setChunks(result);
  };

  const handleCopy = async (content: string, chunkNumber: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(chunkNumber);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      logger.error("Failed to copy chunk to clipboard", {
        chunkNumber,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const stats: ChunkingStats | null =
    chunks.length > 0
      ? {
          totalChunks: chunks.length,
          originalTokens: estimateTokens(inputText),
          averageTokensPerChunk: Math.round(
            chunks.reduce((sum, chunk) => sum + chunk.estimatedTokens, 0) /
              chunks.length,
          ),
          maxChunkTokens: Math.max(
            ...chunks.map((chunk) => chunk.estimatedTokens),
          ),
        }
      : null;

  return (
    <main className="min-h-screen bg-gray-50 font-serif">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h1 className="mb-2 font-sans text-2xl font-bold text-gray-800">
            Text Chunker
          </h1>
          <p className="mb-6 text-gray-600">
            Split large texts into smaller chunks based on token limits
          </p>

          <div className="space-y-6">
            {/* Token Limit Input */}
            <div>
              <label
                htmlFor="tokenLimit"
                className="block text-sm font-medium text-gray-700"
              >
                Maximum tokens per chunk
              </label>
              <input
                id="tokenLimit"
                type="text"
                inputMode="numeric"
                min="1"
                value={tokenLimitDisplayValue}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, "");
                  if (value === "" || /^\d+$/.test(value)) {
                    setTokenLimitInput(value);
                  }
                }}
                onFocus={() => setIsTokenLimitFocused(true)}
                onBlur={() => setIsTokenLimitFocused(false)}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-1 focus:outline-none ${
                  hasTokenLimitError
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
              {hasTokenLimitError && (
                <p className="mt-1 text-sm text-red-600">
                  Token limit must be a positive number
                </p>
              )}
            </div>

            {/* Text Input */}
            <div>
              <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label
                  htmlFor="inputText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Text to chunk
                </label>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600 sm:gap-4">
                  <span>
                    Estimated tokens: {estimatedTokens.toLocaleString()}
                  </span>
                  {estimatedChunks > 0 && (
                    <span>
                      Estimated chunks: {estimatedChunks.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <textarea
                id="inputText"
                rows={12}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="Paste your large text here (documentation, articles, prompts, etc.) and it will be intelligently split into smaller chunks that fit within your token limit. Each chunk will respect natural boundaries like paragraphs and sentences."
              />
            </div>

            {/* Chunk Button */}
            <div>
              <Button
                onClick={handleChunk}
                variant="primary"
                disabled={!inputText.trim() || tokenLimit <= 0}
              >
                Chunk Text
              </Button>
            </div>

            {/* Results */}
            {chunks.length > 0 && stats && (
              <div className="border-t pt-6">
                <h2 className="mb-4 font-sans text-lg font-semibold text-gray-800">
                  Results
                </h2>

                {/* Summary Statistics */}
                <Card variant="outlined" padding="md" className="mb-6">
                  <div className="mb-2">
                    <h3 className="font-sans text-lg font-semibold text-gray-800">
                      Summary
                    </h3>
                  </div>
                  <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="font-medium text-gray-700">
                        Total chunks
                      </dt>
                      <dd className="mt-1 text-gray-600">
                        {stats.totalChunks.toLocaleString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700">
                        Original tokens
                      </dt>
                      <dd className="mt-1 text-gray-600">
                        {stats.originalTokens.toLocaleString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700">
                        Largest chunk
                      </dt>
                      <dd className="mt-1 text-gray-600">
                        {stats.maxChunkTokens.toLocaleString()} tokens
                      </dd>
                    </div>
                  </dl>
                </Card>

                {/* Chunks */}
                <div className="space-y-4">
                  {chunks.map((chunk) => (
                    <Card
                      key={chunk.chunkNumber}
                      variant="default"
                      padding="md"
                    >
                      <div className="mb-4 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            Chunk {chunk.chunkNumber}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {chunk.estimatedTokens.toLocaleString()} tokens
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button
                            size="sm"
                            variant={
                              copiedIndex === chunk.chunkNumber
                                ? "success"
                                : "outline"
                            }
                            onClick={() =>
                              handleCopy(chunk.content, chunk.chunkNumber)
                            }
                          >
                            {copiedIndex === chunk.chunkNumber
                              ? "Copied!"
                              : "Copy"}
                          </Button>
                        </div>
                      </div>
                      <CardContent>
                        <pre className="max-h-96 overflow-auto rounded bg-gray-50 p-4 font-mono text-xs break-words whitespace-pre-wrap text-gray-700">
                          {chunk.content}
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {chunks.length === 0 && inputText.trim() === "" && (
              <div className="border-t pt-6">
                <Card
                  variant="flat"
                  padding="lg"
                  className="bg-gray-50 text-center"
                >
                  <p className="mb-2 text-gray-600">
                    Paste your text above and click "Chunk Text" to split it
                    into smaller pieces based on your token limit.
                  </p>
                  <p className="text-sm text-gray-500">
                    Chunking done in-browser — nothing leaves your computer.
                  </p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
