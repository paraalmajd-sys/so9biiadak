import {
  ProductAd,
  Story,
  PageProfile,
  AdCampaign,
  CustomerOrder,
  PricingPlan,
  SellerNotification,
  UserAccount,
} from '../types';

export const getLocalVideo = (filename: string): string => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}videos/${filename}`;
};

export const getLocalImage = (filename: string): string => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}images/${filename}`;
};

export const INITIAL_STORIES: Story[] = [
  {
    id: 's1',
    brandName: 'TitaniumTech Maroc',
    brandAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    title: 'فيديو تجربة ساعة التيتانيوم',
    discount: '-45%',
    image: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    videoUrl: getLocalVideo('product-preview-1.mp4'),
    fallbackVideoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    productAdId: 'ad-1',
    views: '4.8k'
  },
  {
    id: 's2',
    brandName: 'أركان الأطلس الطبيعي',
    brandAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    title: 'فيديو نتائج سيروم الأركان',
    discount: '-30%',
    image: getLocalImage('product_moroccan_argan_oil_1792240155621.jpg'),
    videoUrl: getLocalVideo('product-preview-2.mp4'),
    fallbackVideoUrl: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4',
    productAdId: 'ad-2',
    views: '6.2k'
  },
  {
    id: 's3',
    brandName: 'SoundPro Maghreb',
    brandAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    title: 'فيديو تجربة عزل الصوت ANC',
    discount: '-50%',
    image: getLocalImage('product_wireless_earbuds_1792240155858.jpg'),
    videoUrl: getLocalVideo('product-preview-3.mp4'),
    fallbackVideoUrl: 'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
    productAdId: 'ad-3',
    views: '3.9k'
  },
  {
    id: 's4',
    brandName: 'أحذية الجلد الفاسي',
    brandAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    title: 'فيديو ورشة خياطة الجلد الطبيعي',
    discount: '-35%',
    image: getLocalImage('product_leather_sneakers_1792240155657.jpg'),
    videoUrl: getLocalVideo('product-preview-4.mp4'),
    fallbackVideoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    productAdId: 'ad-4',
    views: '5.1k'
  }
];

