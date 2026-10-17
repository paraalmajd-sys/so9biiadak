import React, { useState, useRef } from 'react';
import { ProductAd } from '../types';
import {
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  CheckCircle2,
  MapPin,
  Truck,
  ShieldCheck,
  Send,
  Sparkles,
  PhoneCall,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Video,
  Image as ImageIcon,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ProductAdCardProps {
  ad: ProductAd;
  onQuickOrder: (ad: ProductAd) => void;
  onToggleSave: (adId: string) => void;
  onToggleLike: (adId: string) => void;
  onAddComment: (adId: string, text: string) => void;
}

export const ProductAdCard: React.FC<ProductAdCardProps> = ({
  ad,
  onQuickOrder,
  onToggleSave,
  onToggleLike,
  onAddComment,
}) => {
  const { t, formatPrice, isRtl } = useLanguage();
  const [showFullText, setShowFullText] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [copiedToast, setCopiedToast] = useState(false);

  // Video state
  const [mediaTab, setMediaTab] = useState<'video' | 'images'>(ad.videoUrl ? 'video' : 'images');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
            setVideoLoadError(false);
          })
          .catch((err) => {
            console.warn('Video playback warning, retrying muted:', err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setVideoLoadError(true));
            }
          });
      }
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/#ad-${ad.id} - ${ad.title} بسعر ${ad.price} DH في سوق في يدك`
      );
    }
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(ad.id, newComment.trim());
    setNewComment('');
    if (!showComments) setShowComments(true);
  };

  const directWhatsAppUrl = `https://wa.me/${ad.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `السلام عليكم، شفت الإعلان ديالكم في تطبيق SO9FIADAK (سوق في يدك) وبغيت نطلب: ${ad.title} بسعر ${ad.price} DH. واش باقي متوفر؟`
  )}`;

  return (
    <article
      id={`ad-${ad.id}`}
      className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden mb-5 transition-shadow hover:shadow-sm"
    >
      {/* 1. Facebook-Style Header */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={ad.brandAvatar}
                alt={ad.brandName}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              {ad.verified && (
                <div
                  title="تاجر موثوق في سوق في يدك"
                  className="absolute -bottom-1 -left-1 bg-white rounded-full p-0.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-slate-900 text-[15px] hover:underline cursor-pointer">
                  {ad.brandName}
                </span>
                <span className="text-xs text-slate-400 font-normal">
                  {ad.brandHandle}
                </span>
              </div>

              {/* Sponsored Indicator + Time + City */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <span className="font-semibold text-blue-700 flex items-center gap-1">
                  <span>{t('sponsoredBadge')}</span>
                  <Globe className="w-3 h-3 text-blue-600" />
                </span>
                <span>·</span>
                <span className="tabular-nums">{ad.createdAt}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5 text-slate-600">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{ad.city}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleSave(ad.id)}
              title={ad.isSaved ? t('savedAd') : t('saveAd')}
              className={`p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer ${
                ad.isSaved ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${ad.isSaved ? 'fill-blue-600' : ''}`}
              />
            </button>
            <button
              onClick={handleShare}
              title={t('share')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Written Copy & Marketing Text */}
        <div className={`mt-3 ${isRtl ? 'text-right' : 'text-left'}`}>
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            {ad.title}
          </h2>

          <div className="mt-2 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {showFullText ? (
              ad.description
            ) : (
              <>
                {ad.description.slice(0, 160)}
                {ad.description.length > 160 && '... '}
              </>
            )}
            {ad.description.length > 160 && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="text-blue-600 font-semibold hover:underline inline-block mr-1 cursor-pointer"
              >
                {showFullText ? (isRtl ? 'عرض أقل' : 'Voir moins') : (isRtl ? 'قراءة المزيد' : 'Voir plus')}
              </button>
            )}
          </div>

          {/* Key Product Features (if available) */}
          {ad.features && ad.features.length > 0 && showFullText && (
            <ul className="mt-3 space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-800">
              {ad.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 3. Offer & Pricing Ribbon (Pre-Media Highlight) */}
      <div className="mx-4 mb-2 px-3 py-2 bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200/80 rounded-lg flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-baseline gap-1 text-slate-900">
            <span className="text-2xl font-black text-rose-600 tabular-nums">
              {formatPrice(ad.price)}
            </span>
          </div>

          {ad.originalPrice > ad.price && (
            <div className="text-xs text-slate-400 line-through tabular-nums">
              {formatPrice(ad.originalPrice)}
            </div>
          )}

          <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md tabular-nums">
            -{ad.discountPercent}%
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-1 font-medium text-emerald-700">
            <Truck className="w-3.5 h-3.5" />
            <span>{t('freeShipping')}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1 font-medium text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('cashOnDelivery')}</span>
          </div>
        </div>
      </div>

      {/* 4. Media Switcher: Video vs Images (if video available) */}
      {ad.videoUrl && (
        <div className="px-4 py-1.5 flex items-center justify-between text-xs bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMediaTab('video')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                mediaTab === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>فيديو المنتج</span>
            </button>
            <button
              onClick={() => setMediaTab('images')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                mediaTab === 'images'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>صور المنتج ({ad.images.length})</span>
            </button>
          </div>

          {ad.videoViews && (
            <span className="text-slate-500 text-[11px] font-medium">
              👁️ {ad.videoViews} مشاهدة
            </span>
          )}
        </div>
      )}

      {/* 5. High-Resolution Media Display: Video or Image Gallery */}
      <div className="relative bg-slate-900 group overflow-hidden">
        {mediaTab === 'video' && ad.videoUrl ? (
          /* Video Player */
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              poster={ad.videoPoster || ad.images[0]}
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              onClick={toggleVideoPlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => {
                console.warn('Video failed, triggering fallback');
                setVideoLoadError(true);
              }}
              className="w-full h-full object-cover cursor-pointer"
            >
              {ad.videoUrl && <source src={ad.videoUrl} type="video/mp4" />}
              {ad.fallbackVideoUrl && <source src={ad.fallbackVideoUrl} type="video/mp4" />}
              متصفحك لا يدعم تشغيل الفيديو المباشر.
            </video>

            {/* Error or Fallback Overlay */}
            {videoLoadError && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center z-10">
                <span className="text-xs font-bold mb-2">تعذر تشغيل هذا الفيديو مؤقتاً</span>
                <button
                  onClick={() => {
                    setVideoLoadError(false);
                    if (videoRef.current) {
                      videoRef.current.load();
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            {/* Play/Pause Overlay */}
            {!isPlaying && !videoLoadError && (
              <button
                onClick={toggleVideoPlay}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                title="تشغيل فيديو المنتج"
              >
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </button>
            )}

            {/* Video Controls bar at bottom */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs z-10 px-2 py-1 bg-black/60 backdrop-blur-xs rounded-lg">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleVideoPlay}
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                <button onClick={toggleMute} className="hover:text-blue-400 cursor-pointer">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[10px] text-slate-300 font-mono">
                  {ad.videoDuration || '0:30'}
                </span>
              </div>

              <span className="text-[11px] font-bold text-amber-300">
                فيديو استعراض المنتج الحقيقي
              </span>
            </div>
          </div>
        ) : (
          /* Images Display */
          <div className="relative">
            <img
              src={ad.images[activeImgIndex] || ad.images[0]}
              alt={ad.title}
              className="w-full max-h-[500px] object-cover mx-auto"
              referrerPolicy="no-referrer"
            />

            {/* Multi-image indicators if multiple */}
            {ad.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full">
                {ad.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activeImgIndex === i ? 'w-5 bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stock urgency tag */}
        {ad.stockLeft && ad.stockLeft <= 15 && (
          <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>متبقي فقط {ad.stockLeft} قطع</span>
          </div>
        )}
      </div>

      {/* 6. Direct Moroccan Commerce CTAs (Direct WhatsApp + 1-Click COD Modal) */}
      <div className={`p-3 bg-slate-50 border-y border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className={`w-full sm:w-auto ${isRtl ? 'text-right' : 'text-left'}`}>
          <span className="text-xs text-slate-500 block">
            {isRtl ? 'طريقة الطلب المباشرة:' : 'Commande directe :'}
          </span>
          <span className="text-sm font-bold text-slate-900">
            {isRtl ? 'تأكيد بالهاتف أو واتساب والتوصيل حتى لباب الدار' : 'Confirmation immédiate & Livraison à domicile'}
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Green WhatsApp Order */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t('btnOrderWhatsapp')}</span>
          </a>

          {/* Primary Quick COD Order Modal */}
          <button
            onClick={() => onQuickOrder(ad)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>{t('btnOrderCod')}</span>
          </button>
        </div>
      </div>

      {/* 7. Engagement Metrics Summary (Facebook style) */}
      <div className="px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1 rtl:space-x-reverse">
            <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">
              👍
            </span>
            <span className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px]">
              ❤️
            </span>
          </div>
          <span className="tabular-nums font-medium">
            {ad.likesCount} {t('reactionsText')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="hover:underline cursor-pointer tabular-nums"
          >
            {ad.commentsCount} {t('comment')}
          </button>
          <span>·</span>
          <span className="tabular-nums">{ad.sharesCount} {t('share')}</span>
        </div>
      </div>

      {/* 8. Facebook Social Action Buttons Bar */}
      <div className="px-2 py-1 grid grid-cols-3 gap-1 border-b border-slate-100">
        <button
          onClick={() => onToggleLike(ad.id)}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            ad.isLiked
              ? 'text-blue-600 bg-blue-50'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ThumbsUp
            className={`w-4 h-4 ${ad.isLiked ? 'fill-blue-600' : ''}`}
          />
          <span>{ad.isLiked ? t('liked') : t('like')}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t('comment')} ({ad.comments.length})</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>{t('share')}</span>
        </button>
      </div>

      {/* Copied Toast Alert */}
      {copiedToast && (
        <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2 font-medium text-center border-b border-emerald-200">
          تم نسخ رابط المنتج بنجاح! شاركه مع أصدقائك أو على واتساب.
        </div>
      )}

      {/* 9. Interactive Comments Section */}
      {showComments && (
        <div className="p-4 bg-slate-50/70 space-y-3">
          <div className="text-xs font-bold text-slate-700 mb-2">
            الاستفسارات والتعليقات على المنتج:
          </div>

          {/* List of comments */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {ad.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2.5">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`flex-1 rounded-2xl px-3.5 py-2 text-xs text-right ${
                    comment.isSellerReply
                      ? 'bg-blue-50/90 border border-blue-200/80 text-blue-950'
                      : 'bg-white border border-slate-200/80 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-slate-900">
                      {comment.author}
                    </span>
                    <span className="text-[10px] text-slate-400 tabular-nums">
                      {comment.timeAgo}
                    </span>
                  </div>
                  <p className="leading-relaxed">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Post a new comment */}
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-center gap-2 pt-2 border-t border-slate-200/60"
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="اكتب استفساراً للبائع (مثلاً: واش كاين توصيل لمدينتي؟)..."
              className="flex-1 bg-white text-xs px-3.5 py-2 rounded-full border border-slate-300 focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
