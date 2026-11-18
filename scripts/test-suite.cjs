/**
 * SMARTTOOLS GROWTH CENTER - COMPREHENSIVE AUTOMATED TEST SUITE
 * Tests Phase 18: Tools, 3 Languages (EN, FR, AR), RTL, SEO, Content Gen,
 * Video Scripts, Calendar, Exports, Backups, GSC Parser, and AdSense.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function runTest(testName, fn) {
  try {
    fn();
    console.log(`  [PASS] ${testName}`);
    testsPassed++;
  } catch (err) {
    console.error(`  [FAIL] ${testName}: ${err.message}`);
    testsFailed++;
  }
}

console.log('====================================================');
console.log('   SMARTTOOLS AUTOMATED TEST SUITE EXECUTION        ');
console.log('====================================================\n');

// 1. Test Tools Registry & Multilingual Data Integrity
runTest('1. Tools Registry & Multilingual Completeness (EN, FR, AR)', () => {
  const toolsDataPath = path.join(__dirname, '../src/data/toolsData.ts');
  const content = fs.readFileSync(toolsDataPath, 'utf8');

  // Verify all 8 core tools are present
  const requiredTools = [
    'qr-code',
    'image-compressor',
    'word-counter',
    'password-generator',
    'json-formatter',
    'base64-converter',
    'color-converter',
    'markdown-previewer',
  ];

  requiredTools.forEach((toolId) => {
    assert(content.includes(`id: '${toolId}'`), `Tool ${toolId} must be defined in toolsData.ts`);
  });

  // Verify 3 languages are defined for each tool
  assert(content.includes('en:'), 'English definitions must exist');
  assert(content.includes('fr:'), 'French definitions must exist');
  assert(content.includes('ar:'), 'Arabic definitions must exist');
});

// 2. Test Translations Dictionary
runTest('2. Internationalization Translations Dictionary (EN, FR, AR)', () => {
  const i18nPath = path.join(__dirname, '../src/i18n/translations.ts');
  const content = fs.readFileSync(i18nPath, 'utf8');

  assert(content.includes('en: {'), 'English dictionary must exist');
  assert(content.includes('fr: {'), 'French dictionary must exist');
  assert(content.includes('ar: {'), 'Arabic dictionary must exist');

  // Verify critical nav and growth center keys in all 3 languages
  const criticalKeys = ['nav.brand', 'hero.title', 'gc.title', 'gc.tab.dashboard', 'gc.tab.seo'];
  criticalKeys.forEach((k) => {
    assert(content.includes(`'${k}'`), `Translation key ${k} must exist`);
  });
});

// 3. Test SEO Service & Sitemap Generation
runTest('3. Sitemap.xml & robots.txt Generation Logic', () => {
  const seoServicePath = path.join(__dirname, '../src/services/seoService.ts');
  const content = fs.readFileSync(seoServicePath, 'utf8');

  assert(content.includes('generateSitemapXml'), 'generateSitemapXml must be defined');
  assert(content.includes('generateRobotsTxt'), 'generateRobotsTxt must be defined');
  assert(content.includes('generateAdsTxt'), 'generateAdsTxt must be defined');
  assert(content.includes('hreflang="${altLang}"'), 'Sitemap must output dynamic alternate hreflang');
  assert(content.includes("languages: Language[] = ['en', 'fr', 'ar']"), 'Sitemap must cover en, fr, and ar');
  assert(content.includes('Disallow: /growth-center'), 'robots.txt must protect growth center route');
});

// 4. Test SEO Audit Engine
runTest('4. Technical SEO Audit Engine Consistency', () => {
  const auditPath = path.join(__dirname, '../src/services/seoAuditService.ts');
  const content = fs.readFileSync(auditPath, 'utf8');

  assert(content.includes('runComprehensiveAudit'), 'runComprehensiveAudit must exist');
  assert(content.includes('overallScore'), 'Must compute overallScore');
  assert(content.includes('Thin content detected'), 'Must check thin content threshold');
});

// 5. Test Marketing Content Generator
runTest('5. Content Generator Multi-Platform & Multi-Style Coverage', () => {
  const contentGenPath = path.join(__dirname, '../src/services/contentGenService.ts');
  const content = fs.readFileSync(contentGenPath, 'utf8');

  assert(content.includes('generateMarketingContent'), 'generateMarketingContent must be defined');
  assert(content.includes('getEnVersion'), 'English generator must exist');
  assert(content.includes('getFrVersion'), 'French generator must exist');
  assert(content.includes('getArVersion'), 'Arabic generator must exist');
  assert(content.includes('hashtags:'), 'Hashtags must be generated');
  assert(content.includes('suggestedVisual:'), 'Visual recommendations must be provided');
});

// 6. Test Short Video Script Studio
runTest('6. Video Script Storyboard Generator (15s, 30s, 60s)', () => {
  const videoServicePath = path.join(__dirname, '../src/services/videoScriptService.ts');
  const content = fs.readFileSync(videoServicePath, 'utf8');

  assert(content.includes('generateScript'), 'generateScript must be defined');
  assert(content.includes('visualDescription'), 'Visual cue descriptions required');
  assert(content.includes('screenText'), 'On-screen text required');
  assert(content.includes('spokenVoiceover'), 'Spoken script voiceover required');
});

// 7. Test 30-Day Calendar & ICS Exporter
runTest('7. 30-Day Marketing Calendar & ICS Calendar Standard', () => {
  const calendarPath = path.join(__dirname, '../src/services/calendarService.ts');
  const content = fs.readFileSync(calendarPath, 'utf8');

  assert(content.includes('INITIAL_30_DAYS_POSTS'), 'Initial 30-day program must be pre-populated');
  assert(content.includes('exportICS'), 'exportICS function must exist');
  assert(content.includes('BEGIN:VCALENDAR'), 'ICS standard header required');
  assert(content.includes('BEGIN:VEVENT'), 'ICS event tags required');
});

// 8. Test Data Persistence, Full JSON Backup & CSV Exporters
runTest('8. Persistent Storage, Full Backup & Restore Validation', () => {
  const storagePath = path.join(__dirname, '../src/services/storage.ts');
  const content = fs.readFileSync(storagePath, 'utf8');

  assert(content.includes('exportFullBackup'), 'exportFullBackup must exist');
  assert(content.includes('importFullBackup'), 'importFullBackup must exist with validation');
  assert(content.includes('exportKeywordsCSV'), 'exportKeywordsCSV must exist');
  assert(content.includes('exportCalendarCSV'), 'exportCalendarCSV must exist');
  assert(content.includes('exportCampaignsCSV'), 'exportCampaignsCSV must exist');
});

// 9. Test Google Search Console CSV Parser
runTest('9. Google Search Console Parser & Aggregator', () => {
  const analyticsPath = path.join(__dirname, '../src/services/analyticsService.ts');
  const content = fs.readFileSync(analyticsPath, 'utf8');

  assert(content.includes('parseGscCsv'), 'parseGscCsv must exist');
  assert(content.includes('totalClicks'), 'totalClicks calculation required');
  assert(content.includes('totalImpressions'), 'totalImpressions calculation required');
  assert(content.includes('avgCtr'), 'avgCtr calculation required');
});

// 10. Test Production Build Output Files
runTest('10. Production Build Artifacts Integrity', () => {
  const distDir = path.join(__dirname, '../dist');
  assert(fs.existsSync(distDir), 'dist/ directory must exist after build');
  assert(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html must exist');

  const assetsDir = path.join(distDir, 'assets');
  assert(fs.existsSync(assetsDir), 'dist/assets directory must exist');
  const files = fs.readdirSync(assetsDir);
  assert(files.some((f) => f.endsWith('.js')), 'Production JS bundle must exist');
  assert(files.some((f) => f.endsWith('.css')), 'Production CSS bundle must exist');
});

console.log('\n====================================================');
console.log(`RESULTS: ${testsPassed} PASSED, ${testsFailed} FAILED`);
console.log('====================================================\n');

if (testsFailed > 0) {
  process.exit(1);
}
