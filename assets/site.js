import {
  SITE_LANGUAGE_STORAGE_KEY,
  SITE_SOURCE_LANGUAGE,
  SITE_SUPPORTED_LANGUAGES,
  getLocaleForLanguage,
  getPageKeyFromPath,
  getStaticPageCopy,
  getUiTranslation
} from "./site-translations.js";

const DATA_URLS = {
  stages: "assets/data/stages.json",
  evenements: "assets/data/evenements.json",
  site: "assets/data/site-settings.json"
};

const DEFAULT_SITE_SETTINGS = {
  announcement_mode: "auto",
  announcement_text: "",
  announcement_link: "",
  contact_email: "contact@lamaisonrosedewallerand.com",
  contact_phone: "+33 6 15 37 56 72",
  address_line_1: "59 rue Daubigny",
  address_line_2: "95430 Auvers-sur-Oise",
  instagram_url: "https://www.instagram.com/lamaisonrosedewallerand/",
  helloasso_url: "https://www.helloasso.com/associations/la-maison-rose-de-wallerand",
  helloasso_organization_slug: "la-maison-rose-de-wallerand",
  home_hero_image: "/assets/uploads/maison-rose-facade-hero.jpg",
  helloasso_checkout_membership_item_name: "Adhesion individuelle a La Maison Rose de Wallerand",
  helloasso_checkout_membership_amount: 20,
  helloasso_checkout_membership_couple_item_name: "Adhesion couple a La Maison Rose de Wallerand",
  helloasso_checkout_membership_couple_amount: 30,
  helloasso_checkout_support_item_name: "Soutien a La Maison Rose de Wallerand",
  helloasso_checkout_default_amount: 50,
  helloasso_checkout_min_amount: 10,
  helloasso_checkout_suggested_amounts: "20,50,100,250",
  helloasso_widget_url: "",
  helloasso_widget_height: 780
};

const PLACEHOLDERS = {
  stage: ["a", "b", "c", "d", "e", "f"],
  event: ["a", "b", "c"]
};

const collectionCache = new Map();
const singletonCache = new Map();
let revealObserver;
let countdownTimer;
let publicConfigPromise;
let helloAssoResizeBound = false;

