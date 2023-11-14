import { storyblokInit as storyblokInit$1 } from "@storyblok/js";
let storyblokApiInstance = null;
const useStoryblokApi = () => {
  if (!storyblokApiInstance) {
    console.log(`You can't use getStoryblokApi if you're not loading apiPlugin.`);
  }
  return storyblokApiInstance;
};
let componentsMap = null;
const storyblokInit = (options) => {
  const { storyblokApi } = storyblokInit$1(options);
  storyblokApiInstance = storyblokApi;
  componentsMap = options.components || {};
};
const getComponent = (componentName) => {
  let component = null;
  component = typeof componentsMap === "function" ? componentsMap()[componentName] : componentsMap[componentName];
  if (!component) {
    console.error(`You didn't load the ${componentName} component. Please load it in storyblokInit. For example:
storyblokInit({
    accessToken: "<your-token>",
    components: {
      "teaser": Teaser
    }
})
`);
  }
  return component;
};
export {
  getComponent as g,
  storyblokInit as s,
  useStoryblokApi as u
};
