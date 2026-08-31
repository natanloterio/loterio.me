#!/usr/bin/env node
// Acceptance-criteria checker for loterio.me.
// Dev tool only — never served, never referenced by a page.
import { readFileSync, existsSync } from 'node:fs';

const PAGES = ['index.html', 'work/brownie.html', 'work/farfetch.html', 'work/hugo-boss.html'];
const CASES = PAGES.slice(1);
const CASE_SECTIONS = ['Problem', 'Constraint', 'Decisions', 'Result', "What I'd do differently"];
const TOKENS = ['--bg', '--surface', '--text', '--muted', '--accent', '--rule',
                '--mono', '--sans', '--measure', '--page'];

const results = [];
const check = (name, fn) => {
  let outcome;
  try { outcome = fn(); } catch (e) { outcome = e.message; }
  results.push({ name, ok: outcome === true, detail: outcome === true ? '' : outcome });
};
const read = (p) => existsSync(p) ? readFileSync(p, 'utf8') : null;
const textOf = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z]+;/g, ' ');
const words = (s) => s.split(/\s+/).filter(Boolean).length;

for (const page of PAGES) {
  check(`${page} exists`, () => read(page) !== null || 'missing');
}

check('no executable script tags', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) continue;
    for (const tag of html.match(/<script[^>]*>/g) || []) {
      if (!/type\s*=\s*["']application\/ld\+json["']/.test(tag)) bad.push(`${page}: ${tag}`);
    }
  }
  return bad.length === 0 || bad.join('; ');
});

check('every page under 400 lines', () => {
  const over = PAGES.filter(p => read(p) && read(p).split('\n').length >= 400);
  return over.length === 0 || `too long: ${over.join(', ')}`;
});

check('exactly one h1 per page', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) { bad.push(`${page}: missing`); continue; }
    const n = (html.match(/<h1[\s>]/g) || []).length;
    if (n !== 1) bad.push(`${page}: ${n}`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('no skipped heading levels', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) continue;
    const levels = (html.match(/<h([1-6])[\s>]/g) || []).map(t => Number(t[2]));
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) bad.push(`${page}: h${levels[i - 1]} then h${levels[i]}`);
    }
  }
  return bad.length === 0 || bad.join('; ');
});

check('lang attribute on every page', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) { bad.push(page); continue; }
    if (!/<html[^>]+lang=/.test(html)) bad.push(page);
  }
  return bad.length === 0 || bad.join(', ');
});

