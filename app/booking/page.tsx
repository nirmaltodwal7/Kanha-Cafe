'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Phone, Calendar, Clock, Users, Info, MessageCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    requests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappNumber = '919636159629';

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.guests) newErrors.guests = 'Number of guests is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-clean phone numbers to only allow digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to top so the user can easily see the validation errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Format Date string nicely (Assuming input YYYY-MM-DD -> DD-MM-YYYY)
    const [year, month, day] = formData.date.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    // Construct WhatsApp message
    const message = `Hello, I would like to book a table.\n\n📌 Reservation Details:\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n👥 Guests: ${formData.guests}\n📅 Date: ${formattedDate}\n⏰ Time: ${formData.time}` +
      (formData.requests.trim() ? `\n📝 Special Request: ${formData.requests.trim()}` : '') +
      `\n\nPlease confirm my reservation. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Small delay to show the redirection UI, then open WA
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
      // Optional: Reset form 
      // setFormData({name: '', phone: '', date: '', time: '', guests: '', requests: ''});
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-16 font-body text-gray-800">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6">
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-sm font-bold text-bakery-700 bg-bakery-50 px-3 py-1 rounded-full border border-bakery-200 shadow-sm"><User size={16}/> Table Booking</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-3">Reserve Your Table</h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">Fill Form → Confirm → WhatsApp</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Booking Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-10 relative overflow-hidden">
             
            <AnimatePresence>
               {isSubmitting && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="relative w-24 h-24 mb-6">
                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-green-500 shadow-lg" />
                       <MessageCircle size={32} className="absolute inset-0 m-auto text-green-500" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Redirecting to WhatsApp...</h3>
                    <p className="text-gray-500 font-medium animate-pulse">Sending your reservation details</p>
                 </motion.div>
               )}
            </AnimatePresence>

            <form onSubmit={handleConfirmReservation} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <User size={16} className="text-bakery-500" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.name ? 'border-red-400 focus:bg-white focus:border-red-500' : 'border-gray-200 focus:bg-white focus:border-bakery-500'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Phone size={16} className="text-bakery-500" /> Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 border-r border-gray-200 pr-2">+91</span>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-16 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.phone ? 'border-red-400 focus:bg-white focus:border-red-500' : 'border-gray-200 focus:bg-white focus:border-bakery-500'}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> {errors.phone}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Calendar size={16} className="text-bakery-500" /> Date
                  </label>
                  <input 
                    type="date" 
                    name="date"
                    min={new Date().toISOString().split('T')[0]} // Stop past dates
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all text-gray-700 ${errors.date ? 'border-red-400 focus:bg-white focus:border-red-500' : 'border-gray-200 focus:bg-white focus:border-bakery-500'}`}
                  />
                  {errors.date && <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> {errors.date}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Clock size={16} className="text-bakery-500" /> Time
                  </label>
                  <select 
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all cursor-pointer text-gray-700 ${errors.time ? 'border-red-400 focus:bg-white focus:border-red-500' : 'border-gray-200 focus:bg-white focus:border-bakery-500'}`}
                  >
                    <option value="" disabled>Select Time</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="1:30 PM">1:30 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="6:30 PM">6:30 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="8:30 PM">8:30 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="9:30 PM">9:30 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                  </select>
                  {errors.time && <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> {errors.time}</p>}
                </div>

                {/* Guests */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Users size={16} className="text-bakery-500" /> Number of Guests
                  </label>
                  <select 
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all cursor-pointer text-gray-700 ${errors.guests ? 'border-red-400 focus:bg-white focus:border-red-500' : 'border-gray-200 focus:bg-white focus:border-bakery-500'}`}
                  >
                    <option value="" disabled>Select Number of Guests</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num.toString()}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                    <option value="10+">More than 10 (Call required)</option>
                  </select>
                  {errors.guests && <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> {errors.guests}</p>}
                </div>

                {/* Special Requests */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea 
                    name="requests"
                    placeholder="e.g. Window seat, anniversary celebration, etc."
                    value={formData.requests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:bg-white focus:border-bakery-500 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button type="submit" className="bakery-btn w-full justify-center py-5 shadow-xl shadow-bakery-600/20 text-lg flex items-center gap-2 hover:scale-[1.01] transition-transform">
                  Confirm Reservation <ArrowLeft className="rotate-180" size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Booking Policies */}
          <div className="lg:col-span-4 bg-gray-900 text-white rounded-3xl shadow-xl p-8 sticky top-32">
            <h3 className="font-display text-2xl font-bold mb-6 text-bakery-200">Booking Policies</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                <Clock className="text-bakery-400 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold mb-1">Grace Period</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Reservations will be held for 15 minutes. After this period, your table may be released.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                <Users className="text-bakery-400 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold mb-1">Large Groups</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Groups above 10 guests must contact the restaurant directly via phone to confirm arrangements.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                <Info className="text-bakery-400 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold mb-1">Special Layouts</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Special seating requests (e.g., window seats) are subject to availability upon arrival.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-black/30 p-5 rounded-2xl border border-gray-800">
               <p className="text-sm text-gray-400 mb-2 font-bold uppercase tracking-widest">Contact Us</p>
               <p className="font-display text-2xl font-bold text-white flex items-center gap-2"><Phone size={24} className="text-bakery-400"/> +91 98765 43210</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
