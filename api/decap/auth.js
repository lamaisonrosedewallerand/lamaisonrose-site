import crypto from "node:crypto";
import { buildCookie, getSiteOrigin, htmlPage } from "./_helpers.js";

export default function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      htmlPage(
        "Configuration manquante",
        `<main>
          <h1>Connexion GitHub non configuree</h1>
          <p>Ajoute la variable d'environnement <code>GITHUB_OAUTH_CLIENT_ID</code> dans Vercel avant d'utiliser l'administration.</p>
        </main>`
      )
    );
    return;
  }

  const origin = getSiteOrigin(req);
  const redirectUri = `${origin}/api/decap/callback`;
  const state = crypto.randomBytes(24).toString("hex");
  const secureCookie = origin.startsWith("https://");
  const scope = process.env.GITHUB_OAUTH_SCOPE || "public_repo";
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");

  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("state", state);

  if (typeof req.query.login === "string" && req.query.login) {
    authorizeUrl.searchParams.set("login", req.query.login);
  }

  res.setHeader(
    "Set-Cookie",
    buildCookie("decap_oauth_state", state, { secure: secureCookie })
  );
  res.statusCode = 302;
  res.setHeader("Location", authorizeUrl.toString());
  res.end();
}
