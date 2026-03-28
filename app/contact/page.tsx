'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['12, Naya Bazaar', 'Ajmer, Rajasthan 305001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 96789 01234'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['hello@kanhabakers.in', 'orders@kanhabakers.in'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['Mon – Sat: 7:00am – 9:00pm', 'Sunday: 8:00am – 7:00pm'],
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-mocha to-[#5a2f18] py-28 px-6 pt-36">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-accent text-3xl text-caramel mb-2"
          >
            We'd love to hear from you
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl font-bold text-white"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-bakery-200 mt-4 max-w-xl mx-auto"
          >
            Custom cake orders, bulk enquiries, feedback or just a warm hello — we read every message personally.
          </motion.p>
        </div>
      </div>

      {/* Contact info cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactInfo.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow border border-bakery-50"
          >
            <div className="w-11 h-11 bg-bakery-600 rounded-xl flex items-center justify-center mb-4">
              <item.icon size={20} className="text-white" />
            </div>
            <h3 className="font-display text-base font-bold text-mocha mb-2">{item.title}</h3>
            {item.lines.map(l => (
              <p key={l} className="font-body text-sm text-gray-500">{l}</p>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Form + Map */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          <h2 className="font-display text-2xl font-bold text-mocha mb-6">Send us a Message</h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="font-display text-2xl font-bold text-mocha mb-2">Message Sent!</h3>
              <p className="font-body text-gray-500 max-w-xs">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-bakery-50 border border-bakery-100 rounded-xl font-body text-sm focus:outline-none focus:border-bakery-400 focus:ring-2 focus:ring-bakery-100 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 bg-bakery-50 border border-bakery-100 rounded-xl font-body text-sm focus:outline-none focus:border-bakery-400 focus:ring-2 focus:ring-bakery-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-bakery-50 border border-bakery-100 rounded-xl font-body text-sm focus:outline-none focus:border-bakery-400 focus:ring-2 focus:ring-bakery-100 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bakery-50 border border-bakery-100 rounded-xl font-body text-sm focus:outline-none focus:border-bakery-400 focus:ring-2 focus:ring-bakery-100 transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="custom-cake">Custom Cake Order</option>
                  <option value="bulk-order">Bulk / Corporate Order</option>
                  <option value="feedback">Feedback</option>
                  <option value="catering">Event Catering</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="w-full px-4 py-3 bg-bakery-50 border border-bakery-100 rounded-xl font-body text-sm focus:outline-none focus:border-bakery-400 focus:ring-2 focus:ring-bakery-100 transition-all resize-none"
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !form.name || !form.email || !form.message}
                className="bakery-btn w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex-1 min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.5060734869737!2d74.6239733!3d26.4498954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e569bedf4dcd%3A0xadca97a7e83e7d1!2sNaya+Bazar%2C+Ajmer%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kanha Bakers Location"
            />
          </div>

          {/* Quick info card */}
          <div className="bg-mocha rounded-3xl p-6 text-white">
            <h3 className="font-display text-xl font-bold mb-3">Can't come in person?</h3>
            <p className="font-body text-bakery-200 text-sm leading-relaxed mb-4">
              We deliver across all of Ajmer city. Order online and have your fresh bakes delivered to your door within 45 minutes.
            </p>
            <div className="flex gap-3">
              <a href="tel:+919876543210" className="flex-1 py-3 bg-bakery-600 text-white font-body font-bold text-sm rounded-xl text-center hover:bg-bakery-700 transition-colors">
                📞 Call Now
              </a>
              <a href="https://wa.me/919876543210" className="flex-1 py-3 bg-green-600 text-white font-body font-bold text-sm rounded-xl text-center hover:bg-green-700 transition-colors">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
