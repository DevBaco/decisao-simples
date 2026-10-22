// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://decisaosimples.palegio.com.br',
  build: { inlineStylesheets: 'always' },
  server: { port: 4321, host: true },
});
