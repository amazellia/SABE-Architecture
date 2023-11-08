import { u as useStoryblok } from "../../../chunks/sblib.js";
import { u as useStoryblokApi } from "../../../chunks/index.js";
const config = {
  runtime: "nodejs18.x"
};
async function load({ params }) {
  await useStoryblok();
  let storyblokApi = await useStoryblokApi();
  let slug = params.slug;
  let path = "cdn/stories/";
  if (slug) {
    path += slug;
  } else {
    path += "home";
  }
  const resolveRelations = ["event.stream", "event.guests", "guests.year"];
  const dataStory = await storyblokApi.get(path, {
    version: "draft",
    resolve_relations: resolveRelations
  });
  const dataConfig = await storyblokApi.get("cdn/stories/config/", {
    version: "draft",
    resolve_links: "url"
  });
  return {
    story: dataStory.data.story,
    header: dataConfig.data.story.content.header_menu,
    logo: dataConfig.data.story.content.logo,
    footer: dataConfig.data.story.content
  };
}
export {
  config,
  load
};
