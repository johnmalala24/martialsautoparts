import { ReactNode } from 'react';
import Card from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBg?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend,
  iconColor = 'text-red-600',
  iconBg = 'bg-gradient-to-br from-red-100 to-red-50'
}: StatCardProps) {
  return (
    <Card hover gradient className="relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
            <p className="mt-3 text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {value}
            </p>
            {trend && (
              <div className={`mt-3 flex items-center gap-1 text-sm font-semibold ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{trend.value}</span>
                <span className="text-gray-500 text-xs ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className={`p-4 ${iconBg} rounded-2xl shadow-lg ${iconColor} transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}