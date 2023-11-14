import { c as create_ssr_component, e as escape, f as add_attribute, d as each, v as validate_component } from "./ssr.js";
import "@storyblok/js";
const StreamCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stream } = $$props;
  let { slug } = $$props;
  if ($$props.stream === void 0 && $$bindings.stream && stream !== void 0)
    $$bindings.stream(stream);
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  return `<a href="${"/" + escape(slug, true)}" class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"><img src="${escape(stream.image?.filename, true) + "/m/600x0"}"${add_attribute("alt", stream.image?.alt, 0)} class="w-full h-48 xl:h-72 object-cover pointer-events-none"> <div class="p-4"><h3 class="text-xl font-bold mb-3">${escape(stream.name)}</h3> </div></a>`;
});
const StreamList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let streams = [];
  return `<div class="py-24"><div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">${each(streams, (stream) => {
    return `${validate_component(StreamCard, "StreamCard").$$render(
      $$result,
      {
        stream: stream.content,
        slug: stream.full_slug
      },
      {},
      {}
    )}`;
  })}</div></div>`;
});
export {
  StreamList as default
};
