<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';
    export let blok;
    import HeadlineColorful from './micro/HeadlineColorful.svelte';
    import Gallery from './Gallery.svelte';

    $: resolvedRichText = renderRichText(blok.description);
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
        <div class="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

        <!-- Content Container -->
        <div class="relative w-full max-w-4xl mx-auto px-4 py-12">
            <!-- Content Section -->
            <div class="flex flex-col items-center space-y-8">
                <!-- Project Name -->
                <h1 class="text-sm">
                    <HeadlineColorful headline={blok.projectName}/>
                </h1>

                <!-- Creator Name -->
                <h2 class="text-xl lg:text-3xl font-bold">
                    by {blok.CreatorsName}
                </h2>

                <!-- Date -->
                {#if blok?.date}
                    <h2 class="text-xl lg:text-2xl text-[#1d243d] font-bold">
                        {blok.date}
                    </h2>
                {/if}

                <!-- Tutors -->
                {#if blok?.project_tutor}
                    <div class="flex flex-wrap justify-center gap-2">
                        {#each blok?.project_tutor as tutor}
                            <a href="/{tutor.full_slug}" 
                               class="hover:underline text-[#1d243d]"> 
                                {tutor.name}
                            </a> 
                        {/each}
                    </div>
                {/if}

                <!-- Project Details -->
                <div class="flex flex-col space-y-2 text-center">
                    {#if blok?.tutorial_event}
                        <p>Tutorial: <a href="/{blok?.tutorial_event.full_slug}" 
                                      class="hover:underline text-[#1d243d]"> 
                            {blok?.tutorial_event.name}
                        </a></p>
                    {/if}
                    
                    {#if blok?.course_event}
                        <p>Course: <a href="/{blok?.course_event.full_slug}" 
                                    class="hover:underline text-[#1d243d]"> 
                            {blok?.course_event.name}
                        </a></p>
                    {/if}
                    
                    {#if blok?.exhibit_event}
                        <p>Exhibition: <a href="/{blok?.exhibit_event.full_slug}" 
                                        class="hover:underline text-[#1d243d]">
                            {blok?.exhibit_event.name}
                        </a></p>
                    {/if}
                    
                    {#if blok?.degreeLevel}
                        <p>Degree Level: <b class="text-[#1d243d]">{blok?.degreeLevel.name}</b></p>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <div class="m-10 prose max-w-4xl mx-auto">
        <div class="rich-text-content">
            {@html resolvedRichText}
        </div>
    </div>

    {#if blok?.gallery}
        {#each blok?.gallery as gallery}
            <Gallery blok={gallery}/>
        {/each}
    {/if}
</div>

<style>
    .rich-text-content :global(p) {
        margin-bottom: 2rem !important; /* Increased spacing between paragraphs */
    }

    .rich-text-content :global(br) {
        content: "" !important;
        display: block !important;
        margin-bottom: 2rem !important; /* Increased spacing for line breaks */
    }

    /* Maintain spacing for the last element */
    .rich-text-content :global(p:last-child) {
        margin-bottom: 0 !important;
    }

    /* Optional: Add smooth scrolling to the whole page */
    :global(html) {
        scroll-behavior: smooth;
    }
</style>
