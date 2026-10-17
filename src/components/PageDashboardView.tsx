import React, { useState } from 'react';
import { AdCampaign, CustomerOrder, PageProfile } from '../types';
import {
  TrendingUp,
  Users,
  MousePointer,
  MessageCircle,
  ShoppingBag,
  DollarSign,
  Play,
  Pause,
  PlusCircle,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

interface PageDashboardViewProps {
  profile: PageProfile;
  campaigns: AdCampaign[];
  orders: CustomerOrder[];
  onToggleCampaignStatus: (campId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;
  onOpenCreateAd: () => void;
}

export const PageDashboardView: React.FC<PageDashboardViewProps> = ({
  profile,
  campaigns,
  orders,
  onToggleCampaignStatus,
  onUpdateOrderStatus,
  onOpenCreateAd,
}) => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'orders' | 'analytics'>('campaigns');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'shipping' | 'delivered'>('all');

  // Aggregated real statistics
  const totalReach = campaigns.reduce((acc, c) => acc + c.reach, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalWhatsApp = campaigns.reduce((acc, c) => acc + c.whatsappMessages, 0);
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.totalPrice, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const roas = totalSpent > 0 ? (totalRevenue / totalSpent).toFixed(1) : '4.6';

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      {/* Top Banner / Dashboard Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
          <div>
            <div className="flex items-center gap-2 mb-1 justify-end sm:justify-start">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-500">
                لوحة إعلانات فيسبوك وسوق في يدك (Ads Manager & Store Dashboard)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              لوحة تحكم إعلانات صفحة: {profile.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              تتبع مباشر للوصول، نقرات الإعلانات، رسائل الواتساب، وطلبيات الزبائن لجميع المدن المغربية.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCreateAd}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إطلاق إعلان منتج جديد (Boost)</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Performance KPI Cards (Zero-pill discipline, tabular numerals) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-5 mt-4 border-t border-slate-100">
          {/* 1. Reach */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-right">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">الوصول الإجمالي (Reach)</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              {totalReach.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1 justify-end">
              <span>+18.4% هذا الأسبوع</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          {/* 2. Link Clicks */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-right">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">النقرات على الإعلان (Clicks)</span>
              <MousePointer className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              {totalClicks.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              متوسط CPC:{' '}
              <span className="font-bold text-slate-700 tabular-nums">
                1.04 DH
              </span>
            </div>
          </div>

          {/* 3. WhatsApp Messages */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-right">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">محادثات واتساب (WhatsApp)</span>
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 tabular-nums">
              {totalWhatsApp.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              معدل رد البائع:{' '}
              <span className="font-bold text-slate-700">100% فورياً</span>
            </div>
          </div>

          {/* 4. Orders & Revenue */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-right">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-medium">المبيعات الإجمالية (COD)</span>
              <DollarSign className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              {totalRevenue.toLocaleString()} DH
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              عائد الإنفاق ROAS:{' '}
              <span className="font-bold tabular-nums">{roas}x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'campaigns'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>حملات الإعلانات الممولة ({campaigns.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>إدارة طلبيات الزبائن ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>إحصائيات الجمهور والمدن</span>
        </button>
      </div>

      {/* TAB 1: Campaigns Table */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between text-right">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                الحملات الإعلانية النشطة والمتوقفة
              </h2>
              <p className="text-xs text-slate-500">
                يمكنك إيقاف أو تشغيل أي إعلان بنقرة زر واحدة للتحكم في الميزانية اليومية
              </p>
            </div>
            <button
              onClick={onOpenCreateAd}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              + إضافة إعلان جديد
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">الإعلان والمنتج</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4">الميزانية اليومية</th>
                  <th className="py-3 px-4">الوصول (Reach)</th>
                  <th className="py-3 px-4">النقرات (Clicks)</th>
                  <th className="py-3 px-4">واتساب</th>
                  <th className="py-3 px-4">الطلبات</th>
                  <th className="py-3 px-4">التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Title + Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={camp.productImage}
                          alt={camp.title}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block truncate max-w-xs">
                            {camp.title}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            بدأت في: {camp.startDate}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {camp.status === 'active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>نشط (Active)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>متوقف (Paused)</span>
                        </span>
                      )}
                    </td>

                    {/* Budget */}
                    <td className="py-3 px-4 font-bold text-slate-800 tabular-nums">
                      {camp.dailyBudget} DH / يوم
                    </td>

                    {/* Reach */}
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-700">
                      {camp.reach.toLocaleString()}
                    </td>

                    {/* Clicks */}
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-700">
                      {camp.clicks.toLocaleString()}
                    </td>

                    {/* WhatsApp */}
                    <td className="py-3 px-4 font-bold text-emerald-600 font-mono tabular-nums">
                      {camp.whatsappMessages}
                    </td>

                    {/* Orders */}
                    <td className="py-3 px-4 font-bold text-slate-900 font-mono tabular-nums">
                      {camp.ordersCount} طلب
                    </td>

                    {/* Control Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onToggleCampaignStatus(camp.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                          camp.status === 'active'
                            ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                      >
                        {camp.status === 'active' ? (
                          <>
                            <Pause className="w-3 h-3" />
                            <span>إيقاف</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3" />
                            <span>تفعيل</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                طلبيات الزبائن الواردة من الإعلانات
              </h2>
              <p className="text-xs text-slate-500">
                تأكيد ومتابعة شحن الطلبيات مع الموزعين والتواصل المباشر مع الزبون
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              <button
                onClick={() => setOrderStatusFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  orderStatusFilter === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                الكل ({orders.length})
              </button>
              <button
                onClick={() => setOrderStatusFilter('pending')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  orderStatusFilter === 'pending'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                قيد المعالجة
              </button>
              <button
                onClick={() => setOrderStatusFilter('shipping')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  orderStatusFilter === 'shipping'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                في الطريق
              </button>
              <button
                onClick={() => setOrderStatusFilter('delivered')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  orderStatusFilter === 'delivered'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                تم التسليم
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">رقم الطلب والتاريخ</th>
                  <th className="py-3 px-4">الزبون والهاتف</th>
                  <th className="py-3 px-4">المدينة والعنوان</th>
                  <th className="py-3 px-4">المنتج والكمية</th>
                  <th className="py-3 px-4">المبلغ الواجب أداؤه</th>
                  <th className="py-3 px-4">حالة الطلبية</th>
                  <th className="py-3 px-4">تواصل واتساب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => {
                  const customerWhatsAppUrl = `https://wa.me/212${ord.phone.replace(/^0/, '')}?text=${encodeURIComponent(
                    `السلام عليكم ${ord.customerName}، معكم متجر SO9FIADAK بخصوص طلبيتكم رقم #${ord.id} لمنتج: ${ord.productTitle}.`
                  )}`;

                  return (
                    <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* ID */}
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-blue-600 block">
                          #{ord.id}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {ord.createdAt}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">
                          {ord.customerName}
                        </span>
                        <span className="font-mono text-slate-500 text-[11px]">
                          {ord.phone}
                        </span>
                      </td>

                      {/* City & Address */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-800 block">
                          {ord.city}
                        </span>
                        <span className="text-slate-500 text-[11px] block truncate max-w-xs">
                          {ord.address}
                        </span>
                      </td>

                      {/* Product */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={ord.productImage}
                            alt={ord.productTitle}
                            className="w-8 h-8 rounded-md object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="font-medium text-slate-900 block truncate max-w-xs">
                              {ord.productTitle}
                            </span>
                            <span className="text-[11px] text-slate-500 tabular-nums">
                              الكمية: {ord.quantity}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-black text-rose-600 tabular-nums text-sm">
                        {ord.totalPrice} {ord.currency}
                      </td>

                      {/* Interactive Status Selector */}
                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            onUpdateOrderStatus(ord.id, e.target.value as any)
                          }
                          className={`text-xs font-bold rounded-lg px-2.5 py-1 border cursor-pointer ${
                            ord.status === 'delivered'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : ord.status === 'shipping'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : 'bg-amber-50 text-amber-700 border-amber-300'
                          }`}
                        >
                          <option value="pending">قيد المعالجة</option>
                          <option value="shipping">في الطريق مع الموزع</option>
                          <option value="delivered">تم الاستلام والدفع</option>
                          <option value="cancelled">ملغى</option>
                        </select>
                      </td>

                      {/* Customer WhatsApp Chat */}
                      <td className="py-3 px-4">
                        <a
                          href={customerWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>واتساب</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Audience & City Insights */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-right space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              توزيع المبيعات والطلبيات حسب المدن المغربية
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { city: 'الدار البيضاء والنواحي', percent: 42, count: 61 },
                { city: 'الرباط، سلا، تمارة', percent: 24, count: 35 },
                { city: 'مراكش', percent: 16, count: 23 },
                { city: 'طنجة وتطوان', percent: 11, count: 16 },
                { city: 'فاس ومكناس وباقي المدن', percent: 7, count: 11 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-800">{item.city}</span>
                    <span className="text-blue-600 font-bold tabular-nums">
                      {item.percent}% ({item.count} طلبية)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-right space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              مسار تحويل الزبون (Conversion Funnel)
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">
                    1. مشاهدة الإعلانات في Feed
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    الظهور المباشر أمام زوار فيسبوك وسوق في يدك
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-800 text-sm tabular-nums">
                  {totalReach.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-blue-50/80 rounded-xl flex items-center justify-between border border-blue-100">
                <div>
                  <span className="font-bold text-blue-950 block">
                    2. النقر على الإعلان وعرض التفاصيل
                  </span>
                  <span className="text-blue-800 text-[11px]">
                    نسبة النقر إلى الظهور (CTR: 7.2%)
                  </span>
                </div>
                <span className="font-mono font-bold text-blue-700 text-sm tabular-nums">
                  {totalClicks.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-emerald-50/80 rounded-xl flex items-center justify-between border border-emerald-100">
                <div>
                  <span className="font-bold text-emerald-950 block">
                    3. التواصل عبر واتساب والطلب السريع
                  </span>
                  <span className="text-emerald-800 text-[11px]">
                    الزبائن الذين فتحوا محادثة شراء أو ملأوا استمارة COD
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-700 text-sm tabular-nums">
                  {totalWhatsApp.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-purple-50/80 rounded-xl flex items-center justify-between border border-purple-100">
                <div>
                  <span className="font-bold text-purple-950 block">
                    4. تأكيد الطلبية واستلامها باليد
                  </span>
                  <span className="text-purple-800 text-[11px]">
                    المبيعات المؤكدة مع الدفع عند الاستلام
                  </span>
                </div>
                <span className="font-mono font-bold text-purple-700 text-sm tabular-nums">
                  {totalOrders} طلبيات
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
