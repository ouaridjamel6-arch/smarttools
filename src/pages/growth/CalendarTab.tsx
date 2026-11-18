import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  List,
  Download,
  Plus,
  Share2,
  Clock,
  Filter,
  CheckCircle2,
  Edit2,
  Copy,
} from 'lucide-react';
import { CalendarService } from '../../services/calendarService';
import { CalendarPost, PostStatus, Language, SocialPlatform } from '../../types';
import { StorageService } from '../../services/storage';

export const CalendarTab: React.FC = () => {
  const [posts, setPosts] = useState<CalendarPost[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [statusFilter, setStatusFilter] = useState<'all' | PostStatus>('all');
  const [langFilter, setLangFilter] = useState<'all' | Language>('all');
  const [selectedPost, setSelectedPost] = useState<CalendarPost | null>(null);

  useEffect(() => {
    loadCalendar();
  }, []);

  const loadCalendar = () => {
    setPosts(CalendarService.getPosts());
  };

  const handleStatusChange = (id: string, newStatus: PostStatus) => {
    CalendarService.updatePostStatus(id, newStatus);
    loadCalendar();
  };

  const handleExportICS = () => {
    const icsData = CalendarService.exportICS();
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.download = `smarttools-marketing-calendar-30days-${Date.now()}.ics`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const handleExportCSV = () => {
    const csvData = StorageService.exportCalendarCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.download = `smarttools-editorial-plan-${Date.now()}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const getStatusBadge = (status: PostStatus) => {
    switch (status) {
      case 'published':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'ready':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'draft':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'to_prepare':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'needs_improvement':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'idea':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesLang = langFilter === 'all' || p.language === langFilter;
    return matchesStatus && matchesLang;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-600" />
            <span>30-Day Marketing Editorial Calendar</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Carefully paced, zero-spam international publication schedule across Pinterest, Facebook, LinkedIn, TikTok, YouTube, and Blog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleExportICS}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ICS (Calendar)</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filters:</span>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
        >
          <option value="all">All Statuses ({posts.length})</option>
          <option value="ready">Ready to Publish</option>
          <option value="draft">Drafts</option>
          <option value="to_prepare">To Prepare</option>
          <option value="published">Published</option>
          <option value="idea">Ideas</option>
        </select>

        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value as any)}
          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
        >
          <option value="all">All Languages</option>
          <option value="en">English (EN)</option>
          <option value="fr">French (FR)</option>
          <option value="ar">Arabic (AR)</option>
        </select>

        <span className="text-xs text-slate-500 ml-auto font-medium">
          Showing <span className="font-bold text-slate-900">{filteredPosts.length}</span> publications
        </span>
      </div>

      {/* List View */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white font-mono text-[10px] font-bold">
                      Day {post.dayIndex}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {post.date} at {post.time}
                    </span>
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {post.platform}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {post.language}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      • Tool: {post.toolId}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {post.topic}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center gap-3 shrink-0">
                  <select
                    value={post.status}
                    onChange={(e) => handleStatusChange(post.id, e.target.value as PostStatus)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer ${getStatusBadge(
                      post.status
                    )}`}
                  >
                    <option value="idea">Idea</option>
                    <option value="to_prepare">To Prepare</option>
                    <option value="draft">Draft</option>
                    <option value="ready">Ready to Publish</option>
                    <option value="published">Published</option>
                    <option value="needs_improvement">Needs Improvement</option>
                  </select>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold transition"
                  >
                    View / Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Grid Calendar View (30 Days) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-800">Day {post.dayIndex}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(post.status)}`}>
                    {post.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase text-indigo-600 mb-1">
                  {post.platform} • {post.language.toUpperCase()}
                </div>
                <h5 className="font-bold text-xs text-slate-900 line-clamp-2">
                  {post.topic}
                </h5>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                {post.date}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-indigo-600 uppercase">
                Day {selectedPost.dayIndex} • {selectedPost.platform} ({selectedPost.language.toUpperCase()})
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                Close
              </button>
            </div>

            <h3 className="font-black text-slate-900 text-base">{selectedPost.topic}</h3>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Post Content / Caption
              </label>
              <textarea
                rows={5}
                value={selectedPost.content}
                onChange={(e) => {
                  const updated = { ...selectedPost, content: e.target.value };
                  setSelectedPost(updated);
                  CalendarService.updatePost(updated);
                }}
                className="w-full p-3 text-xs text-slate-800 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Date & Time:</span>
                <span className="font-semibold text-slate-800">{selectedPost.date} at {selectedPost.time}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Visual Asset Type:</span>
                <span className="font-semibold text-indigo-600">{selectedPost.visualType}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedPost.content);
                  alert('Content copied!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
              >
                Copy Content
              </button>
              <button
                onClick={() => setSelectedPost(null)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
