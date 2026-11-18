import { ToolDefinition } from '../types';

export const TOOLS_DATA: ToolDefinition[] = [
  {
    id: 'qr-code',
    slug: 'qr-code-generator',
    name: {
      en: 'QR Code Generator',
      fr: 'Générateur de QR Code',
      ar: 'مولد رمز الاستجابة السريعة (QR Code)',
    },
    shortDesc: {
      en: 'Create customizable, high-resolution QR codes for URLs, text, and contacts instantly.',
      fr: 'Créez instantanément des codes QR personnalisés en haute résolution pour URL, texte et contacts.',
      ar: 'أنشئ رموز QR مخصصة وفورية وعالية الدقة للروابط والنصوص وجهات الاتصال مجاناً.',
    },
    description: {
      en: 'SMARTTOOLS QR Code Generator is a 100% free, client-side utility designed to generate crisp QR codes instantly. Customize foreground and background colors, adjust pixel dimensions, configure error-correction levels, and download your ready-to-print PNG or SVG directly in your browser with zero data sent to external servers.',
      fr: 'Le générateur de QR Code SMARTTOOLS est un outil 100% gratuit fonctionnant côté navigateur. Personnalisez les couleurs de premier plan et d\'arrière-plan, ajustez la taille, réglez le niveau de correction d\'erreur et téléchargez votre fichier PNG ou SVG prêt à l\'impression sans envoyer la moindre donnée vers un serveur externe.',
      ar: 'مولد رموز QR من SMARTTOOLS هو أداة مجانية 100% تعمل محلياً داخل متصفحك لإنشاء رموز استجابة سريعة فائقة الوضوح. يمكنك تخصيص الألوان وتعديل الأبعاد واختيار مستويات تصحيح الأخطاء وتنزيل النتيجة كصورة PNG جاهزة للطباعة دون إرسال بياناتك لأي خادم خارجي.',
    },
    category: 'graphics',
    icon: 'QrCode',
    badge: 'Popular',
    features: {
      en: [
        'Instant client-side QR generation with real-time preview',
        'Custom foreground & background color picking',
        'Configurable error correction levels (L, M, Q, H)',
        'Adjustable output size up to 1024px',
        'Download as PNG image with 1 click',
        '100% private — data never leaves your device',
      ],
      fr: [
        'Génération instantanée côté client avec aperçu en temps réel',
        'Choix personnalisé des couleurs d\'arrière-plan et de premier plan',
        'Niveaux de correction d\'erreurs configurables (L, M, Q, H)',
        'Taille de sortie réglable jusqu\'à 1024px',
        'Téléchargement PNG haute résolution en un clic',
        'Confidentialité totale — aucune donnée transmise sur internet',
      ],
      ar: [
        'توليد فوري ومحلي لرمز QR مع معاينة حية ومباشرة',
        'تخصيص كامل لألوان الرمز وخلفيته بدقة',
        'مستويات متعددة لتصحيح الأخطاء (L, M, Q, H)',
        'تحكم كامل في أبعاد الصورة حتى 1024 بكسل',
        'تحميل سريع كملف PNG فائق الجودة بنقرة واحدة',
        'حماية قصوى للخصوصية — لا يتم رفع أي بيانات إلى خوادم خارجية',
      ],
    },
    howToUse: {
      en: [
        'Type or paste your URL, contact info, or plain text into the input field.',
        'Choose your desired foreground color and background color.',
        'Adjust the pixel size slider to match your intended use case (e.g., business card, flyer, web).',
        'Click the "Download PNG" button to save your ready-to-use QR code.',
      ],
      fr: [
        'Saisissez ou collez votre lien URL, texte ou information dans le champ prévu.',
        'Choisissez les couleurs souhaitées pour le code et pour le fond.',
        'Ajustez la taille en pixels selon vos besoins (carte de visite, affiche, web).',
        'Cliquez sur "Télécharger PNG" pour enregistrer votre QR code prêt à l\'emploi.',
      ],
      ar: [
        'اكتب أو الصق الرابط أو النص أو جهة الاتصال في حقل الإدخال.',
        'حدد ألوان الرمز والخلفية حسب الهوية البصرية التي تريدها.',
        'اضبط شريط التمرير لاختيار الحجم المناسب (بطاقة عمل، ملصق، موقع إلكتروني).',
        'اضغط على زر "تحميل PNG" لحفظ الرمز فوراً على جهازك.',
      ],
    },
    faq: {
      en: [
        {
          q: 'Are the generated QR codes free for commercial use?',
          a: 'Yes, all QR codes generated with SMARTTOOLS are 100% free and have no expiration date. You can use them on flyers, packaging, websites, and business cards.',
        },
        {
          q: 'Do these QR codes ever expire?',
          a: 'No. They are standard static QR codes containing your raw text/URL directly, so they never expire or stop functioning.',
        },
        {
          q: 'Does SMARTTOOLS store my links or private text?',
          a: 'Never. The encoding process runs entirely inside your web browser using HTML5 Canvas and JavaScript.',
        },
      ],
      fr: [
        {
          q: 'Les QR codes générés sont-ils gratuits pour un usage commercial ?',
          a: 'Oui, tous les codes générés sont 100% gratuits et sans limite de temps. Vous pouvez les utiliser sur vos affiches, emballages, cartes de visite et sites web.',
        },
        {
          q: 'Les QR codes peuvent-ils expirer ?',
          a: 'Non. Ce sont des codes statiques contenant directement votre texte ou lien, ils n\'expirent jamais.',
        },
        {
          q: 'SMARTTOOLS enregistre-t-il mes liens ou données ?',
          a: 'Jamais. Tout le traitement est exécuté localement dans votre navigateur sans communication serveur.',
        },
      ],
      ar: [
        {
          q: 'هل رموز QR مجانية للاستخدام التجاري؟',
          a: 'نعم، جميع الرموز التي يتم إنشاؤها عبر SMARTTOOLS مجانية بالكامل ومتاحة للاستخدام الشخصي والتجاري دون أي رسوم أو قيود.',
        },
        {
          q: 'هل تنتهي صلاحية رموز QR بمرور الوقت؟',
          a: 'لا، هذه الرموز ثابتة (Static) تحتوي على الرابط أو النص مباشرة ولا تنتهي صلاحيتها أبداً.',
        },
        {
          q: 'هل تحفظ المنصة بياناتي أو روابطي؟',
          a: 'على الإطلاق. تتم عملية التشفير بالكامل داخل متصفحك محلياً دون إرسال أي معلومة إلى أي خادم خارجي.',
        },
      ],
    },
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: {
      en: 'Image Compressor',
      fr: 'Compresseur d\'Images',
      ar: 'أداة ضغط الصور وتقليل حجمها',
    },
    shortDesc: {
      en: 'Reduce image file size up to 90% in WebP, JPEG, and PNG formats while keeping high visual quality.',
      fr: 'Réduisez la taille de vos fichiers image jusqu\'à 90% en WebP, JPEG et PNG sans perte de qualité visible.',
      ar: 'قلل حجم صورك بنسبة تصل إلى 90% بصيغ WebP و JPEG و PNG مع الحفاظ على جودة بصرية فائقة.',
    },
    description: {
      en: 'SMARTTOOLS Image Compressor allows webmasters, designers, and everyday users to dramatically compress image file sizes directly in the browser. Convert between WebP, JPEG, and PNG, fine-tune the quality level, view live before/after size comparisons, and speed up your website loading times without uploading photos to third-party cloud servers.',
      fr: 'Le compresseur d\'images SMARTTOOLS permet d\'optimiser considérablement le poids de vos visuels directement dans votre navigateur. Convertissez en WebP, JPEG ou PNG, ajustez le niveau de compression, comparez la taille avant/après en temps réel et accélérez le chargement de votre site sans jamais transférer vos photos vers un serveur distant.',
      ar: 'تتيح لك أداة ضغط الصور من SMARTTOOLS تقليص حجم ملفات الصور بشكل هائل مباشرة داخل متصفحك. قم بالتحويل بين WebP و JPEG و PNG مع ضبط دقيق لنسبة الجودة ومعاينة حية للمقارنة بين الحجم الأصلي والمضغوط لتسريع مواقع الويب وتوفير مساحة التخزين دون رفع أي صورة إلى الإنترنت.',
    },
    category: 'graphics',
    icon: 'Image',
    badge: 'Popular',
    features: {
      en: [
        'Browser-based hardware-accelerated image compression',
        'Supports JPEG, PNG, and next-gen WebP export',
        'Fine-grained quality slider (1% to 100%)',
        'Optional image dimension resizing (Max width / height)',
        'Instant before vs. after byte size calculation',
        'Complete confidentiality — images never leave your computer',
      ],
      fr: [
        'Compression matérielle optimisée directement dans le navigateur',
        'Prise en charge de l\'export en JPEG, PNG et WebP moderne',
        'Curseur de qualité ultra-précis (de 1% à 100%)',
        'Redimensionnement optionnel des dimensions maximales',
        'Calcul immédiat du gain de poids en octets et pourcentage',
        'Confidentialité absolue — vos fichiers restent sur votre machine',
      ],
      ar: [
        'ضغط ومعالجة مدعومة بالعتاد محلياً في المتصفح',
        'دعم التصدير إلى صيغ JPEG و PNG وصيغة WebP الحديثة',
        'شريط تحكم دقيق في نسبة الجودة من 1% إلى 100%',
        'إمكانية تغيير أبعاد الصورة (العرض والارتفاع الأقصى)',
        'حساب فوري لحجم الملف قبل وبعد ونسبة التوفير المحققة',
        'خصوصية مطلقة وأمان تام — صورك لا تغادر جهازك أبداً',
      ],
    },
    howToUse: {
      en: [
        'Drag & drop an image or click "Select Image" to load a file.',
        'Choose your target format (WebP is recommended for optimal web compression).',
        'Adjust the quality slider to find the sweet spot between sharpness and file size.',
        'Click "Download Compressed Image" to retrieve your optimized file.',
      ],
      fr: [
        'Glissez-déposez une image ou cliquez sur "Sélectionner une image".',
        'Sélectionnez le format de destination (WebP est recommandé pour le web).',
        'Réglez le niveau de qualité pour trouver l\'équilibre idéal taille/netteté.',
        'Cliquez sur "Télécharger l\'image compressée".',
      ],
      ar: [
        'اسحب الصورة وأفلتها أو اضغط على "اختيار صورة" لتحميل الملف.',
        'حدد صيغة الإخراج المستهدفة (نوصي بـ WebP لأفضل أداء على مواقع الويب).',
        'اضبط مؤشر الجودة للوصول إلى التوازن المثالي بين الوضوح وخفة الحجم.',
        'اضغط على زر "تحميل الصورة المضغوطة" لحفظ الملف المطور.',
      ],
    },
    faq: {
      en: [
        {
          q: 'What is the advantage of converting to WebP?',
          a: 'WebP is developed by Google and provides 25-34% smaller file sizes than comparable JPEG images while maintaining equivalent visual clarity.',
        },
        {
          q: 'Is there a limit on how many images I can compress?',
          a: 'No, SMARTTOOLS is completely unlimited and free forever since processing is executed locally on your device.',
        },
      ],
      fr: [
        {
          q: 'Quel est l\'intérêt de convertir en WebP ?',
          a: 'Le format WebP créé par Google est en moyenne 25 à 34% plus léger que le JPEG à qualité visuelle équivalente.',
        },
        {
          q: 'Y a-t-il une limite de compression ?',
          a: 'Aucune limite, SMARTTOOLS est 100% gratuit et illimité car les calculs s\'exécutent sur votre propre processeur.',
        },
      ],
      ar: [
        {
          q: 'ما هي ميزة التحويل إلى صيغة WebP؟',
          a: 'صيغة WebP طورتها شركة Google لتوفر حجماً أصغر بنسبة تتراوح بين 25% إلى 34% مقارنة بـ JPEG مع الحفاظ على نفس النقاء البصري.',
        },
        {
          q: 'هل هناك حد أقصى لعدد الصور المسموح بضغطها؟',
          a: 'لا يوجد أي حد، الخدمة مجانية وغير محدودة تماماً لأن المعالجة تتم على جهازك أنت دون الاعتماد على خوادم وسيطة.',
        },
      ],
    },
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: {
      en: 'Word & Character Counter',
      fr: 'Compteur de Mots et Caractères',
      ar: 'عداد الكلمات والأحرف وقراءة النصوص',
    },
    shortDesc: {
      en: 'Real-time text statistics: word count, character count, reading time, sentences, and keyword density.',
      fr: 'Statistiques de texte en temps réel : mots, caractères, temps de lecture, phrases et densité de mots-clés.',
      ar: 'إحصائيات دقيقة وفورية للنصوص: عدد الكلمات والأحرف وزمن القراءة والجمل وتحليل تكرار الكلمات.',
    },
    description: {
      en: 'SMARTTOOLS Word & Character Counter provides real-time in-depth linguistic statistics for copywriters, students, and SEO specialists. Count words, characters with and without spaces, sentences, paragraphs, estimated reading and speaking duration, and analyze keyword frequency to optimize content length for Google search results and social media limits.',
      fr: 'Le compteur de mots et de caractères SMARTTOOLS fournit des statistiques textuelles détaillées en temps réel pour rédacteurs, étudiants et professionnels du SEO. Mesurez mots, caractères avec ou sans espaces, phrases, paragraphes, temps de lecture et analysez la densité des mots-clés pour optimiser vos articles et publications.',
      ar: 'يوفر عداد الكلمات والأحرف من SMARTTOOLS إحصائيات لغوية وتحليلية شاملة في الوقت الفعلي للكتاب والطلاب وخبراء السيو. احسب عدد الكلمات، الأحرف بفراغات أو بدونها، الفقرات، زمن القراءة والتحدث التقديري، وحلل كثافة الكلمات المفتاحية لرفع جودة المحتوى.',
    },
    category: 'text',
    icon: 'FileText',
    badge: 'Essential',
    features: {
      en: [
        'Live instant calculation on every keystroke',
        'Counts words, characters (with & without spaces), sentences, and paragraphs',
        'Accurate estimated reading time and speaking time',
        'Top keyword density frequency breakdown',
        'One-click copy to clipboard and text clearing',
        'Supports Latin, Arabic, and multilingual text seamlessly',
      ],
      fr: [
        'Calcul immédiat et dynamique à chaque frappe de touche',
        'Comptage des mots, caractères avec/sans espaces, phrases et paragraphes',
        'Estimation précise du temps de lecture et d\'élocution',
        'Tableau d\'analyse de la densité des mots-clés les plus fréquents',
        'Copie en un clic dans le presse-papier et effacement rapide',
        'Prise en charge intégrale du français, de l\'anglais et de l\'arabe',
      ],
      ar: [
        'حساب فوري ومباشر مع كل ضغطة زر دون أي تأخير',
        'إحصاء دقيق للكلمات والأحرف (مع المسافات وبدونها) والجمل والفقرات',
        'تقدير احترافي لزمن القراءة الصامتة وزمن الإلقاء الصوتي',
        'جدول تحليل تكرار الكلمات الأكثر استخداماً وكثافتها',
        'نسخ فوري للنص بنقرة واحدة ومسح سريع للمحتوى',
        'دعم كامل ومثالي للغة العربية والنصوص ثنائية اللغة',
      ],
    },
    howToUse: {
      en: [
        'Type or paste your text into the large text area.',
        'View live metrics in the statistics cards above the editor.',
        'Inspect the keyword density table below to discover your most repeated terms.',
        'Use the copy button to transfer your text anywhere.',
      ],
      fr: [
        'Saisissez ou collez votre texte dans la zone de rédaction.',
        'Consultez les métriques en direct dans les cartes statistiques en haut.',
        'Examinez la table de densité de mots-clés pour repérer les répétitions.',
        'Utilisez le bouton de copie pour transférer facilement votre texte.',
      ],
      ar: [
        'اكتب أو الصق نصك داخل مساحة الكتابة الكبيرة.',
        'راقب البطاقات العلوية التي تظهر الأرقام والإحصائيات مباشرة.',
        'راجع جدول كثافة الكلمات المفتاحية لمعرفة المصطلحات الأكثر تكراراً.',
        'استخدم زر النسخ السريع لنقل النص إلى أي تطبيق تريده.',
      ],
    },
    faq: {
      en: [
        {
          q: 'How is reading time calculated?',
          a: 'Standard reading time is calculated based on an average human reading speed of 200 words per minute.',
        },
        {
          q: 'Does it support Arabic text counting accurately?',
          a: 'Yes, our tokenizer cleanly parses Arabic diacritics, spaces, and punctuation correctly.',
        },
      ],
      fr: [
        {
          q: 'Comment est calculé le temps de lecture ?',
          a: 'Le calcul repose sur la vitesse moyenne de lecture d\'un adulte, établie à environ 200 mots par minute.',
        },
        {
          q: 'Le texte en arabe est-il bien pris en compte ?',
          a: 'Oui, notre moteur de découpage gère parfaitement la ponctuation, les espaces et les spécificités de la langue arabe.',
        },
      ],
      ar: [
        {
          q: 'كيف يتم حساب وقت القراءة التقديري؟',
          a: 'يعتمد الحساب على المعدل القياسي العالمي لقراءة البالغين وهو 200 كلمة في الدقيقة.',
        },
        {
          q: 'هل يتعامل العداد مع النصوص العربية بدقة؟',
          a: 'نعم بالتأكيد، تم تطوير خوارزمية التقطيع اللغوي لفرز الحروف والكلمات وعلامات الترقيم العربية بدقة متناهية.',
        },
      ],
    },
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: {
      en: 'Strong Password Generator',
      fr: 'Générateur de Mots de Passe Sécurisés',
      ar: 'مولد كلمات المرور القوية والمشفرة',
    },
    shortDesc: {
      en: 'Generate cryptographically secure, unhackable passwords with customizable length and symbol rules.',
      fr: 'Générez des mots de passe cryptographiquement sûrs et inviolables avec règles personnalisables.',
      ar: 'أنشئ كلمات مرور عشوائية فائقة الأمان ومستحيلة الاختراق مع تحكم كامل في الطول والرموز.',
    },
    description: {
      en: 'SMARTTOOLS Strong Password Generator leverages the browser\'s native Web Cryptography API (crypto.getRandomValues) to create truly random, highly secure passwords. Customize character sets (uppercase, lowercase, numbers, symbols), avoid ambiguous characters, inspect an instant brute-force strength meter, and copy your secure keys with one click.',
      fr: 'Le générateur de mots de passe SMARTTOOLS utilise l\'API cryptographique native du navigateur (crypto.getRandomValues) pour générer des suites de caractères véritablement aléatoires et robustes. Personnalisez les majuscules, minuscules, chiffres, symboles spéciaux et évaluez la force de sécurité avec un indicateur visuel en direct.',
      ar: 'يعتمد مولد كلمات المرور من SMARTTOOLS على واجهة التشفير الرسمية للمتصفح (Web Crypto API) لإنتاج كلمات مرور عشوائية حقيقية ومحمية من هجمات التخمين. يمكنك التحكم في الطول، تفعيل أو تعطيل الأرقام والرموز والحروف الكبيرة، مع مؤشر يقيس قوة الحماية فورياً.',
    },
    category: 'security',
    icon: 'ShieldCheck',
    badge: 'Security',
    features: {
      en: [
        'Cryptographically secure randomness via window.crypto',
        'Customizable length from 6 to 64 characters',
        'Toggle uppercase, lowercase, numbers, and special symbols',
        'Real-time visual strength & entropy meter',
        'One-click instant copy to clipboard',
        'Zero transmission — passwords are never sent over the network',
      ],
      fr: [
        'Aléatoire cryptographique certifié via window.crypto',
        'Longueur ajustable de 6 à 64 caractères',
        'Options pour majuscules, minuscules, chiffres et caractères spéciaux',
        'Indicateur visuel en temps réel de robustesse et d\'entropie',
        'Copie instantanée dans le presse-papier en un clic',
        'Sécurité totale — aucun mot de passe n\'est transmis ou enregistré',
      ],
      ar: [
        'توليد عشوائي مشفر بالكامل عبر معايير window.crypto الصارمة',
        'تحديد طول كلمة السر من 6 إلى 64 خانة',
        'خيارات لتضمين الحروف الكبيرة والصغيرة والأرقام والرموز الخاصة',
        'مقياس بصري فوري يوضح درجة الحماية ومستوى الصعوبة',
        'نسخ مباشر وسريع إلى الحافظة بضغطة زر واحدة',
        'أمان مطلق — لا يتم حفظ أو إرسال أي كلمة مرور عبر الإنترنت',
      ],
    },
    howToUse: {
      en: [
        'Choose your desired password length using the slider (16+ is recommended).',
        'Toggle checkboxes for uppercase, numbers, and symbols.',
        'Click the "Generate" icon to refresh with a new random combination.',
        'Click "Copy" to save it securely to your password manager.',
      ],
      fr: [
        'Définissez la longueur avec le curseur (16+ caractères recommandés).',
        'Cochez les types de caractères souhaités (majuscules, chiffres, symboles).',
        'Cliquez sur l\'icône de rafraîchissement pour générer une nouvelle combinaison.',
        'Cliquez sur "Copier" pour l\'enregistrer dans votre gestionnaire de mots de passe.',
      ],
      ar: [
        'حدد طول كلمة المرور المناسب عبر شريط التمرير (نوصي بـ 16 خانة فأكثر).',
        'اختر المجموعات التي تريد تفعيلها (حروف كبيرة، أرقام، رموز خاصة).',
        'اضغط على زر التوليد لتجديد كلمة السر عشوائياً.',
        'اضغط على زر "نسخ" لحفظها بأمان داخل برنامج إدارة كلمات المرور الخاص بك.',
      ],
    },
    faq: {
      en: [
        {
          q: 'Why is client-side generation safer?',
          a: 'Because the password is created directly in your browser memory and disappears when you close the tab. No server ever sees it.',
        },
      ],
      fr: [
        {
          q: 'Pourquoi la génération côté client est-elle plus sûre ?',
          a: 'Parce que le mot de passe est généré dans la mémoire vive de votre navigateur et aucun serveur distant n\'en a connaissance.',
        },
      ],
      ar: [
        {
          q: 'لماذا يعتبر التوليد المحلي في المتصفح أكثر أماناً؟',
          a: 'لأن كلمة السر يتم تكوينها مباشرة في ذاكرة متصفحك دون أن تمر بأي خادم على الإنترنت، وتختفي فور إغلاق الصفحة.',
        },
      ],
    },
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter-validator',
    name: {
      en: 'JSON Formatter & Validator',
      fr: 'Formateur et Validateur JSON',
      ar: 'منسق ومدقق ملفات JSON',
    },
    shortDesc: {
      en: 'Format, validate, beautify, and minify JSON data with exact syntax error highlighting.',
      fr: 'Formatez, validez, embellissez et minifiez vos données JSON avec détection exacte des erreurs.',
      ar: 'نسق ودقق واضغط بيانات JSON مع كشف دقيق لأماكن الأخطاء البرمجية ورقم السطر.',
    },
    description: {
      en: 'SMARTTOOLS JSON Formatter & Validator helps developers, API engineers, and data analysts clean up and inspect JSON payloads. Detect missing commas, unmatched brackets, and invalid syntax with precise line and character pointers. Switch between 2-space, 4-space indentation or compact minified output with one click.',
      fr: 'Le formateur et validateur JSON SMARTTOOLS permet aux développeurs et analystes de données de nettoyer, valider et inspecter leurs flux JSON. Identifiez immédiatement les virgules manquantes ou accolades non fermées avec l\'indication précise de la ligne et du caractère.',
      ar: 'تساعدك أداة تنسيق وتدقيق JSON من SMARTTOOLS على ترتيب وتدقيق بنيات البيانات البرمجية. اكتشف الفواصل المفقودة والأقواس غير المغلقة بدقة متناهية مع تحديد رقم السطر وموقع الخطأ، مع خيارات التنسيق المنظم أو الضغط السريع بنقرة واحدة.',
    },
    category: 'developer',
    icon: 'Code2',
    badge: 'Dev Tool',
    features: {
      en: [
        'Instant JSON validation with error message & position details',
        'Configurable indentation (2 spaces, 4 spaces, or Tab)',
        'One-click minifier to reduce JSON payload sizes',
        'Load demo sample for instant testing',
        'Copy cleaned result to clipboard',
        '100% private — process confidential API payloads safely',
      ],
      fr: [
        'Validation JSON immédiate avec affichage clair de l\'erreur',
        'Indentation au choix (2 espaces, 4 espaces ou tabulation)',
        'Minification en un clic pour réduire la taille des données',
        'Chargement d\'un exemple de démonstration pour tester',
        'Copie instantanée du résultat mis en forme',
        'Sécurité totale pour vos clés et données d\'API confidentielles',
      ],
      ar: [
        'تدقيق فوري وصارم لملفات JSON مع توضيح سبب ومكان الخطأ',
        'خيارات متعددة للمسافات البادئة (مسافتان، 4 مسافات، أو Tab)',
        'خاصية ضغط البيانات (Minify) لإزالة الفراغات وتقليل الحجم',
        'زر لتحميل نموذج تجريبي فوري لاختبار الأداة',
        'نسخ سهل للنتيجة المنسقة إلى الحافظة',
        'حماية كاملة لبيانات واجهات البرمجة (APIs) الحساسة',
      ],
    },
    howToUse: {
      en: [
        'Paste your raw JSON into the input box.',
        'Click "Format JSON" to beautify with structured indentation.',
        'If any syntax error is detected, an alert shows the exact cause and character.',
        'Click "Minify" if you need a compact one-line string for API transmission.',
      ],
      fr: [
        'Collez votre code JSON brut dans l\'éditeur.',
        'Cliquez sur "Formater JSON" pour organiser l\'affichage en arbre.',
        'En cas d\'erreur de syntaxe, une alerte vous indique la ligne et la cause.',
        'Cliquez sur "Minifier" pour obtenir une version condensée sur une ligne.',
      ],
      ar: [
        'الصق كود JSON الخام داخل حقل التعديل.',
        'اضغط على "تنسيق JSON" لترتيب الأسطر والمسافات بجمالية.',
        'إذا وجد خطأ في البنية، ستظهر رسالة تنبيه بموقع الخطأ والسبب.',
        'اضغط على "ضغط JSON" للحصول على نص مختصر على سطر واحد لنقله عبر الـ API.',
      ],
    },
    faq: {
      en: [
        {
          q: 'Can this tool validate large JSON files?',
          a: 'Yes, it processes multi-megabyte payloads in memory inside your browser very quickly.',
        },
      ],
      fr: [
        {
          q: 'L\'outil peut-il traiter de gros fichiers JSON ?',
          a: 'Oui, le traitement en mémoire vive dans le navigateur est très rapide, même sur plusieurs mégaoctets.',
        },
      ],
      ar: [
        {
          q: 'هل تستطيع الأداة التعامل مع ملفات JSON الكبيرة؟',
          a: 'نعم بالتأكيد، يتم إجراء المعالجة في الذاكرة المباشرة للمتصفح بسرعة فائقة حتى مع أحجام البيانات الكبيرة.',
        },
      ],
    },
  },
  {
    id: 'base64-converter',
    slug: 'base64-encoder-decoder',
    name: {
      en: 'Base64 Encoder & Decoder',
      fr: 'Encodeur et Décodeur Base64',
      ar: 'محول تشفير وفك تشفير Base64',
    },
    shortDesc: {
      en: 'Encode and decode plain text or files to Base64 format and Data URIs with UTF-8 support.',
      fr: 'Encodez et décodez du texte brut ou des fichiers en Base64 et Data URI avec support UTF-8.',
      ar: 'تشفير وفك تشفير النصوص والملفات إلى صيغة Base64 و Data URI مع دعم كامل للغة العربية UTF-8.',
    },
    description: {
      en: 'SMARTTOOLS Base64 Encoder & Decoder is an essential utility for web developers, designers, and system administrators. Safely encode plain strings, international Unicode text (including Arabic and accented French characters), or convert images into Data URIs ready to embed directly inside CSS or HTML.',
      fr: 'L\'encodeur et décodeur Base64 SMARTTOOLS est un outil incontournable pour développeurs web et administrateurs. Encodez en toute sécurité des chaînes de texte, du contenu Unicode international et convertissez vos petits fichiers en Data URI directement intégrables dans votre code.',
      ar: 'أداة تشفير وفك Base64 من SMARTTOOLS هي رفيق أساسي للمطورين والمصممين. حول النصوص العادية والرموز اللغوية العالمية (بما في ذلك اللغة العربية) إلى شفرات Base64 مع إمكانية تحويل الملفات والصور إلى Data URI لتضمينها مباشرة في CSS أو HTML.',
    },
    category: 'developer',
    icon: 'Binary',
    badge: 'Utility',
    features: {
      en: [
        'Bidirectional Text Encode & Decode modes',
        'Full UTF-8 Unicode support for international alphabets',
        'Convert local images into ready-to-use Data URIs',
        'Instant copy output button',
        'Swap input/output with one click',
      ],
      fr: [
        'Modes bidirectionnels Encodage et Décodage de texte',
        'Prise en charge intégrale de l\'Unicode UTF-8 pour tous les alphabets',
        'Conversion d\'images locales en Data URI prêtes à coller',
        'Bouton de copie instantanée',
        'Permutation facile entre entrée et sortie',
      ],
      ar: [
        'التبديل المباشر بين وضعي التشفير وفك التشفير',
        'دعم كامل ومثالي لمعايير UTF-8 Unicode للحروف العربية والعالمية',
        'تحويل الصور إلى Data URI جاهزة للاستخدام في ملفات التصميم',
        'زر سريع لنسخ النتيجة',
        'إمكانية عكس حقول الإدخال والإخراج بنقرة واحدة',
      ],
    },
    howToUse: {
      en: [
        'Select "Encode" to transform text into Base64, or "Decode" to restore it.',
        'Paste your content into the input box.',
        'View the converted Base64 output instantly.',
        'Click "Copy" to put the result on your clipboard.',
      ],
      fr: [
        'Sélectionnez "Encoder" pour convertir vers Base64, ou "Décoder" pour restaurer.',
        'Collez votre contenu dans la boîte de saisie.',
        'Obtenez le résultat converti en temps réel.',
        'Cliquez sur "Copier" pour enregistrer dans le presse-papier.',
      ],
      ar: [
        'اختر "تشفير" لتحويل النص إلى Base64، أو "فك التشفير" لاستعادة النص الأصلي.',
        'الصق المحتوى في صندوق الإدخال.',
        'شاهد النتيجة المحولة فوراً في صندوق الإخراج.',
        'اضغط على "نسخ" للاحتفاظ بالنتيجة في الحافظة.',
      ],
    },
    faq: {
      en: [
        {
          q: 'Does it handle Arabic and accented characters correctly?',
          a: 'Yes, our implementation encodes strings through standard UTF-8 binary streams before Base64 serialization, avoiding the common Latin-1 corruption bug.',
        },
      ],
      fr: [
        {
          q: 'Les caractères arabes et accentués sont-ils préservés ?',
          a: 'Oui, notre moteur passe par un flux UTF-8 binaire propre avant la sérialisation Base64, évitant tout problème de corruption de caractères.',
        },
      ],
      ar: [
        {
          q: 'هل تدعم الأداة الحروف العربية والرموز التعبيرية دون تلف؟',
          a: 'نعم تماماً، تعتمد خوارزميتنا على ترميز UTF-8 الثنائي القياسي قبل التحويل إلى Base64 لمنع أي تشوه في النصوص العربية.',
        },
      ],
    },
  },
  {
    id: 'color-converter',
    slug: 'color-converter-palette',
    name: {
      en: 'Color Converter & Contrast Checker',
      fr: 'Convertisseur de Couleurs et Contraste',
      ar: 'محول الألوان ومقياس التباين البصري',
    },
    shortDesc: {
      en: 'Convert between HEX, RGB, HSL colors and verify WCAG AA accessibility contrast ratios.',
      fr: 'Convertissez entre HEX, RGB, HSL et vérifiez les ratios de contraste d\'accessibilité WCAG AA.',
      ar: 'تحويل الألوان بين صيغ HEX و RGB و HSL مع فحص نسب التباين ومعايير سهولة الوصول WCAG AA.',
    },
    description: {
      en: 'SMARTTOOLS Color Converter & Contrast Checker is an intuitive tool for UI/UX designers and frontend developers. Convert any color code between HEX, RGB, and HSL formats, generate harmonious complementary and analogous color swatches, and test text-to-background contrast ratios against official WCAG AA accessibility standards.',
      fr: 'Le convertisseur de couleurs SMARTTOOLS est l\'outil idéal pour designers et développeurs front-end. Convertissez entre HEX, RGB et HSL, générez des harmonies complémentaires et vérifiez la conformité des contrastes selon les normes d\'accessibilité WCAG AA.',
      ar: 'أداة تحويل الألوان واختبار التباين من SMARTTOOLS هي وسيلة مثالية لمصممي واجهات المستخدم ومطوري المواقع. حول الألوان بين HEX و RGB و HSL واكتشف تدرجات الألوان المتناسقة وافحص نسبة وضوح النصوص حسب معايير الوصول العالمية WCAG AA.',
    },
    category: 'graphics',
    icon: 'Palette',
    badge: 'Design',
    features: {
      en: [
        'Real-time conversion across HEX, RGB, and HSL formats',
        'Interactive visual color picker',
        'WCAG AA contrast calculation with Pass/Fail accessibility badge',
        'Generates complementary, triadic, and analogous palettes',
        'One-click CSS code copy for web styling',
      ],
      fr: [
        'Conversion instantanée entre formats HEX, RGB et HSL',
        'Sélecteur visuel de couleur interactif',
        'Calcul du contraste WCAG AA avec indicateur Conforme / Non-conforme',
        'Génération automatique de palettes complémentaires et analogues',
        'Copie du code CSS en un clic',
      ],
      ar: [
        'تحويل فوري وشامل بين قيم HEX و RGB و HSL',
        'منتقي ألوان بصري وتفاعلي فائق الدقة',
        'حساب نسبة التباين وفق معايير WCAG AA مع شارة نجاح/فشل الوصولية',
        'توليد تلقائي للباليتات والألوان المتكاملة والتكميلية',
        'نسخ مباشر لأكواد CSS البرمجية بنقرة واحدة',
      ],
    },
    howToUse: {
      en: [
        'Pick a color using the visual picker or enter a HEX/RGB/HSL string.',
        'View the converted values across all standard web color models.',
        'Check the contrast ratio against white and dark backgrounds.',
        'Click any swatch or code to copy it immediately to your clipboard.',
      ],
      fr: [
        'Choisissez une couleur avec la palette visuelle ou tapez votre code HEX.',
        'Consultez les équivalences converties dans tous les formats.',
        'Vérifiez le score de contraste sur fond clair et fond sombre.',
        'Cliquez sur n\'importe quelle valeur pour la copier instantanément.',
      ],
      ar: [
        'اختر اللون عبر المنتقي البصري أو اكتب كود اللون HEX أو RGB.',
        'شاهد التحويلات المتطابقة في جميع الصيغ المعتمدة على الويب.',
        'افحص مقياس التباين على الخلفيات الفاتحة والداكنة للتأكد من سهولة القراءة.',
        'اضغط على أي كود لنسخه مباشرة إلى الحافظة.',
      ],
    },
    faq: {
      en: [
        {
          q: 'What is a good WCAG contrast ratio for body text?',
          a: 'WCAG AA requires a minimum contrast ratio of 4.5:1 for normal body text and 3:1 for large headings (18pt+).',
        },
      ],
      fr: [
        {
          q: 'Quel est le ratio de contraste recommandé ?',
          a: 'La norme WCAG AA exige au moins 4.5:1 pour le texte courant et 3:1 pour les grands titres.',
        },
      ],
      ar: [
        {
          q: 'ما هي نسبة التباين الموصى بها لقراءة النصوص؟',
          a: 'تتطلب معايير WCAG AA نسبة تباين لا تقل عن 4.5:1 للنصوص العادية و 3:1 للعناوين الكبيرة لضمان سهولة القراءة للجميع.',
        },
      ],
    },
  },
  {
    id: 'markdown-previewer',
    slug: 'markdown-to-html-previewer',
    name: {
      en: 'Markdown Previewer & HTML Converter',
      fr: 'Prévisualiseur Markdown et Convertisseur HTML',
      ar: 'معاين لغة Markdown ومحول إلى HTML',
    },
    shortDesc: {
      en: 'Write Markdown with real-time split preview and export clean HTML ready for blog publishing.',
      fr: 'Rédigez en Markdown avec aperçu en direct et exportez du code HTML propre pour blogs et CMS.',
      ar: 'اكتب بلغة Markdown مع معاينة بصرية حية وتحويل النص إلى كود HTML نظيف جاهز للنشر.',
    },
    description: {
      en: 'SMARTTOOLS Markdown Previewer & HTML Converter provides a distraction-free split-screen editing workspace. Supports GitHub Flavored Markdown (headings, tables, blockquotes, code blocks, lists, links), produces clean semantic HTML markup, and allows instant copying or file exporting for WordPress, blogs, and documentation sites.',
      fr: 'Le prévisualiseur Markdown SMARTTOOLS offre un environnement d\'écriture à écran partagé sans distraction. Prend en charge la syntaxe GitHub Flavored Markdown (titres, tableaux, citations, blocs de code, listes), produit du HTML sémantique et permet l\'exportation en un clic.',
      ar: 'توفر أداة Markdown من SMARTTOOLS بيئة كتابة نقية بشاشة منقسمة للمعاينة الفورية. تدعم تنسيقات GitHub المتقدمة (العناوين، الجداول، الاقتباسات، الكتل البرمجية، القوائم)، وتنتج كود HTML نظيفاً وسلساً جاهزاً للمواقع والمدونات.',
    },
    category: 'text',
    icon: 'FileCode',
    badge: 'Content',
    features: {
      en: [
        'Side-by-side synchronized Markdown and HTML preview',
        'Supports headings, lists, bold, italics, tables, and blockquotes',
        'Syntax-clean HTML output generator',
        'One-click HTML copy and file download',
        'Quick formatting toolbar for common Markdown tags',
      ],
      fr: [
        'Aperçu synchronisé côte à côte entre Markdown et HTML',
        'Prise en charge des titres, listes, gras, italique, tableaux et citations',
        'Générateur de code HTML sémantique et propre',
        'Copie du code HTML et téléchargement en un clic',
        'Barre d\'outils rapide pour insérer les balises courantes',
      ],
      ar: [
        'معاينة متزامنة وشاشة مزدوجة بين كود Markdown والنتيجة البصرية',
        'دعم العناوين والقوائم والخط العريض والمائل والجداول والاقتباسات',
        'توليد كود HTML نظيف ومتوافق مع معايير السيو والويب',
        'نسخ فوري لكود HTML وتنزيل الملف بنقرة واحدة',
        'شريط أدوات سريع لإدراج الرموز والتنسيقات بسهولة',
      ],
    },
    howToUse: {
      en: [
        'Type your Markdown formatted text in the left panel.',
        'View the rendered visual output in the right panel in real time.',
        'Switch to the "HTML Code" tab to inspect the generated markup.',
        'Click "Copy HTML" to paste directly into your CMS or static site generator.',
      ],
      fr: [
        'Saisissez votre texte au format Markdown dans le panneau gauche.',
        'Observez le rendu visuel dans le panneau droit en direct.',
        'Basculez vers l\'onglet "Code HTML" pour voir le balisage généré.',
        'Cliquez sur "Copier HTML" pour l\'intégrer dans votre blog ou CMS.',
      ],
      ar: [
        'اكتب نصك بصيغة Markdown في اللوحة الجانبية.',
        'شاهد المظهر النهائي الجميل في لوحة المعاينة المقابلة فوراً.',
        'انتقل إلى تبويب "كود HTML" لمعاينة الأكواد البرمجية النظيفة.',
        'اضغط على "نسخ HTML" للصق المحتوى في موقعك أو مدونتك.',
      ],
    },
    faq: {
      en: [
        {
          q: 'Can I export the compiled HTML directly?',
          a: 'Yes, you can copy the HTML with one click or download it as an `.html` file.',
        },
      ],
      fr: [
        {
          q: 'Puis-je exporter le HTML directement ?',
          a: 'Oui, vous pouvez copier le code HTML ou le télécharger directement sous forme de fichier `.html`.',
        },
      ],
      ar: [
        {
          q: 'هل يمكنني تنزيل كود HTML المتولد كملف؟',
          a: 'نعم، يمكنك نسخ كود HTML بضغطة زر أو تنزيله كملف `.html` مستقل لجهازك.',
        },
      ],
    },
  },
];
