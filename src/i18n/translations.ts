export type Language = 'ar' | 'darija' | 'fr' | 'en';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'rtl' | 'ltr';
  description: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'ar',
    name: 'العربية (الفصحى)',
    nativeName: 'العربية',
    flag: '🇲🇦',
    dir: 'rtl',
    description: 'اللغة العربية الفصحى - الافتراضية للتجارة والأعمال',
  },
  {
    code: 'darija',
    name: 'الدارجة المغربية',
    nativeName: 'الدارجة',
    flag: '🇲🇦',
    dir: 'rtl',
    description: 'لهجة المغاربة اليومية - بيع وشري دغيا بكل سهولة',
  },
  {
    code: 'fr',
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    description: 'Français professionnel - Commerce & Facturation au Maroc',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    dir: 'ltr',
    description: 'International English - Global social commerce standard',
  },
];

export interface Translations {
  appName: string;
  appTagline: string;
  searchPlaceholder: string;
  
  // Navigation
  navFeed: string;
  navVideos: string;
  navDashboard: string;
  navProfile: string;
  navCustomerOrders: string;
  navMyOrders: string;
  navPlans: string;
  navSaved: string;
  navSettings: string;
  btnPublishAd: string;
  loginRegister: string;
  switchAccount: string;
  buyerAccount: string;
  merchantAccount: string;
  logout: string;
  
  // Settings Modal / Paramètres
  settingsTitle: string;
  settingsSubtitle: string;
  settingsLanguageTab: string;
  settingsGeneralTab: string;
  settingsNotificationsTab: string;
  chooseLanguage: string;
  chooseLanguageDesc: string;
  activeLanguage: string;
  selectThisLang: string;
  currencyPreference: string;
  currencyDesc: string;
  currencyMAD: string;
  currencyUSD: string;
  autoNotifications: string;
  autoNotificationsDesc: string;
  soundAlerts: string;
  soundAlertsDesc: string;
  closeSettings: string;
  saveChanges: string;
  settingsSavedToast: string;

  // Feed & Ads
  sponsoredBadge: string;
  verifiedSeller: string;
  freeShipping: string;
  cashOnDelivery: string;
  deliverySpeed: string;
  guaranteeReturn: string;
  stockRemaining: string;
  dhCurrency: string;
  btnOrderWhatsapp: string;
  btnOrderCod: string;
  like: string;
  liked: string;
  comment: string;
  share: string;
  saveAd: string;
  savedAd: string;
  writeCommentPlaceholder: string;
  sendComment: string;
  sellerReplyBadge: string;
  reactionsText: string;

  // Quick Order Modal
  quickOrderTitle: string;
  quickOrderSubtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  cityLabel: string;
  selectCity: string;
  addressLabel: string;
  addressPlaceholder: string;
  quantityLabel: string;
  orderTotalLabel: string;
  confirmCodBtn: string;
  orderViaWhatsappBtn: string;
  processingOrder: string;
  orderSuccessTitle: string;
  orderSuccessDesc: string;
  trackingNumber: string;
  closeBtn: string;

  // Pricing Plans
  plansTitle: string;
  plansSubtitle: string;
  month: string;
  subscribeNowBtn: string;
  currentPlanBadge: string;
  planFeatureReach: string;
  planFeatureAds: string;
  planFeatureSupport: string;
  planFeatureBadge: string;
  planFeatureAnalytics: string;
  allPlansIncludeCod: string;

  // Categories
  catAll: string;
  catElectronics: string;
  catBeauty: string;
  catFashion: string;
  catHome: string;
  catAuto: string;
  catArtisanal: string;

  // Sidebars
  categoriesHeading: string;
  citiesHeading: string;
  moroccanTrustHeading: string;
  trustCodText: string;
  trustDeliveryText: string;
  trustReturnText: string;
  trendingOffers: string;
  viewAll: string;
  
