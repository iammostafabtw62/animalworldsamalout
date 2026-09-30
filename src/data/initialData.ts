import {
  BusinessSettings,
  Category,
  Product,
  VeterinaryService,
  Banner,
  Article,
  Review,
  Order,
  Appointment,
  Customer,
  StaffUser,
  ActivityLog
} from '../types';

export const initialSettings: BusinessSettings = {
  brandNameAr: 'عالم الحيوان',
  brandNameEn: 'Animal World',
  taglineAr: 'كل ما يحتاجه حيوانك الأليف... في مكان واحد',
  taglineEn: 'Everything Your Pet Needs, All in One Place.',
  addressAr: 'شارع الصفصافية أمام صيدلة رنا ومطعم شط اسكندرية، سمالوط، المنيا',
  addressEn: 'Al-Safsafiya St., in front of Rana Pharmacy & Shatt Alexandria Restaurant, Samalout, Minya',
  phone: '01227339226',
  whatsapp: '01227339226',
  email: 'info@animalworld-eg.com',
  workingHoursAr: 'يوميًا: 10:00 صباحًا - 11:00 مساءً (الجمعة: 2:00 ظهرًا - 11:00 مساءً)',
  workingHoursEn: 'Daily: 10:00 AM - 11:00 PM (Friday: 2:00 PM - 11:00 PM)',
  googleMapsUrl: 'https://maps.google.com/?q=Samalout,Minya,Egypt',
  facebookUrl: 'https://facebook.com/animalworld.samalout',
  instagramUrl: 'https://instagram.com/animalworld.samalout',
  tiktokUrl: 'https://tiktok.com/@animalworld.samalout',
  whatsappMsgAr: 'مرحبًا عالم الحيوان، أريد الاستفسار عن منتج أو خدمة بيطرية.',
  whatsappMsgEn: 'Hello Animal World, I would like to inquire about a product or veterinary service.',
  currencyAr: 'ج.م',
  currencyEn: 'EGP',
  taxRate: 0,
  deliveryFee: 25,
  freeDeliveryThreshold: 450,
  heroImage: '/src/assets/images/animal_world_hero_mascots_1790355276966.jpg',
  logoImage: '/src/assets/images/animal_world_official_logo_1790356370391.jpg',
  iconImage: '/src/assets/images/animal_world_icon_emblem_1790356382456.jpg',
  dogMascotImage: '/src/assets/images/golden_dog_mascot_1790355291456.jpg',
  catMascotImage: '/src/assets/images/cat_vet_mascot_1790355304811.jpg',
  emptyStateImage: '/src/assets/images/empty_state_mascots_1790355319229.jpg'
};

