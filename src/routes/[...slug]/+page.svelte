<script>
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	onMount(() => {
		if (data.story) {    
			const resolveRelations = ['event.stream', 'event.guests', 'guests.year', 'project.tutorial', 'project.acad' ]
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory), {
	 			resolveRelations: resolveRelations
			});
		}
	});
</script>

<svelte:head>
	<title>{data.story.name}</title>
</svelte:head>
{#key data}
	<div>
		{#if data.story}
			<StoryblokComponent blok={data.story.content} uuid={data.story.uuid} />
		{/if}
	</div> 
{/key}