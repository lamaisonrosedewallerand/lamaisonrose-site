import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import "../assets/site.js";

inject({
  framework: "static-html"
});

injectSpeedInsights({
  framework: "static-html"
});
