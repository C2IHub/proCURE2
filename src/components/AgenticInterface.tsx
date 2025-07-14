import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, Brain, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { useComplianceAgent, useRiskAgent, useDocumentAgent } from '../context/BedrockAgentProvider';

interface AgenticInterfaceProps {
  context: string; // e.g., 'compliance', 'risk', 'rfp', 'supplier', 'audit'
  contextData?: any; // Additional context data like supplier info, RFP data, etc.
  suggestedQuestions?: string[];
  className?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export default function AgenticInterface({ 
  context, 
  contextData, 
  suggestedQuestions = [], 
  className = '' 
}: AgenticInterfaceProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const complianceAgent = useComplianceAgent();
  const riskAgent = useRiskAgent();
  const documentAgent = useDocumentAgent();

  // Default suggested questions based on context
  const defaultSuggestedQuestions = {
    compliance: [
      "What's the overall compliance status?",
      "Which suppliers need immediate attention?",
      "Show me upcoming certification renewals",
      "Analyze compliance trends this quarter"
    ],
    risk: [
      "What are the highest risk suppliers?",
      "Show me emerging risk patterns",
      "What mitigation strategies do you recommend?",
      "Analyze supply chain vulnerabilities"
    ],
    rfp: [
      "Help me create an RFP for packaging materials",
      "What compliance requirements should I include?",
      "Suggest evaluation criteria for suppliers",
      "Show me similar past RFPs"
    ],
    supplier: [
      "Analyze this supplier's performance",
      "What are the key risk factors?",
      "Compare with industry benchmarks",
      "Recommend next steps for improvement"
    ],
    audit: [
      "Show me recent compliance violations",
      "What patterns do you see in audit findings?",
      "Generate an audit summary report",
      "Identify areas needing attention"
    ],
    tracker: [
      "Show me overdue RFPs",
      "What's the average response time?",
      "Which RFPs need follow-up?",
      "Analyze RFP success rates"
    ],
    scoring: [
      "Rank suppliers by performance",
      "What factors drive supplier scores?",
      "Show me improvement opportunities",
      "Compare supplier categories"
    ],
    portal: [
      "What documents need updating?",
      "Show compliance status summary",
      "What are the next deadlines?",
      "Help with document submission"
    ]
  };

  const questions = suggestedQuestions.length > 0 
    ? suggestedQuestions 
    : defaultSuggestedQuestions[context as keyof typeof defaultSuggestedQuestions] || [];

  const getAgentForContext = () => {
    switch (context) {
      case 'compliance':
      case 'supplier':
      case 'portal':
        return complianceAgent;
      case 'risk':
        return riskAgent;
      case 'audit':
      case 'rfp':
      case 'tracker':
      case 'scoring':
        return documentAgent;
      default:
        return complianceAgent;
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    const loadingMessage: ChatMessage = {
      id: `agent-${Date.now()}`,
      type: 'agent',
      content: '',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputValue('');
    setIsProcessing(true);

    try {
      const agent = getAgentForContext();
      const contextPrompt = buildContextPrompt(message);
      
      const response = await agent.invoke({
        prompt: contextPrompt,
        sessionId: `${context}-${Date.now()}`,
        context: contextData
      });

      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: response.response, isLoading: false }
          : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: 'Sorry, I encountered an error. Please try again.', isLoading: false }
          : msg
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const buildContextPrompt = (userMessage: string) => {
    let contextInfo = `Context: ${context.toUpperCase()} screen\n`;
    
    if (contextData) {
      if (contextData.supplierName) {
        contextInfo += `Supplier: ${contextData.supplierName}\n`;
      }
      if (contextData.category) {
        contextInfo += `Category: ${contextData.category}\n`;
      }
      if (contextData.rfpTitle) {
        contextInfo += `RFP: ${contextData.rfpTitle}\n`;
      }
    }
    
    return `${contextInfo}\nUser Question: ${userMessage}\n\nPlease provide a helpful response based on the context and available data.`;
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div 
        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg mr-3">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-gray-600">Ask anything about your {context} data</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-purple-600">
              <Sparkles className="h-4 w-4 mr-1" />
              <span>Powered by AI</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Suggested Questions (Always Visible) */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Questions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {questions.slice(0, 4).map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="text-left p-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors text-sm text-gray-700 hover:text-purple-700 border border-transparent hover:border-purple-200"
            >
              <MessageSquare className="h-4 w-4 inline mr-2 text-gray-400" />
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Chat Messages */}
          {messages.length > 0 && (
            <div className="p-4 max-h-96 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-purple-600 text-white'
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
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your data..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
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
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </div>
  );
}