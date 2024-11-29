<script>
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
    import { page } from '$app/stores';
	export let blok;

    $: isHomePage = $page.url.pathname === '/';
</script>

{#key blok}
	<div 
        use:storyblokEditable={blok} 
        class="w-full place-items-center"
    >
		{#each blok.body as blok}
			<StoryblokComponent {blok} />
		{/each}
	</div>
{/key}