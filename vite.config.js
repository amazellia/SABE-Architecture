import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { imagetools } from 'vite-imagetools';
 
export default defineConfig({
  plugins: [sveltekit(), basicSsl(), imagetools()],
  server: {
    https: true,
  },
});