function expireCookie(name, domain = "") {
  const domainSegment = domain ? ` domain=${domain};` : "";
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=/;${domainSegment} SameSite=Lax`;
}

function clearLegacyTranslateArtifacts() {
  const hostname = window.location.hostname;
  const hostnameBits = hostname.split(".").filter(Boolean);
  const baseDomain =
    hostnameBits.length >= 2 ? hostnameBits.slice(-2).join(".") : "";

  expireCookie("googtrans");

  if (hostname) {
    expireCookie("googtrans", hostname);
  }

  if (hostname.startsWith("www.")) {
    expireCookie("googtrans", hostname.replace(/^www\./, ""));
  }

  if (baseDomain && baseDomain !== hostname) {
    expireCookie("googtrans", baseDomain);
    expireCookie("googtrans", `.${baseDomain}`);
  }

  document
    .querySelectorAll(
      'iframe.goog-te-banner-frame, iframe.goog-te-menu-frame, .goog-te-spinner-pos, #goog-gt-tt'
    )
    .forEach((node) => node.remove());

  document.documentElement.setAttribute("translate", "no");
  document.documentElement.classList.add("notranslate");
  document.body?.setAttribute("translate", "no");
  document.body?.classList.add("notranslate");
  document.body?.style?.removeProperty("top");

  let notranslateMeta = document.querySelector('meta[name="google"]');

  if (!notranslateMeta) {
    notranslateMeta = document.createElement("meta");
    notranslateMeta.setAttribute("name", "google");
    document.head.append(notranslateMeta);
  }

  notranslateMeta.setAttribute("content", "notranslate");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function formatPhoneHref(value) {
  return `tel:${String(value || "").replace(/[^\d+]/g, "")}`;
}

function normaliseWidgetUrl(value) {
  const trimmed = String(value || "").trim();

  if (!trimmed) {
    return "";
  }

  return trimmed.includes("/widget") ? trimmed : `${trimmed.replace(/\/$/, "")}/widget`;
}

function getCurrentLanguage() {
  const docLanguage = document.documentElement.getAttribute("lang");

  if (SITE_SUPPORTED_LANGUAGES.has(docLanguage)) {
    return docLanguage;
  }

  return getPreferredLanguage();
}

function getPreferredLanguage() {
  try {
    const stored = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);

    if (SITE_SUPPORTED_LANGUAGES.has(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn("Impossible de lire la langue enregistrée.", error);
  }

  return SITE_SOURCE_LANGUAGE;
}

function setPreferredLanguage(language) {
  const value = SITE_SUPPORTED_LANGUAGES.has(language) ? language : SITE_SOURCE_LANGUAGE;

  try {
    window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, value);
  } catch (error) {
    console.warn("Impossible d'enregistrer la langue choisie.", error);
  }
}

function setDocumentLanguage(language) {
  const safeLanguage = SITE_SUPPORTED_LANGUAGES.has(language) ? language : SITE_SOURCE_LANGUAGE;
  document.documentElement.setAttribute("lang", safeLanguage);

  if (document.body) {
    document.body.dataset.lang = safeLanguage;
  }
}

function updateLanguageButtons(language) {
  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    const isActive = button.dataset.langSwitch === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function t(path, fallback = "") {
  return getUiTranslation(getCurrentLanguage(), path, fallback);
}

function localizeField(item, fieldName, fallback = "") {
  if (!item || typeof item !== "object") {
    return fallback;
  }

  const language = getCurrentLanguage();

  if (language === "en") {
    const englishKey = `${fieldName}_en`;
    const englishValue = item[englishKey];

    if (englishValue !== undefined && englishValue !== null && String(englishValue).trim()) {
      return englishValue;
    }
  }

  const value = item[fieldName];
  return value !== undefined && value !== null && String(value).trim() ? value : fallback;
}

function localizeSummary(item) {
  const englishSummary = getCurrentLanguage() === "en" ? String(item.summary_en || "").trim() : "";

  if (englishSummary) {
    return englishSummary;
  }

  return item.descriptionText || item.body || "";
}

function localizeStageLevel(value, item = null) {
  const literal =
    item && item !== null
      ? localizeField(item, "level", value || t("stage.allLevels"))
      : value || t("stage.allLevels");

  if (getCurrentLanguage() !== "en") {
    return literal || t("stage.allLevels");
  }

  const normalized = normalizeText(literal);

  if (!normalized) {
    return t("stage.allLevels");
  }

  if (normalized.includes("debut") || normalized.includes("begin")) {
    return t("stage.filters.beginner");
  }

  if (normalized.includes("inter")) {
    return t("stage.filters.intermediate");
  }

  if (normalized.includes("avance") || normalized.includes("advanced")) {
    return t("stage.filters.advanced");
  }

  if (normalized.includes("tous niveaux") || normalized.includes("all levels")) {
    return t("stage.allLevels");
  }

  return literal;
}

function localizePrice(value, item = null) {
  const literal =
    item && item !== null ? localizeField(item, "price", value || t("stage.info")) : value || t("stage.info");

  if (getCurrentLanguage() !== "en") {
    return literal;
  }

  const normalized = normalizeText(literal);

  if (normalized === "sur demande") {
    return t("stage.onRequest");
  }

  if (normalized === "infos") {
    return t("stage.info");
  }

  return literal;
}

function localizeEntry(value, item = null) {
  const literal =
    item && item !== null
      ? localizeField(item, "entry", value || t("event.freeEntry"))
      : value || t("event.freeEntry");

  if (getCurrentLanguage() !== "en") {
    return literal;
  }

  const normalized = normalizeText(literal);

  if (normalized.includes("libre") || normalized.includes("free")) {
    return t("event.freeEntry");
  }

  if (normalized.includes("payante") || normalized.includes("ticket")) {
    return t("event.paidEntry");
  }

  return literal;
}

function applyNodeTranslation(node, spec, language) {
  if (!node || !spec) {
    return;
  }

  if (spec.text) {
    node.textContent = spec.text[language] ?? spec.text.fr ?? "";
  }

  if (spec.html) {
    node.innerHTML = spec.html[language] ?? spec.html.fr ?? "";
  }

  if (spec.attrs) {
    Object.entries(spec.attrs).forEach(([attribute, values]) => {
      node.setAttribute(attribute, values[language] ?? values.fr ?? "");
    });
  }
}

function applyStaticPageTranslations() {
  const language = getCurrentLanguage();
  const pageKey = getPageKeyFromPath(window.location.pathname);
  const copy = getStaticPageCopy(pageKey);

  if (!copy) {
    return;
  }

  if (copy.title) {
    document.title = copy.title[language] ?? copy.title.fr ?? document.title;
  }

  const metaDescription = document.querySelector('meta[name="description"]');

  if (metaDescription && copy.description) {
    const fallbackDescription = metaDescription.getAttribute("content") || "";
    metaDescription.setAttribute(
      "content",
      copy.description[language] ?? copy.description.fr ?? fallbackDescription
    );
  }

  (copy.nodes || []).forEach((entry) => {
    document.querySelectorAll(entry.selector).forEach((node) => {
      applyNodeTranslation(node, entry, language);
    });
  });
}

function applyLanguage() {
  const language = getPreferredLanguage();
  setDocumentLanguage(language);
  updateLanguageButtons(language);
  applyStaticPageTranslations();
}

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll("[data-lang-switch]");

  if (!buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    if (button.dataset.bound === "true") {
      return;
    }

    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const language = SITE_SUPPORTED_LANGUAGES.has(button.dataset.langSwitch)
        ? button.dataset.langSwitch
        : SITE_SOURCE_LANGUAGE;

      if (language === getPreferredLanguage()) {
        return;
      }

      setPreferredLanguage(language);
      window.location.reload();
    });
  });

  applyLanguage();
}

function formatEuroAmount(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "";
  }

  return new Intl.NumberFormat(getLocaleForLanguage(getCurrentLanguage()), {
    style: "currency",
    currency: "EUR"
  }).format(amount);
}

function parseSuggestedAmounts(value) {
  return String(value || "")
    .split(",")
    .map((entry) => Number(String(entry).trim().replace(",", ".")))
    .filter((amount) => Number.isFinite(amount) && amount > 0);
}

function getCheckoutModeSettings(settings, purpose) {
  const singleAmount = Number(settings.helloasso_checkout_membership_amount) || 20;
  const coupleAmount = Number(settings.helloasso_checkout_membership_couple_amount) || 30;

  if (purpose === "membership_single") {
    return {
      label:
        settings.helloasso_checkout_membership_item_name ||
        "Adhesion individuelle a La Maison Rose de Wallerand",
      amount: singleAmount,
      locked: true,
      suggestedAmounts: [singleAmount]
    };
  }

  if (purpose === "membership_couple") {
    return {
      label:
        settings.helloasso_checkout_membership_couple_item_name ||
        "Adhesion couple a La Maison Rose de Wallerand",
      amount: coupleAmount,
      locked: true,
      suggestedAmounts: [coupleAmount]
    };
  }

  return {
    label:
      settings.helloasso_checkout_support_item_name ||
      "Soutien a La Maison Rose de Wallerand",
    amount: Number(settings.helloasso_checkout_default_amount) || 50,
    locked: false,
    suggestedAmounts: parseSuggestedAmounts(settings.helloasso_checkout_suggested_amounts)
  };
}

function truncateText(value, limit = 180) {
  if (!value) {
    return "";
  }

  const singleLine = value.replace(/\s+/g, " ").trim();
  return singleLine.length > limit ? `${singleLine.slice(0, limit).trim()}…` : singleLine;
}

function parseDate(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function parseTimeBits(value) {
  const match = (value || "").match(/(\d{1,2})h(?:(\d{2}))?/i);

  if (!match) {
    return { hours: 10, minutes: 0 };
  }

  return {
    hours: Number(match[1]),
    minutes: Number(match[2] || 0)
  };
}

function formatLongDate(value) {
  const parsed = parseDate(value);

  if (!parsed) {
    return value || "";
  }

  return new Intl.DateTimeFormat(getLocaleForLanguage(getCurrentLanguage()), {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsed);
}

function formatShortMonth(value) {
  const parsed = parseDate(value);

  if (!parsed) {
    return { day: "--", month: "" };
  }

  return {
    day: new Intl.DateTimeFormat(getLocaleForLanguage(getCurrentLanguage()), {
      day: "2-digit"
    }).format(parsed),
    month: new Intl.DateTimeFormat(getLocaleForLanguage(getCurrentLanguage()), {
      month: "short",
      year: "2-digit"
    })
      .format(parsed)
      .replace(".", "")
  };
}

function formatMonthYear(value) {
  const parsed = parseDate(value);

  if (!parsed) {
    return "";
  }

  return new Intl.DateTimeFormat(getLocaleForLanguage(getCurrentLanguage()), {
    month: "long",
    year: "numeric"
  }).format(parsed);
}

function sortByDateAscending(left, right) {
  const leftDate = parseDate(left.date);
  const rightDate = parseDate(right.date);

  if (!leftDate && !rightDate) {
    return 0;
  }

  if (!leftDate) {
    return 1;
  }

  if (!rightDate) {
    return -1;
  }

  return leftDate - rightDate;
}

function sortByDateDescending(left, right) {
  return sortByDateAscending(right, left);
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function levelCategory(value) {
  const normalized = normalizeText(value);

  if (normalized.includes("debut") || normalized.includes("begin")) {
    return "deb";
  }

  if (normalized.includes("inter")) {
    return "int";
  }

  if (normalized.includes("avance") || normalized.includes("advanced")) {
    return "adv";
  }

  return "all";
}

function chooseFeatured(items) {
  const upcoming = items
    .filter((item) => item.status !== "passe")
    .sort(sortByDateAscending);
  const featured = upcoming.find((item) => item.featured);

  return featured || upcoming[0] || null;
}

function createRevealObserver() {
  if (revealObserver) {
    return revealObserver;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  return revealObserver;
}

function registerReveals(root = document) {
  const observer = createRevealObserver();

  root.querySelectorAll(".reveal").forEach((element) => {
    if (element.classList.contains("in")) {
      return;
    }

    observer.observe(element);
  });
}

async function fetchCollection(name) {
  if (collectionCache.has(name)) {
    return collectionCache.get(name);
  }

  const response = await fetch(DATA_URLS[name], { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Impossible de charger ${name}`);
  }

  const payload = await response.json();
  const items = Array.isArray(payload.items) ? payload.items : [];
  collectionCache.set(name, items);
  return items;
}

