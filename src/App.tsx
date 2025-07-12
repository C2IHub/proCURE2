import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AgentReasoning from './pages/AgentReasoning';
import ComplianceCommandCenter from './pages/ComplianceCommandCenter';
import RFPWizard from './pages/RFPWizard';
import SupplierScoring from './pages/SupplierScoring';
import RiskMitigation from './pages/RiskMitigation';
import SupplierPortal from './pages/SupplierPortal';
import AuditTrail from './pages/AuditTrail';

function App() {
  const [currentUser] = useState({
    name: 'Sarah Chen',
    role: 'Compliance Manager',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentUser={currentUser} />
        <main className="pl-64">
          <Routes>
            <Route path="/" element={<ComplianceCommandCenter />} />
            <Route path="/rfp-wizard" element={<RFPWizard />} />
            <Route path="/supplier-scoring" element={<SupplierScoring />} />
            <Route path="/risk-mitigation" element={<RiskMitigation />} />
            <Route path="/supplier-portal" element={<SupplierPortal />} />
            <Route path="/audit-trail" element={<AuditTrail />} />
            <Route path="/supplier/:id/reasoning" element={<AgentReasoning />} />
          </Routes>
        </main>
      </div>
      {/* Agent reasoning and supplier portal are now accessed via supplier analytics */}
    </Router>
  );
}

export default App;