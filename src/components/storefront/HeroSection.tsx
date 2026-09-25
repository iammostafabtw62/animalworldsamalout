import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Calendar, MapPin, Sparkles, HeartHandshake, ShieldCheck, Stethoscope } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onBookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick, onBookClick }) => {
  const { t, settings, language } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F8F5] via-[#FBFBFA] to-white dark:from-[#0F1713] dark:via-[#131C17] dark:to-[#111614] py-10 lg:py-16 transition-colors">
      {/* Decorative ambient background blur */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Content Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Top Pill: Location & Trust */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/20 border border-[#0E7A5D]/20 text-[#0E7A5D] dark:text-[#2DD4BF] text-xs sm:text-sm font-bold">
              <MapPin className="w-4 h-4 text-[#F59E0B]" />
              <span>{t('سمالوط، المنيا — عيادة بيطرية ومتجر متكامل', 'Samalout, Minya — Integrated Vet Clinic & Pet Store')}</span>
            </div>

            {/* Official Headings Required by Master Prompt */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1A2520] dark:text-white leading-[1.25] tracking-tight">
              {language === 'ar' ? (
                <>
                  <span>كل ما يحتاجه حيوانك الأليف...</span>
                  <span className="block mt-1 sm:mt-2 text-[#0E7A5D] dark:text-[#2DD4BF]">في مكان واحد</span>
                </>
              ) : (
                <>
                  <span>Everything Your Pet Needs,</span>
                  <span className="block mt-1 sm:mt-2 text-[#0E7A5D] dark:text-[#2DD4BF]">All in One Place.</span>
                </>
              )}
            </h1>

            {/* Supporting Arabic & English Text */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t(
                'منتجات مختارة بعناية، رعاية بيطرية متخصصة، وكل ما يحتاجه حيوانك الأليف ليعيش حياة صحية وسعيدة.',
                'Carefully selected products, specialized veterinary care, and everything your companion needs for a happy, healthy life.'
              )}
            </p>

            {/* 3 Brand Badges Matching the Official Artwork */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-2">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2520] border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center mb-1.5">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">
                  {t('منتجات', 'Pet Products')}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  {t('أطعمة ومستلزمات', 'Food & Supplies')}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2520] border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center mb-1.5">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">
                  {t('رعاية بيطرية', 'Veterinary Care')}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  {t('فحص وتطعيمات', 'Checkup & Vaccines')}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2520] border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-1.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">
                  {t('صحة ورفاهية', 'Pet Wellness')}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  {t('نظافة وعناية', 'Hygiene & Styling')}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-base sm:text-lg font-bold shadow-lg shadow-[#0E7A5D]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{t('تسوق الآن', 'Shop Now')}</span>
              </button>

              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-[#1C2621] hover:bg-gray-50 dark:hover:bg-[#23302a] text-[#0E7A5D] dark:text-[#2DD4BF] border-2 border-[#0E7A5D]/30 text-base sm:text-lg font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>{t('احجز موعدًا', 'Book Appointment')}</span>
              </button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#0E7A5D]" />
              <span>{t('أدوية وأطعمة أصلية 100% وكادر طبي مؤهل في سمالوط', '100% Genuine products & certified vet practitioners')}</span>
            </div>
          </div>

          {/* Official Mascots Visual Banner Column (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#202D27] group">
              <img
                src={settings.heroImage}
                alt="Animal World Mascots"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Mascot Badges */}
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-[#151D18]/95 backdrop-blur-md py-2 px-3.5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-bold text-[#0E7A5D] dark:text-[#2DD4BF]">
                  {t('عيادة مفتوحة الآن', 'Clinic Open Now')}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-emerald-300">
                    {t('تميمة عالم الحيوان الرسمية', 'Official Mascot Duo')}
                  </p>
                  <p className="text-sm font-bold">
                    {t('الكلب الذهبي ود. كيتي البيطرية', 'Golden Shopper & Dr. Kitty Vet')}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#0E7A5D]">
                  {t('سمالوط', 'Samalout')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
