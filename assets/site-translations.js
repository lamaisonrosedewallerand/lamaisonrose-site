export const SITE_LANGUAGE_STORAGE_KEY = "maisonrose-language";
export const SITE_SOURCE_LANGUAGE = "fr";
export const SITE_SUPPORTED_LANGUAGES = new Set(["fr", "en"]);

export const LANGUAGE_LOCALES = {
  fr: "fr-FR",
  en: "en-GB"
};

const UI_TRANSLATIONS = {
  fr: {
    common: {
      brandPrimary: "La Maison Rose",
      brandSecondary: "de Wallerand · Auvers-sur-Oise",
      nav: {
        home: "Accueil",
        lieu: "Le Lieu",
        stages: "Stages & Cours",
        events: "Événements",
        wallerand: "Wallerand",
        assoc: "L'Association",
        contact: "Contact",
        adherer: "Adhérer"
      },
      utility: {
        defaultPrefix: "Lieu culturel · Résidence d'artistes",
        defaultMain: "Auvers-sur-Oise · 30 km de Paris",
        nextEvent: "Prochain événement",
        news: "Actualité"
      },
      footer: {
        brandTitle: "La Maison Rose",
        brandSubtitle: "de Wallerand",
        brandDescription:
          "Ancien atelier d'été de Charles-François Daubigny, devenu lieu culturel, résidence d'artistes et espace de transmission à Auvers-sur-Oise.",
        visitTitle: "Visiter",
        visitWhen: "Selon la programmation et sur rendez-vous",
        directions: "Itinéraire →",
        contactTitle: "Contact",
        helloasso: "HelloAsso →",
        followTitle: "Suivre la programmation",
        followNote:
          "Retrouvez l'agenda, les stages et les liens d'inscription sur le site et sur HelloAsso, sans paiement ni espace membre interne.",
        events: "Agenda des événements →",
        stages: "Cours et stages de gravure →",
        join: "Adhérer ou soutenir →",
        supportEyebrow: "Avec le soutien de",
        supportText: "Patrimoine d’Île-de-France · Région Île-de-France",
        copyright: "© 2026 La Maison Rose de Wallerand"
      }
    },
    stage: {
      allLevels: "Tous niveaux",
      info: "Infos",
      onRequest: "Sur demande",
      full: "Complet",
      ended: "Terminé",
      register: "S'inscrire",
      linkSoon: "Lien à venir",
      archive: "Archive",
      places: "places",
      filters: {
        all: "Tous les stages",
        beginner: "Débutant",
        intermediate: "Intermédiaire",
        advanced: "Avancé",
        open: "Ouverts"
      },
      loading: "Chargement des stages…",
      empty: "Aucun stage à venir pour le moment."
    },
    event: {
      featuredHome: "Événement à la une",
      featuredPage: "À la une",
      date: "Date",
      place: "Lieu",
      entry: "Entrée",
      schedule: "Horaires",
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes",
      seconds: "Secondes",
      reserve: "Réserver ma venue <span class=\"arr\">→</span>",
      agenda: "Voir l'agenda <span class=\"arr\">→</span>",
      fullProgram: "Programme complet",
      contact: "Nous contacter <span class=\"arr\">→</span>",
      practical: "Informations pratiques",
      freeEntry: "Entrée libre",
      paidEntry: "Entrée payante",
      generic: "Événement",
      archive: "Archive",
      loadingFeatured: "Chargement de l'événement à la une…",
      loadingUpcoming: "Chargement des rendez-vous…",
      loadingPast: "Chargement des archives…",
      emptyFeatured: "Aucun événement à la une pour le moment.",
      emptyUpcoming: "Aucun autre rendez-vous à venir pour le moment.",
      emptyPast: "Les archives d'événements apparaîtront ici."
    },
    helloasso: {
      noWidget:
        "Aucun widget HelloAsso n'est affiché pour le moment. Retrouvez les campagnes actives, adhésions ou soutiens directement sur la page HelloAsso de l'association.",
      open: "Ouvrir HelloAsso <span class=\"arr\">→</span>"
    },
    contact: {
      send: "Envoyer le message <span class=\"arr\">→</span>",
      sending: "Envoi en cours…",
      success: "Merci, votre message a bien été envoyé à l'association.",
      disabled:
        "L'envoi direct est en cours d'activation sur cette version du site.",
      inactive:
        "L'envoi direct n'est pas encore active sur ce déploiement.",
      error:
        "Le message n'a pas pu être envoyé pour le moment. Réessaie dans un instant.",
      configError:
        "Le message n'a pas pu être envoyé. Vérifie la configuration du formulaire sur Vercel."
    }
  },
  en: {
    common: {
      brandPrimary: "The Pink House",
      brandSecondary: "Wallerand · Auvers-sur-Oise",
      nav: {
        home: "Home",
        lieu: "The House",
        stages: "Workshops",
        events: "Events",
        wallerand: "Wallerand",
        assoc: "The Association",
        contact: "Contact",
        adherer: "Join"
      },
      utility: {
        defaultPrefix: "Cultural venue · Artist residency",
        defaultMain: "Auvers-sur-Oise · 30 km from Paris",
        nextEvent: "Next event",
        news: "News"
      },
      footer: {
        brandTitle: "The Pink House",
        brandSubtitle: "of Wallerand",
        brandDescription:
          "Former Charles-François Daubigny's summer studio, now a cultural venue, artist residency and place of transmission in Auvers-sur-Oise.",
        visitTitle: "Visit",
        visitWhen: "According to the programme and by appointment",
        directions: "Directions →",
        contactTitle: "Contact",
        helloasso: "HelloAsso →",
        followTitle: "Follow the programme",
        followNote:
          "Find the agenda, workshops and registration links on the site and on HelloAsso, with no internal payment flow or member area.",
        events: "Events agenda →",
        stages: "Engraving workshops →",
        join: "Join or support →",
        supportEyebrow: "With the support of",
        supportText: "Île-de-France Heritage · Île-de-France Region",
        copyright: "© 2026 The Pink House of Wallerand"
      }
    },
    stage: {
      allLevels: "All levels",
      info: "Info",
      onRequest: "On request",
      full: "Full",
      ended: "Finished",
      register: "Register",
      linkSoon: "Link coming soon",
      archive: "Archive",
      places: "spots",
      filters: {
        all: "All workshops",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        open: "Open"
      },
      loading: "Loading workshops…",
      empty: "No upcoming workshop at the moment."
    },
    event: {
      featuredHome: "Featured event",
      featuredPage: "Featured",
      date: "Date",
      place: "Venue",
      entry: "Admission",
      schedule: "Times",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      reserve: "Book my visit <span class=\"arr\">→</span>",
      agenda: "See the agenda <span class=\"arr\">→</span>",
      fullProgram: "Full programme",
      contact: "Contact us <span class=\"arr\">→</span>",
      practical: "Practical information",
      freeEntry: "Free entry",
      paidEntry: "Ticketed entry",
      generic: "Event",
      archive: "Archive",
      loadingFeatured: "Loading the featured event…",
      loadingUpcoming: "Loading upcoming events…",
      loadingPast: "Loading archives…",
      emptyFeatured: "No featured event at the moment.",
      emptyUpcoming: "No other upcoming event at the moment.",
      emptyPast: "Past events will appear here."
    },
    helloasso: {
      noWidget:
        "No HelloAsso widget is displayed at the moment. You can still find current membership, support or campaign links directly on the association's HelloAsso page.",
      open: "Open HelloAsso <span class=\"arr\">→</span>"
    },
    contact: {
      send: "Send message <span class=\"arr\">→</span>",
      sending: "Sending…",
      success: "Thank you, your message has been sent to the association.",
      disabled:
        "Direct sending is still being activated on this version of the site.",
      inactive:
        "Direct sending is not active yet on this deployment.",
      error:
        "Your message could not be sent right now. Please try again in a moment.",
      configError:
        "Your message could not be sent. Please check the form configuration on Vercel."
    }
  }
};

