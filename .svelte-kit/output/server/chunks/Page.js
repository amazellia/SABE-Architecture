import { c as create_ssr_component, d as each, v as validate_component } from "./ssr.js";
import "@storyblok/js";
import { S as StoryblokComponent } from "./StoryblokComponent.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  return `<div class="w-full place-items-center">${each(blok.body, (blok2) => {
    return `${validate_component(StoryblokComponent, "StoryblokComponent").$$render($$result, { blok: blok2 }, {}, {})}`;
  })}</div>`;
});
export {
  Page as default
};
