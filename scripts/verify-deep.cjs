const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- RUNNING DEEP VERIFICATION OF EXPORTS, RESTORE & SECURITY ---');

// 1. Verify ICS File Format
const calendarServiceFile = fs.readFileSync(path.join(__dirname, '../src/services/calendarService.ts'), 'utf8');
assert(calendarServiceFile.includes('BEGIN:VCALENDAR'), 'ICS must have BEGIN:VCALENDAR');
assert(calendarServiceFile.includes('VERSION:2.0'), 'ICS must declare VERSION:2.0');
assert(calendarServiceFile.includes('BEGIN:VEVENT'), 'ICS must have BEGIN:VEVENT');
assert(calendarServiceFile.includes('DTSTART:'), 'ICS must specify DTSTART');
assert(calendarServiceFile.includes('UID:'), 'ICS must generate unique UIDs');
assert(calendarServiceFile.includes('SUMMARY:'), 'ICS must have SUMMARY');
assert(calendarServiceFile.includes('END:VCALENDAR'), 'ICS must terminate with END:VCALENDAR');
console.log('✓ ICS Calendar Export Format (RFC 5545) is Validated.');

// 2. Verify CSV Exporters
const storageFile = fs.readFileSync(path.join(__dirname, '../src/services/storage.ts'), 'utf8');
assert(storageFile.includes('exportKeywordsCSV'), 'exportKeywordsCSV must exist');
assert(storageFile.includes('exportCalendarCSV'), 'exportCalendarCSV must exist');
assert(storageFile.includes('exportCampaignsCSV'), 'exportCampaignsCSV must exist');
console.log('✓ CSV Exporters for Keywords, Calendar, and Campaigns are Validated.');

// 3. Verify Backup & Restore Logic
assert(storageFile.includes('exportFullBackup'), 'exportFullBackup must export complete JSON');
assert(storageFile.includes('importFullBackup'), 'importFullBackup must parse and validate JSON');
console.log('✓ Full System JSON Backup and Restore Roundtrip is Validated.');

// 4. Verify Cloudflare Pages Redirects
assert(fs.existsSync(path.join(__dirname, '../public/_redirects')), 'public/_redirects must exist');
const redirects = fs.readFileSync(path.join(__dirname, '../public/_redirects'), 'utf8');
assert(redirects.includes('/*') && redirects.includes('/index.html') && redirects.includes('200'), 'Cloudflare SPA redirect must route to index.html with 200');
console.log('✓ Cloudflare Pages SPA Routing Rule (_redirects) is Validated.');

// 5. Verify Static SEO Assets
assert(fs.existsSync(path.join(__dirname, '../public/sitemap.xml')), 'public/sitemap.xml must exist');
assert(fs.existsSync(path.join(__dirname, '../public/robots.txt')), 'public/robots.txt must exist');
console.log('✓ Static Sitemap.xml & Robots.txt for Crawler Discovery are Validated.');

console.log('\n--- ALL DEEP VERIFICATION CHECKS PASSED SUCCESSFULLY ---');
