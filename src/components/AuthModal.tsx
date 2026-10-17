import React, { useState } from 'react';
import { UserAccount } from '../types';
import { CITIES, DEFAULT_MERCHANT_ACCOUNT, DEFAULT_BUYER_ACCOUNT } from '../data/mockData';
import {
  X,
  Lock,
  Mail,
  Phone,
  Store,
  User,
  MapPin,
  CheckCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  currentUser: UserAccount | null;
  initialRole?: 'buyer' | 'merchant';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
  initialRole = 'merchant',
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [role, setRole] = useState<'buyer' | 'merchant'>(initialRole);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('الدار البيضاء');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      role,
      fullName: fullName.trim() || (role === 'merchant' ? 'تاجر سوق في يدك' : 'مشتري جديد'),
      email: email.trim(),
      businessName: role === 'merchant' ? (businessName.trim() || 'متجر سوق في يدك التجاري') : undefined,
      phone: phone.trim() || '0612345678',
      whatsapp: phone.trim().startsWith('+') ? phone.trim() : `+212${(phone.trim() || '0612345678').replace(/^0/, '')}`,
      city,
      avatar:
        role === 'merchant'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      planId: role === 'merchant' ? 'none' : 'none',
      hasActiveSubscription: false,
      verified: role === 'merchant',
      isLoggedIn: true,
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleQuickDemoSwitch = (targetRole: 'buyer' | 'merchant') => {
    if (targetRole === 'merchant') {
      onLoginSuccess(DEFAULT_MERCHANT_ACCOUNT);
    } else {
      onLoginSuccess(DEFAULT_BUYER_ACCOUNT);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 text-right animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${role === 'merchant' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
              {role === 'merchant' ? <Store className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {mode === 'register' ? 'إنشاء حساب جديد في SO9FIADAK' : 'تسجيل الدخول إلى حسابك'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {role === 'merchant' ? 'حساب تاجر لنشر الإعلانات وإدارة المبيعات' : 'حساب مشتري عادي للتسوق وتتبع الطلبيات'}
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

        {/* Quick Demo Switcher Strip */}
        <div className="p-3 bg-amber-50/80 border-b border-amber-200/70 flex items-center justify-between text-xs">
          <span className="font-bold text-amber-900">تجربة فورية بضغطة زر:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoSwitch('merchant')}
              className="px-2.5 py-1 bg-blue-600 text-white rounded-md font-bold text-[11px] hover:bg-blue-700 transition-colors cursor-pointer"
            >
              دخول كـ تاجر
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoSwitch('buyer')}
              className="px-2.5 py-1 bg-emerald-600 text-white rounded-md font-bold text-[11px] hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              دخول كـ مشتري
            </button>
          </div>
        </div>

        {/* 1. Account Role Selector (Buyer vs Merchant) */}
        <div className="p-4 border-b border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            اختر نوع الحساب الذي ترغب في استخدامه:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Buyer Card */}
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                role === 'buyer'
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-slate-900">مستخدم / مشتري</span>
                <User className={`w-4 h-4 ${role === 'buyer' ? 'text-emerald-600' : 'text-slate-400'}`} />
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                تصفح السلع، الشراء عبر واتساب أو الدفع عند الاستلام، وتتبع مشترياتك.
              </p>
            </button>

            {/* Merchant Card */}
            <button
              type="button"
              onClick={() => setRole('merchant')}
              className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                role === 'merchant'
                  ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-slate-900">تاجر / بائع معتمد</span>
                <Store className={`w-4 h-4 ${role === 'merchant' ? 'text-blue-600' : 'text-slate-400'}`} />
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                نشر الإعلانات، لوحة التحكم، استلام الليدات والاشتراك في الباقات ($20-$45).
              </p>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Inscription / Connexion */}
        <div className="grid grid-cols-2 p-2 bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            حساب جديد
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-xs font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            تسجيل الدخول
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                الاسم الكامل <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثلاً: كريم التازي"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          {mode === 'register' && role === 'merchant' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                اسم المتجر أو العلامة التجارية <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="مثلاً: متجر فاس الأصيل أو Electro Casa"
                  className="w-full pr-8 pl-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
                />
                <Store className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              البريد الإلكتروني <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full pr-8 pl-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              رقم الهاتف المغربي / الواتساب <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0612345678"
                className="w-full pr-8 pl-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                المدينة <span className="text-rose-500">*</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              >
                {CITIES.filter((c) => c !== 'كل المدن').map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              كلمة المرور <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-8 pl-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {role === 'merchant' && mode === 'register' && (
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              ⚠️ <strong>تنبيه للتجار:</strong> لنشر إعلانات السلع في سوق في يدك، يجب تفعيل إحدى باقات الاشتراك ($20، $30، أو $45) بعد التسجيل.
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2.5 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer ${
              role === 'merchant'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {mode === 'register'
              ? role === 'merchant' ? 'إنشاء حساب تاجر وبائع' : 'إنشاء حساب مشتري'
              : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
};
