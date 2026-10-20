import { GoogleGenAI } from '@google/genai';

export interface CopywritingOption {
  id: number;
  title: string;
  style: 'direct_offer' | 'story_problem' | 'viral_short';
  styleName: string;
  platform: string;
  badge: string;
  hook: string;
  body: string;
  callToAction: string;
  fullCopy: string;
}

export interface VideoScriptScene {
  sceneNumber: number;
  title: string;
  visualDirection: string;
  spokenText: string;
  captionText: string;
  durationSec: number;
}

export interface VideoScriptResult {
  type: 'ugc' | 'educational';
  typeName: string;
  hookHeadline: string;
  targetAudience: string;
  scenes: VideoScriptScene[];
  fullVoiceover: string;
}

export interface GeminiCopywritingResponse {
  headlineSuggestions: string[];
  adCopies: CopywritingOption[];
  videoScript: VideoScriptResult;
}

interface GenerateParams {
  productTitle: string;
  category: string;
  price?: number;
  originalPrice?: number;
  brandName?: string;
  city?: string;
  videoType?: 'ugc' | 'educational';
  imageDataUrl?: string; // base64 data URL
}

export async function generateCopywritingWithGemini(
  params: GenerateParams
): Promise<GeminiCopywritingResponse> {
  const {
    productTitle,
    category,
    price = 249,
    originalPrice,
    brandName = 'متجر النخبة',
    city = 'الدار البيضاء',
    videoType = 'ugc',
    imageDataUrl,
  } = params;

  const apiKey =
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof window !== 'undefined' && (window as any).GEMINI_API_KEY) ||
    '';

  const categoryNamesMap: Record<string, string> = {
    beauty: 'صحة وتجميل وكوسميتيك',
    electronics: 'إلكترونيات وأجهزة ذكية',
    fashion: 'أزياء وملابس وأحذية',
    home: 'منزل وديكور ومطبخ',
    auto: 'إكسسوارات سيارات',
    artisanal: 'صناعة تقليدية مغربية',
  };

  const humanCategory = categoryNamesMap[category] || category;
  const numOrig = originalPrice || Math.round(price * 1.5);
  const discount = Math.round(((numOrig - price) / numOrig) * 100);

  // If Gemini API key is available, call Gemini 3.8 Flash!
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `أنت خبير محترف في كتابة الإعلانات التسويقية (Copywriting) وصناعة سكريبتات الفيديو الإعلانية لتجارة الدفع عند الاستلام (COD E-commerce) بالمغرب على فيسبوك، إنستغرام وتيك توك.

بيانات المنتج:
- اسم المنتج: "${productTitle}"
- الفئة والمجال: "${humanCategory}"
- سعر البيع: ${price} درهم مغربي
- السعر قبل التخفيض: ${numOrig} درهم (تخفيض ${discount}%)
- اسم المتجر/العلامة: "${brandName}"
- مدينة المتجر والشحن: "${city}"
- نوع سيناريو الفيديو المطلوب: "${videoType === 'ugc' ? 'UGC (محتوى عفوي من منشئ محتوى مغربي يتحدث للكاميرا)' : 'تعليمي/صيدلاني (أخصائي يشرح المكونات وطريقة العمل)'}"

المطلوب:
1. توليد 3 نصوص إعلانية جذابة ومختلفة كلياً بالدارجة المغربية الفصيحة الجذابة:
   - النص 1 (عرض مباشر وتخفيض): مركز على السعر التخفيضي، التوصيل المجاني، والدفع بعد المعاينة عند الاستلام.
   - النص 2 (عاطفي وحل المشاكل): يركز على معاناة الزبون السابقة (Pain points) وكيف يحل هذا المنتج المشكلة تماماً.
   - النص 3 (قصير وسريع لتيك توك والريلز): مكثف، إيموجي جذاب، إلحاح قوي على نفاد الكمية.

2. توليد سيناريو فيديو احترافي (${videoType.toUpperCase()}) مقسم إلى 4 مشاهد متتالية:
   - المشهد 1: الهوك (Hook) وجذب الانتباه
   - المشهد 2: فتح العلبة واستعراض السلعة
   - المشهد 3: النتيجة المبهرة والتجربة
   - المشهد 4: العرض المغري والدفع عند الاستلام مع رابط الطلب

أجب فقط بكائن JSON صالح بالشكل التالي دون أي نصوص إضافية:
{
  "headlineSuggestions": ["عنوان 1", "عنوان 2", "عنوان 3"],
  "adCopies": [
    {
      "id": 1,
      "title": "عرض مباشر وتخفيض",
      "style": "direct_offer",
      "styleName": "عرض ترويجي مباشر (Direct Offer)",
      "platform": "Facebook & Instagram Feed",
      "badge": "خصم حصري 🔥",
      "hook": "جملة الهوك الأولى",
      "body": "نص الإعلان المفصل مع المميزات",
      "callToAction": "جملة الحث على الشراء مع الواتساب والدفع عند الاستلام",
      "fullCopy": "النص الإعلاني الكامل جاهز للنسخ"
    },
    {
      "id": 2,
      "title": "قصة وحل المشكل",
      "style": "story_problem",
      "styleName": "قصة وحل المشاكل (Pain & Solution)",
      "platform": "Instagram & TikTok",
      "badge": "الحل النهائي 💡",
      "hook": "سؤال الهوك عن المشكل",
      "body": "شرح المعاناة والحل بالمنتج",
      "callToAction": "اطلب الآن مع التوصيل المجاني",
      "fullCopy": "النص الإعلاني الكامل جاهز للنسخ"
    },
    {
      "id": 3,
      "title": "قصير وسريع للريلز وتيك توك",
      "style": "viral_short",
      "styleName": "فيروسي وسريع (Viral Short Hook)",
      "platform": "TikTok & Reels",
      "badge": "الأكثر طلباً ⚡",
      "hook": "هوك صاعق وسريع",
      "body": "نص قصير ومركز جداً مع إيموجي",
      "callToAction": "الكمية محدودة · الدفع بعد المعاينة",
      "fullCopy": "النص الإعلاني الكامل جاهز للنسخ"
    }
  ],
  "videoScript": {
    "type": "${videoType}",
    "typeName": "${videoType === 'ugc' ? 'سيناريو فيديو تجربة زبون (UGC Testimonial)' : 'سيناريو فيديو تعليمي وطبي (Educational Explainer)'}",
    "hookHeadline": "العنوان الرئيسي للهوك",
    "targetAudience": "الفئة المستهدفة",
    "scenes": [
      {
        "sceneNumber": 1,
        "title": "المشهد 1: الهوك وجذب الانتباه",
        "visualDirection": "توجيهات التصوير وزاوية الكاميرا",
        "spokenText": "الكلام المنطوق بالدارجة المغربية",
        "captionText": "الكلمات التوضيحية التي تظهر على الشاشة",
        "durationSec": 3
      },
      {
        "sceneNumber": 2,
        "title": "المشهد 2: استعراض السلعة والتركيبة",
        "visualDirection": "توجيهات التصوير وزاوية الكاميرا",
        "spokenText": "الكلام المنطوق بالدارجة المغربية",
        "captionText": "الكلمات التوضيحية التي تظهر على الشاشة",
        "durationSec": 4
      },
      {
        "sceneNumber": 3,
        "title": "المشهد 3: النتيجة والتجربة العملية",
        "visualDirection": "توجيهات التصوير وزاوية الكاميرا",
        "spokenText": "الكلام المنطوق بالدارجة المغربية",
        "captionText": "الكلمات التوضيحية التي تظهر على الشاشة",
        "durationSec": 4
      },
      {
        "sceneNumber": 4,
        "title": "المشهد 4: العرض المغري والدفع عند الاستلام",
        "visualDirection": "توجيهات التصوير وزاوية الكاميرا",
        "spokenText": "الكلام المنطوق بالدارجة المغربية",
        "captionText": "الكلمات التوضيحية التي تظهر على الشاشة",
        "durationSec": 4
      }
    ],
    "fullVoiceover": "السكريبت الصوتي المتكامل للمونطاج كاملاً"
  }
}`;

      // Build contents (support multimodal if image data URL is provided!)
      let contents: any[] = [];
      if (imageDataUrl && imageDataUrl.startsWith('data:image/')) {
        const parts = imageDataUrl.split(',');
        const mimeMatch = imageDataUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const base64Data = parts[1];

        contents = [
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
          {
            text: `${prompt}\n\n[ملاحظة هامة: صورة المنتج مرفقة أعلاه. قم بتحليل التغليف، الألوان، والمواصفات الظاهرة في الصورة واستخدمها في كتابة النصوص وسيناريو الفيديو بدقة تامة].`,
          },
        ];
      } else {
        contents = [{ text: prompt }];
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      // Parse JSON from response
      const parsed = JSON.parse(responseText.trim());
      if (parsed && parsed.adCopies && parsed.adCopies.length >= 3) {
        return parsed as GeminiCopywritingResponse;
      }
    } catch (err) {
      console.warn('Gemini API call failed or returned unexpected format, falling back to smart copywriter engine:', err);
    }
  }

  // Graceful, ultra-smart fallback engine customized precisely for product and category!
  return generateTailoredLocalCopywriting(params);
}

