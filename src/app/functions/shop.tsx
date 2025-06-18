import { products } from '../../content/products';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imagePath: string;
  quantity: number;
  discount?: number;
}

// Cart service class
export class CartService {
  private readonly STORAGE_KEY = 'SantuyAjaGengs';

  // Get cart from localStorage
  getCart(): CartItem[] {
    try {
      const cartData = localStorage.getItem(this.STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  // Save cart to localStorage
  private saveCart(items: CartItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // Add item to cart
  addItem(productId: string, quantity: number = 1): CartItem[] {
    const product = products.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imagePath: product.imagePath,
        quantity: quantity,
        discount: product.discount
      };
      cart.push(newItem);
    }

    this.saveCart(cart);
    return cart;
  }

  // Remove item from cart
  removeItem(productId: string): CartItem[] {
    const cart = this.getCart();
    const updatedItems = cart.filter(item => item.id !== productId);
    this.saveCart(updatedItems);
    return updatedItems;
  }

  // Update item quantity
  updateQuantity(productId: string, quantity: number): CartItem[] {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
    }

    this.saveCart(cart);
    return cart;
  }

  // Clear entire cart
  clearCart(): CartItem[] {
    localStorage.removeItem(this.STORAGE_KEY);
    return [];
  }

  // Get cart totals
  getCartTotals(items: CartItem[]) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => {
      const itemPrice = item.discount 
        ? item.price * (1 - item.discount)
        : item.price;
      return sum + (itemPrice * item.quantity);
    }, 0);

    return {
      totalItems,
      totalPrice: Math.round(totalPrice * 100) / 100
    };
  }
}