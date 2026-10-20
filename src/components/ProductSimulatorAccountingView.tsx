import React, { useState, useMemo, useRef } from 'react';
import { Invoice, ProductAd } from '../types';
import { INITIAL_INVOICES, CITIES, getLocalImage } from '../data/mockData';
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
  UploadCloud,
  Check,
  BadgeAlert,
  BarChart3,
  Users,
  Compass,
  ArrowRight,
  HelpCircle,
  CreditCard,
  Percent,
  FolderOpen,
  Globe,
  Layers,
  ChevronRight,
  ShoppingBag,
  Video,
  Play,
  Film,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ProductSimulatorAccountingViewProps {
  ads: ProductAd[];
  onOpenCreateAd: () => void;
}

// Hierarchical Location & Market Data
interface CityMarketDetail {
  name: string;
  monthlyConsumption: string;
  expectedConversionRate: string;
  deliveryRate: number;
  avgCpa: string;
  deliveryTime: string;
  purchasingPower: string;
  peakHours: string;
  bestSellingAngle: string;
  topCouriers: string;
  logisticNotes: string;
}

interface RegionMarketData {
  id: string;
  name: string;
  cities: Record<string, CityMarketDetail>;
}

interface CountryMarketData {
  id: string;
  name: string;
  flag: string;
  currency: string;
  regions: Record<string, RegionMarketData>;
}

