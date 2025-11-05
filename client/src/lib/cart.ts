import { CartItem } from "@shared/schema";

const CART_STORAGE_KEY = "resinart_cart";

export const cartStorage = {
  get(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  set(items: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  },

  add(item: CartItem): CartItem[] {
    const cart = this.get();
    const existingIndex = cart.findIndex(i => i.productId === item.productId);
    
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }
    
    this.set(cart);
    return cart;
  },

  update(productId: string, quantity: number): CartItem[] {
    const cart = this.get();
    const index = cart.findIndex(i => i.productId === productId);
    
    if (index >= 0) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
    }
    
    this.set(cart);
    return cart;
  },

  remove(productId: string): CartItem[] {
    const cart = this.get().filter(i => i.productId !== productId);
    this.set(cart);
    return cart;
  },

  clear(): void {
    this.set([]);
  },

  getTotal(): number {
    return this.get().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getItemCount(): number {
    return this.get().reduce((sum, item) => sum + item.quantity, 0);
  }
};
