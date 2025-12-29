'use client';

import Card from '@/components/ui/Card';
import { BarChart, TrendingUp, DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

export default function AnalyticsPage() {
  const salesData = [45, 52, 48, 61, 55, 67, 73, 68, 75, 82, 78, 90];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxSales = Math.max(...salesData);

  const revenueData = salesData.map(v => v * 1500);
  const maxRevenue = Math.max(...revenueData);

  const topProducts = [
    { name: 'Premium Brake Pads Set', sales: 245, revenue: 22005 },
    { name: 'Engine Oil Filter', sales: 189, revenue: 2452 },
    { name: 'Spark Plugs Set', sales: 156, revenue: 7174 },
    { name: 'Air Filter', sales: 134, revenue: 3349 },
    { name: 'Shock Absorbers Pair', sales: 98, revenue: 15679 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Analytics & Insights
        </h1>
        <p className="text-gray-500">Deep dive into your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card gradient className="border-l-4 border-l-blue-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">$125,000</p>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18.5%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card gradient className="border-l-4 border-l-green-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">1,250</p>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.3%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card gradient className="border-l-4 border-l-purple-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Products</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">356</p>
                <p className="text-sm text-gray-500 mt-2">Active</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </Card>

        <Card gradient className="border-l-4 border-l-amber-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">48</p>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5.2%</span>
                </div>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <Card gradient>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Monthly Sales</h3>
                <p className="text-sm text-gray-500 mt-1">Last 12 months</p>
              </div>
              <BarChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {salesData.map((value, index) => {
                const height = (value / maxSales) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="w-full relative">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-600 group-hover:shadow-lg"
                        style={{ height: `${height}%`, minHeight: '8px' }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {value} sales
                        </div>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-600 mt-2">{months[index]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Revenue Chart */}
        <Card gradient>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Monthly Revenue</h3>
                <p className="text-sm text-gray-500 mt-1">Last 12 months</p>
              </div>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {revenueData.map((value, index) => {
                const height = (value / maxRevenue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="w-full relative">
                      <div 
                        className="w-full bg-gradient-to-t from-green-600 to-green-500 rounded-t-lg transition-all duration-500 hover:from-green-700 hover:to-green-600 group-hover:shadow-lg"
                        style={{ height: `${height}%`, minHeight: '8px' }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ${value.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-gray-600 mt-2">{months[index]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Top Products */}
      <Card gradient>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-amber-50 hover:to-transparent transition-all border border-transparent hover:border-amber-100 group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-red-600">${product.revenue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{Math.floor(Math.random() * 20 + 5)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

