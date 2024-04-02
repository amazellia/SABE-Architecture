 <script>
    import ListCard from "./ListCard.svelte";
    import { storyblokEditable } from '@storyblok/svelte';
    import Subheadline from './micro/Subheadline.svelte';
    export let blok;


</script>

<div use:storyblokEditable={blok} class="py-24">
    <div class="justify-center flex mx-10">
        <Subheadline Subheadline={"Featured Events"} />
    </div>
    <h2 class="text-6xl text-[#ff0085] font-bold text-center mb-12">{blok?.title}</h2>
    <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
        {#each blok.assets as i}
            <ListCard item={i.content} slug={i.full_slug} /> 
        {/each}
    </div>
</div>
