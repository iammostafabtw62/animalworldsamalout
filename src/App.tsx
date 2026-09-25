import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { MobileNav } from './components/common/MobileNav';

import { HeroSection } from './components/storefront/HeroSection';
import { CategoryList } from './components/storefront/CategoryList';
import { ProductGrid } from './components/storefront/ProductGrid';
import { ProductDetailsModal } from './components/storefront/ProductDetailsModal';
import { ServicesSection } from './components/storefront/ServicesSection';
import { AppointmentModal } from './components/storefront/AppointmentModal';
import { ReviewsSection } from './components/storefront/ReviewsSection';
import { BlogSection } from './components/storefront/BlogSection';
import { LocationSection } from './components/storefront/LocationSection';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutModal } from './components/storefront/CheckoutModal';
import { WishlistModal } from './components/storefront/WishlistModal';
import { OrderTrackingModal } from './components/storefront/OrderTrackingModal';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Product, VeterinaryService, Order } from './types';
import { Sparkles, Stethoscope, ArrowLeft, ArrowRight } from 'lucide-react';

function MainApp() {
  const { currentStaff, t, language, settings, products, addToCart } = useStore();

  // Navigation and View states
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<VeterinaryService | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Scroll to section handler
  const handleNavigate = (sectionId: string) => {
    setActiveTab(sectionId);
    if (currentView === 'admin') {
      setCurrentView('store');
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'vets-picks') {
      const el = document.getElementById('vets-picks');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    if (currentStaff) {
      setCurrentView('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleBookService = (service: VeterinaryService) => {
    setSelectedServiceForBooking(service);
    setIsAppointmentOpen(true);
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // If in admin view and user is authenticated
  if (currentView === 'admin') {
    if (!currentStaff) {
      // Protected route fallback
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#111614] p-4">
          <AdminLoginModal
            isOpen={true}
            onClose={() => setCurrentView('store')}
            onSuccess={() => setCurrentView('admin')}
          />
        </div>
      );
    }
    return <AdminLayout onExit={() => setCurrentView('store')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] dark:bg-[#111614] text-[#1E2923] dark:text-[#EAEFEA] transition-colors">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Responsive Header */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAppointment={() => {
          setSelectedServiceForBooking(null);
          setIsAppointmentOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <HeroSection
        onShopClick={() => handleNavigate('shop')}
        onBookClick={() => {
          setSelectedServiceForBooking(null);
          setIsAppointmentOpen(true);
        }}
      />

      {/* Main Storefront Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12 pb-16">
        {/* Categories Carousel */}
        <section id="categories">
          <CategoryList
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        </section>

        {/* Products Shop Grid */}
        <section id="shop">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[#0E7A5D] rounded-full"></span>
                <span>{t('المتجر والمنتجات المتوفرة', 'Shop Pet Products')}</span>
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {t('أطعمة أصلية، مكملات، أدوية، ومستلزمات العناية في سمالوط والمنيا', 'Authentic food, supplements, medications, and grooming supplies')}
              </p>
            </div>
          </div>

          <ProductGrid
            onQuickView={(prod) => setSelectedProduct(prod)}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </section>

        {/* Vet's Picks Featured Strip */}
        <section id="vets-picks" className="p-8 rounded-3xl bg-gradient-to-r from-[#0E7A5D]/15 via-[#0E7A5D]/5 to-[#F59E0B]/10 border border-[#0E7A5D]/30 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={settings.catMascotImage}
                alt="Vet Kitten Mascot"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white dark:border-gray-800 shadow-lg shrink-0"
              />
              <div>
                <span className="px-2.5 py-1 rounded-full bg-[#0E7A5D] text-white text-[10px] font-bold">
                  {t('ترشيحات د. كيتي البيطرية', "Dr. Kitty's Vet Selection")}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">
                  {t('مكملات وأغذية علاجية موصى بها من أطبائنا', 'Therapeutic Diets & Medicated Care')}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-xl">
                  {t(
                    'تم اختيار هذه المنتجات من قبل فريق الأطباء البيطريين لضمان صحة الجهاز الهضمي، لمعان الفراء، وتقوية مناعة أليفك.',
                    'Carefully selected by certified veterinary doctors to optimize digestive wellness, coat shine, and immunity.'
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory(null);
                handleNavigate('shop');
              }}
              className="px-6 py-3 rounded-2xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs sm:text-sm font-bold shadow-md transition-all shrink-0 flex items-center gap-2"
            >
              <span>{t('عرض كافة اختيارات الطبيب', "View All Vet's Picks")}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </section>

        {/* Veterinary Services Section (NO delivery service) */}
        <ServicesSection onBookService={handleBookService} />

        {/* Customer Reviews Section */}
        <ReviewsSection />

        {/* Pet Care Articles & Guides */}
        <BlogSection />

        {/* Clinic & Store Location (Samalout, Minya - 01227339226) */}
        <LocationSection />
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
        onOpenAppointment={() => {
          setSelectedServiceForBooking(null);
          setIsAppointmentOpen(true);
        }}
      />

      {/* Floating Action Button for WhatsApp */}
      <WhatsAppButton />

      {/* Sticky Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAppointment={() => {
          setSelectedServiceForBooking(null);
          setIsAppointmentOpen(true);
        }}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(order: Order) => {
          // Keep confirmation screen active inside modal
        }}
      />

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNow}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onOpenProduct={(productId) => {
          const p = products.find((prod) => prod.id === productId);
          if (p) setSelectedProduct(p);
        }}
      />

      {isAppointmentOpen && (
        <AppointmentModal
          initialService={selectedServiceForBooking}
          onClose={() => setIsAppointmentOpen(false)}
        />
      )}

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => setCurrentView('admin')}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
