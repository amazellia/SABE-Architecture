<script>
    import { storyblokEditable } from '@storyblok/svelte';
    export let peri;
    export let slug;
</script>
<a
    href="/{slug}"
    use:storyblokEditable={peri}
    class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"
>
    <img
        src="{peri.mainImage?.filename}/m/600x0"
        alt={peri.mainImage?.alt}
        class="w-full h-48 xl:h-72 object-cover pointer-events-none"
    />
    <div class="p-4">
        <h3 class="text-xl font-bold mb-3">
            {peri.name}
        </h3>
        {#if peri.teaser}
        <div class="line-clamp-4">
            {peri?.teaser}
        </div>
        {/if}
    </div>
</a>