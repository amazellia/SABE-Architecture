<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';

    export let blok;

    $: resolvedRichText = renderRichText(blok.description);
</script>

<div use:storyblokEditable={blok} 
class=" w-full">
    <div class="grid justify-items-center mx-auto mb-12">
        <div class="w-2/3 prose">{@html resolvedRichText}</div>
    </div>
</div>