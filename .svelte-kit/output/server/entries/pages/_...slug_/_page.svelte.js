import { c as create_ssr_component, i as is_promise, n as noop, v as validate_component } from "../../../chunks/ssr.js";
import "@storyblok/js";
import { S as StoryblokComponent } from "../../../chunks/StoryblokComponent.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <div data-svelte-h="svelte-1ia3yjg"><h2>streaming delayed data from the server...</h2></div> `;
    }
    return function(story) {
      return ` <div>${validate_component(Header, "Header").$$render(
        $$result,
        {
          header: data.header,
          logo: data.logo,
          title: story.name
        },
        {},
        {}
      )} ${validate_component(StoryblokComponent, "StoryblokComponent").$$render($$result, { blok: story.content }, {}, {})} ${validate_component(Footer, "Footer").$$render($$result, { footer: data.footer, logo: data.logo }, {}, {})}</div> `;
    }(__value);
  }(data.story)}`;
});
export {
  Page as default
};
