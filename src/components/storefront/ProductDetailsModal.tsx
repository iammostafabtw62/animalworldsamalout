import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Check, Truck, AlertCircle, Plus, Minus } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onBuyNow
}) => {
  const { language, t, addToCart, toggleWishlist, isInWishlist, settings, products } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'benefits' | 'ingredients' | 'usage'>('desc');

  if (!product) return null;

  const productName = language === 'ar' ? product.nameAr : product.nameEn;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionEn;
  const benefits = language === 'ar' ? product.benefitsAr : product.benefitsEn;
  const ingredients = language === 'ar' ? product.ingredientsAr : product.ingredientsEn;
  const usage = language === 'ar' ? product.usageAr : product.usageEn;
  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  const currentPrice = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice && product.salePrice < product.price;
  const isOutOfStock = product.stock <= 0;
  const isFavorited = isInWishlist(product.id);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.published)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleDirectBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-[#1E2822]/80 backdrop-blur-md text-gray-500 hover:text-gray-900 dark:hover:text-white shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gallery Column */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1E2B23] border border-gray-200 dark:border-gray-800 mb-3">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-[#0E7A5D] scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#0E7A5D] dark:text-[#2DD4BF] bg-[#0E7A5D]/10 px-2.5 py-1 rounded-lg">
                    {product.brand}
                  </span>
                  {product.isVetsPick && (
                    <span className="text-xs font-bold text-white bg-[#0E7A5D] px-2.5 py-1 rounded-lg">
                      {t('ترشيح بيطري معتمد', "Vet's Pick")}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">SKU: {product.sku}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-3">
                  {productName}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    ({product.reviewCount} {t('تقييم من عملاء سمالوط والمنيا', 'customer reviews')})
                  </span>
                </div>

                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1B2620] border border-gray-200 dark:border-gray-800 mb-6 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0E7A5D] dark:text-[#2DD4BF]">
                      {currentPrice}
                    </span>
                    <span className="text-sm font-bold text-gray-500">{currency}</span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-400 line-through mr-2">
                        {product.price} {currency}
                      </span>
                    )}
                  </div>

                  {hasDiscount && (
                    <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white text-xs font-black">
                      {t(`وفر ${product.discountPercentage}%`, `Save ${product.discountPercentage}%`)}
                    </span>
                  )}
                </div>

                {/* Stock info */}
                <div className="flex items-center gap-2 mb-6 text-xs">
                  {isOutOfStock ? (
                    <span className="text-rose-500 font-bold flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{t('غير متوفر حاليًا بالعيادة', 'Currently out of stock')}</span>
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>{t(`متوفر في المتجر (${product.stock} عبوة متبقية)`, `In Stock (${product.stock} available)`)}</span>
                    </span>
                  )}
                </div>

                {/* Quantity and Actions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {t('الكمية:', 'Quantity:')}
                    </span>
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={isOutOfStock || quantity <= 1}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 text-sm font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={isOutOfStock || quantity >= product.stock}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isFavorited
                          ? 'border-rose-300 bg-rose-50 text-rose-500'
                          : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:text-rose-500'
                      }`}
                      title={t('المفضلة', 'Wishlist')}
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className="py-3 px-4 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-sm shadow-md shadow-[#0E7A5D]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{t('أضف إلى السلة', 'Add to Cart')}</span>
                    </button>

                    <button
                      onClick={handleDirectBuy}
                      disabled={isOutOfStock}
                      className="py-3 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#1E2923] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span>{t('شراء فوري', 'Buy Now')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0E7A5D]" />
                  <span>{t('منتج بيطري أصلي 100%', '100% Genuine product')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#0E7A5D]" />
                  <span>{t('توصيل سريع داخل سمالوط والمنيا', 'Fast Samalout Delivery')}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Description Tabs */}
          <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('desc')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'desc'
                    ? 'bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF]'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('الوصف والتفاصيل', 'Description')}
              </button>

              {benefits && (
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'benefits'
                      ? 'bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF]'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {t('الفوائد الصحية', 'Benefits')}
                </button>
              )}

              {ingredients && (
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'ingredients'
                      ? 'bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF]'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {t('المكونات والتركيب', 'Ingredients')}
                </button>
              )}

              {usage && (
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'usage'
                      ? 'bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF]'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {t('طريقة الاستخدام والجرعة', 'Usage Instructions')}
                </button>
              )}
            </div>

            <div className="py-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {activeTab === 'desc' && <p>{description}</p>}
              {activeTab === 'benefits' && <p>{benefits}</p>}
              {activeTab === 'ingredients' && <p>{ingredients}</p>}
              {activeTab === 'usage' && <p>{usage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
