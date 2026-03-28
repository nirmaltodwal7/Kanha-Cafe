'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/Skeleton';

type Category = 'All' | 'Cakes' | 'Pastries' | 'Snacks' | 'Beverages';
const categories: Category[] = ['All', 'Cakes', 'Pastries', 'Snacks', 'Beverages'];

const catEmojis: Record<string, string> = {
  All: '✨', Cakes: '🎂', Pastries: '🥐', Snacks: '🥨', Beverages: '☕',
};

function MenuContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cat = searchParams.get('cat') as Category;
    if (cat && categories.includes(cat)) setActiveCategory(cat);
    setTimeout(() => setLoading(false), 600);
  }, [searchParams]);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-mocha to-[#5a2f18] py-16 px-6 mb-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-accent text-3xl text-caramel mb-2"
          >
            Freshly Baked
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-white"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-bakery-200 mt-4 max-w-xl mx-auto"
          >
            Every item crafted with care, baked fresh each morning in our Ajmer kitchen.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-bakery-100 rounded-xl font-body text-sm focus:outline-none focus:border-bakery-400 focus:ring-2 focus:ring-bakery-100 shadow-sm"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl font-body text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-bakery-600 text-white shadow-md shadow-bakery-600/30'
                    : 'bg-white text-mocha border border-bakery-100 hover:border-bakery-400'
                }`}
              >
                <span className="mr-1">{catEmojis[cat]}</span>{cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="font-body text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-mocha">{filtered.length}</span> items
          {activeCategory !== 'All' && <span> in <span className="text-bakery-600 font-semibold">{activeCategory}</span></span>}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="font-display text-2xl font-bold text-mocha mb-2">Nothing found</h3>
            <p className="font-body text-gray-500">Try a different search or category</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream pt-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
