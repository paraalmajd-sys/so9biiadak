import React, { useState } from 'react';
import { PageProfile, ProductAd } from '../types';
import { ProductAdCard } from './ProductAdCard';
import {
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Clock,
  ShieldCheck,
  PlusCircle,
  Share2,
  Calendar,
  Truck,
  Image as ImageIcon,
  ThumbsUp,
  Award,
  ExternalLink,
} from 'lucide-react';

interface PageProfileViewProps {
  profile: PageProfile;
  ads: ProductAd[];
  onQuickOrder: (ad: ProductAd) => void;
  onToggleSave: (adId: string) => void;
  onToggleLike: (adId: string) => void;
  onAddComment: (adId: string, text: string) => void;
  onOpenCreateAd: () => void;
}

export const PageProfileView: React.FC<PageProfileViewProps> = ({
  profile,
  ads,
  onQuickOrder,
  onToggleSave,
  onToggleLike,
  onAddComment,
  onOpenCreateAd,
}) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'about' | 'reviews' | 'photos'>('ads');
  const [isFollowing, setIsFollowing] = useState(true);
  const [followers, setFollowers] = useState(profile.followersCount);

  const pageAds = ads.filter(
    (ad) =>
      ad.brandName.toLowerCase().includes('so9fiadak') ||
      ad.brandHandle.toLowerCase().includes('so9fiadak')
  );

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
      setIsFollowing(false);
    } else {
      setFollowers((prev) => prev + 1);
      setIsFollowing(true);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'السلام عليكم، نتواصل معكم مباشرة عبر صفحتكم الرسمية في SO9FIADAK (سوق في يدك) للاستفسار عن المنتجات.'
  )}`;

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* 1. Facebook Page Cover & Avatar Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        {/* Cover Photo */}
        <div className="relative h-48 sm:h-72 w-full bg-slate-800">
          <img
            src={profile.coverImage}
            alt="Page Cover"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>متجر تجاري معتمد في سوق في يدك</span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-5 pb-5 pt-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-4">
            {/* Avatar & Title */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-right">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover bg-white"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute bottom-1 -left-1 bg-white rounded-full p-1 shadow-sm"
                  title="صفحة تجارية موثقة"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-600" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {profile.name}
                  </h1>
                </div>
                <div className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                  <span>{profile.handle}</span>
                  <span>·</span>
                  <span className="text-blue-600 font-medium">
                    {profile.category}
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-600 font-medium pt-0.5">
                  <span className="tabular-nums font-bold text-slate-900">
                    {followers.toLocaleString()} متابع
                  </span>
                  <span>·</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="font-bold text-slate-900 tabular-nums">
                      {profile.rating}
                    </span>
                    <span className="text-slate-400">
                      ({profile.reviewsCount} تقييم)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons (WhatsApp + Follow + Add Ad) */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب المتجر</span>
              </a>

              <button
                onClick={handleFollowToggle}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  isFollowing
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{isFollowing ? 'متابَع' : 'متابعة الصفحة'}</span>
              </button>

              <button
                onClick={onOpenCreateAd}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>نشر إعلان جديد</span>
              </button>
            </div>
          </div>

          {/* Page Bio Box */}
          <p className="text-xs text-slate-700 leading-relaxed max-w-3xl text-right bg-slate-50 p-3 rounded-xl border border-slate-100">
            {profile.bio}
          </p>

          {/* Facebook-style Page Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 mt-4 pt-3 border-t border-slate-200 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('ads')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'ads'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              إعلانات ومنتجات الصفحة ({pageAds.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              آراء وتقييمات الزبائن (1,430)
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              حول المتجر ومعلومات الشحن
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'photos'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              معرض الصور والتصاميم
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tab Contents */}
      {/* A. Product Ads Tab */}
      {activeTab === 'ads' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Left info rail */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs text-right space-y-3">
              <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
                بيانات الاتصال والتوصيل
              </h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{profile.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono tabular-nums">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>توصيل 24/48 ساعة لجميع مدن المغرب</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{profile.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs text-right">
              <h3 className="text-xs font-bold text-slate-900 mb-2">
                شهادات الضمان والجودة
              </h3>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>الدفع عند الاستلام 100%</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  ما كتخلص حتى كتشد السلعة ف يدك وتقلبها عاد تخلص الليفرور.
                </p>
              </div>
            </div>
          </div>

          {/* Right Feed of Page Ads */}
          <div className="md:col-span-8 space-y-4">
            {pageAds.map((ad) => (
              <ProductAdCard
                key={ad.id}
                ad={ad}
                onQuickOrder={onQuickOrder}
                onToggleSave={onToggleSave}
                onToggleLike={onToggleLike}
                onAddComment={onAddComment}
              />
            ))}
          </div>
        </div>
      )}

      {/* B. Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-right space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                {profile.rating}
              </span>
              <div className="flex items-center gap-1 text-amber-500 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-500">
                استناداً إلى أكثر من 1,430 رأي حقيقي من زبائن مختلف المدن المغربية
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 w-full sm:w-60">
              <div className="flex items-center justify-between">
                <span>جودة السلع:</span>
                <span className="font-bold text-emerald-600">98% ممتاز</span>
              </div>
              <div className="flex items-center justify-between">
                <span>سرعة التوصيل:</span>
                <span className="font-bold text-emerald-600">96% خلال 24h</span>
              </div>
              <div className="flex items-center justify-between">
                <span>المعاملة والتواصل:</span>
                <span className="font-bold text-blue-600">100% متجاوب</span>
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'أنس الوهابي - الدار البيضاء',
                rating: 5,
                date: 'منذ يومين',
                text: 'طلبت ساعة Ultra Titanium وصلاتني لداري ف نفس النهار. قلبتها وشعلتها وجربت الاتصال عاد خلصت الليفرور. صراحة قمة فالاحترافية تبارك الله.',
              },
              {
                name: 'خديجة بنجلون - مراكش',
                rating: 5,
                date: 'منذ 3 أيام',
                text: 'سيروم وزيت الأركان رائع جداً، ريحتو أصلية وكيخلي الوجه رطب. شكراً على الهدية لي صيفطتو معاه (صابونة زهر البرتقال)!',
              },
              {
                name: 'سفيان المراكشي - طنجة',
                rating: 5,
                date: 'منذ أسبوع',
                text: 'سنيكرز الجلد الفاسي السايز 43 جاني هو هذاك، جلد نقي وخفيف فالمشي. التعامل د الواتساب كان سريع ومحترم جداً.',
              },
              {
                name: 'مروان البوزيدي - الرباط',
                rating: 5,
                date: 'منذ أسبوع',
                text: 'السماعات ANC كتعزل الصداع د الطوبيس والشوارع مزيان بزاف، والباتري ديالهوم كطول بلا قياس. شكراً سوق في يدك.',
              },
            ].map((rev, i) => (
              <div
                key={i}
                className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2 text-right"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 tabular-nums">
                    {rev.date}
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  "{rev.text}"
                </p>
                <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{rev.name} (مشتري موثوق)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* C. About Tab */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs text-right space-y-5">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            معلومات شاملة حول صفحة ومتجر {profile.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-900">
                من نحن وتخصصنا:
              </h3>
              <p className="leading-relaxed">
                متجر رسمي متخصص حصرياً في تسويق وإعلانات المنتجات عالية الجودة
                في السوق المغربي. نعمل بنموذج التجارة المباشرة (Direct-to-Consumer)
                الذي يضمن للزبون الحصول على أفضل سعر ممكن بدون وسطاء، مع إمكانية
                الدفع عند الاستلام.
              </p>

              <h3 className="font-bold text-sm text-slate-900 pt-2">
                سياسة التوصيل والاستلام:
              </h3>
              <p className="leading-relaxed">{profile.deliveryPolicy}</p>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <h3 className="font-bold text-sm text-slate-900">
                معلومات التواصل الرسمية:
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">الواتساب:</span>
                  <span className="font-bold text-emerald-700 font-mono">
                    {profile.whatsapp}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">الهاتف:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {profile.phone}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">البريد الإلكتروني:</span>
                  <span className="font-mono text-slate-800">
                    {profile.email}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">المقر الرئيسي:</span>
                  <span className="font-medium text-slate-900">
                    {profile.address}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">ساعات العمل:</span>
                  <span className="font-medium text-slate-900">
                    {profile.workingHours}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* D. Photos Tab */}
      {activeTab === 'photos' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-right">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              معرض تصاميم وصور المنتجات المعلن عنها
            </h3>
            <span className="text-xs text-slate-400">
              {pageAds.flatMap((a) => a.images).length} صور بدقة عالية
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {pageAds
              .flatMap((a) => a.images)
              .map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden aspect-square border border-slate-200 bg-slate-100 group relative"
                >
                  <img
                    src={imgUrl}
                    alt={`Product Photo ${idx}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
