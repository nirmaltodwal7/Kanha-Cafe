'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, Clock, Heart } from 'lucide-react';
import { products, testimonials } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/Skeleton';

const BakeryScene = lazy(() => import('@/components/BakeryScene'));

const stats = [
  { icon: Award, value: '16+', label: 'Years of Craft' },
  { icon: Star,  value: '4.9★', label: 'Customer Rating' },
  { icon: Clock, value: '50K+', label: 'Orders Delivered' },
  { icon: Heart, value: '100%', label: 'Made with Love' },
];

const featured = products.filter(p => ['c1', 'p1', 's4', 'b2'].includes(p.id));

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="bg-cream">
      {/* ── HERO ────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-mocha via-[#5a2f18] to-[#3d2012]" />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(196,110,31,0.35)_0%,transparent_65%)]" />

        {/* Three.js canvas */}
        {mounted && (
          <Suspense fallback={null}>
            <BakeryScene />
          </Suspense>
        )}

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 items-center gap-12 min-h-screen">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-accent text-3xl text-caramel mb-2"
            >
              Welcome to
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none mb-6"
            >
              Kanha<br />
              <span className="text-caramel italic">Bakers</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body text-lg text-bakery-200 max-w-md leading-relaxed mb-10"
            >
              Artisan baked goods crafted with passion in the heart of Rajasthan. Every bite tells a story of love, tradition and the finest ingredients.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/menu" className="bakery-btn text-base shadow-xl shadow-bakery-800/40">
                Explore Menu <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="bakery-btn-outline border-white/40 text-white hover:bg-white hover:text-mocha text-base">
                Our Story
              </Link>
            </motion.div>
          </div>

          {/* Stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="hidden lg:grid grid-cols-2 gap-4 self-center"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all">
                <Icon size={24} className="text-caramel mx-auto mb-2" />
                <p className="font-display text-3xl font-bold text-white">{value}</p>
                <p className="font-body text-sm text-bakery-200">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1.5 h-2.5 bg-caramel rounded-full" />
        </motion.div>
      </section>

      {/* ── FEATURED PRODUCTS ───────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-subtitle mb-2"
            >
              Our Specialties
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Fan Favourites
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          <div className="text-center">
            <Link href="/menu" className="bakery-btn text-base">
              View Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ───────────────────────── */}
      <section className="py-20 bg-mocha">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80"
                alt="Kanha Bakers kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-bakery-600 rounded-3xl flex flex-col items-center justify-center shadow-2xl rotate-6">
              <span className="font-display text-4xl font-bold text-white">16</span>
              <span className="font-body text-xs text-bakery-100 text-center leading-tight">Years of<br />Excellence</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-accent text-3xl text-caramel mb-2">Our Story</p>
            <h2 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
              Baked Fresh.<br />Served with Pride.
            </h2>
            <p className="font-body text-bakery-200 leading-relaxed mb-4">
              Founded in 2008 by the Sharma family, Kanha Bakers began as a small neighborhood bakery with a single oven and an enormous dream — to bring European artisan baking techniques to the people of Ajmer.
            </p>
            <p className="font-body text-bakery-200 leading-relaxed mb-8">
              Today we are Rajasthan's most beloved artisan bakery, yet every product is still made by hand, every morning, before the sun rises.
            </p>
            <Link href="/about" className="bakery-btn-outline border-caramel text-caramel hover:bg-caramel hover:text-white">
              Read Full Story <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────── */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">Happy Customers</p>
            <h2 className="section-title">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-caramel fill-caramel" />
                  ))}
                </div>
                <p className="font-body text-sm text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-bakery-200"
                  />
                  <div>
                    <p className="font-body font-bold text-sm text-mocha">{t.name}</p>
                    <p className="font-body text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-bakery-600 to-bakery-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-3xl text-bakery-100 mb-2"
          >
            Ready to indulge?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl font-bold text-white mb-6"
          >
            Order Your Favourites
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-bakery-100 mb-10"
          >
            Fresh batches ready every morning. Visit our store or order online — we deliver across Ajmer.
          </motion.p>
          <Link href="/menu" className="px-10 py-4 bg-white text-bakery-700 font-bold font-body rounded-full hover:bg-cream transition-all shadow-2xl inline-flex items-center gap-2 text-lg">
            View Full Menu <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
