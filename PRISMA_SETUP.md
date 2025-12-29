# Prisma Setup Guide

This project uses Prisma as the ORM for database management with PostgreSQL.

## Initial Setup

### 1. Configure Database URL

Create a `.env` file in the root directory (if it doesn't exist) and add your database connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/martials_auto_parts?schema=public"
```

**For development/testing, you can use:**
- Local PostgreSQL: `postgresql://postgres:password@localhost:5432/martials_auto_parts`
- Docker PostgreSQL: `postgresql://postgres:postgres@localhost:5432/martials_auto_parts`
- Cloud providers (Heroku, Railway, Supabase, etc.) will provide their own connection strings

### 2. Generate Prisma Client

After updating the schema, generate the Prisma Client:

```bash
npm run db:generate
```

### 3. Run Migrations

When you're ready to connect to your database, create and apply migrations:

```bash
# Create a new migration
npm run db:migrate

# Or push schema directly (for development only)
npm run db:push
```

### 4. Seed the Database (Optional)

Seed the database with initial data:

```bash
npm run db:seed
```

## Available Scripts

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database without migrations (dev only)
- `npm run db:migrate` - Create and apply a new migration
- `npm run db:migrate:deploy` - Deploy migrations (production)
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed the database with initial data

## Using Prisma in Your Code

Import the Prisma client from `lib/prisma.ts`:

```typescript
import { prisma } from '@/lib/prisma';

// Example: Get all products
const products = await prisma.product.findMany();

// Example: Create a user
const user = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'seller',
  },
});
```

## Database Schema

The schema includes the following models:

- **User**: Users with roles (admin, owner, manager, seller)
- **Product**: Product catalog with AliExpress integration support
- **Sale**: Sales/orders with customer and product information
- **InventoryItem**: Inventory tracking for products

## Next Steps

1. ✅ Prisma is installed and configured
2. ⏳ Connect to your PostgreSQL database
3. ⏳ Run migrations to create tables
4. ⏳ Seed initial data (optional)
5. ⏳ Start using Prisma in your API routes

## Notes

- The Prisma client is singleton-patterned to prevent multiple instances in development
- All database models support soft deletes through status fields
- JSON fields are used for arrays and flexible data structures
- Relations are properly configured with cascade deletes where appropriate

