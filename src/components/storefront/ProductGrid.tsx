import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  onQuickView: (product: Product) => void;
  selectedCategory: string | null;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onQuickView,
  selectedCategory,
  searchQuery
}) => {
  const { products, t, settings } = useStore();
  const [selectedPet, setSelectedPet] = useState<'all' | 'dog' | 'cat'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'rating'>('recommended');
  const [filterVetsPick, setFilterVetsPick] = useState(false);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.published);

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nameAr.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.descriptionAr.toLowerCase().includes(q) ||
          p.descriptionEn.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory) {
      list = list.filter(
        (p) => p.category === selectedCategory || p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by pet type
    if (selectedPet !== 'all') {
      list = list.filter((p) => p.petType === selectedPet || p.petType === 'all');
    }

    // Filter by Vet's Pick
    if (filterVetsPick) {
      list = list.filter((p) => p.isVetsPick);
    }

    // Sort
    list.sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

    return list;
  }, [products, searchQuery, selectedCategory, selectedPet, filterVetsPick, sortBy]);

  return (
    <div className="py-6">
      {/* Filter and Sort Toolbar */}
      <div className="bg-white dark:bg-[#16201B] p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Pet Type Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-[#1E2B23] rounded-xl text-xs font-bold">
          <button
            onClick={() => setSelectedPet('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedPet === 'all'
                ? 'bg-white dark:bg-[#151D18] text-[#0E7A5D] dark:text-[#2DD4BF] shadow-xs'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {t('الكل', 'All Pets')}
          </button>
          <button
            onClick={() => setSelectedPet('dog')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedPet === 'dog'
                ? 'bg-white dark:bg-[#151D18] text-[#0E7A5D] dark:text-[#2DD4BF] shadow-xs'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            🐶 {t('كلاب', 'Dogs')}
          </button>
          <button
            onClick={() => setSelectedPet('cat')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedPet === 'cat'
                ? 'bg-white dark:bg-[#151D18] text-[#0E7A5D] dark:text-[#2DD4BF] shadow-xs'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            🐱 {t('قطط', 'Cats')}
          </button>
        </div>

        {/* Vet Pick Quick Toggle */}
        <button
          onClick={() => setFilterVetsPick(!filterVetsPick)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
            filterVetsPick
              ? 'bg-[#0E7A5D] text-white border-[#0E7A5D]'
              : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#0E7A5D]'
          }`}
        >
          <span>🩺</span>
          <span>{t('ترشيحات الطبيب البيطري فقط', "Vet's Picks Only")}</span>
        </button>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
          <span>{t('الترتيب:', 'Sort by:')}</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-gray-50 dark:bg-[#1E2B23] border border-gray-200 dark:border-gray-700 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#0E7A5D]"
          >
            <option value="recommended">{t('المقترح والمميز', 'Recommended')}</option>
            <option value="price_asc">{t('السعر: من الأقل للأعلى', 'Price: Low to High')}</option>
            <option value="price_desc">{t('السعر: من الأعلى للأقل', 'Price: High to Low')}</option>
            <option value="rating">{t('الأعلى تقييمًا', 'Highest Rated')}</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty State with Mascot */
        <div className="text-center py-16 px-4 bg-white dark:bg-[#16201B] rounded-3xl border border-dashed border-gray-300 dark:border-gray-800">
          <img
            src={settings.emptyStateImage}
            alt="No products found"
            className="w-40 h-40 object-cover mx-auto rounded-2xl mb-4 border border-gray-200 dark:border-gray-700"
          />
          <h4 className="text-xl font-black text-gray-800 dark:text-white mb-2">
            {t('لم نجد أي منتجات تطابق بحثك!', 'No products match your search!')}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {t(
              'جرّب تغيير كلمات البحث أو مسح الفلاتر، أو تواصل معنا عبر الواتساب للاستفسار عن أي صنف بالعيادة.',
              'Try adjusting your search terms or clearing filters, or contact us directly on WhatsApp.'
            )}
          </p>
        </div>
      )}
    </div>
  );
};
