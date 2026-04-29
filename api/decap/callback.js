import { buildCookie, getSiteOrigin, htmlPage, parseCookies } from "./_helpers.js";

export default async function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const { code, state } = req.query;
  const origin = getSiteOrigin(req);
  const redirectUri = `${origin}/api/decap/callback`;
  const secureCookie = origin.startsWith("https://");
  const cookies = parseCookies(req.headers.cookie || "");

  if (!clientId || !clientSecret) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      htmlPage(
        "Configuration manquante",
        `<main>
          <h1>Variables GitHub manquantes</h1>
          <p>Ajoute <code>GITHUB_OAUTH_CLIENT_ID</code> et <code>GITHUB_OAUTH_CLIENT_SECRET</code> dans Vercel pour finaliser la connexion Decap CMS.</p>
        </main>`
      )
    );
    return;
  }

  if (!code || !state || cookies.decap_oauth_state !== state) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      htmlPage(
        "Connexion invalide",
        `<main>
          <h1>Etat OAuth invalide</h1>
          <p>La tentative de connexion n'a pas pu etre verifiee. Recharge la page d'administration puis recommence.</p>
        </main>`
      )
    );
    return;
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "lamaisonrose-site-decap-oauth"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      state,
      redirect_uri: redirectUri
    })
  });

  const payload = await tokenResponse.json();

  if (!tokenResponse.ok || payload.error || !payload.access_token) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(
      htmlPage(
        "Connexion GitHub impossible",
        `<main>
          <h1>Echange du code refuse</h1>
          <p>GitHub n'a pas renvoye de jeton exploitable. Verifie l'application OAuth GitHub, son URL de callback et les variables Vercel.</p>
        </main>`
      )
    );
    return;
  }

  const oauthPayload = JSON.stringify({
    token: payload.access_token,
    provider: "github"
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader(
    "Set-Cookie",
    buildCookie("decap_oauth_state", "", { maxAge: 0, secure: secureCookie })
  );
  res.end(
    htmlPage(
      "Connexion terminee",
      `<main>
        <h1>Connexion reussie</h1>
        <p>La fenetre va se fermer automatiquement.</p>
      </main>`,
      `<script>
        (function () {
          const payload = ${oauthPayload};
          const targetOrigin = window.location.origin;

          function sendSuccess() {
            if (!window.opener) {
              return;
            }

            window.opener.postMessage(
              "authorization:github:success:" + JSON.stringify(payload),
              targetOrigin
            );
            window.close();
          }

          if (!window.opener) {
            return;
          }

          window.opener.postMessage("authorizing:github", targetOrigin);
          window.addEventListener(
            "message",
            function () {
              sendSuccess();
            },
            { once: true }
          );

          window.setTimeout(sendSuccess, 1200);
        })();
      </script>`
    )
  );
}
