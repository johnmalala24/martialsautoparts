'use client';

import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';
import { getProducts } from '@/lib/mock-data';

export default function Home() {
  const products = getProducts().slice(0, 6); // Featured products
  
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center justify-center text-white overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80"
              alt="Auto Parts"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(220,38,38,0.1)_100%)]"></div>
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Hero Content */}
          <div className="container-custom relative z-10 text-center animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-red-600/20 backdrop-blur-sm rounded-full border border-red-500/30">
              <span className="text-red-400 font-semibold text-sm">Premium Auto Parts</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Martial&apos;s Auto Parts
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-red-400 font-semibold drop-shadow-lg">
              For a ride in perfect flow
            </p>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200 leading-relaxed">
              Premium quality auto parts for all major vehicle brands. 
              OEM and aftermarket parts available with expert support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg"
                onClick={() => window.location.href = 'tel:+254798880398'}
                className="group"
              >
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Call to Buy
              </Button>
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => window.open('https://wa.me/254798880398', '_blank')}
                className="group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                WhatsApp to Buy
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 animate-fade-in-up">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Featured Products
                </h2>
                <p className="text-gray-600 text-lg">Top quality parts for your vehicle</p>
              </div>
              <Link href="/shop" className="mt-4 sm:mt-0">
                <Button variant="outline" className="group">
                  View All
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="animate-fade-in">
              <ProductGrid products={products} />
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Shop by Category
              </h2>
              <p className="text-gray-600 text-lg">Find exactly what you need</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
              {[
                { name: 'Engine Parts', image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400' },
                { name: 'Brake System', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400' },
                { name: 'Suspension', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400' },
                { name: 'Electrical', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400' }
              ].map((category, index) => (
                <Link 
                  key={category.name}
                  href={`/shop?category=${category.name}`}
                  className="group relative h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {category.name}
                    </h3>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-white text-sm font-medium">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}