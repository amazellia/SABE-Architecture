<script>
	import { spring } from 'svelte/motion';
  import Device from 'svelte-device-info'
  import { onMount } from 'svelte'; 
  let isMobile;
  let hoveredGalleryControl = null;
  let isVisible = true;

	onMount(async () => {
		isMobile = Device.isMobile;
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
  let scrollY = 0;

  function updateCursor () {
    coords1.set({ x: X, y: Math.max(0, Y + scrollY) })
    coords2.set({ x: X, y: Math.max(0, Y + scrollY) })
  }

  function handleLinkHover(event) {
    // You can customize this logic based on your requirements
    // For example, extract the link information from the event target and update the icon accordingly
    hoveredLink = event.target.href || null;
    // Update the cursor icon based on the hovered link
    // You might want to have a mapping of links to icons
    // For simplicity, let's assume it's a direct SVG path for demonstration purposes
    // Replace this with your logic for updating the cursor icon
    //updateCursorIcon();
    console.log("clicked")
  }

  function handleFocus(event) {
    hoveredLink = event.target.href || null;
    console.log("clicked")
  }

  function handleMouseLeave() {
    isVisible = false;
  }

  function handleMouseEnter() {
    isVisible = true;
  }

  function handleGalleryHover(event) {
    const bpWrap = event.target.closest('.bp-wrap');
    const closeButton = event.target.closest('.bp-x');
    const galleryLink = event.target.closest('.bp-html a');
    const galleryImage = event.target.closest('.bp-html img');
    const iframe = event.target.closest('.bp-if');
    
    // Hide cursor when hovering over iframes
    if (iframe) {
      isVisible = false;
      return;
    }
    
    isVisible = true;
    
    if (galleryLink || galleryImage) {
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

  //function updateCursorIcon() {
    // Your logic to update the cursor icon based on the hovered link
    // For demonstration purposes, let's assume a simple mapping
    //const iconPath = hoveredLink === 'https://example.com' ? 'path1' : 'path2';
    // Update the cursor SVG path or icon based on the mapping
    // Replace this with your logic for updating the cursor icon
    // You might need to load different SVGs or change the icon dynamically
    // based on the hovered link
    // Example: cursorSvgPath.set(iconPath);
  //}
</script>

<svelte:window
  on:mousemove={(e) => {
    X = e.clientX;
    Y = e.clientY;
    updateCursor();
    handleGalleryHover(e);
  }}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousedown={(e) => {
    size.set(30);
  }}
  on:mouseup={(e) => {
    size.set(15);
  }}
  
  on:touchmove={(e) => {
    const touch = e.touches[0];
    X = touch.clientX;
    Y = touch.clientY;
    size.set(100);
    updateCursor()
  }}
  on:touchstart={(e) => {
    size.set(100);
    const touch = e.touches[0];
    X = touch.clientX;
    Y = touch.clientY
    updateCursor();
  }}
  on:touchend={(e) => {
    size.set(0);
  }}
  />


<svg 
  role="none" 
  style="pointer-events: {isMobile ? 'none' : 'none'}; opacity: {isVisible ? 1 : 0};" 
  class="w-full h-full transition-opacity duration-150"  
  on:mouseover={handleLinkHover} 
  on:focus={handleFocus}
  > 
  <circle cx={$coords1.x} cy={$coords1.y} r={$size} stroke="lightgray" stroke-width="1" fill-opacity="0" />
  {#if hoveredGalleryControl}
    {#if hoveredGalleryControl === 'close'}
      <text
        x={$coords1.x}
        y={$coords1.y}
        text-anchor="middle"
        dominant-baseline="middle"
        fill="darkgray"
        font-size="20"
      >
        ×
      </text>
    {:else if hoveredGalleryControl === 'link'}
      <circle 
        cx={$coords1.x} 
        cy={$coords1.y} 
        r={$size} 
        stroke="lightgray" 
        stroke-width="1" 
        fill-opacity="0" 
      />
    {:else}
      <text
        x={$coords1.x}
        y={$coords1.y}
        text-anchor="middle"
        dominant-baseline="middle"
        fill="darkgray"
        font-size="20"
      >
        {hoveredGalleryControl === 'prev' ? '←' : '→'}
      </text>
    {/if}
  {:else}
    <circle cx={$coords2.x} cy={$coords2.y} r={$size / 4} fill="darkgray" />
  {/if}
</svg>

<style lang="postcss">
	:global(body) {
		cursor: none;
	}
	
	.w-full {
		width: 100%;
	}
	
	.h-full {
		height: 100%;
	}
	
	svg {
    z-index: 9999;
    position: fixed;
	}
  
  :global(.bp-x) {
    cursor: none !important;
  }

  :global(.bp-x:hover) {
    cursor: none !important;
  }

  .transition-opacity {
    transition: opacity 150ms ease-in-out;
  }

  :global(.bp-if) {
    cursor: auto !important;
  }
</style>