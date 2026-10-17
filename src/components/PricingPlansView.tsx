import React, { useState } from 'react';
import { PricingPlan, UserAccount } from '../types';
import { PRICING_PLANS } from '../data/mockData';
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  ShieldCheck,
  CreditCard,
  Building,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface PricingPlansViewProps {
  currentUser: UserAccount | null;
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenAuth: () => void;
}

export const PricingPlansView: React.FC<PricingPlansViewProps> = ({
  currentUser,
  onSelectPlan,
  onOpenAuth,
}) => {
  const { t, currency, setCurrency, isRtl } = useLanguage();
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cmi' | 'bank_transfer' | 'whatsapp'>('cmi');

  const handleChoosePlan = (plan: PricingPlan) => {
    if (!currentUser || !currentUser.isLoggedIn) {
      onOpenAuth();
      return;
    }
    setSelectedPlanForPayment(plan);
    setPaymentSuccess(false);
  };

  const handleConfirmSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForPayment) return;
    setPaymentSuccess(true);
    onSelectPlan(selectedPlanForPayment);
    setTimeout(() => {
      setSelectedPlanForPayment(null);
      setPaymentSuccess(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-blue-600 block">
          SO9FIADAK · VIP E-Commerce Merchant Plans
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('plansTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('plansSubtitle')}
        </p>

        {/* Currency Switcher */}
        <div className="inline-flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl text-xs font-bold mt-2">
          <button
            onClick={() => setCurrency('MAD')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currency === 'MAD'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('currencyMAD')}
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currency === 'USD'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('currencyUSD')}
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards Grid ($20, $30, $45) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isCurrent = currentUser?.planId === plan.id;
          const displayPrice = currency === 'MAD' ? `${plan.priceMAD} DH` : `$${plan.priceUSD}`;

          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${isRtl ? 'text-right' : 'text-left'} ${
                plan.popular
                  ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/20 md:-translate-y-2'
                  : 'border-slate-200/90 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Popular tag */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-black px-3 py-0.5 rounded-full shadow-sm">
                  {plan.badge || 'الباقة الأكثر طلباً'}
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                    {plan.id === 'starter' && <Zap className="w-5 h-5 text-amber-500" />}
                    {plan.id === 'pro' && <Sparkles className="w-5 h-5 text-blue-600" />}
                    {plan.id === 'vip' && <Crown className="w-5 h-5 text-amber-600" />}
                  </div>

                  <span className="text-xs font-bold text-slate-500">
                    {plan.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="py-3 border-y border-slate-100 mb-4">
                  <div className="flex items-baseline gap-1 text-slate-900">
                    <span className="text-3xl font-black tabular-nums">
                      {displayPrice}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      / {plan.period}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                    {plan.reachGuarantee}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 text-xs text-slate-700 mb-6">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => handleChoosePlan(plan)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{isCurrent ? 'باقتك الحالية (مفعلة)' : `الاشتراك في ${plan.name}`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">ضمان النتائج والطلبيات</h4>
            <p className="text-[11px] text-slate-500">
              تضمن المنصة وصول إعلاناتك لأعداد الزبائن المحددة في كل باقة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">دعم بنكي مغربي 100%</h4>
            <p className="text-[11px] text-slate-500">
              أداء سهل عبر CIH Bank، التجاري وفا بنك، أو البطاقة البنكية المغربية.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">بدون أي عمولة على مبيعاتك</h4>
            <p className="text-[11px] text-slate-500">
              جميع أرباح السلع والطلبيات لك بالكامل 100% بدون أي نسبة مقتطعة.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription / Checkout Modal */}
      {selectedPlanForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 text-right animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">
                تأكيد الاشتراك: {selectedPlanForPayment.name}
              </h3>
              <button
                onClick={() => setSelectedPlanForPayment(null)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                إغلاق
              </button>
            </div>

            {paymentSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900">
                  مبروك! تم تفعيل {selectedPlanForPayment.name} بنجاح
                </h4>
                <p className="text-xs text-slate-500">
                  تمت ترقية حساب متجرك، والآن إعلاناتك ستحصل على {selectedPlanForPayment.reachGuarantee}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmSubscription} className="p-5 space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-500">المبلغ الإجمالي للاشتراك:</span>
                  <span className="text-base font-black text-slate-900 tabular-nums">
                    {selectedPlanForPayment.priceMAD} DH ({selectedPlanForPayment.priceUSD}$)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    اختر وسيلة الدفع المناسبة لك:
                  </label>
                  <div className="space-y-2 text-xs">
                    <label
                      onClick={() => setPaymentMethod('cmi')}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                        paymentMethod === 'cmi'
                          ? 'border-blue-600 bg-blue-50/50'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        <span className="font-bold">البطاقة البنكية الوطنية (CMI / Visa / MasterCard)</span>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'cmi'}
                        onChange={() => setPaymentMethod('cmi')}
                      />
                    </label>

                    <label
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                        paymentMethod === 'bank_transfer'
                          ? 'border-blue-600 bg-blue-50/50'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-indigo-600" />
                        <span className="font-bold">تحويل بنكي مغربي (CIH Bank / التجاري وفا بنك)</span>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                      />
                    </label>

                    <label
                      onClick={() => setPaymentMethod('whatsapp')}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                        paymentMethod === 'whatsapp'
                          ? 'border-blue-600 bg-blue-50/50'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold">التفعيل والدفع المباشر عبر واتساب الإدارة</span>
                      </div>
                      <input
                        type="radio"
                        checked={paymentMethod === 'whatsapp'}
                        onChange={() => setPaymentMethod('whatsapp')}
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    تأكيد الاشتراك وتفعيل الباقة فورياً
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
