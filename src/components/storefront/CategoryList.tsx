import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';

interface CategoryListProps {
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const { categories, t, language } = useStore();

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2.5 h-6 bg-[#0E7A5D] rounded-full"></span>
          <span>{t('تسوق حسب التصنيف', 'Shop by Category')}</span>
        </h3>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs font-bold text-[#0E7A5D] dark:text-[#2DD4BF] hover:underline"
          >
            {t('عرض جميع التصنيفات', 'View All Categories')}
          </button>
        )}
      </div>

      {/* Horizontal scrollable category bubbles */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
        <button
          onClick={() => onSelectCategory(null)}
          className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
            selectedCategory === null
              ? 'bg-[#0E7A5D] text-white border-[#0E7A5D] shadow-md shadow-[#0E7A5D]/20'
              : 'bg-white dark:bg-[#1A2520] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[#0E7A5D]'
          }`}
        >
          <span>🐾</span>
          <span>{t('كل المنتجات', 'All Products')}</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug || selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-[#0E7A5D] text-white border-[#0E7A5D] shadow-md shadow-[#0E7A5D]/20'
                  : 'bg-white dark:bg-[#1A2520] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[#0E7A5D]'
              }`}
            >
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.nameAr}
                  className="w-5 h-5 rounded-full object-cover"
                />
              )}
              <span>{language === 'ar' ? cat.nameAr : cat.nameEn}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
