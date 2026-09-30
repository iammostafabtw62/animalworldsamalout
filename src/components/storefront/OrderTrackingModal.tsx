import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Search,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Heart,
  Plus
} from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose
}) => {
  const { orders, customers, addCustomerPet, t, language, settings } = useStore();
  const [activeTab, setActiveTab] = useState<'track' | 'pets'>('track');
  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrders, setFoundOrders] = useState<typeof orders | null>(null);

  // Pet Profile form state
  const [showAddPet, setShowAddPet] = useState(false);
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<'dog' | 'cat' | 'bird' | 'small_pet'>('cat');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  if (!isOpen) return null;

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const matched = orders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.phone.replace(/\D/g, '').includes(q.replace(/\D/g, '')) ||
        o.customer.name.toLowerCase().includes(q)
    );
    setFoundOrders(matched);
  };

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim()) return;

    // Add to primary customer or first customer
    const targetCustomer = customers[0];
    if (targetCustomer) {
      addCustomerPet(targetCustomer.id, {
        name: petName,
        species,
        breed: breed || (species === 'cat' ? 'بلدي / شيرازي' : 'جيرمن / جولدن'),
        gender: 'female',
        age: age || '1 سنة',
        weight: weight || '3.5 kg'
      });
    }
    setPetName('');
    setBreed('');
    setAge('');
    setWeight('');
    setShowAddPet(false);
  };

  const allPets = customers.flatMap((c) => c.pets || []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">{t('طلب جديد', 'New Order')}</span>;
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-lg bg-cyan-100 text-cyan-800 text-xs font-bold">{t('تم التأكيد', 'Confirmed')}</span>;
      case 'processing':
        return <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">{t('قيد التجهيز', 'Processing')}</span>;
      case 'ready':
        return <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold">{t('جاهز للتسليم', 'Ready')}</span>;
      case 'shipped':
        return <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 text-xs font-bold">{t('مع مندوب التوصيل', 'Out for Delivery')}</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">{t('تم التوصيل بنجاح', 'Delivered')}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#1A2520]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {t('حسابي وتتبع الطلبات', 'My Account & Order Tracking')}
              </h3>
              <p className="text-xs text-gray-500">
                {t('عالم الحيوان — سمالوط، المنيا', 'Animal World — Samalout, Minya')}
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

        {/* Tab Selector */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-6 pt-3 bg-gray-50/30 dark:bg-[#16201B]">
          <button
            onClick={() => setActiveTab('track')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'track'
                ? 'border-[#0E7A5D] text-[#0E7A5D] dark:text-[#2DD4BF]'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>{t('تتبع حالة الطلب', 'Track Order')}</span>
          </button>
          <button
            onClick={() => setActiveTab('pets')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'pets'
                ? 'border-[#0E7A5D] text-[#0E7A5D] dark:text-[#2DD4BF]'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{t('ملفات حيواناتي الأليفة', 'My Pet Profiles')}</span>
          </button>
        </div>

        {/* Tab 1: Track Order */}
        {activeTab === 'track' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('أدخل رقم الطلب (مثال: AW-2026-1001) أو رقم هاتفك...', 'Enter Order # or phone number...')}
                  className="w-full p-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md transition-colors shrink-0"
              >
                {t('بحث', 'Track')}
              </button>
            </form>

            {foundOrders !== null ? (
              foundOrders.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {t(`تم العثور على (${foundOrders.length}) طلب`, `Found ${foundOrders.length} order(s)`)}
                  </h4>
                  {foundOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1C2721] border border-gray-200/80 dark:border-gray-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-sm font-black text-[#0E7A5D] dark:text-[#2DD4BF]">
                            {ord.orderNumber}
                          </span>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(ord.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                          </p>
                        </div>
                        {getStatusBadge(ord.orderStatus)}
                      </div>

                      <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        <p><strong>{t('العميل:', 'Customer:')}</strong> {ord.customer.name} - {ord.customer.phone}</p>
                        <p><strong>{t('العنوان:', 'Address:')}</strong> {ord.customer.city}، {ord.customer.address}</p>
                        <p><strong>{t('الإجمالي:', 'Total:')}</strong> {ord.total} {currency} ({ord.paymentStatus === 'paid' ? t('مدفوع', 'Paid') : t('الدفع عند الاستلام', 'Unpaid / COD')})</p>
                      </div>

                      {/* Items preview */}
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-[11px] font-bold text-gray-500 block mb-1">
                          {t('محتويات الطلب:', 'Items:')}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {ord.items.map((item, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#151D18] border border-gray-200 dark:border-gray-700 text-xs">
                              <span>{language === 'ar' ? item.productNameAr : item.productNameEn}</span>
                              <span className="font-bold text-[#0E7A5D]">×{item.quantity}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-xs">
                  {t('لم يتم العثور على أي طلب بهذا الرقم أو الهاتف. تأكد من إدخال البيانات بشكل صحيح.', 'No orders found matching this query.')}
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-400 text-xs">
                {t('اكتب رقم طلبك في الحقل أعلاه لتتبع مساره فورًا من العيادة إلى باب منزلك.', 'Enter order number above to track progress.')}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Pet Profiles */}
        {activeTab === 'pets' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm text-gray-900 dark:text-white">
                {t('ملفات حيواناتك المسجلة', 'Registered Pets')}
              </h4>
              <button
                onClick={() => setShowAddPet(!showAddPet)}
                className="px-3 py-1.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddPet ? t('إلغاء', 'Cancel') : t('إضافة أليف جديد', 'Add Pet')}</span>
              </button>
            </div>

            {showAddPet && (
              <form onSubmit={handleAddPet} className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1C2721] border border-gray-200 dark:border-gray-800 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">{t('اسم الأليف', 'Pet Name')} *</label>
                    <input
                      type="text"
                      required
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="ميشو / لوسي"
                      className="w-full p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151D18]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">{t('النوع', 'Species')}</label>
                    <select
                      value={species}
                      onChange={(e: any) => setSpecies(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151D18]"
                    >
                      <option value="cat">{t('قطة', 'Cat')}</option>
                      <option value="dog">{t('كلب', 'Dog')}</option>
                      <option value="bird">{t('طائر', 'Bird')}</option>
                      <option value="small_pet">{t('أليف صغير', 'Small Pet')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">{t('السلالة', 'Breed')}</label>
                    <input
                      type="text"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      placeholder="شيرازي / جولدن"
                      className="w-full p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151D18]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">{t('العمر', 'Age')}</label>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="1 سنة"
                      className="w-full p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151D18]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">{t('الوزن', 'Weight')}</label>
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="4 كجم"
                      className="w-full p-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#151D18]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold transition-colors"
                >
                  {t('حفظ ملف الأليف', 'Save Pet Profile')}
                </button>
              </form>
            )}

            {/* List existing pets */}
            <div className="space-y-3">
              {allPets.length > 0 ? (
                allPets.map((pet, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1C2721] border border-gray-200/80 dark:border-gray-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0E7A5D]/10 text-2xl flex items-center justify-center">
                        {pet.species === 'cat' ? '🐱' : pet.species === 'dog' ? '🐶' : '🐾'}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                          {pet.name}
                        </h5>
                        <p className="text-xs text-gray-500">
                          {pet.breed} • {pet.age} {pet.weight ? `• ${pet.weight}` : ''}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-[#0E7A5D] dark:text-[#2DD4BF] bg-[#0E7A5D]/10 px-2.5 py-1 rounded-lg">
                      {t('ملف صحي نشط بالعيادة', 'Active Vet Record')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400 text-xs">
                  {t('لم تسجل أي حيوان أليف بعد.', 'No pets registered yet.')}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
