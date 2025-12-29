'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 pt-28">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Learn more about our commitment to quality and excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="animate-fade-in-up">
              <Card hover>
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-white text-2xl font-bold">20+</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Story</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Martial&apos;s Auto Parts has been serving the automotive community for over 20 years. 
                    We specialize in providing high-quality OEM and aftermarket parts for all major vehicle brands.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our commitment to quality and customer satisfaction has made us a trusted name in the industry.
                  </p>
                </div>
              </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <Card hover>
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Us</h2>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-xl mt-0.5">•</span>
                      <span className="flex-1">Wide selection of OEM and aftermarket parts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-xl mt-0.5">•</span>
                      <span className="flex-1">Competitive pricing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-xl mt-0.5">•</span>
                      <span className="flex-1">Expert customer support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-xl mt-0.5">•</span>
                      <span className="flex-1">Fast and reliable service</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-xl mt-0.5">•</span>
                      <span className="flex-1">Quality guaranteed</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="text-center animate-fade-in">
            <div className="inline-block p-8 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl shadow-2xl text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">For a ride in perfect flow</h2>
              <p className="text-xl text-red-100">Your trusted partner for automotive excellence</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}