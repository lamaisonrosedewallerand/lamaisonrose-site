import fs from "node:fs/promises";
import path from "node:path";
import {
  enforceAdminAccess,
  getSiteOrigin
} from "./_helpers.js";

const CONFIG_PATH = path.join(process.cwd(), "admin", "config.yml");

function injectBackendRuntimeConfig(source, { origin, hostname }) {
  const runtimeBlock = [
    `  base_url: ${origin}`,
    "  auth_endpoint: api/decap/auth",
    `  site_domain: ${hostname}`
  ].join("\n");

  if (source.includes("\n  base_url:") || source.includes("\n  auth_endpoint:")) {
    return source
      .replace(/\n  base_url:.*$/m, "")
      .replace(/\n  auth_endpoint:.*$/m, "")
      .replace(/\n  site_domain:.*$/m, "")
      .replace(/(  squash_merges:\s*true)/, `$1\n${runtimeBlock}`);
  }

  return source.replace(/(  squash_merges:\s*true)/, `$1\n${runtimeBlock}`);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.end("Method Not Allowed");
    return;
  }

  if (
    !enforceAdminAccess(req, res, {
      bucket: "decap-config",
      limit: 120,
      windowMs: 10 * 60 * 1000
    })
  ) {
    return;
  }

  try {
    const rawConfig = await fs.readFile(CONFIG_PATH, "utf8");
    const origin = getSiteOrigin(req);
    const hostname = new URL(origin).hostname;
    const config = injectBackendRuntimeConfig(rawConfig, { origin, hostname });

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/yaml; charset=utf-8");
    res.end(config);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Impossible de charger admin/config.yml");
  }
}
