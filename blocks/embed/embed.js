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
const getDefaultEmbed = (url) => `
  <div class="embed-media" style="--embed-aspect: 16 / 9;">
    <iframe
      src="${url.href}"
      title="Content from ${url.hostname}"
      loading="lazy"
      scrolling="no"
      allow="encrypted-media"
      URLSearchParams(url.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }
  const src = `https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}`;
  return `
    <div class="embed-media" style="--embed-aspect: 16 / 9;">
      <iframe
        src="${src}"
        title="Content from YouTube"
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
       utoplay ? '?muted=1&autoplay=1' : '';
  const src = `https://player.vimeo.com/video/${video}${suffix}`;
  return `
    <div class="embed-media" style="--embed-aspect: 16 / 9;">
      <iframe
        src="${src}"
        title="Content from Vimeo"
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
       st embedHTML = `
    <div class="embed-media embed-media--auto">
      <blockquote class="twitter-tweet"><a href="${url.hrefockquote>
    </div>
  `;
  loadScript('https://platform.twitter.com/widgets.js');
  return embedHTML;
};

const loadEmbed = (block, link, autoplay) => {
  if (block.classList.contains('embed-is-loaded')) return;

  const EMBEDS_CONFIG = [
    { match: ['youtube', 'youtu.be'], embed: embedYoutube },
    { match: ['vimeo'], embed: embedVimeo },
    { match: ['twitter'], embed: embedTwitter },
  ];

  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => link.includes(match)));
  const url = new URL(link);

  if (config) {
    block.innerHTML = config.embed(url, autoplay);
    block.className = `block embed embed-${config.match[0]} embed-is-loaded`;
  } else {
    block.innerHTML = getDefaultEmbed(url);
    block.className = 'block embed embed-is-loaded';
  }
};

export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const link = block.querySelector('a')?.href;
  block.textContent = '';

  if (!link) return;

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-placeholder';
    wrapper.innerHTML = '<div class="embed-placeholder-play"><button type="button" title="Play"></button></div>';
    wrapper.prepend(placeholder);
    wrapper.addEventListener('click', () => {
      loadEmbed(block, link, true);
    });
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      if (entries.some((e) => e.isIntersecting)) {
        obs.disconnect();
        loadEmbed(block, link);
      }
    }, { rootMargin: '200px' });
    observer.observe(block);
  }
}
