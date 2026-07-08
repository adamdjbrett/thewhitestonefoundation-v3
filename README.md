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

Use Node 24 LTS or newer on macOS, Windows 11, or Linux. The npm scripts avoid platform-specific shell syntax so they can run from Terminal, PowerShell, Command Prompt, or a Linux shell.

`npm run build` runs Eleventy first, then generates the Pagefind search assets in `dist/pagefind` with the pinned local Pagefind package.

You can also run Eleventy directly:

```bash
npx @11ty/eleventy --serve
```

## Deployment

GitHub Actions builds on Ubuntu with `npm ci`, verifies the generated `dist/` output, and deploys that static directory directly to XMIT with the pinned local XMIT CLI. Set `XMIT_KEY` as a repository secret and optionally set `XMIT_SITE` as a repository variable, or pass a site override when manually running the workflow.

The build output is static and remains centered on `dist/`, which keeps the project portable for XMIT first, GitHub Actions now, and a later Cloudflare Pages deployment using `npm run build` with `dist` as the output directory.

## Content Structure

- `src/content/index.md` controls the homepage.
- `src/content/pages/` contains retained static pages: mission, about, and contact.
- `src/content/posts/` contains news posts.
- `src/content/team/` contains active team profile pages.
- `src/content/team/alumni/` contains alumni profile pages.
- `src/content/page-setup/news.njk`, `people.njk`, and `search.njk` generate listing/search pages.
- `src/_data/metadata.yaml` is the canonical source for public site metadata, build metadata, head defaults, and SEO options.

Generated output goes to `dist/`, which is ignored locally and rebuilt by CI.

## Credits

### Images

- Homepage hero image: Getty Images, licensed under the Unsplash+ License.
- Unused Unsplash asset: photo by Mehdi Benkaci, `/images/mehdi-benkaci-BQ2b3LmEogA-unsplash.webp`.

### Icons

[Phosphor](https://phosphoricons.com/) is a passion project by [Helena Zhang](https://helenazhang.com/) and [Tobias Fried](https://tobiasfried.com/).

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
