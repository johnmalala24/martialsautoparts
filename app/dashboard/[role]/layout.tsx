import { use } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole } from '@/types';

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ role: string }>;
}) {
  const { role } = use(params);
  const userRole = role as UserRole;
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      <Sidebar role={userRole} />
      <main className="flex-1 lg:ml-0 p-4 lg:p-8 max-w-[1600px] w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg min-h-[calc(100vh-4rem)] p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}