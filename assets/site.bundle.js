(()=>{var ce=()=>{window.va||(window.va=function(...t){window.vaq||(window.vaq=[]),window.vaq.push(t)})},de="@vercel/analytics",ue="2.0.1";function D(){return typeof window<"u"}function N(){try{let e="production";if(e==="development"||e==="test")return"development"}catch{}return"production"}function me(e="auto"){if(e==="auto"){window.vam=N();return}window.vam=e}function pe(){return(D()?window.vam:N())||"production"}function x(){return pe()==="development"}function fe(e){return e.scriptSrc?p(e.scriptSrc):x()?"https://va.vercel-scripts.com/v1/script.debug.js":e.basePath?p(`${e.basePath}/insights/script.js`):"/_vercel/insights/script.js"}function he(e,t){var s;let n=e;if(t)try{n={...(s=JSON.parse(t))==null?void 0:s.analytics,...e}}catch{}me(n.mode);let a={sdkn:de+(n.framework?`/${n.framework}`:""),sdkv:ue};return n.disableAutoTrack&&(a.disableAutoTrack="1"),n.viewEndpoint&&(a.viewEndpoint=p(n.viewEndpoint)),n.eventEndpoint&&(a.eventEndpoint=p(n.eventEndpoint)),n.sessionEndpoint&&(a.sessionEndpoint=p(n.sessionEndpoint)),x()&&n.debug===!1&&(a.debug="false"),n.dsn&&(a.dsn=n.dsn),n.endpoint?a.endpoint=n.endpoint:n.basePath&&(a.endpoint=p(`${n.basePath}/insights`)),{beforeSend:n.beforeSend,src:fe(n),dataset:a}}function p(e){return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/")?e:`/${e}`}function P(e={debug:!0},t){var s;if(!D())return;let{beforeSend:n,src:a,dataset:r}=he(e,t);if(ce(),n&&((s=window.va)==null||s.call(window,"beforeSend",n)),document.head.querySelector(`script[src*="${a}"]`))return;let o=document.createElement("script");o.src=a;for(let[i,c]of Object.entries(r))o.dataset[i]=c;o.defer=!0,o.onerror=()=>{let i=x()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${a}. ${i}`)},document.head.appendChild(o)}var ve=()=>{window.si||(window.si=function(...t){window.siq=window.siq||[],window.siq.push(t)})},ge="@vercel/speed-insights",be="2.0.0";function we(){return typeof window<"u"}function ye(){try{let e="production";if(e==="development"||e==="test")return"development"}catch{}return"production"}function O(){return ye()==="development"}function ke(e){return e.scriptSrc?E(e.scriptSrc):O()?"https://va.vercel-scripts.com/v1/speed-insights/script.debug.js":e.dsn?"https://va.vercel-scripts.com/v1/speed-insights/script.js":e.basePath?E(`${e.basePath}/speed-insights/script.js`):"/_vercel/speed-insights/script.js"}function _e(e,t){var s;let n=e;if(t)try{n={...(s=JSON.parse(t))==null?void 0:s.speedInsights,...e}}catch{}let a={sdkn:ge+(n.framework?`/${n.framework}`:""),sdkv:be};return n.sampleRate&&(a.sampleRate=n.sampleRate.toString()),n.route&&(a.route=n.route),O()&&n.debug===!1&&(a.debug="false"),n.dsn&&(a.dsn=n.dsn),n.endpoint?a.endpoint=E(n.endpoint):n.basePath&&(a.endpoint=E(`${n.basePath}/speed-insights/vitals`)),{src:ke(n),beforeSend:n.beforeSend,dataset:a}}function E(e){return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/")?e:`/${e}`}function W(e={},t){var s;if(!we()||e.route===null)return null;ve();let{beforeSend:n,src:a,dataset:r}=_e(e,t);if(document.head.querySelector(`script[src*="${a}"]`))return null;n&&((s=window.si)==null||s.call(window,"beforeSend",n));let o=document.createElement("script");o.src=a,o.defer=!0;for(let[i,c]of Object.entries(r))o.dataset[i]=c;return o.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${a}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(o),{setRoute:i=>{o.dataset.route=i??void 0}}}var X={stages:"assets/data/stages.json",evenements:"assets/data/evenements.json",site:"assets/data/site-settings.json"},$={announcement_mode:"auto",announcement_text:"",announcement_link:"",contact_email:"contact@lamaisonrosedewallerand.com",contact_phone:"+33 6 15 37 56 72",address_line_1:"59 rue Daubigny",address_line_2:"95430 Auvers-sur-Oise",instagram_url:"https://www.instagram.com/lamaisonrosedewallerand/",helloasso_url:"https://www.helloasso.com/associations/la-maison-rose-de-wallerand",helloasso_organization_slug:"la-maison-rose-de-wallerand",home_hero_image:"/assets/uploads/maison-rose-facade-hero.jpg",helloasso_checkout_membership_item_name:"Adhesion individuelle a La Maison Rose de Wallerand",helloasso_checkout_membership_amount:20,helloasso_checkout_membership_couple_item_name:"Adhesion couple a La Maison Rose de Wallerand",helloasso_checkout_membership_couple_amount:30,helloasso_checkout_support_item_name:"Soutien a La Maison Rose de Wallerand",helloasso_checkout_default_amount:50,helloasso_checkout_min_amount:10,helloasso_checkout_suggested_amounts:"20,50,100,250",helloasso_widget_url:"",helloasso_widget_height:780},L={stage:["a","b","c","d","e","f"],event:["a","b","c"]},H=new Map,j=new Map,v,z,A,U=!1;function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function d(e){return l(e)}function Ee(e){return`tel:${String(e||"").replace(/[^\d+]/g,"")}`}function Ae(e){let t=String(e||"").trim();return t?t.includes("/widget")?t:`${t.replace(/\/$/,"")}/widget`:""}function Z(e){let t=Number(e);return Number.isFinite(t)?new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(t):""}function Se(e){return String(e||"").split(",").map(t=>Number(String(t).trim().replace(",","."))).filter(t=>Number.isFinite(t)&&t>0)}function ee(e,t){let s=Number(e.helloasso_checkout_membership_amount)||20,n=Number(e.helloasso_checkout_membership_couple_amount)||30;return t==="membership_single"?{label:e.helloasso_checkout_membership_item_name||"Adhesion individuelle a La Maison Rose de Wallerand",amount:s,locked:!0,suggestedAmounts:[s]}:t==="membership_couple"?{label:e.helloasso_checkout_membership_couple_item_name||"Adhesion couple a La Maison Rose de Wallerand",amount:n,locked:!0,suggestedAmounts:[n]}:{label:e.helloasso_checkout_support_item_name||"Soutien a La Maison Rose de Wallerand",amount:Number(e.helloasso_checkout_default_amount)||50,locked:!1,suggestedAmounts:Se(e.helloasso_checkout_suggested_amounts)}}function M(e,t=180){if(!e)return"";let s=e.replace(/\s+/g," ").trim();return s.length>t?`${s.slice(0,t).trim()}\u2026`:s}function h(e){if(!e)return null;let t=new Date(`${e}T12:00:00`);return Number.isNaN(t.getTime())?null:t}function $e(e){let t=(e||"").match(/(\d{1,2})h(?:(\d{2}))?/i);return t?{hours:Number(t[1]),minutes:Number(t[2]||0)}:{hours:10,minutes:0}}function C(e){let t=h(e);return t?new Intl.DateTimeFormat("fr-FR",{day:"numeric",month:"long",year:"numeric"}).format(t):e||""}function m(e){let t=h(e);return t?{day:new Intl.DateTimeFormat("fr-FR",{day:"2-digit"}).format(t),month:new Intl.DateTimeFormat("fr-FR",{month:"short",year:"2-digit"}).format(t).replace(".","")}:{day:"--",month:""}}function Le(e){let t=h(e);return t?new Intl.DateTimeFormat("fr-FR",{month:"long",year:"numeric"}).format(t):""}function w(e,t){let s=h(e.date),n=h(t.date);return!s&&!n?0:s?n?s-n:-1:1}function te(e,t){return w(t,e)}function Me(e){return String(e||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function Ce(e){let t=Me(e);return t.includes("debut")?"deb":t.includes("inter")?"int":t.includes("avance")?"adv":"all"}function ne(e){let t=e.filter(n=>n.status!=="passe").sort(w);return t.find(n=>n.featured)||t[0]||null}function Te(){return v||(v=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in"),v.unobserve(t.target))})},{threshold:.12,rootMargin:"0px 0px -40px 0px"}),v)}function T(e=document){let t=Te();e.querySelectorAll(".reveal").forEach(s=>{s.classList.contains("in")||t.observe(s)})}async function I(e){if(H.has(e))return H.get(e);let t=await fetch(X[e],{cache:"no-store"});if(!t.ok)throw new Error(`Impossible de charger ${e}`);let s=await t.json(),n=Array.isArray(s.items)?s.items:[];return H.set(e,n),n}async function Ie(e){if(j.has(e))return j.get(e);let t=await fetch(X[e],{cache:"no-store"});if(!t.ok)throw new Error(`Impossible de charger ${e}`);let s=await t.json(),n=s&&typeof s.item=="object"?s.item:{};return j.set(e,n),n}async function se(){try{let e=await Ie("site");return{...$,...e}}catch(e){return console.warn("R\xE9glages du site indisponibles, valeurs par d\xE9faut utilis\xE9es.",e),{...$}}}async function B(){return A||(A=fetch("/api/public-config",{cache:"no-store"}).then(async e=>e.ok?e.json():{}).catch(()=>({})),A)}function ae(){let e=document.getElementById("nav");if(!e||e.dataset.scrollBound==="true")return;let t=()=>{e.classList.toggle("scrolled",window.scrollY>30)};e.dataset.scrollBound="true",window.addEventListener("scroll",t,{passive:!0}),t()}function re(){let e=document.getElementById("newsForm");!e||e.dataset.bound==="true"||(e.dataset.bound="true",e.addEventListener("submit",t=>{t.preventDefault();let s=document.getElementById("newsOk");s&&(s.classList.add("show"),window.setTimeout(()=>s.classList.remove("show"),4e3));let n=e.querySelector("input");n&&(n.value="")}))}function oe(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.dataset.bound!=="true"&&(e.dataset.bound="true",e.addEventListener("click",t=>{let s=e.getAttribute("href");if(!s||s.length<2)return;let n=document.querySelector(s);if(!n)return;t.preventDefault();let a=n.getBoundingClientRect().top+window.scrollY-70;window.scrollTo({top:a,behavior:"smooth"})}))})}function ie(){let e=document.getElementById("nav"),t=e?e.querySelector(".burger"):null;if(!e||!t||t.dataset.bound==="true")return;t.dataset.bound="true";let s=()=>{t.setAttribute("aria-expanded",e.classList.contains("open")?"true":"false")};t.addEventListener("click",n=>{n.stopPropagation(),e.classList.toggle("open"),s()}),e.querySelectorAll(".menu a, .nav-cta").forEach(n=>{n.addEventListener("click",()=>{e.classList.remove("open"),s()})}),document.addEventListener("click",n=>{e.classList.contains("open")&&(e.contains(n.target)||(e.classList.remove("open"),s()))}),window.addEventListener("keydown",n=>{n.key!=="Escape"||!e.classList.contains("open")||(e.classList.remove("open"),s())}),s()}function Re(){let e=[...document.querySelectorAll(".filter[data-f]")],t=document.getElementById("stages-grid");!e.length||!t||e.forEach(s=>{s.dataset.bound!=="true"&&(s.dataset.bound="true",s.addEventListener("click",()=>{e.forEach(a=>a.classList.remove("on")),s.classList.add("on");let n=s.dataset.f;t.querySelectorAll(".stage-card").forEach(a=>{let r=a.dataset.cat||"all",o=a.dataset.status||"",i=n==="all"||r===n||n==="open"&&o==="ouvert";a.style.display=i?"":"none"})}))})}function F(e,t,s=""){return`<img src="${d(e)}" alt="${d(t)}" class="${s}" loading="lazy" />`}function V(e){return e?String(e).replace(/\bEUR\b/gi,"\u20AC"):"Infos"}function xe(e,t){return e.image?`
      <div class="stage-img has-photo">
        ${F(e.image,e.title||"Stage","stage-photo")}
        <span class="badge">${l(e.level||"Tous niveaux")}</span>
        <span class="pricetag">${l(V(e.price))}</span>
      </div>
    `:`
    <div class="stage-img">
      <div class="ph ${L.stage[t%L.stage.length]}"></div>
      <span class="badge">${l(e.level||"Tous niveaux")}</span>
      <span class="pricetag">${l(V(e.price))}</span>
    </div>
  `}function He(e){return e.status==="complet"?'<span class="reg reg-disabled">Complet</span>':e.status==="passe"?'<span class="reg reg-disabled">Termin\xE9</span>':e.helloasso_url?`<a href="${d(e.helloasso_url)}" target="_blank" rel="noopener" class="reg">S'inscrire <span class="arr">\u2192</span></a>`:'<span class="reg reg-disabled">Lien \xE0 venir</span>'}function J(e,t,s=""){let n=["stage-card","reveal",s].filter(Boolean).join(" "),a=[C(e.date),e.time||e.duration||"",e.places?`${e.places} places`:""].filter(Boolean);return`
    <article class="${n}" data-cat="${Ce(e.level)}" data-status="${d(e.status||"")}">
      ${xe(e,t)}
      <h3>${l(e.title||"Stage")}</h3>
      <div class="meta">
        ${a.map(r=>`<span>${l(r)}</span>`).join("")}
      </div>
      <p>${l(M(e.descriptionText||e.body,170))}</p>
      <div class="actions">
        ${He(e)}
        <span class="more">${l(e.status==="passe"?"Archive":e.level||"Tous niveaux")}</span>
      </div>
    </article>
  `}function b(e){return`<div class="empty-note">${l(e)}</div>`}function le(e,t){let s=t==="home"?"hl-img":"img",n="Estampes",a=l(e.title||"La Maison Rose");return e.image?`
      <div class="${s} has-photo">
        ${F(e.image,e.title||"\xC9v\xE9nement","event-photo")}
      </div>
    `:t==="home"?`<div class="hl-img" aria-label="${a}"></div>`:`<div class="img" aria-label="${n}"></div>`}function je(e){let t=document.getElementById("countdown");if(!t)return;window.clearInterval(z);let s=h(e.date);if(!s)return;let n=$e(e.time),a=new Date(s);a.setHours(n.hours,n.minutes,0,0);let r=i=>String(Math.max(0,i)).padStart(2,"0"),o=()=>{let i=Math.max(0,a.getTime()-Date.now()),c=Math.floor(i/864e5),u=Math.floor(i%864e5/36e5),y=Math.floor(i%36e5/6e4),k=Math.floor(i%6e4/1e3);t.querySelector('[data-k="d"]').textContent=c,t.querySelector('[data-k="h"]').textContent=r(u),t.querySelector('[data-k="m"]').textContent=r(y),t.querySelector('[data-k="s"]').textContent=r(k)};o(),z=window.setInterval(o,1e3)}function qe(e){return`
    <div class="headline-grid">
      <div class="headline-text reveal">
        <span class="tag">\xC9v\xE9nement \xE0 la une</span>
        <h2>${l(e.title||"\xC9v\xE9nement")}</h2>
        <div class="headline-meta">
          <div><div class="lbl">Date</div><div class="val">${l(C(e.date))}</div></div>
          <div><div class="lbl">Lieu</div><div class="val">${l(e.location||"La Maison Rose")}</div></div>
          <div><div class="lbl">Entr\xE9e</div><div class="val">${l(e.entry||"Entr\xE9e libre")}</div></div>
        </div>
        <p>${l(M(e.descriptionText||e.body,240))}</p>
        <div class="countdown" id="countdown">
          <div class="cell"><span class="n" data-k="d">\u2014</span><span class="l">Jours</span></div>
          <div class="cell"><span class="n" data-k="h">\u2014</span><span class="l">Heures</span></div>
          <div class="cell"><span class="n" data-k="m">\u2014</span><span class="l">Minutes</span></div>
          <div class="cell"><span class="n" data-k="s">\u2014</span><span class="l">Secondes</span></div>
        </div>
        <div class="cta-row">
          ${e.helloasso_url?`<a href="${d(e.helloasso_url)}" target="_blank" rel="noopener" class="btn btn-primary">R\xE9server ma venue <span class="arr">\u2192</span></a>`:`<a href="evenements.html" class="btn btn-primary">Voir l'agenda <span class="arr">\u2192</span></a>`}
          <a href="evenements.html" class="btn btn-ghost">Programme complet</a>
        </div>
      </div>
      <div class="headline-visual reveal d2">
        ${le(e,"home")}
        <div class="hl-corner"><span>${l(m(e.date).day)}<strong>${l(m(e.date).month.split(" ")[0]||"date")}</strong>${l(m(e.date).month.split(" ")[1]||"")}</span></div>
      </div>
    </div>
  `}function Be(e){return`
    <div class="feat-grid">
      <div class="reveal">
        <span class="tag">\xC0 la une</span>
        <h2>${l(e.title||"\xC9v\xE9nement")}</h2>
        <div class="feat-meta">
          <div><div class="lbl">Date</div><div class="val">${l(C(e.date))}</div></div>
          <div><div class="lbl">Horaires</div><div class="val">${l(e.time||"\xC0 pr\xE9ciser")}</div></div>
          <div><div class="lbl">Lieu</div><div class="val">${l(e.location||"La Maison Rose")}</div></div>
          <div><div class="lbl">Entr\xE9e</div><div class="val">${l(e.entry||"Entr\xE9e libre")}</div></div>
        </div>
        <p>${l(M(e.descriptionText||e.body,260))}</p>
        <div class="cta-row">
          ${e.helloasso_url?`<a href="${d(e.helloasso_url)}" target="_blank" rel="noopener" class="btn btn-primary">R\xE9server ma venue <span class="arr">\u2192</span></a>`:'<a href="contact.html" class="btn btn-primary">Nous contacter <span class="arr">\u2192</span></a>'}
          <a href="contact.html" class="btn btn-ghost">Informations pratiques</a>
        </div>
      </div>
      <div class="feat-visual reveal d2">
        ${le(e,"events")}
        <div class="feat-corner"><span>${l(m(e.date).day)}<strong>${l(m(e.date).month.split(" ")[0]||"date")}</strong>${l(m(e.date).month.split(" ")[1]||"")}</span></div>
      </div>
    </div>
  `}function Fe(e){let t=m(e.date),s=e.helloasso_url?`<a href="${d(e.helloasso_url)}" target="_blank" rel="noopener" class="ev-row">`:'<article class="ev-row">',n=e.helloasso_url?"</a>":"</article>",a=e.entry?`${e.entry} \xB7 ${e.location||"Auvers-sur-Oise"}`:e.location;return`
    ${s}
      <div class="ev-date"><span class="day">${l(t.day)}</span><span class="mo">${l(t.month)}</span></div>
      <div>
        <h3>${l(e.title||"\xC9v\xE9nement")}</h3>
        <span class="ev-cat">${l(a||"\xC9v\xE9nement")}</span>
      </div>
      <p>${l(M(e.descriptionText||e.body,150))}</p>
      <div class="ev-action"><span class="arrow">${e.helloasso_url?"\u2192":"\u2022"}</span></div>
    ${n}
  `}function Y(e,t){document.querySelectorAll(e).forEach(s=>{s.textContent=t})}function Q(e,t,s){document.querySelectorAll(e).forEach(n=>{n.textContent=s,n.setAttribute("href",t)})}function G(e,t){document.querySelectorAll(e).forEach(s=>{s.setAttribute("href",t)})}function De(e){let s=(String(e||"").trim()||$.home_hero_image).replace(/"/g,'\\"');document.documentElement.style.setProperty("--home-hero-image",`url("${s}")`)}function Ne(e){Y("[data-site-address-line-1]",e.address_line_1),Y("[data-site-address-line-2]",e.address_line_2),Q("[data-site-email]",`mailto:${e.contact_email}`,e.contact_email),Q("[data-site-phone]",Ee(e.contact_phone),e.contact_phone),G("[data-site-instagram]",e.instagram_url),G("[data-site-helloasso]",e.helloasso_url),De(e.home_hero_image)}async function Pe(e){if(e.announcement_mode==="off")return null;if(e.announcement_mode==="custom"&&e.announcement_text)return{prefix:"Actualit\xE9",main:e.announcement_text,href:e.announcement_link||"evenements.html"};let n=(await I("evenements")).filter(a=>a.status!=="passe").sort(w)[0];return n?{prefix:"Prochain \xE9v\xE9nement",main:`${n.title} \u2014 ${C(n.date)}`,href:n.helloasso_url||"evenements.html"}:{prefix:"Lieu culturel \xB7 R\xE9sidence d'artistes",main:"Auvers-sur-Oise \xB7 30 km de Paris",href:"le-lieu.html"}}function Oe(e){let t=document.getElementById("site-util"),s=document.getElementById("site-util-link"),n=document.getElementById("site-util-prefix"),a=document.getElementById("site-util-main");if(!(!t||!s||!n||!a)){if(!e){t.hidden=!0;return}t.hidden=!1,n.textContent=e.prefix,a.textContent=e.main,s.setAttribute("href",e.href||"evenements.html"),/^https?:\/\//.test(e.href||"")?(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener")):(s.removeAttribute("target"),s.removeAttribute("rel"))}}function We(){U||(U=!0,window.addEventListener("message",e=>{let t=document.getElementById("haWidget");if(!t||e.source!==t.contentWindow)return;let s=Number(e.data&&e.data.height);s>200&&(t.style.height=`${s}px`)}))}function ze(e){let t=document.getElementById("helloasso-widget");if(!t)return;let s=Ae(e.helloasso_widget_url),n=Number(e.helloasso_widget_height)||780;if(!s){t.innerHTML=`
      <div class="helloasso-fallback">
        <p>Aucun widget HelloAsso n'est affich\xE9 pour le moment. Retrouvez les campagnes actives, adh\xE9sions ou soutiens directement sur la page HelloAsso de l'association.</p>
        <a href="${d(e.helloasso_url)}" target="_blank" rel="noopener" class="btn btn-primary">Ouvrir HelloAsso <span class="arr">\u2192</span></a>
      </div>
    `;return}t.innerHTML=`
    <iframe
      id="haWidget"
      title="HelloAsso"
      allowtransparency="true"
      scrolling="auto"
      src="${d(s)}"
      style="width:100%;height:${n}px;border:none;"
      loading="lazy"
    ></iframe>
  `,We()}async function Ue(){let e=document.querySelectorAll("[data-map-frame]");if(!e.length)return;let t=await B(),s=t.googleMapsEmbedUrl||"https://www.google.com/maps?q=59%20rue%20Daubigny%2C%2095430%20Auvers-sur-Oise&output=embed";e.forEach(n=>{n.setAttribute("src",s)}),document.querySelectorAll("[data-map-directions]").forEach(n=>{t.googleMapsDirectionsUrl&&n.setAttribute("href",t.googleMapsDirectionsUrl)})}function g(e,t,s){let n=e.querySelector("[data-form-ok]"),a=e.querySelector("[data-form-error]");n&&(n.textContent=t==="ok"?s:"",n.classList.toggle("show",t==="ok")),a&&(a.textContent=t==="error"?s:"",a.classList.toggle("show",t==="error"))}function Ve(){let e=document.getElementById("ctForm");if(!e||e.dataset.bound==="true")return;e.dataset.bound="true";let t=!0;B().then(s=>{s.contactFormEnabled===!1&&(t=!1,g(e,"error","L'envoi direct est en cours d'activation sur cette version du site."))}).catch(()=>{}),e.addEventListener("submit",async s=>{s.preventDefault();let n=e.querySelector('button[type="submit"]'),a=new FormData(e),r=Object.fromEntries(a.entries());if(g(e,"",""),e.classList.remove("sent"),!t){g(e,"error","L'envoi direct n'est pas encore active sur ce deploiement.");return}n&&(n.disabled=!0,n.dataset.label=n.innerHTML,n.innerHTML="Envoi en cours\u2026");try{let o=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i.message||"Le message n'a pas pu \xEAtre envoy\xE9 pour le moment. R\xE9essaie dans un instant.");e.reset(),e.classList.add("sent"),g(e,"ok","Merci, votre message a bien \xE9t\xE9 envoy\xE9 \xE0 l'association.")}catch(o){g(e,"error",o.message||"Le message n'a pas pu \xEAtre envoy\xE9. V\xE9rifie la configuration du formulaire sur Vercel.")}finally{n&&(n.disabled=!1,n.innerHTML=n.dataset.label||"Envoyer")}})}function S(e,t,s){let n=e.querySelector("[data-checkout-ok]"),a=e.querySelector("[data-checkout-error]");n&&(n.textContent=t==="ok"?s:"",n.classList.toggle("show",t==="ok")),a&&(a.textContent=t==="error"?s:"",a.classList.toggle("show",t==="error"))}function f(e,t,s){if(e){if(e.hidden=!s,e.classList.remove("is-ok","is-error","is-pending"),!s){e.innerHTML="";return}t&&e.classList.add(`is-${t}`),e.innerHTML=`<p>${l(s)}</p>`}}function q(e,t){let s=e.querySelector('[name="amount"]'),n=e.querySelector('[name="purpose"]'),a=document.querySelector("[data-checkout-summary]"),r=Number(String(s?.value||"").replace(",",".")),o=String(n?.value||"support"),i=ee(t,o);a&&(e.querySelectorAll("[data-checkout-amount]").forEach(c=>{c.classList.toggle("on",Number(c.getAttribute("data-checkout-amount"))===r)}),a.textContent=Number.isFinite(r)&&r>0?`${i.label} \xB7 ${Z(r)}`:i.label)}function Je(e,t){let s=e.querySelector("[data-checkout-amounts]"),n=e.querySelector('[name="amount"]'),a=e.querySelector('[name="purpose"]');if(!s||!n||!a)return;function r(){let o=ee(t,a.value);s.innerHTML=o.suggestedAmounts.map(i=>`
          <button type="button" class="amt" data-checkout-amount="${i}">
            ${l(Z(i))}
          </button>
        `).join(""),n.readOnly=o.locked,n.value=String(o.amount),s.querySelectorAll("[data-checkout-amount]").forEach(i=>{i.addEventListener("click",()=>{n.value=i.getAttribute("data-checkout-amount")||"",n.dispatchEvent(new Event("input",{bubbles:!0}))})}),n.dispatchEvent(new Event("input",{bubbles:!0}))}a.addEventListener("change",r),r()}function K(e){let t=String(e||"").trim();return!(t.length<2||!/[aeiouyàâäéèêëîïôöùûüÿæœ]/i.test(t)||/[^a-zàâäéèêëîïôöùûüÿæœç' -]/i.test(t)||/(.)\1\1/i.test(t)||/^(test|admin|unknown|prenom|nom)$/i.test(t))}async function Ye(e){let t=new URLSearchParams(window.location.search),s=t.get("checkoutIntentId"),n=t.get("code")||t.get("helloasso")||"";if(!s){n==="error"&&f(e,"error","Le paiement n'a pas abouti. Vous pouvez reessayer ou ouvrir directement HelloAsso.");return}f(e,"pending","Verification du paiement HelloAsso en cours...");try{let a=await fetch(`/api/helloasso/checkout-status?checkoutIntentId=${encodeURIComponent(s)}`,{cache:"no-store"}),r=await a.json().catch(()=>({}));if(!a.ok)throw new Error(r.message||"Impossible de verifier le paiement HelloAsso.");if(r.status==="succeeded"||r.order){let o=r.order&&r.order.id?` Reference ${r.order.id}.`:"";f(e,"ok",`Paiement confirme. Merci pour votre soutien.${o}`);return}if(n&&n!=="succeeded"){f(e,"error","Le paiement a ete interrompu ou n'a pas encore ete valide.");return}f(e,"pending","Le paiement a ete renvoye par HelloAsso mais n'est pas encore confirme. Rechargez la page dans un instant.")}catch(a){f(e,"error",a.message||"Impossible de verifier le paiement HelloAsso pour le moment.")}}async function Qe(){let e=document.getElementById("haCheckoutForm");if(!e||e.dataset.bound==="true")return;e.dataset.bound="true";let t=e.querySelector('[name="amount"]'),s=e.querySelector('[name="purpose"]'),n=e.querySelector('button[type="submit"]'),a=document.getElementById("helloasso-checkout-return"),r=document.getElementById("helloasso-checkout-disabled"),o={...$},i=!1;try{let[c,u]=await Promise.all([se(),B()]);o=c,i=!!u.helloAssoCheckoutEnabled}catch(c){console.warn("Impossible d'initialiser le checkout HelloAsso.",c)}Je(e,o),t&&(t.min=String(Number(o.helloasso_checkout_min_amount)||10),t.addEventListener("input",()=>q(e,o))),s&&s.addEventListener("change",()=>q(e,o)),q(e,o),i?r&&(r.hidden=!0):(e.classList.add("is-disabled"),n&&(n.disabled=!0),r&&(r.hidden=!1)),await Ye(a),e.addEventListener("submit",async c=>{if(c.preventDefault(),S(e,"",""),!i){S(e,"error","Le checkout HelloAsso n'est pas encore active sur ce deploiement.");return}let u=Object.fromEntries(new FormData(e).entries()),y=String(u.first_name||"").trim(),k=String(u.last_name||"").trim();if(!K(y)||!K(k)||y===k){S(e,"error","HelloAsso demande un vrai pr\xE9nom et un vrai nom. \xC9vite les valeurs de test ou trop approximatives.");return}n&&(n.disabled=!0,n.dataset.label=n.innerHTML,n.innerHTML="Redirection vers HelloAsso\u2026");try{let _=await fetch("/api/helloasso/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)}),R=await _.json().catch(()=>({}));if(!_.ok||!R.redirectUrl)throw new Error(R.message||"Le paiement HelloAsso n'a pas pu etre initialise pour le moment.");window.location.href=R.redirectUrl}catch(_){S(e,"error",_.message||"Le paiement HelloAsso n'a pas pu etre initialise pour le moment."),n&&(n.disabled=!1,n.innerHTML=n.dataset.label||"Continuer")}})}function Ge(e,t,s=""){let n=["past-card","reveal",s].filter(Boolean).join(" "),a=L.event[t%L.event.length];return`
    <article class="${n}">
      <div class="img ${e.image?"has-photo":""}">
        ${e.image?F(e.image,e.title||"\xC9v\xE9nement pass\xE9","event-photo"):`<div class="ph ${a}"></div>`}
      </div>
      <span class="yr">\u2014 ${l(Le(e.date)||"Archive")}</span>
      <h4>${l(e.title||"\xC9v\xE9nement pass\xE9")}</h4>
    </article>
  `}async function Ke(){let e=document.getElementById("home-featured-event");if(!e)return;let t=await I("evenements"),s=ne(t);if(!s){e.innerHTML=b("Aucun \xE9v\xE9nement \xE0 la une pour le moment.");return}e.innerHTML=qe(s),je(s),T(e)}async function Xe(){let e=document.getElementById("stages-grid");if(!e)return;let t=document.getElementById("stages-archives"),s=document.getElementById("stages-archives-wrap"),n=await I("stages"),a=n.filter(o=>o.status!=="passe").sort(w),r=n.filter(o=>o.status==="passe").sort(te);e.innerHTML=a.length?a.map((o,i)=>J(o,i,i%3===1?"d2":i%3===2?"d3":"")).join(""):b("Aucun stage \xE0 venir pour le moment."),t&&s&&(r.length?(t.innerHTML=r.map((o,i)=>J(o,i+3,i%3===1?"d2":i%3===2?"d3":"")).join(""),s.hidden=!1):s.hidden=!0),T(document),Re()}async function Ze(){let e=document.getElementById("events-featured"),t=document.getElementById("events-upcoming"),s=document.getElementById("events-past");if(!e&&!t&&!s)return;let n=await I("evenements"),a=ne(n),r=n.filter(i=>i.status!=="passe"&&(!a||i.slug!==a.slug)).sort(w),o=n.filter(i=>i.status==="passe").sort(te);e&&(e.innerHTML=a?Be(a):b("Aucun \xE9v\xE9nement \xE0 la une pour le moment.")),t&&(t.innerHTML=r.length?r.map(i=>Fe(i)).join(""):b("Aucun autre rendez-vous \xE0 venir pour le moment.")),s&&(s.innerHTML=o.length?o.map((i,c)=>Ge(i,c,c%3===1?"d2":c%3===2?"d3":"")).join(""):b("Les archives d'\xE9v\xE9nements appara\xEEtront ici.")),T(document)}function et(e){let t=`
    <div class="util" id="site-util">
      <a href="evenements.html" id="site-util-link">
        <span id="site-util-prefix">Lieu culturel \xB7 R\xE9sidence d'artistes</span>
        <strong id="site-util-main">Auvers-sur-Oise \xB7 30 km de Paris</strong>
      </a>
    </div>
    <header class="nav" id="nav">
      <div class="nav-inner">
        <a href="index.html" class="brand">
          <span class="brand-mark" aria-hidden="true"><img src="assets/brand-logo.png" alt="" /></span>
          <span class="brand-text">
            <span class="a">La Maison Rose</span>
            <span class="b">de Wallerand \xB7 Auvers-sur-Oise</span>
          </span>
        </a>
        <nav>
          <ul class="menu" id="site-menu">
            <li><a href="index.html" data-k="home">Accueil</a></li>
            <li><a href="le-lieu.html" data-k="lieu">Le Lieu</a></li>
            <li><a href="stages.html" data-k="stages">Stages &amp; Cours</a></li>
            <li><a href="evenements.html" data-k="events">\xC9v\xE9nements</a></li>
            <li><a href="wallerand.html" data-k="wallerand">Wallerand</a></li>
            <li><a href="association.html" data-k="assoc">L'Association</a></li>
            <li><a href="contact.html" data-k="contact">Contact</a></li>
            <li class="menu-mobile-only"><a href="adherer.html" data-k="adherer">Adh\xE9rer</a></li>
          </ul>
        </nav>
        <div class="nav-actions">
          <a href="adherer.html" class="nav-cta" data-k="adherer">Adh\xE9rer <span class="arr">\u2192</span></a>
          <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="site-menu">
            <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true"><path d="M0 1h22M0 7h22M0 13h22" stroke="#1A1614" stroke-width="1.5"/></svg>
          </button>
        </div>
      </div>
    </header>
  `,s=`
    <footer>
      <div class="wrap">
        <div class="foot-grid">
          <div class="brand-blk">
            <h4>La Maison Rose</h4>
            <span class="a">de Wallerand</span>
            <p>Ancien atelier d'\xE9t\xE9 de Charles-Fran\xE7ois Daubigny, devenu lieu culturel, r\xE9sidence d'artistes et espace de transmission \xE0 Auvers-sur-Oise.</p>
          </div>
          <div>
            <h4>Visiter</h4>
            <ul>
              <li data-site-address-line-1>59 rue Daubigny</li>
              <li data-site-address-line-2>95430 Auvers-sur-Oise</li>
              <li>Selon la programmation et sur rendez-vous</li>
              <li><a href="contact.html">Itin\xE9raire \u2192</a></li>
            </ul>
          </div>
          <div class="contact">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@lamaisonrosedewallerand.com" data-site-email>contact@lamaisonrosedewallerand.com</a></li>
              <li><a href="tel:+33615375672" data-site-phone>+33 6 15 37 56 72</a></li>
              <li><a href="https://www.instagram.com/lamaisonrosedewallerand/" target="_blank" rel="noopener" data-site-instagram>@lamaisonrosedewallerand</a></li>
              <li><a href="https://www.helloasso.com/associations/la-maison-rose-de-wallerand" target="_blank" rel="noopener" data-site-helloasso>HelloAsso \u2192</a></li>
            </ul>
          </div>
          <div>
            <h4>Suivre la programmation</h4>
            <p class="foot-note">Retrouvez l'agenda, les stages et les liens d'inscription sur le site et sur HelloAsso, sans paiement ni espace membre interne.</p>
            <ul style="margin-top: 18px;">
              <li><a href="evenements.html">Agenda des \xE9v\xE9nements \u2192</a></li>
              <li><a href="stages.html">Cours et stages de gravure \u2192</a></li>
              <li><a href="adherer.html">Adh\xE9rer ou soutenir \u2192</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-support">
          <div class="foot-support-copy">
            <span class="ey">Avec le soutien de</span>
            <p>Patrimoine d\u2019\xCEle-de-France \xB7 R\xE9gion \xCEle-de-France</p>
          </div>
          <div class="foot-support-logo">
            <img src="/assets/uploads/logo-patrimoine-ile-de-france.jpg" alt="Logo Patrimoine d\u2019\xCEle-de-France et R\xE9gion \xCEle-de-France" loading="lazy" />
          </div>
        </div>
        <div class="foot-bot">
          <div>\xA9 2026 La Maison Rose de Wallerand</div>
          <div class="links">
            <a href="index.html">Accueil</a>
            <a href="contact.html">Contact</a>
            <a href="admin/">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  `,n=document.getElementById("site-nav"),a=document.getElementById("site-foot");if(n&&(n.innerHTML=t),a&&(a.innerHTML=s),e){let r=document.querySelector(`.menu a[data-k="${e}"]`);r&&r.classList.add("active")}ae(),re(),oe(),ie(),se().then(async r=>{Ne(r),ze(r),Oe(await Pe(r))}).catch(r=>{console.warn("Impossible d'appliquer les r\xE9glages du site.",r)})}window.injectChrome=et;window.initContactForm=Ve;window.initHelloAssoCheckout=Qe;document.addEventListener("DOMContentLoaded",async()=>{T(document),ae(),re(),oe(),ie();try{await Promise.all([Ke(),Xe(),Ze(),Ue()])}catch(e){console.error(e)}});P({framework:"static-html"});W({framework:"static-html"});})();
