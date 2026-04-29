export function getSiteOrigin(req) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${protocol}://${host}`;
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