async function fetchSingleton(name) {
  if (singletonCache.has(name)) {
    return singletonCache.get(name);
  }

  const response = await fetch(DATA_URLS[name], { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Impossible de charger ${name}`);
  }

  const payload = await response.json();
  const item = payload && typeof payload.item === "object" ? payload.item : {};
  singletonCache.set(name, item);
  return item;
}

async function fetchSiteSettings() {
  try {
    const item = await fetchSingleton("site");
    return { ...DEFAULT_SITE_SETTINGS, ...item };
  } catch (error) {
    console.warn("Réglages du site indisponibles, valeurs par défaut utilisées.", error);
    return { ...DEFAULT_SITE_SETTINGS };
  }
}

async function fetchPublicConfig() {
  if (publicConfigPromise) {
    return publicConfigPromise;
  }

  publicConfigPromise = fetch("/api/public-config", { cache: "no-store" })
    .then(async (response) => {
      if (!response.ok) {
        return {};
      }

      return response.json();
    })
    .catch(() => ({}));

  return publicConfigPromise;
}

function initNavScroll() {
  const nav = document.getElementById("nav");

  if (!nav || nav.dataset.scrollBound === "true") {
    return;
  }

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  };

  nav.dataset.scrollBound = "true";
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initNewsletterForm() {
  const newsForm = document.getElementById("newsForm");

  if (!newsForm || newsForm.dataset.bound === "true") {
    return;
  }

  newsForm.dataset.bound = "true";
  newsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = document.getElementById("newsOk");

    if (success) {
      success.classList.add("show");
      window.setTimeout(() => success.classList.remove("show"), 4000);
    }

    const input = newsForm.querySelector("input");

    if (input) {
      input.value = "";
    }
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (anchor.dataset.bound === "true") {
      return;
    }

    anchor.dataset.bound = "true";
    anchor.addEventListener("click", (event) => {
      const hash = anchor.getAttribute("href");

      if (!hash || hash.length < 2) {
        return;
      }

      const target = document.querySelector(hash);

      if (!target) {
        return;
      }

      event.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: "smooth" });
    });
  });
}

function initBurger() {
  const nav = document.getElementById("nav");
  const burger = nav ? nav.querySelector(".burger") : null;

  if (!nav || !burger || burger.dataset.bound === "true") {
    return;
  }

  burger.dataset.bound = "true";
  const syncExpanded = () => {
    burger.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
  };

  burger.addEventListener("click", (event) => {
    event.stopPropagation();
    nav.classList.toggle("open");
    syncExpanded();
  });

  nav.querySelectorAll(".menu a, .nav-cta").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      syncExpanded();
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) {
      return;
    }

    if (nav.contains(event.target)) {
      return;
    }

    nav.classList.remove("open");
    syncExpanded();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !nav.classList.contains("open")) {
      return;
    }

    nav.classList.remove("open");
    syncExpanded();
  });

  syncExpanded();
}

function initStageFilters() {
  const buttons = [...document.querySelectorAll(".filter[data-f]")];
  const grid = document.getElementById("stages-grid");

  if (!buttons.length || !grid) {
    return;
  }

  buttons.forEach((button) => {
    if (button.dataset.bound === "true") {
      return;
    }

    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      buttons.forEach((other) => other.classList.remove("on"));
      button.classList.add("on");

      const filter = button.dataset.f;
      grid.querySelectorAll(".stage-card").forEach((card) => {
        const category = card.dataset.cat || "all";
        const status = card.dataset.status || "";
        const shouldShow =
          filter === "all" ||
          category === filter ||
          (filter === "open" && status === "ouvert");

        card.style.display = shouldShow ? "" : "none";
      });
    });
  });
}

function imageTag(url, alt, className = "") {
  return `<img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" class="${className}" loading="lazy" />`;
}

function formatPrice(value) {
  if (!value) {
    return t("stage.info");
  }

  return String(value).replace(/\bEUR\b/gi, "€");
}

function renderStageMedia(stage, index) {
  const stageTitle = localizeField(stage, "title", "Stage");
  const stageLevel = localizeStageLevel(stage.level, stage);
  const stagePrice = localizePrice(stage.price, stage);

  if (stage.image) {
    return `
      <div class="stage-img has-photo">
        ${imageTag(stage.image, stageTitle, "stage-photo")}
        <span class="badge">${escapeHtml(stageLevel)}</span>
        <span class="pricetag">${escapeHtml(formatPrice(stagePrice))}</span>
      </div>
    `;
  }

  const placeholder = PLACEHOLDERS.stage[index % PLACEHOLDERS.stage.length];

  return `
    <div class="stage-img">
      <div class="ph ${placeholder}"></div>
      <span class="badge">${escapeHtml(stageLevel)}</span>
      <span class="pricetag">${escapeHtml(formatPrice(stagePrice))}</span>
    </div>
  `;
}

function renderStageAction(stage) {
  if (stage.status === "complet") {
    return `<span class="reg reg-disabled">${escapeHtml(t("stage.full"))}</span>`;
  }

  if (stage.status === "passe") {
    return `<span class="reg reg-disabled">${escapeHtml(t("stage.ended"))}</span>`;
  }

  if (stage.helloasso_url) {
    return `<a href="${escapeAttr(stage.helloasso_url)}" target="_blank" rel="noopener" class="reg">${t(
      "stage.register"
    )} <span class="arr">→</span></a>`;
  }

  return `<span class="reg reg-disabled">${escapeHtml(t("stage.linkSoon"))}</span>`;
}

function renderStageCard(stage, index, revealClass = "") {
  const cardClass = ["stage-card", "reveal", revealClass].filter(Boolean).join(" ");
  const localizedTitle = localizeField(stage, "title", "Stage");
  const localizedLevel = localizeStageLevel(stage.level, stage);
  const localizedTime = localizeField(stage, "time", stage.time || stage.duration || "");
  const localizedDuration = localizeField(stage, "duration", stage.duration || "");
  const localizedSummary = localizeSummary(stage);
  const meta = [
    formatLongDate(stage.date),
    localizedTime || localizedDuration || "",
    stage.places ? `${stage.places} ${t("stage.places")}` : ""
  ].filter(Boolean);

  return `
    <article class="${cardClass}" data-cat="${levelCategory(localizedLevel || stage.level)}" data-status="${escapeAttr(
      stage.status || ""
    )}">
      ${renderStageMedia(stage, index)}
      <h3>${escapeHtml(localizedTitle)}</h3>
      <div class="meta">
        ${meta.map((entry) => `<span>${escapeHtml(entry)}</span>`).join("")}
      </div>
      <p>${escapeHtml(truncateText(localizedSummary, 170))}</p>
      <div class="actions">
        ${renderStageAction(stage)}
        <span class="more">${escapeHtml(
          stage.status === "passe" ? t("stage.archive") : localizedLevel || t("stage.allLevels")
        )}</span>
      </div>
    </article>
  `;
}

function renderEmptyNote(message) {
  return `<div class="empty-note">${escapeHtml(message)}</div>`;
}

function renderFeatureVisual(event, variant) {
  const imageClass = variant === "home" ? "hl-img" : "img";
  const defaultText = localizeField(event, "title", t("event.generic"));
  const defaultSubtitle = escapeHtml(defaultText);

  if (event.image) {
    return `
      <div class="${imageClass} has-photo">
        ${imageTag(event.image, defaultText, "event-photo")}
      </div>
    `;
  }

  if (variant === "home") {
    return `<div class="hl-img" aria-label="${defaultSubtitle}"></div>`;
  }

  return `<div class="img" aria-label="${defaultText}"></div>`;
}

function startCountdown(event) {
  const countdown = document.getElementById("countdown");

  if (!countdown) {
    return;
  }

  window.clearInterval(countdownTimer);
  const parsedDate = parseDate(event.date);

  if (!parsedDate) {
    return;
  }

  const timeBits = parseTimeBits(event.time);
  const target = new Date(parsedDate);
  target.setHours(timeBits.hours, timeBits.minutes, 0, 0);

  const format = (value) => String(Math.max(0, value)).padStart(2, "0");
  const update = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    countdown.querySelector('[data-k="d"]').textContent = days;
    countdown.querySelector('[data-k="h"]').textContent = format(hours);
    countdown.querySelector('[data-k="m"]').textContent = format(minutes);
    countdown.querySelector('[data-k="s"]').textContent = format(seconds);
  };

  update();
  countdownTimer = window.setInterval(update, 1000);
}

function renderHomeFeaturedEventBlock(event) {
  const localizedTitle = localizeField(event, "title", t("event.generic"));
  const localizedLocation = localizeField(event, "location", "La Maison Rose");
  const localizedEntry = localizeEntry(event.entry, event);
  const localizedSummary = localizeSummary(event);
  const monthBits = formatShortMonth(event.date);

  return `
    <div class="headline-grid">
      <div class="headline-text reveal">
        <span class="tag">${escapeHtml(t("event.featuredHome"))}</span>
        <h2>${escapeHtml(localizedTitle)}</h2>
        <div class="headline-meta">
          <div><div class="lbl">${escapeHtml(t("event.date"))}</div><div class="val">${escapeHtml(formatLongDate(
            event.date
          ))}</div></div>
          <div><div class="lbl">${escapeHtml(t("event.place"))}</div><div class="val">${escapeHtml(
            localizedLocation
          )}</div></div>
          <div><div class="lbl">${escapeHtml(t("event.entry"))}</div><div class="val">${escapeHtml(
            localizedEntry
          )}</div></div>
        </div>
        <p>${escapeHtml(truncateText(localizedSummary, 240))}</p>
        <div class="countdown" id="countdown">
          <div class="cell"><span class="n" data-k="d">—</span><span class="l">${escapeHtml(t("event.days"))}</span></div>
          <div class="cell"><span class="n" data-k="h">—</span><span class="l">${escapeHtml(t("event.hours"))}</span></div>
          <div class="cell"><span class="n" data-k="m">—</span><span class="l">${escapeHtml(t("event.minutes"))}</span></div>
          <div class="cell"><span class="n" data-k="s">—</span><span class="l">${escapeHtml(t("event.seconds"))}</span></div>
        </div>
        <div class="cta-row">
          ${
            event.helloasso_url
              ? `<a href="${escapeAttr(
                  event.helloasso_url
                )}" target="_blank" rel="noopener" class="btn btn-primary">${t("event.reserve")}</a>`
              : `<a href="evenements.html" class="btn btn-primary">${t("event.agenda")}</a>`
          }
          <a href="evenements.html" class="btn btn-ghost">${escapeHtml(t("event.fullProgram"))}</a>
        </div>
      </div>
      <div class="headline-visual reveal d2">
        ${renderFeatureVisual(event, "home")}
        <div class="hl-corner"><span>${escapeHtml(monthBits.day)}<strong>${escapeHtml(
          monthBits.month.split(" ")[0] || "date"
        )}</strong>${escapeHtml(monthBits.month.split(" ")[1] || "")}</span></div>
      </div>
    </div>
  `;
}

function renderEventsFeaturedBlock(event) {
  const localizedTitle = localizeField(event, "title", t("event.generic"));
  const localizedTime = localizeField(event, "time", "À préciser");
  const localizedLocation = localizeField(event, "location", "La Maison Rose");
  const localizedEntry = localizeEntry(event.entry, event);
  const localizedSummary = localizeSummary(event);
  const monthBits = formatShortMonth(event.date);

  return `
    <div class="feat-grid">
      <div class="reveal">
        <span class="tag">${escapeHtml(t("event.featuredPage"))}</span>
        <h2>${escapeHtml(localizedTitle)}</h2>
        <div class="feat-meta">
          <div><div class="lbl">${escapeHtml(t("event.date"))}</div><div class="val">${escapeHtml(formatLongDate(
            event.date
          ))}</div></div>
          <div><div class="lbl">${escapeHtml(t("event.schedule"))}</div><div class="val">${escapeHtml(
            localizedTime
          )}</div></div>
          <div><div class="lbl">${escapeHtml(t("event.place"))}</div><div class="val">${escapeHtml(
            localizedLocation
          )}</div></div>
          <div><div class="lbl">${escapeHtml(t("event.entry"))}</div><div class="val">${escapeHtml(
            localizedEntry
          )}</div></div>
        </div>
        <p>${escapeHtml(truncateText(localizedSummary, 260))}</p>
        <div class="cta-row">
          ${
            event.helloasso_url
              ? `<a href="${escapeAttr(
                  event.helloasso_url
                )}" target="_blank" rel="noopener" class="btn btn-primary">${t("event.reserve")}</a>`
              : `<a href="contact.html" class="btn btn-primary">${t("event.contact")}</a>`
          }
          <a href="contact.html" class="btn btn-ghost">${escapeHtml(t("event.practical"))}</a>
        </div>
      </div>
      <div class="feat-visual reveal d2">
        ${renderFeatureVisual(event, "events")}
        <div class="feat-corner"><span>${escapeHtml(monthBits.day)}<strong>${escapeHtml(
          monthBits.month.split(" ")[0] || "date"
        )}</strong>${escapeHtml(monthBits.month.split(" ")[1] || "")}</span></div>
      </div>
    </div>
  `;
}

function renderEventRow(event) {
  const dateBits = formatShortMonth(event.date);
  const localizedTitle = localizeField(event, "title", t("event.generic"));
  const localizedEntry = localizeEntry(event.entry, event);
  const localizedLocation = localizeField(event, "location", "Auvers-sur-Oise");
  const localizedSummary = localizeSummary(event);
  const wrapperStart = event.helloasso_url
    ? `<a href="${escapeAttr(
        event.helloasso_url
      )}" target="_blank" rel="noopener" class="ev-row">`
    : '<article class="ev-row">';
  const wrapperEnd = event.helloasso_url ? "</a>" : "</article>";
  const category = localizedEntry
    ? `${localizedEntry} · ${localizedLocation}`
    : localizedLocation;

  return `
    ${wrapperStart}
      <div class="ev-date"><span class="day">${escapeHtml(
        dateBits.day
      )}</span><span class="mo">${escapeHtml(dateBits.month)}</span></div>
      <div>
        <h3>${escapeHtml(localizedTitle)}</h3>
        <span class="ev-cat">${escapeHtml(category || t("event.generic"))}</span>
      </div>
      <p>${escapeHtml(truncateText(localizedSummary, 150))}</p>
      <div class="ev-action"><span class="arrow">${event.helloasso_url ? "→" : "•"}</span></div>
    ${wrapperEnd}
  `;
}

