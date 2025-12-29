# Test Users Guide

This document lists all test users available for testing different roles in the Martial's Auto Parts application.

## Dashboard Access URLs

All dashboards can be accessed using the role name in the URL:
- `/dashboard/admin` - Admin Dashboard
- `/dashboard/owner` - Owner Dashboard
- `/dashboard/manager` - Manager Dashboard
- `/dashboard/seller` - Seller Dashboard

## Test Users by Role

### Admin Users

1. **John Admin**
   - Email: `admin@martials.com`
   - Phone: `555-123-4567`
   - Dashboard: `/dashboard/admin`
   - Access: Full system access, user management, product management, sales, inventory, settings

2. **Alex Administrator**
   - Email: `alex.admin@martials.com`
   - Phone: `555-123-4571`
   - Dashboard: `/dashboard/admin`
   - Access: Full system access, user management, product management, sales, inventory, settings

### Owner Users

1. **Sarah Owner**
   - Email: `owner@martials.com`
   - Phone: `555-123-4568`
   - Dashboard: `/dashboard/owner`
   - Access: Business overview, analytics, products, seller performance tracking

2. **David Business Owner**
   - Email: `david.owner@martials.com`
   - Phone: `555-123-4572`
   - Dashboard: `/dashboard/owner`
   - Access: Business overview, analytics, products, seller performance tracking

### Manager Users

1. **Mike Manager**
   - Email: `manager@martials.com`
   - Phone: `555-123-4569`
   - Dashboard: `/dashboard/manager`
   - Access: Inventory management, low stock alerts, approval workflow

2. **Jennifer Operations Manager**
   - Email: `jennifer.manager@martials.com`
   - Phone: `555-123-4573`
   - Dashboard: `/dashboard/manager`
   - Access: Inventory management, low stock alerts, approval workflow

3. **Tom Warehouse Manager**
   - Email: `tom.manager@martials.com`
   - Phone: `555-123-4574`
   - Dashboard: `/dashboard/manager`
   - Access: Inventory management, low stock alerts, approval workflow

### Seller Users

1. **Lisa Seller**
   - Email: `seller@martials.com`
   - Phone: `555-123-4570`
   - Dashboard: `/dashboard/seller`
   - Access: Create sales, view sales history, manage customer inquiries

2. **Robert Sales Rep**
   - Email: `robert.seller@martials.com`
   - Phone: `555-123-4575`
   - Dashboard: `/dashboard/seller`
   - Access: Create sales, view sales history, manage customer inquiries

3. **Emma Sales Associate**
   - Email: `emma.seller@martials.com`
   - Phone: `555-123-4576`
   - Dashboard: `/dashboard/seller`
   - Access: Create sales, view sales history, manage customer inquiries

4. **James Sales Agent**
   - Email: `james.seller@martials.com`
   - Phone: `555-123-4577`
   - Dashboard: `/dashboard/seller`
   - Access: Create sales, view sales history, manage customer inquiries

5. **Maria Sales Consultant**
   - Email: `maria.seller@martials.com`
   - Phone: `555-123-4578`
   - Dashboard: `/dashboard/seller`
   - Access: Create sales, view sales history, manage customer inquiries

## Quick Testing Guide

### Testing Admin Dashboard
1. Navigate to: `http://localhost:3000/dashboard/admin`
2. Test features:
   - View overview with stats
   - Manage users at `/dashboard/admin/users`
   - Manage products at `/dashboard/admin/products`
   - View all sales at `/dashboard/admin/sales`
   - Manage inventory at `/dashboard/admin/inventory`
   - Access settings at `/dashboard/admin/settings`

### Testing Owner Dashboard
1. Navigate to: `http://localhost:3000/dashboard/owner`
2. Test features:
   - View business overview with revenue charts
   - View analytics at `/dashboard/owner/analytics`
   - Browse products at `/dashboard/owner/products`
   - View seller performance at `/dashboard/owner/sellers`

### Testing Manager Dashboard
1. Navigate to: `http://localhost:3000/dashboard/manager`
2. Test features:
   - View inventory overview
   - Check low stock alerts at `/dashboard/manager/alerts`
   - Review approvals at `/dashboard/manager/approval`
   - Manage inventory at `/dashboard/manager/inventory`

### Testing Seller Dashboard
1. Navigate to: `http://localhost:3000/dashboard/seller`
2. Test features:
   - View personal sales stats
   - Create new sale at `/dashboard/seller/create-sale`
   - View sales history at `/dashboard/seller/my-sales`
   - Manage inquiries at `/dashboard/seller/inquiries`

## Notes

- All users have `active` status
- All phone numbers follow the format: `555-123-XXXX`
- User IDs are sequential for easy reference
- All users were created between January and March 2024 for realistic test data
- Currently, there's no authentication, so you can access any dashboard directly via URL
- User data is stored in `lib/mock-data.ts` and will be replaced with database data when Prisma is connected









