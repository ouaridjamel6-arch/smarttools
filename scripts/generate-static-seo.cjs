const fs = require('fs');
const path = require('path');

const baseUrl = (process.env.SMARTTOOLS_BASE_URL || process.env.VITE_SITE_URL || 'https://smarttools-um7.pages.dev').replace(/\/$/, '');
const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

const staticPages = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: '/privacy', changefreq: 'monthly', priority: '0.4' },
  { path: '/terms', changefreq: 'monthly', priority: '0.4' },
  { path: '/about', changefreq: 'monthly', priority: '0.5' },
  { path: '/contact', changefreq: 'monthly', priority: '0.5' },
];

const tools = [
  'qr-code-generator',
  'image-compressor',
  'word-counter',
  'password-generator',
  'json-formatter-validator',
  'base64-encoder-decoder',
  'color-converter-palette',
  'markdown-to-html-previewer',
];

const languages = ['en', 'fr', 'ar'];
const today = new Date().toISOString().slice(0, 10);

// Generate sitemap.xml
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

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

tools.forEach((slug) => {
  languages.forEach((lang) => {
    const loc = `${baseUrl}/tool/${slug}?lang=${lang}`;
    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    languages.forEach((altLang) => {
      const altLoc = `${baseUrl}/tool/${slug}?lang=${altLang}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altLoc}" />\n`;
    });
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/tool/${slug}" />\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });
});

xml += `</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');

// Generate robots.txt
const robots = `# SMARTTOOLS robots.txt
User-agent: *
Allow: /
Disallow: /growth-center

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

// If dist directory exists, copy directly to dist
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8');
  if (fs.existsSync(path.join(publicDir, '_redirects'))) {
    fs.copyFileSync(path.join(publicDir, '_redirects'), path.join(distDir, '_redirects'));
  }
}

console.log('Generated sitemap.xml and robots.txt in public/ and dist/ successfully.');
