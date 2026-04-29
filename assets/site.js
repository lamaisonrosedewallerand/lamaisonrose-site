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

function formatEuroAmount(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "";
  }

  return new Intl.NumberFormat("fr-FR", {
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

  return new Intl.DateTimeFormat("fr-FR", {
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
    day: new Intl.DateTimeFormat("fr-FR", { day: "2-digit" }).format(parsed),
    month: new Intl.DateTimeFormat("fr-FR", {
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

  return new Intl.DateTimeFormat("fr-FR", {
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

  if (normalized.includes("debut")) {
    return "deb";
  }

  if (normalized.includes("inter")) {
    return "int";
  }

  if (normalized.includes("avance")) {
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
    return "Infos";
  }

  return String(value).replace(/\bEUR\b/gi, "€");
}

function renderStageMedia(stage, index) {
  if (stage.image) {
    return `
      <div class="stage-img has-photo">
        ${imageTag(stage.image, stage.title || "Stage", "stage-photo")}
        <span class="badge">${escapeHtml(stage.level || "Tous niveaux")}</span>
        <span class="pricetag">${escapeHtml(formatPrice(stage.price))}</span>
      </div>
    `;
  }

  const placeholder = PLACEHOLDERS.stage[index % PLACEHOLDERS.stage.length];

  return `
    <div class="stage-img">
      <div class="ph ${placeholder}"></div>
      <span class="badge">${escapeHtml(stage.level || "Tous niveaux")}</span>
      <span class="pricetag">${escapeHtml(formatPrice(stage.price))}</span>
    </div>
  `;
}

function renderStageAction(stage) {
  if (stage.status === "complet") {
    return '<span class="reg reg-disabled">Complet</span>';
  }

  if (stage.status === "passe") {
    return '<span class="reg reg-disabled">Terminé</span>';
  }

  if (stage.helloasso_url) {
    return `<a href="${escapeAttr(stage.helloasso_url)}" target="_blank" rel="noopener" class="reg">S'inscrire <span class="arr">→</span></a>`;
  }

  return '<span class="reg reg-disabled">Lien à venir</span>';
}

function renderStageCard(stage, index, revealClass = "") {
  const cardClass = ["stage-card", "reveal", revealClass].filter(Boolean).join(" ");
  const meta = [
    formatLongDate(stage.date),
    stage.time || stage.duration || "",
    stage.places ? `${stage.places} places` : ""
  ].filter(Boolean);

  return `
    <article class="${cardClass}" data-cat="${levelCategory(stage.level)}" data-status="${escapeAttr(
      stage.status || ""
    )}">
      ${renderStageMedia(stage, index)}
      <h3>${escapeHtml(stage.title || "Stage")}</h3>
      <div class="meta">
        ${meta.map((entry) => `<span>${escapeHtml(entry)}</span>`).join("")}
      </div>
      <p>${escapeHtml(truncateText(stage.descriptionText || stage.body, 170))}</p>
      <div class="actions">
        ${renderStageAction(stage)}
        <span class="more">${escapeHtml(stage.status === "passe" ? "Archive" : stage.level || "Tous niveaux")}</span>
      </div>
    </article>
  `;
}

function renderEmptyNote(message) {
  return `<div class="empty-note">${escapeHtml(message)}</div>`;
}

function renderFeatureVisual(event, variant) {
  const imageClass = variant === "home" ? "hl-img" : "img";
  const defaultText = variant === "home" ? "Estampes" : "Estampes";
  const defaultSubtitle = escapeHtml(event.title || "La Maison Rose");

  if (event.image) {
    return `
      <div class="${imageClass} has-photo">
        ${imageTag(event.image, event.title || "Événement", "event-photo")}
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
  return `
    <div class="headline-grid">
      <div class="headline-text reveal">
        <span class="tag">Événement à la une</span>
        <h2>${escapeHtml(event.title || "Événement")}</h2>
        <div class="headline-meta">
          <div><div class="lbl">Date</div><div class="val">${escapeHtml(formatLongDate(
            event.date
          ))}</div></div>
          <div><div class="lbl">Lieu</div><div class="val">${escapeHtml(
            event.location || "La Maison Rose"
          )}</div></div>
          <div><div class="lbl">Entrée</div><div class="val">${escapeHtml(
            event.entry || "Entrée libre"
          )}</div></div>
        </div>
        <p>${escapeHtml(truncateText(event.descriptionText || event.body, 240))}</p>
        <div class="countdown" id="countdown">
          <div class="cell"><span class="n" data-k="d">—</span><span class="l">Jours</span></div>
          <div class="cell"><span class="n" data-k="h">—</span><span class="l">Heures</span></div>
          <div class="cell"><span class="n" data-k="m">—</span><span class="l">Minutes</span></div>
          <div class="cell"><span class="n" data-k="s">—</span><span class="l">Secondes</span></div>
        </div>
        <div class="cta-row">
          ${
            event.helloasso_url
              ? `<a href="${escapeAttr(
                  event.helloasso_url
                )}" target="_blank" rel="noopener" class="btn btn-primary">Réserver ma venue <span class="arr">→</span></a>`
              : '<a href="evenements.html" class="btn btn-primary">Voir l\'agenda <span class="arr">→</span></a>'
          }
          <a href="evenements.html" class="btn btn-ghost">Programme complet</a>
        </div>
      </div>
      <div class="headline-visual reveal d2">
        ${renderFeatureVisual(event, "home")}
        <div class="hl-corner"><span>${escapeHtml(
          formatShortMonth(event.date).day
        )}<strong>${escapeHtml(
          formatShortMonth(event.date).month.split(" ")[0] || "date"
        )}</strong>${escapeHtml(
          formatShortMonth(event.date).month.split(" ")[1] || ""
        )}</span></div>
      </div>
    </div>
  `;
}

function renderEventsFeaturedBlock(event) {
  return `
    <div class="feat-grid">
      <div class="reveal">
        <span class="tag">À la une</span>
        <h2>${escapeHtml(event.title || "Événement")}</h2>
        <div class="feat-meta">
          <div><div class="lbl">Date</div><div class="val">${escapeHtml(formatLongDate(
            event.date
          ))}</div></div>
          <div><div class="lbl">Horaires</div><div class="val">${escapeHtml(
            event.time || "À préciser"
          )}</div></div>
          <div><div class="lbl">Lieu</div><div class="val">${escapeHtml(
            event.location || "La Maison Rose"
          )}</div></div>
          <div><div class="lbl">Entrée</div><div class="val">${escapeHtml(
            event.entry || "Entrée libre"
          )}</div></div>
        </div>
        <p>${escapeHtml(truncateText(event.descriptionText || event.body, 260))}</p>
        <div class="cta-row">
          ${
            event.helloasso_url
              ? `<a href="${escapeAttr(
                  event.helloasso_url
                )}" target="_blank" rel="noopener" class="btn btn-primary">Réserver ma venue <span class="arr">→</span></a>`
              : '<a href="contact.html" class="btn btn-primary">Nous contacter <span class="arr">→</span></a>'
          }
          <a href="contact.html" class="btn btn-ghost">Informations pratiques</a>
        </div>
      </div>
      <div class="feat-visual reveal d2">
        ${renderFeatureVisual(event, "events")}
        <div class="feat-corner"><span>${escapeHtml(
          formatShortMonth(event.date).day
        )}<strong>${escapeHtml(
          formatShortMonth(event.date).month.split(" ")[0] || "date"
        )}</strong>${escapeHtml(
          formatShortMonth(event.date).month.split(" ")[1] || ""
        )}</span></div>
      </div>
    </div>
  `;
}

function renderEventRow(event) {
  const dateBits = formatShortMonth(event.date);
  const wrapperStart = event.helloasso_url
    ? `<a href="${escapeAttr(
        event.helloasso_url
      )}" target="_blank" rel="noopener" class="ev-row">`
    : '<article class="ev-row">';
  const wrapperEnd = event.helloasso_url ? "</a>" : "</article>";
  const category = event.entry ? `${event.entry} · ${event.location || "Auvers-sur-Oise"}` : event.location;

  return `
    ${wrapperStart}
      <div class="ev-date"><span class="day">${escapeHtml(
        dateBits.day
      )}</span><span class="mo">${escapeHtml(dateBits.month)}</span></div>
      <div>
        <h3>${escapeHtml(event.title || "Événement")}</h3>
        <span class="ev-cat">${escapeHtml(category || "Événement")}</span>
      </div>
      <p>${escapeHtml(truncateText(event.descriptionText || event.body, 150))}</p>
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
      prefix: "Actualité",
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
      prefix: "Lieu culturel · Résidence d'artistes",
      main: "Auvers-sur-Oise · 30 km de Paris",
      href: "le-lieu.html"
    };
  }

  return {
    prefix: "Prochain événement",
    main: `${nextEvent.title} — ${formatLongDate(nextEvent.date)}`,
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
        <p>Aucun widget HelloAsso n'est affiché pour le moment. Retrouvez les campagnes actives, adhésions ou soutiens directement sur la page HelloAsso de l'association.</p>
        <a href="${escapeAttr(
          settings.helloasso_url
        )}" target="_blank" rel="noopener" class="btn btn-primary">Ouvrir HelloAsso <span class="arr">→</span></a>
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
          "L'envoi direct est en cours d'activation sur cette version du site."
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
        "L'envoi direct n'est pas encore active sur ce deploiement."
      );
      return;
    }

    if (button) {
      button.disabled = true;
      button.dataset.label = button.innerHTML;
      button.innerHTML = "Envoi en cours…";
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
          result.message ||
            "Le message n'a pas pu être envoyé pour le moment. Réessaie dans un instant."
        );
      }

      form.reset();
      form.classList.add("sent");
      updateContactFormStatus(
        form,
        "ok",
        "Merci, votre message a bien été envoyé à l'association."
      );
    } catch (error) {
      updateContactFormStatus(
        form,
        "error",
        error.message ||
          "Le message n'a pas pu être envoyé. Vérifie la configuration du formulaire sur Vercel."
      );
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = button.dataset.label || "Envoyer";
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

  return `
    <article class="${cardClass}">
      <div class="img ${event.image ? "has-photo" : ""}">
        ${
          event.image
            ? imageTag(event.image, event.title || "Événement passé", "event-photo")
            : `<div class="ph ${placeholder}"></div>`
        }
      </div>
      <span class="yr">— ${escapeHtml(formatMonthYear(event.date) || "Archive")}</span>
      <h4>${escapeHtml(event.title || "Événement passé")}</h4>
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
    mount.innerHTML = renderEmptyNote("Aucun événement à la une pour le moment.");
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
    : renderEmptyNote("Aucun stage à venir pour le moment.");

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
      : renderEmptyNote("Aucun événement à la une pour le moment.");
  }

  if (upcomingMount) {
    upcomingMount.innerHTML = upcoming.length
      ? upcoming.map((event) => renderEventRow(event)).join("")
      : renderEmptyNote("Aucun autre rendez-vous à venir pour le moment.");
  }

  if (pastMount) {
    pastMount.innerHTML = archived.length
      ? archived
          .map((event, index) =>
            renderPastEventCard(event, index, index % 3 === 1 ? "d2" : index % 3 === 2 ? "d3" : "")
          )
          .join("")
      : renderEmptyNote("Les archives d'événements apparaîtront ici.");
  }

  registerReveals(document);
}

function injectChrome(activeKey) {
  const navMarkup = `
    <div class="util" id="site-util">
      <a href="evenements.html" id="site-util-link">
        <span id="site-util-prefix">Lieu culturel · Résidence d'artistes</span>
        <strong id="site-util-main">Auvers-sur-Oise · 30 km de Paris</strong>
      </a>
    </div>
    <header class="nav" id="nav">
      <div class="nav-inner">
        <a href="index.html" class="brand">
          <span class="brand-mark" aria-hidden="true"><img src="assets/brand-logo.png" alt="" /></span>
          <span class="brand-text">
            <span class="a">La Maison Rose</span>
            <span class="b">de Wallerand · Auvers-sur-Oise</span>
          </span>
        </a>
        <nav>
          <ul class="menu" id="site-menu">
            <li><a href="index.html" data-k="home">Accueil</a></li>
            <li><a href="le-lieu.html" data-k="lieu">Le Lieu</a></li>
            <li><a href="stages.html" data-k="stages">Stages &amp; Cours</a></li>
            <li><a href="evenements.html" data-k="events">Événements</a></li>
            <li><a href="wallerand.html" data-k="wallerand">Wallerand</a></li>
            <li><a href="association.html" data-k="assoc">L'Association</a></li>
            <li><a href="contact.html" data-k="contact">Contact</a></li>
            <li class="menu-mobile-only"><a href="adherer.html" data-k="adherer">Adhérer</a></li>
          </ul>
        </nav>
        <div class="nav-actions">
          <a href="adherer.html" class="nav-cta" data-k="adherer">Adhérer <span class="arr">→</span></a>
          <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="site-menu">
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
            <h4>La Maison Rose</h4>
            <span class="a">de Wallerand</span>
            <p>Ancien atelier d'été de Charles-François Daubigny, devenu lieu culturel, résidence d'artistes et espace de transmission à Auvers-sur-Oise.</p>
          </div>
          <div>
            <h4>Visiter</h4>
            <ul>
              <li data-site-address-line-1>59 rue Daubigny</li>
              <li data-site-address-line-2>95430 Auvers-sur-Oise</li>
              <li>Selon la programmation et sur rendez-vous</li>
              <li><a href="contact.html">Itinéraire →</a></li>
            </ul>
          </div>
          <div class="contact">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@lamaisonrosedewallerand.com" data-site-email>contact@lamaisonrosedewallerand.com</a></li>
              <li><a href="tel:+33615375672" data-site-phone>+33 6 15 37 56 72</a></li>
              <li><a href="https://www.instagram.com/lamaisonrosedewallerand/" target="_blank" rel="noopener" data-site-instagram>@lamaisonrosedewallerand</a></li>
              <li><a href="https://www.helloasso.com/associations/la-maison-rose-de-wallerand" target="_blank" rel="noopener" data-site-helloasso>HelloAsso →</a></li>
            </ul>
          </div>
          <div>
            <h4>Suivre la programmation</h4>
            <p class="foot-note">Retrouvez l'agenda, les stages et les liens d'inscription sur le site et sur HelloAsso, sans paiement ni espace membre interne.</p>
            <ul style="margin-top: 18px;">
              <li><a href="evenements.html">Agenda des événements →</a></li>
              <li><a href="stages.html">Cours et stages de gravure →</a></li>
              <li><a href="adherer.html">Adhérer ou soutenir →</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-support">
          <div class="foot-support-copy">
            <span class="ey">Avec le soutien de</span>
            <p>Patrimoine d’Île-de-France · Région Île-de-France</p>
          </div>
          <div class="foot-support-logo">
            <img src="/assets/uploads/logo-patrimoine-ile-de-france.jpg" alt="Logo Patrimoine d’Île-de-France et Région Île-de-France" loading="lazy" />
          </div>
        </div>
        <div class="foot-bot">
          <div>© 2026 La Maison Rose de Wallerand</div>
          <div class="links">
            <a href="index.html">Accueil</a>
            <a href="contact.html">Contact</a>
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
  } catch (error) {
    console.error(error);
  }
});
