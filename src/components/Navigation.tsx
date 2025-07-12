import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  ShieldAlert,
  BarChart3, 
  Users, 
  ClipboardList,
  ChevronDown,
  Settings,
  LogOut,
  Search, 
  Bell
} from 'lucide-react';

interface NavigationProps {
  currentUser: {
    name: string;
    role: string;
    avatar: string;
  };
}

export default function Navigation({ currentUser }: NavigationProps) {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const coreAnalytics = [
    { name: 'Compliance Dashboard', href: '/', icon: Shield },
    { name: 'Risk Management', href: '/risk-mitigation', icon: ShieldAlert },
    { name: 'Supplier Intelligence', href: '/supplier-scoring', icon: BarChart3 },
  ];

  const processManagement = [
    { name: 'RFP Generator', href: '/rfp-wizard', icon: FileText },
    { name: 'RFP Tracker', href: '/rfp-tracker', icon: ClipboardList },
  ];

  const recordsAudit = [
    { name: 'Audit Trail', href: '/audit-trail', icon: FileText },
  ];

  const renderNavSection = (items: typeof coreAnalytics) => {
    return items.map((item) => {
      const isActive = location.pathname === item.href;
      return (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            isActive
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
          {item.name}
        </Link>
      );
    });
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-blue-600" />
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900">Life Sciences proCURE</h1>
            <p className="text-xs text-gray-500">AI-Powered Procurement</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search regulations, suppliers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 pb-4 space-y-1">
        {/* Core Analytics Section */}
        <div className="space-y-1">
          {renderNavSection(coreAnalytics)}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 pt-4">
          {renderNavSection(processManagement)}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 pt-4">
          {renderNavSection(recordsAudit)}
        </div>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-50"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="ml-3 text-left flex-1">
              <p className="font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
    <nav className="px-4 py-4 space-y-1">