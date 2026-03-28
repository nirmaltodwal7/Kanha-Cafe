'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Copy, ArrowLeft, Smartphone, ShieldCheck, Banknote, AlertCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, count, clearCart } = useCart();
  
  // Checkout States
  const [paid, setPaid] = useState(false);
  const [confirming, setConfirming] = useState(false);
  
  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [userUpiId, setUserUpiId] = useState('');
  const [upiError, setUpiError] = useState('');

  // Order Type State
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  
  // Promo State
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const deliveryFee = orderType === 'delivery' ? (total >= 500 ? 0 : 49) : 0;
  const grandTotal = Math.max(0, total + deliveryFee - discount);
  
  const merchantUpiId = '9636159629-2@ybl';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${merchantUpiId}&pn=KanhaBakers&am=${grandTotal}&cu=INR&tn=KanhaBakersOrder`;

  const handlePayment = () => {
    // Validation for UPI
    if (paymentMethod === 'upi') {
      if (!userUpiId.trim()) {
        setUpiError('Please enter your UPI ID');
        return;
      }
      // Basic UPI validation regex
      if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(userUpiId)) {
        setUpiError('Please enter a valid UPI ID (e.g., name@bank)');
        return;
      }
      setUpiError('');
    }

    setConfirming(true);
    
    // Simulate API processing delay
    setTimeout(() => {
      clearCart();
      setPaid(true);
      setConfirming(false);
    }, 2000);
  };

  if (paid) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ type: "spring", stiffness: 200, damping: 20 }}
           className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 text-center max-w-md w-full relative overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner shadow-green-200"
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-mocha mb-3">Order Placed Successfully 🎉</h2>
          <p className="font-body text-gray-500 mb-6 px-4">
            Thank you for your order! {paymentMethod === 'cod' ? 'Please keep exact cash ready at delivery.' : 'Your payment has been received.'}
          </p>
          
          <div className="bg-bakery-50 rounded-2xl p-6 mb-8 border border-bakery-100 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-bakery-200/20 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <p className="font-body text-sm font-semibold text-gray-500 mb-1 z-10 relative">Estimated Delivery Time</p>
            <p className="font-display text-3xl font-bold text-bakery-700 z-10 relative mb-4">30 – 45 mins</p>
            
            <div className="pt-4 border-t border-bakery-200/50 flex justify-between items-center z-10 relative">
              <span className="font-body text-sm font-medium text-gray-500">Amount Paid / Due</span>
              <span className="font-body font-bold text-mocha text-xl">₹{grandTotal}</span>
            </div>
          </div>

          <button onClick={() => router.push('/')} className="bakery-btn w-full justify-center text-base py-4 shadow-lg shadow-bakery-600/20">
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0 && !paid) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-mocha mb-4">Your cart is empty</h2>
          <Link href="/menu" className="bakery-btn">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-mocha to-[#5a2f18] py-12 px-6 mb-10 shadow-lg shadow-mocha/10">
        <div className="max-w-7xl mx-auto">
          <Link href="/cart" className="inline-flex items-center gap-2 text-bakery-200 hover:text-white mb-4 transition-colors font-body text-sm font-medium">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Checkout
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-body text-bakery-200 mt-2 text-lg"
          >
            Complete your order by choosing a payment method.
          </motion.p>
        </div>
      </div>

      {/* Order Type Toggle */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 flex justify-center">
        <div className="bg-white p-1.5 rounded-full inline-flex shadow-lg shadow-bakery-200/50 relative w-72 border border-bakery-50">
          {['delivery', 'pickup'].map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type as 'delivery' | 'pickup')}
              className={`flex-1 relative py-3 rounded-full font-body font-bold text-sm tracking-wide capitalize transition-colors duration-300 z-10 ${
                orderType === type ? 'text-white' : 'text-gray-500 hover:text-mocha'
              }`}
            >
              {orderType === type && (
                <motion.div
                  layoutId="orderTypeIndicator"
                  className="absolute inset-0 bg-mocha rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{type}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-8 items-start">
        {/* Order Summary (Left Column) */}
        <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl shadow-bakery-200/30 p-6 md:p-8 order-2 lg:order-1 sticky top-32">
          <h3 className="font-display text-2xl font-bold text-mocha mb-6">Order Summary</h3>
          <div className="space-y-4 max-h-[320px] overflow-y-auto pr-3 custom-scrollbar">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-bakery-50/80">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-bakery-50 shrink-0 border border-bakery-100 shadow-sm">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-base font-bold text-mocha truncate">{item.name}</p>
                  <p className="font-body text-sm text-gray-500 font-medium">Qty: {item.quantity}</p>
                </div>
                <p className="font-body font-bold text-lg text-bakery-700 shrink-0">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Promo Code Input */}
          <div className="mt-6">
            {!promoApplied ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (Try FIRST10)"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    if (promoError) setPromoError('');
                  }}
                  className={`flex-1 px-4 py-3 bg-cream/30 border ${promoError ? 'border-red-300 focus:border-red-400' : 'border-bakery-100 focus:border-bakery-300'} rounded-xl font-body text-sm outline-none transition-colors`}
                />
                <button
                  onClick={() => {
                    if (promoCode.trim().toUpperCase() === 'FIRST10') {
                      setDiscount(Math.floor(total * 0.10)); // 10% discount
                      setPromoApplied(true);
                      setPromoError('');
                    } else if (promoCode.trim() !== '') {
                      setPromoError('Invalid code. Try FIRST10');
                    }
                  }}
                  className="px-5 py-3 bg-bakery-600 text-white rounded-xl font-body font-bold text-sm tracking-wide hover:bg-bakery-700 transition shadow-sm"
                >
                  Apply
                </button>
              </div>
            ) : (
               <div className="flex justify-between items-center bg-green-50/50 p-3.5 rounded-xl border border-green-200">
                 <div className="flex items-center gap-2">
                   <CheckCircle size={16} className="text-green-600" />
                   <span className="font-body text-sm font-semibold text-green-700 tracking-wide">'{promoCode.toUpperCase()}' APPLIED</span>
                 </div>
                 <button onClick={() => { setPromoApplied(false); setDiscount(0); setPromoCode(''); }} className="text-gray-400 hover:text-red-500 font-body font-semibold text-xs tracking-wide transition-colors">REMOVE</button>
               </div>
            )}
            {promoError && <p className="text-red-500 text-xs font-body mt-2 flex items-center gap-1"><AlertCircle size={12} /> {promoError}</p>}
          </div>

          <div className="mt-4 space-y-3 bg-cream/30 p-5 rounded-2xl border border-bakery-50">
            <div className="flex justify-between text-base font-body text-gray-600">
              <span>Subtotal ({count} items)</span>
              <span className="font-semibold text-mocha">₹{total}</span>
            </div>
            <div className="flex justify-between text-base font-body text-gray-600">
              <span>{orderType === 'pickup' ? 'Pickup' : 'Delivery Fee'}</span>
              <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : 'text-mocha'}`}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <AnimatePresence>
              {discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="flex justify-between text-base font-body text-green-600 border-t border-green-100/50 pt-3 overflow-hidden"
                >
                  <span className="font-semibold">Discount ({promoCode.toUpperCase()})</span>
                  <span className="font-bold">-₹{discount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 p-5 bg-gradient-to-r from-mocha to-[#4a2410] rounded-2xl flex justify-between items-center shadow-lg transform transition-transform hover:scale-[1.01]">
            <span className="font-display text-xl font-bold text-white">Total Amount</span>
            <span className="font-display text-3xl font-bold text-white">₹{grandTotal}</span>
          </div>
        </div>

        {/* Payment Options (Right Column) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-bakery-200/30 p-6 md:p-8 flex flex-col order-1 lg:order-2">
          <h3 className="font-display text-2xl font-bold text-mocha mb-6">Payment Methods</h3>

          {/* Toggle / Radio Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => { setPaymentMethod('upi'); setUpiError(''); }}
              className={`relative p-5 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all duration-300 focus:outline-none overflow-hidden ${
                paymentMethod === 'upi'
                  ? 'border-bakery-600 bg-bakery-50 shadow-md shadow-bakery-200/40'
                  : 'border-gray-200 bg-white hover:border-bakery-300 hover:bg-gray-50'
              }`}
            >
              <Smartphone size={28} className={`transition-colors duration-300 ${paymentMethod === 'upi' ? 'text-bakery-600' : 'text-gray-400'}`} />
              <span className={`font-body font-bold text-base transition-colors duration-300 ${paymentMethod === 'upi' ? 'text-bakery-700' : 'text-gray-500'}`}>
                Pay via UPI
              </span>
              {paymentMethod === 'upi' && (
                <motion.div layoutId="payment-active" className="absolute -inset-0 border-2 border-bakery-600 rounded-2xl opacity-10 pointer-events-none" />
              )}
            </button>

            <button
              onClick={() => { setPaymentMethod('cod'); setUpiError(''); }}
              className={`relative p-5 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all duration-300 focus:outline-none overflow-hidden ${
                paymentMethod === 'cod'
                  ? 'border-bakery-600 bg-bakery-50 shadow-md shadow-bakery-200/40'
                  : 'border-gray-200 bg-white hover:border-bakery-300 hover:bg-gray-50'
              }`}
            >
              <Banknote size={28} className={`transition-colors duration-300 ${paymentMethod === 'cod' ? 'text-bakery-600' : 'text-gray-400'}`} />
              <span className={`font-body font-bold text-base transition-colors duration-300 ${paymentMethod === 'cod' ? 'text-bakery-700' : 'text-gray-500'}`}>
                Cash on Delivery
              </span>
              {paymentMethod === 'cod' && (
                <motion.div layoutId="payment-active" className="absolute -inset-0 border-2 border-bakery-600 rounded-2xl opacity-10 pointer-events-none" />
              )}
            </button>
          </div>

          <div className="flex-1 min-h-[300px]">
            <AnimatePresence mode="wait">
              {paymentMethod === 'upi' && (
                <motion.div
                  key="upi-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="p-6 md:p-8 bg-cream/70 border border-bakery-200 rounded-2xl">
                     <label className="font-body text-base font-bold text-mocha block mb-3">Enter your UPI ID</label>
                     <div className="relative">
                       <input
                         type="text"
                         placeholder="e.g. name@bank"
                         value={userUpiId}
                         onChange={(e) => {
                           setUserUpiId(e.target.value);
                           if (upiError) setUpiError('');
                         }}
                         className={`w-full px-5 py-4 bg-white border-2 ${upiError ? 'border-red-400 ring-4 ring-red-100/50 text-red-700' : 'border-bakery-200 focus:border-bakery-500 focus:ring-4 focus:ring-bakery-100'} rounded-xl transition-all font-body font-semibold text-lg text-mocha outline-none shadow-sm`}
                       />
                       {userUpiId && !upiError && /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(userUpiId) && (
                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-100 p-1.5 rounded-full">
                           <CheckCircle size={20} className="text-green-600" />
                         </motion.div>
                       )}
                     </div>
                     {upiError && (
                       <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-500 text-sm font-body font-medium mt-3 flex items-center gap-1.5">
                         <AlertCircle size={16} /> {upiError}
                       </motion.p>
                     )}
                     
                     <div className="mt-8 flex items-center gap-3">
                       <div className="h-px bg-bakery-200 flex-1"></div>
                       <span className="font-body text-sm text-gray-400 font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm border border-bakery-100">OR</span>
                       <div className="h-px bg-bakery-200 flex-1"></div>
                     </div>
                     
                     <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="p-4 bg-white border-2 border-bakery-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                          <Image src={qrUrl} alt="UPI QR Code" width={140} height={140} unoptimized className="opacity-90 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-center md:text-left">
                           <p className="font-display text-xl font-bold text-mocha mb-1">Scan QR to Pay</p>
                           <p className="font-body text-sm text-gray-500">Scan with any UPI application.</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600 font-body bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                    <ShieldCheck size={20} className="text-green-500 shrink-0" />
                    <span className="font-medium">Secure UPI payment — GPay, PhonePe, Paytm, BHIM supported.</span>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'cod' && (
                <motion.div
                  key="cod-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="p-10 bg-cream/70 border border-bakery-200 rounded-2xl text-center flex flex-col items-center justify-center min-h-[300px]">
                    <motion.div 
                      initial={{ scale: 0.8, rotate: -10 }} 
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-24 h-24 bg-bakery-100/80 rounded-full flex items-center justify-center mb-6 text-bakery-600 shadow-inner border-4 border-white"
                    >
                      <Banknote size={44} />
                    </motion.div>
                    <h4 className="font-display text-3xl font-bold text-mocha mb-3">Cash on Delivery</h4>
                    <p className="font-body text-lg text-gray-600 max-w-sm mx-auto leading-relaxed">
                      Pay in cash when your order is delivered. Please keep the exact change ready if possible.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            {/* Action Button */}
            <motion.button
              onClick={handlePayment}
              disabled={confirming}
              whileTap={{ scale: 0.98 }}
              className="bakery-btn w-full justify-between items-center py-5 px-8 text-xl shadow-xl shadow-bakery-600/30 disabled:opacity-80 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              
              <span className="font-body font-bold flex items-center gap-3 relative z-10">
                {confirming ? (
                  <>
                    <Loader2 size={24} className="animate-spin" /> Processing Payment...
                  </>
                ) : (
                  <>
                    {paymentMethod === 'upi' ? 'Pay Now' : 'Confirm Order'}
                  </>
                )}
              </span>
              
              {!confirming && (
                <span className="font-display font-black text-white relative z-10 bg-black/10 px-4 py-1.5 rounded-xl border border-white/10">
                  ₹{grandTotal}
                </span>
              )}
            </motion.button>

            <p className="text-center font-body text-xs text-gray-400 mt-4">
              By confirming, you agree to Kanha Bakers' Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
