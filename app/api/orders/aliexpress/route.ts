import { NextRequest, NextResponse } from 'next/server';
import { placeAliExpressOrder } from '@/lib/aliexpress-api';

/**
 * API Route: POST /api/orders/aliexpress
 * 
 * Places an order on AliExpress/Alibaba when a customer purchases from your site
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['product', 'quantity', 'shippingAddress', 'customerName', 'customerEmail', 'customerPhone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Place the order on AliExpress
    const result = await placeAliExpressOrder({
      product: body.product,
      quantity: body.quantity,
      shippingAddress: body.shippingAddress,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      orderId,
      notes: body.notes,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // Here you would typically:
    // 1. Save the order to your database
    // 2. Send confirmation email to customer
    // 3. Update inventory
    // 4. Create internal order record

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      trackingNumber: result.trackingNumber,
      message: result.message,
      internalOrderId: orderId,
    });
  } catch (error) {
    console.error('Error processing AliExpress order:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

