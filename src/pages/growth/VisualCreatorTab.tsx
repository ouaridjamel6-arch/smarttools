import React, { useState, useEffect, useRef } from 'react';
import { Download, Sparkles, Image as ImageIcon, RefreshCw, Palette } from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';
import { Language, ToolDefinition } from '../../types';
import { useI18n } from '../../i18n/I18nContext';
import { SeoService } from '../../services/seoService';

export const VisualCreatorTab: React.FC = () => {
  const { t } = useI18n();
  const [selectedToolId, setSelectedToolId] = useState<string>('qr-code');
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [format, setFormat] = useState<'square' | 'vertical' | 'banner' | 'pinterest'>('square');
  const [themeColor, setThemeColor] = useState<string>('#4F46E5'); // Indigo
  const [headline, setHeadline] = useState<string>('100% Free QR Code Generator');
  const [subheadline, setSubheadline] = useState<string>('High-Resolution • Instant Download • No Sign Up Required');
  const [badgeText, setBadgeText] = useState<string>('SMARTTOOLS • 100% PRIVATE');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedTool = TOOLS_DATA.find((t) => t.id === selectedToolId) || TOOLS_DATA[0];

  // Auto-fill defaults on tool or language change
  useEffect(() => {
    if (selectedLang === 'ar') {
      setHeadline(`أداة ${selectedTool.name.ar} مجاناً`);
      setSubheadline('معالجة فورية فائقة السرعة • خصوصية مطلقة 100% • بدون تسجيل');
      setBadgeText('SMARTTOOLS • مجاني 100%');
    } else if (selectedLang === 'fr') {
      setHeadline(`${selectedTool.name.fr} 100% Gratuit`);
      setSubheadline('Traitement ultra-rapide • Confidentialité totale • Zéro inscription');
      setBadgeText('SMARTTOOLS • 100% PRIVÉ');
    } else {
      setHeadline(`100% Free ${selectedTool.name.en}`);
      setSubheadline('High-Resolution • Instant Download • No Sign Up Required');
      setBadgeText('SMARTTOOLS • 100% PRIVATE');
    }
  }, [selectedToolId, selectedLang]);

  useEffect(() => {
    drawCanvas();
  }, [selectedToolId, selectedLang, format, themeColor, headline, subheadline, badgeText]);

  const getDimensions = () => {
    switch (format) {
      case 'square': return { width: 1080, height: 1080, label: '1080 × 1080 (Square / Instagram / Meta)' };
      case 'vertical': return { width: 1080, height: 1920, label: '1080 × 1920 (Story / TikTok / Shorts)' };
      case 'banner': return { width: 1200, height: 630, label: '1200 × 630 (Web Share / Twitter / LinkedIn)' };
      case 'pinterest': return { width: 1000, height: 1500, label: '1000 × 1500 (Pinterest Optimal Pin)' };
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = getDimensions();
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0F172A'); // Slate 900
    bgGrad.addColorStop(0.6, '#1E293B'); // Slate 800
    bgGrad.addColorStop(1, '#020617'); // Slate 950
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Accent Glow Sphere
    const glow = ctx.createRadialGradient(width * 0.8, height * 0.2, 50, width * 0.8, height * 0.2, width * 0.6);
    glow.addColorStop(0, themeColor + '66');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // Top Brand Badge
    ctx.fillStyle = themeColor;
    const badgeW = 420;
    const badgeH = 54;
    const badgeX = (width - badgeW) / 2;
    const badgeY = height * 0.12;
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 27);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Inter, Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, width / 2, badgeY + badgeH / 2);

    // Main Card Box
    const cardMarginX = width * 0.08;
    const cardW = width - cardMarginX * 2;
    const cardH = height * 0.58;
    const cardY = height * 0.22;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    roundRect(ctx, cardMarginX, cardY, cardW, cardH, 40);
    ctx.fill();
    ctx.stroke();

    // Central Icon Circle
    const iconY = cardY + 120;
    ctx.fillStyle = themeColor;
    ctx.beginPath();
    ctx.arc(width / 2, iconY, 65, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 50px Inter, sans-serif';
    ctx.fillText('⚡', width / 2, iconY + 5);

    // Headline
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 54px Inter, Cairo, sans-serif';
    wrapText(ctx, headline, width / 2, iconY + 130, cardW - 100, 68);

    // Subheadline
    ctx.fillStyle = '#94A3B8'; // Slate 400
    ctx.font = '500 28px Inter, Cairo, sans-serif';
    wrapText(ctx, subheadline, width / 2, iconY + 280, cardW - 120, 42);

    // Bottom Call To Action Pill
    const ctaW = 480;
    const ctaH = 74;
    const ctaX = (width - ctaW) / 2;
    const ctaY = height * 0.84;

    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, ctaX, ctaY, ctaW, ctaH, 37);
    ctx.fill();

    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 26px Inter, Cairo, sans-serif';
    const displayHost = SeoService.getBaseUrl().replace(/^https?:\/\//, '');
    ctx.fillText(`👉 ${displayHost}`, width / 2, ctaY + ctaH / 2);
  };

  // Helper rounded rect
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  // Helper text wrap
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `smarttools-${selectedTool.id}-${format}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-600" />
          <span>Visual Creator Studio (HTML5 Canvas Engine)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Generate pixel-perfect promotional cards in 4 social formats with SMARTTOOLS branding. 100% free, runs in your browser without external paid APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          {/* Tool Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Select Tool
            </label>
            <select
              value={selectedToolId}
              onChange={(e) => setSelectedToolId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
            >
              {TOOLS_DATA.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name.en} ({t.category})
                </option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Card Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['en', 'fr', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setSelectedLang(l)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    selectedLang === l
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Social Format */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Aspect Ratio & Platform
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'square', label: '1080×1080 (Square)' },
                { id: 'vertical', label: '1080×1920 (Story/TikTok)' },
                { id: 'banner', label: '1200×630 (Banner/OG)' },
                { id: 'pinterest', label: '1000×1500 (Pinterest Pin)' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id as any)}
                  className={`p-2.5 rounded-xl border font-semibold text-left transition ${
                    format === f.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
              Accent Color
            </label>
            <div className="flex items-center gap-2">
              {['#4F46E5', '#10B981', '#06B6D4', '#F59E0B', '#EC4899', '#8B5CF6'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setThemeColor(c)}
                  className="w-8 h-8 rounded-full border-2 transition hover:scale-110"
                  style={{
                    backgroundColor: c,
                    borderColor: themeColor === c ? '#0F172A' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text Inputs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Top Badge Text
            </label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              Subheadline
            </label>
            <textarea
              rows={2}
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
            />
          </div>

          <button
            onClick={handleDownloadPng}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res PNG</span>
          </button>
        </div>

        {/* Live Canvas Preview */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="text-xs font-semibold text-slate-400 mb-3">
            Preview: {getDimensions().label}
          </div>
          <div className="max-w-full overflow-hidden p-4 bg-slate-950/90 rounded-2xl shadow-inner flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="max-h-[520px] max-w-full h-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
