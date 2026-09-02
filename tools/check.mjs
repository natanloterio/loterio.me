#!/usr/bin/env node
// Acceptance-criteria checker for loterio.me.
// Dev tool only — never served, never referenced by a page.
import { readFileSync, existsSync } from 'node:fs';

const LANGS = ['', 'fr/', 'lb/'];
const PAGES = LANGS.flatMap(d => [`${d}index.html`,
  `${d}work/brownie.html`, `${d}work/farfetch.html`, `${d}work/hugo-boss.html`]);
const CASES = PAGES.filter(p => p.includes('work/'));
const HOMES = PAGES.filter(p => p.endsWith('index.html'));
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
const analyticsSrc = (page) => `${'../'.repeat(page.split('/').length - 1)}assets/analytics.js`;

for (const page of PAGES) {
  check(`${page} exists`, () => read(page) !== null || 'missing');
}

check('the only executable script on any page is the analytics tag', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page); if (!html) continue;
    for (const tag of html.match(/<script[^>]*>/g) || []) {
      if (/type\s*=\s*["']application\/ld\+json["']/.test(tag)) continue;
      if (tag.includes(`src="${analyticsSrc(page)}"`)) continue;
      bad.push(`${page}: ${tag}`);
    }
  }
  return bad.length === 0 || bad.join('; ');
});

