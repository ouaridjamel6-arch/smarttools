import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Download,
  Upload,
  Sparkles,
  Filter,
  Check,
  Tag,
  Globe,
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { TOOLS_DATA } from '../../data/toolsData';
import { KeywordItem, Language, SearchIntent } from '../../types';

export const KeywordsTab: React.FC = () => {
  const [keywords, setKeywords] = useState<KeywordItem[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [langFilter, setLangFilter] = useState<'all' | Language>('all');
  const [intentFilter, setIntentFilter] = useState<'all' | SearchIntent>('all');
  const [toolFilter, setToolFilter] = useState<string>('all');

  // New Keyword Form Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newLang, setNewLang] = useState<Language>('en');
  const [newTool, setNewTool] = useState(TOOLS_DATA[0].id);
  const [newIntent, setNewIntent] = useState<SearchIntent>('transactional');
  const [newCluster, setNewCluster] = useState('General');

  // Suggestion Generator State
  const [suggestionTool, setSuggestionTool] = useState(TOOLS_DATA[0].id);

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = () => {
    setKeywords(StorageService.getKeywords());
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    const targetTool = TOOLS_DATA.find((t) => t.id === newTool) || TOOLS_DATA[0];
    StorageService.addKeyword({
      keyword: newKeyword.trim().toLowerCase(),
      language: newLang,
      toolId: newTool,
      intent: newIntent,
      targetPage: `/tool/${targetTool.slug}`,
      cluster: newCluster.trim() || 'General',
    });
    setNewKeyword('');
    setIsAddOpen(false);
    loadKeywords();
  };

  const handleDelete = (id: string) => {
    StorageService.deleteKeyword(id);
    loadKeywords();
  };

  const handleExportCSV = () => {
    const csv = StorageService.exportKeywordsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.download = `smarttools-keywords-${Date.now()}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  // Generate automated suggestions for selected tool
  const generateSuggestions = () => {
    const tool = TOOLS_DATA.find((t) => t.id === suggestionTool) || TOOLS_DATA[0];
    const enName = tool.name.en.toLowerCase();
    const frName = tool.name.fr.toLowerCase();
    const arName = tool.name.ar;

    const suggestions: Omit<KeywordItem, 'id' | 'dateAdded'>[] = [
      { keyword: `free ${enName} online`, language: 'en', toolId: tool.id, intent: 'transactional', targetPage: `/tool/${tool.slug}`, cluster: 'Generated Suggestions' },
      { keyword: `best client side ${enName}`, language: 'en', toolId: tool.id, intent: 'commercial', targetPage: `/tool/${tool.slug}`, cluster: 'Generated Suggestions' },
      { keyword: `how to use ${enName}`, language: 'en', toolId: tool.id, intent: 'informational', targetPage: `/tool/${tool.slug}`, cluster: 'Generated Suggestions' },
      { keyword: `${frName} gratuit en ligne`, language: 'fr', toolId: tool.id, intent: 'transactional', targetPage: `/tool/${tool.slug}`, cluster: 'Suggestions FR' },
      { keyword: `meilleur ${frName} sans pub`, language: 'fr', toolId: tool.id, intent: 'commercial', targetPage: `/tool/${tool.slug}`, cluster: 'Suggestions FR' },
      { keyword: `${arName} مجاني سريع`, language: 'ar', toolId: tool.id, intent: 'transactional', targetPage: `/tool/${tool.slug}`, cluster: 'اقتراحات عربية' },
      { keyword: `طريقة استخدام ${arName}`, language: 'ar', toolId: tool.id, intent: 'informational', targetPage: `/tool/${tool.slug}`, cluster: 'اقتراحات عربية' },
    ];

    suggestions.forEach((s) => StorageService.addKeyword(s));
    loadKeywords();
  };

  const filtered = keywords.filter((k) => {
    const matchesSearch = !searchFilter || k.keyword.toLowerCase().includes(searchFilter.toLowerCase()) || k.cluster.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesLang = langFilter === 'all' || k.language === langFilter;
    const matchesIntent = intentFilter === 'all' || k.intent === intentFilter;
    const matchesTool = toolFilter === 'all' || k.toolId === toolFilter;
    return matchesSearch && matchesLang && matchesIntent && matchesTool;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600" />
            <span>Keyword Research & Target Tracking</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize high-intent organic keywords across English, French, and Arabic. Classified by search intent and tool clusters.
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
            <span>Add Keyword</span>
          </button>
        </div>
      </div>

      {/* Suggestion Bar */}
      <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-xs font-bold text-indigo-900">
            Generate Multi-lingual Keyword Suggestions (EN / FR / AR):
          </span>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={suggestionTool}
            onChange={(e) => setSuggestionTool(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-indigo-200 bg-white text-xs font-semibold text-slate-700"
          >
            {TOOLS_DATA.map((t) => (
              <option key={t.id} value={t.id}>{t.name.en}</option>
            ))}
          </select>
          <button
            onClick={generateSuggestions}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
          >
            + Generate 7 Keywords
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search keywords or cluster..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value as any)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
        >
          <option value="all">All Languages</option>
          <option value="en">English (EN)</option>
          <option value="fr">French (FR)</option>
          <option value="ar">Arabic (AR)</option>
        </select>

        <select
          value={intentFilter}
          onChange={(e) => setIntentFilter(e.target.value as any)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
        >
          <option value="all">All Intents</option>
          <option value="transactional">Transactional</option>
          <option value="informational">Informational</option>
          <option value="commercial">Commercial</option>
          <option value="navigational">Navigational</option>
        </select>

        <select
          value={toolFilter}
          onChange={(e) => setToolFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
        >
          <option value="all">All Tools</option>
          {TOOLS_DATA.map((t) => (
            <option key={t.id} value={t.id}>{t.name.en}</option>
          ))}
        </select>
      </div>

      {/* Keywords Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Keyword</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Tool</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4">Cluster</th>
                <th className="py-3 px-4">Target Route</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">{item.keyword}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {item.language}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-indigo-600 font-semibold">{item.toolId}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        item.intent === 'transactional'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.intent === 'commercial'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.intent}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{item.cluster}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{item.targetPage}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-right text-xs text-slate-500">
          Total Keywords: <span className="font-bold text-slate-800">{filtered.length}</span>
        </div>
      </div>

      {/* Add Keyword Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddKeyword}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <h3 className="font-bold text-slate-900 text-base">Add New Keyword Target</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Keyword</label>
              <input
                type="text"
                required
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="e.g. compress image webp"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Language</label>
                <select
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                >
                  <option value="en">English (EN)</option>
                  <option value="fr">Français (FR)</option>
                  <option value="ar">العربية (AR)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Tool</label>
                <select
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                >
                  {TOOLS_DATA.map((t) => (
                    <option key={t.id} value={t.id}>{t.name.en}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Search Intent</label>
                <select
                  value={newIntent}
                  onChange={(e) => setNewIntent(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                >
                  <option value="transactional">Transactional</option>
                  <option value="commercial">Commercial</option>
                  <option value="informational">Informational</option>
                  <option value="navigational">Navigational</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thematic Cluster</label>
                <input
                  type="text"
                  value={newCluster}
                  onChange={(e) => setNewCluster(e.target.value)}
                  placeholder="e.g. Compression FR"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
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
                Save Keyword
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
