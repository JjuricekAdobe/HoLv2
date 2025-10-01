/*
 * Embed Block
 * Show videos and social posts directly on your page
 * https://www.hlx.live/developer/block-collection/embed
 */

const loadScript = (url, callback, type) => {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.src = url;
  if (type) {
    script.setAttribute('type', type);
  }
  script.onload = callback;
  head.append(script);
  return script;
};

// Generic, unknown provider: fallback to 16:9 aspect ratio and full width
const getDefaultEmbed = (url) => (
  `
  <div class="embed-media" style="--embed-aspect: 16 / 9;">
    <iframe
      src="${url.href}"
      title="Content from ${url.hostname}"
      loading="lazy"
      scrolling="no"
      allow="encrypted-media"
      referrerpolicy="strict-origin-when-cross-origin"
   toplay ? '&muted=1&autoplay=1' : '';
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const embed = url.pathname;

  if (url.origin.indexOf('youtu.be') !== -1) {
    const parts = url.pathname.split('/');
    vid = parts.length > 1 ? encodeURIComponent(parts[1]) : vid;
  }

  // Build src without nested template literals
  let src = 'https://www.youtube.com';
  if (vid) {
    src = 'https://www.youtube.com/embed/' + vid + '?rel=0&v=' + vid + suffix;
  } else {
    src = 'https://www.youtube.com' + embed;
  }

  return (
    `
    <div class="embed-media" style="--embed-aspect: 16 / 9;">
      <iframe
        src="${src}"
        title="Content from YouTube"
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
        referrerpolicy="strict-origin-when-cross-origin"
     play ? '?muted=1&autoplay=1' : '';
  const src = 'https://player.vimeo.com/video/' + video + suffix;

  return (
    `
    <div class="embed-media" style="--embed-aspect: 16 / 9;">
      <iframe
        src="${src}"
        title="Content from Vimeo"
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
       
  loadScript('https://platform.twitter.com/widgets.js');
