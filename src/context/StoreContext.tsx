import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Theme,
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
  ActivityLog,
  CartItem,
  OrderStatus,
  PaymentStatus,
  AppointmentStatus
} from '../types';
import {
  initialSettings,
  initialCategories,
  initialProducts,
  initialServices,
  initialBanners,
  initialArticles,
  initialReviews,
  initialOrders,
  initialAppointments,
  initialCustomers,
  initialStaff,
  initialActivityLogs
} from '../data/initialData';

interface StoreContextType {
  // Localization & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (ar: string, en: string) => string;

  // Settings
  settings: BusinessSettings;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;

  // Catalog
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkSetProducts: (products: Product[]) => void;
  updateStock: (id: string, newStock: number) => void;

  categories: Category[];
  addCategory: (cat: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Services
  services: VeterinaryService[];
  addService: (srv: Omit<VeterinaryService, 'id'>) => VeterinaryService;
  updateService: (id: string, updates: Partial<VeterinaryService>) => void;
  deleteService: (id: string) => void;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, 'id' | 'appointmentNumber' | 'status' | 'createdAt' | 'updatedAt'>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, notes?: string) => void;
  deleteAppointment: (id: string) => void;

  // Orders & Sales Archive
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderStatus' | 'paymentStatus' | 'isArchived' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (id: string, status: OrderStatus, staffNotes?: string) => void;
  updatePaymentStatus: (id: string, status: PaymentStatus) => void;
  toggleArchiveOrder: (id: string) => void;

  // Customers & Pet Profiles
  customers: Customer[];
  addCustomerPet: (customerId: string, pet: any) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;

  // Reviews
  reviews: Review[];
  submitReview: (review: Omit<Review, 'id' | 'approved' | 'isPublic' | 'createdAt'>) => void;
  toggleReviewApproval: (id: string) => void;
  deleteReview: (id: string) => void;

  // Banners & Articles
  banners: Banner[];
  updateBanner: (id: string, updates: Partial<Banner>) => void;
  articles: Article[];
  addArticle: (art: Omit<Article, 'id' | 'publishedAt'>) => Article;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Team & Activity Logs
  staffList: StaffUser[];
  addStaff: (user: Omit<StaffUser, 'id'>) => StaffUser;
  updateStaff: (id: string, updates: Partial<StaffUser>) => void;
  activityLogs: ActivityLog[];
  logActivity: (actionAr: string, actionEn: string, detailsAr: string, detailsEn: string, targetId?: string, targetType?: string) => void;

  // Authentication (Admin / Staff)
  currentStaff: StaffUser | null;
  adminLogin: (username: string, pass: string) => { success: boolean; error?: string };
  adminLogout: () => void;

