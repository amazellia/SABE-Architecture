<script>
    import { storyblokEditable } from '@storyblok/svelte';
    export let peri;
    export let slug;
    export let pageLength;
</script>
<div class= "col-span-full={pageLength === 1}" >

</div>
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
            {peri.projectName}
        </h3>
        {#if peri.CreatorsName}
        <div class="line-clamp-4">
            {peri?.CreatorsName}
        </div>
        {/if}
    </div>
</a>