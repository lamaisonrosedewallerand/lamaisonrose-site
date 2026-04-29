import { readFile } from "node:fs/promises";

const DEFAULT_SITE_SETTINGS = {
  helloasso_url: "https://www.helloasso.com/associations/la-maison-rose-de-wallerand",
  helloasso_organization_slug: "la-maison-rose-de-wallerand",
  helloasso_checkout_membership_item_name: "Adhesion a La Maison Rose de Wallerand",
  helloasso_checkout_support_item_name: "Soutien a La Maison Rose de Wallerand",
  helloasso_checkout_default_amount: 50,
  helloasso_checkout_min_amount: 10,
  helloasso_checkout_suggested_amounts: "20,50,100,250",
  contact_email: "contact@lamaisonrosedewallerand.com"
};

let settingsPromise;

function cleanString(value, max = 300) {
  return String(value || "").trim().slice(0, max);
}

function extractOrganizationSlug(value) {
  const match = cleanString(value).match(
    /helloasso\.com\/associations\/([^/?#]+)|helloasso-sandbox\.com\/associations\/([^/?#]+)/i
  );

  return match ? decodeURIComponent(match[1] || match[2] || "") : "";
}

export async function readSiteSettings() {
  if (settingsPromise) {
    return settingsPromise;
  }

  settingsPromise = readFile(
    new URL("../assets/data/site-settings.json", import.meta.url),
    "utf8"
  )
    .then((raw) => JSON.parse(raw))
    .then((payload) => ({
      ...DEFAULT_SITE_SETTINGS,
      ...(payload && payload.item ? payload.item : {})
    }))
    .catch(() => ({ ...DEFAULT_SITE_SETTINGS }));

  return settingsPromise;
}

export function resolveHelloAssoOrganizationSlug(settings = {}) {
  const envSlug = cleanString(process.env.HELLOASSO_ORGANIZATION_SLUG, 120);

  if (envSlug) {
    return envSlug;
  }

  const directSlug = cleanString(settings.helloasso_organization_slug, 120);

  if (directSlug) {
    return directSlug;
  }

  const fromUrl = extractOrganizationSlug(settings.helloasso_url);
  return fromUrl || DEFAULT_SITE_SETTINGS.helloasso_organization_slug;
}

export function normaliseSiteSettings(settings = {}) {
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...settings
  };
}
