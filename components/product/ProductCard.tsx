import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/formatters';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'tel:+254798880398';
  };
  
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(`Hi, I'm interested in ${product.name}`);
    window.open(`https://wa.me/254798880398?text=${message}`, '_blank');
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', product.id);
  };
  
  if (viewMode === 'list') {
    return (
      <Card hover className="group">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <Link href={`/shop/${product.id}`} className="block flex-shrink-0">
            <div className="w-full md:w-48 h-48 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 z-10">
                <Badge variant={product.stockStatus === 'in_stock' ? 'success' : 'warning'}>
                  {product.stockStatus === 'in_stock' ? 'In Stock' : 'Low Stock'}
                </Badge>
              </div>
            </div>
          </Link>
          
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge variant="info" className="text-xs">{product.category}</Badge>
                {product.productType === 'oem' && (
                  <Badge className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white">OEM</Badge>
                )}
              </div>
              
              <Link href={`/shop/${product.id}`}>
                <h3 className="font-bold text-xl mb-2 hover:text-red-600 transition-colors group-hover:text-red-600">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.shortDescription}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  {formatCurrency(product.price)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-lg transition-all ${
                    isWishlisted
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <Button size="sm" onClick={handleAddToCart} className="group/btn">
                  <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  Add to Cart
                </Button>
                <Link href={`/shop/${product.id}`}>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card hover className="group relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm transition-all ${
          isWishlisted
            ? 'bg-red-600 text-white shadow-lg'
            : 'bg-white/90 text-gray-600 hover:bg-red-600 hover:text-white'
        }`}
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>
      
      <Link href={`/shop/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.stockStatus === 'in_stock' ? 'success' : 'warning'}>
              {product.stockStatus === 'in_stock' ? 'In Stock' : 'Low Stock'}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center text-white text-sm font-medium">
              <span>Quick View</span>
              <Eye className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="info" className="text-xs">{product.category}</Badge>
          {product.productType === 'oem' && (
            <Badge className="ml-0 text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white">OEM</Badge>
          )}
        </div>
        
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-red-600 transition-colors line-clamp-2 group-hover:text-red-600 min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <button 
            onClick={handleCall}
            className="p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button 
            onClick={handleWhatsApp}
            className="p-2.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-300"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}