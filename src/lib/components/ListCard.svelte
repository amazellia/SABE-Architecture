<script>
    import { storyblokEditable } from '@storyblok/svelte';
  
    // Function to format the date as DD MMMM YYYY
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    }
  
    export let item;
    export let slug;
  </script>
  
        <a
        href="/{slug}"
        use:storyblokEditable={item}
        class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"
      >
        <img
          src="{item.mainImage?.filename || item.profile?.filename || item.image?.filename}/m/600x0"
          alt={item.mainImage?.alt || item.profile?.alt || item.image?.alt}
          class="w-full h-48 xl:h-72 object-cover pointer-events-none"
        />
        <div class="p-4">
          <h3 class="text-xl font-bold mb-3">
            {item.projectName || item.name}
          </h3>
          {#if item.teaser || item.CreatorsName}
            <div class="line-clamp-4">
              {item.teaser || item.CreatorsName}
            </div>
          {/if}
          {#if item.startDate}
            <div class="line-clamp-4">
              {item.startDate}
            </div>
          {/if}
          {#if item.guests}
            {#each item.guests as guest}
              <a href="/{guest.full_slug}">
                {guest.name}<br>
              </a>
            {/each}
          {/if}
          {#if item.stream}
            <div>
              {#each item.stream as stream}
                <a href="/{stream.full_slug}">
                  {stream.name}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      </a>
      
  