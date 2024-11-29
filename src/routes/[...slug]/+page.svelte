<script>
	import { onMount, onDestroy } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
    import { fade } from 'svelte/transition';
    import { beforeNavigate, afterNavigate } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;
    let bridge;
    let mounted = false;

    beforeNavigate(() => {
        if (bridge) {
            bridge.destroy();
        }
    });

    afterNavigate(() => {
        // Reset scroll position and reload data if needed
        window.scrollTo(0, 0);
    });

	onMount(() => {
        mounted = true;
		if (data.story) {    
			const resolveRelations = [
				'event.stream', 
				'event.guests', 
				'guests.year',  
				'event.parent_event', 
				'project.course_event', 
				'project.tutorial_event', 
				'project.project_tutor', 
				'project.exhibit_event',
				'project.degreeLevel',
			];
			bridge = useStoryblokBridge(data.story.id, (newStory) => {
                data.story = newStory;
            }, {
	 			resolveRelations: resolveRelations
			});
		}
	});

    onDestroy(() => {
        if (bridge) {
            bridge.destroy();
        }
        mounted = false;
    });
</script>

<svelte:head>
	<title>{data.story?.name || 'Loading...'}</title>
</svelte:head>

<div 
    class="min-h-[calc(100vh-var(--header-height))] bg-base-100 text-base-content"
>
    {#key data.story?.id}
        {#if data.story}
            <StoryblokComponent blok={data.story.content} uuid={data.story.uuid} />
        {:else}
            <div class="flex items-center justify-center h-full">
                <p>Loading...</p>
            </div>
        {/if}
    {/key}
</div> 