import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Users, Search, Phone, MapPin, Heart, ShoppingBag } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { customers, t, language, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter((c) => {
    return (
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('إدارة العملاء وملفات الحيوانات', 'Customers & Pet Profiles')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t(`سجل عملاء العيادة والمتجر في سمالوط والمنيا (${customers.length} عميل)`, `Registered clients (${customers.length} customers)`)}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('بحث باسم العميل، رقم الهاتف، أو المنطقة...', 'Search customer name, phone, area...')}
            className="w-full p-2.5 pr-8 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCustomers.map((cust) => (
          <div
            key={cust.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base text-gray-900 dark:text-white">{cust.name}</h4>
                <p className="text-xs text-gray-500 dir-ltr text-right">{cust.phone}</p>
              </div>

              <div className="text-left text-xs">
                <span className="font-bold text-[#0E7A5D] block">{cust.totalSpent} {currency}</span>
                <span className="text-[10px] text-gray-400">{cust.ordersCount} {t('طلبات', 'orders')}</span>
              </div>
            </div>

            <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span>{cust.city} — {cust.address}</span>
            </div>

            {/* Pets Owned */}
            {cust.pets && cust.pets.length > 0 && (
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                <span className="text-[11px] font-bold text-gray-400 block mb-2">
                  {t('الحيوانات الأليفة المسجلة:', 'Registered Pets:')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cust.pets.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-gray-50 dark:bg-[#1F2C24] border border-gray-200 dark:border-gray-700 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span>{p.species === 'cat' ? '🐱' : '🐶'}</span>
                      <span className="font-bold">{p.name}</span>
                      <span className="text-gray-400 text-[10px]">({p.breed})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