export const initialCategories: Category[] = [
  {
    id: 'cat-dog-food',
    slug: 'dog-food',
    nameAr: 'طعام الكلاب',
    nameEn: 'Dog Food',
    descriptionAr: 'أفضل الأطعمة الجافة والرطبة المخصصة لجميع سلالات الكلاب',
    descriptionEn: 'Premium dry and wet food for all dog breeds and ages',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'cat-cat-food',
    slug: 'cat-food',
    nameAr: 'طعام القطط',
    nameEn: 'Cat Food',
    descriptionAr: 'تغذية متوازنة ولذيذة تلبي جميع احتياجات قطتك الصحية',
    descriptionEn: 'Balanced, delicious nutrition tailored to your cat health',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'cat-treats',
    slug: 'treats',
    nameAr: 'مكافآت وسناكس',
    nameEn: 'Treats & Snacks',
    descriptionAr: 'مكافآت تدريب وسناكس شهية وصحية للكلاب والقطط',
    descriptionEn: 'Healthy reward snacks and training treats for pets',
    image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'cat-supplements',
    slug: 'supplements',
    nameAr: 'فيتامينات ومكملات',
    nameEn: 'Vitamins & Supplements',
    descriptionAr: 'مكملات غذائية لتقوية المناعة، صحة المفاصل والشعر',
    descriptionEn: 'Supplements for immunity, joint support, and coat vitality',
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'cat-flea-tick',
    slug: 'flea-tick',
    nameAr: 'مكافحة الحشرات والبراغيث',
    nameEn: 'Flea & Tick Care',
    descriptionAr: 'أمبولات، أطواق وبخاخات بيطرية أصلية للحماية من الطفيليات',
    descriptionEn: 'Spot-on pipettes, collars, and sprays for parasite protection',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'cat-grooming',
    slug: 'grooming',
    nameAr: 'العناية والنظافة',
    nameEn: 'Grooming & Hygiene',
    descriptionAr: 'شامبوهات طبية، فرش، مقصات أظافر ومعطرات آمنة',
    descriptionEn: 'Medicated shampoos, grooming brushes, and gentle deodorizers',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'cat-dental-care',
    slug: 'dental-care',
    nameAr: 'صحة الأسنان والفم',
    nameEn: 'Dental Care',
    descriptionAr: 'معجون وجل أسنان بيطري وفرش مخصصة لمنع تراكم الجير',
    descriptionEn: 'Veterinary dental gels, toothbrushes, and plaque defense',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-accessories',
    slug: 'accessories',
    nameAr: 'إكسسوارات ومستلزمات',
    nameEn: 'Accessories & Supplies',
    descriptionAr: 'أطواق، سلاسل، صحون طعام، ليتر بوكس وأسرة مريحة',
    descriptionEn: 'Collars, leashes, feeding bowls, litter boxes, and beds',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-toys',
    slug: 'toys',
    nameAr: 'ألعاب ترفيهية وتدريب',
    nameEn: 'Toys & Play',
    descriptionAr: 'ألعاب محفزة للذكاء وتفريغ طاقة حيوانك الأليف بأمان',
    descriptionEn: 'Interactive, durable toys for physical exercise and stimulation',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop&q=80'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-101',
    sku: 'AW-ROYAL-CAT-01',
    nameAr: 'رويال كانين إندور - طعام جاف للقطط المنزلية 2 كجم',
    nameEn: 'Royal Canin Indoor 27 Adult Cat Dry Food 2kg',
    descriptionAr: 'طعام متكامل ومتوازن خصيصًا للقطط البالغة المقيمة داخل المنزل من عمر 1 إلى 7 سنوات، يساعد على تقليل رائحة الفضلات والتحكم في كرات الشعر.',
    descriptionEn: 'Complete and balanced nutrition for adult indoor cats aged 1-7 years. Supports digestion, controls hairballs, and reduces stool odor.',
    category: 'cat-food',
    petType: 'cat',
    brand: 'Royal Canin',
    price: 680,
    salePrice: 620,
    discountPercentage: 9,
    stock: 24,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isBestSeller: true,
    isVetsPick: true,
    published: true,
    rating: 4.9,
    reviewCount: 38,
    weight: '2.0 kg',
    ingredientsAr: 'بروتين دواجن مجفف، أرز، قمح، ذرة، دهون حيوانية، ألياف نباتية، معادن وفيتامينات أساسية.',
    ingredientsEn: 'Dehydrated poultry protein, rice, wheat, corn, animal fats, vegetable fibres, minerals, essential vitamins.',
    benefitsAr: 'تقليل رائحة الفضلات، الحفاظ على الوزن المثالي، وقاية المسالك البولية.',
    benefitsEn: 'Stool odor reduction, ideal weight maintenance, urinary health support.',
    usageAr: 'يُقدم يوميًا حسب جدول الوزن المدون على العبوة مع توفير ماء شرب نظيف.',
    usageEn: 'Feed daily according to weight chart on bag. Ensure fresh drinking water.',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'prod-102',
    sku: 'AW-JOSERA-DOG-02',
    nameAr: 'جوسيرا فيستيفال - طعام ممتاز للكلاب البالغة 4 كجم',
    nameEn: 'Josera Festival Adult Dog Food with Salmon Sauce 4kg',
    descriptionAr: 'قرمشات لذيذة مغطاة بصوص السالمون الفاخر عند إضافة الماء، توفر طاقة متوازنة وتدعم صحة العظام والجلد لجميع سلالات الكلاب.',
    descriptionEn: 'Crispy kibbles coated with gourmet salmon powder, turning into delicious sauce when mixed with warm water. Supports bones and coat.',
    category: 'dog-food',
    petType: 'dog',
    brand: 'Josera',
    price: 890,
    salePrice: 830,
    discountPercentage: 7,
    stock: 18,
    lowStockThreshold: 4,
    images: [
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isBestSeller: true,
    isVetsPick: true,
    published: true,
    rating: 4.8,
    reviewCount: 29,
    weight: '4.0 kg',
    benefitsAr: 'غني بأوميجا 3 وأوميجا 6، يحفز الشهية، مناسب للكلاب الانتقائية.',
    benefitsEn: 'Rich in Omega-3 and Omega-6, boosts appetite, ideal for picky eaters.',
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-09-22T14:30:00Z'
  },
  {
    id: 'prod-103',
    sku: 'AW-BROADLINE-CAT-03',
    nameAr: 'برودلاين - أمبول حماية شاملة للقطط (طفيليات وبراغيث وديدان)',
    nameEn: 'Broadline All-in-One Spot-on for Cats',
    descriptionAr: 'علاج بيطري شامل وفعال بجرعة موضعية واحدة يحمي من البراغيث، القراد، العث، وجميع أنواع الديدان المعوية والرئوية.',
    descriptionEn: 'Comprehensive veterinary spot-on treatment protecting against fleas, ticks, mites, and intestinal & tapeworms in a single applicator.',
    category: 'flea-tick',
    petType: 'cat',
    brand: 'Boehringer Ingelheim',
    price: 420,
    salePrice: 395,
    discountPercentage: 6,
    stock: 35,
    lowStockThreshold: 8,
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isVetsPick: true,
    published: true,
    rating: 5.0,
    reviewCount: 42,
    benefitsAr: 'حماية شهرية كاملة وسهولة فائقة في الاستخدام بدون إجهاد للقط.',
    benefitsEn: 'One-month complete defense with ergonomic zero-stress applicator.',
    usageAr: 'يُفرغ كامل محتوى الأمبول مباشرة على جلد الرقبة خلف الرأس شهريًا.',
    usageEn: 'Apply full contents directly onto skin at base of neck monthly.',
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-09-18T16:00:00Z'
  },
  {
    id: 'prod-104',
    sku: 'AW-GIMCAT-PASTE-04',
    nameAr: 'جيم كات مالت سوفت إكسترا - معجون التخلص من كرات الشعر 100 جم',
    nameEn: 'GimCat Malt-Soft Extra Anti-Hairball Paste 100g',
    descriptionAr: 'معجون ألماني غني بخلاصة الشعير والزيوت النقية يساعد على خروج كرات الشعر المبتلعة بشكل طبيعي دون قيء أو اضطرابات هضمية.',
    descriptionEn: 'Premium German malt extract and dietary fibers aiding natural expulsion of swallowed hairballs, preventing digestive blockages.',
    category: 'supplements',
    petType: 'cat',
    brand: 'GimCat',
    price: 340,
    salePrice: 310,
    discountPercentage: 9,
    stock: 22,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isBestSeller: true,
    published: true,
    rating: 4.9,
    reviewCount: 31,
    weight: '100g',
    createdAt: '2026-02-10T11:00:00Z',
    updatedAt: '2026-09-15T11:00:00Z'
  },
  {
    id: 'prod-105',
    sku: 'AW-NUTRI-OMEGA-05',
    nameAr: 'زيت السالمون النرويجي الطبيعي أوميجا 3 للكلاب والقطط 250 مل',
    nameEn: 'Pure Norwegian Salmon Oil Omega-3 for Dogs & Cats 250ml',
    descriptionAr: 'زيت سالمون طبيعي 100% مستخلص على البارد، يمنح الفراء لمعانًا فائقًا، ويوقف تساقط الشعر ويدعم صحة القلب والمفاصل.',
    descriptionEn: '100% pure cold-pressed Norwegian wild salmon oil for healthy skin, glossy coat, reduced shedding, and joint flexibility.',
    category: 'supplements',
    petType: 'all',
    brand: 'NutriCare',
    price: 380,
    salePrice: 340,
    discountPercentage: 11,
    stock: 19,
    lowStockThreshold: 4,
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: false,
    isVetsPick: true,
    published: true,
    rating: 4.8,
    reviewCount: 19,
    weight: '250ml',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-09-12T10:00:00Z'
  },
  {
    id: 'prod-106',
    sku: 'AW-OROZYME-DENTAL-06',
    nameAr: 'أوروزايم جل إنزيمي بيطري لتنظيف وحماية الأسنان 70 جم',
    nameEn: 'Orozyme Veterinary Enzymatic Dental Gel 70g',
    descriptionAr: 'جل بيطري يحتوي على تركيبة إنزيمية فعالة تذيب طبقة البلاك وتمنع تكوّن الجير مع إنعاش رائحة الفم بدون الحاجة للفرشاة الإجبارية.',
    descriptionEn: 'Veterinary enzyme-based dental gel that breaks down dental plaque, inhibits tartar formation, and freshens pet breath.',
    category: 'dental-care',
    petType: 'all',
    brand: 'Orozyme',
    price: 310,
    stock: 15,
    lowStockThreshold: 3,
    images: [
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: false,
    isVetsPick: true,
    published: true,
    rating: 4.9,
    reviewCount: 16,
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-09-05T10:00:00Z'
  },
  {
    id: 'prod-107',
    sku: 'AW-WANPY-DUCK-07',
    nameAr: 'وانبي شرائح لحم البط المجفف للكلاب والقطط 100 جم',
    nameEn: 'Wanpy Oven-Baked Duck Jerky Strips 100g',
    descriptionAr: 'مكافآت طبيعية غنية بالبروتين الصافي وقليلة الدهون، خالية من المواد الحافظة الصناعية وسهلة الهضم.',
    descriptionEn: 'All-natural pure duck breast jerky snacks, rich in premium protein and low in fat. No artificial additives.',
    category: 'treats',
    petType: 'all',
    brand: 'Wanpy',
    price: 140,
    salePrice: 120,
    discountPercentage: 14,
    stock: 40,
    lowStockThreshold: 10,
    images: [
      'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=800&auto=format&fit=crop&q=80'
    ],
    isBestSeller: true,
    published: true,
    rating: 4.7,
    reviewCount: 22,
    createdAt: '2026-04-01T10:00:00Z',
    updatedAt: '2026-09-24T10:00:00Z'
  },
  {
    id: 'prod-108',
    sku: 'AW-VET-CHAMP-SHAMP-08',
    nameAr: 'شامبو طبي بخلاصة شجرة الشاي والصبار للكلاب والقطط 500 مل',
    nameEn: 'Medicated Tea Tree & Aloe Vera Soothing Pet Shampoo 500ml',
    descriptionAr: 'شامبو طبي مطهر يهدئ الحكة والالتهابات الجلدية ويزيل الروائح الكريهة ويترك الفراء ناعمًا ومنتعشًا.',
    descriptionEn: 'Veterinary antibacterial and anti-itch shampoo with tea tree oil and organic aloe vera. Restores coat moisture and calms irritation.',
    category: 'grooming',
    petType: 'all',
    brand: 'DermaPet',
    price: 260,
    stock: 25,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80'
    ],
    published: true,
    rating: 4.8,
    reviewCount: 14,
    createdAt: '2026-04-10T10:00:00Z',
    updatedAt: '2026-09-10T10:00:00Z'
  }
];

export const initialServices: VeterinaryService[] = [
  {
    id: 'srv-checkup',
    slug: 'general-checkup',
    nameAr: 'كشف وفحص بيطري شامل',
    nameEn: 'Comprehensive Veterinary Checkup',
    descriptionAr: 'فحص سريري كامل لعلامات الحيوان الحيوية، فحص الأذن والعيون والأسنان والقلب والرئتين مع تقييم عام للحالة الصحية والوزن.',
    descriptionEn: 'Full clinical physical examination assessing vital signs, ears, eyes, dental condition, heart, lungs, and nutritional state.',
    durationMinutes: 30,
    price: 150,
    available: true,
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&auto=format&fit=crop&q=80',
    iconName: 'Stethoscope',
    benefitsAr: ['اكتشاف مبكر للأمراض', 'خطة غذائية مخصصة', 'إرشادات رعاية وقائية'],
    benefitsEn: ['Early illness detection', 'Custom nutrition advice', 'Preventive care protocol']
  },
  {
    id: 'srv-vaccines',
    slug: 'vaccinations',
    nameAr: 'تطعيمات ولقاحات وقائية',
    nameEn: 'Vaccinations & Immunizations',
    descriptionAr: 'برامج التطعيم الأساسية والدورية للكلاب والقطط (الثماني، السعار، الرباعي، والديدان) بشهادة بيطرية رسمية معتمدة.',
    descriptionEn: 'Core and non-core vaccination protocols for dogs and cats with official veterinary vaccination book stamping.',
    durationMinutes: 20,
    price: 250,
    available: true,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop&q=80',
    iconName: 'Syringe',
    benefitsAr: ['لقاحات بيطرية أصلية ومحفوظة بالتبريد', 'جرعات وقاية من الديدان', 'تذكير دوري بمواعيد الجرعات'],
    benefitsEn: ['Cold-chain certified authentic vaccines', 'Deworming doses included', 'Timely booster alerts']
  },
  {
    id: 'srv-dental',
    slug: 'dental-care',
    nameAr: 'تنظيف الأسنان وإزالة الجير بالموجات فوق الصوتية',
    nameEn: 'Veterinary Ultrasonic Dental Scaling',
    descriptionAr: 'تنظيف جير الأسنان وإزالة التكلسات بتقنية الموجات فوق الصوتية مع تلميع الأسنان وعلاج التهابات اللثة وانبعاث الرائحة.',
    descriptionEn: 'Professional ultrasonic tartar removal, polishing, and gingivitis treatment under safe veterinary monitoring.',
    durationMinutes: 45,
    price: 350,
    available: true,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    iconName: 'Sparkles',
    benefitsAr: ['حماية الأسنان من التساقط', 'إزالة الرائحة الكريهة نهائيًا', 'تلميع المينا'],
    benefitsEn: ['Prevents tooth loss', 'Eliminates halitosis', 'Safe enamel polishing']
  },
  {
    id: 'srv-surgery',
    slug: 'surgery',
    nameAr: 'جراحة بيطرية وعمليات التعقيم',
    nameEn: 'Veterinary Surgery & Spay/Neuter',
    descriptionAr: 'غرفة عمليات مجهزة بالكامل لأحدث جراحات الأنسجة الرخوة، عمليات التعقيم والإخصاء، وخياطة الجروح مع تخدير آمن ومراقبة مستمرة.',
    descriptionEn: 'Fully equipped surgical theater for routine neutering/spaying, soft tissue procedures, and wound repairs with modern anesthesia.',
    durationMinutes: 60,
    price: 600,
    available: true,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=80',
    iconName: 'Activity',
    benefitsAr: ['تخدير آمن تحت الملاحظة', 'بروتوكول تسكين متطور', 'متابعة ما بعد العملية مجانًا'],
    benefitsEn: ['Safe monitored anesthesia', 'Advanced pain protocol', 'Free post-op follow-up']
  },
  {
    id: 'srv-lab',
    slug: 'laboratory-diagnostics',
    nameAr: 'تحاليل مخبرية وفحوصات سريعة',
    nameEn: 'Laboratory Testing & Fast Diagnostics',
    descriptionAr: 'اختبارات دم سريعة، كشف فيروس البارفو، فحص براز ومسحات ميكروسكوبية للفطريات والطفيليات لنتائج فورية دقيقة.',
    descriptionEn: 'In-house diagnostic tests including CBC, viral test kits (Parvo/Panleukopenia), microscopic skin scrapings and fecal exams.',
    durationMinutes: 30,
    price: 200,
    available: true,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    iconName: 'Microscope',
    benefitsAr: ['نتائج في نفس الزيارة', 'دقة تشخيصية عالية', 'تحديد سريع للعلاج المناسب'],
    benefitsEn: ['Same-day accurate results', 'High precision diagnostics', 'Rapid targeted therapy']
  },
  {
    id: 'srv-grooming',
    slug: 'grooming-hygiene',
    nameAr: 'قص شعر وعناية تجميلية متكاملة',
    nameEn: 'Professional Grooming & Styling',
    descriptionAr: 'قص واستشوار احترافي، تقليم أظافر، تنظيف أذن وغسيل بشامبو مرطب مخصص حسب نوع الفراء بدون تخدير.',
    descriptionEn: 'Gentle coat styling, warm bathing with skin-specific shampoos, nail trimming, and ear cleaning in a stress-free setting.',
    durationMinutes: 45,
    price: 220,
    available: true,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=80',
    iconName: 'Scissors',
    benefitsAr: ['فريق لطيف ومدرب', 'أدوات معقمة بالكامل', 'عطور بيطرية لطيفة تدوم طويلاً'],
    benefitsEn: ['Caring trained groomers', 'Sterilized equipment', 'Long-lasting safe pet fragrance']
  },
  {
    id: 'srv-nutrition',
    slug: 'nutrition-consultation',
    nameAr: 'استشارات تغذية وحميات علاجية',
    nameEn: 'Nutrition Consultation & Medical Diets',
    descriptionAr: 'تخطيط غذائي مخصص للحيوانات التي تعاني من حساسية الطعام، السمنة، أمراض الكلى، أو السكري مع متابعة دورية للوزن.',
    descriptionEn: 'Tailored dietary plans for pet allergies, obesity, renal support, and diabetes with structured weight tracking.',
    durationMinutes: 30,
    price: 120,
    available: true,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80',
    iconName: 'Apple',
    benefitsAr: ['جدول وجبات دقيق', 'تقييم الحساسية الغذائية', 'متابعة مجانية للوزن'],
    benefitsEn: ['Precise feeding schedule', 'Food allergy assessment', 'Complimentary weight checks']
  }
];

export const initialBanners: Banner[] = [
  {
    id: 'banner-01',
    titleAr: 'عالم الحيوان في سمالوط، المنيا',
    titleEn: 'Animal World in Samalout, Minya',
    subtitleAr: 'الوجهة الأولى للرعاية البيطرية ومستلزمات أليفك',
    subtitleEn: 'Premier Destination for Vet Care & Pet Supplies',
    descriptionAr: 'منتجات مختارة بعناية، رعاية بيطرية متخصصة، وكل ما يحتاجه حيوانك الأليف ليعيش حياة صحية وسعيدة.',
    descriptionEn: 'Carefully curated products, specialized veterinary care, and everything your companion needs for a happy, healthy life.',
    imageUrl: '/src/assets/images/animal_world_hero_mascots_1790355276966.jpg',
    ctaTextAr: 'تسوق الآن',
    ctaTextEn: 'Shop Now',
    ctaLink: '#shop',
    isActive: true,
    order: 1
  }
];

export const initialArticles: Article[] = [
  {
    id: 'art-01',
    slug: 'pet-summer-care-egypt',
    titleAr: 'كيف تحمي حيوانك الأليف من درجات الحرارة المرتفعة في صعيد مصر؟',
    titleEn: 'How to Protect Your Pet from High Summer Temperatures in Upper Egypt',
    summaryAr: 'نصائح بيطرية هامة للوقاية من ضربات الشمس والجفاف وتوفير بيئة رطبة ومريحة لقطتك أو كلبك.',
    summaryEn: 'Crucial veterinary tips to prevent heatstroke, maintain hydration, and provide a cool environment for your pet.',
    contentAr: 'مع ارتفاع درجات الحرارة خلال فصل الصيف في محافظة المنيا، تصبح الحيوانات الأليفة معرضة بشكل كبير لخطر ضربة الشمس والجفاف. احرص دائمًا على توفير مياه شرب باردة ومتجددة، وتجنب تمشية الكلاب في ساعات الذروة بين 11 صباحًا و4 عصرًا. إذا لاحظت لهاثًا شديدًا أو خمولًا مفاجئًا، تواصل فورًا مع عيادة عالم الحيوان في سمالوط للحصول على رعاية طبية عاجلة.',
    contentEn: 'As temperatures climb during Upper Egypt summers, pets face severe risks of heat exhaustion and dehydration. Always maintain fresh, cool drinking water and avoid asphalt dog walks between 11 AM and 4 PM. If you notice excessive panting or sudden lethargy, contact Animal World Clinic in Samalout immediately.',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80',
    authorAr: 'د. فريق عيادة عالم الحيوان',
    authorEn: 'Dr. Animal World Clinic Team',
    categoryAr: 'نصائح بيطرية',
    categoryEn: 'Veterinary Advice',
    published: true,
    publishedAt: '2026-06-15T10:00:00Z',
    readTimeMinutes: 4
  },
  {
    id: 'art-02',
    slug: 'essential-kitten-vaccinations',
    titleAr: 'دليل التطعيمات الأساسية للقطط والكلاب الصغيرة في أول 6 أشهر',
    titleEn: 'Essential Vaccination Guide for Puppies & Kittens in First 6 Months',
    summaryAr: 'كل ما تحتاج معرفته عن جدول التطعيمات الرباعية والثمانية والسعار للحفاظ على حياة أليفك.',
    summaryEn: 'Everything you need to know regarding core vaccine schedules to safeguard your young companion against deadly viruses.',
    contentAr: 'تعتبر الأشهر الأولى من حياة الجرو أو القطة هي الفترة الأكثر حساسية لمناعتهم. تبدأ التطعيمات عادة من عمر 6 إلى 8 أسابيع ضد فيروسات مثل البارفو والبانليوكوبينيا. الالتزام بجدول التطعيمات يمنح حيوانك الأليف مناعة صلبة تحميه مدى الحياة.',
    contentEn: 'The initial months of a puppy or kitten life are critical for their developing immune system. Vaccinations begin at 6 to 8 weeks against Parvovirus and Panleukopenia. Adhering to the booster timetable ensures lifetime protection.',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop&q=80',
    authorAr: 'د. فريق عيادة عالم الحيوان',
    authorEn: 'Dr. Animal World Clinic Team',
    categoryAr: 'صحة ووقاية',
    categoryEn: 'Health & Prevention',
    published: true,
    publishedAt: '2026-07-20T10:00:00Z',
    readTimeMinutes: 5
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-01',
    customerName: 'أحمد محمود',
    customerCity: 'سمالوط',
    rating: 5,
    commentAr: 'أفضل مكان لمستلزمات القطط في سمالوط! المنتجات أصلية والعيادة نظيفة جدًا والدكاترة محترمين ومتعاونين للغاية.',
    commentEn: 'Best place for pet supplies in Samalout! Authentic products, spotless clinic, and truly caring veterinarians.',
    approved: true,
    isPublic: true,
    createdAt: '2026-08-14T12:00:00Z'
  },
  {
    id: 'rev-02',
    customerName: 'سارة عبد الرحمن',
    customerCity: 'المنيا',
    rating: 5,
    commentAr: 'عملت تعقيم لقطتي عندهم وكانت التجربة ممتازة والمتابعة بعد العملية محترمة جدا. شكرا لفريق عالم الحيوان!',
    commentEn: 'Had my cat spayed here. Flawless procedure and very attentive post-op follow-up. Thank you Animal World team!',
    approved: true,
    isPublic: true,
    createdAt: '2026-08-28T15:30:00Z'
  },
  {
    id: 'rev-03',
    customerName: 'مينا سمير',
    customerCity: 'سمالوط',
    rating: 5,
    commentAr: 'أسعار ممتازة وتوصيل سريع للطلبات في سمالوط، ودائما بيوفروا الأكل المستورد الأصلي لجروي.',
    commentEn: 'Great prices and prompt delivery in Samalout. They always have the authentic imported food for my pup.',
    approved: true,
    isPublic: true,
    createdAt: '2026-09-05T09:20:00Z'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AW-2026-1001',
    customer: {
      name: 'محمود عادل',
      phone: '01012345678',
      email: 'mahmoud@example.com',
      city: 'سمالوط',
      area: 'الشارع الجديد',
      address: 'عمارة النور الدور الثالث',
      notes: 'برجاء الاتصال قبل التوصيل'
    },
    items: [
      {
        productId: 'prod-101',
        productNameAr: 'رويال كانين إندور - طعام جاف للقطط المنزلية 2 كجم',
        productNameEn: 'Royal Canin Indoor 27 Adult Cat Dry Food 2kg',
        productSku: 'AW-ROYAL-CAT-01',
        quantity: 1,
        unitPrice: 620,
        totalPrice: 620
      },
      {
        productId: 'prod-104',
        productNameAr: 'جيم كات مالت سوفت إكسترا 100 جم',
        productNameEn: 'GimCat Malt-Soft Extra Anti-Hairball Paste 100g',
        productSku: 'AW-GIMCAT-PASTE-04',
        quantity: 1,
        unitPrice: 310,
        totalPrice: 310
      }
    ],
    subtotal: 930,
    discount: 0,
    deliveryFee: 0,
    total: 930,
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    handledByStaff: 'Admin',
    isArchived: false,
    createdAt: '2026-09-21T11:20:00Z',
    updatedAt: '2026-09-21T16:00:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'AW-2026-1002',
    customer: {
      name: 'نورهان سعيد',
      phone: '01123456789',
      email: 'nourhan@example.com',
      city: 'سمالوط',
      area: 'شارع داير الناحية',
      address: 'بجوار صيدلية الدكتور مجدي'
    },
    items: [
      {
        productId: 'prod-103',
        productNameAr: 'برودلاين - أمبول حماية شاملة للقطط',
        productNameEn: 'Broadline All-in-One Spot-on for Cats',
        productSku: 'AW-BROADLINE-CAT-03',
        quantity: 2,
        unitPrice: 395,
        totalPrice: 790
      }
    ],
    subtotal: 790,
    discount: 0,
    deliveryFee: 25,
    total: 815,
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    handledByStaff: 'Admin',
    isArchived: false,
    createdAt: '2026-09-24T14:10:00Z',
    updatedAt: '2026-09-24T14:30:00Z'
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-201',
    appointmentNumber: 'VET-2026-201',
    serviceId: 'srv-checkup',
    serviceNameAr: 'كشف وفحص بيطري شامل',
    serviceNameEn: 'Comprehensive Veterinary Checkup',
    customerName: 'كريم حسام',
    customerPhone: '01298765432',
    customerEmail: 'karim@example.com',
    petName: 'بوسي',
    petSpecies: 'cat',
    petAge: 'سنة ونصف',
    preferredDate: '2026-09-26',
    preferredTimeSlot: '05:00 م - 05:30 م',
    status: 'confirmed',
    adminNotes: 'فحص دوري ومتابعة الوزن',
    createdAt: '2026-09-23T10:00:00Z',
    updatedAt: '2026-09-23T11:00:00Z'
  },
  {
    id: 'apt-202',
    appointmentNumber: 'VET-2026-202',
    serviceId: 'srv-vaccines',
    serviceNameAr: 'تطعيمات ولقاحات وقائية',
    serviceNameEn: 'Vaccinations & Immunizations',
    customerName: 'فاطمة علي',
    customerPhone: '01511223344',
    petName: 'ماكس',
    petSpecies: 'dog',
    petAge: '4 شهور',
    preferredDate: '2026-09-27',
    preferredTimeSlot: '07:00 م - 07:30 م',
    status: 'pending',
    createdAt: '2026-09-25T08:30:00Z',
    updatedAt: '2026-09-25T08:30:00Z'
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-01',
    name: 'محمود عادل',
    phone: '01012345678',
    email: 'mahmoud@example.com',
    city: 'سمالوط',
    area: 'الشارع الجديد',
    address: 'عمارة النور الدور الثالث',
    createdAt: '2026-08-10T10:00:00Z',
    ordersCount: 3,
    totalSpent: 2150,
    lastOrderDate: '2026-09-21T11:20:00Z',
    pets: [
      {
        id: 'pet-01',
        customerId: 'cust-01',
        name: 'ميشو',
        species: 'cat',
        breed: 'شيرازي كلاسيك',
        gender: 'male',
        age: 'سنتان',
        weight: '4.2 kg'
      }
    ]
  },
  {
    id: 'cust-02',
    name: 'نورهان سعيد',
    phone: '01123456789',
    email: 'nourhan@example.com',
    city: 'سمالوط',
    area: 'شارع داير الناحية',
    address: 'بجوار صيدلية الدكتور مجدي',
    createdAt: '2026-09-01T14:00:00Z',
    ordersCount: 1,
    totalSpent: 815,
    lastOrderDate: '2026-09-24T14:10:00Z',
    pets: [
      {
        id: 'pet-02',
        customerId: 'cust-02',
        name: 'لوسي',
        species: 'cat',
        breed: 'هيمالايا شوكليت',
        gender: 'female',
        age: '8 شهور',
        weight: '2.5 kg'
      }
    ]
  }
];

export const initialStaff: StaffUser[] = [
  {
    id: 'staff-admin',
    username: 'Admin',
    name: 'مدير النظام (Super Admin)',
    role: 'super_admin',
    email: 'admin@animalworld-eg.com',
    phone: '01227339226',
    permissions: {
      canViewDashboard: true,
      canManageProducts: true,
      canManageOrders: true,
      canViewSalesArchive: true,
      canManageAppointments: true,
      canManageCustomers: true,
      canManageContent: true,
      canManageSettings: true,
      canManageTeam: true
    },
    lastLogin: '2026-09-25T09:40:00Z',
    active: true
  },
  {
    id: 'staff-vet-01',
    username: 'vet_samalout',
    name: 'د. مينا راضي (طبيب بيطري)',
    role: 'veterinarian',
    email: 'dr.mina@animalworld-eg.com',
    phone: '01227339226',
    permissions: {
      canViewDashboard: true,
      canManageProducts: false,
      canManageOrders: false,
      canViewSalesArchive: false,
      canManageAppointments: true,
      canManageCustomers: true,
      canManageContent: false,
      canManageSettings: false,
      canManageTeam: false
    },
    lastLogin: '2026-09-24T18:00:00Z',
    active: true
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'act-01',
    userId: 'staff-admin',
    userName: 'Admin',
    action: 'System Initialized',
    actionAr: 'تهيئة نظام عالم الحيوان',
    details: 'System configured with official address, phone 01227339226, and mascots',
    detailsAr: 'تم تحديث بيانات العيادة والمتجر وإضافة شعار وتمائم عالم الحيوان وسجلات المنتجات',
    timestamp: '2026-09-25T09:50:00Z'
  },
  {
    id: 'act-02',
    userId: 'staff-admin',
    userName: 'Admin',
    action: 'Order Status Updated',
    actionAr: 'تحديث حالة الطلب',
    details: 'Order AW-2026-1001 status set to delivered',
    detailsAr: 'تم تغيير حالة الطلب رقم AW-2026-1001 إلى تم التوصيل',
    timestamp: '2026-09-21T16:00:00Z',
    targetId: 'ord-1001',
    targetType: 'order'
  }
];
