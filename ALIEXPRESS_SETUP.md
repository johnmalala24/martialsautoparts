# AliExpress/Alibaba Integration Setup Guide

This guide explains how to set up automatic order placement with AliExpress/Alibaba when customers purchase products on your website.

## Overview

When a customer clicks "Buy Now" on a product, the system will:
1. Collect customer shipping information
2. Automatically place an order on AliExpress/Alibaba
3. The order is fulfilled directly by AliExpress/Alibaba suppliers
4. Ship directly to your customer

## Prerequisites

1. **AliExpress/Alibaba Account**: You need a business account on AliExpress or Alibaba
2. **API Access**: Register for API access through:
   - **AliExpress**: [AliExpress Open Platform](https://open.aliexpress.com/)
   - **Alibaba**: [Alibaba API Center](https://open.alibaba.com/)
3. **Dropshipping Setup**: Ensure you have dropshipping enabled on your supplier accounts

## Setup Steps

### Step 1: Register for API Access

1. Go to the AliExpress/Alibaba Open Platform
2. Create a developer account
3. Create a new application
4. Get your API credentials:
   - App Key (also called App ID)
   - App Secret
   - Access Token

### Step 2: Configure Environment Variables

Create or update your `.env.local` file with the following:

```env
# AliExpress API Configuration
ALIEXPRESS_APP_KEY=your_app_key_here
ALIEXPRESS_APP_SECRET=your_app_secret_here
ALIEXPRESS_ACCESS_TOKEN=your_access_token_here
ALIEXPRESS_API_ENDPOINT=https://api.aliexpress.com

# Optional: Use different endpoints for testing
# ALIEXPRESS_API_ENDPOINT=https://api-sandbox.aliexpress.com
```

### Step 3: Add AliExpress Product IDs to Your Products

Update your product data to include AliExpress product information:

```typescript
{
  id: '1',
  name: 'Premium Brake Pads Set',
  // ... other product fields
  aliExpressProductId: '1234567890', // AliExpress product ID
  aliExpressSkuId: '9876543210', // Optional: specific SKU ID
  aliExpressUrl: 'https://www.aliexpress.com/item/...' // Optional: direct link
}
```

### Step 4: Product Mapping

For each product in your catalog, you need to:

1. Find the corresponding product on AliExpress/Alibaba
2. Get the product ID from the URL or product page
3. (Optional) Get the SKU ID if you need to specify a particular variant
4. Add these IDs to your product data

**How to find AliExpress Product ID:**
- Look in the product URL: `https://www.aliexpress.com/item/1005001234567890.html`
- The number after `/item/` is the product ID: `1005001234567890`

## API Endpoints

### Place Order
- **Endpoint**: `POST /api/orders/aliexpress`
- **Request Body**:
```json
{
  "product": {
    "productId": "1234567890",
    "skuId": "9876543210" // optional
  },
  "quantity": 1,
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "US",
    "phone": "+1234567890",
    "email": "john@example.com"
  },
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1234567890"
}
```

### Response
```json
{
  "success": true,
  "orderId": "aliexpress_order_id",
  "trackingNumber": "tracking_number",
  "internalOrderId": "ORD-1234567890-abc123",
  "message": "Order placed successfully on AliExpress"
}
```

## Alternative Integration Methods

### Option 1: Using Third-Party Tools

If the direct API integration is complex, consider using:

1. **DSers** (for AliExpress):
   - Chrome extension for AliExpress
   - Provides API integration
   - Easier setup process

2. **Oberlo** (for AliExpress):
   - Dropshipping platform
   - API access available

3. **Alibaba Dropshipping Center**:
   - Official dropshipping solution from Alibaba
   - Includes API access

### Option 2: Webhook Integration

Instead of direct API calls, you could:
1. Use webhook services like Zapier or Make.com
2. Trigger webhooks when orders are placed
3. Let the service handle the AliExpress/Alibaba integration

## Testing

1. **Test Mode**: Use sandbox/test API endpoints if available
2. **Test Orders**: Place test orders with small quantities
3. **Verify**: Check that orders appear in your AliExpress/Alibaba account
4. **Shipping**: Verify shipping addresses are correctly formatted

## Important Notes

⚠️ **Important Considerations:**

1. **Pricing**: AliExpress prices may differ from your listed prices. You may need to:
   - Sync prices regularly
   - Add markup calculations
   - Handle currency conversion

2. **Inventory**: 
   - Sync inventory levels with AliExpress/Alibaba
   - Handle out-of-stock scenarios
   - Update stock status in real-time

3. **Shipping**:
   - Shipping times vary (often 15-30 days)
   - Shipping costs should be calculated
   - Multiple shipping options may be available

4. **Customer Service**:
   - You're responsible for customer service
   - Handle returns/refunds through your system
   - Track order status and communicate with customers

5. **API Rate Limits**:
   - Be aware of API rate limits
   - Implement retry logic for failed requests
   - Queue orders if rate limits are hit

## Troubleshooting

### Order Fails to Place

1. Check API credentials are correct
2. Verify product IDs are valid
3. Check API rate limits
4. Review error messages in server logs
5. Ensure shipping address format is correct

### Orders Not Appearing

1. Check order status in AliExpress/Alibaba dashboard
2. Verify API endpoint is correct
3. Check if orders are in "pending" status
4. Review API response for error codes

## Support Resources

- [AliExpress Open Platform Documentation](https://developers.aliexpress.com/)
- [Alibaba API Documentation](https://open.alibaba.com/)
- [DSers Integration Guide](https://www.dsers.com/)
- [Alibaba Dropshipping Center](https://www.alibaba.com/supplier/alibaba-dropshipping-api.html)

## Next Steps

1. ✅ Set up API credentials
2. ✅ Configure environment variables
3. ✅ Add AliExpress product IDs to your products
4. ✅ Test order placement
5. ✅ Set up order tracking
6. ✅ Configure email notifications
7. ✅ Implement inventory sync (optional)
8. ✅ Set up price sync (optional)

