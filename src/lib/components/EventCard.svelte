 
<script>
    import { storyblokEditable } from '@storyblok/svelte';
     // Function to format the date as DD MMMM YYYY
     function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    export let event;
    export let slug;

</script>
<a
    href="/{slug}"
    use:storyblokEditable={event}
    class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"
>
    <img
        src="{event.image?.filename}/m/600x0"
        alt={event.image?.alt}
        class="w-full h-48 xl:h-72 object-cover pointer-events-none"
    />
    <div class="p-4">
        <h3 class="text-xl font-bold mb-3">
            {event.name}
        </h3>
        <div class="line-clamp-4">
            {formatDate(event.startDate)} 
        </div>
        {#each event.guests as guest}
        <a href="/{guest.full_slug}">
            {guest.name}<br>
        </a>
        {/each}
        <div>
            {#each event.stream as stream}
            <a href="/{stream.full_slug}">
                {stream.name}
            </a>
            {/each}
        </div>
        
    </div>
</a>