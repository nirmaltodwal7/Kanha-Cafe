'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChefHat, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const links = {
  Explore: [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Table Booking', href: '/table-booking' },
  ],
  Categories: [
    { label: 'Cakes', href: '/menu?cat=Cakes' },
    { label: 'Pastries', href: '/menu?cat=Pastries' },
    { label: 'Snacks', href: '/menu?cat=Snacks' },
    { label: 'Beverages', href: '/menu?cat=Beverages' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-mocha text-cream relative overflow-hidden">
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bakery-600 via-caramel to-bakery-600" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-bakery-600 rounded-xl flex items-center justify-center">
                <ChefHat size={22} className="text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white block leading-none">Kanha</span>
                <span className="font-accent text-sm text-caramel leading-none">Bakers</span>
              </div>
            </div>
            <p className="font-body text-sm text-bakery-200 leading-relaxed mb-6">
              Baking happiness since 2008. Every creation is an expression of love, crafted with the finest ingredients from the heart of Rajasthan.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-bakery-200 hover:bg-bakery-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display text-lg font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-bakery-200 hover:text-caramel transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-caramel shrink-0 mt-0.5" />
                <span className="font-body text-sm text-bakery-200">12, Naya Bazaar, Ajmer, Rajasthan 305001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-caramel shrink-0" />
                <a href="tel:+919876543210" className="font-body text-sm text-bakery-200 hover:text-caramel transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-caramel shrink-0" />
                <a href="mailto:hello@kanhabakers.in" className="font-body text-sm text-bakery-200 hover:text-caramel transition-colors">hello@kanhabakers.in</a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="font-body text-xs text-bakery-300 mb-1">Opening Hours</p>
              <p className="font-body text-sm text-white font-semibold">Mon–Sat: 7am – 9pm</p>
              <p className="font-body text-sm text-white font-semibold">Sunday: 8am – 7pm</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-bakery-400">
            © 2024 Kanha Bakers. All rights reserved. Made with ♥ in Ajmer.
          </p>
          <p className="font-accent text-lg text-caramel">
            Crafted with love, baked with pride.
          </p>
        </div>
      </div>
    </footer>
  );
}
