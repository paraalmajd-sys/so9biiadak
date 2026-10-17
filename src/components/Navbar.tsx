import React, { useState, useRef, useEffect } from 'react';
import { UserAccount, SellerNotification } from '../types';
import { NotificationsDropdown } from './NotificationsDropdown';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, Language } from '../i18n/translations';
import {
  Search,
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
  Video,
  Globe,
  Settings,
  ChevronDown,
  Check,
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
  onOpenSettings: () => void;
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
  onOpenSettings,
}) => {
  const { t, language, setLanguage, currentLangInfo, isRtl } = useLanguage();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const isMerchant = currentUser?.role === 'merchant';

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLang = (code: Language) => {
    setLanguage(code);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onViewChange('feed')}
              className={`flex items-center gap-2 group cursor-pointer ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:bg-blue-700 transition-colors">
                {language === 'fr' || language === 'en' ? 'S' : 'س'}
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 whitespace-nowrap block">
                  {t('appName')}
                </span>
                <span className="text-[11px] font-semibold text-blue-600 block leading-none">
                  {t('appTagline')}
                </span>
              </div>
            </button>
          </div>

          {/* Search bar in center */}
          <div className="flex-1 max-w-sm hidden xl:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className={`w-full py-2 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-xs rounded-full border border-transparent focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 ${
                  isRtl ? 'pl-4 pr-10' : 'pr-4 pl-10'
                }`}
              />
              <Search
                className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                  isRtl ? 'right-3' : 'left-3'
                }`}
              />
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single line, whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-bold text-slate-600">
            {/* Feed */}
            <button
              onClick={() => onViewChange('feed')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
                activeView === 'feed'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent'
              }`}
            >
              {t('navFeed')}
            </button>

            {/* Video Watch / Reels page */}
            <button
              onClick={() => onViewChange('videos')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeView === 'videos'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-rose-500" />
              <span>{t('navVideos')}</span>
            </button>

            {/* Merchant Navigation Links */}
            {isMerchant ? (
              <>
                <button
                  onClick={() => onViewChange('dashboard')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeView === 'dashboard'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t('navDashboard')}</span>
                </button>

                <button
                  onClick={() => onViewChange('profile')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeView === 'profile'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-purple-600" />
                  <span>{t('navProfile')}</span>
                </button>

                <button
                  onClick={() => onViewChange('orders')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeView === 'orders'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('navCustomerOrders')}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                    {ordersCount}
                  </span>
                </button>
              </>
            ) : (
              /* Buyer Navigation Links */
              <button
                onClick={() => onViewChange('buyer_orders')}
                className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'buyer_orders'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent'
                }`}
              >
                <Package className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('navMyOrders')}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                  {ordersCount}
                </span>
              </button>
            )}

            {/* Pricing Plans */}
            <button
              onClick={() => onViewChange('pricing')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeView === 'pricing'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-amber-600'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('navPlans')}</span>
            </button>
          </nav>

          {/* Zone 3: Language Selector + Settings + Notification Bell + User Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Quick Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer border border-slate-200"
                title={t('settingsLanguageTab')}
              >
                <span className="text-sm select-none">{currentLangInfo.flag}</span>
                <span className="hidden md:inline font-bold">{currentLangInfo.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isLangMenuOpen && (
                <div
                  className={`absolute top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isRtl ? 'left-0' : 'right-0'
                  }`}
                >
                  <div className="px-3 py-1.5 text-[11px] font-black text-slate-400 border-b border-slate-100">
                    {t('settingsLanguageTab')}
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLang(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base select-none">{lang.flag}</span>
                          <span className="font-bold">{lang.nativeName}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({lang.name})
                          </span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    );
                  })}
                  <div className="pt-1 mt-1 border-t border-slate-100 px-2">
                    <button
                      onClick={() => {
                        setIsLangMenuOpen(false);
                        onOpenSettings();
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-blue-600 hover:bg-blue-50 rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>{t('settingsTitle')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Settings Button (Paramètres) */}
            <button
              onClick={onOpenSettings}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors relative cursor-pointer"
              title={t('settingsTitle')}
            >
              <Settings className="w-4 h-4 text-slate-600 hover:rotate-45 transition-transform" />
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors relative cursor-pointer"
                title="الإشعارات والليدات"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs tabular-nums animate-pulse">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              <NotificationsDropdown
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
                notifications={notifications}
                onMarkAllAsRead={onMarkAllNotificationsRead}
                onClearAll={onClearNotifications}
                onSelectNotification={(notif) => {
                  onSelectNotification(notif);
                  setIsNotifOpen(false);
                }}
              />
            </div>

            {/* User Account Capsule */}
            {currentUser && currentUser.isLoggedIn ? (
              <div className="flex items-center gap-1.5 p-1 pr-2 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-colors">
                <button
                  onClick={() => onViewChange(isMerchant ? 'profile' : 'buyer_orders')}
                  className={`flex items-center gap-1.5 cursor-pointer ${isRtl ? 'text-right' : 'text-left'}`}
                  title={isMerchant ? t('merchantAccount') : t('buyerAccount')}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`hidden sm:block leading-tight ${isRtl ? 'text-right' : 'text-left'}`}>
                    <span className="text-[11px] font-bold text-slate-900 block truncate max-w-[85px]">
                      {isMerchant ? currentUser.businessName : currentUser.fullName}
                    </span>
                    <span className={`text-[9px] font-black block ${isMerchant ? 'text-blue-600' : 'text-emerald-600'}`}>
                      {isMerchant ? t('merchantAccount') : t('buyerAccount')}
                    </span>
                  </div>
                </button>

                {/* Quick Role Switcher */}
                <button
                  onClick={onSwitchRole}
                  title="التبديل بين حساب التاجر وحساب المشتري"
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 shadow-2xs border border-slate-200 cursor-pointer hidden md:block"
                >
                  {t('switchAccount')}
                </button>

                <button
                  onClick={onLogout}
                  title={t('logout')}
                  className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>{t('loginRegister')}</span>
              </button>
            )}

            {/* Primary Action Button (Guard protected) */}
            <button
              onClick={onAttemptCreateAd}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t('btnPublishAd')}</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="flex items-center gap-1 py-2 overflow-x-auto lg:hidden border-t border-slate-100 text-xs font-bold">
          <button
            onClick={() => onViewChange('feed')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeView === 'feed' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {t('navFeed')}
          </button>

          <button
            onClick={() => onViewChange('videos')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 ${
              activeView === 'videos' ? 'bg-rose-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            <Video className="w-3 h-3" />
            <span>{t('navVideos')}</span>
          </button>

          {isMerchant ? (
            <>
              <button
                onClick={() => onViewChange('dashboard')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                  activeView === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
                }`}
              >
                {t('navDashboard')}
              </button>
              <button
                onClick={() => onViewChange('profile')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                  activeView === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
                }`}
              >
                {t('navProfile')}
              </button>
              <button
                onClick={() => onViewChange('orders')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                  activeView === 'orders' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
                }`}
              >
                {t('navCustomerOrders')} ({ordersCount})
              </button>
            </>
          ) : (
            <button
              onClick={() => onViewChange('buyer_orders')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                activeView === 'buyer_orders' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
              }`}
            >
              {t('navMyOrders')} ({ordersCount})
            </button>
          )}

          <button
            onClick={() => onViewChange('pricing')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              activeView === 'pricing' ? 'bg-blue-600 text-white' : 'text-amber-700 bg-amber-50'
            }`}
          >
            {t('navPlans')}
          </button>
          <button
            onClick={onOpenSaved}
            className="px-3 py-1.5 rounded-lg whitespace-nowrap text-slate-600 bg-slate-100"
          >
            {t('navSaved')} ({savedCount})
          </button>

          {/* Settings in mobile bar */}
          <button
            onClick={onOpenSettings}
            className="px-3 py-1.5 rounded-lg whitespace-nowrap text-slate-700 bg-slate-200/80 flex items-center gap-1"
          >
            <Settings className="w-3 h-3" />
            <span>{t('settingsTitle')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
