<script>
    import GuestCard from './GuestCard.svelte';
    import { onMount } from 'svelte';
    import { useStoryblokApi } from '@storyblok/svelte';

    let currentPage = 1;
    let hasMorePages = true; // Flag to check if there are more pages
    const perPage = 24; 
    let guests = [];
    let selectedYear = "2023,2022,2021,2020,2019"; // Default to show all guests
    let years = ["All" , "2023", "2022", "2021", "2020", "2019"]; // Add more years as needed


    const loadPage = async () => {
        const storyblokApi = useStoryblokApi();
        const { data } = await storyblokApi.get('cdn/stories', {
            version: 'published',
            starts_with: 'guests',
            is_startpage: false,
            sort_by: 'content.year:desc',
            per_page: perPage,
            page: currentPage,
            filter_query: {
                    year: {any_in_array: selectedYear}}
            });
        guests = data.stories;

        const { length } = await storyblokApi.getAll('cdn/stories', {
            version: 'published',
            starts_with: 'guests',
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

// Function to handle year selection from the drop-down menu
const handleYearSelection = (event) => {
    selectedYear = event.target.value;
        if (selectedYear == "All") {
            selectedYear = "2022,2021,2020"
        } 
        currentPage = 1; // Reset to the first page when changing the filter
        console.log(selectedYear)
        loadPage();
    };
    
</script>
    <div class="py-24">
        
    <div class="mt-4 text-center">
        <label for="yearSelector" class="block text-gray-700">Select Year:</label>
        <select id="yearSelector" class="mt-1 p-2 border rounded" on:change={handleYearSelection}>
            {#each years as year}
                <option value={year}>{year}</option>
            {/each}
        </select>
    </div>

        <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
            {#each guests as guest}
                <GuestCard guest={guest.content} slug={guest.full_slug} />
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