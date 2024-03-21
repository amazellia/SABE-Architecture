<script>
    import PERICard from './PERICard.svelte';
    import { onMount } from 'svelte';
    import { useStoryblokApi } from '@storyblok/svelte';

    const storyblokApi = useStoryblokApi();
    let currentPage = 1;
    let hasMorePages = true; // Flag to check if there are more pages
    const perPage = 12; 
    let peri = [];
    let yearList = [];
    let selectYear = [];
    
    const loadPage = async () => {
        const {year} = storyblokApi.get('cdn/stories/config/', {})
        .then(response => {
            yearList = response.data.story.content.year;
            return yearList;
        }).catch(error => {
            console.log(error);
    });       

        const { data } = await storyblokApi.get('cdn/stories', {
            version: 'published',
            starts_with: 'projects/peri',
            is_startpage: false,
            sort_by: 'content.year:desc',
            per_page: perPage,
            page: currentPage,
            filter_query: {
                year: {any_in_array: selectYear}}
            });
        peri = data.stories;    

        const { length } = await storyblokApi.getAll('cdn/stories', {
            version: 'published',
            starts_with: 'peri',
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

    const handleYearSelection = (event) => {
    selectYear  = event.target.value;
        if (selectYear  == "all") {
            // If "all" is selected, add all years to the array
            selectYear = [...yearList.filter((x) => x !== "all")].toString();
        }
    currentPage = 1; // Reset to the first page when changing the filter
    };

</script>

<div class="py-24"> 
    <div class="mt-4 text-center">
        <label for="yearSelector" class="block text-gray-700">Select Year:</label>
        <select id="yearSelector" class="mt-1 p-2 border rounded" on:change={handleYearSelection}>
            {#each yearList as year}
                <option value={year}>{year}</option>
            {/each}
        </select>
        <input type="submit" value="Submit" on:click={loadPage}>
    </div>

    <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
        {#each peri as p}
            <PERICard peri={p.content} slug={p.full_slug} />
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