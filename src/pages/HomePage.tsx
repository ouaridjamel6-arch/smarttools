import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  QrCode,
  Image as ImageIcon,
  FileText,
  ShieldCheck,
  Code2,
  Binary,
  Palette,
  FileCode,
  ArrowRight,
  Shield,
  Zap,
  Globe2,
  Lock,
  Search,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { TOOLS_DATA } from '../data/toolsData';
import { SEOHead } from '../components/SEOHead';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { ToolDefinition } from '../types';
import { SeoService } from '../services/seoService';

export const HomePage: React.FC = () => {
  const { t, language } = useI18n();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const shouldScroll =
      Boolean((location.state as { scrollToTools?: boolean } | null)?.scrollToTools) ||
      location.hash === '#tools-grid';

    if (shouldScroll) {
      const timer = setTimeout(() => {
        const el = document.getElementById('tools-grid');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'QrCode': return <QrCode className="w-6 h-6" />;
      case 'Image': return <ImageIcon className="w-6 h-6" />;
      case 'FileText': return <FileText className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Code2': return <Code2 className="w-6 h-6" />;
      case 'Binary': return <Binary className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'FileCode': return <FileCode className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      tool.name[language].toLowerCase().includes(q) ||
      tool.shortDesc[language].toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const baseUrl = SeoService.getBaseUrl();
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'SMARTTOOLS',
    'url': baseUrl,
    'description': t('hero.subtitle'),
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${baseUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div>
      <SEOHead
        title={t('hero.title')}
        description={t('hero.subtitle')}
        canonicalPath="/"
        schemaJson={homeSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-6 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t('hero.title')}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#tools-grid"
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 transition active:scale-95"
            >
              {t('hero.exploreBtn')} &darr;
            </a>
            <Link
              to="/growth-center"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm transition"
            >
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>{t('hero.growthBtn')}</span>
            </Link>
          </div>

          {/* Value Props Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-700 dark:text-slate-300 text-xs font-semibold">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>{t('hero.feature1')}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>{t('hero.feature2')}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Globe2 className="w-4 h-4 text-indigo-500" />
              <span>{t('hero.feature3')}</span>
            </div>
          </div>
        </div>
      </section>

      <AdSenseSlot slotId="home-top-responsive" />

      {/* Tools Section */}
      <section id="tools-grid" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t('tools.title')}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {t('tools.subtitle')}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: t('tools.category.all') },
              { id: 'graphics', label: t('tools.category.graphics') },
              { id: 'text', label: t('tools.category.text') },
              { id: 'security', label: t('tools.category.security') },
              { id: 'developer', label: t('tools.category.developer') },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition flex items-center justify-center shadow-sm">
                    {getToolIcon(tool.icon)}
                  </div>
                  {tool.badge && (
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                  {tool.name[language]}
                </h3>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {tool.shortDesc[language]}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition">
                <span>{t('tools.openTool')}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Architecture & Educational Content */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {language === 'ar' ? 'لماذا يفضل ملايين المستخدمين SMARTTOOLS؟' : language === 'fr' ? 'Pourquoi choisir SMARTTOOLS pour vos tâches quotidiennes ?' : 'Why Millions Trust SMARTTOOLS for Daily Productivity'}
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'معمارية متطورة مصممة لحماية الخصوصية المطلقة، السرعة الفورية، والعمل دون اتصال أو تسجيل.'
                : language === 'fr'
                ? 'Une architecture moderne conçue pour une confidentialité totale, une rapidité extrême et zéro inscription.'
                : 'Engineered for absolute client-side privacy, instantaneous rendering, and zero registration barriers.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">100% Client-Side Privacy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your images, passwords, and JSON data are executed strictly within your local browser sandbox. No bytes are transmitted across internet servers.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Infinite Free Access</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No credit cards, no subscriptions, and no trial expiration. Every utility is built to stay 100% free forever for personal and commercial usage.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Trilingual Global Reach</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Full native localization in English, French, and Arabic with true RTL support, serving creators and businesses across Europe, Americas, and the MENA region.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdSenseSlot slotId="home-bottom-responsive" />
    </div>
  );
};
