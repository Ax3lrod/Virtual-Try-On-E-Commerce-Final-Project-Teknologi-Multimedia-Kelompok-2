"use client";
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/Input';
import ProductCard from '@/components/ProductCard';
import CartNavigation from '@/components/CartNavigation';
import { products } from '@/content/products';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc } from 'lucide-react';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('');

  const filtered = useMemo(() => {
    let result = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sortOption === 'price-asc') {
      result = result.slice().sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result = result.slice().sort((a, b) => b.price - a.price);
    }
    return result;
  }, [search, sortOption]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Cart Navigation */}
      <CartNavigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Discover
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Premium Collection
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Curated products crafted with excellence and designed for the modern lifestyle
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Filter Bar */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Filter className="w-4 h-4" />
                <span className="font-medium">
                  {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Search Input */}
                <div className="relative group">
                  <Input
                    placeholder="Search products..."
                    className="w-full sm:w-80 h-12 pl-12 pr-4 rounded-xl border-0 bg-white/80 backdrop-blur-sm shadow-lg ring-1 ring-slate-200/50 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder:text-slate-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="h-12 pl-12 pr-8 rounded-xl border-0 bg-white/80 backdrop-blur-sm shadow-lg ring-1 ring-slate-200/50 focus:ring-2 focus:ring-purple-500/50 text-slate-700 font-medium cursor-pointer transition-all duration-300 appearance-none"
                  >
                    <option value="">Sort by Price</option>
                    <option value="price-asc">Low to High</option>
                    <option value="price-desc">High to Low</option>
                  </select>
                  <SortAsc className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1
                },
              },
            }}
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100/50">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  
                  {/* Product Card */}
                  <div className="relative z-20">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      imagePath={product.imagePath}
                    />
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-3">No products found</h3>
              <p className="text-slate-500 leading-relaxed">
                Try adjusting your search terms or browse our full collection
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}