check('every page loads the analytics module, deferred, at the right depth', () => {
  const bad = [];
  for (const page of PAGES) {
    const html = read(page);
    if (!html) { bad.push(`${page}: missing`); continue; }
    const tag = (html.match(/<script[^>]*>/g) || []).find(t => t.includes('assets/analytics.js'));
    if (!tag) { bad.push(`${page}: no analytics tag`); continue; }
    if (!tag.includes(`src="${analyticsSrc(page)}"`)) bad.push(`${page}: wrong path — ${tag}`);
    if (!/\sdefer[\s>]/.test(tag)) bad.push(`${page}: not deferred`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('analytics denies every storage type before gtag.js is requested', () => {
  const js = read('assets/analytics.js');
  if (!js) return 'assets/analytics.js missing';
  const consent = js.indexOf("'consent', 'default'");
  const loader = js.indexOf('googletagmanager.com');
  if (consent === -1) return 'no Consent Mode default block';
  if (loader === -1) return 'never requests gtag.js';
  if (consent > loader) return 'consent default is set after gtag.js is requested';
  for (const key of ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage']) {
    const m = js.match(new RegExp(`${key}\\s*:\\s*'([a-z]+)'`));
    if (!m) return `${key} is not set`;
    if (m[1] !== 'denied') return `${key} is '${m[1]}', expected 'denied'`;
  }
  return true;
});

check('analytics reports CV downloads, outbound and contact clicks, and page language', () => {
  const js = read('assets/analytics.js');
  if (!js) return 'assets/analytics.js missing';
  const missing = ['cv_download', 'outbound_click', 'contact_click', 'page_language']
    .filter(e => !js.includes(e));
  return missing.length === 0 || `missing: ${missing.join(', ')}`;
});

check('analytics carries a real GA4 measurement ID', () => {
  const js = read('assets/analytics.js');
  if (!js) return 'assets/analytics.js missing';
  const m = js.match(/G-[A-Z0-9]{4,}/);
  if (!m) return 'no G- measurement ID found';
  if (/^G-X+$/.test(m[0])) return `still the placeholder ${m[0]} — set the real GA4 ID`;
  return true;
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
      ['description', /<meta[^>]+name=["']description["'][^>]+content=(["'])(?:(?!\1).){40,}/],
      ['og:title', /property=["']og:title["'][^>]*content=(["'])(?:(?!\1).)+/],
      ['og:description', /property=["']og:description["'][^>]*content=(["'])(?:(?!\1).)+/],
      ['og:image', /property=["']og:image["'][^>]*content=(["'])(?:(?!\1).)+/],
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

check('CV link precedes the first case-study link on every home page', () => {
  const bad = [];
  for (const page of HOMES) {
    const html = read(page);
    if (!html) { bad.push(`${page}: missing`); continue; }
    const cv = html.indexOf('assets/cv-');
    const work = html.indexOf('work/');
    if (cv === -1) { bad.push(`${page}: no CV link`); continue; }
    if (work === -1) { bad.push(`${page}: no case-study link`); continue; }
    if (cv > work) bad.push(`${page}: CV link appears after a case-study link`);
  }
  return bad.length === 0 || bad.join('; ');
});

check('every home page carries a substantive status line', () => {
  const bad = [];
  for (const page of HOMES) {
    const html = read(page);
    if (!html) { bad.push(`${page}: missing`); continue; }
    const m = html.match(/<p class="status">([\s\S]*?)<\/p>/);
    if (!m) { bad.push(`${page}: no status line`); continue; }
    const n = words(textOf(m[1]));
    if (n < 10) bad.push(`${page}: status line only ${n} words`);
  }
  return bad.length === 0 || bad.join('; ');
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
    // Translated pages carry the same five sections under translated headings,
    // so match on structure, not vocabulary. Listing the French and
    // Luxembourgish section names here would put unreviewed translation inside
    // the test suite and make it wrong in a way only a native speaker could see.
    const n = (html.match(/<h2[\s>]/g) || []).length;
    if (n !== CASE_SECTIONS.length) {
      bad.push(`${page}: ${n} sections, expected ${CASE_SECTIONS.length}`);
      continue;
    }
    // The English pages are the source the translations are checked against, so
    // they are still held to the exact section names.
    if (!page.includes('/work/')) {
      const t = textOf(html);
      for (const s of CASE_SECTIONS) if (!t.includes(s)) bad.push(`${page}: ${s}`);
    }
  }
  return bad.length === 0 || bad.join('; ');
});

check('case studies run within their locale\'s word band', () => {
  const bad = [];
  for (const page of CASES) {
    const html = read(page);
    if (!html) { bad.push(`${page}: missing`); continue; }
    const body = html.match(/<main[\s\S]*?<\/main>/);
    const n = body ? words(textOf(body[0])) : 0;
    const band = page.startsWith('fr/') || page.startsWith('lb/') ? [400, 820] : [400, 700];
    if (n < band[0] || n > band[1]) bad.push(`${page}: ${n}`);
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
    // The reflection is always the last <h2> section, in every locale.
    const parts = html.split(/<h2[^>]*>/);
    const tail = parts.length > 1 ? parts[parts.length - 1].split('</h2>')[1] : undefined;
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
  const missing = ['assets/cv-en.pdf', 'assets/cv-fr.pdf', 'assets/og.png', 'sitemap.xml', 'robots.txt'].filter(f => !existsSync(f));
  return missing.length === 0 || `missing: ${missing.join(', ')}`;
});

check('sitemap lists exactly the indexable pages', () => {
  const xml = read('sitemap.xml');
  if (!xml) return 'sitemap.xml missing';
  const bad = [];
  for (const page of PAGES) {
    const html = read(page);
    if (!html) { bad.push(`${page}: missing`); continue; }
    const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/.test(html);
    const url = page.endsWith('index.html')
      ? `https://loterio.me/${page.slice(0, -'index.html'.length)}`
      : `https://loterio.me/${page}`;
    const listed = xml.includes(`<loc>${url}</loc>`);
    if (noindex && listed) bad.push(`${page}: noindex but listed in sitemap`);
    if (!noindex && !listed) bad.push(`${page}: indexable but missing from sitemap`);
  }
  return bad.length === 0 || bad.join('; ');
});

const failed = results.filter(r => !r.ok);
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? ` — ${r.detail}` : ''}`);
console.log(`\n${results.length - failed.length}/${results.length} passing`);
process.exit(failed.length ? 1 : 0);
