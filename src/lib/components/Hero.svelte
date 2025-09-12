<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import HeadlineColorful from './micro/HeadlineColorful.svelte';
	import { onMount, onDestroy } from 'svelte';

	export let blok;
	let heroClasses = blok.layout === 'constrained' ? 'container mx-auto' : '';
	let viewerLoaded = false;
	let heroRef;
	let observer;
	let script;

	function loadSplineScript() {
		if (!script) {
			script = document.createElement('script');
			script.src = 'https://unpkg.com/@splinetool/viewer@1.9.46/build/spline-viewer.js';
			script.type = 'module';
			script.onload = () => {
				viewerLoaded = true;
			};
			document.head.appendChild(script);
		}
	}

	onMount(() => {
		observer = new window.IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadSplineScript();
					observer.disconnect();
				}
			},
			{ root: null, threshold: 0.1 }
		);
		if (heroRef) {
			observer.observe(heroRef);
		}
	});

	onDestroy(() => {
		if (observer && heroRef) {
			observer.unobserve(heroRef);
		}
		if (script && script.parentNode) {
			script.parentNode.removeChild(script);
		}
		viewerLoaded = false;
	});
</script>

<div
	use:storyblokEditable={blok}
	bind:this={heroRef}
	class="h-screen w-full relative flex items-center justify-center overflow-hidden"
>
	{#if viewerLoaded}
		<spline-viewer 
			url={blok.embeddedBG}
			class="absolute inset-0 z-0"
		></spline-viewer>
	{/if}

	<div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
		<h2 class="text-4xl lg:text-7xl text-white font-bold mb-6">
			<HeadlineColorful headline={blok.headline} />
		</h2>
		<h3 class="text-xl lg:text-4xl text-white font-light">
			{blok.subheadline}
		</h3>
	</div>
</div>

<style>
	:global(spline-viewer) {
		width: 100%;
		height: 100%;
	}

	:global(spline-viewer::part(canvas)) {
		border-radius: 0;
	}
</style>