import axios from 'axios';
import { Product, CartItem, Order } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Generate session ID for cart management
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Product API
export const productAPI = {
  getAll: async (category?: string, search?: string): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/categories');
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  get: async (): Promise<{ items: CartItem[]; total: number }> => {
    const sessionId = getSessionId();
    const response = await api.get(`/cart/${sessionId}`);
    return response.data;
  },

  addItem: async (productId: string, quantity: number = 1): Promise<{ items: CartItem[]; total: number }> => {
    const sessionId = getSessionId();
    const response = await api.post(`/cart/${sessionId}/add`, {
      productId,
      quantity,
    });
    return response.data;
  },

  updateQuantity: async (productId: string, quantity: number): Promise<{ items: CartItem[]; total: number }> => {
    const sessionId = getSessionId();
    const response = await api.put(`/cart/${sessionId}/update`, {
      productId,
      quantity,
    });
    return response.data;
  },

  removeItem: async (productId: string): Promise<{ items: CartItem[]; total: number }> => {
    const sessionId = getSessionId();
    const response = await api.delete(`/cart/${sessionId}/remove/${productId}`);
    return response.data;
  },

  clear: async (): Promise<{ items: CartItem[]; total: number }> => {
    const sessionId = getSessionId();
    const response = await api.delete(`/cart/${sessionId}/clear`);
    return response.data;
  },
};

// Order API
export const orderAPI = {
  create: async (customerInfo: any, items: CartItem[]): Promise<Order> => {
    const sessionId = getSessionId();
    const response = await api.post('/orders', {
      sessionId,
      customerInfo,
      items,
    });
    return response.data;
  },

  getById: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;