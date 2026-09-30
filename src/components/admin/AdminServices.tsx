import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { VeterinaryService } from '../../types';
import { Stethoscope, Plus, Edit, Trash2, CheckCircle2, Clock, X } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const { services, addService, updateService, deleteService, t, language, settings } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<VeterinaryService | null>(null);

  // Form state
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [price, setPrice] = useState<number | undefined>(150);
  const [image, setImage] = useState('');

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  const handleOpenAdd = () => {
    setEditingService(null);
    setNameAr('');
    setNameEn('');
    setDescriptionAr('');
    setDescriptionEn('');
    setDurationMinutes(30);
    setPrice(150);
    setImage('https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: VeterinaryService) => {
    setEditingService(srv);
    setNameAr(srv.nameAr);
    setNameEn(srv.nameEn);
    setDescriptionAr(srv.descriptionAr);
    setDescriptionEn(srv.descriptionEn);
    setDurationMinutes(srv.durationMinutes);
    setPrice(srv.price);
    setImage(srv.image || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, {
        nameAr,
        nameEn: nameEn || nameAr,
        descriptionAr,
        descriptionEn: descriptionEn || descriptionAr,
        durationMinutes,
        price,
        image
      });
    } else {
      addService({
        slug: nameEn ? nameEn.toLowerCase().replace(/\s+/g, '-') : `service-${Date.now()}`,
        nameAr,
        nameEn: nameEn || nameAr,
        descriptionAr,
        descriptionEn: descriptionEn || descriptionAr,
        durationMinutes,
        price,
        available: true,
        image: image || 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('إدارة الخدمات البيطرية بالعيادة', 'Veterinary Services Management')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t('تعديل وإضافة باقات الفحص، العمليات، والتطعيمات المتاحة للحجز في سمالوط', 'Add or edit veterinary clinical procedures')}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t('إضافة خدمة بيطرية', 'Add Vet Service')}</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-base text-gray-900 dark:text-white">
                  {language === 'ar' ? srv.nameAr : srv.nameEn}
                </span>
                <button
                  onClick={() => updateService(srv.id, { available: !srv.available })}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    srv.available
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {srv.available ? t('متاح للحجز', 'Available') : t('معطل مؤقتًا', 'Paused')}
                </button>
              </div>

              <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-3">
                {language === 'ar' ? srv.descriptionAr : srv.descriptionEn}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{srv.durationMinutes} {t('دقيقة', 'mins')}</span>
                </span>

                <span className="font-bold text-[#0E7A5D] text-sm">
                  {srv.price ? `${srv.price} ${currency}` : t('يحدد حسب الحالة', 'By Case')}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(srv)}
                className="p-2 text-gray-500 hover:text-[#0E7A5D] hover:bg-gray-100 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(t('حذف هذه الخدمة؟', 'Delete service?'))) {
                    deleteService(srv.id);
                  }
                }}
                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                {editingService ? t('تعديل الخدمة البيطرية', 'Edit Vet Service') : t('إضافة خدمة بيطرية جديدة', 'Add New Vet Service')}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t('اسم الخدمة (عربي)', 'Name (Arabic)')} *</label>
                <input
                  type="text"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">{t('اسم الخدمة (إنجليزي)', 'Name (English)')}</label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">{t('مدة الكشف (دقيقة)', 'Duration (mins)')}</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">{t('السعر التقديري (ج.م)', 'Price (EGP)')}</label>
                  <input
                    type="number"
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">{t('الوصف والتفاصيل', 'Description')}</label>
                <textarea
                  rows={3}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
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
                  {t('حفظ الخدمة', 'Save Service')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
