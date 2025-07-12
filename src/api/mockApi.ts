import { 
  Supplier, 
  SupplierMaster,
  ComplianceRequirement,
  ComplianceScore,
  RiskScore,
  AgentStatus, 
  DecisionBreakdown, 
  AuditEvent, 
  Metric, 
  ComplianceData, 
  RecentActivityItem,
  ApiResponse,
  PaginatedResponse 
} from '../types';

// Master supplier data
const supplierMasterData: SupplierMaster[] = [
  {
    id: '1',
    name: 'MedTech Solutions',
    category: 'Packaging Materials',
    region: 'Europe',
    establishedYear: 2010,
    employeeCount: 250,
    annualRevenue: '$50M',
    facilities: ['Germany', 'Netherlands'],
    primaryContact: {
      name: 'Hans Mueller',
      email: 'h.mueller@medtech-solutions.eu',
      phone: '+49-123-456-7890'
    },
    onboardingDate: '2019-03-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'GlobalPack Ltd',
    category: 'Primary Packaging',
    region: 'Europe',
    establishedYear: 2005,
    employeeCount: 180,
    annualRevenue: '$35M',
    facilities: ['UK', 'Ireland'],
    primaryContact: {
      name: 'Sarah Johnson',
      email: 's.johnson@globalpack.co.uk',
      phone: '+44-20-1234-5678'
    },
    onboardingDate: '2020-01-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'ABC Pharma Supply',
    category: 'Raw Materials',
    region: 'North America',
    establishedYear: 2015,
    employeeCount: 120,
    annualRevenue: '$25M',
    facilities: ['USA'],
    primaryContact: {
      name: 'Michael Chen',
      email: 'm.chen@abcpharma.com',
      phone: '+1-555-123-4567'
    },
    onboardingDate: '2021-06-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'European Containers Co',
    category: 'Secondary Packaging',
    region: 'Europe',
    establishedYear: 2008,
    employeeCount: 300,
    annualRevenue: '$75M',
    facilities: ['France', 'Spain', 'Italy'],
    primaryContact: {
      name: 'Marie Dubois',
      email: 'm.dubois@eurocontainers.fr',
      phone: '+33-1-23-45-67-89'
    },
    onboardingDate: '2018-11-25',
    status: 'active'
  }
];

// Compliance requirements mapping
const complianceRequirements: ComplianceRequirement[] = [
  {
    id: 'req-1',
    supplierId: '1',
    category: 'Packaging Materials',
    region: 'Europe',
    requirements: [
      {
        id: 'req-1-1',
        name: 'EU GMP Certification',
        type: 'certification',
        mandatory: true,
        description: 'Good Manufacturing Practice certification for pharmaceutical packaging',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'EMA',
        currentStatus: 'valid',
        expiryDate: '2025-06-15',
        lastVerified: '2024-01-15'
      },
      {
        id: 'req-1-2',
        name: 'ISO 15378 Certification',
        type: 'certification',
        mandatory: true,
        description: 'Primary packaging materials for medicinal products',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'ISO',
        currentStatus: 'valid',
        expiryDate: '2025-09-30',
        lastVerified: '2024-01-10'
      },
      {
        id: 'req-1-3',
        name: 'REACH Compliance',
        type: 'documentation',
        mandatory: true,
        description: 'Registration, Evaluation, Authorisation and Restriction of Chemicals',
        validityPeriod: 12,
        renewalNotice: 60,
        regulatoryBody: 'ECHA',
        currentStatus: 'valid',
        expiryDate: '2024-12-31',
        lastVerified: '2024-01-05'
      }
    ],
    lastUpdated: '2024-01-15'
  }
  // Additional compliance requirements for other suppliers would be added here
];

