import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file in project root
config({ path: resolve(process.cwd(), '.env') });

// Get DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set in .env file');
  console.error('Current working directory:', process.cwd());
  process.exit(1);
}

console.log('📡 Connecting to database:', databaseUrl.replace(/:[^:@]+@/, ':****@'));

// Create Prisma client with log configuration (matching lib/prisma.ts)
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminEmail = 'wj00083@gmail.com';
  const adminPassword = 'admin123'; // Change this to a secure password
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    
    // Update admin password if needed
    const hashedPassword = await hash(adminPassword, 12);
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        password: hashedPassword,
        role: 'admin',
        status: 'active',
      },
    });
    console.log('✅ Admin user updated');
  } else {
    const hashedPassword = await hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        status: 'active',
        phone: '+254798880398',
      },
    });
    console.log('✅ Admin user created');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('   ⚠️  Please change the password after first login!');
  }

  console.log('✅ Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
