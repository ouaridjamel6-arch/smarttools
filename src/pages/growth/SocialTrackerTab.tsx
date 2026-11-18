import React, { useState, useEffect } from 'react';
import {
  Share2,
  Plus,
  Trash2,
  Download,
  Eye,
  MousePointer,
  Heart,
  MessageCircle,
  Repeat,
  TrendingUp,
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { CampaignRecord, Language, SocialPlatform } from '../../types';
import { TOOLS_DATA } from '../../data/toolsData';

export const SocialTrackerTab: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New form fields
  const [platform, setPlatform] = useState<SocialPlatform>('pinterest');
  const [campaignName, setCampaignName] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [language, setLanguage] = useState<Language>('en');
  const [postUrl, setPostUrl] = useState('');
  const [toolId, setToolId] = useState(TOOLS_DATA[0].id);
  const [views, setViews] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [reactions, setReactions] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);
  const [shares, setShares] = useState<number>(0);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = () => {
    setCampaigns(StorageService.getCampaigns());
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName.trim()) return;

    StorageService.addCampaign({
      platform,
      campaignName: campaignName.trim(),
      date,
      language,
      postUrl: postUrl.trim(),
      toolId,
      views: Number(views) || 0,
      clicks: Number(clicks) || 0,
      reactions: Number(reactions) || 0,
      comments: Number(comments) || 0,
      shares: Number(shares) || 0,
    });

    setIsAddOpen(false);
    resetForm();
    loadCampaigns();
  };

  const resetForm = () => {
    setCampaignName('');
    setPostUrl('');
    setViews(0);
    setClicks(0);
    setReactions(0);
    setComments(0);
    setShares(0);
  };

  const handleDelete = (id: string) => {
    StorageService.deleteCampaign(id);
    loadCampaigns();
  };

  const handleExportCSV = () => {
    const csv = StorageService.exportCampaignsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.download = `smarttools-social-campaigns-${Date.now()}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  // Aggregates
  const totalViews = campaigns.reduce((acc, c) => acc + c.views, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalInteractions = campaigns.reduce((acc, c) => acc + c.reactions + c.comments + c.shares, 0);
  const overallCtr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : '0.00';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <span>Multi-Channel Campaign Performance Tracker</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Record actual views, clicks, and engagement from Pinterest, Facebook, LinkedIn, TikTok, and YouTube.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-100 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Log Publication Results</span>
          </button>
        </div>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Views</span>
          <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
            {totalViews.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Website Clicks</span>
          <div className="text-2xl font-black text-indigo-600 mt-1">
            {totalClicks.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Engagements</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {totalInteractions.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Average CTR</span>
          <div className="text-2xl font-black text-slate-800 dark:text-white mt-1">
            {overallCtr}%
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {campaigns.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Share2 className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No campaigns recorded yet</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              After publishing a post to Pinterest, Facebook, or TikTok, click "Log Publication Results" above to record views and measure actual click-throughs.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Campaign Name</th>
                  <th className="py-3 px-4">Lang</th>
                  <th className="py-3 px-4 text-right">Views</th>
                  <th className="py-3 px-4 text-right">Clicks</th>
                  <th className="py-3 px-4 text-right">CTR %</th>
                  <th className="py-3 px-4 text-right">Reactions</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {campaigns.map((c) => {
                  const ctr = c.views > 0 ? ((c.clicks / c.views) * 100).toFixed(2) : '0.00';
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 text-slate-500 font-mono">{c.date}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                          {c.platform}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {c.postUrl ? (
                          <a href={c.postUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline">
                            {c.campaignName}
                          </a>
                        ) : (
                          c.campaignName
                        )}
                      </td>
                      <td className="py-3 px-4 uppercase text-[10px] font-bold text-slate-500">{c.language}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold">{c.views.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-indigo-600">{c.clicks.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold">{ctr}%</td>
                      <td className="py-3 px-4 text-right font-mono text-emerald-600">{c.reactions}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Campaign Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAdd}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4"
          >
            <h3 className="font-bold text-slate-900 text-base">Record Social Publication Metrics</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                >
                  <option value="pinterest">Pinterest</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                >
                  <option value="en">English (EN)</option>
                  <option value="fr">French (FR)</option>
                  <option value="ar">Arabic (AR)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Campaign / Post Name</label>
              <input
                type="text"
                required
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g. Pin 01: Image Compressor Guide"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Tool</label>
                <select
                  value={toolId}
                  onChange={(e) => setToolId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                >
                  {TOOLS_DATA.map((t) => (
                    <option key={t.id} value={t.id}>{t.name.en}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Publication Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Post URL (optional)</label>
              <input
                type="url"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://pinterest.com/pin/..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Views</label>
                <input
                  type="number"
                  min="0"
                  value={views}
                  onChange={(e) => setViews(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Clicks</label>
                <input
                  type="number"
                  min="0"
                  value={clicks}
                  onChange={(e) => setClicks(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Reactions</label>
                <input
                  type="number"
                  min="0"
                  value={reactions}
                  onChange={(e) => setReactions(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
