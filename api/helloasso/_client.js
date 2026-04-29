import { normaliseSiteSettings, readSiteSettings, resolveHelloAssoOrganizationSlug } from "../_site-settings.js";

const DEFAULT_API_BASE_URL = "https://api.helloasso.com/v5";
let tokenCache = {
  accessToken: "",
  expiresAt: 0
};

function cleanString(value, max = 400) {
  return String(value || "").trim().slice(0, max);
}

function getApiBaseUrl() {
  return cleanString(process.env.HELLOASSO_API_BASE_URL || DEFAULT_API_BASE_URL, 200).replace(
    /\/$/,
    ""
  );
}

function getAuthBaseUrl(apiBaseUrl) {
  return apiBaseUrl.replace(/\/v\d+(?:\/.*)?$/i, "");
}

function ensureCredentials() {
  if (!process.env.HELLOASSO_CLIENT_ID || !process.env.HELLOASSO_CLIENT_SECRET) {
    const error = new Error(
      "La connexion HelloAsso n'est pas encore configuree dans Vercel."
    );
    error.statusCode = 503;
    throw error;
  }
}

async function getAccessToken() {
  ensureCredentials();

  if (tokenCache.accessToken && Date.now() < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }

  const apiBaseUrl = getApiBaseUrl();
  const response = await fetch(`${getAuthBaseUrl(apiBaseUrl)}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "User-Agent": "lamaisonrose-site/1.0"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.HELLOASSO_CLIENT_ID,
      client_secret: process.env.HELLOASSO_CLIENT_SECRET
    })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.access_token) {
    const error = new Error(
      payload.error_description ||
        payload.message ||
        "Impossible d'obtenir un jeton HelloAsso."
    );
    error.statusCode = response.status || 502;
    error.details = payload;
    throw error;
  }

  const ttlSeconds = Number(payload.expires_in) || 1800;
  tokenCache = {
    accessToken: payload.access_token,
    expiresAt: Date.now() + Math.max(ttlSeconds - 60, 60) * 1000
  };

  return tokenCache.accessToken;
}

export async function getHelloAssoContext() {
  const settings = normaliseSiteSettings(await readSiteSettings());
  return {
    apiBaseUrl: getApiBaseUrl(),
    settings,
    organizationSlug: resolveHelloAssoOrganizationSlug(settings),
    accessToken: await getAccessToken()
  };
}

export async function helloAssoFetch(pathname, init = {}) {
  const context = await getHelloAssoContext();
  const headers = {
    Accept: "application/json",
    "User-Agent": "lamaisonrose-site/1.0",
    Authorization: `Bearer ${context.accessToken}`,
    ...(init.headers || {})
  };

  const response = await fetch(`${context.apiBaseUrl}${pathname}`, {
    ...init,
    headers
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error_description ||
      payload?.errors?.[0]?.message ||
      "Erreur HelloAsso.";
    const error = new Error(message);
    error.statusCode = response.status || 502;
    error.details = payload;
    throw error;
  }

  return {
    payload,
    context
  };
}
