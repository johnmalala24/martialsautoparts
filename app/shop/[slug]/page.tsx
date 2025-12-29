'use client';

import { use, useState } from 'react';
import { Phone, MessageCircle, Check, ShoppingCart, Heart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import AliExpressCheckout from '@/components/checkout/AliExpressCheckout';
import { getProductById } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/formatters';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductById(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!product) {
    notFound();
  }
  
  const handleCall = () => {
    window.location.href = 'tel:+254798880398';
  };
  
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in ${product.name} (${formatCurrency(product.price)})`);
    window.open(`https://wa.me/254798880398?text=${message}`, '_blank');
  };
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 pt-28">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <a href="/" className="hover:text-red-600 transition-colors">Home</a>
              <span>/</span>
              <a href="/shop" className="hover:text-red-600 transition-colors">Shop</a>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Image Gallery */}
            <div className="sticky top-24">
              <div className="mb-4 aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-red-600 ring-2 ring-red-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="info">{product.category}</Badge>
                <Badge variant={product.stockStatus === 'in_stock' ? 'success' : 'warning'}>
                  {product.stockStatus === 'in_stock' ? 'In Stock' : 'Low Stock'}
                </Badge>
                {product.productType === 'oem' && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">OEM</Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {product.name}
              </h1>
              
              {/* Price Section */}
              <div className="mb-6 p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-gray-500 line-through text-xl">
                    {formatCurrency(product.price * 1.2)}
                  </span>
                  <Badge variant="danger" className="ml-auto">
                    Save 20%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Free shipping on orders over $100</p>
              </div>
              
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>
              
              {/* Quantity and Add to Cart */}
              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-semibold text-gray-700">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-red-600 hover:bg-red-50 transition-all flex items-center justify-center font-bold">
                      -
                    </button>
                    <input 
                      type="number" 
                      defaultValue={1}
                      min={1}
                      className="w-20 px-4 py-2 border-2 border-gray-200 rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                    <button className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-red-600 hover:bg-red-50 transition-all flex items-center justify-center font-bold">
                      +
                    </button>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex gap-4">
                  <Button size="lg" className="flex-1 group">
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="px-6">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Buy Now Button (AliExpress Integration) */}
                <AliExpressCheckout 
                  product={product}
                  onSuccess={(orderId) => {
                    console.log('Order placed successfully:', orderId);
                  }}
                  onError={(error) => {
                    console.error('Order failed:', error);
                  }}
                />
                
                {/* Contact Options */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <Button onClick={handleCall} className="flex-1" variant="outline">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </Button>
                  <Button variant="outline" onClick={handleWhatsApp} className="flex-1">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </Button>
                </div>
              </div>
              
              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Shipping</div>
                  <div className="font-semibold">Free on orders $100+</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Returns</div>
                  <div className="font-semibold">30-day guarantee</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Specifications and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Specifications */}
            <Card hover>
              <div className="p-6">
                <h3 className="font-bold text-2xl mb-6 text-gray-900">Specifications</h3>
                <dl className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                      <dt className="text-gray-600 font-medium">{key}</dt>
                      <dd className="font-semibold text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Card>
            
            {/* Compatibility */}
            <Card hover>
              <div className="p-6">
                <h3 className="font-bold text-2xl mb-6 text-gray-900">Vehicle Compatibility</h3>
                <ul className="space-y-3">
                  {product.compatibility.map((vehicle, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-1.5 bg-green-100 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-900">{vehicle}</span>
                    </li>
                  ))}
                </ul>
                
                {product.oemNumber && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-sm text-blue-600 font-medium mb-1">OEM Number</div>
                    <div className="text-lg font-bold text-blue-900">{product.oemNumber}</div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}