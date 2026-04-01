# Personal Website Redesign — loterio.me

## Overview

Redesign Natan Loterio's personal professional webpage with a dark, elegant, retro CRT terminal aesthetic. Pure HTML + CSS, no build step, no framework.

## Visual Identity

- **Background:** `#0a0a0a` (near-black)
- **Primary text:** `#33ff33` (phosphor green)
- **Dimmed text:** `#1a9e1a` (muted green for secondary info)
- **Accent:** `#66ff66` (bright green for links/highlights)
- **Subtle border:** `#1a331a`
- **Font:** `IBM Plex Mono` via Google Fonts, fallback `"Courier New", monospace`

## CRT Effects (pure CSS)

- Faint scanline overlay via repeating `linear-gradient` on `::after` (~5% opacity)
- Subtle green `text-shadow` glow on headings (`0 0 8px rgba(51,255,51,0.3)`)
- Blinking cursor (`_`) after hero tagline via CSS animation
- No JavaScript required

## Layout

- Single column, max-width `700px`, centered
- Generous vertical spacing
- No nav bar — vertical scroll only
- Mobile-responsive via media queries

## Content Structure

### Hero
- Name in lowercase (terminal style): `natan loterio_` with blinking cursor
- Tagline: "Co-founding pitaia.me | Previously Tech Lead @ HUGO BOSS"
- Location: Lisbon, Portugal

### About
Short paragraph: 15+ years experience, currently building pitaia.me, background at HUGO BOSS and FARFETCH.

### Experience (curated — 4 roles)
1. **Founder — pitaia.me** (2026–present): Building something new.
2. **Tech Lead — HUGO BOSS** (2025–2026): Android architecture modernization and performance.
3. **Android Engineer — FARFETCH** (2021–2025): Jetpack Compose, CI/CD (15min to 2.5min), architecture modernization, DI rollout.
4. **Architecture Analyst — Cecred** (2018–2019): Corporate innovation, R$5M savings.

### Contact
- natanloterio@gmail.com
- linkedin.com/in/natanloterio
- github.com/natanloterio

### Footer
Terminal-style: `$ echo "thanks for visiting"`

## Technical Decisions

- **Pure HTML + CSS:** Zero dependencies, deploy anywhere (GitHub Pages, Vercel, etc.)
- **Single file:** Everything in `index.html` for maximum simplicity
- **Google Fonts:** Single external dependency (IBM Plex Mono), loaded with `display=swap`
- **No JavaScript:** All effects achieved via CSS animations and pseudo-elements
