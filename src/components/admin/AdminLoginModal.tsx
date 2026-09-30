import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { adminLogin, t, language, settings } = useStore();
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = adminLogin(username, password);
      setIsLoading(false);
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error || (language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'));
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-br from-[#0E7A5D] to-[#084534] p-8 text-white text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-white p-0.5 mx-auto flex items-center justify-center shadow-lg mb-3 border-2 border-white/40 overflow-hidden">
            <img
              src={settings.iconImage || settings.logoImage || '/src/assets/images/animal_world_icon_emblem_1790356382456.jpg'}
              alt="Animal World"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <h3 className="text-xl font-black">{t('لوحة تحكم إدارة عالم الحيوان', 'Animal World Admin Portal')}</h3>
          <p className="text-xs text-emerald-100 mt-1">
            {t('الدخول المخصص للمديرين والأطباء البيطريين', 'Restricted access for staff & veterinarians')}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              {t('اسم المستخدم (Username)', 'Username')}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin"
                className="w-full p-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              {t('كلمة المرور (Password)', 'Password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full p-3 pl-10 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E2B23] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7A5D]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white font-bold text-sm shadow-lg shadow-[#0E7A5D]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? t('جاري التحقق...', 'Verifying...') : t('تسجيل الدخول إلى النظام', 'Sign In to Portal')}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              {t('العودة إلى واجهة المتجر', 'Return to Storefront')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
