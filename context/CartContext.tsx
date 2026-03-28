'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const calcTotals = (items: CartItem[]) => ({
  total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  count: items.reduce((sum, item) => sum + item.quantity, 0),
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      const items = existing
        ? state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { ...state, items, ...calcTotals(items) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload);
      return { ...state, items, ...calcTotals(items) };
    }
    case 'UPDATE_QUANTITY': {
      const items = action.payload.quantity <= 0
        ? state.items.filter(i => i.id !== action.payload.id)
        : state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
      return { ...state, items, ...calcTotals(items) };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0, count: 0 };
    case 'LOAD_CART': {
      const items = action.payload;
      return { items, ...calcTotals(items) };
    }
    default:
      return state;
  }
};

interface CartContextValue extends CartState {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, count: 0 });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kanha_cart');
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('kanha_cart', JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  return (
    <CartContext.Provider value={{
      ...state,
      addItem: (p) => dispatch({ type: 'ADD_ITEM', payload: p }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      updateQuantity: (id, q) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: q } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
