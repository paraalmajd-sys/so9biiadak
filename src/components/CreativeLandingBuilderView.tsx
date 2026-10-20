import React, { useState, useEffect, useRef } from 'react';
import { ProductAd } from '../types';
import { getLocalImage } from '../data/mockData';
import {
  Sparkles,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Eye,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Flame,
  BadgeCheck,
  Layers,
  Palette,
  Layout,
  Zap,
  Plus,
  UploadCloud,
  X,
  Maximize2,
  Share2,
  Code2,
  MessageCircle,
  Video,
  Image as ImageIcon,
  Download,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileCode,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  TrendingUp,
  Target,
  Trash2,
  FolderOpen,
  AlertTriangle,
  Edit3,
  ExternalLink,
  Sliders,
  CheckSquare,
  Wand2,
  Film,
  Music,
  Scissors,
  Settings2,
  Printer,
  ChevronRight,
  PhoneCall,
  UserCheck,
  Heart,
  Smile,
  Shield,
  ThumbsUp,
  Award,
  BookOpen,
  Coffee,
  Sun,
  Moon,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface CreativeLandingBuilderViewProps {
  ads: ProductAd[];
  onOpenCreateAd: () => void;
  onQuickOrder?: (ad: ProductAd) => void;
}

export const CreativeLandingBuilderView: React.FC<CreativeLandingBuilderViewProps> = ({
  ads,
  onOpenCreateAd,
  onQuickOrder,
}) => {
  const { isRtl } = useLanguage();

  // Primary Navigation: 1. AI Image Creatives & Design Studio | 2. AI Video Creatives (Educational, Usage, UGC) | 3. Scripts Studio | 4. Deep Landing Page
  const [activeTab, setActiveTab] = useState<'creatives' | 'videos' | 'scripts' | 'landing_page'>('scripts');

  // =========================================================================
  // USER'S PRODUCT SPECS (مربوطة بصورة وسلعة المستخدم الحقيقية)
  // =========================================================================
  const userAttachedImage = '/assets/aistudio/creative-ad-1-1792446332876_8b4efb10.png';
  const defaultInitialImage = userAttachedImage || getLocalImage('product_moroccan_argan_oil_1792240155621.jpg') || (ads[0]?.images[0] ?? '');

  const [productTitle, setProductTitle] = useState('حلوى المغنيسيوم المعقد (Magnesium Complex Gummies)');
  const [productNiche, setProductNiche] = useState('مكملات غذائية وعناية صحية (Compléments)');
  const [productPrice, setProductPrice] = useState<number>(249);
  const [productOriginalPrice, setProductOriginalPrice] = useState<number>(449);
  const [targetAudience, setTargetAudience] = useState('رجال ونساء (18 - 65 سنة) يعانون من القلق والأرق');
  const [problemSolved, setProblemSolved] = useState('الأرق وقلة النوم، التوتر العصبي، الإرهاق العضلي وتشنجات الليل');
  const [offerHook, setOfferHook] = useState('اشتري 2 علب واحصل على الثالثة مجاناً + شحن مجاني والدفع بعد المعاينة');
  
  // Detailed Product Description Box
  const [productDescription, setProductDescription] = useState(
    'حلوى جيليه طبيعية ولذيذة بنكهة التوت البري، صُممت بتركيبة متطورة تجمع بين المغنيسيوم عالي الامتصاص (Magnesium Citrate & Glycinate) وفيتامين B6 مع مستخلصات البابونج المهدئ. تساعد في استرخاء الجهاز العصبي والعضلات، وتحفيز النوم العميق دون الإحساس بالخمول صباحاً، مع ضمان الجودة 100% وخلوها من السكر والمواد الحافظة.'
  );

  // Uploaded User Media
  const [userUploadedImage, setUserUploadedImage] = useState<string>(defaultInitialImage);
  const [userUploadedVideo, setUserUploadedVideo] = useState<string | null>(null);
  const fileInputImageRef = useRef<HTMLInputElement>(null);
  const fileInputVideoRef = useRef<HTMLInputElement>(null);

  // Status notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiGenStep, setAiGenStep] = useState<string>('');

  // Discount percentage
  const discountPercent = Math.max(
    10,
    Math.round(((Number(productOriginalPrice) - Number(productPrice)) / (Number(productOriginalPrice) || 1)) * 100)
  );

  // Handle image upload from computer / phone
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUserUploadedImage(event.target.result as string);
        setToastMessage('تم رفع صورة السلعة بنجاح وتحديث كافة الكرياتيف والصفحات تلقائياً!');
        setTimeout(() => setToastMessage(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  // =========================================================================
  // AI CREATIVE GENERATION ENGINE (توليد الكرياتيف بالذكاء الاصطناعي)
  // =========================================================================
  const handleTriggerAiGeneration = () => {
    setIsAiGenerating(true);
    setAiGenStep('1. جاري تحليل صورة ومواصفات السلعة بواسطة الذكاء الاصطناعي...');

    setTimeout(() => {
      setAiGenStep('2. جاري استخراج زوايا البيع الفيروسية الأكثر طلباً في سوق الدفع عند الاستلام بالمغرب...');
    }, 600);

    setTimeout(() => {
      setAiGenStep('3. جاري توليد 3 بوستات إعلانية واقعية حقيقية + 3 فيديوهات مخصصة (تعليمي، استعمال، UGC)...');
    }, 1200);

    setTimeout(() => {
      setIsAiGenerating(false);
      setToastMessage('✨ تم توليد الكرياتيف الاحترافية بالذكاء الاصطناعي بنجاح! يمكنك الآن تعديل أي عنصر وتنزيلها بدقة عالية.');
      setTimeout(() => setToastMessage(null), 4000);
    }, 1800);
  };

  // =========================================================================
  // AI IMAGE CREATIVES & IN-APP DESIGN STUDIO (التحكم في الديزاين)
  // =========================================================================
  const [selectedAdPostIndex, setSelectedAdPostIndex] = useState<0 | 1 | 2>(0);
  const [studioBgStyle, setStudioBgStyle] = useState<'titanium_dark' | 'emerald_glow' | 'royal_purple' | 'studio_white'>('titanium_dark');
  const [productScale, setProductScale] = useState<number>(100);
  const [showStudioShadow, setShowStudioShadow] = useState<boolean>(true);
  const [activeBadgeText, setActiveBadgeText] = useState<string>('تخفيض -45% اليوم فقط 🔥');
  const [isEditingDesignLayers, setIsEditingDesignLayers] = useState<boolean>(false);

  // 3 AI-Generated High-Converting Ad Posts Content
  const [aiAdPosts, setAiAdPosts] = useState([
    {
      id: 1,
      type: 'studio',
      tag: 'إعلان الاستوديو الفاخر (Commercial Studio Ad)',
      headline: 'الحل الطبيعي المضمون للتخلص من الأرق والتوتر العصبي',
      subheadline: 'حلوى المغنيسيوم المعقد اللذيذة لنوم عميق واسترخاء فوري',
      badge: 'عرض محدود اليوم فقط 🔥',
      cta: 'اطلب الآن والدفع عند الاستلام 🚚',
      theme: 'emerald',
    },
    {
      id: 2,
      type: 'viral_hook',
      tag: 'بوست المشكل والحل الفيروسي (Viral Problem & Solution)',
      headline: 'واش كتعاني من قلة النعاس والعياء المستمر طيلة اليوم؟',
      subheadline: 'اكتشف سر الطاقة والاسترخاء العضلي الموصى به من الخبراء',
      badge: 'طبيعي وأصلي 100% 🌿',
      cta: 'اضغط هنا للاستفادة من التخفيض 🛒',
      theme: 'purple',
    },
    {
      id: 3,
      type: 'pack_scarcity',
      tag: 'بوست باقة العرض الخاص والمخزون (Pack & Scarcity Post)',
      headline: 'باقة التوفير الثلاثية: اشتري 2 علب واحصل على الثالثة مجاناً',
      subheadline: 'تقييم 4.9/5 نجوم من أكثر من 3,840 زبون مغربي راضٍ',
      badge: 'باقي 7 قطع في المخزن فقط ⏳',
      cta: 'استفد من باقة التوفير قبل النفاد 🎁',
      theme: 'amber',
    },
  ]);

  // Pixel-Perfect 1080x1080 Canvas Engine (مطابق تماماً لما يظهر في الشاشة)
  const downloadPixelPerfectCreative = (postIdx: number) => {
    const post = aiAdPosts[postIdx] || aiAdPosts[0];
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Helper: Wrap Arabic text cleanly
    const drawWrappedText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      font: string,
      color: string
    ) => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      const words = text.split(' ');
      let line = '';
      const lines: string[] = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      let currentY = y;
      for (let k = 0; k < lines.length; k++) {
        ctx.fillText(lines[k].trim(), x, currentY);
        currentY += lineHeight;
      }
      return currentY;
    };

    // Helper: Draw rounded rectangle
    const drawRoundRect = (x: number, y: number, w: number, h: number, radius: number, fill: string, stroke?: string) => {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, radius);
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.restore();
    };

    // Background based on studioBgStyle
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
    if (studioBgStyle === 'titanium_dark') {
      bgGrad.addColorStop(0, '#061715');
      bgGrad.addColorStop(0.5, '#04221f');
      bgGrad.addColorStop(1, '#02100e');
    } else if (studioBgStyle === 'emerald_glow') {
      bgGrad.addColorStop(0, '#022c22');
      bgGrad.addColorStop(0.5, '#064e3b');
      bgGrad.addColorStop(1, '#022c22');
    } else if (studioBgStyle === 'royal_purple') {
      bgGrad.addColorStop(0, '#1e1b4b');
      bgGrad.addColorStop(0.5, '#2e1065');
      bgGrad.addColorStop(1, '#0f172a');
    } else {
      bgGrad.addColorStop(0, '#f8fafc');
      bgGrad.addColorStop(1, '#e2e8f0');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Subtle Radial Glow
    const radial = ctx.createRadialGradient(540, 500, 40, 540, 500, 450);
    radial.addColorStop(0, studioBgStyle === 'royal_purple' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(16, 185, 129, 0.22)');
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1080, 1080);

    // Top Urgency Ribbon
    drawRoundRect(80, 45, 920, 68, 20, post.theme === 'purple' ? '#7c3aed' : '#059669');
    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`⚡ ${post.badge} · التوصيل مجاني لكافة المدن 🇲🇦`, 540, 90);

    // Glass Container for Headline
    const isLightBg = studioBgStyle === 'studio_white';
    drawRoundRect(60, 135, 960, 135, 24, isLightBg ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.65)', isLightBg ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.12)');
    drawWrappedText(post.headline, 540, 182, 900, 42, 'bold 34px sans-serif', isLightBg ? '#0f172a' : '#fef08a');
    drawWrappedText(post.subheadline, 540, 234, 900, 32, 'bold 24px sans-serif', isLightBg ? '#475569' : '#cbd5e1');

    // Load User Product Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = userUploadedImage;

    const renderImageAndFinish = () => {
      const frameX = 220;
      const frameY = 300;
      const frameW = 640;
      const frameH = 500;

      // Soft container & studio podium
      drawRoundRect(frameX, frameY, frameW, frameH, 32, isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255, 255, 255, 0.04)', isLightBg ? 'rgba(0,0,0,0.08)' : 'rgba(255, 255, 255, 0.08)');
      
      try {
        const aspect = img.width / img.height;
        const scaleFactor = productScale / 100;
        let dw = (frameW - 60) * scaleFactor;
        let dh = dw / aspect;
        if (dh > (frameH - 60) * scaleFactor) {
          dh = (frameH - 60) * scaleFactor;
          dw = dh * aspect;
        }
        const dx = frameX + (frameW - dw) / 2;
        const dy = frameY + (frameH - dh) / 2;

        if (showStudioShadow) {
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
          ctx.shadowBlur = 45;
          ctx.shadowOffsetY = 25;
          ctx.drawImage(img, dx, dy, dw, dh);
          ctx.restore();
        } else {
          ctx.drawImage(img, dx, dy, dw, dh);
        }
      } catch (err) {
        console.warn('Canvas image draw error', err);
      }

      // 3D Floating Price Tag
      const priceY = 825;
      drawRoundRect(280, priceY, 520, 90, 24, '#f59e0b', '#fbbf24');
      ctx.font = 'bold 26px sans-serif';
      ctx.fillStyle = '#78350f';
      ctx.textAlign = 'center';
      ctx.fillText(`${productOriginalPrice} DH`, 410, priceY + 54);
      ctx.fillRect(350, priceY + 46, 120, 3); // strike line

      ctx.font = '900 48px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(`${productPrice} DH فقط`, 620, priceY + 60);

      // Bottom CTA Bar
      const ctaY = 940;
      drawRoundRect(60, ctaY, 960, 95, 24, post.theme === 'purple' ? '#3b82f6' : '#10b981');
      ctx.font = 'bold 36px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(`🛒 ${post.cta}`, 540, ctaY + 60);

      // Trust Footer
      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = isLightBg ? '#64748b' : '#94a3b8';
      ctx.fillText('🚚 توصيل مجاني وسريع لكافة المدن · 💵 الدفع بعد المعاينة · 🛡️ ضمان 7 أيام', 540, 1060);

      // Trigger Clean High-Res PNG Download
      try {
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `creative-ad-${postIdx + 1}-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.warn('Canvas export fallback', e);
      }
    };

    if (img.complete) {
      renderImageAndFinish();
    } else {
      img.onload = renderImageAndFinish;
      img.onerror = renderImageAndFinish;
    }
  };

  // Direct Canva & Photopea Integration
  const openInPhotopea = () => {
    const photopeaConfig = {
      files: [userUploadedImage],
      environment: { theme: 2, vtools: true },
    };
    window.open(`https://www.photopea.com#${encodeURIComponent(JSON.stringify(photopeaConfig))}`, '_blank');
  };

  const openInCanva = () => {
    window.open('https://www.canva.com/create/facebook-ads/', '_blank');
  };

  // =========================================================================
  // AI VIDEO CREATIVES: 3 DISTINCT FORMATS REQUESTED BY THE USER
  // 1. فيديو تعليمي وشرح (Educational)
  // 2. فيديو طريقة الاستعمال (Usage in action)
  // 3. فيديو تجربة حقيقية / UGC (UGC Experience)
  // =========================================================================
  const [selectedVideoMode, setSelectedVideoMode] = useState<'educational' | 'usage' | 'ugc'>('educational');
  const [videoSceneIndex, setVideoSceneIndex] = useState<number>(0);
  const [videoIsPlaying, setVideoIsPlaying] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoSpeed, setVideoSpeed] = useState<'normal' | 'fast'>('normal');
  const [isVoiceMuted, setIsVoiceMuted] = useState<boolean>(false);
  const [isEditingVideoScript, setIsEditingVideoScript] = useState<boolean>(false);

  // Video 1: Educational / Explainer Video Scripts (4 Scenes)
  const [educationalScenes, setEducationalScenes] = useState([
    {
      id: 1,
      tag: 'المشهد 1: الحقيقة العلمية (Science Hook)',
      speaker: 'د. كريم - أخصائي تغذية وصحة',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      spokenText: 'واش عارف بلي 80% من مشاكل الأرق والتوتر سببها نقص المغنيسيوم في الجسم؟ إليكم التفسير الطبي.',
      caption: 'نقص المغنيسيوم هو السبب الخفي للأرق والستريس! 🧠',
      visualType: 'doctor_explaining',
      badge: 'حقائق علمية مثبتة 🔬',
    },
    {
      id: 2,
      tag: 'المشهد 2: التركيبة وسرعة الامتصاص (Active Ingredients)',
      speaker: 'د. كريم - شرح التركيبة',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      spokenText: 'هاد الحلوى كتحتوي على جزيئات المغنيسيوم سريعة الامتصاص مع فيتامين B6 اللي كيوصل مباشرة للخلايا.',
      caption: 'مغنيسيوم عالي الامتصاص مع فيتامين B6 ومستخلصات البابونج ✨',
      visualType: 'product_zoom',
      badge: 'امتصاص فائق وسريع ⚡',
    },
    {
      id: 3,
      tag: 'المشهد 3: المفعول داخل الجسم (How It Calms Nerves)',
      speaker: 'د. كريم - التأثير العصبي',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      spokenText: 'كيساعد العضلات باش تسترخي وينظم إفراز هرمون النوم الطبيعي باش تنعس نوم عميق بدون انقطاع.',
      caption: 'استرخاء عضلات الجسم وإفراز هرمون النوم طبيعياً 💤',
      visualType: 'product_benefit',
      badge: 'بدون أي إدمان أو خمول 🌿',
    },
    {
      id: 4,
      tag: 'المشهد 4: التوصية والطلب (Doctor Recommendation)',
      speaker: 'د. كريم - الخلاصة الطبية',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      spokenText: 'كنصح بيه كبديل طبيعي آمن 100%. اطلبوه دابا من الموزع المعتمد مع التوصيل المجاني والدفع عند الاستلام.',
      caption: 'موصى به كبديل طبيعي آمن 100% · توصيل فابور 🚚',
      visualType: 'offer_recommendation',
      badge: 'ضمان الجودة والأصالة 🛡️',
    },
  ]);

  // Video 2: Usage / How-To Video Scripts (4 Scenes)
  const [usageScenes, setUsageScenes] = useState([
    {
      id: 1,
      tag: 'المشهد 1: الروتين والسهولة (Daily Routine Hook)',
      speaker: 'ياسين - أسلوب حياة صحي',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      spokenText: 'طريقة استعمال بسيطة ولذيذة كتغنيك على الفانيد والأدوية الكيميائية المرة!',
      caption: 'روتين مسائي ممتع يغير جودة نومك للأفضل 🌙',
      visualType: 'creator_routine',
      badge: 'سهل وممتع في الاستعمال 🍇',
    },
    {
      id: 2,
      tag: 'المشهد 2: الجرعة والتوقيت (Dosage & Timing)',
      speaker: 'ياسين - طريقة الأخذ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      spokenText: 'غير جوج حبات جيليه بنكهة التوت اللذيذة قبل موعد النعاس بنصف ساعة. مكتحتاجش حتى الماء!',
      caption: 'حبتين يومياً قبل النوم بـ 30 دقيقة بدون ماء ⏱️',
      visualType: 'product_zoom',
      badge: 'مذاق التوت اللذيذ 🍬',
    },
    {
      id: 3,
      tag: 'المشهد 3: المفعول السريع والاسترخاء (Instant Relaxation)',
      speaker: 'ياسين - الإحساس بالراحة',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      spokenText: 'كتدوب في الفم وكتحس بالهدوء كينزل عليك والعضلات كترتاح تدريجياً حتى كتنعس.',
      caption: 'امتصاص فوري وراحة عصبية تامة في دقائق 😴',
      visualType: 'creator_delight',
      badge: 'نوم هادئ ومريح 💯',
    },
    {
      id: 4,
      tag: 'المشهد 4: الاستيقاظ بنشاط (Fresh Morning & COD)',
      speaker: 'ياسين - نشاط الصباح',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      spokenText: 'كتفيق الصباح ناشط وخفيف بدون عياء. اطلب دابا واستفد من عرض التوصيل المجاني!',
      caption: 'استيقاظ بنشاط وطاقة طيلة النهار ☀️',
      visualType: 'offer_recommendation',
      badge: 'التوصيل مجاني لجميع المدن 🇲🇦',
    },
  ]);

  // Video 3: UGC Creator Experience & Testimonial Scripts (4 Scenes)
  const [ugcScenes, setUgcScenes] = useState([
    {
      id: 1,
      tag: 'المشهد 1: الهوك الواقعي (UGC Authentic Hook)',
      speaker: 'سارة - منشئة محتوى مغربية',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      spokenText: 'البنات، شكون فيكم كتعاني من الأرق والستريس بحالي؟ جبت ليكم الحل السحري اللي عتقني!',
      caption: 'واش كتعاني من قلة النعاس وتشنج العضلات؟ شوف هادي! 😱',
      visualType: 'creator_talking',
      badge: 'تجربتي الصادقة 100% ✨',
    },
    {
      id: 2,
      tag: 'المشهد 2: استعراض العلبة الحقيقية (Product Unboxing)',
      speaker: 'سارة - فتح العلبة',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      spokenText: 'شوفو معايا هاد حلوى المغنيسيوم الأصلية، الجودة ديالها تبارك الله وبنينة بحال الفواكه.',
      caption: 'حلوى المغنيسيوم الأصلية بنكهة التوت الطبيعي 🍇',
      visualType: 'product_zoom',
      badge: 'جودة ممتازة وأصلية 💯',
    },
    {
      id: 3,
      tag: 'المشهد 3: النتيجة بعد أسبوع (Transformation After 7 Days)',
      speaker: 'سارة - النتيجة والراحة',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      spokenText: 'كنت كنعس 3 ساعات ومقطعة، دابا كننعس ليلة كاملة نوم عميق بدون أي صداع ولا كوشمار.',
      caption: 'نوم عميق ليلة كاملة بعد أسبوع فقط من الاستعمال ⭐',
      visualType: 'creator_delight',
      badge: 'تقييم 5 نجوم من الزبناء 🌟',
    },
    {
      id: 4,
      tag: 'المشهد 4: العرض الحصري والدفع عند الاستلام (Exclusive COD Offer)',
      speaker: 'سارة - العرض المحدود',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      spokenText: 'دايرين برومو: شري 2 علب وتاخد الثالثة فابور! والتوصيل بالمجان وكتخلص حتى كتقلب سلعتك.',
      caption: 'اشتري 2 واحصل على الثالثة مجاناً + توصيل مجاني 🚚',
      visualType: 'offer_recommendation',
      badge: 'باقي قطع قليلة بالسعر التخفيضي ⏳',
    },
  ]);

  // Current Active Video Scenes List
  const currentActiveScenes =
    selectedVideoMode === 'educational'
      ? educationalScenes
      : selectedVideoMode === 'usage'
      ? usageScenes
      : ugcScenes;

  // Real Speech Synthesis Voiceover
  const speakCurrentScene = (text: string) => {
    if (isVoiceMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = selectedVideoMode === 'ugc' ? 1.15 : selectedVideoMode === 'educational' ? 0.95 : 1.0;
      utterance.lang = 'ar-SA';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error', e);
    }
  };

  // Video Loop
  useEffect(() => {
    if (!videoIsPlaying) return;
    const intervalTime = videoSpeed === 'fast' ? 70 : 100;
    const timer = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 100) {
          setVideoSceneIndex((s) => {
            const nextIdx = (s + 1) % currentActiveScenes.length;
            speakCurrentScene(currentActiveScenes[nextIdx].spokenText);
            return nextIdx;
          });
          return 0;
        }
        return prev + 2.5;
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [videoIsPlaying, videoSpeed, currentActiveScenes, isVoiceMuted, selectedVideoMode]);

  // =========================================================================
  // DETAILED LANDING PAGE (ديطاي ديال لي ديطاي)
  // =========================================================================
  const [lpDevice, setLpDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [selectedPack, setSelectedPack] = useState<1 | 2 | 3>(2);
  const [orderCustomerName, setOrderCustomerName] = useState('');
  const [orderCustomerPhone, setOrderCustomerPhone] = useState('');
  const [orderCustomerCity, setOrderCustomerCity] = useState('الدار البيضاء');
  const [orderSuccessSubmitted, setOrderSuccessSubmitted] = useState<boolean>(false);
  const [landingFormError, setLandingFormError] = useState<string | null>(null);

  // Live countdown timer
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 28, seconds: 15 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pack Helper
  const getPackDetails = () => {
    if (selectedPack === 1) return { title: 'علبة واحدة (تجربة)', price: productPrice, note: 'شحن مجاني' };
    if (selectedPack === 2) return { title: 'باك 2 علب (الأكثر طلباً)', price: Math.round(productPrice * 1.65), note: '+ علبة هدية مجانية 🎁' };
    return { title: 'باك العائلة (3 علب)', price: Math.round(productPrice * 2.2), note: 'توفير 45% + هدايا قيمة' };
  };

  // Submit Order Form inside Landing Page
  const handleLandingCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLandingFormError(null);
    if (!orderCustomerPhone.trim()) {
      setLandingFormError('يرجى كتابة رقم الهاتف للتواصل معك هاتفياً وتأكيد التوصيل');
      return;
    }
    setOrderSuccessSubmitted(true);
  };

  // Full HTML Landing Page Download
  const downloadFullStandaloneHtml = () => {
    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${productTitle} - المتجر الرسمي</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>body { font-family: 'Tajawal', sans-serif; background-color: #f8fafc; }</style>
</head>
<body class="pb-20 text-slate-900">
  <div class="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center py-2.5 px-4 text-xs font-black shadow-md flex items-center justify-center gap-2">
    <span>🔥 تخفيض حصري ${discountPercent}% اليوم فقط · التوصيل مجاني لجميع المدن المغربية والدفع بعد المعاينة</span>
  </div>

  <main class="max-w-xl mx-auto px-4 pt-4 space-y-4">
    <div class="text-center space-y-1.5">
      <span class="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase inline-block">${productNiche}</span>
      <h1 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight">${productTitle}</h1>
      <p class="text-xs text-slate-600 font-medium">${problemSolved}</p>
    </div>

    <div class="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg aspect-square bg-slate-950 flex items-center justify-center">
      <img src="${userUploadedImage}" alt="${productTitle}" class="w-full h-full object-contain p-4">
      <div class="absolute top-3 right-3 bg-rose-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg">خصم ${discountPercent}%</div>
      <div class="absolute bottom-3 inset-x-3 bg-black/80 backdrop-blur-md text-white p-2.5 rounded-xl text-center text-xs font-bold">${offerHook}</div>
    </div>

    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <span class="text-xs text-slate-400 line-through font-bold block">${productOriginalPrice} DH</span>
        <span class="text-2xl font-black text-emerald-600">${productPrice} DH</span>
      </div>
      <div class="text-left text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl font-bold border border-emerald-200">
        توفير ${Number(productOriginalPrice) - Number(productPrice)} DH اليوم
      </div>
    </div>

    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs leading-relaxed">
      <h3 class="text-sm font-black text-slate-900 border-b pb-2">📋 الوصف المفصل، المكونات والفوائد الصحية (ديطاي ديال لي ديطاي):</h3>
      <p class="text-slate-700 font-medium">${productDescription}</p>
      <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-bold space-y-1">
        <span>💡 طريقة الاستعمال الموصى بها:</span>
        <p class="font-normal text-slate-800">تناول حبتين يومياً قبل موعد النوم بـ 30 دقيقة للحصول على استرخاء تدريجي ونوم عميق بدون انقطاع.</p>
      </div>
    </div>

    <div class="bg-gradient-to-b from-slate-900 to-slate-950 text-white p-5 rounded-3xl shadow-xl space-y-4">
      <div class="text-center space-y-1">
        <h2 class="text-lg font-black text-emerald-400">استمارة الطلب السريع (الدفع عند الاستلام)</h2>
        <p class="text-xs text-slate-300">أدخل معلوماتك وسنتصل بك هاتفياً لتأكيد الشحن الفوري</p>
      </div>
      <form onsubmit="alert('تم استلام طلبك بنجاح! سنتصل بك للتأكيد.'); return false;" class="space-y-3 text-xs text-slate-900">
        <input type="text" required placeholder="الاسم الكامل" class="w-full p-2.5 bg-white rounded-xl font-bold">
        <input type="tel" required placeholder="رقم الهاتف (06XXXXXXXX)" class="w-full p-2.5 bg-white rounded-xl font-bold" dir="ltr">
        <input type="text" required placeholder="المدينة" class="w-full p-2.5 bg-white rounded-xl font-bold">
        <button type="submit" class="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl cursor-pointer">
          تأكيد الطلب الآن (الدفع عند الاستلام 🚚)
        </button>
      </form>
    </div>
  </main>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `landing-page-${productTitle.replace(/\s+/g, '-').slice(0, 30)}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 pb-16 animate-in fade-in duration-200" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ========================================================
          1. AI COMMAND CENTER & TOP DASHBOARD HEADER
         ======================================================== */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-teal-400 flex items-center justify-center shrink-0 shadow-lg ring-4 ring-purple-500/20">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-black tracking-tight text-white">
                  استوديو توليد الكرياتيف بالذكاء الاصطناعي (AI Creative & Video Studio)
                </h1>
                <span className="text-[10px] font-black bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                  AI Powered
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                توليد بوستات إعلانية احترافية حقيقية + 3 فيديوهات مخصصة (تعليمي، طريقة الاستعمال، وUGC) مع لاكسي كامل للديزاين والمونطاج
              </p>
            </div>
          </div>

          {/* AI Trigger Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleTriggerAiGeneration}
              disabled={isAiGenerating}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 hover:from-purple-700 hover:to-emerald-600 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm border border-white/20"
            >
              <Sparkles className={`w-4 h-4 ${isAiGenerating ? 'animate-spin' : 'animate-bounce'}`} />
              <span>{isAiGenerating ? 'جاري التوليد بالذكاء الاصطناعي...' : 'توليد الكرياتيف بالذكاء الاصطناعي ✨'}</span>
            </button>
          </div>
        </div>

        {/* AI Generation Progress Banner */}
        {isAiGenerating && (
          <div className="p-3 bg-purple-900/60 border border-purple-500/40 rounded-2xl text-xs text-purple-200 font-bold flex items-center gap-3 animate-pulse">
            <RefreshCw className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
            <span>{aiGenStep}</span>
          </div>
        )}

        {/* 4 Main View Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('creatives')}
            className={`py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'creatives'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg ring-2 ring-purple-400/40'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-purple-300" />
            <span>1. بوستات الصور</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg ring-2 ring-rose-400/40'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Video className="w-4 h-4 text-rose-300" />
            <span>2. فيديوهات AI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scripts')}
            className={`py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'scripts'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg ring-2 ring-amber-300/50'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Copy className="w-4 h-4 text-amber-300" />
            <span>3. مكتبة السكريبتات 📋</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('landing_page')}
            className={`py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'landing_page'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg ring-2 ring-emerald-400/40'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Layout className="w-4 h-4 text-teal-300" />
            <span>4. صفحة الهبوط المفصلة</span>
          </button>
        </div>
      </div>

      {/* Global Toast */}
      {toastMessage && (
        <div className="p-3.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg border border-emerald-400 flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="p-1 hover:opacity-75 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================
          2. PRODUCT SPECS & MEDIA UPLOAD CENTER
         ======================================================== */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-purple-600" />
            <h2 className="text-xs sm:text-sm font-black text-slate-900">
              مدخلات السلعة وصورتك الحقيقية (Magnesium Gummies)
            </h2>
          </div>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            كل تعديل ينعكس فورياً على التصاميم والفيديوهات والصفحة
          </span>
        </div>

        <input
          type="file"
          ref={fileInputImageRef}
          onChange={handleImageFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-xs">
          {/* Photo Box (4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-200 shadow-sm flex items-center justify-center group">
              <img
                src={userUploadedImage}
                alt={productTitle}
                className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 inset-x-2 flex items-center gap-1.5 z-10">
                <button
                  type="button"
                  onClick={() => fileInputImageRef.current?.click()}
                  className="flex-1 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>تغيير صورة السلعة</span>
                </button>
              </div>
              <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-lg shadow-md flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>صورتك المرفوعة</span>
              </div>
            </div>
          </div>

          {/* Form Fields (8 Cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-black text-slate-700">اسم المنتج:</label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-purple-600 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-700">المجال / الصنف:</label>
                <select
                  value={productNiche}
                  onChange={(e) => setProductNiche(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-purple-600 cursor-pointer text-xs"
                >
                  <option value="مكملات غذائية وعناية صحية (Compléments)">مكملات غذائية وعناية صحية (Compléments)</option>
                  <option value="كوسميتيك ومواد التجميل (Cosmétique)">كوسميتيك ومواد التجميل (Cosmétique)</option>
                  <option value="أجهزة إلكترونية ذكية (Électronique & Gadgets)">أجهزة إلكترونية ذكية (Électronique)</option>
                  <option value="مستلزمات المنزل والمطبخ (Maison & Cuisine)">مستلزمات المنزل والمطبخ (Maison)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-black text-slate-700">سعر البيع (DH):</label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-black text-emerald-700 focus:outline-none focus:border-purple-600 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-700">السعر قبل الخصم (DH):</label>
                <input
                  type="number"
                  value={productOriginalPrice}
                  onChange={(e) => setProductOriginalPrice(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-500 line-through focus:outline-none focus:border-purple-600 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-700">الفئة المستهدفة:</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-purple-600 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-black text-slate-700 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-rose-600" />
                <span>المشكل الذي يعالجه المنتج:</span>
              </label>
              <input
                type="text"
                value={problemSolved}
                onChange={(e) => setProblemSolved(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-purple-600 text-xs"
              />
            </div>

            {/* Detailed Description Box */}
            <div className="space-y-1">
              <label className="font-black text-slate-700 flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-blue-600" />
                <span>وصف المنتج المفصل، المكونات، وطريقة الاستعمال (ديطاي ديال لي ديطاي):</span>
              </label>
              <textarea
                rows={3}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-purple-600 text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          TAB 1: AI IMAGE CREATIVES & IN-APP DESIGN STUDIO
          (مع لاكسي للديزاين باش نموديفي فيه اللي بغيت)
         ======================================================== */}
      {activeTab === 'creatives' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Studio Toolbar & Post Selector */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <span>محرر واستوديو الديزاين المباشر للبوستات الإعلانية (In-App Design Studio)</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  اختر أحد البوستات الـ 3 المولدة بواسطة الذكاء الاصطناعي، وتحكم في الإضاءة والخلفية والمقاس والستيكرات
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={openInCanva}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-black rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح على Canva</span>
                </button>
                <button
                  type="button"
                  onClick={openInPhotopea}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح على Photopea</span>
                </button>
              </div>
            </div>

            {/* Post Format Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {aiAdPosts.map((post, idx) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => setSelectedAdPostIndex(idx as any)}
                  className={`p-3 rounded-2xl text-right border transition-all cursor-pointer ${
                    selectedAdPostIndex === idx
                      ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase text-purple-700 block">
                    البوست {idx + 1}
                  </span>
                  <span className="font-black text-slate-900 text-xs block truncate">
                    {post.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* IN-APP DESIGN STUDIO CONTROLS (لاكسي للمونطاج والديزاين) */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between font-black text-slate-800 pb-2 border-b border-slate-200/80">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-purple-600" />
                  <span>أدوات تعديل الديزاين والمؤثرات (Design Controls):</span>
                </span>
                <span className="text-[11px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-bold">
                  {aiAdPosts[selectedAdPostIndex].tag}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Background Selector */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">خلفية الاستوديو (Studio Background):</label>
                  <select
                    value={studioBgStyle}
                    onChange={(e) => setStudioBgStyle(e.target.value as any)}
                    className="w-full p-2 bg-white rounded-xl border border-slate-300 font-bold text-xs cursor-pointer"
                  >
                    <option value="titanium_dark">داكن تيتانيوم فاخر (Titanium Studio)</option>
                    <option value="emerald_glow">أخضر زمردي متوهج (Emerald Glow)</option>
                    <option value="royal_purple">أرجواني ملكي (Royal Purple)</option>
                    <option value="studio_white">استوديو أبيض نقي (Clean White)</option>
                  </select>
                </div>

                {/* Scale & Zoom Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>حجم وتكبير السلعة:</span>
                    <span className="text-purple-600 font-black">{productScale}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="130"
                    value={productScale}
                    onChange={(e) => setProductScale(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                {/* Studio Shadow Toggle */}
                <div className="flex items-center gap-3 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={showStudioShadow}
                      onChange={(e) => setShowStudioShadow(e.target.checked)}
                      className="w-4 h-4 accent-purple-600"
                    />
                    <span>إضاءة وظل الاستوديو الواقعي (3D Shadow)</span>
                  </label>
                </div>
              </div>

              {/* In-Place Text Editing Button */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600 font-medium">يمكنك تعديل أي نص في التصميم بالضغط على زر التعديل:</span>
                <button
                  type="button"
                  onClick={() => setIsEditingDesignLayers(!isEditingDesignLayers)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-300 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-purple-600" />
                  <span>{isEditingDesignLayers ? 'إغلاق نافذة التعديل' : 'تعديل نصوص التصميم'}</span>
                </button>
              </div>

              {isEditingDesignLayers && (
                <div className="p-3 bg-white rounded-xl border border-purple-200 space-y-2 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-0.5">العنوان الرئيسي:</label>
                      <input
                        type="text"
                        value={aiAdPosts[selectedAdPostIndex].headline}
                        onChange={(e) => {
                          const updated = [...aiAdPosts];
                          updated[selectedAdPostIndex].headline = e.target.value;
                          setAiAdPosts(updated);
                        }}
                        className="w-full p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-0.5">العنوان الفرعي:</label>
                      <input
                        type="text"
                        value={aiAdPosts[selectedAdPostIndex].subheadline}
                        onChange={(e) => {
                          const updated = [...aiAdPosts];
                          updated[selectedAdPostIndex].subheadline = e.target.value;
                          setAiAdPosts(updated);
                        }}
                        className="w-full p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-0.5">شارة العرض (Badge):</label>
                      <input
                        type="text"
                        value={aiAdPosts[selectedAdPostIndex].badge}
                        onChange={(e) => {
                          const updated = [...aiAdPosts];
                          updated[selectedAdPostIndex].badge = e.target.value;
                          setAiAdPosts(updated);
                        }}
                        className="w-full p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-0.5">نص زر الطلب:</label>
                      <input
                        type="text"
                        value={aiAdPosts[selectedAdPostIndex].cta}
                        onChange={(e) => {
                          const updated = [...aiAdPosts];
                          updated[selectedAdPostIndex].cta = e.target.value;
                          setAiAdPosts(updated);
                        }}
                        className="w-full p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* THE LIVE 1080x1080 AI CREATIVE PREVIEW */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-800 flex flex-col items-center justify-center space-y-4 shadow-xl">
            <div className="flex items-center justify-between w-full max-w-[420px] text-xs text-slate-300 pb-2">
              <span className="font-bold">معاينة البوست الإعلاني الفعلي (Square 1080x1080):</span>
              <span className="text-[11px] bg-slate-800 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                1080x1080 HD
              </span>
            </div>

            {/* The Actual Rendered Creative Box */}
            <div
              className={`relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl border flex flex-col justify-between p-4 sm:p-5 select-none transition-all ${
                studioBgStyle === 'titanium_dark'
                  ? 'bg-gradient-to-b from-[#061715] via-[#04221f] to-[#02100e] border-emerald-500/30 text-white'
                  : studioBgStyle === 'emerald_glow'
                  ? 'bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] border-emerald-400/40 text-white'
                  : studioBgStyle === 'royal_purple'
                  ? 'bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#0f172a] border-purple-500/40 text-white'
                  : 'bg-gradient-to-b from-slate-50 to-slate-200 border-slate-300 text-slate-900'
              }`}
            >
              {/* Top Urgency Ribbon */}
              <div
                className={`py-1.5 px-3 rounded-2xl text-center text-xs font-black shadow-md flex items-center justify-between ${
                  aiAdPosts[selectedAdPostIndex].theme === 'purple'
                    ? 'bg-purple-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                <span>⚡ {aiAdPosts[selectedAdPostIndex].badge}</span>
                <span className="text-[9px] bg-black/30 px-2 py-0.5 rounded-md">COD المغرب 🇲🇦</span>
              </div>

              {/* Headline Container */}
              <div
                className={`p-2.5 rounded-2xl text-center space-y-0.5 my-1 border ${
                  studioBgStyle === 'studio_white'
                    ? 'bg-white/85 border-black/10'
                    : 'bg-black/65 backdrop-blur-md border-white/10'
                }`}
              >
                <h4
                  className={`text-xs sm:text-sm font-black leading-snug ${
                    studioBgStyle === 'studio_white' ? 'text-slate-900' : 'text-amber-300'
                  }`}
                >
                  {aiAdPosts[selectedAdPostIndex].headline}
                </h4>
                <p
                  className={`text-[10px] font-bold line-clamp-1 ${
                    studioBgStyle === 'studio_white' ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  {aiAdPosts[selectedAdPostIndex].subheadline}
                </p>
              </div>

              {/* Product Center with Scale and 3D Shadow */}
              <div className="relative my-auto flex items-center justify-center py-2">
                <img
                  src={userUploadedImage}
                  alt={productTitle}
                  style={{
                    transform: `scale(${productScale / 100})`,
                  }}
                  className={`max-h-[170px] w-auto object-contain transition-transform duration-200 ${
                    showStudioShadow
                      ? 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]'
                      : ''
                  }`}
                />
              </div>

              {/* 3D Price Pill */}
              <div className="bg-amber-400 text-slate-950 px-4 py-1.5 rounded-2xl font-black text-center shadow-lg border-2 border-white flex items-center justify-between text-xs mx-4">
                <span className="line-through text-slate-700 text-[10px]">{productOriginalPrice} DH</span>
                <span className="text-sm sm:text-base font-black">{productPrice} DH فقط</span>
              </div>

              {/* Bottom CTA Button */}
              <div
                className={`w-full py-2.5 font-black text-center text-xs rounded-2xl shadow-lg flex items-center justify-center gap-1.5 mt-2 ${
                  aiAdPosts[selectedAdPostIndex].theme === 'purple'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{aiAdPosts[selectedAdPostIndex].cta}</span>
              </div>
            </div>

            {/* Direct High-Resolution Download Button */}
            <button
              type="button"
              onClick={() => downloadPixelPerfectCreative(selectedAdPostIndex)}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-2xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
            >
              <Download className="w-4 h-4" />
              <span>تحميل التصميم الآن بدقة 1080x1080 HD (PNG)</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: AI VIDEO CREATIVES (3 DISTINCT MODES: EDU, USAGE, UGC)
         ======================================================== */}
      {activeTab === 'videos' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <Film className="w-5 h-5 text-rose-600" />
                  <span>استوديو فيديوهات الذكاء الاصطناعي (3 أنواع مختلفة مولدة خصيصاً)</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  اختر نوع الفيديو: فيديو تعليمي يشرح العلم والمكونات، فيديو يوضح طريقة الاستعمال، أو فيديو UGC تجربة زبون
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingVideoScript(!isEditingVideoScript)}
                  className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black rounded-xl border border-rose-200 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>{isEditingVideoScript ? 'إغلاق المونطاج' : 'استوديو مونطاج السكربت'}</span>
                </button>
              </div>
            </div>

            {/* THE 3 VIDEO FORMAT SELECTOR BUTTONS REQUESTED BY THE USER */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Mode 1: Educational */}
              <button
                type="button"
                onClick={() => {
                  setSelectedVideoMode('educational');
                  setVideoSceneIndex(0);
                  setVideoProgress(0);
                  speakCurrentScene(educationalScenes[0].spokenText);
                }}
                className={`p-3.5 rounded-2xl text-right border transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                  selectedVideoMode === 'educational'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-blue-700 block">
                    النوع 1 · Explicatif
                  </span>
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="text-xs font-black text-slate-900">
                  1. فيديو تعليمي وشرح المكونات
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight">
                  شرح علمي للمغنيسيوم ودوره في تهدئة الجهاز العصبي والنوم
                </p>
              </button>

              {/* Mode 2: Usage */}
              <button
                type="button"
                onClick={() => {
                  setSelectedVideoMode('usage');
                  setVideoSceneIndex(0);
                  setVideoProgress(0);
                  speakCurrentScene(usageScenes[0].spokenText);
                }}
                className={`p-3.5 rounded-2xl text-right border transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                  selectedVideoMode === 'usage'
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-amber-700 block">
                    النوع 2 · Utilisation
                  </span>
                  <Coffee className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="text-xs font-black text-slate-900">
                  2. فيديو طريقة الاستعمال والتطبيق
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight">
                  كيفية أخذ حبتين قبل النوم، المذاق، والشعور بالاسترخاء
                </p>
              </button>

              {/* Mode 3: UGC Experience */}
              <button
                type="button"
                onClick={() => {
                  setSelectedVideoMode('ugc');
                  setVideoSceneIndex(0);
                  setVideoProgress(0);
                  speakCurrentScene(ugcScenes[0].spokenText);
                }}
                className={`p-3.5 rounded-2xl text-right border transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                  selectedVideoMode === 'ugc'
                    ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-rose-700 block">
                    النوع 3 · Témoignage UGC
                  </span>
                  <Smile className="w-4 h-4 text-rose-600" />
                </div>
                <h4 className="text-xs font-black text-slate-900">
                  3. فيديو تجربة حقيقية زبون (UGC)
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight">
                  منشئة محتوى تحكي تجربتها مع الأرق والنتيجة بعد أسبوع
                </p>
              </button>
            </div>

            {/* Video Montage Controls (When Toggled) */}
            {isEditingVideoScript && (
              <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-3 text-xs animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200/80 font-black text-rose-950">
                  <span>تعديل سكربت ونصوص المشاهد (المونطاج المباشر):</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>سرعة الفيديو:</span>
                    <select
                      value={videoSpeed}
                      onChange={(e) => setVideoSpeed(e.target.value as any)}
                      className="p-1 bg-white rounded-lg border border-rose-300 font-bold text-xs"
                    >
                      <option value="normal">عادية (12 ثانية)</option>
                      <option value="fast">سريعة (8 ثواني)</option>
                    </select>
                  </div>
                </div>

                {/* Edit Current Scene */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-rose-900">
                    <span>السكربت الصوتي للمشهد ({currentActiveScenes[videoSceneIndex]?.tag}):</span>
                    <span className="text-[10px] bg-rose-200 px-2 py-0.5 rounded-full">
                      مشهد {videoSceneIndex + 1} من 4
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={currentActiveScenes[videoSceneIndex]?.spokenText || ''}
                    onChange={(e) => {
                      const text = e.target.value;
                      if (selectedVideoMode === 'educational') {
                        const upd = [...educationalScenes];
                        upd[videoSceneIndex].spokenText = text;
                        setEducationalScenes(upd);
                      } else if (selectedVideoMode === 'usage') {
                        const upd = [...usageScenes];
                        upd[videoSceneIndex].spokenText = text;
                        setUsageScenes(upd);
                      } else {
                        const upd = [...ugcScenes];
                        upd[videoSceneIndex].spokenText = text;
                        setUgcScenes(upd);
                      }
                    }}
                    className="w-full p-2 bg-white rounded-xl border border-rose-300 font-medium text-xs leading-relaxed"
                  />
                </div>

                {/* Scene Switcher Buttons */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {currentActiveScenes.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setVideoSceneIndex(idx);
                        setVideoProgress(0);
                        speakCurrentScene(s.spokenText);
                      }}
                      className={`p-2 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                        videoSceneIndex === idx
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-white text-slate-700 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      مشهد {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* REAL PLAYING DYNAMIC VIDEO PLAYER */}
          <div className="flex items-center justify-center bg-slate-950 p-4 sm:p-8 rounded-3xl border border-slate-800">
            <div className="relative w-[280px] h-[510px] sm:w-[320px] sm:h-[570px] rounded-3xl overflow-hidden bg-slate-900 border-4 border-slate-800 shadow-2xl flex flex-col justify-between p-3.5 text-white select-none">
              {/* Top Scene Progress Bars */}
              <div className="grid grid-cols-4 gap-1 z-20 pt-1">
                {currentActiveScenes.map((_, i) => (
                  <div key={i} className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 transition-all"
                      style={{
                        width: i === videoSceneIndex ? `${videoProgress}%` : i < videoSceneIndex ? '100%' : '0%',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Creator & Voice Controls Top Bar */}
              <div className="flex items-center justify-between z-20 pt-1 text-[11px]">
                <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                  <img
                    src={currentActiveScenes[videoSceneIndex]?.avatar}
                    alt="Presenter"
                    className="w-5 h-5 rounded-full object-cover border border-rose-400"
                  />
                  <span className="font-bold text-slate-200 text-[10px]">{currentActiveScenes[videoSceneIndex]?.speaker}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVoiceMuted(!isVoiceMuted);
                      if (isVoiceMuted) speakCurrentScene(currentActiveScenes[videoSceneIndex]?.spokenText);
                    }}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black text-amber-300 border border-white/10 cursor-pointer"
                    title={isVoiceMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                  >
                    {isVoiceMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoIsPlaying(!videoIsPlaying)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/10 cursor-pointer"
                  >
                    {videoIsPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Dynamic Animated Visuals */}
              <div className="relative my-auto flex flex-col items-center justify-center z-10 py-2">
                {/* Visual Type 1: Presenter Talking */}
                {(currentActiveScenes[videoSceneIndex]?.visualType === 'doctor_explaining' ||
                  currentActiveScenes[videoSceneIndex]?.visualType === 'creator_routine' ||
                  currentActiveScenes[videoSceneIndex]?.visualType === 'creator_talking') && (
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-2xl mb-3">
                    <img
                      src={currentActiveScenes[videoSceneIndex]?.avatar}
                      alt="Presenter"
                      className="w-full h-full object-cover transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Floating Product Thumbnail in Corner */}
                    <div className="absolute bottom-2 right-2 w-16 h-16 rounded-xl bg-slate-900/90 border border-white/30 p-1 shadow-lg">
                      <img src={userUploadedImage} alt="Product" className="w-full h-full object-contain" />
                    </div>

                    <div className="absolute top-2 right-2 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-md">
                      {currentActiveScenes[videoSceneIndex]?.badge}
                    </div>
                  </div>
                )}

                {/* Visual Type 2: Product Close-Up & Details */}
                {(currentActiveScenes[videoSceneIndex]?.visualType === 'product_zoom' ||
                  currentActiveScenes[videoSceneIndex]?.visualType === 'product_benefit' ||
                  currentActiveScenes[videoSceneIndex]?.visualType === 'creator_delight' ||
                  currentActiveScenes[videoSceneIndex]?.visualType === 'offer_recommendation') && (
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-white/20 shadow-2xl mb-3 flex items-center justify-center p-3">
                    <img
                      src={userUploadedImage}
                      alt={productTitle}
                      className="max-h-[190px] w-auto object-contain transform scale-110 drop-shadow-2xl animate-pulse"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md shadow-md">
                      {currentActiveScenes[videoSceneIndex]?.badge}
                    </div>
                    {videoSceneIndex === 3 && (
                      <div className="absolute bottom-2 left-2 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-xl shadow-lg border border-white">
                        {productPrice} DH فقط
                      </div>
                    )}
                  </div>
                )}

                {/* Animated TikTok-Style Subtitle Box */}
                <div className="bg-black/85 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-center max-w-[270px] shadow-2xl space-y-1">
                  <span className="text-[9px] font-black text-rose-400 uppercase tracking-wider block">
                    {currentActiveScenes[videoSceneIndex]?.tag.split(':')[0]}
                  </span>
                  <p className="text-xs font-black text-amber-300 leading-snug">
                    "{currentActiveScenes[videoSceneIndex]?.spokenText}"
                  </p>
                </div>
              </div>

              {/* Bottom COD Order Action */}
              <div className="z-20 space-y-1.5">
                <div className="flex items-center justify-between text-[9px] text-slate-300 px-1 font-bold">
                  <span>التوصيل فابور 24 ساعة 🇲🇦</span>
                  <span className="text-emerald-400">الدفع بعد المعاينة 💵</span>
                </div>
                <div className="w-full py-2.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 text-slate-950 font-black text-center text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 cursor-pointer">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>اطلب الآن قبل نفاد المخزون</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: SCRIPTS STUDIO (مكتبة السكريبتات الجاهزة للنسخ)
         ======================================================== */}
      {activeTab === 'scripts' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-amber-600" />
                <span>مكتبة السكريبتات الإعلانية والتسويقية الجاهزة للنسخ والإنتاج</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                جميع السكريبتات المكتوبة بالدارجة المغربية الموجهة لصناع المحتوى (UGC)، الأطباء، وإعلانات فيسبوك وتيك توك
              </p>
            </div>
            <span className="text-xs font-black bg-amber-50 text-amber-800 px-3 py-1 rounded-xl border border-amber-200 shrink-0">
              5 سكريبتات احترافية كاملة
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* SCRIPT 1: UGC CREATOR VIDEO SCRIPT */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <h4 className="font-black text-slate-900 text-sm">
                    السكريبت 1: سكريبت فيديو UGC (منشئة محتوى مغربية تتحدث للكاميرا)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const text = `🎬 سكريبت فيديو UGC لمنشئ المحتوى (Magnesium Complex Gummies)
المشهد 1 (Hook - 0-3 ثواني):
"البنات/الدراري، شكون فيكم كيعاني من الأرق والستريس ومكتنعسش مزيان بالليل؟ عييت ما نجرب في الأعشاب والمنومات حتى لقيت هاد السحر اللي عتقني!"

المشهد 2 (Introduction & Unboxing - 3-6 ثواني):
"شوفو معايا هاد حلوى المغنيسيوم الأصلية (Magnesium Complex Gummies)، طبيعية 100% وبنينة بمذاق التوت ومكتحتاج حتى للماء."

المشهد 3 (Results & Experience - 6-9 ثواني):
"غير جوج حبات قبل النعاس بنصف ساعة، كتحس بالاسترخاء كينزل عليك وكتنعس ليلة كاملة نوم عميق بدون انقطاع، وكتفيق الصباح ناشط ومرتاح بدون داك العياء ولا الدوخة!"

المشهد 4 (Offer & Call To Action - 9-12 ثانية):
"دايرين عرض خاص: شري 2 علب وتاخد الثالثة فابور! والتوصيل مجاني 24 ساعة حتى لباب دارك وكتخلص حتى كتقلب سلعتك بيدك. اضغط على الرابط أسفله واطلب دابا قبل ما يسالي الستوك!"`;
                    navigator.clipboard.writeText(text);
                    setToastMessage('تم نسخ سكريبت UGC بنجاح!');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black rounded-xl border border-rose-200 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ السكريبت كاملاً</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2.5 leading-relaxed text-slate-800">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-rose-600 block mb-1">المشهد 1: الهوك وجذب الانتباه (0-3 ثواني)</span>
                  <p className="font-medium text-slate-700">"البنات/الدراري، شكون فيكم كيعاني من الأرق والستريس ومكتنعسش مزيان بالليل؟ عييت ما نجرب في الأعشاب والمنومات حتى لقيت هاد السحر اللي عتقني!"</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-purple-600 block mb-1">المشهد 2: فتح العلبة واستعراض السلعة (3-6 ثواني)</span>
                  <p className="font-medium text-slate-700">"شوفو معايا هاد حلوى المغنيسيوم الأصلية (Magnesium Complex Gummies)، طبيعية 100% وبنينة بمذاق التوت ومكتحتاج حتى للماء."</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-blue-600 block mb-1">المشهد 3: التجربة والنتيجة بعد أسبوع (6-9 ثواني)</span>
                  <p className="font-medium text-slate-700">"غير جوج حبات قبل النعاس بنصف ساعة، كتحس بالاسترخاء كينزل عليك وكتنعس ليلة كاملة نوم عميق بدون انقطاع، وكتفيق الصباح ناشط ومرتاح بدون داك العياء ولا الدوخة!"</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-emerald-600 block mb-1">المشهد 4: العرض الحصري والدفع عند الاستلام (9-12 ثانية)</span>
                  <p className="font-medium text-slate-700">"دايرين عرض خاص: شري 2 علب وتاخد الثالثة فابور! والتوصيل مجاني 24 ساعة حتى لباب دارك وكتخلص حتى كتقلب سلعتك بيدك. اضغط على الرابط أسفله واطلب دابا!"</p>
                </div>
              </div>
            </div>

            {/* SCRIPT 2: EDUCATIONAL / DOCTOR EXPLAINER SCRIPT */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <h4 className="font-black text-slate-900 text-sm">
                    السكريبت 2: سكريبت فيديو تعليمي / صيدلاني (دكتور / أخصائي تغذية)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const text = `🔬 سكريبت فيديو تعليمي وصيدلاني (Magnesium Complex Gummies)
المشهد 1 (الحقيقة العلمية):
"واش عارف بلي 80% من مشاكل الأرق، القلق، وتشنج العضلات بالليل سببها المباشر هو نقص المغنيسيوم في الجسم؟"

المشهد 2 (التركيبة المتقدمة):
"هاد حلوى المغنيسيوم المعقد كتجمع بين أفضل أشكال المغنيسيوم سريعة الامتصاص مع فيتامين B6 ومستخلصات البابونج المهدئ."

المشهد 3 (المفعول داخل الجسم):
"المفعول ديالها كيوصل للجهاز العصبي في دقائق، كيساعد العضلات على الاسترخاء وكيحفز إفراز هرمون النوم الطبيعي الميلاتونين بدون أي إدمان أو أعراض جانبية."

المشهد 4 (التوصية والضمان):
"كنصح بها كبديل طبيعي آمن لكل من كيعاني من ضغوط العمل وقلة النوم. اطلبوها الآن من الموزع الرسمي مع ضمان الرضا والتوصيل المجاني لكافة المدن المغربية."`;
                    navigator.clipboard.writeText(text);
                    setToastMessage('تم نسخ السكريبت التعليمي بنجاح!');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-black rounded-xl border border-blue-200 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ السكريبت كاملاً</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2.5 leading-relaxed text-slate-800">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-blue-600 block mb-1">المشهد 1: الحقيقة العلمية الصادمة</span>
                  <p className="font-medium text-slate-700">"واش عارف بلي 80% من مشاكل الأرق، القلق، وتشنج العضلات بالليل سببها المباشر هو نقص المغنيسيوم في الجسم؟"</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-indigo-600 block mb-1">المشهد 2: التركيبة وسرعة الامتصاص</span>
                  <p className="font-medium text-slate-700">"هاد حلوى المغنيسيوم المعقد كتجمع بين أفضل أشكال المغنيسيوم سريعة الامتصاص مع فيتامين B6 ومستخلصات البابونج المهدئ."</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-teal-600 block mb-1">المشهد 3: المفعول داخل الجهاز العصبي</span>
                  <p className="font-medium text-slate-700">"المفعول ديالها كيوصل للجهاز العصبي في دقائق، كيساعد العضلات على الاسترخاء وكيحفز إفراز هرمون النوم الطبيعي الميلاتونين بدون أي إدمان."</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-emerald-600 block mb-1">المشهد 4: التوصية والطلب مع التوصيل</span>
                  <p className="font-medium text-slate-700">"كنصح بها كبديل طبيعي آمن لكل من كيعاني من ضغوط العمل وقلة النوم. اطلبوها الآن مع التوصيل المجاني والدفع عند الاستلام."</p>
                </div>
              </div>
            </div>

            {/* SCRIPT 3: USAGE & HOW-TO SCRIPT */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h4 className="font-black text-slate-900 text-sm">
                    السكريبت 3: سكريبت فيديو طريقة الاستعمال والروتين اليومي (How-To)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const text = `🌙 سكريبت طريقة الاستعمال والروتين المسائي:
المشهد 1 (السهولة):
"إليك أسهل وألذ روتين مسائي يخليك تهنى نهائياً من الأرق والتوتر!"

المشهد 2 (طريقة الأخذ والتوقيت):
"طريقة الاستعمال: كتاخد حبتين فقط من حلوى المغنيسيوم قبل موعد النوم بـ 30 دقيقة. كتدوب في الفم ولذيذة بنكهة التوت البري ومكتحتاجش حتى للماء."

المشهد 3 (الإحساس بالراحة):
"في أقل من نصف ساعة، كتبدا تحس بارتخاء عضلات الرقبة والظهر، وكيجيك النعاس طبيعياً."

المشهد 4 (النشاط الصباحي):
"كتفيق الصباح كامل طاقة وحيوية. استغل باقة التوفير اليوم واستفد من التوصيل المجاني والدفع عند الاستلام."`;
                    navigator.clipboard.writeText(text);
                    setToastMessage('تم نسخ سكريبت طريقة الاستعمال!');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-black rounded-xl border border-amber-200 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ السكريبت كاملاً</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2.5 leading-relaxed text-slate-800">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-amber-700 block mb-1">المشهد 1: الروتين المسائي المريح</span>
                  <p className="font-medium text-slate-700">"إليك أسهل وألذ روتين مسائي يخليك تهنى نهائياً من الأرق والتوتر!"</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-orange-600 block mb-1">المشهد 2: الجرعة والتوقيت (30 دقيقة قبل النوم)</span>
                  <p className="font-medium text-slate-700">"كتاخد حبتين فقط من حلوى المغنيسيوم قبل موعد النوم بـ 30 دقيقة. كتدوب في الفم ولذيذة بنكهة التوت البري."</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-emerald-600 block mb-1">المشهد 3: الشعور الفوري بالارتخاء</span>
                  <p className="font-medium text-slate-700">"في أقل من نصف ساعة، كتبدا تحس بارتخاء عضلات الرقبة والظهر، وكيجيك النعاس طبيعياً."</p>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span className="font-black text-purple-600 block mb-1">المشهد 4: الاستيقاظ بنشاط والعرض</span>
                  <p className="font-medium text-slate-700">"كتفيق الصباح كامل طاقة وحيوية. استغل باقة التوفير اليوم واستفد من التوصيل المجاني والدفع بعد المعاينة."</p>
                </div>
              </div>
            </div>

            {/* SCRIPT 4: FULL TIKTOK / FACEBOOK AD COPY */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h4 className="font-black text-slate-900 text-sm">
                    السكريبت 4: النص الإعلاني الترويجي الكامل لإعلانات فيسبوك وتيك توك (High-Converting Copy)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const text = `🔥 واش عييتي من قلة النعاس والتقلب في الفراش بالساعات؟
الستريس ديال الخدمة، التفكير الزائد، وتشنجات العضلات كيمنعوك تنعس مرتاح؟

الحل النهائي وصل للمغرب: حلوى المغنيسيوم المعقد (Magnesium Complex Gummies) طبيعية وأصلية 100%! 🍇

✨ لماذا يفضلها آلاف المغاربة يومياً؟
✅ استرخاء فوري للجهاز العصبي والعضلات من أول ليلة
✅ نوم عميق ليلة كاملة واستيقاظ بنشاط بدون أي خمول
✅ تركيبة طبيعية خالية من السكر والمواد الحافظة وبدون أي إدمان
✅ حلوى جيليه لذيذة بنكهة التوت بدون الحاجة لشرب الماء

💰 العرض الترويجي الحصري:
• علبة واحدة: 249 درهم فقط (عوض 449 درهم)
• باقة 2 علب: 399 درهم فقط + 🎁 علبة ثالثة مجانية كهدية!
🚚 التوصيل مجاني وسريع 24/48 ساعة لكافة المدن المغربية 🇲🇦
💵 الدفع نقداً عند الاستلام وبعد ما تقلب سلعتك بيدك!

👇 للطلب والاستفادة من العرض قبل نفاد المخزون، اضغط على الرابط أسفله!`;
                    navigator.clipboard.writeText(text);
                    setToastMessage('تم نسخ النص الإعلاني كاملاً!');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black rounded-xl border border-emerald-200 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الإعلان كاملاً</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono whitespace-pre-line text-slate-800 leading-relaxed">
{`🔥 واش عييتي من قلة النعاس والتقلب في الفراش بالساعات؟
الستريس ديال الخدمة، التفكير الزائد، وتشنجات العضلات كيمنعوك تنعس مرتاح؟

الحل النهائي وصل للمغرب: حلوى المغنيسيوم المعقد (Magnesium Complex Gummies) طبيعية وأصلية 100%! 🍇

✨ لماذا يفضلها آلاف المغاربة يومياً؟
✅ استرخاء فوري للجهاز العصبي والعضلات من أول ليلة
✅ نوم عميق ليلة كاملة واستيقاظ بنشاط بدون أي خمول
✅ تركيبة طبيعية خالية من السكر والمواد الحافظة وبدون أي إدمان
✅ حلوى جيليه لذيذة بنكهة التوت بدون الحاجة لشرب الماء

💰 العرض الترويجي الحصري:
• علبة واحدة: 249 درهم فقط (عوض 449 درهم)
• باقة 2 علب: 399 درهم فقط + 🎁 علبة ثالثة مجانية كهدية!
🚚 التوصيل مجاني وسريع 24/48 ساعة لكافة المدن المغربية 🇲🇦
💵 الدفع نقداً عند الاستلام وبعد ما تقلب سلعتك بيدك!

👇 للطلب والاستفادة من العرض قبل نفاد المخزون، اضغط على الرابط أسفله!`}
              </div>
            </div>

            {/* SCRIPT 5: WHATSAPP CONFIRMATION & UPSELL */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <h4 className="font-black text-slate-900 text-sm">
                    السكريبت 5: رسائل تأكيد طلبيات الواتساب ومضاعفة السلة (WhatsApp Confirmation & Upsell)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const text = `📱 رسالة تأكيد الطلبية عبر الواتساب:
"السلام عليكم ورحمة الله أخي/أختي الكريم(ة) 🌹، كنشكروك بزاف على ثقتك فينا وطلبك لحلوى المغنيسيوم المعقد للاسترخاء والنوم العميق.
بغينا نأكدو معاك العنوان ورقم الهاتف باش تخرج الشحنة ديالك مع شركة التوصيل اليوم إن شاء الله.
واش العنوان هو: [اسم المدينة والحي]؟"

🎁 رسالة مضاعفة السلة (Upsell Pack Promo):
"بالمناسبة، اليوم عندنا عرض خاص بالزبناء المؤكدين: إلا خديتي باقة 2 علب، غادي تستافد(ي) من علبة ثالثة فابور كهدية + شحن مجاني تماماً بـ 399 درهم فقط عوض 898 درهم! واش نبدلو ليك الطلبية للباقة ونوفرو عليك؟"`;
                    navigator.clipboard.writeText(text);
                    setToastMessage('تم نسخ رسائل الواتساب!');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-black rounded-xl border border-teal-200 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ رسائل الواتساب</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3 text-slate-800 leading-relaxed">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="font-black text-teal-700 block">1. رسالة التأكيد المباشر للزبون:</span>
                  <p className="text-slate-700 font-medium">"السلام عليكم أخي/أختي الكريم(ة) 🌹، كنشكروك على طلبك لحلوى المغنيسيوم المعقد. بغينا نأكدو معاك العنوان ورقم الهاتف باش نخرجو الشحنة مع ليفرو اليوم إن شاء الله. واش العنوان هو: [اسم المدينة والحي]؟"</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="font-black text-emerald-700 block">2. رسالة العرض الإضافي (Upsell 2+1 مجاناً):</span>
                  <p className="text-slate-700 font-medium">"بالمناسبة، عندنا عرض حصري اليوم: إلا خديتي باقة 2 علب، غادي تستافد(ي) من علبة ثالثة فابور كهدية + شحن مجاني بـ 399 درهم فقط عوض 898 درهم! واش نبدلو ليك الطلبية للباقة الترويجية ونوفرو عليك؟"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: DEEP DETAILED LANDING PAGE (ديطاي ديال لي ديطاي)
         ======================================================== */}
      {activeTab === 'landing_page' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Layout className="w-4 h-4 text-emerald-600" />
                <span>صفحة الهبوط المفصلة للسلعة (ديطاي ديال لي ديطاي)</span>
              </h3>
              <p className="text-slate-500 text-xs">
                مبنية بالكامل بمعطياتك: الوصف المفصل، المكونات، المقارنة، الباقات، وآراء الزبائن
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 font-bold">
                <button
                  type="button"
                  onClick={() => setLpDevice('mobile')}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                    lpDevice === 'mobile' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>معاينة الهاتف (Mobile)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLpDevice('desktop')}
                  className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                    lpDevice === 'desktop' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-600'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>معاينة الحاسوب (Desktop)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={downloadFullStandaloneHtml}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل كملف HTML مستقل كامل</span>
              </button>
            </div>
          </div>

          {/* THE LIVE DETAILED LANDING PAGE */}
          <div className="flex items-center justify-center bg-slate-100 p-3 sm:p-6 rounded-3xl border border-slate-200">
            <div
              className={`bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 transition-all duration-300 ${
                lpDevice === 'mobile' ? 'w-full max-w-[420px]' : 'w-full max-w-4xl'
              }`}
            >
              {/* Device Frame Bar (If Mobile) */}
              {lpDevice === 'mobile' && (
                <div className="bg-slate-900 text-slate-400 py-2 px-4 flex items-center justify-between text-[11px] font-bold">
                  <span>9:41</span>
                  <div className="w-16 h-4 bg-slate-800 rounded-full" />
                  <span>5G · 100%</span>
                </div>
              )}

              {/* 1. Urgency Notification Top Ribbon */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-center py-2.5 px-3 text-xs font-black shadow-xs flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>
                  تخفيض {discountPercent}% اليوم فقط · التوصيل مجاني لجميع المدن والدفع بعد المعاينة
                </span>
              </div>

              {/* 2. Hero Section */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="text-center space-y-1.5">
                  <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                    {productNiche}
                  </span>
                  <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                    {productTitle}
                  </h1>
                  <p className="text-xs text-slate-600 font-medium max-w-lg mx-auto">
                    {problemSolved}
                  </p>
                </div>

                {/* Urgency Countdown Bar */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-amber-900 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>ينتهي العرض الترويجي خلال:</span>
                  </span>
                  <div className="flex items-center gap-1 font-mono font-black text-amber-700">
                    <span className="bg-white px-2 py-0.5 rounded-md border border-amber-300">{countdown.hours}h</span>
                    <span>:</span>
                    <span className="bg-white px-2 py-0.5 rounded-md border border-amber-300">{countdown.minutes}m</span>
                    <span>:</span>
                    <span className="bg-white px-2 py-0.5 rounded-md border border-amber-300">{countdown.seconds}s</span>
                  </div>
                </div>

                {/* Real Product Image Showcase */}
                <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md flex items-center justify-center">
                  <img
                    src={userUploadedImage}
                    alt={productTitle}
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border border-rose-400">
                    خصم {discountPercent}%
                  </div>
                  <div className="absolute bottom-3 inset-x-3 bg-black/80 backdrop-blur-md text-white p-2.5 rounded-xl text-center text-xs font-bold shadow-lg">
                    {offerHook}
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 line-through font-bold block">{productOriginalPrice} DH</span>
                    <span className="text-2xl font-black text-emerald-600">{productPrice} DH</span>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg block">
                      وفرت {Number(productOriginalPrice) - Number(productPrice)} DH اليوم
                    </span>
                    <span className="text-[10px] text-slate-500 block pt-0.5 font-medium">
                      شامل مصاريف التوصيل والضمان
                    </span>
                  </div>
                </div>

                {/* 3. Detailed Product Description & Ingredients (ديطاي ديال لي ديطاي) */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3 text-xs leading-relaxed">
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5 border-b pb-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span>الوصف المفصل، المكونات والفوائد الصحية (ديطاي ديال لي ديطاي):</span>
                  </h3>
                  <p className="text-slate-700 font-medium whitespace-pre-line leading-relaxed">
                    {productDescription}
                  </p>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold space-y-1">
                    <span className="block text-emerald-800">💡 طريقة الاستعمال والجرعة الموصى بها:</span>
                    <p className="font-medium text-slate-800">
                      تناول حبتين جيليه يومياً قبل النوم بنصف ساعة. لا تتطلب شرب الماء، ذات نكهة طبيعية لذيذة، ومناسبة للاستعمال المنتظم.
                    </p>
                  </div>
                </div>

                {/* 4. Comparison Table (قبل وبعد) */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                  <h3 className="font-black text-slate-900 text-sm">لماذا يعتبر هذا المنتج هو الخيار الأفضل؟</h3>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                      <span className="font-black text-rose-700 block">❌ المكملات الكيميائية العادية</span>
                      <span className="text-[10px] text-slate-600 block">حبوب صعبة البلع، امتصاص ضعيف، وتسبب خمولاً صباحياً</span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                      <span className="font-black text-emerald-700 block">✓ منتجنا الطبيعي المضمون</span>
                      <span className="text-[10px] text-slate-700 block">حلوى لذيذة، امتصاص فوري فائق، نوم طبيعي عميق واستيقاظ بنشاط</span>
                    </div>
                  </div>
                </div>

                {/* 5. Pack Selection */}
                <div className="space-y-2 text-xs">
                  <h3 className="font-black text-slate-900 flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4 text-purple-600" />
                    <span>اختر باقتك المفضلة للاستفادة من التخفيض:</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div
                      onClick={() => setSelectedPack(1)}
                      className={`p-3 rounded-xl border text-right cursor-pointer transition-all ${
                        selectedPack === 1
                          ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-black text-slate-900 block">علبة واحدة</span>
                      <span className="text-sm font-black text-purple-700 block">{productPrice} DH</span>
                      <span className="text-[10px] text-slate-400 block">السعر العادي</span>
                    </div>

                    <div
                      onClick={() => setSelectedPack(2)}
                      className={`p-3 rounded-xl border text-right cursor-pointer transition-all relative ${
                        selectedPack === 2
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="absolute -top-2.5 left-2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                        الأكثر طلباً 🔥
                      </span>
                      <span className="font-black text-slate-900 block">باك 2 علب</span>
                      <span className="text-sm font-black text-emerald-700 block">{Math.round(productPrice * 1.65)} DH</span>
                      <span className="text-[10px] text-emerald-600 font-bold block">+ علبة هدية مجانية 🎁</span>
                    </div>

                    <div
                      onClick={() => setSelectedPack(3)}
                      className={`p-3 rounded-xl border text-right cursor-pointer transition-all ${
                        selectedPack === 3
                          ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-black text-slate-900 block">باك العائلة (3 علب)</span>
                      <span className="text-sm font-black text-amber-700 block">{Math.round(productPrice * 2.2)} DH</span>
                      <span className="text-[10px] text-amber-600 font-bold block">توفير 45% + هدايا</span>
                    </div>
                  </div>
                </div>

                {/* 6. Customer Testimonials */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                  <h3 className="font-black text-slate-900 text-sm">آراء زبنائنا الكرام بالمغرب:</h3>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">أمينة الشاوي (الدار البيضاء)</span>
                        <span className="text-amber-400">★★★★★</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        "والله حتى معجزة! كنت ديما كنعاني مع النعاس، من النهار الأول حسيت براحة كبيرة وعضلاتي مرتاحين. شكراً بزاف!"
                      </p>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">محمد العلمي (طنجة)</span>
                        <span className="text-amber-400">★★★★★</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        "التوصيل كان سريع في 24 ساعة، السلعة أصلية وجاتني مغلفة مزيان، والمذاق ديالها واعر بحال الحلوى."
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7. Fast Checkout COD Form */}
                <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white p-5 rounded-3xl shadow-xl space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-emerald-400 font-black uppercase tracking-wider block">
                      الدفع نقداً عند الاستلام وبعد المعاينة
                    </span>
                    <h3 className="text-base font-black text-white">
                      استمارة الطلب السريع (Commande Express)
                    </h3>
                    <p className="text-xs text-slate-300">
                      أدخل معلوماتك وسنتصل بك هاتفياً لتأكيد الشحن في نفس اليوم
                    </p>
                  </div>

                  {landingFormError && (
                    <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{landingFormError}</span>
                    </div>
                  )}

                  {orderSuccessSubmitted ? (
                    <div className="p-5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-black">
                        ✓
                      </div>
                      <h4 className="text-sm font-black text-emerald-300">
                        شكراً لك! تم استلام طلبك بنجاح
                      </h4>
                      <p className="text-xs text-slate-300 font-medium">
                        سيقوم فريق خدمة الزبائن بالاتصال بك على رقمك لتأكيد الشحن الفوري.
                      </p>
                      <button
                        type="button"
                        onClick={() => setOrderSuccessSubmitted(false)}
                        className="text-xs text-emerald-400 underline font-bold pt-1 cursor-pointer"
                      >
                        إجراء طلب آخر
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleLandingCheckoutSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-200 font-bold mb-1">الاسم الكامل:</label>
                        <input
                          type="text"
                          value={orderCustomerName}
                          onChange={(e) => setOrderCustomerName(e.target.value)}
                          placeholder="الاسم العائلي والشخصي"
                          className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-slate-900 font-bold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-200 font-bold mb-1">رقم الهاتف للتواصل:</label>
                        <input
                          type="tel"
                          value={orderCustomerPhone}
                          onChange={(e) => setOrderCustomerPhone(e.target.value)}
                          placeholder="06XXXXXXXX"
                          className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-slate-900 font-bold focus:outline-none"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-200 font-bold mb-1">المدينة:</label>
                        <input
                          type="text"
                          value={orderCustomerCity}
                          onChange={(e) => setOrderCustomerCity(e.target.value)}
                          placeholder="مثال: الدار البيضاء، مراكش، طنجة، الرباط..."
                          className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-slate-900 font-bold focus:outline-none"
                        />
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10 text-slate-300">
                          <span>الباقة المختارة ({getPackDetails().title}):</span>
                          <span className="text-base font-black text-emerald-400">{getPackDetails().price} DH</span>
                        </div>
                        <button
                          type="submit"
                          className="w-full mt-2 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 text-sm font-black rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>تأكيد الطلب الآن (الدفع عند الاستلام 🚚)</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
