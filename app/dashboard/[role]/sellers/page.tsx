'use client';

import { useState } from 'react';
import { Search, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getUsers } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/formatters';

export default function SellersPage() {
  const users = getUsers();
  const sellers = users.filter(u => u.role === 'seller');
  const [searchTerm, setSearchTerm] = useState('');

  const sellersWithStats = sellers.map(seller => ({
    ...seller,
    sales: Math.floor(Math.random() * 100 + 20),
    revenue: Math.random() * 50000 + 10000,
    growth: Math.floor(Math.random() * 20 + 5),
  }));

  const filteredSellers = sellersWithStats.filter(seller =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSellers = [...filteredSellers].sort((a, b) => b.revenue - a.revenue);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Sellers Performance
        </h1>
        <p className="text-gray-500">Track and manage seller performance</p>
      </div>

      {/* Search */}
      <Card className="mb-6" gradient>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card gradient className="border-l-4 border-l-blue-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sellers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{sellers.length}</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-2xl">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-green-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatCurrency(sellersWithStats.reduce((sum, s) => sum + s.revenue, 0))}
                </p>
              </div>
              <div className="p-4 bg-green-100 rounded-2xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-purple-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {sellersWithStats.reduce((sum, s) => sum + s.sales, 0)}
                </p>
              </div>
              <div className="p-4 bg-purple-100 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sellers List */}
      <Card gradient>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Seller Rankings</h3>
          <div className="space-y-4">
            {sortedSellers.map((seller, index) => (
              <div key={seller.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-amber-50 hover:to-transparent transition-all border border-transparent hover:border-amber-100 group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    #{index + 1}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                    {seller.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{seller.name}</p>
                    <p className="text-sm text-gray-500">{seller.email}</p>
                    <p className="text-sm text-gray-500">{seller.sales} sales this month</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-red-600">{formatCurrency(seller.revenue)}</p>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{seller.growth}%</span>
                  </div>
                  <Badge variant="success" className="mt-1">Active</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

