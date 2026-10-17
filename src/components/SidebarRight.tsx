import React from 'react';
import { ProductAd } from '../types';
import {
  Sparkles,
  Phone,
  Flame,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  Truck,
} from 'lucide-react';

interface SidebarRightProps {
  trendingAds: ProductAd[];
  onSelectProduct: (ad: ProductAd) => void;
  onQuickOrder: (ad: ProductAd) => void;
}

export const SidebarRight: React.FC<SidebarRightProps> = ({
  trendingAds,
  onSelectProduct,
  onQuickOrder,
}) => {
  return (
    <aside className="space-y-4">
      {/* Sponsored Ads Showcase Box (Facebook right rail style) */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-800">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>أكثر الإعلانات طلباً اليوم</span>
          </div>
          <span className="text-[10px] text-slate-400">مموّل</span>
        </div>

        <div className="space-y-3">
          {trendingAds.map((ad) => (
            <div
              key={ad.id}
              className="group flex gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/60"
            >
              <img
                src={ad.images[0]}
                alt={ad.title}
                className="w-16 h-16 rounded-lg object-cover shrink-0 cursor-pointer"
                onClick={() => onSelectProduct(ad)}
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0 text-right">
                <h4
                  onClick={() => onSelectProduct(ad)}
                  className="text-xs font-bold text-slate-900 line-clamp-2 cursor-pointer group-hover:text-blue-600 transition-colors"
                >
                  {ad.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-black text-rose-600 tabular-nums">
                    {ad.price} {ad.currency}
                  </span>
                  <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-1 rounded tabular-nums">
                    -{ad.discountPercent}%
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{ad.city}</span>
                  <button
                    onClick={() => onQuickOrder(ad)}
                    className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    أطلب الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Express Delivery Partners Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs text-right">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>شركاء التوصيل السريع بالمغرب</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
          توصيل آمن وسريع عبر كبرى شركات الشحن الوطنية مع إمكانية تتبع طلبيتك لحظة بلحظة:
        </p>
        <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
            Amana Express
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
            Cathedis COD
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
            Ozone Delivery
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800">
            SDTM المغرب
          </div>
        </div>
      </div>

      {/* WhatsApp Helpdesk & Support */}
      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-right">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>مركز المساعدة والدعم المباشر</span>
        </div>
        <p className="text-[11px] text-emerald-800 leading-relaxed mb-2.5">
          عندك سؤال بخصوص أي إعلان أو بغيتي مساعدة فإتمام الطلبية ديالك؟
        </p>
        <a
          href="https://wa.me/212612345678?text=السلام%20عليكم%20محتاج%20مساعدة%20في%20تطبيق%20سوق%20في%20يدك"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg text-center shadow-xs transition-colors"
        >
          تواصل مع الدعم عبر واتساب
        </a>
      </div>

      {/* Quiet Footer Links */}
      <footer className="text-[11px] text-slate-400 text-right leading-relaxed px-1">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-1">
          <span>شروط الاستخدام</span>
          <span>·</span>
          <span>سياسة الخصوصية</span>
          <span>·</span>
          <span>إعلانات التجار</span>
          <span>·</span>
          <span>سوق في يدك © 2026</span>
        </div>
        <div>منصة إعلانات التجارة الإلكترونية الاجتماعية في المغرب</div>
      </footer>
    </aside>
  );
};