  // Dashboard & Profile
  dashboardTitle: string;
  dashboardSubtitle: string;
  metricReach: string;
  metricClicks: string;
  metricWhatsapp: string;
  metricOrders: string;
  metricRevenue: string;
  metricRoas: string;
  activeCampaigns: string;
  campaignPause: string;
  campaignResume: string;
  dailyBudget: string;
  spent: string;
  ordersReceived: string;
  orderStatusPending: string;
  orderStatusShipping: string;
  orderStatusDelivered: string;
  orderStatusCancelled: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    appName: 'SO9FIADAK',
    appTagline: 'سوق في يدك · إعلانات المنتجات',
    searchPlaceholder: 'ابحث عن منتج، متجر، أو مدينة مغربية...',
    navFeed: 'الإعلانات (Feed)',
    navVideos: 'فيديوهات السلع (Watch)',
    navDashboard: 'لوحة التاجر',
    navProfile: 'صفحة المتجر',
    navCustomerOrders: 'طلبيات الزبائن',
    navMyOrders: 'مشترياتي وطلبياتي',
    navPlans: 'الباقات ($20 - $45)',
    navSaved: 'المحفوظات',
    navSettings: 'الإعدادات واللغات',
    btnPublishAd: 'نشر إعلان',
    loginRegister: 'دخول / تسجيل',
    switchAccount: 'تبديل الحساب',
    buyerAccount: 'مشتري عادي',
    merchantAccount: 'تاجر معتمد',
    logout: 'خروج',

    settingsTitle: 'إعدادات المنصة (Paramètres)',
    settingsSubtitle: 'تخصيص لغة الواجهة، العملة وتفضيلات الإشعارات',
    settingsLanguageTab: 'اللغات (Languages)',
    settingsGeneralTab: 'العامة والتجارة',
    settingsNotificationsTab: 'الإشعارات',
    chooseLanguage: 'اختر لغة الواجهة المفضلة',
    chooseLanguageDesc: 'يمكنك التبديل فوراً بين العربية، الدارجة المغربية، الفرنسية، والإنجليزية بنقرة واحدة.',
    activeLanguage: 'اللغة الحالية المفعلة',
    selectThisLang: 'استخدام هذه اللغة',
    currencyPreference: 'عرض الأسعار بالعملة',
    currencyDesc: 'اختر عرض الأسعار بالدرهم المغربي (DH) أو بالدولار ($)',
    currencyMAD: 'الدرهم المغربي (MAD / DH)',
    currencyUSD: 'الدولار الأمريكي (USD $)',
    autoNotifications: 'إشعارات الطلبيات الفورية',
    autoNotificationsDesc: 'إرسال تنبيه فيسبوك فوري عند وصول زبون جديد أو طلبية COD',
    soundAlerts: 'تنبيهات صوتية للطلبيات',
    soundAlertsDesc: 'تشغيل صوت مميز مع كل ليد أو شراء جديد',
    closeSettings: 'إغلاق',
    saveChanges: 'حفظ وتطبيق الإعدادات',
    settingsSavedToast: 'تم تحديث الإعدادات واللغة بنجاح!',

    sponsoredBadge: 'مموّل · Sponsored',
    verifiedSeller: 'تاجر معتمد',
    freeShipping: 'توصيل مجاني بالمغرب',
    cashOnDelivery: 'الدفع عند الاستلام (COD)',
    deliverySpeed: 'توصيل خلال 24 إلى 48 ساعة',
    guaranteeReturn: 'ضمان المعاينة قبل الأداء وإرجاع 7 أيام',
    stockRemaining: 'القطع المتبقية في المخزن:',
    dhCurrency: 'د.م',
    btnOrderWhatsapp: 'طلب عبر واتساب مباشر',
    btnOrderCod: 'طلب سريع كاش عند الاستلام',
    like: 'إعجاب',
    liked: 'معجب',
    comment: 'تعليق',
    share: 'مشاركة',
    saveAd: 'حفظ',
    savedAd: 'محفوظ',
    writeCommentPlaceholder: 'اكتب استفسارك للتاجر هنا...',
    sendComment: 'إرسال',
    sellerReplyBadge: 'رد المتجر الرسمي',
    reactionsText: 'تفاعل وطلب',

    quickOrderTitle: 'طلب سريع مع الدفع عند الاستلام',
    quickOrderSubtitle: 'املأ معلوماتك وسيتصل بك فريق التوصيل لتأكيد الطلب',
    fullNameLabel: 'الاسم الكامل',
    fullNamePlaceholder: 'مثال: محمد العلوي',
    phoneLabel: 'رقم الهاتف (الواتساب)',
    phonePlaceholder: '06XX-XXXXXX',
    cityLabel: 'المدينة',
    selectCity: 'اختر مدينتك...',
    addressLabel: 'عنوان التوصيل أو الحي',
    addressPlaceholder: 'الحي، اسم الشارع، أو نقطة قريبة...',
    quantityLabel: 'الكمية',
    orderTotalLabel: 'المجموع الإجمالي المستحق:',
    confirmCodBtn: 'تأكيد الطلب الآن (الدفع عند الاستلام)',
    orderViaWhatsappBtn: 'إرسال الطلب عبر واتساب التاجر',
    processingOrder: 'جاري تسجيل طلبيتك...',
    orderSuccessTitle: 'تم تسجيل طلبيتك بنجاح!',
    orderSuccessDesc: 'سيتصل بك مسؤول التوصيل خلال 24 ساعة لتسليم السلعة بمدينتك والدفع عند المعاينة.',
    trackingNumber: 'رقم التتبع الخاص بك:',
    closeBtn: 'إغلاق',

