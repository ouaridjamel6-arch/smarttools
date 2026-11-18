import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Mail, Globe, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { language } = useI18n();

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={language === 'ar' ? 'سياسة الخصوصية' : language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
        description="SMARTTOOLS Privacy Policy: 100% client-side execution, no personal data transmission or storage."
        canonicalPath="/privacy"
      />
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {language === 'ar' ? 'سياسة الخصوصية والأمان' : language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-slate-500">Effective Date: November 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Client-Side Execution Guarantee</h2>
          <p>
            At SMARTTOOLS, your digital privacy is our core engineering principle. All utilities (including Image Compressor, QR Code Generator, Password Generator, and JSON Formatter) execute entirely within your local browser sandbox via modern Web APIs (HTML5 Canvas, window.crypto, Web Workers).
          </p>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>We NEVER upload, process, or store your passwords, photos, or documents on external servers.</span>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Cookies & Local Storage</h2>
          <p>
            SMARTTOOLS uses browser LocalStorage strictly to remember your language preference (EN, FR, AR) and to persist your local Growth Center configurations (such as custom keywords or calendar posts). These records never leave your local device.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Third-Party Services & Google AdSense</h2>
          <p>
            We may display non-intrusive advertisements served by Google AdSense to sustain free server hosting. Google may use cookies to serve ads based on prior visits. You can opt out of personalized advertising by visiting Google Ads Settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Contacting Us</h2>
          <p>
            For inquiries regarding privacy, data practices, or security audits, contact us at <code className="text-indigo-600 font-mono">support@smarttools-um7.pages.dev</code>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { language } = useI18n();

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={language === 'ar' ? 'شروط الاستخدام' : language === 'fr' ? 'Conditions d\'Utilisation' : 'Terms of Service'}
        description="SMARTTOOLS Terms of Service: Free, fair, and unlimited utility usage."
        canonicalPath="/terms"
      />
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {language === 'ar' ? 'شروط وأحكام الاستخدام' : language === 'fr' ? 'Conditions Générales d\'Utilisation' : 'Terms of Service'}
        </h1>
        <p className="text-xs text-slate-500">Last updated: November 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using SMARTTOOLS, you agree to be bound by these Terms of Service. If you do not agree, please discontinue using the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Free & Commercial Use</h2>
          <p>
            All generated QR codes, compressed images, and formatted code outputs are 100% royalty-free and available for personal, commercial, and educational use without attribution required.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Disclaimer of Warranties</h2>
          <p>
            The services are provided "AS IS" without warranties of any kind. SMARTTOOLS shall not be liable for any damages resulting from the use or inability to use the tools.
          </p>
        </section>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const { language } = useI18n();

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={language === 'ar' ? 'من نحن' : language === 'fr' ? 'À Propos' : 'About Us'}
        description="Discover the mission of SMARTTOOLS: democratizing fast, private, and smart online utilities worldwide."
        canonicalPath="/about"
      />
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {language === 'ar' ? 'عن منصة SMARTTOOLS' : language === 'fr' ? 'À Propos de SMARTTOOLS' : 'About SMARTTOOLS'}
        </h1>

        <p className="text-base font-medium text-slate-800 dark:text-slate-200">
          SMARTTOOLS was built to fix a broken internet paradigm: simple daily tasks shouldn't require paying subscription fees or uploading private files to foreign servers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-1">Zero Paywalls</h3>
            <p className="text-xs text-indigo-700">Every single tool is genuinely free, without artificial limits.</p>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <h3 className="font-bold text-emerald-900 mb-1">Privacy by Design</h3>
            <p className="text-xs text-emerald-700">Client-side processing means zero data leaves your machine.</p>
          </div>
          <div className="p-5 rounded-2xl bg-violet-50/70 border border-violet-100">
            <h3 className="font-bold text-violet-900 mb-1">Global & Multilingual</h3>
            <p className="text-xs text-violet-700">Native English, French, and Arabic RTL interfaces for all creators.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { language, t } = useI18n();
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={language === 'ar' ? 'اتصل بنا' : language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
        description="Get in touch with the SMARTTOOLS engineering and support team."
        canonicalPath="/contact"
      />
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {language === 'ar' ? 'اتصل بنا والدعم الفني' : language === 'fr' ? 'Contact & Support' : 'Contact SMARTTOOLS'}
        </h1>
        <p className="text-sm text-slate-500">
          Have a tool recommendation, bug report, or partnership inquiry? Drop us a note below.
        </p>

        {sent ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p>Thank you! Your message has been received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Message</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition active:scale-95"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
