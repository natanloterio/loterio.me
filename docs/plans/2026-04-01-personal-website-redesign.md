# Personal Website Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign loterio.me as a dark, retro CRT terminal-style professional page using pure HTML + CSS.

**Architecture:** Single `index.html` file with inline `<style>`. IBM Plex Mono from Google Fonts. CRT effects via CSS pseudo-elements and animations. No JavaScript.

**Tech Stack:** HTML5, CSS3, Google Fonts

---

### Task 1: Rewrite index.html with full content and styling

**Files:**
- Modify: `index.html`

**Step 1: Replace index.html with the complete redesigned page**

The full page includes:
- Google Fonts `<link>` for IBM Plex Mono
- Inline `<style>` block with:
  - CSS custom properties for the color palette
  - Base styles (background, font, layout)
  - CRT scanline overlay via `body::after` pseudo-element
  - Blinking cursor animation via `@keyframes`
  - Section heading styles with green text-shadow glow
  - Experience entries styled as terminal output with `>` prefix
  - Contact links as plain monospace text
  - Terminal-style footer
  - Mobile responsive media query (reduce font-size, padding at <600px)
- Semantic HTML structure:
  - `<header>`: name with `.cursor` span, tagline lines, location
  - `<section class="about">`: heading + paragraph
  - `<section class="experience">`: heading + 4 role entries
  - `<section class="contact">`: heading + 3 links
  - `<footer>`: `$ echo "thanks for visiting"`

**Step 2: Open in browser and verify**

Run: open `index.html` in a browser (or `python3 -m http.server 8000`)

Verify:
- Dark background with green monospace text
- Faint scanline effect visible
- Blinking cursor after name
- Headings have subtle green glow
- All 4 experience entries render correctly
- Contact links are clickable
- Footer shows terminal command
- Page is responsive on mobile viewport

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: redesign website with CRT terminal aesthetic"
```

---

### Task 2: Verify and clean up

**Files:**
- Verify: `index.html`
- Remove (if present): any unused files

**Step 1: Validate HTML**

Check that the HTML is valid — no unclosed tags, proper doctype, lang attribute.

**Step 2: Test responsiveness**

Resize browser to mobile width (<600px) and verify:
- Text doesn't overflow
- Padding adjusts
- Readability is maintained

**Step 3: Final commit if any fixes needed**

```bash
git add index.html
git commit -m "fix: address any validation or responsive issues"
```
