import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';
import { FolderTree, Plus, Edit, Trash2, X } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, t, language } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [image, setImage] = useState('');

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setNameAr('');
    setNameEn('');
    setDescriptionAr('');
    setDescriptionEn('');
    setImage('https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setNameAr(cat.nameAr);
    setNameEn(cat.nameEn);
    setDescriptionAr(cat.descriptionAr || '');
    setDescriptionEn(cat.descriptionEn || '');
    setImage(cat.image || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        nameAr,
        nameEn: nameEn || nameAr,
        descriptionAr,
        descriptionEn: descriptionEn || descriptionAr,
        image
      });
    } else {
      addCategory({
        slug: nameEn ? nameEn.toLowerCase().replace(/\s+/g, '-') : `cat-${Date.now()}`,
        nameAr,
        nameEn: nameEn || nameAr,
        descriptionAr,
        descriptionEn: descriptionEn || descriptionAr,
        image: image || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600',
        featured: true
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('إدارة تصنيفات المنتجات', 'Categories Management')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t(`إجمالي التصنيفات الحالية: ${categories.length}`, `Total categories: ${categories.length}`)}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t('إضافة تصنيف جديد', 'Add Category')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.nameAr}
                  className="w-12 h-12 rounded-2xl object-cover shrink-0"
                />
              )}
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                  {language === 'ar' ? cat.nameAr : cat.nameEn}
                </h4>
                <p className="text-[11px] text-gray-400 font-mono truncate">{cat.slug}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleOpenEdit(cat)}
                className="p-1.5 text-gray-400 hover:text-[#0E7A5D] hover:bg-gray-100 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(t('حذف هذا التصنيف؟', 'Delete category?'))) {
                    deleteCategory(cat.id);
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                {editingCategory ? t('تعديل التصنيف', 'Edit Category') : t('إضافة تصنيف جديد', 'Add Category')}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">{t('الاسم بالعربية', 'Name (Arabic)')} *</label>
                <input
                  type="text"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">{t('الاسم بالإنجليزية', 'Name (English)')}</label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">{t('رابط الصورة (Image URL)', 'Image URL')}</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
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
                  {t('حفظ', 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
