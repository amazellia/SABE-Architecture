<script>
	import '../app.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
	import MouseCursor from '$lib/components/Pointer.svelte';
    export let data;
</script>
 
<div>
    <MouseCursor/>
    <Header header={data.header} logo={data.logo}/>
    <slot />
    <Footer footer={data.footer} logo={data.logo} />
</div>