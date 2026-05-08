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
        lieu: "Le lieu",
        stages: "Cours & stages",
        events: "L'agenda",
        wallerand: "Wallerand",
        assoc: "L'association",
        contact: "Contact",
        adherer: "Adhérer"
      },
      utility: {
        defaultPrefix: "Lieu culturel · Résidence d'artistes",
        defaultMain: "10 min à pied de la gare · parking à 100 m",
        nextEvent: "Prochain événement",
        news: "Actualité",
        visitPrefix: "Venir à la Maison Rose",
        visitMain: "10 min à pied de la gare · parking gratuit à 100 m",
        housePrefix: "Atelier & résidence",
        houseMain: "62 m² d’atelier · maison de 156 m²"
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
        events: "L'agenda →",
        stages: "Les cours et stages →",
        join: "Adhérer ou soutenir →",
        supportEyebrow: "Avec le soutien de",
        supportText: "Patrimoine remarquable d’Île-de-France · Région Île-de-France",
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
        disciplineLabel: "Pratique",
        levelLabel: "Niveau",
        practiceAll: "Toutes les pratiques",
        practiceEngraving: "Gravure",
        practiceOther: "Autres pratiques",
        levelAll: "Tous niveaux",
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
    home: {
      sliderLabel: "Focus artistes et vie du lieu",
      sliderEyebrow: "— Visages & rendez-vous",
      sliderIntro:
        "À la place du compte à rebours, quelques images de celles et ceux qui font vivre la Maison Rose, en attendant d'alimenter les prochains portraits artistes.",
      sliderNav: "Sélection d'images artistes",
      sliderNote: "Le slider défile seul et s'adapte au mobile."
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
        lieu: "House",
        stages: "Courses",
        events: "Agenda",
        wallerand: "Wallerand",
        assoc: "About",
        contact: "Contact",
        adherer: "Join"
      },
      utility: {
        defaultPrefix: "Cultural venue · Artist residency",
        defaultMain: "10 min walk from station · parking 100 m away",
        nextEvent: "Next event",
        news: "News",
        visitPrefix: "Visiting the Pink House",
        visitMain: "10 min walk from station · free parking 100 m away",
        housePrefix: "Studio & residency",
        houseMain: "62 m² studio · 156 m² house"
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
        events: "The agenda →",
        stages: "Courses & workshops →",
        join: "Join or support →",
        supportEyebrow: "With the support of",
        supportText: "Remarkable Heritage of Île-de-France · Île-de-France Region",
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
        disciplineLabel: "Practice",
        levelLabel: "Level",
        practiceAll: "All practices",
        practiceEngraving: "Engraving",
        practiceOther: "Other practices",
        levelAll: "All levels",
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
    home: {
      sliderLabel: "Artist highlights and life of the house",
      sliderEyebrow: "— Faces & moments",
      sliderIntro:
        "Instead of a countdown, the home page now shows a few images of the people and artistic moments that keep the Pink House alive, ready to host future artist portraits.",
      sliderNav: "Artist image selection",
      sliderNote: "The slider moves on its own and stays mobile-friendly."
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
      { selector: ".hero .hero-sub", text: { fr: "À 10 minutes à pied de la gare d'Auvers-sur-Oise, au cœur du centre historique.", en: "A 10-minute walk from Auvers-sur-Oise station, right in the historic centre." } },
      { selector: ".hero .hero-lede", text: { fr: "Ancien atelier d'été de Charles-François Daubigny, la Maison Rose accueille des artistes en résidence, des stages de gravure et des événements culturels tout au long de l'année.", en: "Formerly Charles-François Daubigny's summer studio, the Pink House hosts artists in residence, engraving workshops and cultural events throughout the year." } },
      { selector: ".hero .cta-row .btn-primary", html: { fr: "Découvrir nos stages <span class=\"arr\">→</span>", en: "Discover our workshops <span class=\"arr\">→</span>" } },
      { selector: ".hero .cta-row .btn-ghost", text: { fr: "Voir l'agenda", en: "See the agenda" } },
      { selector: ".hero .hv-frame .img", attrs: { "aria-label": { fr: "Façade de la Maison Rose", en: "Front façade of the Pink House" } } },
      { selector: ".hero .hv-tag.t1 .lbl", text: { fr: "Atelier", en: "Studio" } },
      { selector: ".hero .hv-tag.t1 .val", html: { fr: "<strong>62 m²</strong> d’atelier · maison de 156 m²", en: "<strong>62 m²</strong> studio · 156 m² house" } },
      { selector: ".hero .hv-tag.t2 .lbl", text: { fr: "Maison Rose", en: "Pink House" } },
      { selector: ".hero .hv-tag.t2 .val", html: { fr: "<strong>156 m²</strong> · 3 chambres · patio", en: "<strong>156 m²</strong> · 3 rooms · patio" } },
      { selector: ".hero .scroll-hint span:first-child", text: { fr: "Découvrir", en: "Discover" } },
      { selector: ".manifesto .small", text: { fr: "— L'esprit du lieu —", en: "— The spirit of the house —" } },
      { selector: ".manifesto h2", html: { fr: "Un ancien atelier d'artistes devenu <em>lieu de vie, de résidence et de transmission,</em> pour mieux explorer le présent et l'avenir.", en: "A former artists' studio turned into <em>a lived-in place of residency and transmission,</em> made to explore the present and the future." } },
      { selector: ".manifesto-quote p", text: { fr: "La Maison Rose est avant tout un lieu vivant qui accueille expositions, performances, concerts, conférences, ateliers et rencontres.", en: "The Pink House is first and foremost a living place that welcomes exhibitions, performances, concerts, talks, workshops and encounters." } },
      { selector: ".manifesto-quote .sign", text: { fr: "— La Maison Rose de Wallerand", en: "— The Pink House of Wallerand" } },
      { selector: ".marquee-track", html: { fr: "<span>Eau-forte <span class=\"dot\">✦</span></span><span>Aquatinte <span class=\"dot\">✦</span></span><span>Taille-douce <span class=\"dot\">✦</span></span><span>Pointe sèche <span class=\"dot\">✦</span></span><span>Lithographie <span class=\"dot\">✦</span></span><span>Transfert &amp; impression <span class=\"dot\">✦</span></span><span>Auvers-sur-Oise <span class=\"dot\">✦</span></span><span>Eau-forte <span class=\"dot\">✦</span></span><span>Aquatinte <span class=\"dot\">✦</span></span><span>Taille-douce <span class=\"dot\">✦</span></span><span>Pointe sèche <span class=\"dot\">✦</span></span><span>Lithographie <span class=\"dot\">✦</span></span><span>Transfert &amp; impression <span class=\"dot\">✦</span></span><span>Auvers-sur-Oise <span class=\"dot\">✦</span></span>", en: "<span>Etching <span class=\"dot\">✦</span></span><span>Aquatint <span class=\"dot\">✦</span></span><span>Intaglio <span class=\"dot\">✦</span></span><span>Drypoint <span class=\"dot\">✦</span></span><span>Lithography <span class=\"dot\">✦</span></span><span>Transfer &amp; print <span class=\"dot\">✦</span></span><span>Auvers-sur-Oise <span class=\"dot\">✦</span></span><span>Etching <span class=\"dot\">✦</span></span><span>Aquatint <span class=\"dot\">✦</span></span><span>Intaglio <span class=\"dot\">✦</span></span><span>Drypoint <span class=\"dot\">✦</span></span><span>Lithography <span class=\"dot\">✦</span></span><span>Transfer &amp; print <span class=\"dot\">✦</span></span><span>Auvers-sur-Oise <span class=\"dot\">✦</span></span>" } },
      { selector: ".teasers .sec-head .left h2", html: { fr: "Trois <span class=\"it\">portes</span> d'entrée.", en: "Three ways <span class=\"it\">in.</span>" } },
      { selector: ".teaser-grid .teaser:nth-child(1) .num", text: { fr: "— 01 / Visiter", en: "— 01 / Visit" } },
      { selector: ".teaser-grid .teaser:nth-child(1) h3", html: { fr: "Le <em>lieu,</em> la maison", en: "The <em>house,</em> the place" } },
      { selector: ".teaser-grid .teaser:nth-child(1) p", text: { fr: "Une maison de 156 m², un atelier lumineux, des chambres de résidence et un patio au cœur d'Auvers-sur-Oise.", en: "A 156 m² house, a light-filled studio, residency rooms and a patio in the heart of Auvers-sur-Oise." } },
      { selector: ".teaser-grid .teaser:nth-child(1) .more", text: { fr: "Visiter →", en: "Visit →" } },
      { selector: ".teaser-grid .teaser:nth-child(2) .num", text: { fr: "— 02 / Apprendre", en: "— 02 / Learn" } },
      { selector: ".teaser-grid .teaser:nth-child(2) h3", html: { fr: "Cours &amp; <em>stages</em>", en: "Courses &amp; <em>workshops</em>" } },
      { selector: ".teaser-grid .teaser:nth-child(2) p", text: { fr: "Techniques de gravure à l'eau-forte, aquatinte, taille-douce, pointe sèche, lithographie, transfert et impression.", en: "Etching, aquatint, intaglio, drypoint, lithography, transfer and print techniques taught in small-group formats." } },
      { selector: ".teaser-grid .teaser:nth-child(2) .more", text: { fr: "Voir le programme →", en: "See the programme →" } },
      { selector: ".teaser-grid .teaser:nth-child(3) .num", text: { fr: "— 03 / Vivre", en: "— 03 / Experience" } },
      { selector: ".teaser-grid .teaser:nth-child(3) h3", html: { fr: "Agenda &amp; <em>expositions</em>", en: "Agenda &amp; <em>exhibitions</em>" } },
      { selector: ".teaser-grid .teaser:nth-child(3) p", text: { fr: "Expositions, performances artistiques, conférences, concerts, ateliers et rendez-vous ouverts à un public très large.", en: "Exhibitions, performances, talks, concerts, workshops and public encounters open to a wide audience." } },
      { selector: ".teaser-grid .teaser:nth-child(3) .more", text: { fr: "Voir l'agenda →", en: "See what's on →" } },
      { selector: ".wstrip .num", text: { fr: "— Hommage", en: "— Tribute" } },
      { selector: ".wstrip h2", html: { fr: "Wallerand, <em>un élan qui perdure.</em>", en: "Wallerand, <em>a momentum that endures.</em>" } },
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
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Un lieu historique</span><em class=\"line\">tourné vers l'avenir.</em>", en: "<span class=\"line\">A historic house</span><em class=\"line\">open to the future.</em>" } },
      { selector: ".page-hero .lede", text: { fr: "Depuis 2014, le lieu renoue avec sa vocation de foyer d'artistes : l'artiste plasticien Wallerand s'y installe et redonne vie à la Maison Rose.", en: "Since 2014, the house has renewed its vocation as an artists' home: visual artist Wallerand settled here and gave new life to the Pink House." } },
      { selector: ".place-preview-head .btn-primary", html: { fr: "Visiter la Maison Rose <span class=\"arr\">→</span>", en: "Visit the Pink House <span class=\"arr\">→</span>" } },
      { selector: ".history .history-text .num-tag", text: { fr: "— Histoire", en: "— History" } },
      { selector: ".history .history-text h2", html: { fr: "De l'atelier d'été de Daubigny à <em>la Maison Rose de Wallerand.</em>", en: "From Daubigny's summer studio to <em>the Pink House of Wallerand.</em>" } },
      { selector: ".history .history-text p:nth-of-type(1)", text: { fr: "En 1870, Charles-François Daubigny achète la grange à côté de sa maison pour en faire un atelier d'été où il peut peindre de grands formats et recevoir ses amis artistes.", en: "In 1870, Charles-François Daubigny bought the barn beside his home and turned it into a summer studio where he could paint large formats and host fellow artists." } },
      { selector: ".history .history-text p:nth-of-type(2)", text: { fr: "Depuis 2014, le lieu renoue avec sa vocation de foyer d'artistes : l'artiste plasticien Wallerand s'y installe et redonne à la Maison Rose un élan de résidence, de création et de transmission.", en: "Since 2014, the house has renewed its vocation as an artists' home: visual artist Wallerand settled here and restored the Pink House as a place for residency, creation and transmission." } },
      { selector: ".timeline .ev:nth-child(1) h4", text: { fr: "Daubigny crée son atelier d'été", en: "Daubigny creates his summer studio" } },
      { selector: ".timeline .ev:nth-child(1) p", text: { fr: "La grange à côté de sa maison devient un lieu de travail et d'accueil pour ses amis artistes.", en: "The barn beside his home becomes a place to work and host fellow artists." } },
      { selector: ".timeline .ev:nth-child(2) h4", text: { fr: "Mort de Charles-François Daubigny", en: "Charles-François Daubigny dies" } },
      { selector: ".timeline .ev:nth-child(2) p", text: { fr: "Le peintre disparaît, mais l'atelier d'été reste lié à la vie artistique de la famille.", en: "The painter passes away, yet the summer studio remains tied to the family's artistic life." } },
      { selector: ".timeline .ev:nth-child(3) h4", text: { fr: "Son fils Karl Daubigny prolonge l'héritage", en: "His son Karl Daubigny extends the legacy" } },
      { selector: ".timeline .ev:nth-child(3) p", text: { fr: "Jusqu'à sa mort en 1886, son fils Karl Daubigny poursuit à Auvers l'histoire familiale et l'ancrage artistique du lieu.", en: "Until his death in 1886, his son Karl Daubigny carries the family's artistic legacy forward in Auvers." } },
      { selector: ".timeline .ev:nth-child(4) h4", text: { fr: "Wallerand s'y installe", en: "Wallerand settles here" } },
      { selector: ".timeline .ev:nth-child(4) p", text: { fr: "L'artiste plasticien Wallerand redonne au lieu sa vocation d'atelier, de résidence et de foyer d'artistes.", en: "Visual artist Wallerand restores the house as a studio, residency and artists' home." } },
      { selector: ".timeline .ev:nth-child(5) h4", text: { fr: "Une disparition brutale", en: "A sudden loss" } },
      { selector: ".timeline .ev:nth-child(5) p", text: { fr: "Après le décès brutal de Wallerand en novembre 2021, la Maison Rose entre dans une nouvelle phase de transmission.", en: "After Wallerand's sudden death in November 2021, the Pink House enters a new phase of transmission." } },
      { selector: ".timeline .ev:nth-child(6) h4", text: { fr: "Naissance de l'association", en: "The association is founded" } },
      { selector: ".timeline .ev:nth-child(6) p", text: { fr: "L'association La Maison Rose de Wallerand est créée pour faire vivre le lieu et poursuivre le projet culturel de Wallerand.", en: "The Pink House of Wallerand association is founded to keep the house alive and continue Wallerand's cultural project." } },
      { selector: ".timeline .ev:nth-child(7) h4", text: { fr: "Label Patrimoine remarquable d’Île-de-France", en: "Remarkable Heritage of Île-de-France label" } },
      { selector: ".timeline .ev:nth-child(7) p", text: { fr: "En novembre 2024, la Maison Rose obtient le label Patrimoine remarquable d’Île-de-France.", en: "In November 2024, the Pink House receives the Remarkable Heritage of Île-de-France label." } },
      { selector: ".timeline .ev:nth-child(8) h4", text: { fr: "Résidences, cours et agenda", en: "Residencies, courses and agenda" } },
      { selector: ".timeline .ev:nth-child(8) p", text: { fr: "La Maison Rose accueille un public large, des artistes en résidence et une programmation qui se déploie toute l'année.", en: "The Pink House welcomes a broad audience, artists in residence and a programme unfolding throughout the year." } },
      { selector: ".visit .sec-head .left .num-tag", text: { fr: "— Visiter", en: "— Visit" } },
      { selector: ".visit .sec-head .left h2", html: { fr: "Venir à <span class=\"it\">la Maison Rose.</span>", en: "Visiting <span class=\"it\">the Pink House.</span>" } },
      { selector: ".visit-card h3", text: { fr: "Informations pratiques", en: "Practical information" } },
      { selector: ".visit-card .row:nth-child(2) .k", text: { fr: "Adresse", en: "Address" } },
      { selector: ".visit-card .row:nth-child(3) .k", text: { fr: "Lieu", en: "Site" } },
      { selector: ".visit-card .row:nth-child(3) .v", text: { fr: "La Maison Rose de Wallerand", en: "The Pink House of Wallerand" } },
      { selector: ".visit-card .row:nth-child(4) .k", text: { fr: "Capacité", en: "Capacity" } },
      { selector: ".visit-card .row:nth-child(4) .v", text: { fr: "156 m² au total · 3 chambres · cuisine équipée · 2 salles de bain · patio", en: "156 m² in total · 3 rooms · equipped kitchen · 2 bathrooms · patio" } },
      { selector: ".visit-card .row:nth-child(5) .k", text: { fr: "Atelier", en: "Studio" } },
      { selector: ".visit-card .row:nth-child(5) .v", text: { fr: "62 m² avec 6 m sous plafond", en: "62 m² with 6 m ceiling height" } },
      { selector: ".visit-card .row:nth-child(6) .k", text: { fr: "Accès", en: "Access" } },
      { selector: ".visit-card .row:nth-child(6) .v", text: { fr: "10 minutes à pied depuis la gare d'Auvers-sur-Oise (Ligne H)", en: "10 minutes on foot from Auvers-sur-Oise station (Line H)" } },
      { selector: ".visit-card .row:nth-child(7) .k", text: { fr: "Parking", en: "Parking" } },
      { selector: ".visit-card .row:nth-child(7) .v", text: { fr: "Gratuit à 100 m de la Maison Rose", en: "Free parking 100 m from the Pink House" } },
      { selector: ".visit-card .row:nth-child(8) .k", text: { fr: "Transports", en: "Transport" } },
      { selector: ".visit-card .row:nth-child(8) .v", text: { fr: "Voir les accès via l'Office de Tourisme d'Auvers-sur-Oise ↗", en: "See travel details via the Auvers-sur-Oise tourist office ↗" } },
      { selector: ".visit-card .row:nth-child(9) .k", text: { fr: "Visite", en: "Visits" } },
      { selector: ".visit-card .row:nth-child(9) .v", text: { fr: "Selon l'agenda et sur rendez-vous", en: "According to the agenda and by appointment" } },
      { selector: ".visit-text h2", html: { fr: "Un lieu atypique, <em>plein de charme.</em>", en: "An unusual place, <em>full of character.</em>" } },
      { selector: ".visit-text p:nth-of-type(1)", text: { fr: "La Maison Rose donne aux artistes la possibilité de résider, travailler et exposer dans un cadre historique chargé d'histoire et de vibrations artistiques.", en: "The Pink House gives artists the opportunity to live, work and exhibit in a historic setting filled with memory and artistic energy." } },
      { selector: ".visit-text p:nth-of-type(2)", text: { fr: "Le projet s'appuie sur ce lieu patrimonial pour mieux explorer le présent, accueillir de nouveaux artistes et proposer au public une programmation vivante.", en: "The project relies on this heritage site to explore the present, welcome new artists and offer the public a lively programme." } },
      { selector: ".visit-gallery .sec-head .left .num-tag", text: { fr: "— Parcourir", en: "— Explore" } },
      { selector: ".visit-gallery .sec-head .left h2", html: { fr: "Visiter <span class=\"it\">la Maison Rose.</span>", en: "Explore <span class=\"it\">the Pink House.</span>" } },
      { selector: ".map", attrs: { title: { fr: "Carte La Maison Rose de Wallerand", en: "Map — The Pink House of Wallerand" } } },
      { selector: ".map-note", text: { fr: "Retrouvez directement La Maison Rose de Wallerand dans Google Maps pour préparer votre venue.", en: "Find the Pink House of Wallerand directly in Google Maps and prepare your visit." } },
      { selector: "[data-map-directions]", text: { fr: "Ouvrir l'itinéraire", en: "Open directions" } }
    ]
  },
  stages: {
    title: {
      fr: "Cours & Stages — La Maison Rose de Wallerand",
      en: "Courses & Workshops — The Pink House of Wallerand"
    },
    description: {
      fr: "Cours et stages à La Maison Rose de Wallerand : gravure aujourd'hui, et demain d'autres pratiques artistiques selon la programmation.",
      en: "Courses and workshops at the Pink House of Wallerand: engraving today, and other artistic practices tomorrow depending on the programme."
    },
    nodes: [
      { selector: ".page-hero .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · Cours &amp; stages", en: "<a href=\"index.html\">Home</a> · Courses &amp; workshops" } },
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Cours et stages</span><em class=\"line\">de pratique artistique.</em>", en: "<span class=\"line\">Courses and workshops</span><em class=\"line\">for artistic practice.</em>" } },
      { selector: ".page-hero .lede", text: { fr: "La gravure ouvre aujourd'hui la programmation, avec une page pensée pour accueillir demain le chant, la sculpture et d'autres pratiques artistiques.", en: "Engraving opens the programme today, with a structure ready to welcome singing, sculpture and other artistic practices tomorrow." } },
      { selector: ".filters [data-filter-label=\"discipline\"]", text: { fr: "Pratique", en: "Practice" } },
      { selector: ".filters [data-filter-label=\"level\"]", text: { fr: "Niveau", en: "Level" } },
      { selector: ".filters [data-stage-filter=\"discipline\"] option[value=\"all\"]", text: { fr: "Toutes les pratiques", en: "All practices" } },
      { selector: ".filters [data-stage-filter=\"discipline\"] option[value=\"gravure\"]", text: { fr: "Gravure", en: "Engraving" } },
      { selector: ".filters [data-stage-filter=\"discipline\"] option[value=\"other\"]", text: { fr: "Autres pratiques", en: "Other practices" } },
      { selector: ".filters [data-stage-filter=\"level\"] option[value=\"all\"]", text: { fr: "Tous niveaux", en: "All levels" } },
      { selector: ".filters [data-stage-filter=\"level\"] option[value=\"deb\"]", text: { fr: "Débutant", en: "Beginner" } },
      { selector: ".filters [data-stage-filter=\"level\"] option[value=\"int\"]", text: { fr: "Intermédiaire", en: "Intermediate" } },
      { selector: ".filters [data-stage-filter=\"level\"] option[value=\"adv\"]", text: { fr: "Avancé", en: "Advanced" } },
      { selector: ".artist-entry .ey", text: { fr: "— Artistes & intervenants", en: "— Artists & teachers" } },
      { selector: ".artist-entry p", text: { fr: "Vous souhaitez proposer un atelier, un cours ou une pratique artistique à la Maison Rose ? Une entrée dédiée vous permet d'envoyer directement votre proposition à l'association.", en: "Would you like to propose a workshop, a course or an artistic practice at the Pink House? A dedicated entry point lets you send your proposal directly to the association." } },
      { selector: ".artist-entry .btn-primary", html: { fr: "Proposer un atelier <span class=\"arr\">→</span>", en: "Propose a workshop <span class=\"arr\">→</span>" } },
      { selector: "#stages-grid .empty-note", text: { fr: "Chargement des stages…", en: "Loading workshops…" } },
      { selector: "#stages-archives-wrap .sec-head .left .num-tag", text: { fr: "— Archives", en: "— Archives" } },
      { selector: "#stages-archives-wrap .sec-head .left h2", html: { fr: "Anciens <span class=\"it\">stages.</span>", en: "Past <span class=\"it\">workshops.</span>" } },
      { selector: "#stages-archives-wrap .sec-head .right", text: { fr: "Les ateliers terminés restent visibles ici comme mémoire du programme de la Maison Rose.", en: "Completed workshops remain visible here as part of the Pink House programme archive." } },
      { selector: ".info-block h2", html: { fr: "Tout ce qu'il faut <em>savoir</em> avant de venir.", en: "Everything you need to <em>know</em> before coming." } },
      { selector: ".info-grid .info-card:nth-child(1) h4", text: { fr: "Disciplines artistiques", en: "Artistic disciplines" } },
      { selector: ".info-grid .info-card:nth-child(1) p", text: { fr: "La programmation commence aujourd'hui par la gravure. Très prochainement, le chant, la sculpture et d'autres pratiques artistiques viendront enrichir la Maison Rose.", en: "The programme begins today with engraving. Very soon, singing, sculpture and other artistic practices will broaden what happens at the Pink House." } },
      { selector: ".info-grid .info-card:nth-child(2) h4", text: { fr: "Inscription", en: "Registration" } },
      { selector: ".info-grid .info-card:nth-child(2) p", text: { fr: "Pour vous inscrire, cliquez sur la fiche du stage choisi : vous serez redirigé vers HelloAsso ou vers le contact dédié, selon les indications affichées.", en: "To register, click on the workshop card you want: you will be redirected either to HelloAsso or to the dedicated contact, depending on the instructions shown." } },
      { selector: ".info-grid .info-card:nth-child(3) h4", text: { fr: "Fréquence", en: "Frequency" } },
      { selector: ".info-grid .info-card:nth-child(3) p", text: { fr: "Des cours, stages et formats ponctuels se déploient tout au long de l'année. Entre deux annonces, les archives restent visibles pour garder la mémoire du programme.", en: "Courses, workshops and one-off formats unfold all year round. Between announcements, the archive remains visible to keep a memory of the programme." } }
    ]
  },
  events: {
    title: {
      fr: "Agenda — La Maison Rose de Wallerand",
      en: "Agenda — The Pink House of Wallerand"
    },
    description: {
      fr: "Expositions, concerts, conférences, ateliers et rendez-vous publics : l'agenda de la Maison Rose de Wallerand à Auvers-sur-Oise.",
      en: "Exhibitions, concerts, talks, workshops and public gatherings: the agenda of the Pink House of Wallerand in Auvers-sur-Oise."
    },
    nodes: [
      { selector: ".page-hero .crumbs", html: { fr: "<a href=\"index.html\">Accueil</a> · Agenda", en: "<a href=\"index.html\">Home</a> · Agenda" } },
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Une programmation</span><em class=\"line\">tout au long de l'année.</em>", en: "<span class=\"line\">A programme</span><em class=\"line\">all year round.</em>" } },
      { selector: ".page-hero .lede", text: { fr: "Pour tous : expositions, conférences, concerts, ateliers et rendez-vous publics font vivre la Maison Rose.", en: "For everyone: exhibitions, talks, concerts, workshops and public gatherings keep the Pink House alive." } },
      { selector: "#events-featured .empty-note", text: { fr: "Chargement de l'événement à la une…", en: "Loading the featured event…" } },
      { selector: ".agenda .sec-head .left .num-tag", text: { fr: "— Agenda", en: "— Agenda" } },
      { selector: ".agenda .sec-head .left h2", html: { fr: "Tous les <span class=\"it\">rendez-vous.</span>", en: "All the <span class=\"it\">dates.</span>" } },
      { selector: ".agenda .sec-head .right", text: { fr: "Le programme rassemble les rendez-vous à venir et garde la mémoire des événements passés au même endroit.", en: "The programme gathers upcoming dates while keeping past events in the same place." } },
      { selector: ".artist-callout .ey", text: { fr: "— Appels à artistes", en: "— Open calls for artists" } },
      { selector: ".artist-callout p", text: { fr: "Vous préparez une candidature pour une prochaine édition ou une exposition ? Un point d'entrée dédié permet de demander les informations d'inscription artiste et les modalités des appels à venir.", en: "Preparing an application for a future edition or exhibition? A dedicated entry point lets artists request application details and information about upcoming open calls." } },
      { selector: ".artist-callout .btn-primary", html: { fr: "Informations pour inscription artiste <span class=\"arr\">→</span>", en: "Artist application information <span class=\"arr\">→</span>" } },
      { selector: "#events-upcoming .empty-note", text: { fr: "Chargement des rendez-vous…", en: "Loading upcoming events…" } },
      { selector: ".past .sec-head .left .num-tag", text: { fr: "— Archives", en: "— Archives" } },
      { selector: ".past .sec-head .left h2", html: { fr: "Événements <span class=\"it\">passés.</span>", en: "Past <span class=\"it\">events.</span>" } },
      { selector: ".past .sec-head .right", text: { fr: "Expositions, concerts, conférences et résidences passés, conservés comme mémoire active de la Maison Rose.", en: "Past exhibitions, concerts, talks and residencies kept as an active memory of the Pink House." } },
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
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Un lieu culturel,</span><span class=\"line\"><em>tisseur de liens.</em></span>", en: "<span class=\"line\">A cultural house,</span><span class=\"line\"><em>weaving connections.</em></span>" } },
      { selector: ".page-hero .lede", text: { fr: "La Maison Rose de Wallerand est une association loi 1901 à Auvers-sur-Oise, dédiée à l'accès à la culture et à la transmission.", en: "The Pink House of Wallerand is a non-profit association in Auvers-sur-Oise dedicated to access to culture and transmission." } },
      { selector: ".miss .sec-head .left .num-tag", text: { fr: "— Nos missions", en: "— Our missions" } },
      { selector: ".miss .sec-head .left h2", html: { fr: "Trois <span class=\"it\">engagements.</span>", en: "Three shared <span class=\"it\">commitments.</span>" } },
      { selector: ".miss-grid > div:nth-child(1) h3", html: { fr: "Dédier le lieu à <em>la culture</em>", en: "Dedicate the house to <em>culture</em>" } },
      { selector: ".miss-grid > div:nth-child(1) p", text: { fr: "L'association permet à un public très large, et notamment à la jeunesse, d'accéder à des expositions, conférences, concerts, performances artistiques et ateliers.", en: "The association enables a wide audience, and especially young people, to access exhibitions, talks, concerts, performances and workshops." } },
      { selector: ".miss-grid > div:nth-child(2) h3", html: { fr: "Accueillir <em>les artistes</em>", en: "Host <em>artists</em>" } },
      { selector: ".miss-grid > div:nth-child(2) p", text: { fr: "La Maison Rose donne la possibilité de résider, travailler et exposer dans l'ancien atelier d'été de Charles-François Daubigny, au cœur d'Auvers-sur-Oise.", en: "The Pink House gives artists the possibility to stay, work and exhibit in Charles-François Daubigny's former summer studio in the heart of Auvers-sur-Oise." } },
      { selector: ".miss-grid > div:nth-child(3) h3", html: { fr: "Transmettre <em>des savoir-faire</em>", en: "Pass on <em>skills</em>" } },
      { selector: ".miss-grid > div:nth-child(3) p", text: { fr: "Stages de gravure, ateliers ponctuels, rencontres et formats de découverte font circuler plusieurs pratiques artistiques dans un esprit de partage.", en: "Engraving workshops, one-off sessions, encounters and discovery formats help several artistic practices circulate in a spirit of sharing." } },
      { selector: ".stats .stat:nth-child(1) .n", text: { fr: "10 min", en: "10 min" } },
      { selector: ".stats .stat:nth-child(1) .l", text: { fr: "à pied depuis la gare d'Auvers-sur-Oise", en: "on foot from Auvers-sur-Oise station" } },
      { selector: ".stats .stat:nth-child(2) .n", text: { fr: "Parking", en: "Parking" } },
      { selector: ".stats .stat:nth-child(2) .l", text: { fr: "gratuit à 100 m de la Maison Rose", en: "free 100 m from the Pink House" } },
      { selector: ".stats .stat:nth-child(3) .n", text: { fr: "156 m²", en: "156 m²" } },
      { selector: ".stats .stat:nth-child(3) .l", text: { fr: "de maison, patio et pièces de résidence", en: "of house, patio and residency rooms" } },
      { selector: ".stats .stat:nth-child(4) .n", text: { fr: "62 m²", en: "62 m²" } },
      { selector: ".stats .stat:nth-child(4) .l", text: { fr: "d'atelier sous la verrière", en: "studio space beneath the glass roof" } },
      { selector: ".team .sec-head .left .num-tag", text: { fr: "— Programmation", en: "— Programme" } },
      { selector: ".team .sec-head .left h2", html: { fr: "Ce que nous <span class=\"it\">organisons.</span>", en: "What we <span class=\"it\">organise.</span>" } },
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
      { selector: ".docs-grid .doc:nth-child(2) h4", text: { fr: "Voir les cours et stages", en: "See courses and workshops" } },
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
      { selector: ".page-hero h1", html: { fr: "<span class=\"line\">Nous écrire,</span><span class=\"line\"><em>venir à la Maison Rose.</em></span>", en: "<span class=\"line\">Write to us,</span><span class=\"line\"><em>visit the Pink House.</em></span>" } },
      { selector: ".page-hero .lede", text: { fr: "Pour une résidence, un cours, une visite ou une inscription artiste, écrivez-nous ou appelez-nous directement.", en: "For a residency, a course, a visit or an artist application, feel free to write or call us directly." } },
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
      { selector: ".ct-form select option:nth-child(5)", text: { fr: "Inscription exposition", en: "Exhibition application" } },
      { selector: ".ct-form select option:nth-child(6)", text: { fr: "Proposition d'animation de stage", en: "Workshop proposal" } },
      { selector: ".ct-form select option:nth-child(7)", text: { fr: "Événement ou exposition", en: "Event or exhibition" } },
      { selector: ".ct-form select option:nth-child(8)", text: { fr: "Presse & partenariats", en: "Press & partnerships" } },
      { selector: ".ct-form select option:nth-child(9)", text: { fr: "Autre", en: "Other" } },
      { selector: "label[for=\"contact-message\"]", text: { fr: "Votre message *", en: "Your message *" } },
      { selector: ".ct-form .btn-primary", html: { fr: "Envoyer le message <span class=\"arr\">→</span>", en: "Send message <span class=\"arr\">→</span>" } },
      { selector: ".ct-info h3", html: { fr: "Nos <em>coordonnées</em>", en: "Our <em>details</em>" } },
      { selector: ".ct-info .blk:nth-child(2) .lbl", text: { fr: "Adresse", en: "Address" } },
      { selector: ".ct-info .blk:nth-child(3) .lbl", text: { fr: "E-mail", en: "Email" } },
      { selector: ".ct-info .blk:nth-child(4) .lbl", text: { fr: "Téléphone", en: "Phone" } },
      { selector: ".ct-info .blk:nth-child(5) .lbl", text: { fr: "Accueil", en: "Reception" } },
      { selector: ".ct-info .blk:nth-child(5) .val", html: { fr: "Selon la programmation<br/>et sur rendez-vous", en: "According to the programme<br/>and by appointment" } },
      { selector: ".ct-info .blk:nth-child(6) .lbl", text: { fr: "Instagram", en: "Instagram" } },
      { selector: ".ct-info .blk:nth-child(7) .lbl", text: { fr: "Facebook", en: "Facebook" } },
      { selector: ".ct-info .blk:nth-child(8) .lbl", text: { fr: "Pratique", en: "Practical" } },
      { selector: ".ct-info .blk:nth-child(8) .val", text: { fr: "Les inscriptions, adhésions et paiements restent gérés sur HelloAsso. Le site sert uniquement à présenter la programmation et à vous orienter.", en: "Registrations, memberships and payments remain managed on HelloAsso. This site simply presents the programme and points you in the right direction." } },
      { selector: ".map", attrs: { title: { fr: "Carte La Maison Rose de Wallerand", en: "Map — The Pink House of Wallerand" } } },
      { selector: ".map-note", text: { fr: "Carte Google Maps centrée sur La Maison Rose de Wallerand, avec itinéraire possible en un clic.", en: "Google Maps centred on the Pink House of Wallerand, with one-click directions." } },
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
      { selector: ".join-head h1", html: { fr: "Rejoignez la Maison Rose,<br/><em>soutenez la création.</em>", en: "Join the Pink House,<br/><em>support creation.</em>" } },
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
      { selector: ".faq .faq-item:nth-child(2) .q > span:first-child", html: { fr: "Comment se passe le <em>paiement</em> ?", en: "How does the <em>payment</em> work?" } },
      { selector: ".faq .faq-item:nth-child(2) .a p", text: { fr: "Le paiement et les éventuelles adhésions se font uniquement sur HelloAsso. Le site vitrine n'encaisse rien directement.", en: "Payments and any memberships take place only on HelloAsso. The showcase site does not collect money directly." } },
      { selector: ".faq .faq-item:nth-child(3) .q > span:first-child", html: { fr: "Que trouve-t-on sur <em>HelloAsso</em> ?", en: "What can you find on <em>HelloAsso</em>?" } },
      { selector: ".faq .faq-item:nth-child(3) .a p", text: { fr: "La page HelloAsso centralise les actions actives de l'association : adhésions, soutiens ou campagnes en cours lorsqu'elles sont ouvertes.", en: "The HelloAsso page centralises the association's active actions: memberships, support links and current campaigns whenever they are open." } },
      { selector: ".faq .faq-item:nth-child(4) .q > span:first-child", html: { fr: "Et s'il n'y a pas de campagne <em>ouverte</em> ?", en: "What if no campaign is <em>open</em>?" } },
      { selector: ".faq .faq-item:nth-child(4) .a p", text: { fr: "Dans ce cas, la page HelloAsso de l'association reste le bon point d'entrée. Vous pouvez aussi écrire directement à la Maison Rose depuis la page contact.", en: "In that case, the association's HelloAsso page remains the right entry point. You can also write directly to the Pink House from the contact page." } },
      { selector: ".faq .faq-item:nth-child(5) .q > span:first-child", html: { fr: "Faut-il créer un <em>compte</em> sur le site ?", en: "Do I need a site <em>account</em>?" } },
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
      { selector: ".w-text h1", html: { fr: "Wallerand,<br/><em>un élan qui perdure.</em>", en: "Wallerand,<br/><em>a momentum that endures.</em>" } },
      { selector: ".w-text .yrs", text: { fr: "1964 — novembre 2021", en: "1964 — November 2021" } },
      { selector: ".w-scroll-cue", html: { fr: "Faire défiler <strong>Découvrir l'histoire de Wallerand</strong>", en: "Scroll <strong>Discover Wallerand's story</strong>" } },
      { selector: ".bio aside h4", text: { fr: "Repères", en: "Landmarks" } },
      { selector: ".bio aside li:nth-child(1) a", text: { fr: "Formation", en: "Training" } },
      { selector: ".bio aside li:nth-child(2) a", text: { fr: "Art27", en: "Art27" } },
      { selector: ".bio aside li:nth-child(3) a", text: { fr: "Vision de l'art", en: "Vision of art" } },
      { selector: ".bio aside li:nth-child(4) a", text: { fr: "Transmission", en: "Transmission" } },
      { selector: ".bio aside li:nth-child(5) a", text: { fr: "Héritage", en: "Legacy" } },
      { selector: ".bio article h2:nth-of-type(1)", html: { fr: "Formation et <em>premiers engagements</em>", en: "Training and <em>first commitments</em>" } },
      { selector: ".bio article p:nth-of-type(1)", text: { fr: "Après une grande école d'art parisienne, Wallerand enseigne à de jeunes publics au musée d'Orsay. Très tôt, sa pratique se double d'un engagement fort pour le partage de la création.", en: "After studying at a major Paris art school, Wallerand taught young audiences at the Musée d'Orsay. From the outset, his practice was inseparable from a deep commitment to sharing creation." } },
      { selector: ".bio article p:nth-of-type(2)", text: { fr: "Toute sa vie artistique est orientée par l'article 27 des Droits de l'Homme, d'où le nom de son association d'art contemporain à Marly-le-Roi : Art27.fr.", en: "His artistic life was guided by Article 27 of the Universal Declaration of Human Rights, which inspired the name of his contemporary art association in Marly-le-Roi: Art27.fr." } },
      { selector: ".bio article h2:nth-of-type(2)", html: { fr: "Art27, <em>un creuset collectif</em>", en: "Art27, <em>a collective crucible</em>" } },
      { selector: ".bio article p:nth-of-type(3)", text: { fr: "Dans son atelier, il pousse ses élèves à transcender leur art grâce à sa clairvoyance avant-gardiste. Sa vision l'amène continuellement à proposer des sujets d'actualité qui relèvent de l'intérêt général.", en: "In his studio, he encouraged students to transcend their practice through an avant-garde clarity of vision. He kept bringing forward urgent subjects linked to the common good." } },
      { selector: ".bio article p:nth-of-type(4)", text: { fr: "Art27, association reconnue d'intérêt général, prend une place singulière, notamment autour de l'exposition Ecce Homo relayée par la radio RFI.", en: "Art27, a public-interest recognised association, found a singular place, notably around the Ecce Homo exhibition relayed by RFI radio." } },
      { selector: ".bio article .pull", html: { fr: "La création n'était pas pour lui un exercice de plus : il a voué sa vie entière à l'art, à la poésie et à la transmission.<span class=\"sign\">— Hommage de la Maison Rose</span>", en: "Creation was never just another exercise for him: he devoted his whole life to art, poetry and transmission.<span class=\"sign\">— Tribute from the Pink House</span>" } },
      { selector: ".bio article h2:nth-of-type(3)", html: { fr: "Une vision de l'art <em>sans concession</em>", en: "A vision of art <em>without compromise</em>" } },
      { selector: ".bio article p:nth-of-type(5)", text: { fr: "Les périodes de guerre le hantent, indissociables des misères humaines. Il est aussi toujours attiré par la poésie et s'y essaie avec passion, sans jamais séparer la pensée du geste artistique.", en: "Periods of war haunted him, inseparable from the reality of human suffering. He was equally drawn to poetry and practised it passionately, never separating thought from artistic gesture." } },
      { selector: ".bio article p:nth-of-type(6)", text: { fr: "Après de nombreuses années d'expositions collectives, il ressent le besoin de forger un nouveau creuset artistique à Auvers-sur-Oise, dans la digne suite des grands artistes qui occupèrent son atelier.", en: "After many years of collective exhibitions, he felt the need to forge a new artistic crucible in Auvers-sur-Oise, in the worthy continuation of the great artists who once inhabited his studio." } },
      { selector: ".bio article h2:nth-of-type(4)", text: { fr: "Transmission", en: "Transmission" } },
      { selector: ".bio article p:nth-of-type(7)", text: { fr: "À la Maison Rose, Wallerand propose des sujets d'actualité, valorise chacun au sein du groupe et fait de l'atelier un lieu où l'on expérimente autant qu'on apprend.", en: "At the Pink House, Wallerand brought in contemporary subjects, valued each person within the group and turned the studio into a place where one experiments as much as one learns." } },
      { selector: ".bio article p:nth-of-type(8)", text: { fr: "Sa présence a profondément marqué celles et ceux qui ont travaillé avec lui, dans un esprit de bienveillance et d'exigence artistique.", en: "His presence deeply marked those who worked with him, through a rare mix of generosity and artistic rigor." } },
      { selector: ".bio article h2:nth-of-type(5)", text: { fr: "Héritage", en: "Legacy" } },
      { selector: ".bio article p:nth-of-type(9)", text: { fr: "Sa disparition brutale, en novembre 2021, ouvre une nouvelle phase de transmission autour de son œuvre, de ses archives et de l'esprit qu'il a donné à la Maison Rose.", en: "His sudden death in November 2021 opened a new phase of transmission around his work, his archives and the spirit he gave to the Pink House." } },
      { selector: ".bio article p:nth-of-type(10)", text: { fr: "Peintures, vidéos, photos, installations, poèmes : la Maison Rose fait vivre et valorise aujourd'hui cet héritage vivant.", en: "Paintings, videos, photographs, installations, poems: the Pink House now keeps this living legacy alive and valued." } },
      { selector: ".works h2", html: { fr: "Quelques <em>œuvres</em>.", en: "A few <em>works</em>." } },
      { selector: ".works .works-intro", html: { fr: "Sélection de six œuvres directement issues du dossier d'archives de Wallerand, dont <em>Le Cri</em>, pour donner à voir une première matière du travail.", en: "A selection of six works taken directly from Wallerand's archive, including <em>The Scream</em>, offering a first glimpse into the body of work." } },
      { selector: ".works .work:nth-child(1) img", attrs: { alt: { fr: "Le Cri, œuvre de Wallerand", en: "The Scream, a work by Wallerand" } } },
      { selector: ".works .work:nth-child(2) img", attrs: { alt: { fr: "Œuvre de Wallerand, archive 1", en: "Work by Wallerand, archive 1" } } },
      { selector: ".works .work:nth-child(3) img", attrs: { alt: { fr: "Œuvre de Wallerand, archive 2", en: "Work by Wallerand, archive 2" } } },
      { selector: ".works .work:nth-child(4) img", attrs: { alt: { fr: "Œuvre de Wallerand, archive 3", en: "Work by Wallerand, archive 3" } } },
      { selector: ".works .work:nth-child(5) img", attrs: { alt: { fr: "Œuvre de Wallerand, archive 4", en: "Work by Wallerand, archive 4" } } },
      { selector: ".works .work:nth-child(6) img", attrs: { alt: { fr: "L'escalier rouge, œuvre de Wallerand", en: "The red staircase, a work by Wallerand" } } }
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
