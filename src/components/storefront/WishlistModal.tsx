import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProduct: (productId: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  onOpenProduct
}) => {
  const { wishlist, toggleWishlist, products, addToCart, t, language, settings } = useStore();

  if (!isOpen) return null;

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));
  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#1A2520]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {t('قائمة أمنياتي والمفضلة', 'My Wishlist')}
              </h3>
              <p className="text-xs text-gray-500">
                {favoritedProducts.length} {t('منتجات مفضلة محفوظة', 'saved favorites')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {favoritedProducts.length === 0 ? (
            /* Mascot Empty Wishlist State */
            <div className="text-center py-12 px-4 space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-3xl overflow-hidden border-2 border-rose-200 shadow-md">
                <img
                  src={settings.emptyStateImage}
                  alt="Empty Wishlist"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-black text-gray-800 dark:text-white">
                {t('قائمة المفضلة فارغة حاليًا', 'Your wishlist is currently empty')}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                {t(
                  'انقر على علامة القلب على أي طعام أو مستلزم تفضله لأليفك لتصل إليه بسرعة في أي وقت.',
                  'Click the heart icon on any food or supply you like to access it quickly anytime.'
                )}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold transition-colors"
              >
                {t('استكشف منتجات المتجر', 'Explore Store Products')}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {favoritedProducts.map((product) => {
                const name = language === 'ar' ? product.nameAr : product.nameEn;
                const price = product.salePrice || product.price;

                return (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1C2721] border border-gray-200/80 dark:border-gray-800 flex items-center justify-between gap-4"
                  >
                    <div
                      onClick={() => {
                        onClose();
                        onOpenProduct(product.id);
                      }}
                      className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                    >
                      <img
                        src={product.images[0]}
                        alt={name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                          {name}
                        </h5>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-sm font-black text-[#0E7A5D] dark:text-[#2DD4BF]">
                            {price}
                          </span>
                          <span className="text-xs text-gray-500">{currency}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="p-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                        title={t('أضف إلى السلة', 'Add to Cart')}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('للسلة', 'Add')}</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2.5 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title={t('حذف من المفضلة', 'Remove')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
