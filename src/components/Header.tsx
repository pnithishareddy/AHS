import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
}

export function Header({ onSearchChange, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-emerald-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">Anjali Homeo Stores</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
              Products
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-emerald-600 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button 
              onClick={onCartClick}
              className="text-gray-700 hover:text-emerald-600 transition-colors relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-emerald-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Search products..."
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Products</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Categories</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50">About</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}