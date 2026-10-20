import React, { useState, useRef } from 'react';
import { ProductAd } from '../types';
import { CITIES, CATEGORIES, getLocalImage } from '../data/mockData';
import {
  X,
  Plus,
  Sparkles,
  Image as ImageIcon,
  Video,
  Check,
  UploadCloud,
  Copy,
  FileText,
  Film,
  Wand2,
  CheckCircle2,
  Share2,
  RotateCcw,
} from 'lucide-react';
import {
  generateCopywritingWithGemini,
  GeminiCopywritingResponse,
  CopywritingOption,
  VideoScriptResult,
} from '../services/geminiCopywritingService';

interface CreateAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAd: (newAd: ProductAd) => void;
}

const PRESET_IMAGES = [
  {
    name: 'ساعة ذكية فاخرة',
    url: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
  },
  {
    name: 'زيت أركان وسيروم طبيعي',
    url: getLocalImage('product_moroccan_argan_oil_1792240155621.jpg'),
  },
  {
    name: 'سماعات Pro عازلة للصوت',
    url: getLocalImage('product_wireless_earbuds_1792240155858.jpg'),
  },
  {
    name: 'حذاء سنيكرز جلد أصيل',
    url: getLocalImage('product_leather_sneakers_1792240155657.jpg'),
  },
];

