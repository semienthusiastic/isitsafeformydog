import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://isitsafeformydog.com', // <--- PUT YOUR DOMAIN HERE
  trailingSlash: 'always', // Guard: canonical URL form is trailing-slash; keeps generated links consistent
  integrations: [tailwind(), sitemap()],
});