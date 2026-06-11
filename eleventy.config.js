import markdownIt from 'markdown-it';
import settings from './src/_data/settings.js';

const md = markdownIt({ html: true, breaks: true, linkify: true, typographer: true });

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const stripHtml = (value) =>
  String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export default async function (eleventyConfig) {
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addPassthroughCopy({ 'src/static': '/' });

  eleventyConfig.addPreprocessor('drafts', '*', (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === 'build') return false;
  });

  eleventyConfig.addCollection('posts', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('src/content/posts/**/*.md')
      .sort((a, b) => (a.date || 0) - (b.date || 0))
  );

  eleventyConfig.addCollection('higherEd', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('src/content/posts/**/*.md')
      .filter((post) => (post.data?.categories || []).includes('higher-ed'))
      .sort((a, b) => (a.date || 0) - (b.date || 0))
  );

  eleventyConfig.addFilter('slugify', slugify);
  eleventyConfig.addFilter('md', (value) => md.render(String(value || '')));
  eleventyConfig.addFilter('markdownify', (value) => md.render(String(value || '')));
  eleventyConfig.addFilter('stripHtml', stripHtml);
  eleventyConfig.addFilter('firstWords', (value, count = 25) =>
    stripHtml(value).split(/\s+/).filter(Boolean).slice(0, count).join(' ')
  );
  eleventyConfig.addFilter('truncate', (value, count = 150) => {
    const text = stripHtml(value);
    return text.length > count ? `${text.slice(0, count).trim()}...` : text;
  });
  eleventyConfig.addFilter('readableDate', (dateObj) =>
    dateObj
      ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(dateObj)
      : ''
  );
  eleventyConfig.addFilter('htmlDateString', (dateObj) =>
    dateObj ? dateObj.toISOString().slice(0, 10) : ''
  );
  eleventyConfig.addFilter('isoDate', (dateObj) => (dateObj ? dateObj.toISOString() : ''));
  eleventyConfig.addFilter('baseUrl', function (url) {
    const siteUrl = this?.ctx?.metadata?.url || this?.context?.metadata?.url || settings.url || 'http://localhost:8080/';
    if (!url || url === '/') return siteUrl.replace(/\/$/, '');
    const cleanBase = siteUrl.replace(/\/$/, '');
    return String(url).startsWith('/') ? `${cleanBase}${url}` : url;
  });
  eleventyConfig.addFilter('absUrl', (path, base = settings.url) => {
    try {
      return new URL(path, base).toString();
    } catch {
      return path;
    }
  });
  eleventyConfig.addFilter('getKeys', (value) => Object.keys(value || {}));
  eleventyConfig.addFilter('filterTagList', (tags) =>
    (tags || []).filter((tag) => !['all', 'posts', 'higherEd', 'authors'].includes(tag))
  );
  eleventyConfig.addFilter('getAllCategories', (posts = []) => {
    const categories = new Set();
    posts.forEach((post) => (post.data?.categories || []).forEach((category) => categories.add(category)));
    return [...categories].sort();
  });
  eleventyConfig.addFilter('headTitle', (data = {}) => {
    const siteTitle = data.metadata?.title || data.settings?.title || settings.title;
    const pageTitle = data.title || data.settings?.tagline || settings.tagline;
    return pageTitle === siteTitle ? siteTitle : `${pageTitle} | ${siteTitle}`;
  });
  eleventyConfig.addFilter('headDescription', (data = {}) =>
    data.description || data.metadata?.description || data.settings?.tagline || settings.tagline || ''
  );
  eleventyConfig.addFilter('headImage', (data = {}) =>
    data.image || data.metadata?.image || data.settings?.seo?.ogImage?.url || '/images/whitestone-logo.png'
  );
  eleventyConfig.addFilter('canonicalUrl', (data = {}) => {
    const base = data.metadata?.url || data.settings?.url || settings.url;
    return new URL(data.page?.url || '/', base).toString();
  });

  eleventyConfig.addShortcode('year', () => new Date().getFullYear());
  eleventyConfig.addPairedShortcode('logoContainer', (content) => `<div class="logo-container">${content}</div>`);
  eleventyConfig.addShortcode(
    'logoItem',
    (url, image, alt) => `<a class="logo-item" href="${url}"><img src="${image}" alt="${alt}" loading="lazy"></a>`
  );

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: '_data',
      includes: '_includes'
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['html', 'njk', 'md', 'txt', 'xml', 'xsl']
  };
}
