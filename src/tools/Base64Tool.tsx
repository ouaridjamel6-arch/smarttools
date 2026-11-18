import React, { useState } from 'react';
import { Copy, Check, ArrowLeftRight, Upload } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { AnalyticsService } from '../services/analyticsService';

export const Base64Tool: React.FC = () => {
  const { t, language } = useI18n();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputVal, setInputVal] = useState<string>('Hello SMARTTOOLS!');
  const [outputVal, setOutputVal] = useState<string>('SGVsbG8gU01BUlRUT09MUyE=');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Robust UTF-8 safe encode/decode
  const handleConvert = (text: string, currentMode: 'encode' | 'decode') => {
    setErrorMsg(null);
    if (!text) {
      setOutputVal('');
      return;
    }
    try {
      if (currentMode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        setOutputVal(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(text)));
        setOutputVal(decoded);
      }
      AnalyticsService.trackToolUse('base64-converter', currentMode);
    } catch (err: any) {
      setErrorMsg(language === 'ar' ? 'نص Base64 غير صالح لفك التشفير' : language === 'fr' ? 'Base64 invalide pour décodage' : 'Invalid Base64 string for decoding');
    }
  };

  const handleInputChange = (val: string) => {
    setInputVal(val);
    handleConvert(val, mode);
  };

  const switchMode = () => {
    const nextMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(nextMode);
    setInputVal(outputVal);
    handleConvert(outputVal, nextMode);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setInputVal(`[File: ${file.name}]`);
        setOutputVal(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => {
              setMode('encode');
              handleConvert(inputVal, 'encode');
            }}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition ${
              mode === 'encode' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'تشفير إلى Base64' : language === 'fr' ? 'Encoder vers Base64' : 'Encode to Base64'}
          </button>
          <button
            onClick={() => {
              setMode('decode');
              handleConvert(inputVal, 'decode');
            }}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition ${
              mode === 'decode' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'فك شفرة Base64' : language === 'fr' ? 'Décoder Base64' : 'Decode from Base64'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700 transition">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>{language === 'ar' ? 'تحويل ملف لـ Data URI' : language === 'fr' ? 'Fichier vers Data URI' : 'File to Data URI'}</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={switchMode}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>{language === 'ar' ? 'عكس الحقول' : language === 'fr' ? 'Inverser' : 'Swap Input / Output'}</span>
          </button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <label htmlFor="base64-source-input" className="text-xs font-bold text-slate-500 uppercase tracking-wider block cursor-pointer">
            {mode === 'encode' ? (language === 'ar' ? 'النص الأصلي للتحويل' : language === 'fr' ? 'Texte brut à encoder' : 'Plain Text Input') : (language === 'ar' ? 'شفرة Base64 المدخلة' : language === 'fr' ? 'Code Base64 à décoder' : 'Base64 Input')}
          </label>
          <textarea
            id="base64-source-input"
            name="base64Source"
            rows={10}
            value={inputVal}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={language === 'ar' ? 'اكتب أو الصق المحتوى هنا...' : language === 'fr' ? 'Tapez ou collez votre contenu ici...' : 'Type or paste content here...'}
            aria-label={mode === 'encode' ? 'Texte à encoder en Base64' : 'Code Base64 à décoder'}
            className="w-full p-3 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="base64-result-output" className="text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer">
                {mode === 'encode' ? (language === 'ar' ? 'نتيجة Base64 المرمزة' : language === 'fr' ? 'Résultat Base64' : 'Base64 Output') : (language === 'ar' ? 'النص المفكوك الناتج' : language === 'fr' ? 'Texte décodé' : 'Decoded Text Output')}
              </label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('common.copied') : t('common.copy')}</span>
              </button>
            </div>
            <textarea
              id="base64-result-output"
              name="base64Result"
              readOnly
              rows={10}
              value={outputVal}
              aria-label={mode === 'encode' ? 'Résultat Base64 obtenu' : 'Texte résultant après décodage'}
              className="w-full p-3 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-100 bg-slate-50 rounded-xl border border-slate-200 outline-none leading-relaxed"
            />
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
