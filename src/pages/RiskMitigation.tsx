import React, { useState } from 'react';
import { AlertTriangle, Shield, TrendingUp, Clock, ChevronDown, Eye, CheckCircle, X } from 'lucide-react';

export default function RiskMitigation() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>('risk-1');
  const [showMitigationModal, setShowMitigationModal] = useState(false);

  const riskAlerts = [
    {
      id: 'risk-1',
      level: 'critical',
      title: 'ABC Pharma Supply - EU GMP Certification Expiring',
      description: 'EU GMP certification expires in 15 days with no renewal application submitted',
      supplier: 'ABC Pharma Supply',
      category: 'Regulatory Compliance',
      probability: 85,
      impact: 'High',
      timeline: '15 days',
      affectedProducts: ['Primary packaging', 'Secondary packaging'],
      mitigationStatus: 'pending'
    },
    {
      id: 'risk-2',
      level: 'warning',
      title: 'GlobalPack Ltd - Quality Score Declining',
      description: 'Quality metrics have declined 12% over the past 3 months',
      supplier: 'GlobalPack Ltd',
      category: 'Quality Assurance',
      probability: 65,
      impact: 'Medium',
      timeline: '30-60 days',
      affectedProducts: ['Bottle packaging'],
      mitigationStatus: 'in-progress'
    },
    {
      id: 'risk-3',
      level: 'medium',
      title: 'European Containers Co - Supply Chain Disruption',
      description: 'Potential supply chain delays due to regional logistics issues',
      supplier: 'European Containers Co',
      category: 'Supply Chain',
      probability: 45,
      impact: 'Medium',
      timeline: '7-14 days',
      affectedProducts: ['Secondary packaging', 'Shipping containers'],
      mitigationStatus: 'mitigated'
    }
  ];

  const mitigationStrategies = [
    {
      id: 'strategy-1',
      title: 'Emergency Supplier Activation',
      description: 'Activate pre-qualified backup suppliers',
      estimatedTime: '3-5 days',
      cost: 'High',
      effectiveness: 90
    },
    {
      id: 'strategy-2',
      title: 'Expedited Certification Review',
      description: 'Fast-track certification renewal process',
      estimatedTime: '7-10 days',
      cost: 'Medium',
      effectiveness: 75
    },
    {
      id: 'strategy-3',
      title: 'Inventory Buffer Increase',
      description: 'Temporarily increase safety stock levels',
      estimatedTime: '1-2 days',
      cost: 'Low',
      effectiveness: 60
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getMitigationStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-red-600 bg-red-50';
      case 'in-progress': return 'text-yellow-600 bg-yellow-50';
      case 'mitigated': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Management</h1>
        <p className="text-gray-600">Predictive risk analysis with multi-layered mitigation strategies and escalation workflows</p>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-red-600">1</span>
          </div>
          <h3 className="font-medium text-gray-900">Critical Risks</h3>
          <p className="text-sm text-gray-600">Immediate attention required</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-600">1</span>
          </div>
          <h3 className="font-medium text-gray-900">Warning Level</h3>
          <p className="text-sm text-gray-600">Monitoring required</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">1</span>
          </div>
          <h3 className="font-medium text-gray-900">Mitigated</h3>
          <p className="text-sm text-gray-600">Successfully addressed</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">73%</span>
          </div>
          <h3 className="font-medium text-gray-900">Risk Reduction</h3>
          <p className="text-sm text-gray-600">This month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Alerts List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Risk Alerts</h3>
            
            <div className="space-y-4">
              {riskAlerts.map((risk) => (
                <div
                  key={risk.id}
                  onClick={() => setSelectedRisk(selectedRisk === risk.id ? null : risk.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedRisk === risk.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getRiskColor(risk.level)}`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{risk.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Supplier: {risk.supplier}</span>
                          <span>Timeline: {risk.timeline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMitigationStatusColor(risk.mitigationStatus)}`}>
                        {risk.mitigationStatus.replace('-', ' ')}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transform transition-transform ${
                        selectedRisk === risk.id ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </div>

                  {selectedRisk === risk.id && (
                    <div className="pt-4 border-t border-gray-100 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Probability:</span>
                          <div className="flex items-center mt-1">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className="bg-red-500 h-2 rounded-full" 
                                style={{ width: `${risk.probability}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{risk.probability}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Impact:</span>
                          <p className="text-sm text-gray-900 mt-1">{risk.impact}</p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-700">Affected Products:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {risk.affectedProducts.map((product, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMitigationModal(true);
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                        >
                          View Mitigation Options
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                          Escalate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Analytics */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Trends</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Regulatory Risks</span>
                  <span className="text-sm font-medium">↑ 15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Quality Risks</span>
                  <span className="text-sm font-medium">↓ 8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Supply Chain Risks</span>
                  <span className="text-sm font-medium">↑ 3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-600 mr-3" />
                  <span className="font-medium text-gray-900">Emergency Protocol</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-900">Review All Risks</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-green-600 mr-3" />
                  <span className="font-medium text-gray-900">Update Thresholds</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mitigation Modal */}
      {showMitigationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Mitigation Strategies</h3>
                <button 
                  onClick={() => setShowMitigationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {mitigationStrategies.map((strategy) => (
                  <div key={strategy.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{strategy.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-xs text-gray-500">Time</span>
                        <p className="text-sm font-medium">{strategy.estimatedTime}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Cost</span>
                        <p className="text-sm font-medium">{strategy.cost}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Effectiveness</span>
                        <p className="text-sm font-medium">{strategy.effectiveness}%</p>
                      </div>
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                      Implement Strategy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}