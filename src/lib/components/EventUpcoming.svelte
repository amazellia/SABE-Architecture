<script>
	import ListCard from './ListCard.svelte';
    import { onMount } from 'svelte';
    import { useStoryblokApi } from '@storyblok/svelte';
    import Subheadline from './micro/Subheadline.svelte';

    // Pagination
    let currentPage = 1;
    let hasMorePages = true; // Flag to check if there are more pages
    const perPage = 3; 

    // Current Date Formatting for Filtering Events 
    let d = new Date();
    let year = d.getFullYear();
    let month = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}`: (d.getMonth() + 1);
    let day = d.getDate() < 10 ? `0${d.getDate()}`: (d.getDate());

    let events = [];

    const loadPage = async () => {
        const storyblokApi = useStoryblokApi();
        const resolveRelations = ['event.stream', 'event.guests']
        const { data } = await storyblokApi.get('cdn/stories', {
            version: 'published',
            starts_with: 'events',
            is_startpage: false,
            sort_by: 'content.startDate:asc',
            per_page: perPage,
            page: currentPage,
            resolve_relations: resolveRelations,
            filter_query: {
                startDate: { gt_date: `${year}-${month}-${day}` }
            }
        });
        events = data.stories;

        const { length } = await storyblokApi.getAll('cdn/stories', {
            version: 'published',
            starts_with: 'events',
            is_startpage: false
        });

        hasMorePages =  (length/perPage) >= currentPage

    };
    onMount(loadPage);

    // Function to navigate to the next page
    const nextPage = () => {
        currentPage += 1;
        loadPage();
    };

    // Function to navigate to the previous page
    const prevPage = () => {
        if (currentPage > 1) {
            currentPage -= 1;
            loadPage();
        }
    };
    
</script>


<div class="justify-center flex mx-10">
    <Subheadline Subheadline={"Upcoming Events"} />
</div>

<!-- {#if events == 0}
    <div class="justify-center flex mx-10 text-[clamp(2rem,5vw,1rem)]">
       <p>no upcoming events</p>
    </div>
{:else} -->
<div class="w-full"> 
    <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
        {#each events as event}
            <ListCard item={event.content} slug={event.full_slug} />
        {/each}
    </div>
    <!-- <div class="flex justify-center mt-4">
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
    </div> -->
</div>

<!-- {/if} -->