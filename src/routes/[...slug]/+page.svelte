<script>
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import MouseCursor from '$lib/components/Pointer.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	onMount(() => {
		if (data.story) {    
			const resolveRelations = ['event.stream', 'event.guests', 'guest.year']
			useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory), {
	 			resolveRelations: resolveRelations
			});
		}
	});
</script>

<svelte:head>
	<title>{data.story.name}</title>
</svelte:head>
<MouseCursor/>
{#await data.story}
<div>
	<h2>streaming delayed data from the server...</h2>
</div>
{:then story}
	{#key story}
		<div>
			<Header header={data.header} logo={data.logo}/>
				<StoryblokComponent blok={story.content} />
			<Footer footer={data.footer} logo={data.logo} />
		</div>
	{/key}
{/await}