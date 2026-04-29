import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["scripts/site-entry.js"],
  outfile: "assets/site.bundle.js",
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  minify: true,
  legalComments: "none"
});
