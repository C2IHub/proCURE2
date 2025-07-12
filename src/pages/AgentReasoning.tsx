import React, { useState } from 'react';
import { Brain, Eye, AlertTriangle, CheckCircle, Clock, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';

export default function AgentReasoning() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>('compliance-analyzer');
  const [selectedDecision, setSelectedDecision] = useState<string | null>('decision-1');

  const agents = [
    {
      id: 'compliance-analyzer',
      name: 'EU GMP Compliance Analyzer',
      status: 'active',
      description: 'Analyzing supplier compliance with EU GMP regulations',
      confidence: 94,
      lastUpdate: '2 minutes ago'
    },
    {
      id: 'risk-assessor',
      name: 'Predictive Risk Assessor',
      status: 'completed',
      description: 'Completed risk analysis for 15 suppliers',
      confidence: 89,
      lastUpdate: '15 minutes ago'
    },
    {
      id: 'document-validator',
      name: 'Document Validation Engine',
      status: 'warning',
      description: 'Found inconsistencies in supplier documentation',
      confidence: 67,
      lastUpdate: '1 hour ago'
    }
  ];

  const decisions = [
    {
      id: 'decision-1',
      title: 'MedTech Solutions - Compliance Score: 92%',
      reasoning: 'High compliance score based on comprehensive analysis',
      factors: [
        { factor: 'EU GMP Certification', score: 95, weight: 30 },
        { factor: 'FDA Compliance', score: 88, weight: 25 },
        { factor: 'Quality Management', score: 94, weight: 20 },
        { factor: 'Environmental Standards', score: 90, weight: 15 },
        { factor: 'Documentation Quality', score: 89, weight: 10 }
      ],
      keyFindings: [
        'Valid EU GMP certificate expires in 18 months',
        'Consistent quality metrics over past 24 months',
        'Strong environmental compliance record',
        'Minor documentation formatting issues identified'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Reasoning & Explainability</h1>
        <div className="flex items-center">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Supplier Analytics
          </button>
        </div>
        <p className="text-gray-600">Explore how AI agents make compliance decisions and understand their reasoning process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Agents */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active AI Agents</h3>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium text-gray-900">{agent.name}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Confidence: {agent.confidence}%</span>
                    <span className="text-gray-500">{agent.lastUpdate}</span>
                  </div>

                  {expandedAgent === agent.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Confidence Level</span>
                          <span className="font-medium">{agent.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${agent.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View detailed reasoning →
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decision Breakdown */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Decision Breakdown</h3>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">Explainable AI</span>
              </div>
            </div>

            {decisions.map((decision) => (
              <div key={decision.id} className="space-y-6">
                {/* Decision Header */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{decision.title}</h4>
                  <p className="text-gray-600">{decision.reasoning}</p>
                </div>

                {/* Scoring Factors */}
                <div>
                  <h5 className="text-md font-semibold text-gray-900 mb-4">Scoring Factors & Weights</h5>
                  <div className="space-y-3">
                    {decision.factors.map((factor, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{factor.factor}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Weight: {factor.weight}%</span>
                            <span className="font-semibold text-gray-900">{factor.score}/100</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              factor.score >= 90 ? 'bg-green-500' :
                              factor.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${factor.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Findings */}
                <div>
                  <h5 className="text-md font-semibold text-gray-900 mb-4">Key Findings</h5>
                  <div className="space-y-2">
                    {decision.keyFindings.map((finding, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision Timeline */}
                <div>
                  <h5 className="text-md font-semibold text-gray-900 mb-4">Decision Timeline</h5>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Document analysis initiated</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Compliance checks completed</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Final score calculated</p>
                        <p className="text-xs text-gray-500">30 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}