const STATIC_PAGE_COPY = {
  index: {
    title: {
      fr: "La Maison Rose de Wallerand — Lieu culturel et résidence d'artistes à Auvers-sur-Oise",
      en: "The Pink House of Wallerand — Cultural venue and artist residency in Auvers-sur-Oise"
    },
    description: {
      fr: "Lieu culturel à Auvers-sur-Oise, ancien atelier d'artistes de Charles-François Daubigny. Résidences, gravure, expositions et événements toute l'année.",
      en: "Cultural venue in Auvers-sur-Oise, the former artists' studio of Charles-François Daubigny. Residencies, engraving workshops, exhibitions and events throughout the year."
    },
    nodes: [
      { selector: ".hero .eyebrow", text: { fr: "Lieu culturel · Résidence d'artistes · Tisseur de liens", en: "Cultural venue · Artist residency · A place that connects people" } },
      { selector: ".hero h1", html: { fr: "La Maison<br/><span class=\"it\">Rose</span> de Wallerand", en: "The <span class=\"it\">Pink</span> House of<br/>Wallerand" } },
      { selector: ".hero .hero-sub", text: { fr: "À 30 km de Paris, au cœur du centre historique d'Auvers-sur-Oise.", en: "30 km from Paris, in the heart of historic Auvers-sur-Oise." } },
      { selector: ".hero .hero-lede", text: { fr: "Ancien atelier d'été de Charles-François Daubigny, la Maison Rose accueille des artistes en résidence, des stages de gravure et des événements culturels tout au long de l'année.", en: "Formerly Charles-François Daubigny's summer studio, the Pink House hosts artists in residence, engraving workshops and cultural events throughout the year." } },
      { selector: ".hero .cta-row .btn-primary", html: { fr: "Découvrir nos stages <span class=\"arr\">→</span>", en: "Discover our workshops <span class=\"arr\">→</span>" } },
      { selector: ".hero .cta-row .btn-ghost", text: { fr: "Voir l'agenda", en: "See the agenda" } },
      { selector: ".hero .hv-frame .img", attrs: { "aria-label": { fr: "Façade de la Maison Rose", en: "Front façade of the Pink House" } } },
      { selector: ".hero .hv-tag.t1 .lbl", text: { fr: "Atelier", en: "Studio" } },
      { selector: ".hero .hv-tag.t1 .val", html: { fr: "<strong>62 m²</strong> · 6 m sous plafond", en: "<strong>62 m²</strong> · 6 m ceiling height" } },
      { selector: ".hero .hv-tag.t2 .lbl", text: { fr: "Résidence", en: "Residency" } },
      { selector: ".hero .hv-tag.t2 .val", html: { fr: "<strong>3 chambres</strong> · patio", en: "<strong>3 rooms</strong> · patio" } },
      { selector: ".hero .scroll-hint span:first-child", text: { fr: "Découvrir", en: "Discover" } },
      { selector: ".manifesto .small", text: { fr: "— L'esprit du lieu —", en: "— The spirit of the house —" } },
      { selector: ".manifesto h2", html: { fr: "Un ancien atelier d'artistes devenu <em>lieu de vie, de résidence et de transmission,</em> pour mieux explorer le présent et l'avenir.", en: "A former artists' studio turned into <em>a lived-in place of residency and transmission,</em> made to explore the present and the future." } },
      { selector: ".manifesto-quote p", text: { fr: "La Maison Rose est avant tout un lieu vivant qui accueille expositions, performances, concerts, conférences, ateliers et rencontres.", en: "The Pink House is first and foremost a living place that welcomes exhibitions, performances, concerts, talks, workshops and encounters." } },
      { selector: ".manifesto-quote .sign", text: { fr: "— La Maison Rose de Wallerand", en: "— The Pink House of Wallerand" } },
      { selector: ".marquee-track", html: { fr: "<span>Eau-forte <span class=\"dot\">✦</span></span><span>Aquatinte <span class=\"dot\">✦</span></span><span>Taille-douce <span class=\"dot\">✦</span></span><span>Pointe sèche <span class=\"dot\">✦</span></span><span>Lithographie <span class=\"dot\">✦</span></span><span>Transfert &amp; impression <span class=\"dot\">✦</span></span><span>Auvers-sur-Oise <span class=\"dot\">✦</span></span><span>Eau-forte <span class=\"dot\">✦</span></span><span>Aquatinte <span class=\"dot\">✦</span></span><span>Taille-douce <span class=\"dot\">✦</span></span><span>Pointe sèche <span class=\"dot\">✦</span></span><span>Lithographie <span class=\"dot\">✦</span></span><span>Transfert &amp; impression <span class=\"dot\">✦</span></span><span>Auvers-sur-Oise <span class=\"dot\">✦</span></span>", en: "<span>Etching <span class=\"dot\">✦</span></span><span>Aquatint <span class=\"dot\">✦</span></span><span>Intaglio <span class=\"dot\">✦</span></span><span>Drypoint <span class=\"dot\">✦</span></span><span>Lithography <span class=\"dot\">✦</span></span><span>Transfer &amp; print <span class=\"dot\">✦</span></span><span>Auvers-sur-Oise <span class=\"dot\">✦</span></span><span>Etching <span class=\"dot\">✦</span></span><span>Aquatint <span class=\"dot\">✦</span></span><span>Intaglio <span class=\"dot\">✦</span></span><span>Drypoint <span class=\"dot\">✦</span></span><span>Lithography <span class=\"dot\">✦</span></span><span>Transfer &amp; print <span class=\"dot\">✦</span></span><span>Auvers-sur-Oise <span class=\"dot\">✦</span></span>" } },
      { selector: ".teasers .sec-head .left .num-tag", text: { fr: "— Découvrir la Maison", en: "— Explore the house" } },
      { selector: ".teasers .sec-head .left h2", html: { fr: "Trois <span class=\"it\">portes</span> d'entrée.", en: "Three ways <span class=\"it\">in.</span>" } },
      { selector: ".teasers .sec-head .right", text: { fr: "Stages, événements, et l'histoire d'un lieu : trois manières d'entrer dans la Maison Rose.", en: "Workshops, events, and the story of a house: three simple ways to step into the Pink House." } },
      { selector: ".teaser-grid .teaser:nth-child(1) .num", text: { fr: "— 01 / Apprendre", en: "— 01 / Learn" } },
      { selector: ".teaser-grid .teaser:nth-child(1) h3", html: { fr: "Stages &amp; <em>cours</em>", en: "Workshops &amp; <em>courses</em>" } },
      { selector: ".teaser-grid .teaser:nth-child(1) p", text: { fr: "Techniques de gravure à l'eau-forte, aquatinte, taille-douce, pointe sèche, lithographie, transfert et impression.", en: "Etching, aquatint, intaglio, drypoint, lithography, transfer and print techniques taught in small-group formats." } },
      { selector: ".teaser-grid .teaser:nth-child(1) .more", text: { fr: "Voir le programme →", en: "See the programme →" } },
      { selector: ".teaser-grid .teaser:nth-child(2) .num", text: { fr: "— 02 / Vivre", en: "— 02 / Experience" } },
      { selector: ".teaser-grid .teaser:nth-child(2) h3", html: { fr: "Événements &amp; <em>expositions</em>", en: "Events &amp; <em>exhibitions</em>" } },
      { selector: ".teaser-grid .teaser:nth-child(2) p", text: { fr: "Expositions, performances artistiques, conférences, concerts, ateliers et rendez-vous ouverts à un public très large.", en: "Exhibitions, performances, talks, concerts, workshops and public encounters open to a wide audience." } },
      { selector: ".teaser-grid .teaser:nth-child(2) .more", text: { fr: "Voir l'agenda →", en: "See what's on →" } },
      { selector: ".teaser-grid .teaser:nth-child(3) .num", text: { fr: "— 03 / Visiter", en: "— 03 / Visit" } },
      { selector: ".teaser-grid .teaser:nth-child(3) h3", html: { fr: "Le <em>lieu,</em> la maison", en: "The <em>house,</em> the place" } },
      { selector: ".teaser-grid .teaser:nth-child(3) p", text: { fr: "Un atelier de 62 m², trois chambres indépendantes, une cuisine équipée, deux salles de bain et un patio au cœur d'Auvers.", en: "A 62 m² studio, three independent rooms, a fully equipped kitchen, two bathrooms and a patio in the heart of Auvers." } },
      { selector: ".teaser-grid .teaser:nth-child(3) .more", text: { fr: "Visiter →", en: "Visit →" } },
      { selector: ".wstrip .num", text: { fr: "— Hommage", en: "— Tribute" } },
      { selector: ".wstrip h2", html: { fr: "Wallerand, <em>un élan qui continue.</em>", en: "Wallerand, <em>a momentum that lives on.</em>" } },
      { selector: ".wstrip .wrap > p:last-of-type", text: { fr: "Wallerand a vécu ici de 2014 à 2021 et a redonné à la Maison Rose sa vocation d'atelier et de foyer d'artistes. Nous poursuivons aujourd'hui cet élan artistique.", en: "Wallerand lived here from 2014 to 2021 and restored the Pink House as a studio and artists' home. We continue that artistic momentum today." } },
      { selector: ".wstrip .btn-light", html: { fr: "Découvrir Wallerand <span class=\"arr\">→</span>", en: "Discover Wallerand <span class=\"arr\">→</span>" } }
    ]
  },
  lieu: {
    title: {
      fr: "Le Lieu — La Maison Rose de Wallerand",
      en: "The House — The Pink House of Wallerand"
    },
    description: {
      fr: "Découvrez La Maison Rose de Wallerand : ancien atelier d'été de Charles-François Daubigny, lieu culturel et résidence d'artistes à Auvers-sur-Oise.",
      en: "Discover the Pink House of Wallerand: the former summer studio of Charles-François Daubigny, now a cultural venue and artist residency in Auvers-sur-Oise."
    },
    nodes: [
      { selector: ".page-hero .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · Le Lieu", en: "<a href=\"index.html\">Home</a> · The House" } },
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Un lieu</span><span class=\"line\">historique</span><em class=\"line\">tourné vers l'avenir.</em>", en: "<span class=\"line\">A historic</span><span class=\"line\">house</span><em class=\"line\">turned toward the future.</em>" } },
      { selector: ".page-hero .lede", text: { fr: "À 30 km de Paris, la Maison Rose réactive l'ancien atelier d'été de Charles-François Daubigny, au cœur d'Auvers-sur-Oise.", en: "30 km from Paris, the Pink House reactivates Charles-François Daubigny's former summer studio in the heart of Auvers-sur-Oise." } },
      { selector: ".place-grid-large .pg:nth-child(1) .lbl", text: { fr: "Façade", en: "Front façade" } },
      { selector: ".place-grid-large .pg:nth-child(2) .lbl", text: { fr: "Exposition & accrochages", en: "Exhibitions & hanging" } },
      { selector: ".place-grid-large .pg:nth-child(3) .lbl", text: { fr: "Détails du lieu", en: "Architectural details" } },
      { selector: ".place-grid-large .pg:nth-child(4) .lbl", text: { fr: "Vie du lieu", en: "Life of the house" } },
      { selector: ".place-grid-large .pg:nth-child(5) .lbl", text: { fr: "Maison en fleurs", en: "House in bloom" } },
      { selector: ".place-grid-large .pg:nth-child(6) .lbl", text: { fr: "Mémoire de la maison", en: "Memory of the house" } },
      { selector: ".history .history-text .num-tag", text: { fr: "— Histoire", en: "— History" } },
      { selector: ".history .history-text h2", html: { fr: "De Daubigny à <em>la Maison Rose d'aujourd'hui.</em>", en: "From Daubigny to <em>today's Pink House.</em>" } },
      { selector: ".history .history-text p:nth-of-type(1)", text: { fr: "En 1870, Charles-François Daubigny achète la grange attenante à sa maison pour en faire un atelier d'été où il peut peindre de grandes toiles et recevoir ses amis artistes.", en: "In 1870, Charles-François Daubigny bought the barn next to his home and turned it into a summer studio where he could paint large canvases and receive fellow artists." } },
      { selector: ".history .history-text p:nth-of-type(2)", text: { fr: "Depuis, le lieu a gardé sa vocation de foyer d'artistes. Plus récemment, Wallerand y a vécu de 2014 à 2021 et lui a redonné un nouvel élan de résidence, d'exposition et de transmission.", en: "Since then, the place has kept its identity as an artists' home. More recently, Wallerand lived here from 2014 to 2021 and gave it fresh energy as a residency, exhibition space and place of transmission." } },
      { selector: ".timeline .ev:nth-child(1) h4", text: { fr: "Daubigny crée son atelier d'été", en: "Daubigny creates his summer studio" } },
      { selector: ".timeline .ev:nth-child(1) p", text: { fr: "La grange attenante devient un lieu de travail et d'accueil pour ses amis artistes.", en: "The adjacent barn becomes a place to work and host fellow artists." } },
      { selector: ".timeline .ev:nth-child(2) h4", text: { fr: "Karl Daubigny prolonge l'histoire", en: "Karl Daubigny extends the story" } },
      { selector: ".timeline .ev:nth-child(2) p", text: { fr: "L'atelier reste lié à la famille Daubigny jusqu'à la mort de Karl, fils du peintre.", en: "The studio remains linked to the Daubigny family until the death of Karl, the painter's son." } },
      { selector: ".timeline .ev:nth-child(3) h4", text: { fr: "Wallerand s'y installe", en: "Wallerand settles here" } },
      { selector: ".timeline .ev:nth-child(3) p", text: { fr: "Le peintre réactive la vocation d'atelier et de foyer d'artistes du lieu.", en: "The painter revives the site's vocation as both a studio and an artists' home." } },
      { selector: ".timeline .ev:nth-child(4) h4", text: { fr: "Un élan qui continue", en: "A momentum that lives on" } },
      { selector: ".timeline .ev:nth-child(4) p", text: { fr: "Après la disparition de Wallerand en novembre 2021, l'association poursuit son projet artistique.", en: "After Wallerand passed away in November 2021, the association continued the artistic project." } },
      { selector: ".timeline .ev:nth-child(5) h4", text: { fr: "Résidences, stages et événements", en: "Residencies, workshops and events" } },
      { selector: ".timeline .ev:nth-child(5) p", text: { fr: "La Maison Rose accueille un public large et des artistes en résidence tout au long de l'année.", en: "The Pink House welcomes a wide audience and artists in residence throughout the year." } },
      { selector: ".visit .sec-head .left .num-tag", text: { fr: "— Visiter", en: "— Visit" } },
      { selector: ".visit .sec-head .left h2", html: { fr: "Venir à <span class=\"it\">la Maison.</span>", en: "Coming to <span class=\"it\">the house.</span>" } },
      { selector: ".visit .sec-head .right", text: { fr: "La résidence est disponible toute l'année et les visites se font selon la programmation ou sur prise de contact préalable.", en: "The residency is available year-round and visits take place according to the programme or by prior arrangement." } },
      { selector: ".visit-card h3", text: { fr: "Informations pratiques", en: "Practical information" } },
      { selector: ".visit-card .row:nth-child(2) .k", text: { fr: "Adresse", en: "Address" } },
      { selector: ".visit-card .row:nth-child(3) .k", text: { fr: "Lieu", en: "Site" } },
      { selector: ".visit-card .row:nth-child(3) .v", text: { fr: "Ancien atelier d'été de Charles-François Daubigny", en: "Former Charles-François Daubigny summer studio" } },
      { selector: ".visit-card .row:nth-child(4) .k", text: { fr: "Capacité", en: "Capacity" } },
      { selector: ".visit-card .row:nth-child(4) .v", text: { fr: "3 chambres indépendantes, cuisine équipée, 2 salles de bain, patio", en: "3 independent rooms, equipped kitchen, 2 bathrooms, patio" } },
      { selector: ".visit-card .row:nth-child(5) .k", text: { fr: "Atelier", en: "Studio" } },
      { selector: ".visit-card .row:nth-child(5) .v", text: { fr: "62 m² avec 6 m sous plafond", en: "62 m² with 6 m ceiling height" } },
      { selector: ".visit-card .row:nth-child(6) .k", text: { fr: "Accès", en: "Access" } },
      { selector: ".visit-card .row:nth-child(6) .v", text: { fr: "À 30 km de Paris, au cœur du centre historique d'Auvers-sur-Oise", en: "30 km from Paris, in the historic centre of Auvers-sur-Oise" } },
      { selector: ".visit-card .row:nth-child(7) .k", text: { fr: "Visite", en: "Visits" } },
      { selector: ".visit-card .row:nth-child(7) .v", text: { fr: "Selon l'agenda et sur rendez-vous", en: "According to the agenda and by appointment" } },
      { selector: ".visit-text h2", html: { fr: "Un lieu atypique, <em>plein de charme.</em>", en: "An unusual place, <em>full of character.</em>" } },
      { selector: ".visit-text p:nth-of-type(1)", text: { fr: "La Maison Rose donne aux artistes la possibilité de résider, travailler et exposer dans un cadre historique chargé d'histoire et de vibrations artistiques.", en: "The Pink House gives artists the opportunity to live, work and exhibit in a historic setting filled with memory and artistic energy." } },
      { selector: ".visit-text p:nth-of-type(2)", text: { fr: "Le projet s'appuie sur ce lieu patrimonial pour mieux explorer le présent, accueillir de nouveaux artistes et proposer au public une programmation vivante.", en: "The project relies on this heritage site to explore the present, welcome new artists and offer the public a lively programme." } },
      { selector: ".visit-text .btn-primary", html: { fr: "Préparer une visite <span class=\"arr\">→</span>", en: "Plan a visit <span class=\"arr\">→</span>" } },
      { selector: ".map", attrs: { title: { fr: "Carte du lieu", en: "Map of the house" } } },
      { selector: ".map-note", text: { fr: "Retrouvez l'ancien atelier d'été de Charles-François Daubigny directement dans Google Maps.", en: "Find Charles-François Daubigny's former summer studio directly in Google Maps." } },
      { selector: "[data-map-directions]", text: { fr: "Ouvrir l'itinéraire", en: "Open directions" } }
    ]
  },
  stages: {
    title: {
      fr: "Stages & Cours — La Maison Rose de Wallerand",
      en: "Workshops — The Pink House of Wallerand"
    },
    description: {
      fr: "Stages de gravure à Auvers-sur-Oise : pointe sèche, taille-douce, aquatinte, lithographie. Tous niveaux, petits groupes.",
      en: "Engraving workshops in Auvers-sur-Oise: drypoint, intaglio, aquatint and lithography. All levels, small groups."
    },
    nodes: [
      { selector: ".page-hero .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · Stages &amp; Cours", en: "<a href=\"index.html\">Home</a> · Workshops" } },
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Apprendre</span><span class=\"line\"><em>le geste,</em></span><span class=\"line\">l'encre, la presse.</span>", en: "<span class=\"line\">Learn</span><span class=\"line\"><em>the gesture,</em></span><span class=\"line\">the ink, the press.</span>" } },
      { selector: ".page-hero .lede", text: { fr: "Cours et stages de gravure, du premier geste à l'impression, selon les techniques et niveaux proposés.", en: "Engraving courses and workshops, from the first gesture to the final print, depending on the technique and level offered." } },
      { selector: ".filters .filter:nth-child(1)", text: { fr: "Tous les stages", en: "All workshops" } },
      { selector: ".filters .filter:nth-child(2)", text: { fr: "Débutant", en: "Beginner" } },
      { selector: ".filters .filter:nth-child(3)", text: { fr: "Intermédiaire", en: "Intermediate" } },
      { selector: ".filters .filter:nth-child(4)", text: { fr: "Avancé", en: "Advanced" } },
      { selector: ".filters .filter:nth-child(5)", text: { fr: "Ouverts", en: "Open" } },
      { selector: "#stages-grid .empty-note", text: { fr: "Chargement des stages…", en: "Loading workshops…" } },
      { selector: "#stages-archives-wrap .sec-head .left .num-tag", text: { fr: "— Archives", en: "— Archives" } },
      { selector: "#stages-archives-wrap .sec-head .left h2", html: { fr: "Stages <span class=\"it\">passés.</span>", en: "Past <span class=\"it\">workshops.</span>" } },
      { selector: "#stages-archives-wrap .sec-head .right", text: { fr: "Les ateliers terminés restent visibles ici pour garder une mémoire du programme.", en: "Finished workshops remain visible here to preserve a memory of the programme." } },
      { selector: ".info-block h2", html: { fr: "Tout ce qu'il faut <em>savoir</em> avant de venir.", en: "Everything you need to <em>know</em> before coming." } },
      { selector: ".info-grid .info-card:nth-child(1) h4", text: { fr: "Techniques", en: "Techniques" } },
      { selector: ".info-grid .info-card:nth-child(1) p", text: { fr: "La programmation mêle techniques de gravure traditionnelles et formats d'initiation, pour débutants comme pour personnes déjà engagées dans une pratique.", en: "The programme combines traditional engraving techniques and introductory formats for beginners as well as for people already engaged in a practice." } },
      { selector: ".info-grid .info-card:nth-child(2) h4", text: { fr: "Inscriptions", en: "Registrations" } },
      { selector: ".info-grid .info-card:nth-child(2) p", text: { fr: "Les fiches à venir peuvent afficher un lien HelloAsso ou un contact d'inscription. Les fiches passées restent visibles pour garder une mémoire claire du programme.", en: "Upcoming cards may display either a HelloAsso link or a direct registration contact. Past cards remain visible to preserve a clear record of the programme." } },
      { selector: ".info-grid .info-card:nth-child(3) h4", text: { fr: "Rythme", en: "Rhythm" } },
      { selector: ".info-grid .info-card:nth-child(3) p", text: { fr: "Le programme évolue au fil de la saison. Quand aucun stage n'est annoncé, les archives restent consultables en attendant les prochaines dates.", en: "The programme evolves through the season. When no upcoming workshop is announced, the archives remain available until the next dates are confirmed." } }
    ]
  },
  events: {
    title: {
      fr: "Événements — La Maison Rose de Wallerand",
      en: "Events — The Pink House of Wallerand"
    },
    description: {
      fr: "Estampes Auversoises, vernissages, concerts au jardin, lectures et résidences. Le calendrier d'une saison à La Maison Rose.",
      en: "Estampes Auversoises, openings, garden concerts, readings and residencies. The rhythm of a season at the Pink House."
    },
    nodes: [
      { selector: ".page-hero .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · Événements", en: "<a href=\"index.html\">Home</a> · Events" } },
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Une saison</span><em class=\"line\">vivante.</em>", en: "<span class=\"line\">A vibrant</span><em class=\"line\">season.</em>" } },
      { selector: ".page-hero .lede", text: { fr: "Expositions, conférences, concerts et ateliers : une programmation vivante tout au long de l'année.", en: "Exhibitions, talks, concerts and workshops: a lively programme throughout the year." } },
      { selector: "#events-featured .empty-note", text: { fr: "Chargement de l'événement à la une…", en: "Loading the featured event…" } },
      { selector: ".agenda .sec-head .left .num-tag", text: { fr: "— Agenda", en: "— Agenda" } },
      { selector: ".agenda .sec-head .left h2", html: { fr: "Tous les <span class=\"it\">rendez-vous.</span>", en: "All the <span class=\"it\">dates.</span>" } },
      { selector: ".agenda .sec-head .right", text: { fr: "Le programme rassemble les rendez-vous à venir et garde la mémoire des saisons précédentes au même endroit.", en: "The programme gathers upcoming dates while keeping the memory of previous seasons in one place." } },
      { selector: "#events-upcoming .empty-note", text: { fr: "Chargement des rendez-vous…", en: "Loading upcoming events…" } },
      { selector: ".past .sec-head .left .num-tag", text: { fr: "— Archives", en: "— Archives" } },
      { selector: ".past .sec-head .left h2", html: { fr: "Saisons <span class=\"it\">passées.</span>", en: "Past <span class=\"it\">seasons.</span>" } },
      { selector: ".past .sec-head .right", text: { fr: "Quelques rendez-vous marquants déjà passés, conservés comme mémoire du lieu.", en: "A few memorable dates from earlier seasons, kept here as part of the house's memory." } },
      { selector: "#events-past .empty-note", text: { fr: "Chargement des archives…", en: "Loading archives…" } }
    ]
  },
  assoc: {
    title: {
      fr: "L'Association — La Maison Rose de Wallerand",
      en: "The Association — The Pink House of Wallerand"
    },
    description: {
      fr: "Association loi 1901 dédiée à l'accès à la culture, aux résidences d'artistes et à la transmission à La Maison Rose de Wallerand.",
      en: "A non-profit association dedicated to access to culture, artist residencies and transmission at the Pink House of Wallerand."
    },
    nodes: [
      { selector: ".page-hero .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · L'Association", en: "<a href=\"index.html\">Home</a> · The Association" } },
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Une association</span><span class=\"line\">de <em>passionnés.</em></span>", en: "<span class=\"line\">An association</span><span class=\"line\">driven by <em>passion.</em></span>" } },
      { selector: ".page-hero .lede", text: { fr: "Association loi 1901, la Maison Rose ouvre l'accès à la culture dans un lieu patrimonial d'Auvers-sur-Oise.", en: "As a non-profit association, the Pink House opens access to culture within a heritage site in Auvers-sur-Oise." } },
      { selector: ".miss .sec-head .left .num-tag", text: { fr: "— Nos missions", en: "— Our missions" } },
      { selector: ".miss .sec-head .left h2", html: { fr: "Trois <span class=\"it\">engagements.</span>", en: "Three lasting <span class=\"it\">commitments.</span>" } },
      { selector: ".miss .sec-head .right", text: { fr: "Faire vivre un patrimoine artistique vivant, accueillir la création contemporaine et transmettre des savoir-faire dans un lieu accessible et inspirant.", en: "Keeping artistic heritage alive, welcoming contemporary creation and passing on skills in a place that remains accessible and inspiring." } },
      { selector: ".miss-grid > div:nth-child(1) h3", html: { fr: "Ouvrir <em>la culture</em>", en: "Open up <em>culture</em>" } },
      { selector: ".miss-grid > div:nth-child(1) p", text: { fr: "L'association permet à un public très large, et notamment à la jeunesse, d'accéder à des expositions, conférences, concerts, performances artistiques et ateliers.", en: "The association enables a wide audience, and especially young people, to access exhibitions, talks, concerts, performances and workshops." } },
      { selector: ".miss-grid > div:nth-child(2) h3", html: { fr: "Accueillir <em>les artistes</em>", en: "Host <em>artists</em>" } },
      { selector: ".miss-grid > div:nth-child(2) p", text: { fr: "La Maison Rose donne la possibilité de résider, travailler et exposer dans l'ancien atelier d'été de Charles-François Daubigny, au cœur d'Auvers-sur-Oise.", en: "The Pink House gives artists the possibility to stay, work and exhibit in Charles-François Daubigny's former summer studio in the heart of Auvers-sur-Oise." } },
      { selector: ".miss-grid > div:nth-child(3) h3", html: { fr: "Transmettre <em>un savoir-faire</em>", en: "Pass on <em>know-how</em>" } },
      { selector: ".miss-grid > div:nth-child(3) p", text: { fr: "Stages de gravure, ateliers ponctuels, rencontres et formats de découverte font circuler les pratiques artistiques dans un esprit de partage.", en: "Engraving workshops, one-off sessions, encounters and discovery formats help artistic practices circulate in a spirit of sharing." } },
      { selector: ".stats .stat:nth-child(1) .l", text: { fr: "de Paris, au cœur d'Auvers-sur-Oise", en: "from Paris, in the heart of Auvers-sur-Oise" } },
      { selector: ".stats .stat:nth-child(2) .l", text: { fr: "d'atelier avec 6 m sous plafond", en: "studio with a 6 m ceiling height" } },
      { selector: ".stats .stat:nth-child(3) .l", text: { fr: "chambres indépendantes pour les résidences", en: "independent rooms for residencies" } },
      { selector: ".stats .stat:nth-child(4) .l", text: { fr: "pour la résidence, les stages et les événements", en: "for residencies, workshops and events" } },
      { selector: ".team .sec-head .left .num-tag", text: { fr: "— Programmation", en: "— Programme" } },
      { selector: ".team .sec-head .left h2", html: { fr: "Ce que nous <span class=\"it\">organisons.</span>", en: "What we <span class=\"it\">organise.</span>" } },
      { selector: ".team .sec-head .right", text: { fr: "Une programmation pensée pour faire dialoguer patrimoine, création contemporaine et accès simple à la culture.", en: "A programme designed to connect heritage, contemporary creation and straightforward access to culture." } },
      { selector: ".team-grid .person:nth-child(1) .role", text: { fr: "— Expositions", en: "— Exhibitions" } },
      { selector: ".team-grid .person:nth-child(1) h4", text: { fr: "Expositions & estampes", en: "Exhibitions & prints" } },
      { selector: ".team-grid .person:nth-child(1) p", text: { fr: "Les Estampes Auversoises, les expositions temporaires et les accrochages thématiques donnent leur rythme à la saison.", en: "Les Estampes Auversoises, temporary exhibitions and thematic hangings set the rhythm of the season." } },
      { selector: ".team-grid .person:nth-child(2) .role", text: { fr: "— Résidences", en: "— Residencies" } },
      { selector: ".team-grid .person:nth-child(2) h4", text: { fr: "Résidences d'artistes", en: "Artist residencies" } },
      { selector: ".team-grid .person:nth-child(2) p", text: { fr: "Le lieu accueille des artistes qui viennent travailler, séjourner et exposer dans un cadre patrimonial et inspirant.", en: "The house welcomes artists who come to work, stay and exhibit within a heritage setting full of inspiration." } },
      { selector: ".team-grid .person:nth-child(3) .role", text: { fr: "— Transmission", en: "— Transmission" } },
      { selector: ".team-grid .person:nth-child(3) h4", text: { fr: "Stages & ateliers", en: "Workshops & sessions" } },
      { selector: ".team-grid .person:nth-child(3) p", text: { fr: "Gravure, initiation, jeunes publics et ateliers ponctuels prolongent l'esprit d'atelier et la circulation des savoirs.", en: "Engraving, initiation, youth formats and one-off workshops extend the studio spirit and the circulation of knowledge." } },
      { selector: ".team-grid .person:nth-child(4) .role", text: { fr: "— Rencontres", en: "— Encounters" } },
      { selector: ".team-grid .person:nth-child(4) h4", text: { fr: "Conférences, concerts, performances", en: "Talks, concerts, performances" } },
      { selector: ".team-grid .person:nth-child(4) p", text: { fr: "La Maison Rose ouvre ses portes à des formats variés pour faire vivre la culture dans toute sa diversité.", en: "The Pink House opens its doors to varied formats in order to make culture live in all its diversity." } },
      { selector: ".docs .sec-head .left .num-tag", text: { fr: "— Explorer", en: "— Explore" } },
      { selector: ".docs .sec-head .left h2", html: { fr: "Découvrir <span class=\"it\">l'association.</span>", en: "Discover <span class=\"it\">the association.</span>" } },
      { selector: ".docs .sec-head .right", text: { fr: "Pour visiter, suivre la programmation ou soutenir l'association, tout passe par quelques entrées simples.", en: "To visit, follow the programme or support the association, everything starts from a few simple entry points." } },
      { selector: ".docs-grid .doc:nth-child(1) h4", text: { fr: "Le lieu et son histoire", en: "The house and its history" } },
      { selector: ".docs-grid .doc:nth-child(1) .meta", text: { fr: "Visiter la Maison Rose", en: "Visit the Pink House" } },
      { selector: ".docs-grid .doc:nth-child(2) h4", text: { fr: "Voir les stages de gravure", en: "See engraving workshops" } },
      { selector: ".docs-grid .doc:nth-child(2) .meta", text: { fr: "Cours, ateliers, techniques", en: "Courses, workshops, techniques" } },
      { selector: ".docs-grid .doc:nth-child(3) h4", text: { fr: "Consulter l'agenda", en: "Browse the agenda" } },
      { selector: ".docs-grid .doc:nth-child(3) .meta", text: { fr: "Expositions, concerts, rencontres", en: "Exhibitions, concerts, encounters" } },
      { selector: ".docs-grid .doc:nth-child(4) h4", text: { fr: "Soutenir via HelloAsso", en: "Support via HelloAsso" } },
      { selector: ".docs-grid .doc:nth-child(4) .meta", text: { fr: "Adhésions et dons", en: "Memberships and donations" } }
    ]
  },
  contact: {
    title: {
      fr: "Contact — La Maison Rose de Wallerand",
      en: "Contact — The Pink House of Wallerand"
    },
    description: {
      fr: "Adresse, e-mail, téléphone et accès à La Maison Rose de Wallerand à Auvers-sur-Oise.",
      en: "Address, email, phone number and access details for the Pink House of Wallerand in Auvers-sur-Oise."
    },
    nodes: [
      { selector: ".page-hero .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · Contact", en: "<a href=\"index.html\">Home</a> · Contact" } },
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Nous <em>écrire,</em></span><span class=\"line\">venir nous voir.</span>", en: "<span class=\"line\">Write to us,</span><span class=\"line\"><em>come and visit.</em></span>" } },
      { selector: ".page-hero .lede", text: { fr: "Pour une résidence, un stage ou une visite, écrivez-nous ou appelez-nous. Le site transmet votre demande directement à l'association.", en: "For a residency, a workshop or a visit, write to us or call us. The site forwards your request directly to the association." } },
      { selector: ".ct-form h3", html: { fr: "Envoyer un <em>message</em>", en: "Send a <em>message</em>" } },
      { selector: ".ct-form .lede", text: { fr: "Le formulaire envoie directement votre message à l'association depuis le site. Aucune donnée n'est stockée ici.", en: "This form sends your message directly to the association from the site. No data is stored here." } },
      { selector: "label[for=\"contact-first-name\"]", text: { fr: "Prénom *", en: "First name *" } },
      { selector: "label[for=\"contact-last-name\"]", text: { fr: "Nom *", en: "Last name *" } },
      { selector: "label[for=\"contact-email\"]", text: { fr: "E-mail *", en: "Email *" } },
      { selector: "label[for=\"contact-phone\"]", text: { fr: "Téléphone", en: "Phone" } },
      { selector: "label[for=\"contact-topic\"]", text: { fr: "Sujet *", en: "Subject *" } },
      { selector: ".ct-form select option:nth-child(1)", text: { fr: "— Choisir —", en: "— Select —" } },
      { selector: ".ct-form select option:nth-child(2)", text: { fr: "Renseignements stages", en: "Workshop information" } },
      { selector: ".ct-form select option:nth-child(3)", text: { fr: "Visite de groupe", en: "Group visit" } },
      { selector: ".ct-form select option:nth-child(4)", text: { fr: "Résidence d'artiste", en: "Artist residency" } },
      { selector: ".ct-form select option:nth-child(5)", text: { fr: "Événement ou exposition", en: "Event or exhibition" } },
      { selector: ".ct-form select option:nth-child(6)", text: { fr: "Presse & partenariats", en: "Press & partnerships" } },
      { selector: ".ct-form select option:nth-child(7)", text: { fr: "Autre", en: "Other" } },
      { selector: "label[for=\"contact-message\"]", text: { fr: "Votre message *", en: "Your message *" } },
      { selector: ".ct-form .btn-primary", html: { fr: "Envoyer le message <span class=\"arr\">→</span>", en: "Send message <span class=\"arr\">→</span>" } },
      { selector: ".ct-info h3", html: { fr: "Nos <em>coordonnées</em>", en: "Our <em>details</em>" } },
      { selector: ".ct-info .blk:nth-child(2) .lbl", text: { fr: "Adresse", en: "Address" } },
      { selector: ".ct-info .blk:nth-child(3) .lbl", text: { fr: "E-mail", en: "Email" } },
      { selector: ".ct-info .blk:nth-child(4) .lbl", text: { fr: "Téléphone", en: "Phone" } },
      { selector: ".ct-info .blk:nth-child(5) .lbl", text: { fr: "Accueil", en: "Reception" } },
      { selector: ".ct-info .blk:nth-child(5) .val", html: { fr: "Selon la programmation<br/>et sur rendez-vous", en: "According to the programme<br/>and by appointment" } },
      { selector: ".ct-info .blk:nth-child(6) .lbl", text: { fr: "Instagram", en: "Instagram" } },
      { selector: ".ct-info .blk:nth-child(7) .lbl", text: { fr: "Pratique", en: "Practical" } },
      { selector: ".ct-info .blk:nth-child(7) .val", text: { fr: "Les inscriptions, adhésions et paiements restent gérés sur HelloAsso. Le site sert uniquement à présenter la programmation et à vous orienter.", en: "Registrations, memberships and payments remain managed on HelloAsso. This site simply presents the programme and points you in the right direction." } },
      { selector: ".map", attrs: { title: { fr: "Carte La Maison Rose de Wallerand", en: "Map — The Pink House of Wallerand" } } },
      { selector: ".map-note", text: { fr: "Carte Google Maps centrée sur la Maison Rose, avec itinéraire possible en un clic.", en: "Google Maps view centred on the Pink House, with one-click directions." } },
      { selector: "[data-map-directions]", text: { fr: "Itinéraire Google Maps", en: "Open in Google Maps" } }
    ]
  },
  join: {
    title: {
      fr: "Adhérer — La Maison Rose de Wallerand",
      en: "Join — The Pink House of Wallerand"
    },
    description: {
      fr: "Soutenez La Maison Rose de Wallerand via HelloAsso. Le site présente l'association et renvoie vers les liens d'adhésion et de don.",
      en: "Support the Pink House of Wallerand via HelloAsso. The site presents the association and directs visitors to membership and donation links."
    },
    nodes: [
      { selector: ".join-head .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · Adhérer", en: "<a href=\"index.html\">Home</a> · Join" } },
      { selector: ".join-head .num-tag", text: { fr: "— Soutenir la Maison", en: "— Support the association" } },
      { selector: ".join-head h1", html: { fr: "Soutenez la création,<br/><em>rejoignez la Maison.</em>", en: "Support creation,<br/><em>join the association.</em>" } },
      { selector: ".join-head p", text: { fr: "Le site ne gère ni paiement ni compte utilisateur : les adhésions et soutiens passent entièrement par HelloAsso.", en: "The site does not manage payments or user accounts: memberships and donations are handled entirely through HelloAsso." } },
      { selector: ".tiers .tier:nth-child(1) .lvl", text: { fr: "— Adhésion", en: "— Membership" } },
      { selector: ".tiers .tier:nth-child(1) h3", text: { fr: "Adhésion individuelle", en: "Individual membership" } },
      { selector: ".tiers .tier:nth-child(1) .price .b", text: { fr: "par an", en: "per year" } },
      { selector: ".tiers .tier:nth-child(1) li:nth-child(1)", text: { fr: "Accéder à la programmation et soutenir le lieu", en: "Access the programme and support the house" } },
      { selector: ".tiers .tier:nth-child(1) li:nth-child(2)", text: { fr: "Payer directement sur HelloAsso", en: "Pay directly on HelloAsso" } },
      { selector: ".tiers .tier:nth-child(1) li:nth-child(3)", text: { fr: "Recevoir les confirmations depuis la plateforme", en: "Receive confirmations directly from the platform" } },
      { selector: ".tiers .tier:nth-child(1) li:nth-child(4)", text: { fr: "Ne laisser aucune donnée bancaire sur le site vitrine", en: "Keep bank details entirely off the showcase site" } },
      { selector: ".tiers .tier:nth-child(1) .btn-primary", html: { fr: "Ouvrir HelloAsso <span class=\"arr\">→</span>", en: "Open HelloAsso <span class=\"arr\">→</span>" } },
      { selector: ".tiers .tier:nth-child(2) .ribbon", text: { fr: "Recommandé", en: "Recommended" } },
      { selector: ".tiers .tier:nth-child(2) .lvl", text: { fr: "— Couple", en: "— Couple" } },
      { selector: ".tiers .tier:nth-child(2) h3", text: { fr: "Adhésion couple", en: "Couple membership" } },
      { selector: ".tiers .tier:nth-child(2) .price .b", text: { fr: "par an", en: "per year" } },
      { selector: ".tiers .tier:nth-child(2) li:nth-child(1)", text: { fr: "Formule idéale pour soutenir la Maison à deux", en: "An ideal way to support the house as a pair" } },
      { selector: ".tiers .tier:nth-child(2) li:nth-child(2)", text: { fr: "Gestion complète sur la plateforme HelloAsso", en: "Everything stays managed on the HelloAsso platform" } },
      { selector: ".tiers .tier:nth-child(2) li:nth-child(3)", text: { fr: "Confirmation et reçu depuis le parcours officiel", en: "Confirmation and receipt provided by the official flow" } },
      { selector: ".tiers .tier:nth-child(2) li:nth-child(4)", text: { fr: "Parcours plus fiable que le checkout embarqué", en: "More reliable than embedding a custom checkout flow" } },
      { selector: ".tiers .tier:nth-child(2) li:nth-child(5)", text: { fr: "Un seul point d'entrée pour toutes les campagnes", en: "A single entry point for all active campaigns" } },
      { selector: ".tiers .tier:nth-child(2) .btn-primary", html: { fr: "Ouvrir HelloAsso <span class=\"arr\">→</span>", en: "Open HelloAsso <span class=\"arr\">→</span>" } },
      { selector: ".tiers .tier:nth-child(3) .lvl", text: { fr: "— Soutien", en: "— Support" } },
      { selector: ".tiers .tier:nth-child(3) h3", text: { fr: "Don libre", en: "Flexible donation" } },
      { selector: ".tiers .tier:nth-child(3) .price .a", text: { fr: "Montant", en: "Amount" } },
      { selector: ".tiers .tier:nth-child(3) .price .b", text: { fr: "au choix", en: "of your choice" } },
      { selector: ".tiers .tier:nth-child(3) li:nth-child(1)", text: { fr: "Soutenir résidences, expositions et ateliers", en: "Support residencies, exhibitions and workshops" } },
      { selector: ".tiers .tier:nth-child(3) li:nth-child(2)", text: { fr: "Choisir librement le montant sur HelloAsso", en: "Choose any amount directly on HelloAsso" } },
      { selector: ".tiers .tier:nth-child(3) li:nth-child(3)", text: { fr: "Conserver un paiement 100% externe au site", en: "Keep the payment flow fully external to the site" } },
      { selector: ".tiers .tier:nth-child(3) li:nth-child(4)", text: { fr: "Revenir ensuite ici pour suivre l'agenda", en: "Come back here afterwards to follow the programme" } },
      { selector: ".tiers .tier:nth-child(3) .btn-primary", html: { fr: "Ouvrir HelloAsso <span class=\"arr\">→</span>", en: "Open HelloAsso <span class=\"arr\">→</span>" } },
      { selector: ".why .num-tag", text: { fr: "— Pourquoi adhérer", en: "— Why join" } },
      { selector: ".why h2", html: { fr: "Un soutien <em>simple et clair.</em>", en: "A <em>clear and simple</em> way to support." } },
      { selector: ".why p:nth-of-type(1)", text: { fr: "La Maison Rose permet à un public très large d'avoir accès à la culture en organisant régulièrement des événements culturels libres d'accès dans un lieu magnifique, inspirant et chargé d'histoire.", en: "The Pink House makes culture accessible to a wide audience by regularly organising freely accessible cultural events in a beautiful, inspiring and historically charged place." } },
      { selector: ".why p:nth-of-type(2)", text: { fr: "Le choix d'un site statique relié à HelloAsso garde une gestion légère : la programmation reste facile à consulter, tandis que les adhésions et paiements restent centralisés sur une plateforme dédiée.", en: "Using a static website connected to HelloAsso keeps things light: the programme stays easy to browse while memberships and payments remain centralised on a dedicated platform." } },
      { selector: ".why .pull", html: { fr: "La culture est pensée ici comme un remède puissant aux maux de notre société, à travers les expositions, les performances, les conférences, les concerts et les ateliers.<span class=\"sign\">— Présentation HelloAsso de l'association</span>", en: "Culture is thought of here as a powerful remedy to the ills of our society, through exhibitions, performances, talks, concerts and workshops.<span class=\"sign\">— Association presentation on HelloAsso</span>" } },
      { selector: ".faq h2", html: { fr: "Questions <em>fréquentes</em>", en: "Frequently asked <em>questions</em>" } },
      { selector: ".faq .faq-item:nth-child(2) .q span", html: { fr: "Comment se passe le <em>paiement</em> ?", en: "How does the <em>payment</em> work?" } },
      { selector: ".faq .faq-item:nth-child(2) .a p", text: { fr: "Le paiement et les éventuelles adhésions se font uniquement sur HelloAsso. Le site vitrine n'encaisse rien directement.", en: "Payments and any memberships take place only on HelloAsso. The showcase site does not collect money directly." } },
      { selector: ".faq .faq-item:nth-child(3) .q span", html: { fr: "Que trouve-t-on sur <em>HelloAsso</em> ?", en: "What can you find on <em>HelloAsso</em>?" } },
      { selector: ".faq .faq-item:nth-child(3) .a p", text: { fr: "La page HelloAsso centralise les actions actives de l'association : adhésions, soutiens ou campagnes en cours lorsqu'elles sont ouvertes.", en: "The HelloAsso page centralises the association's active actions: memberships, support links and current campaigns whenever they are open." } },
      { selector: ".faq .faq-item:nth-child(4) .q span", html: { fr: "Et s'il n'y a pas de campagne <em>ouverte</em> ?", en: "What if no campaign is <em>open</em>?" } },
      { selector: ".faq .faq-item:nth-child(4) .a p", text: { fr: "Dans ce cas, la page HelloAsso de l'association reste le bon point d'entrée. Vous pouvez aussi écrire directement à la Maison Rose depuis la page contact.", en: "In that case, the association's HelloAsso page remains the right entry point. You can also write directly to the Pink House from the contact page." } },
      { selector: ".faq .faq-item:nth-child(5) .q span", html: { fr: "Faut-il créer un <em>compte</em> sur le site ?", en: "Do I need a site <em>account</em>?" } },
      { selector: ".faq .faq-item:nth-child(5) .a p", text: { fr: "Non. Le site reste volontairement simple : il présente les contenus et renvoie vers HelloAsso pour les démarches qui demandent une inscription ou un paiement.", en: "No. The site stays intentionally simple: it presents the content and redirects to HelloAsso for any step that requires registration or payment." } }
    ]
  },
  wallerand: {
    title: {
      fr: "Wallerand — La Maison Rose de Wallerand",
      en: "Wallerand — The Pink House of Wallerand"
    },
    description: {
      fr: "Hommage à Wallerand (1964–2021), artiste qui a redonné à la Maison Rose sa vocation d'atelier et de foyer d'artistes.",
      en: "A tribute to Wallerand (1964–2021), the artist who restored the Pink House as a studio and artists' home."
    },
    nodes: [
      { selector: ".w-hero .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · Wallerand", en: "<a href=\"index.html\">Home</a> · Wallerand" } },
      { selector: ".w-text .num-tag", text: { fr: "— Hommage", en: "— Tribute" } },
      { selector: ".w-text h1", html: { fr: "Wallerand,<br/><em>un élan qui continue.</em>", en: "Wallerand,<br/><em>a momentum that lives on.</em>" } },
      { selector: ".w-text .yrs", text: { fr: "1964 — novembre 2021", en: "1964 — November 2021" } },
      { selector: ".w-text p:nth-of-type(1)", text: { fr: "Wallerand est né en 1964. Après une grande école d'art parisienne, il dispense des cours à des jeunes au musée d'Orsay.", en: "Wallerand was born in 1964. After attending a major Paris art school, he taught young audiences at the Musée d'Orsay." } },
      { selector: ".w-text p:nth-of-type(2)", text: { fr: "De 2014 à 2021, il redonne à la Maison Rose sa vocation d'atelier et de foyer d'artistes. L'association poursuit aujourd'hui cet élan artistique.", en: "From 2014 to 2021, he restored the Pink House as both a studio and an artists' home. The association continues that artistic momentum today." } },
      { selector: ".bio aside h4", text: { fr: "Repères", en: "Landmarks" } },
      { selector: ".bio aside li:nth-child(1) a", text: { fr: "Formation", en: "Training" } },
      { selector: ".bio aside li:nth-child(2) a", text: { fr: "Art27", en: "Art27" } },
      { selector: ".bio aside li:nth-child(3) a", text: { fr: "Vision de l'art", en: "Vision of art" } },
      { selector: ".bio aside li:nth-child(4) a", text: { fr: "Transmission", en: "Transmission" } },
      { selector: ".bio aside li:nth-child(5) a", text: { fr: "Héritage", en: "Legacy" } },
      { selector: ".works h2", html: { fr: "Quelques <em>œuvres</em>.", en: "A few <em>works</em>." } },
      { selector: ".works .work:nth-child(1) .cap", text: { fr: "Peintures", en: "Paintings" } },
      { selector: ".works .work:nth-child(2) .cap", text: { fr: "Photographies", en: "Photographs" } },
      { selector: ".works .work:nth-child(3) .cap", text: { fr: "Dessins", en: "Drawings" } },
      { selector: ".works .work:nth-child(4) .cap", text: { fr: "Installations", en: "Installations" } },
      { selector: ".works .work:nth-child(5) .cap", text: { fr: "Poèmes", en: "Poems" } },
      { selector: ".works .work:nth-child(6) .cap", text: { fr: "Vidéos", en: "Videos" } },
      { selector: ".works .work:nth-child(7) .cap", text: { fr: "Couleurs d'Auvers", en: "Colours of Auvers" } },
      { selector: ".works .work:nth-child(8) .cap", text: { fr: "Mémoire du lieu", en: "Memory of the house" } }
    ]
  }
};

const PAGE_KEY_BY_PATH = new Map([
  ["", "index"],
  ["index.html", "index"],
  ["le-lieu.html", "lieu"],
  ["stages.html", "stages"],
  ["evenements.html", "events"],
  ["association.html", "assoc"],
  ["contact.html", "contact"],
  ["adherer.html", "join"],
  ["wallerand.html", "wallerand"]
]);

function getNestedValue(object, path) {
  return path.split(".").reduce((current, key) => current && current[key], object);
}

export function getUiTranslation(language, path, fallback = "") {
  const preferred = getNestedValue(UI_TRANSLATIONS[language] || UI_TRANSLATIONS.fr, path);

  if (preferred !== undefined) {
    return preferred;
  }

  const base = getNestedValue(UI_TRANSLATIONS.fr, path);
  return base !== undefined ? base : fallback;
}

export function getPageKeyFromPath(pathname = "") {
  const value = pathname.split("/").pop() || "";
  return PAGE_KEY_BY_PATH.get(value) || "index";
}

export function getStaticPageCopy(pageKey) {
  return STATIC_PAGE_COPY[pageKey] || null;
}

export function getLocaleForLanguage(language) {
  return LANGUAGE_LOCALES[language] || LANGUAGE_LOCALES.fr;
}
