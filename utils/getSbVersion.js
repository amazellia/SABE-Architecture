import {PUBLIC_STORYBLOK_IS_PREVIEW} from '$env/static/public'
export default function getVersion() {
    return PUBLIC_STORYBLOK_IS_PREVIEW === 'true' ? 'draft' : 'published'
  }