function setTextContent(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value;
  });
}

function setLinkContent(selector, href, text) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = text;
    node.setAttribute("href", href);
  });
}

function setHref(selector, href) {
  document.querySelectorAll(selector).forEach((node) => {
    node.setAttribute("href", href);
  });
}

function applyHomeHeroImage(imageUrl) {
  const value = String(imageUrl || "").trim() || DEFAULT_SITE_SETTINGS.home_hero_image;
  const escaped = value.replace(/"/g, '\\"');
  document.documentElement.style.setProperty("--home-hero-image", `url("${escaped}")`);
}

function applySiteSettingsToDom(settings) {
  setTextContent("[data-site-address-line-1]", settings.address_line_1);
  setTextContent("[data-site-address-line-2]", settings.address_line_2);
  setLinkContent(
    "[data-site-email]",
    `mailto:${settings.contact_email}`,
    settings.contact_email
  );
  setLinkContent(
    "[data-site-phone]",
    formatPhoneHref(settings.contact_phone),
    settings.contact_phone
  );
  setHref("[data-site-instagram]", settings.instagram_url);
  setHref("[data-site-helloasso]", settings.helloasso_url);
  applyHomeHeroImage(settings.home_hero_image);
}

async function resolveUtilityAnnouncement(settings) {
  if (settings.announcement_mode === "off") {
    return null;
  }

  if (settings.announcement_mode === "custom" && settings.announcement_text) {
    return {
      prefix: t("common.utility.news"),
      main: settings.announcement_text,
      href: settings.announcement_link || "evenements.html"
    };
  }

  const events = await fetchCollection("evenements");
  const upcoming = events
    .filter((item) => item.status !== "passe")
    .sort(sortByDateAscending);
  const nextEvent = upcoming[0];

  if (!nextEvent) {
    return {
      prefix: t("common.utility.defaultPrefix"),
      main: t("common.utility.defaultMain"),
      href: "le-lieu.html"
    };
  }

  return {
    prefix: t("common.utility.nextEvent"),
    main: `${localizeField(nextEvent, "title", t("event.generic"))} — ${formatLongDate(nextEvent.date)}`,
    href: nextEvent.helloasso_url || "evenements.html"
  };
}

function applyUtilityAnnouncement(announcement) {
  const util = document.getElementById("site-util");
  const link = document.getElementById("site-util-link");
  const prefix = document.getElementById("site-util-prefix");
  const main = document.getElementById("site-util-main");

  if (!util || !link || !prefix || !main) {
    return;
  }

  if (!announcement) {
    util.hidden = true;
    return;
  }

  util.hidden = false;
  prefix.textContent = announcement.prefix;
  main.textContent = announcement.main;
  link.setAttribute("href", announcement.href || "evenements.html");

  if (/^https?:\/\//.test(announcement.href || "")) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  } else {
    link.removeAttribute("target");
    link.removeAttribute("rel");
  }
}

function bindHelloAssoResize() {
  if (helloAssoResizeBound) {
    return;
  }

  helloAssoResizeBound = true;
  window.addEventListener("message", (event) => {
    const frame = document.getElementById("haWidget");

    if (!frame || event.source !== frame.contentWindow) {
      return;
    }

    const height = Number(event.data && event.data.height);

    if (height > 200) {
      frame.style.height = `${height}px`;
    }
  });
}

function renderHelloAssoWidget(settings) {
  const mount = document.getElementById("helloasso-widget");

  if (!mount) {
    return;
  }

  const widgetUrl = normaliseWidgetUrl(settings.helloasso_widget_url);
  const frameHeight = Number(settings.helloasso_widget_height) || 780;

  if (!widgetUrl) {
    mount.innerHTML = `
      <div class="helloasso-fallback">
        <p>${escapeHtml(t("helloasso.noWidget"))}</p>
        <a href="${escapeAttr(
          settings.helloasso_url
        )}" target="_blank" rel="noopener" class="btn btn-primary">${t("helloasso.open")}</a>
      </div>
    `;
    return;
  }

  mount.innerHTML = `
    <iframe
      id="haWidget"
      title="HelloAsso"
      allowtransparency="true"
      scrolling="auto"
      src="${escapeAttr(widgetUrl)}"
      style="width:100%;height:${frameHeight}px;border:none;"
      loading="lazy"
    ></iframe>
  `;

  bindHelloAssoResize();
}

async function hydrateMaps() {
  const frames = document.querySelectorAll("[data-map-frame]");

  if (!frames.length) {
    return;
  }

  const config = await fetchPublicConfig();
  const src =
    config.googleMapsEmbedUrl ||
    "https://www.google.com/maps?q=59%20rue%20Daubigny%2C%2095430%20Auvers-sur-Oise&output=embed";

  frames.forEach((frame) => {
    frame.setAttribute("src", src);
  });

  document.querySelectorAll("[data-map-directions]").forEach((link) => {
    if (config.googleMapsDirectionsUrl) {
      link.setAttribute("href", config.googleMapsDirectionsUrl);
    }
  });
}

function updateContactFormStatus(form, type, message) {
  const ok = form.querySelector("[data-form-ok]");
  const err = form.querySelector("[data-form-error]");

  if (ok) {
    ok.textContent = type === "ok" ? message : "";
    ok.classList.toggle("show", type === "ok");
  }

  if (err) {
    err.textContent = type === "error" ? message : "";
    err.classList.toggle("show", type === "error");
  }
}

function initContactForm() {
  const form = document.getElementById("ctForm");

  if (!form || form.dataset.bound === "true") {
    return;
  }

  form.dataset.bound = "true";
  let formEnabled = true;

  fetchPublicConfig()
    .then((config) => {
      if (config.contactFormEnabled === false) {
        formEnabled = false;
        updateContactFormStatus(
          form,
          "error",
          t("contact.disabled")
        );
      }
    })
    .catch(() => {});

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    updateContactFormStatus(form, "", "");
    form.classList.remove("sent");

    if (!formEnabled) {
      updateContactFormStatus(
        form,
        "error",
        t("contact.inactive")
      );
      return;
    }

    if (button) {
      button.disabled = true;
      button.dataset.label = button.innerHTML;
      button.innerHTML = t("contact.sending");
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || t("contact.error")
        );
      }

      form.reset();
      form.classList.add("sent");
      updateContactFormStatus(
        form,
        "ok",
        t("contact.success")
      );
    } catch (error) {
      updateContactFormStatus(
        form,
        "error",
        error.message || t("contact.configError")
      );
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = button.dataset.label || t("contact.send");
      }
    }
  });
}

