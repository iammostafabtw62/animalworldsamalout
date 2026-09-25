import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { ShoppingCart, Heart, Star, Eye, AlertCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { language, t, addToCart, toggleWishlist, isInWishlist, settings } = useStore();

  const isFavorited = isInWishlist(product.id);
  const currentPrice = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice && product.salePrice < product.price;
  const isOutOfStock = product.stock <= 0;
  const isLowStock = !isOutOfStock && product.stock <= (product.lowStockThreshold || 5);

  const productName = language === 'ar' ? product.nameAr : product.nameEn;
  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  return (
    <div className="group relative bg-white dark:bg-[#16201B] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#0E7A5D]/40 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image & Badges Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-[#1D2B24]">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600'}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-lg bg-rose-500 text-white text-[11px] font-black shadow-xs">
              {product.discountPercentage ? `-${product.discountPercentage}%` : t('خصم', 'Sale')}
            </span>
          )}
          {product.isVetsPick && (
            <span className="px-2 py-0.5 rounded-lg bg-[#0E7A5D] text-white text-[10px] font-bold shadow-xs">
              {t('ترشيح بيطري', "Vet's Pick")}
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-lg bg-[#F59E0B] text-[#1E2923] text-[10px] font-bold shadow-xs">
              {t('الأكثر مبيعًا', 'Best Seller')}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 left-2.5 p-2 rounded-xl backdrop-blur-md transition-all ${
            isFavorited
              ? 'bg-rose-50 text-rose-500 shadow-md'
              : 'bg-white/80 dark:bg-black/60 text-gray-600 dark:text-gray-300 hover:text-rose-500'
          }`}
          title={isFavorited ? t('إزالة من المفضلة', 'Remove from wishlist') : t('إضافة للمفضلة', 'Add to wishlist')}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Button Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => onQuickView(product)}
            className="px-4 py-2 rounded-xl bg-white/95 dark:bg-[#151D18]/95 text-gray-900 dark:text-white text-xs font-bold shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            <Eye className="w-3.5 h-3.5 text-[#0E7A5D]" />
            <span>{t('معاينة سريعة', 'Quick View')}</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="text-gray-500 dark:text-gray-400 font-medium truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h4
            onClick={() => onQuickView(product)}
            className="font-bold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] cursor-pointer transition-colors mb-2"
          >
            {productName}
          </h4>
        </div>

        {/* Stock status indicator */}
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            {isOutOfStock ? (
              <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{t('نفد من المخزون', 'Out of Stock')}</span>
              </span>
            ) : isLowStock ? (
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{t(`متبقي ${product.stock} فقط!`, `Only ${product.stock} left!`)}</span>
              </span>
            ) : (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{t('متوفر بالعيادة', 'In Stock')}</span>
              </span>
            )}

            {product.weight && (
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {product.weight}
              </span>
            )}
          </div>

          {/* Price & Add to Cart button */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-[#0E7A5D] dark:text-[#2DD4BF]">
                  {currentPrice}
                </span>
                <span className="text-xs font-bold text-gray-500">{currency}</span>
              </div>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  {product.price} {currency}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className={`p-2.5 rounded-xl font-bold flex items-center justify-center transition-all ${
                isOutOfStock
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-[#0E7A5D] hover:bg-[#0A5440] text-white shadow-md shadow-[#0E7A5D]/20 active:scale-95'
              }`}
              title={t('أضف إلى السلة', 'Add to Cart')}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
