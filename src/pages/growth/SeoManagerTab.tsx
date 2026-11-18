import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Download,
  FileCode,
  RefreshCw,
  ExternalLink,
  Code,
} from 'lucide-react';
import { SeoAuditService } from '../../services/seoAuditService';
import { SeoService } from '../../services/seoService';
import { TOOLS_DATA } from '../../data/toolsData';
import { SeoAuditResult, Language } from '../../types';

export const SeoManagerTab: React.FC = () => {
  const [audit, setAudit] = useState<SeoAuditResult>(() => SeoAuditService.runComprehensiveAudit());
  const [filterType, setFilterType] = useState<'all' | 'error' | 'warning'>('all');
  const [previewModal, setPreviewModal] = useState<'sitemap' | 'robots' | 'schema' | null>(null);
  const [selectedToolForSchema, setSelectedToolForSchema] = useState<string>('qr-code');
  const [schemaLang, setSchemaLang] = useState<Language>('en');

  const reRunAudit = () => {
    setAudit(SeoAuditService.runComprehensiveAudit());
  };

  const filteredIssues = audit.issues.filter((issue) => {
    if (filterType === 'all') return true;
    return issue.type === filterType;
  });

  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const sitemapContent = SeoService.generateSitemapXml();
  const robotsContent = SeoService.generateRobotsTxt();

  const toolForSchema = TOOLS_DATA.find((t) => t.id === selectedToolForSchema) || TOOLS_DATA[0];
  const schemaContent = JSON.stringify(SeoService.generateToolSchema(toolForSchema, schemaLang), null, 2);

  return (
    <div className="space-y-8">
      {/* Header & Score Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Automated Technical SEO Engine</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            SEO Manager & Live Audit
          </h2>
          <p className="text-xs text-slate-500 max-w-xl">
            Continuously monitors title length, descriptions, H1 tags, FAQ snippets, Open Graph, canonical tags, and hreflang multilingual routing across English, French, and Arabic.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-200 min-w-[120px]">
            <span className="text-3xl font-black text-emerald-600 block">
              {audit.overallScore}%
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Health Score
            </span>
          </div>

          <button
            onClick={reRunAudit}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Re-Scan Now</span>
          </button>
        </div>
      </div>

      {/* Generator Buttons: Sitemap, Robots, Schema */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Sitemap Generator */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-white text-sm">sitemap.xml</span>
              <FileCode className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-xs text-slate-500">
              Covers {audit.totalPagesScanned} routes with trilingual alternate hreflang tags.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewModal('sitemap')}
              className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
            >
              Preview
            </button>
            <button
              onClick={() => downloadFile('sitemap.xml', sitemapContent, 'application/xml')}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center gap-1 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>XML</span>
            </button>
          </div>
        </div>

        {/* Robots.txt Generator */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-white text-sm">robots.txt</span>
              <FileCode className="w-4 h-4 text-cyan-600" />
            </div>
            <p className="text-xs text-slate-500">
              Allows public crawlers while protecting private admin growth routes.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewModal('robots')}
              className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
            >
              Preview
            </button>
            <button
              onClick={() => downloadFile('robots.txt', robotsContent, 'text/plain')}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 flex items-center gap-1 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>TXT</span>
            </button>
          </div>
        </div>

        {/* Schema Inspector */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Schema.org JSON-LD</span>
              <Code className="w-4 h-4 text-violet-600" />
            </div>
            <p className="text-xs text-slate-500">
              WebApplication, FAQPage & Breadcrumbs schemas for Google rich snippets.
            </p>
          </div>
          <button
            onClick={() => setPreviewModal('schema')}
            className="w-full py-2 text-xs font-semibold rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 transition"
          >
            Inspect Schema JSON &rarr;
          </button>
        </div>
      </div>

      {/* Audit Issue Findings */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Audit Findings & Optimizations
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {audit.issues.length} detected
            </span>
          </div>

          <div className="flex gap-1.5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                filterType === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All ({audit.issues.length})
            </button>
            <button
              onClick={() => setFilterType('error')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                filterType === 'error' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700'
              }`}
            >
              Errors ({audit.errorsCount})
            </button>
            <button
              onClick={() => setFilterType('warning')}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                filterType === 'warning' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700'
              }`}
            >
              Warnings ({audit.warningsCount})
            </button>
          </div>
        </div>

        {filteredIssues.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="text-sm font-bold text-slate-800">Everything looks great!</p>
            <p className="text-xs text-slate-500">No issues found in this category.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredIssues.map((issue, idx) => (
              <div key={idx} className="py-3.5 flex items-start gap-3">
                {issue.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{issue.page}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {issue.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{issue.message}</p>
                  <p className="text-xs text-indigo-600 font-semibold">💡 {issue.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Inspector */}
      {previewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {previewModal === 'sitemap' ? 'sitemap.xml Preview' : previewModal === 'robots' ? 'robots.txt Preview' : 'Schema.org JSON-LD'}
              </h3>
              <button
                onClick={() => setPreviewModal(null)}
                className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                Close
              </button>
            </div>

            {previewModal === 'schema' && (
              <div className="flex gap-3">
                <select
                  value={selectedToolForSchema}
                  onChange={(e) => setSelectedToolForSchema(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                >
                  {TOOLS_DATA.map((t) => (
                    <option key={t.id} value={t.id}>{t.name.en}</option>
                  ))}
                </select>
                <select
                  value={schemaLang}
                  onChange={(e) => setSchemaLang(e.target.value as any)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              <pre className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed">
                {previewModal === 'sitemap' ? sitemapContent : previewModal === 'robots' ? robotsContent : schemaContent}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
