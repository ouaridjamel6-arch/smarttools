import { StorageService } from './storage';

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  params: Record<string, any>;
  timestamp: string;
}

export interface GscQueryRecord {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscPageRecord {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscReportSummary {
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  topQueries: GscQueryRecord[];
  topPages: GscPageRecord[];
  importedAt: string;
}

const LOCAL_EVENTS_KEY = 'smarttools_analytics_events';
const GSC_REPORT_KEY = 'smarttools_gsc_data';

export const AnalyticsService = {
  // Initialize Google Analytics tag dynamically if user configured Measurement ID
  initGa(): void {
    const settings = StorageService.getSettings();
    if (!settings.enableAnalytics || !settings.gaMeasurementId) {
      return;
    }

    const gaId = settings.gaMeasurementId.trim();
    if (!gaId.startsWith('G-')) return;

    if (document.getElementById('ga-script')) return;

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { anonymize_ip: true });
    `;
    document.head.appendChild(inlineScript);
  },

  // Safe tracking: strictly metadata only, NEVER user content/passwords/files!
  trackEvent(eventName: string, params: Record<string, any> = {}): void {
    const settings = StorageService.getSettings();
    if (!settings.enableAnalytics) return;

    // Filter out any potential sensitive payload keys
    const sanitizedParams: Record<string, any> = {};
    for (const [k, v] of Object.entries(params)) {
      if (!['password', 'text', 'file', 'content', 'input'].includes(k.toLowerCase())) {
        sanitizedParams[k] = typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' ? v : String(v);
      }
    }

    // Call real gtag if loaded
    if (typeof (window as any).gtag === 'function') {
      try {
        (window as any).gtag('event', eventName, sanitizedParams);
      } catch (err) {
        console.warn('Analytics event dispatch error:', err);
      }
    }

    // Buffer locally for internal audit & display in Growth Center
    this.bufferEvent(eventName, sanitizedParams);
  },

  trackPageView(pagePath: string, title?: string): void {
    this.trackEvent('page_view', { page_location: pagePath, page_title: title || document.title });
  },

  trackToolUse(toolId: string, actionType: string): void {
    this.trackEvent('tool_interaction', { tool_id: toolId, action_type: actionType });
  },

  trackDownload(toolId: string, fileExtension: string): void {
    this.trackEvent('file_download', { tool_id: toolId, file_extension: fileExtension });
  },

  trackLanguageChange(oldLang: string, newLang: string): void {
    this.trackEvent('language_switch', { from_lang: oldLang, to_lang: newLang });
  },

  bufferEvent(eventName: string, params: Record<string, any>): void {
    try {
      const raw = localStorage.getItem(LOCAL_EVENTS_KEY);
      const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
      events.unshift({
        id: 'ev_' + Date.now(),
        eventName,
        params,
        timestamp: new Date().toISOString(),
      });
      // Keep last 150 events
      localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events.slice(0, 150)));
    } catch {
      // Ignore localStorage quotas
    }
  },

  getBufferedEvents(): AnalyticsEvent[] {
    try {
      const raw = localStorage.getItem(LOCAL_EVENTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  clearBufferedEvents(): void {
    localStorage.removeItem(LOCAL_EVENTS_KEY);
  },

  // Google Search Console CSV Parser & Analyzer
  parseGscCsv(csvText: string): GscReportSummary {
    const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const queries: GscQueryRecord[] = [];
    const pages: GscPageRecord[] = [];

    let mode: 'queries' | 'pages' = 'queries';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase();
      if (lower.includes('top queries') || lower.startsWith('top queries')) {
        mode = 'queries';
        continue;
      }
      if (lower.includes('pages') || lower.startsWith('pages')) {
        mode = 'pages';
        continue;
      }

      // Check header row
      if (lower.includes('clicks') && lower.includes('impressions')) {
        continue;
      }

      const parts = line.split(',').map((p) => p.trim().replace(/^"|"$/g, ''));
      if (parts.length >= 4) {
        const item = parts[0];
        const clicks = parseInt(parts[1], 10) || 0;
        const impressions = parseInt(parts[2], 10) || 0;
        const ctrStr = parts[3].replace('%', '');
        const ctr = parseFloat(ctrStr) || 0;
        const position = parseFloat(parts[4]) || 0;

        if (mode === 'queries' && item) {
          queries.push({ query: item, clicks, impressions, ctr, position });
        } else if (item) {
          pages.push({ page: item, clicks, impressions, ctr, position });
        }
      }
    }

    const totalClicks = queries.reduce((acc, q) => acc + q.clicks, 0);
    const totalImpressions = queries.reduce((acc, q) => acc + q.impressions, 0);
    const avgCtr = totalImpressions > 0 ? parseFloat(((totalClicks / totalImpressions) * 100).toFixed(2)) : 0;
    const avgPosition =
      queries.length > 0 ? parseFloat((queries.reduce((acc, q) => acc + q.position, 0) / queries.length).toFixed(1)) : 0;

    const report: GscReportSummary = {
      totalClicks,
      totalImpressions,
      avgCtr,
      avgPosition,
      topQueries: queries.slice(0, 50),
      topPages: pages.slice(0, 50),
      importedAt: new Date().toISOString(),
    };

    localStorage.setItem(GSC_REPORT_KEY, JSON.stringify(report));
    return report;
  },

  getSavedGscReport(): GscReportSummary | null {
    try {
      const raw = localStorage.getItem(GSC_REPORT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
