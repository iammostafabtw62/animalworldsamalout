import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { settings, language } = useStore();

  const phoneClean = settings.whatsapp.replace(/\D/g, '');
  // Format for Egypt international if local 01...
  const formattedPhone = phoneClean.startsWith('0') ? `2${phoneClean}` : phoneClean;
  const message = language === 'ar' ? settings.whatsappMsgAr : settings.whatsappMsgEn;
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 sm:bottom-6 left-5 z-40 group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 px-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-all duration-200"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current animate-pulse" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-sm">
        {language === 'ar' ? 'تواصل معنا واتساب' : 'Chat on WhatsApp'}
      </span>
    </a>
  );
};
