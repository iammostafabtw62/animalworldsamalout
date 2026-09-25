import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    settings,
    t,
    language
  } = useStore();

  if (!isOpen) return null;

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;
  const isFreeDelivery = cartTotal >= settings.freeDeliveryThreshold;
  const deliveryFee = cartTotal > 0 ? (isFreeDelivery ? 0 : settings.deliveryFee) : 0;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-[#151D18] h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white text-base">
                {t('سلة المشتريات', 'Shopping Cart')}
              </h3>
              <p className="text-xs text-gray-500">
                {cart.length} {t('منتجات مضافة', 'items added')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-500 hover:underline font-semibold"
              >
                {t('إفراغ السلة', 'Clear')}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            /* Official Empty Cart State with Mascot Artwork */
            <div className="text-center py-16 px-4 space-y-4">
              <div className="relative w-36 h-36 mx-auto rounded-3xl overflow-hidden border-2 border-[#0E7A5D]/20 shadow-md">
                <img
                  src={settings.emptyStateImage}
                  alt="Empty Cart Mascot"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xl font-black text-gray-800 dark:text-white">
                  {t('سلة التسوق فاضية... خلينا نملأها!', "Your cart is empty... let's fill it!")}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto leading-relaxed">
                  {t(
                    'اختر أفضل الأطعمة والمكملات والألعاب لأليفك وسنوصلها إليك في سمالوط والمنيا بأسرع وقت.',
                    'Browse delicious food, health supplements, and toys for your pet with fast delivery in Samalout & Minya.'
                  )}
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md transition-colors"
              >
                {t('تصفح المنتجات الآن', 'Browse Products Now')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(({ product, quantity }) => {
                const name = language === 'ar' ? product.nameAr : product.nameEn;
                const price = product.salePrice || product.price;

                return (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1C2721] border border-gray-200/80 dark:border-gray-800 flex items-center gap-3.5"
                  >
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400'}
                      alt={name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                        {name}
                      </h5>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-sm font-black text-[#0E7A5D] dark:text-[#2DD4BF]">
                          {price}
                        </span>
                        <span className="text-xs text-gray-500">{currency}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-[#151D18]">
                          <button
                            onClick={() => updateCartQuantity(product.id, quantity - 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold">{quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(product.id, quantity + 1)}
                            disabled={quantity >= product.stock}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-40"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"
                          title={t('حذف', 'Remove')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Totals and Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#19241E] space-y-3">
            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>{t('المجموع الفرعي:', 'Subtotal:')}</span>
                <span className="font-bold">{cartTotal} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('الشحن والتوصيل (سمالوط):', 'Delivery Fee (Samalout):')}</span>
                <span>
                  {isFreeDelivery ? (
                    <span className="text-emerald-600 font-bold">{t('شحن مجاني!', 'Free Delivery!')}</span>
                  ) : (
                    <span>{deliveryFee} {currency}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                <span>{t('الإجمالي النهائي:', 'Grand Total:')}</span>
                <span className="text-[#0E7A5D] dark:text-[#2DD4BF]">
                  {finalTotal} {currency}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-sm shadow-lg shadow-[#0E7A5D]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('متابعة إتمام الطلب', 'Proceed to Checkout')}</span>
              {language === 'ar' ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
