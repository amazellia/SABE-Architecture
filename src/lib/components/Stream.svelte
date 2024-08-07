 
<script>
  import { storyblokEditable, renderRichText } from '@storyblok/svelte';
  import { useStoryblokApi } from '@storyblok/svelte';
  import { onMount } from 'svelte';
  import ListCard from './ListCard.svelte';

  export let blok;
  export let uuid
  
  $: resolvedRichText = renderRichText(blok.description);
  
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
    <div class="grid justify-items-center mx-auto mb-12 ">
        <h1 class="text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center">{blok.name}</h1>
        <!-- <h2 class="text-xl lg:text-2xl text-[#1d243d] font-bold mb-4">
            {blok.subtitle}
        </h2> -->
        <div class="w-2/3 prose">{@html resolvedRichText}</div>
    </div>

    <!-- Filter Component -->
    <div class="py-24 justify-center mx-2">
    <div class=" flex md:flex-row flex-col w-10/12 container mx-auto place-items-center place-content-center ">
      <select id="yearSelector" class="m-2 p-2 border rounded w-full " on:change={handleYearSelection} >
        <option value="">Year</option>
        {#each yearList as year}
          <option value={year}>{year}</option>
        {/each}
      </select>
      
        <input type="search" class="m-2 p-2 border rounded w-full" placeholder="Search.." on:change={handleSearchTerm}>

    <input type="submit" value="🔎" class="p-2 border rounded hover:bg-violet-600 w-fit " on:click={loadPage}>
    </div>
    
    {#if items.length === 0}
    <div class="text-center mx-auto">
      <b>No records found.</b></div>
    {/if}

    {#if !items}
    <div class="text-center mx-auto">
      <b>Loading...</b></div>
    {/if}

  <div class="container mx-auto grid @apply md:grid-cols-3 gap-12 ">
    {#each items as item}
      <div class:md:col-start-2={items.length === 1} class="container mx-auto my-5 place-items-center place-content-center ">
      <ListCard item={item.content} slug={item.full_slug}/>
      </div>
    {/each}       
  </div>  

    <div class="py-24 justify-center">
    <div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <button on:click={prevPage} disabled={currentPage === 1} class="hover:bg-white disabled:opacity-75 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
        <button on:click={nextPage} disabled={!hasMorePages} class="hover:bg-white disabled:opacity-75 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{currentPage}</span>
          to
          <span class="font-medium">{Math.min(items.length*currentPage, itemNo)}</span> of
          <span class="font-medium">{itemNo}</span>
          results
        </p>
      </div>
    <div>
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button on:click={prevPage} disabled={currentPage === 1} class="hover:bg-violet-600 disabled:opacity-75 relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>
        {#each links as link}
          <svelte:component this={link.element} {...link.props}>
            {link.text}
          </svelte:component>
        {/each}
        <button on:click={nextPage} disabled={!hasMorePages} class="hover:bg-violet-600 disabled:opacity-75 relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
      </button>
      </nav>
    </div>
  </div>
</div>

  </div>
  </div>
</div>