const GLOBAL_MARKETS_HIERARCHY: Record<string, CountryMarketData> = {
  morocco: {
    id: 'morocco',
    name: 'المملكة المغربية',
    flag: '🇲🇦',
    currency: 'DH',
    regions: {
      casablanca_settat: {
        id: 'casablanca_settat',
        name: 'جهة الدار البيضاء - سطات',
        cities: {
          casablanca: {
            name: 'الدار البيضاء (Grand Casablanca)',
            monthlyConsumption: '48,000 إلى 65,000 طلبية شهرياً',
            expectedConversionRate: '6.8% - 9.2%',
            deliveryRate: 84,
            avgCpa: '28 - 40 DH',
            deliveryTime: '24 ساعة (توصيل فوري)',
            purchasingPower: 'عالية جداً',
            peakHours: 'من 13:00 إلى 15:30 ومن 21:00 إلى 00:30',
            bestSellingAngle: 'السرعة الفائقة في التوصيل وفخامة وجودة المنتج الأصلية',
            topCouriers: 'Cathedis, Sendit, Ozone Express, Amana',
            logisticNotes: 'أكبر سوق استهلاكي بالمغرب، نسبة تسليم ممتازة مع الموزعين المحليين.',
          },
          mohammedia: {
            name: 'المحمدية (Mohammédia)',
            monthlyConsumption: '8,500 إلى 12,000 طلبية شهرياً',
            expectedConversionRate: '6.2% - 8.0%',
            deliveryRate: 83,
            avgCpa: '26 - 36 DH',
            deliveryTime: '24 ساعة',
            purchasingPower: 'عالية',
            peakHours: 'من 12:30 إلى 15:00 ومن 20:30 إلى 23:30',
            bestSellingAngle: 'الجودة والضمان مع التوصيل المجاني',
            topCouriers: 'Sendit, Cathedis, Ozone',
            logisticNotes: 'قربها من كازا يضمن استلاماً سريعاً وتكلفة إرسال منخفضة.',
          },
          settat_berrechid: {
            name: 'برشيد وسطات (Berrechid & Settat)',
            monthlyConsumption: '7,000 إلى 10,000 طلبية شهرياً',
            expectedConversionRate: '5.5% - 7.2%',
            deliveryRate: 78,
            avgCpa: '22 - 32 DH',
            deliveryTime: '24 إلى 48 ساعة',
            purchasingPower: 'متوسطة إلى عالية',
            peakHours: 'من 13:00 إلى 16:00 ومن 20:00 إلى 23:00',
            bestSellingAngle: 'عروض التوفير وباقات 2 حبات بسعر مميز',
            topCouriers: 'Amana, Cathedis',
            logisticNotes: 'زبائن يفضلون الدفع نقداً بعد فحص محتوى الكولية.',
          },
        },
      },
      rabat_sale_kenitra: {
        id: 'rabat_sale_kenitra',
        name: 'جهة الرباط - سلا - القنيطرة',
        cities: {
          rabat: {
            name: 'الرباط العاصمة (Rabat)',
            monthlyConsumption: '22,000 إلى 32,000 طلبية شهرياً',
            expectedConversionRate: '6.5% - 8.8%',
            deliveryRate: 83,
            avgCpa: '26 - 38 DH',
            deliveryTime: '24 ساعة',
            purchasingPower: 'عالية جداً',
            peakHours: 'من 12:30 إلى 14:30 ومن 20:30 إلى 23:30',
            bestSellingAngle: 'الأصالة، الضمان، وراحة البال مع الدفع بعد المعاينة',
            topCouriers: 'Cathedis, Amana Express',
            logisticNotes: 'نسبة روتور ضعيفة واستقرار وظيفي ممتاز للزبناء.',
          },
          sale_temara: {
            name: 'سلا وتمارة (Salé & Témara)',
            monthlyConsumption: '18,000 إلى 26,000 طلبية شهرياً',
            expectedConversionRate: '5.8% - 7.5%',
            deliveryRate: 80,
            avgCpa: '24 - 34 DH',
            deliveryTime: '24 إلى 48 ساعة',
            purchasingPower: 'متوسطة إلى عالية',
            peakHours: 'من 13:00 إلى 15:30 ومن 21:00 إلى 23:30',
            bestSellingAngle: 'حل المشاكل اليومية وتوفير الوقت والمجهود',
            topCouriers: 'Sendit, Ozone, Amana',
            logisticNotes: 'كثافة سكانية عالية تضمن مبيعات يومية مستمرة.',
          },
          kenitra: {
            name: 'القنيطرة (Kénitra)',
            monthlyConsumption: '12,000 إلى 17,000 طلبية شهرياً',
            expectedConversionRate: '6.0% - 7.8%',
            deliveryRate: 81,
            avgCpa: '22 - 32 DH',
            deliveryTime: '24 إلى 48 ساعة',
            purchasingPower: 'عالية (مدينة صناعية سريعة النمو)',
            peakHours: 'من 13:00 إلى 16:00 ومن 20:30 إلى 23:00',
            bestSellingAngle: 'أحدث المنتجات العصرية مع التوصيل السريع',
            topCouriers: 'Cathedis, Ozone, Amana',
            logisticNotes: 'إقبال ممتاز على سلع التجميل والأجهزة الذكية.',
          },
        },
      },
      tangier_tetouan_alhoceima: {
        id: 'tangier_tetouan_alhoceima',
        name: 'جهة طنجة - تطوان - الحسيمة',
        cities: {
          tangier: {
            name: 'طنجة (Tanger Métropole)',
            monthlyConsumption: '25,000 إلى 36,000 طلبية شهرياً',
            expectedConversionRate: '6.4% - 8.5%',
            deliveryRate: 81,
            avgCpa: '24 - 35 DH',
            deliveryTime: '24 إلى 48 ساعة',
            purchasingPower: 'عالية',
            peakHours: 'من 14:00 إلى 17:00 ومن 21:30 إلى 01:00',
            bestSellingAngle: 'الموضة الحديثة والسلع التكنولوجية الفاخرة',
            topCouriers: 'Sendit, Ozone, Amana',
            logisticNotes: 'سوق ديناميكي سريع التجاوب مع إعلانات تيك توك وريلز.',
          },
          tetouan: {
            name: 'تطوان والمضيق (Tétouan & M\'diq)',
            monthlyConsumption: '10,000 إلى 15,000 طلبية شهرياً',
            expectedConversionRate: '5.8% - 7.6%',
            deliveryRate: 79,
            avgCpa: '20 - 30 DH',
            deliveryTime: '48 ساعة',
            purchasingPower: 'عالية',
            peakHours: 'من 14:30 إلى 17:30 ومن 22:00 إلى 00:30',
            bestSellingAngle: 'الأناقة والعروض المحدودة',
            topCouriers: 'Cathedis, Amana',
            logisticNotes: 'نشاط استهلاكي مرتفع جداً طيلة فترات السنة.',
          },
          larache_ksar: {
            name: 'العرائش والقصر الكبير (Larache & Ksar El Kebir)',
            monthlyConsumption: '6,000 إلى 9,000 طلبية شهرياً',
            expectedConversionRate: '5.2% - 6.8%',
            deliveryRate: 76,
            avgCpa: '18 - 28 DH',
            deliveryTime: '48 ساعة',
            purchasingPower: 'متوسطة',
            peakHours: 'من 13:00 إلى 16:00 ومن 20:00 إلى 22:30',
            bestSellingAngle: 'توفير السلعة النادرة مع إيصالها حتى لباب المنزل',
            topCouriers: 'Amana, Chrono Diali',
            logisticNotes: 'CPA إعلاني رخيص وفرصة جيدة لتحقيق مبيعات مربحة.',
          },
        },
      },
      marrakech_safi: {
        id: 'marrakech_safi',
        name: 'جهة مراكش - آسفي',
        cities: {
          marrakech: {
            name: 'مراكش الحمراء (Marrakech)',
            monthlyConsumption: '20,000 إلى 28,000 طلبية شهرياً',
            expectedConversionRate: '6.2% - 8.3%',
            deliveryRate: 78,
            avgCpa: '22 - 34 DH',
            deliveryTime: '48 ساعة',
            purchasingPower: 'عالية',
            peakHours: 'من 15:00 إلى 18:00 ومن 21:00 إلى 00:00',
            bestSellingAngle: 'عروض التوفير، التخفيضات الكبرى، ومنتجات الصيف والعناية',
            topCouriers: 'Cathedis, Sendit, Amana',
            logisticNotes: 'تجاوب قياسي مع عروض 2 حبات مع شحن فابور.',
          },
          safi_essaouira: {
            name: 'آسفي والصويرة (Safi & Essaouira)',
            monthlyConsumption: '7,500 إلى 11,000 طلبية شهرياً',
            expectedConversionRate: '5.4% - 7.0%',
            deliveryRate: 75,
            avgCpa: '18 - 28 DH',
            deliveryTime: '48 إلى 72 ساعة',
            purchasingPower: 'متوسطة',
            peakHours: 'من 13:30 إلى 16:00 ومن 20:00 إلى 22:30',
            bestSellingAngle: 'أفضل جودة بأفضل سعر مع الدفع عند الاستلام',
            topCouriers: 'Amana, Ghazala',
            logisticNotes: 'تأكيد الطلبيات عبر الواتساب يرفع نسبة التسليم لـ +82%.',
          },
        },
      },
      souss_massa: {
        id: 'souss_massa',
        name: 'جهة سوس - ماسة',
        cities: {
          agadir: {
            name: 'أكادير الكبير (Agadir & Inezgane)',
            monthlyConsumption: '16,000 إلى 24,000 طلبية شهرياً',
            expectedConversionRate: '6.3% - 8.2%',
            deliveryRate: 79,
            avgCpa: '20 - 32 DH',
            deliveryTime: '48 ساعة',
            purchasingPower: 'متوسطة إلى عالية',
            peakHours: 'من 14:00 إلى 17:30 ومن 21:00 إلى 23:45',
            bestSellingAngle: 'الأجهزة المنزلية الذكية، منتجات التجميل والزيوت الأصلية',
            topCouriers: 'Cathedis, Amana, Sendit',
            logisticNotes: 'منطقة تجارية بامتياز ونسبة استلام ممتازة مع الموزعين.',
          },
          taroudant_tiznit: {
            name: 'تارودانت وتيزنيت (Taroudant & Tiznit)',
            monthlyConsumption: '6,500 إلى 9,500 طلبية شهرياً',
            expectedConversionRate: '5.2% - 6.9%',
            deliveryRate: 74,
            avgCpa: '16 - 26 DH',
            deliveryTime: '48 إلى 72 ساعة',
            purchasingPower: 'متوسطة',
            peakHours: 'من 12:30 إلى 15:00 ومن 19:30 إلى 22:00',
            bestSellingAngle: 'الأصالة وحل المشاكل اليومية',
            topCouriers: 'Amana, Stop Desk',
            logisticNotes: 'اعتماد نظام الاستلام من الوكالة (Stop Desk) فعال جداً.',
          },
        },
      },
      fes_meknes: {
        id: 'fes_meknes',
        name: 'جهة فاس - مكناس',
        cities: {
          fes: {
            name: 'فاس (Fès)',
            monthlyConsumption: '15,000 إلى 22,000 طلبية شهرياً',
            expectedConversionRate: '5.6% - 7.4%',
            deliveryRate: 75,
            avgCpa: '18 - 29 DH',
            deliveryTime: '48 ساعة',
            purchasingPower: 'حساسة للسعر (Sensible au prix)',
            peakHours: 'من 13:00 إلى 16:00 ومن 20:30 إلى 23:00',
            bestSellingAngle: 'أفضل سعر مقابل الجودة، سعر بيع أقل من 299 درهم هو الأنجح',
            topCouriers: 'Cathedis, Sendit, Amana',
            logisticNotes: 'الزبون يقارن الأسعار بدقة، لذلك العروض الواضحة تحقق أعلى مبيعات.',
          },
          meknes: {
            name: 'مكناس (Meknès)',
            monthlyConsumption: '10,000 إلى 15,000 طلبية شهرياً',
            expectedConversionRate: '5.7% - 7.5%',
            deliveryRate: 76,
            avgCpa: '18 - 28 DH',
            deliveryTime: '48 ساعة',
            purchasingPower: 'متوسطة',
            peakHours: 'من 13:00 إلى 15:30 ومن 20:30 إلى 22:45',
            bestSellingAngle: 'تخفيضات العائلة والأجهزة المنزلية العملية',
            topCouriers: 'Amana, Cathedis, Ozone',
            logisticNotes: 'تجاوب ممتاز مع السلع العملية التي تحل مشكل المطبخ أو البيت.',
          },
        },
      },
      oriental: {
        id: 'oriental',
        name: 'جهة الشرق (Région de l\'Oriental)',
        cities: {
          oujda: {
            name: 'وجدة والناظور (Oujda & Nador)',
            monthlyConsumption: '14,000 إلى 20,000 طلبية شهرياً',
            expectedConversionRate: '5.8% - 7.7%',
            deliveryRate: 75,
            avgCpa: '17 - 28 DH',
            deliveryTime: '48 إلى 72 ساعة',
            purchasingPower: 'متوسطة إلى عالية',
            peakHours: 'من 12:30 إلى 15:00 ومن 20:00 إلى 23:00',
            bestSellingAngle: 'توفر السلع المميزة وغير المتواجدة محلياً',
            topCouriers: 'Cathedis, Amana Express',
            logisticNotes: 'تكلفة نقرة رخيصة جداً ومعدل تفاعل قوي على فيسبوك.',
          },
        },
      },
      sahara_provinces: {
        id: 'sahara_provinces',
        name: 'الصحراء المغربية (الأقاليم الجنوبية)',
        cities: {
          laayoune: {
            name: 'العيون والسمارة (Laâyoune & Smara)',
            monthlyConsumption: '9,000 إلى 13,000 طلبية شهرياً',
            expectedConversionRate: '6.5% - 8.8%',
            deliveryRate: 74,
            avgCpa: '16 - 26 DH (CPA رخيص)',
            deliveryTime: '72 ساعة',
            purchasingPower: 'عالية جداً',
            peakHours: 'من 14:00 إلى 18:00 ومن 21:00 إلى 01:00',
            bestSellingAngle: 'المنتجات الفاخرة، العطور الأصلية، ومستلزمات السفر والتخييم',
            topCouriers: 'Amana Express, Barid Al-Maghrib',
            logisticNotes: 'قدرة شرائية مرتفعة جداً للمنتجات ذات الجودة العالية.',
          },
          dakhla: {
            name: 'الداخلة ووادي الذهب (Dakhla)',
            monthlyConsumption: '5,000 إلى 7,500 طلبية شهرياً',
            expectedConversionRate: '6.4% - 8.6%',
            deliveryRate: 73,
            avgCpa: '15 - 25 DH',
            deliveryTime: '72 ساعة',
            purchasingPower: 'عالية جداً',
            peakHours: 'من 15:00 إلى 19:00 ومن 21:30 إلى 01:00',
            bestSellingAngle: 'جودة السلعة الحصرية مع التوصيل حتى أقصى الجنوب',
            topCouriers: 'Amana Express',
            logisticNotes: 'تنسيق مسبق لموعد الاستلام مع الزبون يضمن نجاح العملية.',
          },
        },
      },
    },
  },
  saudi_arabia: {
    id: 'saudi_arabia',
    name: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    currency: 'SAR',
    regions: {
      riyadh_region: {
        id: 'riyadh_region',
        name: 'منطقة الرياض',
        cities: {
          riyadh_city: {
            name: 'مدينة الرياض (Riyadh)',
            monthlyConsumption: '85,000 إلى 120,000 طلبية شهرياً',
            expectedConversionRate: '7.5% - 10.2%',
            deliveryRate: 87,
            avgCpa: '45 - 70 SAR',
            deliveryTime: '24 إلى 48 ساعة',
            purchasingPower: 'عالية جداً',
            peakHours: 'من 14:00 إلى 17:00 ومن 22:00 إلى 03:00 فجراً',
            bestSellingAngle: 'الضمان الذهبي، الفخامة، وشحن فوري لباب المنزل',
            topCouriers: 'SMSA, Aramex, J&T Express, SPL',
            logisticNotes: 'أكبر سوق COD وهامش ربح صافي يفوق 100 ريال بالقطعة.',
          },
        },
      },
      makkah_region: {
        id: 'makkah_region',
        name: 'منطقة مكة المكرمة',
        cities: {
          jeddah_city: {
            name: 'جدة وعروس البحر الأحمر (Jeddah)',
            monthlyConsumption: '65,000 إلى 90,000 طلبية شهرياً',
            expectedConversionRate: '7.2% - 9.8%',
            deliveryRate: 86,
            avgCpa: '40 - 65 SAR',
            deliveryTime: '24 إلى 48 ساعة',
            purchasingPower: 'عالية جداً',
            peakHours: 'من 15:00 إلى 18:00 ومن 22:30 إلى 02:30',
            bestSellingAngle: 'العناية الشخصية، الأجهزة الذكية، والأزياء',
            topCouriers: 'SMSA, Aramex, J&T',
            logisticNotes: 'تفاعل ممتاز جداً مع إعلانات سناب شات وتيك توك.',
          },
        },
      },
    },
  },
  uae: {
    id: 'uae',
    name: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    currency: 'AED',
    regions: {
      dubai_emirate: {
        id: 'dubai_emirate',
        name: 'إمارة دبي',
        cities: {
          dubai_city: {
            name: 'مدينة دبي (Dubai)',
            monthlyConsumption: '55,000 إلى 80,000 طلبية شهرياً',
            expectedConversionRate: '7.8% - 10.5%',
            deliveryRate: 89,
            avgCpa: '50 - 80 AED',
            deliveryTime: '24 ساعة (نفس اليوم)',
            purchasingPower: 'عالية جداً',
            peakHours: 'من 13:00 إلى 16:00 ومن 20:30 إلى 00:00',
            bestSellingAngle: 'الأصالة، السرعة الخاطفة، والرفاهية العصرية',
            topCouriers: 'Fetchr, Aramex, Emirates Post',
            logisticNotes: 'أعلى معدل تسليم في المنطقة وخدمة توصيل فورية.',
          },
        },
      },
    },
  },
};

