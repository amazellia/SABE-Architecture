 
<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';
    export let data;
    $: resolvedRichText = renderRichText(data.description);
</script>
<div use:storyblokEditable={data}>
    <img
        src="{data.image.filename}/m/1600x0"
        alt={data.image.alt}
        class="w-full h-[360px] lg:h-[450px] object-cover"
    />
    <div class="grid justify-items-center mx-auto mb-12">
        <h1 class="text-2xl lg:text-6xl  font-bold mt-12 mb-4 text-center">{data.name}</h1>
        <h2 class="text-xl lg:text-2xl text-[#1d243d] font-bold mb-4">
            {data.time}
        </h2>
        {#each data.stream as stream}
        <a href="/{stream.full_slug}">
            {stream.name}
        </a>
        {/each}
            <p>{data.startDate}</p>
            <p>{data.endDate}</p>
            <p>{data.location}</p>
        {#each data.guests as guest}
        <a href="/{guest.full_slug}">
            {guest.name}
        </a>
        {/each}
        <div class="w-2/3 prose">{@html resolvedRichText}</div>
    </div>
</div>