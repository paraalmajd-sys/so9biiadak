import React from 'react';
import { CATEGORIES, CITIES } from '../data/mockData';
import { UserAccount, ActiveViewType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Layers,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  LayoutDashboard,
  Store,
  ShoppingBag,
  CreditCard,
  Package,
  User,
  ArrowRight,
  Video,
  Settings,
  Globe,
  Palette,
  Calculator,
} from 'lucide-react';

interface SidebarLeftProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  adsCount: number;
  onNavigateView: (view: ActiveViewType) => void;
  activeView: string;
  currentUser: UserAccount | null;
  onOpenSubscriptionModal: () => void;
  onOpenSettings?: () => void;
  onSelectRole?: (role: 'buyer' | 'merchant') => void;
  onSwitchRole?: () => void;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCity,
  onSelectCity,
  adsCount,
  onNavigateView,
  activeView,
  currentUser,
  onOpenSubscriptionModal,
  onOpenSettings,
  onSelectRole,
  onSwitchRole,
}) => {
  const { t, currentLangInfo, isRtl } = useLanguage();
  const isMerchant = currentUser?.role === 'merchant';

  return (
    <aside className="space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. Dedicated Dual Account Switcher Card */}
      <div className={`bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-black text-slate-800">
            {isRtl ? 'نوع الحساب (2 خيارات)' : 'Type de Compte'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {currentUser?.fullName}
          </span>
        </div>

        {/* 2 Big Account Choice Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-3 border border-slate-200">
          <button
            type="button"
            onClick={() => (onSelectRole ? onSelectRole('buyer') : onSwitchRole?.())}
            className={`p-2 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              !isMerchant
                ? 'bg-emerald-600 text-white font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[11px] leading-tight">
              {isRtl ? 'حساب الزبون' : 'Client'}
            </span>
            <span className="text-[9px] opacity-80 leading-none">
              {isRtl ? '(المشتري)' : '(Acheteur)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => (onSelectRole ? onSelectRole('merchant') : onSwitchRole?.())}
            className={`p-2 rounded-lg text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              isMerchant
                ? 'bg-blue-600 text-white font-black shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-bold'
            }`}
          >
            <Store className="w-4 h-4" />
            <span className="text-[11px] leading-tight">
              {isRtl ? 'حساب التاجر' : 'Vendeur'}
            </span>
            <span className="text-[9px] opacity-80 leading-none">
              {isRtl ? '(البائع)' : '(Commerçant)'}
            </span>
          </button>
        </div>

        {isMerchant ? (
          /* Merchant Details */
          <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100 text-xs space-y-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600 font-medium">باقة الاشتراك:</span>
              <span className="font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full text-[10px]">
                {currentUser?.hasActiveSubscription
                  ? currentUser.planId === 'vip'
                    ? 'باقة VIP ($45)'
                    : currentUser.planId === 'pro'
                    ? 'باقة المحترف ($30)'
                    : 'باقة البداية ($20)'
                  : 'غير مفعلة'}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              لديك صلاحية نشر الإعلانات ومتابعة إحصائيات الـ ADS واستقبال طلبيات الزبائن.
            </p>
            {!currentUser?.hasActiveSubscription && (
              <button
                onClick={onOpenSubscriptionModal}
                className="w-full mt-1 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                تفعيل الاشتراك لنشر الإعلانات
              </button>
            )}
          </div>
        ) : (
          /* Buyer Details */
          <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-100 text-xs space-y-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600 font-medium">الوضع النشط:</span>
              <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                مشتري معتمد
              </span>
            </div>
            <p className="text-[10px] text-slate-600 leading-tight">
              تصفح المنتجات والفيديوهات، اطلب عبر واتساب والدفع عند الاستلام مع تتبع شحن طلبياتك.
            </p>
            <button
              onClick={() => (onSelectRole ? onSelectRole('merchant') : onSwitchRole?.())}
              className="w-full mt-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Store className="w-3.5 h-3.5" />
              <span>ترقية إلى تاجر لعرض سلعك</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Navigation Pages Menu (Facebook Style Shortcuts) */}
      <div className={`bg-white rounded-xl border border-slate-200/80 p-3 shadow-xs ${isRtl ? 'text-right' : 'text-left'}`}>
        <span className="text-[11px] font-bold text-slate-400 block px-2 mb-2">
          {isRtl ? 'صفحات واختصارات المنصة' : 'Plateforme & Raccourcis'}
        </span>
        <div className="space-y-1">
          {/* Feed */}
          <button
            onClick={() => onNavigateView('feed')}
            className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
              activeView === 'feed'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs">
              ف
            </div>
            <span>{t('navFeed')}</span>
          </button>

          {/* Videos */}
          <button
            onClick={() => onNavigateView('videos')}
            className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
              activeView === 'videos'
                ? 'bg-rose-50 text-rose-700'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center text-xs">
              <Video className="w-3.5 h-3.5" />
            </div>
            <span>{t('navVideos')}</span>
          </button>

          {isMerchant ? (
            <>
              <button
                onClick={() => onNavigateView('dashboard')}
                className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === 'dashboard'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                </div>
                <span>{t('navDashboard')}</span>
              </button>

              <button
                onClick={() => onNavigateView('profile')}
                className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === 'profile'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs">
                  <Store className="w-3.5 h-3.5" />
                </div>
                <span>{t('navProfile')}</span>
              </button>

              <button
                onClick={() => onNavigateView('orders')}
                className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                  activeView === 'orders'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
                <span>{t('navCustomerOrders')}</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigateView('buyer_orders')}
              className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeView === 'buyer_orders'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span>{t('navMyOrders')}</span>
            </button>
          )}

          <button
            onClick={() => onNavigateView('pricing')}
            className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
              activeView === 'pricing'
                ? 'bg-amber-50 text-amber-800'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center text-xs">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
            <span>{t('navPlans')}</span>
          </button>

          {/* Creative Studio & Landing Page */}
          <button
            onClick={() => onNavigateView('creatives')}
            className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeView === 'creatives'
                ? 'bg-indigo-50 text-indigo-700 font-black'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">
                <Palette className="w-3.5 h-3.5" />
              </div>
              <span>صانع الكرياتيف واللاندينغ</span>
            </div>
            <span className="text-[9px] font-black bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded-md">
              جديد
            </span>
          </button>

          {/* Product Simulator & Accounting */}
          <button
            onClick={() => onNavigateView('simulator')}
            className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeView === 'simulator'
                ? 'bg-teal-50 text-teal-800 font-black'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center text-xs">
                <Calculator className="w-3.5 h-3.5" />
              </div>
              <span>محاكي الأرباح والمحاسبة</span>
            </div>
            <span className="text-[9px] font-black bg-teal-100 text-teal-700 px-1.5 py-0.2 rounded-md">
              جديد
            </span>
          </button>

          {/* Settings & Languages shortcut in sidebar */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between text-slate-700 hover:bg-slate-100 cursor-pointer border border-dashed border-slate-200 mt-2`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-slate-800 text-white flex items-center justify-center text-xs">
                  <Settings className="w-3.5 h-3.5" />
                </div>
                <span>{t('navSettings')}</span>
              </div>
              <span className="text-xs">{currentLangInfo.flag}</span>
            </button>
          )}
        </div>
      </div>

      {/* Categories Filter (Segmented navigation buttons) */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs">
        <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-slate-800">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>{t('categoriesHeading')}</span>
        </div>

        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (activeView !== 'feed' && activeView !== 'videos') onNavigateView('feed');
                }}
                className={`w-full ${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Moroccan Cities Filter */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-xs">
        <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-slate-800">
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>{t('citiesHeading')}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CITIES.map((city) => {
            const isActive = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => {
                  onSelectCity(city);
                  if (activeView !== 'feed' && activeView !== 'videos') onNavigateView('feed');
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>

      {/* Moroccan Commerce Trust Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 text-white shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('moroccanTrustHeading')}</span>
        </div>

        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>{t('trustCodText')}</span>
          </li>
          <li className="flex items-start gap-2">
            <RotateCcw className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span>{t('trustReturnText')}</span>
          </li>
          <li className="flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>{t('trustDeliveryText')}</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};