// Fallback high-conversion Moroccan COD copywriting engine
function generateTailoredLocalCopywriting(params: GenerateParams): GeminiCopywritingResponse {
  const {
    productTitle,
    category,
    price = 249,
    originalPrice,
    brandName = 'متجر النخبة',
    city = 'الدار البيضاء',
    videoType = 'ugc',
  } = params;

  const numOrig = originalPrice || Math.round(price * 1.5);
  const discount = Math.round(((numOrig - price) / numOrig) * 100);

  // Category specific pain points & hooks
  let painPoint = 'التعب والمنتجات الرديئة التي تضيع الوقت والمال';
  let transformation = 'راحة فورية ونتيجة ملموسة من أول أسبوع';
  let audience = 'الرجال والنساء بالمغرب الباحثين عن الجودة الحقيقية';

  if (category === 'beauty') {
    painPoint = 'بهتان البشرة، تساقط الشعر، أو التوتر ومشاكل النوم';
    transformation = 'إشراقة طبيعية، استرخاء عميق، وراحة تامة بدون مواد كيميائية';
    audience = 'النساء والرجال الباحثين عن العناية الطبيعية والصحية';
  } else if (category === 'electronics') {
    painPoint = 'الأجهزة المقلدة التي تتعطل بسرعة وضعف البطارية';
    transformation = 'أداء جبار، بطارية تدوم طويلاً، وجودة ممتازة مضمونة';
    audience = 'عشاق التكنولوجيا والعملية في الاستعمال اليومي';
  } else if (category === 'home') {
    painPoint = 'الفوضى وصعوبة التنظيم والتعب في الأعمال المنزلية';
    transformation = 'تنظيم راقٍ وراحة فائقة وتوفير للوقت والجهد';
    audience = 'ربات البيوت والعائلات التي تبحث عن الأناقة والعملية';
  }

  const headlines = [
    `🔥 العرض الحصري: ${productTitle} بأقوى تخفيض في المغرب`,
    `واش عييتي من ${painPoint}؟ الحل النهائي بين يديك اليوم!`,
    `باقة التوفير الخاصة بـ ${productTitle} · الدفع عند الاستلام والتوصيل مجاني`,
  ];

  const copy1Full = `🔥 همزة خاصة وحصرية اليوم في متجر ${brandName}!
لكل من يبحث عن الجودة العالية: ${productTitle} الأصلي وصل بالمغرب 🇲🇦

✨ أبرز المميزات:
✅ جودة أصلية ممتازة 100% مع ضمان التجربة
✅ ${transformation}
✅ سهل وعملي جداً في الاستعمال اليومي

💰 السعر التخفيضي: ${price} درهم فقط (عوض ${numOrig} درهم)
🎁 اشتري 2 واحصل على خصم إضافي + هدية مجانية!
🚚 التوصيل مجاني وسريع حتى لباب دارك في ${city} وكافة المدن المغربية
💵 الدفع نقداً عند الاستلام وبعد ما تقلب سلعتك بيدك!

👇 للطلب المباشر تواصل معنا عبر الواتساب أو اضغط على الزر أسفله!`;

  const copy2Full = `واش بصح عييتي من ${painPoint}؟ 😔
شحال من منتج جربتيه وما عطاك حتى شي نتيجة وبقيتي غير كتضيعي في فلوسك؟

كنقدمو ليك الحل السحري اللي هدا بيه آلاف الزبناء بالمغرب: ${productTitle} الأصلي 🌿
صُمم خصيصاً باش يعطيك ${transformation}.

💡 علاش غتختار ${productTitle} منا؟
• أصلي ومضمون مع ضمان استرجاع 7 أيام
• تجارب حقيقية وتقييم 5 نجوم من زبنائنا
• ثمن مناسب: غير ${price} درهم عوض ${numOrig} درهم
• التوصيل فابور حتى للباب والدفع حتى تشد كوليتك وتفحصها!

اطلب دابا قبل ما يسالي العرض الترويجي المخفض ⏳`;

  const copy3Full = `⚡ السر اللي مخبيينو عليك في ${productTitle}!
إذا كنت في ${city} أو أي مدينة بالمغرب، هاد الهمزة ما خصكش تضيعها:

🏷️ تخفيض ${discount}% اليوم فقط!
💵 غير ${price} DH (عوض ${numOrig} DH)
🚚 التوصيل بالمجان 24h والدفع عند الاستلام
📦 باقي قطع قليلة فقط في المخزن!

اضغط على الرابط واطلب في ثواني معدودة 🛒👇`;

  const adCopies: CopywritingOption[] = [
    {
      id: 1,
      title: 'عرض ترويجي مباشر وتخفيض قوي',
      style: 'direct_offer',
      styleName: 'عرض ترويجي مباشر (Direct COD Offer)',
      platform: 'Facebook & Instagram Feed',
      badge: `خصم ${discount}% اليوم 🔥`,
      hook: `🔥 همزة خاصة وحصرية اليوم على ${productTitle}!`,
      body: `أصلي 100% مع ${transformation} وتوصيل سريع ومجاني.`,
      callToAction: `السعر: ${price} درهم فقط · الدفع عند الاستلام`,
      fullCopy: copy1Full,
    },
    {
      id: 2,
      title: 'قصة عاطفية وحل المشكل (PAS)',
      style: 'story_problem',
      styleName: 'قصة حل المشاكل (Problem-Agitation-Solution)',
      platform: 'Instagram & TikTok Story',
      badge: 'الحل النهائي المضمون 💡',
      hook: `واش بصح عييتي من ${painPoint}؟`,
      body: `شحال من منتج جربتيه وما عطاك حتى نتيجة؟ إليك الحل الفعال والمجرب.`,
      callToAction: 'استفد من ضمان 7 أيام والتوصيل المجاني',
      fullCopy: copy2Full,
    },
    {
      id: 3,
      title: 'قصير وفيروسي سريع للموبايل',
      style: 'viral_short',
      styleName: 'إعلان فيروزي سريع (Short & Viral Hook)',
      platform: 'TikTok & Reels',
      badge: 'الكمية محدودة ⚡',
      hook: `⚡ السر اللي مخبيينو عليك في ${productTitle}!`,
      body: `تخفيض ${discount}% · توصيل فابور لكافة المدن والدفع بعد المعاينة.`,
      callToAction: 'اطلب الآن قبل نفاد المخزون',
      fullCopy: copy3Full,
    },
  ];

  // Video Script Generation (UGC or Educational)
  const isUgc = videoType === 'ugc';
  const videoScript: VideoScriptResult = {
    type: videoType,
    typeName: isUgc
      ? 'سيناريو فيديو تجربة زبون عفوي (UGC Testimonial Video)'
      : 'سيناريو فيديو تعليمي وطبي (Educational & Explainer Video)',
    hookHeadline: isUgc
      ? `البنات/الدراري، جبت ليكم الحل اللي غادي يهنيكم نهائياً مع ${productTitle}!`
      : `الحقيقة العلمية الخفية: كيف يحل ${productTitle} المشكلة من جذورها؟`,
    targetAudience: audience,
    scenes: isUgc
      ? [
          {
            sceneNumber: 1,
            title: 'المشهد 1: الهوك الواقعي وجذب الانتباه (0-3 ثواني)',
            visualDirection: 'منشئ محتوى أمام الكاميرا يعبر عن الدهشة ويمسك العلبة أو يشير إليها',
            spokenText: `البنات/الدراري، شكون فيكم كيعاني من ${painPoint}؟ عييت ما نجرب حتى لقيت هاد السحر اللي عتقني!`,
            captionText: `واش كتعاني من ${painPoint.slice(0, 25)}؟ شوف هاد الحل! 😱`,
            durationSec: 3,
          },
          {
            sceneNumber: 2,
            title: 'المشهد 2: فتح العلبة واستعراض السلعة (3-6 ثواني)',
            visualDirection: 'لقطة مقربة (B-Roll) للسلعة مع فتحها واستعراض جودتها الفاخرة',
            spokenText: `شوفو معايا ${productTitle} الأصلي، الجودة ديالو تبارك الله كتحمق ومصاوب بأعلى معايير.`,
            captionText: `الجودة الأصلية 100% الممتازة ✨`,
            durationSec: 4,
          },
          {
            sceneNumber: 3,
            title: 'المشهد 3: النتيجة المبهرة بعد أسبوع (6-9 ثواني)',
            visualDirection: 'منشئ المحتوى مبتسم ومرتاح ويظهر أثر الراحة والنتيجة الإيجابية',
            spokenText: `من أول أسبوع استعمال حسيت بـ ${transformation}، والفرق واضح بزاف!`,
            captionText: `نتيجة ملموسة من أول أسبوع استعمال 💯`,
            durationSec: 4,
          },
          {
            sceneNumber: 4,
            title: 'المشهد 4: العرض الحصري والدفع عند الاستلام (9-12 ثانية)',
            visualDirection: 'إظهار العلبة مع الإشارة إلى زر الطلب أسفل الشاشة',
            spokenText: `دايرين عرض واعر: ${price} درهم فقط والتوصيل بالمجان وكتخلص حتى كتقلب سلعتك. اطلب دابا قبل ما يسالي!`,
            captionText: `تخفيض ${discount}% · توصيل مجاني والدفع بعد المعاينة 🚚`,
            durationSec: 4,
          },
        ]
      : [
          {
            sceneNumber: 1,
            title: 'المشهد 1: الحقيقة العلمية الصادمة (0-3 ثواني)',
            visualDirection: 'خبير أو صيدلاني في بيئة أنيقة يشرح المشكل بجدية ومصداقية',
            spokenText: `واش عارف بلي أغلب الحلول التقليدية لـ ${painPoint} غير كتضيع الوقت وما كتحلش السبب الحقيقي؟`,
            captionText: `التفسير العلمي لمشكل ${painPoint.slice(0, 20)} 🔬`,
            durationSec: 3,
          },
          {
            sceneNumber: 2,
            title: 'المشهد 2: التركيبة وطريقة العمل (3-6 ثواني)',
            visualDirection: 'زووم مقرب على مكونات السلعة مع رسوم توضيحية لسرعة الفعالية',
            spokenText: `هاد ${productTitle} كيحتوي على تركيبة متطورة كتوصل مباشرة للمصدر وكتعطي مفعول سريع وآمن.`,
            captionText: `تركيبة متطورة وفعالية سريعة بدون أضرار 💡`,
            durationSec: 4,
          },
          {
            sceneNumber: 3,
            title: 'المشهد 3: المفعول والنتائج المؤكدة (6-9 ثواني)',
            visualDirection: 'مقارنة توضيحية لسهولة الاستعمال والنتائج المحققة',
            spokenText: `كيساعد على تحقيق ${transformation} بشكل دائم وطبيعي 100%.`,
            captionText: `نتائج طبيعية ومضمونة مع الاستعمال المنتظم ⭐`,
            durationSec: 4,
          },
          {
            sceneNumber: 4,
            title: 'المشهد 4: التوصية الطبية وعرض الشحن (9-12 ثانية)',
            visualDirection: 'عرض شارة الضمان مع السعر الترويجي وزر الطلب',
            spokenText: `كنصح بيه كبديل آمن وموثوق. اطلبوه الآن بالسعر المخفض مع التوصيل المجاني والدفع بعد الاستلام.`,
            captionText: `موصى به · ضمان الأصالة 100% · توصيل فابور 🚚`,
            durationSec: 4,
          },
        ],
    fullVoiceover: isUgc
      ? `البنات/الدراري، شكون فيكم كيعاني من ${painPoint}؟ عييت ما نجرب حتى لقيت هاد السحر اللي عتقني! شوفو معايا ${productTitle} الأصلي، الجودة ديالو تبارك الله كتحمق. من أول أسبوع استعمال حسيت بـ ${transformation}، والفرق واضح بزاف! دايرين عرض واعر: ${price} درهم فقط والتوصيل بالمجان وكتخلص حتى كتقلب سلعتك بيدك. اضغط على الرابط واطلب دابا!`
      : `واش عارف بلي أغلب الحلول التقليدية لـ ${painPoint} غير كتضيع الوقت وما كتحلش السبب الحقيقي؟ هاد ${productTitle} كيحتوي على تركيبة متطورة كتوصل مباشرة للمصدر وكتعطي ${transformation}. كنصح بيه كبديل آمن وموثوق. اطلبوه الآن بالسعر المخفض مع التوصيل المجاني والدفع بعد الاستلام.`,
  };

  return {
    headlineSuggestions: headlines,
    adCopies,
    videoScript,
  };
}
