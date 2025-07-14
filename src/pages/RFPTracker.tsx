import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  FileText,
  Calendar,
  TrendingUp,
  MessageSquare,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AgenticInterface from '../components/AgenticInterface';

interface RFPItem {
  id: string;
  title: string;
  categories: string[];
  status: 'draft' | 'sent' | 'responses_received' | 'evaluation' | 'awarded' | 'closed';
  createdDate: string;
  deadline: string;
  suppliersInvited: number;
  responsesReceived: number;
  budget: string;
  priority: 'low' | 'medium' | 'high';
  lastActivity: string;
  progress: number;
}

export default function RFPTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');
  const navigate = useNavigate();

  // Mock RFP data - in real app, this would come from API
  const rfps: RFPItem[] = [
    {
      id: 'RFP-2024-001',
      title: 'Q2 2024 Primary Packaging Materials',
      categories: ['Primary Packaging'],
      status: 'responses_received',
      createdDate: '2024-01-15',
      deadline: '2024-02-28',
      suppliersInvited: 8,
      responsesReceived: 6,
      budget: '$500K - $1M',
      priority: 'high',
      lastActivity: '2 hours ago',
      progress: 75
    },
    {
      id: 'RFP-2024-002',
      title: 'API Manufacturing Partnership',
      categories: ['APIs', 'Raw Materials'],
      status: 'evaluation',
      createdDate: '2024-01-10',
      deadline: '2024-03-15',
      suppliersInvited: 5,
      responsesReceived: 5,
      budget: '$1M - $5M',
      priority: 'high',
      lastActivity: '1 day ago',
      progress: 90
    },
    {
      id: 'RFP-2024-003',
      title: 'Secondary Packaging Solutions',
      categories: ['Secondary Packaging'],
      status: 'sent',
      createdDate: '2024-01-20',
      deadline: '2024-03-01',
      suppliersInvited: 12,
      responsesReceived: 3,
      budget: '$100K - $500K',
      priority: 'medium',
      lastActivity: '3 hours ago',
      progress: 25
    },
    {
      id: 'RFP-2024-004',
      title: 'Quality Testing Services',
      categories: ['Testing Services'],
      status: 'awarded',
      createdDate: '2024-01-05',
      deadline: '2024-02-15',
      suppliersInvited: 6,
      responsesReceived: 4,
      budget: '$100K - $500K',
      priority: 'medium',
      lastActivity: '1 week ago',
      progress: 100
    },
    {
      id: 'RFP-2024-005',
      title: 'Equipment Maintenance Contract',
      categories: ['Equipment'],
      status: 'draft',
      createdDate: '2024-01-25',
      deadline: '2024-04-01',
      suppliersInvited: 0,
      responsesReceived: 0,
      budget: '$500K - $1M',
      priority: 'low',
      lastActivity: '5 days ago',
      progress: 30
    },
    {
      id: 'RFP-2024-006',
      title: 'Cold Chain Logistics Partnership',
      categories: ['Logistics'],
      status: 'closed',
      createdDate: '2023-12-15',
      deadline: '2024-01-31',
      suppliersInvited: 4,
      responsesReceived: 4,
      budget: '$1M - $5M',
      priority: 'high',
      lastActivity: '2 weeks ago',
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'sent': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'responses_received': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'evaluation': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'awarded': return 'text-green-600 bg-green-50 border-green-200';
      case 'closed': return 'text-gray-600 bg-gray-100 border-gray-300';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'responses_received': return <MessageSquare className="h-4 w-4" />;
      case 'evaluation': return <TrendingUp className="h-4 w-4" />;
      case 'awarded': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredRFPs = rfps.filter(rfp => {
    const matchesSearch = rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfp.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || rfp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">RFP Tracker</h1>
            <p className="text-gray-600">Monitor and manage all RFP processes from creation to award</p>
          </div>
          <button 
            onClick={() => navigate('/rfp-wizard')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New RFP
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{rfps.length}</span>
          </div>
          <h3 className="font-medium text-gray-900">Total RFPs</h3>
          <p className="text-sm text-gray-600">All time</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-600">
              {rfps.filter(r => r.status === 'sent' || r.status === 'responses_received').length}
            </span>
          </div>
          <h3 className="font-medium text-gray-900">Active RFPs</h3>
          <p className="text-sm text-gray-600">Awaiting responses</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {rfps.filter(r => r.status === 'evaluation').length}
            </span>
          </div>
          <h3 className="font-medium text-gray-900">In Evaluation</h3>
          <p className="text-sm text-gray-600">Reviewing responses</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">
              {rfps.filter(r => r.status === 'awarded').length}
            </span>
          </div>
          <h3 className="font-medium text-gray-900">Awarded</h3>
          <p className="text-sm text-gray-600">This quarter</p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        {/* Top Row - Status Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Status:</span>
            {['all', 'draft', 'sent', 'responses_received', 'evaluation', 'awarded', 'closed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : formatStatus(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row - Search and View Controls */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search RFPs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Cards
                </button>
              </div>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RFP List */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRFPs.map((rfp) => {
            const daysUntilDeadline = getDaysUntilDeadline(rfp.deadline);
            return (
              <div key={rfp.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{rfp.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{rfp.id}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {rfp.categories.map((category, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rfp.priority)}`}>
                      {rfp.priority.toUpperCase()}
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(rfp.status)}`}>
                    {getStatusIcon(rfp.status)}
                    <span className="ml-2">{formatStatus(rfp.status)}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{rfp.progress}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(rfp.progress)}`}
                        style={{ width: `${rfp.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{rfp.responsesReceived}/{rfp.suppliersInvited}</div>
                    <p className="text-xs text-gray-600">Responses</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${
                      daysUntilDeadline < 0 ? 'text-red-600' :
                      daysUntilDeadline < 7 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {daysUntilDeadline < 0 ? 'Overdue' : `${daysUntilDeadline}d`}
                    </div>
                    <p className="text-xs text-gray-600">Until deadline</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Last activity: {rfp.lastActivity}
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RFP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRFPs.map((rfp) => {
                  const daysUntilDeadline = getDaysUntilDeadline(rfp.deadline);
                  return (
                    <tr key={rfp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{rfp.title}</div>
                          <div className="text-sm text-gray-500">{rfp.id}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {rfp.categories.slice(0, 2).map((category, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rfp.status)}`}>
                          {getStatusIcon(rfp.status)}
                          <span className="ml-1">{formatStatus(rfp.status)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(rfp.progress)}`}
                              style={{ width: `${rfp.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{rfp.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{rfp.responsesReceived}/{rfp.suppliersInvited}</div>
                        <div className="text-xs text-gray-500">suppliers</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{new Date(rfp.deadline).toLocaleDateString()}</div>
                        <div className={`text-xs ${
                          daysUntilDeadline < 0 ? 'text-red-600' :
                          daysUntilDeadline < 7 ? 'text-yellow-600' : 'text-gray-500'
                        }`}>
                          {daysUntilDeadline < 0 ? 'Overdue' : `${daysUntilDeadline} days left`}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{rfp.budget}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <div className="mt-8">
        <AgenticInterface 
          context="tracker"
          contextData={{ 
            totalRFPs: rfps.length,
            filteredRFPs: filteredRFPs.length,
            statusFilter,
            activeRFPs: rfps.filter(r => r.status === 'sent' || r.status === 'responses_received').length
          }}
        />
      </div>

      {filteredRFPs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileText className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No RFPs found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
          <button 
            onClick={() => navigate('/rfp-wizard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Your First RFP
          </button>
        </div>
      )}
    </div>
  );
}