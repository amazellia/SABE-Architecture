/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts,jsx}",
    "./src/*.{html,js,svelte,ts,jsx}",
    "./src/lib/components/**/*.{svelte,ts,js,html,jsx)",
    ".src/lib/components/micro/**/*.{svelte,ts,js,html,jsx}"
],

  theme: {
    extend: {},
  },

  plugins: [
    require("daisyui"),
  ], 
}

module.exports = config;