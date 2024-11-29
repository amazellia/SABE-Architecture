/** @type {import('tailwindcss').Config}*/
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts,jsx}",
    "./src/*.{html,js,svelte,ts,jsx}",
    "./src/lib/components/**/*.{svelte,ts,js,html,jsx)",
    ".src/lib/components/micro/**/*.{svelte,ts,js,html,jsx}"
  ],

  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, hsl(var(--s)) 0%, hsl(var(--sf)) 9%, hsl(var(--pf)) 42%, hsl(var(--p)) 47%, hsl(var(--a)) 100%)',
        'custom-gradient-oks': 'linear-gradient(90deg, hsl(var(--s)) 4%, color-mix(in oklch, hsl(var(--sf)), hsl(var(--pf))) 22%, hsl(var(--p)) 45%, color-mix(in oklch, hsl(var(--p)), hsl(var(--a))) 67%, hsl(var(--a)) 100.2%)'
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
  darkMode: 'class'
}