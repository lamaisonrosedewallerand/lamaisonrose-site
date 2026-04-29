const RECIPIENT = process.env.CONTACT_FORM_TO || "contact@lamaisonrosedewallerand.com";
const SENDER = process.env.CONTACT_FORM_FROM || "La Maison Rose <onboarding@resend.dev>";
const SUBJECT_PREFIX = process.env.CONTACT_FORM_SUBJECT_PREFIX || "[Maison Rose]";

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
  if (data.company) {
    return "Validation impossible.";
  }

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

  if (!process.env.RESEND_API_KEY) {
    json(res, 503, {
      message:
        "Le formulaire est prêt mais l'envoi d'e-mail n'est pas encore configuré dans Vercel."
    });
    return;
  }

  try {
    const body = await readJson(req);
    const validationMessage = validate(body);

    if (validationMessage) {
      json(res, 400, { message: validationMessage });
      return;
    }

    const payload = buildEmailPayload(body);
    const html = `
      <h1>Nouveau message depuis le site</h1>
      <p><strong>Nom :</strong> ${payload.fullName}</p>
      <p><strong>E-mail :</strong> ${payload.email}</p>
      <p><strong>Téléphone :</strong> ${payload.phone || "Non renseigné"}</p>
      <p><strong>Sujet :</strong> ${payload.topic}</p>
      <hr />
      <p>${payload.message.replace(/\n/g, "<br />")}</p>
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