// Automatic Niche Presets with Linked Media, Margins & Strategy
interface NichePreset {
  id: string;
  label: string;
  defaultName: string;
  problem: string;
  targetGender: 'نساء' | 'رجال' | 'الجميع';
  targetAge: string;
  purchasePrice: number;
  sellingPrice: number;
  imageSample: string;
  weight: 'light' | 'medium' | 'heavy';
  fragile: boolean;
  wowFactor: boolean;
  typicalCpa: string;
  conversionBenchmark: string;
}

const NICHE_PRESETS: Record<string, NichePreset> = {
  cosmetics: {
    id: 'cosmetics',
    label: 'كوسميتيك ومواد التجميل والعناية (Cosmétiques)',
    defaultName: 'سيروم الزيوت الطبيعية المعالجة لتساقط وتكثيف الشعر',
    problem: 'تساقط الشعر والفراغات وتقوية البصيلات من الجذور',
    targetGender: 'نساء',
    targetAge: '25-35 سنة',
    purchasePrice: 65,
    sellingPrice: 249,
    imageSample: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    weight: 'light',
    fragile: true,
    wowFactor: true,
    typicalCpa: '25 - 35 DH',
    conversionBenchmark: '7.5% - 9.2%',
  },
  supplements: {
    id: 'supplements',
    label: 'مكملات غذائية وصحة (Compléments Alimentaires)',
    defaultName: 'كبسولات سبيرولينا وأوميغا 3 الطبيعية النقية',
    problem: 'الإرهاق المزمن، ضعف المناعة، وزيادة النشاط والحيوية',
    targetGender: 'الجميع',
    targetAge: '35-50 سنة',
    purchasePrice: 80,
    sellingPrice: 299,
    imageSample: getLocalImage('product_earbuds_pro_1792240183002.jpg'),
    weight: 'light',
    fragile: false,
    wowFactor: true,
    typicalCpa: '28 - 42 DH',
    conversionBenchmark: '6.8% - 8.5%',
  },
  electronics: {
    id: 'electronics',
    label: 'إلكترونيات وأجهزة ذكية (Électronique & Gadgets)',
    defaultName: 'ساعة Ultra Titanium الذكية مع سماعات بلوتوث مجانية',
    problem: 'تتبع اللياقة البدنية والاتصالات السريعة بمظهر فاخر وعصري',
    targetGender: 'رجال',
    targetAge: '18-25 سنة',
    purchasePrice: 95,
    sellingPrice: 349,
    imageSample: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    weight: 'light',
    fragile: false,
    wowFactor: true,
    typicalCpa: '32 - 48 DH',
    conversionBenchmark: '6.5% - 8.0%',
  },
  fashion: {
    id: 'fashion',
    label: 'أزياء وملابس وأحذية (Mode & Vêtements)',
    defaultName: 'حذاء جلدي طبي مريح للعمل والخرجات اليومية',
    problem: 'آلام القدمين والظهر أثناء الوقوف والمشي الطويل',
    targetGender: 'رجال',
    targetAge: '25-35 سنة',
    purchasePrice: 110,
    sellingPrice: 329,
    imageSample: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    weight: 'medium',
    fragile: false,
    wowFactor: false,
    typicalCpa: '28 - 42 DH',
    conversionBenchmark: '6.0% - 7.8%',
  },
  home: {
    id: 'home',
    label: 'لوازم المنزل والمطبخ (Maison & Cuisine)',
    defaultName: 'فرامة الخضار واللحوم اللاسلكية الذكية سريعة الشحن',
    problem: 'تضييع الوقت في تقطيع الخضار والمجهود الشاق في المطبخ',
    targetGender: 'نساء',
    targetAge: '25-35 سنة',
    purchasePrice: 70,
    sellingPrice: 249,
    imageSample: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    weight: 'medium',
    fragile: false,
    wowFactor: true,
    typicalCpa: '22 - 32 DH',
    conversionBenchmark: '7.2% - 9.5%',
  },
  accessories: {
    id: 'accessories',
    label: 'إكسسوارات وساعات فاخرة (Accessoires)',
    defaultName: 'طقم ساعة فاخرة مع سوار ومحفظة جلدية بالعلبة الإهدائية',
    problem: 'البحث عن هدية فاخرة أو إطلالة راقية في المناسبات',
    targetGender: 'الجميع',
    targetAge: '18-25 سنة',
    purchasePrice: 85,
    sellingPrice: 299,
    imageSample: getLocalImage('product_smartwatch_ultra_1792240155179.jpg'),
    weight: 'light',
    fragile: false,
    wowFactor: true,
    typicalCpa: '26 - 38 DH',
    conversionBenchmark: '6.5% - 8.2%',
  },
};

