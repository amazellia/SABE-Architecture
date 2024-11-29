<script>
	import { PUBLIC_STORYBLOK_IS_PREVIEW } from '$env/static/public';
  import { storyblokEditable } from '@storyblok/svelte';
  import { useStoryblokApi } from '@storyblok/svelte';
  import { onMount } from 'svelte';
  import ListCard from './ListCard.svelte';
  import { goto } from '$app/navigation';
  import { invalidate } from '$app/navigation';
  import RichText from './RichText.svelte';
  import Pagination from './micro/Pagination.svelte';

  export let blok;
  export let uuid;

  
  const perPage = blok?.perPage;
  let currentPage = 1;
  let itemNo = 1;
  let hasMorePages = true; // Flag to check if there are more pages
  let items = []; // these are all the stories/content

  let totalPages;
  let links = [];
  let searchbar = "";
  let currentArray = [];
  let filterQuery = {};

  let imageError = false;

    const loadPage = async () => {
        const storyblokApi = useStoryblokApi();
        currentArray = uuid;

      if (blok.find_type?.includes("tutorials")) {
          filterQuery.tutorial_event = {in:currentArray}
      };

      if (blok.find_type?.includes("relatedEvents")) {
        filterQuery.parent_event = {in:currentArray}
      };

      if (blok.find_type?.includes("courseWorks")) {
          filterQuery.course_event = {in:currentArray}
      };

      if (blok.find_type?.includes("exhibitWorks")) {
          filterQuery.exhibit_event = {in:currentArray}
      };

      if (blok.find_type?.includes("tutors")) {
          filterQuery.project_tutor = {any_in_array: currentArray}
      }
      

      const { data } = await storyblokApi.get('cdn/stories', {
        version: PUBLIC_STORYBLOK_IS_PREVIEW,
        starts_with:  blok?.starts_with || 'events', // Use default if 'blok' is undefined
        is_startpage: false,
        sort_by:  blok?.sort_by || 'position:asc', // Use default if 'blok' is undefined
        per_page: perPage,
        page: currentPage,
        filter_query: filterQuery,
        resolve_relations: [ 
          'event.stream', 
          'event.guests', 
          'event.parent_event', 
          'project.course_event', 
          'project.tutorial_event', 
          'project.project_tutor', 
          'project.exhibit_event'], 
        search_term: searchbar,
      });
      items = data.stories;
  
  
      const { length } = await storyblokApi.getAll('cdn/stories', {
        version: 'published',
        starts_with: blok?.starts_with, // Use default if 'blok' is undefined
        filter_query: filterQuery,
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

    async function handleNavigation(event, path) {
        event.preventDefault();
        try {
            await goto(path);
            await invalidate('app:storyblok');
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = path;
        }
    }

    // Function to preload image and verify dimensions
    const preloadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                    resolve(true);
                } else {
                    reject(new Error('Invalid image dimensions'));
                }
            };
            img.onerror = () => reject(new Error('Image failed to load'));
            img.src = src;
        });
    };
</script>

<div use:storyblokEditable={blok}>
    {#if blok.mainImage?.filename}
        {#if imageError}
            <div class="w-3/5 h-64 mx-auto bg-gray-200 animate-pulse" />
        {/if}
        
        {#if !imageError}
            <img
                src="{blok.mainImage.filename}/m/1600x0"
                alt={blok.mainImage.alt}
                class="w-3/5 h-full object-contain mx-auto"
                on:load={async (e) => {
                    try {
                        await preloadImage(e.target.src);
                        imageError = false;
                    } catch (err) {
                        console.error('Image loading error:', err);
                        imageError = true;
                        e.target.style.display = 'none';
                    }
                }}
                on:error={() => {
                    imageError = true;
                }}
            />
        {/if}
    {/if}
    <div class="grid justify-items-center mx-auto mb-12">
        <h1 class="text-2xl lg:text-6xl  font-bold mt-12 mb-4 text-center">{blok.name}</h1>
        <h2 class="text-xl lg:text-2xl font-bold mb-4">
            {blok.time}
        </h2>
        {#each blok.stream as stream}
        <a 
            href="/{stream.full_slug}"
            on:click|preventDefault={(e) => handleNavigation(e, `/${stream.full_slug}`)}
        >
            {stream.name}
        </a>
        {/each}
            <p>{blok.startDate}</p>
            <p>{blok.endDate}</p>
            <p>{blok.location}</p>
        {#each blok.guests as guest}
        <a href="/{guest.full_slug}">
            {guest.name}
        </a>
        {/each}
        <RichText content={blok.description} />
    </div>

    {#if blok?.add_listing == true}
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
          <ListCard item={item.content} slug={item.full_slug} on:imageLoad={(e) => {
                        if (!e.detail.success) {
                            console.error('Failed to load image in ListCard');
                        }
                    }}/>
          </div>
        {/each}       
      </div>  
    
        <div class="py-24 justify-center">
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
    {/if}
</div>