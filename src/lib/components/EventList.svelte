    <script>
        import EventCard from './EventCard.svelte';
        import { onMount } from 'svelte';
        let currentPage = 1;
        let hasMorePages = true; // Flag to check if there are more pages
        const perPage = 12; 
        let events = [];
        const loadPage = async ( parent ) => {
            const { storyblokApi } = await parent();
            const resolveRelations = ['event.stream', 'event.guests']
            const { data } = await storyblokApi.get('cdn/stories', {
                version: 'published',
                starts_with: 'events',
                is_startpage: false,
                sort_by: 'content.startDate:desc',
                per_page: perPage,
                page: currentPage,
                resolve_relations: resolveRelations,
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
        scrollToTop();
    };

    // Function to navigate to the previous page
    const prevPage = () => {
        if (currentPage > 1) {
            currentPage -= 1;
            loadPage();
            scrollToTop();
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: '50vh', behavior: 'smooth' });
    };
        
    </script>
    <div class="py-24">
        <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
            {#each events as event}
                <EventCard event={event.content} slug={event.full_slug} />
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