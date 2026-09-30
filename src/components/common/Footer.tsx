import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin, onOpenAppointment }) => {
  const { settings, language, t } = useStore();
  const brandName = language === 'ar' ? settings.brandNameAr : settings.brandNameEn;

  return (
    <footer className="bg-white dark:bg-[#0D1612] text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 pt-16 pb-24 lg:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-0.5 flex items-center justify-center shadow-md overflow-hidden border border-emerald-600/30 dark:border-emerald-900/40">
                <img
                  src={settings.iconImage || settings.logoImage || '/src/assets/images/animal_world_icon_emblem_1790356382456.jpg'}
                  alt={brandName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <span className="text-2xl font-black text-gray-900 dark:text-white">{brandName}</span>
                <p className="text-xs text-[#0E7A5D] dark:text-[#2DD4BF] font-semibold">
                  {t('عيادة بيطرية ومستلزمات أليفك', 'Veterinary Care & Pet Store')}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {t(
                'الوجهة المتكاملة الأولى في سمالوط والمنيا لكل ما يحتاجه حيوانك الأليف من رعاية طبية متخصصة وتطعيمات وأفضل منتجات التغذية.',
                'The premier integrated hub in Samalout and Minya for all your pet needs: specialized medical care, vaccinations, and premium food.'
              )}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/20 text-[#0E7A5D] dark:text-[#2DD4BF] text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t('سمالوط - المنيا', 'Samalout - Minya')}</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0E7A5D]"></span>
              <span>{t('روابط سريعة', 'Quick Links')}</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#0E7A5D] dark:hover:text-white hover:underline transition-colors"
                >
                  {t('تسوق المنتجات والأطعمة', 'Shop Products & Food')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#0E7A5D] dark:hover:text-white hover:underline transition-colors"
                >
                  {t('الخدمات البيطرية بالعيادة', 'Clinic Veterinary Services')}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="hover:text-[#0E7A5D] dark:hover:text-white hover:underline transition-colors text-[#0E7A5D] dark:text-[#2DD4BF] font-semibold"
                >
                  {t('حجز كشف بيطري', 'Book Vet Appointment')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vets-picks')}
                  className="hover:text-[#0E7A5D] dark:hover:text-white hover:underline transition-colors"
                >
                  {t('ترشيحات الطبيب البيطري', "Vet's Recommendations")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-[#0E7A5D] dark:hover:text-white hover:underline transition-colors"
                >
                  {t('مقالات ونصائح العناية بأليفك', 'Pet Care Guides & Tips')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-gray-900 dark:text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              <span>{t('بيانات العيادة والتواصل', 'Clinic & Contact Info')}</span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
                <span className="leading-relaxed text-gray-700 dark:text-gray-300">
                  {t(settings.addressAr, settings.addressEn)}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0E7A5D] dark:text-[#2DD4BF] shrink-0" />
                <a
                  href={`tel:${settings.phone}`}
                  className="font-bold text-gray-900 dark:text-white hover:text-[#0E7A5D] dark:hover:text-[#2DD4BF] transition-colors dir-ltr"
                  dir="ltr"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0E7A5D] dark:text-[#2DD4BF] shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-gray-700 dark:text-gray-300 hover:text-[#0E7A5D] dark:hover:text-white transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t(settings.workingHoursAr, settings.workingHoursEn)}
                </span>
              </li>
            </ul>
          </div>

          {/* Mascots & Assurance */}
          <div className="bg-gray-50 dark:bg-[#15231D] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={settings.catMascotImage}
                alt="Cat Vet Mascot"
                className="w-14 h-14 rounded-xl object-cover border border-[#0E7A5D]/40"
              />
              <div>
                <h5 className="text-gray-900 dark:text-white text-sm font-bold">
                  {t('رعاية بيطرية موثوقة', 'Trusted Veterinary Care')}
                </h5>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('أطباء مرخصون وأدوية معتمدة أصلية', 'Licensed vets & genuine certified medicines')}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {t(
                'نسعى لتقديم أعلى درجات الاهتمام والرعاية لحيوانك الأليف في سمالوط مع توفير استشارات دورية.',
                'We aim to provide the highest level of care for your beloved pet in Samalout with ongoing follow-ups.'
              )}
            </p>
            <button
              onClick={onOpenAdmin}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/80 dark:hover:bg-gray-700 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-gray-200 dark:border-gray-700"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0E7A5D] dark:text-[#2DD4BF]" />
              <span>{t('لوحة تحكم الإدارة (Admin)', 'Admin Portal')}</span>
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} {brandName} ({settings.brandNameAr} - {settings.brandNameEn}) — {t('جميع الحقوق محفوظة. سمالوط، المنيا، مصر', 'All rights reserved. Samalout, Minya, Egypt')}
          </p>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <span>{t('صُنِع بحب لأجل صحة وراحة حيوانك الأليف', 'Made with care for your pet wellness')}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