function updateCheckoutFormStatus(form, type, message) {
  const ok = form.querySelector("[data-checkout-ok]");
  const err = form.querySelector("[data-checkout-error]");

  if (ok) {
    ok.textContent = type === "ok" ? message : "";
    ok.classList.toggle("show", type === "ok");
  }

  if (err) {
    err.textContent = type === "error" ? message : "";
    err.classList.toggle("show", type === "error");
  }
}

function updateCheckoutReturnState(mount, type, message) {
  if (!mount) {
    return;
  }

  mount.hidden = !message;
  mount.classList.remove("is-ok", "is-error", "is-pending");

  if (!message) {
    mount.innerHTML = "";
    return;
  }

  if (type) {
    mount.classList.add(`is-${type}`);
  }

  mount.innerHTML = `<p>${escapeHtml(message)}</p>`;
}

function setCheckoutSummary(form, settings) {
  const amountField = form.querySelector('[name="amount"]');
  const purposeField = form.querySelector('[name="purpose"]');
  const summary = document.querySelector("[data-checkout-summary]");
  const amount = Number(String(amountField?.value || "").replace(",", "."));
  const purpose = String(purposeField?.value || "support");
  const mode = getCheckoutModeSettings(settings, purpose);

  if (!summary) {
    return;
  }

  form.querySelectorAll("[data-checkout-amount]").forEach((button) => {
    button.classList.toggle(
      "on",
      Number(button.getAttribute("data-checkout-amount")) === amount
    );
  });

  summary.textContent =
    Number.isFinite(amount) && amount > 0
      ? `${mode.label} · ${formatEuroAmount(amount)}`
      : mode.label;
}

