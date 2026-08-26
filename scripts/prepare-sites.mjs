import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const server = join(dist, "server");
const metadata = join(dist, ".openai");

await mkdir(server, { recursive: true });
await mkdir(metadata, { recursive: true });

await writeFile(
  join(server, "index.js"),
  `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
`,
  "utf8",
);

await copyFile(join(root, ".openai", "hosting.json"), join(metadata, "hosting.json"));