    plansTitle: 'باقات اشتراك التجار في سوق في يدك',
    plansSubtitle: 'اختر الباقة المناسبة لمتجرك وابدأ بنشر إعلاناتك أمام آلاف المشترين بالمغرب',
    month: 'شهرياً',
    subscribeNowBtn: 'الاشتراك في هذه الباقة',
    currentPlanBadge: 'باقتك الحالية المفعلة',
    planFeatureReach: 'الوصول التقديري للمشترين',
    planFeatureAds: 'عدد الإعلانات المسموح بنشرها',
    planFeatureSupport: 'مستوى الدعم الفني',
    planFeatureBadge: 'شارة التوثيق الزرقاء فيسبوك',
    planFeatureAnalytics: 'لوحة تحليلات وإحصائيات متقدمة',
    allPlansIncludeCod: 'جميع الباقات تشمل نظام إدارة طلبيات الدفع عند الاستلام (COD) وربط الواتساب.',

    catAll: 'جميع الفئات',
    catElectronics: 'إلكترونيات وهواتف',
    catBeauty: 'تجميل وأركان طبيعي',
    catFashion: 'أزياء وسنيكرز',
    catHome: 'منزل وديكور عصري',
    catAuto: 'إكسسوارات سيارات',
    catArtisanal: 'صناعة تقليدية مغربية',

    categoriesHeading: 'فئات المنتجات',
    citiesHeading: 'مدن التوصيل السريع',
    moroccanTrustHeading: 'ضمانات سوق في يدك المغرب',
    trustCodText: 'الدفع كاش عند الاستلام بعد معاينة السلعة',
    trustDeliveryText: 'توصيل سريع خلال 24 إلى 48 ساعة لجميع المدن',
    trustReturnText: 'إمكانية الاستبدال والاسترجاع خلال 7 أيام',
    trendingOffers: 'عروض حصرية اليوم',
    viewAll: 'عرض الكل',

