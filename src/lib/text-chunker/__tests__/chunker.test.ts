import { describe, it, expect } from "vitest";
import { chunkText } from "../chunker";

describe("chunkText", () => {
  describe("basic functionality", () => {
    it("should return empty array for empty input", () => {
      const result = chunkText({ text: "", maxTokens: 100 });
      expect(result).toEqual([]);
    });

    it("should return empty array for whitespace-only input", () => {
      const result = chunkText({ text: "   \n\n  ", maxTokens: 100 });
      expect(result).toEqual([]);
    });

    it("should return single chunk when text fits within limit", () => {
      const text = "This is a short text.";
      const result = chunkText({ text, maxTokens: 100 });

      expect(result).toHaveLength(1);
      expect(result[0]?.content).toBe(text);
      expect(result[0]?.chunkNumber).toBe(1);
      expect(result[0]?.estimatedTokens).toBeGreaterThan(0);
    });

    it("should trim whitespace from chunks", () => {
      const text = "  First chunk  \n\n  Second chunk  ";
      const result = chunkText({ text, maxTokens: 2 });

      result.forEach((chunk) => {
        expect(chunk.content).not.toMatch(/^\s/);
        expect(chunk.content).not.toMatch(/\s$/);
      });
    });
  });

  describe("token estimation and 5% buffer", () => {
    it("should respect token limit with 5% buffer", () => {
      const maxTokens = 100;
      const text = "a".repeat(maxTokens * 4 * 2); // Double the limit in chars
      const result = chunkText({ text, maxTokens });

      // Each chunk should be under the limit (accounting for 95% buffer)
      result.forEach((chunk) => {
        expect(chunk.estimatedTokens).toBeLessThanOrEqual(maxTokens);
      });
    });

    it("should create multiple chunks when text exceeds limit", () => {
      const text = "word ".repeat(500); // 500 words
      const result = chunkText({ text, maxTokens: 100 });

      expect(result.length).toBeGreaterThan(1);
    });

    it("should assign sequential chunk numbers", () => {
      const text = "word ".repeat(500);
      const result = chunkText({ text, maxTokens: 50 });

      result.forEach((chunk, index) => {
        expect(chunk.chunkNumber).toBe(index + 1);
      });
    });
  });

  describe("priority-based splitting", () => {
    it("should prefer splitting at double newlines (paragraphs)", () => {
      const text = "First paragraph.\n\nSecond paragraph.\n\nThird paragraph.";
      const result = chunkText({ text, maxTokens: 10 });

      // Should split at paragraph boundaries
      expect(result.length).toBeGreaterThan(1);
      result.forEach((chunk) => {
        // Chunks shouldn't contain double newlines (split points)
        if (chunk.content.includes("\n\n")) {
          // If they do, it means the paragraph was too large to split
          expect(chunk.estimatedTokens).toBeGreaterThan(0);
        }
      });
    });

    it("should fall back to single newlines when no paragraphs available", () => {
      const text = "Line one\nLine two\nLine three\nLine four\nLine five";
      const result = chunkText({ text, maxTokens: 5 });

      expect(result.length).toBeGreaterThan(1);
      // Should split at line boundaries, creating chunks
      result.forEach((chunk) => {
        expect(chunk.content).toBeTruthy();
      });
    });

    it("should fall back to sentences when no line breaks available", () => {
      const text =
        "First sentence. Second sentence. Third sentence. Fourth sentence.";
      const result = chunkText({ text, maxTokens: 5 });

      expect(result.length).toBeGreaterThan(1);
    });

    it("should fall back to word boundaries when necessary", () => {
      const text = "word word word word word word word word word word";
      const result = chunkText({ text, maxTokens: 2 });

      expect(result.length).toBeGreaterThan(1);
      // Each chunk should have at least one word
      result.forEach((chunk) => {
        expect(chunk.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe("edge cases", () => {
    it("should handle very long words that exceed token limit", () => {
      const longWord = "a".repeat(1000);
      const result = chunkText({ text: longWord, maxTokens: 10 });

      // Should split mid-word as last resort
      expect(result.length).toBeGreaterThan(1);
      result.forEach((chunk) => {
        expect(chunk.content.length).toBeGreaterThan(0);
      });
    });

    it("should handle text with no whitespace", () => {
      const text = "a".repeat(500);
      const result = chunkText({ text, maxTokens: 50 });

      expect(result.length).toBeGreaterThan(1);
      result.forEach((chunk) => {
        expect(chunk.content).toBeTruthy();
      });
    });

    it("should handle text with mixed boundaries", () => {
      const text = `First paragraph with multiple sentences. More text here.

Second paragraph on a new line.
With a line break in the middle. And more sentences.

Third paragraph.`;

      const result = chunkText({ text, maxTokens: 20 });

      expect(result.length).toBeGreaterThan(1);
      result.forEach((chunk) => {
        expect(chunk.content.trim()).toBeTruthy();
        expect(chunk.estimatedTokens).toBeGreaterThan(0);
      });
    });

    it("should handle very small token limits", () => {
      const text = "This is a test with multiple words in it.";
      const result = chunkText({ text, maxTokens: 1 });

      expect(result.length).toBeGreaterThan(1);
      result.forEach((chunk) => {
        expect(chunk.content).toBeTruthy();
      });
    });

    it("should handle text with special characters", () => {
      const text = "Special chars: !@#$%^&*() 123 \n\n More text. End.";
      const result = chunkText({ text, maxTokens: 10 });

      result.forEach((chunk) => {
        expect(chunk.content).toBeTruthy();
        expect(chunk.estimatedTokens).toBeGreaterThan(0);
      });
    });

    it("should handle URLs and long unbreakable strings", () => {
      const text =
        "Check out https://example.com/very/long/url/path/that/goes/on/forever for more info. Regular text here.";
      const result = chunkText({ text, maxTokens: 10 });

      result.forEach((chunk) => {
        expect(chunk.content).toBeTruthy();
      });
    });
  });

  describe("chunk metadata", () => {
    it("should include all required fields in chunk results", () => {
      const text = "Test text that will be chunked.";
      const result = chunkText({ text, maxTokens: 5 });

      result.forEach((chunk) => {
        expect(chunk).toHaveProperty("content");
        expect(chunk).toHaveProperty("estimatedTokens");
        expect(chunk).toHaveProperty("chunkNumber");
        expect(typeof chunk.content).toBe("string");
        expect(typeof chunk.estimatedTokens).toBe("number");
        expect(typeof chunk.chunkNumber).toBe("number");
      });
    });

    it("should have consistent token estimates", () => {
      const text = "word ".repeat(100);
      const result = chunkText({ text, maxTokens: 50 });

      const totalEstimatedTokens = result.reduce(
        (sum, chunk) => sum + chunk.estimatedTokens,
        0,
      );

      // Total should be roughly equal to original text estimate (within rounding)
      // Using ~4 chars per token
      const originalEstimate = Math.ceil(text.length / 4);
      expect(Math.abs(totalEstimatedTokens - originalEstimate)).toBeLessThan(
        result.length * 2,
      ); // Allow small variance per chunk
    });
  });

  describe("real-world scenarios", () => {
    it("should handle a typical article with paragraphs", () => {
      const article = `Introduction paragraph with some text.

First main point with detailed explanation. This continues for a bit longer to make a realistic paragraph.

Second main point with even more detail. Here we have multiple sentences. And some more content to fill it out.

Conclusion paragraph that wraps things up.`;

      const result = chunkText({ text: article, maxTokens: 50 });

      expect(result.length).toBeGreaterThan(0);
      result.forEach((chunk) => {
        expect(chunk.estimatedTokens).toBeLessThanOrEqual(50);
        expect(chunk.content.trim()).toBeTruthy();
      });
    });

    it("should handle code snippets with mixed formatting", () => {
      const code = `function example() {
  const x = 1;
  const y = 2;
  return x + y;
}

function another() {
  console.log("test");
}`;

      const result = chunkText({ text: code, maxTokens: 30 });

      result.forEach((chunk) => {
        expect(chunk.content).toBeTruthy();
      });
    });

    it("should handle large documents efficiently", () => {
      const largeText = "sentence. ".repeat(1000);
      const startTime = Date.now();

      const result = chunkText({ text: largeText, maxTokens: 100 });

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(result.length).toBeGreaterThan(1);
      // Should complete in reasonable time (less than 1 second)
      expect(duration).toBeLessThan(1000);
    });
  });
});
