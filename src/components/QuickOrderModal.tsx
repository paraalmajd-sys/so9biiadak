import React, { useState } from 'react';
import { ProductAd, CustomerOrder } from '../types';
import { CITIES } from '../data/mockData';
import {
  X,
  CheckCircle,
  Truck,
  ShieldCheck,
  PhoneCall,
  ShoppingBag,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface QuickOrderModalProps {
  ad: ProductAd | null;
  onClose: () => void;
  onOrderSuccess?: (order: CustomerOrder) => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  ad,
  onClose,
  onOrderSuccess,
}) => {
  const { t, formatPrice, isRtl } = useLanguage();
  if (!ad) return null;

  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(ad.city || 'الدار البيضاء');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const totalPrice = ad.price * quantity;

  const handleConfirmCOD = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('المرجو ملء جميع المعلومات المطلوبة (الاسم، الهاتف، العنوان)');
      return;
    }
    const generatedId = `SO9-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    setErrorMsg('');

    if (onOrderSuccess) {
      onOrderSuccess({
        id: generatedId,
        adId: ad.id,
        productTitle: ad.title,
        productImage: ad.images[0],
        customerName: fullName.trim(),
        phone: phone.trim(),
        city,
        address: address.trim(),
        quantity,
        totalPrice,
        currency: ad.currency,
        createdAt: 'الآن',
        status: 'pending',
        notes: notes.trim(),
      });
    }
  };

  const handleWhatsAppOrder = () => {
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('يرجى إدخال اسمك ورقم هاتفك أولاً');
      return;
    }

    const generatedId = `SO9-${Math.floor(100000 + Math.random() * 900000)}`;

    const message = `*طلب جديد من تطبيق SO9FIADAK (سوق في يدك)* 🛍️
-----------------------------------
📦 *المنتج:* ${ad.title}
🔢 *الكمية:* ${quantity}
💰 *المجموع:* ${totalPrice} ${ad.currency} (توصيل بالمجان)
💵 *طريقة الدفع:* الدفع عند الاستلام (COD)
-----------------------------------
👤 *الزبون:* ${fullName}
📞 *الهاتف:* ${phone}
📍 *المدينة:* ${city}
🏠 *العنوان:* ${address || 'سيتم تأكيده عبر الهاتف'}
${notes ? `📝 *ملاحظة:* ${notes}` : ''}
-----------------------------------
المرجو تأكيد توفر المنتج وتاريخ الإرسال شكراً!`;

    if (onOrderSuccess) {
      onOrderSuccess({
        id: generatedId,
        adId: ad.id,
        productTitle: ad.title,
        productImage: ad.images[0],
        customerName: fullName.trim(),
        phone: phone.trim(),
        city,
        address: address.trim() || 'عبر الواتساب',
        quantity,
        totalPrice,
        currency: ad.currency,
        createdAt: 'الآن',
        status: 'pending',
        notes: 'طلب مباشر عبر واتساب',
      });
    }

    const cleanNum = ad.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {orderConfirmed ? t('orderSuccessTitle') : t('quickOrderTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {ad.brandName} · {t('quickOrderSubtitle')}
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

        {orderConfirmed ? (
          /* Confirmation Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 block mb-1">
                تهانينا! تم تسجيل طلبيتك
              </span>
              <h4 className="text-xl font-black text-slate-900">
                شكراً لك يا {fullName}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                رقم التتبع الخاص بك هو:{' '}
                <span className="font-mono font-bold text-blue-600 text-sm">
                  #{orderId}
                </span>
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-right space-y-2 text-xs text-slate-700">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">المنتج:</span>
                <span className="font-bold text-slate-900 line-clamp-1">
                  {ad.title}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">الكمية:</span>
                <span className="font-bold tabular-nums">{quantity} قطع</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">المجموع الواجب أداؤه:</span>
                <span className="font-black text-rose-600 text-sm tabular-nums">
                  {totalPrice} {ad.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">العنوان:</span>
                <span className="font-medium text-slate-900">
                  {city} - {address}
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/70 text-right flex items-center gap-2.5 text-xs text-amber-900">
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                سيتصل بك فريق خدمة الزبائن في غضون ساعتين لتأكيد الإرسال. التوصيل
                يستغرق 24 إلى 48 ساعة فقط والدفع عند الاستلام.
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              العودة إلى إعلانات سوق في يدك
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleConfirmCOD} className="p-5 space-y-4">
            {/* Product Summary */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <img
                src={ad.images[0]}
                alt={ad.title}
                className="w-14 h-14 object-cover rounded-lg shrink-0 border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 text-right min-w-0">
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {ad.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-black text-rose-600 tabular-nums">
                    {ad.price} {ad.currency}
                  </span>
                  {ad.originalPrice > ad.price && (
                    <span className="text-xs text-slate-400 line-through tabular-nums">
                      {ad.originalPrice} {ad.currency}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-6 text-center text-xs font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-medium text-right">
                {errorMsg}
              </div>
            )}

            {/* Inputs */}
            <div className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('fullNameLabel')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('fullNamePlaceholder')}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('phoneLabel')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('cityLabel')} <span className="text-rose-500">*</span>
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
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('addressLabel')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('addressPlaceholder')}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Total breakdown */}
            <div className="pt-2 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{t('freeShipping')}:</span>
                <span className="font-bold text-emerald-600">0 DH (Gratuit)</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-dashed border-slate-200">
                <span>{t('orderTotalLabel')}</span>
                <span className="text-rose-600 text-base tabular-nums">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>{t('confirmCodBtn')}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('orderViaWhatsappBtn')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
