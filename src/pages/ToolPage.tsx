import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  QrCode,
  Image as ImageIcon,
  FileText,
  ShieldCheck,
  Code2,
  Binary,
  Palette,
  FileCode,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { TOOLS_DATA } from '../data/toolsData';
import { SEOHead } from '../components/SEOHead';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { SeoService } from '../services/seoService';

// Tools import
import { QrCodeTool } from '../tools/QrCodeTool';
import { ImageCompressorTool } from '../tools/ImageCompressorTool';
import { WordCounterTool } from '../tools/WordCounterTool';
import { PasswordGeneratorTool } from '../tools/PasswordGeneratorTool';
import { JsonFormatterTool } from '../tools/JsonFormatterTool';
import { Base64Tool } from '../tools/Base64Tool';
import { ColorConverterTool } from '../tools/ColorConverterTool';
import { MarkdownTool } from '../tools/MarkdownTool';

export const ToolPage: React.FC = () => {
  const { toolSlug } = useParams<{ toolSlug: string }>();
  const { t, language } = useI18n();

  const tool = TOOLS_DATA.find((t) => t.slug === toolSlug || t.id === toolSlug);

  if (!tool) {
    return <Navigate to="/404" replace />;
  }

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'qr-code': return <QrCodeTool />;
      case 'image-compressor': return <ImageCompressorTool />;
      case 'word-counter': return <WordCounterTool />;
      case 'password-generator': return <PasswordGeneratorTool />;
      case 'json-formatter': return <JsonFormatterTool />;
      case 'base64-converter': return <Base64Tool />;
      case 'color-converter': return <ColorConverterTool />;
      case 'markdown-previewer': return <MarkdownTool />;
      default: return null;
    }
  };

  const schemas = SeoService.generateToolSchema(tool, language);

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <SEOHead
        title={tool.name[language]}
        description={tool.shortDesc[language]}
        canonicalPath={`/tool/${tool.slug}`}
        schemaJson={schemas}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Tool Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <span>{tool.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {tool.name[language]}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {tool.shortDesc[language]}
          </p>
        </div>

        <AdSenseSlot slotId="tool-top-banner" />

        {/* The Interactive Tool Container */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          {renderToolComponent()}
        </div>

        <AdSenseSlot slotId="tool-middle-banner" />

        {/* Detailed Explanation & Key Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Capabilities */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-indigo-600" />
              <span>{t('tools.featuresTitle')}</span>
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {tool.features[language].map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Use Step-by-Step */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>{t('tools.howToTitle')}</span>
            </h2>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {tool.howToUse[language].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Detailed SEO Explanation */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? `دليل شامل حول ${tool.name.ar}` : language === 'fr' ? `Comprendre le fonctionnement de ${tool.name.fr}` : `Understanding SMARTTOOLS ${tool.name.en}`}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.description[language]}
          </p>
        </div>

        {/* Frequently Asked Questions (FAQ) with Schema backing */}
        {tool.faq[language].length > 0 && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>{t('tools.faqTitle')}</span>
            </h2>

            <div className="space-y-4">
              {tool.faq[language].map((faqItem, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/70 space-y-2">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                    {faqItem.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faqItem.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internal Linking & Related Tools */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            {language === 'ar' ? 'أدوات مجانية أخرى قد تفيدك' : language === 'fr' ? 'Autres outils recommandés' : 'Other Recommended Free Tools'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TOOLS_DATA.filter((t) => t.id !== tool.id).slice(0, 3).map((rel) => (
              <Link
                key={rel.id}
                to={`/tool/${rel.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 hover:border-indigo-500 transition flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 group"
              >
                <span>{rel.name[language]}</span>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition" />
              </Link>
            ))}
          </div>
        </div>

        <AdSenseSlot slotId="tool-bottom-banner" />
      </div>
    </div>
  );
};
