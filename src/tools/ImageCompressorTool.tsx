import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { AnalyticsService } from '../services/analyticsService';

export const ImageCompressorTool: React.FC = () => {
  const { t, language } = useI18n();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string>('');
  const [format, setFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
  const [quality, setQuality] = useState<number>(0.8);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setOriginalFile(file);
    const previewUrl = URL.createObjectURL(file);
    setOriginalPreview(previewUrl);
    compressImage(file, format, quality, maxWidth);
    AnalyticsService.trackToolUse('image-compressor', 'upload_image');
  };

  const compressImage = (
    file: File,
    targetFormat: string,
    targetQuality: number,
    targetMaxWidth: number
  ) => {
    setIsProcessing(true);
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      if (width > targetMaxWidth) {
        height = Math.round((height * targetMaxWidth) / width);
        width = targetMaxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // Fill white background for transparency fallback in JPEG
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          setIsProcessing(false);
          if (blob) {
            setCompressedBlob(blob);
            setCompressedPreview(URL.createObjectURL(blob));
          }
        },
        targetFormat,
        targetQuality
      );
    };

    img.onerror = () => {
      setIsProcessing(false);
    };
  };

  const handleDownload = () => {
    if (!compressedBlob) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const originalName = originalFile?.name.replace(/\.[^/.]+$/, '') || 'image';
    const link = document.createElement('a');
    link.download = `${originalName}-compressed-smarttools.${ext}`;
    link.href = URL.createObjectURL(compressedBlob);
    link.click();
    AnalyticsService.trackDownload('image-compressor', ext);
  };

  const savingsPercent =
    originalFile && compressedBlob
      ? Math.max(0, Math.round(((originalFile.size - compressedBlob.size) / originalFile.size) * 100))
      : 0;

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      {!originalFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) {
              handleFileChange(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-3xl p-12 text-center bg-indigo-50/50 hover:bg-indigo-50 transition cursor-pointer flex flex-col items-center justify-center group"
        >
          <input
            id="image-compressor-file-input"
            name="imageFile"
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
            accept="image/*"
            aria-label={language === 'ar' ? 'اختيار صورة لضغطها' : language === 'fr' ? 'Sélectionner une image à compresser' : 'Choose an image to compress'}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-lg shadow-indigo-200">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            {language === 'ar' ? 'اسحب الصورة هنا أو اضغط للاختيار' : language === 'fr' ? 'Glissez votre image ici ou cliquez pour choisir' : 'Drag & drop your image here or click to browse'}
          </h3>
          <p className="text-sm text-slate-500 max-w-md">
            {language === 'ar' ? 'يدعم PNG و JPEG و WebP. تتم المعالجة بالكامل محلياً داخل متصفحك.' : language === 'fr' ? 'Supporte PNG, JPEG et WebP. Traitement 100% sécurisé et local.' : 'Supports PNG, JPEG, and WebP. 100% private, client-side processing.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                {language === 'ar' ? 'خيارات الضغط' : language === 'fr' ? 'Options de compression' : 'Compression Settings'}
              </span>
              <button
                onClick={() => {
                  setOriginalFile(null);
                  setCompressedBlob(null);
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {language === 'ar' ? 'تغيير الصورة' : language === 'fr' ? 'Changer d\'image' : 'Choose another'}
              </button>
            </div>

            {/* Target Format */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'صيغة الإخراج' : language === 'fr' ? 'Format de sortie' : 'Output Format'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'image/webp', label: 'WebP (Best)' },
                  { id: 'image/jpeg', label: 'JPEG' },
                  { id: 'image/png', label: 'PNG' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => {
                      setFormat(fmt.id as any);
                      if (originalFile) compressImage(originalFile, fmt.id, quality, maxWidth);
                    }}
                    className={`px-3 py-2 text-xs font-semibold rounded-xl border transition ${
                      format === fmt.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Slider */}
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <label htmlFor="image-quality-slider">{language === 'ar' ? 'نسبة الجودة' : language === 'fr' ? 'Qualité visuelle' : 'Quality Level'}</label>
                <span className="font-mono text-indigo-600 font-bold">{Math.round(quality * 100)}%</span>
              </div>
              <input
                id="image-quality-slider"
                name="imageQuality"
                type="range"
                min={0.1}
                max={1.0}
                step={0.05}
                value={quality}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setQuality(val);
                  if (originalFile) compressImage(originalFile, format, val, maxWidth);
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Max Width */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'الحد الأقصى للعرض' : language === 'fr' ? 'Largeur maximale' : 'Max Width Dimension'}
              </label>
              <select
                value={maxWidth}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setMaxWidth(val);
                  if (originalFile) compressImage(originalFile, format, quality, val);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-800"
              >
                <option value={1920}>1920px (Full HD / Web Standard)</option>
                <option value={1280}>1280px (HD Blog Banner)</option>
                <option value={800}>800px (Medium Article)</option>
                <option value={4000}>Original Dimensions (No Resize)</option>
              </select>
            </div>

            {/* Savings Indicator */}
            {compressedBlob && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-800 block uppercase tracking-wider">
                    {language === 'ar' ? 'نسبة التوفير' : language === 'fr' ? 'Gain de poids' : 'Total Savings'}
                  </span>
                  <span className="text-2xl font-black text-emerald-700">-{savingsPercent}%</span>
                </div>
                <div className="text-right text-xs text-emerald-900 space-y-1">
                  <div>
                    <span className="text-slate-500">Original: </span>
                    <span className="font-bold">{formatBytes(originalFile.size)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Compressed: </span>
                    <span className="font-bold text-emerald-700">{formatBytes(compressedBlob.size)}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleDownload}
              disabled={isProcessing || !compressedBlob}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold shadow-md shadow-indigo-100 transition active:scale-95"
            >
              <Download className="w-5 h-5" />
              <span>{language === 'ar' ? 'تحميل الصورة المضغوطة' : language === 'fr' ? 'Télécharger l\'image' : 'Download Compressed Image'}</span>
            </button>
          </div>

          {/* Comparison Preview */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
                {language === 'ar' ? 'معاينة النتيجة' : language === 'fr' ? 'Aperçu du résultat' : 'Visual Preview'}
              </h4>
              <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200 max-h-[380px] flex items-center justify-center p-2">
                {compressedPreview ? (
                  <img
                    src={compressedPreview}
                    alt="Compressed output"
                    className="max-h-[360px] max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="py-20 text-slate-400 text-sm">
                    {t('common.loading')}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{originalFile.name}</span>
              <span className="font-mono font-medium">{formatBytes(compressedBlob?.size || 0)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
