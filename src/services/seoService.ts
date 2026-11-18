import { TOOLS_DATA } from '../data/toolsData';
import { Language, ToolDefinition } from '../types';

export const SeoService = {
  // Generate JSON-LD Structured Data
  generateToolSchema(tool: ToolDefinition, lang: Language, baseUrl: string = 'https://smarttools.app') {
    const pageUrl = `${baseUrl}/tool/${tool.slug}?lang=${lang}`;
    
    // SoftwareApplication Schema
    const softwareAppSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': `SMARTTOOLS ${tool.name[lang]}`,
      'applicationCategory': 'UtilitiesApplication',
      'operatingSystem': 'All (Web Browser)',
      'browserRequirements': 'Requires JavaScript. Works on Chrome, Firefox, Safari, Edge.',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
      },
      'url': pageUrl,
      'description': tool.description[lang],
      'featureList': tool.features[lang].join(', '),
      'inLanguage': lang,
    };

    // FAQPage Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': tool.faq[lang].map((f) => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.a,
        },
      })),
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'SMARTTOOLS',
          'item': baseUrl,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': tool.name[lang],
          'item': pageUrl,
        },
      ],
    };

    return [softwareAppSchema, faqSchema, breadcrumbSchema];
  },

  // Generate XML Sitemap with multi-lingual alternate hreflang links
  generateSitemapXml(baseUrl: string = 'https://smarttools.app'): string {
    const staticPages = [
      { path: '', changefreq: 'daily', priority: '1.0' },
      { path: '/privacy', changefreq: 'monthly', priority: '0.4' },
      { path: '/terms', changefreq: 'monthly', priority: '0.4' },
      { path: '/about', changefreq: 'monthly', priority: '0.5' },
      { path: '/contact', changefreq: 'monthly', priority: '0.5' },
    ];

    const today = new Date().toISOString().slice(0, 10);
    const languages: Language[] = ['en', 'fr', 'ar'];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    // Static pages across languages
    staticPages.forEach((p) => {
      languages.forEach((lang) => {
        const loc = `${baseUrl}${p.path}${p.path.includes('?') ? '&' : '?'}lang=${lang}`;
        xml += `  <url>\n`;
        xml += `    <loc>${loc}</loc>\n`;
        languages.forEach((altLang) => {
          const altLoc = `${baseUrl}${p.path}${p.path.includes('?') ? '&' : '?'}lang=${altLang}`;
          xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}" />\n`;
        });
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${p.path}" />\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
        xml += `    <priority>${p.priority}</priority>\n`;
        xml += `  </url>\n`;
      });
    });

    // Tool pages across languages
    TOOLS_DATA.forEach((tool) => {
      languages.forEach((lang) => {
        const loc = `${baseUrl}/tool/${tool.slug}?lang=${lang}`;
        xml += `  <url>\n`;
        xml += `    <loc>${loc}</loc>\n`;
        languages.forEach((altLang) => {
          const altLoc = `${baseUrl}/tool/${tool.slug}?lang=${altLang}`;
          xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}" />\n`;
        });
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/tool/${tool.slug}" />\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });
    });

    xml += `</urlset>`;
    return xml;
  },

  // Generate robots.txt
  generateRobotsTxt(baseUrl: string = 'https://smarttools.app'): string {
    return `# SMARTTOOLS robots.txt
User-agent: *
Allow: /
Disallow: /growth-center
Disallow: /admin

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`;
  },

  // Generate ads.txt
  generateAdsTxt(pubId: string): string {
    const cleanId = pubId.trim().replace(/^ca-pub-/, 'pub-');
    if (!cleanId) {
      return `# Google AdSense ads.txt for SMARTTOOLS
# Configure your Publisher ID in Growth Center > Settings
# Example: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;
    }
    return `# Google AdSense ads.txt for SMARTTOOLS
google.com, pub-${cleanId.replace('pub-', '')}, DIRECT, f08c47fec0942fa0
`;
  },
};
