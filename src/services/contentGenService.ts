import { ContentStyle, GeneratedContent, Language, SocialPlatform, ToolDefinition } from '../types';
import { SeoService } from './seoService';

export const ContentGenService = {
  generateMarketingContent(
    tool: ToolDefinition,
    platform: SocialPlatform,
    style: ContentStyle,
    baseUrl: string = SeoService.getBaseUrl()
  ): GeneratedContent {
    const toolUrl = `${baseUrl}/tool/${tool.slug}`;
    const id = 'gen_' + Date.now();

    // Style-specific templates and adjectives
    const getEnVersion = () => {
      switch (style) {
        case 'educational':
          return {
            title: `Master ${tool.name.en} in 60 Seconds [Full Guide]`,
            hook: `Did you know you can use ${tool.name.en} directly in your browser with zero data leaks?`,
            body: `Most users waste time downloading heavy software or uploading confidential files to unknown cloud servers. Here is how SMARTTOOLS makes it seamless:\n\n1. Instant local execution powered by modern browser APIs\n2. No email registration or credit cards\n3. High-precision output tailored for developers, designers, and creators\n\nExperience private productivity without compromises.`,
            cta: `👉 Try it free now: ${toolUrl}`,
            hashtags: ['#Productivity', '#FreeTools', '#WebTools', '#TechTips', `#${tool.id.replace(/-/g, '')}`],
            suggestedVisual: 'Step-by-step carousel showing input -> processing -> instant result',
          };
        case 'punchy':
          return {
            title: `Stop Paying for ${tool.name.en} Subscriptions!`,
            hook: `Why pay \$15/month for what SMARTTOOLS gives you 100% free forever?`,
            body: `⚡ Fast.\n🔒 100% Client-side private.\n💻 Zero sign-up required.\n\nOpen your tab, finish your task in 5 seconds, and get back to your day.`,
            cta: `🚀 Launch ${tool.name.en} right now: ${toolUrl}`,
            hashtags: ['#LifeHacks', '#NoSubscription', '#FreeSoftware', '#SmartTools'],
            suggestedVisual: 'High-contrast graphic highlighting "\$0 Forever - No Sign Up"',
          };
        case 'professional':
          return {
            title: `Optimizing Daily Workflows with ${tool.name.en}`,
            hook: `Efficiency and data compliance are paramount in modern digital teams.`,
            body: `SMARTTOOLS ${tool.name.en} is engineered to eliminate workflow friction while maintaining strict privacy standards. Because all operations execute locally within the client browser, sensitive enterprise information never leaves your machine.\n\nIdeal for engineers, copywriters, and digital marketers seeking lightweight, reliable utilities.`,
            cta: `Access the tool directly: ${toolUrl}`,
            hashtags: ['#Enterprise', '#DataPrivacy', '#WorkflowEfficiency', '#DigitalTransformation'],
            suggestedVisual: 'Clean minimalist corporate banner with technical UI preview',
          };
        case 'promotional':
        default:
          return {
            title: `Discover SMARTTOOLS ${tool.name.en} — 100% Free & Unlimited`,
            hook: `Need a reliable ${tool.name.en} without annoying ads or download barriers?`,
            body: `SMARTTOOLS gives you unlimited access to ${tool.name.en}. Transform your files, streamline your workflow, and enjoy the cleanest interface on the web.\n\nKey features:\n• ${tool.features.en.slice(0, 3).join('\n• ')}`,
            cta: `🔗 Click here to test it immediately: ${toolUrl}`,
            hashtags: ['#FreeOnlineTools', '#WebUtility', '#DailyProductivity', '#SmartToolsApp'],
            suggestedVisual: 'Colorful promotional square featuring tool icon & key benefits',
          };
      }
    };

    const getFrVersion = () => {
      switch (style) {
        case 'educational':
          return {
            title: `Comment utiliser ${tool.name.fr} efficacement [Tutoriel]`,
            hook: `Saviez-vous que vous pouvez utiliser ${tool.name.fr} sans jamais envoyer vos fichiers sur un serveur distant ?`,
            body: `Beaucoup d'utilisateurs installent des logiciels lourds ou confient leurs données à des plateformes tierces. Voici la méthode SMARTTOOLS :\n\n1. Exécution 100% locale dans votre navigateur\n2. Aucune inscription, pas d'adresse e-mail requise\n3. Résultat immédiat et haute précision\n\nGagnez en productivité tout en préservant votre vie privée.`,
            cta: `👉 Testez gratuitement dès maintenant : ${toolUrl}`,
            hashtags: ['#Productivite', '#OutilsWeb', '#AstuceTech', '#Gratuit', `#${tool.id.replace(/-/g, '')}`],
            suggestedVisual: 'Carrousel 3 étapes : importation -> réglage -> résultat instantané',
          };
        case 'punchy':
          return {
            title: `Arrêtez de payer pour ${tool.name.fr} !`,
            hook: `Pourquoi payer un abonnement quand SMARTTOOLS vous offre tout gratuitement ?`,
            body: `⚡ Rapide comme l'éclair.\n🔒 100% privé dans votre navigateur.\n💻 Zéro inscription.\n\nOuvrez votre onglet, réalisez votre tâche en 5 secondes et passez à la suite.`,
            cta: `🚀 Essayez ${tool.name.fr} maintenant : ${toolUrl}`,
            hashtags: ['#BonPlan', '#Gratuit', '#ProductiviteRapide', '#SmartTools'],
            suggestedVisual: 'Visuel percutant sur fond coloré avec mention "100% Gratuit à vie"',
          };
        case 'professional':
          return {
            title: `Optimisez vos opérations avec ${tool.name.fr}`,
            hook: `La sécurité des données et l'efficacité opérationnelle sont essentielles pour vos projets.`,
            body: `SMARTTOOLS ${tool.name.fr} a été développé pour supprimer les frictions techniques quotidiennes sans compromettre la confidentialité. Grâce au traitement local dans votre navigateur, vos informations sensibles ne transitent sur aucun réseau extérieur.\n\nUn outil incontournable pour les développeurs, créateurs et professionnels du web.`,
            cta: `Accéder à l'utilitaire : ${toolUrl}`,
            hashtags: ['#Entreprise', '#SecuriteDonnees', '#TransformationDigitale', '#Efficacite'],
            suggestedVisual: 'Bannière épurée et moderne aux couleurs de votre charte',
          };
        case 'promotional':
        default:
          return {
            title: `Découvrez SMARTTOOLS ${tool.name.fr} — Gratuit & Illimité`,
            hook: `Besoin d'un outil fiable pour ${tool.name.fr} sans publicités intrusives ?`,
            body: `SMARTTOOLS met à votre disposition ${tool.name.fr}. Optimisez votre temps de travail et profitez d'une interface claire et intuitive.\n\nPoints forts :\n• ${tool.features.fr.slice(0, 3).join('\n• ')}`,
            cta: `🔗 Cliquez ici pour tester en direct : ${toolUrl}`,
            hashtags: ['#OutilEnLigne', '#Webmaster', '#Technologie', '#SmartToolsApp'],
            suggestedVisual: 'Visuel carré promotionnel mettant en valeur l\'icône et les atouts',
          };
      }
    };

    const getArVersion = () => {
      switch (style) {
        case 'educational':
          return {
            title: `دليلك الشامل لاستخدام ${tool.name.ar} باحترافية`,
            hook: `هل تعلم أن بإمكانك تشغيل ${tool.name.ar} محلياً في متصفحك دون إرسال بياناتك لأي سيرفر؟`,
            body: `يضيع الكثيرون أوقاتهم في تحميل برامج معقدة أو رفع ملفاتهم الحساسة إلى مواقع مجهولة. إليك الحل الذكي من SMARTTOOLS:\n\n1. معالجة محلية وفورية بنسبة 100% داخل المتصفح\n2. مجانية كاملة وبدون تسجيل أو بريد إلكتروني\n3. دقة فائقة وسرعة قياسية للجميع\n\nأنجز مهامك الإنتاجية اليومية بأمان وراحة بال.`,
            cta: `👉 جرب الأداة مجاناً الآن: ${toolUrl}`,
            hashtags: ['#إنتاجية', '#أدوات_مجانية', '#تقنية', '#نصائح_تقنية', '#SMARTTOOLS'],
            suggestedVisual: 'تصميم تعليمي إنفوجرافيك يوضح خطوات الاستخدام البسيطة',
          };
        case 'punchy':
          return {
            title: `وفّر وقتك ومالك مع ${tool.name.ar} مجاناً!`,
            hook: `لماذا تدفع اشتراكات شهرية بينما SMARTTOOLS توفر لك كل شيء مجاناً؟`,
            body: `⚡ سرعة استجابة خاطفة.\n🔒 خصوصية مطلقة 100% على جهازك.\n💻 لا حاجة لأي تسجيل أو بطاقة.\n\nافتح الرابط وأنهِ مهمتك في 5 ثوانٍ فقط!`,
            cta: `🚀 ابدأ التجربة فوراً: ${toolUrl}`,
            hashtags: ['#توفير', '#أدوات_مجانية', '#حيل_ذكية', '#SmartTools'],
            suggestedVisual: 'صورة ساطعة وعريضة مع عبارة "مجاني 100% بدون تسجيل"',
          };
        case 'professional':
          return {
            title: `زيادة كفاءة الأعمال مع ${tool.name.ar}`,
            hook: `الأمان والسرعة هما حجر الأساس لنجاح الفرق الرقمية والمطورين اليوم.`,
            body: `صُممت أداة ${tool.name.ar} من SMARTTOOLS لتوفير أعلى مستويات الأداء مع الامتثال الصارم لمعايير الخصوصية. نظراً لأن كافة العمليات تنفذ داخل المتصفح محلياً، فإن بيانات شركتك وملفاتك لا تغادر جهازك أبداً.\n\nخيار مثالي للمطورين، مديري المواقع، وصناع المحتوى.`,
            cta: `انتقل للأداة مباشرة: ${toolUrl}`,
            hashtags: ['#أعمال', '#أمن_المعلومات', '#إنتاجية_الشركات', '#تطوير_الويب'],
            suggestedVisual: 'بانر احترافي ورسم بياني يعكس الموثوقية والأمان العالي',
          };
        case 'promotional':
        default:
          return {
            title: `اكتشف ${tool.name.ar} — أداة ذكية ومجانية بلا حدود`,
            hook: `هل تبحث عن أفضل أداة سريعة لـ ${tool.name.ar} خالية من التعقيدات؟`,
            body: `تمنحك SMARTTOOLS وصولاً غير محدود لأداة ${tool.name.ar}. حسّن إنتاجيتك واستمتع بأبسط وأسرع واجهة مستخدم على الويب.\n\nأبرز الميزات:\n• ${tool.features.ar.slice(0, 3).join('\n• ')}`,
            cta: `🔗 جربها بنفسك الآن بنقرة واحدة: ${toolUrl}`,
            hashtags: ['#أدوات_ذكية', '#تقنية_المعلومات', '#مجاني_اونلاين', '#SmartTools'],
            suggestedVisual: 'بوستر مربع بألوان جذابة يبرز أيقونة الأداة وميزاتها',
          };
      }
    };

    return {
      id,
      platform,
      toolId: tool.id,
      style,
      versions: {
        en: getEnVersion(),
        fr: getFrVersion(),
        ar: getArVersion(),
      },
      recommendedPlatform: platform.toUpperCase(),
      toolUrl,
      dateCreated: new Date().toISOString(),
    };
  },
};