export const INITIAL_ADS: ProductAd[] = [
  {
    id: 'ad-1',
    brandName: 'SO9FIADAK Store',
    brandHandle: '@so9fiadak_official',
    brandAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    verified: true,
    sponsored: true,
    title: 'ساعة Ultra Titanium الذكية الرياضية - مقاومة للماء مع بطارية تدوم 14 يوم',
    description: `🔥 الهمزة ديال هاد السيمانة في سوق في يدك! 
أحسن ساعة ذكية متوفرة حالياً في المغرب بهيكل من التيتانيوم الأصلي المقاوم للصدمات والخدوش.
كتخدم مع جميع الهواتف (iPhone و Android)، كتحسب دقات القلب، الضغط، جودة النوم والأنشطة الرياضية، وفيها إمكانية استقبال المكالمات مباشرة بالبلوتوث!

🎥 شاهد فيديو المراجعة وتجربة الاتصال في المنشور أسفله.
🚚 التوصيل فابور وفالسريع لجميع المدن المغربية (24/48 ساعة)
💵 الخلاص حتى توصلك لدارك وتقلبها عاد تخلص (Paiement à la livraison)
✅ ضمان حقيقي لمدة سنة كاملة مع إمكانية التبديل`,
    features: [
      'هيكل تيتانيوم مقاوم للماء والغبار معيار IP68',
      'إجراء واستقبال المكالمات بصوت واضح وميكروفون نقي',
      'بطارية خارقة تدوم حتى 14 يوم بشحنة واحدة',
      'شاشة AMOLED فائقة الوضوح مع خاصية Always-on Display'
    ],
    price: 389,
    originalPrice: 699,
    discountPercent: 44,
    currency: 'DH',
    rating: 4.9,
    reviewsCount: 312,
    images: [
      getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
      getLocalImage('product_wireless_earbuds_1792240155858.jpg')
    ],
    videoUrl: getLocalVideo('product-preview-1.mp4'),
    fallbackVideoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    videoPoster: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    mediaType: 'video',
    videoDuration: '0:34',
    videoViews: '18.4k',
    category: 'electronics',
    city: 'الدار البيضاء',
    whatsappNumber: '+212612345678',
    phone: '0612345678',
    freeShipping: true,
    cashOnDelivery: true,
    stockLeft: 14,
    createdAt: 'منذ ساعتين',
    likesCount: 524,
    commentsCount: 68,
    sharesCount: 142,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c1',
        author: 'يوسف بنسليمان - الدار البيضاء',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        text: 'سلام عليكم، واش التوصيل للدار البيضاء كيوصل في نفس النهار؟',
        timeAgo: 'منذ ساعة',
        isSellerReply: false
      },
      {
        id: 'c2',
        author: 'SO9FIADAK Store (البائع)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        text: 'وعليكم السلام خويا يوسف! نعم كازا والرباط التوصيل Express في نفس النهار أو الغد كحد أقصى، وخلاصك حتى تفحص السلعة في يدك.',
        timeAgo: 'منذ 45 دقيقة',
        isSellerReply: true
      },
      {
        id: 'c3',
        author: 'حمزة المراكشي',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
        text: 'وصلاتني البارح في مراكش، صراحة جودة خيالية مقارنة مع الثمن. شكرا بزاف على المعاملة النقية!',
        timeAgo: 'منذ 30 دقيقة',
        isSellerReply: false
      }
    ]
  },
  {
    id: 'ad-2',
    brandName: 'SO9FIADAK Store',
    brandHandle: '@so9fiadak_official',
    brandAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    verified: true,
    sponsored: true,
    title: 'باك العناية الفاخر: زيت الأركان المغربي الحيوي البكر 100% مع سيروم نضارة الوجه',
    description: `🌿 سر النضارة المغربية الأصيلة، مستخرج بالطريقة التقليدية المعصورة على البارد مباشرة من منطقة تارودانت وسوس.
باك متكامل للعناية بالبشرة والشعر:
1. قنينة زيت أركان طبيعي بيو 100 مل مغذي ومرطب عميق
2. سيروم فيتامين E الطبيعي لمكافحة التجاعيد وتوحيد لون البشرة 50 مل

✨ نتائج مبهرة من الأسبوع الأول، خالي تماماً من المواد الكيميائية والعطور الاصطناعية.
🎁 هدية خاصة: صابونة بلدية بالأركان وزهر البرتقال مع كل طلبية اليوم!`,
    features: [
      'زيت أركان بيو 100% معتمد ومعصور على البارد',
      'غني بمضادات الأكسدة وأحماض أوميغا 6 و 9 وفيتامين E',
      'يرطب البشرة، يقوي بصيلات الشعر، ويعيد إشراقة الوجه',
      'توصيل سريع ومجاني + الدفع عند الاستلام'
    ],
    price: 249,
    originalPrice: 380,
    discountPercent: 34,
    currency: 'DH',
    rating: 5.0,
    reviewsCount: 489,
    images: [
      getLocalImage('product_moroccan_argan_oil_1792240155621.jpg')
    ],
    videoUrl: getLocalVideo('product-preview-2.mp4'),
    fallbackVideoUrl: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4',
    videoPoster: getLocalImage('product_moroccan_argan_oil_1792240155621.jpg'),
    mediaType: 'video',
    videoDuration: '0:28',
    videoViews: '24.1k',
    category: 'beauty',
    city: 'أكادير',
    whatsappNumber: '+212612345678',
    phone: '0612345678',
    freeShipping: true,
    cashOnDelivery: true,
    stockLeft: 9,
    createdAt: 'منذ 3 ساعات',
    likesCount: 890,
    commentsCount: 114,
    sharesCount: 230,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c4',
        author: 'سناء الإدريسي - الرباط',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        text: 'تبارك الله ريحتو غزالة باينة أصلي ماشي مخلط. غنزيد نكوموندي للوالدة دابا.',
        timeAgo: 'منذ ساعتين',
        isSellerReply: false
      },
      {
        id: 'c5',
        author: 'فاطمة الزهراء - طنجة',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        text: 'واش ممكن نسيفط كادو لعنوان آخر ف فاس؟',
        timeAgo: 'منذ ساعة',
        isSellerReply: false
      },
      {
        id: 'c6',
        author: 'SO9FIADAK Store (البائع)',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
        text: 'مرحبا أختي فاطمة الزهراء، نعم نوصلوها ليهم ف فاس مع بطاقة إهداء مخصصة بدون أي مصاريف إضافية!',
        timeAgo: 'منذ 40 دقيقة',
        isSellerReply: true
      }
    ]
  },
  {
    id: 'ad-3',
    brandName: 'SO9FIADAK Store',
    brandHandle: '@so9fiadak_official',
    brandAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: true,
    sponsored: true,
    title: 'سماعات Pro Wireless ANC بعزل صوتي احترافي 40dB وصوت Bass نقي وعميق',
    description: `🎧 عش تجربة صوتية استثنائية مع أحدث سماعات البلوتوث المجهزة بنظام عزل الضوضاء النشط (Active Noise Cancellation).
مثالية للمكالمات في الشارع، الرياضة، السفر، وألعاب الفيديو بدون أي تأخير في الصوت (Ultra Low Latency).

🔋 علبة الشحن كتعطيك حتى ل 36 ساعة من الاستماع المتواصل
⚡ شحن سريع ف 10 دقايق كيعطيك ساعتين ديال الخدمة
👌 تحكم ذكي باللمس مع دعم Siri و Google Assistant`,
    features: [
      'عزل الضوضاء النشط ANC حتى 40 ديسيبل',
      '4 ميكروفونات ذكية للمكالمات شديدة الوضوح في الزحام والريح',
      'مقاومة للعرق وقطرات المطر بمعيار IPX5',
      'متوافقة مع جميع أنواع الهواتف والحواسب'
    ],
    price: 299,
    originalPrice: 550,
    discountPercent: 45,
    currency: 'DH',
    rating: 4.8,
    reviewsCount: 215,
    images: [
      getLocalImage('product_wireless_earbuds_1792240155858.jpg')
    ],
    videoUrl: getLocalVideo('product-preview-3.mp4'),
    fallbackVideoUrl: 'https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4',
    videoPoster: getLocalImage('product_wireless_earbuds_1792240155858.jpg'),
    mediaType: 'video',
    videoDuration: '0:38',
    videoViews: '9.4k',
    category: 'electronics',
    city: 'طنجة',
    whatsappNumber: '+212612345678',
    phone: '0612345678',
    freeShipping: true,
    cashOnDelivery: true,
    stockLeft: 19,
    createdAt: 'منذ 5 ساعات',
    likesCount: 412,
    commentsCount: 42,
    sharesCount: 88,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c7',
        author: 'عادل السعيدي - وجدة',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80',
        text: 'كيفاش العزل ديالها فالطوبيس والزنقة؟ واش كتحبس الصداع مزيان؟',
        timeAgo: 'منذ 3 ساعات',
        isSellerReply: false
      },
      {
        id: 'c8',
        author: 'SO9FIADAK Store (البائع)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        text: 'خويا عادل فيها ميكروفونات ANC كتعزل صوت المحركات والصداع الخارجي بنسبة تفوق 90%، تجربة مضمونة!',
        timeAgo: 'منذ ساعتين',
        isSellerReply: true
      }
    ]
  },
  {
    id: 'ad-4',
    brandName: 'SO9FIADAK Store',
    brandHandle: '@so9fiadak_official',
    brandAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    verified: true,
    sponsored: true,
    title: 'حذاء سنيكرز Retro 1978 من الجلد الطبيعي الفاخر 100% صُنع يدوي مغربي أصيل',
    description: `👟 الأناقة والراحة تدوم لسنوات! سنيكرز مصمم بحرفية يدوية في مدينة فاس العريقة من أجود أنواع جلد البقر الطبيعي الإيطالي والمغربي.
نعل طبي مريح جداً للوقوف الطويل والمشي اليومي، مع خياطة مدبلة متينة كتضمن الصلابة.

🎨 متوفر في ألوان كلاسيكية جذابة (الأبيض مع البني الكونياك الملكي)
📏 جميع المقاسات متوفرة من 39 حتى ل 45 (مع إمكانية قياس الحذاء عند وصول الموزع قبل الدفع)`,
    features: [
      'جلد طبيعي حقيقي 100% داخلي وخارجي مضاد للتعرق والروائح',
      'نعل طبي Orthopedic يمتص الصدمات ويريّح الظهر والركبة',
      'خياطة حرفية يدوية متقنة تدوم لسنوات عديدة',
      'إمكانية تجربة القياس فالحين مع ليفرور قبل الأداء'
    ],
    price: 349,
    originalPrice: 520,
    discountPercent: 33,
    currency: 'DH',
    rating: 4.9,
    reviewsCount: 378,
    images: [
      getLocalImage('product_leather_sneakers_1792240155657.jpg')
    ],
    videoUrl: getLocalVideo('product-preview-4.mp4'),
    fallbackVideoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    videoPoster: getLocalImage('product_leather_sneakers_1792240155657.jpg'),
    mediaType: 'video',
    videoDuration: '0:42',
    videoViews: '12.8k',
    category: 'fashion',
    city: 'فاس',
    whatsappNumber: '+212612345678',
    phone: '0612345678',
    freeShipping: true,
    cashOnDelivery: true,
    stockLeft: 8,
    createdAt: 'منذ 7 ساعات',
    likesCount: 673,
    commentsCount: 95,
    sharesCount: 164,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: 'c9',
        author: 'طارق العلمي - مراكش',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
        text: 'سلام واش يلا جاني السايز 42 مضيق نقدر نبدلو ب 43 فالبلاصة؟',
        timeAgo: 'منذ 4 ساعات',
        isSellerReply: false
      },
      {
        id: 'c10',
        author: 'SO9FIADAK Store (البائع)',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        text: 'أكيد أستاذ طارق! كنصيفطو مع الموزع القياس 42 و 43 باش تقيسهم بجوج وتختار لي يريح رجليك بالظبط.',
        timeAgo: 'منذ ساعتين',
        isSellerReply: true
      }
    ]
  }
];

