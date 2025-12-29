'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getInventory } from '@/lib/mock-data';
import { formatDate } from '@/lib/formatters';
import { Package, Search, Filter, Plus, Edit, Eye, TrendingDown, TrendingUp } from 'lucide-react';

export default function InventoryPage() {
  const inventory = getInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.stockStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: inventory.length,
    inStock: inventory.filter(i => i.stockStatus === 'in_stock').length,
    lowStock: inventory.filter(i => i.stockStatus === 'low_stock').length,
    outOfStock: inventory.filter(i => i.stockStatus === 'out_of_stock').length,
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Inventory Management
          </h1>
          <p className="text-gray-500">Manage your product inventory and stock levels</p>
        </div>
        <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card gradient className="border-l-4 border-l-blue-500">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-green-500">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Stock</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.inStock}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-amber-500">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.lowStock}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <TrendingDown className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-red-500">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.outOfStock}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <Package className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6" gradient>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'in_stock', 'low_stock', 'out_of_stock'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
      
      <Card gradient>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Product ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Last Restocked</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all group">
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-gray-600">#{item.productId}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{item.productName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg text-gray-900">{item.quantity}</span>
                        <div className="flex-1 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              item.stockStatus === 'in_stock' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                              item.stockStatus === 'low_stock' ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                              'bg-gradient-to-r from-red-500 to-red-600'
                            }`}
                            style={{ width: `${Math.min((item.quantity / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={
                        item.stockStatus === 'in_stock' ? 'success' : 
                        item.stockStatus === 'low_stock' ? 'warning' : 'danger'
                      }>
                        {item.stockStatus === 'in_stock' ? 'In Stock' : 
                         item.stockStatus === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{formatDate(item.lastRestocked)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group-hover:shadow-md">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors group-hover:shadow-md">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all shadow-sm hover:shadow-md">
                          Restock
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
