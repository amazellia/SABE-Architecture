<script>
import BiggerPicture from 'bigger-picture/svelte'
import {onMount} from 'svelte';
import Macy from "macy";
import { storyblokEditable } from '@storyblok/svelte';

// import style
import "bigger-picture/css";
//import "./style.css";

export let blok;
let bp;

onMount(async() => {
  if (typeof window !== 'undefined') {
    // initialize BiggerPicture
    bp = BiggerPicture({
      target: document.body
    });
  }
  
  // grab image links
  const imageLinks = bp.querySelectorAll("#images > a");

  // add click listener to open BiggerPicture
  for (let link of imageLinks) {
    link.addEventListener("click", openGallery);
  }
})


// open BiggerPicture
function openGallery(e) {
  e.preventDefault();
  bp.open({
    items: imageLinks,
    el: e.currentTarget
  });
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// masonry grid
Macy({
  container: "#images",
  trueOrder: true,
  margin: 4,
  columns: 3,
  breakAt: {
    520: {
      columns: 2
    }
  }
});

</script>

<div use:storyblokEditable={blok}
  class="w-full h-full bg-[#f7f6fd] rounded-[5px]"
  id="images">
  {#each blok?.assets as a}
  <a
    href="{a.filename}">
      <image 
      src="{a.filename}"
      alt="{a.alt}"
      class="w-full h-48 xl:h-72 object-cover "
      />
  </a>
  {/each}

</div>

<style>
  
#images {
  width: 100%;
}
</style>