export const DEFAULT_PAGE_PROFILE: PageProfile = {
  id: 'page-1',
  name: 'SO9FIADAK Official Store',
  handle: '@so9fiadak_official',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  coverImage: getLocalImage('page_cover_banner_1792240702380.jpg'),
  category: 'متجر تجارة إلكترونية وإعلانات مموّلة',
  bio: 'الصفحة الرسمية لـ SO9FIADAK بالمغرب. نوفر أرقى المنتجات الحصرية بأسعار الجملة، مع التوصيل المجاني السريع لجميع المدن المغربية 24/48 ساعة والدفع عند الاستلام بعد معاينة السلعة.',
  verified: true,
  followersCount: 28400,
  likesCount: 24150,
  rating: 4.9,
  reviewsCount: 1430,
  phone: '0612345678',
  whatsapp: '+212612345678',
  email: 'contact@so9fiadak.ma',
  city: 'الدار البيضاء، المغرب',
  address: 'شارع عبد المومن، الدار البيضاء',
  deliveryPolicy: 'توصيل مجاني خلال 24 إلى 48 ساعة لجميع مدن وقرى المغرب مع إمكانية المعاينة قبل الدفع.',
  workingHours: 'من الإثنين إلى السبت: 09:00 - 20:00'
};

export const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'camp-1',
    adId: 'ad-1',
    title: 'حملة ساعة Ultra Titanium الذكية (فيديو + صور)',
    productImage: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    status: 'active',
    dailyBudget: 150,
    spent: 1850,
    reach: 24500,
    clicks: 1940,
    whatsappMessages: 215,
    ordersCount: 54,
    cpc: 0.95,
    startDate: '2026-10-01'
  },
  {
    id: 'camp-2',
    adId: 'ad-2',
    title: 'باك العناية بالأركان الحيوي (فيديو ريلز تجربة)',
    productImage: getLocalImage('product_moroccan_argan_oil_1792240155621.jpg'),
    status: 'active',
    dailyBudget: 120,
    spent: 1440,
    reach: 18200,
    clicks: 1230,
    whatsappMessages: 184,
    ordersCount: 48,
    cpc: 1.17,
    startDate: '2026-10-05'
  },
  {
    id: 'camp-3',
    adId: 'ad-3',
    title: 'حملة سماعات Pro Wireless ANC - تخفيض 50%',
    productImage: getLocalImage('product_wireless_earbuds_1792240155858.jpg'),
    status: 'active',
    dailyBudget: 100,
    spent: 900,
    reach: 12800,
    clicks: 890,
    whatsappMessages: 96,
    ordersCount: 28,
    cpc: 1.01,
    startDate: '2026-10-10'
  },
  {
    id: 'camp-4',
    adId: 'ad-4',
    title: 'سنيكرز الجلد الطبيعي الفاسي (فيديو ورشة فاس)',
    productImage: getLocalImage('product_leather_sneakers_1792240155657.jpg'),
    status: 'paused',
    dailyBudget: 80,
    spent: 640,
    reach: 9400,
    clicks: 610,
    whatsappMessages: 52,
    ordersCount: 16,
    cpc: 1.05,
    startDate: '2026-10-08'
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'SO9-8921',
    adId: 'ad-1',
    productTitle: 'ساعة Ultra Titanium الذكية الرياضية',
    productImage: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    customerName: 'يوسف بنسليمان',
    phone: '0661239845',
    city: 'الدار البيضاء',
    address: 'المعاريف، زنقة الجابرتي، عمارة 14',
    quantity: 1,
    totalPrice: 389,
    currency: 'DH',
    createdAt: 'منذ ساعتين',
    status: 'delivered'
  },
  {
    id: 'SO9-8922',
    adId: 'ad-2',
    productTitle: 'باك العناية الفاخر: زيت الأركان المغربي مع سيروم نضارة الوجه',
    productImage: getLocalImage('product_moroccan_argan_oil_1792240155621.jpg'),
    customerName: 'سناء الإدريسي',
    phone: '0672114490',
    city: 'الرباط',
    address: 'حي أكدال، شارع الأطلس، إقامة النخيل',
    quantity: 2,
    totalPrice: 498,
    currency: 'DH',
    createdAt: 'منذ 3 ساعات',
    status: 'shipping'
  },
  {
    id: 'SO9-8923',
    adId: 'ad-4',
    productTitle: 'حذاء سنيكرز Retro 1978 من الجلد الطبيعي (مقاس 43)',
    productImage: getLocalImage('product_leather_sneakers_1792240155657.jpg'),
    customerName: 'حمزة المراكشي',
    phone: '0655883201',
    city: 'مراكش',
    address: 'حي جليز، قرب ساحة 16 نونبر',
    quantity: 1,
    totalPrice: 349,
    currency: 'DH',
    createdAt: 'منذ 4 ساعات',
    status: 'pending'
  },
  {
    id: 'SO9-8924',
    adId: 'ad-3',
    productTitle: 'سماعات Pro Wireless ANC بعزل صوتي احترافي',
    productImage: getLocalImage('product_wireless_earbuds_1792240155858.jpg'),
    customerName: 'فاطمة الزهراء',
    phone: '0663449912',
    city: 'طنجة',
    address: 'حي مالاباطا، مجمع إيبيريا',
    quantity: 1,
    totalPrice: 299,
    currency: 'DH',
    createdAt: 'منذ 5 ساعات',
    status: 'pending'
  },
  {
    id: 'SO9-8925',
    adId: 'ad-1',
    productTitle: 'ساعة Ultra Titanium الذكية الرياضية',
    productImage: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    customerName: 'طارق العلمي',
    phone: '0619887766',
    city: 'فاس',
    address: 'طريق إيموزار، حي الأدارسة',
    quantity: 1,
    totalPrice: 389,
    currency: 'DH',
    createdAt: 'أمس',
    status: 'shipping'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'باقة الانطلاق والتجربة',
    badge: 'للبداية وتجربة السوق',
    priceUSD: 20,
    priceMAD: 200,
    period: 'شهرياً',
    description: 'مثالية للتجار المبتدئين وأصحاب المنتجات الفردية الذين يريدون اختبار الإعلانات وسرعة المبيعات.',
    popular: false,
    reachGuarantee: '15,000 ظهور مؤكد للإعلانات (Reach)',
    adsLimit: 'حتى 10 إعلانات منتجات شهرياً (نصوص، صور، فيديو)',
    supportLevel: 'دعم فني عبر واتساب 6/7',
    features: [
      'نشر وترويج حتى 10 إعلانات منتجات شهرياً (نصوص + صور + فيديوهات)',
      'ظهور مضمون لأكثر من 15,000 زبون مغربي مهتم',
      'زر طلب فوري عبر واتساب مباشر في كل إعلان',
      'استمارة الدفع عند الاستلام (COD Form) سريعة ومجانية',
      'إشعارات فورية بالطلبيات الجديدة والليدات الواردة',
      'إمكانية تعديل ثمن وصور وفيديوهات الإعلانات في أي وقت'
    ]
  },
  {
    id: 'pro',
    name: 'باقة التاجر المحترف',
    badge: 'الأكثر اختياراً من التجار',
    priceUSD: 30,
    priceMAD: 300,
    period: 'شهرياً',
    description: 'الباقة الأكثر طلباً لزيادة الطلبيات وبناء علامة تجارية قوية وموثوقة لدى الزبائن المغاربة.',
    popular: true,
    reachGuarantee: '45,000 ظهور ممول مضاعف (Reach)',
    adsLimit: 'نشر غير محدود لإعلانات المنتجات والفيديوهات',
    supportLevel: 'دعم ومتابعة مخصصة 7/7',
    features: [
      'نشر غير محدود لجميع منتجات وسلع متجرك مع دعم كامل للفيديو',
      '45,000 ظهور مموّل في الفيد الرئيسي وقسم ريلز المنتجات (Watch)',
      'شارة التوثيق الزرقاء للمتجر (Verified Merchant Badge)',
      'أولوية الظهور في نتائج البحث وتصفية المدن',
      'لوحة تحكم متقدمة لمتابعة مشاهدات الفيديو والنقرات والطلبيات',
      'نظام إدارة وتحديث حالات الطلبيات مع الموزعين',
      'حملات إعادة استهداف خفيفة للزبائن الذين تفاعلوا مع إعلاناتك'
    ]
  },
  {
    id: 'vip',
    name: 'باقة المقاولة الكبرى والنمو السريع',
    badge: 'لأعلى حجم مبيعات ونمو',
    priceUSD: 45,
    priceMAD: 450,
    period: 'شهرياً',
    description: 'أعلى مستوى من الانتشار والدعم لتسريع التوزيع على جميع مدن وقرى المملكة بدون حدود.',
    popular: false,
    reachGuarantee: '90,000+ ظهور إعلاني مكثّف وخاص',
    adsLimit: 'نشر وتثبيت إعلانات وفيديوهات غير محدود',
    supportLevel: 'مدير حسابات وتوجيه إعلاني خاص VIP',
    features: [
      'كل مميزات باقة التاجر المحترف + نشر وتثبيت غير محدود',
      'أكثر من 90,000 ظهور مكثف في جميع المدن المغربية',
      'تثبيت إعلاناتك وفيديوهاتك في صدارة "أكثر الإعلانات طلباً اليوم"',
      'مساعدة متخصصة في كتابة نصوص الإعلانات وسيناريو الفيديوهات بالدارجة',
      'تصدير بيانات الطلبيات والزبائن إلى ملف Excel بنقرة زر',
      'ربط مباشر مع شركات الشحن الوطنية (Amana, Cathedis, Ozone)',
      'مدير حسابات خاص لمتابعة الحملات وتحسين تكلفة النقرة (CPC)'
    ]
  }
];

