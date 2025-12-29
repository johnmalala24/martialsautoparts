export type UserRole = 'admin' | 'owner' | 'manager' | 'seller';
export type ProductStatus = 'active' | 'inactive' | 'pending';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'completed';
export type ProductType = 'oem' | 'aftermarket';

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  images: string[];
  stockStatus: StockStatus;
  productType: ProductType;
  compatibility: string[];
  specifications: Record<string, string>;
  oemNumber?: string;
  // AliExpress/Alibaba integration
  aliExpressProductId?: string; // AliExpress product ID for dropshipping
  aliExpressSkuId?: string; // Specific SKU ID if needed
  aliExpressUrl?: string; // Direct link to AliExpress product (optional)
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  sellerId: string;
  sellerName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface DashboardStats {
  totalSales: number;
  totalUsers: number;
  totalProducts: number;
  revenue: number;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  stockStatus: StockStatus;
  lastRestocked: Date;
}