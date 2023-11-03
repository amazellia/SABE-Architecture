import { c as create_ssr_component, e as escape, d as each, v as validate_component } from "./ssr.js";
import { E as EventCard } from "./EventCard.js";
const EventFeatured = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  return `<div class="py-24"><h2 class="text-6xl text-[#ff0085] font-bold text-center mb-12">${escape(blok.title)}</h2> <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">${each(blok.projects, (article) => {
    return `${validate_component(EventCard, "EventCard").$$render(
      $$result,
      {
        article: article.content,
        slug: article.full_slug
      },
      {},
      {}
    )}`;
  })}</div></div>`;
});
export {
  EventFeatured as default
};
