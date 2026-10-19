import React, { useState, useEffect, useRef } from 'react';
import { ProductAd } from '../types';
import { getLocalImage } from '../data/mockData';
import {
  Sparkles,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Eye,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Flame,
  BadgeCheck,
  Layers,
  Palette,
  Layout,
  Zap,
  Plus,
  UploadCloud,
  X,
  Maximize2,
  Share2,
  Code2,
  MessageCircle,
  Video,
  Image as ImageIcon,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileCode,
  Play,
  TrendingUp,
  Target,
  Trash2,
  FolderOpen,
  AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface CreativeLandingBuilderViewProps {
  ads: ProductAd[];
  onOpenCreateAd: () => void;
  onQuickOrder?: (ad: ProductAd) => void;
}

export const CreativeLandingBuilderView: React.FC<CreativeLandingBuilderViewProps> = ({
  ads,
  onOpenCreateAd,
  onQuickOrder,
}) => {
  const { isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'creatives' | 'landing_page'>('creatives');

  // Custom Product List (starting with default ads + custom uploaded items)
  const [customProducts, setCustomProducts] = useState<ProductAd[]>(ads);
  const [selectedAdId, setSelectedAdId] = useState<string>(ads[0]?.id || '');

  // Form toggle
  const [isUploadCardOpen, setIsUploadCardOpen] = useState(true);

  // Exact fields according to the User's Hand-Drawn Sketch
  const [uploadedImagesList, setUploadedImagesList] = useState<string[]>([
    getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    getLocalImage('product_wireless_earbuds_1792240155858.jpg'),
    getLocalImage('product_moroccan_argan_oil_1792240155621.jpg'),
  ]);
  const [activeMainImageIndex, setActiveMainImageIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. اسم المنتج
  const [newTitle, setNewTitle] = useState('');
  // 2. مجال او الصنف
  const [newCategory, setNewCategory] = useState<string>('كوسميتيك ومواد التجميل (Cosmétique)');
  // 3. السعر
  const [newPrice, setNewPrice] = useState<number>(299);
  const [newOriginalPrice, setNewOriginalPrice] = useState<number>(499);
  // 4. الفئة المستهدفة مع النوع
  const [newTargetGender, setNewTargetGender] = useState<string>('نساء (Femmes)');
  // 5. العمر
  const [newTargetAge, setNewTargetAge] = useState<string>('25 - 45 سنة');
  // 6. المشكل يظهر في مواد التجميل مع المكملات الغذائية
  const [newProblemSolved, setNewProblemSolved] = useState<string>('تساقط الشعر، بهتان البشرة، آلام المفاصل، والتجاعيد');
  // 7. البيئات التي ممكن ينجح لكل منتج
  const [newEnvironments, setNewEnvironments] = useState<string>('المناسبات والأعراس، روتين المساء المنزلي، العمل اليومي، والصيف');
  // 8. الوصف المنتج
  const [newDescription, setNewDescription] = useState<string>(
    'منتج حصري وفعال صُمم بمكونات طبيعية وأصلية 100% لإعطاء نتائج ملموسة وسريعة من أول أسبوع استعمال، مع ضمان الرضا والتوصيل المجاني لكافة مدن المغرب والدفع بعد المعاينة.'
  );

  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);

  // Handle Real File Upload from Computer / Phone
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const res = event.target.result as string;
          setUploadedImagesList((prev) => [res, ...prev]);
          setActiveMainImageIndex(0);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Creative Studio State
  const [selectedAngle, setSelectedAngle] = useState<'problem_solution' | 'luxury' | 'scarcity' | 'trust_cod' | 'social_proof'>('problem_solution');
  const [creativeMockupFormat, setCreativeMockupFormat] = useState<'feed' | 'story'>('feed');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedOverlayBadge, setSelectedOverlayBadge] = useState<string>('تخفيض -50% اليوم فقط 🔥');

  // Landing Page State
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [isFullscreenLanding, setIsFullscreenLanding] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('الدار البيضاء (24 ساعة)');
  const [customerAddress, setCustomerAddress] = useState('');
  const [submittedOrderInfo, setSubmittedOrderInfo] = useState<{ id: string; total: number } | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Countdown timer for urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 27, seconds: 43 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Current active product
  const currentAd = customProducts.find((a) => a.id === selectedAdId) || customProducts[0] || ads[0];

  // Editable Landing Page Content
  const [lpHeadline, setLpHeadline] = useState(currentAd?.title || '');
  const [lpSubheadline, setLpSubheadline] = useState(currentAd?.description || '');

  // Keep headline synced when selecting another product
  const handleSelectAd = (id: string) => {
    setSelectedAdId(id);
    const target = customProducts.find((a) => a.id === id);
    if (target) {
      setLpHeadline(target.title);
      setLpSubheadline(target.description);
    }
  };

  const [productUploadError, setProductUploadError] = useState<string | null>(null);

  // Add custom uploaded product seamlessly in 1 step!
  const handleSaveCustomProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProductUploadError(null);
    if (!newTitle.trim()) {
      setProductUploadError('يرجى كتابة اسم المنتج لتوليد الزوايا وصفحة الهبوط');
      return;
    }

    const calculatedDiscount = Math.max(
      15,
      Math.round(((Number(newOriginalPrice) - Number(newPrice)) / Number(newOriginalPrice)) * 100)
    );

    const mainImage = uploadedImagesList[activeMainImageIndex] || uploadedImagesList[0] || getLocalImage('product_smartwatch_ultra_1792240155179.jpg');

    const newAd: ProductAd = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      description: newDescription || `منتج ${newTitle} الحصري والفعال لعلاج مشكل ${newProblemSolved} بأعلى جودة وضمان حقيقي.`,
      features: [
        `يحل مشكل: ${newProblemSolved}`,
        `الفئة والعمر المستهدف: ${newTargetGender} (${newTargetAge})`,
        `البيئة المناسبة: ${newEnvironments}`,
        'توصيل سريع مجاني 24/48 ساعة حتى لباب دارك بالمغرب',
        'معاينة وتجربة السلعة قبل دفع أي درهم مع ضمان 7 أيام',
      ],
      price: Number(newPrice),
      originalPrice: Number(newOriginalPrice),
      discountPercent: calculatedDiscount,
      currency: 'DH',
      rating: 4.9,
      reviewsCount: 240,
      images: uploadedImagesList.length > 0 ? uploadedImagesList : [mainImage],
      mediaType: 'image',
      category: newCategory.includes('كوسميتيك') ? 'beauty' : newCategory.includes('إلكترونيات') ? 'electronics' : 'home',
      city: 'الدار البيضاء',
      whatsappNumber: '+212612345678',
      phone: '0612345678',
      freeShipping: true,
      cashOnDelivery: true,
      stockLeft: 12,
      createdAt: 'الآن',
      likesCount: 89,
      commentsCount: 24,
      sharesCount: 45,
      isLiked: false,
      isSaved: false,
      brandName: 'متجر التاجر المعتمد',
      brandHandle: '@seller_pro',
      brandAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      verified: true,
      sponsored: true,
      comments: [],
    };

    setCustomProducts([newAd, ...customProducts]);
    setSelectedAdId(newAd.id);
    setLpHeadline(newAd.title);
    setLpSubheadline(newAd.description);
    setUploadSuccessToast(true);
    setTimeout(() => setUploadSuccessToast(false), 3500);

    // Smooth scroll to creatives section
    const elem = document.getElementById('studio-angles-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // 5 High-converting sales angles tailored to the active product
  const adCopyAngles = {
    problem_solution: {
      name: '1. زاوية حل المشكل والألم اليومي (Pain & Problem Solution)',
      tagline: 'الأعلى تحويلاً ونقرات في السوق المغربي',
      badge: 'الأعلى تحويلاً ⭐',
      hook: `🚨 عييتي من مشكل "${newProblemSolved || 'هاد المشكل اليومي'}" والحلول العادية ما عطاتك حتى نتيجة؟`,
      videoDirection: {
        scene1: 'مشهد 1 (0-3 ثواني): زووم سريع على شخص يعاني من المشكل اليومي مع نص عريض باللون الأحمر والأصفر.',
        scene2: 'مشهد 2 (3-7 ثواني): إظهار السلعة كحل نهائي ومباشر بدون تعقيدات مع استعراض العلبة.',
        scene3: 'مشهد 3 (7-15 ثانية): تجربة الاستعمال الواقعية والنتيجة الإيجابية السريعة.',
        scene4: 'مشهد 4 (15-22 ثانية): إبراز الفئة المستهدفة وكيف أراحهم المنتج.',
        scene5: 'مشهد 5 (22-28 ثانية): النداء للشراء: التوصيل فابور لباب الدار والدفع بعد المعاينة والفحص!',
      },
      body: `الآن فالمغرب 🇲🇦 جبنا ليك الحل النهائي مع ${currentAd?.title}!
صمم خصيصاً باش يحل ليك مشكل "${newProblemSolved || 'المشكل اليومي'}" فثواني وبدون أي عناء، مع جودة ممتازة تدوم طويلاً.

✅ فكرة حصرية ومثالية لـ ${newTargetGender} (${newTargetAge})
✅ مناسب جداً في: ${newEnvironments}
✅ التوصيل فابور بالمجان لجميع المدن 24/48 ساعة
✅ الخلاص حتى تقلب سلعتك وتجربها عاد تخلص الليفرور!`,
      cta: `👉 اضغط على الرابط أسفله واطلب دابا قبل ما تسالي الكمية:`,
      metrics: { ctr: '4.2% - 5.8%', roas: '3.8x - 4.6x', cpa: '22 - 32 DH' },
    },
    scarcity: {
      name: '2. زاوية التخفيض الصادم والندرة (Urgency & Scarcity -50%)',
      tagline: 'يدفع الزبون المتردد للشراء الفوري والطلب السريع',
      badge: 'طلب فوري 🔥',
      hook: `🔥 تخفيض خاص -${currentAd?.discountPercent || 40}% متبقي فقط ${currentAd?.stockLeft || 9} قطع في المخزون بالمغرب!`,
      videoDirection: {
        scene1: 'مشهد 1 (0-3 ثواني): عداد تنازلي وسعر مشطوب كبير مع كتابة "عرض اليوم فقط".',
        scene2: 'مشهد 2 (3-9 ثواني): استعراض سريع وفخم للمنتج مع مؤثرات بصرية وصوت تكتكة الساعة.',
        scene3: 'مشهد 3 (9-17 ثانية): توضيح الفرق الكبير بين السعر الأصلي وسعر اليوم المخفض.',
        scene4: 'مشهد 4 (17-25 ثانية): تنبيه بنفاد الكمية من المستودع ورسالة تحذيرية: اطلب الآن قبل انتهاء اليوم.',
      },
      body: `بمناسبة العرض الخاص لهذا الأسبوع، كنقدمو ليك ${currentAd?.title} بثمن استثنائي ${currentAd?.price} درهم فقط بلاصة ${currentAd?.originalPrice} درهم!

⚠️ سارع قبل نفاد المخزون، العرض صالح لهذا اليوم فقط أو حتى انتهاء الكمية المتبقية.
📦 إرسال فوري وسريع لعنوانك في أقل من 48 ساعة.
🤝 المعاينة والتجربة مضمونة قبل الدفع.`,
      cta: `⚡ اضغط هنا لتأكيد طلبك قبل انتهاء التخفيض:`,
      metrics: { ctr: '3.9% - 5.1%', roas: '3.5x - 4.2x', cpa: '25 - 35 DH' },
    },
    social_proof: {
      name: '3. زاوية الدليل الاجتماعي وشهادات الزبناء (Social Proof & UGC)',
      tagline: 'أسلوب تيك توك وريلز العفوي الأكثر مصداقية',
      badge: 'مصداقية عالية 💬',
      hook: `🤳 "الكل كيهضر عليه فالمغرب.. واش بصح ${currentAd?.title} كايستاهل كل هاد الضجة؟"`,
      videoDirection: {
        scene1: 'مشهد 1 (0-3 ثواني): شخص يمسك الهاتف بأسلوب سيلفي عفوي ويقول الهوك بحماس وفضول.',
        scene2: 'مشهد 2 (3-12 ثانية): تجربة فتح الصندوق (Unboxing) وإبداء الانبهار بالجودة الحقيقية للمنتج.',
        scene3: 'مشهد 3 (12-20 ثانية): إظهار لقطات شاشة سريعة لرسائل واتساب وتقييمات زبناء حقيقيين يشكرون المنتج.',
        scene4: 'مشهد 4 (20-27 ثانية): نصيحة صريحة للمشاهدين: "نصحكم تاخدوه قبل ما يغلاو فيه، والدفع حتى يوصلك".',
      },
      body: `أكثر من 850 زبون فالمغرب جربو ${currentAd?.title} وأجمعو على الجودة ديالو العالية!
هاد المنتج كايعطيك نتيجة ملموسة من أول استعمال وغايسهل عليك يومياتك بشكل كبير.

⭐⭐⭐⭐⭐ تقييم 4.9/5 على موقعنا
💬 "وصلتني السلعة ف 24 ساعة، سلعة نقية بزااف والتعامل فالقمة" - زبونة من الدار البيضاء
🚚 التوصيل مجاني لجميع المدن والدفع بعد المعاينة.`,
      cta: `👇 شوف آراء باقي الزبناء واطلب نسختك الآن:`,
      metrics: { ctr: '4.5% - 6.2%', roas: '4.1x - 5.0x', cpa: '20 - 28 DH' },
    },
    luxury: {
      name: '4. زاوية الفخامة والأناقة والبريستيج (Elegance & Premium Lifestyle)',
      tagline: 'مناسب للمنتجات الفاخرة، الإلكترونيات، والسنيكرز ومواد التجميل الراقية',
      badge: 'جودة VIP 💎',
      hook: `✨ تميز بإطلالة راقية وجودة استثنائية تجلب لك الإعجاب مع ${currentAd?.title}!`,
      videoDirection: {
        scene1: 'مشهد 1 (0-3 ثواني): تصوير سينمائي Slow Motion مع إضاءة خافتة فاخرة وزوايا حادة للمنتج.',
        scene2: 'مشهد 2 (3-10 ثواني): إبراز التفاصيل الدقيقة، المواد الأصلية، واللمسات الاحترافية.',
        scene3: 'مشهد 3 (10-18 ثانية): شخص أنيق يستعمل المنتج بثقة واستمتاع في بيئة راقية (${newEnvironments}).',
        scene4: 'مشهد 4 (18-25 ثانية): التغليف الفاخر والشحن الآمن حتى لباب المنزل.',
      },
      body: `علاش ترضى بالتقليد ملي تقدر تاخد الجودة الأصلية بأفضل ثمن؟
هذا المنتج يجمع بين الأناقة العصرية والمواد الممتازة ليعطيك مظهراً فريداً في كل مناسبة.

💎 تصميم راقي ومواد تصنيع أصلية 100%
💎 متانة وجودة تدوم لسنوات
💎 هدية مثالية لنفسك أو لمن تحب
🚚 التوصيل بالمجان لجميع مدن وقرى المغرب مع الدفع عند الاستلام.`,
      cta: `🛍️ استفد من التخفيض الخاص واطلب الآن:`,
      metrics: { ctr: '3.4% - 4.7%', roas: '3.2x - 4.0x', cpa: '28 - 40 DH' },
    },
    trust_cod: {
      name: '5. زاوية راحة البال والدفع بعد المعاينة (100% Risk-Free Guarantee)',
      tagline: 'يزيل الخوف من النصب والتسوق الإلكتروني نهائياً',
      badge: 'ضمان 100% 🛡️',
      hook: `🛡️ راحة بالك هي الأولى: قلب سلعتك بيدك وتأكد منها مزيان عاد خلص الموزع!`,
      videoDirection: {
        scene1: 'مشهد 1 (0-3 ثواني): الموزع يسلم الكولية، والزبون يفتح العلبة بابتسامة وثقة أمام الكاميرا.',
        scene2: 'مشهد 2 (3-10 ثواني): الزبون يجرب المنتج ويتأكد من مطابقته للمواصفات 100%.',
        scene3: 'مشهد 3 (10-18 ثانية): إبراز شعار "الدفع عند الاستلام" و"ضمان الاستبدال 7 أيام".',
        scene4: 'مشهد 4 (18-25 ثانية): تأكيد سهولة التواصل مع خدمة الزبائن عبر واتساب في أي وقت.',
      },
      body: `معنا، التسوق الإلكتروني بالمغرب أصبح مضموناً بنسبة 100%.
طلبك لـ ${currentAd?.title} غادي يوصلك حتى لباب دارك، مع إمكانية فتح الكولية والتأكد من المواصفات والجودة قدام الموزع قبل ما تدفع حتى درهم.

✅ متجر معتمد وسمعة ممتازة
✅ ضمان الاستبدال والاسترجاع لمدة 7 أيام
✅ فريق دعم وزبائن متوفر 7/7 للإجابة عن تساؤلاتك عبر الواتساب.`,
      cta: `📲 اطلب عبر واتساب أو مباشرة من الموقع بضغطة زر:`,
      metrics: { ctr: '4.0% - 5.4%', roas: '3.6x - 4.4x', cpa: '24 - 34 DH' },
    },
  };

  const selectedCopy = adCopyAngles[selectedAngle];
  const fullAdText = `${selectedCopy.hook}\n\n${selectedCopy.body}\n\n${selectedCopy.cta}\n🔗 https://so9fiadak.ma/p/${currentAd?.id || 'prod'}\n\n#المغرب #تجارة_إلكترونية #توصيل_مجاني #الدفع_عند_الاستلام #عروض_المغرب`;

  const fullVideoScriptText = `🎬 سيناريو الإعلان المرئي (Creative Video Storyboard) لـ "${currentAd?.title}"
زاوية الإعلان: ${selectedCopy.name}
الجمهور المستهدف: ${newTargetGender} (${newTargetAge})
المشكل المحلول: ${newProblemSolved}
البيئة المناسبة: ${newEnvironments}

${selectedCopy.videoDirection.scene1}
${selectedCopy.videoDirection.scene2}
${selectedCopy.videoDirection.scene3}
${selectedCopy.videoDirection.scene4}
${(selectedCopy.videoDirection as any).scene5 || ''}

📌 نصوص الشاشة الترويجية (On-Screen Hooks):
1. ${selectedCopy.hook}
2. تخفيض -${currentAd?.discountPercent || 40}% لفترة محدودة!
3. التوصيل بالمجان لكافة المدن المغربية 🚚
4. الدفع نقداً بعد المعاينة والتأكد من الجودة 🤝`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullAdText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2400);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullVideoScriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2400);
  };

  const [landingOrderError, setLandingOrderError] = useState<string | null>(null);

  // Handle Landing Page Fast Order Submit
  const handleLandingOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLandingOrderError(null);
    if (!customerPhone.trim()) {
      setLandingOrderError('يرجى إدخال رقم الهاتف للتواصل معك لتأكيد الإرسال');
      return;
    }

    const total =
      orderQuantity === 1
        ? currentAd.price
        : orderQuantity === 2
        ? Math.round(currentAd.price * 2 * 0.85)
        : Math.round(currentAd.price * 3 * 0.75);

    const orderId = `SO9-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedOrderInfo({ id: orderId, total });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Toast Notification */}
      {uploadSuccessToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-xs animate-in zoom-in-95">
          <CheckCircle2 className="w-5 h-5" />
          <span>تمت إضافة منتجك وتوليد زوايا البيع وصفحة الهبوط المخصصة له بنجاح!</span>
        </div>
      )}

      {/* Main Suite Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-black border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>استوديو الكرياتيف وزوايا البيع وصفحات الهبوط للتجار</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              صانع الكرياتيف واللاندينغ بيج مع إضافة وتصوير منتجك الخاص
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">
              ارفع صور منتجك من الحاسوب أو الهاتف، حدد الفئة والمشكل، وسيقوم النظام بتوليد زوايا البيع وسيناريوهات الفيديو وصفحة الهبوط التفاعلية المجهزة للدفع عند الاستلام.
            </p>
          </div>

          {/* Main Top View Switcher Tabs */}
          <div className="flex items-center gap-2 shrink-0 bg-black/20 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('creatives')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'creatives'
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1. زوايا البيع والكرياتيف</span>
            </button>
            <button
              onClick={() => setActiveTab('landing_page')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'landing_page'
                  ? 'bg-white text-indigo-900 shadow-lg'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layout className="w-4 h-4 text-emerald-500" />
              <span>2. محرر صفحة الهبوط (Landing Page)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          THE EXACT FORM STRUCTURE FROM THE USER'S HAND-DRAWN SKETCH
         ======================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                إضافة وبيانات المنتج الخاص (Upload & Product Setup)
              </h2>
              <p className="text-xs text-slate-500">
                ارفع صور السلعة من البيسي أو الهاتف وأدخل تفاصيل الجمهور والمشكل لي كايحل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <FolderOpen className="w-4 h-4" />
              <span>اختر صور من جهازك (PC / Téléphone)</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveCustomProduct} className="space-y-6">
          {/* SECTION 1: TOP IMAGE BOX + THUMBNAILS GALLERY (كالمخطط في الصورة تماماً) */}
          <div className="space-y-3">
            <div className="relative w-full max-w-lg mx-auto aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-300 shadow-md flex items-center justify-center group">
              {uploadedImagesList.length > 0 && uploadedImagesList[activeMainImageIndex] ? (
                <>
                  <img
                    src={uploadedImagesList[activeMainImageIndex]}
                    alt="صورة المنتج"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                    صورة رئيسية (Image Principale)
                  </div>
                </>
              ) : (
                <div className="text-center p-6 text-slate-400 space-y-2">
                  <ImageIcon className="w-10 h-10 mx-auto text-slate-500" />
                  <span className="font-bold text-sm block">صورة المنتج</span>
                  <span className="text-xs block">اضغط لاختيار صورة من جهازك</span>
                </div>
              )}

              {/* Upload Overlay Action */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-black text-xs cursor-pointer backdrop-blur-[2px]"
              >
                <UploadCloud className="w-5 h-5" />
                <span>تغيير أو رفع صورة جديدة من جهازك</span>
              </button>
            </div>

            {/* Thumbnails Row (الكالوندريه / شريط المصغرات كالمخطط المرسوم) */}
            <div className="space-y-1.5 max-w-xl mx-auto">
              <span className="text-[11px] font-bold text-slate-500 block text-center">
                صور السلعة (اضغط على أي صورة لتحديدها كصورة رئيسية):
              </span>
              <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-2 px-1">
                {uploadedImagesList.map((img, idx) => {
                  const isSelected = activeMainImageIndex === idx;
                  return (
                    <div key={idx} className="relative group shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveMainImageIndex(idx)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-md scale-105'
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      </button>
                      {uploadedImagesList.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const updated = uploadedImagesList.filter((_, i) => i !== idx);
                            setUploadedImagesList(updated);
                            if (activeMainImageIndex >= updated.length) {
                              setActiveMainImageIndex(0);
                            }
                          }}
                          className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white p-0.5 rounded-full shadow hover:bg-rose-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="حذف الصورة"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}

                {/* Add More Photos Button in the strip */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-14 h-14 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-blue-600 transition-all cursor-pointer shrink-0"
                  title="إضافة صورة أخرى من جهازك"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-[8px] font-bold">أضف صورة</span>
                </button>
              </div>
            </div>
          </div>

          {/* FORM GRID EXACTLY AS DRAWN ON THE SKETCH */}
          <div className="space-y-4 pt-2">
            {productUploadError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{productUploadError}</span>
              </div>
            )}

            {/* ROW 1: [اسم المنتج] | [مجال او الصنف] */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-800 block mb-1.5">
                  اسم المنتج *:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: سيروم الزيت المعالج لتساقط الشعر، كريم التفتيح، مكمل غذائي..."
                  className="w-full py-2.5 px-3.5 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-xl border border-slate-300 focus:border-blue-600 font-bold text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-800 block mb-1.5">
                  مجال او الصنف *:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-xl border border-slate-300 focus:border-blue-600 font-bold text-slate-900 transition-all"
                >
                  <option value="كوسميتيك ومواد التجميل (Cosmétique)">كوسميتيك ومواد التجميل (Cosmétique & Skincare)</option>
                  <option value="مكملات غذائية وصحة (Compléments Alimentaires)">مكملات غذائية وصحة (Compléments Alimentaires & Santé)</option>
                  <option value="أزياء وملابس وأحذية (Fashion & Shoes)">أزياء وملابس وأحذية (Fashion & Shoes)</option>
                  <option value="إلكترونيات وأجهزة ذكية (Electronics)">إلكترونيات وأجهزة ذكية (Electronics & Gadgets)</option>
                  <option value="المنزل والمطبخ (Home & Kitchen)">المنزل والمطبخ والديكور (Home & Kitchen)</option>
                  <option value="إكسسوارات ولوازم السيارات (Auto & Moto)">إكسسوارات ولوازم السيارات (Auto & Moto)</option>
                </select>
              </div>
            </div>

            {/* ROW 2: [السعر] | [الفئة المستهدفة مع النوع] */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-800 block mb-1.5">
                  السعر المقترح للبيع (DH) *:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min={10}
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full py-2.5 px-3.5 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-xl border border-slate-300 focus:border-blue-600 font-black text-emerald-700"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
                      DH
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      min={10}
                      value={newOriginalPrice}
                      onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                      placeholder="السعر المشطوب"
                      className="w-full py-2.5 px-3.5 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-xl border border-slate-300 focus:border-blue-600 text-xs text-slate-500 font-medium"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                      مشطوب
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-800 block mb-1.5">
                  الفئة المستهدفة مع النوع *:
                </label>
                <select
                  value={newTargetGender}
                  onChange={(e) => setNewTargetGender(e.target.value)}
                  className="w-full py-2.5 px-3.5 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-xl border border-slate-300 focus:border-blue-600 font-bold text-slate-900 transition-all"
                >
                  <option value="نساء (Femmes)">نساء (Femmes)</option>
                  <option value="رجال (Hommes)">رجال (Hommes)</option>
                  <option value="الجميع (نساء ورجال)">الجميع (نساء ورجال - Mixte)</option>
                  <option value="أمهات وربات بيوت">أمهات وربات بيوت (Mamans & Foyers)</option>
                  <option value="شباب ورياضيين">شباب ورياضيين (Sportifs & Jeunes)</option>
                  <option value="موظفون ومهنيون">موظفون وأطر مهنية (Cadres & Professionnels)</option>
                </select>
              </div>
            </div>

            {/* ROW 3: [العمر] */}
            <div>
              <label className="text-xs font-black text-slate-800 block mb-1.5">
                العمر المستهدف (Tranche d'âge) *:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  '18 - 25 سنة',
                  '25 - 35 سنة',
                  '35 - 50 سنة',
                  'فوق 50 سنة',
                  'جميع الفئات العمرية',
                ].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setNewTargetAge(age)}
                    className={`py-2 px-2.5 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                      newTargetAge === age
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 4: [المشكل يظهر في مواد التجميل مع المكملات الغذائية...] */}
            <div>
              <label className="text-xs font-black text-slate-800 block mb-1.5">
                المشكل الذي يظهر في مواد التجميل مع المكملات الغذائية والمنتج لي كايحل *:
              </label>
              <input
                type="text"
                required
                value={newProblemSolved}
                onChange={(e) => setNewProblemSolved(e.target.value)}
                placeholder="مثال: تساقط الشعر، حب الشباب والبقع الداكنة، آلام المفاصل والظهر، بطء الحرق، بهتان البشرة والتجاعيد..."
                className="w-full py-2.5 px-3.5 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-xl border border-slate-300 focus:border-blue-600 font-bold text-slate-900 transition-all"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                (نقطة الألم Pain-point الرئيسية التي سيتم بناء زوايا البيع والإعلانات عليها لشد انتباه المشتري)
              </span>
            </div>

            {/* ROW 5: [البيئات التي ممكن ينجح لكل منتج] */}
            <div>
              <label className="text-xs font-black text-slate-800 block mb-1.5">
                البيئات التي ممكن ينجح لكل منتج (Contextes & Environnements) *:
              </label>
              <input
                type="text"
                required
                value={newEnvironments}
                onChange={(e) => setNewEnvironments(e.target.value)}
                placeholder="مثال: المناسبات والأعراس، روتين المساء والعناية المنزلية، العمل المكتبي، الصيف والشاطئ، الصالات الرياضية..."
                className="w-full py-2.5 px-3.5 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-xl border border-slate-300 focus:border-blue-600 font-bold text-slate-900 transition-all"
              />
            </div>

            {/* ROW 6: [الوصف المنتج] (Large Box) */}
            <div>
              <label className="text-xs font-black text-slate-800 block mb-1.5">
                الوصف المنتج (Description & Bénéfices Clés) *:
              </label>
              <textarea
                rows={4}
                required
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="اكتب وصفاً جذاباً للمنتج، مميزاته، طريقة استعماله، ولماذا يجب على الزبون شراؤه الآن..."
                className="w-full p-3.5 bg-slate-50 hover:bg-white focus:bg-white text-xs rounded-2xl border border-slate-300 focus:border-blue-600 font-medium text-slate-800 transition-all leading-relaxed"
              />
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                <span>توليد زوايا البيع، سيناريوهات الإعلانات، واللاندينغ بيج فوراً</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ========================================================
          TAB 1: MARKETING ANGLES & CREATIVE STUDIO
         ======================================================== */}
      {activeTab === 'creatives' && (
        <div id="studio-angles-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Controls & Angle selection (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Marketing Angles Selector */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    1. زوايا البيع الـ 5 المقترحة لـ "{currentAd.title}"
                  </h3>
                  <p className="text-xs text-slate-500">
                    مبنية على مشكل: {newProblemSolved || currentAd.description.slice(0, 45)}
                  </p>
                </div>
                <Zap className="w-5 h-5 text-amber-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(adCopyAngles) as Array<keyof typeof adCopyAngles>).map((key) => {
                  const angle = adCopyAngles[key];
                  const isSelected = selectedAngle === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedAngle(key)}
                      className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-600/20 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-black ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                          {angle.name}
                        </span>
                        {isSelected ? (
                          <BadgeCheck className="w-4 h-4 text-blue-600" />
                        ) : (
                          <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold text-slate-600">
                            {angle.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight mb-2">
                        {angle.tagline}
                      </p>

                      {/* Expected KPIs badge */}
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-600 font-bold">
                        <span className="text-emerald-700">CTR: {angle.metrics.ctr}</span>
                        <span>·</span>
                        <span className="text-indigo-700">ROAS: {angle.metrics.roas}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Visual Badge Overlay Selector */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    2. شارة العرض الترويجي على صورة الإعلان (Overlay Badge)
                  </h3>
                  <p className="text-xs text-slate-500">
                    شارات سريعة تحفز الزبون على النقر الفوري ومضاعفة نسبة النقر (CTR Boost)
                  </p>
                </div>
                <Flame className="w-4 h-4 text-rose-500" />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'تخفيض -50% اليوم فقط 🔥',
                  'الدفع بعد المعاينة 🇲🇦',
                  'التوصيل بالمجان بالمغرب 🚚',
                  'الأكثر طلباً بالمغرب ⭐',
                  'الكمية محدودة جداً ⏳',
                  'ضمان الجودة الأصلية 100% 🛡️',
                  'عرض خاص: 2 حبات بثمن 1 🎁',
                ].map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setSelectedOverlayBadge(badge)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      selectedOverlayBadge === badge
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Video Storyboard & Script Direction */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-rose-600" />
                    <span>3. سيناريو تصوير الفيديو الإعلاني (Video Storyboard)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    طريقة تصوير الإعلان خطوة بخطوة للحصول على أعلى عائد ومبيعات على تيك توك وريلز
                  </p>
                </div>

                <button
                  onClick={handleCopyScript}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    copiedScript
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-black text-white'
                  }`}
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تم نسخ السيناريو!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ سيناريو الفيديو</span>
                    </>
                  )}
                </button>
              </div>

              {/* Storyboard Step Cards */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-1">
                  <span className="font-black text-rose-800 block">🎬 الهوك الخاطف (أول 3 ثواني):</span>
                  <p className="font-bold text-slate-900 text-sm">"{selectedCopy.hook}"</p>
                  <p className="text-[11px] text-slate-600">{selectedCopy.videoDirection.scene1}</p>
                </div>

                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-1">
                  <span className="font-black text-blue-800 block">💡 إظهار المنتج كحل للمشكل:</span>
                  <p className="text-[11px] text-slate-600">{selectedCopy.videoDirection.scene2}</p>
                </div>

                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
                  <span className="font-black text-emerald-800 block">⭐ التجربة العملية والنتيجة:</span>
                  <p className="text-[11px] text-slate-600">{selectedCopy.videoDirection.scene3}</p>
                </div>

                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
                  <span className="font-black text-amber-800 block">🚚 النداء للشراء والتوصيل والدفع:</span>
                  <p className="text-[11px] text-slate-600">{selectedCopy.videoDirection.scene4}</p>
                </div>
              </div>
            </div>

            {/* 4. Ready-to-use Ad Copy Caption */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    4. كابشن الإعلان الجاهز للنشر (Ad Caption Copy)
                  </h3>
                  <p className="text-xs text-slate-500">جاهز للنسخ في إعلانات فيسبوك، تيك توك، أو رسائل واتساب</p>
                </div>
                <button
                  onClick={handleCopyText}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    copiedText
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تم النسخ بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ النص كاملاً</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-line select-all">
                {fullAdText}
              </div>
            </div>
          </div>

          {/* Live Ad Mockup Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>معاينة الكرياتيف الحي (Live Mockup)</span>
                  </span>

                  {/* Format switcher: Feed vs Story 9:16 */}
                  <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs">
                    <button
                      onClick={() => setCreativeMockupFormat('feed')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                        creativeMockupFormat === 'feed'
                          ? 'bg-white text-blue-700 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      مربع (1:1 Feed)
                    </button>
                    <button
                      onClick={() => setCreativeMockupFormat('story')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                        creativeMockupFormat === 'story'
                          ? 'bg-white text-blue-700 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      طولي (9:16 Reels)
                    </button>
                  </div>
                </div>

                {/* Feed Mockup Format */}
                {creativeMockupFormat === 'feed' && (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    {/* Header */}
                    <div className="p-3 flex items-center gap-2.5">
                      <img
                        src={currentAd.brandAvatar}
                        alt={currentAd.brandName}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900">{currentAd.brandName}</span>
                          <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
                        </div>
                        <span className="text-[10px] text-slate-400 block leading-tight">مموّل · Sponsored 🌐</span>
                      </div>
                    </div>

                    {/* Caption Hook snippet */}
                    <div className="px-3 pb-2 text-xs text-slate-800 font-medium line-clamp-3">
                      {selectedCopy.hook} {selectedCopy.body.slice(0, 100)}...
                    </div>

                    {/* Image with Visual Badge Overlay */}
                    <div className="relative aspect-square bg-slate-900 overflow-hidden">
                      <img
                        src={currentAd.images[0] || uploadedImagesList[0]}
                        alt={currentAd.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Badge Overlay */}
                      <div className="absolute top-3 right-3 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-lg shadow-md animate-pulse">
                        {selectedOverlayBadge}
                      </div>
                      {/* Price Tag Overlay */}
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-lg border border-white/20">
                        {currentAd.price} {currentAd.currency}{' '}
                        <span className="line-through text-slate-400 text-[10px] mr-1">
                          {currentAd.originalPrice} DH
                        </span>
                      </div>
                    </div>

                    {/* Ad CTA Footer */}
                    <div className="p-3 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">SO9FIADAK.MA</span>
                        <span className="text-xs font-bold text-slate-900 truncate block max-w-[170px]">
                          {currentAd.title}
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('landing_page')}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <span>فتح اللاندينغ بيج</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 9:16 Vertical Story Mockup Format */}
                {creativeMockupFormat === 'story' && (
                  <div className="relative mx-auto max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-xl border-2 border-slate-800 flex flex-col justify-between p-3.5 text-white">
                    <img
                      src={currentAd.images[0] || uploadedImagesList[0]}
                      alt={currentAd.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

                    {/* Story Header */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={currentAd.brandAvatar}
                          alt="avatar"
                          className="w-7 h-7 rounded-full border border-white"
                        />
                        <span className="text-xs font-bold text-white drop-shadow">{currentAd.brandName}</span>
                      </div>
                      <span className="bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                        مموّل
                      </span>
                    </div>

                    {/* Story Center Text */}
                    <div className="relative z-10 space-y-2 text-center my-auto">
                      <span className="inline-block bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                        {selectedOverlayBadge}
                      </span>
                      <h4 className="text-sm font-black drop-shadow-md text-white leading-tight">
                        {selectedCopy.hook}
                      </h4>
                      <div className="text-xl font-black text-emerald-400 drop-shadow">
                        {currentAd.price} DH <span className="text-xs line-through text-slate-300">({currentAd.originalPrice} DH)</span>
                      </div>
                    </div>

                    {/* Story Footer CTA Button */}
                    <div className="relative z-10 space-y-2 text-center">
                      <button
                        onClick={() => setActiveTab('landing_page')}
                        className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 cursor-pointer animate-bounce"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>اسحب للأعلى أو اطلب الآن</span>
                      </button>
                      <span className="text-[10px] text-slate-300 block">الدفع نقداً بعد معاينة السلعة 🚚</span>
                    </div>
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('landing_page')}
                    className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span>تطبيق على صفحة الهبوط مباشرة</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: FULLY WORKING LANDING PAGE SUITE
         ======================================================== */}
      {activeTab === 'landing_page' && (
        <div className="space-y-6">
          {/* Landing Page Action & Customization Bar */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-800">وضع المعاينة:</span>
              <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-indigo-600 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>هاتف (Mobile 95%)</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-indigo-600 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>حاسوب (Desktop)</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreenLanding(true)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>معاينة بملء الشاشة</span>
              </button>

              <button
                onClick={() => {
                  const htmlCode = `<!-- Landing Page for ${currentAd.title} generated by SO9FIADAK -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lpHeadline} - اطلب الآن مع الدفع عند الاستلام</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans p-4">
  <div class="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 border border-slate-200">
    <div class="bg-gradient-to-r from-rose-600 to-amber-600 text-white text-center py-2.5 rounded-2xl font-black text-xs shadow-md">
      🔥 تخفيض خاص -${currentAd.discountPercent}% اليوم فقط + شحن مجاني
    </div>
    <div class="text-center space-y-1">
      <div class="text-amber-500 text-xs font-bold">⭐⭐⭐⭐⭐ (4.9/5 بناءً على 480+ تقييم بالمغرب)</div>
      <h1 class="text-xl font-black leading-tight">${lpHeadline}</h1>
      <p class="text-xs text-slate-600">${lpSubheadline}</p>
    </div>
    <div class="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-md">
      <img src="${currentAd.images[0] || uploadedImagesList[0]}" class="w-full h-full object-cover">
      <div class="absolute top-3 right-3 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">وفر -${currentAd.discountPercent}% اليوم</div>
    </div>
    <div class="bg-emerald-50 border-2 border-emerald-500/30 rounded-2xl p-4 text-center">
      <div class="text-3xl font-black text-emerald-700">${currentAd.price} درهم مغربي</div>
      <div class="text-xs text-slate-400 line-through">${currentAd.originalPrice} DH</div>
      <div class="text-xs font-bold text-emerald-800 mt-1">✓ التوصيل مجاني لجميع المدن والدفع عند الاستلام</div>
    </div>
    <form class="space-y-3 bg-slate-900 text-white p-5 rounded-2xl shadow-xl">
      <h3 class="text-sm font-black text-amber-400 text-center">للطلب المباشر: املأ الاستمارة وسيتصل بك الموزع</h3>
      <input type="text" placeholder="الاسم الكامل" class="w-full p-3 bg-white text-slate-900 rounded-xl text-xs" required>
      <input type="tel" placeholder="رقم الهاتف (الواتساب)" class="w-full p-3 bg-white text-slate-900 rounded-xl text-xs" required>
      <select class="w-full p-3 bg-white text-slate-900 rounded-xl text-xs font-bold">
        <option>الدار البيضاء (24 ساعة)</option>
        <option>الرباط وسلا (24 ساعة)</option>
        <option>مراكش (48 ساعة)</option>
        <option>طنجة وتطوان (24 ساعة)</option>
        <option>فاس ومكناس (48 ساعة)</option>
        <option>أكادير (48 ساعة)</option>
      </select>
      <button type="submit" class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-base shadow-lg">اضغط هنا لتأكيد طلبك الآن</button>
    </form>
    <div class="text-center text-[10px] text-slate-400">© ${new Date().getFullYear()} SO9FIADAK COD Morocco</div>
  </div>
</body>
</html>`;
                  navigator.clipboard.writeText(htmlCode);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2400);
                }}
                className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-indigo-200"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code2 className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'تم نسخ كود HTML!' : 'تصدير كود HTML الجاهز'}</span>
              </button>
            </div>
          </div>

          {/* Quick Headline & Subtitle Editor Ribbon */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 text-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-black text-slate-700 shrink-0">عنوان صفحة الهبوط الرئيسي:</span>
              <input
                type="text"
                value={lpHeadline}
                onChange={(e) => setLpHeadline(e.target.value)}
                className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-bold text-slate-900"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-black text-slate-700 shrink-0">العنوان الفرعي المقنع:</span>
              <input
                type="text"
                value={lpSubheadline}
                onChange={(e) => setLpSubheadline(e.target.value)}
                className="flex-1 py-2 px-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Live Interactive Landing Page View Container */}
          <div className="flex justify-center">
            <div
              className={`w-full transition-all duration-300 relative ${
                previewDevice === 'mobile'
                  ? 'max-w-md bg-white rounded-3xl border-4 border-slate-900 shadow-2xl overflow-hidden'
                  : 'max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden'
              }`}
            >
              {/* Mobile Fake Status Bar */}
              {previewDevice === 'mobile' && (
                <div className="bg-slate-900 text-white text-[10px] px-4 py-1.5 flex items-center justify-between">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              {/* Landing Page Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* 1. Urgency Countdown Top Bar */}
                <div className="bg-gradient-to-r from-rose-600 to-amber-600 text-white text-center py-2 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-sm">
                  <Flame className="w-4 h-4 animate-bounce text-amber-300" />
                  <span>
                    عرض محدود ينتهي خلال:{' '}
                    <span className="font-mono bg-black/30 px-2 py-0.5 rounded-md">
                      {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>{' '}
                    - خصم -{currentAd.discountPercent || 40}% وشحن مجاني!
                  </span>
                </div>

                {/* 2. Product Title & Social Proof */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-black text-slate-700 mr-1.5">
                      (4.9/5 بناءً على 480+ تقييم بالمغرب)
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {lpHeadline}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {lpSubheadline}
                  </p>
                </div>

                {/* 3. Hero Visual Asset (Image) */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-md">
                  <img
                    src={currentAd.images[0] || uploadedImagesList[0]}
                    alt={currentAd.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    وفر -{currentAd.discountPercent || 40}% اليوم
                  </div>
                </div>

                {/* 4. Pricing & Bundle Options */}
                <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-2xl p-4 text-center space-y-3">
                  <span className="text-xs font-bold text-slate-500 block">اختر العرض الأنسب لك:</span>
                  <div className="grid grid-cols-2 gap-2 text-right">
                    <button
                      type="button"
                      onClick={() => setOrderQuantity(1)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        orderQuantity === 1
                          ? 'bg-emerald-600 text-white font-black border-emerald-600 shadow-md'
                          : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <span className="text-xs block">1 حبة (شحن فابور)</span>
                      <span className="text-sm font-black">{currentAd.price} DH</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderQuantity(2)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                        orderQuantity === 2
                          ? 'bg-emerald-600 text-white font-black border-emerald-600 shadow-md'
                          : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <span className="absolute -top-2 right-2 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                        الأكثر طلباً -15%
                      </span>
                      <span className="text-xs block">2 حبات (عرض التوفير)</span>
                      <span className="text-sm font-black">
                        {Math.round(currentAd.price * 2 * 0.85)} DH
                      </span>
                    </button>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 block">
                    ✓ التوصيل مجاني 100% لجميع المدن والدفع نقداً عند استلام ومعاينة السلعة
                  </span>
                </div>

                {/* 5. Key Highlights / Bullets */}
                <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-black text-slate-900 block mb-1">
                    لماذا يفضل الزبناء هذا المنتج بالمغرب؟
                  </span>
                  {(currentAd.features || [
                    `يحل مشكل: ${newProblemSolved}`,
                    `الفئة والعمر المستهدف: ${newTargetGender} (${newTargetAge})`,
                    `البيئة المناسبة: ${newEnvironments}`,
                    'توصيل سريع مجاني لباب المنزل في 24-48 ساعة',
                    'إمكانية فحص السلعة ومعاينتها قبل الدفع',
                    'ضمان الرضا والاسترجاع لمدة 7 أيام',
                  ]).map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        ✓
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* 6. Customer Social Proof / Moroccan Testimonials */}
                <div className="space-y-3 bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-950">آراء زبنائنا بالمغرب 🇲🇦</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      شراء مؤكد
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded-xl border border-indigo-100/80 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">أمين من الدار البيضاء</span>
                        <div className="flex text-amber-400 text-[10px]">⭐⭐⭐⭐⭐</div>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        "صراحة السلعة وصلتني فـ 24 ساعة، جودة ممتازة والدفع كان حتى قلبت السلعة قدام الليفرور. شكراً بزاف!"
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-indigo-100/80 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">فاطمة الزهراء من الرباط</span>
                        <div className="flex text-amber-400 text-[10px]">⭐⭐⭐⭐⭐</div>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        "المنتج كايخدم مزيان وبحال الفيديو تماماً. خدمة الزبناء فالواتساب كانو لطيفين وكيجاوبو بسرعة."
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7. Fully Functional Moroccan COD Fast Order Form */}
                <div id="cod-order-form" className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="text-center space-y-1">
                    <h3 className="text-base font-black text-amber-400">
                      للطلب المباشر: املأ الاستمارة الآن والدفع عند التسليم
                    </h3>
                    <p className="text-[11px] text-slate-300">
                      سيتصل بك فريقنا لتأكيد العنوان وتحديد موعد الإرسال الفوري
                    </p>
                  </div>

                  <form onSubmit={handleLandingOrderSubmit} className="space-y-3">
                    {landingOrderError && (
                      <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-bold rounded-xl flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{landingOrderError}</span>
                      </div>
                    )}
                    <div className="space-y-2 text-slate-900">
                      <div>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="الاسم الكامل *"
                          className="w-full py-2.5 px-3 bg-white text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400 font-bold"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="رقم الهاتف (الواتساب) *"
                          className="w-full py-2.5 px-3 bg-white text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400 text-left font-mono"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <select
                          value={customerCity}
                          onChange={(e) => setCustomerCity(e.target.value)}
                          className="w-full py-2.5 px-3 bg-white text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400 font-bold"
                        >
                          {[
                            'الدار البيضاء (24 ساعة)',
                            'الرباط وسلا (24 ساعة)',
                            'مراكش (48 ساعة)',
                            'طنجة وتطوان (24 ساعة)',
                            'فاس ومكناس (48 ساعة)',
                            'أكادير (48 ساعة)',
                            'القنيطرة (24 ساعة)',
                            'وجدة والناظور (48 ساعة)',
                            'العيون والداخلة (72 ساعة)',
                            'باقي المدن والأقاليم المغربية (48 ساعة)',
                          ].map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="عنوان التوصيل والحي (اختياري)"
                          className="w-full py-2.5 px-3 bg-white text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>اضغط هنا لتأكيد طلبك الآن (الدفع عند الاستلام)</span>
                    </button>
                  </form>

                  {/* WhatsApp Quick Order Option */}
                  <div className="pt-2 border-t border-white/10 text-center">
                    <a
                      href={`https://wa.me/212612345678?text=${encodeURIComponent(
                        `سلام، بغيت نطلب منتج "${currentAd.title}" الكمية (${orderQuantity}) بثمن العرض. عفاك معلومات الإرسال.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>أو اطلب مباشرة بالتحدث معنا عبر واتساب</span>
                    </a>
                  </div>

                  {/* Submission Confirmation Banner */}
                  {submittedOrderInfo && (
                    <div className="p-4 bg-emerald-900/90 border border-emerald-400 rounded-xl text-emerald-200 text-xs text-center space-y-1.5 animate-in zoom-in-95">
                      <div className="text-sm font-black text-white">🎉 شكراً لك! تم تسجيل طلبك بنجاح</div>
                      <div>
                        رقم الطلبية:{' '}
                        <span className="font-mono font-bold text-amber-300">{submittedOrderInfo.id}</span>
                      </div>
                      <div>
                        المبلغ الإجمالي عند الاستلام:{' '}
                        <span className="font-bold text-white">{submittedOrderInfo.total} DH</span>
                      </div>
                      <div className="text-[10px] text-emerald-300 pt-1">
                        سيتصل بك مسؤول التوصيل خلال قليل لتأكيد الإرسال.
                      </div>
                    </div>
                  )}
                </div>

                {/* 8. Guarantees Ribbon */}
                <div className="grid grid-cols-3 gap-2 text-center text-slate-700 py-2 border-t border-slate-100">
                  <div className="p-2 space-y-1">
                    <Truck className="w-5 h-5 mx-auto text-blue-600" />
                    <span className="text-[10px] font-black block">توصيل 24/48 ساعة</span>
                  </div>
                  <div className="p-2 space-y-1">
                    <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600" />
                    <span className="text-[10px] font-black block">الدفع بعد المعاينة</span>
                  </div>
                  <div className="p-2 space-y-1">
                    <Clock className="w-5 h-5 mx-auto text-amber-600" />
                    <span className="text-[10px] font-black block">ضمان 7 أيام</span>
                  </div>
                </div>

                {/* 9. FAQ Accordion for COD Buyers */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-black text-slate-900 block mb-2">
                    الأسئلة الشائعة من الزبناء (FAQ):
                  </span>
                  {[
                    {
                      q: 'واش نقدر نفتح الكولية ونقلب السلعة قبل ما نخلص؟',
                      a: 'نعم بكل تأكيد! الموزع ينتظر حتى تفتح الطرد وتتأكد من مطابقته للمواصفات والجودة 100% عاد تخلص نقداً.',
                    },
                    {
                      q: 'شحال كياخد التوصيل باش يوصلني الطلب؟',
                      a: 'التوصيل كاياخد من 24 إلى 48 ساعة فالمدن الكبرى (كازا، الرباط، طنجة، مراكش...) وأقصى حد 72 ساعة فباقي القرى والمدن الصغرى.',
                    },
                    {
                      q: 'شنو ندير إلا ما عجباتنيش السلعة أو لقيت فيها ديفو؟',
                      a: 'عندك ضمان استبدال أو استرجاع كامل المبلغ لمدة 7 أيام. يكفي تتواصل مع فريق خدمة الزبناء عبر الواتساب وسيتكفلون بالباقي.',
                    },
                  ].map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full p-3 bg-slate-50 hover:bg-slate-100 text-right text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {openFaqIndex === idx ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                      {openFaqIndex === idx && (
                        <div className="p-3 bg-white text-[11px] text-slate-600 border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Sticky CTA Button at the bottom for conversion */}
              {previewDevice === 'mobile' && (
                <div className="sticky bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg flex items-center justify-between gap-3 z-30">
                  <div>
                    <span className="text-[10px] text-slate-500 block">ثمن العرض الترويجي:</span>
                    <span className="text-sm font-black text-emerald-700">{currentAd.price} DH</span>
                  </div>
                  <button
                    onClick={() => {
                      const form = document.getElementById('cod-order-form');
                      if (form) form.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>اطلب الآن (الدفع عند الاستلام)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          FULLSCREEN MODAL PREVIEW FOR LANDING PAGE
         ======================================================== */}
      {isFullscreenLanding && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto">
          <div className="flex items-center justify-between text-white pb-4 max-w-2xl mx-auto w-full">
            <span className="text-sm font-black">معاينة صفحة الهبوط بملء الشاشة</span>
            <button
              onClick={() => setIsFullscreenLanding(false)}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-w-xl mx-auto w-full bg-white rounded-3xl p-6 shadow-2xl space-y-6 text-slate-900">
            <div className="bg-rose-600 text-white text-center py-2.5 rounded-xl font-black text-xs">
              🔥 عرض محدود: تخفيض -{currentAd.discountPercent}% اليوم فقط
            </div>
            <h1 className="text-2xl font-black text-center">{lpHeadline}</h1>
            <img src={currentAd.images[0] || uploadedImagesList[0]} alt={currentAd.title} className="rounded-2xl w-full object-cover shadow-md" />
            <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-2xl p-4 text-center">
              <span className="text-3xl font-black text-emerald-700">{currentAd.price} DH</span>
              <span className="text-xs font-bold text-emerald-800 block mt-1">توصيل فابور والدفع عند الاستلام</span>
            </div>
            <button
              onClick={() => setIsFullscreenLanding(false)}
              className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              إغلاق المعاينة والعودة للاستوديو
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
