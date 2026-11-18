import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { AnalyticsService } from '../services/analyticsService';

export const QrCodeTool: React.FC = () => {
  const { t, language } = useI18n();
  const [text, setText] = useState('https://smarttools.app');
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(320);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    generateQr();
  }, [text, fgColor, bgColor, size, errorLevel]);

  const generateQr = async () => {
    if (!canvasRef.current || !text) return;
    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorLevel,
      });
      AnalyticsService.trackToolUse('qr-code', 'generate');
    } catch (err) {
      console.error('QR generation error:', err);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `smarttools-qrcode-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    AnalyticsService.trackDownload('qr-code', 'png');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Settings / Controls */}
      <div className="lg:col-span-7 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            {language === 'ar' ? 'الرابط أو النص المراد تحويله' : language === 'fr' ? 'Lien ou texte à encoder' : 'URL or Text to encode'}
          </label>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {language === 'ar' ? 'لون الرمز (Foreground)' : language === 'fr' ? 'Couleur du QR Code' : 'Foreground Color'}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border border-slate-300"
              />
              <span className="font-mono text-sm text-slate-600 uppercase">{fgColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {language === 'ar' ? 'لون الخلفية (Background)' : language === 'fr' ? 'Couleur d\'Arrière-plan' : 'Background Color'}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border border-slate-300"
              />
              <span className="font-mono text-sm text-slate-600 uppercase">{bgColor}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              <span>{language === 'ar' ? 'أبعاد الصورة' : language === 'fr' ? 'Taille en pixels' : 'Output Dimension'}</span>
              <span className="font-mono text-indigo-600 font-semibold">{size}px</span>
            </div>
            <input
              type="range"
              min={160}
              max={640}
              step={32}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {language === 'ar' ? 'مستوى تصحيح الأخطاء' : language === 'fr' ? 'Correction d\'erreur' : 'Error Correction'}
            </label>
            <select
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="L">L — Low (7% recovery)</option>
              <option value="M">M — Medium (15% recovery)</option>
              <option value="Q">Q — Quartile (25% recovery)</option>
              <option value="H">H — High (30% best for print)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {['https://smarttools.app', 'WIFI:S:MyWifi;T:WPA;P:password;;', 'mailto:contact@smarttools.app'].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setText(sample)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              + {sample.slice(0, 22)}...
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview & Actions */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner flex items-center justify-center max-w-full overflow-hidden">
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-sm" />
        </div>

        <p className="text-xs text-slate-500 mt-3 font-medium">
          {language === 'ar' ? 'جاهز للطباعة والمسح الفوري' : language === 'fr' ? 'Prêt à l\'impression et scan immédiat' : 'Ready to print & scan instantly'}
        </p>

        <div className="flex flex-wrap gap-3 mt-6 w-full justify-center">
          <button
            onClick={handleDownload}
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-100 transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{t('common.download')} PNG</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t('common.copied') : t('common.copy')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