  // Shopping Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANGUAGE: 'aw_language',
  THEME: 'aw_theme',
  SETTINGS: 'aw_settings_v2',
  PRODUCTS: 'aw_products_v2',
  CATEGORIES: 'aw_categories_v2',
  SERVICES: 'aw_services_v2',
  APPOINTMENTS: 'aw_appointments_v2',
  ORDERS: 'aw_orders_v2',
  CUSTOMERS: 'aw_customers_v2',
  REVIEWS: 'aw_reviews_v2',
  BANNERS: 'aw_banners_v2',
  ARTICLES: 'aw_articles_v2',
  STAFF: 'aw_staff_v2',
  LOGS: 'aw_activity_logs_v2',
  CURRENT_STAFF: 'aw_current_staff_session',
  CART: 'aw_cart_items',
  WISHLIST: 'aw_wishlist_items'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return saved === 'en' ? 'en' : 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // 2. Theme state - Defaults to Light Mode unless user explicitly chose dark
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const applyThemeToDOM = (t: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
    applyThemeToDOM(nextTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Helper translator
  const t = (ar: string, en: string) => (language === 'ar' ? ar : en);

  // 3. Business Settings
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure clinic phone, address, and logo/mascot images are present
        return {
          ...initialSettings,
          ...parsed,
          logoImage: initialSettings.logoImage,
          iconImage: initialSettings.iconImage,
          phone: '01227339226',
          addressAr: 'شارع الصفصافية أمام صيدلة رنا ومطعم شط اسكندرية، سمالوط، المنيا'
        };
      } catch (e) {
        return initialSettings;
      }
    }
    return initialSettings;
  });

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    });
    logActivity('تحديث إعدادات المتجر', 'Updated Store Settings', 'تم حفظ تعديلات إعدادات الموقع', 'Site settings were updated');
  };

  // 4. Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  const saveProducts = (newList: Product[]) => {
    setProducts(newList);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newList));
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    logActivity('إضافة منتج جديد', 'Product Added', `تمت إضافة منتج: ${newProduct.nameAr}`, `Added product: ${newProduct.nameEn}`, newProduct.id, 'product');
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, ...updates, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    saveProducts(updated);
    logActivity('تعديل منتج', 'Product Updated', `تم تعديل بيانات المنتج ID: ${id}`, `Updated product ID: ${id}`, id, 'product');
  };

  const deleteProduct = (id: string) => {
    const item = products.find((p) => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    logActivity('حذف منتج', 'Product Deleted', `تم حذف المنتج: ${item?.nameAr || id}`, `Deleted product: ${item?.nameEn || id}`, id, 'product');
  };

  const bulkSetProducts = (newProducts: Product[]) => {
    saveProducts(newProducts);
    logActivity('تحديث مجمع للمنتجات', 'Bulk Products Updated', `تم تحديث قائمة المنتجات (${newProducts.length} منتج)`, `Bulk updated products (${newProducts.length} items)`);
  };

  const updateStock = (id: string, newStock: number) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, stock: Math.max(0, newStock), updatedAt: new Date().toISOString() } : p
    );
    saveProducts(updated);
  };

  // 5. Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialCategories;
      }
    }
    return initialCategories;
  });

  const saveCategories = (newList: Category[]) => {
    setCategories(newList);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(newList));
  };

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`
    };
    const updated = [...categories, newCat];
    saveCategories(updated);
    logActivity('إضافة تصنيف', 'Category Added', `تمت إضافة تصنيف: ${newCat.nameAr}`, `Added category: ${newCat.nameEn}`);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...updates } : c));
    saveCategories(updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    saveCategories(updated);
  };

  // 6. Veterinary Services (Delivery service explicitly excluded per prompt)
  const [services, setServices] = useState<VeterinaryService[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try {
        const parsed: VeterinaryService[] = JSON.parse(saved);
        // Exclude any delivery service if previously saved
        return parsed.filter((s) => !s.nameAr.includes('توصيل') && !s.nameEn.toLowerCase().includes('delivery'));
      } catch (e) {
        return initialServices;
      }
    }
    return initialServices;
  });

  const saveServices = (newList: VeterinaryService[]) => {
    setServices(newList);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(newList));
  };

  const addService = (srvData: Omit<VeterinaryService, 'id'>) => {
    const newSrv: VeterinaryService = {
      ...srvData,
      id: `srv-${Date.now()}`
    };
    const updated = [...services, newSrv];
    saveServices(updated);
    logActivity('إضافة خدمة بيطرية', 'Service Added', `تمت إضافة خدمة: ${newSrv.nameAr}`, `Added service: ${newSrv.nameEn}`);
    return newSrv;
  };

  const updateService = (id: string, updates: Partial<VeterinaryService>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveServices(updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    saveServices(updated);
  };

  // 7. Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialAppointments;
      }
    }
    return initialAppointments;
  });

  const saveAppointments = (newList: Appointment[]) => {
    setAppointments(newList);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(newList));
  };

  const bookAppointment = (
    aptData: Omit<Appointment, 'id' | 'appointmentNumber' | 'status' | 'createdAt' | 'updatedAt'>
  ) => {
    const count = appointments.length + 1;
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      appointmentNumber: `VET-2026-${count.toString().padStart(3, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newApt, ...appointments];
    saveAppointments(updated);
    logActivity('حجز موعد بيطري جديد', 'New Vet Appointment', `حجز موعد للمريض: ${newApt.petName} (${newApt.customerName})`, `Appointment booked for: ${newApt.petName}`, newApt.id, 'appointment');
    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus, notes?: string) => {
    const updated = appointments.map((a) =>
      a.id === id
        ? {
            ...a,
            status,
            adminNotes: notes !== undefined ? notes : a.adminNotes,
            updatedAt: new Date().toISOString()
          }
        : a
    );
    saveAppointments(updated);
    logActivity('تحديث حالة موعد بيطري', 'Appointment Status Updated', `تم تغيير حالة الموعد إلى: ${status}`, `Appointment status set to: ${status}`, id, 'appointment');
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter((a) => a.id !== id);
    saveAppointments(updated);
  };

  // 8. Orders & Sales Archive
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialOrders;
      }
    }
    return initialOrders;
  });

  const saveOrders = (newList: Order[]) => {
    setOrders(newList);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(newList));
  };

  const placeOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'orderStatus' | 'paymentStatus' | 'isArchived' | 'createdAt' | 'updatedAt'>
  ) => {
    const count = orders.length + 1001;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `AW-2026-${count}`,
      orderStatus: 'new',
      paymentStatus: 'pending',
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Decrement stock for ordered products
    setProducts((prev) => {
      const updatedProds = prev.map((prod) => {
        const item = orderData.items.find((i) => i.productId === prod.id);
        if (item) {
          const newStock = Math.max(0, prod.stock - item.quantity);
          return { ...prod, stock: newStock };
        }
        return prod;
      });
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updatedProds));
      return updatedProds;
    });

    const updated = [newOrder, ...orders];
    saveOrders(updated);
    logActivity('طلب شراء جديد', 'New Order Placed', `طلب جديد رقم: ${newOrder.orderNumber} بقيمة ${newOrder.total} ج.م`, `New order: ${newOrder.orderNumber} (${newOrder.total} EGP)`, newOrder.id, 'order');
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus, staffNotes?: string) => {
    const updated = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            orderStatus: status,
            staffNotes: staffNotes !== undefined ? staffNotes : o.staffNotes,
            handledByStaff: currentStaff?.name || o.handledByStaff || 'Admin',
            updatedAt: new Date().toISOString()
          }
        : o
    );
    saveOrders(updated);
    logActivity('تحديث حالة طلب', 'Order Status Updated', `تم تغيير حالة الطلب ${id} إلى: ${status}`, `Updated order status for ${id} to ${status}`, id, 'order');
  };

  const updatePaymentStatus = (id: string, status: PaymentStatus) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, paymentStatus: status, updatedAt: new Date().toISOString() } : o
    );
    saveOrders(updated);
    logActivity('تحديث حالة الدفع', 'Payment Status Updated', `تم تغيير حالة الدفع للطلب ${id} إلى: ${status}`, `Updated payment status for ${id} to ${status}`, id, 'order');
  };

  const toggleArchiveOrder = (id: string) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, isArchived: !o.isArchived, updatedAt: new Date().toISOString() } : o
    );
    saveOrders(updated);
  };

  // 9. Customers
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialCustomers;
      }
    }
    return initialCustomers;
  });

  const saveCustomers = (newList: Customer[]) => {
    setCustomers(newList);
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(newList));
  };

  const addCustomerPet = (customerId: string, pet: any) => {
    const updated = customers.map((c) => {
      if (c.id === customerId) {
        const pets = c.pets || [];
        return {
          ...c,
          pets: [...pets, { ...pet, id: `pet-${Date.now()}`, customerId }]
        };
      }
      return c;
    });
    saveCustomers(updated);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    const updated = customers.map((c) => (c.id === id ? { ...c, ...updates } : c));
    saveCustomers(updated);
  };

  // 10. Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialReviews;
      }
    }
    return initialReviews;
  });

  const saveReviews = (newList: Review[]) => {
    setReviews(newList);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(newList));
  };

  const submitReview = (revData: Omit<Review, 'id' | 'approved' | 'isPublic' | 'createdAt'>) => {
    const newRev: Review = {
      ...revData,
      id: `rev-${Date.now()}`,
      approved: true, // auto-approve verified customer feedback
      isPublic: true,
      createdAt: new Date().toISOString()
    };
    saveReviews([newRev, ...reviews]);
  };

  const toggleReviewApproval = (id: string) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, approved: !r.approved, isPublic: !r.approved } : r
    );
    saveReviews(updated);
  };

  const deleteReview = (id: string) => {
    saveReviews(reviews.filter((r) => r.id !== id));
  };

  // 11. Banners & Articles
  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BANNERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialBanners;
      }
    }
    return initialBanners;
  });

  const updateBanner = (id: string, updates: Partial<Banner>) => {
    const updated = banners.map((b) => (b.id === id ? { ...b, ...updates } : b));
    setBanners(updated);
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(updated));
  };

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialArticles;
      }
    }
    return initialArticles;
  });

  const saveArticles = (newList: Article[]) => {
    setArticles(newList);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(newList));
  };

  const addArticle = (artData: Omit<Article, 'id' | 'publishedAt'>) => {
    const newArt: Article = {
      ...artData,
      id: `art-${Date.now()}`,
      publishedAt: new Date().toISOString()
    };
    const updated = [newArt, ...articles];
    saveArticles(updated);
    return newArt;
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    const updated = articles.map((a) => (a.id === id ? { ...a, ...updates } : a));
    saveArticles(updated);
  };

  const deleteArticle = (id: string) => {
    saveArticles(articles.filter((a) => a.id !== id));
  };

  // 12. Team & Activity Logs
  const [staffList, setStaffList] = useState<StaffUser[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STAFF);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialStaff;
      }
    }
    return initialStaff;
  });

  const saveStaffList = (newList: StaffUser[]) => {
    setStaffList(newList);
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(newList));
  };

  const addStaff = (userData: Omit<StaffUser, 'id'>) => {
    const newUser: StaffUser = {
      ...userData,
      id: `staff-${Date.now()}`
    };
    const updated = [...staffList, newUser];
    saveStaffList(updated);
    logActivity('إضافة عضو فريق جديد', 'Team Member Added', `تم إنشاء حساب للموظف: ${newUser.name} (${newUser.role})`, `Created staff account: ${newUser.name}`);
    return newUser;
  };

  const updateStaff = (id: string, updates: Partial<StaffUser>) => {
    const updated = staffList.map((s) => (s.id === id ? { ...s, ...updates } : s));
    saveStaffList(updated);
  };

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialActivityLogs;
      }
    }
    return initialActivityLogs;
  });

  const logActivity = (
    actionAr: string,
    actionEn: string,
    detailsAr: string,
    detailsEn: string,
    targetId?: string,
    targetType?: string
  ) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      userId: currentStaff?.id || 'staff-admin',
      userName: currentStaff?.name || 'Admin',
      action: actionEn,
      actionAr,
      details: detailsEn,
      detailsAr,
      timestamp: new Date().toISOString(),
      targetId,
      targetType
    };
    setActivityLogs((prev) => {
      const updated = [newLog, ...prev.slice(0, 150)];
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
      return updated;
    });
  };

  // 13. Admin Authentication
  const [currentStaff, setCurrentStaff] = useState<StaffUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_STAFF);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const adminLogin = (username: string, pass: string): { success: boolean; error?: string } => {
    // Official Admin credentials requested in prompt:
    // Username: "Admin"
    // Password: "01021216386"
    if (username.trim() === 'Admin' && pass.trim() === '01021216386') {
      const adminUser: StaffUser = {
        id: 'staff-admin',
        username: 'Admin',
        name: 'مدير النظام (Super Admin)',
        role: 'super_admin',
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
        lastLogin: new Date().toISOString(),
        active: true
      };
      setCurrentStaff(adminUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_STAFF, JSON.stringify(adminUser));
      logActivity('تسجيل دخول المشرف', 'Admin Login', 'تم تسجيل الدخول بنجاح لحساب المشرف العام', 'Super Admin logged in successfully');
      return { success: true };
    }

    // Check custom staff users
    const matchedStaff = staffList.find(
      (s) => s.username.toLowerCase() === username.trim().toLowerCase() && s.active
    );
    if (matchedStaff && pass === '01021216386') {
      const loggedUser = { ...matchedStaff, lastLogin: new Date().toISOString() };
      setCurrentStaff(loggedUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_STAFF, JSON.stringify(loggedUser));
      logActivity('تسجيل دخول موظف', 'Staff Login', `تم تسجيل دخول الموظف: ${loggedUser.name}`, `Staff logged in: ${loggedUser.name}`);
      return { success: true };
    }

    return {
      success: false,
      error: language === 'ar' ? 'اسم المستخدم أو كلمة المرور غير صحيحة.' : 'Invalid username or password.'
    };
  };

  const adminLogout = () => {
    logActivity('تسجيل خروج', 'Staff Logout', 'تم تسجيل الخروج من لوحة التحكم', 'Admin logged out from dashboard');
    setCurrentStaff(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STAFF);
  };

  // 14. Shopping Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updatedCart: CartItem[];

    if (existingIndex >= 0) {
      updatedCart = [...cart];
      const newQty = updatedCart[existingIndex].quantity + quantity;
      updatedCart[existingIndex].quantity = Math.min(product.stock, newQty);
    } else {
      updatedCart = [...cart, { product, quantity: Math.min(product.stock, Math.max(1, quantity)) }];
    }

    saveCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cart.map((item) => {
      if (item.product.id === productId) {
        return {
          ...item,
          quantity: Math.min(item.product.stock, quantity)
        };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // 15. Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
        settings,
        updateSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkSetProducts,
        updateStock,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        services,
        addService,
        updateService,
        deleteService,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        orders,
        placeOrder,
        updateOrderStatus,
        updatePaymentStatus,
        toggleArchiveOrder,
        customers,
        addCustomerPet,
        updateCustomer,
        reviews,
        submitReview,
        toggleReviewApproval,
        deleteReview,
        banners,
        updateBanner,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        staffList,
        addStaff,
        updateStaff,
        activityLogs,
        logActivity,
        currentStaff,
        adminLogin,
        adminLogout,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
