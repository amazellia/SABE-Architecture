<script>
    export let currentPage;
    export let itemNo;
    export let items;
    export let hasMorePages;
    export let links = [];
    export let onPrevPage;
    export let onNextPage;
    export let theme;

    $: textColor = theme === 'dark' ? 'text-white' : 'text-gray-700';
</script>

<!-- Mobile pagination -->
<div class="flex flex-1 justify-between sm:hidden">
    <button 
        on:click={onPrevPage} 
        disabled={currentPage === 1} 
        class="hover:bg-white disabled:opacity-75 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
        Previous
    </button>
    <button 
        on:click={onNextPage} 
        disabled={!hasMorePages} 
        class="hover:bg-white disabled:opacity-75 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
        Next
    </button>
</div>

<!-- Desktop pagination -->
<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
        <p class="text-sm">
            Showing
            <span class={`font-medium ${textColor}`}>{currentPage}</span>
            to
            <span class={`font-medium ${textColor}`}>{Math.min(items.length * currentPage, itemNo)}</span> of
            <span class={`font-medium ${textColor}`}>{itemNo}</span>
            results
        </p>
    </div>
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button 
            on:click={onPrevPage} 
            disabled={currentPage === 1} 
            class="hover:bg-violet-600 disabled:opacity-75 relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
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
        
        <button 
            on:click={onNextPage} 
            disabled={!hasMorePages} 
            class="hover:bg-violet-600 disabled:opacity-75 relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
        </button>
    </nav>
</div>