# pgAdmin 4 Setup Guide

This guide explains how to use your existing PostgreSQL instance (via pgAdmin 4) with the Docker setup.

## Prerequisites

- pgAdmin 4 installed and running
- PostgreSQL server running and accessible
- Database connection details:
  - Host: localhost
  - Port: 5432
  - User: postgres
  - Password: Mombasa@254

## Setup Steps

### 1. Verify PostgreSQL is Running

1. Open pgAdmin 4
2. Connect to your PostgreSQL server
3. Verify the server is running and accessible
4. Note the port number (usually 5432)

### 2. Create the Database (Optional)

The database will be created automatically on first migration, but you can create it manually:

1. In pgAdmin 4, right-click on "Databases"
2. Select "Create" → "Database..."
3. Name: `martials_auto_parts`
4. Click "Save"

### 3. Verify Connection

Test the connection from pgAdmin 4:
- Server should be accessible
- You can connect with user `postgres` and password `Mombasa@254`

### 4. Start Docker Application

```bash
# Build and start
docker-compose up --build
```

The Docker container will connect to your host's PostgreSQL via `host.docker.internal`.

### 5. Initialize Database Schema

```bash
# Run migrations
docker-compose exec app npx prisma migrate dev

# Or push schema (for development)
docker-compose exec app npx prisma db push

# Seed database
docker-compose exec app npm run db:seed
```

## Connection Details

### From Docker Container
- Host: `host.docker.internal` (special DNS name to access host)
- Port: `5432` (or your PostgreSQL port)
- Connection string: `postgresql://postgres:Mombasa%40254@host.docker.internal:5432/martials_auto_parts`

### From Local Development
- Host: `localhost`
- Port: `5432`
- Connection string: `postgresql://postgres:Mombasa%40254@localhost:5432/martials_auto_parts`

## Troubleshooting

### Docker Can't Connect to Host PostgreSQL

**Windows/Mac**: `host.docker.internal` should work automatically.

**Linux**: You may need to use your machine's IP address:
```bash
# Find your IP
ip addr show docker0

# Or use
172.17.0.1
```

Update `docker-compose.yml`:
```yaml
- DATABASE_URL=postgresql://postgres:Mombasa%40254@172.17.0.1:5432/martials_auto_parts
```

### PostgreSQL Not Accessible

1. Check PostgreSQL is running in pgAdmin 4
2. Verify firewall allows connections on port 5432
3. Check `postgresql.conf` - ensure `listen_addresses = '*'` or includes your IP
4. Check `pg_hba.conf` - ensure it allows connections

### Port Conflicts

If your PostgreSQL uses a different port:
1. Check in pgAdmin 4 → Server Properties → Connection
2. Update `docker-compose.yml` DATABASE_URL with correct port
3. Update `.env.local` for local development

## Viewing Data in pgAdmin 4

After running migrations and seeding:

1. Open pgAdmin 4
2. Navigate to: Servers → Your Server → Databases → martials_auto_parts → Schemas → public → Tables
3. You'll see tables: `users`, `products`, `sales`, `inventory`
4. Right-click any table → "View/Edit Data" → "All Rows"

## Managing Database

### Backup Database

In pgAdmin 4:
1. Right-click database → "Backup..."
2. Choose filename and location
3. Click "Backup"

### Restore Database

In pgAdmin 4:
1. Right-click database → "Restore..."
2. Select backup file
3. Click "Restore"

### Reset Database

```bash
# Via Prisma (drops and recreates)
docker-compose exec app npx prisma migrate reset

# Or manually in pgAdmin 4
# Right-click database → Delete/Drop → Recreate → Run migrations
```

## Benefits of This Setup

- ✅ Use your existing PostgreSQL installation
- ✅ Manage database via pgAdmin 4 GUI
- ✅ No need to run PostgreSQL in Docker
- ✅ Easier database administration
- ✅ Direct access to database from host machine

