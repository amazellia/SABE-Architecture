import { useStoryblok } from '$lib/sblib';
import { useStoryblokApi } from '@storyblok/svelte';
export const config = {
  // Use 'nodejs18.x' for Serverless
  runtime: 'edge',
};

/**
 * @param {any} value
 * @param {number} ms
 */
function sleep(value, ms) {
  // Use this sleep function to simulate
  // a delayed API response.
  return new Promise((fulfill) => {
    setTimeout(() => {
      fulfill(value);
    }, ms);
  });
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  sleep(await useStoryblok(), 10000);

	let storyblokApi = await useStoryblokApi();
  let slug = params.slug;
  let path = 'cdn/stories/';
  if (slug) {
    path += slug;
  } else {
    path += 'home';
  }
    // const resolveRelations = ['event-highlights.events']
    const resolveRelations = ['event.stream', 'event.guests', 'guests.year']
    const dataStory = await storyblokApi.get(path, {
      version: 'draft',
      resolve_relations: resolveRelations,
    });

    const dataConfig = await storyblokApi.get('cdn/stories/config/', {
      version: 'draft',
      resolve_links: 'url'
    });

    return {
      story: dataStory.data.story,
      header: dataConfig.data.story.content.header_menu,
		  logo: dataConfig.data.story.content.logo,
		  footer: dataConfig.data.story.content
    };
   
  }