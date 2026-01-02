'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { getProducts } from '@/lib/mock-data';
import { Plus, Minus, ShoppingCart, CheckCircle } from 'lucide-react';

export default function CreateSalePage() {
  const products = getProducts();
  const [formData, setFormData] = useState({
    productId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    quantity: 1,
  });
  const [submitted, setSubmitted] = useState(false);
  
  const selectedProduct = products.find(p => p.id === formData.productId);
  const totalAmount = selectedProduct ? selectedProduct.price * formData.quantity : 0;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        productId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        quantity: 1,
      });
    }, 3000);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Create New Sale
        </h1>
        <p className="text-gray-500">Record a new sale transaction</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" gradient>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedProduct && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{selectedProduct.name}</p>
                      <p className="text-sm text-gray-600 mt-1">Stock: {selectedProduct.stockStatus === 'in_stock' ? 'Available' : 'Limited'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">KSh {selectedProduct.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Customer Name"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  required
                />
                
                <Input
                  label="Customer Email"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  required
                />
              </div>
              
              <Input
                label="Customer Phone"
                type="tel"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                required
              />
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-20 px-4 py-2 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  {selectedProduct && (
                    <div className="ml-auto text-lg font-semibold text-gray-700">
                      Total: <span className="text-red-600 text-2xl">KSh {totalAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Sale Created!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Create Sale
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setFormData({
                    productId: '',
                    customerName: '',
                    customerEmail: '',
                    customerPhone: '',
                    quantity: 1,
                  })}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </Card>
        
        {/* Summary Card */}
        <Card gradient className="sticky top-4 h-fit">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Sale Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-gray-900 font-bold">KSh {totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">Tax (10%)</span>
                <span className="text-gray-900 font-bold">KSh {(totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-red-600">KSh {(totalAmount * 1.1).toFixed(2)}</span>
                </div>
              </div>
              {formData.quantity > 0 && selectedProduct && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Quantity: {formData.quantity}</p>
                  <p className="text-sm text-gray-500 mt-1">Unit Price: KSh {selectedProduct.price.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
