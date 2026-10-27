import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-emerald-400 mr-2" />
              <span className="text-xl font-bold">HomeoHeal</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted source for natural homeopathic remedies. Healing naturally, living healthy.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Consultation</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-400 mr-3" />
                <span className="text-gray-300">info@homeoheal.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  123 Wellness Street<br />
                  Natural City, NC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 HomeoHeal. All rights reserved. | Made with ❤️ for natural healing
          </p>
        </div>
      </div>
    </footer>
  );
}