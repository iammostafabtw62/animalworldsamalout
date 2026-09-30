import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { StaffUser, StaffRole } from '../../types';
import { Users, Plus, ShieldCheck, Check, X, Lock } from 'lucide-react';

export const AdminTeam: React.FC = () => {
  const { staffList, addStaff, updateStaff, t, language } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<StaffRole>('store_manager');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !name.trim()) return;

    addStaff({
      username,
      name,
      role,
      email: email || undefined,
      phone: phone || undefined,
      permissions: {
        canViewDashboard: true,
        canManageProducts: role === 'store_manager' || role === 'super_admin',
        canManageOrders: role === 'store_manager' || role === 'order_manager' || role === 'super_admin',
        canViewSalesArchive: role === 'store_manager' || role === 'super_admin',
        canManageAppointments: role === 'veterinarian' || role === 'super_admin',
        canManageCustomers: true,
        canManageContent: role === 'content_manager' || role === 'super_admin',
        canManageSettings: role === 'super_admin',
        canManageTeam: role === 'super_admin'
      },
      active: true
    });

    setIsModalOpen(false);
    setUsername('');
    setName('');
    setEmail('');
    setPhone('');
  };

  const getRoleLabel = (r: StaffRole) => {
    switch (r) {
      case 'super_admin':
        return t('مدير عام (Super Admin)', 'Super Admin');
      case 'store_manager':
        return t('مدير متجر ومبيعات', 'Store Manager');
      case 'veterinarian':
        return t('طبيب بيطري بالعيادة', 'Veterinarian');
      case 'order_manager':
        return t('مدير طلبات وتوصيل', 'Order Manager');
      case 'content_manager':
        return t('مسؤول محتوى ومقالات', 'Content Manager');
      default:
        return r;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('إدارة فريق العمل والصلاحيات', 'Team & Permissions Management')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t('إنشاء حسابات الموظفين والأطباء البيطريين وتحديد مستويات الوصول لكل دور', 'Manage staff roles and access control')}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t('إضافة عضو فريق جديد', 'Add Team Member')}</span>
        </button>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map((st) => (
          <div
            key={st.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0E7A5D]/10 text-[#0E7A5D] flex items-center justify-center font-bold">
                  {st.role === 'veterinarian' ? '🩺' : '👤'}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{st.name}</h4>
                  <span className="text-[11px] text-gray-400 font-mono">@{st.username}</span>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {st.active ? t('نشط', 'Active') : t('معطل', 'Inactive')}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#1F2C24] text-xs font-bold text-[#0E7A5D] dark:text-[#2DD4BF]">
              {getRoleLabel(st.role)}
            </div>

            <div className="space-y-1 text-xs text-gray-500">
              <p><strong>{t('صلاحيات المنتجات:', 'Products:')}</strong> {st.permissions.canManageProducts ? '✓ مسموح' : '✗ غير مسموح'}</p>
              <p><strong>{t('صلاحيات الطلبات:', 'Orders:')}</strong> {st.permissions.canManageOrders ? '✓ مسموح' : '✗ غير مسموح'}</p>
              <p><strong>{t('صلاحيات العيادة:', 'Clinic:')}</strong> {st.permissions.canManageAppointments ? '✓ مسموح' : '✗ غير مسموح'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                {t('إضافة عضو فريق عمل', 'Add Staff Member')}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t('اسم الموظف / الطبيب', 'Full Name')} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="د. أحمد مصطفى"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">{t('اسم المستخدم لتسجيل الدخول (Username)', 'Username')} *</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="dr_ahmed"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">{t('الدور الوظيفي والصلاحيات', 'Role')}</label>
                <select
                  value={role}
                  onChange={(e: any) => setRole(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                >
                  <option value="veterinarian">{t('طبيب بيطري (حجوزات العيادة والحيوانات)', 'Veterinarian')}</option>
                  <option value="store_manager">{t('مدير متجر (المنتجات والمخزون والطلبات)', 'Store Manager')}</option>
                  <option value="order_manager">{t('مسؤول طلبات وتوصيل', 'Order Manager')}</option>
                  <option value="content_manager">{t('مدير محتوى ومقالات', 'Content Manager')}</option>
                  <option value="super_admin">{t('مدير نظام كامل الصلاحيات', 'Super Admin')}</option>
                </select>
              </div>

              <div className="pt-3 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold"
                >
                  {t('إلغاء', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0E7A5D] text-white text-xs font-bold shadow-md"
                >
                  {t('إنشاء الحساب', 'Create Staff Account')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
