import { apiPlugin, storyblokInit, RichTextSchema } from '@storyblok/svelte';
// 001 Import the environment variables
import { PUBLIC_ACCESS_TOKEN } from '$env/static/public';
import { PUBLIC_REGION } from '$env/static/public';

import cloneDeep from "clone-deep";
const mySchema = cloneDeep(RichTextSchema); // you can make a copy of the default RichTextSchema
// ... and edit the nodes and marks, or add your own.
// Check the base RichTextSchema source here https://github.com/storyblok/storyblok-js-client/blob/master/source/schema.js

export async function useStoryblok(accessToken = '') {
	// 002 setting the access token (from environment variable)
	accessToken = accessToken === '' ? PUBLIC_ACCESS_TOKEN : accessToken;
	// 003 call storyblok init
	await storyblokInit({
		// 004 using the access token
		accessToken: accessToken,
		// 005 using the apiPlugin (for connecting with Stroyblok API)
		use: [apiPlugin],
		cache: {
			clear: "auto",
			type: "memory",
		  },
		// 006 listing the needed components
		components: {
			feature: (await import('$lib/components/Feature.svelte')).default,
			grid: (await import('$lib/components/Grid.svelte')).default,
			page: (await import('$lib/components/Page.svelte')).default,
			teaser: (await import('$lib/components/Teaser.svelte')).default,
            hero: (await import('$lib/components/Hero.svelte')).default,
            event: (await import('$lib/components/Event.svelte')).default,
            eventFeatured: (await import('$lib/components/EventFeatured.svelte')).default,
			eventUpcoming: (await import('$lib/components/EventUpcoming.svelte')).default,
            guest: (await import('$lib/components/Guest.svelte')).default,
            guestFeatured: (await import('$lib/components/GuestFeatured.svelte')).default,
            stream: (await import('$lib/components/Stream.svelte')).default,
            "rich-text": (await import('$lib/components/Rich-Text.svelte')).default,
            grid_item_report: (await import('$lib/components/GridReportItem.svelte')).default,
			project:(await import('$lib/components/Project.svelte')).default,
			list:(await import('$lib/components/List.svelte')).default,
			gallery: (await import('$lib/components/Gallery.svelte')).default,
			// projectList:(await import('$lib/components/ProjectList.svelte')).default,
            // guestList: (await import('$lib/components/GuestList.svelte')).default,
			// streamList:(await import('$lib/components/StreamList.svelte')).default,
			// eventList: (await import('$lib/components/EventList.svelte')).default,
		},
		// 007 setting some api options like https, cache and region
		apiOptions: {
			https: true,
			cache: {
				type: 'memory'
			},
			region: PUBLIC_REGION // "us" if your space is in US region
		},
		richText: {
			schema: mySchema,
			resolver: (component, blok) => {
			  switch (component) {
				case "gallery":
					// https://www.storyblok.com/tp/build-your-own-showcase-gallery-with-storyblok-sveltekit-and-edgio
					if (blok.type == "carousel" || blok.type == undefined) {
						const images = blok.images.map((item, index) => {
							return `
								<div class="carousel-item place-content-center">
									<img
										id="${item.id}"
										src=${item.filename}
										alt=${item.alt}
										class="w-auto h-auto" 
									/>
								</div>
							`;
						});
					
						const buttons = blok.images.map((item, index) => {
							return `<a href="#${item.id}" class="btn btn-xs">${index + 1}</a>`;
						});
		
						return `
							<div class="carousel content-center w-full h-96 md:h-screen lg:h-screen ">
								${images.join('')}
							</div>
							<div class="flex justify-center w-full py-2 gap-2">
								${buttons.join('')}
							</div>
						`;
					}					
					if (blok.type == "carousel_nextprev") {
						const images = blok.images.map((item, i, img) => {
							const previousItem = i > 0 ? img[i - 1] : null;
							const nextItem = i < img.length - 1 ? img[i + 1] : null;
						
							const prev = previousItem
								? `<a href="#${previousItem.id}" class="btn">❮</a>` : `<p></p>` ;
							
							const next = nextItem
								? `<a href="#${nextItem.id}" class="btn">❯</a>` : " ";
						
							return `<div id="${item.id}" class="carousel-item place-content-center relative w-full h-screen">
								<img src="${item.filename}" alt="${item.alt}" class=" h-screen object-cover"/>
								<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
									${prev}
									${next}
								</div>
							</div>`;
						});

						return `
						<div class="carousel content-center w-full">
							${images.join('')}
						</div>`
					};
					if (blok.type = "sponsors") {
						const images = blok.images.map((item) => {
							return ` 
							<div id="${item.id}" class="w-full p-2">
							<img src="${item.filename}" alt="${item.alt}" class="w-full h-auto object-cover"/>
							</div>`;
						});
						return `
						<div class="carousel w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						${images.join('')}
						</div>`
					};
				case "video":
					return null
				default:
				  return "Resolver not defined";
			  }
			},
		},
	});
}