import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus, PaymentStatus } from '../../types';
import {
  Package,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Archive,
  Phone,
  MapPin,
  X
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, updatePaymentStatus, toggleArchiveOrder, t, language, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const activeOrders = orders.filter((o) => !o.isArchived);

  const filteredOrders = activeOrders.filter((o) => {
    const matchesSearch =
      !searchQuery.trim() ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            {t('إدارة الطلبات الحالية', 'Current Orders Management')}
          </h2>
          <p className="text-xs text-gray-500">
            {t(`إجمالي الطلبات النشطة: ${activeOrders.length}`, `Active orders: ${activeOrders.length}`)}
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ابحث برقم الطلب، اسم العميل، أو الهاتف...', 'Search order #, customer, phone...')}
            className="w-full p-2.5 pr-9 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          >
            <option value="all">{t('جميع الحالات', 'All Statuses')}</option>
            <option value="new">{t('جديد', 'New')}</option>
            <option value="confirmed">{t('مؤكد', 'Confirmed')}</option>
            <option value="processing">{t('قيد التجهيز', 'Processing')}</option>
            <option value="ready">{t('جاهز للتسليم', 'Ready')}</option>
            <option value="shipped">{t('خرج مع المندوب', 'Shipped')}</option>
            <option value="delivered">{t('تم التوصيل', 'Delivered')}</option>
            <option value="cancelled">{t('ملغي', 'Cancelled')}</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16201B] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead className="bg-gray-50 dark:bg-[#1A2520] text-gray-600 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="p-3.5">{t('رقم الطلب', 'Order #')}</th>
                <th className="p-3.5">{t('العميل', 'Customer')}</th>
                <th className="p-3.5">{t('العنوان (سمالوط/المنيا)', 'Address')}</th>
                <th className="p-3.5">{t('الإجمالي', 'Total')}</th>
                <th className="p-3.5">{t('حالة الطلب', 'Order Status')}</th>
                <th className="p-3.5">{t('حالة الدفع', 'Payment')}</th>
                <th className="p-3.5 text-center">{t('إجراءات', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1F2C24]">
                  <td className="p-3.5 font-mono font-bold text-[#0E7A5D] dark:text-[#2DD4BF]">
                    {ord.orderNumber}
                    <span className="block text-[10px] text-gray-400 font-normal">
                      {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <p className="font-bold text-gray-900 dark:text-white">{ord.customer.name}</p>
                    <p className="text-[11px] text-gray-500 dir-ltr text-right">{ord.customer.phone}</p>
                  </td>

                  <td className="p-3.5 text-gray-600 dark:text-gray-300">
                    <p>{ord.customer.city}</p>
                    <p className="text-[11px] text-gray-400 truncate max-w-xs">{ord.customer.address}</p>
                  </td>

                  <td className="p-3.5 font-black text-gray-900 dark:text-white">
                    {ord.total} {currency}
                  </td>

                  <td className="p-3.5">
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E2B23] text-xs font-bold"
                    >
                      <option value="new">{t('جديد', 'New')}</option>
                      <option value="confirmed">{t('مؤكد', 'Confirmed')}</option>
                      <option value="processing">{t('قيد التجهيز', 'Processing')}</option>
                      <option value="ready">{t('جاهز', 'Ready')}</option>
                      <option value="shipped">{t('مع المندوب', 'Shipped')}</option>
                      <option value="delivered">{t('تم التوصيل', 'Delivered')}</option>
                      <option value="cancelled">{t('ملغي', 'Cancelled')}</option>
                      <option value="refunded">{t('مسترجع', 'Refunded')}</option>
                    </select>
                  </td>

                  <td className="p-3.5">
                    <select
                      value={ord.paymentStatus}
                      onChange={(e) => updatePaymentStatus(ord.id, e.target.value as PaymentStatus)}
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E2B23] text-xs font-bold"
                    >
                      <option value="pending">{t('معلق', 'Pending')}</option>
                      <option value="paid">{t('مدفوع', 'Paid')}</option>
                      <option value="partially_paid">{t('جزئي', 'Partial')}</option>
                      <option value="refunded">{t('مسترجع', 'Refunded')}</option>
                    </select>
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="p-2 rounded-lg text-gray-500 hover:text-[#0E7A5D] hover:bg-gray-100"
                        title={t('عرض التفاصيل والفاتورة', 'View Details')}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleArchiveOrder(ord.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-gray-100"
                        title={t('أرشفة الطلب في سجل المبيعات الدائم', 'Move to Sales Archive')}
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-lg text-gray-900 dark:text-white">
                  {t('تفاصيل الطلب:', 'Order Details:')} {selectedOrder.orderNumber}
                </h3>
                <span className="text-xs text-gray-400">
                  {new Date(selectedOrder.createdAt).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1C2721] text-xs space-y-1">
              <p><strong>{t('العميل:', 'Customer:')}</strong> {selectedOrder.customer.name}</p>
              <p><strong>{t('الهاتف:', 'Phone:')}</strong> {selectedOrder.customer.phone}</p>
              <p><strong>{t('العنوان:', 'Address:')}</strong> {selectedOrder.customer.city}، {selectedOrder.customer.address}</p>
              {selectedOrder.customer.notes && (
                <p><strong>{t('ملاحظات:', 'Notes:')}</strong> {selectedOrder.customer.notes}</p>
              )}
            </div>

            <div>
              <h5 className="font-bold text-xs mb-2">{t('المنتجات المطلوبة:', 'Ordered Products:')}</h5>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-gray-50 dark:bg-[#1C2721]">
                    <span>{language === 'ar' ? it.productNameAr : it.productNameEn} (×{it.quantity})</span>
                    <span className="font-bold">{it.totalPrice} {currency}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t text-xs flex justify-between font-black text-sm">
              <span>{t('الإجمالي:', 'Total:')}</span>
              <span className="text-[#0E7A5D]">{selectedOrder.total} {currency}</span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {t('إغلاق النافذة', 'Close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
