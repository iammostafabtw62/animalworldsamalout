import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Layers, Search, Filter, AlertTriangle, CheckCircle2, XCircle, Plus, Minus } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, updateStock, updateProduct, t, language, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const isOut = p.stock <= 0;
    const isLow = !isOut && p.stock <= p.lowStockThreshold;
    const isIn = p.stock > p.lowStockThreshold;

    let matchStatus = true;
    if (stockStatusFilter === 'out_of_stock') matchStatus = isOut;
    if (stockStatusFilter === 'low_stock') matchStatus = isLow;
    if (stockStatusFilter === 'in_stock') matchStatus = isIn;

    return matchSearch && matchStatus;
  });

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('إدارة المخزون والتوريدات', 'Inventory & Stock Control')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t('مراقبة مستويات المخزون، تنبيهات النواقص، والتعديل الفوري للكميات', 'Track stock levels, low thresholds, and adjust counts')}
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">{t('إجمالي الأصناف بالمخزن', 'Total Products')}</span>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{products.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            📦
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-amber-200 dark:border-amber-900/40 flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-600 font-bold">{t('أصناف منخفضة المخزون', 'Low Stock Warning')}</span>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length}
            </p>
          </div>
          <AlertTriangle className="w-8 h-8 text-amber-500" />
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
          <div>
            <span className="text-xs text-rose-600 font-bold">{t('أصناف نفدت تمامًا', 'Out of Stock')}</span>
            <p className="text-2xl font-black text-rose-600 mt-1">
              {products.filter((p) => p.stock <= 0).length}
            </p>
          </div>
          <XCircle className="w-8 h-8 text-rose-500" />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ابحث بالاسم أو كود SKU...', 'Search name or SKU...')}
            className="w-full p-2.5 pr-8 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={stockStatusFilter}
            onChange={(e: any) => setStockStatusFilter(e.target.value)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          >
            <option value="all">{t('جميع حالات المخزون', 'All Statuses')}</option>
            <option value="in_stock">{t('متوفر بوفرة', 'In Stock')}</option>
            <option value="low_stock">{t('أوشك على النفاد', 'Low Stock')}</option>
            <option value="out_of_stock">{t('نافد من المخزون', 'Out of Stock')}</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16201B] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead className="bg-gray-50 dark:bg-[#1A2520] text-gray-600 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="p-3.5">{t('المنتج', 'Product')}</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">{t('السعر', 'Price')}</th>
                <th className="p-3.5">{t('الكمية الحالية', 'Current Stock')}</th>
                <th className="p-3.5">{t('حد التنبيه الأدنى', 'Low Alert Limit')}</th>
                <th className="p-3.5">{t('الحالة', 'Status')}</th>
                <th className="p-3.5 text-center">{t('تعديل سريع للرصيد', 'Quick Stock Adjustment')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock <= 0;
                const isLowStock = !isOutOfStock && p.stock <= p.lowStockThreshold;

                return (
                  <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1F2C24]">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.nameAr}
                          className="w-10 h-10 rounded-xl object-cover border shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{language === 'ar' ? p.nameAr : p.nameEn}</p>
                          <p className="text-[10px] text-gray-400">{p.brand}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-gray-500">{p.sku}</td>

                    <td className="p-3.5 font-bold text-gray-900 dark:text-white">
                      {p.salePrice || p.price} {currency}
                    </td>

                    <td className="p-3.5">
                      <span className="font-black text-sm text-gray-900 dark:text-white">{p.stock}</span>
                    </td>

                    <td className="p-3.5">
                      <input
                        type="number"
                        min="1"
                        value={p.lowStockThreshold}
                        onChange={(e) => updateProduct(p.id, { lowStockThreshold: Number(e.target.value) })}
                        className="w-16 p-1 text-center rounded border border-gray-300 dark:border-gray-700 bg-transparent text-xs"
                      />
                    </td>

                    <td className="p-3.5">
                      {isOutOfStock ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                          {t('نفد من المخزون', 'Out of Stock')}
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          {t('منخفض', 'Low Stock')}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {t('متوفر', 'In Stock')}
                        </span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => updateStock(p.id, p.stock - 1)}
                          disabled={p.stock <= 0}
                          className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 text-gray-600 disabled:opacity-40"
                          title="-1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateStock(p.id, p.stock + 1)}
                          className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 text-gray-600"
                          title="+1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateStock(p.id, p.stock + 10)}
                          className="px-2 py-1 rounded-lg bg-[#0E7A5D]/10 hover:bg-[#0E7A5D]/20 text-[#0E7A5D] font-bold text-[10px]"
                          title="+10"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => updateStock(p.id, 0)}
                          className="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 font-bold text-[10px]"
                        >
                          {t('تصفير', 'Zero')}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
