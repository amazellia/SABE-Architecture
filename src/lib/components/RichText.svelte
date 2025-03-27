<script>
    import { storyblokEditable, renderRichText } from '@storyblok/svelte';

    export let blok;
    export let content = null;

    $: resolvedRichText = content ? renderRichText(content) : renderRichText(blok.description);
</script>

<div use:storyblokEditable={blok} class="w-full">
    <div class="m-10 prose dark:prose-invert max-w-4xl mx-auto">
        <div class="rich-text-content">{@html resolvedRichText}</div>
    </div>
</div>

<style>
    /* Regular paragraphs */
    .rich-text-content :global(p) {
        color: var(--text-gray-800);
        margin-bottom: 2rem !important;
        justify-items: center;
    }

    /* Line breaks */
    .rich-text-content :global(br) {
        content: "" !important;
        display: block !important;
        margin-bottom: 2rem !important;
    }

    /* Links */
    .rich-text-content :global(a) {
        color: var(--text-blue-600);
        text-decoration: none;
    }
    .rich-text-content :global(a:hover) {
        text-decoration: underline;
    }

    /* Bold text */
    .rich-text-content :global(strong), 
    .rich-text-content :global(b) {
        color: var(--text-gray-900);
        font-weight: bold;
    }

    /* Headings */
    .rich-text-content :global(h1),
    .rich-text-content :global(h2),
    .rich-text-content :global(h3),
    .rich-text-content :global(h4),
    .rich-text-content :global(h5),
    .rich-text-content :global(h6) {
        color: var(--text-gray-900);
    }
    
    /* Lists - Enhanced */
    .rich-text-content :global(ul),
    .rich-text-content :global(ol) {
        color: var(--text-gray-800);
        padding-left: 1.5rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    .rich-text-content :global(ul) {
        list-style-type: disc;
    }

    .rich-text-content :global(ol) {
        list-style-type: decimal;
    }

    .rich-text-content :global(li) {
        color: var(--text-gray-800);
        margin-bottom: 0.5rem;
        padding-left: 0.5rem;
    }

    .rich-text-content :global(li:last-child) {
        margin-bottom: 0;
    }

    /* Nested lists */
    .rich-text-content :global(li > ul),
    .rich-text-content :global(li > ol) {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    /* Last paragraph spacing */
    .rich-text-content :global(p:last-child) {
        margin-bottom: 0 !important;
    }

    /* Smooth scrolling */
    :global(html) {
        scroll-behavior: smooth;
    }

    /* Dark mode styles */
    :global(html[data-theme='dark']) .rich-text-content :global(p),
    :global(html[data-theme='dark']) .rich-text-content :global(ul),
    :global(html[data-theme='dark']) .rich-text-content :global(ol),
    :global(html[data-theme='dark']) .rich-text-content :global(li) {
        color: var(--text-gray-100);
    }

    :global(html[data-theme='dark']) .rich-text-content :global(h1),
    :global(html[data-theme='dark']) .rich-text-content :global(h2),
    :global(html[data-theme='dark']) .rich-text-content :global(h3),
    :global(html[data-theme='dark']) .rich-text-content :global(h4),
    :global(html[data-theme='dark']) .rich-text-content :global(h5),
    :global(html[data-theme='dark']) .rich-text-content :global(h6),
    :global(html[data-theme='dark']) .rich-text-content :global(strong),
    :global(html[data-theme='dark']) .rich-text-content :global(b) {
        color: var(--text-gray-100);
    }

    :global(html[data-theme='dark']) .rich-text-content :global(a) {
        color: var(--text-blue-400);
    }
    /* Mobile view margin */
    @media (max-width: 640px) {
        .rich-text-content {
            margin: 1.5rem; /* Adjust the margin as needed */
        }
    }
</style>