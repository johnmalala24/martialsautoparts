import { compare, hash } from 'bcryptjs';
import { prisma } from './prisma';
import { UserRole } from '@prisma/client';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  phone?: string,
  role: UserRole = 'seller'
) {
  if (!prisma) {
    throw new Error('Database not configured. Please set DATABASE_URL in .env file');
  }
  
  const hashedPassword = await hashPassword(password);
  
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      status: 'active',
    },
  });
}

export async function authenticateUser(email: string, password: string) {
  if (!prisma) {
    throw new Error('Database not configured. Please set DATABASE_URL in .env file');
  }
  
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUserByEmail(email: string) {
  if (!prisma) {
    throw new Error('Database not configured. Please set DATABASE_URL in .env file');
  }
  
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

