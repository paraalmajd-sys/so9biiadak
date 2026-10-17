import React, { useState, useMemo } from 'react';
import {
  ProductAd,
  Story,
  PageProfile,
  AdCampaign,
  CustomerOrder,
  PricingPlan,
  SellerNotification,
  UserAccount,
} from './types';
import {
  INITIAL_ADS,
  INITIAL_STORIES,
  DEFAULT_PAGE_PROFILE,
  INITIAL_CAMPAIGNS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  DEFAULT_MERCHANT_ACCOUNT,
  DEFAULT_BUYER_ACCOUNT,
  CATEGORIES,
  CITIES,
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { StoryReels } from './components/StoryReels';
import { ProductAdCard } from './components/ProductAdCard';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { PageProfileView } from './components/PageProfileView';
import { PageDashboardView } from './components/PageDashboardView';
import { PricingPlansView } from './components/PricingPlansView';
import { ProductVideosView } from './components/ProductVideosView';
import { BuyerOrdersView } from './components/BuyerOrdersView';
import { QuickOrderModal } from './components/QuickOrderModal';
import { CreateAdModal } from './components/CreateAdModal';
import { StoryViewerModal } from './components/StoryViewerModal';
import { SavedAdsModal } from './components/SavedAdsModal';
import { AuthModal } from './components/AuthModal';
import { SubscriptionRequiredModal } from './components/SubscriptionRequiredModal';
import { SettingsModal } from './components/SettingsModal';
import { useLanguage } from './i18n/LanguageContext';
import {
  Sparkles,
  SlidersHorizontal,
  PlusCircle,
  Truck,
  Image as ImageIcon,
  Tag,
  Phone,
  Flame,
  CheckCircle2,
  MapPin,
  Clock,
  Store,
  LayoutDashboard,
  ShoppingBag,
  Video,
} from 'lucide-react';

export default function App() {
  const [ads, setAds] = useState<ProductAd[]>(INITIAL_ADS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(INITIAL_CAMPAIGNS);
  const [orders, setOrders] = useState<CustomerOrder[]>(INITIAL_ORDERS);
  const [profile, setProfile] = useState<PageProfile>(DEFAULT_PAGE_PROFILE);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(DEFAULT_MERCHANT_ACCOUNT);
  const [notifications, setNotifications] = useState<SellerNotification[]>(INITIAL_NOTIFICATIONS);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('كل المدن');
  const [priceSort, setPriceSort] = useState<'all' | 'low' | 'high' | 'deals'>('all');
  const [activeView, setActiveView] = useState<'feed' | 'videos' | 'dashboard' | 'profile' | 'orders' | 'deals' | 'cities' | 'pricing' | 'buyer_orders'>('feed');

  // Modals state
  const [quickOrderAd, setQuickOrderAd] = useState<ProductAd | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isCreateAdOpen, setIsCreateAdOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubscriptionRequiredOpen, setIsSubscriptionRequiredOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t, isRtl } = useLanguage();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Mandatory Subscription Check before publishing an ad
  const handleAttemptCreateAd = () => {
    if (!currentUser || !currentUser.isLoggedIn) {
      setIsAuthOpen(true);
      return;
    }

    // If user is a buyer, or a merchant without active subscription:
    if (
      currentUser.role === 'buyer' ||
      !currentUser.hasActiveSubscription ||
      currentUser.planId === 'none'
    ) {
      setIsSubscriptionRequiredOpen(true);
      return;
    }

    // Merchant has active subscription: proceed!
    setIsCreateAdOpen(true);
  };

  // Toggle role between Buyer and Merchant
  const handleSwitchRole = () => {
    if (currentUser?.role === 'merchant') {
      setCurrentUser(DEFAULT_BUYER_ACCOUNT);
      showToast('تم التبديل إلى حساب مشتري عادي (للتسوق والطلب)');
      setActiveView('feed');
    } else {
      setCurrentUser(DEFAULT_MERCHANT_ACCOUNT);
      showToast('تم التبديل إلى حساب تاجر معتمد (باقة Pro مفعلة)');
      setActiveView('dashboard');
    }
  };

  // Like handler
  const handleToggleLike = (adId: string) => {
    setAds((prev) =>
      prev.map((ad) => {
        if (ad.id === adId) {
          const nextLiked = !ad.isLiked;
          return {
            ...ad,
            isLiked: nextLiked,
            likesCount: nextLiked ? ad.likesCount + 1 : Math.max(0, ad.likesCount - 1),
          };
        }
        return ad;
      })
    );
  };

  // Save handler
  const handleToggleSave = (adId: string) => {
    setAds((prev) =>
      prev.map((ad) => {
        if (ad.id === adId) {
          const nextSaved = !ad.isSaved;
          showToast(
            nextSaved
              ? 'تمت إضافة الإعلان إلى محفوظاتك بنجاح'
              : 'تمت إزالة الإعلان من المحفوظات'
          );
          return {
            ...ad,
            isSaved: nextSaved,
          };
        }
        return ad;
      })
    );
  };

  // Comment handler with realistic instant seller response
  const handleAddComment = (adId: string, text: string) => {
    const userComment = {
      id: `comm-${Date.now()}`,
      author: currentUser?.fullName || 'زبون مهتم من المغرب',
      avatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      text,
      timeAgo: 'الآن',
      isSellerReply: false,
    };

    setAds((prev) =>
      prev.map((ad) => {
        if (ad.id === adId) {
          return {
            ...ad,
            commentsCount: ad.commentsCount + 1,
            comments: [...ad.comments, userComment],
          };
        }
        return ad;
      })
    );

    // Automated seller response after 1.5 seconds
    setTimeout(() => {
      setAds((prev) =>
        prev.map((ad) => {
          if (ad.id === adId) {
            const autoReply = {
              id: `reply-${Date.now()}`,
              author: `${ad.brandName} (البائع)`,
              avatar: ad.brandAvatar,
              text: `مرحبا بك! شكراً على استفسارك. المنتج متوفر والتوصيل فابور حتى لدارك مع الدفع عند الاستلام. تقدر تضغط على زر "واتساب" أو "أطلب الآن" ونأكدو معاك الإرسال فوراً!`,
              timeAgo: 'الآن',
              isSellerReply: true,
            };
            return {
              ...ad,
              commentsCount: ad.commentsCount + 1,
              comments: [...ad.comments, autoReply],
            };
          }
          return ad;
        })
      );
    }, 1500);
  };

  // Add new ad and generate a corresponding campaign
  const handleAddAd = (newAd: ProductAd) => {
    setAds([newAd, ...ads]);

    // Create campaign entry
    const newCamp: AdCampaign = {
      id: `camp-${Date.now()}`,
      adId: newAd.id,
      title: `حملة إعلانية: ${newAd.title.slice(0, 45)}...`,
      productImage: newAd.images[0],
      status: 'active',
      dailyBudget: 100,
      spent: 0,
      reach: 120,
      clicks: 8,
      whatsappMessages: 2,
      ordersCount: 0,
      cpc: 1.0,
      startDate: new Date().toISOString().split('T')[0],
    };
    setCampaigns([newCamp, ...campaigns]);

    // Add notification
    const newNotif: SellerNotification = {
      id: `notif-${Date.now()}`,
      type: 'ad_performance',
      title: 'تم إطلاق إعلانك بنجاح! 🚀',
      message: `بدأ عرض إعلان "${newAd.title.slice(0, 35)}..." على زوار سوق في يدك.`,
      timeAgo: 'الآن',
      read: false,
    };
    setNotifications([newNotif, ...notifications]);

    showToast('تم نشر إعلانك وبدء حملة الترويج بنجاح!');
  };

  // Toggle Campaign active/paused
  const handleToggleCampaignStatus = (campId: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === campId) {
          const nextStatus = c.status === 'active' ? 'paused' : 'active';
          showToast(
            nextStatus === 'active'
              ? 'تم تفعيل الحملة الإعلانية بنجاح'
              : 'تم إيقاف الحملة الإعلانية مؤقتاً'
          );
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`تم تحديث حالة الطلبية #${orderId} بنجاح`);
  };

  // Record newly placed order and trigger real-time seller notification
  const handleOrderSuccess = (newOrder: CustomerOrder) => {
    setOrders([newOrder, ...orders]);

    // Push new real-time notification to the merchant
    const orderNotif: SellerNotification = {
      id: `notif-${Date.now()}`,
      type: 'order',
      title: 'طلب زبون جديد فوري! 🛍️',
      message: `توصلت بطلب من ${newOrder.customerName} (${newOrder.city}) لـ ${newOrder.productTitle} بمبلغ ${newOrder.totalPrice} DH.`,
      timeAgo: 'الآن',
      read: false,
      orderId: newOrder.id,
    };
    setNotifications([orderNotif, ...notifications]);
  };

  // Notifications handlers
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('تم تعليم جميع الإشعارات كمقروءة');
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    showToast('تم مسح قائمة الإشعارات');
  };

  const handleSelectNotification = (notif: SellerNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    if (currentUser?.role === 'merchant') {
      setActiveView('orders');
    } else {
      setActiveView('buyer_orders');
    }
  };

  // Pricing Plan selection & Activation
  const handleSelectPlan = (plan: PricingPlan) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        role: 'merchant',
        planId: plan.id,
        hasActiveSubscription: true,
        businessName: currentUser.businessName || `${currentUser.fullName} Store`,
      });
      showToast(`تهانينا! تم تفعيل ${plan.name} وترقية حسابك إلى تاجر معتمد.`);
    }
  };

  // Filtered ads
  const filteredAds = useMemo(() => {
    return ads
      .filter((ad) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = ad.title.toLowerCase().includes(q);
          const matchDesc = ad.description.toLowerCase().includes(q);
          const matchBrand = ad.brandName.toLowerCase().includes(q);
          const matchCity = ad.city.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchBrand && !matchCity) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && ad.category !== selectedCategory) {
          return false;
        }

        // City filter
        if (selectedCity !== 'كل المدن' && ad.city !== selectedCity) {
          return false;
        }

        // Deals view filter
        if (activeView === 'deals' && ad.discountPercent < 40) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (priceSort === 'low') return a.price - b.price;
        if (priceSort === 'high') return b.price - a.price;
        if (priceSort === 'deals') return b.discountPercent - a.discountPercent;
        return 0;
      });
  }, [ads, searchQuery, selectedCategory, selectedCity, priceSort, activeView]);

  const savedAds = useMemo(() => ads.filter((ad) => ad.isSaved), [ads]);
  const trendingAds = useMemo(() => ads.slice(0, 3), [ads]);

  // Story next / prev navigation
  const handleStoryNext = () => {
    if (!activeStory) return;
    const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
    if (currentIndex < stories.length - 1) {
      setActiveStory(stories[currentIndex + 1]);
    } else {
      setActiveStory(null);
    }
  };

  const handleStoryPrev = () => {
    if (!activeStory) return;
    const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
    if (currentIndex > 0) {
      setActiveStory(stories[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 pb-12" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Bar Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedAds.length}
        ordersCount={orders.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        onAttemptCreateAd={handleAttemptCreateAd}
        activeView={activeView}
        onViewChange={(view) => setActiveView(view)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          setCurrentUser(null);
          showToast('تم تسجيل الخروج بنجاح');
        }}
        notifications={notifications}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onClearNotifications={handleClearNotifications}
        onSelectNotification={handleSelectNotification}
        onSwitchRole={handleSwitchRole}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* VIEW 1: Dedicated Pricing Plans Page ($20, $30, $45) */}
        {activeView === 'pricing' && (
          <PricingPlansView
            currentUser={currentUser}
            onSelectPlan={handleSelectPlan}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {/* VIEW 2: Dedicated Product Videos & Reels Page (Watch) */}
        {activeView === 'videos' && (
          <ProductVideosView
            ads={ads}
            onQuickOrder={(targetAd) => setQuickOrderAd(targetAd)}
            onToggleLike={handleToggleLike}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        )}

        {/* VIEW 3: Dedicated Facebook Page Profile View */}
        {activeView === 'profile' && (
          <PageProfileView
            profile={profile}
            ads={ads}
            onQuickOrder={(targetAd) => setQuickOrderAd(targetAd)}
            onToggleSave={handleToggleSave}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
            onOpenCreateAd={handleAttemptCreateAd}
          />
        )}

        {/* VIEW 4: Dedicated Merchant Dashboard & Ads Manager & Orders */}
        {(activeView === 'dashboard' || activeView === 'orders') && (
          <PageDashboardView
            profile={profile}
            campaigns={campaigns}
            orders={orders}
            onToggleCampaignStatus={handleToggleCampaignStatus}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onOpenCreateAd={handleAttemptCreateAd}
          />
        )}

        {/* VIEW 5: Dedicated Buyer Orders View (For regular buyers) */}
        {activeView === 'buyer_orders' && (
          <BuyerOrdersView
            orders={orders}
            currentUser={currentUser}
            onGoToFeed={() => setActiveView('feed')}
          />
        )}

        {/* VIEW 6: Facebook Product Ads Feed View (Default) */}
        {(activeView === 'feed' || activeView === 'deals' || activeView === 'cities') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column (Shortcuts, Filters & Trust) - 3 cols */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20">
                <SidebarLeft
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  selectedCity={selectedCity}
                  onSelectCity={setSelectedCity}
                  adsCount={filteredAds.length}
                  onNavigateView={(view) => setActiveView(view)}
                  activeView={activeView}
                  currentUser={currentUser}
                  onOpenSubscriptionModal={() => setIsSubscriptionRequiredOpen(true)}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                />
              </div>
            </div>

            {/* Center Column (Facebook-Style Product Ads Feed) - 6 cols */}
            <div className="lg:col-span-6 space-y-4">
              {/* Top Interactive Stories Carousel */}
              <StoryReels
                stories={stories}
                onSelectStory={(story) => setActiveStory(story)}
                onOpenCreateAd={handleAttemptCreateAd}
              />

              {/* Facebook-style "Create Ad / What are you selling?" Launcher Box */}
              <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${currentUser?.role === 'merchant' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {currentUser?.role === 'merchant' ? 'تاجر' : 'زبون'}
                  </div>
                  <button
                    onClick={handleAttemptCreateAd}
                    className="flex-1 bg-slate-100 hover:bg-slate-200/80 text-right px-4 py-2.5 rounded-full text-xs text-slate-500 font-medium transition-colors cursor-pointer"
                  >
                    {currentUser?.role === 'merchant'
                      ? 'عندك سلعة جديدة بغيتي تطلق ليها إعلان مموّل (نص، صورة، أو فيديو)؟ اضغط هنا...'
                      : 'هل ترغب في بيع منتجاتك في سوق في يدك؟ اشترك كتاجر وانشر إعلانك...'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-xs">
                  <button
                    onClick={handleAttemptCreateAd}
                    className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 font-bold transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span>صور المنتج</span>
                  </button>
                  <button
                    onClick={() => setActiveView('videos')}
                    className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 font-bold transition-colors cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-rose-500" />
                    <span>فيديوهات السلع</span>
                  </button>
                  <button
                    onClick={handleAttemptCreateAd}
                    className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 font-bold transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>طلب واتساب</span>
                  </button>
                </div>
              </div>

              {/* Mobile Category/City Selectors */}
              <div className="lg:hidden bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>الفئة:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-xs bg-slate-100 px-2.5 py-1 rounded-md border-none focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>المدينة:</span>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="text-xs bg-slate-100 px-2.5 py-1 rounded-md border-none focus:outline-none"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Feed Filter Sort Bar */}
              <div className="flex items-center justify-between gap-2 px-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-bold text-slate-800">
                    {filteredAds.length} إعلانات نشطة
                  </span>
                  {selectedCity !== 'كل المدن' && (
                    <span className="text-blue-600">في {selectedCity}</span>
                  )}
                </div>

                {/* Segmented controls for sorting */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/80 shadow-2xs">
                  <button
                    onClick={() => setPriceSort('all')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      priceSort === 'all'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    الأحدث
                  </button>
                  <button
                    onClick={() => setPriceSort('deals')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      priceSort === 'deals'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    أعلى خصم
                  </button>
                  <button
                    onClick={() => setPriceSort('low')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      priceSort === 'low'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    الأقل سعراً
                  </button>
                </div>
              </div>

              {/* Empty state */}
              {filteredAds.length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
                  <p className="text-sm font-bold text-slate-700">
                    لم نجد أي إعلان يطابق هذا البحث
                  </p>
                  <p className="text-xs text-slate-500">
                    جرب اختيار فئة أخرى أو تغيير اسم المدينة.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedCity('كل المدن');
                      setActiveView('feed');
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    إعادة ضبط الفلاتر
                  </button>
                </div>
              )}

              {/* Product Ads Feed List */}
              {filteredAds.map((ad) => (
                <ProductAdCard
                  key={ad.id}
                  ad={ad}
                  onQuickOrder={(targetAd) => setQuickOrderAd(targetAd)}
                  onToggleSave={handleToggleSave}
                  onToggleLike={handleToggleLike}
                  onAddComment={handleAddComment}
                />
              ))}
            </div>

            {/* Right Column (Sponsored Highlights & Support) - 3 cols */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20">
                <SidebarRight
                  trendingAds={trendingAds}
                  onSelectProduct={(ad) => {
                    const elem = document.getElementById(`ad-${ad.id}`);
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onQuickOrder={(targetAd) => setQuickOrderAd(targetAd)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Interactive Modals */}
      <QuickOrderModal
        ad={quickOrderAd}
        onClose={() => setQuickOrderAd(null)}
        onOrderSuccess={handleOrderSuccess}
      />

      <CreateAdModal
        isOpen={isCreateAdOpen}
        onClose={() => setIsCreateAdOpen(false)}
        onAddAd={handleAddAd}
      />

      <StoryViewerModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onSelectProduct={(adId) => {
          const targetAd = ads.find((a) => a.id === adId);
          if (targetAd) {
            setQuickOrderAd(targetAd);
          }
        }}
        onNext={handleStoryNext}
        onPrev={handleStoryPrev}
      />

      <SavedAdsModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedAds={savedAds}
        onQuickOrder={(targetAd) => setQuickOrderAd(targetAd)}
        onRemoveSaved={handleToggleSave}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`مرحباً بك يا ${user.fullName}! تم تسجيل الدخول بنجاح.`);
        }}
        currentUser={currentUser}
      />

      <SubscriptionRequiredModal
        isOpen={isSubscriptionRequiredOpen}
        onClose={() => setIsSubscriptionRequiredOpen(false)}
        currentUser={currentUser}
        onGoToPricing={() => setActiveView('pricing')}
        onUpgradeToMerchant={() => {
          if (currentUser) {
            setCurrentUser({
              ...currentUser,
              role: 'merchant',
              businessName: `${currentUser.fullName} Store`,
            });
            showToast('تم ترقية حسابك إلى حساب تاجر! اختر باقتك المفضلة للمتابعة.');
            setActiveView('pricing');
          } else {
            setIsAuthOpen(true);
          }
        }}
      />
 
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
