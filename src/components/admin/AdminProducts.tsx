import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { AdminExcelImportModal } from './AdminExcelImportModal';
import {
  Plus,
  Search,
  FileSpreadsheet,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle,
  AlertCircle,
  Filter,
  X
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    t,
    language,
    settings
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [category, setCategory] = useState('cat-food');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'bird' | 'small_pet' | 'all'>('cat');
  const [brand, setBrand] = useState('Animal World');
  const [price, setPrice] = useState(200);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState(20);
  const [sku, setSku] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVetsPick, setIsVetsPick] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !categoryFilter || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setNameAr('');
    setNameEn('');
    setDescriptionAr('');
    setDescriptionEn('');
    setCategory(categories[0]?.slug || 'cat-food');
    setPetType('cat');
    setBrand('Animal World Select');
    setPrice(250);
    setSalePrice(undefined);
    setStock(25);
    setSku(`AW-PROD-${Date.now().toString().slice(-4)}`);
    setImageUrl('https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800');
    setIsFeatured(false);
    setIsVetsPick(false);
    setIsBestSeller(false);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setNameAr(prod.nameAr);
    setNameEn(prod.nameEn);
    setDescriptionAr(prod.descriptionAr);
    setDescriptionEn(prod.descriptionEn);
    setCategory(prod.category);
    setPetType(prod.petType);
    setBrand(prod.brand);
    setPrice(prod.price);
    setSalePrice(prod.salePrice);
    setStock(prod.stock);
    setSku(prod.sku);
    setImageUrl(prod.images[0] || '');
    setIsFeatured(!!prod.isFeatured);
    setIsVetsPick(!!prod.isVetsPick);
    setIsBestSeller(!!prod.isBestSeller);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPercentage =
      salePrice && salePrice < price
        ? Math.round(((price - salePrice) / price) * 100)
        : undefined;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        nameAr,
        nameEn: nameEn || nameAr,
        descriptionAr,
        descriptionEn: descriptionEn || descriptionAr,
        category,
        petType,
        brand,
        price,
        salePrice: salePrice || undefined,
        discountPercentage,
        stock,
        sku,
        images: imageUrl ? [imageUrl] : editingProduct.images,
        isFeatured,
        isVetsPick,
        isBestSeller
      });
    } else {
      addProduct({
        sku,
        nameAr,
        nameEn: nameEn || nameAr,
        descriptionAr,
        descriptionEn: descriptionEn || descriptionAr,
        category,
        petType,
        brand,
        price,
        salePrice: salePrice || undefined,
        discountPercentage,
        stock,
        lowStockThreshold: 5,
        images: [imageUrl || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800'],
        isFeatured,
        isVetsPick,
        isBestSeller,
        published: true,
        rating: 5.0,
        reviewCount: 0
      });
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف المنتج: ${name}؟` : `Delete product: ${name}?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            {t('إدارة كتالوج المنتجات', 'Products Management')}
          </h2>
          <p className="text-xs text-gray-500">
            {t(`إجمالي المنتجات المسجلة: ${products.length} منتج`, `Total registered items: ${products.length}`)}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Excel Import CTA Button as requested */}
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{t('استيراد منتجات من إكسيل (Excel)', 'Import from Excel')}</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('إضافة منتج جديد', 'Add Product')}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('ابحث بالاسم العربي أو الإنجليزي أو كود SKU...', 'Search name or SKU...')}
            className="w-full p-2.5 pr-9 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          >
            <option value="">{t('جميع التصنيفات', 'All Categories')}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {language === 'ar' ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16201B] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead className="bg-gray-50 dark:bg-[#1A2520] text-gray-600 dark:text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="p-3.5">{t('المنتج', 'Product')}</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">{t('التصنيف', 'Category')}</th>
                <th className="p-3.5">{t('السعر', 'Price')}</th>
                <th className="p-3.5">{t('المخزون', 'Stock')}</th>
                <th className="p-3.5">{t('شارات التمييز', 'Badges')}</th>
                <th className="p-3.5">{t('النشر', 'Status')}</th>
                <th className="p-3.5 text-center">{t('إجراءات', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.stock <= 0;
                const isLowStock = !isOutOfStock && p.stock <= p.lowStockThreshold;

                return (
                  <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1F2C24] transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.nameAr}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-gray-700 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white line-clamp-1">
                            {language === 'ar' ? p.nameAr : p.nameEn}
                          </p>
                          <p className="text-[11px] text-gray-400">{p.brand}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-gray-500">{p.sku}</td>

                    <td className="p-3.5 text-gray-600 dark:text-gray-300">
                      {p.category}
                    </td>

                    <td className="p-3.5">
                      <div>
                        <span className="font-black text-[#0E7A5D] dark:text-[#2DD4BF]">
                          {p.salePrice || p.price} {currency}
                        </span>
                        {p.salePrice && (
                          <span className="text-[10px] text-gray-400 line-through block">
                            {p.price} {currency}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5">
                      {isOutOfStock ? (
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold">
                          0 ({t('نفد', 'Out')})
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
                          {p.stock} ({t('منخفض', 'Low')})
                        </span>
                      ) : (
                        <span className="font-bold text-emerald-600">{p.stock}</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.isVetsPick && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {t('بيطري', 'Vet')}
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                            {t('الأكثر مبيعًا', 'Top')}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => updateProduct(p.id, { published: !p.published })}
                        className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                          p.published
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={p.published ? t('منشور (انقر لإخفائه)', 'Published') : t('مخفي (انقر للظهور)', 'Draft')}
                      >
                        {p.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        <span>{p.published ? t('منشور', 'Live') : t('مسودة', 'Draft')}</span>
                      </button>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 rounded-lg text-gray-500 hover:text-[#0E7A5D] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title={t('تعديل', 'Edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.nameAr)}
                          className="p-2 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title={t('حذف', 'Delete')}
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#1A2520]">
              <h3 className="font-black text-lg text-gray-900 dark:text-white">
                {editingProduct ? t('تعديل بيانات المنتج', 'Edit Product') : t('إضافة منتج جديد', 'Add Product')}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">{t('اسم المنتج (بالعربية)', 'Product Name (Arabic)')} *</label>
                  <input
                    type="text"
                    required
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">{t('اسم المنتج (بالإنجليزية)', 'Product Name (English)')}</label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">{t('التصنيف', 'Category')}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {language === 'ar' ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">{t('فئة الحيوان', 'Pet Type')}</label>
                  <select
                    value={petType}
                    onChange={(e: any) => setPetType(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  >
                    <option value="cat">{t('قطط', 'Cats')}</option>
                    <option value="dog">{t('كلاب', 'Dogs')}</option>
                    <option value="bird">{t('طيور', 'Birds')}</option>
                    <option value="all">{t('الكل', 'All Pets')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">{t('السعر العادي (ج.م)', 'Regular Price')} *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">{t('سعر الخصم / العرض (اختياري)', 'Sale Price (Optional)')}</label>
                  <input
                    type="number"
                    min="0"
                    value={salePrice || ''}
                    onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="اختياري"
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">{t('الكمية بالمخزون', 'Stock Quantity')} *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">{t('رابط الصورة (Image URL)', 'Image URL')}</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">{t('الوصف (عربي)', 'Description (Arabic)')}</label>
                <textarea
                  rows={2}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <span>{t('منتج مميز', 'Featured')}</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVetsPick}
                    onChange={(e) => setIsVetsPick(e.target.checked)}
                  />
                  <span>{t('ترشيح الطبيب البيطري', "Vet's Pick")}</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                  />
                  <span>{t('الأكثر مبيعًا', 'Best Seller')}</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold"
                >
                  {t('إلغاء', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md"
                >
                  {t('حفظ المنتج', 'Save Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Excel Import Modal */}
      <AdminExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
      />
    </div>
  );
};
