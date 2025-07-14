import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Send, CheckCircle, ArrowRight, FileText, Users, Download, Eye, Loader, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSuppliers } from '../hooks/useApi';
import { useComplianceAgent } from '../context/BedrockAgentProvider';

interface ChatMessage {
  id: string;
  type: 'agent' | 'user';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface RFPData {
  projectName?: string;
  categories?: string[];
  markets?: string[];
  budget?: string;
  deadline?: string;
  description?: string;
  regulations?: string[];
  generatedContent?: string;
  artifacts?: any[];
}

export default function RFPWizard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [rfpData, setRfpData] = useState<RFPData>({});
  const [showQuickOptions, setShowQuickOptions] = useState(true);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const { data: suppliers = [] } = useSuppliers();
  const complianceAgent = useComplianceAgent();

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome-1',
      type: 'agent',
      content: `# Welcome to AI-Powered RFP Generation! 🚀

I'm your AI procurement assistant, and I'll help you create a comprehensive, compliance-ready RFP in minutes instead of hours.

I'll guide you through a few simple questions to understand your needs, then generate:
- **Technical specifications** tailored to your requirements
- **Compliance checklists** for your target markets
- **Evaluation matrices** with weighted criteria
- **Supplier recommendations** based on our database

**Ready to get started?** Tell me about your procurement project, or choose from these common scenarios:`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const quickStartOptions = [
    {
      id: 'packaging',
      title: 'Primary Packaging Materials',
      description: 'Bottles, vials, syringes for pharmaceutical products',
      icon: '📦'
    },
    {
      id: 'api',
      title: 'API Manufacturing',
      description: 'Active pharmaceutical ingredient production',
      icon: '⚗️'
    },
    {
      id: 'equipment',
      title: 'Manufacturing Equipment',
      description: 'Production machinery and quality control equipment',
      icon: '🏭'
    },
    {
      id: 'testing',
      title: 'Testing & Validation Services',
      description: 'Quality control and compliance testing',
      icon: '🔬'
    }
  ];

