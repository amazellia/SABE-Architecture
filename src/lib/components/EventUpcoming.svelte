<script>
	import ListCard from './ListCard.svelte';
    import { onMount } from 'svelte';
    import { useStoryblokApi } from '@storyblok/svelte';
    import Subheadline from './micro/Subheadline.svelte';

    // Pagination
    let currentPage = 1;
    let hasMorePages = true; // Flag to check if there are more pages
    const perPage = 3; 

    let events = [];

    const loadPage = async () => {
        const storyblokApi = useStoryblokApi();

        // Current Date Formatting for Filtering Events 
        let d = new Date();
        let year = d.getFullYear();
        let month = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}`: (d.getMonth() + 1);
        let day = d.getDate() < 10 ? `0${d.getDate()}`: (d.getDate());
        
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

<div class="py-16 px-4 md:px-8 lg:px-16">
    <div class="justify-center flex mb-12">
        <Subheadline Subheadline={"Upcoming Events"} />
    </div>

    <div class="w-full max-w-7xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8 lg:gap-12 my-12 place-items-start">
            {#each events as event}
                <div class="w-full p-4">
                    <ListCard item={event.content} slug={event.full_slug} />
                </div>
            {/each}
        </div>

        {#if events.length === 0}
            <div class="flex justify-center py-16 text-[clamp(2rem,5vw,1rem)]">
                <p>no upcoming events</p>
            </div>
        {/if}
    </div>
</div>