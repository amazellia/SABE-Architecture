<script>
    import RichText from './RichText.svelte';
    import { storyblokEditable } from '@storyblok/svelte';
    import { useStoryblokApi } from '@storyblok/svelte';
    import { onMount } from 'svelte';
    import ListCard from './ListCard.svelte';
  import Pagination from './micro/Pagination.svelte';
    

    export let blok;
    export let uuid
    
    const perPage = blok?.perPage;
    let currentPage = 1;
    let itemNo = 1;
    let hasMorePages = true; // Flag to check if there are more pages
    let items = []; // these are all the stories/content
    let yearList = [];
    let selectYear = [];
    let afterDate = [];
    let beforeDate = [];
    let totalPages;
    let links = [];
    let searchbar = "";
    let streamArray = [];

    const loadPage = async () => {
        const storyblokApi = useStoryblokApi();
        streamArray = uuid;
      const { year } = storyblokApi.get('cdn/stories/config/', {})
      .then(response => {
        yearList = response.data.story.content.year;
        return yearList;
      }) .catch(error => { console.log(error);  });


      const { data } = await storyblokApi.get('cdn/stories', {
        version: 'published',
        starts_with:  'events', // Use default if 'blok' is undefined
        is_startpage: false,
        //sort_by:  'content.startDate:desc', // Use default if 'blok' is undefined
        per_page: perPage,
        page: currentPage,
        filter_query: {
          year: { any_in_array: selectYear },
          stream: {any_in_array: streamArray}
        },
        resolve_relations: [ 'event.stream', 'event.guests'], 
        search_term: searchbar,
      });
      items = data.stories;
  
  
      const { length } = await storyblokApi.getAll('cdn/stories', {
        version: 'published',
        starts_with:  'events', // Use default if 'blok' is undefined
        filter_query: {
          year: { any_in_array: selectYear },          
          stream: {any_in_array: streamArray}

        },
        search_term: searchbar,
      });

      itemNo = length
      hasMorePages = (length / perPage) >= currentPage;
      totalPages = Math.ceil(itemNo / items.length); // Calculate total pages

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
    if (blok.starts_with == "events") {
      afterDate = event.target.value == "" ? [] : `${event.target.value}-01-01`;
      beforeDate = event.target.value == "" ? [] : `${event.target.value}-12-31`;
    } else {
      selectYear  = event.target.value == "" ? [] : event.target.value;
    }
      currentPage = 1; // Reset to the first page when changing the filter
    };

    const handleSearchTerm = (event) => {
      searchbar = event.target.value;
      currentPage = 1
    }

  </script>


<div use:storyblokEditable={blok} class="justify-center">
    <div class="grid justify-items-center mx-auto mb-12">
        <h1 class="text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center">{blok.name}</h1>
        <RichText content={blok.description} />
    </div>

    <!-- Filter Component -->
    <div class="py-24 justify-center mx-2">
        <div class="flex md:flex-row flex-col w-10/12 container mx-auto place-items-center place-content-center">
            <select id="yearSelector" class="m-2 p-2 border rounded w-full" on:change={handleYearSelection}>
                <option value="">Year</option>
                {#each yearList as year}
                    <option value={year}>{year}</option>
                {/each}
            </select>
            
            <input type="search" class="m-2 p-2 border rounded w-full" placeholder="Search.." on:change={handleSearchTerm}>
            <input type="submit" value="🔎" class="p-2 border rounded hover:bg-violet-600 w-fit" on:click={loadPage}>
        </div>
        
        <div class="container mx-auto px-4 py-12">
            {#if items.length === 0}
                <div class="text-center">
                    <b>No records found.</b>
                </div>
            {/if}

            {#if !items}
                <div class="text-center">
                    <b>Loading...</b>
                </div>
            {/if}

            <!-- Grid Container -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each items as item}
                    <div class="flex flex-col h-full {items.length === 1 ? 'md:col-start-2 lg:col-start-2' : ''}">
                        <div class="overflow-hidden h-full flex flex-col">
                            <!-- Text Content -->
                            <div class="p-6 flex flex-col flex-grow">
                                <ListCard item={item.content} slug={item.full_slug}/>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Pagination -->
        <div class="py-24 justify-center">
            <div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                <Pagination
                    {currentPage}
                    {itemNo}
                    {items}
                    {hasMorePages}
                    {links}
                    onPrevPage={prevPage}
                    onNextPage={nextPage}
                />
            </div>
        </div>
    </div>
</div>
