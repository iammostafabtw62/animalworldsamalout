import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  DollarSign,
  Package,
  Calendar,
  AlertTriangle,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { orders, products, appointments, customers, t, language, settings } = useStore();

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  // Real calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'new' || o.orderStatus === 'processing');
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'delivered');
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);
  const pendingAppointments = appointments.filter((a) => a.status === 'pending');

  // Sales by Category
  const categorySalesMap: Record<string, number> = {};
  orders.forEach((o) => {
    o.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      const cat = prod?.category || 'other';
      categorySalesMap[cat] = (categorySalesMap[cat] || 0) + item.totalPrice;
    });
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          {t('لوحة المؤشرات والتحليلات العامة', 'Dashboard Overview & Analytics')}
        </h2>
        <p className="text-xs text-gray-500">
          {t('إحصائيات مباشرة وفورية لحركة المبيعات، الطلبات، وحجوزات عيادة عالم الحيوان بسمالوط', 'Live real-time operational data')}
        </p>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">{t('إجمالي الإيرادات', 'Total Revenue')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {totalRevenue.toLocaleString()} <span className="text-xs font-bold text-[#0E7A5D]">{currency}</span>
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t('محدث تلقائيًا من الطلبات الفعلية', 'Synced with real orders')}</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">{t('إجمالي الطلبات', 'Total Orders')}</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">{orders.length}</p>
          <p className="text-[11px] text-gray-400 mt-2">
            {pendingOrders.length} {t('طلب قيد التنفيذ حاليًا', 'pending')}
          </p>
        </div>

        {/* Vet Appointments */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">{t('حجوزات العيادة', 'Vet Appointments')}</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">{appointments.length}</p>
          <p className="text-[11px] text-purple-600 font-bold mt-2">
            {pendingAppointments.length} {t('بانتظار التأكيد', 'pending confirmation')}
          </p>
        </div>

        {/* Low Stock Alert */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#16201B] border border-amber-200 dark:border-amber-900/40 shadow-xs">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-bold">{t('نواقص المخزون', 'Low Stock Items')}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600">{lowStockProducts.length}</p>
          <p className="text-[11px] text-gray-400 mt-2">
            {t('أصناف وصلت للحد الأدنى', 'Items under threshold')}
          </p>
        </div>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              {t('أحدث الطلبات المستلمة', 'Recent Incoming Orders')}
            </h3>
            <span className="text-xs text-[#0E7A5D] font-bold">AW Store</span>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((ord) => (
              <div
                key={ord.id}
                className="p-3 rounded-2xl bg-gray-50 dark:bg-[#1F2C24] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-[#0E7A5D]">{ord.orderNumber}</span>
                  <p className="text-gray-900 dark:text-white font-semibold mt-0.5">{ord.customer.name}</p>
                </div>
                <div className="text-left">
                  <span className="font-bold text-gray-900 dark:text-white block">{ord.total} {currency}</span>
                  <span className="text-[10px] text-gray-400">{ord.orderStatus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments Box */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              {t('مواعيد العيادة القادمة في سمالوط', 'Upcoming Clinic Bookings')}
            </h3>
            <span className="text-xs text-[#0E7A5D] font-bold">Vet Clinic</span>
          </div>

          <div className="space-y-3">
            {appointments.slice(0, 4).map((apt) => (
              <div
                key={apt.id}
                className="p-3 rounded-2xl bg-gray-50 dark:bg-[#1F2C24] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-[#0E7A5D]">{apt.petName} ({apt.petSpecies === 'cat' ? 'قطة' : 'كلب'})</span>
                  <p className="text-gray-900 dark:text-white font-semibold mt-0.5">
                    {language === 'ar' ? apt.serviceNameAr : apt.serviceNameEn}
                  </p>
                </div>
                <div className="text-left">
                  <span className="font-bold text-gray-500 block">{apt.preferredDate}</span>
                  <span className="text-[10px] text-[#0E7A5D] font-semibold">{apt.preferredTimeSlot}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
