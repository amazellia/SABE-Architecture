 <script>
    import ListCard from "./ListCard.svelte";
    import { onMount } from 'svelte';
    import { storyblokEditable } from '@storyblok/svelte';
    import Subheadline from './micro/Subheadline.svelte';
    export let blok;

</script>

<div  use:storyblokEditable={blok} class="py-24">
    <div class="justify-center flex mx-10">
        <Subheadline Subheadline={"Featured Events"} />
    </div>
    <h2 class="text-6xl text-[#ff0085] font-bold text-center mb-12">{blok?.title}</h2>
    <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
        {#each blok.assets as i}
            <ListCard item={i.content} slug={i.full_slug} /> 
        {/each}
    </div>
    
    <div class="flex justify-center mt-4">
        <button 
            class="mr-2" 
            on:click={prevPage} 
            disabled={currentPage === 1}
        >
            Previous
        </button>
        <div class="flex">
            {#if currentPage > 2}
                <button 
                    class="mr-2 hidden md:block"
                    on:click={prevPage}
                >
                    {currentPage - 2}
                </button>
            {/if}
            {#if currentPage > 1}
                <button 
                    class="mr-2 hidden md:block"
                    on:click={prevPage}
                >
                    {currentPage - 1}
                </button>
            {/if}
            <button>
                {currentPage}
            </button>
            {#if hasMorePages}
                <button 
                    class="ml-2 hidden md:block"
                    on:click={nextPage}
                >
                    {currentPage + 1}
                </button>
            {/if}
        </div>
        <button 
            class="ml-2" 
            on:click={nextPage}
            disabled={!hasMorePages}
        >
            Next
        </button>
    </div>
</div>
