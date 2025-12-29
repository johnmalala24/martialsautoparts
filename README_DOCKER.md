# Docker & PostgreSQL Setup - Quick Start

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL running on your host machine (via pgAdmin 4)
- Node.js 20+ (for local development)

## Important: PostgreSQL Setup

**PostgreSQL is running on your host machine via pgAdmin 4**, not in Docker. The Docker container connects to your host's PostgreSQL instance.

### Ensure PostgreSQL is Running

1. Open pgAdmin 4
2. Verify your PostgreSQL server is running
3. Make sure the database `martials_auto_parts` exists (or it will be created on first migration)
4. Verify connection details:
   - Host: localhost
   - Port: 5432
   - User: postgres
   - Password: Mombasa@254

## Quick Start with Docker

### 1. Set Environment Variable (Optional)

For local development without Docker, create a `.env.local` file:

```env
DATABASE_URL="postgresql://postgres:Mombasa%40254@localhost:5432/martials_auto_parts?connect_timeout=10&sslmode=prefer"
```

**Important**: The `@` in the password must be URL-encoded as `%40`.

### 2. Start Docker Container

```bash
# Build and start the application
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

This will start:
- Next.js application on port 3000
- Connects to your host's PostgreSQL (pgAdmin 4)

### 3. Initialize Database

```bash
# Run migrations
docker-compose exec app npx prisma migrate dev

# Or push schema (for development)
docker-compose exec app npx prisma db push

# Seed the database
docker-compose exec app npm run db:seed
```

### 4. Access the Application

- **Web App**: http://localhost:3000
- **Prisma Studio**: Run `docker-compose exec app npx prisma studio` then open http://localhost:5555

## Local Development (Without Docker)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Create `.env.local`:
```env
DATABASE_URL="postgresql://postgres:Mombasa%40254@localhost:5432/martials_auto_parts?connect_timeout=10&sslmode=prefer"
```

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

## Database Connection Details

- **Host**: localhost (host machine) or `host.docker.internal` (from Docker container)
- **Port**: 5432
- **Database**: martials_auto_parts
- **User**: postgres
- **Password**: Mombasa@254 (URL-encoded as `Mombasa%40254` in connection string)
- **Running via**: pgAdmin 4 on your host machine

## Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app
docker-compose logs -f postgres

# Execute commands in app container
docker-compose exec app npm run db:generate
docker-compose exec app npx prisma studio

# Rebuild after changes
docker-compose up --build --force-recreate
```

## Troubleshooting

### Connection Issues

1. **Verify PostgreSQL is running on host**:
   - Open pgAdmin 4
   - Check that your PostgreSQL server is running
   - Verify the server is accessible on localhost:5432

2. **Check Docker container logs**:
   ```bash
   docker-compose logs app
   ```

3. **Verify connection string**: Make sure `@` is encoded as `%40` in the password

4. **Windows/Mac host.docker.internal**:
   - If connection fails, try using your machine's IP address instead of `host.docker.internal`
   - Or use `172.17.0.1` (Docker bridge network gateway)

5. **Create database if it doesn't exist**:
   ```sql
   -- Run in pgAdmin 4 Query Tool
   CREATE DATABASE martials_auto_parts;
   ```

### Reset Database

**Warning**: This will delete all data in your PostgreSQL database!

```bash
# Option 1: Drop and recreate via Prisma
docker-compose exec app npx prisma migrate reset

# Option 2: Manually in pgAdmin 4
# Right-click database → Delete/Drop → Recreate → Run migrations
```

### Port Conflicts

If port 5432 is already in use by another PostgreSQL instance:
1. Check pgAdmin 4 to see which port your PostgreSQL is using
2. Update `docker-compose.yml` DATABASE_URL to use the correct port
3. Update `.env.local` if using local development

## Production Deployment

For production, update the connection string to point to your production PostgreSQL instance and ensure proper security measures are in place.

