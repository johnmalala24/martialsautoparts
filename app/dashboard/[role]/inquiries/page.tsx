'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Search, MessageCircle, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: Date;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: '1',
      customerName: 'Robert Johnson',
      customerEmail: 'robert@email.com',
      customerPhone: '555-9876',
      productName: 'Premium Brake Pads Set',
      message: 'Interested in bulk pricing for 20 units',
      status: 'new',
      createdAt: new Date('2024-03-15'),
    },
    {
      id: '2',
      customerName: 'Emily Davis',
      customerEmail: 'emily@email.com',
      customerPhone: '555-9877',
      productName: 'Engine Oil Filter',
      message: 'Need OEM compatible filters for Honda Accord',
      status: 'contacted',
      createdAt: new Date('2024-03-14'),
    },
    {
      id: '3',
      customerName: 'Mike Wilson',
      customerEmail: 'mike@email.com',
      customerPhone: '555-9878',
      productName: 'Spark Plugs Set',
      message: 'Looking for installation service as well',
      status: 'quoted',
      createdAt: new Date('2024-03-13'),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted' | 'quoted' | 'closed'>('all');

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: Inquiry['status']) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  const stats = {
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    quoted: inquiries.filter(i => i.status === 'quoted').length,
    closed: inquiries.filter(i => i.status === 'closed').length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Customer Inquiries
        </h1>
        <p className="text-gray-500">Manage and respond to customer inquiries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card gradient className="border-l-4 border-l-blue-500">
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">New</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.new}</p>
          </div>
        </Card>
        <Card gradient className="border-l-4 border-l-amber-500">
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">Contacted</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.contacted}</p>
          </div>
        </Card>
        <Card gradient className="border-l-4 border-l-purple-500">
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">Quoted</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.quoted}</p>
          </div>
        </Card>
        <Card gradient className="border-l-4 border-l-green-500">
          <div className="p-4">
            <p className="text-sm font-medium text-gray-500">Closed</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.closed}</p>
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
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'new', 'contacted', 'quoted', 'closed'] as const).map((status) => (
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

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} gradient hover>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{inquiry.customerName}</h3>
                    <Badge variant={
                      inquiry.status === 'new' ? 'info' :
                      inquiry.status === 'contacted' ? 'warning' :
                      inquiry.status === 'quoted' ? 'info' : 'success'
                    } className="capitalize">
                      {inquiry.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Product:</span> {inquiry.productName}
                  </p>
                  <p className="text-gray-700 mb-4">{inquiry.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{inquiry.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{inquiry.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{inquiry.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = `tel:${inquiry.customerPhone}`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = `mailto:${inquiry.customerEmail}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant="outline"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <div className="flex-1"></div>
                {inquiry.status !== 'closed' && (
                  <>
                    {inquiry.status === 'new' && (
                      <Button
                        onClick={() => updateStatus(inquiry.id, 'contacted')}
                        className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                      >
                        Mark as Contacted
                      </Button>
                    )}
                    {inquiry.status === 'contacted' && (
                      <Button
                        onClick={() => updateStatus(inquiry.id, 'quoted')}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                      >
                        Mark as Quoted
                      </Button>
                    )}
                    {inquiry.status === 'quoted' && (
                      <Button
                        onClick={() => updateStatus(inquiry.id, 'closed')}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Closed
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
        
        {filteredInquiries.length === 0 && (
          <Card gradient>
            <div className="p-12 text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">No inquiries found</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

