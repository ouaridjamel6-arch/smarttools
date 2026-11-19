import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Language } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { SeoService } from '../services/seoService';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schemaJson?: any;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  schemaJson,
}) => {
  const { language } = useI18n();
  const location = useLocation();
  const baseUrl = SeoService.getBaseUrl();

  useEffect(() => {
    // 1. Calculate URLs safely
    const path = canonicalPath || location.pathname;
    const cleanUrl = new URL(path, baseUrl);

    // Create base canonical (no query params)
    const baseCanonical = `${cleanUrl.origin}${cleanUrl.pathname}`;

    // Create language-specific canonical
    const langCanonical = new URL(baseCanonical);
    langCanonical.searchParams.set('lang', language);
    const finalCanonical = langCanonical.toString();

    // 2. DOM Management Helpers
    const setMetaTag = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      const isNew = !el;
      if (isNew) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      const element = el as HTMLMetaElement;
      const original = element.getAttribute('content');
      element.setAttribute('content', content);
      return { el: element, original, isNew };
    };

    const setLinkTag = (rel: string, hreflang: string | null, href: string) => {
      let selector = `link[rel="${rel}"]`;
      if (hreflang) selector += `[hreflang="${hreflang}"]`;
      else selector += ':not([hreflang])';

      let el = document.querySelector(selector);
      const isNew = !el;
      if (isNew) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (hreflang) el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
      }
      const element = el as HTMLLinkElement;
      const original = element.getAttribute('href');
      element.setAttribute('href', href);
      return { el: element, original, isNew };
    };

    // Document Title
    const originalTitle = document.title;
    document.title = title ? `${title} — SMARTTOOLS` : 'SMARTTOOLS — Free Fast Online Productivity Tools';

    // Meta Description
    const metaDesc = setMetaTag('description', description);

    // Canonical link
    const canonical = setLinkTag('canonical', null, finalCanonical);

    // Dynamic Hreflang alternates
    const langs: Language[] = ['en', 'fr', 'ar'];
    const hreflangs = langs.map((l) => {
      const url = new URL(baseCanonical);
      url.searchParams.set('lang', l);
      return setLinkTag('alternate', l, url.toString());
    });

    // x-default
    const xDefault = setLinkTag('alternate', 'x-default', baseCanonical);

    // JSON-LD
    let script: HTMLScriptElement | null = null;
    if (schemaJson) {
      script = document.createElement('script');
      script.id = 'seo-json-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaJson);
      document.head.appendChild(script);
    }

    // Cleanup
    return () => {
      document.title = originalTitle;

      // Restore/Remove Meta
      if (metaDesc.isNew) metaDesc.el.remove();
      else if (metaDesc.original) metaDesc.el.setAttribute('content', metaDesc.original);
      else metaDesc.el.removeAttribute('content');

      // Restore/Remove Canonical
      if (canonical.isNew) canonical.el.remove();
      else if (canonical.original) canonical.el.setAttribute('href', canonical.original);
      else canonical.el.removeAttribute('href');

      // Restore/Remove Hreflangs
      hreflangs.forEach((h) => {
        if (h.isNew) h.el.remove();
        else if (h.original) h.el.setAttribute('href', h.original);
        else h.el.removeAttribute('href');
      });

      // Restore/Remove x-default
      if (xDefault.isNew) xDefault.el.remove();
      else if (xDefault.original) xDefault.el.setAttribute('href', xDefault.original);
      else xDefault.el.removeAttribute('href');

      // Remove JSON-LD
      if (script) script.remove();
    };
  }, [title, description, canonicalPath, language, location.pathname, schemaJson, baseUrl]);

  return null;
};
