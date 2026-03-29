'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.find(i => i.id === product.id);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="bakery-card group overflow-hidden flex flex-col relative"
    >
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-black">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-[1.15] group-hover:opacity-80"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-luxury-gold to-[#c79100] text-black text-xs font-bold font-body uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            {product.badge}
          </span>
        )}

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center z-10">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAdd}
            className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-sm rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-luxury-gold hover:border-luxury-gold hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all flex items-center gap-2"
          >
            <Plus size={16} />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <Star size={14} className="text-luxury-gold fill-luxury-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
          <span className="font-body text-sm font-bold text-luxury-gold drop-shadow-md">{product.rating}</span>
          <span className="font-body text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">({product.reviews} Reviews)</span>
        </div>
        
        <h3 className="font-display text-2xl font-bold text-white leading-tight mb-2 group-hover:text-luxury-gold transition-colors">
          {product.name}
        </h3>
        
        <p className="font-body text-sm text-gray-400 leading-relaxed mb-6 flex-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div>
            <span className="font-display text-2xl font-bold text-white tracking-wide">₹{product.price}</span>
            {inCart && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="ml-3 px-2 py-0.5 bg-luxury-gold/20 text-luxury-gold text-xs font-bold rounded-full border border-luxury-gold/30"
              >
                ×{inCart.quantity} Added
              </motion.span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
              added
                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                : 'bg-white/5 border border-white/20 text-white hover:bg-gradient-to-br hover:from-luxury-gold hover:to-[#a68623] hover:border-transparent hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            }`}
          >
            <ShoppingCart size={18} strokeWidth={added ? 3 : 2} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
