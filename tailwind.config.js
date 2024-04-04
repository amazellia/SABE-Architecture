/** @type {import('tailwindcss').Config}*/
module.exports= {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./src/app.html",
    "./src/lib/components/**/*.{svelte,ts,js,html)",
    ".src/lib/components/micro/**/*.{svelte,ts,js,html}"
],

  theme: {
    extend: {},
  },

  plugins: [
    require("daisyui"),
  ], 
}