const DATA_URLS = {
  stages: "/assets/data/stages.json",
  evenements: "/assets/data/evenements.json"
};

const STATUS_LABELS = {
  ouvert: "Ouvert",
  complet: "Complet",
  passe: "Passe",
  "a-venir": "A venir"
};

const collectionCache = new Map();

document.addEventListener("DOMContentLoaded", async () => {
  await loadIncludes();
  initNavigation();
  await Promise.all([renderHomepageHighlights(), renderStagesPage(), renderEventsPage()]);
});

async function loadIncludes() {
  const includeNodes = [...document.querySelectorAll("[data-include]")];

  await Promise.all(
    includeNodes.map(async (node) => {
      const includePath = node.dataset.include;

      if (!includePath) {
        return;
      }

      try {
        const response = await fetch(includePath);

        if (!response.ok) {
          throw new Error(`Unable to load partial: ${includePath}`);
        }

        node.outerHTML = await response.text();
      } catch (error) {
        console.error(error);
        node.remove();
      }
    })
  );
}

function initNavigation() {
  const pageKey = document.body.dataset.page;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === pageKey) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");

  if (!nav || !toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    nav.classList.toggle("is-open", !isExpanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

async function fetchCollection(name) {
  if (collectionCache.has(name)) {
    return collectionCache.get(name);
  }

  const response = await fetch(DATA_URLS[name], { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Unable to fetch collection ${name}`);
  }

  const payload = await response.json();
  const items = Array.isArray(payload.items) ? payload.items : [];
  collectionCache.set(name, items);
  return items;
}

async function renderHomepageHighlights() {
  const stagesTarget = document.getElementById("featured-stages");
  const eventsTarget = document.getElementById("featured-events");

  if (!stagesTarget && !eventsTarget) {
    return;
  }

  try {
    const [stages, evenements] = await Promise.all([
      stagesTarget ? fetchCollection("stages") : Promise.resolve([]),
      eventsTarget ? fetchCollection("evenements") : Promise.resolve([])
    ]);

    if (stagesTarget) {
      const featuredStages = pickFeaturedItems(stages, (item) => item.status !== "passe");
      stagesTarget.innerHTML = featuredStages.length
        ? featuredStages.map((item) => renderStageCard(item)).join("")
        : renderEmptyState("Aucun stage n'est encore publie.");
    }

    if (eventsTarget) {
      const featuredEvents = pickFeaturedItems(evenements, (item) => item.status !== "passe");
      eventsTarget.innerHTML = featuredEvents.length
        ? featuredEvents.map((item) => renderEventCard(item)).join("")
        : renderEmptyState("Aucun evenement n'est encore publie.");
    }
  } catch (error) {
    console.error(error);

    if (stagesTarget) {
      stagesTarget.innerHTML = renderEmptyState(
        "Le bloc des stages sera visible apres le premier build Vercel."
      );
    }

    if (eventsTarget) {
      eventsTarget.innerHTML = renderEmptyState(
        "Le bloc des evenements sera visible apres le premier build Vercel."
      );
    }
  }
}

async function renderStagesPage() {
  const target = document.getElementById("stages-list");

  if (!target) {
    return;
  }

  try {
    const stages = await fetchCollection("stages");
    const upcoming = stages
      .filter((stage) => stage.status !== "passe")
      .sort(sortByDateAscending);
    const archived = stages
      .filter((stage) => stage.status === "passe")
      .sort(sortByDateDescending);

    target.innerHTML = [
      renderListingSection(
        "Stages a venir",
        "Les inscriptions restent gerees sur HelloAsso.",
        upcoming,
        renderStageCard,
        "Aucun stage a venir pour le moment."
      ),
      renderListingSection(
        "Stages passes",
        "Archive simple des propositions deja terminees.",
        archived,
        renderStageCard,
        "Aucun stage archive pour le moment."
      )
    ].join("");
  } catch (error) {
    console.error(error);
    target.innerHTML = renderEmptyState(
      "Impossible de charger les stages. Lance d'abord le build ou verifie le fichier assets/data/stages.json."
    );
  }
}

async function renderEventsPage() {
  const target = document.getElementById("events-list");

  if (!target) {
    return;
  }

  try {
    const evenements = await fetchCollection("evenements");
    const upcoming = evenements
      .filter((event) => event.status !== "passe")
      .sort(sortByDateAscending);
    const archived = evenements
      .filter((event) => event.status === "passe")
      .sort(sortByDateDescending);

    target.innerHTML = [
      renderListingSection(
        "Evenements a venir",
        "Expositions, rencontres et rendez-vous du lieu.",
        upcoming,
        renderEventCard,
        "Aucun evenement a venir pour le moment."
      ),
      renderListingSection(
        "Evenements passes",
        "Les temps forts deja ecoules restent visibles ici.",
        archived,
        renderEventCard,
        "Aucun evenement archive pour le moment."
      )
    ].join("");
  } catch (error) {
    console.error(error);
    target.innerHTML = renderEmptyState(
      "Impossible de charger les evenements. Lance d'abord le build ou verifie le fichier assets/data/evenements.json."
    );
  }
}

function renderListingSection(title, description, items, renderItem, emptyMessage) {
  return `
    <section class="listing-section">
      <div class="listing-header">
        <div>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(description)}</p>
        </div>
      </div>
      <div class="listing-grid">
        ${items.length ? items.map((item) => renderItem(item)).join("") : renderEmptyState(emptyMessage)}
      </div>
    </section>
  `;
}

function renderStageCard(stage) {
  const meta = [
    stage.date ? formatDate(stage.date) : "",
    stage.time || "",
    stage.duration || "",
    stage.level || "",
    stage.price || "",
    stage.places ? `${stage.places} place(s)` : ""
  ].filter(Boolean);

  const action = renderStageAction(stage);

  return `
    <article class="listing-card">
      ${renderMedia(stage.image, stage.title)}
      <div class="card-body">
        <div class="badge-row">
          ${renderStatusBadge(stage.status)}
        </div>
        <h3>${escapeHtml(stage.title || "Stage sans titre")}</h3>
        <div class="meta-list">
          ${meta.map((entry) => `<span class="meta-pill">${escapeHtml(entry)}</span>`).join("")}
        </div>
        <div class="card-description">
          ${stage.descriptionHtml || `<p>${escapeHtml(stage.descriptionText || "")}</p>`}
        </div>
        <div class="card-actions">
          ${action}
        </div>
      </div>
    </article>
  `;
}

function renderEventCard(event) {
  const meta = [
    event.date ? formatDate(event.date) : "",
    event.time || "",
    event.location || "",
    event.entry || ""
  ].filter(Boolean);

  const action = renderEventAction(event);

  return `
    <article class="listing-card">
      ${renderMedia(event.image, event.title)}
      <div class="card-body">
        <div class="badge-row">
          ${renderStatusBadge(event.status)}
        </div>
        <h3>${escapeHtml(event.title || "Evenement sans titre")}</h3>
        <div class="meta-list">
          ${meta.map((entry) => `<span class="meta-pill">${escapeHtml(entry)}</span>`).join("")}
        </div>
        <div class="card-description">
          ${event.descriptionHtml || `<p>${escapeHtml(event.descriptionText || "")}</p>`}
        </div>
        <div class="card-actions">
          ${action}
        </div>
      </div>
    </article>
  `;
}

function renderStageAction(stage) {
  if (stage.status === "complet") {
    return '<span class="button button--muted">Complet</span>';
  }

  if (stage.status === "passe") {
    return '<span class="button button--muted">Stage termine</span>';
  }

  if (stage.helloasso_url) {
    return `<a class="button" href="${escapeAttribute(stage.helloasso_url)}" target="_blank" rel="noreferrer">S'inscrire via HelloAsso</a>`;
  }

  return '<span class="button button--muted">Lien HelloAsso a ajouter</span>';
}

function renderEventAction(event) {
  if (event.status === "passe") {
    return '<span class="button button--muted">Evenement termine</span>';
  }

  if (event.helloasso_url) {
    return `<a class="button" href="${escapeAttribute(event.helloasso_url)}" target="_blank" rel="noreferrer">Reserver via HelloAsso</a>`;
  }

  if (event.entry === "Entree libre") {
    return '<span class="button button--secondary">Entree libre</span>';
  }

  return '<span class="button button--muted">Lien de reservation optionnel</span>';
}

function renderMedia(imageUrl, title) {
  if (!imageUrl) {
    return '<div class="card-media card-media--placeholder">Maison Rose</div>';
  }

  return `
    <div class="card-media">
      <img src="${escapeAttribute(imageUrl)}" alt="${escapeAttribute(title || "Visuel")}" loading="lazy" />
    </div>
  `;
}

function renderStatusBadge(status) {
  const safeStatus = status || "ouvert";
  const label = STATUS_LABELS[safeStatus] || safeStatus;
  return `<span class="badge badge--${escapeAttribute(safeStatus)}">${escapeHtml(label)}</span>`;
}

function pickFeaturedItems(items, predicate) {
  const eligible = items.filter(predicate).sort(sortByDateAscending);
  const featured = eligible.filter((item) => Boolean(item.featured));
  const fallback = eligible.filter((item) => !item.featured);

  return [...featured, ...fallback].slice(0, 2);
}

function renderEmptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function formatDate(rawDate) {
  const parsed = parseDate(rawDate);

  if (!parsed) {
    return rawDate;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsed);
}

function parseDate(rawDate) {
  if (!rawDate) {
    return null;
  }

  const parsed = new Date(`${rawDate}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