// Algorithm to calculate compliance score
function calculateComplianceScore(supplierId: string): ComplianceScore {
  const requirements = complianceRequirements.find(req => req.supplierId === supplierId);
  if (!requirements) {
    return {
      overall: 0,
      certifications: 0,
      audits: 50, // Default neutral score
      documentation: 0,
      regulatoryHistory: 80, // Assume good history by default
      status: 'critical',
      trend: 'stable',
      lastCalculated: new Date().toISOString(),
      nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
  }

  // Calculate certification score (40% weight)
  const certRequirements = requirements.requirements.filter(req => req.type === 'certification');
  const validCerts = certRequirements.filter(req => req.currentStatus === 'valid').length;
  const certificationScore = certRequirements.length > 0 ? (validCerts / certRequirements.length) * 100 : 100;

  // Calculate documentation score (20% weight)
  const docRequirements = requirements.requirements.filter(req => req.type === 'documentation');
  const validDocs = docRequirements.filter(req => req.currentStatus === 'valid').length;
  const documentationScore = docRequirements.length > 0 ? (validDocs / docRequirements.length) * 100 : 100;

  // Mock audit score (30% weight) - would come from actual audit data
  const auditScore = supplierId === '1' ? 95 : supplierId === '2' ? 88 : supplierId === '3' ? 70 : 96;

  // Mock regulatory history score (10% weight) - would come from violation history
  const regulatoryHistoryScore = supplierId === '3' ? 65 : 90;

  // Calculate overall score
  const overall = Math.round(
    (certificationScore * 0.4) +
    (auditScore * 0.3) +
    (documentationScore * 0.2) +
    (regulatoryHistoryScore * 0.1)
  );

  // Determine status and trend
  let status: 'compliant' | 'warning' | 'critical';
  if (overall >= 85) status = 'compliant';
  else if (overall >= 70) status = 'warning';
  else status = 'critical';

  const trend = supplierId === '3' ? 'down' : supplierId === '1' ? 'up' : 'stable';

  return {
    overall,
    certifications: Math.round(certificationScore),
    audits: auditScore,
    documentation: Math.round(documentationScore),
    regulatoryHistory: regulatoryHistoryScore,
    status,
    trend,
    lastCalculated: new Date().toISOString(),
    nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };
}

// Algorithm to calculate risk score
function calculateRiskScore(supplierId: string): RiskScore {
  // Mock risk factors - in real implementation, these would come from various data sources
  const riskFactors = {
    '1': { financial: 15, operational: 20, qualityTrend: 10, supplyChain: 25, regulatory: 15 },
    '2': { financial: 25, operational: 30, qualityTrend: 35, supplyChain: 20, regulatory: 20 },
    '3': { financial: 45, operational: 40, qualityTrend: 55, supplyChain: 35, regulatory: 50 },
    '4': { financial: 10, operational: 15, qualityTrend: 8, supplyChain: 12, regulatory: 10 }
  };

  const factors = riskFactors[supplierId as keyof typeof riskFactors] || 
    { financial: 30, operational: 30, qualityTrend: 30, supplyChain: 30, regulatory: 30 };

  // Calculate overall risk score (weighted average)
  const overall = Math.round(
    (factors.financial * 0.25) +
    (factors.operational * 0.25) +
    (factors.qualityTrend * 0.20) +
    (factors.supplyChain * 0.15) +
    (factors.regulatory * 0.15)
  );

  // Determine risk level
  let level: 'low' | 'medium' | 'high';
  if (overall <= 30) level = 'low';
  else if (overall <= 60) level = 'medium';
  else level = 'high';

  // Calculate probability of issues (simplified model)
  const probability = Math.min(overall * 0.8, 95); // Cap at 95%

  const trend = supplierId === '3' ? 'deteriorating' : supplierId === '1' ? 'improving' : 'stable';

  return {
    overall,
    level,
    financial: factors.financial,
    operational: factors.operational,
    qualityTrend: factors.qualityTrend,
    supplyChain: factors.supplyChain,
    regulatory: factors.regulatory,
    probability: Math.round(probability),
    trend,
    lastCalculated: new Date().toISOString(),
    nextAssessment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  };
}

// Function to determine supplier rating based on compliance and risk scores
function determineSupplierRating(complianceScore: ComplianceScore, riskScore: RiskScore): 'preferred' | 'approved' | 'conditional' | 'restricted' {
  if (complianceScore.overall >= 90 && riskScore.level === 'low') return 'preferred';
  if (complianceScore.overall >= 90 && riskScore.level === 'medium') return 'approved';
  if (complianceScore.overall >= 70 && riskScore.level === 'low') return 'approved';
  if (complianceScore.overall >= 70 && riskScore.level === 'medium') return 'conditional';
  if (complianceScore.overall < 70) return 'restricted';
  if (riskScore.level === 'high') return 'conditional';
  return 'conditional';
}

// Mock data - in a real app, this would come from your backend API
function generateMockSuppliers(): Supplier[] {
  return supplierMasterData.map(master => {
    const complianceScore = calculateComplianceScore(master.id);
    const riskScore = calculateRiskScore(master.id);
    const supplierRating = determineSupplierRating(complianceScore, riskScore);
    
    // Get certifications from compliance requirements
    const requirements = complianceRequirements.find(req => req.supplierId === master.id);
    const certifications = requirements?.requirements
      .filter(req => req.type === 'certification' && req.currentStatus === 'valid')
      .map(req => req.name.replace(' Certification', '')) || ['ISO 15378'];
    
    return {
      id: master.id,
      name: master.name,
      category: master.category,
      complianceScore,
      riskScore,
      lastAudit: '2024-01-15', // Would come from audit system
      supplierRating,
      certifications,
      lastUpdated: new Date().toISOString()
    };
  });
}

const mockSuppliers = generateMockSuppliers();

const mockAgents: AgentStatus[] = [
  {
    id: 'compliance-analyzer',
    name: 'EU GMP Compliance Analyzer',
    status: 'active',
    description: 'Analyzing supplier compliance with EU GMP regulations',
    confidence: 94,
    lastUpdate: '2 minutes ago',
    progress: 75
  },
  {
    id: 'risk-assessor',
    name: 'Predictive Risk Assessor',
    status: 'completed',
    description: 'Completed risk analysis for 15 suppliers',
    confidence: 89,
    lastUpdate: '15 minutes ago',
    progress: 100
  },
  {
    id: 'document-validator',
    name: 'Document Validation Engine',
    status: 'warning',
    description: 'Found inconsistencies in supplier documentation',
    confidence: 67,
    lastUpdate: '1 hour ago',
    progress: 60
  }
];

const mockMetrics: Metric[] = [
  {
    id: '1',
    title: 'Critical Alerts',
    value: '3',
    change: '-2 from yesterday',
    trend: 'down',
    icon: 'AlertTriangle',
    color: 'red',
    category: 'compliance'
  },
  {
    id: '2',
    title: 'Compliant Suppliers',
    value: '847',
    change: '+12 this week',
    trend: 'up',
    icon: 'CheckCircle',
    color: 'green',
    category: 'compliance'
  },
  {
    id: '3',
    title: 'Pending Reviews',
    value: '24',
    change: '+5 since yesterday',
    trend: 'up',
    icon: 'Clock',
    color: 'yellow',
    category: 'compliance'
  },
  {
    id: '4',
    title: 'Avg. Compliance Score',
    value: '92.3%',
    change: '+1.2% this month',
    trend: 'up',
    icon: 'TrendingUp',
    color: 'blue',
    category: 'compliance'
  }
];

// API simulation delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const supplierApi = {
  async getSuppliers(): Promise<ApiResponse<Supplier[]>> {
    await delay(500);
    return {
      data: mockSuppliers,
      timestamp: new Date().toISOString()
    };
  },

  async getSupplier(id: string): Promise<ApiResponse<Supplier>> {
    await delay(300);
    const supplier = mockSuppliers.find(s => s.id === id);
    if (!supplier) {
      throw new Error(`Supplier with id ${id} not found`);
    }
    return {
      data: supplier,
      timestamp: new Date().toISOString()
    };
  },

  async updateSupplier(id: string, updates: Partial<Supplier>): Promise<ApiResponse<Supplier>> {
    await delay(400);
    const supplierIndex = mockSuppliers.findIndex(s => s.id === id);
    if (supplierIndex === -1) {
      throw new Error(`Supplier with id ${id} not found`);
    }
    mockSuppliers[supplierIndex] = { ...mockSuppliers[supplierIndex], ...updates };
    return {
      data: mockSuppliers[supplierIndex],
      timestamp: new Date().toISOString()
    };
  }
};

