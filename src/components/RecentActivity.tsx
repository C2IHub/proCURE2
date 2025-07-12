import React from 'react';
import { AlertTriangle, CheckCircle, FileText, Users, Clock } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      type: 'alert',
      title: 'Critical compliance violation detected',
      description: 'Supplier ABC Pharma failed EU GMP certification',
      timestamp: '2 minutes ago',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50'
    },
    {
      type: 'success',
      title: 'Supplier onboarding completed',
      description: 'MedTech Solutions passed all compliance checks',
      timestamp: '15 minutes ago',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      type: 'document',
      title: 'RFP generated successfully',
      description: 'Packaging materials RFP for Q2 2024',
      timestamp: '1 hour ago',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      type: 'review',
      title: 'Supplier score updated',
      description: 'GlobalPack Ltd compliance score increased to 94%',
      timestamp: '2 hours ago',
      icon: Users,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      type: 'pending',
      title: 'Document review pending',
      description: '3 suppliers awaiting certification validation',
      timestamp: '4 hours ago',
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 mb-1">{activity.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}