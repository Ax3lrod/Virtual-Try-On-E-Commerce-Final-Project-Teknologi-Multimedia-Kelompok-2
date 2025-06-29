'use client';
import { Button } from "./ui/Button";
import { ShoppingCart, Eye, Heart, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  imagePath: string;
  arUrl?: string;
};

export default function ProductCard({ id, name, price, imagePath, arUrl }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (isAdding) return;
    
    setIsAdding(true);
    try {
      addToCart(id);
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setIsAdding(false);
    }
  };

  const handleTryAR = () => {
    if (arUrl) {
      window.open(arUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-slate-100/50"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <Image
          src={imagePath}
          alt={name}
          fill
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`w-10 h-10 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center ${
              isLiked 
                ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/25' 
                : 'bg-white/90 text-slate-600 hover:bg-white shadow-lg'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          
          {arUrl && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTryAR}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/90 to-blue-500/90 backdrop-blur-md text-white shadow-lg shadow-purple-500/25 transition-all duration-300 flex items-center justify-center"
              title="Try in AR"
            >
              <Camera className="w-5 h-5" />
            </motion.button>
          )}
          
          <Link href={`/products/${id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:bg-white shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* AR Badge */}
        {arUrl && (
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-500/90 to-blue-500/90 backdrop-blur-md px-2 py-1 rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">AR</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 leading-tight">
            {name}
          </h3>
          <div className="flex items-center justify-center gap-1 text-slate-400">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            <span className="text-xs font-medium px-2">PREMIUM</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>
        </div>

        {/* Action Area */}
        <div className="space-y-3">
          {/* Primary Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button 
              className={`w-full h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                isAdding 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
              }`}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              {isAdding ? 'Added!' : 'Add to Cart'}
            </Button>
          </motion.div>

          {/* Secondary Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {arUrl ? (
              <div className="grid grid-cols-2 gap-2">
                <Link href={`/products/${id}`} className="block">
                  <Button className="w-full h-12 bg-transparent border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-xl transition-all duration-300">
                    Details
                  </Button>
                </Link>
                <Button 
                  onClick={handleTryAR}
                  className="w-full h-12 bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-200 text-purple-700 hover:from-purple-200 hover:to-blue-200 hover:border-purple-300 font-semibold rounded-xl transition-all duration-300"
                >
                  <Camera className="mr-1 w-4 h-4" />
                  AR
                </Button>
              </div>
            ) : (
              <Link href={`/products/${id}`} className="block">
                <Button className="w-full h-12 bg-transparent border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-xl transition-all duration-300">
                  View Details
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
}