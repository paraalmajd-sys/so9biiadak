import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, Language } from '../i18n/translations';
import { UserAccount } from '../types';
import {
  X,
  Globe,
  Settings,
  DollarSign,
  Bell,
  Volume2,
  Check,
  ShieldCheck,
  User,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onSwitchRole: () => void;
  onShowToast: (msg: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSwitchRole,
  onShowToast,
}) => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    notificationsEnabled,
    setNotificationsEnabled,
    soundAlerts,
    setSoundAlerts,
    t,
    isRtl,
  } = useLanguage();

  const [activeTab, setActiveTab] = useState<'language' | 'currency' | 'notifications'>('language');

  if (!isOpen) return null;

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    onShowToast(
      code === 'ar'
        ? 'تم تفعيل اللغة العربية الفصحى بنجاح'
        : code === 'darija'
        ? 'تم تفعيل الدارجة المغربية · بصحتك السلعة!'
        : code === 'fr'
        ? 'Langue française activée avec succès !'
        : 'English language successfully activated!'
    );
  };

  const handleSaveAndClose = () => {
    onShowToast(t('settingsSavedToast'));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Settings className="w-5 h-5 animate-[spin_6s_linear_infinite]" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>{t('settingsTitle')}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Paramètres
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{t('settingsSubtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-100 flex gap-2 pt-2 bg-slate-50/50 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('language')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'language'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t('settingsLanguageTab')}</span>
            <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.2 rounded-full font-bold">
              4
            </span>
          </button>

          <button
            onClick={() => setActiveTab('currency')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'currency'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{t('settingsGeneralTab')}</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'notifications'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{t('settingsNotificationsTab')}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: LANGUAGE SELECTION */}
          {activeTab === 'language' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>{t('chooseLanguage')}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">{t('chooseLanguageDesc')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isCurrent = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`relative text-start p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl select-none">{lang.flag}</span>
                          <div>
                            <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                              <span>{lang.nativeName}</span>
                              {lang.code === 'ar' && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                                  الأساسية
                                </span>
                              )}
                              {lang.code === 'darija' && (
                                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                                  مغربية 🇲🇦
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-semibold block">
                              {lang.name}
                            </span>
                          </div>
                        </div>

                        {isCurrent ? (
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-slate-300 shrink-0" />
                        )}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="line-clamp-1">{lang.description}</span>
                        <span className="shrink-0 font-mono text-[9px] uppercase px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-bold">
                          {lang.dir.toUpperCase()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Language Notice */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-amber-900 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">ملاحظة حول اللغة:</span>
                  <span>
                    يتم حفظ لغتك المفضلة تلقائياً وتطبيقها فوراً على اتجاه الشاشة (RTL / LTR) وكافة تفاصيل المتجر والطلبيات.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GENERAL & CURRENCY */}
          {activeTab === 'currency' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>{t('currencyPreference')}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">{t('currencyDesc')}</p>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button
                    onClick={() => setCurrency('MAD')}
                    className={`p-3.5 rounded-xl border-2 text-start transition-all cursor-pointer ${
                      currency === 'MAD'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900">{t('currencyMAD')}</span>
                      {currency === 'MAD' && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">
                      مثال: 349 د.م (العملة الأساسية بالمغرب)
                    </span>
                  </button>

                  <button
                    onClick={() => setCurrency('USD')}
                    className={`p-3.5 rounded-xl border-2 text-start transition-all cursor-pointer ${
                      currency === 'USD'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900">{t('currencyUSD')}</span>
                      {currency === 'USD' && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">
                      مثال: $35 (للتسعير الدولي والباقات)
                    </span>
                  </button>
                </div>
              </div>

              {/* Current Account Summary in settings */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {currentUser?.fullName} ({currentUser?.role === 'merchant' ? t('merchantAccount') : t('buyerAccount')})
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {currentUser?.email} · {currentUser?.city}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onSwitchRole}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  >
                    {t('switchAccount')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span>{t('settingsNotificationsTab')}</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  تحكم في تنبيهات وصول الطلبيات الجديدة ورسائل الواتساب
                </p>
              </div>

              {/* Notification Toggle 1 */}
              <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="pr-2">
                  <span className="text-sm font-bold text-slate-900 block">
                    {t('autoNotifications')}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    {t('autoNotificationsDesc')}
                  </span>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    notificationsEnabled ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      notificationsEnabled
                        ? isRtl
                          ? '-translate-x-7'
                          : 'translate-x-7'
                        : isRtl
                        ? '-translate-x-1'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Notification Toggle 2: Sound chimes */}
              <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="pr-2">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>{t('soundAlerts')}</span>
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    {t('soundAlertsDesc')}
                  </span>
                </div>
                <button
                  onClick={() => setSoundAlerts(!soundAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    soundAlerts ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      soundAlerts
                        ? isRtl
                          ? '-translate-x-7'
                          : 'translate-x-7'
                        : isRtl
                        ? '-translate-x-1'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <span>{t('activeLanguage')}:</span>
            <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              {t('closeSettings')}
            </button>
            <button
              onClick={handleSaveAndClose}
              className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t('saveChanges')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
