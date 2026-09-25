import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingCart,
  Heart,
  Calendar,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  ShieldCheck,
  Stethoscope,
  Store,
  User
} from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
  onOpenAdmin: () => void;
  onOpenTracking: () => void;
  onNavigate: (sectionId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenWishlist,
  onOpenAppointment,
  onOpenAdmin,
  onOpenTracking,
  onNavigate,
  searchQuery,
  setSearchQuery
}) => {
  const { language, setLanguage, theme, toggleTheme, t, settings, cartCount, wishlist, currentStaff } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const brandName = language === 'ar' ? settings.brandNameAr : settings.brandNameEn;

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#151D18]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-12 h-12 rounded-2xl bg-white dark:bg-[#1E2822] p-1 flex items-center justify-center shadow-md shadow-[#0E7A5D]/20 overflow-hidden group-hover:scale-105 transition-transform border border-gray-200/80 dark:border-gray-700/80">
              <img
                src={settings.iconImage || settings.logoImage || '/src/assets/images/animal_world_icon_emblem_1790356382456.jpg'}
                alt={brandName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-[#0E7A5D] dark:text-[#2DD4BF]">
                  {brandName}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {language === 'ar' ? 'عيادة بيطرية ومستلزمات أليفك' : 'Veterinary Care & Pet Supplies'}
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder={t(
                  'ابحث عن طعام، مكملات، علاج، أو خدمة بيطرية...',
                  'Search food, supplements, medications, or vet services...'
                )}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-100 dark:bg-[#1E2822] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E7A5D] dark:focus:ring-[#2DD4BF] text-sm transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Book Appointment Quick Button */}
            <button
              onClick={onOpenAppointment}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0E7A5D]/10 hover:bg-[#0E7A5D]/20 text-[#0E7A5D] dark:text-[#2DD4BF] dark:bg-[#0E7A5D]/20 font-bold text-sm transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('حجز كشف بيطري', 'Book Vet Visit')}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold transition-colors flex items-center gap-1.5"
              title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="w-4 h-4 text-[#0E7A5D] dark:text-[#2DD4BF]" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
              title={theme === 'dark' ? t('الوضع النهاري', 'Light Mode') : t('الوضع الليلي', 'Dark Mode')}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Order Tracking */}
            <button
              onClick={onOpenTracking}
              className="hidden md:flex p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
              title={t('تتبع طلبك', 'Track Order')}
            >
              <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
              title={t('المفضلة', 'Wishlist')}
            >
              <Heart className="w-4 h-4 text-rose-500" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-sm shadow-md shadow-[#0E7A5D]/25 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">{t('السلة', 'Cart')}</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-[#1E2923] text-xs font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard / Staff Button */}
            <button
              onClick={onOpenAdmin}
              className={`p-2.5 rounded-xl border transition-colors ${
                currentStaff
                  ? 'border-[#0E7A5D] bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF]'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={currentStaff ? t('لوحة التحكم (نشط)', 'Admin Dashboard (Active)') : t('تسجيل دخول الإدارة', 'Admin Login')}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('ابحث عن طعام أو علاج أو خدمة بيطرية...', 'Search products or vet services...')}
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-gray-100 dark:bg-[#1E2822] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Desktop Main Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-between py-2.5 border-t border-gray-100 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-7">
            <button
              onClick={() => handleNavClick('home')}
              className="hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] transition-colors"
            >
              {t('الرئيسية', 'Home')}
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] transition-colors flex items-center gap-1.5"
            >
              <Store className="w-4 h-4 text-[#0E7A5D]" />
              <span>{t('المتجر والمنتجات', 'Shop & Products')}</span>
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] transition-colors"
            >
              {t('التصنيفات', 'Categories')}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] transition-colors flex items-center gap-1.5"
            >
              <Stethoscope className="w-4 h-4 text-[#0E7A5D]" />
              <span>{t('الخدمات البيطرية', 'Veterinary Services')}</span>
            </button>
            <button
              onClick={() => handleNavClick('vets-picks')}
              className="hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] transition-colors"
            >
              {t('اختيارات الطبيب البيطري', "Vet's Picks")}
            </button>
            <button
              onClick={() => handleNavClick('articles')}
              className="hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] transition-colors"
            >
              {t('نصائح ومقالات', 'Pet Care Guides')}
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className="hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] transition-colors"
            >
              {t('موقعنا في سمالوط', 'Samalout Location')}
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
            <span>{t('سمالوط، المنيا، مصر', 'Samalout, Minya, Egypt')}</span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#151D18] border-b border-gray-200 dark:border-gray-800 px-4 py-4 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-right py-2 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-[#0E7A5D]"
          >
            {t('الرئيسية', 'Home')}
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className="w-full text-right py-2 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-[#0E7A5D]"
          >
            {t('المتجر والمنتجات', 'Shop & Products')}
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="w-full text-right py-2 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-[#0E7A5D]"
          >
            {t('التصنيفات', 'Categories')}
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="w-full text-right py-2 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-[#0E7A5D]"
          >
            {t('الخدمات البيطرية', 'Veterinary Services')}
          </button>
          <button
            onClick={() => handleNavClick('articles')}
            className="w-full text-right py-2 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-[#0E7A5D]"
          >
            {t('نصائح ومقالات', 'Pet Care Guides')}
          </button>
          <button
            onClick={() => handleNavClick('location')}
            className="w-full text-right py-2 text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-[#0E7A5D]"
          >
            {t('موقعنا في سمالوط', 'Samalout Location')}
          </button>
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
            <button
              onClick={toggleTheme}
              className="flex-1 py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1C2721] text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2 transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>{t('الوضع النهاري (فاتح)', 'Light Mode')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span>{t('الوضع الليلي (داكن)', 'Dark Mode')}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="py-2 px-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1C2721] text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Globe className="w-4 h-4 text-[#0E7A5D] dark:text-[#2DD4BF]" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAppointment();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('احجز موعد كشف بيطري', 'Book Vet Appointment')}</span>
            </button>
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <User className="w-4 h-4" />
              <span>{t('تتبع طلبك وحسابك', 'Track Order & Account')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
