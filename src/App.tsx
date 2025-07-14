import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import AgenticInterface from './components/AgenticInterface';
import AgentReasoning from './pages/AgentReasoning';
import ComplianceCommandCenter from './pages/ComplianceCommandCenter';
import RFPWizard from './pages/RFPWizard';
import RFPTracker from './pages/RFPTracker';
import SupplierScoring from './pages/SupplierScoring';
import RiskMitigation from './pages/RiskMitigation';
import SupplierPortal from './pages/SupplierPortal';
import AuditTrail from './pages/AuditTrail';
import { BedrockAgentProvider } from './context/BedrockAgentProvider';
import { SupplierProvider } from './hooks/useSupplierContext';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const [currentUser] = useState({
    name: 'Sarah Chen',
    role: 'Compliance Manager',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BedrockAgentProvider>
        <SupplierProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navigation currentUser={currentUser} />
              <main className="pl-64 pr-96">
                <Routes>
                  <Route path="/" element={<ComplianceCommandCenter />} />
                  <Route path="/rfp-wizard" element={<RFPWizard />} />
                  <Route path="/rfp-tracker" element={<RFPTracker />} />
                  <Route path="/supplier-scoring" element={<SupplierScoring />} />
                  <Route path="/risk-mitigation" element={<RiskMitigation />} />
                  <Route path="/audit-trail" element={<AuditTrail />} />
                  {/* Dynamic supplier routes */}
                  <Route path="/supplier/:id/reasoning" element={<AgentReasoning />} />
                  <Route path="/supplier/:id/portal" element={<SupplierPortal />} />
                </Routes>
              </main>
              <AgenticInterface 
                context="global"
                contextData={{}}
              />
            </div>
          </Router>
        </SupplierProvider>
      </BedrockAgentProvider>
    </QueryClientProvider>
  );
}

export default App;