'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getSales } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Search, Filter, Download, TrendingUp, DollarSign } from 'lucide-react';

export default function SalesPage() {
  const sales = getSales();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');
  
  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sale.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = sales.filter(s => s.status === 'completed').reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalSales = sales.length;
  const completedSales = sales.filter(s => s.status === 'completed').length;
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Sales Management
          </h1>
          <p className="text-gray-500">View and manage all sales transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card gradient className="border-l-4 border-l-green-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>+15.5%</span>
                </div>
              </div>
              <div className="p-4 bg-green-100 rounded-2xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-blue-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalSales}</p>
                <p className="text-sm text-gray-500 mt-2">{completedSales} completed</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-purple-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Sale</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalRevenue / completedSales || 0)}</p>
                <p className="text-sm text-gray-500 mt-2">Per transaction</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-2xl">
                <DollarSign className="w-8 h-8 text-purple-600" />
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
                placeholder="Search sales by product, customer, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'completed', 'pending', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all capitalize ${
                    filterStatus === status
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
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
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Seller</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all group">
                    <td className="py-4 px-4">
                      <span className="font-mono font-semibold text-gray-600">#{sale.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{sale.productName}</div>
                      <div className="text-sm text-gray-500">Qty: {sale.quantity}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{sale.customerName}</p>
                        <p className="text-sm text-gray-500">{sale.customerEmail}</p>
                        <p className="text-sm text-gray-500">{sale.customerPhone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{sale.sellerName}</td>
                    <td className="py-4 px-4 text-gray-600">{formatDate(sale.createdAt)}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-lg text-red-600">{formatCurrency(sale.totalAmount)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={sale.status === 'completed' ? 'success' : sale.status === 'pending' ? 'warning' : 'danger'} className="capitalize">
                        {sale.status}
                      </Badge>
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

