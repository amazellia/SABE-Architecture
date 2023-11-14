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
  await useStoryblok()
  let slug = params.slug;
  let path = 'cdn/stories/';
  if (slug) {
    path += slug;
  } else {
    path += 'home';
  }
    // const resolveRelations = ['event-highlights.events']
    const resolveRelations = ['event.stream', 'event.guests', 'guests.year']
    const dataStory = await useStoryblokApi().get(path, {
      version: 'draft',
      resolve_relations: resolveRelations,
    });

    const dataConfig = await useStoryblokApi().get('cdn/stories/config/', {
      version: 'draft',
      resolve_links: 'url'
    });

    return {
      story: sleep(dataStory.data.story, 1000),
      header: sleep(dataConfig.data.story.content.header_menu, 1),
		  logo: sleep(dataConfig.data.story.content.logo, 1),
		  footer: sleep(dataConfig.data.story.content, 1)
    };
  }