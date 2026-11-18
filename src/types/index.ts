export type Language = 'en' | 'fr' | 'ar';

export type SearchIntent = 'informational' | 'navigational' | 'transactional' | 'commercial' | 'developer';

export type ContentStyle = 'professional' | 'educational' | 'simple' | 'punchy' | 'informative' | 'promotional';

export type SocialPlatform = 'facebook' | 'pinterest' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube' | 'blog';

export type PostStatus = 'idea' | 'to_prepare' | 'draft' | 'ready' | 'published' | 'needs_improvement';

export interface ToolDefinition {
  id: string;
  slug: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  shortDesc: Record<Language, string>;
  category: 'graphics' | 'text' | 'security' | 'developer' | 'utility';
  icon: string;
  badge?: string;
  features: Record<Language, string[]>;
  howToUse: Record<Language, string[]>;
  faq: Record<Language, { q: string; a: string }[]>;
}

export interface KeywordItem {
  id: string;
  keyword: string;
  language: Language;
  toolId: string;
  intent: SearchIntent;
  targetPage: string;
  notes?: string;
  cluster: string;
  dateAdded: string;
}

export interface GeneratedContent {
  id: string;
  platform: SocialPlatform;
  toolId: string;
  style: ContentStyle;
  versions: {
    [key in Language]: {
      title: string;
      hook: string;
      body: string;
      cta: string;
      hashtags: string[];
      suggestedVisual: string;
    };
  };
  recommendedPlatform: string;
  toolUrl: string;
  dateCreated: string;
}

export interface VideoScriptScene {
  sceneNumber: number;
  timeSeconds: string;
  name: Record<Language, string>;
  visualDescription: Record<Language, string>;
  screenText: Record<Language, string>;
  spokenVoiceover: Record<Language, string>;
}

export interface VideoScript {
  id: string;
  toolId: string;
  durationSeconds: 15 | 30 | 60;
  topic: Record<Language, string>;
  scenes: VideoScriptScene[];
  videoDescription: Record<Language, string>;
  hashtags: Record<Language, string[]>;
  dateCreated: string;
}

export interface CalendarPost {
  id: string;
  dayIndex: number; // 1 to 30
  date: string;
  time: string;
  platform: SocialPlatform;
  language: Language;
  topic: string;
  toolId: string;
  content: string;
  visualType: string;
  status: PostStatus;
  publishedUrl?: string;
  notes?: string;
}

export interface CampaignRecord {
  id: string;
  platform: SocialPlatform;
  campaignName: string;
  date: string;
  language: Language;
  postUrl: string;
  toolId: string;
  views: number;
  clicks: number;
  reactions: number;
  comments: number;
  shares: number;
}

export interface SeoAuditIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  page: string;
  message: string;
  recommendation: string;
}

export interface SeoAuditResult {
  overallScore: number;
  totalPagesScanned: number;
  errorsCount: number;
  warningsCount: number;
  goodCount: number;
  issues: SeoAuditIssue[];
  auditedAt: string;
}

export interface GrowthRecommendation {
  id: string;
  title: Record<Language, string>;
  problemDetected: Record<Language, string>;
  dataUsed: Record<Language, string>;
  recommendedAction: Record<Language, string>;
  priority: 'critical' | 'high' | 'medium' | 'low';
  expectedOutcome: Record<Language, string>; // Marked explicitly as hypothesis
  status: 'pending' | 'in_progress' | 'completed';
  category: 'seo' | 'content' | 'social' | 'technical';
}

export interface GrowthSettings {
  adminPin: string;
  siteBaseUrl: string;
  gaMeasurementId: string;
  adsensePublisherId: string;
  defaultLanguage: Language;
  enableAnalytics: boolean;
  enableAdSense: boolean;
}
