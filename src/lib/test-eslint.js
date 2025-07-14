import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testLint() {
  const eslint = new ESLint({
    cwd: path.resolve(__dirname, "../.."),
  });

  const results = await eslint.lintFiles([
    "src/components/ui/__tests__/Button.test.tsx",
  ]);

  for (const result of results) {
    if (result.messages.length > 0) {
      console.log(`\nFile: ${result.filePath}`);
      for (const message of result.messages) {
        if (message.line === 87) {
          console.log(
            `Line ${message.line}:${message.column} - ${message.message}`,
          );
          console.log(`Rule: ${message.ruleId}`);
          console.log(`Severity: ${message.severity}`);
        }
      }
    }
  }
}

testLint().catch(console.error);
