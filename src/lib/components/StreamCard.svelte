 
<script>
    import { storyblokEditable } from '@storyblok/svelte';
    export let stream;
    export let slug;
</script>
<a
    href="/{slug}"
    use:storyblokEditable={stream}
    class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"
>
    <img
        src="{stream.image?.filename}/m/600x0"
        alt={stream.image?.alt}
        class="w-full h-48 xl:h-72 object-cover pointer-events-none"
    />
    <div class="p-4">
        <h3 class="text-xl font-bold mb-3">
            {stream.name}
        </h3>
        <!-- <div class="line-clamp-4">
            {stream?.description}
        </div> -->
    </div>
</a>