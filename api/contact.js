const RECIPIENT = process.env.CONTACT_FORM_TO || "contact@lamaisonrosedewallerand.com";
const SENDER = process.env.CONTACT_FORM_FROM || "La Maison Rose <onboarding@resend.dev>";
const SUBJECT_PREFIX = process.env.CONTACT_FORM_SUBJECT_PREFIX || "[Maison Rose]";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map();

function json(res, status, payload) {
  res.status(status);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function clean(value, max = 4000) {
  return String(value || "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, max);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length) {
    return String(forwardedFor[0]).trim();
  }

  return (
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const existingBucket = rateLimitStore.get(ip);
  const recentHits = (existingBucket || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentHits.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recentHits);
    return true;
  }

  recentHits.push(now);
  rateLimitStore.set(ip, recentHits);

  if (rateLimitStore.size > 500) {
    for (const [entryIp, timestamps] of rateLimitStore.entries()) {
      const fresh = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

      if (fresh.length) {
        rateLimitStore.set(entryIp, fresh);
      } else {
        rateLimitStore.delete(entryIp);
      }
    }
  }

  return false;
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;

      if (raw.length > 20000) {
        reject(new Error("Payload too large"));
      }
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function buildEmailPayload(data) {
  const firstName = clean(data.first_name, 120);
  const lastName = clean(data.last_name, 120);
  const fullName = `${firstName} ${lastName}`.trim();
  const email = clean(data.email, 160);
  const phone = clean(data.phone, 80);
  const topic = clean(data.topic, 160) || "Message depuis le site";
  const message = clean(data.message, 5000);

  return {
    fullName,
    email,
    phone,
    topic,
    message
  };
}

function validate(data) {
  const payload = buildEmailPayload(data);

  if (!payload.fullName || !payload.email || !payload.topic || !payload.message) {
    return "Merci de remplir les champs obligatoires.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "L'adresse e-mail ne semble pas valide.";
  }

  return "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    json(res, 405, { message: "Method Not Allowed" });
    return;
  }

  try {
    const body = await readJson(req);

    if (clean(body.company, 160)) {
      json(res, 200, { ok: true });
      return;
    }

    const clientIp = getClientIp(req);

    if (isRateLimited(clientIp)) {
      json(res, 429, {
        message: "Trop de tentatives en peu de temps. Merci de réessayer dans quelques minutes."
      });
      return;
    }

    const validationMessage = validate(body);

    if (validationMessage) {
      json(res, 400, { message: validationMessage });
      return;
    }

    if (!process.env.RESEND_API_KEY) {
      json(res, 503, {
        message:
          "Le formulaire est prêt mais l'envoi d'e-mail n'est pas encore configuré dans Vercel."
      });
      return;
    }

    const payload = buildEmailPayload(body);
    const safeName = escapeHtml(payload.fullName);
    const safeEmail = escapeHtml(payload.email);
    const safePhone = escapeHtml(payload.phone || "Non renseigné");
    const safeTopic = escapeHtml(payload.topic);
    const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");
    const html = `
      <h1>Nouveau message depuis le site</h1>
      <p><strong>Nom :</strong> ${safeName}</p>
      <p><strong>E-mail :</strong> ${safeEmail}</p>
      <p><strong>Téléphone :</strong> ${safePhone}</p>
      <p><strong>Sujet :</strong> ${safeTopic}</p>
      <hr />
      <p>${safeMessage}</p>
    `;
    const text = [
      "Nouveau message depuis le site",
      "",
      `Nom : ${payload.fullName}`,
      `E-mail : ${payload.email}`,
      `Téléphone : ${payload.phone || "Non renseigné"}`,
      `Sujet : ${payload.topic}`,
      "",
      payload.message
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "lamaisonrose-site/1.0"
      },
      body: JSON.stringify({
        from: SENDER,
        to: [RECIPIENT],
        subject: `${SUBJECT_PREFIX} ${payload.topic}`,
        html,
        text,
        headers: {
          "Reply-To": payload.email
        }
      })
    });

    if (!resendResponse.ok) {
      const errorPayload = await resendResponse.json().catch(() => ({}));
      json(res, 502, {
        message:
          errorPayload.message ||
          "Le message n'a pas pu être transmis au service e-mail."
      });
      return;
    }

    json(res, 200, { ok: true });
  } catch (error) {
    json(res, 500, {
      message:
        error instanceof Error && error.message
          ? error.message
          : "Erreur interne lors de l'envoi."
    });
  }
}