    dashboardTitle: 'لوحة تحكم إعلانات المتجر (Facebook Ads Manager)',
    dashboardSubtitle: 'إدارة وتتبع الحملات الإعلانية، مبيعات المنتجات والطلبيات الواردة',
    metricReach: 'الوصول التقديري',
    metricClicks: 'نقرات الإعلانات',
    metricWhatsapp: 'محادثات الواتساب (Leads)',
    metricOrders: 'إجمالي الطلبيات',
    metricRevenue: 'رقم المعاملات المحقق',
    metricRoas: 'العائد الإعلاني (ROAS)',
    activeCampaigns: 'الحملات الإعلانية النشطة',
    campaignPause: 'إيقاف مؤقت',
    campaignResume: 'تشغيل الإعلان',
    dailyBudget: 'الميزانية اليومية',
    spent: 'المصروف',
    ordersReceived: 'الطلبيات الواردة من الزبائن',
    orderStatusPending: 'قيد التأكيد والمعالجة',
    orderStatusShipping: 'خرجت للتوصيل',
    orderStatusDelivered: 'تم التسليم وقبض المبلغ',
    orderStatusCancelled: 'ملغاة',
  },

  darija: {
    appName: 'SO9FIADAK',
    appTagline: 'سوق في يدك · كلشي فبلاصتو سلعة واعرة',
    searchPlaceholder: 'قلب على سلعة، حانوت، ولا مدينتك بالمغرب...',
    navFeed: 'المنشورات والسلعة (Feed)',
    navVideos: 'فيديوهات السلعة (Watch)',
    navDashboard: 'لوحة التاجر (Dashboard)',
    navProfile: 'الحانوت ديالي',
    navCustomerOrders: 'طلبيات الكليان',
    navMyOrders: 'المشتريات ديالي',
    navPlans: 'الباك ديال السيت ($20 - $45)',
    navSaved: 'المسجلين عندي',
    navSettings: 'البارامتر واللغات',
    btnPublishAd: 'لوح سلعتك دابا',
    loginRegister: 'دخل / حل كونط',
    switchAccount: 'بدل الكونط',
    buyerAccount: 'كليان كيشري',
    merchantAccount: 'تاجر رسمي',
    logout: 'خروج',

    settingsTitle: 'بارامتر المنصة (Paramètres)',
    settingsSubtitle: 'بدل اللغة ديال السيت، العملة، والإشعارات كيفما بغيتي',
    settingsLanguageTab: 'اللغات (Languages)',
    settingsGeneralTab: 'العامة والتجارة',
    settingsNotificationsTab: 'الإشعارات',
    chooseLanguage: 'ختار اللغة لي مرتاح تخدم بيها',
    chooseLanguageDesc: 'تقدر تبدل دابا بين العربية، الدارجة، الفرنسية، والإنجليزية فثانية وحدة وبلا صداع راس.',
    activeLanguage: 'اللغة لي خدام بيها دابا',
    selectThisLang: 'خدم بهاد اللغة',
    currencyPreference: 'باش بغيتي تشوف الثمن',
    currencyDesc: 'ختار واش تشوف الثمن بالدرهم المغربي (DH) ولا بالدولار ($)',
    currencyMAD: 'الدرهم المغربي (MAD / DH)',
    currencyUSD: 'الدولار الأمريكي (USD $)',
    autoNotifications: 'ميساجات فورية ملي يدخل كليان',
    autoNotificationsDesc: 'إشعار فيسبوك كيعلمك فالبلاصة ملي كليان يدير طلبية كاش عند التسليم',
    soundAlerts: 'صوت الإشعار مع كل بيعة',
    soundAlertsDesc: 'تسمع صونيط زوين مع كل ليد ولا طلبية جديدة فالحانوت',
    closeSettings: 'سد',
    saveChanges: 'سجل البارامتر دابا',
    settingsSavedToast: 'صافي، تبدلات اللغة والبارامتر كيف بغيتي نيت!',

    sponsoredBadge: 'إعلان مموّل · Ads',
    verifiedSeller: 'تاجر موثق ومضمون',
    freeShipping: 'التوصيل فابور فالمغرب',
    cashOnDelivery: 'الخلاص حتى تقلب سلعتك عاد تخلص',
    deliverySpeed: 'التوصيل فـ 24 حتى لـ 48 ساعة حتى لباب دارك',
    guaranteeReturn: 'قلب عاد خلص ومضمون 7 أيام يلا ما عجباتكش',
    stockRemaining: 'شحال باقي فالستوك دابا:',
    dhCurrency: 'درهم',
    btnOrderWhatsapp: 'دوي فواتساب وطلب فالبلاصة',
    btnOrderCod: 'طلب دابا وكاش عند التسليم',
    like: 'جيم',
    liked: 'داير جيم',
    comment: 'كومونتير',
    share: 'بارطاجي',
    saveAd: 'خزن الإعلان',
    savedAd: 'مخزون عندك',
    writeCommentPlaceholder: 'سول الباطرون على هاد السلعة هنا...',
    sendComment: 'صيفط',
    sellerReplyBadge: 'جواب مول الحانوت',
    reactionsText: 'تفاعل وطلب',

    quickOrderTitle: 'طلب دابا وخلص كاش ملي توصلك السلعة',
    quickOrderSubtitle: 'عمر النمرة والمدينة ومول ليفريزون غايصوني عليك يوصلهالك لباب دارك',
    fullNameLabel: 'سميتك والكنية ديالك',
    fullNamePlaceholder: 'مثلا: يوسف بنجلون',
    phoneLabel: 'نمرة التيليفون (لي فيها واتساب)',
    phonePlaceholder: '06XX-XXXXXX',
    cityLabel: 'المدينة ديالك',
    selectCity: 'ختار مدينتك...',
    addressLabel: 'العنوان أو الحومة فين ساكن',
    addressPlaceholder: 'الحي، الشارع ولا شي بلاصة معروفة...',
    quantityLabel: 'شحال من بياسة بغيتي',
    orderTotalLabel: 'المجموع لي غاتخلص كاش:',
    confirmCodBtn: 'أكد الطلبية ديالي دابا (كاش عند التسليم)',
    orderViaWhatsappBtn: 'طلب ديريكت فواتساب مع التاجر',
    processingOrder: 'كنسجلو الطلبية ديالك...',
    orderSuccessTitle: 'مبروك! تسجلات طلبيتك بنجاح!',
    orderSuccessDesc: 'غايتاصل بيك ليفرور فـ 24 ساعة، قلب سلعتك مزيان وعاد خلصو بالصحة والراحة.',
    trackingNumber: 'كود التتبع ديالك:',
    closeBtn: 'سد',

    plansTitle: 'الباك ديال الاشتراكات للتجار فـ SO9FIADAK',
    plansSubtitle: 'ختار الباك لي يناسبك ولوح سلعتك يشوفوها الآلاف ديال المغاربة كل نهار',
    month: 'فالشهر',
    subscribeNowBtn: 'شترك فهاد الباك دابا',
    currentPlanBadge: 'الباك لي عندك دابا',
    planFeatureReach: 'شحال ديال الكليان غايشوفو سلعتك',
    planFeatureAds: 'شحال من إعلان تقدر تلوح',
    planFeatureSupport: 'المعاونة والدعم الفني',
    planFeatureBadge: 'الشارة الزرقاء الموثقة ديال فيسبوك',
    planFeatureAnalytics: 'لوحة الأرقام والإحصائيات والارباح',
    allPlansIncludeCod: 'كاع الباكات فيهم سيتيم ديال الكاش عند التسليم وربط مباشر مع الواتساب.',

    catAll: 'كاع السلعة',
    catElectronics: 'الهواتف والهاي تيك',
    catBeauty: 'الزيوت وأركان والجمال',
    catFashion: 'الحوايج وسنيكرز واعرة',
    catHome: 'الديكور والدار',
    catAuto: 'كسسوارات الطوموبيلات',
    catArtisanal: 'الصناعة التقليدية المغربية',

    categoriesHeading: 'أقسام السلعة',
    citiesHeading: 'مدن التوصيل السريع',
    moroccanTrustHeading: 'ضمانات سوق في يدك بالمغرب',
    trustCodText: 'الخلاص كاش حتى تشوف وتقلب السلعة بيدك',
    trustDeliveryText: 'توصيل سريع فـ 24 حتى لـ 48 ساعة لكاع المدن',
    trustReturnText: 'حق التبديل والترجاع فـ 7 أيام بلا مشاكل',
    trendingOffers: 'هميزات اليوم لي دايرين البوز',
    viewAll: 'شوف كولشي',

    dashboardTitle: 'لوحة تحكم إعلانات التاجر (Facebook Ads Manager)',
    dashboardSubtitle: 'شوف الإعلانات لي طالق، شحال جابو ليك من مبيعة وفلوس وواتساب',
    metricReach: 'شحال من واحد شاف السلعة',
    metricClicks: 'كليكات على الإعلانات',
    metricWhatsapp: 'ميساجات الواتساب (Leads)',
    metricOrders: 'الطلبيات لي دخلو ليك',
    metricRevenue: 'شحال دالفلوس دخلتي',
    metricRoas: 'العائد الإعلاني (ROAS)',
    activeCampaigns: 'الحملات الإعلانية لي طالقة دابا',
    campaignPause: 'حبس الإعلان شوية',
    campaignResume: 'طلق الإعلان عاود',
    dailyBudget: 'الميزانية فالنهار',
    spent: 'شحال تصرف',
    ordersReceived: 'الطلبيات لي وصلوك من عند الكليان',
    orderStatusPending: 'كنتاكدو منها',
    orderStatusShipping: 'خارجة مع الليفرور',
    orderStatusDelivered: 'تخلصات وتليفرات',
    orderStatusCancelled: 'تلغات',
  },

  fr: {
    appName: 'SO9FIADAK',
    appTagline: 'Place de marché sociale · Annonces Produits au Maroc',
    searchPlaceholder: 'Rechercher un produit, une boutique ou une ville au Maroc...',
    navFeed: 'Fil d’annonces (Feed)',
    navVideos: 'Vidéos & Reels (Watch)',
    navDashboard: 'Dashboard Vendeur',
    navProfile: 'Page Boutique',
    navCustomerOrders: 'Commandes Clients',
    navMyOrders: 'Mes Achats',
    navPlans: 'Abonnements ($20 - $45)',
    navSaved: 'Favoris',
    navSettings: 'Paramètres & Langues',
    btnPublishAd: 'Créer une annonce',
    loginRegister: 'Connexion / Inscription',
    switchAccount: 'Changer de profil',
    buyerAccount: 'Compte Acheteur',
    merchantAccount: 'Vendeur Certifié',
    logout: 'Déconnexion',

    settingsTitle: 'Paramètres de la plateforme (Settings)',
    settingsSubtitle: 'Personnalisez la langue de l’application, la devise et les alertes',
    settingsLanguageTab: 'Langues (Languages)',
    settingsGeneralTab: 'Général & Commerce',
    settingsNotificationsTab: 'Notifications',
    chooseLanguage: 'Choisissez la langue de l’interface',
    chooseLanguageDesc: 'Basculez instantanément entre l’Arabe, la Darija marocaine, le Français et l’Anglais.',
    activeLanguage: 'Langue actuellement active',
    selectThisLang: 'Choisir cette langue',
    currencyPreference: 'Affichage des prix en devise',
    currencyDesc: 'Sélectionnez l’affichage en Dirham Marocain (DH) ou en Dollar US ($)',
    currencyMAD: 'Dirham Marocain (MAD / DH)',
    currencyUSD: 'Dollar Américain (USD $)',
    autoNotifications: 'Notifications instantanées des commandes',
    autoNotificationsDesc: 'Recevoir une alerte Facebook immédiate lors de chaque commande ou lead WhatsApp',
    soundAlerts: 'Sons d’alertes de vente',
    soundAlertsDesc: 'Jouer un carillon sonore lors d’un nouveau lead ou d’une vente COD confirmée',
    closeSettings: 'Fermer',
    saveChanges: 'Enregistrer les paramètres',
    settingsSavedToast: 'Paramètres et langue mis à jour avec succès !',

    sponsoredBadge: 'Sponsorisé · Ad',
    verifiedSeller: 'Vendeur Certifié',
    freeShipping: 'Livraison gratuite partout au Maroc',
    cashOnDelivery: 'Paiement à la livraison (Cash on Delivery)',
    deliverySpeed: 'Livraison express en 24h à 48h',
    guaranteeReturn: 'Vérifiez avant de payer · Retour 7 jours',
    stockRemaining: 'Pièces restantes en stock :',
    dhCurrency: 'DH',
    btnOrderWhatsapp: 'Commander via WhatsApp direct',
    btnOrderCod: 'Acheter maintenant (Paiement à la livraison)',
    like: 'J’aime',
    liked: 'Aimé',
    comment: 'Commenter',
    share: 'Partager',
    saveAd: 'Enregistrer',
    savedAd: 'Enregistré',
    writeCommentPlaceholder: 'Posez votre question au vendeur ici...',
    sendComment: 'Envoyer',
    sellerReplyBadge: 'Réponse officielle du vendeur',
    reactionsText: 'interactions & commandes',

    quickOrderTitle: 'Commande rapide avec Paiement à la livraison',
    quickOrderSubtitle: 'Remplissez vos informations, notre livreur vous contactera pour convenir de l’heure',
    fullNameLabel: 'Nom et Prénom',
    fullNamePlaceholder: 'Ex: Yassine El Idrissi',
    phoneLabel: 'Numéro de Téléphone (WhatsApp)',
    phonePlaceholder: '06XX-XXXXXX',
    cityLabel: 'Ville au Maroc',
    selectCity: 'Sélectionnez votre ville...',
    addressLabel: 'Adresse de livraison ou quartier',
    addressPlaceholder: 'Quartier, rue, repère...',
    quantityLabel: 'Quantité',
    orderTotalLabel: 'Montant total à payer à la livraison :',
    confirmCodBtn: 'Confirmer ma commande (Paiement à la livraison)',
    orderViaWhatsappBtn: 'Commander directement via WhatsApp',
    processingOrder: 'Enregistrement de votre commande...',
    orderSuccessTitle: 'Commande validée avec succès !',
    orderSuccessDesc: 'Le transporteur vous contactera sous 24 à 48 heures pour livrer votre colis à domicile.',
    trackingNumber: 'Numéro de suivi :',
    closeBtn: 'Fermer',

    plansTitle: 'Formules d’abonnement Vendeurs SO9FIADAK',
    plansSubtitle: 'Choisissez votre forfait et diffusez vos annonces auprès de milliers d’acheteurs au Maroc',
    month: '/ mois',
    subscribeNowBtn: 'S’abonner à cette formule',
    currentPlanBadge: 'Votre formule active',
    planFeatureReach: 'Portée publicitaire estimée',
    planFeatureAds: 'Nombre d’annonces autorisées',
    planFeatureSupport: 'Niveau d’assistance technique',
    planFeatureBadge: 'Badge bleu vérifié Facebook',
    planFeatureAnalytics: 'Gestionnaire de publicités & Métriques avancées',
    allPlansIncludeCod: 'Tous les forfaits incluent la gestion des commandes en Cash on Delivery et le clic direct WhatsApp.',

    catAll: 'Toutes les catégories',
    catElectronics: 'High-Tech & Smartwatches',
    catBeauty: 'Cosmétique & Huile d’Argan',
    catFashion: 'Mode, Cuir & Baskets',
    catHome: 'Maison, Bureau & Déco',
    catAuto: 'Accessoires Auto & Moto',
    catArtisanal: 'Artisanat Marocain Authentique',

    categoriesHeading: 'Catégories Produits',
    citiesHeading: 'Villes de livraison 24/48h',
    moroccanTrustHeading: 'Garanties Confiance Maroc',
    trustCodText: 'Paiement en espèces après inspection du produit',
    trustDeliveryText: 'Livraison express 24h à 48h dans toutes les villes',
    trustReturnText: 'Droit d’échange et de retour sous 7 jours ouvrés',
    trendingOffers: 'Offres exclusives du jour',
    viewAll: 'Voir tout',

    dashboardTitle: 'Gestionnaire de publicités (Facebook Ads Manager)',
    dashboardSubtitle: 'Pilotez vos campagnes, suivez vos conversions WhatsApp et vos commandes clients',
    metricReach: 'Portée publicitaire',
    metricClicks: 'Clics sur les liens',
    metricWhatsapp: 'Conversations WhatsApp (Leads)',
    metricOrders: 'Commandes totales',
    metricRevenue: 'Chiffre d’affaires généré',
    metricRoas: 'Retour sur dépenses (ROAS)',
    activeCampaigns: 'Campagnes publicitaires actives',
    campaignPause: 'Mettre en pause',
    campaignResume: 'Relancer l’annonce',
    dailyBudget: 'Budget journalier',
    spent: 'Dépensé',
    ordersReceived: 'Commandes clients reçues',
    orderStatusPending: 'En attente de confirmation',
    orderStatusShipping: 'En cours de livraison',
    orderStatusDelivered: 'Livré & Encaissé',
    orderStatusCancelled: 'Annulé',
  },

  en: {
    appName: 'SO9FIADAK',
    appTagline: 'Social Marketplace · Product Ads & Deals in Morocco',
    searchPlaceholder: 'Search product ads, verified stores, or cities in Morocco...',
    navFeed: 'Ads Feed',
    navVideos: 'Product Videos (Watch)',
    navDashboard: 'Merchant Dashboard',
    navProfile: 'Store Page',
    navCustomerOrders: 'Customer Orders',
    navMyOrders: 'My Orders',
    navPlans: 'Plans ($20 - $45)',
    navSaved: 'Saved Ads',
    navSettings: 'Settings & Languages',
    btnPublishAd: 'Create Ad',
    loginRegister: 'Log In / Register',
    switchAccount: 'Switch Role',
    buyerAccount: 'Buyer Account',
    merchantAccount: 'Verified Merchant',
    logout: 'Log Out',

    settingsTitle: 'Platform Settings (Paramètres)',
    settingsSubtitle: 'Customize application language, currency display, and notifications',
    settingsLanguageTab: 'Languages',
    settingsGeneralTab: 'General & Commerce',
    settingsNotificationsTab: 'Notifications',
    chooseLanguage: 'Choose your preferred language',
    chooseLanguageDesc: 'Instantly toggle between Arabic, Moroccan Darija, French, and English with one click.',
    activeLanguage: 'Currently Active Language',
    selectThisLang: 'Select This Language',
    currencyPreference: 'Price Currency Display',
    currencyDesc: 'Choose whether to display prices in Moroccan Dirham (DH) or US Dollar ($)',
    currencyMAD: 'Moroccan Dirham (MAD / DH)',
    currencyUSD: 'US Dollar (USD $)',
    autoNotifications: 'Instant Customer Order Notifications',
    autoNotificationsDesc: 'Receive immediate Facebook alerts when new Cash on Delivery orders or WhatsApp leads arrive',
    soundAlerts: 'Order Sound Chimes',
    soundAlertsDesc: 'Play an audible alert sound for newly received customer orders',
    closeSettings: 'Close',
    saveChanges: 'Save & Apply Settings',
    settingsSavedToast: 'Settings and language updated successfully!',

    sponsoredBadge: 'Sponsored · Ad',
    verifiedSeller: 'Verified Merchant',
    freeShipping: 'Free Delivery Across Morocco',
    cashOnDelivery: 'Cash on Delivery (COD)',
    deliverySpeed: 'Express Delivery in 24h - 48h',
    guaranteeReturn: 'Inspect before paying · 7 days return guarantee',
    stockRemaining: 'Remaining stock items:',
    dhCurrency: 'DH',
    btnOrderWhatsapp: 'Order via Direct WhatsApp',
    btnOrderCod: 'Order Now (Cash on Delivery)',
    like: 'Like',
    liked: 'Liked',
    comment: 'Comment',
    share: 'Share',
    saveAd: 'Save',
    savedAd: 'Saved',
    writeCommentPlaceholder: 'Ask the seller a question here...',
    sendComment: 'Send',
    sellerReplyBadge: 'Official Seller Reply',
    reactionsText: 'interactions & orders',

    quickOrderTitle: 'Quick Order with Cash on Delivery',
    quickOrderSubtitle: 'Fill your details and the delivery courier will contact you to schedule dropoff',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'e.g. Omar Mansouri',
    phoneLabel: 'Phone Number (WhatsApp)',
    phonePlaceholder: '06XX-XXXXXX',
    cityLabel: 'City in Morocco',
    selectCity: 'Select your city...',
    addressLabel: 'Delivery address or district',
    addressPlaceholder: 'District, street name, landmark...',
    quantityLabel: 'Quantity',
    orderTotalLabel: 'Total amount due upon delivery:',
    confirmCodBtn: 'Confirm Order (Pay on Delivery)',
    orderViaWhatsappBtn: 'Send Order via WhatsApp',
    processingOrder: 'Recording your order...',
    orderSuccessTitle: 'Order Confirmed Successfully!',
    orderSuccessDesc: 'The courier will call you within 24-48 hours to deliver your package to your doorstep.',
    trackingNumber: 'Tracking Number:',
    closeBtn: 'Close',

    plansTitle: 'SO9FIADAK Merchant Subscription Plans',
    plansSubtitle: 'Select the tier for your store and publish your product ads to thousands of Moroccan buyers',
    month: '/ month',
    subscribeNowBtn: 'Subscribe to this plan',
    currentPlanBadge: 'Your Active Plan',
    planFeatureReach: 'Estimated Audience Reach',
    planFeatureAds: 'Allowed Product Ads',
    planFeatureSupport: 'Technical Support Tier',
    planFeatureBadge: 'Verified Blue Facebook Badge',
    planFeatureAnalytics: 'Advanced Facebook Ads Manager & Analytics',
    allPlansIncludeCod: 'All plans include Cash on Delivery order processing and one-tap WhatsApp integration.',

    catAll: 'All Categories',
    catElectronics: 'High-Tech & Gadgets',
    catBeauty: 'Cosmetics & Pure Argan',
    catFashion: 'Fashion, Leather & Sneakers',
    catHome: 'Home, Decor & Living',
    catAuto: 'Auto & Motorcycle Parts',
    catArtisanal: 'Authentic Moroccan Craftsmanship',

    categoriesHeading: 'Product Categories',
    citiesHeading: 'Fast Delivery Cities',
    moroccanTrustHeading: 'Morocco Trust Commitments',
    trustCodText: 'Cash payment only after inspecting the package',
    trustDeliveryText: '24h - 48h express delivery to all Moroccan cities',
    trustReturnText: '7 days hassle-free exchange and return policy',
    trendingOffers: 'Exclusive Deals Today',
    viewAll: 'View All',

    dashboardTitle: 'Store Ads Manager (Facebook Ads Manager)',
    dashboardSubtitle: 'Monitor campaigns, track WhatsApp leads, and manage customer shipments',
    metricReach: 'Total Audience Reach',
    metricClicks: 'Link Clicks',
    metricWhatsapp: 'WhatsApp Inquiries (Leads)',
    metricOrders: 'Total Customer Orders',
    metricRevenue: 'Recorded Sales Revenue',
    metricRoas: 'Return on Ad Spend (ROAS)',
    activeCampaigns: 'Active Ad Campaigns',
    campaignPause: 'Pause Campaign',
    campaignResume: 'Resume Campaign',
    dailyBudget: 'Daily Budget',
    spent: 'Spent to Date',
    ordersReceived: 'Incoming Customer Orders',
    orderStatusPending: 'Pending Confirmation',
    orderStatusShipping: 'Out for Delivery',
    orderStatusDelivered: 'Delivered & Paid',
    orderStatusCancelled: 'Cancelled',
  },
};
