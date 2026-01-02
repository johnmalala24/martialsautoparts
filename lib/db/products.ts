import { prisma } from '@/lib/prisma';

// Helper to check if Prisma is available
function requirePrisma() {
  if (!prisma) {
    throw new Error('Database not configured. Please set DATABASE_URL in .env file');
  }
  return prisma;
}
import { Product, StockStatus, ProductStatus, ProductType } from '@prisma/client';

export interface CreateProductInput {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  stockStatus?: StockStatus;
  productType?: ProductType;
  status?: ProductStatus;
  oemNumber?: string;
  aliExpressProductId?: string;
  aliExpressSkuId?: string;
  aliExpressUrl?: string;
  compatibility?: string[];
  specifications?: Record<string, string>;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

/**
 * Get all products
 */
export async function getProducts(filters?: {
  category?: string;
  brand?: string;
  stockStatus?: StockStatus;
  status?: ProductStatus;
  search?: string;
}) {
  const where: any = {};

  if (filters?.category) {
    where.category = filters.category;
  }
  if (filters?.brand) {
    where.brand = filters.brand;
  }
  if (filters?.stockStatus) {
    where.stockStatus = filters.stockStatus;
  }
  if (filters?.status) {
    where.status = filters.status;
  }
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { description: { contains: filters.search } },
      { brand: { contains: filters.search } },
    ];
  }

  return requirePrisma().product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      inventory: true,
    },
  });
}

/**
 * Get product by ID
 */
export async function getProductById(id: string) {
  return requirePrisma().product.findUnique({
    where: { id },
    include: {
      inventory: true,
    },
  });
}

/**
 * Create a new product
 */
export async function createProduct(data: CreateProductInput) {
  return requirePrisma().product.create({
    data: {
      ...data,
      images: data.images || [data.image],
      compatibility: data.compatibility || [],
      specifications: data.specifications || {},
    },
  });
}

/**
 * Update a product
 */
export async function updateProduct(data: UpdateProductInput) {
  const { id, ...updateData } = data;
  return requirePrisma().product.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string) {
  return requirePrisma().product.delete({
    where: { id },
  });
}

