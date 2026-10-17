import React from 'react';
import { UserAccount } from '../types';
import { PRICING_PLANS } from '../data/mockData';
import { X, Lock, Sparkles, Check, ArrowRight, ShieldCheck, Store, User } from 'lucide-react';

interface SubscriptionRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onGoToPricing: () => void;
  onUpgradeToMerchant: () => void;
}

export const SubscriptionRequiredModal: React.FC<SubscriptionRequiredModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onGoToPricing,
  onUpgradeToMerchant,
}) => {
  if (!isOpen) return null;

  const isBuyer = currentUser?.role === 'buyer';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 text-right animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-amber-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isBuyer ? 'خاصية نشر الإعلانات متاحة للتجار فقط' : 'الاشتراك مطلوب قبل نشر الإعلانات'}
              </h3>
              <p className="text-[11px] text-amber-800">
                {isBuyer
                  ? 'أنت مسجل حالياً كـ مشتري عادي'
                  : 'لتتمكن من نشر سلعك يلزم تفعيل إحدى باقات التجار'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {isBuyer ? (
            /* Buyer Notice */
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <p className="font-bold text-slate-900 text-sm">
                  مرحباً بك يا {currentUser?.fullName}!
                </p>
                <p className="leading-relaxed">
                  حسابك الحالي هو <strong>حساب مشتري عادي</strong> مخصص لتصفح المنتجات والطلب عبر واتساب والدفع عند الاستلام.
                </p>
                <p className="leading-relaxed text-blue-700">
                  إذا كنت تاجراً أو عندك سلع وبغيتي تنشر إعلانات وتبيعها في سوق في يدك، يمكنك ترقية حسابك إلى حساب تاجر والاشتراك في إحدى الباقات.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onUpgradeToMerchant();
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>ترقية الحساب إلى تاجر والاشتراك</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            /* Merchant without subscription */
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <p className="font-bold text-slate-900 text-sm">
                  مرحباً بك يا {currentUser?.businessName || currentUser?.fullName}!
                </p>
                <p className="leading-relaxed">
                  حسب شروط وقوانين منصة <strong>SO9FIADAK (سوق في يدك)</strong>، يجب على كل تاجر تفعيل إحدى باقات الاشتراك لضمان وصول إعلاناته للزبائن:
                </p>
              </div>

              {/* 3 mini cards */}
              <div className="grid grid-cols-3 gap-2">
                {PRICING_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      plan.popular
                        ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500/20'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-500 block truncate">
                      {plan.name}
                    </span>
                    <span className="text-base font-black text-slate-900 block tabular-nums my-0.5">
                      {plan.priceMAD} DH
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      ({plan.priceUSD}$)
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block mt-1">
                      {plan.reachGuarantee.split(' ')[0]} ظهور
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onGoToPricing();
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>اختيار الباقة وتفعيل الاشتراك الآن</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