function renderCheckoutAmountButtons(form, settings) {
  const mount = form.querySelector("[data-checkout-amounts]");
  const amountField = form.querySelector('[name="amount"]');
  const purposeField = form.querySelector('[name="purpose"]');

  if (!mount || !amountField || !purposeField) {
    return;
  }

  function rerenderButtons() {
    const mode = getCheckoutModeSettings(settings, purposeField.value);

    mount.innerHTML = mode.suggestedAmounts
      .map(
        (amount) => `
          <button type="button" class="amt" data-checkout-amount="${amount}">
            ${escapeHtml(formatEuroAmount(amount))}
          </button>
        `
      )
      .join("");

    amountField.readOnly = mode.locked;
    amountField.value = String(mode.amount);

    mount.querySelectorAll("[data-checkout-amount]").forEach((button) => {
      button.addEventListener("click", () => {
        amountField.value = button.getAttribute("data-checkout-amount") || "";
        amountField.dispatchEvent(new Event("input", { bubbles: true }));
      });
    });

    amountField.dispatchEvent(new Event("input", { bubbles: true }));
  }

  purposeField.addEventListener("change", rerenderButtons);
  rerenderButtons();
}

function isLikelyRealName(value) {
  const normalized = String(value || "").trim();

  if (normalized.length < 2) {
    return false;
  }

  if (!/[aeiouyàâäéèêëîïôöùûüÿæœ]/i.test(normalized)) {
    return false;
  }

  if (/[^a-zàâäéèêëîïôöùûüÿæœç' -]/i.test(normalized)) {
    return false;
  }

  if (/(.)\1\1/i.test(normalized)) {
    return false;
  }

  if (/^(test|admin|unknown|prenom|nom)$/i.test(normalized)) {
    return false;
  }

  return true;
}

async function reconcileCheckoutReturn(mount) {
  const params = new URLSearchParams(window.location.search);
  const checkoutIntentId = params.get("checkoutIntentId");
  const code = params.get("code") || params.get("helloasso") || "";

  if (!checkoutIntentId) {
    if (code === "error") {
      updateCheckoutReturnState(
        mount,
        "error",
        "Le paiement n'a pas abouti. Vous pouvez reessayer ou ouvrir directement HelloAsso."
      );
    }

    return;
  }

  updateCheckoutReturnState(
    mount,
    "pending",
    "Verification du paiement HelloAsso en cours..."
  );

  try {
    const response = await fetch(
      `/api/helloasso/checkout-status?checkoutIntentId=${encodeURIComponent(checkoutIntentId)}`,
      {
        cache: "no-store"
      }
    );
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.message || "Impossible de verifier le paiement HelloAsso.");
    }

    if (result.status === "succeeded" || result.order) {
      const orderId = result.order && result.order.id ? ` Reference ${result.order.id}.` : "";
      updateCheckoutReturnState(
        mount,
        "ok",
        `Paiement confirme. Merci pour votre soutien.${orderId}`
      );
      return;
    }

    if (code && code !== "succeeded") {
      updateCheckoutReturnState(
        mount,
        "error",
        "Le paiement a ete interrompu ou n'a pas encore ete valide."
      );
      return;
    }

    updateCheckoutReturnState(
      mount,
      "pending",
      "Le paiement a ete renvoye par HelloAsso mais n'est pas encore confirme. Rechargez la page dans un instant."
    );
  } catch (error) {
    updateCheckoutReturnState(
      mount,
      "error",
      error.message || "Impossible de verifier le paiement HelloAsso pour le moment."
    );
  }
}

