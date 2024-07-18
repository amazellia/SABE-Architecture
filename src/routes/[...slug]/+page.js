/** @type {import('./$types').PageLoad} */

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

    const resolveRelations = ['event-highlights.events','event.stream', 'event.guests', 'guests.year']
    const dataStory = await storyblokApi.get(path, {
      version: 'draft',
      resolve_relations: resolveRelations,
    });
    
    return {
      story: dataStory.data.story,
      name: slug,
    };
  }