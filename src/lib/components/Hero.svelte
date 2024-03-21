<script>
	import { storyblokEditable } from '@storyblok/svelte';
	import HeadlineColorful from './micro/HeadlineColorful.svelte';

	export let blok;
	let heroClasses = blok.layout === 'constrained' ? 'container mx-auto' : '';
</script>
 
<div
	use:storyblokEditable={blok}
	class={'min-h-[650px] relative flex items-end justify-center p-9 my-6 rounded-[5px] overflow-hidden ' +
		`${heroClasses}`}
>
	<div class="relative z-10 text-center">
		<h2 class="text-3xl lg:text-6xl text-darkgrey font-bold mb-3">
			<HeadlineColorful headline={blok.headline} />
		</h2>
		<h3 class="text-4xl text-darkgrey font-light">
			{blok.subheadline}
		</h3>
	</div>
	<img
		src={blok.background_image.filename}
		alt={blok.background_image.alt}
		class="absolute top-0 left-0 z-0 w-full h-full object-cover"
	/>
</div>