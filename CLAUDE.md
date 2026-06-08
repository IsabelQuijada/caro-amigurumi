# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page marketing/portfolio site for Carolina Quijada's handmade crochet (amigurumi) business, built with React 19 + Vite. Spanish-language content (`lang="es-MX"`).

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run lint` — run ESLint over the project
- `npm run preview` — preview the production build locally

There is no test suite configured.

## Architecture

The app is a single page (`src/App.jsx`) composed of section components rendered in order, each its own `<section>` with an `id` used for in-page nav anchors and scroll-spy:

```
Nav → Hero → Work → Process → About → Contact → Footer
```

- **Sections live in `src/components/<Name>/`**, each pairing a `.jsx` with a co-located `.module.css` (CSS Modules). Shared/global styles and CSS custom properties (color palette, fonts, radii, shadows) live in `src/styles/globals.css`.
- **Content data is centralized in `src/data/collections.js`** — the `collections` array (gallery groups with id/label/title/desc/theme/slides) drives `Work`/`WorkCard`/`Carousel`, and `processSteps` drives the `Process` section. Adding/editing portfolio images or process steps means editing this file, not the components.
- **Images are static assets served from `public/Assets/<category>/...`** (e.g. `especiales`, `animales`, `munecas`, `serieNavidad`, `flores`) and referenced by absolute path (`/Assets/...`) in `collections.js`.
- **Reusable behavior is extracted into hooks in `src/hooks/`**:
  - `useFadeIn` — IntersectionObserver-based scroll-reveal (adds `fade-in`/`visible` classes)
  - `useCarousel` — carousel state machine (current index, next/prev, autoplay timer, progress %)
  - `useActiveSection` — scroll-spy for nav active-link highlighting based on section IDs
  - `useScrolled` — boolean for whether the page has scrolled past a threshold (used for sticky-nav styling)
- **Carousel** (`components/Work/Carousel.jsx`) handles touch/swipe, keyboard arrow navigation, autoplay on hover, and ARIA live-region updates — built on top of `useCarousel`.
- **Contact** integrates with WhatsApp via a `wa.me` deep link (phone number and prefilled message are constants at the top of `Contact.jsx`), not a contact form.
- Styling uses CSS custom properties defined in `:root` in `globals.css` (e.g. `--terracotta`, `--cream`, `--font-serif`) — reuse these tokens rather than hardcoding colors/fonts in module CSS.
- Section components commonly call `useFadeIn()` and attach the returned ref to their header/wrapper for the scroll-reveal animation; follow this pattern when adding new sections.
