<script>
  export let modelId;
</script>

{#if modelId}
  <div class="sketchfab-embed-wrapper">
        <div class="aspect-w-16 aspect-h-9">
            <iframe 
            class="absolute inset-0 w-full h-full"
            title="Sketchfab Model"
            frameborder="0" 
            allowfullscreen 
            mozallowfullscreen="true" 
            webkitallowfullscreen="true" 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            xr-spatial-tracking 
            execution-while-out-of-viewport 
            execution-while-not-rendered 
            web-share 
            src={`https://sketchfab.com/models/${modelId}/embed`}
            ></iframe>
        </div>
  </div>
{/if}

<style>
  .sketchfab-embed-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 75%; /* Adjust aspect ratio as needed */
      overflow: hidden;
  }
  iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
</style>