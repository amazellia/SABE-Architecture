<script>
	import { spring } from 'svelte/motion';
    import Device from 'svelte-device-info';
    import { onMount } from 'svelte';
    import { navigating } from '$app/stores';
    import { afterNavigate } from '$app/navigation';
  
    let isMobile;
    let hoveredGalleryControl = null;
    let isVisible = true;
    let isNavigating = false;

    // Reset cursor state after navigation
    afterNavigate(() => {
        isNavigating = false;
        isVisible = true;
        setTimeout(() => {
            coords1.set({ x: X, y: Y });
            coords2.set({ x: X, y: Y });
        }, 0);
    });

    // Watch navigation state
    $: {
        if ($navigating) {
            isNavigating = true;
        }
    }

    onMount(async () => {
        isMobile = Device.isMobile;
        isVisible = true;
        isNavigating = false;
    });
  
	let coords1 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	let coords2 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.35
		}
	);

	let size = spring(15);
    let X = 0;
    let Y = 0;

    function updateCursor(e) {
        X = e.clientX;
        Y = e.clientY;
        if (!isNavigating) {
            coords1.set({ x: X, y: Y });
            coords2.set({ x: X, y: Y });
        }
    }

    function handleMouseMove(e) {
        updateCursor(e);
        if (!isNavigating) {
            handleGalleryHover(e);
        }
    }

    function handleMouseLeave() {
        isVisible = false;
    }

    function handleMouseEnter() {
        if (!isNavigating) {
            isVisible = true;
        }
    }

    function handleGalleryHover(event) {
        if (isNavigating) return;

        const bpWrap = event.target.closest('.bp-wrap');
        const closeButton = event.target.closest('.bp-x');
        const galleryLink = event.target.closest('.bp-html a');
        const galleryImage = event.target.closest('.bp-html img');
        const iframe = event.target.closest('.bp-if');
        const link = event.target.closest('a');
        
        // Hide cursor when hovering over iframes or during navigation
        if (iframe || isNavigating) {
            isVisible = false;
            return;
        }
        
        isVisible = true;
        
        if (link || galleryLink || galleryImage) {
            hoveredGalleryControl = 'link';
            size.set(25);
            return;
        } 
        if (closeButton) {
            hoveredGalleryControl = 'close';
            size.set(25);
        } else if (bpWrap) {
            const rect = bpWrap.getBoundingClientRect();
            const isLeftSide = event.clientX < (rect.left + rect.width / 2);
            hoveredGalleryControl = isLeftSide ? 'prev' : 'next';
            size.set(25);
        } else {
            hoveredGalleryControl = null;
            size.set(15);
        }
    }
</script>

<svelte:window
    on:mousemove={handleMouseMove}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:mousedown={() => !isNavigating && size.set(30)}
    on:mouseup={() => !isNavigating && size.set(15)}
/>

<div class="pointer-container">
    <svg 
        role="none" 
        style="pointer-events: none; opacity: {isVisible ? 1 : 0};" 
        class="cursor-svg"
    > 
        <circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke="lightgray" stroke-width="1" fill-opacity="0" />
        {#if hoveredGalleryControl}
            {#if hoveredGalleryControl === 'close'}
                <text x={$coords1.x} y={$coords1.y} text-anchor="middle" dominant-baseline="middle" fill="darkgray" font-size="20">×</text>
            {:else if hoveredGalleryControl === 'link'}
                <circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke="lightgray" stroke-width="1" fill-opacity="0" />
            {:else}
                <text x={$coords1.x} y={$coords1.y} text-anchor="middle" dominant-baseline="middle" fill="darkgray" font-size="20">
                    {hoveredGalleryControl === 'prev' ? '←' : '→'}
                </text>
            {/if}
        {:else}
            <circle cx={$coords2.x} cy={$coords2.y} r={$size / 4} fill="darkgray" />
        {/if}
    </svg>
</div>

<style lang="postcss">
	:global(body) {
		cursor: none;
	}
	
	.pointer-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 99999;
	}
	
	.cursor-svg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	
	:global(a), :global(button), :global([role="link"]) {
		cursor: none !important;
		pointer-events: auto !important;
	}
</style>