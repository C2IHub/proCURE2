import React, { useState, useMemo } from 'react';
import { TrendingUp, Clock, Filter, Download, Search, Brain, Users, FileText, Shield, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import { useSuppliers } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

export default function SupplierScoring() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards');
  const navigate = useNavigate();
  
  const { data: suppliers = [], isLoading, error } = useSuppliers();

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchesFilter = selectedFilter === 'all' || supplier.riskScore.level === selectedFilter;
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [suppliers, selectedFilter, searchTerm]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 75) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSupplierRatingColor = (rating: string) => {
    switch (rating) {
      case 'preferred': return 'text-green-600 bg-green-50 border-green-200';
      case 'approved': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'conditional': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'restricted': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSupplierRatingIcon = (rating: string) => {
    switch (rating) {
      case 'preferred': return <Star className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'conditional': return <AlertTriangle className="h-4 w-4" />;
      case 'restricted': return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Intelligence</h1>
          <p className="text-gray-600">AI-powered supplier analytics with real-time compliance and risk insights</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="w-48 h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Intelligence</h1>
          <p className="text-gray-600">AI-powered supplier analytics with real-time compliance and risk insights</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Intelligence</h1>
        <p className="text-gray-600">AI-powered supplier analytics with real-time compliance and risk insights</p>
      </div>

      {/* Filters and Controls */}
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  viewMode === 'compact' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Compact
              </button>
            </div>
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
      <div className={`grid gap-6 ${
        viewMode === 'cards' 
          ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ${
            viewMode === 'cards' ? 'p-6 h-80 flex flex-col' : 'p-4'
          }`}>
            {viewMode === 'cards' ? (
              // Card View
              <>
                {/* Header with Score Circle */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[3.5rem]">{supplier.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 h-5">{supplier.category}</p>
                    
                    {/* Supplier Rating Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getSupplierRatingColor(supplier.supplierRating)}`}>
                      {getSupplierRatingIcon(supplier.supplierRating)}
                      <span className="ml-1 capitalize">{supplier.supplierRating}</span>
                    </div>
                  </div>
                  
                  {/* Compliance Score Circle */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${getScoreBgColor(supplier.complianceScore.overall)}`}>
                      <span className={`text-lg font-bold ${getScoreColor(supplier.complianceScore.overall)}`}>
                        {supplier.complianceScore.overall}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">Compliance</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-xl font-bold ${getRiskColor(supplier.riskScore.level).split(' ')[0]}`}>
                      {supplier.riskScore.level.toUpperCase()}
                    </div>
                    <p className="text-xs text-gray-600">Risk Level</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {supplier.certifications.length}
                    </div>
                    <p className="text-xs text-gray-600">Certifications</p>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      supplier.complianceScore.status === 'compliant' ? 'bg-green-500' :
                      supplier.complianceScore.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm text-gray-600 capitalize">{supplier.complianceScore.status}</span>
                  </div>
                  <div className="flex items-center">
                    {getTrendIcon(supplier.complianceScore.trend)}
                    <span className="text-sm text-gray-600 ml-1">Trending</span>
                  </div>
                </div>

                {/* Certifications Preview */}
                <div className="mb-4 flex-1">
                  <div className="flex flex-wrap gap-1">
                    {supplier.certifications.slice(0, 3).map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                        {cert}
                      </span>
                    ))}
                    {supplier.certifications.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded">
                        +{supplier.certifications.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-auto">
                  <button 
                    onClick={() => navigate(`/supplier/${supplier.id}/portal`)} 
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center justify-center"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Portal
                  </button>
                  <button 
                    onClick={() => navigate(`/supplier/${supplier.id}/reasoning`)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center"
                  >
                    <Brain className="h-4 w-4 mr-1" />
                    AI Analysis
                  </button>
                </div>
              </>
            ) : (
              // Compact View
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getScoreBgColor(supplier.complianceScore.overall)}`}>
                    <span className={`text-sm font-bold ${getScoreColor(supplier.complianceScore.overall)}`}>
                      {supplier.complianceScore.overall}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                    <p className="text-sm text-gray-600">{supplier.category}</p>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getSupplierRatingColor(supplier.supplierRating)}`}>
                    {getSupplierRatingIcon(supplier.supplierRating)}
                    <span className="ml-1 capitalize">{supplier.supplierRating}</span>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(supplier.riskScore.level)}`}>
                    {supplier.riskScore.level.toUpperCase()} Risk
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => navigate(`/supplier/${supplier.id}/portal`)} 
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    Portal
                  </button>
                  <button 
                    onClick={() => navigate(`/supplier/${supplier.id}/reasoning`)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    AI Analysis
                  </button>
                </div>
              </div>
            )}
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
    </div>
  );
}