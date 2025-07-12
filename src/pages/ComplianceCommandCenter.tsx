import React from 'react';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Users, FileText, Zap, ShieldAlert } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ComplianceChart from '../components/ComplianceChart';
import RecentActivity from '../components/RecentActivity';
import { useMetrics } from '../hooks/useApi';

// Icon mapping for dynamic rendering
const iconMap = {
  'AlertTriangle': AlertTriangle,
  'CheckCircle': CheckCircle,
  'Clock': Clock,
  'TrendingUp': TrendingUp,
};

export default function ComplianceCommandCenter() {
  const { data: metrics = [], isLoading: metricsLoading, error: metricsError } = useMetrics();

  if (metricsLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Command Center</h1>
          <p className="text-gray-600">Real-time overview of pharmaceutical supplier compliance and AI agent activity</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-16 h-8 bg-gray-200 rounded mb-2"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (metricsError) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Command Center</h1>
          <p className="text-gray-600">Real-time overview of pharmaceutical supplier compliance and AI agent activity</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">Error loading metrics data. Please try again.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Command Center</h1>
        <p className="text-gray-600">Real-time overview of pharmaceutical supplier compliance and AI agent activity</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
          return (
            <MetricCard 
              key={metric.id} 
              {...metric} 
              icon={IconComponent}
            />
          );
        })}
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