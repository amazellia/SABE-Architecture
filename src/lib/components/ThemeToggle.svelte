<script>
  import { onMount } from 'svelte';
  
  let theme = 'light';
  export let isHomePage = false;
  
  onMount(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme = savedTheme;
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    }
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script>

<button 
  class="btn btn-ghost btn-circle"
  on:click={toggleTheme}
  aria-label="Toggle theme"
>
  {#if theme === 'light'}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {isHomePage ? 'text-white': 'text-base-content'}" fill="none" viewBox="0 0 24 24" >
      <path stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" fill="currentColor" stroke="currentColor"/>
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 {isHomePage ? 'text-white': 'text-base-content'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" stroke="currentColor" />
    </svg>
  {/if}
</button> 