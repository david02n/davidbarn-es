// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://davidbarn.es',
  // Static output (default). No adapter needed for Cloudflare Pages static hosting.
  integrations: [
    sitemap({
      // Static pages served from public/ (topic landing pages that link to z2n.uk).
      // The sitemap integration only knows about Astro-built routes, so add these by hand.
      customPages: [
        'https://davidbarn.es/founder',
        'https://davidbarn.es/ai',
        'https://davidbarn.es/scale',
      ],
    }),
  ],
});
