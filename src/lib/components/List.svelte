<script>
    import { onMount } from 'svelte';
    import { useStoryblokApi } from '@storyblok/svelte';
    import ListCard from './ListCard.svelte';
    import HeadlineColorful from './micro/HeadlineColorful.svelte';

    export let blok;
  
    const storyblokApi = useStoryblokApi();
    let currentPage = 1;
    let itemNo = 1;
    let hasMorePages = true; // Flag to check if there are more pages
    const perPage = blok?.perPage;
    let items = []; // Use a generic name for items
    let yearList = [];
    let selectYear = [];
    let ifYear = blok?.addYear || false; // Handle potential undefined 'blok'
  
    const loadPage = async () => {
      const { year } = storyblokApi.get('cdn/stories/config/', {})
        .then(response => {
          yearList = response.data.story.content.year;
          return yearList;
        })
        .catch(error => {
          console.log(error);
        });

    
        const resolveRelations = ['event.stream', 'event.guests']
      const { data } = await storyblokApi.get('cdn/stories', {
        version: 'published',
        starts_with: blok?.starts_with || 'events', // Use default if 'blok' is undefined
        with_tag: blok?.tags || '', // Handle potential undefined 'blok',
        is_startpage: false,
        sort_by: blok?.sort_by || 'content.startDate:desc', // Use default if 'blok' is undefined
        per_page: perPage,
        page: currentPage,
        filter_query: {
          year: { any_in_array: selectYear }
        },
        resolve_relations: resolveRelations,
      });
      items = data.stories;
  
      const { length } = await storyblokApi.getAll('cdn/stories', {
        version: 'published',
        starts_with: blok?.starts_with || 'events', // Use default if 'blok' is undefined
        with_tag: blok?.tags || '', // Handle potential undefined 'blok',
        is_startpage: false,
        per_page: perPage,
      });
      itemNo= length
      hasMorePages = (length / perPage) >= currentPage;
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
      selectYear = event.target.value;
      if (selectYear == "all") {
        // If "all" is selected, add all years to the array
        selectYear = [...yearList.filter((x) => x !== "all")].toString();
      }
      currentPage = 1; // Reset to the first page when changing the filter
    };
  </script>
  
  <div class="py-24 justify-center">
    <div class="text-center mx-0.5">
    <HeadlineColorful headline={blok?.listName}/>
    </div>
    {#if ifYear}
      <div class="mt-4 text-center">
        <label for="yearSelector" class="block text-gray-700">Select Year:</label>
        <select id="yearSelector" class="mt-1 p-2 border rounded" on:change={handleYearSelection}>
          {#each yearList as year}
            <option value={year}>{year}</option>
          {/each}
        </select>
        <input type="submit" value="Submit" on:click={loadPage}>
      </div>
    {/if}

    <div class="container mx-auto grid @apply md:grid-cols-3 gap-12 my-12 place-items-center place-content-center ">
        {#each items as item}
            <div class:col-span-full={itemNo === 1}>
            <ListCard item={item.content} slug={item.full_slug}/>
            </div>
        {/each}
        
    </div>
    {#if ifYear}
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

        <!-- <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div class="flex flex-1 justify-between sm:hidden">
              <button on:click={prevPage} disabled={currentPage === 1} class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
              <button on:click={nextPage} disabled={!hasMorePages} class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{currentPage}</span>
                  to
                  <span class="font-medium">{items.length*currentPage}</span>
                  of
                  <span class="font-medium">{itemNo}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button on:click={prevPage} disabled={currentPage === 1} class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                </button>
                  Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  <a href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                  <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                  <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                  <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                  <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                  <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                  <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                  <button on:click={nextPage} disabled={!hasMorePages} class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </button>
                </nav>
              </div>
            </div>
          </div> -->
          
    </div>
    {/if}
    </div>