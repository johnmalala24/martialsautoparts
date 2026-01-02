import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only initialize Prisma if DATABASE_URL is set and doesn't contain Prisma Accelerate
// Also check if it's a valid PostgreSQL connection string
const databaseUrl = process.env.DATABASE_URL;

// Debug logging only in development
if (process.env.NODE_ENV === 'development') {
  if (!databaseUrl) {
    console.warn('⚠️ DATABASE_URL is not set in environment variables');
  } else {
    console.log('✅ DATABASE_URL found:', databaseUrl.replace(/:([^:@]+)@/, ':****@'));
  }
}

const shouldUsePrisma = databaseUrl && 
  !databaseUrl.startsWith('prisma+postgres://') &&
  !databaseUrl.startsWith('prisma://') &&
  (databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://'));

let prismaInstance: PrismaClient | null = null;

if (shouldUsePrisma) {
  try {
    prismaInstance =
      globalForPrisma.prisma ??
      new PrismaClient({
        // Only log errors in production, queries/warns only in development
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      });

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
  } catch (error) {
    // Always log initialization errors
    console.error('❌ Prisma client initialization failed:', error);
    prismaInstance = null;
  }
} else if (!databaseUrl && process.env.NODE_ENV === 'development') {
  // Only warn in development
  console.warn('⚠️ Prisma client not initialized: DATABASE_URL not found');
} else if (databaseUrl && process.env.NODE_ENV === 'development') {
  // Only warn in development
  console.warn('⚠️ Prisma client not initialized: Invalid DATABASE_URL format');
}

// Export a proxy that handles missing Prisma gracefully
export const prisma = prismaInstance as PrismaClient | null;

