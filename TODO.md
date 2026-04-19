# TODO — usrobotx tech debt

Known issues carried forward as tech debt. Prioritize against `PLAN.md` phases. Delete items when shipped, don't just check them off.

## Accessibility / bilingual

### 1. `<html lang="en">` hardcoded on every route

- **Where:** [src/app/layout.tsx](src/app/layout.tsx) — root `<html>` element has `lang="en"` no matter the URL.
- **Impact:** `/zh` serves Chinese copy but screen readers + `hreflang` think the page is English. Breaks a11y and SEO for the ZH locale.
- **Fix direction:** move the `<html>` wrapper out of `src/app/layout.tsx` into `src/app/[locale]/layout.tsx` so `lang={locale}` is set per route. Root layout becomes a pass-through or renders children directly. Verify with `document.documentElement.lang` on both locales.
- **Not touched in Phase 1 hero video spike — this predates it.**

### 2. Hero `videoAriaLabel` may not match the actual footage

- **Where:** [src/data/site-content.ts](src/data/site-content.ts) `home.hero.videoAriaLabel` in both `en` and `zh`.
- **Current value:** "Quadruped inspection robot walking through an industrial yard" / "四足巡检机器人在工业场景中行走".
- **Impact:** if the new `/media/hero/hero.mp4` shows something other than a quadruped inspection scene (e.g., warehouse pallet aisle), screen readers get wrong context.
- **Fix direction:** watch the current hero loop, rewrite the aria label accordingly in both locales.

## Performance

### 3. Hero video is 28 MB (target <5 MB)

- **Where:** [public/media/hero/hero.mp4](public/media/hero/hero.mp4)
- **Impact:** heavy LCP on the landing page, especially on slow connections. The poster (`hero-poster.webp`) mitigates first paint but the video still loads quickly after.
- **Fix options (cheap → thorough):**
  1. Trim to a clean 8–12s loop point (likely 5–7x size reduction)
  2. Re-encode at CRF 30–32 instead of 26 (~40–50% reduction with minor quality loss)
  3. Downscale to 1600×900 or 1280×720 for mobile delivery
  4. Add a WebM/VP9 companion as `<source>` (see item 4)
  5. Switch to a CDN with adaptive bitrate (Mux HLS or Cloudinary) — see `PLAN.md` "Media requirements"
- **Start with (1)**, then re-measure before reaching for (5).

### 4. No WebM companion for the hero MP4

- **Where:** [src/components/pages/sections/home-hero.tsx](src/components/pages/sections/home-hero.tsx) — uses only `<video src=…>`.
- **Impact:** Chrome/Firefox can't take advantage of VP9's ~15–20% better compression vs H.264.
- **Fix direction:** produce `hero.webm` via `ffmpeg -i hero.mp4 -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 -an hero.webm`, then switch the component to `<video><source type="video/webm">...<source type="video/mp4">...</video>`.

## Content

### 5. Internal planning copy leaks into the public site

- **Where:** [src/data/site-content.ts](src/data/site-content.ts) lines ~447–454 (`callout` / rebuild section).
- **Current copy (en):** "START THE REBUILD / A local-first codebase ready for Netlify, GitHub, and future media expansion." and "This MVP is built to launch without Shopify dependencies today while leaving clean extension points…"
- **Impact:** visitors see engineering-internal language on the marketing page.
- **Fix direction:** replace with marketing copy for both locales, or move behind a feature flag until real copy is ready.

## Housekeeping

### 6. Dead code from the old hero scroll-scrubber

After the hero switch to `<video>`, these are unreferenced:

- [src/components/motion/image-sequence.tsx](src/components/motion/image-sequence.tsx)
- [src/data/hero-frames.ts](src/data/hero-frames.ts)
- [scripts/build-hero-frames.mjs](scripts/build-hero-frames.mjs) (also the `build:hero` npm script in `package.json`)
- [public/media/hero/frames/](public/media/hero/frames/) — pre-rendered webp frames
- Old `.image-sequence-*` CSS — already removed from `globals.css`, leaving for grep confirmation

**Fix direction:** delete after verifying nothing else imports them.

### 7. Lint warnings in `deployment-cycle-section.tsx`

```
src/components/deployment-cycle-section.tsx
  35:3  warning  'kicker' is defined but never used
  36:3  warning  'title' is defined but never used
```

Either wire them into the section header or drop them from destructuring. Low priority.

## Verified working (for context)

These were QA'd during the Phase 1 hero spike and are NOT tech debt — listed for traceability:

- Hero video autoplays muted, loops, `playsInline` on both `/en` and `/zh`
- `prefers-reduced-motion: reduce` hides the video and keeps the poster (`display: none` on `.hero-media-video`)
- Mobile viewport (390×844) keeps the copy panel readable over the video
- No JS console errors on either locale at 1440×900 or 390×844
