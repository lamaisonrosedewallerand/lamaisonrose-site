import { helloAssoFetch, getHelloAssoContext } from "./_client.js";

function json(res, status, payload) {
  res.status(status);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function clean(value, max = 300) {
  return String(value || "").trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    json(res, 405, { message: "Method Not Allowed" });
    return;
  }

  try {
    const checkoutIntentId = clean(req.query?.checkoutIntentId || req.query?.id, 120);

    if (!checkoutIntentId) {
      json(res, 400, { message: "checkoutIntentId manquant." });
      return;
    }

    const { organizationSlug } = await getHelloAssoContext();
    const { payload } = await helloAssoFetch(
      `/organizations/${encodeURIComponent(
        organizationSlug
      )}/checkout-intents/${encodeURIComponent(checkoutIntentId)}`
    );
    const order = payload.order || null;

    json(res, 200, {
      ok: true,
      checkoutIntentId: payload.id || checkoutIntentId,
      redirectUrl: payload.redirectUrl || "",
      status: order ? "succeeded" : "pending",
      order: order
        ? {
            id: order.id || null,
            date: order.date || "",
            number: order.orderNumber || "",
            amount: order.amount || null
          }
        : null
    });
  } catch (error) {
    json(res, error.statusCode || 500, {
      message:
        error instanceof Error && error.message
          ? error.message
          : "Impossible de verifier le checkout HelloAsso."
    });
  }
}
