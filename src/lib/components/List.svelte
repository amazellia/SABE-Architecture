<script>
	import { PUBLIC_STORYBLOK_IS_PREVIEW } from '$env/static/public';
    import { onMount } from 'svelte';
    import ListCard from './ListCard.svelte';
    import HeadlineColorful from './micro/HeadlineColorful.svelte';
    import { useStoryblokApi } from '@storyblok/svelte';

    export let blok;
  
    const perPage = blok?.perPage;
    let currentPage = 1;
    let itemNo = 1;
    let hasMorePages = true; // Flag to check if there are more pages
    let items = []; // these are all the stories/content
    let yearList = [];
    let selectYear = [];
    let afterDate = [];
    let beforeDate = [];
    let ifFilter = blok?.addFilter || false; // Handle potential undefined 'blok'
    let totalPages;
    let links = [];
    let searchbar = "";
    let tagsList = "";
    let selectTag = "";
    let filterQuery = {
        year: { any_in_array: selectYear },
        startDate: {gt_date: afterDate, lt_date: beforeDate},
      };

    const loadPage = async () => {
      // Construct the filter_query object dynamically
      const storyblokApi = useStoryblokApi();
      

      if (blok.find_type?.includes("is_periGuest")) {
        filterQuery.is_periGuest = {is: true};
        filterQuery.is_currentSpeaker = {is: true};
      }

      if (blok.find_type?.includes("is_currentSpeaker")) {
        filterQuery.is_currentSpeaker = {is: true};
      }

      if (blok.find_type?.includes("is_currentSpeaker") && blok.find_type?.includes("is_periGuest")) {
        filterQuery.is_periGuest = {is: true};
        filterQuery.is_currentSpeaker = {is: true};
      }

      if (!blok.find_type?.includes("is_currentSpeaker") && blok.find_type?.includes("is_periGuest")) {
        filterQuery.is_periGuest = {is: true};
        filterQuery.is_currentSpeaker = {is: false};
      }

      if (blok.find_type?.includes("tutorials")) {
          filterQuery.tutorial_event = {is: 'not_empty'}
      };

      if (blok.find_type?.includes("relatedEvents")) {
        filterQuery.parent_event = {is: 'not_empty'}
      };

      if (blok.find_type?.includes("courseWorks")) {
          filterQuery.course_event = {is: 'not_empty'}
      };

      if (blok.find_type?.includes("exhibitWorks") ) {
          filterQuery.exhibit_event = {is: 'not_empty'}
      };

      if (blok.find_type?.includes("tutors")) {
          filterQuery.project_tutor = {is: 'not_empty_array'}
      }

      if (blok.find_type?.includes("undergrad")) {
          filterQuery.degreeLevel = {in: "undergrad"}
      }

      if (blok.find_type?.includes("postgrad") ) {
          filterQuery.degreeLevel = {in: "postgrad"}
      }

      if (blok.find_type?.includes("phd") ) {
          filterQuery.degreeLevel = {in: "phd"}
      }

      const { year } = storyblokApi.get('cdn/stories/config/', {})
      .then(response => {
        yearList = response.data.story.content.year;
        return yearList;
      }) .catch(error => { console.log(error);  });

      const { tags } = await storyblokApi.getAll('cdn/tags', {})
      .then(response => {
        tagsList = response;
        return tagsList;
      }).catch(error => {console.log(error); });

      const { data } = await storyblokApi.get('cdn/stories', {
        version: PUBLIC_STORYBLOK_IS_PREVIEW,
        starts_with: blok?.starts_with || 'events', // Use default if 'blok' is undefined
        with_tag: blok?.tags || selectTag, // Handle potential undefined 'blok',
        is_startpage: false,
        sort_by: blok?.sort_by || 'position:asc', // Use default if 'blok' is undefined
        per_page: perPage,
        excluding_slugs: blok?.excluding_slugs || '',
        page: currentPage,
        filter_query: filterQuery,
        resolve_relations:[
          'event.stream', 
          'event.guests', 
          'event.parent_event', 
          'project.course_event', 
          'project.tutorial_event', 
          'project.project_tutor', 
          'project.exhibit_event'
        ], 
        search_term: searchbar,
      });
      items = data.stories;
      //console.log(items)
  
      const { length } = await storyblokApi.getAll('cdn/stories', {
        version: 'published',
        starts_with: blok?.starts_with || 'events', // Use default if 'blok' is undefined
        with_tag: blok?.tags || selectTag, // Handle potential undefined 'blok',
        excluding_slugs: blok?.excluding_slugs || '',
        filter_query: {
          year: { any_in_array: selectYear },
          startDate: { gt_date:afterDate, lt_date: beforeDate},
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

    const handleTagsList = (event) => {
      selectTag = event.target.value;
      currentPage = 1
    }
    
  </script>

  <div class="py-24 justify-center mx-2">
    <div class="text-center mx-0.5">
    <HeadlineColorful headline={blok?.listName}/>
    </div>
    {#if ifFilter}
    <div class=" flex md:flex-row flex-col w-10/12 container mx-auto place-items-center place-content-center ">
      <select id="yearSelector" class="m-2 p-2 border rounded w-full " on:change={handleYearSelection} >
        <option value="">Year</option>
        {#each yearList as year}
          <option value={year}>{year}</option>
        {/each}
      </select>

        <select id="tagSelector" class="m-2 p-2 border rounded w-full" on:change={handleTagsList}>
          <option value="">Tag</option>
          {#each tagsList as tag}
          <option value={tag.name}>{tag.name}</option>
        {/each}
        </select>
      
        <input type="search" class="m-2 p-2 border rounded w-full" placeholder="Search.." on:change={handleSearchTerm}>

    <input type="submit" value="🔎" class="p-2 border rounded hover:bg-violet-600 w-fit " on:click={loadPage}>
    </div>
    {/if}
    
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
              <!-- Item Card Content -->
              <div class="p-6 flex flex-col flex-grow">
                <ListCard item={item.content} slug={item.full_slug}/>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    {#if ifFilter}
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
  {/if}
</div>