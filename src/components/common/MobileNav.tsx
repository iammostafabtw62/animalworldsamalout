import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Store, Calendar, Heart, ShoppingBag } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onNavigate,
  onOpenCart,
  onOpenWishlist,
  onOpenAppointment
}) => {
  const { t, cartCount, wishlist } = useStore();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#151D18]/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 px-3 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-1 p-1 text-xs font-semibold ${
          activeTab === 'home'
            ? 'text-[#0E7A5D] dark:text-[#2DD4BF]'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>{t('الرئيسية', 'Home')}</span>
      </button>

      <button
        onClick={() => onNavigate('shop')}
        className={`flex flex-col items-center gap-1 p-1 text-xs font-semibold ${
          activeTab === 'shop'
            ? 'text-[#0E7A5D] dark:text-[#2DD4BF]'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        <Store className="w-5 h-5" />
        <span>{t('المتجر', 'Shop')}</span>
      </button>

      {/* Center Vet Appointment CTA */}
      <button
        onClick={onOpenAppointment}
        className="flex flex-col items-center gap-1 -mt-5"
      >
        <div className="w-12 h-12 rounded-full bg-[#0E7A5D] text-white flex items-center justify-center shadow-lg shadow-[#0E7A5D]/30 border-4 border-white dark:border-[#151D18] hover:scale-105 transition-transform">
          <Calendar className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-bold text-[#0E7A5D] dark:text-[#2DD4BF]">
          {t('حجز كشف', 'Book')}
        </span>
      </button>

      <button
        onClick={onOpenWishlist}
        className="relative flex flex-col items-center gap-1 p-1 text-xs font-semibold text-gray-500 dark:text-gray-400"
      >
        <Heart className="w-5 h-5" />
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-3 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
        <span>{t('المفضلة', 'Wishlist')}</span>
      </button>

      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center gap-1 p-1 text-xs font-semibold text-gray-500 dark:text-gray-400"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-[#F59E0B] text-[#1E2923] text-[9px] font-black flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span>{t('السلة', 'Cart')}</span>
      </button>
    </div>
  );
};
