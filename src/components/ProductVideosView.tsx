import React, { useState, useRef } from 'react';
import { ProductAd } from '../types';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  PhoneCall,
  Truck,
  Sparkles,
  CheckCircle2,
  Share2,
  Heart,
  Eye,
  Filter,
} from 'lucide-react';

interface ProductVideosViewProps {
  ads: ProductAd[];
  onQuickOrder: (ad: ProductAd) => void;
  onToggleLike: (adId: string) => void;
  onSelectCategory: (cat: string) => void;
  selectedCategory: string;
}

export const ProductVideosView: React.FC<ProductVideosViewProps> = ({
  ads,
  onQuickOrder,
  onToggleLike,
  onSelectCategory,
  selectedCategory,
}) => {
  // Filter only ads that have videos
  const videoAds = ads.filter((ad) => ad.videoUrl);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(videoAds[0]?.id || null);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});

  const toggleMute = (adId: string) => {
    setMutedStates((prev) => ({
      ...prev,
      [adId]: !prev[adId],
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 text-right">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 justify-end sm:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500">
              فيديوهات استعراض وتجارب المنتجات (Product Video Reels & Watch)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            فيديوهات السلع والعروض الحية
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            شاهد تجارب وفحص المنتجات الحقيقية بالفيديو واطلب مباشرة عبر واتساب مع الدفع عند الاستلام.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">
            {videoAds.length} فيديوهات متوفرة
          </span>
        </div>
      </div>

      {/* Videos List */}
      <div className="space-y-6">
        {videoAds.map((ad) => {
          const isPlaying = playingVideoId === ad.id;
          const isMuted = mutedStates[ad.id] ?? true;

          const directWhatsAppUrl = `https://wa.me/${ad.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            `السلام عليكم، شفت فيديو المنتج ديالكم في تطبيق SO9FIADAK وبغيت نطلب: ${ad.title} بسعر ${ad.price} DH.`
          )}`;

          return (
            <div
              key={ad.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:shadow-md"
            >
              {/* Creator header */}
              <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={ad.brandAvatar}
                    alt={ad.brandName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">
                        {ad.brandName}
                      </span>
                      {ad.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                      )}
                    </div>
                    <span className="text-xs text-slate-400">
                      {ad.city} · {ad.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full tabular-nums">
                    خصم {ad.discountPercent}%
                  </span>
                </div>
              </div>

              {/* Video Title & Brief Description */}
              <div className="px-4 py-3 text-right">
                <h3 className="text-base font-bold text-slate-900">
                  {ad.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {ad.description}
                </p>
              </div>

              {/* Video Player Container */}
              <div className="relative bg-black aspect-video sm:aspect-[16/9] flex items-center justify-center overflow-hidden group">
                <video
                  src={ad.videoUrl}
                  poster={ad.videoPoster || ad.images[0]}
                  loop
                  muted={isMuted}
                  playsInline
                  autoPlay={isPlaying}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() =>
                    setPlayingVideoId(isPlaying ? null : ad.id)
                  }
                />

                {/* Big play button if paused */}
                {!isPlaying && (
                  <button
                    onClick={() => setPlayingVideoId(ad.id)}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </button>
                )}

                {/* Floating Bottom Controls */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs z-10 px-3 py-1.5 bg-black/60 backdrop-blur-xs rounded-xl">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setPlayingVideoId(isPlaying ? null : ad.id)
                      }
                      className="hover:text-blue-400 cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 fill-white" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleMute(ad.id)}
                      className="hover:text-blue-400 cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <span className="text-[11px] font-mono text-slate-300">
                      {ad.videoDuration || '0:35'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span>{ad.videoViews || '14.2k'} مشاهدة</span>
                  </div>
                </div>
              </div>

              {/* Bottom Purchase Bar */}
              <div className="p-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-rose-600 tabular-nums">
                    {ad.price} {ad.currency}
                  </span>
                  {ad.originalPrice > ad.price && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      {ad.originalPrice} {ad.currency}
                    </span>
                  )}
                  <span className="text-xs text-emerald-600 font-bold mr-2">
                    توصيل بالمجان لجميع المدن
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>طلب بالواتساب</span>
                  </a>

                  <button
                    onClick={() => onQuickOrder(ad)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>شراء (الدفع عند الاستلام)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
