import React from 'react';
import { CustomerOrder, UserAccount } from '../types';
import { ShoppingBag, Truck, CheckCircle2, Clock, MapPin, Phone, MessageCircle } from 'lucide-react';

interface BuyerOrdersViewProps {
  orders: CustomerOrder[];
  currentUser: UserAccount | null;
  onGoToFeed: () => void;
}

export const BuyerOrdersView: React.FC<BuyerOrdersViewProps> = ({
  orders,
  currentUser,
  onGoToFeed,
}) => {
  return (
    <div className="space-y-5 max-w-4xl mx-auto py-4 text-right">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 justify-end sm:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-500">
              سجل المشتريات والطلبيات (Mes Commandes)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            طلبيات الزبون: {currentUser?.fullName || 'المستخدم'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            تتبع شحن سلعك مع شركات التوصيل السريع بالمغرب (الدفع عند الاستلام).
          </p>
        </div>

        <button
          onClick={onGoToFeed}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          تصفح المزيد من الإعلانات
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">لا توجد لديك طلبيات حتى الآن</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            تصفح إعلانات المنتجات في الفيد الرئيسي واطلب بضغطة زر واحدة مع الدفع عند الاستلام.
          </p>
          <button
            onClick={onGoToFeed}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            الذهاب إلى إعلانات المنتجات
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:shadow-sm transition-shadow space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 text-xs">
                    #{ord.id}
                  </span>
                  <span>·</span>
                  <span className="text-xs text-slate-400">{ord.createdAt}</span>
                </div>

                {/* Status Badge */}
                <div>
                  {ord.status === 'delivered' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تم التسليم والاستلام بنجاح</span>
                    </span>
                  )}
                  {ord.status === 'shipping' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      <Truck className="w-3.5 h-3.5 animate-bounce" />
                      <span>في الطريق مع الموزع (24-48h)</span>
                    </span>
                  )}
                  {ord.status === 'pending' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      <span>قيد التأكيد والمعالجة</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex items-center gap-3">
                <img
                  src={ord.productImage}
                  alt={ord.productTitle}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {ord.productTitle}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>الكمية: <strong className="text-slate-800 tabular-nums">{ord.quantity}</strong></span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{ord.city} - {ord.address}</span>
                    </span>
                  </div>
                </div>

                <div className="text-left shrink-0">
                  <div className="text-base font-black text-rose-600 tabular-nums">
                    {ord.totalPrice} {ord.currency}
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    الدفع عند الاستلام
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
