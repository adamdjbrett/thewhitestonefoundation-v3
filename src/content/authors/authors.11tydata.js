export default {
  layout: 'author.njk',
  tags: ['authors'],
  eleventyComputed: {
    permalink: (data) => `/authors/${data.key || data.page.fileSlug}/`
  }
};
