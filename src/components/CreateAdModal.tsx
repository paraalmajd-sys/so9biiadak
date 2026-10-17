import React, { useState } from 'react';
import { ProductAd } from '../types';
import { CITIES, CATEGORIES } from '../data/mockData';
import { X, Plus, Sparkles, Image as ImageIcon, Video, Check } from 'lucide-react';

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAd: (newAd: ProductAd) => void;
}

const PRESET_IMAGES = [
  {
    name: 'ساعة ذكية فاخرة',
    url: '/src/assets/images/product_smartwatch_ultra_1792240155179.jpg',
  },
  {
    name: 'زيت أركان وسيروم طبيعي',
    url: '/src/assets/images/product_moroccan_argan_oil_1792240155621.jpg',
  },
  {
    name: 'سماعات Pro عازلة للصوت',
    url: '/src/assets/images/product_wireless_earbuds_1792240155858.jpg',
  },
  {
    name: 'حذاء سنيكرز جلد أصيل',
    url: '/src/assets/images/product_leather_sneakers_1792240155657.jpg',
  },
];

export const CreateAdModal: React.FC<CreateAdModalProps> = ({
  isOpen,
  onClose,
  onAddAd,
}) => {
  if (!isOpen) return null;

  const [brandName, setBrandName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<ProductAd['category']>('electronics');
  const [city, setCity] = useState('الدار البيضاء');
  const [phone, setPhone] = useState('0612345678');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !brandName.trim() || !price) return;

    const numPrice = Number(price);
    const numOrig = originalPrice ? Number(originalPrice) : Math.round(numPrice * 1.4);
    const discount = Math.round(((numOrig - numPrice) / numOrig) * 100);

    const newAd: ProductAd = {
      id: `ad-${Date.now()}`,
      brandName: brandName.trim(),
      brandHandle: `@${brandName.trim().toLowerCase().replace(/\s+/g, '_')}`,
      brandAvatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      verified: true,
      sponsored: true,
      title: title.trim(),
      description: description.trim(),
      price: numPrice,
      originalPrice: numOrig,
      discountPercent: discount > 0 ? discount : 25,
      currency: 'DH',
      rating: 5.0,
      reviewsCount: 1,
      images: [customImageUrl.trim() || selectedImage],
      videoUrl: videoUrl.trim() || undefined,
      videoPoster: customImageUrl.trim() || selectedImage,
      mediaType: videoUrl.trim() ? 'video' : 'image',
      videoDuration: videoUrl.trim() ? '0:30' : undefined,
      videoViews: videoUrl.trim() ? '1.2k' : undefined,
      category,
      city,
      whatsappNumber: phone.startsWith('+') ? phone : `+212${phone.replace(/^0/, '')}`,
      phone,
      freeShipping: true,
      cashOnDelivery: true,
      stockLeft: 12,
      createdAt: 'الآن',
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isSaved: false,
      comments: [],
    };

    onAddAd(newAd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-right animate-in fade-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                نشر إعلان تجاري جديد (نصوص، صور، فيديو)
              </h3>
              <p className="text-xs text-slate-500">
                إعلانك سيظهر مباشرة في واجهة زوار SO9FIADAK
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              اسم المتجر أو العلامة التجارية <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="مثلاً: Electro Marrakech أو بوتيك الأصالة"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              عنوان المنتج التسويقي <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً: ماكينة الحلاقة الاحترافية التيتانيوم المقاومة للماء"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              المحتوى الكتابي ووصف المنتج والمميزات (Copywriting) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصفاً جذاباً للزبائن: الهمزة ديال هاد الشهر، التوصيل فابور، الدفع عند الاستلام..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                سعر البيع (DH) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="مثلاً: 299"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                السعر قبل التخفيض (DH)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                placeholder="مثلاً: 499"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                فئة المنتج <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              >
                <option value="electronics">إلكترونيات وهواتف</option>
                <option value="beauty">صحة وجمال</option>
                <option value="fashion">أزياء وأحذية</option>
                <option value="home">منزل وديكور</option>
                <option value="auto">إكسسوارات سيارات</option>
                <option value="artisanal">صناعة تقليدية</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                مدينة المتجر <span className="text-rose-500">*</span>
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
              رقم الواتساب والهاتف لاستقبال الطلبات <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0612345678"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Video Attachment (Optional) */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1">
              <Video className="w-4 h-4 text-blue-600" />
              <span>إضافة فيديو للمنتج (اختياري - متاح لجميع الباقات)</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">
              الإعلانات المصحوبة بفيديو تحقق مبيعات أعلى بـ 3 أضعاف. أدخل رابط ملف فيديو MP4 مباشر أو رابط استعراض:
            </p>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/product_video.mp4"
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              اختر صورة أو غلاف المنتج:
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setSelectedImage(preset.url);
                    setCustomImageUrl('');
                  }}
                  className={`relative rounded-lg overflow-hidden border-2 aspect-square cursor-pointer ${
                    selectedImage === preset.url && !customImageUrl
                      ? 'border-blue-600 ring-2 ring-blue-300'
                      : 'border-slate-200'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedImage === preset.url && !customImageUrl && (
                    <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-500 mb-1">أو أدخل رابط صورة مخصص:</div>
            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              نشر الإعلان فوراً
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
