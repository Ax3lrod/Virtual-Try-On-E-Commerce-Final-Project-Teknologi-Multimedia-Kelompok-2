'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartService } from '@/app/functions/shop';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imagePath: string;
  quantity: number;
  discount?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartService = new CartService();

  const refreshCart = () => {
    const items = cartService.getCart();
    setCartItems(items);
  };

  const addToCart = (productId: string, quantity: number = 1) => {
    try {
      cartService.addItem(productId, quantity);
      refreshCart();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };

  const removeFromCart = (productId: string) => {
    cartService.removeItem(productId);
    refreshCart();
  };

  const updateQuantity = (productId: string, quantity: number) => {
    cartService.updateQuantity(productId, quantity);
    refreshCart();
  };

  const clearCart = () => {
    cartService.clearCart();
    refreshCart();
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const { totalItems, totalPrice } = cartService.getCartTotals(cartItems);

  const value = {
    cartItems,
    cartCount: totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
