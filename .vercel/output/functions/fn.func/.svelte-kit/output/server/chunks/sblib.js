import { s as storyblokInit } from "./index.js";
import cloneDeep from "clone-deep";
import { RichTextSchema, apiPlugin } from "@storyblok/js";
const PUBLIC_ACCESS_TOKEN = "XbHkcgqQw4Sl5z30yQcVFwtt";
const PUBLIC_REGION = "us";
const mySchema = cloneDeep(RichTextSchema);
async function useStoryblok(accessToken = "") {
  accessToken = accessToken === "" ? PUBLIC_ACCESS_TOKEN : accessToken;
  await storyblokInit({
    // 004 using the access token
    accessToken,
    // 005 using the apiPlugin (for connecting with Stroyblok API)
    use: [apiPlugin],
    // 006 listing the needed components
    components: {
      feature: (await import("./Feature.js")).default,
      grid: (await import("./Grid.js")).default,
      page: (await import("./Page.js")).default,
      teaser: (await import("./Teaser.js")).default,
      hero: (await import("./Hero.js")).default,
      event: (await import("./Event.js")).default,
      guest: (await import("./Guest.js")).default,
      stream: (await import("./Stream.js")).default,
      eventList: (await import("./EventList.js")).default,
      eventFeatured: (await import("./EventFeatured.js")).default,
      guestList: (await import("./GuestList.js")).default,
      guestFeatured: (await import("./GuestFeatured.js")).default,
      streamList: (await import("./StreamList.js")).default,
      "rich-text": (await import("./Rich-Text.js")).default,
      grid_item_report: (await import("./GridReportItem.js")).default
    },
    // 007 setting some api options like https, cache and region
    apiOptions: {
      https: true,
      cache: {
        type: "memory"
      },
      region: PUBLIC_REGION
      // "us" if your space is in US region
    },
    richText: {
      schema: mySchema,
      resolver: (component, blok) => {
        switch (component) {
          case "gallery":
            if (blok.type == "carousel" || blok.type == void 0) {
              const images = blok.images.map((item, index) => {
                return `
								<div class="carousel-item place-content-center">
									<img
										id="${item.id}"
										src=${item.filename}
										alt=${item.alt}
										class="w-auto h-auto" 
									/>
								</div>
							`;
              });
              const buttons = blok.images.map((item, index) => {
                return `<a href="#${item.id}" class="btn btn-xs">${index + 1}</a>`;
              });
              return `
							<div class="carousel content-center w-full h-96 md:h-screen lg:h-screen ">
								${images.join("")}
							</div>
							<div class="flex justify-center w-full py-2 gap-2">
								${buttons.join("")}
							</div>
						`;
            }
            if (blok.type == "carousel_nextprev") {
              const images = blok.images.map((item, i, img) => {
                const previousItem = i > 0 ? img[i - 1] : null;
                const nextItem = i < img.length - 1 ? img[i + 1] : null;
                const prev = previousItem ? `<a href="#${previousItem.id}" class="btn">❮</a>` : `<p></p>`;
                const next = nextItem ? `<a href="#${nextItem.id}" class="btn">❯</a>` : " ";
                return `<div id="${item.id}" class="carousel-item place-content-center relative w-full h-screen">
								<img src="${item.filename}" alt="${item.alt}" class=" h-screen object-cover"/>
								<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
									${prev}
									${next}
								</div>
							</div>`;
              });
              return `
						<div class="carousel content-center w-full">
							${images.join("")}
						</div>`;
            }
            if (blok.type = "sponsors") {
              const images = blok.images.map((item) => {
                return ` 
							<div id="${item.id}" class="w-full p-2">
							<img src="${item.filename}" alt="${item.alt}" class="w-full h-auto object-cover"/>
							</div>`;
              });
              return `
						<div class="carousel w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						${images.join("")}
						</div>`;
            }
          case "video":
            return null;
          default:
            return "Resolver not defined";
        }
      }
    }
  });
}
export {
  useStoryblok as u
};
