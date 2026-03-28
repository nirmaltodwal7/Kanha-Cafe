'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

export default function CartPage() {
  const { items, total, count, clearCart } = useCart();

  const deliveryFee = total > 0 ? (total >= 500 ? 0 : 49) : 0;
  const grandTotal = total + deliveryFee;

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-mocha to-[#5a2f18] py-14 px-6 mb-10">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl font-bold text-white"
          >
            Your Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-bakery-200 mt-2"
          >
            {count > 0 ? `${count} item${count !== 1 ? 's' : ''} ready to order` : 'Your cart is empty'}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 bg-bakery-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={40} className="text-bakery-300" />
            </div>
            <h3 className="font-display text-3xl font-bold text-mocha mb-3">Nothing here yet</h3>
            <p className="font-body text-gray-500 mb-8">Explore our menu and add items to your cart.</p>
            <Link href="/menu" className="bakery-btn text-base">
              Browse Menu <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-2xl font-bold text-mocha">Items ({count})</h2>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} /> Clear All
                </button>
              </div>
              <AnimatePresence>
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-28">
                <h3 className="font-display text-xl font-bold text-mocha mb-6">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="font-body text-gray-600 truncate flex-1 mr-4">
                        {item.name} <span className="text-gray-400">×{item.quantity}</span>
                      </span>
                      <span className="font-body font-semibold text-mocha">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-bakery-100 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-gray-500">Subtotal</span>
                    <span className="font-body font-semibold">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-gray-500">Delivery</span>
                    <span className={`font-body font-semibold ${deliveryFee === 0 ? 'text-green-500' : ''}`}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-bakery-500">Add ₹{500 - total} more for free delivery</p>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6 p-4 bg-bakery-50 rounded-2xl border border-bakery-100">
                  <span className="font-display text-lg font-bold text-mocha">Total</span>
                  <span className="font-display text-2xl font-bold text-bakery-700">₹{grandTotal}</span>
                </div>

                <Link
                  href="/checkout"
                  className="bakery-btn w-full justify-center text-base py-4"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>

                <Link href="/menu" className="block text-center font-body text-sm text-bakery-600 hover:text-bakery-800 mt-4 transition-colors">
                  + Add more items
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
