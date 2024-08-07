import { sveltekit } from "@sveltejs/kit/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { imagetools } from 'vite-imagetools';

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

/** @type {import('vite').UserConfig} */
 const config = {
  plugins: [sveltekit(), basicSsl(), imagetools()],
  server: {
    https: true,
  },
  // resolve: {
  //   alias: {
  //     "@storyblok/svelte": path.resolve(
  //       __dirname,
  //       "./node_modules/@storyblok/svelte"
  //     ),
  //   },
  // },
};

export default config;