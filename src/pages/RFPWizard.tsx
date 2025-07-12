import React, { useState } from 'react';
import { FileText, Globe, Shield, Zap, ChevronRight, Plus, X } from 'lucide-react';

export default function RFPWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['English']);

  const steps = [
    { id: 1, name: 'Project Details', icon: FileText },
    { id: 2, name: 'Compliance Requirements', icon: Shield },
    { id: 3, name: 'Localization', icon: Globe },
    { id: 4, name: 'AI Enhancement', icon: Zap }
  ];

  const regulations = [
    'EU Regulation 2025/40 (Packaging Materials)',
    'FDA 21 CFR Part 211 (GMP)',
    'ISO 15378:2017 (Pharmaceutical Packaging)',
    'USP <661> Plastic Materials',
    'EU Directive 94/62/EC (Packaging and Packaging Waste)',
    'REACH Regulation (Substance Restrictions)',
    'Regional EPR Obligations'
  ];

  const languages = ['English', 'German', 'French', 'Spanish', 'Italian', 'Dutch', 'Portuguese'];

  const toggleRegulation = (regulation: string) => {
    setSelectedRegulations(prev => 
      prev.includes(regulation) 
        ? prev.filter(r => r !== regulation)
        : [...prev, regulation]
    );
  };

  const toggleLanguage = (language: string) => {
    if (language === 'English') return; // English is required
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RFP Generator</h1>
        <p className="text-gray-600">Generate pharmaceutical-specific RFPs with integrated compliance requirements</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Packaging Materials</option>
                  <option>Raw Materials</option>
                  <option>APIs</option>
                  <option>Equipment</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>$100K - $500K</option>
                  <option>$500K - $1M</option>
                  <option>$1M - $5M</option>
                  <option>$5M+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance Requirements</h3>
            <p className="text-gray-600 mb-6">Select the regulatory standards and guidelines that apply to this RFP:</p>
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
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{regulation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Localization Settings</h3>
            <p className="text-gray-600 mb-6">Configure multi-language support for global supplier collaboration:</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">RFP Languages</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => toggleLanguage(language)}
                    disabled={language === 'English'}
                    className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                      selectedLanguages.includes(language)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    } ${language === 'English' ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {language}
                    {language === 'English' && <span className="ml-1 text-xs">(Required)</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Enhancement Options</h3>
            <p className="text-gray-600 mb-6">Configure AI-powered features for automated compliance scoring and supplier evaluation:</p>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Automated Compliance Scoring</h4>
                    <p className="text-sm text-gray-600">AI agents will automatically evaluate supplier responses against compliance requirements</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Real-time Risk Analysis</h4>
                    <p className="text-sm text-gray-600">Continuous monitoring and predictive risk assessment for all suppliers</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Document Intelligence</h4>
                    <p className="text-sm text-gray-600">AI-powered document analysis and validation for submitted certifications</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Supplier Recommendation Engine</h4>
                    <p className="text-sm text-gray-600">AI-generated recommendations based on historical performance and compliance scores</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  </div>
                </div>
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
          
          {currentStep < 4 ? (
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