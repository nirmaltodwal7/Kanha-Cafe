'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-bakery-50">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-xs text-bakery-600 font-semibold mb-0.5">{item.category}</p>
        <h4 className="font-display text-base font-semibold text-mocha leading-tight truncate">{item.name}</h4>
        <p className="font-display text-lg font-bold text-bakery-700 mt-1">₹{item.price}</p>
      </div>

      {/* Quantity + Delete */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-400 hover:text-red-600 transition-colors p-1"
        >
          <Trash2 size={15} />
        </button>
        <div className="flex items-center gap-2 bg-bakery-50 rounded-xl px-2 py-1 border border-bakery-100">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-bakery-700 hover:bg-bakery-600 hover:text-white transition-all"
          >
            <Minus size={13} />
          </button>
          <span className="font-body font-bold text-mocha w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 rounded-lg bg-bakery-600 shadow-sm flex items-center justify-center text-white hover:bg-bakery-700 transition-all"
          >
            <Plus size={13} />
          </button>
        </div>
        <p className="font-body text-xs text-gray-400">= ₹{item.price * item.quantity}</p>
      </div>
    </motion.div>
  );
}
