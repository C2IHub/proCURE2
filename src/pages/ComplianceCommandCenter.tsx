import React from 'react';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Shield, Users, FileText, Zap, ShieldAlert } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ComplianceChart from '../components/ComplianceChart';
import RecentActivity from '../components/RecentActivity';
// Removed AgentStatus import

export default function ComplianceCommandCenter() {
  const metrics = [
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-2 from yesterday',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Compliant Suppliers',
      value: '847',
      change: '+12 this week',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Pending Reviews',
      value: '24',
      change: '+5 since yesterday',
      trend: 'up',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Avg. Compliance Score',
      value: '92.3%',
      change: '+1.2% this month',
      trend: 'up',
      icon: TrendingUp,
      color: 'blue'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Command Center</h1>
        <p className="text-gray-600">Real-time overview of pharmaceutical supplier compliance and AI agent activity</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 mb-8">
        {/* Compliance Trends Chart */}
        <ComplianceChart />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <RecentActivity />
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Create New RFP</span>
              </div>
              <span className="text-blue-600">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium text-gray-900">Analyze Supplier Data</span>
              </div>
              <span className="text-green-600">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-purple-600 mr-3" />
                <span className="font-medium text-gray-900">View AI Insights</span>
              </div>
              <span className="text-purple-600">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <div className="flex items-center">
                <ShieldAlert className="h-5 w-5 text-orange-600 mr-3" />
                <span className="font-medium text-gray-900">Manage Risks</span>
              </div>
              <span className="text-orange-600">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}