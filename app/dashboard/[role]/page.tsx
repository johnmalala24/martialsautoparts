'use client';

import { use } from 'react';
import Link from 'next/link';
import { Package, Users, ShoppingCart, DollarSign, BarChart, TrendingUp, AlertCircle, UserCheck, ArrowUpRight, Activity, Eye } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import { getDashboardStats, getSales, getUsers } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { UserRole } from '@/types';

export default function DashboardOverview({ params }: { params: Promise<{ role: string }> }) {
  const { role } = use(params);
  const userRole = role as UserRole;
  const stats = getDashboardStats();
  const recentSales = getSales().slice(0, 5);
  const users = getUsers();
  
  const salesData = [45, 52, 48, 61, 55, 67, 73];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const maxSales = Math.max(...salesData);
  
  const renderAdminDashboard = () => (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Sales"
          value={stats.totalSales}
          icon={<ShoppingCart className="w-7 h-7" />}
          trend={{ value: '+12.5%', isPositive: true }}
          iconBg="bg-gradient-to-br from-blue-100 to-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="w-7 h-7" />}
          trend={{ value: '+5.2%', isPositive: true }}
          iconBg="bg-gradient-to-br from-green-100 to-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package className="w-7 h-7" />}
          iconBg="bg-gradient-to-br from-purple-100 to-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<DollarSign className="w-7 h-7" />}
          trend={{ value: '+18.3%', isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-2" gradient>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Sales Overview</h3>
                <p className="text-sm text-gray-500 mt-1">Last 7 months performance</p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">+24%</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-3">
              {salesData.map((value, index) => {
                const height = (value / maxSales) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="w-full relative">
                      <div 
                        className="w-full bg-gradient-to-t from-red-600 to-red-500 rounded-t-xl transition-all duration-500 hover:from-red-700 hover:to-red-600 group-hover:shadow-lg group-hover:shadow-red-500/50"
                        style={{ height: `${height}%`, minHeight: '8px' }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ${(value * 1000).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mt-3">{months[index]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card gradient>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                { action: 'New sale', user: 'John Doe', time: '2m ago', type: 'sale' },
                { action: 'User registered', user: 'Jane Smith', time: '15m ago', type: 'user' },
                { action: 'Product updated', user: 'Admin', time: '1h ago', type: 'product' },
                { action: 'Sale completed', user: 'Mike Johnson', time: '2h ago', type: 'sale' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'sale' ? 'bg-green-100 text-green-600' :
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'sale' ? <ShoppingCart className="w-4 h-4" /> :
                     activity.type === 'user' ? <Users className="w-4 h-4" /> :
                     <Package className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <Card gradient hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Sales</h3>
              <Link href={`/dashboard/${userRole}/sales`} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                View all
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentSales.map((sale, index) => (
                <div key={sale.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-red-50 hover:to-transparent transition-all group border border-transparent hover:border-red-100">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{sale.productName}</p>
                      <p className="text-sm text-gray-500">{sale.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg text-red-600">{formatCurrency(sale.totalAmount)}</p>
                    <p className="text-xs text-gray-400">{formatDate(sale.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        {/* User Overview */}
        <Card gradient hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">User Overview</h3>
              <Link href={`/dashboard/${userRole}/users`} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                View all
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-blue-50 hover:to-transparent transition-all group border border-transparent hover:border-blue-100">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                    user.status === 'active' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
  
  const renderOwnerDashboard = () => (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Owner Dashboard
        </h1>
        <p className="text-gray-500">Business insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<DollarSign className="w-7 h-7" />}
          trend={{ value: '+18.5%', isPositive: true }}
        />
        <StatCard
          title="Total Sales"
          value={stats.totalSales}
          icon={<ShoppingCart className="w-7 h-7" />}
          trend={{ value: '+12.3%', isPositive: true }}
          iconBg="bg-gradient-to-br from-blue-100 to-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Products"
          value={stats.totalProducts}
          icon={<Package className="w-7 h-7" />}
          iconBg="bg-gradient-to-br from-purple-100 to-purple-50"
          iconColor="text-purple-600"
        />
      </div>
      
      <Card className="mb-6" gradient>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart className="w-6 h-6 text-red-600" />
                Sales Performance
              </h3>
              <p className="text-sm text-gray-500 mt-1">Monthly revenue trends</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">+24%</span>
            </div>
          </div>
          <div className="h-72 flex items-end justify-between gap-4">
            {salesData.map((value, index) => {
              const height = (value / maxSales) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="w-full relative">
                    <div 
                      className="w-full bg-gradient-to-t from-red-600 via-red-500 to-red-400 rounded-t-xl transition-all duration-500 hover:from-red-700 hover:via-red-600 hover:to-red-500 group-hover:shadow-xl group-hover:shadow-red-500/50"
                      style={{ height: `${height}%`, minHeight: '12px' }}
                    >
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                        ${(value * 1000).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mt-4">{months[index]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      
      <Card gradient hover>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top Performers</h3>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {users.filter(u => u.role === 'seller').slice(0, 5).map((seller, index) => {
              const sales = Math.floor(Math.random() * 50 + 20);
              const revenue = Math.random() * 50000 + 10000;
              const growth = Math.floor(Math.random() * 20 + 5);
              return (
                <div key={seller.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-amber-50 hover:to-transparent transition-all border border-transparent hover:border-amber-100 group">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{seller.name}</p>
                      <p className="text-sm text-gray-500">{sales} sales this month</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg text-red-600">{formatCurrency(revenue)}</p>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{growth}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </>
  );
  
  const renderManagerDashboard = () => (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Manager Dashboard
        </h1>
        <p className="text-gray-500">Inventory management and operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Inventory"
          value={stats.totalProducts}
          icon={<Package className="w-7 h-7" />}
          iconBg="bg-gradient-to-br from-blue-100 to-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Low Stock Items"
          value="12"
          icon={<AlertCircle className="w-7 h-7" />}
          iconBg="bg-gradient-to-br from-amber-100 to-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Pending Approvals"
          value="5"
          icon={<UserCheck className="w-7 h-7" />}
          iconBg="bg-gradient-to-br from-purple-100 to-purple-50"
          iconColor="text-purple-600"
        />
      </div>
      
      <Card gradient>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Inventory Status</h3>
            <Package className="w-5 h-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {['Premium Brake Pads', 'Oil Filter', 'Spark Plugs', 'Air Filter'].map((product, index) => {
                  const stock = Math.floor(Math.random() * 100);
                  const isLowStock = stock < 20;
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-gray-900">{product}</td>
                      <td className="py-4 px-4 text-gray-600">Engine</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{stock}</span>
                          <div className="flex-1 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                isLowStock ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-gradient-to-r from-green-500 to-green-600'
                              }`}
                              style={{ width: `${Math.min(stock, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                          isLowStock 
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' 
                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                        }`}>
                          {isLowStock ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </>
  );
  
  const renderSellerDashboard = () => (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Seller Dashboard
        </h1>
        <p className="text-gray-500">Track your sales and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="My Sales"
          value="45"
          icon={<ShoppingCart className="w-7 h-7" />}
          trend={{ value: '+8.2%', isPositive: true }}
          iconBg="bg-gradient-to-br from-green-100 to-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(25000)}
          icon={<DollarSign className="w-7 h-7" />}
          trend={{ value: '+15.5%', isPositive: true }}
        />
        <StatCard
          title="Pending Inquiries"
          value="3"
          icon={<Users className="w-7 h-7" />}
          iconBg="bg-gradient-to-br from-blue-100 to-blue-50"
          iconColor="text-blue-600"
        />
      </div>
      
      <Card gradient hover>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Sales</h3>
            <Link href={`/dashboard/${userRole}/my-sales`} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentSales.map((sale, index) => (
              <div key={sale.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-green-50 hover:to-transparent transition-all border border-transparent hover:border-green-100 group">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{sale.productName}</p>
                    <p className="text-sm text-gray-500">{sale.customerName} • {formatDate(sale.createdAt)}</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-lg text-red-600">{formatCurrency(sale.totalAmount)}</p>
                  <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
  
  return (
    <div>
      {userRole === 'admin' && renderAdminDashboard()}
      {userRole === 'owner' && renderOwnerDashboard()}
      {userRole === 'manager' && renderManagerDashboard()}
      {userRole === 'seller' && renderSellerDashboard()}
    </div>
  );
}
