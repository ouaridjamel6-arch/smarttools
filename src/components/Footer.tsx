import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Wrench, Globe, ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { TOOLS_DATA } from '../data/toolsData';

export const Footer: React.FC = () => {
  const { t, language } = useI18n();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-12 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                SMART<span className="text-indigo-400">TOOLS</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Private • Zero Cloud File Storage</span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              {TOOLS_DATA.slice(0, 5).map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/tool/${tool.slug}`}
                    className="hover:text-white transition block"
                  >
                    {tool.name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">
              {language === 'ar' ? 'المزيد من الأدوات' : language === 'fr' ? 'Plus d\'outils' : 'More Tools'}
            </h4>
            <ul className="space-y-2.5">
              {TOOLS_DATA.slice(5).map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/tool/${tool.slug}`}
                    className="hover:text-white transition block"
                  >
                    {tool.name[language]}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/growth-center" className="text-indigo-400 hover:text-indigo-300 font-bold block pt-1">
                  Growth Center Hub &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="hover:text-white transition block">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition block">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition block">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition block">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} SMARTTOOLS. {t('footer.allRights')}</p>
          <p className="flex items-center gap-1.5">
            <span>Built with speed & privacy</span>
            <span>•</span>
            <span className="text-slate-400">{t('footer.monetizationNotice')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
