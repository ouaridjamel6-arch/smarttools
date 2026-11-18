import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Eye, Code, FileText } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { AnalyticsService } from '../services/analyticsService';

const SAMPLE_MD = `# SMARTTOOLS Documentation

Welcome to **SMARTTOOLS**, the international suite of client-side online utilities.

## Key Advantages
- **100% Free**: No recurring subscriptions or hidden limits.
- **Privacy First**: Files and text remain in your web browser.
- **High Performance**: Instant results powered by native HTML5 and WebAssembly.

> "Simplicity is the prerequisite for reliability." — Edsger W. Dijkstra

### Sample Code
\`\`\`javascript
const site = 'SMARTTOOLS';
console.log(\`Boost your productivity with \${site}\`);
\`\`\`

Visit [SMARTTOOLS](https://smarttools-um7.pages.dev) to explore all available tools!
`;

export const MarkdownTool: React.FC = () => {
  const { t, language } = useI18n();
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MD);
  const [viewTab, setViewTab] = useState<'preview' | 'html'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  // Simple, secure, zero-dependency Markdown to HTML parser
  const htmlOutput = useMemo(() => {
    let out = markdown;

    // Escape raw HTML entities to prevent XSS
    out = out
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks ```code```
    out = out.replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)```/g, (_m, lang, code) => {
      return `<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl my-4 overflow-x-auto font-mono text-xs"><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    // Inline code `code`
    out = out.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');

    // Headings
    out = out.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-800 mt-4 mb-2">$1</h3>');
    out = out.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-800 mt-6 mb-3 border-b pb-1">$1</h2>');
    out = out.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-slate-900 mt-2 mb-4">$1</h1>');

    // Blockquotes
    out = out.replace(/^&gt; (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1 italic text-slate-600 my-3 bg-slate-50 rounded-r">$1</blockquote>');

    // Bold & Italic
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
    out = out.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

    // Links [text](url)
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline font-medium">$1</a>');

    // Unordered lists
    out = out.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 my-1">$1</li>');

    // Paragraphs
    const paras = out.split(/\n\n+/);
    out = paras
      .map((p) => {
        const trimmed = p.trim();
        if (
          trimmed.startsWith('<h') ||
          trimmed.startsWith('<pre') ||
          trimmed.startsWith('<blockquote') ||
          trimmed.startsWith('<li')
        ) {
          return trimmed;
        }
        return `<p class="my-2 text-slate-700 leading-relaxed">${trimmed.replace(/\n/g, '<br/>')}</p>`;
      })
      .join('\n');

    return out;
  }, [markdown]);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    AnalyticsService.trackToolUse('markdown-previewer', 'copy_html');
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Exported from SMARTTOOLS</title></head><body>${htmlOutput}</body></html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.download = `smarttools-markdown-${Date.now()}.html`;
    link.href = URL.createObjectURL(blob);
    link.click();
    AnalyticsService.trackDownload('markdown-previewer', 'html');
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {language === 'ar' ? 'محرر Markdown المزدوج' : language === 'fr' ? 'Espace Markdown Scindé' : 'Split-View Markdown Workspace'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => setViewTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                viewTab === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'معاينة مرئية' : language === 'fr' ? 'Visuel' : 'Visual'}</span>
            </button>
            <button
              onClick={() => setViewTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                viewTab === 'html' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'كود HTML' : language === 'fr' ? 'Code HTML' : 'HTML'}</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t('common.copied') : (language === 'ar' ? 'نسخ HTML' : language === 'fr' ? 'Copier HTML' : 'Copy HTML')}</span>
          </button>

          <button
            onClick={handleDownload}
            title={language === 'ar' ? 'تحميل ملف HTML' : language === 'fr' ? 'Télécharger le fichier HTML' : 'Download HTML file'}
            aria-label={language === 'ar' ? 'تحميل كود HTML' : language === 'fr' ? 'Télécharger le code HTML' : 'Download compiled HTML'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.HTML</span>
          </button>
        </div>
      </div>

      {/* Split Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 shadow-sm">
          <label htmlFor="markdown-source-input" className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 cursor-pointer">
            {language === 'ar' ? 'مصدر Markdown' : language === 'fr' ? 'Code Source Markdown' : 'Markdown Source'}
          </label>
          <textarea
            id="markdown-source-input"
            name="markdownSource"
            rows={18}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            aria-label={language === 'ar' ? 'محرر لغة Markdown' : language === 'fr' ? 'Éditeur de code Markdown' : 'Markdown source code editor'}
            placeholder={language === 'ar' ? 'اكتب كود Markdown هنا...' : language === 'fr' ? 'Tapez votre Markdown ici...' : 'Type your Markdown here...'}
            className="w-full p-3 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 outline-none leading-relaxed resize-y"
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm overflow-y-auto max-h-[500px]">
          {viewTab === 'preview' ? (
            <div
              className="prose prose-slate max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          ) : (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                {language === 'ar' ? 'كود HTML المُصرّف' : language === 'fr' ? 'Sortie HTML Compilée' : 'Compiled HTML Output'}
              </label>
              <pre className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {htmlOutput}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
