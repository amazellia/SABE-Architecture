import { useStoryblok } from '$lib/sblib';
import { useStoryblokApi } from '@storyblok/svelte';
export const config = {
  // Use 'nodejs18.x' for Serverless
  runtime: 'edge',
};

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
      story: dataStory.data.story,
      header: dataConfig.data.story.content.header_menu,
		  logo: dataConfig.data.story.content.logo,
		  footer: dataConfig.data.story.content,
    };
  }