import preprocess from "svelte-preprocess";
import vercel from '@sveltejs/adapter-vercel';
import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from '@sveltejs/kit/vite';
 
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter (),
    alias: {
      '@storyblok/svelte': './node_modules/@storyblok/svelte',
    },
  },
 
  preprocess: [
    preprocess({
      postcss: true,
    }),
    vitePreprocess(),
  ],
};
 
export default config;