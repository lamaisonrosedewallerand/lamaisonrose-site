const RATE_LIMIT_BUCKETS =
  globalThis.__lamaisonroseDecapRateBuckets ||
  (globalThis.__lamaisonroseDecapRateBuckets = new Map());

export function getSiteOrigin(req) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${protocol}://${host}`;
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = req.headers["x-real-ip"];

  if (typeof realIp === "string" && realIp.trim()) {
    return realIp.trim();
  }

  return req.socket?.remoteAddress || "unknown";
}

export function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, entry) => {
    const trimmed = entry.trim();

    if (!trimmed) {
      return cookies;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      return cookies;
    }

    const key = trimmed.slice(0, separatorIndex);
    const value = trimmed.slice(separatorIndex + 1);
    cookies[key] = decodeURIComponent(value);
    return cookies;
  }, {});
}

export function buildCookie(name, value, { maxAge = 600, secure = false } = {}) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`
  ];

  if (secure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function parseEnvList(value = "") {
  return String(value)
    .split(/[,\n ]+/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function hostMatches(hostname, pattern) {
  if (!pattern) {
    return false;
  }

  if (pattern.startsWith("*.")) {
    const suffix = pattern.slice(1);
    return hostname.endsWith(suffix);
  }

  return hostname === pattern;
}

export function getAllowedHosts() {
  return parseEnvList(process.env.ADMIN_ALLOWED_HOSTS || "");
}

export function isAllowedHost(req) {
  const patterns = getAllowedHosts();

  if (!patterns.length) {
    return true;
  }

  const hostHeader = req.headers["x-forwarded-host"] || req.headers.host || "";
  const hostname = String(hostHeader).split(":")[0].trim().toLowerCase();

  return patterns.some((pattern) => hostMatches(hostname, pattern));
}

export function applySecurityHeaders(res, { cacheControl = "no-store, max-age=0" } = {}) {
  res.setHeader("Cache-Control", cacheControl);
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'none'",
      "style-src 'unsafe-inline'",
      "script-src 'unsafe-inline'",
      "img-src 'self' data:",
      "base-uri 'none'",
      "form-action 'none'",
      "frame-ancestors 'none'"
    ].join("; ")
  );
}

export function rejectRequest(res, statusCode, title, heading, message) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(
    htmlPage(
      title,
      `<main>
        <h1>${heading}</h1>
        <p>${message}</p>
      </main>`
    )
  );
}

export function enforceAdminAccess(req, res, { bucket, limit, windowMs }) {
  applySecurityHeaders(res);

  if (!isAllowedHost(req)) {
    rejectRequest(
      res,
      403,
      "Hote refuse",
      "Acces admin refuse",
      "Cette tentative ne provient pas d'un domaine autorise pour l'administration."
    );
    return false;
  }

  const ip = getClientIp(req);
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const entry = RATE_LIMIT_BUCKETS.get(key);

  if (!entry || now >= entry.resetAt) {
    RATE_LIMIT_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  entry.count += 1;
  RATE_LIMIT_BUCKETS.set(key, entry);

  if (entry.count <= limit) {
    return true;
  }

  const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  res.setHeader("Retry-After", String(retryAfter));
  rejectRequest(
    res,
    429,
    "Trop de tentatives",
    "Ralentis un instant",
    "Trop de requetes ont ete envoyees vers l'administration. Attends quelques minutes puis recommence."
  );
  return false;
}

export function htmlPage(title, body, script = "") {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${title}</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 2rem;
        background: #f7f1e8;
        color: #2c2019;
        font-family: "Avenir Next", "Segoe UI", sans-serif;
      }

      main {
        max-width: 36rem;
        padding: 2rem;
        border-radius: 1.25rem;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(44, 32, 25, 0.12);
        box-shadow: 0 24px 60px rgba(44, 32, 25, 0.12);
      }

      h1 {
        margin-top: 0;
      }

      p:last-child {
        margin-bottom: 0;
      }

      code {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      }
    </style>
  </head>
  <body>
    ${body}
    ${script}
  </body>
</html>`;
}
