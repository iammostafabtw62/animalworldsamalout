import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { VeterinaryService, Appointment } from '../../types';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Sparkles } from 'lucide-react';

interface AppointmentModalProps {
  initialService?: VeterinaryService | null;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  initialService,
  onClose
}) => {
  const { services, bookAppointment, t, language, settings } = useStore();

  const [selectedServiceId, setSelectedServiceId] = useState(
    initialService?.id || services[0]?.id || ''
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [petSpecies, setPetSpecies] = useState<'dog' | 'cat' | 'bird' | 'small_pet' | 'other'>('cat');
  const [petAge, setPetAge] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('05:00 م - 05:30 م');
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);
  const [error, setError] = useState('');

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const timeSlots = [
    '11:00 ص - 11:30 ص',
    '12:00 م - 12:30 م',
    '01:00 م - 01:30 م',
    '05:00 م - 05:30 م',
    '06:00 م - 06:30 م',
    '07:00 م - 07:30 م',
    '08:00 م - 08:30 م',
    '09:00 م - 09:30 م',
    '10:00 م - 10:30 م'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !petName.trim()) {
      setError(
        language === 'ar'
          ? 'يرجى إدخال اسم العميل ورقم الهاتف واسم الحيوان الأليف.'
          : 'Please enter customer name, phone number, and pet name.'
      );
      return;
    }

    setError('');
    const newApt = bookAppointment({
      serviceId: selectedServiceId,
      serviceNameAr: selectedService?.nameAr || 'كشف بيطري',
      serviceNameEn: selectedService?.nameEn || 'Veterinary Checkup',
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      petName,
      petSpecies,
      petAge: petAge || undefined,
      preferredDate,
      preferredTimeSlot
    });

    setSubmittedAppointment(newApt);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1A2520]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {t('حجز موعد كشف بيطري', 'Book Veterinary Appointment')}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t('عيادة عالم الحيوان — سمالوط، شارع الصفصافية', 'Animal World Clinic — Samalout, Al-Safsafiya St.')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedAppointment ? (
          /* Confirmation State with Vet Kitten Mascot */
          <div className="p-8 text-center space-y-5">
            <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-[#0E7A5D] shadow-lg">
              <img
                src={settings.catMascotImage}
                alt="Vet Kitten Mascot"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t('تم تسجيل طلب الحجز بنجاح!', 'Booking Request Confirmed!')}</span>
              </div>
              <h4 className="text-2xl font-black text-gray-900 dark:text-white">
                {t('رقم الحجز:', 'Booking Code:')} <span className="text-[#0E7A5D]">{submittedAppointment.appointmentNumber}</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
                {t(
                  `أهلاً بك يا ${submittedAppointment.customerName}! تم استلام طلب موعد كشف لـ "${submittedAppointment.petName}" بتاريخ ${submittedAppointment.preferredDate} (${submittedAppointment.preferredTimeSlot}). سيتواصل معك طبيب العيادة لتأكيد الموعد.`,
                  `Welcome ${submittedAppointment.customerName}! Your appointment request for "${submittedAppointment.petName}" on ${submittedAppointment.preferredDate} (${submittedAppointment.preferredTimeSlot}) has been received. Our clinic team will reach out shortly.`
                )}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1B2620] border border-gray-200 dark:border-gray-800 text-xs text-start space-y-1.5">
              <p>
                <strong className="text-gray-900 dark:text-white">{t('عنوان العيادة:', 'Clinic Address:')}</strong>{' '}
                {t(settings.addressAr, settings.addressEn)}
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">{t('هاتف العيادة:', 'Clinic Phone:')}</strong>{' '}
                <span dir="ltr" className="font-bold text-[#0E7A5D]">{settings.phone}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-sm shadow-md transition-colors"
            >
              {t('حسنًا، شكرًا لكم', 'Close & Return to Store')}
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200">
                {error}
              </div>
            )}

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                {t('اختر الخدمة البيطرية المطلوبة', 'Select Veterinary Service')} *
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
              >
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {language === 'ar' ? srv.nameAr : srv.nameEn} {srv.price ? `(${srv.price} ${settings.currencyAr})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('اسم المربي / العميل', 'Customer Name')} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t('مثال: أحمد مصطفى', 'e.g. Mostafa Ali')}
                    className="w-full p-2.5 pl-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('رقم الهاتف المحمول', 'Phone Number')} *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="01227339226"
                    className="w-full p-2.5 pl-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D] dir-ltr text-right"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Pet Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('اسم الحيوان الأليف', 'Pet Name')} *
                </label>
                <input
                  type="text"
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder={t('مثال: بوسي أو ريكس', 'e.g. Max or Bella')}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('نوع الحيوان', 'Pet Species')}
                </label>
                <select
                  value={petSpecies}
                  onChange={(e: any) => setPetSpecies(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                >
                  <option value="cat">{t('قطة', 'Cat')}</option>
                  <option value="dog">{t('كلب', 'Dog')}</option>
                  <option value="bird">{t('طائر / عصافير', 'Bird')}</option>
                  <option value="small_pet">{t('أليف صغير (هامستر/أرنب)', 'Small Pet')}</option>
                  <option value="other">{t('آخر', 'Other')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('العمر التقريبي', 'Approx. Age')}
                </label>
                <input
                  type="text"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                  placeholder={t('مثال: 6 شهور / سنتان', 'e.g. 1 year')}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('تاريخ الزيارة المفضل', 'Preferred Date')} *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {t('الموعد الزمني المفضل', 'Time Slot')} *
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
                >
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-sm shadow-md shadow-[#0E7A5D]/25 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{t('تأكيد وحجز الموعد البيطري', 'Confirm & Book Appointment')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
