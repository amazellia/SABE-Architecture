<script>
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
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
{#await data}
<p>streaming delayed data from the server...</p>
{:then data}
	{#key data}
		<div>
			<Header header={data.header} logo={data.logo} />
				<StoryblokComponent blok={data.story.content} />
			<Footer footer={data.footer} logo={data.logo} />
		</div>
	{/key}
{/await}