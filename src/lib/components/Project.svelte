 
<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';
    export let blok;
    $: resolvedRichText = renderRichText(blok.description);
</script>
<div use:storyblokEditable={blok} class="flex justify-center">
    <img
        src="{blok.mainImage.filename}/m/1600x0"
        alt={blok.mainImage.alt}
        class="w-3/5 h-full object-cover mx-auto"
    />
    <div class="grid justify-items-center mx-auto mb-12">
        <h1 class="text-2xl lg:text-6xl  font-bold mt-12 mb-4 text-center">{blok.projectName}</h1>
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
        <div class="w-2/3 prose">{@html resolvedRichText}</div>
    </div>
</div>