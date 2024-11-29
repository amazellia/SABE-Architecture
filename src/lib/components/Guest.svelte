<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';
    export let blok;
    export let uuid;
    
    import Gallery from './Gallery.svelte';
    import { useStoryblokApi } from '@storyblok/svelte';
    import { onMount } from 'svelte';
    import ListCard from './ListCard.svelte';
    import RichText from './RichText.svelte';
    import Pagination from './micro/Pagination.svelte';
    

    const perPage = blok?.perPage;
    let currentPage = 1;
    let itemNo = 1;
    let hasMorePages = true; // Flag to check if there are more pages
    let items = []; // these are all the stories/content
    let yearList = [];
    let selectYear = [];
    let totalPages;
    let links = [];
    let searchbar = "";
    let guestArray = [];

    const loadPage = async () => {
        const storyblokApi = useStoryblokApi();
        guestArray = uuid;
      const { year } = storyblokApi.get('cdn/stories/config/', {})
      .then(response => {
        yearList = response.data.story.content.year;
        return yearList;
      }) .catch(error => { console.log(error);  });


      const { data } = await storyblokApi.get('cdn/stories', {
        version: 'published',
        starts_with:  blok?.starts_with || 'events', 
        is_startpage: false,
        sort_by:  'content.startDate:desc', // Use default if 'blok' is undefined
        per_page: perPage,
        page: currentPage,
        filter_query: {
          year: { any_in_array: selectYear },
          guests: {any_in_array: guestArray}
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
          guests: {any_in_array: guestArray}

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

<div use:storyblokEditable={blok}>
  <!-- Image Section -->
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-7xl mx-auto">
      <!-- Main Image -->
      <div class="w-full aspect-[4/3] overflow-hidden rounded-lg">
        <img
          src="{blok.image.filename}/m/1600x0"
          alt="{blok.image.alt}"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <!-- Profile Image -->
      <div class="w-full aspect-[4/3] overflow-hidden rounded-lg">
        <img
          src="{blok.profile.filename}/m/1600x0"
          alt="{blok.profile.alt}"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  </div>

  <!-- Rest of your content -->
  <div class="flex-grow w-2/3 mx-auto mb-12">
    <h1 class="text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center text-gray-900 dark:text-gray-100">
        {blok.name}
    </h1>
    <img src={blok.filename} alt="{blok.alt}" />
    {#each blok.year as y}
        <h2 class="text-2xl mb-4 text-center text-gray-900 dark:text-gray-100">{y}</h2>
    {/each}
    <RichText content={blok.description} />
  </div>

  {#if blok?.assets}
    <Gallery blok={blok}/>
  {/if}
    <!-- Filter Component -->
    <div class=" flex md:flex-row flex-col w-10/12 container mx-auto place-items-center place-content-center ">
      <input type="search" class="m-2 p-2 border rounded w-full" placeholder="Search.." on:change={handleSearchTerm}>
      <input type="submit" value="🔎" class="p-2 border rounded hover:bg-violet-600 w-fit " on:click={loadPage}>
    </div>
    <div class="py-24 justify-center mx-2">
      {#if items.length === 0}
      <div class="text-center mx-auto text-gray-900 dark:text-gray-100">
        <b>No records found.</b></div>
      {/if}
  
      {#if !items}
      <div class="text-center mx-auto text-gray-900 dark:text-gray-100">
        <b>Loading...</b></div>
      {/if}
  
    <div class="container mx-auto grid @apply md:grid-cols-3 gap-12 ">
      {#each items as item}
        <div class:md:col-start-2={items.length === 1} class="container mx-auto my-5 place-items-center place-content-center ">
        <ListCard item={item.content} slug={item.full_slug}/>
        </div>
      {/each}       
    </div>  
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