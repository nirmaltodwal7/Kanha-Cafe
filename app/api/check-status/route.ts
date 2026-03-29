import { NextResponse } from 'next/server';
import { ordersDb } from '@/lib/mockDb';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    const order = ordersDb.get(orderId);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      status: order.status,
      orderId: order.orderId
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error checking status:', error);
    return NextResponse.json({ error: 'Failed to check status' }, { status: 500 });
  }
}
