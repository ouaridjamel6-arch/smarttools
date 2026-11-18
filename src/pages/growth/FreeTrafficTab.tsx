import React, { useState } from 'react';
import {
  Globe,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

interface StrategyPlatform {
  id: string;
  name: string;
  targetAudience: string;
  contentType: string;
  frequency: string;
  examplePost: {
    en: string;
    fr: string;
    ar: string;
  };
  communityGuidelines: string[];
}

export const FreeTrafficTab: React.FC = () => {
  const { language } = useI18n();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('pinterest');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const platforms: StrategyPlatform[] = [
    {
      id: 'google',
      name: 'Google Organic Search (SEO)',
      targetAudience: 'Global users searching for quick utilities (developers, students, marketers).',
      contentType: 'High-speed client-side tool pages, FAQ rich snippets, comprehensive usage guides.',
      frequency: 'Continuous evergreen indexing (pages updated on build / monthly review).',
      examplePost: {
        en: 'Title: Free Online QR Code Generator (100% Private, No Sign Up)\nMeta: Create high-resolution custom QR codes instantly in your browser with zero data sent to external servers.',
        fr: 'Titre: Générateur de QR Code Gratuit en Ligne (100% Privé, Sans Inscription)\nMéta: Créez instantanément des codes QR personnalisés en haute résolution dans votre navigateur sans transfert de données.',
        ar: 'العنوان: مولد رمز QR مجاني أون لاين (خصوصية 100%، بدون تسجيل)\nالوصف: أنشئ رموز استجابة سريعة مخصصة وفائقة الدقة داخل متصفحك محلياً دون إرسال بياناتك لخوادم خارجية.',
      },
      communityGuidelines: [
        'Never create duplicate doorway pages or keyword-stuffed low-value articles.',
        'Ensure fast Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1).',
        'Maintain exact hreflang alternates for English, French, and Arabic.',
      ],
    },
    {
      id: 'pinterest',
      name: 'Pinterest (Visual Search Engine)',
      targetAudience: 'Graphic designers, small business owners, bloggers, DIY creators.',
      contentType: '1000 × 1500 vertical infographic pins, comparison charts (JPEG vs WebP), color swatches.',
      frequency: '2 to 3 pins per week (well-paced, zero spam).',
      examplePost: {
        en: '📌 How to Reduce Image Size by 80% for Your Blog without losing sharpness! Check our free client-side compressor. 👉 smarttools-um7.pages.dev/tool/image-compressor',
        fr: '📌 Comment réduire la taille de vos photos de 80% pour votre blog sans perte de netteté ! Découvrez notre compresseur gratuit. 👉 smarttools-um7.pages.dev/tool/image-compressor',
        ar: '📌 كيف تقلل حجم صور موقعك ومدونتك بنسبة 80% دون فقدان الدقة مجاناً وبأعلى سرعة. 👉 smarttools-um7.pages.dev/tool/image-compressor',
      },
      communityGuidelines: [
        'Always link directly to the relevant tool, never to landing traps.',
        'Use high-contrast text overlays readable on mobile devices.',
        'Organize pins into clean thematic boards (Web Design Tools, Free Productivity).',
      ],
    },
    {
      id: 'reddit',
      name: 'Reddit (Value-First Community)',
      targetAudience: 'Tech communities (r/webdev, r/freelance, r/cybersecurity, r/productivity).',
      contentType: 'Genuine answers to users asking "How do I do X without paying?", technical breakdowns.',
      frequency: 'Only when genuinely relevant to an existing question (1-2 times per week max).',
      examplePost: {
        en: 'I built a 100% client-side QR generator and image compressor because I was tired of shady websites uploading my files to foreign servers. Everything runs via HTML5 Canvas in your browser: smarttools-um7.pages.dev',
        fr: 'J\'ai conçu une suite d\'outils 100% locaux (Web Crypto, Canvas) pour éviter d\'envoyer des fichiers sur des serveurs inconnus. Le code tourne dans le navigateur : smarttools-um7.pages.dev',
        ar: 'قمت بتطوير أدوات تعمل 100% محلياً داخل المتصفح مثل ضغط الصور وتوليد كلمات المرور لحماية الخصوصية دون رفع أي ملفات للسيرفرات: smarttools-um7.pages.dev',
      },
      communityGuidelines: [
        'NEVER spam subreddits with promotional links or duplicate copy.',
        'Always explain how the tool works technically (transparency builds genuine trust).',
        'Respect subreddit self-promotion rules (e.g. Saturday Showoff threads only).',
      ],
    },
    {
      id: 'facebook',
      name: 'Facebook (Helpful Groups)',
      targetAudience: 'Local business owners, students, digital marketing groups.',
      contentType: 'Helpful quick tips, problem-solving tutorials, link in comments when permitted.',
      frequency: '1 to 2 times weekly with community-focused value.',
      examplePost: {
        en: '💡 Quick tip for website owners: Google loves fast loading speeds. If your blog has large JPEG images, converting them to WebP cuts file sizes by 30%. Free in-browser tool: smarttools-um7.pages.dev',
        fr: '💡 Astuce webmaster : Améliorez la vitesse de votre site en convertissant vos visuels en WebP. Outil 100% gratuit et local : smarttools-um7.pages.dev',
        ar: '💡 نصيحة لأصحاب المواقع: تحويل صور موقعك إلى صيغة WebP يخفض الحجم بنسبة 30% ويسرع التحميل في جوجل. جرب الأداة المجانية: smarttools-um7.pages.dev',
      },
      communityGuidelines: [
        'Never mass-post into dozens of Facebook groups at once.',
        'Engage politely and answer user questions in comments.',
      ],
    },
    {
      id: 'tiktok',
      name: 'TikTok & YouTube Shorts',
      targetAudience: 'Gen-Z creators, students, tech enthusiasts looking for quick lifehacks.',
      contentType: '15-30 second screen recordings demonstrating instant problem solving.',
      frequency: '2 to 3 shorts per week.',
      examplePost: {
        en: '3 Free Websites You Won\'t Believe Are Actually Free (No Sign Up, No Ads)',
        fr: '3 Sites Utiles et Gratuits Que Vous Devriez Connaître (Zéro Inscription)',
        ar: '3 أدوات ذكية ومجانية 100% ستوفر عليك ساعات من العمل بدون أي اشتراك',
      },
      communityGuidelines: [
        'Capture attention in the first 2 seconds.',
        'Keep voiceovers clear and include auto-captions for muted viewing.',
      ],
    },
    {
      id: 'linkedin',
      name: 'LinkedIn (B2B & Tech Professional)',
      targetAudience: 'Developers, IT managers, content strategists, agency leaders.',
      contentType: 'Articles on data security, why client-side WebAssembly matters, productivity hacks.',
      frequency: '1 post per week.',
      examplePost: {
        en: 'Why client-side processing is the future of lightweight SaaS tools: Zero server costs, zero data liability, instant execution.',
        fr: 'Pourquoi le traitement côté client révolutionne les micro-outils web : zéro risque de fuite de données et coût d\'infrastructure nul.',
        ar: 'لماذا تعد المعالجة المحلية داخل المتصفح الثورة القادمة للأدوات الرقمية: حماية كاملة للمعلومات وانعدام تكاليف الخوادم.',
      },
      communityGuidelines: [
        'Focus on engineering, privacy standards, and workflow efficiency.',
        'Tag relevant discussions respectfully without aggressive spam tags.',
      ],
    },
  ];

  const current = platforms.find((p) => p.id === selectedPlatform) || platforms[0];

  const copyText = (txt: string, key: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-600" />
          <span>FREE TRAFFIC STRATEGY (100% Organic & Ethical)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Zero-budget promotional blueprints designed to build compounding long-term traffic from Google search and community networks.
        </p>
      </div>

      {/* Golden Ethics Rules Banner */}
      <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
        <div className="flex items-center gap-2 font-black uppercase tracking-wider text-amber-800">
          <Shield className="w-4 h-4 text-amber-600" />
          <span>Strict Ethical Promotion Guidelines</span>
        </div>
        <ul className="list-disc ml-5 space-y-1 text-amber-800">
          <li><strong>Never purchase fake bot traffic</strong> — it destroys Google credibility and risks permanent AdSense banning.</li>
          <li><strong>Never click or simulate clicks on AdSense ads</strong>.</li>
          <li><strong>Never post repetitive spam messages in groups or forums</strong> — share only genuine solutions to actual questions.</li>
          <li><strong>Always present traffic metrics as realistic estimates</strong>, never guaranteed revenues or traffic numbers.</li>
        </ul>
      </div>

      {/* Platform Selector Buttons */}
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPlatform(p.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
              selectedPlatform === p.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Selected Platform Blueprint */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
              Organic Blueprint
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {current.name}
            </h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Suggested Frequency: {current.frequency}
          </span>
        </div>

        {/* Blueprint Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 block">Target Audience:</span>
            <span className="text-slate-600 leading-relaxed">{current.targetAudience}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 block">Optimal Content Format:</span>
            <span className="text-slate-600 leading-relaxed">{current.contentType}</span>
          </div>
        </div>

        {/* Example Copy */}
        <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900">
              Ready-to-Use Publication Template:
            </span>
            <button
              onClick={() => copyText(current.examplePost.en, 'example')}
              className="flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900"
            >
              {copiedKey === 'example' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'example' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-white rounded-xl border border-indigo-100 text-slate-800 whitespace-pre-wrap">
              <span className="font-bold text-indigo-600 block mb-1 font-sans text-[11px]">English (EN):</span>
              {current.examplePost.en}
            </div>
            <div className="p-3 bg-white rounded-xl border border-indigo-100 text-slate-800 whitespace-pre-wrap">
              <span className="font-bold text-indigo-600 block mb-1 font-sans text-[11px]">Français (FR):</span>
              {current.examplePost.fr}
            </div>
            <div className="p-3 bg-white rounded-xl border border-indigo-100 text-slate-800 whitespace-pre-wrap" dir="rtl">
              <span className="font-bold text-indigo-600 block mb-1 font-sans text-[11px]">العربية (AR):</span>
              {current.examplePost.ar}
            </div>
          </div>
        </div>

        {/* Community Rules */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Community Rules & Best Practices:</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {current.communityGuidelines.map((g, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
