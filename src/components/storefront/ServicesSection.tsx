import React from 'react';
import { useStore } from '../../context/StoreContext';
import { VeterinaryService } from '../../types';
import { Stethoscope, Calendar, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (service: VeterinaryService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const { services, t, language, settings } = useStore();

  const availableServices = services.filter((s) => s.available);

  return (
    <section id="services" className="py-16 bg-[#F6FAF8] dark:bg-[#121A15] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/20 text-[#0E7A5D] dark:text-[#2DD4BF] text-xs font-bold mb-3">
            <Stethoscope className="w-4 h-4" />
            <span>{t('عيادة عالم الحيوان البيطرية التخصصية', 'Animal World Specialized Veterinary Clinic')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
            {t('رعاية بيطرية متكاملة بأيدي أطباء متخصصين', 'Comprehensive Veterinary Care by Certified Doctors')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            {t(
              'نقدم لحيوانك الأليف في سمالوط أفضل الفحوصات الطبية، العمليات الجراحية المعقمة، التطعيمات المعتمدة، وخدمات العناية المتطورة بأحدث الأجهزة.',
              'Providing your pet in Samalout with superior clinical exams, sterile surgeries, certified immunizations, and advanced grooming.'
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {availableServices.map((service) => {
            const name = language === 'ar' ? service.nameAr : service.nameEn;
            const description = language === 'ar' ? service.descriptionAr : service.descriptionEn;
            const benefits = language === 'ar' ? service.benefitsAr : service.benefitsEn;
            const currency = language === 'ar' ? settings.currencyAr : settings.currencyEn;

            return (
              <div
                key={service.id}
                className="bg-white dark:bg-[#18231D] rounded-3xl border border-gray-200/80 dark:border-gray-800/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#0E7A5D]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-[#1E2B23]">
                  <img
                    src={service.image || 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800'}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white">
                    <span className="flex items-center gap-1.5 text-xs font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{service.durationMinutes} {t('دقيقة', 'mins')}</span>
                    </span>
                    {service.price && (
                      <span className="text-sm font-black bg-[#0E7A5D] px-2.5 py-1 rounded-lg shadow-xs">
                        {service.price} {currency}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                      {name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                      {description}
                    </p>

                    {/* Key Benefits */}
                    {benefits && benefits.length > 0 && (
                      <ul className="space-y-1.5 mb-6 text-xs text-gray-500 dark:text-gray-400">
                        {benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E7A5D] dark:text-[#2DD4BF] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Booking CTA */}
                  <button
                    onClick={() => onBookService(service)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-sm shadow-md shadow-[#0E7A5D]/20 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t('احجز هذا الموعد', 'Book Appointment')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency / Walk-in note */}
        <div className="mt-12 p-6 rounded-3xl bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/20 border border-[#0E7A5D]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0E7A5D] text-white flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white">
                {t('حالات الطوارئ والإسعاف البيطري في سمالوط', 'Emergency & Urgent Veterinary Cases')}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {t(
                  'في الحالات الحرجة، يرجى التوجه مباشرة إلى العيادة في شارع الصفصافية أو الاتصال فورًا على: 01227339226',
                  'For urgent cases, head straight to our clinic on Al-Safsafiya St. or call immediately: 01227339226'
                )}
              </p>
            </div>
          </div>
          <a
            href={`tel:${settings.phone}`}
            className="shrink-0 px-6 py-3 rounded-2xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-sm font-bold shadow-md transition-all dir-ltr"
            dir="ltr"
          >
            {settings.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
