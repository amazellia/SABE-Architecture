<script>
	import { storyblokEditable } from '@storyblok/svelte';
	export let blok;
	let heroClasses = blok.layout === 'constrained' ? 'container mx-auto' : '';
</script>
 
<div
	use:storyblokEditable={blok}
	class={'min-h-[600px] relative flex items-end justify-center p-9 my-6 rounded-[5px] overflow-hidden ' +
		`${heroClasses}`}
>
	<div class="relative z-10 text-center">
		<h2 class="text-3xl lg:text-6xl text-white font-bold mb-3">
			{blok.headline}
		</h2>
		<h3 class="text-4xl text-white font-light">
			{blok.subheadline}
		</h3>
	</div>
	<img
		src={blok.background_image.filename}
		alt={blok.background_image.alt}
		class="absolute top-0 left-0 z-0 w-full h-full object-cover"
	/>
</div>