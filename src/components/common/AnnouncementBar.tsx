import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Phone, MapPin, Clock } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings, t } = useStore();

  return (
    <div className="bg-[#0E7A5D] text-white text-xs md:text-sm py-2 px-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <span className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{t(settings.addressAr, settings.addressEn)}</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-white/90">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{t(settings.workingHoursAr, settings.workingHoursEn)}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-1.5 font-bold hover:text-[#F59E0B] transition-colors dir-ltr"
            dir="ltr"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>{settings.phone}</span>
          </a>
          <span className="text-white/40">|</span>
          <span className="text-white/90 hidden sm:inline">
            {t('عيادة بيطرية ومستلزمات حيوانات أليفة في سمالوط', 'Veterinary Clinic & Pet Store in Samalout')}
          </span>
        </div>
      </div>
    </div>
  );
};
