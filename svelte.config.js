import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '@storyblok/svelte': './node_modules/@storyblok/svelte',
    },
  },
  preprocess: [vitePreprocess()],
};
 
export default config;