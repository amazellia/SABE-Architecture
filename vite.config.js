import { sveltekit } from "@sveltejs/kit/vite";
import { imagetools } from 'vite-imagetools';
import mkcert from 'vite-plugin-mkcert'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), imagetools(), mkcert()],
  server: {
    https: true,
    proxy: {}, //needed for mkcert to work properly
  },
};

export default config