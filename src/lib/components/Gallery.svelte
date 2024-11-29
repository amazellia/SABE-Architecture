<script>
  import BiggerPicture from 'bigger-picture/svelte';
  import 'bigger-picture/css';
  import { onMount, onDestroy } from 'svelte';
  import { storyblokEditable } from '@storyblok/svelte';
  import VideoPlayer from './micro/VideoPlayer.svelte';
  import SketchfabViewer from './micro/SketchfabViewer.svelte';

  export let blok;
  let links;
  let bp;
  let cleanupListeners = [];

  onMount(async () => {
    if (typeof window !== 'undefined') {
      bp = BiggerPicture({
        target: document.body,
      });

      // Grab links - use a more specific selector to only get direct children
      links = document.querySelectorAll(`#asset > a`);
      
      // Create a single array of all items upfront
      const allItems = Array.from(links);
      
      // Add click listener to open BiggerPicture for images
      links.forEach((link, index) => {
        const listener = (e) => {
          e.preventDefault();
          if (bp) {
            bp.open({
              items: allItems,
              el: e.currentTarget,
              position: index
            });
          }
        };
        link.addEventListener("click", listener);
        cleanupListeners.push({ element: link, listener });
      });
    }
  });

  onDestroy(() => {
    // Clean up event listeners
    cleanupListeners.forEach(({ element, listener }) => {
      element.removeEventListener("click", listener);
    });
  });

  // Function to get video IDs from multiple URLs
  const getVideoIds = (urls) => {
      return urls
          .split('\n')
          .map(url => {
              const urlObj = new URL(url.trim());
              if (urlObj.hostname === 'www.youtube.com') {
                  return urlObj.searchParams.get('v');
              } else if (urlObj.hostname === 'youtu.be') {
                  return urlObj.pathname.split('/')[1];
              }
              return null;
          })
          .filter(id => id !== null);
  };

  // Function to get model IDs from multiple URLs
  const getModelIds = (urls) => {
    return urls.split('\n')
        .map(url => {
            const urlObj = new URL(url.trim());
            const regex =  /sketchfab\.com\/3d-models\/(?:.*-)([^/]+)$/; 
            const match = regex.exec(urlObj.href);
            return match ? match[1] : null;
        })
        .filter(id => id !== null);
  };

  // Get video and model IDs
  const videoIds = blok.video ? getVideoIds(blok.video) : [];
  const modelIds = blok.sketchfab ? getModelIds(blok.sketchfab) : [];
  
  function getDimensions(url) {
    let dimensions = {
    width: url.split('/')[5].split('x')[0],
    height: url.split('/')[5].split('x')[1]
    }

    return dimensions;
  }

</script>

<div 
  use:storyblokEditable={blok}
  class="columns-1 md:columns-2 lg:columns-3 gap-4 p-4 space-y-4"
  id="asset"
  >

  <!-- Images - Storyblok CMS Assets -->
  {#if blok?.assets}
      {#each blok?.assets as a}
          <a 
              href="{a.filename}" 
              data-img="{a.filename}"
              data-thumb="{a.filename}/m/800x0"
              data-width="{getDimensions(a.filename).width}"
              data-height="{getDimensions(a.filename).height}"
               class="block w-full h-full"
          >      
              <img
                  src="{a.filename}/m/800x0"
                  alt="{a.alt}"
                  class="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                  />
          </a>
      {/each}
  {/if}

  <!-- Video player - YouTube -->
  {#if videoIds.length > 0}
      {#each videoIds as videoId}
          <a 
              href= "{`https://www.youtube.com/embed/${videoId}`}"
              data-iframe="{`https://www.youtube.com/embed/${videoId}`}"
          >
              <VideoPlayer videoId={videoId} />
        </a>
      {/each}
  {/if}

  <!-- 3D object viewer - Sketchfab -->
  {#if modelIds.length > 0}
      {#each modelIds as modelId}
        <a 
          href= "{`https://sketchfab.com/models/${modelId}/embed`}"
          data-iframe="{`https://sketchfab.com/models/${modelId}/embed`}"
          >
            <SketchfabViewer modelId={modelId} />
        </a>
      {/each}
  {/if}
</div>
