import { prisma } from '@/lib/prisma';

// Helper to check if Prisma is available
function requirePrisma() {
  if (!prisma) {
    throw new Error('Database not configured. Please set DATABASE_URL in .env file');
  }
  return prisma;
}
import { OrderStatus } from '@prisma/client';

export interface CreateSaleInput {
  productId: string;
  sellerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  quantity: number;
  totalAmount: number;
  status?: OrderStatus;
  aliExpressOrderId?: string;
  trackingNumber?: string;
  shippingAddress?: Record<string, any>;
}

export interface UpdateSaleInput extends Partial<CreateSaleInput> {
  id: string;
}

/**
 * Get all sales
 */
export async function getSales(filters?: {
  sellerId?: string;
  productId?: string;
  status?: OrderStatus;
  startDate?: Date;
  endDate?: Date;
}) {
  const where: any = {};

  if (filters?.sellerId) {
    where.sellerId = filters.sellerId;
  }
  if (filters?.productId) {
    where.productId = filters.productId;
  }
  if (filters?.status) {
    where.status = filters.status;
  }
  if (filters?.startDate || filters?.endDate) {
    where.createdAt = {};
    if (filters.startDate) {
      where.createdAt.gte = filters.startDate;
    }
    if (filters.endDate) {
      where.createdAt.lte = filters.endDate;
    }
  }

  return requirePrisma().sale.findMany({
    where,
    include: {
      product: true,
      seller: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get sale by ID
 */
export async function getSaleById(id: string) {
  return requirePrisma().sale.findUnique({
    where: { id },
    include: {
      product: true,
      seller: true,
    },
  });
}

/**
 * Create a new sale
 */
export async function createSale(data: CreateSaleInput) {
  // Get product and seller for denormalized fields
  const [product, seller] = await Promise.all([
    requirePrisma().product.findUnique({ where: { id: data.productId } }),
    requirePrisma().user.findUnique({ where: { id: data.sellerId } }),
  ]);

  if (!product || !seller) {
    throw new Error('Product or seller not found');
  }

  return requirePrisma().sale.create({
    data: {
      ...data,
      productName: product.name,
      sellerName: seller.name,
      status: data.status || 'pending',
    },
  });
}

/**
 * Update a sale
 */
export async function updateSale(data: UpdateSaleInput) {
  const { id, ...updateData } = data;
  return requirePrisma().sale.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(startDate?: Date, endDate?: Date) {
  const dateFilter: any = {};
  if (startDate || endDate) {
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;
  }

  const where = Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};

  const [totalSales, totalUsers, totalProducts, revenueData] = await Promise.all([
    requirePrisma().sale.count({ where }),
    requirePrisma().user.count(),
    requirePrisma().product.count(),
    requirePrisma().sale.aggregate({
      where: {
        ...where,
        status: 'completed',
      },
      _sum: {
        totalAmount: true,
      },
    }),
  ]);

  return {
    totalSales,
    totalUsers,
    totalProducts,
    revenue: revenueData._sum.totalAmount || 0,
  };
}

