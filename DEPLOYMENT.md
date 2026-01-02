# Deployment Guide

This guide will help you deploy Martial's Auto Parts to production.

## Prerequisites

- Node.js 20+ installed on your server
- PostgreSQL database (local or remote)
- Domain name (optional, for production)
- SSL certificate (for HTTPS in production)

## Pre-Deployment Checklist

### 1. Environment Variables

Create a `.env.production` file (or set environment variables in your hosting platform) with:

```env
DATABASE_URL="postgresql://username:password@host:port/database?connect_timeout=10&sslmode=prefer"
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Important**: 
- URL-encode special characters in passwords (e.g., `@` becomes `%40`)
- Never commit `.env.production` to version control
- Use secure, strong passwords for production database

### 2. Database Setup

1. **Create Production Database**:
   ```bash
   # Connect to your PostgreSQL server
   psql -U postgres
   
   # Create database
   CREATE DATABASE martialsautoparts;
   ```

2. **Run Migrations**:
   ```bash
   # Set DATABASE_URL environment variable
   export DATABASE_URL="your_production_database_url"
   
   # Generate Prisma Client
   npm run db:generate
   
   # Deploy migrations
   npm run db:migrate:deploy
   ```

3. **Seed Initial Data** (Optional):
   ```bash
   npm run db:seed
   ```

### 3. Build the Application

```bash
# Install dependencies
npm ci --production=false

# Build for production
npm run build
```

## Deployment Options

### Option 1: Docker Deployment (Recommended)

1. **Build Docker Image**:
   ```bash
   docker build -t martials-auto-parts .
   ```

2. **Run Container**:
   ```bash
   docker run -d \
     --name martials-app \
     -p 3000:3000 \
     -e DATABASE_URL="your_production_database_url" \
     -e NODE_ENV=production \
     --restart unless-stopped \
     martials-auto-parts
   ```

3. **Using Docker Compose**:
   ```bash
   # Update docker-compose.yml with production DATABASE_URL
   docker-compose up -d --build
   ```

### Option 2: Node.js Direct Deployment

1. **Install Dependencies**:
   ```bash
   npm ci --production=false
   ```

2. **Build Application**:
   ```bash
   npm run build
   ```

3. **Start Production Server**:
   ```bash
   npm start
   ```

4. **Using PM2** (Recommended for production):
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start application
   pm2 start npm --name "martials-auto-parts" -- start
   
   # Save PM2 configuration
   pm2 save
   
   # Setup PM2 to start on system boot
   pm2 startup
   ```

### Option 3: Platform-Specific Deployment

#### Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NODE_ENV=production`
3. Deploy automatically on push to main branch

#### Railway

1. Connect your GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy

#### DigitalOcean App Platform

1. Connect your repository
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy

## Post-Deployment

### 1. Verify Deployment

- Check application is accessible: `https://yourdomain.com`
- Test authentication: Sign up/Sign in
- Verify database connections
- Check API routes are working

### 2. Security Checklist

- [ ] HTTPS is enabled
- [ ] Environment variables are secure
- [ ] Database credentials are strong
- [ ] Admin password has been changed
- [ ] CORS is properly configured (if needed)
- [ ] Rate limiting is enabled (recommended)

### 3. Monitoring

Set up monitoring for:
- Application uptime
- Error logging
- Database performance
- Server resources

### 4. Backup Strategy

- Set up automated database backups
- Store backups securely
- Test backup restoration process

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NODE_ENV` | Yes | Set to `production` |
| `NEXT_PUBLIC_APP_URL` | Recommended | Your application URL |
| `ALIEXPRESS_APP_KEY` | No | AliExpress API key (if using) |
| `ALIEXPRESS_APP_SECRET` | No | AliExpress API secret (if using) |
| `ALIEXPRESS_ACCESS_TOKEN` | No | AliExpress access token (if using) |

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check database server is accessible
- Ensure firewall allows connections
- Verify credentials are correct

### Build Errors

- Ensure all dependencies are installed
- Check Node.js version (20+)
- Verify environment variables are set
- Check for TypeScript errors

### Runtime Errors

- Check server logs
- Verify environment variables
- Ensure database migrations are applied
- Check file permissions

## Support

For issues or questions, refer to:
- `TROUBLESHOOTING.md` - Common issues and solutions
- `PRISMA_SETUP.md` - Database setup guide
- `AUTHENTICATION_SETUP.md` - Authentication configuration

