'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Smartphone, Banknote, ShieldCheck, Zap, UploadCloud, CheckCircle, MessageCircle, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type CheckoutStep = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  
  // Checkout Control State
  const [step, setStep] = useState<CheckoutStep>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | null>(null);
  
  // UPI Payment Details
  const [userUpiId, setUserUpiId] = useState('');
  const [upiError, setUpiError] = useState('');

  // Screenshot Upload State
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submitting State
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Business Constraints
  const deliveryFee = total >= 500 ? 0 : 49;
  const grandTotal = total + deliveryFee;
  const merchantUpiId = '9636159629-2@ybl'; // Replace with real merchant UPI
  const storeName = 'KanhaBakers';
  const whatsappNumber = '919636159629'; // Updated to user's number
  
  // QR Generation URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${merchantUpiId}&pn=${storeName}&am=${grandTotal}&cu=INR`;

  // --- Handlers ---
  
  const handleProceedToPay = () => {
    if (!paymentMethod) return;

    if (paymentMethod === 'cod') {
      // Direct jump to Step 4 for COD
      setStep(4);
      return;
    }

    // Step 1 -> Step 2 (UPI Details)
    // Basic User UPI ID validation
    if (!userUpiId.trim()) {
      setUpiError('Please enter your UPI ID');
      return;
    }
    if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(userUpiId)) {
      setUpiError('Enter a valid UPI ID (e.g. name@bank)');
      return;
    }
    setUpiError('');
    setStep(2);
  };

  const handleIHavePaid = () => {
    setStep(3); // Go to Screenshot Upload
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large! Please upload an image under 5MB.');
        return;
      }
      const url = URL.createObjectURL(file);
      setScreenshotPreview(url);
    }
  };

  const generateWhatsAppMessage = () => {
    let orderDetails = items.map(
      (item) => `- ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    let message = `Hello, I have placed an order.\n\n*Order Details:*\n${orderDetails}\n\n*Total Amount: ₹${grandTotal}*\n\n`;

    if (paymentMethod === 'upi') {
      message += `I have completed the payment. I will attach the screenshot.`;
    } else {
      message += `I have selected *Cash on Delivery (COD)*. Please confirm my order.`;
    }

    return encodeURIComponent(message);
  };

  const handleSubmitFinal = () => {
    setIsRedirecting(true);

    const text = generateWhatsAppMessage();
    const waUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

    // Simulate slight delay for UX
    setTimeout(() => {
      // Open WA in actual tab
      window.location.href = waUrl;
      clearCart();
    }, 1500);
  };

  // --- Renders ---

  if (items.length === 0 && !isRedirecting) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link href="/menu" className="bakery-btn inline-block">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-16 font-body text-gray-800">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
          <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft size={18} /> Back
          </Link>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 shadow-sm"><ShieldCheck size={16}/> Secure Payment</span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 shadow-sm"><Zap size={16}/> Fast Checkout</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Payment Flow & Steps */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1 relative">
             
            {/* Steps Indicator */}
            {paymentMethod === 'upi' || step > 1 ? (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center relative isolation-auto">
                {/* Connecting Line */}
                <div className="absolute left-[10%] right-[10%] h-1 bg-gray-100 top-1/2 -translate-y-1/2 -z-10 rounded-full">
                   <motion.div className="h-full bg-bakery-600 rounded-full" initial={{ width: '0%' }} animate={{ width: `${((step - 1) / 3) * 100}%` }} transition={{ duration: 0.3 }} />
                </div>
                
                {['Cart', 'Payment', 'Upload Screenshot', 'WhatsApp'].map((label, idx) => {
                  const sIdx = idx + 1;
                  const isActive = step === sIdx;
                  const isPast = step > sIdx;
                  return (
                    <div key={label} className="flex flex-col items-center bg-white px-2">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-300 ${isActive || isPast ? 'bg-bakery-600 text-white' : 'bg-gray-200 text-gray-500'} ${isActive ? 'ring-4 ring-bakery-100' : ''}`}>
                         {isPast ? <CheckCircle size={18} /> : sIdx}
                       </div>
                       <span className={`text-[11px] font-bold uppercase tracking-wider mt-2 hidden sm:block ${isActive ? 'text-bakery-700' : 'text-gray-400'}`}>{label}</span>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* FLOW CARDS */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative min-h-[400px]">
               
               {/* ================= STEP 1: Select Payment ================= */}
               {step === 1 && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
                   <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Select Payment Method</h2>
                   
                   <div className="grid gap-4 mb-8">
                     <button onClick={() => { setPaymentMethod('upi'); setUpiError(''); }} className={`relative p-5 rounded-2xl flex items-center gap-4 border-2 transition-all duration-300 text-left ${paymentMethod === 'upi' ? 'border-bakery-600 bg-bakery-50/50' : 'border-gray-200 hover:border-bakery-300 hover:bg-gray-50' }`}>
                       <div className={`p-3 rounded-xl ${paymentMethod === 'upi' ? 'bg-bakery-100 text-bakery-600' : 'bg-gray-100 text-gray-500'}`}><Smartphone size={24} /></div>
                       <div>
                         <p className={`font-bold text-lg ${paymentMethod === 'upi' ? 'text-bakery-800' : 'text-gray-700'}`}>Pay via UPI App</p>
                         <p className="text-sm text-gray-500 font-medium">Google Pay, PhonePe, Paytm, BHIM</p>
                       </div>
                       {paymentMethod === 'upi' && <CheckCircle className="absolute right-6 text-bakery-600" size={24} />}
                     </button>

                     <button onClick={() => { setPaymentMethod('cod'); setUpiError(''); }} className={`relative p-5 rounded-2xl flex items-center gap-4 border-2 transition-all duration-300 text-left ${paymentMethod === 'cod' ? 'border-bakery-600 bg-bakery-50/50' : 'border-gray-200 hover:border-bakery-300 hover:bg-gray-50' }`}>
                       <div className={`p-3 rounded-xl ${paymentMethod === 'cod' ? 'bg-bakery-100 text-bakery-600' : 'bg-gray-100 text-gray-500'}`}><Banknote size={24} /></div>
                       <div>
                         <p className={`font-bold text-lg ${paymentMethod === 'cod' ? 'text-bakery-800' : 'text-gray-700'}`}>Cash on Delivery</p>
                         <p className="text-sm text-gray-500 font-medium">Pay via cash when order arrives</p>
                       </div>
                       {paymentMethod === 'cod' && <CheckCircle className="absolute right-6 text-bakery-600" size={24} />}
                     </button>
                   </div>
                   
                   {/* If UPI, ask for UPI ID first per requirements before QR */}
                   {paymentMethod === 'upi' && (
                     <div className="mb-8 pt-6 border-t border-gray-100">
                       <label className="block text-sm font-bold text-gray-700 mb-2">Verify Your UPI ID</label>
                       <input 
                         type="text" 
                         placeholder="example@upi" 
                         value={userUpiId}
                         onChange={(e) => { setUserUpiId(e.target.value); setUpiError(''); }}
                         className={`w-full px-5 py-4 bg-gray-50 border-2 rounded-xl text-lg font-bold outline-none transition-all ${upiError ? 'border-red-400 focus:bg-white focus:border-red-500' : 'border-gray-200 focus:bg-white focus:border-bakery-500'}`}
                       />
                       {upiError && <p className="text-red-500 text-sm font-medium mt-2 flex items-center gap-1.5"><AlertCircle size={16}/> {upiError}</p>}
                     </div>
                   )}

                   <motion.button onClick={handleProceedToPay} disabled={!paymentMethod} className="w-full bakery-btn justify-center py-4 text-lg shadow-xl shadow-bakery-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
                     {paymentMethod === 'upi' ? 'Proceed to Pay' : paymentMethod === 'cod' ? 'Confirm Delivery' : 'Select a Payment Method'}
                   </motion.button>
                 </motion.div>
               )}

               {/* ================= STEP 2: Pay via UPI (QR) ================= */}
               {step === 2 && paymentMethod === 'upi' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 text-center flex flex-col items-center">
                   <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">₹{grandTotal}</h2>
                   <p className="font-body text-gray-500 font-medium uppercase tracking-widest text-xs mb-6">Total Amount Payable</p>

                   <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 mb-8 w-full max-w-sm flex flex-col items-center shadow-inner">
                      <p className="font-bold text-blue-900 mb-4">{storeName}</p>
                      <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-gray-100 inline-block mb-4">
                         <img src={qrUrl} alt="UPI QR Code" className="w-[180px] h-[180px]" />
                      </div>
                      <p className="font-mono text-sm text-blue-800 font-bold bg-white px-3 py-1 rounded-lg border border-blue-200">{merchantUpiId}</p>
                   </div>

                   <a href={`upi://pay?pa=${merchantUpiId}&pn=${storeName}&am=${grandTotal}&cu=INR`} className="w-full max-w-sm mb-4 flex items-center justify-center gap-3 bg-white border-2 border-bakery-600 text-bakery-700 hover:bg-bakery-50 font-bold py-4 rounded-xl transition-colors shadow-sm text-lg">
                      <Smartphone size={20} /> Pay via UPI App
                   </a>

                   <button onClick={handleIHavePaid} className="w-full max-w-sm bakery-btn justify-center py-4 text-lg shadow-xl shadow-bakery-600/20 mt-2 hover:scale-[1.02] transition-transform">
                      I Have Paid
                   </button>
                 </motion.div>
               )}

               {/* ================= STEP 3: Upload Screenshot ================= */}
               {step === 3 && paymentMethod === 'upi' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 text-center">
                   <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">Attach Evidence</h2>
                   <p className="text-gray-500 text-sm font-medium mb-8">Please upload a screenshot of your successful UPI payment to ensure fast verification.</p>

                   <div onClick={() => fileInputRef.current?.click()} className={`w-full max-w-sm mx-auto h-[220px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group ${screenshotPreview ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-bakery-400 bg-gray-50 hover:bg-bakery-50/30'}`}>
                     {screenshotPreview ? (
                       <>
                         <Image src={screenshotPreview} alt="Screenshot Preview" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col text-white">
                            <UploadCloud size={32} className="mb-2" />
                            <span className="font-bold">Change Image</span>
                         </div>
                       </>
                     ) : (
                       <div className="text-center px-6">
                         <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mx-auto mb-4">
                            <UploadCloud size={28} className="text-bakery-600" />
                         </div>
                         <p className="font-bold text-gray-700 text-lg mb-1">Click to browse files</p>
                         <p className="text-gray-400 text-sm">Upload PNG or JPG</p>
                       </div>
                     )}
                     <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                   </div>

                   {screenshotPreview && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                        <button onClick={() => setStep(4)} className="w-full max-w-sm bakery-btn justify-center py-4 text-lg shadow-xl shadow-bakery-600/30">
                           Submit Payment
                        </button>
                     </motion.div>
                   )}
                 </motion.div>
               )}

               {/* ================= STEP 4: Submit & Redirect ================= */}
               {step === 4 && (
                 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                   
                   {!isRedirecting ? (
                     <>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                           <MessageCircle size={36} className="text-green-600" />
                        </div>
                        <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">Final Step</h2>
                        <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100 max-w-md text-green-800 text-left mb-8 text-sm">
                          <p className="font-bold mb-2">We will now redirect you to WhatsApp.</p>
                          <ul className="list-disc pl-5 space-y-1 text-green-700 font-medium">
                            <li>An order summary message will be auto-generated.</li>
                            {paymentMethod === 'upi' && <li><strong>IMPORTANT:</strong> After redirect, please attach your payment screenshot in WhatsApp before sending.</li>}
                            <li>Hit send to confirm your order!</li>
                          </ul>
                        </div>
                        
                        <button onClick={handleSubmitFinal} className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg w-full max-w-sm py-4 rounded-xl shadow-xl shadow-green-600/30 flex items-center justify-center gap-2 transition-colors">
                          <MessageCircle size={22} className="text-white" /> Open WhatsApp
                        </button>
                     </>
                   ) : (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center w-full h-full py-10">
                        <div className="relative w-24 h-24 mb-6">
                           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-green-500 shadow-lg" />
                           <MessageCircle size={32} className="absolute inset-0 m-auto text-green-500" />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Redirecting...</h3>
                        <p className="text-gray-500 font-medium animate-pulse">Taking you to WhatsApp securely</p>
                     </motion.div>
                   )}
                 </motion.div>
               )}

            </div>
          </div>

          {/* RIGHT: Order Summary Context */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-lg shadow-gray-200/50 p-6 md:p-8 order-1 lg:order-2 sticky top-32 border border-gray-100">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">Cart Summary</h3>
            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-3 custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-50">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 shadow-sm">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-bold text-gray-900 truncate">{item.name}</p>
                    <p className="font-body text-xs text-gray-500 font-medium">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-body font-bold text-gray-900 shrink-0">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex justify-between text-sm font-body text-gray-600">
                <span>Subtotal ({count} items)</span>
                <span className="font-bold text-gray-900">₹{total}</span>
              </div>
              <div className="flex justify-between text-sm font-body text-gray-600">
                <span>Delivery Fee</span>
                <span className={`font-bold ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
            </div>

            <div className="mt-4 p-5 rounded-2xl flex justify-between items-center bg-gray-900 text-white shadow-xl shadow-gray-900/20">
              <span className="font-bold text-lg">Total</span>
              <span className="font-display font-bold text-3xl text-bakery-400">₹{grandTotal}</span>
            </div>
            
            <p className="text-center font-medium text-xs text-gray-400 mt-6 flex items-center justify-center gap-1.5">
              <ShieldCheck size={14}/> Encrypted Process
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
