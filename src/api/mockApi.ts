import { 
  Supplier, 
  AgentStatus, 
  DecisionBreakdown, 
  AuditEvent, 
  Metric, 
  ComplianceData, 
  RecentActivityItem,
  ApiResponse,
  PaginatedResponse 
} from '../types';

// Mock data - in a real app, this would come from your backend API
const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'MedTech Solutions',
    category: 'Packaging Materials',
    overallScore: 92,
    compliance: { score: 95, trend: 'up', status: 'compliant' },
    quality: { score: 88, trend: 'stable', status: 'good' },
    sustainability: { score: 94, trend: 'up', status: 'excellent' },
    lastAudit: '2024-01-15',
    riskLevel: 'low',
    certifications: ['EU GMP', 'FDA', 'ISO 15378']
  },
  {
    id: '2',
    name: 'GlobalPack Ltd',
    category: 'Primary Packaging',
    overallScore: 87,
    compliance: { score: 90, trend: 'up', status: 'compliant' },
    quality: { score: 85, trend: 'down', status: 'good' },
    sustainability: { score: 86, trend: 'stable', status: 'good' },
    lastAudit: '2024-01-20',
    riskLevel: 'low',
    certifications: ['EU GMP', 'ISO 15378']
  },
  {
    id: '3',
    name: 'ABC Pharma Supply',
    category: 'Raw Materials',
    overallScore: 73,
    compliance: { score: 68, trend: 'down', status: 'warning' },
    quality: { score: 78, trend: 'stable', status: 'good' },
    sustainability: { score: 75, trend: 'up', status: 'good' },
    lastAudit: '2024-01-10',
    riskLevel: 'medium',
    certifications: ['ISO 15378']
  },
  {
    id: '4',
    name: 'European Containers Co',
    category: 'Secondary Packaging',
    overallScore: 96,
    compliance: { score: 98, trend: 'up', status: 'compliant' },
    quality: { score: 95, trend: 'up', status: 'excellent' },
    sustainability: { score: 94, trend: 'stable', status: 'excellent' },
    lastAudit: '2024-01-25',
    riskLevel: 'low',
    certifications: ['EU GMP', 'FDA', 'ISO 15378', 'ISO 14001']
  }
];

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