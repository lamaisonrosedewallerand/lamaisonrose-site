const DEFAULT_QUERY = "59 rue Daubigny, 95430 Auvers-sur-Oise";

function buildMapsUrls() {
  const query = encodeURIComponent(process.env.GOOGLE_MAPS_QUERY || DEFAULT_QUERY);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  const embedKey = process.env.GOOGLE_MAPS_EMBED_API_KEY;

  if (embedKey) {
    return {
      googleMapsEmbedUrl: `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
        embedKey
      )}&q=${query}`,
      googleMapsDirectionsUrl: directionsUrl
    };
  }

  return {
    googleMapsEmbedUrl: `https://www.google.com/maps?q=${query}&output=embed`,
    googleMapsDirectionsUrl: directionsUrl
  };
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  res.status(200).json({
    ...buildMapsUrls(),
    contactFormEnabled: Boolean(process.env.RESEND_API_KEY),
    helloAssoCheckoutEnabled: Boolean(
      process.env.HELLOASSO_CLIENT_ID && process.env.HELLOASSO_CLIENT_SECRET
    )
  });
}
