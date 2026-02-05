import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro';
import presetUno from '@unocss/preset-uno';
// import cloudflare from "@astrojs/cloudflare";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  // output: 'server',
  // adapter: cloudflare({
  //   mode: 'advanced'
  // }),
  integrations: [
    Unocss({ presets: [presetUno()] }),
    vue()
  ],
});