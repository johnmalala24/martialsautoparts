'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getInventory } from '@/lib/mock-data';
import { formatDate } from '@/lib/formatters';
import { AlertCircle, Package, TrendingDown, Bell } from 'lucide-react';

export default function AlertsPage() {
  const inventory = getInventory();
  const lowStockItems = inventory.filter(item => item.stockStatus === 'low_stock' || item.quantity < 20);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Low Stock Alerts
          </h1>
          <p className="text-gray-500">Items that need immediate attention</p>
        </div>
        <Badge variant="warning" className="text-lg px-4 py-2">
          <Bell className="w-5 h-5 mr-2" />
          {lowStockItems.length} Items Need Restocking
        </Badge>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card gradient className="border-l-4 border-l-amber-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{lowStockItems.length}</p>
              </div>
              <div className="p-4 bg-amber-100 rounded-2xl">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-red-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Critical Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {lowStockItems.filter(i => i.quantity < 10).length}
                </p>
              </div>
              <div className="p-4 bg-red-100 rounded-2xl">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-blue-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Action Required</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{lowStockItems.length}</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-2xl">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts List */}
      <Card gradient>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Current Stock</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Last Restocked</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Priority</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lowStockItems.map((item) => {
                  const isCritical = item.quantity < 10;
                  return (
                    <tr key={item.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all group">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">{item.productName}</div>
                        <div className="text-sm text-gray-500">ID: #{item.productId}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className={`font-bold text-lg ${isCritical ? 'text-red-600' : 'text-amber-600'}`}>
                            {item.quantity}
                          </span>
                          <div className="flex-1 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                isCritical 
                                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                                  : 'bg-gradient-to-r from-amber-500 to-amber-600'
                              }`}
                              style={{ width: `${Math.min((item.quantity / 20) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={isCritical ? 'danger' : 'warning'}>
                          {isCritical ? 'Critical' : 'Low Stock'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{formatDate(item.lastRestocked)}</td>
                      <td className="py-4 px-4">
                        <Badge variant={isCritical ? 'danger' : 'warning'}>
                          {isCritical ? 'High Priority' : 'Medium Priority'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button 
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                          size="sm"
                        >
                          Restock Now
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}

