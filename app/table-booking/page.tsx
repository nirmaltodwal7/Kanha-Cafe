'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TableBooking() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an API request
    console.log('Booking submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        date: '',
        time: '',
        guests: '2',
        name: '',
        email: '',
        phone: '',
        specialRequests: '',
      });
    }, 5000);
  };

  // Get today's date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bakery-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-caramel/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold text-mocha mb-4"
          >
            Reserve Your <span className="text-bakery-600">Table</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-crust max-w-2xl mx-auto"
          >
            Join us for an unforgettable dining experience. Book your table in advance and let us prepare for your visit to Kanha Bakers & Cafe.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="bg-white rounded-3xl shadow-xl shadow-bakery-200/50 overflow-hidden relative"
        >
          {isSubmitted ? (
             <div className="p-16 flex flex-col items-center justify-center text-center">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", stiffness: 200, damping: 20 }}
                 className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
               >
                 <CheckCircle2 size={48} className="text-green-600" />
               </motion.div>
               <h2 className="font-display text-4xl font-bold text-mocha mb-4">Booking Confirmed!</h2>
               <p className="font-body text-lg text-crust mb-8 max-w-md">
                 Thank you, {formData.name}. Your table for {formData.guests} has been reserved for {formData.date} at {formData.time}. We look forward to serving you!
               </p>
               <p className="font-body text-sm text-bakery-500">
                 You will receive a confirmation message shortly.
               </p>
             </div>
          ) : (
            <div className="grid md:grid-cols-5 gap-0">
               {/* Left Column - Form */}
              <div className="md:col-span-3 p-8 md:p-12 relative z-10 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="font-body text-sm font-semibold text-mocha flex items-center gap-2">
                        <Calendar size={16} className="text-bakery-500" /> Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        min={today}
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream/50 border border-bakery-200 rounded-xl focus:ring-2 focus:ring-bakery-500 focus:border-transparent transition-all font-body text-mocha outline-none"
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="font-body text-sm font-semibold text-mocha flex items-center gap-2">
                        <Clock size={16} className="text-bakery-500" /> Time
                      </label>
                      <select
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream/50 border border-bakery-200 rounded-xl focus:ring-2 focus:ring-bakery-500 focus:border-transparent transition-all font-body text-mocha outline-none appearance-none"
                      >
                        <option value="">Select Time</option>
                        <option value="08:00">08:00 AM</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                        <option value="19:00">07:00 PM</option>
                        <option value="20:00">08:00 PM</option>
                      </select>
                    </div>

                     {/* Guests */}
                     <div className="space-y-2 sm:col-span-2">
                      <label className="font-body text-sm font-semibold text-mocha flex items-center gap-2">
                        <Users size={16} className="text-bakery-500" /> Number of Guests
                      </label>
                      <select
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream/50 border border-bakery-200 rounded-xl focus:ring-2 focus:ring-bakery-500 focus:border-transparent transition-all font-body text-mocha outline-none appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'].map((num) => (
                           <option key={num} value={num.toString()}>{num} {num === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                    </div>

                    {/* Personal Info */}
                    <div className="space-y-2">
                      <label className="font-body text-sm font-semibold text-mocha">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream/50 border border-bakery-200 rounded-xl focus:ring-2 focus:ring-bakery-500 focus:border-transparent transition-all font-body text-mocha outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="font-body text-sm font-semibold text-mocha">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream/50 border border-bakery-200 rounded-xl focus:ring-2 focus:ring-bakery-500 focus:border-transparent transition-all font-body text-mocha outline-none"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="font-body text-sm font-semibold text-mocha">Email (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream/50 border border-bakery-200 rounded-xl focus:ring-2 focus:ring-bakery-500 focus:border-transparent transition-all font-body text-mocha outline-none"
                      />
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2 sm:col-span-2">
                       <label className="font-body text-sm font-semibold text-mocha">Special Requests (Optional)</label>
                       <textarea
                         name="specialRequests"
                         rows={3}
                         placeholder="Any allergies, window seat preference, celebrating a special occasion?"
                         value={formData.specialRequests}
                         onChange={handleChange}
                         className="w-full px-4 py-3 bg-cream/50 border border-bakery-200 rounded-xl focus:ring-2 focus:ring-bakery-500 focus:border-transparent transition-all font-body text-mocha outline-none resize-none"
                       />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-bakery-600 hover:bg-bakery-700 text-white rounded-xl font-display font-bold text-lg tracking-wide shadow-lg shadow-bakery-600/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group mt-6"
                  >
                    Confirm Reservation
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>

               {/* Right Column - Info */}
              <div className="md:col-span-2 bg-mocha text-cream p-8 md:p-12 relative overflow-hidden flex flex-col justify-between">
                {/* Decorative background in the right panel */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-caramel/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-bakery-600/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
                
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Booking Policies</h3>
                    <p className="font-body text-sm text-bakery-200 leading-relaxed">
                      Please note our reservation guidelines to ensure a smooth dining experience.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-bakery-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold font-accent">1</span>
                      </div>
                      <p className="font-body text-sm text-bakery-100">
                        Reservations are held for a grace period of 15 minutes.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-bakery-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold font-accent">2</span>
                      </div>
                      <p className="font-body text-sm text-bakery-100">
                        For groups larger than 10, please contact us directly via phone.
                      </p>
                    </li>
                     <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-bakery-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold font-accent">3</span>
                      </div>
                      <p className="font-body text-sm text-bakery-100">
                        Special seating requests are subject to availability.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="relative z-10 mt-12 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                  <p className="font-accent text-3xl text-caramel mb-2">Need Help?</p>
                  <p className="font-body text-sm text-bakery-200 mb-4">
                    Call us directly if you need to modify or cancel your booking.
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 font-display font-bold text-lg text-white hover:text-caramel transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
