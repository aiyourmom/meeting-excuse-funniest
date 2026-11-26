import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I read last week's minutes: 'No decisions made.' I'm skipping this week's sequel.";

// Gate guard: one line, 1-200 chars, not whitespace only, no control chars.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${TEXT.length}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (TEXT.includes("\n") || TEXT.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (/[\u0000-\u001f\u007f]/.test(TEXT)) {
  throw new Error("entry must not contain control characters");
}
if (!/[A-Za-z0-9]/.test(TEXT)) {
  throw new Error("entry must contain at least one word character");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`saved ${TEXT.length} characters to entry.txt`);
