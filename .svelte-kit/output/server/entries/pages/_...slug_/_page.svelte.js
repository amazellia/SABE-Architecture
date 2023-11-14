import { c as create_ssr_component, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import "@storyblok/js";
import { S as StoryblokComponent } from "../../../chunks/StoryblokComponent.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1qtzbim_START -->${$$result.title = `<title>${escape(data.story.name)}</title>`, ""}<!-- HEAD_svelte-1qtzbim_END -->`, ""} <div>${validate_component(Header, "Header").$$render($$result, { header: data.header, logo: data.logo }, {}, {})} ${data.story ? `${validate_component(StoryblokComponent, "StoryblokComponent").$$render($$result, { blok: data.story.content }, {}, {})}` : ``} ${validate_component(Footer, "Footer").$$render($$result, { footer: data.footer, logo: data.logo }, {}, {})}</div>`;
});
export {
  Page as default
};
