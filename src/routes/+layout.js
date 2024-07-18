// 001 Import the environment variables
import { PUBLIC_ACCESS_TOKEN } from '$env/static/public';
import { PUBLIC_REGION } from '$env/static/public';

// 002 Import all the components
import Feature from "$lib/components/Feature.svelte";
import Grid from "$lib/components/Grid.svelte";
import Page from "$lib/components/Page.svelte";
import Teaser from "$lib/components/Teaser.svelte";
import Hero from "$lib/components/Hero.svelte";
import Event from "$lib/components/Event.svelte";
import EventFeatured from "$lib/components/EventFeatured.svelte";
import EventUpcoming from "$lib/components/EventUpcoming.svelte";
import Guest from "$lib/components/Guest.svelte";
import GuestFeatured from "$lib/components/GuestFeatured.svelte";
import Stream from "$lib/components/Stream.svelte";
import RichText from "$lib/components/RichText.svelte";
import GridItemReport from "$lib/components/GridReportItem.svelte";
import Project from "$lib/components/Project.svelte";
import List from "$lib/components/List.svelte";
import Gallery from "$lib/components/Gallery.svelte";

import { apiPlugin, storyblokInit, RichTextSchema, useStoryblokApi } from '@storyblok/svelte';

import cloneDeep from "clone-deep";

const mySchema = cloneDeep(RichTextSchema); // you can make a copy of the default RichTextSchema
// ... and edit the nodes and marks, or add your own.
// Check the base RichTextSchema source here https://github.com/storyblok/storyblok-js-client/blob/master/source/schema.js


// 003 listing the needed components
let callbackComponents = () => {
	return {
		feature: Feature,
		grid: Grid,
		page: Page,
		teaser: Teaser,
		hero: Hero,
		event: Event,
		eventFeatured: EventFeatured,
		eventUpcoming: EventUpcoming,
		guest: Guest,
		guestFeatured: GuestFeatured,
		stream: Stream,
		"rich-text": RichText,
		grid_item_report: GridItemReport,
		project: Project,
		list: List,
		gallery: Gallery,
	}
}
/** @type {import('./$types').LayoutLoad} */
export async function load() {
	// 004 call storyblok init
	storyblokInit({
		accessToken: PUBLIC_ACCESS_TOKEN,
		// 005 using the apiPlugin (for connecting with Stroyblok API)
		use: [apiPlugin],
		components: callbackComponents,
	
		// 007 setting some api options like https, cache and region
		apiOptions: {
			https: true,
			cache: {
				type: "memory",
			},
			region: PUBLIC_REGION 
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
		}
	});

	let storyblokApi = useStoryblokApi();
	const dataConfig = await storyblokApi.get('cdn/stories/config/', {
		version: 'draft',
		resolve_links: 'url'
	  });

	return {
		storyblokApi: storyblokApi,
		header: dataConfig.data.story.content.header_menu,
		logo: dataConfig.data.story.content.logo,
		footer: dataConfig.data.story.content,
	};
}
