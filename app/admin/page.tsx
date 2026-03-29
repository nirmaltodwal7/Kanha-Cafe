'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, XCircle, Search, RefreshCw, Clock, Ban } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderId: string;
  amount: number;
  status: 'pending' | 'paid' | 'rejected';
  items: OrderItem[];
  upiRef?: string;
  screenshotUrl?: string;
  createdAt: number;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'rejected'>('all');

  const fetchOrders = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 10 seconds for admin
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId: string, status: 'paid' | 'rejected') => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><RefreshCw className="animate-spin text-mocha" size={32} /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6 font-body">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900 flex items-center gap-3">
              <ShieldCheck className="text-bakery-600" size={36} /> Store Admin
            </h1>
            <p className="text-gray-500 mt-2">Manage manual UPI verifications here.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 flex">
              {(['all', 'pending', 'paid', 'rejected'] as const).map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg capitalize transition-colors ${filter === f ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button onClick={fetchOrders} className={`p-3 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50 ${refreshing ? 'opacity-50' : ''}`}>
              <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center">
            <Search size={48} className="text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 font-medium">No orders found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map(order => (
              <motion.div 
                key={order.orderId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col lg:flex-row gap-6 hover:shadow-md transition-shadow"
              >
                {/* Order Meta */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-gray-400 mb-1">ORDER ID</p>
                      <p className="font-mono text-lg text-gray-900 font-bold">{order.orderId}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      order.status === 'pending' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                      order.status === 'paid' ? 'bg-green-100 text-green-700 border border-green-200' :
                      'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {order.status === 'pending' && <Clock size={14}/>}
                      {order.status === 'paid' && <ShieldCheck size={14}/>}
                      {order.status === 'rejected' && <Ban size={14}/>}
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-sm font-bold text-gray-500 mb-2 border-b border-gray-200 pb-2">Items</p>
                    <ul className="space-y-1">
                      {order.items.map(item => (
                        <li key={item.id} className="text-sm text-gray-700 flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center text-gray-900">
                      <span className="font-bold text-base">Total Amount</span>
                      <span className="font-display font-bold text-xl text-bakery-600">₹{order.amount}</span>
                    </div>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden lg:block w-px bg-gray-100 mx-2"></div>

                {/* Evidence & Actions */}
                <div className="w-full lg:w-96 flex flex-col">
                  <p className="text-sm font-bold text-gray-400 mb-3 uppercase">Verification Evidence</p>
                  
                  {order.upiRef ? (
                    <div className="space-y-4 flex-1">
                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">User Provided Ref ID</span>
                        <span className="font-mono text-lg font-bold text-blue-800">{order.upiRef}</span>
                      </div>
                      
                      {order.screenshotUrl ? (
                        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm group">
                          <Image src={order.screenshotUrl} alt="Payment Screenshot" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <a href={order.screenshotUrl} target="_blank" className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg">View Full</a>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-24 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-sm text-gray-500 font-medium">
                          No screenshot attached
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-medium italic">
                      No payment data submitted yet
                    </div>
                  )}

                  {/* Actions */}
                  {order.status === 'pending' && (
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <button 
                        onClick={() => updateStatus(order.orderId, 'rejected')}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                      >
                         <XCircle size={18} /> Reject
                      </button>
                      <button 
                        onClick={() => updateStatus(order.orderId, 'paid')}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 transition-colors"
                      >
                         <ShieldCheck size={18} /> Approve
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
