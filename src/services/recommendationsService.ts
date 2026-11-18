import { GrowthRecommendation, Language } from '../types';
import { SeoAuditService } from './seoAuditService';
import { StorageService } from './storage';
import { TOOLS_DATA } from '../data/toolsData';

export const RecommendationsService = {
  generateRecommendations(): GrowthRecommendation[] {
    const list: GrowthRecommendation[] = [];
    const audit = SeoAuditService.runComprehensiveAudit();
    const keywords = StorageService.getKeywords();
    const calendar = StorageService.getCalendarPosts();
    const settings = StorageService.getSettings();

    // 1. Check AdSense Readiness
    if (!settings.adsensePublisherId) {
      list.push({
        id: 'rec_adsense_pub',
        category: 'technical',
        priority: 'high',
        status: 'pending',
        title: {
          en: 'Configure Google AdSense Publisher ID & ads.txt',
          fr: 'Configurer l\'identifiant éditeur Google AdSense et ads.txt',
          ar: 'تهيئة معرّف ناشر Google AdSense وملف ads.txt',
        },
        problemDetected: {
          en: 'AdSense Publisher ID is not set in Settings. Ad placeholders and ads.txt are inactive.',
          fr: 'L\'identifiant éditeur AdSense n\'est pas renseigné. Les emplacements publicitaires et ads.txt sont inactifs.',
          ar: 'معرف الناشر في AdSense غير محدد في الإعدادات، مما يعطل مساحات الإعلانات وملف ads.txt.',
        },
        dataUsed: {
          en: 'Settings check: adsensePublisherId is empty.',
          fr: 'Contrôle des paramètres : adsensePublisherId est vide.',
          ar: 'فحص الإعدادات: خانة adsensePublisherId فارغة.',
        },
        recommendedAction: {
          en: 'Apply for Google AdSense with your custom domain, paste your pub-XXXXXXXX ID into Settings, and download the verified ads.txt.',
          fr: 'Postulez à Google AdSense avec votre nom de domaine, collez votre identifiant pub-XXXXXXXX dans Paramètres et téléchargez votre ads.txt.',
          ar: 'قدّم طلبك في Google AdSense بعد ربط النطاق الخاص، وألصق معرف pub-XXXXXXXX في الإعدادات ونزل ملف ads.txt المعتمد.',
        },
        expectedOutcome: {
          en: 'Hypothesis: Once approved, non-intrusive ads may generate passive monetization on international traffic.',
          fr: 'Hypothèse : Une fois approuvé, des encarts non intrusifs permettront de monétiser l\'audience internationale.',
          ar: 'فرضية: بعد الموافقة الرسمية، يمكن للإعلانات غير المزعجة تحقيق دخل مستمر من الزوار الدوليين.',
        },
      });
    }

    // 2. Keyword Coverage Check in Arabic & French
    const arKeywords = keywords.filter((k) => k.language === 'ar');
    if (arKeywords.length < 15) {
      list.push({
        id: 'rec_ar_keywords',
        category: 'seo',
        priority: 'critical',
        status: 'pending',
        title: {
          en: 'Expand Arabic Search Keywords Coverage',
          fr: 'Développer la couverture de mots-clés en Arabe',
          ar: 'توسيع قائمة الكلمات المفتاحية باللغة العربية',
        },
        problemDetected: {
          en: `Currently only ${arKeywords.length} Arabic keywords are tracked, which underrepresents high-volume search traffic from the MENA region.`,
          fr: `Seulement ${arKeywords.length} mots-clés arabes sont suivis, limitant la visibilité sur la région MENA.`,
          ar: `يوجد حالياً ${arKeywords.length} كلمات مفتاحية عربية فقط، وهو عدد قليل مقارنة بحجم البحث الضخم في الشرق الأوسط وشمال أفريقيا.`,
        },
        dataUsed: {
          en: `Keyword database count: ${arKeywords.length} Arabic items out of ${keywords.length} total.`,
          fr: `Base de mots-clés : ${arKeywords.length} termes arabes sur ${keywords.length} au total.`,
          ar: `قاعدة البيانات: ${arKeywords.length} كلمات عربية من أصل ${keywords.length} إجمالي.`,
        },
        recommendedAction: {
          en: 'Generate Arabic keyword clusters for QR Code, Image Compressor, and Password Generator using our Keyword Research tool.',
          fr: 'Générez des clusters de mots-clés en arabe pour le QR Code, la compression d\'image et les mots de passe.',
          ar: 'أنشئ مجموعات كلمات مفتاحية عربية لأدوات الباركود وضغط الصور وتوليد كلمات المرور عبر أداة الكلمات المفتاحية.',
        },
        expectedOutcome: {
          en: 'Hypothesis: Targeting underserved Arabic search terms may yield fast organic rankings with lower competition.',
          fr: 'Hypothèse : Le ciblage de termes arabes à faible concurrence peut accélérer le positionnement naturel.',
          ar: 'فرضية: استهداف الكلمات العربية ذات المنافسة المنخفضة قد يحقق مراكز أولى سريعة في نتائج بحث Google.',
        },
      });
    }

    // 3. Social Media & Pinterest Strategy for Image Compressor
    const pinterestPosts = calendar.filter((p) => p.platform === 'pinterest');
    if (pinterestPosts.length < 5) {
      list.push({
        id: 'rec_pinterest_visuals',
        category: 'social',
        priority: 'high',
        status: 'pending',
        title: {
          en: 'Leverage Pinterest Infographics for Image Compressor & Design Tools',
          fr: 'Créer des infographies Pinterest pour le compresseur et les outils visuels',
          ar: 'استثمار بنترست (Pinterest) بنشر إنفوجرافيك لأدوات ضغط الصور والتصميم',
        },
        problemDetected: {
          en: 'Pinterest has high visual search intent for graphic design tools, but under 5 pins are scheduled.',
          fr: 'Pinterest draine un fort trafic de designers et créateurs, mais moins de 5 épingles sont programmées.',
          ar: 'يمتلك بنترست جمهوراً يبحث بشغف عن أدوات التصميم والصور، بينما يحتوي التقويم على أقل من 5 منشورات لبنترست.',
        },
        dataUsed: {
          en: `Scheduled Pinterest pins: ${pinterestPosts.length}.`,
          fr: `Épingles Pinterest planifiées : ${pinterestPosts.length}.`,
          ar: `عدد منشورات بنترست في التقويم: ${pinterestPosts.length}.`,
        },
        recommendedAction: {
          en: 'Use our Visual Creator to generate 1000x1500 pins comparing JPEG vs WebP file sizes and schedule them.',
          fr: 'Utilisez le Créateur de Visuels pour exporter des épingles 1000x1500 comparant JPEG et WebP.',
          ar: 'استخدم صانع التصاميم لتوليد صور عمودية 1000x1500 توضح الفرق بين JPEG و WebP وجدولتها.',
        },
        expectedOutcome: {
          en: 'Hypothesis: Evergreen Pinterest pins can drive a compound 500-1500 monthly referral visits over 6 months.',
          fr: 'Hypothèse : Les épingles pérennes peuvent générer 500 à 1500 visites mensuelles sur le long terme.',
          ar: 'فرضية: منشورات بنترست الدائمة قد تجلب ما بين 500 إلى 1500 زيارة مجانية شهرياً بشكل مستمر.',
        },
      });
    }

    // 4. Video Script Deployment
    const readyVideos = calendar.filter((p) => (p.platform === 'tiktok' || p.platform === 'youtube') && p.status === 'ready');
    list.push({
      id: 'rec_short_videos',
      category: 'content',
      priority: 'medium',
      status: 'pending',
      title: {
        en: 'Publish 15s-30s Short Videos for Password Generator & QR Code',
        fr: 'Publier des vidéos courtes de 15s-30s pour le générateur de mot de passe et QR Code',
        ar: 'نشر فيديوهات قصيرة (15-30 ثانية) لمولد كلمات المرور والباركود',
      },
      problemDetected: {
        en: 'Short video algorithms reward instant utility demonstrations, but real recordings need to be uploaded by the owner.',
        fr: 'Les algorithmes TikTok/Shorts favorisent les démos utiles mais nécessitent un tournage ou enregistrement d\'écran réel.',
        ar: 'خوارزميات تيك توك ويوتيوب شورتس تدعم الأدوات المفيدة بسرعة، ويجب تسجيل الشاشة ونشر الفيديوهات يدوياً.',
      },
      dataUsed: {
        en: `${readyVideos.length} ready video scripts prepared in Marketing Calendar.`,
        fr: `${readyVideos.length} scripts vidéo prêts dans le calendrier éditorial.`,
        ar: `يوجد ${readyVideos.length} سكربتات جاهزة في التقويم التحريري.`,
      },
      recommendedAction: {
        en: 'Record a 20-second screen capture demonstrating how to generate a strong password on mobile, add the provided voiceover, and post.',
        fr: 'Enregistrez votre écran 20 secondes en générant un mot de passe fort, ajoutez la voix off suggérée et publiez.',
        ar: 'سجل شاشة الهاتف لمدة 20 ثانية لتوضيح كيفية صنع كلمة سر قوية وشاركها مع التعليق الصوتي المقترح.',
      },
      expectedOutcome: {
        en: 'Hypothesis: Organic short-form video reach may trigger immediate viral discovery among cybersecurity enthusiasts.',
        fr: 'Hypothèse : La portée organique des vidéos courtes peut déclencher une visibilité rapide auprès d\'un public tech.',
        ar: 'فرضية: الانتشار الطبيعي للفيديوهات القصيرة قد يمنح المنصة دفعة سريعة من الزوار المهتمين بالأمان.',
      },
    });

    // 5. Backlink & Free Traffic Strategy
    list.push({
      id: 'rec_free_directories',
      category: 'seo',
      priority: 'high',
      status: 'pending',
      title: {
        en: 'Submit SMARTTOOLS to Curated Free Tool Directories & GitHub Awesome Lists',
        fr: 'Soumettre SMARTTOOLS aux annuaires d\'outils gratuits et répertoires Awesome',
        ar: 'إدراج SMARTTOOLS في أدلة الأدوات المجانية ومجموعات Awesome على GitHub',
      },
      problemDetected: {
        en: 'Domain authority begins at 0. High-quality editorial backlinks are essential for Google indexation velocity.',
        fr: 'L\'autorité de domaine initiale est neuve. Des liens éditoriaux de qualité sont requis pour accélérer l\'indexation.',
        ar: 'عمر النطاق جديد، ويحتاج محرك Google لروابط خلفية موثوقة (Backlinks) لتسريع أرشفة الصفحات.',
      },
      dataUsed: {
        en: 'Free Traffic Strategy blueprint guidelines.',
        fr: 'Directives de la stratégie de trafic organique.',
        ar: 'إرشادات استراتيجية الزيارات المجانية.',
      },
      recommendedAction: {
        en: 'Submit SMARTTOOLS to Product Hunt, AlternativeTo, SaaSHub, and GitHub curated developer utility repositories.',
        fr: 'Proposez SMARTTOOLS sur AlternativeTo, Product Hunt et les listes Awesome-Tools de GitHub.',
        ar: 'أضف موقع SMARTTOOLS إلى منصات AlternativeTo و Product Hunt ومستودعات أدوات المطورين على GitHub.',
      },
      expectedOutcome: {
        en: 'Hypothesis: 10-15 dofollow niche backlinks can boost domain rating from 0 to 18 within 90 days.',
        fr: 'Hypothèse : 10 à 15 backlinks pertinents peuvent faire grimper la crédibilité du domaine auprès de Google.',
        ar: 'فرضية: الحصول على 10-15 رابطاً خلفياً نوعياً قد يرفع موثوقية النطاق ويسرع تصدر الأدوات للنتائج الأولى.',
      },
    });

    return list;
  },
};
