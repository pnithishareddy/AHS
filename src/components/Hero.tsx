import React from 'react';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Natural Healing with
                <span className="text-emerald-600 block">Homeopathy</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover the power of natural medicine with our carefully curated selection of homeopathic remedies. Safe, effective, and trusted by practitioners worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center group">
                Shop Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">FDA Registered</p>
                <p className="text-xs text-gray-600">Quality Assured</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">Orders over $50</p>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Expert Care</p>
                <p className="text-xs text-gray-600">Licensed Practitioners</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Homeopathic medicines and natural remedies"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 max-w-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">100% Natural</p>
                  <p className="text-sm text-gray-600">No side effects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}