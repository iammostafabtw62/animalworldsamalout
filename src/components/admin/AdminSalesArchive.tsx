import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Archive, Search, Filter, Calendar, Download, RefreshCw, User, CheckCircle2 } from 'lucide-react';
import * as XLSX from 'xlsx';

export const AdminSalesArchive: React.FC = () => {
  const { orders, t, language, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  // Filtered Archive records
  const archiveRecords = useMemo(() => {
    return orders.filter((ord) => {
      const matchSearch =
        !searchQuery.trim() ||
        ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customer.phone.includes(searchQuery) ||
        ord.items.some((i) => i.productNameAr.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchPayment = paymentFilter === 'all' || ord.paymentStatus === paymentFilter;
      const matchStatus = statusFilter === 'all' || ord.orderStatus === statusFilter;

      let matchDate = true;
      if (startDate) {
        matchDate = matchDate && new Date(ord.createdAt) >= new Date(startDate);
      }
      if (endDate) {
        matchDate = matchDate && new Date(ord.createdAt) <= new Date(`${endDate}T23:59:59`);
      }

      return matchSearch && matchPayment && matchStatus && matchDate;
    });
  }, [orders, searchQuery, paymentFilter, statusFilter, startDate, endDate]);

  const totalPages = Math.ceil(archiveRecords.length / pageSize) || 1;
  const paginatedRecords = archiveRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalRevenue = useMemo(() => {
    return archiveRecords.reduce((sum, ord) => sum + ord.total, 0);
  }, [archiveRecords]);

  // Export Archive to Excel
  const handleExportExcel = () => {
    const rows = archiveRecords.map((ord) => ({
      'Order ID': ord.orderNumber,
      Date: new Date(ord.createdAt).toLocaleDateString(),
      Time: new Date(ord.createdAt).toLocaleTimeString(),
      Customer: ord.customer.name,
      Phone: ord.customer.phone,
      Address: `${ord.customer.city} - ${ord.customer.address}`,
      Products: ord.items.map((i) => `${i.productNameAr} (x${i.quantity})`).join(', '),
      Total: ord.total,
      'Payment Status': ord.paymentStatus,
      'Order Status': ord.orderStatus,
      'Staff Handled': ord.handledByStaff || 'Admin'
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Archive');
    XLSX.writeFile(wb, `animal_world_sales_archive_${Date.now()}.xlsx`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Archive className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('أرشيف وسجل المبيعات الدائم', 'Permanent Sales & Orders Archive')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t(
              'سجل تاريخي دائم لجميع العمليات والمبيعات لا يتم حذفه افتراضيًا للرجوع إليه ومراجعته في أي وقت.',
              'Permanent historical sales records preserved for auditing, reporting, and accounting.'
            )}
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>{t('تصدير السجل إلى Excel', 'Export Archive to Excel')}</span>
        </button>
      </div>

      {/* Filter and Query Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t('بحث برقم الطلب، العميل، الهاتف...', 'Search order, customer, phone...')}
              className="w-full p-2.5 pr-8 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <div>
            <select
              value={paymentFilter}
              onChange={(e) => {
                setPaymentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
            >
              <option value="all">{t('جميع حالات الدفع', 'All Payment Statuses')}</option>
              <option value="paid">{t('مدفوع', 'Paid')}</option>
              <option value="pending">{t('معلق', 'Pending')}</option>
              <option value="refunded">{t('مسترجع', 'Refunded')}</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              title={t('من تاريخ', 'Start Date')}
              className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
            />
          </div>

          <div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              title={t('إلى تاريخ', 'End Date')}
              className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
            />
          </div>
        </div>

        {/* Revenue Summary Pill */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100 dark:border-gray-800">
          <span className="text-gray-500">
            {t(`إجمالي العمليات المطابقة: ${archiveRecords.length}`, `Matching Records: ${archiveRecords.length}`)}
          </span>
          <span className="font-bold text-[#0E7A5D] dark:text-[#2DD4BF]">
            {t('إجمالي قيمة المبيعات:', 'Total Value:')} {totalRevenue} {currency}
          </span>
        </div>
      </div>

      {/* Archive Records Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16201B] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead className="bg-gray-50 dark:bg-[#1A2520] text-gray-600 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="p-3.5"># {t('الطلب', 'Order')}</th>
                <th className="p-3.5">{t('التاريخ والوقت', 'Date & Time')}</th>
                <th className="p-3.5">{t('العميل', 'Customer')}</th>
                <th className="p-3.5">{t('المنتجات المباعة', 'Items Sold')}</th>
                <th className="p-3.5">{t('المبلغ الإجمالي', 'Total')}</th>
                <th className="p-3.5">{t('حالة الدفع', 'Payment')}</th>
                <th className="p-3.5">{t('حالة التسليم', 'Fulfillment')}</th>
                <th className="p-3.5">{t('المسؤول', 'Staff')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginatedRecords.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1F2C24]">
                  <td className="p-3.5 font-mono font-bold text-[#0E7A5D] dark:text-[#2DD4BF]">
                    {ord.orderNumber}
                  </td>
                  <td className="p-3.5 text-gray-500">
                    <p>{new Date(ord.createdAt).toLocaleDateString()}</p>
                    <p className="text-[10px]">{new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold text-gray-900 dark:text-white">{ord.customer.name}</p>
                    <p className="text-[10px] text-gray-400 dir-ltr text-right">{ord.customer.phone}</p>
                  </td>
                  <td className="p-3.5">
                    <div className="space-y-0.5 max-w-xs">
                      {ord.items.map((it, i) => (
                        <p key={i} className="text-[11px] text-gray-600 dark:text-gray-300 truncate">
                          • {language === 'ar' ? it.productNameAr : it.productNameEn} (×{it.quantity})
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 font-black text-gray-900 dark:text-white">
                    {ord.total} {currency}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.paymentStatus === 'paid' ? t('تم الدفع', 'Paid') : t('معلق', 'Pending')}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="p-3.5 text-gray-400 text-[11px]">
                    {ord.handledByStaff || 'Admin'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-500">
              {t(`الصفحة ${currentPage} من ${totalPages}`, `Page ${currentPage} of ${totalPages}`)}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1.5 rounded-lg border text-gray-600 disabled:opacity-40"
              >
                {t('السابق', 'Previous')}
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg border text-gray-600 disabled:opacity-40"
              >
                {t('التالي', 'Next')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
