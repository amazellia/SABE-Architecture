<script>
    import { storyblokEditable } from '@storyblok/svelte';
    import { goto } from '$app/navigation';
    import { onMount, onDestroy } from 'svelte';
    import { invalidate } from '$app/navigation';
    export let blok;
    export let uuid;
    import Gallery from './Gallery.svelte';
    import RichText from './RichText.svelte';


    // Simplified handleLinkClick function
    async function handleLinkClick(e, slug) {
        e.preventDefault();
        try {
            // First invalidate the data
            await invalidate('app:storyblok');
            await invalidate('app:storyblokApi');
            
            // Then navigate
            await goto(`/${slug}`, {
                invalidateAll: true,
                replaceState: false
            });
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = `/${slug}`;
        }
    }

    let bridge;
    let galleries = [];

    onMount(() => {
        // Any mount logic if needed
    });

    onDestroy(() => {
        // Clear any existing galleries
        galleries.forEach(gallery => {
            if (gallery) {
                gallery = null;
            }
        });
        if (bridge) {
            bridge.destroy();
        }
    });
</script>
<div 
    use:storyblokEditable={blok}
>
    <div 
        class="relative min-h-screen w-full flex items-center justify-center"
        style="background-image: url('{blok?.mainImage.filename}/m/1600x0'); 
               background-attachment: fixed;
               background-position: center;
               background-repeat: no-repeat;
               background-size: cover;"
    >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-white/80 dark:bg-white/50 backdrop-blur-sm"></div>

        <!-- Content Container -->
        <div class="relative w-full max-w-4xl mx-auto px-4 py-12">
            <!-- Content Section -->
            <div class="flex flex-col items-center space-y-8">
                <!-- Project Name -->
                <h1 class="text-4xl lg:text-5xl  font-bold  text-gray-900 dark:text-gray-100">
                    {blok.projectName}
                </h1>

                <!-- Creator Name -->
                <h2 class="text-xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    by {blok.CreatorsName}
                </h2>

                <!-- Date -->
                {#if blok?.date}
                    <h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {blok.date}
                    </h2>
                {/if}

                <!-- Tutors -->
                {#if blok?.project_tutor}
                    <div class="flex flex-wrap justify-center gap-2">
                        {#each blok?.project_tutor as tutor}
                            <a href="/{tutor.full_slug}" 
                               on:click={(e) => handleLinkClick(e, tutor.full_slug)}
                               class="hover:underline text-gray-900 dark:text-gray-100"> 
                                {tutor.name}
                            </a> 
                        {/each}
                    </div>
                {/if}

                <!-- Project Details -->
                <div class="flex flex-col space-y-2 text-center">
                    {#if blok?.tutorial_event}
                        <p class="text-gray-800 dark:text-gray-200">Tutorial: 
                            <a href="/{blok?.tutorial_event.full_slug}" 
                               class="hover:underline text-gray-900 dark:text-gray-100"> 
                                {blok?.tutorial_event.name}
                            </a>
                        </p>
                    {/if}
                    
                    {#if blok?.course_event}
                        <p class="text-gray-800 dark:text-gray-200">Course: 
                            <a href="/{blok?.course_event.full_slug}" 
                               class="hover:underline text-violet-500 dark:text-violet-500"> 
                                {blok?.course_event.name}
                            </a>
                        </p>
                    {/if}
                    
                    {#if blok?.exhibit_event}
                        <p class="text-gray-800 dark:text-gray-200">Exhibition: 
                            <a href="/{blok?.exhibit_event.full_slug}" 
                               class="hover:underline text-violet-500 dark:text-violet-500">
                                {blok?.exhibit_event.name}
                            </a>
                        </p>
                    {/if}
                    
                    {#if blok?.degreeLevel}
                        <p class="text-gray-800 dark:text-gray-200">Degree Level: {blok?.degreeLevel}
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <RichText content={blok.description} />

    {#if blok?.gallery}
        {#key uuid}
            {#each blok?.gallery as gallery}
                <Gallery 
                    blok={gallery}
                    bind:this={galleries[uuid]} 
                />
            {/each}
        {/key}
    {/if}
</div>

<style>
    /* Optional: Add smooth scrolling to the whole page */
    :global(html) {
        scroll-behavior: smooth;
    }
</style>
