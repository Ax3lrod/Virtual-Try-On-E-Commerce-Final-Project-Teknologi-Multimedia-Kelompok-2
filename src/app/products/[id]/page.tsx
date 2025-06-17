'use client';
import { products } from '@/content/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Heart, Share, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const product = products.find((p) => p.id === params.id);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Hero Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-purple-100/50 to-blue-100/30 -z-10"></div>
      
      <motion.div
        className="relative z-10 px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="group flex items-center text-slate-600 hover:text-slate-900 p-0 h-auto"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/60 backdrop-blur-sm transition-all duration-300">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Collection</span>
              </div>
            </Button>
          </motion.div>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              </div>

              {/* Floating Features */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center shadow-lg ${
                    isLiked 
                      ? 'bg-red-500/90 text-white' 
                      : 'bg-white/90 text-slate-600 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-slate-600 hover:bg-white shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Share className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              className="flex flex-col justify-center space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Product Info */}
              <div className="space-y-4">
                {/* Category & Tags */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium capitalize">
                    {product.category}
                  </span>
                  {product.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : i < product.rating 
                            ? 'fill-yellow-200 text-yellow-400' 
                            : 'text-slate-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-slate-600 font-medium">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ${(product.price * (1 - product.discount)).toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-lg text-slate-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        {Math.round(product.discount * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-6">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-slate-700 font-medium">Quantity:</span>
                  <div className="flex items-center bg-white rounded-xl shadow-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                      disabled={product.stock === 0}
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold text-slate-900 border-x border-slate-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                      disabled={product.stock === 0 || quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  {product.stock > 0 && (
                    <span className="text-sm text-slate-500">
                      Max: {product.stock}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    className="flex-1 h-14 text-lg font-semibold shadow-lg hover:shadow-xl"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-3 w-6 h-6" />
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  
                  {product.arUrl && (
                    <Link href={product.arUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full h-14 text-lg font-semibold border-2 hover:bg-slate-50"
                      >
                        <RotateCcw className="mr-3 w-6 h-6" />
                        Try in AR
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Free Shipping</p>
                    <p className="text-xs text-slate-600">Orders over $50</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">2 Year Warranty</p>
                    <p className="text-xs text-slate-600">Full coverage</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">30-Day Returns</p>
                    <p className="text-xs text-slate-600">Hassle-free</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}