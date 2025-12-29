'use client';

import { useState } from 'react';
import { ShoppingCart, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/formatters';

interface AliExpressCheckoutProps {
  product: Product;
  onSuccess?: (orderId: string) => void;
  onError?: (error: string) => void;
}

export default function AliExpressCheckout({ product, onSuccess, onError }: AliExpressCheckoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [orderMessage, setOrderMessage] = useState('');

  // Check if product has AliExpress integration enabled
  if (!product.aliExpressProductId) {
    return (
      <Button size="lg" className="flex-1" disabled>
        <ShoppingCart className="w-5 h-5 mr-2" />
        Product not available for online purchase
      </Button>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderStatus('idle');

    try {
      const response = await fetch('/api/orders/aliexpress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            productId: product.aliExpressProductId,
            skuId: product.aliExpressSkuId,
            productUrl: product.aliExpressUrl,
          },
          quantity,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            phone: formData.phone,
            email: formData.email,
          },
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          notes: `Order for ${product.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setOrderStatus('success');
        setOrderMessage(`Order placed successfully! Order ID: ${result.orderId}`);
        if (onSuccess) {
          onSuccess(result.orderId);
        }
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setOrderStatus('idle');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US',
          });
          setQuantity(1);
        }, 3000);
      } else {
        setOrderStatus('error');
        setOrderMessage(result.error || 'Failed to place order');
        if (onError) {
          onError(result.error || 'Failed to place order');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setOrderStatus('error');
      setOrderMessage(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <>
      <Button
        size="lg"
        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Buy Now - {formatCurrency(product.price)}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Checkout - {product.name}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {orderStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <p className="text-green-800 font-medium">{orderMessage}</p>
                </div>
              )}

              {orderStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <p className="text-red-800 font-medium">{orderMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{product.name}</span>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="ml-2 w-20 px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(totalPrice)}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h3 className="font-semibold mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                    <div className="col-span-2">
                      <Input
                        label="Address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      label="City"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                    <Input
                      label="State/Province"
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                    <Input
                      label="Zip/Postal Code"
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      required
                    />
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Place Order - {formatCurrency(totalPrice)}
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Your order will be automatically placed on AliExpress/Alibaba and shipped directly to you.
                </p>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

