/** @type {import('./$types').PageLoad} */
import { error } from '@sveltejs/kit';
import { PUBLIC_STORYBLOK_IS_PREVIEW } from '$env/static/public';

export const ssr = true;
export const csr = true;

export async function load({ params, parent, depends }) {
  depends('app:storyblokApi');
  
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
    'event.stream', 
    'event.guests', 
    'guests.year', 
    'event.parent_event', 
    'project.course_event', 
    'project.tutorial_event', 
    'project.project_tutor', 
    'project.exhibit_event',
    'project.degreeLevel',
  ];

  try {
    const dataStory = await storyblokApi.get(path, {
      version: PUBLIC_STORYBLOK_IS_PREVIEW,
      resolve_relations: resolveRelations,
      cv: Date.now()
    });

    if (!dataStory?.data?.story) {
      throw error(404, 'Story not found');
    }

    return {
      story: dataStory.data.story,
      name: slug,
      key: Date.now(),
    };
  } catch (err) {
    console.error('Error loading story:', err);
    throw error(err.status || 500, err.message || 'Failed to load content');
  }
}