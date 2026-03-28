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
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="bakery-card group overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-bakery-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-bakery-600 text-white text-xs font-bold rounded-full shadow-md">
            {product.badge}
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-mocha/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAdd}
            className="px-5 py-2 bg-white text-mocha font-bold text-sm rounded-full shadow-lg flex items-center gap-2"
          >
            <Plus size={14} />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
          <Star size={12} className="text-caramel fill-caramel" />
          <span className="font-body text-xs font-semibold text-caramel">{product.rating}</span>
          <span className="font-body text-xs text-gray-400">({product.reviews})</span>
        </div>
        <h3 className="font-display text-lg font-semibold text-mocha leading-tight mb-1">
          {product.name}
        </h3>
        <p className="font-body text-xs text-gray-500 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="font-display text-xl font-bold text-bakery-700">₹{product.price}</span>
            {inCart && (
              <span className="ml-2 text-xs text-caramel font-semibold">×{inCart.quantity} in cart</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-bakery-600 text-white hover:bg-bakery-700 hover:shadow-lg hover:shadow-bakery-600/40'
            }`}
          >
            <ShoppingCart size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
