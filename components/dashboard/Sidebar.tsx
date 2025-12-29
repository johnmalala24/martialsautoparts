'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart,
  Settings,
  FileText,
  AlertCircle,
  UserCheck,
  Home,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { UserRole } from '@/types';
import { useState } from 'react';
import Logo from '@/components/layout/Logo';

interface SidebarProps {
  role: UserRole;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const adminLinks = [
    { href: `/dashboard/${role}`, label: 'Overview', icon: LayoutDashboard },
    { href: `/dashboard/${role}/users`, label: 'Users', icon: Users },
    { href: `/dashboard/${role}/products`, label: 'Products', icon: Package },
    { href: `/dashboard/${role}/sales`, label: 'Sales', icon: ShoppingCart },
    { href: `/dashboard/${role}/inventory`, label: 'Inventory', icon: FileText },
    { href: `/dashboard/${role}/settings`, label: 'Settings', icon: Settings },
  ];
  
  const ownerLinks = [
    { href: `/dashboard/${role}`, label: 'Overview', icon: LayoutDashboard },
    { href: `/dashboard/${role}/analytics`, label: 'Analytics', icon: BarChart },
    { href: `/dashboard/${role}/products`, label: 'Products', icon: Package },
    { href: `/dashboard/${role}/sellers`, label: 'Sellers', icon: Users },
  ];
  
  const managerLinks = [
    { href: `/dashboard/${role}`, label: 'Overview', icon: LayoutDashboard },
    { href: `/dashboard/${role}/inventory`, label: 'Inventory', icon: FileText },
    { href: `/dashboard/${role}/alerts`, label: 'Low Stock', icon: AlertCircle },
    { href: `/dashboard/${role}/approval`, label: 'Approvals', icon: UserCheck },
  ];
  
  const sellerLinks = [
    { href: `/dashboard/${role}`, label: 'Overview', icon: LayoutDashboard },
    { href: `/dashboard/${role}/create-sale`, label: 'Create Sale', icon: ShoppingCart },
    { href: `/dashboard/${role}/my-sales`, label: 'My Sales', icon: FileText },
    { href: `/dashboard/${role}/inquiries`, label: 'Inquiries', icon: Users },
  ];
  
  const links = 
    role === 'admin' ? adminLinks :
    role === 'owner' ? ownerLinks :
    role === 'manager' ? managerLinks :
    sellerLinks;
  
  const sidebarContent = (
    <>
      <div className="mb-8 pb-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <Logo width={100} height={50} className="h-10 w-auto object-contain" showFallback={false} linkHref="/" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400 capitalize">{role} Dashboard</span>
        </div>
      </div>
      
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20' 
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-400'}`} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-6 border-t border-gray-800 space-y-1">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Site</span>
        </Link>
        <button 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  );
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gradient-to-b from-gray-900 to-gray-950 text-white
        min-h-screen p-6 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-2xl lg:shadow-none
      `}>
        {sidebarContent}
      </aside>
    </>
  );
}