export const CreateAdModal: React.FC<CreateAdModalProps> = ({
  isOpen,
  onClose,
  onAddAd,
}) => {
  if (!isOpen) return null;

  const [brandName, setBrandName] = useState('متجر النخبة المغربية');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>(249);
  const [originalPrice, setOriginalPrice] = useState<number | ''>(399);
  const [category, setCategory] = useState<ProductAd['category']>('beauty');
  const [city, setCity] = useState('الدار البيضاء');
  const [phone, setPhone] = useState('0612345678');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[1].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState('');

  // AI Generation State
  const [videoType, setVideoType] = useState<'ugc' | 'educational'>('ugc');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<GeminiCopywritingResponse | null>(null);
  const [activeAiTab, setActiveAiTab] = useState<'copywriting' | 'video'>('copywriting');
  const [selectedCopyId, setSelectedCopyId] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Image File Upload (drag & drop or file picker)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (JPG, PNG, WEBP)');
      return;
    }

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUploadedImageBase64(reader.result);
        setCustomImageUrl('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveUploadedImage = () => {
    setUploadedImageBase64(null);
    setUploadedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Determine current active display image
  const currentActiveImage = uploadedImageBase64 || customImageUrl.trim() || selectedImage;

  // Run Gemini Copywriting & Video Scenario Generator
  const handleGenerateWithGemini = async () => {
    const effectiveTitle = title.trim() || 'منتج متميز عالي الجودة';
    setIsGenerating(true);
    setAppliedNotice(null);

    try {
      const response = await generateCopywritingWithGemini({
        productTitle: effectiveTitle,
        category,
        price: Number(price) || 249,
        originalPrice: Number(originalPrice) || (Number(price) ? Math.round(Number(price) * 1.5) : 399),
        brandName: brandName.trim() || 'متجر النخبة',
        city,
        videoType,
        imageDataUrl: uploadedImageBase64 || undefined,
      });

      setAiResult(response);
      if (response.adCopies && response.adCopies.length > 0) {
        setSelectedCopyId(response.adCopies[0].id);
      }
    } catch (err) {
      console.error('Error in handleGenerateWithGemini:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Apply chosen Copywriting Option to Title & Description
  const handleApplyCopy = (copy: CopywritingOption) => {
    setDescription(copy.fullCopy);
    if (!title.trim() && copy.hook) {
      setTitle(copy.hook.replace(/^[🔥⚡💡✨\s]+/, '').slice(0, 70));
    }
    setSelectedCopyId(copy.id);
    setAppliedNotice(`تم تطبيق "${copy.title}" مباشرة على تفاصيل الإعلان!`);
    setTimeout(() => setAppliedNotice(null), 4000);
  };

  // Copy text to clipboard helper
  const handleCopyToClipboard = (text: string, identifier: number | string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(identifier);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
  };

  // Submit Ad to main feed
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
      description: description.trim() || 'منتج أصلي بجودة عالية مع توصيل مجاني والدفع عند الاستلام.',
      price: numPrice,
      originalPrice: numOrig,
      discountPercent: discount > 0 ? discount : 25,
      currency: 'DH',
      rating: 5.0,
      reviewsCount: 1,
      images: [currentActiveImage],
      videoUrl: videoUrl.trim() || undefined,
      videoPoster: currentActiveImage,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 text-right overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight text-white">
                  نشر إعلان جديد وتوليد الكوبي رايتينغ الذكي
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1">
                  <Wand2 className="w-3 h-3 text-amber-400" />
                  Gemini AI 3.8
                </span>
              </div>
              <p className="text-xs text-slate-300">
                ارفع صورة منتجك وولّد 3 نصوص تسويقية بالدارجة وسيناريو فيديو جاهز للمونطاج
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Notification Alert for applied copy */}
          {appliedNotice && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{appliedNotice}</span>
            </div>
          )}

          {/* SECTION 1: رفع صورة المنتج (Product Image Upload) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="text-sm font-black text-slate-900">
                  صورة المنتج (رفع ملف مباشر أو اختيار نموذج)
                </h4>
              </div>
              {uploadedImageBase64 && (
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  تم رفع الصورة بنجاح
                </span>
              )}
            </div>

            {/* Upload Zone */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  id="product-image-upload-input"
                />

                {!uploadedImageBase64 ? (
                  <label
                    htmlFor="product-image-upload-input"
                    className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 group-hover:scale-110 flex items-center justify-center mb-2 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 mb-1">
                      اضغط لرفع صورة المنتج من حاسوبك أو هاتفك
                    </span>
                    <span className="text-[11px] text-slate-500">
                      صيغ مدعومة: JPG, PNG, WEBP (حجم عالي الدقة يفضّل للذكاء الاصطناعي)
                    </span>
                  </label>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={uploadedImageBase64}
                        alt="Uploaded preview"
                        className="w-16 h-16 rounded-lg object-cover border border-slate-200 shadow-xs"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-[280px]">
                          {uploadedFileName || 'صورة المنتج المرفوعة'}
                        </div>
                        <div className="text-[11px] text-indigo-600 font-medium">
                          جاهزة للتحليل وتوليد النصوص الإعلانية بـ Gemini
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label
                        htmlFor="product-image-upload-input"
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        تغيير
                      </label>
                      <button
                        type="button"
                        onClick={handleRemoveUploadedImage}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="حذف الصورة"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Preset Selector or Preview */}
              <div className="md:col-span-4 bg-white p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-600 mb-2">أو اختر صورة جاهزة:</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => {
                        setSelectedImage(preset.url);
                        setUploadedImageBase64(null);
                        setCustomImageUrl('');
                      }}
                      className={`relative rounded-lg overflow-hidden border-2 aspect-square cursor-pointer transition-all ${
                        currentActiveImage === preset.url && !uploadedImageBase64
                          ? 'border-indigo-600 ring-2 ring-indigo-200'
                          : 'border-slate-200 opacity-80 hover:opacity-100'
                      }`}
                      title={preset.name}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {currentActiveImage === preset.url && !uploadedImageBase64 && (
                        <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: البيانات الأساسية للمنتج (Basic Details) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="text-sm font-black text-slate-900">
                بيانات المنتج والعلامة التجارية
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسم المتجر أو العلامة التجارية <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="مثلاً: متجر النخبة المغربية أو Bio Organic"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسم أو عنوان المنتج التسويقي <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: زيت الأركان الطبيعي للشعر والبشرة"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  سعر البيع (DH) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="249"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-indigo-700 focus:bg-white focus:border-indigo-500 focus:outline-none"
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
                  placeholder="399"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-500 line-through focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  فئة ومجال المنتج <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:bg-white focus:border-indigo-500 focus:outline-none cursor-pointer"
                >
                  <option value="beauty">صحة وجمال وكوسميتيك</option>
                  <option value="electronics">إلكترونيات وأجهزة ذكية</option>
                  <option value="fashion">أزياء وملابس وأحذية</option>
                  <option value="home">منزل ومطبخ وديكور</option>
                  <option value="auto">إكسسوارات سيارات</option>
                  <option value="artisanal">صناعة تقليدية مغربية</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  المدينة الرئيسية للشحن والتوزيع
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:border-indigo-500 focus:outline-none cursor-pointer"
                >
                  {CITIES.filter((c) => c !== 'كل المدن').map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رقم الواتساب والهاتف لاستقبال الطلبيات
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: مولد الذكاء الاصطناعي GEMINI AI (Copywriting & Video Script) */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-5 border border-indigo-500/30 shadow-xl relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/40 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      توليد الكوبي رايتينغ وسيناريو الفيديو بـ Gemini API
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      يحلل صورة المنتج المرفوعة وبياناته ويولد 3 صيغ إعلانية + سكريبت فيديو 4 مشاهد
                    </p>
                  </div>
                </div>

                {/* Video Scenario Format Switcher */}
                <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-indigo-500/20 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setVideoType('ugc')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      videoType === 'ugc'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    محتوى عفوي (UGC)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoType('educational')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      videoType === 'educational'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    تعليمي وطبي (Educational)
                  </button>
                </div>
              </div>

              {/* Generate Trigger Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5">
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    النموذج النشط: <strong className="text-white">Gemini 3.8 Flash</strong>{' '}
                    (توليد عالي الدقة وسريع بالدارجة المغربية)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateWithGemini}
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white text-xs font-black rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin text-white" />
                      <span>جاري توليد 3 نصوص وسيناريو الفيديو...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 text-amber-300" />
                      <span>توليد 3 نصوص إعلانية وسيناريو فيديو بالذكاء الاصطناعي</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Results Display */}
              {aiResult && (
                <div className="space-y-4 pt-2 animate-in fade-in duration-300">
                  {/* Tabs: Copywriting vs Video Scenario */}
                  <div className="flex items-center gap-2 border-b border-indigo-800/40 pb-2">
                    <button
                      type="button"
                      onClick={() => setActiveAiTab('copywriting')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeAiTab === 'copywriting'
                          ? 'bg-white text-slate-900 shadow-md'
                          : 'bg-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>3 نصوص إعلانية تسويقية (Copywriting)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveAiTab('video')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeAiTab === 'video'
                          ? 'bg-white text-slate-900 shadow-md'
                          : 'bg-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Film className="w-4 h-4 text-amber-500" />
                      <span>
                        سيناريو الفيديو 4 مشاهد ({videoType === 'ugc' ? 'UGC' : 'تعليمي'})
                      </span>
                    </button>
                  </div>

                  {/* TAB 1: 3 COPYWRITING OPTIONS */}
                  {activeAiTab === 'copywriting' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {aiResult.adCopies.map((copy) => (
                        <div
                          key={copy.id}
                          className={`rounded-xl p-4 transition-all flex flex-col justify-between border ${
                            selectedCopyId === copy.id
                              ? 'bg-slate-800/90 border-amber-400/80 ring-2 ring-amber-400/20'
                              : 'bg-slate-800/50 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div>
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                {copy.badge}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {copy.platform}
                              </span>
                            </div>

                            <h5 className="text-xs font-black text-white mb-2">{copy.title}</h5>

                            {/* Hook */}
                            <div className="p-2 bg-black/30 rounded-lg text-amber-300 text-[11px] font-bold mb-2">
                              {copy.hook}
                            </div>

                            {/* Body snippet */}
                            <p className="text-[11px] text-slate-300 leading-relaxed mb-3 line-clamp-4">
                              {copy.body}
                            </p>

                            <div className="text-[10px] font-semibold text-emerald-400 mb-3">
                              {copy.callToAction}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                            <button
                              type="button"
                              onClick={() => handleApplyCopy(copy)}
                              className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-black flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                                selectedCopyId === copy.id
                                  ? 'bg-amber-400 text-slate-950 font-black'
                                  : 'bg-white/10 hover:bg-white/20 text-white'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>تطبيق على الإعلان</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCopyToClipboard(copy.fullCopy, copy.id)}
                              className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                              title="نسخ النص كاملاً"
                            >
                              {copiedIndex === copy.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 2: VIDEO SCRIPT SCENARIO */}
                  {activeAiTab === 'video' && aiResult.videoScript && (
                    <div className="bg-slate-800/80 rounded-xl p-4 border border-white/10 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              {aiResult.videoScript.typeName}
                            </span>
                            <span className="text-xs font-bold text-slate-300">
                              الجمهور المستهدف: {aiResult.videoScript.targetAudience}
                            </span>
                          </div>
                          <h5 className="text-xs font-black text-amber-300 mt-1">
                            {aiResult.videoScript.hookHeadline}
                          </h5>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleCopyToClipboard(aiResult.videoScript.fullVoiceover, 'voiceover')
                          }
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        >
                          {copiedIndex === 'voiceover' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-300" />
                              <span>تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ السكريبت الصوتي كاملاً</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* 4 Sequential Scenes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {aiResult.videoScript.scenes.map((scene) => (
                          <div
                            key={scene.sceneNumber}
                            className="bg-black/30 rounded-xl p-3 border border-white/5 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black text-indigo-300">
                                {scene.title}
                              </span>
                              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
                                ⏱️ {scene.durationSec} ثواني
                              </span>
                            </div>

                            <div className="text-[10px] text-slate-400 bg-white/5 p-2 rounded-lg">
                              <strong className="text-slate-300">🎥 توجيهات التصوير والمونطاج:</strong>{' '}
                              {scene.visualDirection}
                            </div>

                            <div className="text-[11px] text-amber-200 bg-amber-500/10 p-2 rounded-lg font-medium">
                              <strong className="text-amber-300">🗣️ الكلام المنطوق (Voiceover):</strong>{' '}
                              "{scene.spokenText}"
                            </div>

                            <div className="text-[10px] text-emerald-300">
                              💬 نص على الشاشة: {scene.captionText}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Full Voiceover Box */}
                      <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                        <div className="text-[11px] font-bold text-slate-300 mb-1">
                          السكريبت الصوتي الكامل للمونطاج (Voiceover Track):
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed italic font-arabic">
                          "{aiResult.videoScript.fullVoiceover}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: النص الإعلاني المعتمد (Ad Description & Review) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <h4 className="text-sm font-black text-slate-900">
                  النص الإعلاني النهائي (يمكنك تعديله يدوياً أو استخدام النصوص المولدة أعلاه)
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {description.length} حرف
              </span>
            </div>

            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب وصفاً جذاباً للزبائن: الهمزة ديال هاد الشهر، التوصيل فابور، الدفع عند الاستلام... أو اضغط 'تطبيق على الإعلان' من النصوص المولدة أعلاه."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs leading-relaxed focus:bg-white focus:border-indigo-500 focus:outline-none"
            />

            {/* Optional Video MP4 URL */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Video className="w-4 h-4 text-indigo-600" />
                <span>رابط فيديو للمنتج (اختياري - متاح لجميع الباقات)</span>
              </div>
              <p className="text-[11px] text-slate-500">
                إذا قمت بإنتاج فيديو من السيناريو أعلاه في كاب كات، أدخل رابطه المباشر هنا ليظهر كمقطع فيديو في التطبيق:
              </p>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/product_video.mp4"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={currentActiveImage}
              alt="Preview"
              className="w-9 h-9 rounded-lg object-cover border border-slate-300"
            />
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-800 truncate max-w-[220px]">
                {title.trim() || 'إعلان بدون عنوان'}
              </div>
              <div className="text-[10px] text-slate-500">
                السعر: {price || 0} DH · {city}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>نشر الإعلان فوراً في المنصة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
