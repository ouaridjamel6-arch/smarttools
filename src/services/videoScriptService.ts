import { ToolDefinition, VideoScript, VideoScriptScene, Language } from '../types';

export const VideoScriptService = {
  generateScript(tool: ToolDefinition, duration: 15 | 30 | 60 = 30): VideoScript {
    const id = 'vid_' + Date.now();

    // Scene timing split based on duration
    const timings =
      duration === 15
        ? ['0:00 - 0:03', '0:03 - 0:06', '0:06 - 0:10', '0:10 - 0:13', '0:13 - 0:15']
        : duration === 30
        ? ['0:00 - 0:05', '0:05 - 0:11', '0:11 - 0:20', '0:20 - 0:26', '0:26 - 0:30']
        : ['0:00 - 0:10', '0:10 - 0:22', '0:22 - 0:42', '0:42 - 0:52', '0:52 - 1:00'];

    const scenes: VideoScriptScene[] = [
      {
        sceneNumber: 1,
        timeSeconds: timings[0],
        name: {
          en: 'Catchy Hook',
          fr: 'Accroche Percutante',
          ar: 'المقدمة الخاطفة للأنظار',
        },
        visualDescription: {
          en: 'Fast zoom-in on an alert icon or frustrated creator staring at screen.',
          fr: 'Zoom rapide sur une icône d\'alerte ou un utilisateur agacé devant son écran.',
          ar: 'زووم سريع ومؤثر على شاشة كمبيوتر مع مؤثر بصري يجذب الانتباه.',
        },
        screenText: {
          en: `Need to use ${tool.name.en} right now? Wait!`,
          fr: `Besoin de ${tool.name.fr} immédiatement ? Attendez !`,
          ar: `محتاج تستخدم ${tool.name.ar} فوراً؟ انتظر ثانية!`,
        },
        spokenVoiceover: {
          en: `Stop paying for subscriptions or uploading private files to shady websites!`,
          fr: `Arrêtez de payer des abonnements ou d'envoyer vos fichiers privés sur des sites douteux !`,
          ar: `توقف عن دفع اشتراكات شهرية أو رفع ملفاتك الخاصة لمواقع مجهولة!`,
        },
      },
      {
        sceneNumber: 2,
        timeSeconds: timings[1],
        name: {
          en: 'The Pain Point',
          fr: 'Le Problème Quotidien',
          ar: 'المشكلة والعائق',
        },
        visualDescription: {
          en: 'Displaying a paywall popup, error message, or complicated software installation screen.',
          fr: 'Affichage d\'un message d\'erreur, d\'un mur payant ou d\'une installation logicielle lourde.',
          ar: 'عرض شاشة تطلب التسجيل بالبطاقة البنكية أو برامج بطيئة ومملة.',
        },
        screenText: {
          en: 'Sign up required? Watermarks? No thanks.',
          fr: 'Inscription requise ? Filigranes ? Non merci.',
          ar: 'تسجيل إجباري؟ علامة مائية؟ لا شكراً.',
        },
        spokenVoiceover: {
          en: `You just want a clean result, without watermarks, sign-up forms, or hidden charges.`,
          fr: `Vous voulez juste un résultat propre, sans filigrane, sans formulaire et sans frais cachés.`,
          ar: `كل ما تريده هو إنجاز مهمتك بسرعة بدون تعقيدات أو علامات مائية أو رسوم خفية.`,
        },
      },
      {
        sceneNumber: 3,
        timeSeconds: timings[2],
        name: {
          en: 'SMARTTOOLS Live Action Demo',
          fr: 'Démonstration SMARTTOOLS',
          ar: 'الحل العملي مع SMARTTOOLS',
        },
        visualDescription: {
          en: `Screen capture opening SMARTTOOLS ${tool.name.en}, pasting input, and seeing instant live update.`,
          fr: `Capture d\'écran ouvrant SMARTTOOLS ${tool.name.fr}, saisie des données et résultat immédiat.`,
          ar: `لقطة شاشة تفتح SMARTTOOLS أداة ${tool.name.ar} مع تحريك سلس وظهور النتيجة في ثوانٍ.`,
        },
        screenText: {
          en: 'SMARTTOOLS.app — 100% Client-Side Magic',
          fr: 'SMARTTOOLS.app — Traitement 100% Local',
          ar: 'منصة SMARTTOOLS — سريعة ومحلية 100%',
        },
        spokenVoiceover: {
          en: `Just head to SMARTTOOLS. Everything runs 100% inside your browser. Drag, drop, and customize in seconds.`,
          fr: `Rendez-vous simplement sur SMARTTOOLS. Tout tourne directement dans votre navigateur en quelques clics.`,
          ar: `افتح موقع SMARTTOOLS فقط. كل شيء يتم داخل متصفحك مباشرة وبأعلى سرعة وأمان.`,
        },
      },
      {
        sceneNumber: 4,
        timeSeconds: timings[3],
        name: {
          en: 'The Crisp Result',
          fr: 'Le Résultat Impeccable',
          ar: 'النتيجة المبهرة',
        },
        visualDescription: {
          en: 'Split-screen or celebration animation showing the final crisp output downloaded successfully.',
          fr: 'Animation de confirmation avec le fichier final téléchargé et validé.',
          ar: 'عرض النتيجة النهائية جاهزة مع أيقونة تحميل باللون الأخضر وتأكيد النجاح.',
        },
        screenText: {
          en: '✓ Done in 5 Seconds • High Quality',
          fr: '✓ Prêt en 5 Secondes • Qualité Maximale',
          ar: '✓ جاهز في 5 ثوانٍ • جودة استثنائية',
        },
        spokenVoiceover: {
          en: `Boom! Your file is ready, perfectly formatted, and totally private.`,
          fr: `Et voilà ! Votre fichier est prêt, parfaitement optimisé et totalement confidentiel.`,
          ar: `هكذا بكل بساطة! ملفك جاهز فوراً بأعلى جودة وبحماية كاملة لبياناتك.`,
        },
      },
      {
        sceneNumber: 5,
        timeSeconds: timings[4],
        name: {
          en: 'Call To Action',
          fr: 'Appel à l\'Action',
          ar: 'الدعوة لتجربة الأداة',
        },
        visualDescription: {
          en: 'SMARTTOOLS logo with URL on screen and pointing finger emoji.',
          fr: 'Logo SMARTTOOLS avec URL affichée et curseur qui clique.',
          ar: 'شعار SMARTTOOLS مع الرابط وأيقونة سهم تشير للرابط في البايو.',
        },
        screenText: {
          en: '🔗 Link in Bio • Save for Later!',
          fr: '🔗 Lien en bio • Enregistrez la vidéo !',
          ar: '🔗 الرابط في البايو • احفظ الفيديو للمستقبل!',
        },
        spokenVoiceover: {
          en: `Save this video for later and visit smarttools.app today!`,
          fr: `Enregistrez cette vidéo pour plus tard et visitez smarttools.app dès aujourd'hui !`,
          ar: `احفظ الفيديو في المفضلة وجرب الأداة الآن عبر الرابط في البايو!`,
        },
      },
    ];

    return {
      id,
      toolId: tool.id,
      durationSeconds: duration,
      topic: {
        en: `How to use ${tool.name.en} for free in ${duration}s`,
        fr: `Comment utiliser ${tool.name.fr} gratuitement en ${duration}s`,
        ar: `كيفية استخدام ${tool.name.ar} مجاناً في ${duration} ثانية`,
      },
      scenes,
      videoDescription: {
        en: `Stop struggling with complex tools. SMARTTOOLS ${tool.name.en} is 100% free, private, and works right in your browser. Tap the link to try it out! #shorts #productivity #techtips`,
        fr: `Découvrez la manière la plus rapide et privée d'utiliser ${tool.name.fr}. 100% gratuit, sans inscription sur SMARTTOOLS. #shorts #astucetech #productivite`,
        ar: `أفضل وأسرع طريقة لاستخدام ${tool.name.ar} مجاناً وبدون أي تسجيل أو برامج إضافية على SMARTTOOLS. #شورتس #تقنية #إنتاجية`,
      },
      hashtags: {
        en: ['#Shorts', '#Productivity', '#FreeTools', '#TechHack', `#${tool.id.replace(/-/g, '')}`],
        fr: ['#Shorts', '#AstuceTech', '#Productivite', '#Gratuit', `#${tool.id.replace(/-/g, '')}`],
        ar: ['#شورتس', '#تقنية', '#نصائح_تقنية', '#إنتاجية', '#SMARTTOOLS'],
      },
      dateCreated: new Date().toISOString(),
    };
  },
};