async function initHelloAssoCheckout() {
  const form = document.getElementById("haCheckoutForm");

  if (!form || form.dataset.bound === "true") {
    return;
  }

  form.dataset.bound = "true";

  const amountField = form.querySelector('[name="amount"]');
  const purposeField = form.querySelector('[name="purpose"]');
  const button = form.querySelector('button[type="submit"]');
  const returnState = document.getElementById("helloasso-checkout-return");
  const disabledNote = document.getElementById("helloasso-checkout-disabled");

  let settings = { ...DEFAULT_SITE_SETTINGS };
  let checkoutEnabled = false;

  try {
    const [loadedSettings, config] = await Promise.all([
      fetchSiteSettings(),
      fetchPublicConfig()
    ]);
    settings = loadedSettings;
    checkoutEnabled = Boolean(config.helloAssoCheckoutEnabled);
  } catch (error) {
    console.warn("Impossible d'initialiser le checkout HelloAsso.", error);
  }

  renderCheckoutAmountButtons(form, settings);

  if (amountField) {
    amountField.min = String(Number(settings.helloasso_checkout_min_amount) || 10);
    amountField.addEventListener("input", () => setCheckoutSummary(form, settings));
  }

  if (purposeField) {
    purposeField.addEventListener("change", () => setCheckoutSummary(form, settings));
  }

  setCheckoutSummary(form, settings);

  if (!checkoutEnabled) {
    form.classList.add("is-disabled");

    if (button) {
      button.disabled = true;
    }

    if (disabledNote) {
      disabledNote.hidden = false;
    }
  } else if (disabledNote) {
    disabledNote.hidden = true;
  }

  await reconcileCheckoutReturn(returnState);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    updateCheckoutFormStatus(form, "", "");

    if (!checkoutEnabled) {
      updateCheckoutFormStatus(
        form,
        "error",
        "Le checkout HelloAsso n'est pas encore active sur ce deploiement."
      );
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    const firstName = String(payload.first_name || "").trim();
    const lastName = String(payload.last_name || "").trim();

    if (!isLikelyRealName(firstName) || !isLikelyRealName(lastName) || firstName === lastName) {
      updateCheckoutFormStatus(
        form,
        "error",
        "HelloAsso demande un vrai prénom et un vrai nom. Évite les valeurs de test ou trop approximatives."
      );
      return;
    }

    if (button) {
      button.disabled = true;
      button.dataset.label = button.innerHTML;
      button.innerHTML = "Redirection vers HelloAsso…";
    }

    try {
      const response = await fetch("/api/helloasso/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.redirectUrl) {
        throw new Error(
          result.message ||
            "Le paiement HelloAsso n'a pas pu etre initialise pour le moment."
        );
      }

      window.location.href = result.redirectUrl;
    } catch (error) {
      updateCheckoutFormStatus(
        form,
        "error",
        error.message ||
          "Le paiement HelloAsso n'a pas pu etre initialise pour le moment."
      );

      if (button) {
        button.disabled = false;
        button.innerHTML = button.dataset.label || "Continuer";
      }
    }
  });
}

function renderPastEventCard(event, index, revealClass = "") {
  const cardClass = ["past-card", "reveal", revealClass].filter(Boolean).join(" ");
  const placeholder = PLACEHOLDERS.event[index % PLACEHOLDERS.event.length];
  const localizedTitle = localizeField(event, "title", t("event.archive"));

  return `
    <article class="${cardClass}">
      <div class="img ${event.image ? "has-photo" : ""}">
        ${
          event.image
            ? imageTag(event.image, localizedTitle, "event-photo")
            : `<div class="ph ${placeholder}"></div>`
        }
      </div>
      <span class="yr">— ${escapeHtml(formatMonthYear(event.date) || t("event.archive"))}</span>
      <h4>${escapeHtml(localizedTitle)}</h4>
    </article>
  `;
}

async function renderHomeFeaturedEvent() {
  const mount = document.getElementById("home-featured-event");

  if (!mount) {
    return;
  }

  const events = await fetchCollection("evenements");
  const featured = chooseFeatured(events);

  if (!featured) {
    mount.innerHTML = renderEmptyNote(t("event.emptyFeatured"));
    return;
  }

  mount.innerHTML = renderHomeFeaturedEventBlock(featured);
  startCountdown(featured);
  registerReveals(mount);
}

async function renderStagesPage() {
  const mount = document.getElementById("stages-grid");

  if (!mount) {
    return;
  }

  const archiveMount = document.getElementById("stages-archives");
  const archiveWrap = document.getElementById("stages-archives-wrap");
  const stages = await fetchCollection("stages");
  const upcoming = stages.filter((item) => item.status !== "passe").sort(sortByDateAscending);
  const archived = stages.filter((item) => item.status === "passe").sort(sortByDateDescending);

  mount.innerHTML = upcoming.length
    ? upcoming
        .map((stage, index) =>
          renderStageCard(stage, index, index % 3 === 1 ? "d2" : index % 3 === 2 ? "d3" : "")
        )
        .join("")
    : renderEmptyNote(t("stage.empty"));

  if (archiveMount && archiveWrap) {
    if (archived.length) {
      archiveMount.innerHTML = archived
        .map((stage, index) =>
          renderStageCard(stage, index + 3, index % 3 === 1 ? "d2" : index % 3 === 2 ? "d3" : "")
        )
        .join("");
      archiveWrap.hidden = false;
    } else {
      archiveWrap.hidden = true;
    }
  }

  registerReveals(document);
  initStageFilters();
}

async function renderEvenementsPage() {
  const featureMount = document.getElementById("events-featured");
  const upcomingMount = document.getElementById("events-upcoming");
  const pastMount = document.getElementById("events-past");

  if (!featureMount && !upcomingMount && !pastMount) {
    return;
  }

  const events = await fetchCollection("evenements");
  const featured = chooseFeatured(events);
  const upcoming = events
    .filter((item) => item.status !== "passe" && (!featured || item.slug !== featured.slug))
    .sort(sortByDateAscending);
  const archived = events.filter((item) => item.status === "passe").sort(sortByDateDescending);

  if (featureMount) {
    featureMount.innerHTML = featured
      ? renderEventsFeaturedBlock(featured)
      : renderEmptyNote(t("event.emptyFeatured"));
  }

  if (upcomingMount) {
    upcomingMount.innerHTML = upcoming.length
      ? upcoming.map((event) => renderEventRow(event)).join("")
      : renderEmptyNote(t("event.emptyUpcoming"));
  }

  if (pastMount) {
    pastMount.innerHTML = archived.length
      ? archived
          .map((event, index) =>
            renderPastEventCard(event, index, index % 3 === 1 ? "d2" : index % 3 === 2 ? "d3" : "")
          )
          .join("")
      : renderEmptyNote(t("event.emptyPast"));
  }

  registerReveals(document);
}