export const agentApi = {
  async getAgents(): Promise<ApiResponse<AgentStatus[]>> {
    await delay(400);
    return {
      data: mockAgents,
      timestamp: new Date().toISOString()
    };
  },

  async getAgent(id: string): Promise<ApiResponse<AgentStatus>> {
    await delay(300);
    const agent = mockAgents.find(a => a.id === id);
    if (!agent) {
      throw new Error(`Agent with id ${id} not found`);
    }
    return {
      data: agent,
      timestamp: new Date().toISOString()
    };
  }
};

export const metricsApi = {
  async getMetrics(): Promise<ApiResponse<Metric[]>> {
    await delay(300);
    return {
      data: mockMetrics,
      timestamp: new Date().toISOString()
    };
  },

  async getComplianceData(): Promise<ApiResponse<ComplianceData[]>> {
    await delay(400);
    const data = [
      { month: 'Jan', compliant: 85, warning: 12, critical: 3 },
      { month: 'Feb', compliant: 88, warning: 10, critical: 2 },
      { month: 'Mar', compliant: 90, warning: 8, critical: 2 },
      { month: 'Apr', compliant: 87, warning: 11, critical: 2 },
      { month: 'May', compliant: 92, warning: 6, critical: 2 },
      { month: 'Jun', compliant: 94, warning: 5, critical: 1 }
    ];
    return {
      data,
      timestamp: new Date().toISOString()
    };
  }
};

