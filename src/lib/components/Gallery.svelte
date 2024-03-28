<script>
import BiggerPicture from 'bigger-picture/svelte'
// import Macy from "macy";
import { storyblokEditable } from '@storyblok/svelte';

export let blok;

// import style
import "bigger-picture/css";
import "./style.css";

// initialize BiggerPicture
const bp = BiggerPicture({
  target: document.body
});

// grab image links
const imageLinks = document.querySelectorAll("#images > a");

// add click listener to open BiggerPicture
for (let link of imageLinks) {
  link.addEventListener("click", openGallery);
}

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
class=" w-full">
{#each blok?.assets as a}
<image 
src="{a.filename}"
alt="{a.alt}"
/>
{/each}

</div>