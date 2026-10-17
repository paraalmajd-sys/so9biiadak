export interface AdComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timeAgo: string;
  isSellerReply?: boolean;
}

export interface ProductAd {
  id: string;
  brandName: string;
  brandHandle: string;
  brandAvatar: string;
  verified: boolean;
  sponsored: boolean;
  title: string;
  description: string;
  features?: string[];
  price: number;
  originalPrice: number;
  discountPercent: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  videoUrl?: string;
  fallbackVideoUrl?: string;
  videoPoster?: string;
  mediaType: 'image' | 'video' | 'gallery';
  videoDuration?: string;
  videoViews?: string;
  category: 'electronics' | 'beauty' | 'fashion' | 'home' | 'auto' | 'artisanal';
  city: string;
  whatsappNumber: string;
  phone: string;
  freeShipping: boolean;
  cashOnDelivery: boolean;
  stockLeft?: number;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  comments: AdComment[];
}

export interface Story {
  id: string;
  brandName: string;
  brandAvatar: string;
  title: string;
  discount: string;
  image: string;
  videoUrl?: string;
  fallbackVideoUrl?: string;
  productAdId: string;
  views: string;
}

export interface CustomerOrder {
  id: string;
  adId: string;
  productTitle: string;
  productImage: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  quantity: number;
  totalPrice: number;
  currency: string;
  createdAt: string;
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled';
  notes?: string;
  buyerEmail?: string;
}

export interface AdCampaign {
  id: string;
  adId: string;
  title: string;
  productImage: string;
  status: 'active' | 'paused';
  dailyBudget: number;
  spent: number;
  reach: number;
  clicks: number;
  whatsappMessages: number;
  ordersCount: number;
  cpc: number;
  startDate: string;
}

export interface PageProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  category: string;
  bio: string;
  verified: boolean;
  followersCount: number;
  likesCount: number;
  rating: number;
  reviewsCount: number;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  address: string;
  deliveryPolicy: string;
  workingHours: string;
}

export interface UserAccount {
  id: string;
  role: 'buyer' | 'merchant';
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  city: string;
  avatar: string;
  businessName?: string;
  planId: 'none' | 'starter' | 'pro' | 'vip';
  hasActiveSubscription: boolean;
  verified: boolean;
  isLoggedIn: boolean;
}

export interface SellerNotification {
  id: string;
  type: 'order' | 'lead' | 'ad_performance' | 'system';
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  orderId?: string;
  adId?: string;
}

export interface PricingPlan {
  id: 'starter' | 'pro' | 'vip';
  name: string;
  badge?: string;
  priceUSD: number;
  priceMAD: number;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  reachGuarantee: string;
  adsLimit: string;
  supportLevel: string;
}
