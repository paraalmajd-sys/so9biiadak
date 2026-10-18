import React, { useState } from 'react';
import { ProductAd } from '../types';
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
  PhoneCall,
  Send,
  Layers,
  Palette,
  Layout,
  ExternalLink,
  Zap,
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
  const { t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'creatives' | 'landing_page'>('creatives');
  const [selectedAdId, setSelectedAdId] = useState<string>(ads[0]?.id || '');
  const [selectedAngle, setSelectedAngle] = useState<'problem_solution' | 'luxury' | 'scarcity' | 'trust_cod'>('problem_solution');
  const [copiedText, setCopiedText] = useState(false);
  const [selectedOverlayBadge, setSelectedOverlayBadge] = useState<string>('تخفيض -50% اليوم فقط');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Form state for landing page simulator
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('الدار البيضاء');

  const currentAd = ads.find((a) => a.id === selectedAdId) || ads[0];

  // Ad Copy Variations based on chosen Marketing Angle
  const adCopyAngles = {
    problem_solution: {
      name: 'حل مشكل يومي (Problem / Solution)',
      tagline: 'الأكثر تحويلاً وإقناعاً في السوق المغربي',
      hook: `🚨 عييتي من المنتجات العادية لي كتخسر دغيا وما كتعطيكش النتيجة لي باغي؟`,
      body: `الآن فالمغرب 🇲🇦 جبنا ليك الحل النهائي: ${currentAd?.title}!
مع هذا المنتج العصري غادي توفر وقتك وفلوسك، ومصمم خصيصاً بجودة عالية ليدوم معاك طويلاً.

✅ جودة ممتازة مضمونة 100%
✅ فكرة حصرية مجربة من آلاف الزبائن بالمغرب
✅ شحن سريع وتوصيل مجاني حتى لباب دارك
✅ الخلاص حتى تقلب سلعتك وتتأكد منها عاد تخلص الليفرور!`,
      cta: `👉 اضغط على الرابط أسفله واطلب دابا قبل ما تسالي الكمية:`,
    },
    luxury: {
      name: 'فخامة وأناقة بأفضل سعر (Luxury & Prestige)',
      tagline: 'مناسب للإلكترونيات الفاخرة، الأحذية، وزيوت التجميل الأصلية',
      hook: `✨ تميز بإطلالة فاخرة وجودة استثنائية مع ${currentAd?.title}!`,
      body: `علاش ترضى بالعادي ملي تقدر تاخد الأفضل؟
هذا المنتج كيجمع بين الأناقة العصرية والأداء الاحترافي باش يرافقك فكل مناسبة وتكون دائماً فـ أبهى حلة.

💎 تصميم راقي ومواد تصنيع أصلية
💎 متانة وجودة تدوم لسنوات
💎 هدية مثالية لنفسك أو لمن تحب
🚚 التوصيل بالمجان لجميع المدن المغربية 24/48 ساعة والدفع عند الاستلام.`,
      cta: `🛍️ استفد من العرض الحصري واطلب الآن:`,
    },
    scarcity: {
      name: 'عرض حصري ونفاد المخزون (Urgency & Scarcity)',
      tagline: 'يخلق الرغبة الفورية في الشراء الفوري (FOMO)',
      hook: `🔥 تخفيض حصري -${currentAd?.discountPercent || 40}% متبقي فقط 14 قطعة فـ الستوك!`,
      body: `بمناسبة العرض الخاص لهذا الأسبوع، كنقدمو ليك ${currentAd?.title} بثمن استثنائي ${currentAd?.price} درهم فقط بلاصة ${currentAd?.originalPrice} درهم!

⚠️ سارع قبل نفاد المخزون، العرض صالح لهذا اليوم فقط أو حتى انتهاء الكمية المتبقية.
📦 إرسال فوري مع المتابعة خطوة بخطوة.
🤝 المعاينة والتجربة متاحة قبل الدفع.`,
      cta: `⚡ اضغط هنا لتأكيد طلبك قبل انتهاء التخفيض:`,
    },
    trust_cod: {
      name: 'الثقة والأمان والدفع عند الاستلام (COD Trust)',
      tagline: 'يزيل أي تردد أو خوف عند الزبون المغربي',
      hook: `🛡️ راحة بالك هي الأولى: تقلب سلعتك بيدك وتجربها عاد تخلص!`,
      body: `مع ${currentAd?.brandName}، التسوق عبر الإنترنت ولى مضمون 100%.
طلبك لـ ${currentAd?.title} غادي يوصلك حتى لعنوانك مع إمكانية فتح الكولية والتأكد من المواصفات قدام الموزع قبل ما تدفع ولا درهم.

✅ شركة معتمدة وموثوقة
✅ ضمان الاستبدال والاسترجاع لمدة 7 أيام
✅ خدمة زبائن متوفرة 7/7 للإجابة عن تساؤلاتك عبر واتساب.`,
      cta: `📲 اطلب عبر واتساب أو مباشرة من الموقع بضغطة زر:`,
    },
  };

  const selectedCopy = adCopyAngles[selectedAngle];
  const fullAdText = `${selectedCopy.hook}\n\n${selectedCopy.body}\n\n${selectedCopy.cta}\n🔗 https://so9fiadak.ma/p/${currentAd?.id || 'prod'}\n\n#المغرب #تجارة_إلكترونية #توصيل_مجاني #الدفع_عند_الاستلام`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullAdText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2400);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Suite Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-black border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>استوديو الإعلانات والمبيعات للتجار</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              صناعة الكرياتيف الاحترافي وصفحات الهبوط (Landing Pages)
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">
              أنشئ نصوص إعلانية محكمة بلهجة السوق المغربي (Angles & Hooks)، صمم كروت الكرياتيف لفيسبوك وتيك توك، واصنع صفحة هبوط ذات تحويل عالي مع نموذج الطلب السريع والدفع عند الاستلام.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('creatives')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'creatives'
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>1. صانع الكرياتيف (Ad Creatives)</span>
            </button>
            <button
              onClick={() => setActiveTab('landing_page')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'landing_page'
                  ? 'bg-white text-indigo-900 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>2. صفحة الهبوط (Landing Page)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Selector Ribbon */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-slate-800">اختر السلعة المستهدفة:</span>
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            {ads.map((ad) => (
              <button
                key={ad.id}
                onClick={() => setSelectedAdId(ad.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  selectedAdId === ad.id
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="w-5 h-5 rounded-md object-cover"
                />
                <span className="truncate max-w-[120px]">{ad.title}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onOpenCreateAd}
          className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>سلعة أخرى غير موجودة؟ أضفها هنا</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* TAB 1: CREATIVES BUILDER */}
      {activeTab === 'creatives' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Angle selection (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Marketing Angles Selector */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">1. زاوية التسويق والخطاف (Marketing Angle & Hook)</h3>
                  <p className="text-xs text-slate-500">اختر أسلوب الخطاب المناسب للجمهور المستهدف بالمغرب</p>
                </div>
                <Zap className="w-4 h-4 text-amber-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(adCopyAngles) as Array<keyof typeof adCopyAngles>).map((key) => {
                  const angle = adCopyAngles[key];
                  const isSelected = selectedAngle === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedAngle(key)}
                      className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-black ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                          {angle.name}
                        </span>
                        {isSelected && <BadgeCheck className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {angle.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Visual Badge Overlay Selector */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-sm font-black text-slate-900">2. شارة العرض على الصورة / الفيديو (Visual Overlay Badge)</h3>
              <p className="text-xs text-slate-500">شارة جذابة توضع فوق الصورة الإعلانية لجلب النقرات (CTR Boost)</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'تخفيض -50% اليوم فقط',
                  'الدفع بعد المعاينة',
                  'التوصيل بالمجان بالمغرب 🚚',
                  'الأكثر مبيعاً بالمغرب 🇲🇦',
                  'الكمية محدودة جداً ⏳',
                  'ضمان الجودة 100% ⭐',
                ].map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setSelectedOverlayBadge(badge)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      selectedOverlayBadge === badge
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Generated Ad Copy with Copy Button */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">3. النص الإعلاني الجاهز (Ad Copy & Caption)</h3>
                  <p className="text-xs text-slate-500">جاهز للنسخ المباشر في مدير إعلانات فيسبوك أو تيك توك</p>
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

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-line select-all">
                {fullAdText}
              </div>
            </div>
          </div>

          {/* Live Ad Mockup Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-20">
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>معاينة الكرياتيف (Facebook Feed Mockup)</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    Sponsored Ads
                  </span>
                </div>

                {/* Facebook Ad Card Mockup */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
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
                      src={currentAd.images[0]}
                      alt={currentAd.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge Overlay */}
                    <div className="absolute top-3 right-3 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-lg shadow-md animate-pulse">
                      {selectedOverlayBadge}
                    </div>
                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-lg border border-white/20">
                      {currentAd.price} {currentAd.currency} <span className="line-through text-slate-400 text-[10px] mr-1">{currentAd.originalPrice} DH</span>
                    </div>
                  </div>

                  {/* Ad CTA Footer */}
                  <div className="p-3 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">SO9FIADAK.MA</span>
                      <span className="text-xs font-bold text-slate-900 truncate block max-w-[180px]">{currentAd.title}</span>
                    </div>
                    <button
                      onClick={() => onQuickOrder && onQuickOrder(currentAd)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      أطلب الآن
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-800 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>نصيحة للمبيعات بالمغرب:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    جرب تطلق 2 إلى 3 زوايا إعلانية مختلفة (مثلاً: زاوية حل المشكل وزاوية التخفيض المحدود) وشوف أيهم كيجيب ليك تكلفة نقرة وتكلفة رسالة واتساب أرخص!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LANDING PAGE BUILDER & SIMULATOR */}
      {activeTab === 'landing_page' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-800">وضع المعاينة:</span>
              <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>هاتف (Mobile 95% الزوار)</span>
                </button>
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-indigo-600 text-white shadow-xs'
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
                onClick={() => {
                  navigator.clipboard.writeText(`https://so9fiadak.ma/landing/${currentAd.id}`);
                  alert('تم نسخ رابط صفحة الهبوط التجريبية بنجاح!');
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ رابط الصفحة</span>
              </button>
            </div>
          </div>

          {/* Live Landing Page Container */}
          <div className="flex justify-center">
            <div
              className={`w-full transition-all duration-300 ${
                previewDevice === 'mobile'
                  ? 'max-w-md bg-white rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden'
                  : 'max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden'
              }`}
            >
              {/* Fake Mobile Status Bar if in mobile mode */}
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
                <div className="bg-gradient-to-r from-rose-600 to-amber-600 text-white text-center py-2 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-xs">
                  <Flame className="w-4 h-4 animate-bounce" />
                  <span>سارع! العرض الحصري ينتهي خلال 04:32:15 دقيقة فقط</span>
                </div>

                {/* 2. Product Title & Social Rating */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-black text-slate-700 mr-1.5">(4.9/5 بناءً على 480+ تقييم بالمغرب)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {currentAd.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {currentAd.description}
                  </p>
                </div>

                {/* 3. Hero Visual Asset (Image or Video) */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-md">
                  <img
                    src={currentAd.images[0]}
                    alt={currentAd.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    وفر -{currentAd.discountPercent || 40}% اليوم
                  </div>
                </div>

                {/* 4. Pricing Box */}
                <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-2xl p-4 text-center space-y-1">
                  <span className="text-xs font-bold text-slate-500 block">ثمن العرض الخاص:</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-black text-emerald-700">
                      {orderQuantity === 1 ? currentAd.price : Math.round(currentAd.price * orderQuantity * 0.85)} {currentAd.currency}
                    </span>
                    <span className="text-sm line-through text-slate-400 font-bold">
                      {currentAd.originalPrice * orderQuantity} DH
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 block">
                    ✓ التوصيل مجاني 100% والدفع نقداً عند استلام ومعاينة السلعة
                  </span>
                </div>

                {/* 5. Key Highlights / Bullets */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-black text-slate-900 block mb-2">مميزات لا تقاوم في هذا المنتج:</span>
                  {currentAd.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* 6. Moroccan COD Fast Order Form */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg space-y-4">
                  <div className="text-center space-y-1">
                    <h3 className="text-base font-black text-amber-400">
                      للطلب المباشر: املأ الاستمارة الآن والدفع عند التسليم
                    </h3>
                    <p className="text-[11px] text-slate-300">
                      سيتصل بك فريقنا لتأكيد العنوان وتحديد موعد الإرسال
                    </p>
                  </div>

                  {/* Quantity selector (Bundle options) */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300 block">1. اختر الكمية والعرض:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderQuantity(1)}
                        className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                          orderQuantity === 1
                            ? 'bg-blue-600/30 border-blue-400 text-white font-black'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        <span className="block text-xs">1 حبة (شحن فابور)</span>
                        <span className="text-xs font-black text-amber-400">{currentAd.price} DH</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderQuantity(2)}
                        className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer relative ${
                          orderQuantity === 2
                            ? 'bg-blue-600/30 border-blue-400 text-white font-black'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        <span className="absolute -top-2 right-2 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                          الأكثر طلباً -15%
                        </span>
                        <span className="block text-xs">2 حبات (عرض ثنائي)</span>
                        <span className="text-xs font-black text-amber-400">
                          {Math.round(currentAd.price * 2 * 0.85)} DH
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-2 text-slate-900">
                    <div>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="الاسم الكامل *"
                        className="w-full py-2.5 px-3 bg-white text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="رقم الهاتف (الواتساب) *"
                        className="w-full py-2.5 px-3 bg-white text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400 text-left"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <select
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="w-full py-2.5 px-3 bg-white text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400"
                      >
                        {['الدار البيضاء', 'الرباط', 'مراكش', 'طنجة', 'فاس', 'أكادير', 'القنيطرة', 'وجدة'].map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!customerPhone) {
                        alert('يرجى كتابة رقم الهاتف للتواصل معك');
                        return;
                      }
                      setOrderSubmitted(true);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm rounded-xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>اضغط هنا لتأكيد طلبك الآن</span>
                  </button>

                  {orderSubmitted && (
                    <div className="p-3 bg-emerald-900/60 border border-emerald-400/50 rounded-xl text-emerald-300 text-xs text-center font-bold animate-in fade-in">
                      🎉 شكراً لك! تم استلام طلبك بنجاح، وسيتصل بك أحد ممثلينا لتأكيد الإرسال فوراً!
                    </div>
                  )}
                </div>

                {/* 7. Guarantees Ribbon */}
                <div className="grid grid-cols-3 gap-2 text-center text-slate-700 py-2 border-t border-slate-100">
                  <div className="p-2 space-y-1">
                    <Truck className="w-5 h-5 mx-auto text-blue-600" />
                    <span className="text-[10px] font-black block">توصيل 24/48 ساعة</span>
                  </div>
                  <div className="p-2 space-y-1">
                    <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600" />
                    <span className="text-[10px] font-black block">معاينة قبل الدفع</span>
                  </div>
                  <div className="p-2 space-y-1">
                    <Clock className="w-5 h-5 mx-auto text-amber-600" />
                    <span className="text-[10px] font-black block">ضمان 7 أيام</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
