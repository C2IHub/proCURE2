import React, { useState } from 'react';
import { FileText, Globe, Shield, Upload, ChevronRight, Plus, X, CheckCircle } from 'lucide-react';

export default function RFPWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(['Europe']);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [suggestedCompliance, setSuggestedCompliance] = useState<any[]>([]);

  const steps = [
    { id: 1, name: 'Project Details', icon: FileText },
    { id: 2, name: 'Target Markets', icon: Globe },
    { id: 3, name: 'Compliance Requirements', icon: Shield }
  ];

  const categories = [
    'Primary Packaging',
    'Secondary Packaging', 
    'APIs',
    'Raw Materials',
    'Equipment',
    'Testing Services',
    'Logistics',
    'Excipients'
  ];

  const targetMarkets = [
    'Europe',
    'North America', 
    'Asia Pacific',
    'South America',
    'Middle East & Africa'
  ];

  const regulations = [
    'EU Regulation 2025/40 (Packaging Materials)',
    'FDA 21 CFR Part 211 (GMP)',
    'ISO 15378:2017 (Pharmaceutical Packaging)',
    'USP <661> Plastic Materials',
    'EU Directive 94/62/EC (Packaging and Packaging Waste)',
    'REACH Regulation (Substance Restrictions)',
    'Regional EPR Obligations',
    'Health Canada Medical Device License',
    'CE Marking for Medical Devices',
    'Good Distribution Practice (GDP)'
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleMarket = (market: string) => {
    setSelectedMarkets(prev => 
      prev.includes(market) 
        ? prev.filter(m => m !== market)
        : [...prev, market]
    );
  };

  const toggleRegulation = (regulation: string) => {
    setSelectedRegulations(prev => 
      prev.includes(regulation) 
        ? prev.filter(r => r !== regulation)
        : [...prev, regulation]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString()
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const generateAISuggestions = () => {
    // AI-driven compliance suggestions based on selected categories and markets
    const suggestions = [];
    
    if (selectedCategories.includes('Primary Packaging') && selectedMarkets.includes('Europe')) {
      suggestions.push({
        id: 1,
        regulation: 'EU Regulation 2025/40 (Packaging Materials)',
        reason: 'Required for primary packaging materials in European markets',
        mandatory: true,
        confidence: 95
      });
      suggestions.push({
        id: 2,
        regulation: 'ISO 15378:2017 (Pharmaceutical Packaging)',
        reason: 'Global standard for pharmaceutical primary packaging',
        mandatory: true,
        confidence: 90
      });
    }

    if (selectedCategories.includes('APIs') && selectedMarkets.includes('North America')) {
      suggestions.push({
        id: 3,
        regulation: 'FDA 21 CFR Part 211 (GMP)',
        reason: 'Mandatory for API manufacturing in US market',
        mandatory: true,
        confidence: 98
      });
    }

    if (selectedCategories.includes('Equipment') && selectedMarkets.includes('Europe')) {
      suggestions.push({
        id: 4,
        regulation: 'CE Marking for Medical Devices',
        reason: 'Required for medical equipment in European Union',
        mandatory: true,
        confidence: 92
      });
    }

    if (selectedMarkets.includes('Europe')) {
      suggestions.push({
        id: 5,
        regulation: 'REACH Regulation (Substance Restrictions)',
        reason: 'Chemical safety requirements for European market',
        mandatory: true,
        confidence: 88
      });
    }

    setSuggestedCompliance(suggestions);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RFP Generator</h1>
        <p className="text-gray-600">Generate pharmaceutical-specific RFPs with AI-driven compliance requirements</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : 'border-gray-300 bg-white text-gray-500'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-3 flex-1">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  Step {step.id}
                </p>
                <p className={`text-sm ${
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.name}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-5 w-5 text-gray-400 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Q2 2024 Packaging Materials"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>$100K - $500K</option>
                  <option>$500K - $1M</option>
                  <option>$1M - $5M</option>
                  <option>$5M+</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the project requirements..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories Selection */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Project Categories (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedCategories.includes(category)
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                        selectedCategories.includes(category)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedCategories.includes(category) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Upload */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Product/Process Requirements Documents</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-900 mb-1">Upload Requirements Documents</p>
                <p className="text-xs text-gray-600 mb-3">PDF, DOC, or image files (max 10MB each)</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Target Markets</h3>
            <p className="text-gray-600 mb-6">Select the geographic markets where you plan to operate:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {targetMarkets.map((market) => (
                <div
                  key={market}
                  onClick={() => toggleMarket(market)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedMarkets.includes(market)
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                      selectedMarkets.includes(market)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedMarkets.includes(market) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{market}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Region</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>European Union</option>
                  <option>North America</option>
                  <option>Asia Pacific</option>
                  <option>Global</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>UTC+1 (CET)</option>
                  <option>UTC-5 (EST)</option>
                  <option>UTC+8 (CST)</option>
                  <option>UTC (GMT)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance Requirements</h3>
            
            {/* AI Suggestions */}
            {selectedCategories.length > 0 && selectedMarkets.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">AI-Suggested Compliance Requirements</h4>
                  <button
                    onClick={generateAISuggestions}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                  >
                    Generate AI Suggestions
                  </button>
                </div>
                
                {suggestedCompliance.length > 0 && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                    <h5 className="text-md font-medium text-purple-900 mb-3">
                      Based on your selected categories ({selectedCategories.join(', ')}) and markets ({selectedMarkets.join(', ')}):
                    </h5>
                    <div className="space-y-3">
                      {suggestedCompliance.map((suggestion) => (
                        <div key={suggestion.id} className="bg-white border border-purple-200 rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900">{suggestion.regulation}</h6>
                              <p className="text-sm text-gray-600 mt-1">{suggestion.reason}</p>
                            </div>
                            <div className="ml-4 text-right">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                suggestion.mandatory ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {suggestion.mandatory ? 'Mandatory' : 'Recommended'}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">{suggestion.confidence}% confidence</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Manual Selection */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Compliance Standards</h4>
              <p className="text-gray-600 mb-6">Select additional regulatory standards and guidelines that apply to this RFP:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regulations.map((regulation) => (
                  <div
                    key={regulation}
                    onClick={() => toggleRegulation(regulation)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedRegulations.includes(regulation)
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                        selectedRegulations.includes(regulation)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedRegulations.includes(regulation) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{regulation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              Generate RFP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}