<script>
    import StreamCard from './StreamCard.svelte';
    import { onMount } from 'svelte';

    let currentPage = 1;
    const perPage = 24; 
    let streams = [];


    const loadPage = async ( parent ) => {
        const { storyblokApi } = await parent();
        const { data } = await storyblokApi.get('cdn/stories', {
            version: 'published',
            starts_with: 'streams',
            is_startpage: false,
            per_page: perPage,
            page: currentPage
        });
        streams = data.stories;
    };
    onMount(loadPage);
</script>

    <div class="py-24">
        <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
            {#each streams as stream}
                <StreamCard stream={stream.content} slug={stream.full_slug} />
            {/each}
        </div>
    </div>