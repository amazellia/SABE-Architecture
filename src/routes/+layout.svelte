<script>
    import '../app.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import MouseCursor from '$lib/components/Pointer.svelte';
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
    import { navigating } from '$app/stores';
    export let data;

    $: isHomePage = $page.url.pathname === '/';
    $: isLoading = !!$navigating;
</script>
 
<div class="min-h-screen flex flex-col">
    <MouseCursor/>
    <Header 
        header={data.header} 
        logo={data.logo}
        {isHomePage}
    />
    <main class="flex-grow {isHomePage ? '' : 'pt-[var(--header-height)]'} relative">
        {#if isLoading}
            <div  
            in:fade={{ duration: 150 }}
            out:fade={{ duration: 150 }}
            class="absolute inset-0 z-50 flex items-center justify-center">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900"></div>
            </div>
        {/if}
        {#key $page.url.pathname}
            <div 
                in:fade={{ duration: 150 }}
                out:fade={{ duration: 150 }}
            >
                <slot />
            </div>
        {/key}
    </main>
    <Footer footer={data.footer} logo={data.logo} />
</div>

<style>
    :global(main) {
        min-height: calc(100vh - var(--header-height) - var(--footer-height));
    }
    
    main {
        overflow-x: hidden;
        padding-bottom: 2rem;
    }
</style>