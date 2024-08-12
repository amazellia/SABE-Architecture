<script>
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	onMount(() => {
		if (data.story) {    
			const resolveRelations = ['event-highlights.events','event.stream', 'event.guests', 'guests.year',  'event.parent_event', 'project.course_event', 'project.tutorial_event', 'project.project_tutor', 'project.exhibit_event']
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory), {
	 			resolveRelations: resolveRelations
			});
		}
	});
</script>

<svelte:head>
	<title>{data.story.name}</title>
</svelte:head>
<div>
	{#if data.story}
		<StoryblokComponent blok={data.story.content} uuid={data.story.uuid} />
	{/if}
</div> 