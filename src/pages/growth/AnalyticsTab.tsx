import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Upload,
  Globe,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Trash2,
  Activity,
  BarChart2,
} from 'lucide-react';
import { AnalyticsService, GscReportSummary, AnalyticsEvent } from '../../services/analyticsService';
import { StorageService } from '../../services/storage';

export const AnalyticsTab: React.FC = () => {
  const [gscReport, setGscReport] = useState<GscReportSummary | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [measurementId, setMeasurementId] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const settings = StorageService.getSettings();
    setMeasurementId(settings.gaMeasurementId || '');
    setGscReport(AnalyticsService.getSavedGscReport());
    setEvents(AnalyticsService.getBufferedEvents());
  }, []);

  const handleSaveGa = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = StorageService.getSettings();
    settings.gaMeasurementId = measurementId.trim();
    StorageService.saveSettings(settings);
    AnalyticsService.initGa();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const report = AnalyticsService.parseGscCsv(reader.result);
        setGscReport(report);
      }
    };
    reader.readAsText(file);
  };

  const handleClearEvents = () => {
    AnalyticsService.clearBufferedEvents();
    setEvents([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <span>Traffic Analytics & Search Console Integration</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Measure genuine visitors, client-side tool interactions, and Google organic search clicks.
        </p>
      </div>

      {/* GA4 Setup & Privacy Box */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span>Google Analytics 4 (GA4) Integration</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your official Measurement ID to enable traffic tracking.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Strict Client-Side Privacy Guaranteed</span>
          </div>
        </div>

        <form onSubmit={handleSaveGa} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={measurementId}
            onChange={(e) => setMeasurementId(e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-xs uppercase outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition active:scale-95"
          >
            {savedSuccess ? 'Saved & Activated!' : 'Save Measurement ID'}
          </button>
        </form>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <span className="font-bold text-slate-800 block">Privacy Notice:</span>
          <p>
            SMARTTOOLS only tracks anonymous operational events (e.g., page views, language switches, which tool was opened).
            <strong> No passwords, images, uploaded files, or user texts are ever transmitted.</strong>
          </p>
        </div>
      </div>

      {/* Google Search Console Hub */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Google Search Console Performance Hub</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Import your official Search Console CSV report to view genuine impressions, CTR, and keyword rankings.
            </p>
          </div>

          <label className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 cursor-pointer transition">
            <Upload className="w-4 h-4" />
            <span>Import Search Console CSV</span>
            <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
          </label>
        </div>

        {gscReport ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-xs font-bold text-indigo-800 uppercase">Google Clicks</span>
                <div className="text-2xl font-black text-indigo-950 mt-1">
                  {gscReport.totalClicks.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Impressions</span>
                <div className="text-2xl font-black text-slate-800 mt-1">
                  {gscReport.totalImpressions.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Average CTR</span>
                <div className="text-2xl font-black text-emerald-600 mt-1">
                  {gscReport.avgCtr}%
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Average Position</span>
                <div className="text-2xl font-black text-slate-800 mt-1">
                  {gscReport.avgPosition}
                </div>
              </div>
            </div>

            {/* Top Queries Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Top Search Queries Driving Organic Traffic
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="py-2.5 px-4">Search Query</th>
                      <th className="py-2.5 px-4 text-right">Clicks</th>
                      <th className="py-2.5 px-4 text-right">Impressions</th>
                      <th className="py-2.5 px-4 text-right">CTR</th>
                      <th className="py-2.5 px-4 text-right">Avg Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {gscReport.topQueries.slice(0, 10).map((q, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">{q.query}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-indigo-600">{q.clicks}</td>
                        <td className="py-2.5 px-4 text-right font-mono">{q.impressions}</td>
                        <td className="py-2.5 px-4 text-right font-mono">{q.ctr}%</td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-500">{q.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <div className="space-y-1 text-xs text-slate-600">
                <span className="font-bold text-slate-900 text-sm block">How to connect Google Search Console:</span>
                <ol className="list-decimal ml-4 space-y-1 text-slate-600">
                  <li>Visit <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">search.google.com/search-console</a>.</li>
                  <li>Add your domain and verify ownership via DNS TXT record or HTML meta tag.</li>
                  <li>Submit your sitemap: <code className="bg-white px-1.5 py-0.5 rounded border">https://smarttools.app/sitemap.xml</code>.</li>
                  <li>Once Google collects clicks, click "Export" &rarr; "Download CSV" in Search Console and import the file here.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Buffered Client-Side Events */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Live Local Events Log ({events.length} captured)
            </h3>
          </div>
          {events.length > 0 && (
            <button
              onClick={handleClearEvents}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          )}
        </div>

        {events.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            No interactions logged yet. Open tools or click around to see live events.
          </p>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {events.slice(0, 15).map((ev) => (
              <div
                key={ev.id}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-indigo-600">{ev.eventName}</span>
                  <span className="text-slate-400">({JSON.stringify(ev.params)})</span>
                </div>
                <span className="text-slate-400 text-[10px]">{new Date(ev.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
