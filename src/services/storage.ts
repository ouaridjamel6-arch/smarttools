import {
  KeywordItem,
  CalendarPost,
  CampaignRecord,
  GeneratedContent,
  VideoScript,
  GrowthRecommendation,
  GrowthSettings,
  Language,
} from '../types';

const STORAGE_KEYS = {
  KEYWORDS: 'smarttools_keywords',
  CALENDAR: 'smarttools_calendar',
  CAMPAIGNS: 'smarttools_campaigns',
  CONTENT: 'smarttools_content',
  SCRIPTS: 'smarttools_scripts',
  SETTINGS: 'smarttools_settings',
  RECOMMENDATIONS: 'smarttools_recommendations',
  GSC_REPORTS: 'smarttools_gsc_reports',
};

export const DEFAULT_SETTINGS: GrowthSettings = {
  adminPin: '',
  siteBaseUrl: 'https://smarttools-um7.pages.dev',
  gaMeasurementId: '',
  adsensePublisherId: '',
  defaultLanguage: 'en',
  enableAnalytics: true,
  enableAdSense: false,
};

// Initial Keywords Seed covering the tools and 3 languages
export const INITIAL_KEYWORDS: KeywordItem[] = [
  // QR Code EN
  { id: 'k1', keyword: 'free qr code generator', language: 'en', toolId: 'qr-code', intent: 'transactional', targetPage: '/tool/qr-code-generator', cluster: 'Core QR', dateAdded: '2026-11-01' },
  { id: 'k2', keyword: 'create qr code online', language: 'en', toolId: 'qr-code', intent: 'transactional', targetPage: '/tool/qr-code-generator', cluster: 'Core QR', dateAdded: '2026-11-01' },
  { id: 'k3', keyword: 'generate qr code free', language: 'en', toolId: 'qr-code', intent: 'transactional', targetPage: '/tool/qr-code-generator', cluster: 'Core QR', dateAdded: '2026-11-01' },
  { id: 'k4', keyword: 'custom qr code with color', language: 'en', toolId: 'qr-code', intent: 'commercial', targetPage: '/tool/qr-code-generator', cluster: 'Custom QR', dateAdded: '2026-11-01' },
  
  // QR Code FR
  { id: 'k5', keyword: 'generateur de qr code gratuit', language: 'fr', toolId: 'qr-code', intent: 'transactional', targetPage: '/tool/qr-code-generator', cluster: 'QR Francais', dateAdded: '2026-11-01' },
  { id: 'k6', keyword: 'creer un qr code en ligne', language: 'fr', toolId: 'qr-code', intent: 'transactional', targetPage: '/tool/qr-code-generator', cluster: 'QR Francais', dateAdded: '2026-11-01' },
  { id: 'k7', keyword: 'qr code sans inscription', language: 'fr', toolId: 'qr-code', intent: 'informational', targetPage: '/tool/qr-code-generator', cluster: 'QR Francais', dateAdded: '2026-11-01' },

  // QR Code AR
  { id: 'k8', keyword: 'مولد رمز qr مجاني', language: 'ar', toolId: 'qr-code', intent: 'transactional', targetPage: '/tool/qr-code-generator', cluster: 'QR عربي', dateAdded: '2026-11-01' },
  { id: 'k9', keyword: 'انشاء باركود اون لاين', language: 'ar', toolId: 'qr-code', intent: 'transactional', targetPage: '/tool/qr-code-generator', cluster: 'QR عربي', dateAdded: '2026-11-01' },
  { id: 'k10', keyword: 'تصميم qr code ملون', language: 'ar', toolId: 'qr-code', intent: 'commercial', targetPage: '/tool/qr-code-generator', cluster: 'QR عربي', dateAdded: '2026-11-01' },

  // Image Compressor EN
  { id: 'k11', keyword: 'compress image online', language: 'en', toolId: 'image-compressor', intent: 'transactional', targetPage: '/tool/image-compressor', cluster: 'Image Optimization', dateAdded: '2026-11-01' },
  { id: 'k12', keyword: 'reduce image size', language: 'en', toolId: 'image-compressor', intent: 'transactional', targetPage: '/tool/image-compressor', cluster: 'Image Optimization', dateAdded: '2026-11-01' },
  { id: 'k13', keyword: 'free image compressor webp', language: 'en', toolId: 'image-compressor', intent: 'commercial', targetPage: '/tool/image-compressor', cluster: 'WebP Tools', dateAdded: '2026-11-01' },

  // Image Compressor FR
  { id: 'k14', keyword: 'compresser image en ligne gratuit', language: 'fr', toolId: 'image-compressor', intent: 'transactional', targetPage: '/tool/image-compressor', cluster: 'Image FR', dateAdded: '2026-11-01' },
  { id: 'k15', keyword: 'reduire taille photo sans perte', language: 'fr', toolId: 'image-compressor', intent: 'commercial', targetPage: '/tool/image-compressor', cluster: 'Image FR', dateAdded: '2026-11-01' },

  // Image Compressor AR
  { id: 'k16', keyword: 'ضغط الصور وتقليل حجمها اون لاين', language: 'ar', toolId: 'image-compressor', intent: 'transactional', targetPage: '/tool/image-compressor', cluster: 'ضغط الصور', dateAdded: '2026-11-01' },
  { id: 'k17', keyword: 'تقليل حجم الصور بنفس الجودة', language: 'ar', toolId: 'image-compressor', intent: 'informational', targetPage: '/tool/image-compressor', cluster: 'ضغط الصور', dateAdded: '2026-11-01' },

  // Word Counter EN
  { id: 'k18', keyword: 'online word counter', language: 'en', toolId: 'word-counter', intent: 'transactional', targetPage: '/tool/word-counter', cluster: 'Writing Tools', dateAdded: '2026-11-01' },
  { id: 'k19', keyword: 'character counter online', language: 'en', toolId: 'word-counter', intent: 'transactional', targetPage: '/tool/word-counter', cluster: 'Writing Tools', dateAdded: '2026-11-01' },
  { id: 'k20', keyword: 'count words and reading time', language: 'en', toolId: 'word-counter', intent: 'informational', targetPage: '/tool/word-counter', cluster: 'Writing Tools', dateAdded: '2026-11-01' },

  // Word Counter FR
  { id: 'k21', keyword: 'compteur de mots en ligne', language: 'fr', toolId: 'word-counter', intent: 'transactional', targetPage: '/tool/word-counter', cluster: 'Redaction FR', dateAdded: '2026-11-01' },
  { id: 'k22', keyword: 'compteur de caracteres sans espace', language: 'fr', toolId: 'word-counter', intent: 'informational', targetPage: '/tool/word-counter', cluster: 'Redaction FR', dateAdded: '2026-11-01' },

  // Word Counter AR
  { id: 'k23', keyword: 'عداد الكلمات والحروف', language: 'ar', toolId: 'word-counter', intent: 'transactional', targetPage: '/tool/word-counter', cluster: 'أدوات النصوص', dateAdded: '2026-11-01' },
  { id: 'k24', keyword: 'حساب عدد الكلمات في النص', language: 'ar', toolId: 'word-counter', intent: 'informational', targetPage: '/tool/word-counter', cluster: 'أدوات النصوص', dateAdded: '2026-11-01' },

  // Password Generator EN/FR/AR
  { id: 'k25', keyword: 'strong password generator secure', language: 'en', toolId: 'password-generator', intent: 'transactional', targetPage: '/tool/password-generator', cluster: 'Security', dateAdded: '2026-11-01' },
  { id: 'k26', keyword: 'generateur de mot de passe fort', language: 'fr', toolId: 'password-generator', intent: 'transactional', targetPage: '/tool/password-generator', cluster: 'Securite FR', dateAdded: '2026-11-01' },
  { id: 'k27', keyword: 'توليد كلمة سر قوية وعشوائية', language: 'ar', toolId: 'password-generator', intent: 'transactional', targetPage: '/tool/password-generator', cluster: 'حماية وكلمات سر', dateAdded: '2026-11-01' },

  // JSON Formatter EN/FR/AR
  { id: 'k28', keyword: 'json validator formatter online', language: 'en', toolId: 'json-formatter', intent: 'developer', targetPage: '/tool/json-formatter-validator', cluster: 'Dev Tools', dateAdded: '2026-11-01' },
  { id: 'k29', keyword: 'formateur json en ligne gratuit', language: 'fr', toolId: 'json-formatter', intent: 'developer', targetPage: '/tool/json-formatter-validator', cluster: 'Dev FR', dateAdded: '2026-11-01' },
  { id: 'k30', keyword: 'تنسيق وتدقيق ملفات json', language: 'ar', toolId: 'json-formatter', intent: 'developer', targetPage: '/tool/json-formatter-validator', cluster: 'أدوات المطورين', dateAdded: '2026-11-01' },
];

