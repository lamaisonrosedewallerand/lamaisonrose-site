import { helloAssoFetch, getHelloAssoContext } from "./_client.js";

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

      if (raw.length > 30000) {
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

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(value, 200));
}

function parseAmount(value) {
  const raw = typeof value === "number" ? String(value) : clean(value, 30).replace(",", ".");
  const amount = Number(raw);
  return Number.isFinite(amount) ? amount : NaN;
}

function detectOrigin(req) {
  const proto = clean(req.headers["x-forwarded-proto"] || "https", 10);
  const host = clean(req.headers["x-forwarded-host"] || req.headers.host, 200);
  return `${proto}://${host}`;
}

function toCents(amount) {
  return Math.round(amount * 100);
}

function buildMetadata(payload) {
  return JSON.stringify({
    source: "lamaisonrose-site",
    purpose: payload.purpose,
    phone: payload.phone || "",
    note: payload.message || "",
    submittedAt: new Date().toISOString()
  }).slice(0, 20000);
}

function buildPayload(body, settings, origin) {
  if (body.company) {
    throw new Error("Validation impossible.");
  }

  const purpose = clean(body.purpose, 40) === "membership" ? "membership" : "support";
  const firstName = clean(body.first_name, 120);
  const lastName = clean(body.last_name, 120);
  const email = clean(body.email, 180);
  const phone = clean(body.phone, 80);
  const message = clean(body.message, 1200);
  const amount = parseAmount(body.amount);
  const minAmount = Math.max(Number(settings.helloasso_checkout_min_amount) || 10, 1);
  const maxAmount = 10000;

  if (!firstName || !lastName || !email || Number.isNaN(amount)) {
    throw new Error("Merci de remplir les champs obligatoires du paiement.");
  }

  if (!isEmail(email)) {
    throw new Error("L'adresse e-mail ne semble pas valide.");
  }

  if (amount < minAmount || amount > maxAmount) {
    throw new Error(
      `Merci de choisir un montant compris entre ${minAmount} € et ${maxAmount} €.`
    );
  }

  const itemName =
    purpose === "membership"
      ? clean(
          settings.helloasso_checkout_membership_item_name ||
            "Adhesion a La Maison Rose de Wallerand",
          250
        )
      : clean(
          settings.helloasso_checkout_support_item_name ||
            "Soutien a La Maison Rose de Wallerand",
          250
        );

  const amountInCents = toCents(amount);
  const pageUrl = `${origin}/adherer.html`;

  return {
    purpose,
    amount,
    checkoutIntent: {
      totalAmount: amountInCents,
      initialAmount: amountInCents,
      itemName,
      backUrl: pageUrl,
      errorUrl: `${pageUrl}?helloasso=error`,
      returnUrl: pageUrl,
      containsDonation: purpose !== "membership",
      payer: {
        firstName,
        lastName,
        email
      },
      metadata: buildMetadata({
        purpose,
        phone,
        message
      })
    }
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    json(res, 405, { message: "Method Not Allowed" });
    return;
  }

  try {
    const body = await readJson(req);
    const origin = detectOrigin(req);
    const { settings, organizationSlug } = await getHelloAssoContext();
    const { purpose, amount, checkoutIntent } = buildPayload(body, settings, origin);
    const { payload } = await helloAssoFetch(
      `/organizations/${encodeURIComponent(organizationSlug)}/checkout-intents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(checkoutIntent)
      }
    );

    if (!payload.redirectUrl) {
      throw new Error("HelloAsso n'a pas renvoye d'URL de redirection.");
    }

    json(res, 200, {
      ok: true,
      purpose,
      amount,
      checkoutIntentId: payload.id || payload.checkoutIntentId || null,
      redirectUrl: payload.redirectUrl
    });
  } catch (error) {
    json(res, error.statusCode || 500, {
      message:
        error instanceof Error && error.message
          ? error.message
          : "Impossible d'initialiser le paiement HelloAsso."
    });
  }
}
