 
<script>
    import { storyblokEditable } from '@storyblok/svelte';
    export let guest;
    export let slug;
</script>
<a
    href="/{slug}"
    use:storyblokEditable={guest}
    class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"
>
    <img
        src="{guest.profile?.filename}/m/600x0"
        alt={guest.profile?.alt}
        class="w-full h-48 xl:h-72 object-cover pointer-events-none"
    />
    <div class="p-4">
        <h3 class="text-xl font-bold mb-3">
            {guest.name}
        </h3>
        {#if guest.teaser}
        <div class="line-clamp-4">
            {guest?.teaser}
        </div>
        {/if}
    </div>
</a>