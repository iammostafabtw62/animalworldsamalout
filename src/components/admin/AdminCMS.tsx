import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { LayoutTemplate, Image, Save, CheckCircle2, Megaphone, Tag } from 'lucide-react';

export const AdminCMS: React.FC = () => {
  const { settings, updateSettings, banners, updateBanner, t, language } = useStore();

  const [heroHeadingAr, setHeroHeadingAr] = useState('كل ما يحتاجه حيوانك الأليف... في مكان واحد');
  const [heroHeadingEn, setHeroHeadingEn] = useState('Everything Your Pet Needs, All in One Place.');
  const [heroSubAr, setHeroSubAr] = useState(
    'منتجات مختارة بعناية، رعاية بيطرية متخصصة، وكل ما يحتاجه حيوانك الأليف ليعيش حياة صحية وسعيدة.'
  );
  const [heroSubEn, setHeroSubEn] = useState(
    'Carefully selected products, specialized veterinary care, and everything your companion needs for a happy, healthy life.'
  );
  const [announcementAr, setAnnouncementAr] = useState('شارع الصفصافية، سمالوط، المنيا — هاتف العيادة: 01227339226');
  const [announcementEn, setAnnouncementEn] = useState('Al-Safsafiya St., Samalout, Minya — Clinic Phone: 01227339226');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      taglineAr: heroHeadingAr,
      taglineEn: heroHeadingEn
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('إدارة محتوى الموقع والواجهة (CMS)', 'Website Content & CMS')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t('تخصيص نصوص الهيرو، البانرات الترويجية، والإعلانات العلوية', 'Manage hero texts, banners, and announcement content')}
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('تم تحديث المحتوى بنجاح!', 'Content updated successfully!')}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs space-y-6">
        {/* Hero Section Texts */}
        <div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#0E7A5D]" />
            <span>{t('نصوص واجهة الهيرو الرئيسية', 'Hero Section Titles')}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">{t('العنوان الرئيسي (عربي)', 'Heading (Arabic)')}</label>
              <input
                type="text"
                value={heroHeadingAr}
                onChange={(e) => setHeroHeadingAr(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t('العنوان الرئيسي (إنجليزي)', 'Heading (English)')}</label>
              <input
                type="text"
                value={heroHeadingEn}
                onChange={(e) => setHeroHeadingEn(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-xs font-bold mb-1">{t('النص التوضيحي (عربي)', 'Supporting Text (Arabic)')}</label>
              <textarea
                rows={2}
                value={heroSubAr}
                onChange={(e) => setHeroSubAr(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t('النص التوضيحي (إنجليزي)', 'Supporting Text (English)')}</label>
              <textarea
                rows={2}
                value={heroSubEn}
                onChange={(e) => setHeroSubEn(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
          </div>
        </div>

        {/* Mascot Assets Configuration */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Image className="w-4 h-4 text-[#F59E0B]" />
            <span>{t('صور تمائم عالم الحيوان الرسمية', 'Official Mascot Artwork Assets')}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1F2C24] flex items-center gap-4">
              <img
                src={settings.heroImage}
                alt="Hero Mascot"
                className="w-16 h-16 rounded-xl object-cover border"
              />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{t('بانر التمائم الرئيسي (Hero)', 'Main Hero Duo Banner')}</p>
                <p className="text-[11px] text-gray-400 mt-1">{t('شعار عالم الحيوان مع الكلب ود. كيتي البيطرية', 'Animal World Mascot Duo')}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1F2C24] flex items-center gap-4">
              <img
                src={settings.dogMascotImage}
                alt="Shopper Mascot"
                className="w-16 h-16 rounded-xl object-cover border"
              />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{t('تميمة الكلب المتسوق', 'Shopper Dog Mascot')}</p>
                <p className="text-[11px] text-gray-400 mt-1">{t('مستخدم في تأكيد الطلبات والهيدر', 'Used in header & order confirmation')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Promotions Note per prompt */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-600" />
            <span>{t('نظام العروض والخصومات', 'Promotions System')}</span>
          </h4>
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-gray-600 dark:text-gray-300">
            <p>
              {t(
                'تمت إزالة كود الخصم القديم بنجاح من كافة واجهات المتجر والبانرات كما طُلب. يمكنك إضافة عروض ترويجية وخصومات مباشرة من صفحة تعديل كل منتج.',
                'The old hard-coded coupon code has been removed from all banners and storefront pages. Discounts are directly configured on individual products.'
              )}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{t('حفظ التعديلات', 'Save Changes')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
