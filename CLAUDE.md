# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Artist site for Violet Paniko (Latin trap / R&B), served at violetpaniko.gay. It is plain static HTML/CSS/JS with no framework, build step, package manager, linter or tests. Pushing to `main` on GitHub (`thexavismith/violetpaniko-gay`) auto-deploys to Vercel (`violetpaniko-gay.vercel.app`), so a push is a production release.

## Preview

- `python3 -m http.server 8000` is enough, but it ignores `vercel.json`: open `/links/` with the trailing slash.
- `npx vercel dev` serves it exactly as production does (clean URLs, headers).

## Structure

- `index.html` is the one-page site (hero, latest release, music grid, about, join, footer). `links/index.html` is the link-in-bio page. Both share the single `styles.css`; the link page's styles live in its `.lk` / `.b` block and it references assets with `../` paths.
- `main.js` only handles the email signup: forms marked `data-signup` submit to Substack in a new tab, then the script swaps `[data-signup-form]` for `[data-signup-done]`. There is no backend.
- Design tokens (colors, fonts) are CSS variables in `:root` at the top of `styles.css`. Headings are lowercased by CSS, so write them in any case in the HTML. Fonts (Dela Gothic One, DM Sans) load from Google Fonts.

## Things that span multiple files

- **Production URL is hard-coded.** `https://violetpaniko.gay` appears in canonical and Open Graph tags in both HTML files, `sitemap.xml` and `robots.txt`. Update all of them together if the domain changes or a page is added.
- **`/images/*` is served `immutable` for a year** (`vercel.json`). Never overwrite an image in place: use a new filename and update the references, or browsers and social crawlers keep the old one. The share card is `images/og-share.jpg` (1200x630) for this reason.
- **Adding a release** means: a new `<article class="card">` in `.releases` linking to that release's own Spotify page, with the `card-meta` line in the form `N tracks`, or `N tracks · × Collaborator` for collabs. Cards link to Spotify only. Other platforms (Apple Music, YouTube) appear only in the latest-release section.
- **Changing the latest release** touches the `.latest` section (cover, title, date eyebrow, Spotify embed iframe, platform buttons), the "Listen to ..." button on the links page, and the OG image and alt text.
- `press/violet-paniko-press-photos.zip` is the about section's "Press photos" download (three 3333x5000 originals). It is a 7MB binary, so avoid re-committing it needlessly.

## Content conventions

- Copy is first person in the artist's own voice and is deliberately PG-13 ("horny" in the about text is intentional). Don't sanitize it or invent biographical facts; ask for details instead.
- Images need descriptive alt text, matching the existing style.
