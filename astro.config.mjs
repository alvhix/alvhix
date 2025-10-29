import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://alvhix.com',
  integrations: [mdx(), sitemap(), vue()],
  vite: {
    ssr: {
      noExternal: ['@salesforce-ux/design-system'],
    },
  },
});
