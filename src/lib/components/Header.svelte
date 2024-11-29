<script>
	export let header;
    export let isHomePage = false;
    import { onMount } from 'svelte';
    import { goto, invalidate } from '$app/navigation';
    import ThemeToggle from './ThemeToggle.svelte';
    
    let navIsOpen = false;
    let isScrolled = false;
    let lastScrollY = 0;
    let headerVisible = true;

    onMount(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            isScrolled = currentScrollY > 0;
            
            if (!isHomePage) {
                if (currentScrollY > lastScrollY) {
                    if (currentScrollY > 100) {
                        headerVisible = false;
                    }
                } else {
                    headerVisible = true;
                }
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    async function handleNavigation(url) {
        closeNav();
        try {
            await goto(url);
            await invalidate('app:storyblok'); // Force Storyblok data refresh
            await invalidate(); // Invalidate all data
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = url;
        }
    }

    function toggleNav() {
        navIsOpen = !navIsOpen;
        if (navIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    function closeNav() {
        navIsOpen = false;
        document.body.style.overflow = 'auto';
    }
</script>

<header 
    class="w-full z-50 transition-all duration-300 ease-in-out absolute bg-base-100 text-base-content
    {isHomePage ? 'absolute' : 'fixed'}
    {isScrolled ? 'bg-base-200/70 backdrop-blur-sm shadow-sm' : 'bg-transparent'} 
    {!isHomePage && !headerVisible ? '-translate-y-full' : 'translate-y-0'}"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">
            <!-- Logo as Home Icon -->
            <div class="flex-shrink-0">
                <a 
                    href="/" 
                    on:click|preventDefault={() => handleNavigation('/')}
                    class="flex items-center"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-8 w-8 {isHomePage ? 'text-white' : 'text-base-content'}" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v12a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                </a>
            </div>

            <!-- Desktop Navigation -->
            {#if header}
                <nav class="hidden lg:flex space-x-8">
                    {#each header as blok}
                        <a 
                            href="/{blok.link.story.url}" 
                            on:click|preventDefault={(e) => handleNavigation(`/${blok.link.story.url}`)}
                            class="font-black hover:text-violet-600 px-3 py-2 text-sm font-medium transition-colors duration-200 {isHomePage ? 'text-white' : 'text-base-content'}"
                        >
                            {blok.name}
                        </a>
                    {/each}
                </nav>
            {/if}

            <!-- Add theme toggle before the mobile menu button -->
            <div class="flex items-center gap-4">
                <ThemeToggle isHomePage={isHomePage} />
                <button 
                    class="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-base-200 transition-colors duration-20"
                    on:click={toggleNav}
                    aria-expanded={navIsOpen}
                >
                    <span class="sr-only">Open main menu</span>
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        {#if !navIsOpen}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        {:else}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        {/if}
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Navigation -->
    {#if navIsOpen}
        <div 
            class="lg:hidden fixed inset-0 w-full h-screen bg-white z-40"
            style="top: {window?.innerWidth < 768 ? '64px' : '80px'};"
        >
            <nav class="h-full overflow-y-auto">
                <div class="flex flex-col space-y-2 pt-4">
                    {#each header as blok}
                        <a 
                            href="/{blok.link.story.url}"
                            on:click|preventDefault={(e) => handleNavigation(`/${blok.link.story.url}`)}
                            class="text-gray-900 hover:text-violet-600 px-6 py-6 text-2xl font-medium text-left border-b border-gray-100 transition-colors duration-200 bg-white"
                        >
                            {blok.name}
                        </a>
                    {/each}
                </div>
            </nav>
        </div>
    {/if}
</header>

<style>
    :global(:root) {
        --header-height: 4rem; /* 64px for mobile */
    }
    @media (min-width: 768px) {
        :global(:root) {
            --header-height: 5rem; /* 80px for desktop */
        }
    }

    /* Smooth transitions */
    .transition-all {
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
    }

    /* Prevent scrolling when mobile menu is open */
    :global(body.menu-open) {
        overflow: hidden;
        position: fixed;
        width: 100%;
    }
</style>