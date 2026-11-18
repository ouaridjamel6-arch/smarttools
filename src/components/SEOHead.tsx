import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Language } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { StorageService } from '../services/storage';

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
  const { language, dir } = useI18n();
  const location = useLocation();
  const settings = StorageService.getSettings();
  const baseUrl = settings.siteBaseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://smarttools.app');
  const fullCanonical = `${baseUrl}${canonicalPath || location.pathname}`;

  useEffect(() => {
    // Document Title
    document.title = title ? `${title} — SMARTTOOLS` : 'SMARTTOOLS — Free Fast Online Productivity Tools';

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonical);

    // Dynamic Hreflang alternates
    const langs: Language[] = ['en', 'fr', 'ar'];
    langs.forEach((l) => {
      let hreflang = document.querySelector(`link[rel="alternate"][hreflang="${l}"]`);
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', l);
        document.head.appendChild(hreflang);
      }
      hreflang.setAttribute('href', `${fullCanonical}?lang=${l}`);
    });

    // Default hreflang
    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', fullCanonical);

    // JSON-LD Schema.org
    if (schemaJson) {
      const existingScript = document.getElementById('seo-json-ld');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.id = 'seo-json-ld';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schemaJson);
      document.head.appendChild(script);
    }
  }, [title, description, fullCanonical, language, schemaJson]);

  return null;
};
