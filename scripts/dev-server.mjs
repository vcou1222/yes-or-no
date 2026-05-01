import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const tscPath = path.join(
  rootDir,
  "node_modules/.pnpm/typescript@5.9.3/node_modules/typescript/bin/tsc",
);

const compileOnce = spawnSync(process.execPath, [tscPath, "-p", "tsconfig.app.json"], {
  cwd: rootDir,
  stdio: "inherit",
});

if (compileOnce.status !== 0) {
  process.exit(compileOnce.status ?? 1);
}

const watcher = spawn(process.execPath, [tscPath, "-w", "-p", "tsconfig.app.json"], {
  cwd: rootDir,
  stdio: "inherit",
});

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".ico", "image/x-icon"],
]);

function resolveAsset(urlPath) {
  if (urlPath === "/") {
    return path.join(rootDir, "index.html");
  }

  const relativePath = urlPath.replace(/^\/+/, "");
  return path.join(rootDir, relativePath);
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? "/", "http://localhost");
    const filePath = resolveAsset(requestUrl.pathname);
    const ext = path.extname(filePath);
    const contentType = mimeTypes.get(ext) ?? "application/octet-stream";
    const data = await readFile(filePath);

    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(5173, () => {
  console.log("Yes or No dev server running at http://localhost:5173");
});

const shutdown = () => {
  watcher.kill("SIGINT");
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