function injectChrome(activeKey) {
  const language = getPreferredLanguage();
  clearLegacyTranslateArtifacts();
  setDocumentLanguage(language);

  const navMarkup = `
    <div class="util" id="site-util">
      <a href="evenements.html" id="site-util-link">
        <span id="site-util-prefix">${escapeHtml(t("common.utility.defaultPrefix"))}</span>
        <strong id="site-util-main">${escapeHtml(t("common.utility.defaultMain"))}</strong>
      </a>
    </div>
    <header class="nav" id="nav">
      <div class="nav-inner">
        <a href="index.html" class="brand">
          <span class="brand-mark" aria-hidden="true"><img src="assets/brand-logo.png" alt="" /></span>
          <span class="brand-text">
            <span class="a">${escapeHtml(t("common.brandPrimary"))}</span>
            <span class="b">${escapeHtml(t("common.brandSecondary"))}</span>
          </span>
        </a>
        <nav>
          <ul class="menu" id="site-menu">
            <li><a href="index.html" data-k="home">${escapeHtml(t("common.nav.home"))}</a></li>
            <li><a href="le-lieu.html" data-k="lieu">${escapeHtml(t("common.nav.lieu"))}</a></li>
            <li><a href="stages.html" data-k="stages">${escapeHtml(t("common.nav.stages"))}</a></li>
            <li><a href="evenements.html" data-k="events">${escapeHtml(t("common.nav.events"))}</a></li>
            <li><a href="wallerand.html" data-k="wallerand">${escapeHtml(t("common.nav.wallerand"))}</a></li>
            <li><a href="association.html" data-k="assoc">${escapeHtml(t("common.nav.assoc"))}</a></li>
            <li><a href="contact.html" data-k="contact">${escapeHtml(t("common.nav.contact"))}</a></li>
            <li class="menu-mobile-only"><a href="adherer.html" data-k="adherer">${escapeHtml(t("common.nav.adherer"))}</a></li>
          </ul>
        </nav>
        <div class="nav-actions">
          <div class="lang-switch" aria-label="${escapeAttr(language === "en" ? "Site language" : "Version du site")}">
            <button type="button" class="lang-btn" data-lang-switch="fr" aria-pressed="true">FR</button>
            <button type="button" class="lang-btn" data-lang-switch="en" aria-pressed="false">EN</button>
          </div>
          <a href="adherer.html" class="nav-cta" data-k="adherer">${escapeHtml(t("common.nav.adherer"))} <span class="arr">→</span></a>
          <button class="burger" aria-label="${escapeAttr(language === "en" ? "Menu" : "Menu")}" aria-expanded="false" aria-controls="site-menu">
            <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true"><path d="M0 1h22M0 7h22M0 13h22" stroke="#1A1614" stroke-width="1.5"/></svg>
          </button>
        </div>
      </div>
    </header>
  `;

  const footerMarkup = `
    <footer>
      <div class="wrap">
        <div class="foot-grid">
          <div class="brand-blk">
            <h4>${escapeHtml(t("common.footer.brandTitle"))}</h4>
            <span class="a">${escapeHtml(t("common.footer.brandSubtitle"))}</span>
            <p>${escapeHtml(t("common.footer.brandDescription"))}</p>
          </div>
          <div>
            <h4>${escapeHtml(t("common.footer.visitTitle"))}</h4>
            <ul>
              <li data-site-address-line-1>59 rue Daubigny</li>
              <li data-site-address-line-2>95430 Auvers-sur-Oise</li>
              <li>${escapeHtml(t("common.footer.visitWhen"))}</li>
              <li><a href="contact.html">${escapeHtml(t("common.footer.directions"))}</a></li>
            </ul>
          </div>
          <div class="contact">
            <h4>${escapeHtml(t("common.footer.contactTitle"))}</h4>
            <ul>
              <li><a href="mailto:contact@lamaisonrosedewallerand.com" data-site-email>contact@lamaisonrosedewallerand.com</a></li>
              <li><a href="tel:+33615375672" data-site-phone>+33 6 15 37 56 72</a></li>
              <li><a href="https://www.instagram.com/lamaisonrosedewallerand/" target="_blank" rel="noopener" data-site-instagram>@lamaisonrosedewallerand</a></li>
              <li><a href="https://www.helloasso.com/associations/la-maison-rose-de-wallerand" target="_blank" rel="noopener" data-site-helloasso>${escapeHtml(t("common.footer.helloasso"))}</a></li>
            </ul>
          </div>
          <div>
            <h4>${escapeHtml(t("common.footer.followTitle"))}</h4>
            <p class="foot-note">${escapeHtml(t("common.footer.followNote"))}</p>
            <ul style="margin-top: 18px;">
              <li><a href="evenements.html">${escapeHtml(t("common.footer.events"))}</a></li>
              <li><a href="stages.html">${escapeHtml(t("common.footer.stages"))}</a></li>
              <li><a href="adherer.html">${escapeHtml(t("common.footer.join"))}</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-support">
          <div class="foot-support-copy">
            <span class="ey">${escapeHtml(t("common.footer.supportEyebrow"))}</span>
            <p>${escapeHtml(t("common.footer.supportText"))}</p>
          </div>
          <div class="foot-support-logo">
            <img src="/assets/uploads/logo-patrimoine-ile-de-france.jpg" alt="Logo Patrimoine d’Île-de-France et Région Île-de-France" loading="lazy" />
          </div>
        </div>
        <div class="foot-bot">
          <div>${escapeHtml(t("common.footer.copyright"))}</div>
          <div class="links">
            <a href="index.html">${escapeHtml(t("common.nav.home"))}</a>
            <a href="contact.html">${escapeHtml(t("common.nav.contact"))}</a>
            <a href="admin/">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const navMount = document.getElementById("site-nav");
  const footMount = document.getElementById("site-foot");

  if (navMount) {
    navMount.innerHTML = navMarkup;
  }

  if (footMount) {
    footMount.innerHTML = footerMarkup;
  }

  if (activeKey) {
    const activeLink = document.querySelector(`.menu a[data-k="${activeKey}"]`);

    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  initNavScroll();
  initNewsletterForm();
  initSmoothAnchors();
  initBurger();
  initLanguageSwitcher();
  applyLanguage();

  fetchSiteSettings()
    .then(async (settings) => {
      applySiteSettingsToDom(settings);
      renderHelloAssoWidget(settings);
      applyUtilityAnnouncement(await resolveUtilityAnnouncement(settings));
    })
    .catch((error) => {
      console.warn("Impossible d'appliquer les réglages du site.", error);
    });
}

window.injectChrome = injectChrome;
window.initContactForm = initContactForm;
window.initHelloAssoCheckout = initHelloAssoCheckout;

document.addEventListener("DOMContentLoaded", async () => {
  clearLegacyTranslateArtifacts();
  registerReveals(document);
  initNavScroll();
  initNewsletterForm();
  initSmoothAnchors();
  initBurger();

  try {
    await Promise.all([
      renderHomeFeaturedEvent(),
      renderStagesPage(),
      renderEvenementsPage(),
      hydrateMaps()
    ]);
    applyLanguage();
  } catch (error) {
    console.error(error);
  }
});
