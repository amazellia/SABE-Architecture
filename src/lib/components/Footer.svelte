<script>
    export let footer;
    export let logo;
    const d = new Date();
    let year = d.getFullYear();
</script>

<footer class="p-12">
    <hr>
    <div class="flex flex-col lg:flex-row justify-stretch">
        {#if footer}
        <div class="basis-auto lg:basis-1/2">
            <img
            src={logo.filename}
            alt={logo.alt}
            class="basis-auto lg:basis-1/2"
            />
            <p>{footer.address}</p>
            <b class="no-underline bold">Contact Us</b><br>
            <a class=" underline underline-offset-8" href={footer.phone}>Phone</a> <br>
            <a class=" underline underline-offset-8" href="mailto:{footer.email}">Email</a> <br><br>
        </div>
        <div class="basis-auto lg:basis-1/2">
            <!-- <a class="underline underline-offset-8" href={footer.instagram.url} target="_blank">Instagram</a><br>
            <a class="underline underline-offset-8" href={footer.youtube.url} target="_blank">YouTube</a><br>
            <a class="underline underline-offset-8" href={footer.facebook.url} target="_blank">Facebook</a><br>
            <a class="underline underline-offset-8" href={footer.linkedin.url} target="_blank">LinkedIn</a> -->
            <br><br>
            {footer.acknowledgement}<br>
        </div>
        {/if}
    </div>
    <div  class="flex items-center justify-center text-xl lg:text-2xl font-bold text-center p-8">
        {`${year} ${footer.copyright}`}
    </div>
</footer>