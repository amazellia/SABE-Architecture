<script>
    import { storyblokEditable } from '@storyblok/svelte';
    import { goto } from '$app/navigation';
    
    export let item;
    export let slug;
  
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDay();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = date.toLocaleString('default', { month: 'long' });
        const yyyy = date.getFullYear();
        return `${days[day]}, ${dd} ${mm} ${yyyy}`;
    }

    async function handleNavigation(url, event) {
        if (event) {
            event.preventDefault();
        }
        await goto(url, {
            replaceState: true,
            invalidateAll: true,
            keepfocus: false
        });
    }
</script>
  
<a
    href="/{slug}"
    use:storyblokEditable={item}
    class="block w-full h-full bg-white dark:bg-gray-800 rounded-[5px] text-center overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
    on:click|preventDefault={(e) => handleNavigation(`/${slug}`, e)}
>
    <img
        src="{item.mainImage?.filename || item.profile?.filename || item.image?.filename}/m/600x0"
        alt={item.mainImage?.alt || item.profile?.alt || item.image?.alt}
        class="w-full h-48 xl:h-72 object-cover pointer-events-none"
    />
    <div class="p-4">
        <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
            {item.projectName || item.name}
        </h3>
        {#if item.teaser || item.CreatorsName}
            <div class="line-clamp-4 text-gray-800 dark:text-gray-200">
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
                <a 
                    href="/{guest.full_slug}"
                    class="block hover:text-violet-600 transition-colors duration-200"
                    on:click|preventDefault|stopPropagation={(e) => handleNavigation(`/${guest.full_slug}`, e)}
                >
                    {guest.name}
                </a>
            {/each}
        {/if}
        {#if item.stream}
            <div>
                {#each item.stream as stream}
                    <a 
                        href="/{stream.full_slug}"
                        class="block hover:text-violet-600 transition-colors duration-200"
                        on:click|preventDefault|stopPropagation={(e) => handleNavigation(`/${stream.full_slug}`, e)}
                    >
                        {stream.name}
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</a>