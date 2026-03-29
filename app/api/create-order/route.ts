import { NextResponse } from 'next/server';
import { ordersDb, OrderType } from '@/lib/mockDb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, items } = body;

    if (!amount || typeof amount !== 'number') {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
    }

    // Generate a simple Order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newOrder: OrderType = {
      orderId,
      amount,
      status: 'pending',
      items: items || [],
      createdAt: Date.now(),
    };

    // Save to our in-memory DB
    ordersDb.set(orderId, newOrder);

    return NextResponse.json({ success: true, orderId }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
