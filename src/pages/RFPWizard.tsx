import React, { useState } from 'react';
import { FileText, Globe, Shield, Upload, ChevronRight, Plus, X, CheckCircle, Brain, Users, Send, Download, Eye, Star, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSuppliers } from '../hooks/useApi';
import { useComplianceAgent } from '../context/BedrockAgentProvider';

export default function RFPWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(['Europe']);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [suggestedCompliance, setSuggestedCompliance] = useState<any[]>([]);
  const [isGeneratingRFP, setIsGeneratingRFP] = useState(false);
  const [generatedRFP, setGeneratedRFP] = useState<any>(null);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [supplierScores, setSupplierScores] = useState<Record<string, number>>({});
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    budget: '',
    description: '',
    deadline: ''
  });

  const navigate = useNavigate();
  const { data: suppliers = [] } = useSuppliers();
  const complianceAgent = useComplianceAgent();

  const steps = [
    { id: 1, name: 'Project Details', icon: FileText },
    { id: 2, name: 'Target Markets', icon: Globe },
    { id: 3, name: 'Compliance Requirements', icon: Shield },
    { id: 4, name: 'AI RFP Generation', icon: Brain },
    { id: 5, name: 'Supplier Selection', icon: Users },
    { id: 6, name: 'Send RFP', icon: Send }
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

  const toggleSupplier = (supplierId: string) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(s => s !== supplierId)
        : [...prev, supplierId]
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

  const generateRFP = async () => {
    setIsGeneratingRFP(true);
    
    try {
      // Use AI agent to generate RFP content
      const prompt = `Generate a comprehensive RFP for pharmaceutical procurement with the following specifications:

Project Details:
- Name: ${projectDetails.name}
- Budget: ${projectDetails.budget}
- Description: ${projectDetails.description}
- Deadline: ${projectDetails.deadline}

Categories: ${selectedCategories.join(', ')}
Target Markets: ${selectedMarkets.join(', ')}
Compliance Requirements: ${[...selectedRegulations, ...suggestedCompliance.map(s => s.regulation)].join(', ')}

Please generate:
1. Executive Summary
2. Detailed Requirements
3. Technical Specifications
4. Compliance Requirements
5. Evaluation Criteria
6. Timeline and Milestones
7. Submission Guidelines

Format as a professional RFP document.`;

      const response = await complianceAgent.invoke({
        prompt,
        sessionId: `rfp-generation-${Date.now()}`,
        context: { 
          categories: selectedCategories,
          markets: selectedMarkets,
          regulations: selectedRegulations
        }
      });

      // Generate RFP artifacts
      const rfpData = {
        id: `RFP-${Date.now()}`,
        title: projectDetails.name || 'Pharmaceutical Procurement RFP',
        content: response.response,
        categories: selectedCategories,
        markets: selectedMarkets,
        regulations: [...selectedRegulations, ...suggestedCompliance.map(s => s.regulation)],
        attachments: uploadedFiles,
        createdAt: new Date().toISOString(),
        deadline: projectDetails.deadline,
        budget: projectDetails.budget,
        artifacts: [
          {
            id: 1,
            name: 'Technical Specifications Document',
            type: 'PDF',
            description: 'Detailed technical requirements and specifications',
            generated: true
          },
          {
            id: 2,
            name: 'Compliance Checklist',
            type: 'Excel',
            description: 'Regulatory compliance requirements checklist',
            generated: true
          },
          {
            id: 3,
            name: 'Evaluation Matrix',
            type: 'Excel',
            description: 'Supplier evaluation criteria and scoring matrix',
            generated: true
          },
          {
            id: 4,
            name: 'Quality Questionnaire',
            type: 'PDF',
            description: 'Quality management system assessment questionnaire',
            generated: true
          }
        ]
      };

      setGeneratedRFP(rfpData);
      
      // Calculate supplier scores for this specific RFP
      calculateSupplierScores(rfpData);
      
      setCurrentStep(4);
    } catch (error) {
      console.error('Error generating RFP:', error);
    } finally {
      setIsGeneratingRFP(false);
    }
  };

  const calculateSupplierScores = (rfpData: any) => {
    const scores: Record<string, number> = {};
    
    suppliers.forEach(supplier => {
      let score = supplier.complianceScore.overall; // Base score
      
      // Adjust score based on category match
      if (rfpData.categories.includes(supplier.category)) {
        score += 10; // Bonus for category match
      }
      
      // Adjust score based on risk level
      if (supplier.riskScore.level === 'low') score += 5;
      else if (supplier.riskScore.level === 'high') score -= 10;
      
      // Adjust score based on supplier rating
      if (supplier.supplierRating === 'preferred') score += 15;
      else if (supplier.supplierRating === 'approved') score += 5;
      else if (supplier.supplierRating === 'restricted') score -= 20;
      
      // Adjust score based on certifications (simplified)
      const relevantCerts = supplier.certifications.filter(cert => 
        rfpData.regulations.some((reg: string) => reg.includes(cert))
      );
      score += relevantCerts.length * 3;
      
      scores[supplier.id] = Math.min(Math.max(score, 0), 100); // Clamp between 0-100
    });
    
    setSupplierScores(scores);
  };

  const sendRFP = async () => {
    // Simulate sending RFP to selected suppliers
    const selectedSupplierData = suppliers.filter(s => selectedSuppliers.includes(s.id));
    
    // In real implementation, this would:
    // 1. Send emails to suppliers
    // 2. Create supplier portal entries
    // 3. Set up tracking and notifications
    // 4. Generate unique submission links
    
    alert(`RFP "${generatedRFP.title}" sent to ${selectedSupplierData.length} suppliers:\n${selectedSupplierData.map(s => s.name).join('\n')}`);
    
    // Navigate back to dashboard or RFP management page
    navigate('/');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getSupplierRatingColor = (rating: string) => {
    switch (rating) {
      case 'preferred': return 'text-green-600 bg-green-50';
      case 'approved': return 'text-blue-600 bg-blue-50';
      case 'conditional': return 'text-yellow-600 bg-yellow-50';
      case 'restricted': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
                  value={projectDetails.name}
                  onChange={(e) => setProjectDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Q2 2024 Packaging Materials"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select 
                  value={projectDetails.budget}
                  onChange={(e) => setProjectDetails(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="$100K - $500K">$100K - $500K</option>
                  <option value="$500K - $1M">$500K - $1M</option>
                  <option value="$1M - $5M">$1M - $5M</option>
                  <option value="$5M+">$5M+</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={projectDetails.description}
                  onChange={(e) => setProjectDetails(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the project requirements..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={projectDetails.deadline}
                  onChange={(e) => setProjectDetails(prev => ({ ...prev, deadline: e.target.value }))}
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

        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">AI RFP Generation</h3>
            
            {!generatedRFP ? (
              <div className="text-center py-12">
                <Brain className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h4 className="text-lg font-medium text-gray-900 mb-4">Ready to Generate Your RFP</h4>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Our AI agent will analyze your requirements and generate a comprehensive RFP with all necessary 
                  compliance documentation, technical specifications, and evaluation criteria.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                  <h5 className="font-medium text-blue-900 mb-3">What will be generated:</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Technical Specifications
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Compliance Checklist
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Evaluation Matrix
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Quality Questionnaire
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={generateRFP}
                  disabled={isGeneratingRFP}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingRFP ? (
                    <>
                      <Brain className="h-5 w-5 mr-2 animate-pulse inline" />
                      Generating RFP...
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-2 inline" />
                      Generate RFP with AI
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <h4 className="text-lg font-medium text-green-900">RFP Generated Successfully!</h4>
                  </div>
                  <p className="text-green-800">
                    Your RFP "{generatedRFP.title}" has been generated with AI-driven compliance requirements 
                    and technical specifications.
                  </p>
                </div>

                {/* Generated Artifacts */}
                <div className="mb-8">
                  <h5 className="text-lg font-medium text-gray-900 mb-4">Generated Documents & Artifacts</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedRFP.artifacts.map((artifact: any) => (
                      <div key={artifact.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <FileText className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                            <div>
                              <h6 className="font-medium text-gray-900">{artifact.name}</h6>
                              <p className="text-sm text-gray-600 mt-1">{artifact.description}</p>
                              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mt-2">
                                {artifact.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RFP Preview */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="text-lg font-medium text-gray-900 mb-4">RFP Content Preview</h5>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {generatedRFP.content}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 5 && generatedRFP && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Supplier Selection</h3>
            <p className="text-gray-600 mb-6">
              AI has calculated RFP-specific scores for each supplier based on category match, 
              compliance status, and relevant certifications.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {suppliers
                .filter(supplier => generatedRFP.categories.includes(supplier.category))
                .sort((a, b) => (supplierScores[b.id] || 0) - (supplierScores[a.id] || 0))
                .map((supplier) => {
                  const rfpScore = supplierScores[supplier.id] || 0;
                  return (
                    <div
                      key={supplier.id}
                      onClick={() => toggleSupplier(supplier.id)}
                      className={`border rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                        selectedSuppliers.includes(supplier.id)
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{supplier.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{supplier.category}</p>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSupplierRatingColor(supplier.supplierRating)}`}>
                            <Star className="h-3 w-3 mr-1" />
                            {supplier.supplierRating.toUpperCase()}
                          </div>
                        </div>
                        
                        {/* RFP-Specific Score */}
                        <div className="text-center">
                          <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${getScoreColor(rfpScore)}`}>
                            <span className={`text-lg font-bold ${getScoreColor(rfpScore).split(' ')[0]}`}>
                              {rfpScore}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">RFP Score</p>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{supplier.complianceScore.overall}</div>
                          <p className="text-xs text-gray-600">Compliance</p>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${
                            supplier.riskScore.level === 'low' ? 'text-green-600' :
                            supplier.riskScore.level === 'medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {supplier.riskScore.level.toUpperCase()}
                          </div>
                          <p className="text-xs text-gray-600">Risk</p>
                        </div>
                      </div>

                      {/* Relevant Certifications */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">Relevant Certifications:</p>
                        <div className="flex flex-wrap gap-1">
                          {supplier.certifications.slice(0, 2).map((cert, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {cert}
                            </span>
                          ))}
                          {supplier.certifications.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{supplier.certifications.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      <div className="flex items-center justify-center">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedSuppliers.includes(supplier.id)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedSuppliers.includes(supplier.id) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {selectedSuppliers.includes(supplier.id) ? 'Selected' : 'Select for RFP'}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            {selectedSuppliers.length > 0 && (
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  {selectedSuppliers.length} supplier{selectedSuppliers.length > 1 ? 's' : ''} selected for RFP distribution
                </p>
              </div>
            )}
          </div>
        )}

        {currentStep === 6 && generatedRFP && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Send RFP</h3>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-medium text-green-900 mb-4">Ready to Send RFP</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">RFP Details:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Title: {generatedRFP.title}</li>
                    <li>• Categories: {generatedRFP.categories.join(', ')}</li>
                    <li>• Markets: {generatedRFP.markets.join(', ')}</li>
                    <li>• Deadline: {generatedRFP.deadline}</li>
                    <li>• Artifacts: {generatedRFP.artifacts.length} documents</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Selected Suppliers:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    {suppliers
                      .filter(s => selectedSuppliers.includes(s.id))
                      .map(supplier => (
                        <li key={supplier.id}>• {supplier.name} (Score: {supplierScores[supplier.id]})</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={sendRFP}
                disabled={selectedSuppliers.length === 0}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5 mr-2 inline" />
                Send RFP to {selectedSuppliers.length} Supplier{selectedSuppliers.length > 1 ? 's' : ''}
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Suppliers will receive the RFP via email with secure portal access for submissions
              </p>
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
          ) : currentStep === 3 ? (
            <button
              onClick={() => setCurrentStep(4)}
              disabled={selectedCategories.length === 0}
              className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
            >
              Continue to AI Generation
            </button>
          ) : currentStep === 4 && generatedRFP ? (
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Select Suppliers
            </button>
          ) : currentStep === 5 ? (
            <button
              onClick={() => setCurrentStep(6)}
              disabled={selectedSuppliers.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Review & Send
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}