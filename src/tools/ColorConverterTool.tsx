import React, { useState } from 'react';
import { Copy, Check, Palette, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { AnalyticsService } from '../services/analyticsService';

export const ColorConverterTool: React.FC = () => {
  const { t, language } = useI18n();
  const [hex, setHex] = useState<string>('#4F46E5');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // HEX to RGB
  const hexToRgb = (hexStr: string) => {
    let clean = hexStr.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // WCAG Relative Luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum = getLuminance(rgb.r, rgb.g, rgb.b);
  const contrastWhite = parseFloat(((1.05) / (lum + 0.05)).toFixed(2));
  const contrastBlack = parseFloat(((lum + 0.05) / 0.05).toFixed(2));

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
    AnalyticsService.trackToolUse('color-converter', 'copy');
  };

  return (
    <div className="space-y-8">
      {/* Visual Color Preview Card */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex flex-col items-center">
          <div
            className="w-44 h-44 rounded-3xl shadow-lg border-4 border-white transition-all flex items-end justify-center pb-4"
            style={{ backgroundColor: hex }}
          >
            <input
              id="color-picker-input"
              name="colorPicker"
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value.toUpperCase())}
              aria-label={language === 'ar' ? 'منتقي الألوان التفاعلي' : language === 'fr' ? 'Sélecteur de couleur interactif' : 'Interactive visual color picker'}
              className="opacity-0 w-full h-full absolute cursor-pointer"
            />
            <span
              className="px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md"
              style={{
                backgroundColor: lum > 0.5 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
                color: lum > 0.5 ? '#fff' : '#000',
              }}
            >
              {language === 'ar' ? 'اضغط لتغيير اللون' : language === 'fr' ? 'Cliquer pour changer' : 'Click to pick'}
            </span>
          </div>
        </div>

        {/* Formats values */}
        <div className="md:col-span-7 space-y-3">
          {[
            { label: 'HEX', val: hex },
            { label: 'RGB', val: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
            { label: 'HSL', val: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
            { label: 'CSS Variable', val: `--color-primary: ${hex};` },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200"
            >
              <div>
                <span className="text-xs font-bold text-slate-400 block">{item.label}</span>
                <span className="font-mono text-sm font-semibold text-slate-800">{item.val}</span>
              </div>
              <button
                onClick={() => copyVal(item.val, item.label)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-700 transition"
              >
                {copiedKey === item.label ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === item.label ? t('common.copied') : t('common.copy')}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WCAG Contrast Meter */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>{language === 'ar' ? 'فحص نسبة التباين وسهولة القراءة (WCAG AA)' : language === 'fr' ? 'Audit d\'accessibilité et contraste WCAG AA' : 'WCAG AA Accessibility Contrast Checker'}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contrast White */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base" style={{ backgroundColor: hex, color: '#FFFFFF' }}>
                Aa
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">
                  {language === 'ar' ? 'نص أبيض (#FFFFFF)' : language === 'fr' ? 'Texte blanc (#FFFFFF)' : 'White Text (#FFFFFF)'}
                </span>
                <span className="text-lg font-black text-slate-800">{contrastWhite}:1</span>
              </div>
            </div>
            {contrastWhite >= 4.5 ? (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'ar' ? 'ناجح AA' : language === 'fr' ? 'Conforme AA' : 'Pass AA'}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5" /> {language === 'ar' ? 'راسب AA' : language === 'fr' ? 'Insuffisant AA' : 'Fail AA'}
              </span>
            )}
          </div>

          {/* Contrast Black */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base" style={{ backgroundColor: hex, color: '#000000' }}>
                Aa
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">
                  {language === 'ar' ? 'نص أسود (#000000)' : language === 'fr' ? 'Texte noir (#000000)' : 'Black Text (#000000)'}
                </span>
                <span className="text-lg font-black">{contrastBlack}:1</span>
              </div>
            </div>
            {contrastBlack >= 4.5 ? (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'ar' ? 'ناجح AA' : language === 'fr' ? 'Conforme AA' : 'Pass AA'}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-800">
                <XCircle className="w-3.5 h-3.5" /> {language === 'ar' ? 'راسب AA' : language === 'fr' ? 'Insuffisant AA' : 'Fail AA'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