export const INITIAL_NOTIFICATIONS: SellerNotification[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'طلب جديد مؤكد! 🛍️',
    message: 'توصلت بطلب جديد من يوسف بنسليمان (الدار البيضاء) لساعة Ultra Titanium بمبلغ 389 DH.',
    timeAgo: 'منذ 15 دقيقة',
    read: false,
    orderId: 'SO9-8921'
  },
  {
    id: 'notif-2',
    type: 'lead',
    title: 'محادثة واتساب جديدة 💬',
    message: 'زبونة في مراكش نقرت على زر واتساب بعد مشاهدة فيديو زيت الأركان.',
    timeAgo: 'منذ 40 دقيقة',
    read: false
  },
  {
    id: 'notif-3',
    type: 'ad_performance',
    title: 'فيديو إعلانك يحقق تفاعلاً عالياً! 🔥',
    message: 'فيديو ساعة Ultra Titanium حقق أكثر من 18,000 مشاهدة و215 محادثة شراء.',
    timeAgo: 'منذ ساعتين',
    read: true
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'تم تسجيل الطلبية بنجاح ✅',
    message: 'سناء الإدريسي (الرباط) أكدت طلبيتها لباك العناية بالأركان، وهي الآن قيد الشحن.',
    timeAgo: 'منذ 3 ساعات',
    read: true,
    orderId: 'SO9-8922'
  }
];

