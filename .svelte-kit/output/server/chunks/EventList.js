import { c as create_ssr_component, d as each, e as escape, v as validate_component } from "./ssr.js";
import { E as EventCard } from "./EventCard.js";
import "@storyblok/js";
const EventList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPage = 1;
  let events = [];
  return `<div class="py-24"><div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">${each(events, (event) => {
    return `${validate_component(EventCard, "EventCard").$$render(
      $$result,
      {
        event: event.content,
        slug: event.full_slug
      },
      {},
      {}
    )}`;
  })}</div> <div class="flex justify-center mt-4"><button class="mr-2" ${"disabled"}>Previous</button> <div class="flex">${``} ${``} <button>${escape(currentPage)}</button> ${`<button class="ml-2 hidden md:block">${escape(currentPage + 1)}</button>`}</div> <button class="ml-2" ${""}>Next</button></div></div>`;
});
export {
  EventList as default
};
