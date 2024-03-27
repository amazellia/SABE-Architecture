<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';
    export let blok;
    $: resolvedRichText = renderRichText(blok.description);
</script>

<div use:storyblokEditable={blok}>
  <div class="grid grid-col md:grid-row md:grid-cols-2 w-dvw">
    <div class="w-full m-4">
    <img
      src="{blok.image.filename}/m/1600x0"
      alt="{blok.image.alt}"
      class="w-full h-[360px] lg:h-[450px] object-cover"
    />
    </div>
    <div class="w-full m-4">
      <img
      src="{blok.profile.filename}/m/1600x0"
      alt="{blok.profile.alt}"
      class="w-full h-[360px] lg:h-[450px] object-cover"
    />
    </div>
</div>
<div class="flex-grow w-2/3 mx-auto mb-12">
  <h1 class="text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center">{blok.name}</h1>
  <img src={blok.filename} alt="{blok.alt}" />
  {#each blok.year as y}
    <h2 class="text-2xl mb-4 text-center">{y}</h2>
  {/each}
  <div class="w-full prose">{@html resolvedRichText}</div>
</div>
</div>