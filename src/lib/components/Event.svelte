 
<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';
    export let blok;
    $: resolvedRichText = renderRichText(blok.description);
</script>
<div use:storyblokEditable={blok}>
    <img
        src="{blok.image.filename}/m/1600x0"
        alt={blok.image.alt}
        class="w-3/5 h-full object-contain mx-auto"
    />
    <div class="grid justify-items-center mx-auto mb-12">
        <h1 class="text-2xl lg:text-6xl  font-bold mt-12 mb-4 text-center">{blok.name}</h1>
        <h2 class="text-xl lg:text-2xl text-[#1d243d] font-bold mb-4">
            {blok.time}
        </h2>
        {#each blok.stream as stream}
        <a href="/{stream.full_slug}">
            {stream.name}
        </a>
        {/each}
            <p>{blok.startDate}</p>
            <p>{blok.endDate}</p>
            <p>{blok.location}</p>
        {#each blok.guests as guest}
        <a href="/{guest.full_slug}">
            {guest.name}
        </a>
        {/each}
        <div class="w-2/3 prose">{@html resolvedRichText}</div>
    </div>
</div>