export type OrderStatus = 'pending' | 'paid' | 'rejected';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderType {
  orderId: string;
  amount: number;
  status: OrderStatus;
  items: OrderItem[];
  upiRef?: string;
  screenshotUrl?: string; // We'll store Base64 here
  createdAt: number;
}

// In-memory Database to simulate Firebase Firestore
// NOTE: This will reset when the Next.js server restarts (e.g. on file saves in dev mode)
// To make it persist better in dev, we use globalThis which survives HMR to some extent
const globalForDb = globalThis as unknown as {
  ordersDb: Map<string, OrderType> | undefined;
};

export const ordersDb = globalForDb.ordersDb ?? new Map<string, OrderType>();

if (process.env.NODE_ENV !== 'production') {
  globalForDb.ordersDb = ordersDb;
}
