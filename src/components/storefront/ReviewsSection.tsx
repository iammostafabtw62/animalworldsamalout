import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, MessageSquarePlus, CheckCircle2, User } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, submitReview, t, language } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('سمالوط');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const publicReviews = reviews.filter((r) => r.approved && r.isPublic);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;

    submitReview({
      customerName,
      customerCity,
      rating,
      commentAr: comment,
      commentEn: comment
    });

    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setCustomerName('');
      setComment('');
    }, 2000);
  };

  return (
    <section className="py-16 bg-[#FBFBFA] dark:bg-[#111614] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/20 text-[#0E7A5D] dark:text-[#2DD4BF] text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{t('آراء وتجارب العملاء', 'Customer Reviews & Feedback')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              {t('ماذا يقول مربو الحيوانات الأليفة في سمالوط والمنيا؟', 'What Pet Parents in Samalout & Minya Say')}
            </h2>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 rounded-2xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0E7A5D]/20 transition-all flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{showForm ? t('إغلاق النموذج', 'Close Form') : t('أضف تقييمك وتجربتك', 'Write a Review')}</span>
          </button>
        </div>

        {/* Submit Review Form */}
        {showForm && (
          <div className="mb-10 p-6 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-lg animate-fadeIn max-w-xl mx-auto">
            {submitted ? (
              <div className="text-center py-6 text-emerald-600 font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{t('شكرًا لتقييمك! تم حفظ مشاركتك ونشرها.', 'Thank you! Your review has been saved.')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  {t('شاركنا رأيك في خدمات العيادة والمنتجات', 'Share your feedback with Animal World')}
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">{t('الاسم', 'Name')} *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t('مثال: سارة محمد', 'e.g. Sarah')}
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">{t('المدينة / المنطقة', 'City')}</label>
                    <input
                      type="text"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="سمالوط"
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">{t('التقييم', 'Rating')}</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">{t('تعليقك وتجربتك', 'Comment')} *</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t('اكتب لنا انطباعك عن تعامل الأطباء وجودة المنتجات...', 'Share your honest feedback...')}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24] text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold transition-colors"
                >
                  {t('إرسال التقييم', 'Submit Review')}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publicReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.customerCity && (
                    <span className="text-[11px] text-gray-400 font-medium">
                      {rev.customerCity}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  "{language === 'ar' ? rev.commentAr : rev.commentEn || rev.commentAr}"
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="w-8 h-8 rounded-full bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-gray-900 dark:text-white">
                    {rev.customerName}
                  </h5>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {t('عميل موثق في سمالوط', 'Verified Samalout Client')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
