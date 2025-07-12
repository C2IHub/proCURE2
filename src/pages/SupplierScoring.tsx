import React, { useState, useMemo } from 'react';
import { TrendingUp, Clock, Filter, Download, Search, Brain, Users } from 'lucide-react';
import { useSuppliers } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

export default function SupplierScoring() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const { data: suppliers = [], isLoading, error } = useSuppliers();

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchesFilter = selectedFilter === 'all' || supplier.riskLevel === selectedFilter;
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [suppliers, selectedFilter, searchTerm]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Analytics</h1>
          <p className="text-gray-600">Real-time compliance scores, risk analysis, and performance metrics</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="text-center">
                    <div className="w-12 h-6 bg-gray-200 rounded mx-auto mb-1"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Analytics</h1>
          <p className="text-gray-600">Real-time compliance scores, risk analysis, and performance metrics</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800">Error loading supplier data. Please try again.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Analytics</h1>
        <p className="text-gray-600">Real-time compliance scores, risk analysis, and performance metrics</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by risk:</span>
            </div>
            <div className="flex space-x-2">
              {['all', 'low', 'medium', 'high'].map((filter) => (
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
                placeholder="Search suppliers..."
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

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                <p className="text-sm text-gray-600">{supplier.category}</p>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(supplier.overallScore)}`}>
                  {supplier.overallScore}/100
                </div>
                <p className="text-xs text-gray-500 mt-1">Overall Score</p>
              </div>
            </div>

            {/* Scoring Breakdown */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className={`text-lg font-bold ${getScoreColor(supplier.compliance.score).split(' ')[0]}`}>
                    {supplier.compliance.score}
                  </span>
                  <div className="ml-1">
                    {getTrendIcon(supplier.compliance.trend)}
                  </div>
                </div>
                <p className="text-xs text-gray-600">Compliance</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className={`text-lg font-bold ${getScoreColor(supplier.quality.score).split(' ')[0]}`}>
                    {supplier.quality.score}
                  </span>
                  <div className="ml-1">
                    {getTrendIcon(supplier.quality.trend)}
                  </div>
                </div>
                <p className="text-xs text-gray-600">Quality</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className={`text-lg font-bold ${getScoreColor(supplier.sustainability.score).split(' ')[0]}`}>
                    {supplier.sustainability.score}
                  </span>
                  <div className="ml-1">
                    {getTrendIcon(supplier.sustainability.trend)}
                  </div>
                </div>
                <p className="text-xs text-gray-600">Sustainability</p>
              </div>
            </div>

            {/* Risk Level and Last Audit */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Risk Level:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getRiskColor(supplier.riskLevel)}`}>
                  {supplier.riskLevel}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                Last audit: {supplier.lastAudit}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Certifications:</p>
              <div className="flex flex-wrap gap-2">
                {supplier.certifications.map((cert, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                View Compliance Details
              </button>
              <button 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                onClick={() => navigate(`/supplier/${supplier.id}/reasoning`)}
              >
                <Brain className="h-4 w-4 mr-1 inline-block" />
                AI Analysis
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
      
      {/* Documentation Access Button */}
      <div className="mt-8 text-center">
        <button 
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-md font-medium inline-flex items-center"
          onClick={() => navigate('/supplier-portal')}
        >
          <Users className="h-5 w-5 mr-2" />
          Access Supplier Documentation
        </button>
      </div>
    </div>
  );
}