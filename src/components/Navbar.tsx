import React, { useState, useRef, useEffect } from 'react';
import { UserAccount, SellerNotification } from '../types';
import { NotificationsDropdown } from './NotificationsDropdown';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, Language } from '../i18n/translations';
import {
  Search,
  X,
  Menu,
  Layers,
  Sparkles,
  Video,
  PlusCircle,
  Bookmark,
  LayoutDashboard,
  Store,
  ShoppingBag,
  Bell,
  CreditCard,
  User,
  LogOut,
  Package,
  Globe,
  Settings,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  ordersCount: number;
  onOpenSaved: () => void;
  onAttemptCreateAd: () => void;
  activeView: 'feed' | 'videos' | 'dashboard' | 'profile' | 'orders' | 'deals' | 'cities' | 'pricing' | 'buyer_orders';
  onViewChange: (view: 'feed' | 'videos' | 'dashboard' | 'profile' | 'orders' | 'deals' | 'cities' | 'pricing' | 'buyer_orders') => void;
  currentUser: UserAccount | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  notifications: SellerNotification[];
  onMarkAllNotificationsRead: () => void;
  onClearNotifications: () => void;
  onSelectNotification: (notif: SellerNotification) => void;
  onSwitchRole: () => void;
  onSelectRole?: (role: 'buyer' | 'merchant') => void;
  onOpenSettings: () => void;
  onOpenStories?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  savedCount,
  ordersCount,
  onOpenSaved,
  onAttemptCreateAd,
  activeView,
  onViewChange,
  currentUser,
  onOpenAuth,
  onLogout,
  notifications,
  onMarkAllNotificationsRead,
  onClearNotifications,
  onSelectNotification,
  onSwitchRole,
  onSelectRole,
  onOpenSettings,
  onOpenStories,
}) => {
  const { t, language, setLanguage, currentLangInfo, isRtl } = useLanguage();
  const [isGroupedMenuOpen, setIsGroupedMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const groupedMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const isMerchant = currentUser?.role === 'merchant';

  // Close grouped menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (groupedMenuRef.current && !groupedMenuRef.current.contains(event.target as Node)) {
        setIsGroupedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLang = (code: Language) => {
    setLanguage(code);
  };

  const handleRoleChange = (role: 'buyer' | 'merchant') => {
    if (onSelectRole) {
      onSelectRole(role);
    } else {
      onSwitchRole();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
          
          {/* 1. LOGO DIAL STZ (Site Logo) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onViewChange('feed');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-2 group cursor-pointer ${isRtl ? 'text-right' : 'text-left'}`}
              title="الرئيسية - سوق في يدك"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
                {language === 'fr' || language === 'en' ? 'S' : 'س'}
              </div>
              <div className="hidden xs:block sm:block">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 block leading-tight">
                  {t('appName')}
                </span>
                <span className="text-[10px] font-bold text-blue-600 block leading-none">
                  {t('appTagline')}
                </span>
              </div>
            </button>
          </div>

          {/* 2. RECHERCHE (Search bar in center) */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-1 sm:mx-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className={`w-full py-2 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-xs rounded-full border border-slate-200/80 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 shadow-2xs ${
                  isRtl ? 'pl-8 pr-9' : 'pr-8 pl-9'
                }`}
              />
              <Search
                className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                  isRtl ? 'right-3' : 'left-3'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer ${
                    isRtl ? 'left-2.5' : 'right-2.5'
                  }`}
                  title="مسح البحث"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. CORE TABS: LES POSTS, STORIES, REELS */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Tab 1: LES POSTS (المنشورات) */}
            <button
              type="button"
              onClick={() => {
                onViewChange('feed');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeView === 'feed' || activeView === 'deals' || activeView === 'cities'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200/80'
              }`}
              title="المنشورات والإعلانات الرئيسية (Feed / Posts)"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('navPosts')}</span>
            </button>

            {/* Tab 2: STORIES (الستوريات) */}
            <button
              type="button"
              onClick={() => {
                if (onOpenStories) {
                  onOpenStories();
                } else {
                  onViewChange('feed');
                }
              }}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer bg-slate-100 hover:bg-amber-50 text-slate-800 hover:text-amber-800 border border-transparent hover:border-amber-200"
              title="ستوريات وقصص المنتجات (Stories)"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                <div className="bg-white rounded-full p-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-rose-500" />
                </div>
              </div>
              <span className="hidden sm:inline">{t('navStories')}</span>
            </button>

            {/* Tab 3: REELS (الريلز / الفيديوهات) */}
            <button
              type="button"
              onClick={() => onViewChange('videos')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeView === 'videos'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200/80'
              }`}
              title="فيديوهات وريلز المنتجات (Reels)"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('navReels')}</span>
            </button>

            {/* 4. MUNI MKHMO3 (Grouped Menu Button & Dropdown) */}
            <div className="relative" ref={groupedMenuRef}>
              <button
                type="button"
                onClick={() => setIsGroupedMenuOpen(!isGroupedMenuOpen)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                  isGroupedMenuOpen
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200/90'
                }`}
                title="القائمة الشاملة (Menu مجموع)"
              >
                <Menu className="w-4 h-4" />
                {currentUser?.isLoggedIn ? (
                  <div className="flex items-center gap-1.5">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullName}
                      className="w-5 h-5 rounded-full object-cover border border-slate-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="hidden md:inline font-bold">
                      {isMerchant ? 'تاجر' : 'زبون'}
                    </span>
                  </div>
                ) : (
                  <span className="hidden sm:inline">{t('navMenu')}</span>
                )}
                {unreadNotifsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>

              {/* Grouped Menu Dropdown Panel (MUNI MKHMO3) */}
              {isGroupedMenuOpen && (
                <div
                  className={`absolute top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isRtl ? 'left-0' : 'right-0'
                  }`}
                >
                  {/* Card 1: Dual Account Switcher (حساب الزبون vs حساب التاجر) */}
                  <div className="px-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black text-slate-800">
                        {isRtl ? 'نوع الحساب النشط' : 'Type de Compte'}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isMerchant ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {isMerchant ? '💼 حساب التاجر' : '🛒 حساب الزبون'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          handleRoleChange('buyer');
                          setIsGroupedMenuOpen(false);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs ${
                          !isMerchant
                            ? 'bg-emerald-600 text-white font-black shadow-xs'
                            : 'text-slate-700 hover:bg-white/60 font-bold'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'زبون' : 'Client'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleRoleChange('merchant');
                          setIsGroupedMenuOpen(false);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs ${
                          isMerchant
                            ? 'bg-blue-600 text-white font-black shadow-xs'
                            : 'text-slate-700 hover:bg-white/60 font-bold'
                        }`}
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'تاجر' : 'Vendeur'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Primary Action Button: Publish Ad */}
                  <div className="px-3 py-2 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsGroupedMenuOpen(false);
                        onAttemptCreateAd();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{t('btnPublishAd')}</span>
                    </button>
                  </div>

                  {/* Navigation Links inside Grouped Menu */}
                  <div className="py-1 px-1.5 space-y-0.5 text-xs font-bold text-slate-700">
                    {/* Orders (Buyer or Merchant) */}
                    {isMerchant ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsGroupedMenuOpen(false);
                            onViewChange('dashboard');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                            activeView === 'dashboard' ? 'bg-blue-50 text-blue-700 font-black' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <LayoutDashboard className="w-4 h-4 text-blue-600" />
                            <span>{t('navDashboard')}</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsGroupedMenuOpen(false);
                            onViewChange('profile');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                            activeView === 'profile' ? 'bg-purple-50 text-purple-700 font-black' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Store className="w-4 h-4 text-purple-600" />
                            <span>{t('navProfile')}</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsGroupedMenuOpen(false);
                            onViewChange('orders');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                            activeView === 'orders' ? 'bg-emerald-50 text-emerald-700 font-black' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <ShoppingBag className="w-4 h-4 text-emerald-600" />
                            <span>{t('navCustomerOrders')}</span>
                          </div>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                            {ordersCount}
                          </span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setIsGroupedMenuOpen(false);
                          onViewChange('buyer_orders');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                          activeView === 'buyer_orders' ? 'bg-emerald-50 text-emerald-700 font-black' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-emerald-600" />
                          <span>{t('navMyOrders')}</span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                          {ordersCount}
                        </span>
                      </button>
                    )}

                    {/* Pricing Plans */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsGroupedMenuOpen(false);
                        onViewChange('pricing');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                        activeView === 'pricing' ? 'bg-amber-50 text-amber-800 font-black' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-amber-500" />
                        <span>{t('navPlans')}</span>
                      </div>
                      <span className="text-[10px] text-amber-700 font-black bg-amber-100 px-1.5 py-0.5 rounded-md">
                        $20 - $45
                      </span>
                    </button>

                    {/* Saved Ads */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsGroupedMenuOpen(false);
                        onOpenSaved();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bookmark className="w-4 h-4 text-blue-500" />
                        <span>{t('navSaved')}</span>
                      </div>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                        {savedCount}
                      </span>
                    </button>

                    {/* Notifications button */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsNotifOpen(!isNotifOpen);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Bell className="w-4 h-4 text-rose-500" />
                        <span>الإشعارات والليدات</span>
                      </div>
                      {unreadNotifsCount > 0 ? (
                        <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                          {unreadNotifsCount}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">0</span>
                      )}
                    </button>
                  </div>

                  {/* Nested Notifications Dropdown if open */}
                  {isNotifOpen && (
                    <div className="px-2 pt-1 pb-2 border-t border-slate-100">
                      <NotificationsDropdown
                        isOpen={isNotifOpen}
                        onClose={() => setIsNotifOpen(false)}
                        notifications={notifications}
                        onMarkAllAsRead={onMarkAllNotificationsRead}
                        onClearAll={onClearNotifications}
                        onSelectNotification={(notif) => {
                          onSelectNotification(notif);
                          setIsNotifOpen(false);
                          setIsGroupedMenuOpen(false);
                        }}
                      />
                    </div>
                  )}

                  {/* Languages Selector Row */}
                  <div className="px-3 pt-2 pb-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Globe className="w-3 h-3 text-slate-400" />
                        <span>{t('settingsLanguageTab')}</span>
                      </span>
                      <span className="text-[10px] font-bold text-blue-600">
                        {currentLangInfo.nativeName}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => handleSelectLang(lang.code)}
                            className={`py-1 px-1 rounded-lg text-center text-[10px] font-black transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                            title={lang.name}
                          >
                            <span className="block text-xs">{lang.flag}</span>
                            <span className="block truncate">{lang.nativeName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Settings & Auth */}
                  <div className="pt-1.5 px-2 border-t border-slate-100 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsGroupedMenuOpen(false);
                        onOpenSettings();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-slate-500" />
                        <span>{t('settingsTitle')}</span>
                      </div>
                      <ChevronLeft className={`w-3.5 h-3.5 text-slate-400 ${isRtl ? '' : 'rotate-180'}`} />
                    </button>

                    {currentUser && currentUser.isLoggedIn ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsGroupedMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logout')} ({currentUser.fullName})</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setIsGroupedMenuOpen(false);
                          onOpenAuth();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-blue-400" />
                        <span>{t('loginRegister')}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