export const ProductSimulatorAccountingView: React.FC<ProductSimulatorAccountingViewProps> = ({
  ads,
  onOpenCreateAd,
}) => {
  const { isRtl } = useLanguage();
  const [activeSuiteTab, setActiveSuiteTab] = useState<'simulator' | 'pricing_portfolio' | 'accounting'>('simulator');

  // ==========================================
  // 1. PRODUCT MARKET FIT SIMULATOR STATE
  // ==========================================
  // Product Media: Images + Video
  const [simProductImage, setSimProductImage] = useState<string>(NICHE_PRESETS.cosmetics.imageSample);
  const [simProductVideo, setSimProductVideo] = useState<string | null>(null);
  const [activeMediaPreviewTab, setActiveMediaPreviewTab] = useState<'image' | 'video'>('image');
  const simFileInputRef = useRef<HTMLInputElement>(null);
  const simVideoInputRef = useRef<HTMLInputElement>(null);

  const [simNicheKey, setSimNicheKey] = useState<string>('cosmetics');
  const [simProductName, setSimProductName] = useState(NICHE_PRESETS.cosmetics.defaultName);
  const [simNiche, setSimNiche] = useState<string>(NICHE_PRESETS.cosmetics.label);
  const [simTargetGender, setSimTargetGender] = useState<'نساء' | 'رجال' | 'الجميع'>(NICHE_PRESETS.cosmetics.targetGender);
  const [simTargetAge, setSimTargetAge] = useState<string>(NICHE_PRESETS.cosmetics.targetAge);
  const [simProblemSolved, setSimProblemSolved] = useState<string>(NICHE_PRESETS.cosmetics.problem);
  const [simSellingPrice, setSimSellingPrice] = useState<number>(NICHE_PRESETS.cosmetics.sellingPrice);
  const [simPurchasePrice, setSimPurchasePrice] = useState<number>(NICHE_PRESETS.cosmetics.purchasePrice);
  const [simWeight, setSimWeight] = useState<'light' | 'medium' | 'heavy'>(NICHE_PRESETS.cosmetics.weight);
  const [simIsFragile, setSimIsFragile] = useState(NICHE_PRESETS.cosmetics.fragile);
  const [simHasWowFactor, setSimHasWowFactor] = useState(NICHE_PRESETS.cosmetics.wowFactor);

  // Structured Cascading Dropdowns for Market Selection: Country -> Region -> City
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>('morocco');
  const [selectedRegionKey, setSelectedRegionKey] = useState<string>('casablanca_settat');
  const [selectedCityKey, setSelectedCityKey] = useState<string>('casablanca');

  // Bulletproof Country, Region, and City Objects
  const safeCountryKey = (selectedCountryKey in GLOBAL_MARKETS_HIERARCHY) ? selectedCountryKey : 'morocco';
  const currentCountry = GLOBAL_MARKETS_HIERARCHY[safeCountryKey] || GLOBAL_MARKETS_HIERARCHY['morocco'];

  const availableRegionKeys = Object.keys(currentCountry.regions || {});
  const safeRegionKey = availableRegionKeys.includes(selectedRegionKey) ? selectedRegionKey : (availableRegionKeys[0] || 'casablanca_settat');
  const currentRegion = (currentCountry.regions && currentCountry.regions[safeRegionKey]) || Object.values(currentCountry.regions || {})[0] || {
    id: 'default_reg',
    name: 'جهة الدار البيضاء - سطات',
    cities: {}
  };

  const availableCityKeys = Object.keys(currentRegion.cities || {});
  const safeCityKey = availableCityKeys.includes(selectedCityKey) ? selectedCityKey : (availableCityKeys[0] || 'casablanca');
  const currentCity = (currentRegion.cities && currentRegion.cities[safeCityKey]) || Object.values(currentRegion.cities || {})[0] || {
    name: 'الدار البيضاء (Grand Casablanca)',
    monthlyConsumption: '48,000 إلى 65,000 طلبية شهرياً',
    expectedConversionRate: '6.8% - 9.2%',
    deliveryRate: 84,
    avgCpa: '28 - 40 DH',
    deliveryTime: '24 ساعة (توصيل فوري)',
    purchasingPower: 'عالية جداً',
    peakHours: 'من 13:00 إلى 15:30 ومن 21:00 إلى 00:30',
    bestSellingAngle: 'السرعة الفائقة في التوصيل وفخامة وجودة المنتج الأصلية',
    topCouriers: 'Cathedis, Sendit, Ozone Express, Amana',
    logisticNotes: 'أكبر سوق استهلاكي بالمغرب، نسبة تسليم ممتازة مع الموزعين المحليين.',
  };

  // Handle Niche Selection with Auto-Linking to Media & Presets
  const handleSelectNiche = (key: string) => {
    setSimNicheKey(key);
    const preset = NICHE_PRESETS[key];
    if (preset) {
      setSimNiche(preset.label);
      setSimProductName(preset.defaultName);
      setSimProblemSolved(preset.problem);
      setSimTargetGender(preset.targetGender);
      setSimTargetAge(preset.targetAge);
      setSimSellingPrice(preset.sellingPrice);
      setSimPurchasePrice(preset.purchasePrice);
      setSimWeight(preset.weight);
      setSimIsFragile(preset.fragile);
      setSimHasWowFactor(preset.wowFactor);
      if (preset.imageSample) {
        setSimProductImage(preset.imageSample);
      }
    }
  };

  // Handle Country Change safely
  const handleCountryChange = (cKey: string) => {
    setSelectedCountryKey(cKey);
    const country = GLOBAL_MARKETS_HIERARCHY[cKey];
    if (country && country.regions) {
      const regKeys = Object.keys(country.regions);
      if (regKeys.length > 0) {
        const firstRegKey = regKeys[0];
        setSelectedRegionKey(firstRegKey);
        const cityKeys = Object.keys(country.regions[firstRegKey]?.cities || {});
        if (cityKeys.length > 0) {
          setSelectedCityKey(cityKeys[0]);
        }
      }
    }
  };

  // Handle Region Change safely
  const handleRegionChange = (rKey: string) => {
    setSelectedRegionKey(rKey);
    const region = currentCountry.regions?.[rKey];
    if (region && region.cities) {
      const cityKeys = Object.keys(region.cities);
      if (cityKeys.length > 0) {
        setSelectedCityKey(cityKeys[0]);
      }
    }
  };

  // Handle real image upload from PC/Phone
  const handleSimImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSimProductImage(event.target.result as string);
          setActiveMediaPreviewTab('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle real video upload from PC/Phone
  const handleSimVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setSimProductVideo(videoUrl);
      setActiveMediaPreviewTab('video');
    }
  };

  // Sync with store products fast
  const handlePickStoreProduct = (ad: ProductAd) => {
    setSimProductName(ad.title);
    if (ad.images && ad.images[0]) {
      setSimProductImage(ad.images[0]);
    }
    setSimSellingPrice(ad.price);
    setSimPurchasePrice(Math.round(ad.price * 0.32));
    setSimNiche(ad.category);
  };

  // Dynamic Product Market Fit Verdict Algorithm
  const marketFitVerdict = useMemo(() => {
    let score = 55;
    const reasons: { text: string; positive: boolean }[] = [];

    // Margin
    const margin = simSellingPrice - simPurchasePrice;
    if (margin >= 160) {
      score += 20;
      reasons.push({ text: `هامش ربح إجمالي ممتاز (+${margin} ${currentCountry.currency}) يغطي تكاليف الإعلانات والشحن والروتور بأريحية تامة.`, positive: true });
    } else if (margin >= 100) {
      score += 10;
      reasons.push({ text: `هامش ربح جيد (+${margin} ${currentCountry.currency})، يتطلب إبقاء تكلفة الإعلان CPA أقل من 35 ${currentCountry.currency}.`, positive: true });
    } else {
      score -= 22;
      reasons.push({ text: `هامش ربح ضعيف (${margin} ${currentCountry.currency}) يشكل خطورة ولا يغطي مصاريف التوصيل وإرجاع السلع.`, positive: false });
    }

    // City & Regional Performance
    if (currentCity.deliveryRate >= 82) {
      score += 12;
      reasons.push({ text: `نسبة تسليم قياسية في ${currentCity.name} (${currentCity.deliveryRate}%) تضمن سيولة سريعة ومصاريف روتور منخفضة.`, positive: true });
    } else if (currentCity.deliveryRate >= 76) {
      score += 5;
      reasons.push({ text: `نسبة تسليم جيدة في ${currentCity.name} (${currentCity.deliveryRate}%) مع متابعة هاتفية للزبائن.`, positive: true });
    } else {
      score -= 10;
      reasons.push({ text: `نسبة التسليم في ${currentCity.name} (${currentCity.deliveryRate}%) تتطلب تأكيداً صارماً بالواتساب قبل الشحن.`, positive: false });
    }

    // Purchasing Power & Price Sensitivity
    if (currentCity.purchasingPower === 'عالية جداً' || currentCity.purchasingPower === 'عالية') {
      score += 8;
      reasons.push({ text: `قدرة شرائية مرتفعة في ${currentCity.name} تدعم سعر البيع المقترح (${simSellingPrice} ${currentCountry.currency}).`, positive: true });
    } else if (currentCity.purchasingPower.includes('حساسة للسعر') && simSellingPrice > 250) {
      score -= 12;
      reasons.push({ text: `الزبناء في ${currentCity.name} حساسون للسعر؛ يُنصح بتقديم باقة تخفيضية 2 حبات بسعر مغرٍ.`, positive: false });
    }

    // Niche Demand in COD
    const lowerNiche = (simNiche || '').toLowerCase();
    if (lowerNiche.includes('كوسميتيك') || lowerNiche.includes('تجميل') || lowerNiche.includes('مكمل') || lowerNiche.includes('عناية')) {
      score += 10;
      reasons.push({ text: 'قطاع الكوزميتيك والمكملات يشهد أعلى معدلات إعادة الشراء وهو الأكثر طلباً في الدفع عند الاستلام بالمغرب.', positive: true });
    }

    // Logistics & Weight
    if (simWeight === 'light') {
      score += 6;
      reasons.push({ text: 'وزن السلعة خفيف (<500g) مما يقلل تكاليف الشحن ويسرع تسليم الموزعين.', positive: true });
    } else if (simWeight === 'heavy') {
      score -= 12;
      reasons.push({ text: 'وزن السلعة ثقيل (+2kg) يرفع تسعيرة شركة الشحن ويقلل هامش الربح.', positive: false });
    }

    if (simIsFragile) {
      score -= 10;
      reasons.push({ text: 'السلعة قابلة للكسر مما يقتضي تغليفاً فائق الحماية لتفادي الروتور أثناء النقل.', positive: false });
    } else {
      score += 4;
      reasons.push({ text: 'السلعة صلبة وتتحمل ظروف الشحن بدون مخاطر تلف.', positive: true });
    }

    if (simHasWowFactor) {
      score += 8;
      reasons.push({ text: 'عنصر الإبهار يجلب نقرات رخيصة وتفاعلاً واسعاً على إعلانات فيسبوك وتيك توك.', positive: true });
    }

    const finalScore = Math.max(25, Math.min(99, score));

    let verdictType: 'success' | 'warning' | 'danger' = 'success';
    let verdictTitle = '🟢 نعم! المنتج مناسب ومربح جداً لهذا السوق';
    let verdictDesc = `المؤشرات ممتازة جداً في ${currentCity.name}. السلعة تملك هامشاً وافياً وزاوية بيع قوية تضمن أرباحاً صافية ونسبة استلام مرتفعة.`;

    if (finalScore < 55) {
      verdictType = 'danger';
      verdictTitle = '🔴 مخاطرة عالية وغير مناسب حالياً لهذا السوق';
      verdictDesc = `المنتج يواجه صعوبة في ${currentCity.name} إما بسبب ضعف هامش الربح مقارنة بتكاليف الشحن والإعلانات، أو حساسية الزبائن للسعر.`;
    } else if (finalScore < 75) {
      verdictType = 'warning';
      verdictTitle = '🟡 مناسب بشروط مع ضرورة ضبط العرض والسعر';
      verdictDesc = `يمكن تحقيق أرباح شريطة تقديم باقة 2 حبات (Pack Promo) لرفع قيمة السلة وتأكيد العنوان هاتفياً قبل خروج الشحنة.`;
    }

    return {
      score: finalScore,
      verdictType,
      verdictTitle,
      verdictDesc,
      reasons,
    };
  }, [simSellingPrice, simPurchasePrice, simWeight, simIsFragile, simHasWowFactor, simNiche, currentCity, currentCountry]);

  // ==========================================
  // 2. PRICING & WALLET PORTFOLIO CALCULATOR
  // ==========================================
  const [calcPurchasePrice, setCalcPurchasePrice] = useState<number>(75);
  const [calcSellingPrice, setCalcSellingPrice] = useState<number>(299);
  const [calcShippingCost, setCalcShippingCost] = useState<number>(35);
  const [calcReturnCost, setCalcReturnCost] = useState<number>(15);
  const [calcCpaAds, setCalcCpaAds] = useState<number>(45);
  const [calcConfirmRate, setCalcConfirmRate] = useState<number>(85);
  const [calcDeliveryRate, setCalcDeliveryRate] = useState<number>(75);
  const [calcPackaging, setCalcPackaging] = useState<number>(8);
  const [calcOrdersVolume, setCalcOrdersVolume] = useState<number>(300);

  // Recalibrated Deep COD Profit & Ads Budget Metrics
  const profitMetrics = useMemo(() => {
    const totalLeads = Math.max(1, Number(calcOrdersVolume) || 100);
    const confirmedOrders = Math.round(totalLeads * ((Number(calcConfirmRate) || 80) / 100));
    const deliveredOrders = Math.round(confirmedOrders * ((Number(calcDeliveryRate) || 75) / 100));
    const returnedOrders = Math.max(0, confirmedOrders - deliveredOrders);

    const totalRevenue = deliveredOrders * (Number(calcSellingPrice) || 0);
    const productCost = deliveredOrders * (Number(calcPurchasePrice) || 0);
    const adCost = totalLeads * (Number(calcCpaAds) || 0);
    const shippingDeliveredCost = deliveredOrders * (Number(calcShippingCost) || 0);
    const shippingReturnsCost = returnedOrders * (Number(calcReturnCost) || 0);
    const packagingCost = confirmedOrders * (Number(calcPackaging) || 0);

    const shippingTotalCost = shippingDeliveredCost + shippingReturnsCost;
    const totalExpenses = productCost + adCost + shippingTotalCost + packagingCost;
    const netProfitTotal = totalRevenue - totalExpenses;
    const netProfitPerDelivered = deliveredOrders > 0 ? Math.round(netProfitTotal / deliveredOrders) : 0;
    const profitMarginPercent = totalRevenue > 0 ? Math.round((netProfitTotal / totalRevenue) * 100) : 0;

    // Ads and Expense Ratios as Percentages of Total Revenue
    const adCostSharePercent = totalRevenue > 0 ? Math.round((adCost / totalRevenue) * 100) : 0;
    const cogsSharePercent = totalRevenue > 0 ? Math.round((productCost / totalRevenue) * 100) : 0;
    const shippingSharePercent = totalRevenue > 0 ? Math.round((shippingTotalCost / totalRevenue) * 100) : 0;
    const packagingSharePercent = totalRevenue > 0 ? Math.round((packagingCost / totalRevenue) * 100) : 0;

    // Real Cost Per Delivered Order (CPA Réel par Colis Livré)
    const realCpaPerDelivered = deliveredOrders > 0 ? Math.round(adCost / deliveredOrders) : 0;

    // ROAS (Return On Ad Spend)
    const roas = adCost > 0 ? (totalRevenue / adCost).toFixed(2) : '0';

    // Breakeven CPA
    const totalCostWithoutAds = productCost + shippingTotalCost + packagingCost;
    const breakevenCpa = totalLeads > 0 ? Math.round((totalRevenue - totalCostWithoutAds) / totalLeads) : 0;

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
      adCostSharePercent,
      cogsSharePercent,
      shippingSharePercent,
      packagingSharePercent,
      shippingTotalCost,
      productCost,
      packagingCost,
      realCpaPerDelivered,
      roas,
      breakevenCpa,
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
  const [invoiceFormError, setInvoiceFormError] = useState<string | null>(null);

  // New Invoice form state
  const [newInvCustomer, setNewInvCustomer] = useState('');
  const [newInvPhone, setNewInvPhone] = useState('');
  const [newInvCity, setNewInvCity] = useState('الدار البيضاء');
  const [newInvProduct, setNewInvProduct] = useState(ads[0]?.title || 'ساعة فاخرة');
  const [newInvQty, setNewInvQty] = useState(1);
  const [newInvPrice, setNewInvPrice] = useState(299);

  // Filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (invoiceSearchQuery.trim()) {
        const q = invoiceSearchQuery.toLowerCase();
        const matchesName = (inv.customerName || '').toLowerCase().includes(q);
        const matchesId = (inv.id || '').toLowerCase().includes(q);
        const matchesCity = (inv.customerCity || '').toLowerCase().includes(q);
        const matchesProduct = (inv.productTitle || '').toLowerCase().includes(q);
        return matchesName || matchesId || matchesCity || matchesProduct;
      }
      return true;
    });
  }, [invoices, invoiceSearchQuery]);

  // Accounting aggregates
  const accountingTotals = useMemo(() => {
    const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.status === 'paid' ? inv.totalAmount : 0), 0);
    const totalOrders = filteredInvoices.length;
    const paidCount = filteredInvoices.filter((i) => i.status === 'paid').length;
    const pendingCount = filteredInvoices.filter((i) => i.status === 'pending').length;
    const cancelledCount = filteredInvoices.filter((i) => i.status === 'cancelled').length;

    const estimatedExpenses = Math.round(totalRevenue * 0.48);
    const netProfit = totalRevenue - estimatedExpenses;

    return {
      totalRevenue,
      totalOrders,
      paidCount,
      pendingCount,
      cancelledCount,
      estimatedExpenses,
      netProfit,
    };
  }, [filteredInvoices]);

  const handleCreateNewInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setInvoiceFormError(null);
    if (!newInvCustomer.trim()) {
      setInvoiceFormError('يرجى كتابة اسم الزبون الكامل');
      return;
    }
    if (!newInvPhone.trim()) {
      setInvoiceFormError('يرجى إدخال رقم الهاتف للتواصل مع الزبون');
      return;
    }

    const createdInv: Invoice = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: newInvCustomer,
      customerPhone: newInvPhone,
      customerCity: newInvCity,
      customerAddress: 'العنوان المسجل عند التأكيد',
      productTitle: newInvProduct,
      quantity: Number(newInvQty),
      unitPrice: Number(newInvPrice),
      shippingCost: 0,
      totalAmount: Number(newInvQty) * Number(newInvPrice),
      currency: 'DH',
      date: new Date().toISOString().slice(0, 10),
      month: new Date().toISOString().slice(0, 7),
      year: new Date().toISOString().slice(0, 4),
      status: 'paid',
      sellerName: 'متجر سوق في يدك الرسمي',
      sellerPhone: '+212612345678',
      sellerCity: 'الدار البيضاء',
      iceNumber: '003291823000045',
    };

    setInvoices([createdInv, ...invoices]);
    setIsCreateInvoiceOpen(false);
    setSelectedInvoiceForModal(createdInv);
  };

  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-200" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ========================================================
          1. COMPACT TOP DASHBOARD HEADER
         ======================================================== */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shrink-0 shadow-xs">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                محاكاة الأرباح، فحص الأسواق والمحاسبة المالية
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                COD Suite Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              اختر الأداة المطلوبة للانتقال المباشر وحساب المعطيات بدقة:
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-bold bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 shrink-0 flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>السوق الحالي: {currentCountry.flag} {currentCountry.name}</span>
        </div>
      </div>

      {/* ========================================================
          2. THE 3 DIRECT CHOICES ROW
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Choice 1: Market Fit Scanner */}
        <button
          type="button"
          onClick={() => setActiveSuiteTab('simulator')}
          className={`p-4 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between gap-2.5 ${
            activeSuiteTab === 'simulator'
              ? 'bg-gradient-to-b from-teal-50 to-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeSuiteTab === 'simulator' ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-700'}`}>
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-teal-600 font-black uppercase tracking-wider block">
                  Choix 1 · Test Marché
                </span>
                <h3 className="text-sm font-black text-slate-900 leading-tight">
                  1. فحص ملائمة السوق والطلب
                </h3>
              </div>
            </div>
            {activeSuiteTab === 'simulator' && (
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-teal-100" />
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            فحص توافق السلعة مع الجهات والمدن، وحساب حجم الاستهلاك ونسبة التحويل المقدرة.
          </p>
        </button>

        {/* Choice 2: Profit & Margins Simulator */}
        <button
          type="button"
          onClick={() => setActiveSuiteTab('pricing_portfolio')}
          className={`p-4 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between gap-2.5 ${
            activeSuiteTab === 'pricing_portfolio'
              ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeSuiteTab === 'pricing_portfolio' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-600 font-black uppercase tracking-wider block">
                  Choix 2 · Marge & Profit
                </span>
                <h3 className="text-sm font-black text-slate-900 leading-tight">
                  2. محاكي الأرباح والتسعير
                </h3>
              </div>
            </div>
            {activeSuiteTab === 'pricing_portfolio' && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            حساب صافي الأرباح في الجيب، مصاريف الإعلانات والشحن والروتور ونقطة التعادل.
          </p>
        </button>

        {/* Choice 3: Accounting & Invoices */}
        <button
          type="button"
          onClick={() => setActiveSuiteTab('accounting')}
          className={`p-4 rounded-2xl border text-right transition-all cursor-pointer relative flex flex-col justify-between gap-2.5 ${
            activeSuiteTab === 'accounting'
              ? 'bg-gradient-to-b from-blue-50 to-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
              : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeSuiteTab === 'accounting' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-blue-600 font-black uppercase tracking-wider block">
                  Choix 3 · Factures & Bilan
                </span>
                <h3 className="text-sm font-black text-slate-900 leading-tight">
                  3. المحاسبة والفواتير
                </h3>
              </div>
            </div>
            {activeSuiteTab === 'accounting' && (
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-100" />
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            تتبع المداخيل، المصاريف اليومية والشهرية، وإصدار وطباعة فواتير الزبناء الرسمية.
          </p>
        </button>
      </div>

      {/* ========================================================
          SUITE 1: PRODUCT MARKET FIT & CASCADING MARKET SCANNER
         ======================================================== */}
      {activeSuiteTab === 'simulator' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Quick Product Pick from Store Bar */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="font-bold text-slate-800">
                اختر منتجاً من متجرك أو ارفع صور وفيديوهات السلعة الخاصة بك:
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {ads.slice(0, 4).map((a) => (
                <button
                  key={a.id}
                  onClick={() => handlePickStoreProduct(a)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 text-[11px] font-bold text-slate-700 hover:text-teal-900 transition-colors shrink-0 cursor-pointer border border-slate-200"
                >
                  {a.title.split(' ')[0]} {a.title.split(' ')[1] || ''}
                </button>
              ))}
            </div>
          </div>

          {/* ==========================================================
              HORIZONTAL MARKET SELECTOR BAR (الدولة، الجهة، المدينة في صف واحد أفقي)
             ========================================================== */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  تحديد المنطقة والسوق الجغرافي المستهدف (الدولة · الجهة · المدينة المستهدفة)
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100 shrink-0">
                <span>{currentCountry.flag} {currentCountry.name}</span>
                <ChevronRight className="w-3 h-3 text-indigo-400" />
                <span>{currentRegion.name}</span>
                <ChevronRight className="w-3 h-3 text-indigo-400" />
                <span className="font-black text-indigo-900">{currentCity.name}</span>
              </div>
            </div>

            {/* THE THREE SELECTORS IN ONE SINGLE HORIZONTAL ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Selector 1: Country */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                <label className="font-black text-slate-700 flex items-center gap-1 text-[11px]">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>1. الدولة المستهدفة (Pays):</span>
                </label>
                <select
                  value={selectedCountryKey}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer text-xs"
                >
                  {Object.keys(GLOBAL_MARKETS_HIERARCHY).map((cKey) => {
                    const c = GLOBAL_MARKETS_HIERARCHY[cKey];
                    return (
                      <option key={c.id} value={c.id}>
                        {c.flag} {c.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Selector 2: Region */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                <label className="font-black text-slate-700 flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2. الجهة / الإقليم (Région):</span>
                </label>
                <select
                  value={safeRegionKey}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer text-xs"
                >
                  {Object.keys(currentCountry.regions || {}).map((rKey) => {
                    const r = currentCountry.regions[rKey];
                    return (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Selector 3: City */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                <label className="font-black text-slate-700 flex items-center gap-1 text-[11px]">
                  <Building className="w-3.5 h-3.5 text-purple-600" />
                  <span>3. المدينة المستهدفة (Ville Cible):</span>
                </label>
                <select
                  value={safeCityKey}
                  onChange={(e) => setSelectedCityKey(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer text-xs"
                >
                  {Object.keys(currentRegion.cities || {}).map((cKey) => {
                    const city = currentRegion.cities[cKey];
                    return (
                      <option key={cKey} value={cKey}>
                        {city.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* MAIN GRID: Product Media & Specs (Left) vs Market Consumption & Verdict (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Product Media (Photos & Video) & Specs (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-teal-600" />
                    <h3 className="text-xs sm:text-sm font-black text-slate-900">
                      ملفات ومواصفات السلعة (Photos & Vidéo)
                    </h3>
                  </div>
                  <span className="text-[10px] text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full font-bold">
                    مربوط بالمجال
                  </span>
                </div>

                {/* MEDIA UPLOAD SECTION: Photos & Video */}
                <div className="space-y-2.5">
                  {/* Media View Toggle: Photo or Video */}
                  <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveMediaPreviewTab('image')}
                      className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeMediaPreviewTab === 'image'
                          ? 'bg-white text-slate-900 shadow-xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-teal-600" />
                      <span>صورة السلعة (Photo)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaPreviewTab('video')}
                      className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        activeMediaPreviewTab === 'video'
                          ? 'bg-white text-slate-900 shadow-xs font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5 text-purple-600" />
                      <span>فيديو إعلاني (Vidéo)</span>
                      {simProductVideo && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </button>
                  </div>

                  {/* Hidden Real Inputs */}
                  <input
                    type="file"
                    ref={simFileInputRef}
                    onChange={handleSimImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={simVideoInputRef}
                    onChange={handleSimVideoUpload}
                    accept="video/*"
                    className="hidden"
                  />

                  {/* Media Preview Box */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xs flex items-center justify-center group">
                    {activeMediaPreviewTab === 'image' ? (
                      <>
                        <img
                          src={simProductImage}
                          alt={simProductName}
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => simFileInputRef.current?.click()}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-black text-xs cursor-pointer backdrop-blur-[1px]"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>تغيير صورة السلعة من جهازك</span>
                        </button>
                      </>
                    ) : (
                      <>
                        {simProductVideo ? (
                          <video
                            src={simProductVideo}
                            controls
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-center p-4 space-y-2 text-white">
                            <Film className="w-8 h-8 text-purple-400 mx-auto" />
                            <p className="text-xs font-bold">لا يوجد فيديو إعلاني مرفوع حالياً</p>
                            <p className="text-[10px] text-slate-400">ارفع فيديو ترويجي لزيادة نسبة التحويل والتأكيد</p>
                            <button
                              type="button"
                              onClick={() => simVideoInputRef.current?.click()}
                              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              + رفع فيديو السلعة الآن
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Dual Upload Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => simFileInputRef.current?.click()}
                      className="py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">+ رفع صورة (Photo)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => simVideoInputRef.current?.click()}
                      className="py-2 px-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-purple-200"
                    >
                      <Video className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">+ رفع فيديو (Vidéo)</span>
                    </button>
                  </div>
                </div>

                {/* AUTOMATIC NICHE PRESET SELECTOR (ربط تلقائي بمجال المنتج) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-black text-slate-700 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>المجال / الصنف (Niche):</span>
                    </label>
                    <span className="text-[10px] text-emerald-600 font-bold">
                      يربط الإعدادات تلقائياً
                    </span>
                  </div>

                  {/* Quick Niche Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
                    {[
                      { key: 'cosmetics', name: 'كوسميتيك' },
                      { key: 'supplements', name: 'مكملات' },
                      { key: 'electronics', name: 'إلكترونيات' },
                      { key: 'fashion', name: 'أزياء' },
                      { key: 'home', name: 'المنزل' },
                      { key: 'accessories', name: 'إكسسوارات' },
                    ].map((n) => (
                      <button
                        key={n.key}
                        type="button"
                        onClick={() => handleSelectNiche(n.key)}
                        className={`p-1.5 rounded-lg font-bold border transition-all cursor-pointer text-center ${
                          simNicheKey === n.key
                            ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {n.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Detail Fields */}
                <div className="space-y-3 text-xs pt-1">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">اسم المنتج أو السلعة *</label>
                    <input
                      type="text"
                      value={simProductName}
                      onChange={(e) => setSimProductName(e.target.value)}
                      placeholder="اسم المنتج..."
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-teal-500 text-xs"
                    />
                  </div>

                  {/* Target Gender & Age */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">الفئة المستهدفة:</label>
                      <select
                        value={simTargetGender}
                        onChange={(e) => setSimTargetGender(e.target.value as any)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 cursor-pointer text-xs"
                      >
                        <option value="نساء">نساء (Femmes)</option>
                        <option value="رجال">رجال (Hommes)</option>
                        <option value="الجميع">الجميع (Tous)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">السن المستهدف:</label>
                      <select
                        value={simTargetAge}
                        onChange={(e) => setSimTargetAge(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 cursor-pointer text-xs"
                      >
                        <option value="18-25 سنة">18 - 25 سنة</option>
                        <option value="25-35 سنة">25 - 35 سنة</option>
                        <option value="35-50 سنة">35 - 50 سنة</option>
                        <option value="+50 سنة">+50 سنة</option>
                        <option value="كل الأعمار">كل الأعمار</option>
                      </select>
                    </div>
                  </div>

                  {/* Problem solved */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">المشكل الذي يحله المنتج (Problème résolu):</label>
                    <input
                      type="text"
                      value={simProblemSolved}
                      onChange={(e) => setSimProblemSolved(e.target.value)}
                      placeholder="المشكل المحلول..."
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-teal-500 text-xs"
                    />
                  </div>

                  {/* Prices */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">سعر الشراء بالجملة ({currentCountry.currency})</label>
                      <input
                        type="number"
                        value={simPurchasePrice}
                        onChange={(e) => setSimPurchasePrice(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-black text-slate-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">سعر البيع المقترح ({currentCountry.currency})</label>
                      <input
                        type="number"
                        value={simSellingPrice}
                        onChange={(e) => setSimSellingPrice(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-black text-emerald-700 text-xs"
                      />
                    </div>
                  </div>

                  {/* Weight Selector */}
                  <div>
                    <span className="font-bold text-slate-700 block mb-1">وزن السلعة المقدر:</span>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      {[
                        { id: 'light', label: 'خفيف (<500g)' },
                        { id: 'medium', label: 'متوسط (500g-2kg)' },
                        { id: 'heavy', label: 'ثقيل (+2kg)' },
                      ].map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setSimWeight(w.id as any)}
                          className={`p-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                            simWeight === w.id
                              ? 'bg-teal-600 text-white shadow-xs font-black'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {w.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Characteristic Checkboxes */}
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={simHasWowFactor}
                        onChange={(e) => setSimHasWowFactor(e.target.checked)}
                        className="w-3.5 h-3.5 accent-teal-600"
                      />
                      <span className="text-[11px] font-bold text-slate-800">ميزة إبهار (Wow Factor)</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={simIsFragile}
                        onChange={(e) => setSimIsFragile(e.target.checked)}
                        className="w-3.5 h-3.5 accent-rose-600"
                      />
                      <span className="text-[11px] font-bold text-slate-800">قابلة للكسر (زجاج/سائل)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Consumption & Decision (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* CONSUMPTION & CONVERSION ESTIMATE CARD */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider block">
                      إحصائيات وشهية الاستهلاك لـ "{currentCity.name}"
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      مؤشرات الطلب والتحويل (Consommation & Conversion)
                    </h3>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white/10 border border-white/15">
                    <span className="text-[10px] font-bold text-slate-300 block">نسبة التسليم (COD)</span>
                    <span className="text-lg font-black text-emerald-400">{currentCity.deliveryRate}%</span>
                  </div>
                </div>

                {/* The 4 Core Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Metric 1: Consommation */}
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>حجم الاستهلاك والطلب الشهري (Consommation):</span>
                    </span>
                    <span className="text-sm sm:text-base font-black text-white block">
                      {currentCity.monthlyConsumption}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      إجمالي الطلبيات المتداولة في هذه المنطقة شهرياً
                    </span>
                  </div>

                  {/* Metric 2: Pourcentage de conversion */}
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5" />
                      <span>نسبة التحويل والمبيعات (Pourcentage):</span>
                    </span>
                    <span className="text-sm sm:text-base font-black text-emerald-400 block">
                      {currentCity.expectedConversionRate}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      معدل تحويل الزوار إلى زبائن فعليين
                    </span>
                  </div>

                  {/* Metric 3: CPA Ads */}
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>تكلفة الإعلان لكل طلبية (CPA Ads):</span>
                    </span>
                    <span className="text-sm sm:text-base font-black text-purple-400 block">
                      {currentCity.avgCpa}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      القوة الشرائية: {currentCity.purchasingPower}
                    </span>
                  </div>

                  {/* Metric 4: Delivery time & Couriers */}
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      <span>مدة التوصيل والشركات المعتمدة:</span>
                    </span>
                    <span className="text-sm font-black text-white block">
                      {currentCity.deliveryTime}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {currentCity.topCouriers}
                    </span>
                  </div>
                </div>

                {/* Best Selling Angle */}
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-black text-amber-300">
                    <Sparkles className="w-4 h-4" />
                    <span>أفضل زاوية تسويقية تحقق أعلى مبيعات في {currentCity.name}:</span>
                  </div>
                  <p className="text-white font-bold leading-relaxed">
                    "{currentCity.bestSellingAngle}"
                  </p>
                  <p className="text-[11px] text-slate-300 pt-1 border-t border-white/10">
                    💡 {currentCity.logisticNotes} · أوقات الذروة: {currentCity.peakHours}
                  </p>
                </div>
              </div>

              {/* Verdict Card */}
              <div
                className={`rounded-2xl p-4 sm:p-5 border shadow-sm space-y-3 ${
                  marketFitVerdict.verdictType === 'success'
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                    : marketFitVerdict.verdictType === 'warning'
                    ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                    : 'bg-rose-50/90 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                      القرار الحاسم لـ "{simProductName}" في {currentCity.name}
                    </span>
                    <h4 className="text-sm sm:text-base font-black leading-tight">
                      {marketFitVerdict.verdictTitle}
                    </h4>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-white shadow-2xs border border-slate-200 shrink-0">
                    <span className="text-lg font-black text-slate-900 block leading-none">
                      {marketFitVerdict.score}%
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold block">التوافق</span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed font-medium">
                  {marketFitVerdict.verdictDesc}
                </p>

                {/* Reasons List */}
                <div className="space-y-1 pt-2 border-t border-black/10 text-xs">
                  {marketFitVerdict.reasons.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="font-bold">{r.positive ? '✓' : '⚠️'}</span>
                      <span className={r.positive ? 'font-medium' : 'font-bold'}>{r.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUITE 2: PRICING & PROFIT CALCULATOR
          (مع تنسيق ميزانية الإعلانات والأرباح المتوقعة كنسبة مئوية بصورة بصرية واضحة)
         ======================================================== */}
      {activeSuiteTab === 'pricing_portfolio' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* VISUAL DASHBOARD: Wide Horizontal Financial Summary Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-amber-400 block">
                  الملخص المالي الشامل لحملة الدفع عند الاستلام (COD Marge & Budget)
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  الأرباح الصافية الحقيقية بعد خصم جميع التكاليف وميزانية الإشهار
                </h3>
              </div>

              {/* Expected Profit Percentage Badge */}
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm border flex items-center gap-1.5 ${
                  profitMetrics.profitMarginPercent >= 35
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : profitMetrics.profitMarginPercent >= 20
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                }`}>
                  <Percent className="w-4 h-4" />
                  <span>صافي هامش الربح المتوقع: {profitMetrics.profitMarginPercent}%</span>
                </div>
                <span className="text-xs bg-white/10 text-slate-300 px-3 py-1 rounded-xl font-bold">
                  {profitMetrics.totalLeads} طلبية واردة
                </span>
              </div>
            </div>

            {/* WIDE HORIZONTAL KPI CARDS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Card 1: Total Net Profit */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block">صافي الأرباح في جيبك (Bénéfice Net):</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {profitMetrics.netProfitTotal.toLocaleString()} <span className="text-sm">DH</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-bold block">
                  ربح صافي حقيقي بعد كل المصاريف
                </span>
              </div>

              {/* Card 2: Net Profit Per Delivered */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block">الربح الصافي للطلبية المسلمة:</span>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {profitMetrics.netProfitPerDelivered} <span className="text-xs font-bold text-slate-400">DH</span>
                </div>
                <span className="text-[10px] text-slate-300 block">لكل كولية تم استخلاص ثمنها</span>
              </div>

              {/* Card 3: Breakeven CPA */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block">نقطة التعادل (Breakeven CPA):</span>
                <div className="text-xl sm:text-2xl font-black text-amber-400">
                  {profitMetrics.breakevenCpa} <span className="text-xs font-bold text-slate-400">DH</span>
                </div>
                <span className="text-[10px] text-amber-300/80 block">أقصى حد لتكلفة الإعلان لتفادي الخسارة</span>
              </div>

              {/* Card 4: Orders Funnel */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block">الطلبيات المسلمة (Livrées):</span>
                <div className="text-xl sm:text-2xl font-black text-teal-400">
                  {profitMetrics.deliveredOrders} <span className="text-xs font-bold text-slate-400">طلبية</span>
                </div>
                <span className="text-[10px] text-slate-300 block">
                  {profitMetrics.confirmedOrders} مؤكدة · {profitMetrics.returnedOrders} روتور
                </span>
              </div>
            </div>

            {/* VISUAL MULTI-SEGMENT BREAKDOWN BAR (توزيع كل 100 درهم بصورة بصرية واضحة) */}
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <PieChart className="w-3.5 h-3.5 text-teal-400" />
                  <span>توزيع المداخيل الإجمالية كنسب مئوية (Répartition du CA):</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold">100% = {profitMetrics.totalRevenue.toLocaleString()} DH</span>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${Math.max(0, profitMetrics.profitMarginPercent)}%` }}
                  className="bg-emerald-500 h-full transition-all"
                  title={`أرباح صافية: ${profitMetrics.profitMarginPercent}%`}
                />
                <div
                  style={{ width: `${Math.max(0, profitMetrics.adCostSharePercent)}%` }}
                  className="bg-purple-500 h-full transition-all"
                  title={`ميزانية الإعلانات: ${profitMetrics.adCostSharePercent}%`}
                />
                <div
                  style={{ width: `${Math.max(0, profitMetrics.cogsSharePercent)}%` }}
                  className="bg-blue-500 h-full transition-all"
                  title={`تكلفة السلع بالجملة: ${profitMetrics.cogsSharePercent}%`}
                />
                <div
                  style={{ width: `${Math.max(0, profitMetrics.shippingSharePercent)}%` }}
                  className="bg-rose-500 h-full transition-all"
                  title={`الشحن والروتور: ${profitMetrics.shippingSharePercent}%`}
                />
              </div>

              {/* Color Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-bold">صافي الأرباح: {profitMetrics.profitMarginPercent}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="font-bold">ميزانية الإعلانات: {profitMetrics.adCostSharePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="font-bold">تكلفة السلع: {profitMetrics.cogsSharePercent}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="font-bold">الشحن والروتور: {profitMetrics.shippingSharePercent}%</span>
                </div>
              </div>
            </div>

            {/* DEDICATED ADS BUDGET & SPEND CARD */}
            <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 space-y-0.5">
                <span className="text-slate-400 font-bold block text-[11px]">ميزانية الإعلانات الإجمالية (Budget Ads):</span>
                <span className="text-base font-black text-purple-300 block">{profitMetrics.adCost.toLocaleString()} DH</span>
                <span className="text-[10px] text-slate-400 block">لجلب {profitMetrics.totalLeads} طلبية واردة</span>
              </div>

              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 space-y-0.5">
                <span className="text-slate-400 font-bold block text-[11px]">CPA الفعلي لكل تسليم (Par Colis):</span>
                <span className="text-base font-black text-white block">{profitMetrics.realCpaPerDelivered} DH</span>
                <span className="text-[10px] text-amber-300 block">مقارنة بنقطة التعادل ({profitMetrics.breakevenCpa} DH)</span>
              </div>

              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 space-y-0.5">
                <span className="text-slate-400 font-bold block text-[11px]">عائد الإنفاق الإعلاني (ROAS):</span>
                <span className="text-base font-black text-emerald-400 block">{profitMetrics.roas}x</span>
                <span className="text-[10px] text-emerald-300 block">كل 1 درهم إعلانات يولد {profitMetrics.roas} درهم مداخيل</span>
              </div>
            </div>
          </div>

          {/* Sliders Grid across the width */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  محددات وإعدادات حساب الأرباح الواقعية لتجارة الدفع عند الاستلام
                </h3>
                <p className="text-xs text-slate-500">
                  حرك المؤشرات لملاحظة تأثير ميزانية الإعلانات ونسب التسليم على نسبة الأرباح المتوقعة
                </p>
              </div>
              <Sliders className="w-5 h-5 text-emerald-600" />
            </div>

            {/* Sliders in a 3-column wide responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* 1. Purchase Price */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">سعر شراء السلعة (COGS):</span>
                  <span className="text-blue-700 font-black text-sm">{calcPurchasePrice} DH</span>
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
                <span className="text-[10px] text-slate-400 block">تكلفة شراء القطعة الواحدة من المورد</span>
              </div>

              {/* 2. Selling Price */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">سعر البيع للزبون (Prix de Vente):</span>
                  <span className="text-emerald-700 font-black text-sm">{calcSellingPrice} DH</span>
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
                <span className="text-[10px] text-slate-400 block">السعر المعروض في صفحة الهبوط والإعلانات</span>
              </div>

              {/* 3. Shipping Fee Delivered */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">تكلفة التوصيل الناجح:</span>
                  <span className="text-slate-900 font-black text-sm">{calcShippingCost} DH</span>
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
                <span className="text-[10px] text-slate-400 block">متوسط عمولة شركة الشحن عند تسليم الكولية</span>
              </div>

              {/* 4. CPA Ads */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">تكلفة الإشهار لكل طلبية (CPA Ads):</span>
                  <span className="text-purple-700 font-black text-sm">{calcCpaAds} DH</span>
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
                <span className="text-[10px] text-slate-400 block">المبلغ المدفوع لفيسبوك / تيك توك لجلب طلبية واحدة</span>
              </div>

              {/* 5. Confirmation Rate */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">نسبة تأكيد المكالمات:</span>
                  <span className="text-teal-700 font-black text-sm">{calcConfirmRate}%</span>
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
                <span className="text-[10px] text-slate-400 block">نسبة الزبائن الذين يؤكدون العنوان هاتفياً</span>
              </div>

              {/* 6. Delivery Rate */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">نسبة التسليم (Taux de Livraison):</span>
                  <span className="text-indigo-700 font-black text-sm">{calcDeliveryRate}%</span>
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
                <span className="text-[10px] text-slate-400 block">نسبة من يدفع ويستلم السلعة عند وصول الموزع</span>
              </div>
            </div>

            {/* Monthly Volume Slider */}
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-950 font-black">حجم الطلبيات الواردة شهرياً (Volume Leads):</span>
                <span className="text-emerald-700 font-black text-sm sm:text-base">{calcOrdersVolume} طلبية واردة</span>
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
              <span className="text-[10px] text-emerald-800 block">
                تحديد حجم الحملة لتقدير ميزانية الإعلانات الإجمالية وصافي الأرباح ونقطة التعادل
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUITE 3: ACCOUNTING & INVOICES (COMPTABILITÉ & FACTURES)
         ======================================================== */}
      {activeSuiteTab === 'accounting' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Accounting KPI Cards (Daily / Monthly / Yearly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Card 1: Chiffre d'Affaires */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">إجمالي المداخيل</span>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  Chiffre d'Affaires
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {accountingTotals.totalRevenue.toLocaleString()} <span className="text-xs text-slate-500 font-bold">DH</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-bold block">
                Ventes encaissées avec succès
              </span>
            </div>

            {/* Card 2: Dépenses */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">المصاريف المقدرة</span>
                <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                  Dépenses & Coûts
                </span>
              </div>
              <div className="text-2xl font-black text-rose-600">
                {accountingTotals.estimatedExpenses.toLocaleString()} <span className="text-xs text-slate-500 font-bold">DH</span>
              </div>
              <span className="text-[11px] text-slate-500 font-bold block">
                Produits + Livraison + Ads
              </span>
            </div>

            {/* Card 3: Bénéfice Net */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">الأرباح الصافية</span>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  Bénéfice Net
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-600">
                {accountingTotals.netProfit.toLocaleString()} <span className="text-xs text-emerald-700 font-bold">DH</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-bold block">
                Marge nette réelle ~52%
              </span>
            </div>

            {/* Card 4: Factures Acquittées */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">الفواتير المستخلصة</span>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  Factures Payées
                </span>
              </div>
              <div className="text-2xl font-black text-indigo-600">
                {accountingTotals.paidCount} <span className="text-xs text-slate-500 font-bold">فاتورة</span>
              </div>
              <span className="text-[11px] text-indigo-600 font-bold block">
                Prêtes pour impression & suivi
              </span>
            </div>
          </div>

          {/* Invoices Action Bar */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            {/* Period selector */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              {[
                { id: 'all', label: 'كل الفترات (Toutes)' },
                { id: 'daily', label: 'اليومي (Aujourd\'hui)' },
                { id: 'monthly', label: 'الشهري (Ce mois)' },
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
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <input
                  type="text"
                  value={invoiceSearchQuery}
                  onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                  placeholder="ابحث بالفاتورة أو الزبون..."
                  className="py-1.5 px-3 pr-8 bg-slate-100 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-800 placeholder:text-slate-400"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 right-2.5 pointer-events-none" />
              </div>

              <button
                onClick={() => {
                  setInvoiceFormError(null);
                  setIsCreateInvoiceOpen(true);
                }}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ فاتورة جديدة (Nouvelle Facture)</span>
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-600 font-black border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3.5">N° Facture / رقم الفاتورة</th>
                    <th className="py-2.5 px-3.5">Client & Contact / الزبون والهاتف</th>
                    <th className="py-2.5 px-3.5">Ville / المدينة</th>
                    <th className="py-2.5 px-3.5">Article & Qté / المنتج والكمية</th>
                    <th className="py-2.5 px-3.5">Total TTC / المجموع</th>
                    <th className="py-2.5 px-3.5">Date / التاريخ</th>
                    <th className="py-2.5 px-3.5">Statut / الحالة</th>
                    <th className="py-2.5 px-3.5 text-center">Action / المعاينة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3.5 font-mono font-bold text-blue-700">{inv.id}</td>
                      <td className="py-2.5 px-3.5">
                        <span className="font-bold block text-slate-900">{inv.customerName}</span>
                        <span className="text-[10px] text-slate-400 font-mono" dir="ltr">{inv.customerPhone}</span>
                      </td>
                      <td className="py-2.5 px-3.5">{inv.customerCity}</td>
                      <td className="py-2.5 px-3.5">
                        <span className="font-bold">{inv.productTitle}</span>
                        <span className="text-[10px] text-slate-500 block">Qté: {inv.quantity}</span>
                      </td>
                      <td className="py-2.5 px-3.5 font-black text-emerald-700">{inv.totalAmount} DH</td>
                      <td className="py-2.5 px-3.5 font-mono text-[11px] text-slate-500">{inv.date}</td>
                      <td className="py-2.5 px-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            inv.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inv.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {inv.status === 'paid' ? 'Payée (مؤداة)' : inv.status === 'pending' ? 'En cours (قيد التوصيل)' : 'Retournée (ملغاة)'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 text-center">
                        <button
                          onClick={() => setSelectedInvoiceForModal(inv)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          معاينة الفاتورة
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          INVOICE PREVIEW MODAL
         ======================================================== */}
      {selectedInvoiceForModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-in zoom-in-95 text-slate-900">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-black">فاتورة تجارية (Facture de Vente)</h3>
                <span className="text-xs text-slate-400 font-mono">{selectedInvoiceForModal.id}</span>
              </div>
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">Vendeur / البائع:</span>
                  <span className="font-bold text-slate-900 block">{selectedInvoiceForModal.sellerName}</span>
                  <span className="text-slate-500 font-mono block">ICE: {selectedInvoiceForModal.iceNumber || '003291823000045'}</span>
                </div>
                <div className="text-left">
                  <span className="text-slate-400 block">Client / الزبون:</span>
                  <span className="font-bold text-slate-900 block">{selectedInvoiceForModal.customerName}</span>
                  <span className="text-slate-500 block">{selectedInvoiceForModal.customerCity}</span>
                  <span className="font-mono text-slate-500 block" dir="ltr">{selectedInvoiceForModal.customerPhone}</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-right">
                  <thead className="bg-slate-100 text-slate-600 font-bold">
                    <tr>
                      <th className="p-2.5">Article / المنتج</th>
                      <th className="p-2.5">Qté / الكمية</th>
                      <th className="p-2.5">Prix Unitaire / السعر</th>
                      <th className="p-2.5">Total TTC / المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2.5 font-bold">{selectedInvoiceForModal.productTitle}</td>
                      <td className="p-2.5">{selectedInvoiceForModal.quantity}</td>
                      <td className="p-2.5">{selectedInvoiceForModal.unitPrice} DH</td>
                      <td className="p-2.5 font-black text-emerald-700">{selectedInvoiceForModal.totalAmount} DH</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-bold text-slate-600">المبلغ الإجمالي المستخلص عند التسليم (Total Payé):</span>
                <span className="text-xl font-black text-emerald-700">{selectedInvoiceForModal.totalAmount} DH</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  try {
                    window.print();
                  } catch (e) {
                    console.warn('Printing not available in iframe', e);
                  }
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer (طباعة الفاتورة)</span>
              </button>
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-colors cursor-pointer"
              >
                Fermer (إغلاق)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CREATE NEW INVOICE MODAL
         ======================================================== */}
      {isCreateInvoiceOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-black text-slate-900">إصدار فاتورة جديدة للزبون (Créer Facture)</h3>
              <button
                onClick={() => setIsCreateInvoiceOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {invoiceFormError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{invoiceFormError}</span>
              </div>
            )}

            <form onSubmit={handleCreateNewInvoice} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم الزبون الكامل (Nom Client) *</label>
                <input
                  type="text"
                  required
                  value={newInvCustomer}
                  onChange={(e) => setNewInvCustomer(e.target.value)}
                  placeholder="مثال: يوسف المنصوري"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">رقم الهاتف (Téléphone) *</label>
                <input
                  type="tel"
                  required
                  value={newInvPhone}
                  onChange={(e) => setNewInvPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">المدينة (Ville) *</label>
                <select
                  value={newInvCity}
                  onChange={(e) => setNewInvCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">الكمية (Quantité)</label>
                  <input
                    type="number"
                    min={1}
                    value={newInvQty}
                    onChange={(e) => setNewInvQty(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">السعر (Prix DH)</label>
                  <input
                    type="number"
                    min={10}
                    value={newInvPrice}
                    onChange={(e) => setNewInvPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsCreateInvoiceOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  Annuler (إلغاء)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Enregistrer (حفظ وإصدار)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
