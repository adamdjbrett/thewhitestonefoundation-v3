const siteUrl = process.env.URL || 'http://localhost:8080/';

export default {
  title: 'The Whitestone Foundation',
  tagline: 'Fostering critical thought for the public interest.',
  url: siteUrl,
  noindex: false,
  defaultLanguage: 'en',
  languages: {
    en: {
      contentDir: 'content/',
      locale: 'en-US',
      languageName: 'English',
      title: 'The Whitestone Foundation',
      tagline: 'Fostering critical thought for the public interest.'
    }
  },
  head: {
    link: [
      { rel: 'stylesheet', href: '/assets/css/index.css' },
      { rel: 'icon', href: '/images/whitestone-logo.png' }
    ],
    script: [{ src: '/assets/js/index.js', defer: true }],
    meta: [
      { name: 'theme-color', content: '#FEFAE0' },
      { name: 'color-scheme', content: 'light' }
    ]
  },
  seo: {
    preserveQueryParams: false,
    ogImage: {
      url: new URL('/images/whitestone-logo.png', siteUrl).href,
      width: 1200,
      height: 630,
      alt: 'The Whitestone Foundation'
    },
    openGraph: { type: 'website' },
    twitter: { card: 'summary_large_image' }
  }
};
