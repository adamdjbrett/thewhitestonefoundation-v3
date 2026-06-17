# The Whitestone Foundation v3

[![Build and Deploy Eleventy](https://github.com/adamdjbrett/thewhitestonefoundation-v3/actions/workflows/xmit-deploy.yml/badge.svg?branch=main)](https://github.com/adamdjbrett/thewhitestonefoundation-v3/actions/workflows/xmit-deploy.yml)

Eleventy 3 site for The Whitestone Foundation. The build uses plain Eleventy, local Nunjucks templates, and authored static CSS/JS assets.

## Commands

```bash
npm install
npm run clean
npm run dev
npm run build
```

`npm run build` runs Eleventy first, then generates the Pagefind search assets in `dist/pagefind` with `npx`.

You can also run Eleventy directly:

```bash
npx @11ty/eleventy --serve
```

## Content Structure

- `src/content/index.md` controls the homepage.
- `src/content/pages/` contains retained static pages: mission, about, and contact.
- `src/content/posts/` contains news posts.
- `src/content/team/` contains active team profile pages.
- `src/content/team/alumni/` contains alumni profile pages.
- `src/content/page-setup/news.njk`, `people.njk`, and `search.njk` generate listing/search pages.
- `src/_data/settings.yaml` contains build settings used by Eleventy filters.
- `src/_data/metadata.yaml` contains public site metadata.

Generated output goes to `dist/`, which is ignored locally and rebuilt by CI.

## Ocean Blue Serenity Color Palette
- #03045e
- #023e8a
- #0077b6
- #0096c7
- #00b4d8
- #48cae4
- #90e0ef
- #ade8f4
- #caf0f8
- #ffffff
- #000000