export const auditApi = {
  async getAuditEvents(page = 1, pageSize = 20): Promise<PaginatedResponse<AuditEvent>> {
    await delay(500);
    const mockEvents: AuditEvent[] = [
      {
        id: '1',
        timestamp: '2024-01-25T10:30:00Z',
        type: 'compliance_check',
        description: 'Automated compliance check completed for MedTech Solutions',
        supplierId: '1',
        supplierName: 'MedTech Solutions',
        severity: 'low',
        status: 'completed'
      },
      {
        id: '2',
        timestamp: '2024-01-25T09:15:00Z',
        type: 'alert',
        description: 'Warning: ABC Pharma Supply compliance score dropped below threshold',
        supplierId: '3',
        supplierName: 'ABC Pharma Supply',
        severity: 'medium',
        status: 'pending'
      },
      {
        id: '3',
        timestamp: '2024-01-24T16:45:00Z',
        type: 'document_upload',
        description: 'New certification documents uploaded by GlobalPack Ltd',
        supplierId: '2',
        supplierName: 'GlobalPack Ltd',
        severity: 'low',
        status: 'completed'
      }
    ];

    return {
      data: mockEvents,
      total: mockEvents.length,
      page,
      pageSize,
      hasNext: false
    };
  }
};

export const activityApi = {
  async getRecentActivity(): Promise<ApiResponse<RecentActivityItem[]>> {
    await delay(300);
    const activities: RecentActivityItem[] = [
      {
        id: '1',
        type: 'alert',
        title: 'Compliance Alert',
        description: 'ABC Pharma Supply requires immediate attention',
        timestamp: '2024-01-25T10:30:00Z',
        supplierId: '3',
        priority: 'high'
      },
      {
        id: '2',
        type: 'approval',
        title: 'Certificate Approved',
        description: 'EU GMP certification approved for MedTech Solutions',
        timestamp: '2024-01-25T09:15:00Z',
        supplierId: '1',
        priority: 'medium'
      },
      {
        id: '3',
        type: 'update',
        title: 'Score Updated',
        description: 'GlobalPack Ltd sustainability score improved to 86%',
        timestamp: '2024-01-24T16:45:00Z',
        supplierId: '2',
        priority: 'low'
      }
    ];

    return {
      data: activities,
      timestamp: new Date().toISOString()
    };
  }
};