export const StorageService = {
  // Settings
  getSettings(): GrowthSettings {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.siteBaseUrl === 'https://smarttools.app') {
        parsed.siteBaseUrl = DEFAULT_SETTINGS.siteBaseUrl;
      }
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: GrowthSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Keywords
  getKeywords(): KeywordItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.KEYWORDS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.KEYWORDS, JSON.stringify(INITIAL_KEYWORDS));
      return INITIAL_KEYWORDS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_KEYWORDS;
    }
  },

  saveKeywords(items: KeywordItem[]): void {
    localStorage.setItem(STORAGE_KEYS.KEYWORDS, JSON.stringify(items));
  },

  addKeyword(item: Omit<KeywordItem, 'id' | 'dateAdded'>): KeywordItem {
    const list = this.getKeywords();
    const newItem: KeywordItem = {
      ...item,
      id: 'k_' + Date.now(),
      dateAdded: new Date().toISOString().slice(0, 10),
    };
    list.unshift(newItem);
    this.saveKeywords(list);
    return newItem;
  },

  deleteKeyword(id: string): void {
    const list = this.getKeywords().filter((k) => k.id !== id);
    this.saveKeywords(list);
  },

  // Calendar Posts
  getCalendarPosts(): CalendarPost[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CALENDAR);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveCalendarPosts(posts: CalendarPost[]): void {
    localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(posts));
  },

  // Campaigns
  getCampaigns(): CampaignRecord[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveCampaigns(campaigns: CampaignRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
  },

  addCampaign(record: Omit<CampaignRecord, 'id'>): CampaignRecord {
    const list = this.getCampaigns();
    const newRecord: CampaignRecord = {
      ...record,
      id: 'c_' + Date.now(),
    };
    list.unshift(newRecord);
    this.saveCampaigns(list);
    return newRecord;
  },

  deleteCampaign(id: string): void {
    const list = this.getCampaigns().filter((c) => c.id !== id);
    this.saveCampaigns(list);
  },

  // Generated Content
  getGeneratedContent(): GeneratedContent[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTENT);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveGeneratedContent(items: GeneratedContent[]): void {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(items));
  },

  addGeneratedContent(item: GeneratedContent): void {
    const list = this.getGeneratedContent();
    list.unshift(item);
    this.saveGeneratedContent(list);
  },

  // Video Scripts
  getVideoScripts(): VideoScript[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SCRIPTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveVideoScripts(items: VideoScript[]): void {
    localStorage.setItem(STORAGE_KEYS.SCRIPTS, JSON.stringify(items));
  },

  addVideoScript(item: VideoScript): void {
    const list = this.getVideoScripts();
    list.unshift(item);
    this.saveVideoScripts(list);
  },

  // Full Export & Restore JSON
  exportFullBackup(): string {
    const data = {
      smarttools_version: '1.0.0',
      exported_at: new Date().toISOString(),
      settings: this.getSettings(),
      keywords: this.getKeywords(),
      calendar: this.getCalendarPosts(),
      campaigns: this.getCampaigns(),
      content: this.getGeneratedContent(),
      scripts: this.getVideoScripts(),
    };
    return JSON.stringify(data, null, 2);
  },

  importFullBackup(jsonString: string): { success: boolean; message: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'Invalid backup structure: root is not an object.' };
      }
      if (parsed.settings) this.saveSettings(parsed.settings);
      if (Array.isArray(parsed.keywords)) this.saveKeywords(parsed.keywords);
      if (Array.isArray(parsed.calendar)) this.saveCalendarPosts(parsed.calendar);
      if (Array.isArray(parsed.campaigns)) this.saveCampaigns(parsed.campaigns);
      if (Array.isArray(parsed.content)) this.saveGeneratedContent(parsed.content);
      if (Array.isArray(parsed.scripts)) this.saveVideoScripts(parsed.scripts);
      return { success: true, message: 'Backup successfully restored.' };
    } catch (err: any) {
      return { success: false, message: 'Failed to parse JSON: ' + (err?.message || 'unknown error') };
    }
  },

  // CSV Exporters
  exportKeywordsCSV(): string {
    const list = this.getKeywords();
    const headers = ['ID', 'Keyword', 'Language', 'Tool ID', 'Search Intent', 'Target Page', 'Cluster', 'Date Added'];
    const rows = list.map((k) => [
      k.id,
      `"${k.keyword.replace(/"/g, '""')}"`,
      k.language,
      k.toolId,
      k.intent,
      k.targetPage,
      `"${k.cluster.replace(/"/g, '""')}"`,
      k.dateAdded,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  exportCalendarCSV(): string {
    const list = this.getCalendarPosts();
    const headers = ['Day', 'Date', 'Time', 'Platform', 'Language', 'Topic', 'Tool ID', 'Status', 'Content'];
    const rows = list.map((p) => [
      p.dayIndex,
      p.date,
      p.time,
      p.platform,
      p.language,
      `"${p.topic.replace(/"/g, '""')}"`,
      p.toolId,
      p.status,
      `"${p.content.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  exportCampaignsCSV(): string {
    const list = this.getCampaigns();
    const headers = ['ID', 'Platform', 'Campaign Name', 'Date', 'Language', 'Tool ID', 'Views', 'Clicks', 'Reactions', 'Comments', 'Shares', 'CTR %', 'Engagement Rate %'];
    const rows = list.map((c) => {
      const ctr = c.views > 0 ? ((c.clicks / c.views) * 100).toFixed(2) : '0.00';
      const engagement = c.views > 0 ? (((c.reactions + c.comments + c.shares) / c.views) * 100).toFixed(2) : '0.00';
      return [
        c.id,
        c.platform,
        `"${c.campaignName.replace(/"/g, '""')}"`,
        c.date,
        c.language,
        c.toolId,
        c.views,
        c.clicks,
        c.reactions,
        c.comments,
        c.shares,
        ctr,
        engagement,
      ];
    });
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
