const DATA_URLS = {
  stages: "assets/data/stages.json",
  evenements: "assets/data/evenements.json"
};

const PLACEHOLDERS = {
  stage: ["a", "b", "c", "d", "e", "f"],
  event: ["a", "b", "c"]
};

const collectionCache = new Map();
let revealObserver;
let countdownTimer;

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
  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll(".menu a, .nav-cta").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
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
    <div class="util">
      <span>Prochain rendez-vous —</span> <strong>Estampes Auversoises · 29 mai 2026</strong>
    </div>
    <header class="nav" id="nav">
      <div class="nav-inner">
        <a href="index.html" class="brand">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-text">
            <span class="a">La Maison Rose</span>
            <span class="b">de Wallerand · Auvers-sur-Oise</span>
          </span>
        </a>
        <nav>
          <ul class="menu">
            <li><a href="index.html" data-k="home">Accueil</a></li>
            <li><a href="le-lieu.html" data-k="lieu">Le Lieu</a></li>
            <li><a href="stages.html" data-k="stages">Stages &amp; Cours</a></li>
            <li><a href="evenements.html" data-k="events">Événements</a></li>
            <li><a href="wallerand.html" data-k="wallerand">Wallerand</a></li>
            <li><a href="association.html" data-k="assoc">L'Association</a></li>
            <li><a href="contact.html" data-k="contact">Contact</a></li>
          </ul>
        </nav>
        <a href="adherer.html" class="nav-cta">Adhérer <span class="arr">→</span></a>
        <button class="burger" aria-label="Menu">
          <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true"><path d="M0 1h22M0 7h22M0 13h22" stroke="#1A1614" stroke-width="1.5"/></svg>
        </button>
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
            <p>Maison d'art et d'estampes.<br/>Association loi 1901, fondée en 1987 à Auvers-sur-Oise.</p>
          </div>
          <div>
            <h4>Visiter</h4>
            <ul>
              <li>14 rue des Vignes</li>
              <li>95430 Auvers-sur-Oise</li>
              <li>Mer–Dim · 14h–18h</li>
              <li><a href="contact.html">Itinéraire →</a></li>
            </ul>
          </div>
          <div class="contact">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@lamaisonrosedewallerand.com">contact@lamaisonrosedewallerand.com</a></li>
              <li>+33 (0)1 30 36 00 00</li>
              <li><a href="#">Instagram →</a></li>
              <li><a href="#">Facebook →</a></li>
            </ul>
          </div>
          <div class="news">
            <h4>Lettre saisonnière</h4>
            <p style="font-size:14px; margin-bottom:18px;">Quatre fois l'an, l'actualité de la Maison, les stages à venir et les invitations privées.</p>
            <form id="newsForm">
              <input type="email" placeholder="Votre adresse e-mail" required />
              <button type="submit">S'inscrire</button>
              <div class="ok" id="newsOk">Merci, à très bientôt.</div>
            </form>
          </div>
        </div>
        <div class="foot-bot">
          <div>© 2026 La Maison Rose de Wallerand · SIREN 343 567 891</div>
          <div class="links">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Crédits</a>
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
}

window.injectChrome = injectChrome;

document.addEventListener("DOMContentLoaded", async () => {
  registerReveals(document);
  initNavScroll();
  initNewsletterForm();
  initSmoothAnchors();
  initBurger();

  try {
    await Promise.all([renderHomeFeaturedEvent(), renderStagesPage(), renderEvenementsPage()]);
  } catch (error) {
    console.error(error);
  }
});
