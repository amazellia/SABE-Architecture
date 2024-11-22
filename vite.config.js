import { sveltekit } from "@sveltejs/kit/vite";
import { imagetools } from 'vite-imagetools';
import mkcert from 'vite-plugin-mkcert'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), imagetools(), mkcert()],
  ssr: {
    noExternal: ['three', '@splinetool/loader', '@splinetool/viewer']
},
optimizeDeps: {
    include: ['three', '@splinetool/loader', '@splinetool/viewer']
},
  server: {
    https: true,
    proxy: {}, //needed for mkcert to work properly
  },
};

export default config