<script>
  import BiggerPicture from 'bigger-picture/svelte';
  import { onMount } from 'svelte';
  import { storyblokEditable } from '@storyblok/svelte';
  import VideoPlayer from './micro/VideoPlayer.svelte';
  import SketchfabViewer from './micro/SketchfabViewer.svelte';

  export let blok;
  let imageLinks;
  let bp;

  onMount(async () => {
      if (typeof window !== 'undefined') {
          bp = BiggerPicture({ target: document.body });
      }

      // Grab image links
      imageLinks = document.querySelectorAll('#images a');
      
      // Add click listener to open BiggerPicture for images
      for (let link of imageLinks) {
          link.addEventListener("click", openGallery);
      }
  });

  // Open BiggerPicture
  function openGallery(e) {
      e.preventDefault();
      bp.open({
          items: imageLinks,
          el: e.currentTarget
      });
  }

  // Open BiggerPicture for YouTube and Sketchfab
  function openIframe(e, src) {
      e.preventDefault();
      bp.open({
          items: [
              {
                  src: src,
                  type: 'iframe'
              }
          ],
          el: e.currentTarget
      });
  }

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
</script>

<div 
  use:storyblokEditable={blok}
  class="grid grid-cols-1 md:grid-cols-3 w-full"
  id="images">

  <!-- Images - Storyblok CMS Assets -->
  {#if blok?.assets}
      {#each blok?.assets as a}
          <a href="{a.filename}" on:click={openGallery}>      
              <img
                  src="{a.filename}"
                  alt="{a.alt}"
              />
          </a>
      {/each}
  {/if}

  <!-- Video player - YouTube -->
  {#if videoIds.length > 0}
      {#each videoIds as videoId}
          <button 
              on:click={e => openIframe(e, `https://www.youtube.com/embed/${videoId}`)}
              class="w-full"
              aria-label="Open YouTube Video"
          >
              <VideoPlayer videoId={videoId} />
          </button>
      {/each}
  {/if}

  <!-- 3D object viewer - Sketchfab -->
  {#if modelIds.length > 0}
      {#each modelIds as modelId}
          <button 
              on:click={e => openIframe(e, `https://sketchfab.com/models/${modelId}/embed`)}
              class="w-full"
              aria-label="Open Sketchfab Model"
          >
              <SketchfabViewer modelId={modelId} />
          </button>
      {/each}
  {/if}
</div>