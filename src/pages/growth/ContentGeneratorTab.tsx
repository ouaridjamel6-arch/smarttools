import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Calendar,
  Share2,
  RefreshCw,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { ContentGenService } from '../../services/contentGenService';
import { CalendarService } from '../../services/calendarService';
import { TOOLS_DATA } from '../../data/toolsData';
import { ContentStyle, GeneratedContent, Language, SocialPlatform } from '../../types';

export const ContentGeneratorTab: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string>('qr-code');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('facebook');
  const [selectedStyle, setSelectedStyle] = useState<ContentStyle>('educational');
  const [generated, setGenerated] = useState<GeneratedContent>(() => {
    return ContentGenService.generateMarketingContent(TOOLS_DATA[0], 'facebook', 'educational');
  });

  const [activeLangTab, setActiveLangTab] = useState<Language>('en');
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToCalendar, setSavedToCalendar] = useState<boolean>(false);

  const handleGenerate = () => {
    const tool = TOOLS_DATA.find((t) => t.id === selectedToolId) || TOOLS_DATA[0];
    const result = ContentGenService.generateMarketingContent(tool, selectedPlatform, selectedStyle);
    setGenerated(result);
    setSavedToCalendar(false);
  };

  const currentContent = generated.versions[activeLangTab];

  const handleCopyAll = () => {
    const fullText = `${currentContent.title}\n\n${currentContent.hook}\n\n${currentContent.body}\n\n${currentContent.cta}\n\n${currentContent.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToCalendar = () => {
    const fullText = `${currentContent.hook}\n\n${currentContent.body}\n\n${currentContent.cta}\n\n${currentContent.hashtags.join(' ')}`;
    const today = new Date().toISOString().slice(0, 10);
    CalendarService.addPost({
      dayIndex: Math.floor(Math.random() * 30) + 1,
      date: today,
      time: '12:00',
      platform: selectedPlatform,
      language: activeLangTab,
      topic: currentContent.title,
      toolId: selectedToolId,
      content: fullText,
      visualType: currentContent.suggestedVisual,
      status: 'ready',
    });
    setSavedToCalendar(true);
    setTimeout(() => setSavedToCalendar(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>Intelligent Multi-Channel Content Generator</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Zero-cost algorithmic copywriting engine. Crafts tailored viral hooks, body copy, hashtags, and CTAs across English, French, and Arabic.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Tool Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Target Tool
            </label>
            <select
              value={selectedToolId}
              onChange={(e) => setSelectedToolId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
            >
              {TOOLS_DATA.map((t) => (
                <option key={t.id} value={t.id}>{t.name.en}</option>
              ))}
            </select>
          </div>

          {/* Platform Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Destination Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
            >
              <option value="facebook">Facebook (Post / Group)</option>
              <option value="pinterest">Pinterest (Idea Pin / Description)</option>
              <option value="instagram">Instagram (Caption & Carousel)</option>
              <option value="linkedin">LinkedIn (Professional Thought-Leadership)</option>
              <option value="tiktok">TikTok (Video Caption & Sound Text)</option>
              <option value="youtube">YouTube Shorts (Description & Pinned Comment)</option>
              <option value="blog">Blog / Practical Tutorial Article</option>
            </select>
          </div>

          {/* Style Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Copywriting Tone & Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
            >
              <option value="educational">Educational (Step-by-step how-to)</option>
              <option value="punchy">Punchy & Urgent (No-subscription hook)</option>
              <option value="professional">Professional (Enterprise & Compliance)</option>
              <option value="promotional">Promotional (Feature highlights)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Regenerate Content in 3 Languages</span>
        </button>
      </div>

      {/* Generated Content Studio */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Language Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-4 gap-2">
          {[
            { id: 'en', label: 'English Copy' },
            { id: 'fr', label: 'Version Française' },
            { id: 'ar', label: 'النسخة العربية (RTL)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLangTab(tab.id as Language)}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition ${
                activeLangTab === tab.id
                  ? 'bg-white text-indigo-600 border-t-2 border-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div
          dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
          className="p-6 sm:p-8 space-y-6"
        >
          {/* Post Title */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Title / Subject Line
            </span>
            <div className="text-base font-black text-slate-900 dark:text-white">
              {currentContent.title}
            </div>
          </div>

          {/* Viral Hook */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
              Scroll-Stopping Hook
            </span>
            <div className="text-sm font-bold text-indigo-950">
              {currentContent.hook}
            </div>
          </div>

          {/* Main Body */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-inner">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Main Body Copy
            </span>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
              {currentContent.body}
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Call To Action (CTA) & Tool Link
            </span>
            <div className="text-xs sm:text-sm font-bold text-emerald-900">
              {currentContent.cta}
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Recommended Hashtags
            </span>
            <div className="flex flex-wrap gap-2">
              {currentContent.hashtags.map((h, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-semibold"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Recommendation */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
            <span className="font-bold text-amber-900 block mb-0.5">Recommended Visual Format:</span>
            <span className="text-amber-800">{currentContent.suggestedVisual}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Full Copy!' : 'Copy Entire Post'}</span>
            </button>

            <button
              onClick={handleSaveToCalendar}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition active:scale-95"
            >
              {savedToCalendar ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Calendar className="w-4 h-4" />}
              <span>{savedToCalendar ? 'Saved to Calendar!' : 'Save Directly to Calendar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
