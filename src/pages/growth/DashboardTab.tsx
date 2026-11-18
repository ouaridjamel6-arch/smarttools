import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Search,
  Calendar,
  Share2,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Sparkles,
  Download,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { SeoAuditService } from '../../services/seoAuditService';
import { StorageService } from '../../services/storage';
import { TOOLS_DATA } from '../../data/toolsData';

interface DashboardTabProps {
  onNavigateTab: (tabId: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ onNavigateTab }) => {
  const [auditResult, setAuditResult] = useState(() => SeoAuditService.runComprehensiveAudit());
  const [keywordsCount, setKeywordsCount] = useState(0);
  const [calendarCount, setCalendarCount] = useState(0);
  const [campaignsCount, setCampaignsCount] = useState(0);
  const settings = StorageService.getSettings();

  useEffect(() => {
    setKeywordsCount(StorageService.getKeywords().length);
    setCalendarCount(StorageService.getCalendarPosts().length);
    setCampaignsCount(StorageService.getCampaigns().length);
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automated International Growth Machine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            SMARTTOOLS Growth Command Center
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            Continuously optimize organic Google rankings, plan 30-day multi-channel social campaigns, craft short video scripts, and track international traffic in English, French, and Arabic.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* SEO Score */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SEO Health Score</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ✓
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {auditResult.overallScore}
            </span>
            <span className="text-xs font-bold text-slate-400">/ 100</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-emerald-600 font-semibold">{auditResult.goodCount} checks passed</span>
            <button
              onClick={() => onNavigateTab('seo')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Audit Details &rarr;
            </button>
          </div>
        </div>

        {/* Tracked Keywords */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tracked Keywords</span>
            <Search className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {keywordsCount}
            </span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">EN/FR/AR</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-slate-500">Across 8 core tools</span>
            <button
              onClick={() => onNavigateTab('keywords')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Manage &rarr;
            </button>
          </div>
        </div>

        {/* 30-Day Calendar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Editorial Schedule</span>
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {calendarCount}
            </span>
            <span className="text-xs font-bold text-slate-500">scheduled posts</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-slate-500">30-day program</span>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-indigo-600 font-bold hover:underline"
            >
              View Plan &rarr;
            </button>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Social Channels</span>
            <Share2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">6</span>
            <span className="text-xs font-bold text-slate-400">FB, Pin, IG, Li, TT, YT</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
            <span className="text-slate-500">{campaignsCount} records logged</span>
            <button
              onClick={() => onNavigateTab('tracker')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Trackers &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Quick Launch Growth Tasks
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Generate Social Copy', tab: 'content', desc: 'Craft tri-lingual posts' },
            { label: 'Studio Video Scripts', tab: 'video', desc: '15s & 30s TikTok/Reels' },
            { label: 'Create Promo Visual', tab: 'visuals', desc: 'Export 1080x1080 PNG' },
            { label: 'Audit SEO & Robots', tab: 'seo', desc: 'Download sitemap & schema' },
          ].map((act) => (
            <button
              key={act.tab}
              onClick={() => onNavigateTab(act.tab)}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 text-left transition group"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-indigo-600">
                <span>{act.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">{act.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* System Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Google AdSense</span>
            {settings.adsensePublisherId ? (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Configured</span>
            ) : (
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Pending Publisher ID</span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {settings.adsensePublisherId
              ? `Publisher ID: ${settings.adsensePublisherId}`
              : 'Add your AdSense ID in Settings to activate ads.txt and compliant placeholders.'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Google Analytics 4</span>
            {settings.gaMeasurementId ? (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
            ) : (
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Manual/Optional</span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {settings.gaMeasurementId ? `Tracking ID: ${settings.gaMeasurementId}` : 'Add G-XXXXXXXXXX in Settings to enable real-time tracking.'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Local Data Storage</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Persistent</span>
          </div>
          <p className="text-xs text-slate-500">
            Keywords, calendar, and campaigns are stored locally and exportable via JSON and CSV.
          </p>
        </div>
      </div>
    </div>
  );
};
