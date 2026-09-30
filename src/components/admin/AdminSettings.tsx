import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Settings, Save, CheckCircle2, MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, t, language } = useStore();

  const [brandNameAr, setBrandNameAr] = useState(settings.brandNameAr);
  const [brandNameEn, setBrandNameEn] = useState(settings.brandNameEn);
  const [taglineAr, setTaglineAr] = useState(settings.taglineAr);
  const [taglineEn, setTaglineEn] = useState(settings.taglineEn);
  const [addressAr, setAddressAr] = useState(settings.addressAr);
  const [addressEn, setAddressEn] = useState(settings.addressEn);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [email, setEmail] = useState(settings.email);
  const [workingHoursAr, setWorkingHoursAr] = useState(settings.workingHoursAr);
  const [workingHoursEn, setWorkingHoursEn] = useState(settings.workingHoursEn);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(settings.googleMapsUrl);
  const [whatsappMsgAr, setWhatsappMsgAr] = useState(settings.whatsappMsgAr);
  const [whatsappMsgEn, setWhatsappMsgEn] = useState(settings.whatsappMsgEn);
  const [logoImage, setLogoImage] = useState(settings.logoImage || '/src/assets/images/animal_world_official_logo_1790356370391.jpg');
  const [iconImage, setIconImage] = useState(settings.iconImage || '/src/assets/images/animal_world_icon_emblem_1790356382456.jpg');
  const [deliveryFee, setDeliveryFee] = useState(settings.deliveryFee);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(settings.freeDeliveryThreshold);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      brandNameAr,
      brandNameEn,
      logoImage,
      iconImage,
      taglineAr,
      taglineEn,
      addressAr,
      addressEn,
      phone,
      whatsapp,
      email,
      workingHoursAr,
      workingHoursEn,
      googleMapsUrl,
      whatsappMsgAr,
      whatsappMsgEn,
      deliveryFee,
      freeDeliveryThreshold
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('إعدادات المتجر والعيادة المركزية', 'Central Store & Clinic Settings')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t('تعديل اسم العلامة التجارية، أرقام الهاتف، العنوان في سمالوط، ومواعيد العمل', 'Manage official brand credentials and contacts')}
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('تم حفظ التعديلات بنجاح!', 'Settings saved successfully!')}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800 shadow-xs space-y-6">
        {/* Brand Names Section */}
        <div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0E7A5D]" />
            <span>{t('هوية واسم العلامة التجارية (ثنائية اللغة)', 'Brand Name & Identity (Bilingual)')}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">{t('اسم المتجر والعيادة (عربي)', 'Brand Name (Arabic)')}</label>
              <input
                type="text"
                required
                value={brandNameAr}
                onChange={(e) => setBrandNameAr(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t('اسم المتجر والعيادة (إنجليزي)', 'Brand Name (English)')}</label>
              <input
                type="text"
                required
                value={brandNameEn}
                onChange={(e) => setBrandNameEn(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
          </div>
        </div>

        {/* Official Logo and Icon Emblem Section */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E7A5D]"></span>
            <span>{t('الشعار والأيقونة الرسمية (Logo & Icon Assets)', 'Official Logo & Icon Assets')}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#1C2620]/50 space-y-3">
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200">
                {t('الشعار الكامل لعالم الحيوان', 'Official Full Logo')}
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-gray-200 shadow-sm shrink-0 overflow-hidden flex items-center justify-center">
                  <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={logoImage}
                    onChange={(e) => setLogoImage(e.target.value)}
                    placeholder="/src/assets/images/..."
                    className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F2C24]"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {t('المستخدم في الهيدر والفوتر والتقارير', 'Used in header, footer and branding')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#1C2620]/50 space-y-3">
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-200">
                {t('أيقونة الموقع وشعار المتصفح (Favicon & Icon)', 'Site Favicon & App Icon')}
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white p-1 border border-gray-200 shadow-sm shrink-0 overflow-hidden flex items-center justify-center">
                  <img src={iconImage} alt="Favicon" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={iconImage}
                    onChange={(e) => setIconImage(e.target.value)}
                    placeholder="/src/assets/images/..."
                    className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F2C24]"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {t('أيقونة المتصفح وشريط العنوان المصغر', 'Browser tab icon and mobile shortcut')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address in Samalout Section */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F59E0B]" />
            <span>{t('عنوان المقر الرسمي في سمالوط، المنيا', 'Official Address in Samalout')}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">{t('العنوان التفصيلي (عربي)', 'Address (Arabic)')}</label>
              <textarea
                rows={2}
                required
                value={addressAr}
                onChange={(e) => setAddressAr(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t('العنوان التفصيلي (إنجليزي)', 'Address (English)')}</label>
              <textarea
                rows={2}
                value={addressEn}
                onChange={(e) => setAddressEn(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers Section */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#0E7A5D]" />
            <span>{t('أرقام الاتصال والتواصل', 'Contact Numbers')}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">{t('هاتف العيادة الرئيسي', 'Clinic Phone')} *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24] dir-ltr text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t('رقم الواتساب (WhatsApp)', 'WhatsApp Number')}</label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24] dir-ltr text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t('البريد الإلكتروني', 'Email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{t('مواعيد العمل واستقبال الحالات', 'Working Hours')}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">{t('مواعيد العمل (عربي)', 'Hours (Arabic)')}</label>
              <input
                type="text"
                value={workingHoursAr}
                onChange={(e) => setWorkingHoursAr(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t('مواعيد العمل (إنجليزي)', 'Hours (English)')}</label>
              <input
                type="text"
                value={workingHoursEn}
                onChange={(e) => setWorkingHoursEn(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
          </div>
        </div>

        {/* Delivery Rates */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
            {t('رسوم الشحن والتوصيل للطلبات', 'Shipping & Delivery Fees')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">{t('سعر التوصيل الافتراضي (ج.م)', 'Delivery Fee (EGP)')}</label>
              <input
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(Number(e.target.value))}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">{t('حد الشحن المجاني للطلب (ج.م)', 'Free Delivery Threshold')}</label>
              <input
                type="number"
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(Number(e.target.value))}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-xs shadow-lg shadow-[#0E7A5D]/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{t('حفظ وتطبيق جميع الإعدادات', 'Save All Settings')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
