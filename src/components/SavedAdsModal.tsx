import React from 'react';
import { ProductAd } from '../types';
import { X, Bookmark, Trash2, Truck, ShoppingBag } from 'lucide-react';

interface SavedAdsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedAds: ProductAd[];
  onQuickOrder: (ad: ProductAd) => void;
  onRemoveSaved: (adId: string) => void;
}

export const SavedAdsModal: React.FC<SavedAdsModalProps> = ({
  isOpen,
  onClose,
  savedAds,
  onQuickOrder,
  onRemoveSaved,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 text-right animate-in fade-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                الإعلانات المحفوظة
              </h3>
              <p className="text-xs text-slate-500">
                {savedAds.length} منتجات في قائمتك
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {savedAds.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">
                لا توجد إعلانات محفوظة حالياً
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                يمكنك الضغط على أيقونة الحفظ (Bookmark) في أي إعلان لتجده هنا في أي وقت.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedAds.map((ad) => (
                <div
                  key={ad.id}
                  className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3"
                >
                  <img
                    src={ad.images[0]}
                    alt={ad.title}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {ad.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-black text-rose-600 tabular-nums">
                        {ad.price} {ad.currency}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {ad.city}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onQuickOrder(ad);
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>طلب</span>
                    </button>
                    <button
                      onClick={() => onRemoveSaved(ad.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title="حذف من المحفوظات"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
