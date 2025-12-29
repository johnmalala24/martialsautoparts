import { prisma } from '@/lib/prisma';
import { UserRole, UserStatus } from '@prisma/client';

export interface CreateUserInput {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  id: string;
}

/**
 * Get all users
 */
export async function getUsers(filters?: {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
}) {
  const where: any = {};

  if (filters?.role) {
    where.role = filters.role;
  }
  if (filters?.status) {
    where.status = filters.status;
  }
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { email: { contains: filters.search } },
    ];
  }

  return prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      sales: {
        take: 10,
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Create a new user
 */
export async function createUser(data: CreateUserInput) {
  // Ensure password is provided since it's now required
  if (!data.password) {
    throw new Error('Password is required');
  }
  
  return prisma.user.create({
    data: {
      ...data,
      password: data.password, // Explicitly set password
    },
  });
}

/**
 * Update a user
 */
export async function updateUser(data: UpdateUserInput) {
  const { id, ...updateData } = data;
  return prisma.user.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Delete a user
 */
export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

