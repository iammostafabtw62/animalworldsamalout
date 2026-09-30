import React, { useState, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  downloadProductExcelTemplate,
  parseAndValidateExcel,
  convertExcelRowsToProducts,
  ExcelValidationResult,
  ExcelProductRow
} from '../../utils/excelImport';
import {
  X,
  FileSpreadsheet,
  Download,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Info,
  Check,
  AlertCircle
} from 'lucide-react';

interface AdminExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminExcelImportModal: React.FC<AdminExcelImportModalProps> = ({
  isOpen,
  onClose
}) => {
  const { products, bulkSetProducts, t, language } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationResult, setValidationResult] = useState<ExcelValidationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [importMode, setImportMode] = useState<'add_new' | 'update_existing'>('add_new');
  const [isImporting, setIsImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<{
    added: number;
    updated: number;
    skipped: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls')) {
      setErrorMessage(
        language === 'ar'
          ? 'صيغة الملف غير مدعومة. يرجى اختيار ملف Excel بصيغة (.xlsx أو .xls).'
          : 'Unsupported file format. Please upload an Excel file (.xlsx or .xls).'
      );
      return;
    }

    setFile(selectedFile);
    setErrorMessage('');
    setIsProcessing(true);
    setImportSummary(null);

    try {
      const result = await parseAndValidateExcel(selectedFile, products);
      setValidationResult(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء قراءة ملف الإكسيل.');
      setValidationResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleExecuteImport = () => {
    if (!validationResult || validationResult.validRows.length === 0) return;

    setIsImporting(true);
    setTimeout(() => {
      const { updatedProducts, addedCount, updatedCount, skippedCount } =
        convertExcelRowsToProducts(validationResult.validRows, products, importMode);

      bulkSetProducts(updatedProducts);
      setIsImporting(false);
      setImportSummary({
        added: addedCount,
        updated: updatedCount,
        skipped: skippedCount
      });
    }, 500);
  };

  const handleReset = () => {
    setFile(null);
    setValidationResult(null);
    setImportSummary(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#151D18] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-[#1A2520]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-[#0E7A5D] dark:text-[#2DD4BF] flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {t('استيراد وتحديث المنتجات عبر ملف إكسيل (Excel)', 'Import Products from Excel (.xlsx)')}
              </h3>
              <p className="text-xs text-gray-500">
                {t('إضافة كميات كبيرة من المنتجات أو تحديث الأسعار والمخزون بضغطة واحدة', 'Bulk import or update prices and inventory')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Action to Download Official Template */}
          <div className="p-4 rounded-2xl bg-[#0E7A5D]/10 dark:bg-[#0E7A5D]/20 border border-[#0E7A5D]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#0E7A5D] dark:text-[#2DD4BF] shrink-0" />
              <div className="text-xs text-gray-700 dark:text-gray-300">
                <p className="font-bold text-gray-900 dark:text-white">
                  {t('قالب إكسيل المعتمد لمنتجات عالم الحيوان', 'Official Animal World Products Template')}
                </p>
                <p>
                  {t(
                    'قم بتحميل ملف النموذج الذي يحتوي على الأعمدة المطلوبة ومثال تطبيقي جاهز للتعبئة.',
                    'Download the pre-formatted template with all required columns and an example row.'
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={downloadProductExcelTemplate}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('تحميل قالب Excel جاهز', 'Download Excel Template')}</span>
            </button>
          </div>

          {/* Import Modes */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 shrink-0">
              {t('طريقة الاستيراد:', 'Import Mode:')}
            </span>
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setImportMode('add_new')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  importMode === 'add_new'
                    ? 'border-[#0E7A5D] bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF]'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {t('إضافة منتجات جديدة فقط', 'Add New Products')}
              </button>
              <button
                type="button"
                onClick={() => setImportMode('update_existing')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  importMode === 'update_existing'
                    ? 'border-[#0E7A5D] bg-[#0E7A5D]/10 text-[#0E7A5D] dark:text-[#2DD4BF]'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {t('تحديث المنتجات الحالية (بالمعرف/SKU)', 'Update Existing Products')}
              </button>
            </div>
          </div>

          {/* Upload Area / Drag & Drop */}
          {!validationResult && !importSummary && (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-10 text-center hover:border-[#0E7A5D] cursor-pointer transition-colors bg-gray-50/50 dark:bg-[#16201B]"
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".xlsx, .xls"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
              <UploadCloud className="w-12 h-12 text-[#0E7A5D] mx-auto mb-3" />
              <h4 className="text-base font-black text-gray-900 dark:text-white mb-1">
                {t('اسحب وأفلت ملف الإكسيل هنا، أو انقر للاختيار', 'Drag & drop Excel file here, or click to browse')}
              </h4>
              <p className="text-xs text-gray-500">
                {t('يدعم صيغ .xlsx و .xls (الحد الأقصى 500 منتج في المرة الواحدة)', 'Supports .xlsx & .xls formats')}
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-10 space-y-3">
              <RefreshCw className="w-8 h-8 text-[#0E7A5D] animate-spin mx-auto" />
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {t('جاري قراءة وفحص بيانات الملف والتحقق من الحقول...', 'Validating rows and product columns...')}
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Validation Summary and Preview */}
          {validationResult && !importSummary && (
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1C2721] border border-gray-200 dark:border-gray-800 text-center">
                  <span className="text-xs text-gray-500">{t('إجمالي الصفوف', 'Total Rows')}</span>
                  <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                    {validationResult.totalRows}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">{t('جاهز للاستيراد (صحيح)', 'Valid Rows')}</span>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    {validationResult.validRows.length}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-center">
                  <span className="text-xs text-rose-700 dark:text-rose-400 font-bold">{t('صفوف تحتوي أخطاء', 'Error Rows')}</span>
                  <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">
                    {validationResult.invalidRows.length}
                  </p>
                </div>
              </div>

              {/* Preview Table */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-3 bg-gray-50 dark:bg-[#1C2721] border-b border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300">
                  {t('معاينة عينة من المنتجات المستوردة:', 'Import Preview:')}
                </div>
                <div className="overflow-x-auto max-h-60">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-gray-100 dark:bg-[#18231D] text-gray-600 dark:text-gray-400 sticky top-0">
                      <tr>
                        <th className="p-2.5">#</th>
                        <th className="p-2.5">{t('المنتج (عربي/إنجليزي)', 'Product Name')}</th>
                        <th className="p-2.5">{t('التصنيف', 'Category')}</th>
                        <th className="p-2.5">{t('السعر', 'Price')}</th>
                        <th className="p-2.5">{t('المخزون', 'Stock')}</th>
                        <th className="p-2.5">SKU</th>
                        <th className="p-2.5">{t('الحالة', 'Status')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {validationResult.validRows.slice(0, 10).map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#1F2C24]">
                          <td className="p-2.5 font-mono text-gray-400">{row.rowNumber}</td>
                          <td className="p-2.5 font-bold text-gray-900 dark:text-white">
                            {row.nameAr}
                          </td>
                          <td className="p-2.5 text-gray-500">{row.category}</td>
                          <td className="p-2.5 font-bold text-[#0E7A5D]">{row.price} ج.م</td>
                          <td className="p-2.5">{row.stock}</td>
                          <td className="p-2.5 font-mono">{row.sku}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              {t('صالح', 'Valid')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Error Rows Report if any */}
              {validationResult.invalidRows.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-2">
                  <h5 className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t('تقرير الأخطاء المكتشفة في الصفوف (لن يتم استيرادها):', 'Error Log (these rows will be skipped):')}</span>
                  </h5>
                  <ul className="text-xs text-rose-600 dark:text-rose-300 space-y-1 max-h-32 overflow-y-auto">
                    {validationResult.invalidRows.map((inv, idx) => (
                      <li key={idx} className="font-mono">
                        • {t(`الصف ${inv.rowNumber}: `, `Row ${inv.rowNumber}: `)}
                        {inv.errors.join(' | ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Execute Import CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100"
                >
                  {t('إلغاء واختيار ملف آخر', 'Cancel & Choose Another')}
                </button>

                <button
                  type="button"
                  disabled={isImporting || validationResult.validRows.length === 0}
                  onClick={handleExecuteImport}
                  className="px-8 py-3 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-lg shadow-[#0E7A5D]/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isImporting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t('جاري الحفظ في قاعدة البيانات...', 'Saving to Database...')}</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>
                        {t(
                          `تأكيد استيراد (${validationResult.validRows.length}) منتج`,
                          `Confirm Import of ${validationResult.validRows.length} Products`
                        )}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success Summary Report */}
          {importSummary && (
            <div className="p-8 text-center space-y-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-3xl border border-emerald-200 dark:border-emerald-800">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-black text-gray-900 dark:text-white">
                  {t('اكتملت عملية استيراد المنتجات بنجاح!', 'Product Import Completed Successfully!')}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {t('تم تحديث متجر عالم الحيوان فورًا وتم حفظ التغييرات بشكل دائم.', 'Storefront and database updated immediately.')}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs">
                <div className="p-3 bg-white dark:bg-[#151D18] rounded-xl border border-emerald-200">
                  <span className="text-gray-500">{t('أُضيفت حديثًا', 'Added')}</span>
                  <p className="text-xl font-black text-emerald-600 mt-1">{importSummary.added}</p>
                </div>
                <div className="p-3 bg-white dark:bg-[#151D18] rounded-xl border border-emerald-200">
                  <span className="text-gray-500">{t('تم تحديثها', 'Updated')}</span>
                  <p className="text-xl font-black text-blue-600 mt-1">{importSummary.updated}</p>
                </div>
                <div className="p-3 bg-white dark:bg-[#151D18] rounded-xl border border-emerald-200">
                  <span className="text-gray-500">{t('تم تجاهلها', 'Skipped')}</span>
                  <p className="text-xl font-black text-gray-500 mt-1">{importSummary.skipped}</p>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#0E7A5D] hover:bg-[#095943] text-white text-xs font-bold shadow-md transition-colors"
                >
                  {t('إغلاق والعودة لقائمة المنتجات', 'Done & View Products')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
