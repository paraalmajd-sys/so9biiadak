import React, { useEffect, useState } from 'react';
import { Story, ProductAd } from '../types';
import { X, ChevronLeft, ChevronRight, Eye, PhoneCall, ShoppingBag } from 'lucide-react';

interface StoryViewerModalProps {
  story: Story | null;
  onClose: () => void;
  onSelectProduct: (adId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  story,
  onClose,
  onSelectProduct,
  onNext,
  onPrev,
}) => {
  if (!story) return null;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (onNext) onNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-sm h-[85vh] max-h-[680px] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Progress bar */}
        <div className="absolute top-2.5 left-3 right-3 z-30 flex items-center gap-1">
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Top Header */}
        <div className="absolute top-5 left-3 right-3 z-30 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <img
              src={story.brandAvatar}
              alt={story.brandName}
              className="w-9 h-9 rounded-full object-cover border-2 border-white/80"
              referrerPolicy="no-referrer"
            />
            <div className="text-right">
              <span className="font-bold text-xs block leading-tight">
                {story.brandName}
              </span>
              <span className="text-[10px] text-slate-300 flex items-center gap-1">
                <Eye className="w-3 h-3" /> {story.views} مشاهدة
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Story Main Image */}
        <div className="absolute inset-0">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
        </div>

        {/* Side navigation click areas */}
        <div className="absolute inset-y-16 inset-x-0 z-20 flex">
          <div
            onClick={onPrev}
            className="w-1/3 h-full cursor-pointer flex items-center justify-start pl-2 opacity-0 hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-8 h-8 text-white/80 drop-shadow" />
          </div>
          <div className="w-1/3 h-full" />
          <div
            onClick={onNext}
            className="w-1/3 h-full cursor-pointer flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-8 h-8 text-white/80 drop-shadow" />
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="relative z-30 p-4 text-right text-white space-y-2 mt-auto">
          <div className="inline-block bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow-xs mb-1">
            عرض خاص {story.discount}
          </div>
          <h3 className="text-base font-bold leading-snug drop-shadow-md">
            {story.title}
          </h3>
          <p className="text-xs text-slate-200">
            توصيل سريع لجميع المدن المغربية والدفع عند الاستلام.
          </p>

          <button
            onClick={() => {
              onSelectProduct(story.productAdId);
              onClose();
            }}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>عرض تفاصيل المنتج وإرسال الطلب</span>
          </button>
        </div>
      </div>
    </div>
  );
};
