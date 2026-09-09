import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
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

async function collectFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (relative.startsWith("server/") || relative.startsWith(".openai/") || relative === "sw.js") continue;
    if (entry.isDirectory()) files.push(...await collectFiles(join(directory, entry.name), relative));
    else files.push(relative);
  }
  return files;
}

const files = await collectFiles(dist);
const urls = files.map(file => {
  if (file === "index.html") return "/";
  if (file.endsWith("/index.html")) return `/${file.slice(0, -"index.html".length)}`;
  return `/${file}`;
});
const fingerprint = createHash("sha256").update(urls.join("\n")).digest("hex").slice(0, 12);
const serviceWorker = await readFile(join(root, "public", "sw.js"), "utf8");
await writeFile(join(dist, "sw.js"), `self.__CACHE_VERSION__ = "discipline-os-${fingerprint}";\nself.__PRECACHE_URLS__ = ${JSON.stringify(urls)};\n${serviceWorker}`, "utf8");
