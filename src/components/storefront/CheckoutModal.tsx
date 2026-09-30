import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import {
  X,
  CheckCircle2,
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  Truck,
  ArrowRight,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { cart, cartTotal, clearCart, placeOrder, settings, t, language } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const [city, setCity] = useState('سمالوط');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'card' | 'instapay' | 'vodafone_cash'>('cash_on_delivery');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;
  const isFreeDelivery = cartTotal >= settings.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : settings.deliveryFee;
  const grandTotal = cartTotal + deliveryFee;

  const handleNextStep = () => {
    setError('');
    if (step === 1) {
      if (!customerName.trim() || !customerPhone.trim()) {
        setError(language === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف للمتابعة.' : 'Please enter your name and phone number.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!address.trim()) {
        setError(language === 'ar' ? 'يرجى إدخال تفاصيل العنوان والشارع.' : 'Please enter your street address.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleConfirmOrder = () => {
    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productNameAr: item.product.nameAr,
      productNameEn: item.product.nameEn,
      productSku: item.product.sku,
      image: item.product.images[0],
      quantity: item.quantity,
      unitPrice: item.product.salePrice || item.product.price,
      totalPrice: (item.product.salePrice || item.product.price) * item.quantity
    }));

    const order = placeOrder({
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail || 'customer@animalworld-eg.com',
        city,
        area: area || city,
        address,
        notes: notes || undefined
      },
      items: orderItems,
      subtotal: cartTotal,
      discount: 0,
      deliveryFee,
      total: grandTotal,
      paymentMethod
    });

    clearCart();
    setCreatedOrder(order);
    setStep(5);
    onSuccess(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#1A2520]">
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              {t('إتمام الطلب والدفع', 'Checkout & Payment')}
            </h3>
            <p className="text-xs text-gray-500">
              {t('عالم الحيوان — سمالوط، المنيا', 'Animal World — Samalout, Minya')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="px-6 py-3 bg-gray-100 dark:bg-[#1C2721] flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-400">
            <span className={step >= 1 ? 'text-[#0E7A5D] dark:text-[#2DD4BF]' : ''}>1. {t('البيانات', 'Info')}</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#0E7A5D] dark:text-[#2DD4BF]' : ''}>2. {t('العنوان', 'Address')}</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#0E7A5D] dark:text-[#2DD4BF]' : ''}>3. {t('التوصيل', 'Delivery')}</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-[#0E7A5D] dark:text-[#2DD4BF]' : ''}>4. {t('الدفع', 'Payment')}</span>
          </div>
        )}

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200">
              {error}
            </div>
          )}

          {/* Step 1: Customer Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                {t('الخطوة 1: بيانات العميل الشخصية', 'Step 1: Customer Details')}
              </h4>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('الاسم بالكامل', 'Full Name')} *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t('أحمد محمد', 'John Doe')}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('رقم الهاتف المحمول (للتواصل والتوصيل)', 'Mobile Phone')} *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="01227339226"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D] dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('البريد الإلكتروني (اختياري)', 'Email Address (Optional)')}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                />
              </div>
            </div>
          )}

          {/* Step 2: Shipping Address */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                {t('الخطوة 2: عنوان التوصيل داخل سمالوط والمنيا', 'Step 2: Shipping Address')}
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    {t('المدينة / المركز', 'City')} *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                  >
                    <option value="سمالوط">{t('مركز سمالوط', 'Samalout')}</option>
                    <option value="مدينة المنيا">{t('مدينة المنيا', 'Minya City')}</option>
                    <option value="مغاغة">{t('مغاغة', 'Maghagha')}</option>
                    <option value="بني مزار">{t('بني مزار', 'Beni Mazar')}</option>
                    <option value="مطاي">{t('مطاي', 'Matai')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    {t('المنطقة أو الحي', 'Area / Neighborhood')}
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder={t('شارع الصفصافية / داير الناحية', 'e.g. Al-Safsafiya')}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('العنوان التفصيلي وعلامة مميزة', 'Detailed Address & Landmark')} *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('اسم الشارع، رقم العمارة، الشقة، علامة مميزة بالقرب منك', 'Street name, building, apartment, nearby landmark')}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('ملاحظات خاصة بالتوصيل (اختياري)', 'Delivery Notes (Optional)')}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('الاتصال قبل الوصول / التوصيل بعد الساعة 4 مساءً', 'Call before arrival, deliver after 4 PM')}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                />
              </div>
            </div>
          )}

          {/* Step 3: Delivery Options */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                {t('الخطوة 3: خيارات الشحن والتسليم', 'Step 3: Delivery & Fulfillment')}
              </h4>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1B2620] border-2 border-[#0E7A5D] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                      {t('توصيل سريع داخل سمالوط والمنيا', 'Standard Fast Delivery (Samalout & Minya)')}
                    </h5>
                    <p className="text-xs text-gray-500">
                      {t('يصلك خلال 24 - 48 ساعة بواسطة مندوب العيادة', 'Delivered within 24-48 hours')}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-sm text-[#0E7A5D] dark:text-[#2DD4BF]">
                  {isFreeDelivery ? t('مجاني', 'Free') : `${deliveryFee} ${currency}`}
                </span>
              </div>
            </div>
          )}

          {/* Step 4: Payment Methods */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                {t('الخطوة 4: طريقة الدفع', 'Step 4: Payment Method')}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-[#0E7A5D] bg-[#0E7A5D]/5'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <Banknote className="w-6 h-6 text-[#0E7A5D] mb-2" />
                  <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                    {t('الدفع عند الاستلام', 'Cash on Delivery')}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('ادفع نقدًا عند استلام طلبك للمندوب', 'Pay cash when order arrives')}
                  </p>
                </div>

                <div
                  onClick={() => setPaymentMethod('instapay')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'instapay'
                      ? 'border-[#0E7A5D] bg-[#0E7A5D]/5'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-[#F59E0B] mb-2" />
                  <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                    {t('إنستاباي / فودافون كاش', 'InstaPay / Vodafone Cash')}
                  </h5>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('تحويل فوري لرقم هاتف العيادة: 01227339226', 'Instant transfer to clinic phone: 01227339226')}
                  </p>
                </div>
              </div>

              {/* Order Summary box */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1B2620] border border-gray-200 dark:border-gray-800 text-xs space-y-2 mt-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>{t('المجموع الفرعي للمنتجات:', 'Subtotal:')}</span>
                  <span className="font-bold">{cartTotal} {currency}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>{t('الشحن والتوصيل:', 'Delivery:')}</span>
                  <span className="font-bold">{deliveryFee} {currency}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>{t('الإجمالي المطلوب:', 'Total Due:')}</span>
                  <span className="text-[#0E7A5D] dark:text-[#2DD4BF]">
                    {grandTotal} {currency}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation with Mascot */}
          {step === 5 && createdOrder && (
            <div className="text-center py-6 space-y-5">
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-[#0E7A5D] shadow-lg">
                <img
                  src={settings.dogMascotImage}
                  alt="Dog Mascot Shopper"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('تم تسجيل طلبك بنجاح!', 'Order Successfully Placed!')}</span>
                </div>

                <h4 className="text-2xl font-black text-gray-900 dark:text-white">
                  {t('رقم الطلب:', 'Order ID:')} <span className="text-[#0E7A5D]">{createdOrder.orderNumber}</span>
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
                  {t(
                    `شكرًا لك يا ${createdOrder.customer.name}! تم تجهيز طلبك بقيمة ${createdOrder.total} ${currency}. سيتواصل معك مندوب عالم الحيوان لتوصيل الطلب إلى ${createdOrder.customer.address}، سمالوط.`,
                    `Thank you ${createdOrder.customer.name}! Your order of ${createdOrder.total} ${currency} has been received. Our delivery agent will contact you soon.`
                  )}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1B2620] border border-gray-200 dark:border-gray-800 text-xs text-start space-y-1">
                <p><strong>{t('هاتف العميل:', 'Customer Phone:')}</strong> {createdOrder.customer.phone}</p>
                <p><strong>{t('طريقة الدفع:', 'Payment Method:')}</strong> {createdOrder.paymentMethod === 'cash_on_delivery' ? t('الدفع عند الاستلام', 'Cash on Delivery') : 'InstaPay'}</p>
                <p><strong>{t('عنوان التسليم:', 'Address:')}</strong> {createdOrder.customer.city} - {createdOrder.customer.address}</p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-sm shadow-md transition-colors"
              >
                {t('متابعة التسوق في عالم الحيوان', 'Continue Shopping at Animal World')}
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          {step < 5 && (
            <div className="flex items-center justify-between gap-3 pt-6 border-t border-gray-100 dark:border-gray-800 mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev - 1) as any)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {t('السابق', 'Back')}
                </button>
              ) : (
                <span />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <span>{t('التالي', 'Next')}</span>
                  {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="px-6 py-3 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-lg shadow-[#0E7A5D]/25 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('تأكيد الطلب النهائي', 'Confirm Order')}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
