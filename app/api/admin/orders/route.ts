import { NextResponse } from 'next/server';
import { ordersDb } from '@/lib/mockDb';

export async function GET() {
  // Return all orders as an array, sorted by newest first
  const orders = Array.from(ordersDb.values()).sort((a, b) => b.createdAt - a.createdAt);
  
  return NextResponse.json({ 
    success: true, 
    orders 
  }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status || !['paid', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Valid orderId and status are required' }, { status: 400 });
    }

    const order = ordersDb.get(orderId);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update status
    order.status = status;
    ordersDb.set(orderId, order);

    return NextResponse.json({ 
      success: true, 
      message: `Order ${orderId} status updated to ${status}` 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
