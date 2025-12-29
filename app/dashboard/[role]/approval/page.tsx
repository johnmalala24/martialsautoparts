'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { UserCheck, CheckCircle, XCircle, Clock } from 'lucide-react';

interface PendingApproval {
  id: string;
  type: 'product' | 'sale' | 'user';
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export default function ApprovalPage() {
  const [approvals, setApprovals] = useState<PendingApproval[]>([
    {
      id: '1',
      type: 'product',
      title: 'New Product: Premium Headlights',
      description: 'Request to add new premium LED headlights to catalog',
      submittedBy: 'John Seller',
      submittedAt: new Date('2024-03-15'),
      status: 'pending',
    },
    {
      id: '2',
      type: 'sale',
      title: 'Large Order Approval',
      description: 'Bulk order of 50 brake pad sets requires manager approval',
      submittedBy: 'Lisa Seller',
      submittedAt: new Date('2024-03-14'),
      status: 'pending',
    },
    {
      id: '3',
      type: 'user',
      title: 'New Seller Account',
      description: 'Request to create new seller account for Mike Johnson',
      submittedBy: 'Admin',
      submittedAt: new Date('2024-03-13'),
      status: 'pending',
    },
  ]);

  const handleApproval = (id: string, approve: boolean) => {
    setApprovals(approvals.map(a => 
      a.id === id ? { ...a, status: approve ? 'approved' : 'rejected' } : a
    ));
  };

  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const completedApprovals = approvals.filter(a => a.status !== 'pending');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Approvals
        </h1>
        <p className="text-gray-500">Review and approve pending requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card gradient className="border-l-4 border-l-amber-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingApprovals.length}</p>
              </div>
              <div className="p-4 bg-amber-100 rounded-2xl">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-green-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {completedApprovals.filter(a => a.status === 'approved').length}
                </p>
              </div>
              <div className="p-4 bg-green-100 rounded-2xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card gradient className="border-l-4 border-l-red-500">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {completedApprovals.filter(a => a.status === 'rejected').length}
                </p>
              </div>
              <div className="p-4 bg-red-100 rounded-2xl">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="mb-6" gradient>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
            <Badge variant="warning">{pendingApprovals.length}</Badge>
          </div>
          
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="p-6 rounded-xl bg-gradient-to-r from-amber-50 to-transparent border-2 border-amber-200 hover:border-amber-300 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="info" className="capitalize">{approval.type}</Badge>
                      <h3 className="text-lg font-semibold text-gray-900">{approval.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{approval.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Submitted by: <span className="font-medium text-gray-700">{approval.submittedBy}</span></span>
                      <span>•</span>
                      <span>{approval.submittedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleApproval(approval.id, true)}
                      className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleApproval(approval.id, false)}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {pendingApprovals.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">No pending approvals</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      {completedApprovals.length > 0 && (
        <Card gradient>
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {completedApprovals.slice(0, 5).map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    {approval.status === 'approved' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{approval.title}</p>
                      <p className="text-sm text-gray-500">{approval.submittedBy} • {approval.submittedAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge variant={approval.status === 'approved' ? 'success' : 'danger'} className="capitalize">
                    {approval.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

