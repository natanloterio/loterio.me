// Google Analytics 4 for loterio.me.
//
// Cookieless by design: Consent Mode v2 denies every storage type before
// gtag.js is ever requested, so GA4 receives pings but never writes a cookie
// and the site needs no consent banner. Returning-visitor identity is the
// deliberate price.
//
// This is the only executable script the site ships. tools/check.mjs asserts
// nothing else creeps in beside it.

(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-LQCMBKDJ0T';
  var CV_FILE = /\/assets\/cv-[a-z]{2}\.pdf$/i;

  var language = document.documentElement.lang || 'unknown';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Must precede the loader below. Once gtag.js runs the default is locked in,
  // and a default that arrives late is a cookie already written.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  gtag('js', new Date());

  // page_language distinguishes which translation was read, which the built-in
  // `language` dimension cannot — that one reports the browser's preference.
  gtag('config', MEASUREMENT_ID, { page_language: language });

  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(loader);

  // One delegated listener rather than per-link attributes, so the markup
  // stays free of tracking hooks.
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest && event.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    if (href.indexOf('mailto:') === 0) {
      gtag('event', 'contact_click', { link_url: href, page_language: language });
      return;
    }

    var url;
    try { url = new URL(link.href, window.location.href); } catch (e) { return; }

    if (CV_FILE.test(url.pathname)) {
      gtag('event', 'cv_download', {
        file_name: url.pathname.split('/').pop(),
        page_language: language
      });
      return;
    }

    if (url.host && url.host !== window.location.host) {
      gtag('event', 'outbound_click', {
        link_domain: url.host,
        link_url: url.href,
        page_language: language
      });
    }
  });
})();
