<script>
    import { storyblokEditable } from '@storyblok/svelte';
    
    export let item;
    export let slug;
  
    // Function to format the date as DD MMMM YYYY

    function formatDate(dateString) {
    // Create a Date object from the string
    const date = new Date(dateString);

    // Extract the day, month, year, and hours/minutes (optional)
    const day = date.getDay(); // Sunday = 0, Saturday = 6
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = date.toLocaleString('default', { month: 'long' }); // Month name in full (e.g., April)
    const yyyy = date.getFullYear();

    // Format the date string
    return `${days[day]}, ${dd} ${mm} ${yyyy}`;
    }

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
          {#if item?.startDate}
            <div class="line-clamp-4">
              {formatDate(item.startDate)}
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