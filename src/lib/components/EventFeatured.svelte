 <script>
    import EventCard from "./EventCard.svelte";
    export let blok;
</script>
<div class="py-24">
    <h2 class="text-6xl text-[#ff0085] font-bold text-center mb-12">{blok.title}</h2>
    <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">
        {#each blok.projects as article}
            <EventCard article={article.content} slug={article.full_slug} />
        {/each}
    </div>
</div>