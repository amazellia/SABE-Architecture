/** @type {import('./$types').PageLoad} */

import {PUBLIC_STORYBLOK_IS_PREVIEW} from '$env/static/public'

export async function load({ params, parent }) {
  const { storyblokApi } = await parent();
  let slug = params.slug;
  let path = 'cdn/stories/';
  if (slug) {
    path += slug;
  } else {
    path += 'home';
  }

    const resolveRelations = [ 
      'event-highlights.events',
      'event.stream', 'event.guests', 
      'guests.year', 
       'event.parent_event', 
       'project.course_event', 
       'project.tutorial_event', 
       'project.project_tutor', 
       'project.exhibit_event',
       'project.degreeLevel',
      ]
    const dataStory = await storyblokApi.get(path, {
      version: PUBLIC_STORYBLOK_IS_PREVIEW,
      resolve_relations: resolveRelations,
    })

    return {
      story: dataStory.data.story,
      name: slug,
    };
  }