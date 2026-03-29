import { NextResponse } from 'next/server';
import { ordersDb } from '@/lib/mockDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, upiRef, screenshotUrl } = body;

    if (!orderId || !upiRef) {
      return NextResponse.json({ error: 'orderId and upiRef are required' }, { status: 400 });
    }

    const order = ordersDb.get(orderId);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update order with payment evidence
    order.upiRef = upiRef;
    if (screenshotUrl) {
      order.screenshotUrl = screenshotUrl; // Base64 string expected
    }
    
    // Status stays pending; admin must approve it!
    ordersDb.set(orderId, order);

    return NextResponse.json({ success: true, message: 'Payment submitted for verification' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting payment:', error);
    return NextResponse.json({ error: 'Failed to submit payment evidence' }, { status: 500 });
  }
}