check('every page has title, description and Open Graph tags', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) { bad.push(`${page}: missing`); continue; }
    for (const [label, re] of [
      ['title', /<title>[^<]{10,}<\/title>/],
      ['description', /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{40,}/],
      ['og:title', /property=["']og:title["'][^>]*content=["'][^"']+/],
      ['og:description', /property=["']og:description["'][^>]*content=["'][^"']+/],
      ['og:image', /property=["']og:image["'][^>]*content=["'][^"']+/],
    ]) if (!re.test(html)) bad.push(`${page}: ${label}`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('no img without alt', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) continue;
    for (const tag of html.match(/<img[^>]*>/g) || []) if (!/\salt=/.test(tag)) bad.push(`${page}: ${tag}`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('no inline styles', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) continue;
    if (/<style[\s>]/.test(html)) bad.push(`${page}: <style> block`);
    if (/\sstyle\s*=\s*["']/.test(html)) bad.push(`${page}: style attribute`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('CV link precedes the first case-study link on the home page', () => {
  const html = read('index.html'); if (!html) return 'index.html missing';
  const cv = html.indexOf('assets/cv.pdf');
  const work = html.indexOf('work/');
  if (cv === -1) return 'no CV link';
  if (work === -1) return 'no case-study link';
  return cv < work || 'CV link appears after a case-study link';
});

check('home page states availability and relocation', () => {
  const html = read('index.html'); if (!html) return 'index.html missing';
  const t = textOf(html);
  return (/\bAvailable\b/.test(t) && /\brelocation\b/i.test(t)) || 'missing availability or relocation line';
});

check('home page carries schema.org Person JSON-LD', () => {
  const html = read('index.html'); if (!html) return 'index.html missing';
  const m = html.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/);
  if (!m) return 'no JSON-LD block';
  const data = JSON.parse(m[1]);
  return data['@type'] === 'Person' || `@type is ${data['@type']}`;
});

check('case studies carry all five sections', () => {
  const bad = [];
  for (const page of CASES) {
    const html = read(page);
    if (!html) { bad.push(`${page}: missing`); continue; }
    const t = textOf(html);
    for (const s of CASE_SECTIONS) if (!t.includes(s)) bad.push(`${page}: ${s}`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('case studies run 400-700 words', () => {
  const bad = [];
  for (const page of CASES) {
    const html = read(page);
    if (!html) { bad.push(`${page}: missing`); continue; }
    const body = html.match(/<main[\s\S]*?<\/main>/);
    const n = body ? words(textOf(body[0])) : 0;
    if (n < 400 || n > 700) bad.push(`${page}: ${n}`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('every case study cites at least one number', () => {
  const bad = CASES.filter(p => !read(p) || !/\d/.test(textOf(read(p).match(/<main[\s\S]*?<\/main>/)?.[0] || '')));
  return bad.length === 0 || bad.join(', ');
});

check('stylesheet defines every token in both schemes', () => {
  const css = read('assets/site.css'); if (!css) return 'assets/site.css missing';
  const missing = TOKENS.filter(t => !css.includes(`${t}:`));
  if (missing.length) return `missing: ${missing.join(', ')}`;
  if (!css.includes('prefers-color-scheme: dark')) return 'no dark scheme';
  if (!css.includes('@media print')) return 'no print styles';
  return true;
});

check('every case study answers "what I\'d do differently"', () => {
  const bad = [];
  for (const page of CASES) {
    const html = read(page);
    if (!html) { bad.push(`${page}: missing`); continue; }
    const tail = html.split(/<h2[^>]*>\s*What I'd do differently\s*<\/h2>/)[1];
    if (tail === undefined) { bad.push(`${page}: no heading`); continue; }
    const n = words(textOf(tail.split('</main>')[0]));
    if (n < 20) bad.push(`${page}: ${n} words — author input A1 outstanding`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('no author-input markers left in shipped HTML', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) continue;
    for (const c of html.match(/<!--[\s\S]*?-->/g) || []) {
      if (/\bA[1-5]\b|Natan writes|Do not invent|TODO|TBD/i.test(c)) bad.push(`${page}: ${c.slice(0, 60)}`);
    }
  }
  return bad.length === 0 || bad.join('; ');
});

check('every page under 50KB', () => {
  const over = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) continue;
    const kb = Buffer.byteLength(html, 'utf8') / 1024;
    if (kb > 50) over.push(`${page}: ${kb.toFixed(1)}KB`);
  }
  return over.length === 0 || over.join('; ');
});

check('CV, OG image, sitemap and robots.txt exist', () => {
  const missing = ['assets/cv.pdf', 'assets/og.png', 'sitemap.xml', 'robots.txt'].filter(f => !existsSync(f));
  return missing.length === 0 || `missing: ${missing.join(', ')}`;
});

check('sitemap lists every page', () => {
  const xml = read('sitemap.xml'); if (!xml) return 'sitemap.xml missing';
  const missing = PAGES.filter(p => !xml.includes(p === 'index.html' ? 'loterio.me/' : p));
  return missing.length === 0 || `missing: ${missing.join(', ')}`;
});

const failed = results.filter(r => !r.ok);
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? ` — ${r.detail}` : ''}`);
console.log(`\n${results.length - failed.length}/${results.length} passing`);
process.exit(failed.length ? 1 : 0);
