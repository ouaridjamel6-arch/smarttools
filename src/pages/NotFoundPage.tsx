import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, HelpCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { SEOHead } from '../components/SEOHead';
import { TOOLS_DATA } from '../data/toolsData';

export const NotFoundPage: React.FC = () => {
  const { language } = useI18n();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <SEOHead
        title="404 — Page Not Found"
        description="The page you requested could not be found."
        canonicalPath="/404"
      />
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
          <HelpCircle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
          {language === 'ar' ? 'الصفحة غير موجودة' : language === 'fr' ? 'Page Introuvable' : 'Page Not Found'}
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'ar'
            ? 'عذراً، الرابط الذي طلبته غير موجود أو تم نقله. يمكنك العودة للصفحة الرئيسية أو تصفح أدواتنا أدناه.'
            : language === 'fr'
            ? 'Désolé, la page demandée n\'existe pas. Vous pouvez revenir à l\'accueil ou explorer nos outils.'
            : 'Sorry, the requested URL does not exist. Return home or browse our popular tools.'}
        </p>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'ar' ? 'العودة للرئيسية' : language === 'fr' ? 'Retour à l\'accueil' : 'Return to Home'}</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200 space-y-2">
          <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
            Popular Tools
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {TOOLS_DATA.slice(0, 4).map((t) => (
              <Link
                key={t.id}
                to={`/tool/${t.slug}`}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
              >
                {t.name[language]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
