 
<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';
    export let blok;
    import HeadlineColorful from './micro/HeadlineColorful.svelte';
  import Gallery from './Gallery.svelte';

    $: resolvedRichText = renderRichText(blok.description);
</script>
<div use:storyblokEditable={blok} >
    
    <div class="p-2 w-full text-center grid col-span-1">
        <h1 class="text-sm"><HeadlineColorful headline={blok.projectName}/></h1>
        <h2 class="text-xl lg:text-3xl  font-bold mt-12 mb-4 text-center">by {blok.CreatorsName}</h2>
        <a href="/{blok?.project_tutorial.full_slug}"> {blok?.project_tutorial.full_slug.name}</a>
        <a href="/{blok?.acad.full_slug}"> {blok?.acad.full_slug.name}</a>
        <hr>
    </div>
    
    <div class="grid grid-col md:grid-row md:grid-cols-2 w-dvw">
        <div class="w-full m-4">
            <img
            src="{blok.mainImage.filename}/m/1600x0"
            alt={blok.mainImage.alt}
            class="w-full h-3/4 object-contain"
            />
        </div>

        <div class="m-1">
        {#if blok.date}
            <h2 class="text-xl lg:text-2xl text-[#1d243d] font-bold mb-4">
                {blok.date}
            </h2>
        {/if}
        {#if blok.guests}
            {#each blok.guests as guest}
            <a href="/{guest.full_slug}">
                {guest.name}
            </a>
            {/each}
        {/if}
        {#if blok.tutorial}
                {blok.tutorial.name}
        {/if}
        {#if blok.acad}
                {blok.acad.name}
        {/if}
        <div class="m-3 prose">{@html resolvedRichText}</div>
        </div>
    </div>

    {#if blok?.assets}
    <Gallery blok={blok}/>
    {/if}
    
</div>