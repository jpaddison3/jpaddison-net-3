import { spawn } from "child_process";

const args = process.argv.slice(2);
const quiet = args.includes("--quiet");
const noTests = args.includes("--no-tests");

type CheckResult = {
  name: string;
  exitCode: number;
  output: string;
};

function runCheck(
  name: string,
  command: string,
  args: string[],
): Promise<CheckResult> {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: quiet ? "pipe" : "inherit",
      shell: true,
    });

    let output = "";
    if (quiet) {
      child.stdout?.on("data", (data: Buffer) => {
        output += data.toString();
      });
      child.stderr?.on("data", (data: Buffer) => {
        output += data.toString();
      });
    }

    child.on("close", (code) => {
      resolve({ name, exitCode: code ?? 1, output });
    });
  });
}

function truncateOutput(output: string, maxLines = 50): string {
  const lines = output.trimEnd().split("\n");
  if (lines.length <= maxLines) return output;

  const head = lines.slice(0, 20);
  const tail = lines.slice(-20);
  const skipped = lines.length - 40;
  return [...head, `\n... ${skipped} lines omitted ...\n`, ...tail].join("\n");
}

async function main() {
  const checks: Promise<CheckResult>[] = [
    runCheck("TypeScript", "npx", ["tsc", "--noEmit"]),
    runCheck("ESLint", "npx", [
      "eslint",
      "--max-warnings",
      "0",
      "--cache",
      ".",
    ]),
  ];

  if (!noTests) {
    checks.push(runCheck("Tests", "npx", ["vitest", "run"]));
  }

  const results = await Promise.all(checks);

  const failed = results.filter((r) => r.exitCode !== 0);

  if (failed.length === 0) {
    if (!quiet) {
      console.log("\n✅ All checks passed.");
    }
    process.exit(0);
  }

  // In quiet mode, show output for failures — but suppress ESLint if TypeScript failed
  if (quiet) {
    const tsFailed = failed.some((r) => r.name === "TypeScript");

    for (const result of failed) {
      if (result.name === "ESLint" && tsFailed) {
        console.error(
          `\n❌ ${result.name} failed (output suppressed — fix TypeScript errors first)`,
        );
        continue;
      }
      console.error(`\n❌ ${result.name} failed:`);
      console.error(truncateOutput(result.output));
    }
  }

  const failedNames = failed.map((r) => r.name).join(", ");
  console.error(`\n❌ Failed: ${failedNames}`);
  process.exit(1);
}

main();
