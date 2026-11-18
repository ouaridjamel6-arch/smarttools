import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Shield, Sparkles, Menu, X, Search, Wrench } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Language } from '../types';
import { TOOLS_DATA } from '../data/toolsData';

export const Header: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleLangChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  const filteredTools = searchQuery.trim()
    ? TOOLS_DATA.filter((tool) => {
        const q = searchQuery.toLowerCase();
        return (
          tool.name[language].toLowerCase().includes(q) ||
          tool.shortDesc[language].toLowerCase().includes(q) ||
          tool.id.includes(q)
        );
      })
    : [];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              SMART<span className="text-indigo-600">TOOLS</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 block -mt-1 tracking-wider uppercase">
              Free • Private • Fast
            </span>
          </div>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex relative flex-1 max-w-xs lg:max-w-md mx-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="header-global-search"
            name="search"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder={t('nav.searchPlaceholder')}
            aria-label={t('nav.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {/* Search Dropdown Results */}
          {searchOpen && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tItem) => (
                    <button
                      key={tItem.id}
                      onClick={() => {
                        navigate(`/tool/${tItem.slug}`);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-800">{tItem.name[language]}</span>
                      <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {tItem.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-slate-400">
                    {language === 'ar' ? 'لا توجد أدوات مطابقة' : 'No tools matched your search'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Nav Navigation */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/"
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition"
          >
            {t('nav.allTools')}
          </Link>

          {/* Growth Center Admin Link */}
          <Link
            to="/growth-center"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200/80 transition shadow-sm active:scale-95"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>{t('nav.growthCenter')}</span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 text-xs font-bold">
            <button
              onClick={() => handleLangChange('en')}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                language === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLangChange('fr')}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                language === 'fr' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => handleLangChange('ar')}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                language === 'ar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              عربي
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick Lang Pill Mobile */}
          <button
            onClick={() => handleLangChange(language === 'en' ? 'fr' : language === 'fr' ? 'ar' : 'en')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-700 uppercase"
          >
            {language}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {t('nav.allTools')}
          </Link>
          <Link
            to="/growth-center"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm"
          >
            <Shield className="w-4 h-4" />
            <span>{t('nav.growthCenter')}</span>
          </Link>
          <div className="flex gap-2 pt-2 border-t border-slate-100">
            {(['en', 'fr', 'ar'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => {
                  handleLangChange(l);
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                  language === l ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-700'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
