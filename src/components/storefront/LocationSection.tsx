import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { settings, t } = useStore();

  return (
    <section id="location" className="py-16 bg-gradient-to-b from-[#F2F8F5] to-white dark:from-[#111A15] dark:to-[#151D18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#18231D] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Info Col */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/20 text-[#0E7A5D] dark:text-[#2DD4BF] text-xs font-bold mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{t('موقعنا وخدمة أهالي سمالوط والمنيا', 'Clinic Location & Visit Info')}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4">
                  {t('تفضل بزيارة عيادة ومتجر عالم الحيوان', 'Visit Animal World Clinic & Store')}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {t(
                    'يسعدنا استقبالكم واستقبال أليفكم في مقرنا المجهز بأحدث الأدوات البيطرية في سمالوط، لتوفير الفحص والعلاج والتطعيمات وشراء كافة المستلزمات الطبية والأغذية.',
                    'We are thrilled to welcome you and your beloved pet to our facility equipped with modern veterinary instruments in Samalout.'
                  )}
                </p>

                {/* Key Points */}
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {t('العنوان التفصيلي:', 'Detailed Address:')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed font-semibold">
                        {t(settings.addressAr, settings.addressEn)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {t('هاتف العيادة الرسمي المعتمد:', 'Official Clinic Phone:')}
                      </h4>
                      <a
                        href={`tel:${settings.phone}`}
                        className="text-lg font-black text-[#0E7A5D] dark:text-[#2DD4BF] hover:underline dir-ltr inline-block mt-0.5"
                        dir="ltr"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {t('مواعيد العمل واستقبال الحالات:', 'Working Hours:')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-0.5">
                        {t(settings.workingHoursAr, settings.workingHoursEn)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md shadow-[#0E7A5D]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t('افتح الموقع على خرائط جوجل', 'Open in Google Maps')}</span>
                </a>

                <a
                  href={`tel:${settings.phone}`}
                  className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#0E7A5D]" />
                  <span>{t('اتصل بالعيادة الآن', 'Call Clinic Now')}</span>
                </a>
              </div>
            </div>

            {/* Visual Mascot & Samalout Map Banner Col */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full bg-[#182B22] p-8 flex flex-col justify-between overflow-hidden text-white">
              {/* Background Mascot Banner with subtle opacity */}
              <div className="absolute inset-0 opacity-40">
                <img
                  src={settings.heroImage}
                  alt="Animal World Clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E17] via-[#0F1E17]/80 to-transparent" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-[#F59E0B] border border-white/10">
                  {t('محافظة المنيا - مركز سمالوط', 'Minya Governorate - Samalout')}
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('معلم مميز يسهل الوصول إليه:', 'Prominent Easy Landmark:')}</span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                    {t(
                      'شارع الصفصافية، أمام صيدلية رنا ومطعم شط اسكندرية، بجوار جميع وسائل المواصلات داخل سمالوط.',
                      'Al-Safsafiya St., opposite Rana Pharmacy & Shatt Alexandria Restaurant, easily accessible.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
