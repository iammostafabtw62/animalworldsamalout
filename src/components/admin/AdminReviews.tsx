import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle, EyeOff, Trash2 } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { reviews, toggleReviewApproval, deleteReview, t, language } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span>{t('إدارة تقييمات وآراء العملاء', 'Customer Reviews Moderation')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t('الموافقة على التقييمات، إخفائها، أو حذفها قبل ظهورها في المتجر', 'Approve, hide, or delete reviews')}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16201B] overflow-hidden shadow-xs">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">{rev.customerName}</span>
                  {rev.customerCity && (
                    <span className="text-xs text-gray-400">({rev.customerCity})</span>
                  )}
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  "{language === 'ar' ? rev.commentAr : rev.commentEn || rev.commentAr}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleReviewApproval(rev.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    rev.approved
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{rev.approved ? t('معتمد ومعروض', 'Approved') : t('معلق (اعتماد)', 'Approve')}</span>
                </button>

                <button
                  onClick={() => deleteReview(rev.id)}
                  className="p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title={t('حذف التقييم', 'Delete Review')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