  const handleQuickStart = async (option: any) => {
    setShowQuickOptions(false);
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: `I need help with ${option.title} - ${option.description}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Set initial data based on selection
    const categoryMap: Record<string, string[]> = {
      'packaging': ['Primary Packaging'],
      'api': ['APIs', 'Raw Materials'],
      'equipment': ['Equipment'],
      'testing': ['Testing Services']
    };

    setRfpData(prev => ({
      ...prev,
      categories: categoryMap[option.id] || []
    }));

    await processAgentResponse(`The user wants to create an RFP for ${option.title}. Ask them about their specific project details like budget range, timeline, and target markets.`);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    await processAgentResponse(message);
  };

  const processAgentResponse = async (userInput: string) => {
    setIsProcessing(true);
    
    const loadingMessage: ChatMessage = {
      id: `agent-${Date.now()}`,
      type: 'agent',
      content: '',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Determine what information we still need
      const missingInfo = [];
      if (!rfpData.projectName) missingInfo.push('project name');
      if (!rfpData.budget) missingInfo.push('budget range');
      if (!rfpData.deadline) missingInfo.push('timeline/deadline');
      if (!rfpData.markets || rfpData.markets.length === 0) missingInfo.push('target markets');
      if (!rfpData.categories || rfpData.categories.length === 0) missingInfo.push('categories');

      let prompt = '';
      let nextStep = '';

      if (missingInfo.length > 0) {
        // Still gathering information
        prompt = `The user said: "${userInput}". 
        
Current RFP data: ${JSON.stringify(rfpData)}
Missing information: ${missingInfo.join(', ')}

Extract any relevant information from their message and ask for the next most important missing piece of information. Be conversational and helpful. If they provided project details, acknowledge them and ask for the next piece.

Keep responses concise and focused on one question at a time.`;
        nextStep = 'gathering';
      } else {
        // Ready to generate RFP
        prompt = `Generate a comprehensive RFP based on this information:
${JSON.stringify(rfpData)}

Create a professional RFP document with sections for technical specifications, compliance requirements, and evaluation criteria.`;
        nextStep = 'generation';
      }

      const response = await complianceAgent.invoke({
        prompt,
        sessionId: `rfp-wizard-${Date.now()}`,
        context: { rfpData, userInput, step: nextStep }
      });

      // Extract any data from the user's input
      extractDataFromInput(userInput);

      // Update the loading message with the response
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: response.response, isLoading: false }
          : msg
      ));

      // Check if we should move to next step
      if (nextStep === 'generation' && missingInfo.length === 0) {
        setCurrentStep('generated');
        // Generate RFP artifacts
        generateRFPArtifacts();
      }

    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: 'I encountered an error. Please try again.', isLoading: false }
          : msg
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const extractDataFromInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Extract budget
    if (lowerInput.includes('budget') || lowerInput.includes('$')) {
      if (lowerInput.includes('100k') || lowerInput.includes('500k')) {
        setRfpData(prev => ({ ...prev, budget: '$100K - $500K' }));
      } else if (lowerInput.includes('1m') || lowerInput.includes('million')) {
        setRfpData(prev => ({ ...prev, budget: '$500K - $1M' }));
      }
    }

    // Extract markets
    const markets = [];
    if (lowerInput.includes('europe') || lowerInput.includes('eu')) markets.push('Europe');
    if (lowerInput.includes('us') || lowerInput.includes('america') || lowerInput.includes('fda')) markets.push('North America');
    if (lowerInput.includes('asia') || lowerInput.includes('japan') || lowerInput.includes('china')) markets.push('Asia Pacific');
    
    if (markets.length > 0) {
      setRfpData(prev => ({ ...prev, markets }));
    }

    // Extract timeline
    if (lowerInput.includes('month') || lowerInput.includes('week') || lowerInput.includes('2024') || lowerInput.includes('2025')) {
      const timelineMatch = input.match(/(\d+)\s*(month|week|day)/i);
      if (timelineMatch) {
        const deadline = new Date();
        const amount = parseInt(timelineMatch[1]);
        const unit = timelineMatch[2].toLowerCase();
        
        if (unit === 'month') deadline.setMonth(deadline.getMonth() + amount);
        else if (unit === 'week') deadline.setDate(deadline.getDate() + (amount * 7));
        else if (unit === 'day') deadline.setDate(deadline.getDate() + amount);
        
        setRfpData(prev => ({ ...prev, deadline: deadline.toISOString().split('T')[0] }));
      }
    }

    // Extract project name (simple heuristic)
    if (input.length < 100 && !lowerInput.includes('budget') && !lowerInput.includes('need')) {
      const words = input.split(' ');
      if (words.length <= 8 && words.length >= 2) {
        setRfpData(prev => ({ ...prev, projectName: input }));
      }
    }
  };

  const generateRFPArtifacts = () => {
    const artifacts = [
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
        name: 'Supplier Recommendations',
        type: 'PDF',
        description: 'AI-recommended suppliers based on requirements',
        generated: true
      }
    ];

    setRfpData(prev => ({ ...prev, artifacts }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const sendRFP = () => {
    alert(`RFP "${rfpData.projectName || 'Pharmaceutical Procurement RFP'}" sent to ${selectedSuppliers.length} suppliers!`);
    navigate('/rfp-tracker');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI RFP Generator</h1>
        <p className="text-gray-600">Let AI create your pharmaceutical RFP in minutes with intelligent compliance requirements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-xl">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI RFP Assistant</h3>
                  <div className="flex items-center text-sm text-purple-600">
                    <Sparkles className="h-3 w-3 mr-1" />
                    <span>Powered by Advanced AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="flex items-center">
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                        <span>Thinking...</span>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick Start Options */}
              {showQuickOptions && (
                <div className="space-y-3">
                  {quickStartOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleQuickStart(option)}
                      className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{option.title}</h4>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-blue-600 ml-auto" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tell me about your procurement needs..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                    rows={2}
                    disabled={isProcessing}
                  />
                </div>
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isProcessing}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress & Actions */}
        <div className="space-y-6">
          {/* Current Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">RFP Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Project Details</span>
                <CheckCircle className={`h-4 w-4 ${rfpData.projectName ? 'text-green-600' : 'text-gray-300'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Categories</span>
                <CheckCircle className={`h-4 w-4 ${rfpData.categories?.length ? 'text-green-600' : 'text-gray-300'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Target Markets</span>
                <CheckCircle className={`h-4 w-4 ${rfpData.markets?.length ? 'text-green-600' : 'text-gray-300'}`} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Budget & Timeline</span>
                <CheckCircle className={`h-4 w-4 ${rfpData.budget && rfpData.deadline ? 'text-green-600' : 'text-gray-300'}`} />
              </div>
            </div>
          </div>

          {/* Generated Artifacts */}
          {rfpData.artifacts && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Documents</h3>
              <div className="space-y-3">
                {rfpData.artifacts.map((artifact) => (
                  <div key={artifact.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{artifact.name}</p>
                        <p className="text-xs text-gray-600">{artifact.type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {currentStep === 'generated' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentStep('supplier-selection')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  <Users className="h-4 w-4 mr-2 inline" />
                  Select Suppliers
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                  <Eye className="h-4 w-4 mr-2 inline" />
                  Preview RFP
                </button>
              </div>
            </div>
          )}

          {/* Supplier Selection */}
          {currentStep === 'supplier-selection' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommended Suppliers</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {suppliers
                  .filter(s => rfpData.categories?.includes(s.category))
                  .slice(0, 6)
                  .map((supplier) => (
                    <div
                      key={supplier.id}
                      onClick={() => setSelectedSuppliers(prev => 
                        prev.includes(supplier.id) 
                          ? prev.filter(id => id !== supplier.id)
                          : [...prev, supplier.id]
                      )}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedSuppliers.includes(supplier.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                          <p className="text-xs text-gray-600">{supplier.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-green-600">{supplier.complianceScore.overall}%</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              
              {selectedSuppliers.length > 0 && (
                <button
                  onClick={sendRFP}
                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  <Send className="h-4 w-4 mr-2 inline" />
                  Send RFP to {selectedSuppliers.length} Suppliers
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}