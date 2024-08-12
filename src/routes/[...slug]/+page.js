/** @type {import('./$types').PageLoad} */

import getVersion from '../../../utils/getSbVersion.js';
//export const prerender = true;

export async function load({ params, parent }) {
  const { storyblokApi } = await parent();
  let slug = params.slug;
  let path = 'cdn/stories/';
  if (slug) {
    path += slug;
  } else {
    path += 'home';
  }

    const resolveRelations = ['event-highlights.events','event.stream', 'event.guests', 'guests.year',  'event.parent_event', 'project.course_event', 'project.tutorial_event', 'project.project_tutor', 'project.exhibit_event']
    const dataStory = await storyblokApi.get(path, {
      version: getVersion(),
      resolve_relations: resolveRelations,
    }).then((res) => {
      console.log(res) 
    }).catch((error) => {
      console.log(error)
    });

    return {
      story: dataStory.data.story,
      name: slug,
    };
  }