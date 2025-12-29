# Docker Setup Guide

This guide explains how to run Martial's Auto Parts using Docker with Prisma and PostgreSQL.

## Current Setup

- **Database**: PostgreSQL (running on host machine via pgAdmin 4)
- **ORM**: Prisma
- **Container**: Docker Compose (Next.js app only)
- **Connection**: Docker container connects to host's PostgreSQL via `host.docker.internal`

## Quick Start

### 1. Start the Application

```bash
# Build and run the application
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The app will be available at `http://localhost:3000`

### 2. Initialize the Database

```bash
# Run migrations
docker-compose exec app npx prisma migrate dev

# Or push schema (for development)
docker-compose exec app npx prisma db push

# Seed the database
docker-compose exec app npm run db:seed
```

### 3. Access Prisma Studio

```bash
docker-compose exec app npx prisma studio
```

Then open `http://localhost:5555` in your browser.

## Database Configuration

### PostgreSQL Connection String

The application connects to PostgreSQL running on your host machine (pgAdmin 4):

**From Docker container**:
```
postgresql://postgres:Mombasa%40254@host.docker.internal:5432/martials_auto_parts?connect_timeout=10&sslmode=prefer
```

**From local development**:
```
postgresql://postgres:Mombasa%40254@localhost:5432/martials_auto_parts?connect_timeout=10&sslmode=prefer
```

**Note**: The `@` symbol in the password is URL-encoded as `%40` in the connection string.

### Prerequisites

1. **PostgreSQL must be running** on your host machine (via pgAdmin 4)
2. **Database should exist** or will be created on first migration
3. **Connection details**:
   - Host: localhost
   - Port: 5432 (or your PostgreSQL port)
   - User: postgres
   - Password: Mombasa@254
   - Database: martials_auto_parts

### Local Development (Without Docker)

If running locally without Docker, create a `.env.local` file:

```env
DATABASE_URL="postgresql://postgres:Mombasa%40254@localhost:5432/martials_auto_parts?connect_timeout=10&sslmode=prefer"
```

### Database Credentials

- **User**: postgres
- **Password**: Mombasa@254
- **Database**: martials_auto_parts
- **Port**: 5432

## Docker Commands

```bash
# Build and start containers
docker-compose up --build

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f app

# Execute commands in container
docker-compose exec app npm run db:generate
docker-compose exec app npx prisma studio

# Rebuild after changes
docker-compose up --build --force-recreate
```

## Development Workflow

### Local Development (Without Docker)

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database
npm run db:seed

# Run development server
npm run dev
```

### Production Build with Docker

```bash
# Build production image
docker-compose build

# Run production container
docker-compose up
```

## Database Files

- **PostgreSQL**: Running on host machine (pgAdmin 4)
- **Connection**: Docker container connects via `host.docker.internal`
- **Data**: Stored in your PostgreSQL data directory (configured in pgAdmin 4)

## Troubleshooting

### Database Connection Issues

1. **PostgreSQL**: Check if the postgres service is healthy:
   ```bash
   docker-compose ps
   docker-compose logs postgres
   ```

2. **Connection String**: Make sure the password is URL-encoded (`@` = `%40`)

3. **Port Conflicts**: If port 5432 is already in use, change it in docker-compose.yml:
   ```yaml
   ports:
     - "5433:5432"  # Use 5433 instead of 5432
   ```

### Reset Database

```bash
# Stop and remove volumes (WARNING: This deletes all data)
docker-compose down -v

# Rebuild and start
docker-compose up --build

# Run migrations
docker-compose exec app npx prisma migrate dev

# Seed database
docker-compose exec app npm run db:seed
```

### View Database

```bash
# Prisma Studio
docker-compose exec app npx prisma studio

# PostgreSQL CLI
docker-compose exec postgres psql -U martials -d martials_autoparts
```

## Environment Variables

Copy `.env.example` to `.env` and update as needed:

```bash
cp .env.example .env
```

## Notes

- PostgreSQL is configured and ready to use
- Database credentials are set in docker-compose.yml
- The `@` symbol in passwords must be URL-encoded as `%40` in connection strings
- Data persists in Docker volumes even after container restarts
- Use `docker-compose down -v` to completely remove database data