export const DEFAULT_MERCHANT_ACCOUNT: UserAccount = {
  id: 'usr-merchant-1',
  role: 'merchant',
  fullName: 'محمد الفاسي',
  email: 'seller@so9fiadak.ma',
  businessName: 'SO9FIADAK Store',
  phone: '0612345678',
  whatsapp: '+212612345678',
  city: 'الدار البيضاء',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  planId: 'pro',
  hasActiveSubscription: true,
  verified: true,
  isLoggedIn: true
};

export const DEFAULT_BUYER_ACCOUNT: UserAccount = {
  id: 'usr-buyer-1',
  role: 'buyer',
  fullName: 'ياسين بنجلون',
  email: 'yassine.b@gmail.com',
  phone: '0677889900',
  whatsapp: '+212677889900',
  city: 'مراكش',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  planId: 'none',
  hasActiveSubscription: false,
  verified: false,
  isLoggedIn: true
};

export const CITIES = [
  'كل المدن',
  'الدار البيضاء',
  'الرباط',
  'مراكش',
  'طنجة',
  'فاس',
  'أكادير',
  'وجدة',
  'مكناس',
  'القنيطرة',
  'تطوان'
];

export const CATEGORIES = [
  { id: 'all', label: 'كل الإعلانات' },
  { id: 'electronics', label: 'إلكترونيات وهواتف' },
  { id: 'beauty', label: 'صحة وجمال وعطور' },
  { id: 'fashion', label: 'أزياء وأحذية' },
  { id: 'home', label: 'المنزل والديكور' },
  { id: 'auto', label: 'إكسسوارات السيارات' },
  { id: 'artisanal', label: 'صناعة تقليدية مغربية' }
];
