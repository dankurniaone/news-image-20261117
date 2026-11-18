// news-image-20261117: the entry ships its finished front page as
// entry.png, and this program hands it to the grader. It validates
// the file first -- PNG magic, IHDR dimensions, and the 1 MiB cap --
// so a corrupt build fails loudly instead of reaching the judge.
//
// The image is drawn by tools/render.py (Pillow, 2x supersampled).
// This file only checks it and copies it to the grader's output
// directory. RULES.txt: entry.png is AT MOST 1024x1024 px and at
// most 1 MiB -- an upper bound on each side, not an exact size, so
// the 680x1024 broadsheet is legal.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFile, mkdir, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LIMITS = { bytes: 1024 * 1024, width: 1024, height: 1024 };
const PNG_MAGIC = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

function reject(reason: string): never {
  throw new Error(`entry.png rejected: ${reason}`);
}

async function readPngHeader(bytes: Buffer): Promise<{
  width: number;
  height: number;
}> {
  if (bytes.length < 33 || !bytes.subarray(0, 8).equals(PNG_MAGIC)) {
    reject("not a PNG (bad magic bytes)");
  }
  if (bytes.toString("ascii", 12, 16) !== "IHDR") {
    reject("first chunk is not IHDR");
  }
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (width < 1 || height < 1) {
    reject(`dimensions ${width}x${height} are not positive`);
  }
  if (width > LIMITS.width || height > LIMITS.height) {
    reject(
      `dimensions ${width}x${height} exceed at most ` +
        `${LIMITS.width}x${LIMITS.height}`,
    );
  }
  return { width, height };
}

async function main(): Promise<void> {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  const bytes = await readFile(source);
  if (bytes.length > LIMITS.bytes) {
    reject(`${bytes.length} bytes exceeds the 1 MiB cap`);
  }
  const dims = await readPngHeader(bytes);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  await mkdir(outDir, { recursive: true });
  const target = join(outDir, "entry.png");
  await copyFile(source, target);
  const written = (await stat(target)).size;
  console.log(
    `entry.png: ${dims.width}x${dims.height}, ${written} bytes -> ${target}`,
  );
}

await main();
