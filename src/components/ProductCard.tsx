import React, { useState } from 'react';
import { Star, Plus, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const cartItem = items.find(item => item.product.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addItem(product);
    setIsAdding(false);
    setShowSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
      onClick={() => onProductClick(product)}
    >
      {/* Success notification */}
      {showSuccess && (
        <div className="absolute top-2 left-2 right-2 bg-emerald-500 text-white text-sm py-2 px-3 rounded-lg z-20 flex items-center justify-center animate-fade-in">
          <Check className="h-4 w-4 mr-2" />
          Added to cart!
        </div>
      )}

      <div className="relative overflow-hidden rounded-t-xl">
        {product.isOnSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full z-10">
            Sale
          </div>
        )}
        
        {/* Stock indicator */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded-full z-10">
            Low Stock
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 text-xs font-semibold rounded-full z-10">
            Out of Stock
          </div>
        )}

        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick add button overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className="opacity-0 group-hover:opacity-100 bg-white text-emerald-600 px-4 py-2 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAdding ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-emerald-600 border-t-transparent rounded-full"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className={`p-2 rounded-lg transition-all duration-300 flex items-center space-x-1 ${
              isInCart 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            {isAdding ? (
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
            ) : isInCart ? (
              <>
                <Check className="h-4 w-4" />
                <span className="text-sm">In Cart ({cartItem?.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">Add</span>
              </>
            )}
          </button>
        </div>

        {/* Stock indicator */}
        <div className="text-xs">
          {product.stock === 0 ? (
            <p className="text-red-600 font-medium">Out of Stock</p>
          ) : product.stock < 10 ? (
            <p className="text-orange-600 font-medium">
              Only {product.stock} left in stock!
            </p>
          ) : (
            <p className="text-green-600 font-medium">
              ✓ In Stock ({product.stock} available)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}