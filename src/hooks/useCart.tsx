import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { cartAPI } from '../services/api';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  loading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART'; payload: { items: CartItem[]; total: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_CART': {
      const { items, total } = action.payload;
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items, total, itemCount, loading: false, error: null };
    }
    
    case 'CLEAR_CART':
      return { ...initialState };
    
    default:
      return state;
  }
}

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, []);
  
  const refreshCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cartData = await cartAPI.get();
      dispatch({ type: 'SET_CART', payload: cartData });
    } catch (error) {
      console.error('Failed to load cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
    }
  };
  
  const addItem = async (product: Product, quantity: number = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cartData = await cartAPI.addItem(product.id, quantity);
      dispatch({ type: 'SET_CART', payload: cartData });
    } catch (error: any) {
      console.error('Failed to add item:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add item to cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };
  
  const removeItem = async (productId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cartData = await cartAPI.removeItem(productId);
      dispatch({ type: 'SET_CART', payload: cartData });
    } catch (error: any) {
      console.error('Failed to remove item:', error);
      const errorMessage = error.response?.data?.error || 'Failed to remove item';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };
  
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cartData = await cartAPI.updateQuantity(productId, quantity);
      dispatch({ type: 'SET_CART', payload: cartData });
    } catch (error: any) {
      console.error('Failed to update quantity:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update quantity';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };
  
  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cartData = await cartAPI.clear();
      dispatch({ type: 'SET_CART', payload: cartData });
    } catch (error: any) {
      console.error('Failed to clear cart:', error);
      const errorMessage = error.response?.data?.error || 'Failed to clear cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };
  
  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refreshCart
    }}>
      {children}
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