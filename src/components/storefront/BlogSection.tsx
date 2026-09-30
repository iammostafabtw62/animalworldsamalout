import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BookOpen, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { articles, t, language } = useStore();
  const publishedArticles = articles.filter((a) => a.published);

  return (
    <section id="articles" className="py-16 bg-white dark:bg-[#141C18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/20 text-[#0E7A5D] dark:text-[#2DD4BF] text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('إرشادات طبية وصحية', 'Veterinary Care Guides')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
            {t('نصائح أطباء عالم الحيوان لصحة أليفك', 'Expert Tips from Our Veterinarians')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t(
              'مقالات وإرشادات دورية للعناية بالكلاب والقطط في مناخ صعيد مصر وكيفية التعامل مع التطعيمات والتغذية السليمة.',
              'Periodic guides for pet care in Upper Egypt climate, vaccination timing, and healthy feeding routines.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedArticles.map((article) => {
            const title = language === 'ar' ? article.titleAr : article.titleEn;
            const summary = language === 'ar' ? article.summaryAr : article.summaryEn;
            const category = language === 'ar' ? article.categoryAr : article.categoryEn;

            return (
              <div
                key={article.id}
                className="bg-gray-50 dark:bg-[#18231D] rounded-3xl border border-gray-200/80 dark:border-gray-800 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col sm:flex-row group"
              >
                <div className="sm:w-1/2 relative h-48 sm:h-auto overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                    {category}
                  </span>
                </div>

                <div className="p-6 sm:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <Clock className="w-3.5 h-3.5 text-[#0E7A5D]" />
                      <span>{article.readTimeMinutes} {t('دقائق قراءة', 'min read')}</span>
                    </div>

                    <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2 group-hover:text-[#0E7A5D] transition-colors line-clamp-2">
                      {title}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 mb-4">
                      {summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs font-bold text-[#0E7A5D] dark:text-[#2DD4BF]">
                    <span>{language === 'ar' ? article.authorAr : article.authorEn}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t('قراءة الإرشادات', 'Read Guide')}
                      {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
