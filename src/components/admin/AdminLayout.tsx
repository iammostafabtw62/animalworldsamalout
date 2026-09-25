import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminOverview } from './AdminOverview';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminInventory } from './AdminInventory';
import { AdminOrders } from './AdminOrders';
import { AdminSalesArchive } from './AdminSalesArchive';
import { AdminAppointments } from './AdminAppointments';
import { AdminServices } from './AdminServices';
import { AdminCustomers } from './AdminCustomers';
import { AdminReviews } from './AdminReviews';
import { AdminTeam } from './AdminTeam';
import { AdminActivityLog } from './AdminActivityLog';
import { AdminCMS } from './AdminCMS';
import { AdminSettings } from './AdminSettings';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Layers,
  ShoppingBag,
  Archive,
  Calendar,
  Stethoscope,
  Users,
  Star,
  ShieldCheck,
  History,
  LayoutTemplate,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Globe,
  Sun,
  Moon
} from 'lucide-react';

interface AdminLayoutProps {
  onExit: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExit }) => {
  const { currentStaff, adminLogout, t, language, setLanguage, theme, toggleTheme, settings } = useStore();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const brandName = language === 'ar' ? settings.brandNameAr : settings.brandNameEn;

  const navItems = [
    { id: 'overview', labelAr: 'نظرة عامة والتحليلات', labelEn: 'Overview & Analytics', icon: LayoutDashboard },
    { id: 'products', labelAr: 'كتالوج المنتجات', labelEn: 'Products Catalog', icon: Package },
    { id: 'categories', labelAr: 'التصنيفات', labelEn: 'Categories', icon: FolderTree },
    { id: 'inventory', labelAr: 'إدارة المخزون', labelEn: 'Inventory Control', icon: Layers },
    { id: 'orders', labelAr: 'الطلبات الحالية', labelEn: 'Current Orders', icon: ShoppingBag },
    { id: 'sales_archive', labelAr: 'أرشيف المبيعات الدائم', labelEn: 'Sales Archive', icon: Archive },
    { id: 'appointments', labelAr: 'حجوزات العيادة', labelEn: 'Clinic Appointments', icon: Calendar },
    { id: 'services', labelAr: 'الخدمات البيطرية', labelEn: 'Veterinary Services', icon: Stethoscope },
    { id: 'customers', labelAr: 'العملاء والأليفة', labelEn: 'Customers & Pets', icon: Users },
    { id: 'reviews', labelAr: 'تقييمات وآراء العملاء', labelEn: 'Reviews Moderation', icon: Star },
    { id: 'cms', labelAr: 'محتوى الواجهة (CMS)', labelEn: 'Website Content & CMS', icon: LayoutTemplate },
    { id: 'team', labelAr: 'فريق العمل والصلاحيات', labelEn: 'Team & Roles', icon: ShieldCheck },
    { id: 'activity_log', labelAr: 'سجل نشاط العمليات', labelEn: 'Activity Audit Log', icon: History },
    { id: 'settings', labelAr: 'إعدادات المتجر والعيادة', labelEn: 'Store & Clinic Settings', icon: Settings }
  ];

  const handleLogout = () => {
    adminLogout();
    onExit();
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] dark:bg-[#0E1511] text-gray-900 dark:text-gray-100 flex transition-colors">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#151D18] border-r border-gray-200 dark:border-gray-800 shadow-sm shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <img
            src={settings.iconImage || settings.logoImage || '/src/assets/images/animal_world_icon_emblem_1790356382456.jpg'}
            alt="Animal World"
            className="w-10 h-10 rounded-xl object-cover border border-[#0E7A5D]/30"
          />
          <div>
            <h3 className="font-black text-sm text-[#0E7A5D] dark:text-[#2DD4BF] leading-tight">
              {brandName}
            </h3>
            <p className="text-[11px] text-gray-400">{t('لوحة تحكم الإدارة المركزية', 'Admin Control Center')}</p>
          </div>
        </div>

        {/* Current Staff Badge */}
        <div className="p-3.5 mx-3 my-2 rounded-2xl bg-gray-50 dark:bg-[#1E2B23] border border-gray-200/80 dark:border-gray-800 flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {currentStaff?.name || 'Admin'}
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold">{currentStaff?.role || 'Super Admin'}</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-right ${
                  isActive
                    ? 'bg-[#0E7A5D] text-white shadow-md shadow-[#0E7A5D]/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2B23]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="truncate">{language === 'ar' ? item.labelAr : item.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
          <button
            onClick={onExit}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2B23]"
          >
            <ExternalLink className="w-4 h-4 text-[#0E7A5D]" />
            <span>{t('مشاهدة واجهة المتجر', 'View Storefront')}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('تسجيل الخروج', 'Log Out')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-[#151D18] border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-gray-900 dark:text-white">
                {language === 'ar'
                  ? navItems.find((n) => n.id === activeSection)?.labelAr
                  : navItems.find((n) => n.id === activeSection)?.labelEn}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-[#0E7A5D]" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700"
              title={t('الوضع', 'Theme')}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Return to website */}
            <button
              onClick={onExit}
              className="px-3.5 py-1.5 rounded-xl bg-[#0E7A5D]/10 hover:bg-[#0E7A5D]/20 text-[#0E7A5D] dark:text-[#2DD4BF] text-xs font-bold flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('واجهة المتجر', 'Storefront')}</span>
            </button>
          </div>
        </header>

        {/* Body View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeSection === 'overview' && <AdminOverview />}
          {activeSection === 'products' && <AdminProducts />}
          {activeSection === 'categories' && <AdminCategories />}
          {activeSection === 'inventory' && <AdminInventory />}
          {activeSection === 'orders' && <AdminOrders />}
          {activeSection === 'sales_archive' && <AdminSalesArchive />}
          {activeSection === 'appointments' && <AdminAppointments />}
          {activeSection === 'services' && <AdminServices />}
          {activeSection === 'customers' && <AdminCustomers />}
          {activeSection === 'reviews' && <AdminReviews />}
          {activeSection === 'cms' && <AdminCMS />}
          {activeSection === 'team' && <AdminTeam />}
          {activeSection === 'activity_log' && <AdminActivityLog />}
          {activeSection === 'settings' && <AdminSettings />}
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-64 bg-white dark:bg-[#151D18] h-full p-4 flex flex-col justify-between border-r border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <img
                    src={settings.iconImage || settings.logoImage || '/src/assets/images/animal_world_icon_emblem_1790356382456.jpg'}
                    alt="Animal World"
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="font-bold text-sm text-[#0E7A5D] dark:text-[#2DD4BF]">{brandName}</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme & Language row in Admin mobile drawer */}
              <div className="py-2.5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="flex-1 py-1.5 px-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E2B23] text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t('نهاري', 'Light')}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-slate-700" />
                      <span>{t('ليلي', 'Dark')}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="py-1.5 px-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E2B23] text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5 text-[#0E7A5D]" />
                  <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
                </button>
              </div>

              <div className="mt-3 space-y-1 overflow-y-auto max-h-[60vh]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-right transition-colors ${
                        isActive
                          ? 'bg-[#0E7A5D] text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1E2B23]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <button
                onClick={onExit}
                className="w-full py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold hover:bg-gray-50 dark:hover:bg-[#1E2B23] transition-colors"
              >
                {t('العودة للمتجر', 'Storefront')}
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-colors"
              >
                {t('تسجيل الخروج', 'Log Out')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
