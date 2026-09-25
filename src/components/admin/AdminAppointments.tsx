import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AppointmentStatus, Appointment } from '../../types';
import {
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Phone,
  Edit3
} from 'lucide-react';

export const AdminAppointments: React.FC = () => {
  const { appointments, updateAppointmentStatus, deleteAppointment, t, language } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAppointments = appointments.filter((apt) => {
    const matchSearch =
      !searchQuery.trim() ||
      apt.appointmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.customerPhone.includes(searchQuery);
    const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">{t('مؤكد', 'Confirmed')}</span>;
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">{t('قيد المراجعة', 'Pending')}</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">{t('تم الكشف', 'Completed')}</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">{t('ملغي', 'Cancelled')}</span>;
      case 'rescheduled':
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">{t('مؤجل', 'Rescheduled')}</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('إدارة حجوزات ومواعيد العيادة البيطرية', 'Veterinary Clinic Appointments')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t('تأكيد وإلغاء وجدولة مواعيد الكشف والعمليات للحيوانات الأليفة في سمالوط', 'Review, confirm and manage clinical appointments')}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('بحث برقم الحجز، اسم المربي، اسم الأليف، الهاتف...', 'Search booking #, owner, pet, phone...')}
            className="w-full p-2.5 pr-8 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          >
            <option value="all">{t('جميع المواعيد', 'All Appointments')}</option>
            <option value="pending">{t('قيد المراجعة', 'Pending')}</option>
            <option value="confirmed">{t('مؤكدة', 'Confirmed')}</option>
            <option value="completed">{t('مكتملة', 'Completed')}</option>
            <option value="cancelled">{t('ملغية', 'Cancelled')}</option>
          </select>
        </div>
      </div>

      {/* Appointments List / Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16201B] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead className="bg-gray-50 dark:bg-[#1A2520] text-gray-600 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="p-3.5"># {t('الحجز', 'Booking #')}</th>
                <th className="p-3.5">{t('الخدمة المطلوبة', 'Service')}</th>
                <th className="p-3.5">{t('المربي / العميل', 'Pet Owner')}</th>
                <th className="p-3.5">{t('الحيوان الأليف', 'Pet Details')}</th>
                <th className="p-3.5">{t('الموعد والتاريخ', 'Date & Time')}</th>
                <th className="p-3.5">{t('الحالة', 'Status')}</th>
                <th className="p-3.5 text-center">{t('تغيير الحالة', 'Update Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1F2C24]">
                  <td className="p-3.5 font-mono font-bold text-[#0E7A5D]">
                    {apt.appointmentNumber}
                  </td>

                  <td className="p-3.5 font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? apt.serviceNameAr : apt.serviceNameEn}
                  </td>

                  <td className="p-3.5">
                    <p className="font-bold">{apt.customerName}</p>
                    <p className="text-[11px] text-gray-400 dir-ltr text-right">{apt.customerPhone}</p>
                  </td>

                  <td className="p-3.5">
                    <span className="font-bold text-[#0E7A5D]">{apt.petName}</span>
                    <span className="text-gray-400 text-[10px] block">
                      {apt.petSpecies === 'cat' ? '🐱 قطة' : apt.petSpecies === 'dog' ? '🐶 كلب' : '🐾 أليف'} {apt.petAge ? `(${apt.petAge})` : ''}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <p className="font-semibold text-gray-900 dark:text-white">{apt.preferredDate}</p>
                    <p className="text-[11px] text-gray-400">{apt.preferredTimeSlot}</p>
                  </td>

                  <td className="p-3.5">
                    {getStatusBadge(apt.status)}
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      {apt.status === 'pending' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700"
                        >
                          {t('تأكيد', 'Confirm')}
                        </button>
                      )}
                      {apt.status === 'confirmed' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px] hover:bg-blue-700"
                        >
                          {t('إتمام', 'Complete')}
                        </button>
                      )}
                      {apt.status !== 'cancelled' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                          className="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 text-[11px]"
                        >
                          {t('إلغاء', 'Cancel')}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
