import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { History, Search, Filter, ShieldCheck, Clock } from 'lucide-react';

export const AdminActivityLog: React.FC = () => {
  const { activityLogs, t, language } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = activityLogs.filter((log) => {
    return (
      !searchQuery.trim() ||
      log.actionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.detailsAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <History className="w-6 h-6 text-[#0E7A5D]" />
            <span>{t('سجل نشاط العمليات (Activity Audit Log)', 'Activity Audit Log')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {t('تتبع كافة التعديلات، تسجيلات الدخول، وإجراءات الطلبات والمنتجات', 'Track all administrative and system events')}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-[#16201B] border border-gray-200 dark:border-gray-800">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('بحث في سجل النشاطات والعمليات...', 'Search audit log...')}
            className="w-full p-2.5 pr-8 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2C24]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#16201B] overflow-hidden shadow-xs">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 dark:hover:bg-[#1F2C24] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0E7A5D]/10 text-[#0E7A5D] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900 dark:text-white">
                      {language === 'ar' ? log.actionAr : log.action}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">
                      {log.userName}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {language === 'ar' ? log.detailsAr : log.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(log.timestamp).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
