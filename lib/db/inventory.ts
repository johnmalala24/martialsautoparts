import { prisma } from '@/lib/prisma';
import { StockStatus } from '@prisma/client';

export interface CreateInventoryItemInput {
  productId: string;
  quantity: number;
  stockStatus?: StockStatus;
  managerId?: string;
}

export interface UpdateInventoryItemInput extends Partial<CreateInventoryItemInput> {
  id: string;
}

/**
 * Get all inventory items
 */
export async function getInventoryItems(filters?: {
  stockStatus?: StockStatus;
  managerId?: string;
  lowStock?: boolean; // Items with low stock status
}) {
  const where: any = {};

  if (filters?.stockStatus) {
    where.stockStatus = filters.stockStatus;
  }
  if (filters?.managerId) {
    where.managerId = filters.managerId;
  }
  if (filters?.lowStock) {
    where.stockStatus = 'low_stock';
  }

  return prisma.inventoryItem.findMany({
    where,
    include: {
      product: true,
      manager: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { lastRestocked: 'desc' },
  });
}

/**
 * Get inventory item by product ID
 */
export async function getInventoryItemByProductId(productId: string) {
  return prisma.inventoryItem.findUnique({
    where: { productId },
    include: {
      product: true,
      manager: true,
    },
  });
}

/**
 * Create or update inventory item
 */
export async function upsertInventoryItem(data: CreateInventoryItemInput) {
  // Get product for denormalized field
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return prisma.inventoryItem.upsert({
    where: { productId: data.productId },
    update: {
      quantity: data.quantity,
      stockStatus: data.stockStatus,
      managerId: data.managerId,
      lastRestocked: new Date(),
    },
    create: {
      ...data,
      productName: product.name,
      stockStatus: data.stockStatus || 'out_of_stock',
      lastRestocked: new Date(),
    },
  });
}

/**
 * Update inventory quantity
 */
export async function updateInventoryQuantity(productId: string, quantity: number) {
  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { productId },
  });

  if (!inventoryItem) {
    throw new Error('Inventory item not found');
  }

  // Determine stock status based on quantity
  let stockStatus: StockStatus = 'out_of_stock';
  if (quantity > 20) {
    stockStatus = 'in_stock';
  } else if (quantity > 0) {
    stockStatus = 'low_stock';
  }

  return prisma.inventoryItem.update({
    where: { productId },
    data: {
      quantity,
      stockStatus,
      lastRestocked: new Date(),
    },
  });
}

/**
 * Restock inventory
 */
export async function restockInventory(productId: string, additionalQuantity: number) {
  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { productId },
  });

  if (!inventoryItem) {
    throw new Error('Inventory item not found');
  }

  const newQuantity = inventoryItem.quantity + additionalQuantity;
  return updateInventoryQuantity(productId, newQuantity);
}

