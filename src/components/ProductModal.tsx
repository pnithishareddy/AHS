import React, { useState } from 'react';
import { X, Star, ShoppingCart, Minus, Plus, Check, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem, items, updateQuantity } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const cartItem = items.find(item => item.product.id === product.id);
  const currentCartQuantity = cartItem?.quantity || 0;

  if (!isOpen) return null;

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add the selected quantity
    for (let i = 0; i < selectedQuantity; i++) {
      addItem(product);
    }
    
    setIsAdding(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      updateQuantity(product.id, 0);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'usage', label: 'Usage Instructions' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Success notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-60 flex items-center animate-fade-in">
            <Check className="h-5 w-5 mr-2" />
            Added {selectedQuantity} item(s) to cart!
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-blue-500 transition-colors p-2">
              <Share2 className="h-5 w-5" />
            </button>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                {product.isOnSale && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-full z-10">
                    Sale - Save ${(product.originalPrice! - product.price).toFixed(2)}
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
              
              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">FDA Registered</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">Free Shipping</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <RotateCcw className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">30-Day Return</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-3">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <div className="flex flex-col">
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div className="p-4 rounded-lg bg-gray-50">
                {product.stock > 0 ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 font-medium flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        In Stock
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.stock} units available
                      </p>
                    </div>
                    {product.stock < 10 && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                        Low Stock
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-red-600 font-medium">
                    ✗ Out of Stock
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                      {selectedQuantity}
                    </span>
                    <button
                      onClick={() => setSelectedQuantity(Math.min(product.stock, selectedQuantity + 1))}
                      disabled={selectedQuantity >= product.stock}
                      className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Current cart quantity */}
                {currentCartQuantity > 0 && (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-sm text-emerald-700">
                      Currently in cart: {currentCartQuantity} items
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(currentCartQuantity - 1)}
                        className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleQuantityChange(currentCartQuantity + 1)}
                        className="p-1 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
              >
                {isAdding ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Adding to Cart...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add {selectedQuantity} to Cart - ${(product.price * selectedQuantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Active Ingredients</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {product.ingredients.map((ingredient, index) => (
                      <div 
                        key={index}
                        className="bg-gray-50 text-gray-700 px-4 py-3 rounded-lg text-center font-medium"
                      >
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">How to Use</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.usage}
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> Consult with a healthcare professional before use. 
                      Keep out of reach of children. Store in a cool, dry place.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Customer Reviews</h3>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                      Write a Review
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Sample reviews */}
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className="h-4 w-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                            <span className="font-medium text-gray-900">Verified Purchase</span>
                          </div>
                          <span className="text-sm text-gray-500">2 weeks ago</span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          "Excellent product! Really helped with my symptoms. Fast shipping and great packaging."
                        </p>
                        <p className="text-sm text-gray-500">- Anonymous Customer</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}