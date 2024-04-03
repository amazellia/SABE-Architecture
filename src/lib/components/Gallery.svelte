<script>
import BiggerPicture from 'bigger-picture/svelte'
import {onMount} from 'svelte';
//import Macy from "macy";
import { storyblokEditable } from '@storyblok/svelte';

// import style
import "bigger-picture/css";
//import "./style.css";

export let blok;
let imageLinks;
let bp;
onMount(async() => {

  if (typeof window !== 'undefined') {
    bp = BiggerPicture({ target: document.body });
  }

  // grab image links
  imageLinks = document.querySelectorAll('#images a')
  
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
    });}

</script>

<div 
  use:storyblokEditable={blok}
  class="grid grid-col md:grid-row md:grid-cols-3 w-dvw"
  id="images">
    {#each blok?.assets as a}
    <a href="{a.filename}" on:click={openGallery}>      
      <img
      src="{a.filename}"
      alt="{a.alt}"
      />
    </a>
    {/each}
</div>