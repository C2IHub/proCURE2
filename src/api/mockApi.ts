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
import { masterSuppliers, getSupplierById } from '../data/masterSuppliers';


// Compliance requirements mapping
const complianceRequirements: ComplianceRequirement[] = [
  {
    id: 'req-SUP001',
    supplierId: 'SUP001',
    category: 'Primary Packaging',
    region: 'Europe',
    requirements: [
      {
        id: 'req-SUP001-1',
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
        id: 'req-SUP001-2',
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
        id: 'req-SUP001-3',
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
  // Additional compliance requirements would be added for other suppliers
  // For now, we'll generate them dynamically in the calculation functions
];

// Generate compliance requirements for all suppliers
function generateComplianceRequirements(): ComplianceRequirement[] {
  const allRequirements: ComplianceRequirement[] = [...complianceRequirements];
  
  masterSuppliers.forEach(supplier => {
    // Skip if already exists
    if (allRequirements.find(req => req.supplierId === supplier.id)) {
      return;
    }
    
    const baseRequirements = getBaseRequirementsByCategory(supplier.category);
    const regionSpecificRequirements = getRegionSpecificRequirements(supplier.region);
    
    allRequirements.push({
      id: `req-${supplier.id}`,
      supplierId: supplier.id,
      category: supplier.category,
      region: supplier.region,
      requirements: [...baseRequirements, ...regionSpecificRequirements],
      lastUpdated: new Date().toISOString()
    });
  });
  
  return allRequirements;
}

function getBaseRequirementsByCategory(category: string) {
  const baseRequirements = {
    'Primary Packaging': [
      {
        id: 'base-1',
        name: 'EU GMP Certification',
        type: 'certification' as const,
        mandatory: true,
        description: 'Good Manufacturing Practice certification for pharmaceutical packaging',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'EMA',
        currentStatus: 'valid' as const,
        expiryDate: '2025-06-15',
        lastVerified: '2024-01-15'
      },
      {
        id: 'base-2',
        name: 'ISO 15378 Certification',
        type: 'certification' as const,
        mandatory: true,
        description: 'Primary packaging materials for medicinal products',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'ISO',
        currentStatus: 'valid' as const,
        expiryDate: '2025-09-30',
        lastVerified: '2024-01-10'
      }
    ],
    'Secondary Packaging': [
      {
        id: 'base-3',
        name: 'EU Packaging Directive Compliance',
        type: 'documentation' as const,
        mandatory: true,
        description: 'Compliance with EU Directive 94/62/EC',
        validityPeriod: 12,
        renewalNotice: 60,
        regulatoryBody: 'EU Commission',
        currentStatus: 'valid' as const,
        expiryDate: '2024-12-31',
        lastVerified: '2024-01-05'
      }
    ],
    'APIs': [
      {
        id: 'base-4',
        name: 'FDA Drug Master File',
        type: 'documentation' as const,
        mandatory: true,
        description: 'FDA Drug Master File for API manufacturing',
        validityPeriod: 60,
        renewalNotice: 180,
        regulatoryBody: 'FDA',
        currentStatus: 'valid' as const,
        expiryDate: '2026-01-15',
        lastVerified: '2024-01-01'
      }
    ],
    'Raw Materials': [
      {
        id: 'base-5',
        name: 'REACH Registration',
        type: 'documentation' as const,
        mandatory: true,
        description: 'Registration under REACH regulation',
        validityPeriod: 12,
        renewalNotice: 60,
        regulatoryBody: 'ECHA',
        currentStatus: 'valid' as const,
        expiryDate: '2024-12-31',
        lastVerified: '2024-01-05'
      }
    ]
  };
  
  return baseRequirements[category as keyof typeof baseRequirements] || [];
}

function getRegionSpecificRequirements(region: string) {
  // Add region-specific requirements based on regulatory landscape
  const regionRequirements = {
    'North America': [],
    'Europe': [],
    'Asia Pacific': [],
    'South America': []
  };
  
  return regionRequirements[region as keyof typeof regionRequirements] || [];
}

// Get all compliance requirements (generated dynamically)
const allComplianceRequirements = generateComplianceRequirements();

  // Additional compliance requirements for other suppliers would be added here
];

// Algorithm to calculate compliance score
function calculateComplianceScore(supplierId: string): ComplianceScore {
  const requirements = allComplianceRequirements.find(req => req.supplierId === supplierId);
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
  const auditScore = getAuditScoreForSupplier(supplierId);

  // Mock regulatory history score (10% weight) - would come from violation history
  const regulatoryHistoryScore = getRegulatoryHistoryScore(supplierId);

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

  const trend = getTrendForSupplier(supplierId);

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

function getAuditScoreForSupplier(supplierId: string): number {
  // Generate realistic audit scores based on supplier characteristics
  const supplier = getSupplierById(supplierId);
  if (!supplier) return 75;
  
  // Base score influenced by establishment year and employee count
  const baseScore = 70 + (supplier.employeeCount > 200 ? 15 : supplier.employeeCount > 100 ? 10 : 5);
  const ageBonus = Math.min((2024 - supplier.establishedYear) * 2, 15);
  
  return Math.min(baseScore + ageBonus + Math.floor(Math.random() * 10), 100);
}

function getRegulatoryHistoryScore(supplierId: string): number {
  // Generate regulatory history scores
  const supplier = getSupplierById(supplierId);
  if (!supplier) return 80;
  
  return supplier.name.includes('ABC') ? 65 : 85 + Math.floor(Math.random() * 10);
}

function getTrendForSupplier(supplierId: string): 'up' | 'down' | 'stable' {
  const supplier = getSupplierById(supplierId);
  if (!supplier) return 'stable';
  
  return supplier.name.includes('ABC') ? 'down' : 
         supplier.establishedYear > 2015 ? 'up' : 'stable';
}

// Algorithm to calculate risk score
function calculateRiskScore(supplierId: string): RiskScore {
  const supplier = getSupplierById(supplierId);
  if (!supplier) {
    return getDefaultRiskScore();
  }
  
  // Mock risk factors - in real implementation, these would come from various data sources
  const factors = calculateRiskFactors(supplier);

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

  const trend = getRiskTrendForSupplier(supplier);

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

function calculateRiskFactors(supplier: SupplierMaster) {
  // Calculate risk factors based on supplier characteristics
  const baseRisk = 20;
  
  // Financial risk based on company size and revenue
  const financialRisk = supplier.employeeCount < 100 ? baseRisk + 20 : 
                       supplier.employeeCount < 200 ? baseRisk + 10 : baseRisk;
  
  // Operational risk based on facilities and geographic spread
  const operationalRisk = supplier.facilities.length === 1 ? baseRisk + 25 : 
                         supplier.facilities.length === 2 ? baseRisk + 15 : baseRisk;
  
  // Quality trend risk based on establishment year and category
  const qualityRisk = supplier.establishedYear > 2015 ? baseRisk + 15 : 
                     supplier.establishedYear > 2010 ? baseRisk + 5 : baseRisk;
  
  // Supply chain risk based on region and facilities
  const supplyChainRisk = supplier.region === 'Asia Pacific' ? baseRisk + 10 : 
                         supplier.facilities.length === 1 ? baseRisk + 20 : baseRisk;
  
  // Regulatory risk based on category and region
  const regulatoryRisk = supplier.category === 'APIs' ? baseRisk + 15 : 
                        supplier.region === 'Asia Pacific' ? baseRisk + 10 : baseRisk;
  
  // Add some randomness for realism
  return {
    financial: Math.min(financialRisk + Math.floor(Math.random() * 10), 80),
    operational: Math.min(operationalRisk + Math.floor(Math.random() * 10), 80),
    qualityTrend: Math.min(qualityRisk + Math.floor(Math.random() * 10), 80),
    supplyChain: Math.min(supplyChainRisk + Math.floor(Math.random() * 10), 80),
    regulatory: Math.min(regulatoryRisk + Math.floor(Math.random() * 10), 80)
  };
}

function getRiskTrendForSupplier(supplier: SupplierMaster): 'improving' | 'stable' | 'deteriorating' {
  if (supplier.name.includes('ABC')) return 'deteriorating';
  if (supplier.establishedYear > 2015) return 'improving';
  return 'stable';
}

function getDefaultRiskScore(): RiskScore {
  return {
    overall: 50,
    level: 'medium',
    financial: 50,
    operational: 50,
    qualityTrend: 50,
    supplyChain: 50,
    regulatory: 50,
    probability: 40,
    trend: 'stable',
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
  return masterSuppliers.slice(0, 10).map(master => { // Use first 10 for demo
    const complianceScore = calculateComplianceScore(master.id);
    const riskScore = calculateRiskScore(master.id);
    const supplierRating = determineSupplierRating(complianceScore, riskScore);
    
    // Get certifications from compliance requirements
    const requirements = allComplianceRequirements.find(req => req.supplierId === master.id);
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

// New API endpoints for master supplier management
export const masterSupplierApi = {
  async getMasterSuppliers(): Promise<ApiResponse<SupplierMaster[]>> {
    await delay(300);
    return {
      data: masterSuppliers,
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