<script>
  export let videoId;
</script>

{#if videoId}
    <div class="youtube-embed-wrapper">
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            class="w-full h-full"
        ></iframe>
    </div>
{/if}


<style>
  .youtube-embed-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
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