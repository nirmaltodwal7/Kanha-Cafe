'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, ArrowRight, Package } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-UNKNOWN';

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16 px-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white rounded-[2rem] shadow-2xl shadow-bakery-200/50 p-8 md:p-12 text-center max-w-lg w-full border border-bakery-50 relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-bakery-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2, damping: 15 }}
            className="w-28 h-28 bg-gradient-to-tr from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30"
          >
            <CheckCircle size={56} className="text-white" strokeWidth={2.5} />
          </motion.div>
          
          <h1 className="font-display text-4xl font-extrabold text-mocha mb-3">
            Payment Successful!
          </h1>
          <p className="font-body text-gray-500 mb-8 max-w-sm mx-auto text-lg leading-relaxed">
            Your verification is complete and your order is now being prepared.
          </p>

          <div className="bg-gradient-to-br from-bakery-50 to-white rounded-2xl p-6 mb-8 border border-bakery-100/50 space-y-4 shadow-inner">
            <div className="flex justify-between items-center pb-4 border-b border-bakery-100">
              <span className="font-body text-gray-500 font-medium flex items-center gap-2"><Package size={18}/> Order ID</span>
              <span className="font-mono font-bold text-bakery-700">{orderId}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-body text-gray-500 font-medium flex items-center gap-2"><Truck size={18}/> Estimated Delivery</span>
              <span className="font-body font-bold text-mocha">30 - 45 mins</span>
            </div>
          </div>

          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-mocha hover:bg-bakery-800 text-white font-body font-bold text-lg py-5 rounded-xl shadow-lg shadow-mocha/20 transition-colors"
            >
              Continue Browsing <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
