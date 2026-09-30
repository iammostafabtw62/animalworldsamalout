import * as XLSX from 'xlsx';
import { Product } from '../types';

export interface ExcelProductRow {
  productId: string;
  nameAr: string;
  nameEn: string;
  category: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  discount: number;
  stock: number;
  sku: string;
  imageUrl: string;
  status: string; // 'published' | 'draft' | 'نشط' | 'مسودة'
  rowNumber: number;
  errors: string[];
  isValid: boolean;
}

export interface ExcelValidationResult {
  totalRows: number;
  validRows: ExcelProductRow[];
  invalidRows: ExcelProductRow[];
  hasErrors: boolean;
}

/**
 * Downloads a standardized Excel template for Animal World products
 */
export function downloadProductExcelTemplate() {
  const headers = [
    'Product ID',
    'Product Name (Arabic)',
    'Product Name (English)',
    'Category',
    'Description (Arabic)',
    'Description (English)',
    'Price (EGP)',
    'Discount (%)',
    'Stock Quantity',
    'SKU',
    'Product Image URL',
    'Status'
  ];

  const exampleRow = [
    'AW-PROD-999',
    'طعام كلاب فاخر باللحم والخضار 3 كجم',
    'Premium Beef & Vegetable Dog Food 3kg',
    'dog-food',
    'طعام صحي متوازن غني بالبروتين للكلاب البالغة',
    'Complete balanced high-protein nutrition for adult dogs',
    '450',
    '10',
    '25',
    'SKU-BEEF-001',
    'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800',
    'published'
  ];

  const ws = XLSX.utils.aoa_to_sheet([headers, exampleRow]);
  // set column widths
  ws['!cols'] = [
    { wch: 15 },
    { wch: 35 },
    { wch: 35 },
    { wch: 15 },
    { wch: 40 },
    { wch: 40 },
    { wch: 12 },
    { wch: 12 },
    { wch: 14 },
    { wch: 16 },
    { wch: 35 },
    { wch: 12 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Products Template');
  XLSX.writeFile(wb, 'animal_world_products_template.xlsx');
}

/**
 * Parses and validates an uploaded Excel file
 */
export async function parseAndValidateExcel(
  file: File,
  existingProducts: Product[]
): Promise<ExcelValidationResult> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert to 2D array
  const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  if (rows.length < 2) {
    throw new Error('الملف فارغ أو لا يحتوي على صفوف بيانات.');
  }

  // Header is row 0
  const dataRows = rows.slice(1);

  const seenSkus = new Set<string>();
  const seenIds = new Set<string>();
  const parsedRows: ExcelProductRow[] = [];

  for (let i = 0; i < dataRows.length; i++) {
    const r = dataRows[i];
    if (!r || r.length === 0 || r.every((cell: any) => cell === undefined || cell === '')) {
      continue; // Skip empty rows
    }

    const rowNum = i + 2; // 1-indexed Excel row
    const errors: string[] = [];

    const productId = String(r[0] || '').trim();
    const nameAr = String(r[1] || '').trim();
    const nameEn = String(r[2] || '').trim();
    const category = String(r[3] || 'cat-food').trim();
    const descriptionAr = String(r[4] || '').trim();
    const descriptionEn = String(r[5] || '').trim();
    const price = Number(r[6]);
    const discount = Number(r[7] || 0);
    const stock = Number(r[8] !== undefined && r[8] !== '' ? r[8] : 0);
    const sku = String(r[9] || '').trim();
    const imageUrl = String(r[10] || '').trim();
    const status = String(r[11] || 'published').trim();

    // Validations
    if (!productId) {
      errors.push('معرف المنتج (Product ID) مطلوب.');
    } else if (seenIds.has(productId)) {
      errors.push(`معرف المنتج مكرر في الملف: ${productId}`);
    } else {
      seenIds.add(productId);
    }

    if (!nameAr && !nameEn) {
      errors.push('اسم المنتج مطلوب (بالعربية أو الإنجليزية).');
    }

    if (isNaN(price) || price <= 0) {
      errors.push('السعر يجب أن يكون رقمًا أكبر من الصفر.');
    }

    if (isNaN(stock) || stock < 0) {
      errors.push('الكمية يجب أن تكون رقمًا صحيحًا غير سالب.');
    }

    if (!sku) {
      errors.push('رمز المخزون (SKU) مطلوب.');
    } else if (seenSkus.has(sku)) {
      errors.push(`رمز المخزون (SKU) مكرر في الملف: ${sku}`);
    } else {
      seenSkus.add(sku);
    }

    const rowObj: ExcelProductRow = {
      productId: productId || `PROD-${Date.now()}-${i}`,
      nameAr: nameAr || nameEn,
      nameEn: nameEn || nameAr,
      category,
      descriptionAr: descriptionAr || nameAr,
      descriptionEn: descriptionEn || nameEn,
      price: isNaN(price) ? 0 : price,
      discount: isNaN(discount) ? 0 : Math.max(0, Math.min(100, discount)),
      stock: isNaN(stock) ? 0 : Math.floor(stock),
      sku: sku || `SKU-${Date.now()}-${i}`,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600',
      status: status.toLowerCase() === 'draft' || status === 'مسودة' ? 'draft' : 'published',
      rowNumber: rowNum,
      errors,
      isValid: errors.length === 0
    };

    parsedRows.push(rowObj);
  }

  const validRows = parsedRows.filter((r) => r.isValid);
  const invalidRows = parsedRows.filter((r) => !r.isValid);

  return {
    totalRows: parsedRows.length,
    validRows,
    invalidRows,
    hasErrors: invalidRows.length > 0
  };
}

/**
 * Transforms validated Excel rows into full Product objects
 */
export function convertExcelRowsToProducts(
  rows: ExcelProductRow[],
  existingProducts: Product[],
  mode: 'add_new' | 'update_existing'
): { updatedProducts: Product[]; addedCount: number; updatedCount: number; skippedCount: number } {
  let updatedList = [...existingProducts];
  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const row of rows) {
    const existingIndex = updatedList.findIndex(
      (p) => p.id === row.productId || p.sku.toLowerCase() === row.sku.toLowerCase()
    );

    const salePrice =
      row.discount > 0 ? Math.round(row.price * (1 - row.discount / 100)) : undefined;

    if (existingIndex >= 0) {
      if (mode === 'update_existing') {
        const current = updatedList[existingIndex];
        updatedList[existingIndex] = {
          ...current,
          nameAr: row.nameAr || current.nameAr,
          nameEn: row.nameEn || current.nameEn,
          category: row.category || current.category,
          descriptionAr: row.descriptionAr || current.descriptionAr,
          descriptionEn: row.descriptionEn || current.descriptionEn,
          price: row.price,
          salePrice,
          discountPercentage: row.discount > 0 ? row.discount : undefined,
          stock: row.stock,
          sku: row.sku,
          images: row.imageUrl ? [row.imageUrl, ...current.images.slice(1)] : current.images,
          published: row.status === 'published',
          updatedAt: new Date().toISOString()
        };
        updatedCount++;
      } else {
        // Skip duplicate in add mode
        skippedCount++;
      }
    } else {
      const newProduct: Product = {
        id: row.productId,
        sku: row.sku,
        nameAr: row.nameAr,
        nameEn: row.nameEn,
        descriptionAr: row.descriptionAr,
        descriptionEn: row.descriptionEn,
        category: row.category,
        petType: row.category.includes('dog') ? 'dog' : row.category.includes('cat') ? 'cat' : 'all',
        brand: 'Animal World Select',
        price: row.price,
        salePrice,
        discountPercentage: row.discount > 0 ? row.discount : undefined,
        stock: row.stock,
        lowStockThreshold: 5,
        images: [row.imageUrl],
        published: row.status === 'published',
        rating: 5.0,
        reviewCount: 0,
        isNew: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      updatedList.unshift(newProduct);
      addedCount++;
    }
  }

  return {
    updatedProducts: updatedList,
    addedCount,
    updatedCount,
    skippedCount
  };
}
