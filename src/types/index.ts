export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export interface BusinessSettings {
  brandNameAr: string;
  brandNameEn: string;
  logoImage?: string;
  iconImage?: string;
  taglineAr: string;
  taglineEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  whatsapp: string;
  email: string;
  workingHoursAr: string;
  workingHoursEn: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  whatsappMsgAr: string;
  whatsappMsgEn: string;
  currencyAr: string;
  currencyEn: string;
  taxRate: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  heroImage: string;
  dogMascotImage: string;
  catMascotImage: string;
  emptyStateImage: string;
}

export interface Category {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  icon?: string;
  image?: string;
  itemCount?: number;
  featured?: boolean;
}

export interface ProductVariant {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  sku: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  petType: 'dog' | 'cat' | 'bird' | 'small_pet' | 'all';
  brand: string;
  price: number;
  salePrice?: number;
  discountPercentage?: number;
  stock: number;
  lowStockThreshold: number;
  images: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  isVetsPick?: boolean;
  published: boolean;
  rating: number;
  reviewCount: number;
  weight?: string;
  size?: string;
  variants?: ProductVariant[];
  ingredientsAr?: string;
  ingredientsEn?: string;
  benefitsAr?: string;
  benefitsEn?: string;
  usageAr?: string;
  usageEn?: string;
  specificationsAr?: string;
  specificationsEn?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  notes?: string;
  createdAt: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate?: string;
  pets?: PetProfile[];
}

export interface PetProfile {
  id: string;
  customerId?: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'small_pet' | 'other';
  breed: string;
  gender: 'male' | 'female';
  age: string;
  weight?: string;
  notes?: string;
  photoUrl?: string;
}

export type OrderStatus =
  | 'new'
  | 'confirmed'
  | 'processing'
  | 'ready'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'partially_paid'
  | 'refunded';

export interface OrderItem {
  productId: string;
  productNameAr: string;
  productNameEn: string;
  productSku: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variantName?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id?: string;
    name: string;
    phone: string;
    email: string;
    city: string;
    area: string;
    address: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'card' | 'instapay' | 'vodafone_cash';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes?: string;
  staffNotes?: string;
  handledByStaff?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VeterinaryService {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  durationMinutes: number;
  price?: number;
  available: boolean;
  image?: string;
  iconName?: string;
  benefitsAr?: string[];
  benefitsEn?: string[];
}

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'rescheduled';

export interface Appointment {
  id: string;
  appointmentNumber: string;
  serviceId: string;
  serviceNameAr: string;
  serviceNameEn: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  petName: string;
  petSpecies: 'dog' | 'cat' | 'bird' | 'small_pet' | 'other';
  petAge?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  status: AppointmentStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaTextAr?: string;
  ctaTextEn?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  order: number;
}

export interface Article {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  imageUrl: string;
  authorAr: string;
  authorEn: string;
  categoryAr: string;
  categoryEn: string;
  published: boolean;
  publishedAt: string;
  readTimeMinutes: number;
}

export interface Review {
  id: string;
  productId?: string;
  serviceId?: string;
  customerName: string;
  customerCity?: string;
  rating: number;
  commentAr: string;
  commentEn?: string;
  approved: boolean;
  isPublic: boolean;
  createdAt: string;
}

export type StaffRole =
  | 'super_admin'
  | 'store_manager'
  | 'veterinarian'
  | 'content_manager'
  | 'order_manager';

export interface StaffPermission {
  canViewDashboard: boolean;
  canManageProducts: boolean;
  canManageOrders: boolean;
  canViewSalesArchive: boolean;
  canManageAppointments: boolean;
  canManageCustomers: boolean;
  canManageContent: boolean;
  canManageSettings: boolean;
  canManageTeam: boolean;
}

export interface StaffUser {
  id: string;
  username: string;
  name: string;
  role: StaffRole;
  email?: string;
  phone?: string;
  permissions: StaffPermission;
  lastLogin?: string;
  active: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  actionAr: string;
  details: string;
  detailsAr: string;
  timestamp: string;
  targetId?: string;
  targetType?: string;
}
