import React, { useState, useMemo } from 'react';
import { Invoice, ProductAd } from '../types';
import { INITIAL_INVOICES, CITIES } from '../data/mockData';
import {
  Calculator,
  FileText,
  TrendingUp,
  Target,
  DollarSign,
  Package,
  Truck,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Search,
  Filter,
  Printer,
  Download,
  Plus,
  X,
  Eye,
  Sliders,
  PieChart,
  Wallet,
  ShieldCheck,
  Building,
  User,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ProductSimulatorAccountingViewProps {
  ads: ProductAd[];
  onOpenCreateAd: () => void;
}

export const ProductSimulatorAccountingView: React.FC<ProductSimulatorAccountingViewProps> = ({
  ads,
  onOpenCreateAd,
}) => {
  const { isRtl } = useLanguage();
  const [activeSuiteTab, setActiveSuiteTab] = useState<'simulator' | 'pricing_portfolio' | 'accounting'>('pricing_portfolio');

  // ==========================================
  // 1. PRODUCT MARKET FIT SIMULATOR STATE
  // ==========================================
  const [targetMarket, setTargetMarket] = useState<'casablanca_rabat' | 'regions_small' | 'national' | 'gulf_export'>('national');
  const [productWeight, setProductWeight] = useState<'light' | 'medium' | 'heavy'>('light'); // <500g, 500g-2kg, >2kg
  const [isFragile, setIsFragile] = useState(false);
  const [hasWowFactor, setHasWowFactor] = useState(true);
  const [simPurchasePrice, setSimPurchasePrice] = useState<number>(65);
  const [simSellingPrice, setSimSellingPrice] = useState<number>(299);
  const [competitionLevel, setCompetitionLevel] = useState<'low' | 'medium' | 'high'>('medium');

  // Market Fit Score Calculation
  const marketFitResult = useMemo(() => {
    let score = 50;

    // Margin evaluation
    const grossMargin = simSellingPrice - simPurchasePrice;
    if (grossMargin > 180) score += 20;
    else if (grossMargin > 120) score += 12;
    else if (grossMargin < 80) score -= 15;

    // Weight & fragility
    if (productWeight === 'light') score += 10;
    else if (productWeight === 'heavy') score -= 12;
    if (isFragile) score -= 12;

    // Wow factor
    if (hasWowFactor) score += 12;

    // Competition
    if (competitionLevel === 'low') score += 10;
    else if (competitionLevel === 'high') score -= 10;

    // Market bonus
    if (targetMarket === 'national') score += 5;

    const clampedScore = Math.max(15, Math.min(98, score));
    let status: 'ممتاز للبدء فوراً' | 'جيد مع بعض التحسينات' | 'مخاطرة عالية' = 'جيد مع بعض التحسينات';
    let statusColor = 'text-amber-600 bg-amber-50 border-amber-200';

    if (clampedScore >= 75) {
      status = 'ممتاز للبدء فوراً';
      statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    } else if (clampedScore < 50) {
      status = 'مخاطرة عالية';
      statusColor = 'text-rose-700 bg-rose-50 border-rose-300';
    }

    return {
      score: clampedScore,
      status,
      statusColor,
      grossMargin,
    };
  }, [simPurchasePrice, simSellingPrice, productWeight, isFragile, hasWowFactor, competitionLevel, targetMarket]);

  // ==========================================
  // 2. PRICING & WALLET PORTFOLIO CALCULATOR
  // ==========================================
  const [calcPurchasePrice, setCalcPurchasePrice] = useState<number>(75);
  const [calcSellingPrice, setCalcSellingPrice] = useState<number>(299);
  const [calcShippingCost, setCalcShippingCost] = useState<number>(35);
  const [calcReturnCost, setCalcReturnCost] = useState<number>(15); // Retour fee
  const [calcCpaAds, setCalcCpaAds] = useState<number>(45); // Ad cost per lead/order
  const [calcConfirmRate, setCalcConfirmRate] = useState<number>(85); // % confirmed
  const [calcDeliveryRate, setCalcDeliveryRate] = useState<number>(75); // % delivered
  const [calcPackaging, setCalcPackaging] = useState<number>(8); // Packaging + Call center
  const [calcOrdersVolume, setCalcOrdersVolume] = useState<number>(300); // Monthly volume

  // Deep COD Profit Metrics
  const profitMetrics = useMemo(() => {
    // 100 leads generated
    const totalLeads = calcOrdersVolume;
    const confirmedOrders = Math.round(totalLeads * (calcConfirmRate / 100));
    const deliveredOrders = Math.round(confirmedOrders * (calcDeliveryRate / 100));
    const returnedOrders = confirmedOrders - deliveredOrders;

    // Incomings
    const totalRevenue = deliveredOrders * calcSellingPrice;

    // Costs
    const productCost = deliveredOrders * calcPurchasePrice; // Only delivered items lose inventory cost (returned items return to stock)
    const adCost = totalLeads * calcCpaAds;
    const shippingDeliveredCost = deliveredOrders * calcShippingCost;
    const shippingReturnsCost = returnedOrders * calcReturnCost;
    const packagingCost = confirmedOrders * calcPackaging;

    const totalExpenses = productCost + adCost + shippingDeliveredCost + shippingReturnsCost + packagingCost;
    const netProfitTotal = totalRevenue - totalExpenses;
    const netProfitPerDelivered = deliveredOrders > 0 ? Math.round(netProfitTotal / deliveredOrders) : 0;
    const profitMarginPercent = totalRevenue > 0 ? Math.round((netProfitTotal / totalRevenue) * 100) : 0;

    return {
      totalLeads,
      confirmedOrders,
      deliveredOrders,
      returnedOrders,
      totalRevenue,
      totalExpenses,
      netProfitTotal,
      netProfitPerDelivered,
      profitMarginPercent,
      adCost,
      shippingTotalCost: shippingDeliveredCost + shippingReturnsCost,
      productCost,
      packagingCost,
    };
  }, [
    calcPurchasePrice,
    calcSellingPrice,
    calcShippingCost,
    calcReturnCost,
    calcCpaAds,
    calcConfirmRate,
    calcDeliveryRate,
    calcPackaging,
    calcOrdersVolume,
  ]);

  // ==========================================
  // 3. INVOICING & ACCOUNTING (COMPTABILITÉ)
  // ==========================================
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [accountingPeriod, setAccountingPeriod] = useState<'all' | 'daily' | 'monthly' | 'yearly'>('all');
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState('');
  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<Invoice | null>(null);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  // New Invoice form state
  const [newInvCustomer, setNewInvCustomer] = useState('');
  const [newInvPhone, setNewInvPhone] = useState('');
  const [newInvCity, setNewInvCity] = useState('الدار البيضاء');
  const [newInvProduct, setNewInvProduct] = useState(ads[0]?.title || 'ساعة فاخرة');
  const [newInvQty, setNewInvQty] = useState(1);
  const [newInvPrice, setNewInvPrice] = useState(299);

  // Filtered invoices based on period and search
  const filteredInvoices = useMemo(() => {
    const todayStr = '2026-10-18';
    const thisMonthStr = '2026-10';
    const thisYearStr = '2026';

    return invoices.filter((inv) => {
      // Period filter
      if (accountingPeriod === 'daily' && inv.date !== todayStr) return false;
      if (accountingPeriod === 'monthly' && inv.month !== thisMonthStr) return false;
      if (accountingPeriod === 'yearly' && inv.year !== thisYearStr) return false;

      // Search filter
      if (invoiceSearchQuery.trim()) {
        const q = invoiceSearchQuery.toLowerCase();
        const matchesName = inv.customerName.toLowerCase().includes(q);
        const matchesId = inv.id.toLowerCase().includes(q);
        const matchesCity = inv.customerCity.toLowerCase().includes(q);
        const matchesProduct = inv.productTitle.toLowerCase().includes(q);
        return matchesName || matchesId || matchesCity || matchesProduct;
      }

      return true;
    });
  }, [invoices, accountingPeriod, invoiceSearchQuery]);

  // Accounting aggregates
  const accountingTotals = useMemo(() => {
    const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.status === 'paid' ? inv.totalAmount : 0), 0);
    const paidCount = filteredInvoices.filter((inv) => inv.status === 'paid').length;
    // Estimated direct COGS & ads cost at 50% for realistic profit
    const estimatedExpenses = Math.round(totalRevenue * 0.48);
    const netProfit = totalRevenue - estimatedExpenses;

    return {
      totalRevenue,
      paidCount,
      estimatedExpenses,
      netProfit,
    };
  }, [filteredInvoices]);

  const handleAddNewInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvCustomer || !newInvPhone) {
      alert('يرجى إدخال اسم الزبون ورقم الهاتف');
      return;
    }

    const newInv: Invoice = {
      id: `FACT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: `SO9-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newInvCustomer,
      customerPhone: newInvPhone,
      customerCity: newInvCity,
      customerAddress: `شارع الحسن الثاني، ${newInvCity}`,
      productTitle: newInvProduct,
      quantity: Number(newInvQty),
      unitPrice: Number(newInvPrice),
      shippingCost: 0,
      totalAmount: Number(newInvPrice) * Number(newInvQty),
      currency: 'DH',
      date: '2026-10-18',
      month: '2026-10',
      year: '2026',
      status: 'paid',
      sellerName: 'SO9FIADAK Official Store',
      sellerPhone: '0612345678',
      sellerCity: 'الدار البيضاء',
      iceNumber: '002938172000045',
      notes: 'تم الدفع نقداً عند الاستلام بعد معاينة المنتج.',
    };

    setInvoices([newInv, ...invoices]);
    setIsCreateInvoiceOpen(false);
    setNewInvCustomer('');
    setNewInvPhone('');
    setSelectedInvoiceForModal(newInv);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Suite Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-black border border-white/20">
              <Calculator className="w-3.5 h-3.5 text-emerald-300" />
              <span>محاكي التجارة الإلكترونية، حساب الأرباح، ونظام الفواتير</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              محاكي اختيار السلعة الرابحة، حساب أرباح المحفظة، والمحاسبة اليومية والشهرية
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
              اختر المنتج المناسب للسوق المستهدف، احسب بدقة تكاليف الإعلانات والشحن والروتور حتى تعرف شحال غيدي جيبك صافي (Portefeuille Net)، واستخرج نسخ الفواتير الرسمية لتتبع محاسبتك كاملة.
            </p>
          </div>

          {/* Sub-tabs toggle */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveSuiteTab('pricing_portfolio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSuiteTab === 'pricing_portfolio'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>حاسبة الأرباح والمحفظة</span>
            </button>

            <button
              onClick={() => setActiveSuiteTab('simulator')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSuiteTab === 'simulator'
                  ? 'bg-white text-teal-950 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <Target className="w-4 h-4 text-teal-600" />
              <span>محاكي ملائمة السوق (Market Fit)</span>
            </button>

            <button
              onClick={() => setActiveSuiteTab('accounting')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSuiteTab === 'accounting'
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>المحاسبة والفواتير (Comptabilité)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          SUITE 1: PRICING & WALLET PORTFOLIO CALCULATOR
         ======================================================== */}
      {activeSuiteTab === 'pricing_portfolio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-900">محددات التسعير والتكاليف الواقعية للتجارة بالمغرب (COD)</h3>
                  <p className="text-xs text-slate-500">عدل الأسعار ونسب التأكيد والتوصيل وشوف المحفظة الصافية</p>
                </div>
                <Sliders className="w-4 h-4 text-emerald-600" />
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Purchase Price */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">سعر الشراء بالجملة:</span>
                    <span className="text-blue-700 font-black">{calcPurchasePrice} DH</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={calcPurchasePrice}
                    onChange={(e) => setCalcPurchasePrice(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* 2. Selling Price */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">سعر البيع المقترح:</span>
                    <span className="text-emerald-700 font-black">{calcSellingPrice} DH</span>
                  </div>
                  <input
                    type="range"
                    min="99"
                    max="999"
                    step="10"
                    value={calcSellingPrice}
                    onChange={(e) => setCalcSellingPrice(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                {/* 3. Shipping Fee */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">تكلفة التوصيل الناجح:</span>
                    <span className="text-slate-900 font-black">{calcShippingCost} DH</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="60"
                    step="5"
                    value={calcShippingCost}
                    onChange={(e) => setCalcShippingCost(Number(e.target.value))}
                    className="w-full accent-slate-800 cursor-pointer"
                  />
                </div>

                {/* 4. CPA Ads */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">تكلفة الإعلان لكل طلبية (CPA):</span>
                    <span className="text-purple-700 font-black">{calcCpaAds} DH</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="5"
                    value={calcCpaAds}
                    onChange={(e) => setCalcCpaAds(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                {/* 5. Confirmation Rate */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">نسبة تأكيد الطلبيات:</span>
                    <span className="text-teal-700 font-black">{calcConfirmRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="5"
                    value={calcConfirmRate}
                    onChange={(e) => setCalcConfirmRate(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                {/* 6. Delivery Rate */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">نسبة التسليم (Livraison):</span>
                    <span className="text-indigo-700 font-black">{calcDeliveryRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={calcDeliveryRate}
                    onChange={(e) => setCalcDeliveryRate(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Monthly Volume */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">حجم الطلبيات المستهدف شهرياً:</span>
                  <span className="text-emerald-700 font-black text-sm">{calcOrdersVolume} طلبية واردة</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={calcOrdersVolume}
                  onChange={(e) => setCalcOrdersVolume(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Practical Advice based on Calculations */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-900 space-y-2">
              <div className="font-black flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>تحليل الجدوى والربحية للمنتج:</span>
              </div>
              <p className="leading-relaxed">
                مع سعر شراء {calcPurchasePrice} درهم وسعر بيع {calcSellingPrice} درهم، ربحك الصافي عن كل طلبية مستلمة هو <strong className="text-emerald-950 font-black text-sm">{profitMetrics.netProfitPerDelivered} درهم</strong> بعد تغطية تكلفة الإشهار والشحن وتكاليف الروتور.
              </p>
            </div>
          </div>

          {/* Results & Wallet Portfolio Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-20">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 text-white shadow-xl space-y-5 border border-slate-700">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-black">المحفظة الصافية (Portefeuille Net)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-black">
                    هامش {profitMetrics.profitMarginPercent}%
                  </span>
                </div>

                {/* Big Profit Number */}
                <div className="text-center py-2 space-y-1">
                  <span className="text-xs text-slate-300 font-bold block">الأرباح الصافية الشهرية في جيبك:</span>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                    {profitMetrics.netProfitTotal.toLocaleString()} <span className="text-xl text-white font-bold">DH</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    (ما يعادل {Math.round(profitMetrics.netProfitTotal / 10)} دولار أمريكي شهرياً)
                  </span>
                </div>

                {/* Breakdown Tiles */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[11px] text-slate-400 block">المداخيل الإجمالية (CA):</span>
                    <span className="text-sm font-black text-white">{profitMetrics.totalRevenue.toLocaleString()} DH</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[11px] text-slate-400 block">المصاريف الإجمالية:</span>
                    <span className="text-sm font-black text-rose-300">{profitMetrics.totalExpenses.toLocaleString()} DH</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[11px] text-slate-400 block">طلبيات مسلّمة ومخلصة:</span>
                    <span className="text-sm font-black text-emerald-300">{profitMetrics.deliveredOrders} طلبية</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[11px] text-slate-400 block">الربح الصافي للقطعة:</span>
                    <span className="text-sm font-black text-amber-300">{profitMetrics.netProfitPerDelivered} DH</span>
                  </div>
                </div>

                {/* Cost Distribution Progress */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] text-slate-400 block font-bold">توزيع المصاريف (سلعة / إعلانات / شحن):</span>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${(profitMetrics.productCost / profitMetrics.totalExpenses) * 100}%` }}
                      className="bg-blue-500 h-full"
                      title="السلع"
                    />
                    <div
                      style={{ width: `${(profitMetrics.adCost / profitMetrics.totalExpenses) * 100}%` }}
                      className="bg-purple-500 h-full"
                      title="الإعلانات"
                    />
                    <div
                      style={{ width: `${(profitMetrics.shippingTotalCost / profitMetrics.totalExpenses) * 100}%` }}
                      className="bg-amber-500 h-full"
                      title="التوصيل والروتور"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
                    <span className="text-blue-400">■ السلع</span>
                    <span className="text-purple-400">■ الإشهار</span>
                    <span className="text-amber-400">■ التوصيل والروتور</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUITE 2: PRODUCT MARKET FIT SIMULATOR
         ======================================================== */}
      {activeSuiteTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Criteria (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Target Market */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-sm font-black text-slate-900">1. السوق المستهدف (Target Market Region)</h3>
              <p className="text-xs text-slate-500">طبيعة وقوة الشراء تختلف باختلاف جهة البيع بالمغرب</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'casablanca_rabat', title: 'كازا والرباط والمدن الكبرى', desc: 'توصيل في 24 ساعة، قوة شرائية عالية، ومنافسة متوسطة' },
                  { id: 'regions_small', title: 'الأقاليم والمدن المتوسطة والصغرى', desc: 'تعطش للمنتجات النادرة، نسبة استلام عالية، وتوصيل 48 ساعة' },
                  { id: 'national', title: 'عموم المغرب (السوق الوطني)', desc: 'أوسع وصول وحملات إعلانية بتكلفة CPA منخفضة' },
                  { id: 'gulf_export', title: 'التصدير لدول الخليج (COD Export)', desc: 'هوامش ربح عالية جداً (بالريال والدرهم الإماراتي)' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setTargetMarket(m.id as any)}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      targetMarket === m.id
                        ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-900 block">{m.title}</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Product Characteristics */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900">2. مواصفات السلعة اللوجستية (Product Specifications)</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block mb-1.5">وزن وحجم السلعة:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'light', label: 'خفيف (< 500g)', sub: 'مثالي للشحن السريع' },
                      { id: 'medium', label: 'متوسط (500g - 2kg)', sub: 'تكلفة شحن عادية' },
                      { id: 'heavy', label: 'ثقيل (> 2kg)', sub: 'زيادة فـ مصاريف الشحن' },
                    ].map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setProductWeight(w.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          productWeight === w.id
                            ? 'bg-teal-600 text-white font-black'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="block font-bold">{w.label}</span>
                        <span className="text-[10px] block opacity-80">{w.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasWowFactor}
                      onChange={(e) => setHasWowFactor(e.target.checked)}
                      className="w-4 h-4 accent-teal-600"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">فيه ميزة مبهرة (Wow Factor)؟</span>
                      <span className="text-[10px] text-slate-500">حل لمشكل واضح أو فكرة غير مألوفة</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFragile}
                      onChange={(e) => setIsFragile(e.target.checked)}
                      className="w-4 h-4 accent-rose-600"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">سلعة قابلة للكسر (زجاج / سائل)؟</span>
                      <span className="text-[10px] text-slate-500">قد ترفع نسبة تلف الشحنات</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results & Winning Score Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-20">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xl space-y-5">
                <div className="text-center pb-3 border-b border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                    مؤشر النجاح وملاءمة السوق (Market Fit Score)
                  </span>
                  <div className="text-5xl font-black text-teal-600 tracking-tight my-2">
                    {marketFitResult.score}<span className="text-2xl text-slate-400 font-bold">/100</span>
                  </div>
                  <span className={`inline-block text-xs font-black px-3 py-1 rounded-full border ${marketFitResult.statusColor}`}>
                    {marketFitResult.status}
                  </span>
                </div>

                {/* Score Breakdown Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>نسبة القبول والطلب:</span>
                    <span>{marketFitResult.score}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${marketFitResult.score}%` }}
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Practical Recommendations */}
                <div className="space-y-2 text-xs">
                  <span className="font-black text-slate-900 block">خطة إطلاق هذا المنتج:</span>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 space-y-1.5 leading-relaxed">
                    <div className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-black">1.</span>
                      <span>ابدأ بتجربة إعلانية ميزانيتها 100 إلى 150 درهم فاليوم على فيسبوك وتيك توك ريلز.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-black">2.</span>
                      <span>وفر عرضاً مزدوجاً (2 حبات بتخفيض) باش ترفع سلة المشتريات (AOV) وتخفض نسبة تكلفة الإعلان للقطعة.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-black">3.</span>
                      <span>تأكيد الطلبيات بسرعة عبر واتساب خلال أقل من 15 دقيقة يضمن لك نسبة تسليم تفوق 80%!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUITE 3: ACCOUNTING & INVOICES (COMPTABILITÉ & FACTURES)
         ======================================================== */}
      {activeSuiteTab === 'accounting' && (
        <div className="space-y-6">
          {/* Accounting KPI Cards (Daily / Monthly / Yearly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">إجمالي المداخيل (CA):</span>
              <div className="text-2xl font-black text-slate-900">
                {accountingTotals.totalRevenue.toLocaleString()} <span className="text-xs text-slate-500 font-bold">DH</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold block">مجموع المبيعات المسلّمة</span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">إجمالي المصاريف المقدرة:</span>
              <div className="text-2xl font-black text-rose-600">
                {accountingTotals.estimatedExpenses.toLocaleString()} <span className="text-xs text-slate-500 font-bold">DH</span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold block">سلع + شحن + إعلانات</span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">الأرباح الصافية المحققة:</span>
              <div className="text-2xl font-black text-emerald-600">
                {accountingTotals.netProfit.toLocaleString()} <span className="text-xs text-emerald-700 font-bold">DH</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold block">هامش ربح صافي ~52%</span>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">الفواتير المستخلصة:</span>
              <div className="text-2xl font-black text-blue-600">
                {accountingTotals.paidCount} <span className="text-xs text-slate-500 font-bold">فاتورة</span>
              </div>
              <span className="text-[10px] text-blue-600 font-bold block">جاهزة للطباعة والتحميل</span>
            </div>
          </div>

          {/* Invoices Action Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Period selector */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              {[
                { id: 'all', label: 'كل الفترات' },
                { id: 'daily', label: 'اليومي (اليوم)' },
                { id: 'monthly', label: 'الشهري (أكتوبر 2026)' },
                { id: 'yearly', label: 'السنوي (2026)' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setAccountingPeriod(p.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    accountingPeriod === p.id
                      ? 'bg-blue-600 text-white font-black shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Search + Add Invoice */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={invoiceSearchQuery}
                  onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                  placeholder="ابحث برقم الفاتورة أو اسم الزبون..."
                  className="py-1.5 px-3 pr-8 bg-slate-100 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 right-2.5 pointer-events-none" />
              </div>

              <button
                onClick={() => setIsCreateInvoiceOpen(true)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>إصدار فاتورة جديدة</span>
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-500 font-black border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">رقم الفاتورة</th>
                    <th className="py-3 px-4">الزبون / الهاتف</th>
                    <th className="py-3 px-4">المدينة</th>
                    <th className="py-3 px-4">المنتج والكمية</th>
                    <th className="py-3 px-4">المجموع (TTC)</th>
                    <th className="py-3 px-4">التاريخ</th>
                    <th className="py-3 px-4">الحالة</th>
                    <th className="py-3 px-4 text-center">نسخة الفاتورة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-black text-blue-700">{inv.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold block text-slate-900">{inv.customerName}</span>
                        <span className="text-[10px] text-slate-400 font-mono" dir="ltr">{inv.customerPhone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-bold">
                          {inv.customerCity}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold truncate max-w-[160px] block">{inv.productTitle}</span>
                        <span className="text-[10px] text-slate-500">الكمية: {inv.quantity}</span>
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900">
                        {inv.totalAmount} {inv.currency}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                        {inv.date}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>مسددة</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedInvoiceForModal(inv)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-blue-700 text-xs font-bold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 border border-slate-200"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>عرض / طباعة</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInvoices.length === 0 && (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <FileText className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-bold">لا توجد فواتير مسجلة في هذه الفترة المختارة.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: OFFICIAL INVOICE PREVIEW & PRINT
         ======================================================== */}
      {selectedInvoiceForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Controls Bar */}
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة الفاتورة الرسمية</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Invoice Document */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-900 bg-white" id="official-printable-invoice">
              {/* Invoice Header */}
              <div className="flex items-start justify-between pb-6 border-b-2 border-slate-900">
                <div className="space-y-1">
                  <div className="text-xl font-black tracking-tight text-blue-700">
                    {selectedInvoiceForModal.sellerName}
                  </div>
                  <div className="text-xs text-slate-600">
                    <div>{selectedInvoiceForModal.sellerCity}، المغرب</div>
                    <div>الهاتف: {selectedInvoiceForModal.sellerPhone}</div>
                    {selectedInvoiceForModal.iceNumber && (
                      <div className="font-mono text-[11px] text-slate-500">
                        N° ICE: {selectedInvoiceForModal.iceNumber}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-left space-y-1">
                  <div className="text-2xl font-black text-slate-900">FACTURE</div>
                  <div className="text-xs font-mono font-bold text-blue-600">
                    {selectedInvoiceForModal.id}
                  </div>
                  <div className="text-xs text-slate-500">
                    التاريخ: {selectedInvoiceForModal.date}
                  </div>
                </div>
              </div>

              {/* Client Info Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">فاتورة موجهة إلى (Client):</span>
                  <div className="font-black text-slate-900 text-sm">{selectedInvoiceForModal.customerName}</div>
                  <div className="text-slate-600">{selectedInvoiceForModal.customerAddress}</div>
                  <div className="font-bold text-slate-800">{selectedInvoiceForModal.customerCity}</div>
                </div>

                <div className="text-left">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">بيانات التسليم والدفع:</span>
                  <div className="font-mono text-slate-700">{selectedInvoiceForModal.customerPhone}</div>
                  <div className="font-bold text-emerald-700 mt-1">الدفع عند الاستلام (COD) ✓</div>
                  <div className="text-[10px] text-slate-500">طريقة الأداء: نقداً بعد المعاينة</div>
                </div>
              </div>

              {/* Invoice Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-black border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">المنتج / البيان</th>
                      <th className="py-2.5 px-3 text-center">الكمية</th>
                      <th className="py-2.5 px-3">السعر الفردي</th>
                      <th className="py-2.5 px-3 text-left">المجموع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="py-3 px-3">
                        <span className="font-bold block text-slate-900">{selectedInvoiceForModal.productTitle}</span>
                        <span className="text-[10px] text-slate-500">رقم الطلبية: {selectedInvoiceForModal.orderId}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold">{selectedInvoiceForModal.quantity}</td>
                      <td className="py-3 px-3">{selectedInvoiceForModal.unitPrice} DH</td>
                      <td className="py-3 px-3 text-left font-black">{selectedInvoiceForModal.totalAmount} DH</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-slate-500">مصاريف التوصيل السريع لـ {selectedInvoiceForModal.customerCity}</td>
                      <td className="py-2.5 px-3 text-center font-bold">1</td>
                      <td className="py-2.5 px-3">0.00 DH</td>
                      <td className="py-2.5 px-3 text-left font-bold text-emerald-600">مجاني (0 DH)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total & Cachet */}
              <div className="flex items-end justify-between pt-4">
                {/* Official Stamp Cachet */}
                <div className="w-36 h-28 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center p-2 rotate-[-4deg] text-slate-400">
                  <span className="text-[9px] font-black uppercase tracking-wider block text-blue-600">SO9FIADAK MAROC</span>
                  <span className="text-[10px] font-black text-emerald-600 block my-0.5">PAYÉ EN ESPÈCES</span>
                  <span className="text-[8px] block">CACHET & SIGNATURE</span>
                </div>

                {/* Totals Calculation */}
                <div className="w-56 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>المجموع الصافي (HT):</span>
                    <span>{selectedInvoiceForModal.totalAmount} DH</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>الضريبة TVA (0%):</span>
                    <span>0.00 DH</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t-2 border-slate-900">
                    <span>المجموع الصافي (TTC):</span>
                    <span className="text-emerald-700">{selectedInvoiceForModal.totalAmount} DH</span>
                  </div>
                </div>
              </div>

              {/* Footer Terms */}
              <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                هذه الوثيقة تعد فاتورة بيع وتسليم رسمية صادرة عبر منصة SO9FIADAK بالمملكة المغربية. للشكاوى أو استبدال السلعة، تواصلوا معنا خلال 7 أيام من تاريخ الاستلام.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CREATE NEW INVOICE
         ======================================================== */}
      {isCreateInvoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">إصدار فاتورة بيع جديدة</h3>
              <button
                onClick={() => setIsCreateInvoiceOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewInvoice} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم الزبون الكامل *</label>
                <input
                  type="text"
                  required
                  value={newInvCustomer}
                  onChange={(e) => setNewInvCustomer(e.target.value)}
                  placeholder="مثال: يونس الفاسي"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">رقم الهاتف *</label>
                <input
                  type="tel"
                  required
                  value={newInvPhone}
                  onChange={(e) => setNewInvPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-left font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">المدينة *</label>
                <select
                  value={newInvCity}
                  onChange={(e) => setNewInvCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                >
                  {CITIES.filter((c) => c !== 'كل المدن').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">المنتج *</label>
                <input
                  type="text"
                  required
                  value={newInvProduct}
                  onChange={(e) => setNewInvProduct(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">الكمية</label>
                  <input
                    type="number"
                    min="1"
                    value={newInvQty}
                    onChange={(e) => setNewInvQty(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">السعر (DH)</label>
                  <input
                    type="number"
                    min="10"
                    value={newInvPrice}
                    onChange={(e) => setNewInvPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  حفظ وإصدار الفاتورة فورياً
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
