import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Key,
  PenTool,
  Film,
  Palette,
  Calendar,
  Share2,
  TrendingUp,
  Lightbulb,
  Globe,
  Settings,
  Lock,
  Unlock,
  Shield,
  ArrowLeft,
  Menu,
  X,
  Wrench,
} from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';
import { StorageService } from '../../services/storage';

// Tabs
import { DashboardTab } from './DashboardTab';
import { SeoManagerTab } from './SeoManagerTab';
import { KeywordsTab } from './KeywordsTab';
import { ContentGeneratorTab } from './ContentGeneratorTab';
import { VideoScriptTab } from './VideoScriptTab';
import { VisualCreatorTab } from './VisualCreatorTab';
import { CalendarTab } from './CalendarTab';
import { SocialTrackerTab } from './SocialTrackerTab';
import { AnalyticsTab } from './AnalyticsTab';
import { RecommendationsTab } from './RecommendationsTab';
import { FreeTrafficTab } from './FreeTrafficTab';
import { ReportsSettingsTab } from './ReportsSettingsTab';

export const GrowthCenterLayout: React.FC = () => {
  const { t, language } = useI18n();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if session is already unlocked
    const sessionToken = sessionStorage.getItem('smarttools_admin_unlocked');
    if (sessionToken === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = StorageService.getSettings();

    // If no PIN set yet, set the entered PIN as the master PIN!
    if (!settings.adminPin) {
      if (enteredPin.trim().length < 4) {
        setPinError('PIN must be at least 4 digits');
        return;
      }
      settings.adminPin = enteredPin.trim();
      StorageService.saveSettings(settings);
      setIsUnlocked(true);
      sessionStorage.setItem('smarttools_admin_unlocked', 'true');
      setPinError(null);
      return;
    }

    // Verify existing PIN
    if (enteredPin.trim() === settings.adminPin) {
      setIsUnlocked(true);
      sessionStorage.setItem('smarttools_admin_unlocked', 'true');
      setPinError(null);
    } else {
      setPinError(t('gc.wrongPin'));
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem('smarttools_admin_unlocked');
    setIsUnlocked(false);
    setEnteredPin('');
  };

  const navItems = [
    { id: 'dashboard', label: t('gc.tab.dashboard'), icon: LayoutDashboard },
    { id: 'seo', label: t('gc.tab.seo'), icon: Search },
    { id: 'keywords', label: t('gc.tab.keywords'), icon: Key },
    { id: 'content', label: t('gc.tab.content'), icon: PenTool },
    { id: 'video', label: t('gc.tab.video'), icon: Film },
    { id: 'visuals', label: t('gc.tab.visuals'), icon: Palette },
    { id: 'calendar', label: t('gc.tab.calendar'), icon: Calendar },
    { id: 'tracker', label: t('gc.tab.tracker'), icon: Share2 },
    { id: 'analytics', label: t('gc.tab.analytics'), icon: TrendingUp },
    { id: 'recommendations', label: t('gc.tab.recommendations'), icon: Lightbulb },
    { id: 'freeTraffic', label: t('gc.tab.freeTraffic'), icon: Globe },
    { id: 'settings', label: t('gc.tab.settings'), icon: Settings },
  ];

  // If locked, render PIN security gateway
  if (!isUnlocked) {
    const settings = StorageService.getSettings();
    const hasPin = Boolean(settings.adminPin);

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {t('gc.lockTitle')}
            </h1>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {hasPin ? t('gc.lockDesc') : t('gc.pinHint')}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-amber-300 text-left leading-relaxed">
            <span className="font-bold block text-amber-400 mb-0.5">ℹ️ Transparence & Audit Sécurité :</span>
            Ce verrou PIN est une barrière d'interface locale dans votre navigateur. Il ne remplace pas une authentification serveur avec session chiffrée. Ne stockez pas de clés de production critiques si votre poste de travail est partagé.
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              id="admin-pin-input"
              name="adminPin"
              type="password"
              autoFocus
              maxLength={12}
              value={enteredPin}
              onChange={(e) => {
                setEnteredPin(e.target.value);
                setPinError(null);
              }}
              placeholder={hasPin ? '••••••••' : 'Choose 4-8 digit PIN'}
              aria-label={hasPin ? 'Code PIN de sécurité' : 'Choisir un code PIN de sécurité'}
              className="w-full text-center tracking-widest text-2xl font-mono px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-indigo-500 transition"
            />

            {pinError && (
              <p className="text-xs font-semibold text-rose-400 animate-shake">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              {hasPin ? t('gc.unlockBtn') : 'Set Master Key & Open'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-xl hover:bg-slate-800 md:hidden text-slate-300"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-sm tracking-tight hidden sm:inline">
              SMART<span className="text-indigo-400">TOOLS</span>
            </span>
          </Link>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800">
            GROWTH CENTER
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link
            to="/"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          <button
            onClick={handleLock}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 gap-6">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 shadow-sm p-4 h-[calc(100vh-7rem)] sticky top-22 overflow-y-auto">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-3 mb-2">
            Navigation
          </div>
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 md:hidden flex flex-col p-4">
            <div className="bg-white rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900">Growth Center Sections</span>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileNavOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                        isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && <DashboardTab onNavigateTab={(tab) => setActiveTab(tab)} />}
          {activeTab === 'seo' && <SeoManagerTab />}
          {activeTab === 'keywords' && <KeywordsTab />}
          {activeTab === 'content' && <ContentGeneratorTab />}
          {activeTab === 'video' && <VideoScriptTab />}
          {activeTab === 'visuals' && <VisualCreatorTab />}
          {activeTab === 'calendar' && <CalendarTab />}
          {activeTab === 'tracker' && <SocialTrackerTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'recommendations' && <RecommendationsTab onNavigateTab={(tab) => setActiveTab(tab)} />}
          {activeTab === 'freeTraffic' && <FreeTrafficTab />}
          {activeTab === 'settings' && <ReportsSettingsTab />}
        </main>
      </div>
    </div>
  );
};
