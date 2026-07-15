import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

// Sanity's own dev/build tooling (the standalone `sanity dev` / `sanity deploy`
// CLI, used by the `sanity:dev` / `sanity:deploy` npm scripts) only inlines
// environment variables prefixed with `SANITY_STUDIO_` into the Studio
// bundle — it does not read `NEXT_PUBLIC_*` vars, since those are a Next.js
// convention inlined by Next's own bundler, not Sanity's Vite config. We
// fall back to the NEXT_PUBLIC_ versions only for local convenience if
// someone forgets to set the SANITY_STUDIO_ ones, but the SANITY_STUDIO_
// variables are the ones that actually make it into the Studio at runtime.
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

export default defineConfig({
  name: "ifood-logistics",
  title: "iFood Logistics CMS",
  projectId: "b5hp46e1",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
