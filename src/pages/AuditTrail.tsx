import React, { useState } from 'react';
import { History, Search, Filter, Download, Eye, User, Bot, FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function AuditTrail() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const auditEvents = [
    {
      id: 1,
      timestamp: '2024-01-24 14:32:15',
      actor: { type: 'human', name: 'Sarah Chen', role: 'Compliance Manager' },
      action: 'Compliance Score Override',
      target: 'MedTech Solutions',
      description: 'Manually adjusted compliance score from 89% to 92% based on additional documentation review',
      category: 'compliance',
      impact: 'medium',
      dataSource: 'Manual Review',
      confidence: null
    },
    {
      id: 2,
      timestamp: '2024-01-24 14:15:03',
      actor: { type: 'agent', name: 'EU GMP Analyzer', role: 'AI Agent' },
      action: 'Automated Assessment',
      target: 'GlobalPack Ltd',
      description: 'Completed automated compliance assessment with 94% confidence',
      category: 'assessment',
      impact: 'low',
      dataSource: 'EU GMP Database',
      confidence: 94
    },
    {
      id: 3,
      timestamp: '2024-01-24 13:45:22',
      actor: { type: 'human', name: 'Michael Rodriguez', role: 'Procurement Manager' },
      action: 'Supplier Approval',
      target: 'European Containers Co',
      description: 'Approved supplier for Q2 2024 packaging materials procurement',
      category: 'approval',
      impact: 'high',
      dataSource: 'Procurement System',
      confidence: null
    },
    {
      id: 4,
      timestamp: '2024-01-24 12:20:41',
      actor: { type: 'agent', name: 'Risk Assessment Engine', role: 'AI Agent' },
      action: 'Risk Alert Generated',
      target: 'ABC Pharma Supply',
      description: 'Identified potential compliance risk due to expiring EU GMP certification',
      category: 'risk',
      impact: 'high',
      dataSource: 'Certification Database',
      confidence: 87
    },
    {
      id: 5,
      timestamp: '2024-01-24 11:55:18',
      actor: { type: 'human', name: 'Emma Thompson', role: 'Quality Assurance' },
      action: 'Document Validation',
      target: 'Quality Management Manual v3.2',
      description: 'Validated and approved updated quality management documentation',
      category: 'documentation',
      impact: 'medium',
      dataSource: 'Document Management System',
      confidence: null
    },
    {
      id: 6,
      timestamp: '2024-01-24 10:30:55',
      actor: { type: 'agent', name: 'Document Validator', role: 'AI Agent' },
      action: 'Document Analysis',
      target: 'REACH Compliance Certificate',
      description: 'Detected inconsistencies in supplier REACH compliance documentation',
      category: 'validation',
      impact: 'medium',
      dataSource: 'Document Analysis Engine',
      confidence: 78
    }
  ];

  const getActorIcon = (type: string) => {
    return type === 'human' ? User : Bot;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return CheckCircle;
      case 'assessment': return Eye;
      case 'approval': return CheckCircle;
      case 'risk': return AlertTriangle;
      case 'documentation': return FileText;
      case 'validation': return FileText;
      default: return Clock;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compliance': return 'text-green-600 bg-green-50';
      case 'assessment': return 'text-blue-600 bg-blue-50';
      case 'approval': return 'text-green-600 bg-green-50';
      case 'risk': return 'text-red-600 bg-red-50';
      case 'documentation': return 'text-purple-600 bg-purple-50';
      case 'validation': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredEvents = auditEvents.filter(event => {
    const matchesFilter = selectedFilter === 'all' || event.category === selectedFilter;
    const matchesSearch = event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.actor.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Records</h1>
        <p className="text-gray-600">Complete history of compliance assessments, agent actions, and human interventions</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
            </div>
            <div className="flex space-x-2">
              {['all', 'compliance', 'assessment', 'risk', 'approval', 'documentation'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                    selectedFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Audit Events</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredEvents.map((event) => {
            const ActorIcon = getActorIcon(event.actor.type);
            const CategoryIcon = getCategoryIcon(event.category);
            
            return (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  {/* Actor Icon */}
                  <div className={`p-2 rounded-lg ${
                    event.actor.type === 'human' ? 'bg-blue-50' : 'bg-purple-50'
                  }`}>
                    <ActorIcon className={`h-5 w-5 ${
                      event.actor.type === 'human' ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-gray-900">{event.action}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(event.impact)}`}>
                          {event.impact} impact
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{event.timestamp}</span>
                    </div>

                    <p className="text-gray-700 mb-3">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Actor:</span>
                        <p className="text-gray-900">{event.actor.name}</p>
                        <p className="text-gray-500 text-xs">{event.actor.role}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Target:</span>
                        <p className="text-gray-900">{event.target}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Data Source:</span>
                        <p className="text-gray-900">{event.dataSource}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Confidence:</span>
                        <p className="text-gray-900">
                          {event.confidence ? `${event.confidence}%` : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category Icon */}
                  <div className={`p-2 rounded-lg ${getCategoryColor(event.category)}`}>
                    <CategoryIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No audit events found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Pagination */}
        {filteredEvents.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredEvents.length} of {auditEvents.length} events
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}