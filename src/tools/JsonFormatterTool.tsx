import React, { useState } from 'react';
import { Copy, Check, Minimize2, Maximize2, AlertCircle, CheckCircle2, Play } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { AnalyticsService } from '../services/analyticsService';

const SAMPLE_JSON = {
  platform: 'SMARTTOOLS',
  version: '1.0.0',
  description: 'International productivity suite running client-side',
  tools: [
    { id: 'qr-code', name: 'QR Code Generator', status: 'active' },
    { id: 'image-compressor', name: 'Image Compressor', status: 'active' },
    { id: 'word-counter', name: 'Word Counter', status: 'active' },
  ],
  privacy: {
    clientSideOnly: true,
    serverDataTransmission: false,
  },
};

export const JsonFormatterTool: React.FC = () => {
  const { t, language } = useI18n();
  const [inputJson, setInputJson] = useState<string>(JSON.stringify(SAMPLE_JSON, null, 2));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [indentSize, setIndentSize] = useState<number>(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, indentSize));
      setErrorMsg(null);
      AnalyticsService.trackToolUse('json-formatter', 'format');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Invalid JSON syntax');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
      setErrorMsg(null);
      AnalyticsService.trackToolUse('json-formatter', 'minify');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInputJson(JSON.stringify(SAMPLE_JSON, null, indentSize));
    setErrorMsg(null);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={formatJson}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-sm"
          >
            <Maximize2 className="w-4 h-4" />
            <span>{language === 'ar' ? 'تنسيق وترتيب' : language === 'fr' ? 'Formater JSON' : 'Format / Beautify'}</span>
          </button>

          <button
            onClick={minifyJson}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm transition"
          >
            <Minimize2 className="w-4 h-4" />
            <span>{language === 'ar' ? 'ضغط (Minify)' : language === 'fr' ? 'Minifier' : 'Minify'}</span>
          </button>

          <select
            id="json-indent-select"
            name="jsonIndentSize"
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            aria-label={language === 'ar' ? 'مسافة المحاذاة' : language === 'fr' ? 'Taille de l\'indentation' : 'Indent Size'}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium"
          >
            <option value={2}>{language === 'ar' ? 'مسافتان للمحاذاة' : language === 'fr' ? 'Indentation 2 espaces' : '2 Spaces Indent'}</option>
            <option value={4}>{language === 'ar' ? '4 مسافات للمحاذاة' : language === 'fr' ? 'Indentation 4 espaces' : '4 Spaces Indent'}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadSample}
            className="px-3 py-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium rounded-lg hover:bg-indigo-50 transition"
          >
            {language === 'ar' ? 'تحميل نموذج تجريبي' : language === 'fr' ? 'Exemple de test' : 'Load Demo Sample'}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t('common.copied') : t('common.copy')}</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-bold block">
              {language === 'ar' ? 'خطأ في بنية JSON' : language === 'fr' ? 'Erreur de syntaxe JSON' : 'JSON Syntax Error'}
            </span>
            <span className="font-mono text-xs">{errorMsg}</span>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{language === 'ar' ? 'بنية كود JSON صحيحة وسليمة' : language === 'fr' ? 'Syntaxe JSON valide' : 'Valid JSON Structure'}</span>
        </div>
      )}

      {/* Editor Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <textarea
          id="json-editor-input"
          name="jsonInput"
          rows={16}
          value={inputJson}
          onChange={(e) => {
            setInputJson(e.target.value);
            try {
              JSON.parse(e.target.value);
              setErrorMsg(null);
            } catch (err: any) {
              setErrorMsg(err?.message || 'Syntax error');
            }
          }}
          aria-label={language === 'ar' ? 'محرر كود JSON' : language === 'fr' ? 'Éditeur de code JSON' : 'JSON code editor'}
          className="w-full p-4 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-transparent outline-none resize-y leading-relaxed"
          placeholder={language === 'ar' ? 'الصق كود JSON هنا للتنسيق والفحص...' : language === 'fr' ? 'Collez votre code JSON ici...' : 'Paste JSON here...'}
        />
      </div>
    </div>
  );
};
