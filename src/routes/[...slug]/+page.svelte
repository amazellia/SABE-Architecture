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
	{data.story.name}
</svelte:head>
{#await data}
<h2>streaming delayed data from the server...</h2>
{:then data}
	{#key data}
		<div>
			<Header header={data.header} logo={data.logo}/>
				<StoryblokComponent blok={data.story.content} />
			<Footer footer={data.footer} logo={data.logo} />
		</div>
	{/key}
{/await}