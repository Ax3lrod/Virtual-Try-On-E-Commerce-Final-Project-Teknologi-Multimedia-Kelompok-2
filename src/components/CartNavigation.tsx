'use client';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function CartNavigation() {
  const { cartCount } = useCart();

  return (
    <Link href="/cart">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/20 hover:bg-white transition-all duration-300"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6 text-slate-700" />
          {cartCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {cartCount > 99 ? '99+' : cartCount}
            </motion.div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
