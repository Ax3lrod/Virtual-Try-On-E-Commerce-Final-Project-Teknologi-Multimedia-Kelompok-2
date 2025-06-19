'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { CartService } from '@/app/functions/shop';
import { products } from '@/content/products';
import Toast from '@/components/ui/Toast';

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
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const cartService = useMemo(() => new CartService(), []);

  const refreshCart = useCallback(() => {
    const items = cartService.getCart();
    setCartItems(items);
  }, [cartService]);

  const addToCart = (productId: string, quantity: number = 1) => {
    try {
      const product = products.find(p => p.id === productId);
      cartService.addItem(productId, quantity);
      refreshCart();
      
      // Show toast notification
      if (product) {
        const message = `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added!`;
        setToastMessage(message);
        setShowToast(true);
      }
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
  }, [refreshCart]);

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

  return (
    <CartContext.Provider value={value}>
      {children}
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
