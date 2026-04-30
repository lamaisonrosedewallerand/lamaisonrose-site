(()=>{var ye=()=>{window.va||(window.va=function(...t){window.vaq||(window.vaq=[]),window.vaq.push(t)})},ke="@vercel/analytics",_e="2.0.1";function U(){return typeof window<"u"}function z(){try{let e="production";if(e==="development"||e==="test")return"development"}catch{}return"production"}function Ee(e="auto"){if(e==="auto"){window.vam=z();return}window.vam=e}function Se(){return(U()?window.vam:z())||"production"}function F(){return Se()==="development"}function Ae(e){return e.scriptSrc?h(e.scriptSrc):F()?"https://va.vercel-scripts.com/v1/script.debug.js":e.basePath?h(`${e.basePath}/insights/script.js`):"/_vercel/insights/script.js"}function $e(e,t){var a;let n=e;if(t)try{n={...(a=JSON.parse(t))==null?void 0:a.analytics,...e}}catch{}Ee(n.mode);let s={sdkn:ke+(n.framework?`/${n.framework}`:""),sdkv:_e};return n.disableAutoTrack&&(s.disableAutoTrack="1"),n.viewEndpoint&&(s.viewEndpoint=h(n.viewEndpoint)),n.eventEndpoint&&(s.eventEndpoint=h(n.eventEndpoint)),n.sessionEndpoint&&(s.sessionEndpoint=h(n.sessionEndpoint)),F()&&n.debug===!1&&(s.debug="false"),n.dsn&&(s.dsn=n.dsn),n.endpoint?s.endpoint=n.endpoint:n.basePath&&(s.endpoint=h(`${n.basePath}/insights`)),{beforeSend:n.beforeSend,src:Ae(n),dataset:s}}function h(e){return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/")?e:`/${e}`}function V(e={debug:!0},t){var a;if(!U())return;let{beforeSend:n,src:s,dataset:r}=$e(e,t);if(ye(),n&&((a=window.va)==null||a.call(window,"beforeSend",n)),document.head.querySelector(`script[src*="${s}"]`))return;let o=document.createElement("script");o.src=s;for(let[i,c]of Object.entries(r))o.dataset[i]=c;o.defer=!0,o.onerror=()=>{let i=F()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${s}. ${i}`)},document.head.appendChild(o)}var Le=()=>{window.si||(window.si=function(...t){window.siq=window.siq||[],window.siq.push(t)})},Te="@vercel/speed-insights",Ie="2.0.0";function Me(){return typeof window<"u"}function Ce(){try{let e="production";if(e==="development"||e==="test")return"development"}catch{}return"production"}function G(){return Ce()==="development"}function Re(e){return e.scriptSrc?A(e.scriptSrc):G()?"https://va.vercel-scripts.com/v1/speed-insights/script.debug.js":e.dsn?"https://va.vercel-scripts.com/v1/speed-insights/script.js":e.basePath?A(`${e.basePath}/speed-insights/script.js`):"/_vercel/speed-insights/script.js"}function xe(e,t){var a;let n=e;if(t)try{n={...(a=JSON.parse(t))==null?void 0:a.speedInsights,...e}}catch{}let s={sdkn:Te+(n.framework?`/${n.framework}`:""),sdkv:Ie};return n.sampleRate&&(s.sampleRate=n.sampleRate.toString()),n.route&&(s.route=n.route),G()&&n.debug===!1&&(s.debug="false"),n.dsn&&(s.dsn=n.dsn),n.endpoint?s.endpoint=A(n.endpoint):n.basePath&&(s.endpoint=A(`${n.basePath}/speed-insights/vitals`)),{src:Re(n),beforeSend:n.beforeSend,dataset:s}}function A(e){return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/")?e:`/${e}`}function J(e={},t){var a;if(!Me()||e.route===null)return null;Le();let{beforeSend:n,src:s,dataset:r}=xe(e,t);if(document.head.querySelector(`script[src*="${s}"]`))return null;n&&((a=window.si)==null||a.call(window,"beforeSend",n));let o=document.createElement("script");o.src=s,o.defer=!0;for(let[i,c]of Object.entries(r))o.dataset[i]=c;return o.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${s}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(o),{setRoute:i=>{o.dataset.route=i??void 0}}}var re={stages:"assets/data/stages.json",evenements:"assets/data/evenements.json",site:"assets/data/site-settings.json"},I={announcement_mode:"auto",announcement_text:"",announcement_link:"",contact_email:"contact@lamaisonrosedewallerand.com",contact_phone:"+33 6 15 37 56 72",address_line_1:"59 rue Daubigny",address_line_2:"95430 Auvers-sur-Oise",instagram_url:"https://www.instagram.com/lamaisonrosedewallerand/",helloasso_url:"https://www.helloasso.com/associations/la-maison-rose-de-wallerand",helloasso_organization_slug:"la-maison-rose-de-wallerand",home_hero_image:"/assets/uploads/maison-rose-facade-hero.jpg",helloasso_checkout_membership_item_name:"Adhesion individuelle a La Maison Rose de Wallerand",helloasso_checkout_membership_amount:20,helloasso_checkout_membership_couple_item_name:"Adhesion couple a La Maison Rose de Wallerand",helloasso_checkout_membership_couple_amount:30,helloasso_checkout_support_item_name:"Soutien a La Maison Rose de Wallerand",helloasso_checkout_default_amount:50,helloasso_checkout_min_amount:10,helloasso_checkout_suggested_amounts:"20,50,100,250",helloasso_widget_url:"",helloasso_widget_height:780},M={stage:["a","b","c","d","e","f"],event:["a","b","c"]},P=new Map,D=new Map,w,Y,$,Q=!1,L,K=0,oe="maisonrose-language",p="fr",R=new Set(["fr","en"]);function l(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function u(e){return l(e)}function He(e){return`tel:${String(e||"").replace(/[^\d+]/g,"")}`}function qe(e){let t=String(e||"").trim();return t?t.includes("/widget")?t:`${t.replace(/\/$/,"")}/widget`:""}function C(){try{let e=window.localStorage.getItem(oe);if(R.has(e))return e}catch(e){console.warn("Impossible de lire la langue enregistr\xE9e.",e)}return p}function Be(e){let t=R.has(e)?e:p;try{window.localStorage.setItem(oe,t)}catch(a){console.warn("Impossible d'enregistrer la langue choisie.",a)}}function ie(e){let a=`/fr/${R.has(e)?e:p}`,n=3600*24*365;document.cookie=`googtrans=${a};path=/;max-age=${n}`,window.location.hostname&&window.location.hostname.includes(".")&&(document.cookie=`googtrans=${a};path=/;domain=.${window.location.hostname};max-age=${n}`)}function le(e){document.querySelectorAll("[data-lang-switch]").forEach(t=>{let a=t.dataset.langSwitch===e;t.classList.toggle("is-active",a),t.setAttribute("aria-pressed",a?"true":"false")})}function X(){let e=document.getElementById("google_translate_element");!e||e.dataset.ready==="true"||!window.google||!window.google.translate||!window.google.translate.TranslateElement||(new window.google.translate.TranslateElement({pageLanguage:p,includedLanguages:"fr,en",autoDisplay:!1,layout:window.google.translate.TranslateElement.InlineLayout.SIMPLE},"google_translate_element"),e.dataset.ready="true")}function je(){return window.google&&window.google.translate&&window.google.translate.TranslateElement?(X(),Promise.resolve()):L||(L=new Promise((e,t)=>{if(window.googleTranslateElementInit=()=>{X(),e()},document.querySelector('script[data-google-translate="true"]'))return;let n=document.createElement("script");n.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",n.async=!0,n.defer=!0,n.dataset.googleTranslate="true",n.onerror=()=>t(new Error("Impossible de charger Google Translate.")),document.head.appendChild(n)}),L)}function Fe(){return new Promise((e,t)=>{let a=Date.now()+8e3,n=()=>{let s=document.querySelector(".goog-te-combo");if(s){e(s);return}if(Date.now()>a){t(new Error("Le s\xE9lecteur Google Translate est introuvable."));return}window.setTimeout(n,120)};n()})}async function ce(){let e=C();if(le(e),document.documentElement.setAttribute("lang",e),e!==p)try{ie(e),await je();let t=await Fe();t.value!==e&&(t.value=e,t.dispatchEvent(new Event("change")))}catch(t){console.warn("Impossible d'activer la version anglaise.",t)}}function d(){C()!==p&&(window.clearTimeout(K),K=window.setTimeout(()=>{ce()},180))}function Pe(){let e=document.querySelectorAll("[data-lang-switch]");e.length&&(e.forEach(t=>{t.dataset.bound!=="true"&&(t.dataset.bound="true",t.addEventListener("click",()=>{let a=R.has(t.dataset.langSwitch)?t.dataset.langSwitch:p;a!==C()&&(Be(a),ie(a),window.location.reload())}))}),le(C()),ce())}function de(e){let t=Number(e);return Number.isFinite(t)?new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(t):""}function De(e){return String(e||"").split(",").map(t=>Number(String(t).trim().replace(",","."))).filter(t=>Number.isFinite(t)&&t>0)}function ue(e,t){let a=Number(e.helloasso_checkout_membership_amount)||20,n=Number(e.helloasso_checkout_membership_couple_amount)||30;return t==="membership_single"?{label:e.helloasso_checkout_membership_item_name||"Adhesion individuelle a La Maison Rose de Wallerand",amount:a,locked:!0,suggestedAmounts:[a]}:t==="membership_couple"?{label:e.helloasso_checkout_membership_couple_item_name||"Adhesion couple a La Maison Rose de Wallerand",amount:n,locked:!0,suggestedAmounts:[n]}:{label:e.helloasso_checkout_support_item_name||"Soutien a La Maison Rose de Wallerand",amount:Number(e.helloasso_checkout_default_amount)||50,locked:!1,suggestedAmounts:De(e.helloasso_checkout_suggested_amounts)}}function x(e,t=180){if(!e)return"";let a=e.replace(/\s+/g," ").trim();return a.length>t?`${a.slice(0,t).trim()}\u2026`:a}function v(e){if(!e)return null;let t=new Date(`${e}T12:00:00`);return Number.isNaN(t.getTime())?null:t}function Ne(e){let t=(e||"").match(/(\d{1,2})h(?:(\d{2}))?/i);return t?{hours:Number(t[1]),minutes:Number(t[2]||0)}:{hours:10,minutes:0}}function H(e){let t=v(e);return t?new Intl.DateTimeFormat("fr-FR",{day:"numeric",month:"long",year:"numeric"}).format(t):e||""}function f(e){let t=v(e);return t?{day:new Intl.DateTimeFormat("fr-FR",{day:"2-digit"}).format(t),month:new Intl.DateTimeFormat("fr-FR",{month:"short",year:"2-digit"}).format(t).replace(".","")}:{day:"--",month:""}}function Oe(e){let t=v(e);return t?new Intl.DateTimeFormat("fr-FR",{month:"long",year:"numeric"}).format(t):""}function k(e,t){let a=v(e.date),n=v(t.date);return!a&&!n?0:a?n?a-n:-1:1}function me(e,t){return k(t,e)}function We(e){return String(e||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function Ue(e){let t=We(e);return t.includes("debut")?"deb":t.includes("inter")?"int":t.includes("avance")?"adv":"all"}function fe(e){let t=e.filter(n=>n.status!=="passe").sort(k);return t.find(n=>n.featured)||t[0]||null}function ze(){return w||(w=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in"),w.unobserve(t.target))})},{threshold:.12,rootMargin:"0px 0px -40px 0px"}),w)}function q(e=document){let t=ze();e.querySelectorAll(".reveal").forEach(a=>{a.classList.contains("in")||t.observe(a)})}async function B(e){if(P.has(e))return P.get(e);let t=await fetch(re[e],{cache:"no-store"});if(!t.ok)throw new Error(`Impossible de charger ${e}`);let a=await t.json(),n=Array.isArray(a.items)?a.items:[];return P.set(e,n),n}async function Ve(e){if(D.has(e))return D.get(e);let t=await fetch(re[e],{cache:"no-store"});if(!t.ok)throw new Error(`Impossible de charger ${e}`);let a=await t.json(),n=a&&typeof a.item=="object"?a.item:{};return D.set(e,n),n}async function pe(){try{let e=await Ve("site");return{...I,...e}}catch(e){return console.warn("R\xE9glages du site indisponibles, valeurs par d\xE9faut utilis\xE9es.",e),{...I}}}async function O(){return $||($=fetch("/api/public-config",{cache:"no-store"}).then(async e=>e.ok?e.json():{}).catch(()=>({})),$)}function he(){let e=document.getElementById("nav");if(!e||e.dataset.scrollBound==="true")return;let t=()=>{e.classList.toggle("scrolled",window.scrollY>30)};e.dataset.scrollBound="true",window.addEventListener("scroll",t,{passive:!0}),t()}function ge(){let e=document.getElementById("newsForm");!e||e.dataset.bound==="true"||(e.dataset.bound="true",e.addEventListener("submit",t=>{t.preventDefault();let a=document.getElementById("newsOk");a&&(a.classList.add("show"),window.setTimeout(()=>a.classList.remove("show"),4e3));let n=e.querySelector("input");n&&(n.value="")}))}function ve(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.dataset.bound!=="true"&&(e.dataset.bound="true",e.addEventListener("click",t=>{let a=e.getAttribute("href");if(!a||a.length<2)return;let n=document.querySelector(a);if(!n)return;t.preventDefault();let s=n.getBoundingClientRect().top+window.scrollY-70;window.scrollTo({top:s,behavior:"smooth"})}))})}function we(){let e=document.getElementById("nav"),t=e?e.querySelector(".burger"):null;if(!e||!t||t.dataset.bound==="true")return;t.dataset.bound="true";let a=()=>{t.setAttribute("aria-expanded",e.classList.contains("open")?"true":"false")};t.addEventListener("click",n=>{n.stopPropagation(),e.classList.toggle("open"),a()}),e.querySelectorAll(".menu a, .nav-cta").forEach(n=>{n.addEventListener("click",()=>{e.classList.remove("open"),a()})}),document.addEventListener("click",n=>{e.classList.contains("open")&&(e.contains(n.target)||(e.classList.remove("open"),a()))}),window.addEventListener("keydown",n=>{n.key!=="Escape"||!e.classList.contains("open")||(e.classList.remove("open"),a())}),a()}function Ge(){let e=[...document.querySelectorAll(".filter[data-f]")],t=document.getElementById("stages-grid");!e.length||!t||e.forEach(a=>{a.dataset.bound!=="true"&&(a.dataset.bound="true",a.addEventListener("click",()=>{e.forEach(s=>s.classList.remove("on")),a.classList.add("on");let n=a.dataset.f;t.querySelectorAll(".stage-card").forEach(s=>{let r=s.dataset.cat||"all",o=s.dataset.status||"",i=n==="all"||r===n||n==="open"&&o==="ouvert";s.style.display=i?"":"none"})}))})}function W(e,t,a=""){return`<img src="${u(e)}" alt="${u(t)}" class="${a}" loading="lazy" />`}function Z(e){return e?String(e).replace(/\bEUR\b/gi,"\u20AC"):"Infos"}function Je(e,t){return e.image?`
      <div class="stage-img has-photo">
        ${W(e.image,e.title||"Stage","stage-photo")}
        <span class="badge">${l(e.level||"Tous niveaux")}</span>
        <span class="pricetag">${l(Z(e.price))}</span>
      </div>
    `:`
    <div class="stage-img">
      <div class="ph ${M.stage[t%M.stage.length]}"></div>
      <span class="badge">${l(e.level||"Tous niveaux")}</span>
      <span class="pricetag">${l(Z(e.price))}</span>
    </div>
  `}function Ye(e){return e.status==="complet"?'<span class="reg reg-disabled">Complet</span>':e.status==="passe"?'<span class="reg reg-disabled">Termin\xE9</span>':e.helloasso_url?`<a href="${u(e.helloasso_url)}" target="_blank" rel="noopener" class="reg">S'inscrire <span class="arr">\u2192</span></a>`:'<span class="reg reg-disabled">Lien \xE0 venir</span>'}function ee(e,t,a=""){let n=["stage-card","reveal",a].filter(Boolean).join(" "),s=[H(e.date),e.time||e.duration||"",e.places?`${e.places} places`:""].filter(Boolean);return`
    <article class="${n}" data-cat="${Ue(e.level)}" data-status="${u(e.status||"")}">
      ${Je(e,t)}
      <h3>${l(e.title||"Stage")}</h3>
      <div class="meta">
        ${s.map(r=>`<span>${l(r)}</span>`).join("")}
      </div>
      <p>${l(x(e.descriptionText||e.body,170))}</p>
      <div class="actions">
        ${Ye(e)}
        <span class="more">${l(e.status==="passe"?"Archive":e.level||"Tous niveaux")}</span>
      </div>
    </article>
  `}function y(e){return`<div class="empty-note">${l(e)}</div>`}function be(e,t){let a=t==="home"?"hl-img":"img",n="Estampes",s=l(e.title||"La Maison Rose");return e.image?`
      <div class="${a} has-photo">
        ${W(e.image,e.title||"\xC9v\xE9nement","event-photo")}
      </div>
    `:t==="home"?`<div class="hl-img" aria-label="${s}"></div>`:`<div class="img" aria-label="${n}"></div>`}function Qe(e){let t=document.getElementById("countdown");if(!t)return;window.clearInterval(Y);let a=v(e.date);if(!a)return;let n=Ne(e.time),s=new Date(a);s.setHours(n.hours,n.minutes,0,0);let r=i=>String(Math.max(0,i)).padStart(2,"0"),o=()=>{let i=Math.max(0,s.getTime()-Date.now()),c=Math.floor(i/864e5),m=Math.floor(i%864e5/36e5),_=Math.floor(i%36e5/6e4),E=Math.floor(i%6e4/1e3);t.querySelector('[data-k="d"]').textContent=c,t.querySelector('[data-k="h"]').textContent=r(m),t.querySelector('[data-k="m"]').textContent=r(_),t.querySelector('[data-k="s"]').textContent=r(E)};o(),Y=window.setInterval(o,1e3)}function Ke(e){return`
    <div class="headline-grid">
      <div class="headline-text reveal">
        <span class="tag">\xC9v\xE9nement \xE0 la une</span>
        <h2>${l(e.title||"\xC9v\xE9nement")}</h2>
        <div class="headline-meta">
          <div><div class="lbl">Date</div><div class="val">${l(H(e.date))}</div></div>
          <div><div class="lbl">Lieu</div><div class="val">${l(e.location||"La Maison Rose")}</div></div>
          <div><div class="lbl">Entr\xE9e</div><div class="val">${l(e.entry||"Entr\xE9e libre")}</div></div>
        </div>
        <p>${l(x(e.descriptionText||e.body,240))}</p>
        <div class="countdown" id="countdown">
          <div class="cell"><span class="n" data-k="d">\u2014</span><span class="l">Jours</span></div>
          <div class="cell"><span class="n" data-k="h">\u2014</span><span class="l">Heures</span></div>
          <div class="cell"><span class="n" data-k="m">\u2014</span><span class="l">Minutes</span></div>
          <div class="cell"><span class="n" data-k="s">\u2014</span><span class="l">Secondes</span></div>
        </div>
        <div class="cta-row">
          ${e.helloasso_url?`<a href="${u(e.helloasso_url)}" target="_blank" rel="noopener" class="btn btn-primary">R\xE9server ma venue <span class="arr">\u2192</span></a>`:`<a href="evenements.html" class="btn btn-primary">Voir l'agenda <span class="arr">\u2192</span></a>`}
          <a href="evenements.html" class="btn btn-ghost">Programme complet</a>
        </div>
      </div>
      <div class="headline-visual reveal d2">
        ${be(e,"home")}
        <div class="hl-corner"><span>${l(f(e.date).day)}<strong>${l(f(e.date).month.split(" ")[0]||"date")}</strong>${l(f(e.date).month.split(" ")[1]||"")}</span></div>
      </div>
    </div>
  `}function Xe(e){return`
    <div class="feat-grid">
      <div class="reveal">
        <span class="tag">\xC0 la une</span>
        <h2>${l(e.title||"\xC9v\xE9nement")}</h2>
        <div class="feat-meta">
          <div><div class="lbl">Date</div><div class="val">${l(H(e.date))}</div></div>
          <div><div class="lbl">Horaires</div><div class="val">${l(e.time||"\xC0 pr\xE9ciser")}</div></div>
          <div><div class="lbl">Lieu</div><div class="val">${l(e.location||"La Maison Rose")}</div></div>
          <div><div class="lbl">Entr\xE9e</div><div class="val">${l(e.entry||"Entr\xE9e libre")}</div></div>
        </div>
        <p>${l(x(e.descriptionText||e.body,260))}</p>
        <div class="cta-row">
          ${e.helloasso_url?`<a href="${u(e.helloasso_url)}" target="_blank" rel="noopener" class="btn btn-primary">R\xE9server ma venue <span class="arr">\u2192</span></a>`:'<a href="contact.html" class="btn btn-primary">Nous contacter <span class="arr">\u2192</span></a>'}
          <a href="contact.html" class="btn btn-ghost">Informations pratiques</a>
        </div>
      </div>
      <div class="feat-visual reveal d2">
        ${be(e,"events")}
        <div class="feat-corner"><span>${l(f(e.date).day)}<strong>${l(f(e.date).month.split(" ")[0]||"date")}</strong>${l(f(e.date).month.split(" ")[1]||"")}</span></div>
      </div>
    </div>
  `}function Ze(e){let t=f(e.date),a=e.helloasso_url?`<a href="${u(e.helloasso_url)}" target="_blank" rel="noopener" class="ev-row">`:'<article class="ev-row">',n=e.helloasso_url?"</a>":"</article>",s=e.entry?`${e.entry} \xB7 ${e.location||"Auvers-sur-Oise"}`:e.location;return`
    ${a}
      <div class="ev-date"><span class="day">${l(t.day)}</span><span class="mo">${l(t.month)}</span></div>
      <div>
        <h3>${l(e.title||"\xC9v\xE9nement")}</h3>
        <span class="ev-cat">${l(s||"\xC9v\xE9nement")}</span>
      </div>
      <p>${l(x(e.descriptionText||e.body,150))}</p>
      <div class="ev-action"><span class="arrow">${e.helloasso_url?"\u2192":"\u2022"}</span></div>
    ${n}
  `}function te(e,t){document.querySelectorAll(e).forEach(a=>{a.textContent=t})}function ne(e,t,a){document.querySelectorAll(e).forEach(n=>{n.textContent=a,n.setAttribute("href",t)})}function ae(e,t){document.querySelectorAll(e).forEach(a=>{a.setAttribute("href",t)})}function et(e){let a=(String(e||"").trim()||I.home_hero_image).replace(/"/g,'\\"');document.documentElement.style.setProperty("--home-hero-image",`url("${a}")`)}function tt(e){te("[data-site-address-line-1]",e.address_line_1),te("[data-site-address-line-2]",e.address_line_2),ne("[data-site-email]",`mailto:${e.contact_email}`,e.contact_email),ne("[data-site-phone]",He(e.contact_phone),e.contact_phone),ae("[data-site-instagram]",e.instagram_url),ae("[data-site-helloasso]",e.helloasso_url),et(e.home_hero_image),d()}async function nt(e){if(e.announcement_mode==="off")return null;if(e.announcement_mode==="custom"&&e.announcement_text)return{prefix:"Actualit\xE9",main:e.announcement_text,href:e.announcement_link||"evenements.html"};let n=(await B("evenements")).filter(s=>s.status!=="passe").sort(k)[0];return n?{prefix:"Prochain \xE9v\xE9nement",main:`${n.title} \u2014 ${H(n.date)}`,href:n.helloasso_url||"evenements.html"}:{prefix:"Lieu culturel \xB7 R\xE9sidence d'artistes",main:"Auvers-sur-Oise \xB7 30 km de Paris",href:"le-lieu.html"}}function at(e){let t=document.getElementById("site-util"),a=document.getElementById("site-util-link"),n=document.getElementById("site-util-prefix"),s=document.getElementById("site-util-main");if(!(!t||!a||!n||!s)){if(!e){t.hidden=!0;return}t.hidden=!1,n.textContent=e.prefix,s.textContent=e.main,a.setAttribute("href",e.href||"evenements.html"),/^https?:\/\//.test(e.href||"")?(a.setAttribute("target","_blank"),a.setAttribute("rel","noopener")):(a.removeAttribute("target"),a.removeAttribute("rel"))}}function st(){Q||(Q=!0,window.addEventListener("message",e=>{let t=document.getElementById("haWidget");if(!t||e.source!==t.contentWindow)return;let a=Number(e.data&&e.data.height);a>200&&(t.style.height=`${a}px`)}))}function rt(e){let t=document.getElementById("helloasso-widget");if(!t)return;let a=qe(e.helloasso_widget_url),n=Number(e.helloasso_widget_height)||780;if(!a){t.innerHTML=`
      <div class="helloasso-fallback">
        <p>Aucun widget HelloAsso n'est affich\xE9 pour le moment. Retrouvez les campagnes actives, adh\xE9sions ou soutiens directement sur la page HelloAsso de l'association.</p>
        <a href="${u(e.helloasso_url)}" target="_blank" rel="noopener" class="btn btn-primary">Ouvrir HelloAsso <span class="arr">\u2192</span></a>
      </div>
    `,d();return}t.innerHTML=`
    <iframe
      id="haWidget"
      title="HelloAsso"
      allowtransparency="true"
      scrolling="auto"
      src="${u(a)}"
      style="width:100%;height:${n}px;border:none;"
      loading="lazy"
    ></iframe>
  `,st(),d()}async function ot(){let e=document.querySelectorAll("[data-map-frame]");if(!e.length)return;let t=await O(),a=t.googleMapsEmbedUrl||"https://www.google.com/maps?q=59%20rue%20Daubigny%2C%2095430%20Auvers-sur-Oise&output=embed";e.forEach(n=>{n.setAttribute("src",a)}),document.querySelectorAll("[data-map-directions]").forEach(n=>{t.googleMapsDirectionsUrl&&n.setAttribute("href",t.googleMapsDirectionsUrl)}),d()}function b(e,t,a){let n=e.querySelector("[data-form-ok]"),s=e.querySelector("[data-form-error]");n&&(n.textContent=t==="ok"?a:"",n.classList.toggle("show",t==="ok")),s&&(s.textContent=t==="error"?a:"",s.classList.toggle("show",t==="error"))}function it(){let e=document.getElementById("ctForm");if(!e||e.dataset.bound==="true")return;e.dataset.bound="true";let t=!0;O().then(a=>{a.contactFormEnabled===!1&&(t=!1,b(e,"error","L'envoi direct est en cours d'activation sur cette version du site."))}).catch(()=>{}),e.addEventListener("submit",async a=>{a.preventDefault();let n=e.querySelector('button[type="submit"]'),s=new FormData(e),r=Object.fromEntries(s.entries());if(b(e,"",""),e.classList.remove("sent"),!t){b(e,"error","L'envoi direct n'est pas encore active sur ce deploiement.");return}n&&(n.disabled=!0,n.dataset.label=n.innerHTML,n.innerHTML="Envoi en cours\u2026");try{let o=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i.message||"Le message n'a pas pu \xEAtre envoy\xE9 pour le moment. R\xE9essaie dans un instant.");e.reset(),e.classList.add("sent"),b(e,"ok","Merci, votre message a bien \xE9t\xE9 envoy\xE9 \xE0 l'association.")}catch(o){b(e,"error",o.message||"Le message n'a pas pu \xEAtre envoy\xE9. V\xE9rifie la configuration du formulaire sur Vercel.")}finally{n&&(n.disabled=!1,n.innerHTML=n.dataset.label||"Envoyer")}})}function T(e,t,a){let n=e.querySelector("[data-checkout-ok]"),s=e.querySelector("[data-checkout-error]");n&&(n.textContent=t==="ok"?a:"",n.classList.toggle("show",t==="ok")),s&&(s.textContent=t==="error"?a:"",s.classList.toggle("show",t==="error"))}function g(e,t,a){if(e){if(e.hidden=!a,e.classList.remove("is-ok","is-error","is-pending"),!a){e.innerHTML="";return}t&&e.classList.add(`is-${t}`),e.innerHTML=`<p>${l(a)}</p>`}}function N(e,t){let a=e.querySelector('[name="amount"]'),n=e.querySelector('[name="purpose"]'),s=document.querySelector("[data-checkout-summary]"),r=Number(String(a?.value||"").replace(",",".")),o=String(n?.value||"support"),i=ue(t,o);s&&(e.querySelectorAll("[data-checkout-amount]").forEach(c=>{c.classList.toggle("on",Number(c.getAttribute("data-checkout-amount"))===r)}),s.textContent=Number.isFinite(r)&&r>0?`${i.label} \xB7 ${de(r)}`:i.label)}function lt(e,t){let a=e.querySelector("[data-checkout-amounts]"),n=e.querySelector('[name="amount"]'),s=e.querySelector('[name="purpose"]');if(!a||!n||!s)return;function r(){let o=ue(t,s.value);a.innerHTML=o.suggestedAmounts.map(i=>`
          <button type="button" class="amt" data-checkout-amount="${i}">
            ${l(de(i))}
          </button>
        `).join(""),n.readOnly=o.locked,n.value=String(o.amount),a.querySelectorAll("[data-checkout-amount]").forEach(i=>{i.addEventListener("click",()=>{n.value=i.getAttribute("data-checkout-amount")||"",n.dispatchEvent(new Event("input",{bubbles:!0}))})}),n.dispatchEvent(new Event("input",{bubbles:!0}))}s.addEventListener("change",r),r()}function se(e){let t=String(e||"").trim();return!(t.length<2||!/[aeiouyàâäéèêëîïôöùûüÿæœ]/i.test(t)||/[^a-zàâäéèêëîïôöùûüÿæœç' -]/i.test(t)||/(.)\1\1/i.test(t)||/^(test|admin|unknown|prenom|nom)$/i.test(t))}async function ct(e){let t=new URLSearchParams(window.location.search),a=t.get("checkoutIntentId"),n=t.get("code")||t.get("helloasso")||"";if(!a){n==="error"&&g(e,"error","Le paiement n'a pas abouti. Vous pouvez reessayer ou ouvrir directement HelloAsso.");return}g(e,"pending","Verification du paiement HelloAsso en cours...");try{let s=await fetch(`/api/helloasso/checkout-status?checkoutIntentId=${encodeURIComponent(a)}`,{cache:"no-store"}),r=await s.json().catch(()=>({}));if(!s.ok)throw new Error(r.message||"Impossible de verifier le paiement HelloAsso.");if(r.status==="succeeded"||r.order){let o=r.order&&r.order.id?` Reference ${r.order.id}.`:"";g(e,"ok",`Paiement confirme. Merci pour votre soutien.${o}`);return}if(n&&n!=="succeeded"){g(e,"error","Le paiement a ete interrompu ou n'a pas encore ete valide.");return}g(e,"pending","Le paiement a ete renvoye par HelloAsso mais n'est pas encore confirme. Rechargez la page dans un instant.")}catch(s){g(e,"error",s.message||"Impossible de verifier le paiement HelloAsso pour le moment.")}}async function dt(){let e=document.getElementById("haCheckoutForm");if(!e||e.dataset.bound==="true")return;e.dataset.bound="true";let t=e.querySelector('[name="amount"]'),a=e.querySelector('[name="purpose"]'),n=e.querySelector('button[type="submit"]'),s=document.getElementById("helloasso-checkout-return"),r=document.getElementById("helloasso-checkout-disabled"),o={...I},i=!1;try{let[c,m]=await Promise.all([pe(),O()]);o=c,i=!!m.helloAssoCheckoutEnabled}catch(c){console.warn("Impossible d'initialiser le checkout HelloAsso.",c)}lt(e,o),t&&(t.min=String(Number(o.helloasso_checkout_min_amount)||10),t.addEventListener("input",()=>N(e,o))),a&&a.addEventListener("change",()=>N(e,o)),N(e,o),i?r&&(r.hidden=!0):(e.classList.add("is-disabled"),n&&(n.disabled=!0),r&&(r.hidden=!1)),await ct(s),e.addEventListener("submit",async c=>{if(c.preventDefault(),T(e,"",""),!i){T(e,"error","Le checkout HelloAsso n'est pas encore active sur ce deploiement.");return}let m=Object.fromEntries(new FormData(e).entries()),_=String(m.first_name||"").trim(),E=String(m.last_name||"").trim();if(!se(_)||!se(E)||_===E){T(e,"error","HelloAsso demande un vrai pr\xE9nom et un vrai nom. \xC9vite les valeurs de test ou trop approximatives.");return}n&&(n.disabled=!0,n.dataset.label=n.innerHTML,n.innerHTML="Redirection vers HelloAsso\u2026");try{let S=await fetch("/api/helloasso/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)}),j=await S.json().catch(()=>({}));if(!S.ok||!j.redirectUrl)throw new Error(j.message||"Le paiement HelloAsso n'a pas pu etre initialise pour le moment.");window.location.href=j.redirectUrl}catch(S){T(e,"error",S.message||"Le paiement HelloAsso n'a pas pu etre initialise pour le moment."),n&&(n.disabled=!1,n.innerHTML=n.dataset.label||"Continuer")}})}function ut(e,t,a=""){let n=["past-card","reveal",a].filter(Boolean).join(" "),s=M.event[t%M.event.length];return`
    <article class="${n}">
      <div class="img ${e.image?"has-photo":""}">
        ${e.image?W(e.image,e.title||"\xC9v\xE9nement pass\xE9","event-photo"):`<div class="ph ${s}"></div>`}
      </div>
      <span class="yr">\u2014 ${l(Oe(e.date)||"Archive")}</span>
      <h4>${l(e.title||"\xC9v\xE9nement pass\xE9")}</h4>
    </article>
  `}async function mt(){let e=document.getElementById("home-featured-event");if(!e)return;let t=await B("evenements"),a=fe(t);if(!a){e.innerHTML=y("Aucun \xE9v\xE9nement \xE0 la une pour le moment."),d();return}e.innerHTML=Ke(a),Qe(a),q(e),d()}async function ft(){let e=document.getElementById("stages-grid");if(!e)return;let t=document.getElementById("stages-archives"),a=document.getElementById("stages-archives-wrap"),n=await B("stages"),s=n.filter(o=>o.status!=="passe").sort(k),r=n.filter(o=>o.status==="passe").sort(me);e.innerHTML=s.length?s.map((o,i)=>ee(o,i,i%3===1?"d2":i%3===2?"d3":"")).join(""):y("Aucun stage \xE0 venir pour le moment."),t&&a&&(r.length?(t.innerHTML=r.map((o,i)=>ee(o,i+3,i%3===1?"d2":i%3===2?"d3":"")).join(""),a.hidden=!1):a.hidden=!0),q(document),Ge(),d()}async function pt(){let e=document.getElementById("events-featured"),t=document.getElementById("events-upcoming"),a=document.getElementById("events-past");if(!e&&!t&&!a)return;let n=await B("evenements"),s=fe(n),r=n.filter(i=>i.status!=="passe"&&(!s||i.slug!==s.slug)).sort(k),o=n.filter(i=>i.status==="passe").sort(me);e&&(e.innerHTML=s?Xe(s):y("Aucun \xE9v\xE9nement \xE0 la une pour le moment.")),t&&(t.innerHTML=r.length?r.map(i=>Ze(i)).join(""):y("Aucun autre rendez-vous \xE0 venir pour le moment.")),a&&(a.innerHTML=o.length?o.map((i,c)=>ut(i,c,c%3===1?"d2":c%3===2?"d3":"")).join(""):y("Les archives d'\xE9v\xE9nements appara\xEEtront ici.")),q(document),d()}function ht(e){let t=`
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
          <div class="lang-switch" aria-label="Version du site">
            <button type="button" class="lang-btn" data-lang-switch="fr" aria-pressed="true">FR</button>
            <button type="button" class="lang-btn" data-lang-switch="en" aria-pressed="false">EN</button>
          </div>
          <a href="adherer.html" class="nav-cta" data-k="adherer">Adh\xE9rer <span class="arr">\u2192</span></a>
          <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="site-menu">
            <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true"><path d="M0 1h22M0 7h22M0 13h22" stroke="#1A1614" stroke-width="1.5"/></svg>
          </button>
        </div>
      </div>
    </header>
    <div id="google_translate_element" class="google-translate-shell" aria-hidden="true"></div>
  `,a=`
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
  `,n=document.getElementById("site-nav"),s=document.getElementById("site-foot");if(n&&(n.innerHTML=t),s&&(s.innerHTML=a),e){let r=document.querySelector(`.menu a[data-k="${e}"]`);r&&r.classList.add("active")}he(),ge(),ve(),we(),Pe(),pe().then(async r=>{tt(r),rt(r),at(await nt(r)),d()}).catch(r=>{console.warn("Impossible d'appliquer les r\xE9glages du site.",r)})}window.injectChrome=ht;window.initContactForm=it;window.initHelloAssoCheckout=dt;document.addEventListener("DOMContentLoaded",async()=>{q(document),he(),ge(),ve(),we();try{await Promise.all([mt(),ft(),pt(),ot()]),d()}catch(e){console.error(e)}});V({framework:"static-html"});J({framework:"static-html"});})();
