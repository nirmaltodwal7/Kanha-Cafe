'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Copy, ArrowLeft, Smartphone, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, count, clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const deliveryFee = total >= 500 ? 0 : 49;
  const grandTotal = total + deliveryFee;
  const upiId = 'kanhabakers@upi';

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${upiId}&pn=KanhaBakers&am=${grandTotal}&cu=INR&tn=KanhaBakersOrder`;

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaid = () => {
    setConfirming(true);
    setTimeout(() => {
      clearCart();
      setPaid(true);
      setConfirming(false);
    }, 1800);
  };

  if (paid) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-mocha mb-3">Order Confirmed! 🎉</h2>
          <p className="font-body text-gray-500 mb-2">Thank you for ordering from Kanha Bakers.</p>
          <p className="font-body text-sm text-gray-400 mb-8">Your fresh bakes will be ready within 30–45 minutes.</p>
          <div className="p-4 bg-bakery-50 rounded-2xl mb-8">
            <p className="font-body text-xs text-gray-400 mb-1">Amount Paid</p>
            <p className="font-display text-3xl font-bold text-bakery-700">₹{grandTotal}</p>
          </div>
          <Link href="/" className="bakery-btn w-full justify-center text-base">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0 && !paid) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-mocha mb-4">No items to checkout</h2>
          <Link href="/menu" className="bakery-btn">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-mocha to-[#5a2f18] py-14 px-6 mb-10">
        <div className="max-w-7xl mx-auto">
          <Link href="/cart" className="inline-flex items-center gap-2 text-bakery-200 hover:text-white mb-4 transition-colors font-body text-sm">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl font-bold text-white"
          >
            Checkout
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-body text-bakery-200 mt-2"
          >
            Complete your payment using UPI
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="font-display text-xl font-bold text-mocha mb-5">Order Summary</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-bakery-50">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-bakery-50 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-mocha">{item.name}</p>
                  <p className="font-body text-xs text-gray-400">×{item.quantity}</p>
                </div>
                <p className="font-body font-bold text-sm text-bakery-700">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-bakery-100 space-y-2">
            <div className="flex justify-between text-sm font-body text-gray-500">
              <span>Subtotal ({count} items)</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-sm font-body text-gray-500">
              <span>Delivery</span>
              <span className={deliveryFee === 0 ? 'text-green-500 font-semibold' : ''}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-bakery-600 to-bakery-700 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="font-display text-lg font-bold text-white">Grand Total</span>
              <span className="font-display text-3xl font-bold text-white">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-5">
            <Smartphone size={20} className="text-bakery-600" />
            <h3 className="font-display text-xl font-bold text-mocha">Pay via UPI</h3>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center mb-6">
            <div className="p-4 bg-white border-2 border-bakery-100 rounded-2xl shadow-md mb-3">
              <Image
                src={qrUrl}
                alt="UPI QR Code"
                width={200}
                height={200}
                className="block"
                unoptimized
              />
            </div>
            <p className="font-body text-xs text-gray-400">Scan with any UPI app</p>
          </div>

          {/* UPI ID */}
          <div className="mb-4 p-4 bg-bakery-50 rounded-2xl border border-bakery-100">
            <p className="font-body text-xs text-gray-400 mb-1">UPI ID</p>
            <div className="flex items-center justify-between">
              <span className="font-body font-bold text-mocha text-lg">{upiId}</span>
              <button
                onClick={copyUPI}
                className="p-2 rounded-lg bg-white border border-bakery-200 hover:bg-bakery-600 hover:text-white hover:border-bakery-600 text-bakery-600 transition-all"
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="p-4 bg-mocha rounded-2xl mb-6 text-center">
            <p className="font-body text-xs text-bakery-200 mb-1">Pay Exactly</p>
            <p className="font-display text-4xl font-bold text-white">₹{grandTotal}</p>
          </div>

          <div className="flex items-center gap-2 mb-5 text-xs text-gray-400 font-body">
            <ShieldCheck size={14} className="text-green-500" />
            Secure UPI payment — GPay, PhonePe, Paytm, BHIM all supported
          </div>

          <motion.button
            onClick={handlePaid}
            disabled={confirming}
            whileTap={{ scale: 0.97 }}
            className="bakery-btn w-full justify-center text-base py-4 disabled:opacity-70"
          >
            {confirming ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                I Have Paid
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
