'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, ChefHat } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/booking', label: 'Table Booking' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-bakery-200/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-bakery-600 rounded-xl flex items-center justify-center shadow-lg shadow-bakery-600/30 group-hover:scale-110 transition-transform duration-300">
              <ChefHat size={22} className="text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-mocha block leading-none">Kanha</span>
              <span className="font-accent text-sm text-caramel leading-none">Bakers</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-body font-semibold text-sm tracking-wide transition-colors duration-200 ${
                  pathname === link.href ? 'text-bakery-600' : 'text-mocha hover:text-bakery-600'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-bakery-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Cart + Hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative group">
              <div className="w-10 h-10 rounded-xl bg-bakery-50 border border-bakery-200 flex items-center justify-center text-bakery-700 group-hover:bg-bakery-600 group-hover:text-white group-hover:border-bakery-600 transition-all duration-300 shadow-sm">
                <ShoppingCart size={18} />
              </div>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-bakery-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {count}
                </motion.span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-bakery-50 border border-bakery-200 flex items-center justify-center text-bakery-700"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-cream flex flex-col pt-24 px-8"
          >
            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`block font-display text-4xl font-bold transition-colors ${
                      pathname === link.href ? 'text-bakery-600' : 'text-mocha hover:text-bakery-500'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/cart" className="bakery-btn mt-4 w-full justify-center">
                  <ShoppingCart size={16} />
                  Cart ({count})
                </Link>
              </motion.div>
            </div>

            <div className="mt-auto pb-16">
              <p className="font-accent text-3xl text-caramel">Crafted with love.</p>
              <p className="font-body text-sm text-crust mt-1">Since 2008 · Ajmer, Rajasthan</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
