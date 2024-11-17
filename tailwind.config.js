/** @type {import('tailwindcss').Config}*/
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts,jsx}",
    "./src/*.{html,js,svelte,ts,jsx}",
    "./src/lib/components/**/*.{svelte,ts,js,html,jsx)",
    ".src/lib/components/micro/**/*.{svelte,ts,js,html,jsx}"
  ],

  theme: {
    extend: {  backgroundImage: {
      'custom-gradient': 'linear-gradient(90deg, hsl(var(--s)) 0%, hsl(var(--sf)) 9%, hsl(var(--pf)) 42%, hsl(var(--p)) 47%, hsl(var(--a)) 100%)',
      'custom-gradient-oks': 'linear-gradient(90deg, hsl(var(--s)) 4%, color-mix(in oklch, hsl(var(--sf)), hsl(var(--pf))) 22%, hsl(var(--p)) 45%, color-mix(in oklch, hsl(var(--p)), hsl(var(--a))) 67%, hsl(var(--a)) 100.2%)'
    },
    textColor: {
      'base-content': 'currentColor'
    }
  }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
      '.bg-clip-text': {
        'background-clip': 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'
      },
      '.selection:bg-blue-700/20': {
        '::selection': {
          'background-color': 'rgba(37, 99, 235, 0.2)',
          'color': 'currentColor'
        }
      }
      });
    }
  ],

  plugins: [
    require("daisyui"),
  ], 
}