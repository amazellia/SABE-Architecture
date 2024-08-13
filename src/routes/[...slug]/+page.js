/** @type {import('./$types').PageLoad} */
import 'isomorphic-fetch';
import getVersion from '../../../utils/getSbVersion.js';

export async function load({ params, parent }) {
  const { storyblokApi } = await parent();
  let slug = params.slug;
  let path = 'cdn/stories/';
  if (slug) {
    path += slug;
  } else {
    path += 'home';
  }

    const resolveRelations = ['event.stream', 'event.guests', 'guests.year',  'event.parent_event', 'project.course_event', 'project.tutorial_event', 'project.project_tutor', 'project.exhibit_event']
    const dataStory = await fetch(storyblokApi.get(path, {
      version: getVersion(),
      resolve_relations: resolveRelations,
    })).then((response) => console.log(response.json()))
		.catch((error) => console.log(error.json()));

    return {
      story: dataStory.data.story,
      name: slug,
    };
  }