# RobotX AI Website

Code-managed rebuild of `usrobotx.com` using `Next.js`, bilingual routing, local media assets, and a responsive marketing-site structure.

## Stack

- `Next.js` App Router
- `TypeScript`
- global CSS in `src/app/globals.css`
- local media in `public/media`

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available routes

- `/en`
- `/en/solutions`
- `/en/about`
- `/en/contact`
- `/zh`
- `/zh/solutions`
- `/zh/about`
- `/zh/contact`

## Project structure

```text
public/
  media/
    home/
src/
  app/
  components/
  data/
  lib/
```

## Content and media

- Site copy and bilingual text live in `src/data/site-content.ts`
- Reusable site-wide styles live in `src/app/globals.css`
- Home page layout lives in `src/components/pages/home-page.tsx`
- Header and footer live in `src/components/site-header.tsx` and `src/components/site-footer.tsx`
- Local media assets are currently sourced from `public/media/home`

## Current implementation notes

- Header is fixed to the top of the page
- On the home page hero, the header is transparent before scroll and becomes solid after scrolling
- The home hero uses a local background video
- Solution visuals currently use local placeholder images from `public/media/home`
- The site is display/contact focused and does not include e-commerce

## Future extensions

- Shopify-fed display-only product pages
- Netlify deployment configuration
- SEO redirects from the WordPress site
- CMS or admin-managed content workflows
- Reintroducing progressive reveal animations as enhancement instead of required rendering logic
