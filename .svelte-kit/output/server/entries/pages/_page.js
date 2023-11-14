import { u as useStoryblokApi } from "../../chunks/index.js";
import { u as useStoryblok } from "../../chunks/sblib.js";
const prerender = true;
async function load() {
  await useStoryblok();
  let storyblokApi = await useStoryblokApi();
  const resolveRelations = ["event-highlights.events"];
  const dataStory = await storyblokApi.get("cdn/stories/home", {
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
  load,
  prerender
};
