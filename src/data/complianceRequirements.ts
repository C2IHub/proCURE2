import { ComplianceRequirement } from '../types';

// Comprehensive compliance requirements mapping for pharmaceutical and medtech suppliers
export const complianceRequirementsMapping: ComplianceRequirement[] = [
  // Primary Packaging Suppliers
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
      },
      {
        id: 'req-SUP001-4',
        name: 'USP <661> Compliance',
        type: 'documentation',
        mandatory: true,
        description: 'Plastic materials and components for pharmaceutical use',
        validityPeriod: 24,
        renewalNotice: 60,
        regulatoryBody: 'USP',
        currentStatus: 'valid',
        expiryDate: '2025-01-15',
        lastVerified: '2024-01-01'
      }
    ],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'req-SUP002',
    supplierId: 'SUP002',
    category: 'Primary Packaging',
    region: 'Europe',
    requirements: [
      {
        id: 'req-SUP002-1',
        name: 'EU GMP Certification',
        type: 'certification',
        mandatory: true,
        description: 'Good Manufacturing Practice certification for pharmaceutical packaging',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'EMA',
        currentStatus: 'expiring',
        expiryDate: '2024-03-15',
        lastVerified: '2023-12-01'
      },
      {
        id: 'req-SUP002-2',
        name: 'ISO 15378 Certification',
        type: 'certification',
        mandatory: true,
        description: 'Primary packaging materials for medicinal products',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'ISO',
        currentStatus: 'valid',
        expiryDate: '2025-08-20',
        lastVerified: '2024-01-05'
      },
      {
        id: 'req-SUP002-3',
        name: 'MHRA Registration',
        type: 'certification',
        mandatory: true,
        description: 'UK Medicines and Healthcare products Regulatory Agency registration',
        validityPeriod: 24,
        renewalNotice: 60,
        regulatoryBody: 'MHRA',
        currentStatus: 'valid',
        expiryDate: '2025-01-20',
        lastVerified: '2024-01-01'
      }
    ],
    lastUpdated: '2024-01-20'
  },
  {
    id: 'req-SUP003',
    supplierId: 'SUP003',
    category: 'Primary Packaging',
    region: 'North America',
    requirements: [
      {
        id: 'req-SUP003-1',
        name: 'FDA Registration',
        type: 'certification',
        mandatory: true,
        description: 'FDA facility registration for pharmaceutical packaging',
        validityPeriod: 24,
        renewalNotice: 90,
        regulatoryBody: 'FDA',
        currentStatus: 'valid',
        expiryDate: '2025-09-10',
        lastVerified: '2024-01-10'
      },
      {
        id: 'req-SUP003-2',
        name: 'ISO 15378 Certification',
        type: 'certification',
        mandatory: true,
        description: 'Primary packaging materials for medicinal products',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'ISO',
        currentStatus: 'valid',
        expiryDate: '2025-12-01',
        lastVerified: '2024-01-08'
      },
      {
        id: 'req-SUP003-3',
        name: 'Health Canada License',
        type: 'certification',
        mandatory: true,
        description: 'Health Canada medical device license',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'Health Canada',
        currentStatus: 'valid',
        expiryDate: '2026-06-15',
        lastVerified: '2024-01-05'
      }
    ],
    lastUpdated: '2024-01-10'
  },

  // API Suppliers
  {
    id: 'req-SUP010',
    supplierId: 'SUP010',
    category: 'APIs',
    region: 'Europe',
    requirements: [
      {
        id: 'req-SUP010-1',
        name: 'EU GMP Certification',
        type: 'certification',
        mandatory: true,
        description: 'Good Manufacturing Practice for Active Pharmaceutical Ingredients',
        validityPeriod: 36,
        renewalNotice: 120,
        regulatoryBody: 'EMA',
        currentStatus: 'valid',
        expiryDate: '2025-01-15',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP010-2',
        name: 'CEP Certificate',
        type: 'certification',
        mandatory: true,
        description: 'Certificate of Suitability to the European Pharmacopoeia',
        validityPeriod: 60,
        renewalNotice: 180,
        regulatoryBody: 'EDQM',
        currentStatus: 'valid',
        expiryDate: '2026-01-15',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP010-3',
        name: 'REACH Registration',
        type: 'documentation',
        mandatory: true,
        description: 'REACH registration for chemical substances',
        validityPeriod: 120,
        renewalNotice: 180,
        regulatoryBody: 'ECHA',
        currentStatus: 'valid',
        expiryDate: '2028-01-15',
        lastVerified: '2024-01-01'
      }
    ],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'req-SUP008',
    supplierId: 'SUP008',
    category: 'Raw Materials',
    region: 'North America',
    requirements: [
      {
        id: 'req-SUP008-1',
        name: 'FDA Registration',
        type: 'certification',
        mandatory: true,
        description: 'FDA facility registration for raw material manufacturing',
        validityPeriod: 24,
        renewalNotice: 90,
        regulatoryBody: 'FDA',
        currentStatus: 'expiring',
        expiryDate: '2024-02-15',
        lastVerified: '2023-12-15'
      },
      {
        id: 'req-SUP008-2',
        name: 'ISO 9001 Certification',
        type: 'certification',
        mandatory: true,
        description: 'Quality management systems certification',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'ISO',
        currentStatus: 'valid',
        expiryDate: '2025-06-10',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP008-3',
        name: 'TSCA Compliance',
        type: 'documentation',
        mandatory: true,
        description: 'Toxic Substances Control Act compliance',
        validityPeriod: 12,
        renewalNotice: 60,
        regulatoryBody: 'EPA',
        currentStatus: 'pending',
        expiryDate: '2024-06-10',
        lastVerified: '2023-12-01'
      }
    ],
    lastUpdated: '2024-01-10'
  },

  // Secondary Packaging Suppliers
  {
    id: 'req-SUP005',
    supplierId: 'SUP005',
    category: 'Secondary Packaging',
    region: 'Europe',
    requirements: [
      {
        id: 'req-SUP005-1',
        name: 'EU Packaging Directive Compliance',
        type: 'documentation',
        mandatory: true,
        description: 'Compliance with EU Directive 94/62/EC on packaging and packaging waste',
        validityPeriod: 12,
        renewalNotice: 60,
        regulatoryBody: 'EU Commission',
        currentStatus: 'valid',
        expiryDate: '2024-12-31',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP005-2',
        name: 'FSC Certification',
        type: 'certification',
        mandatory: false,
        description: 'Forest Stewardship Council certification for sustainable packaging',
        validityPeriod: 60,
        renewalNotice: 90,
        regulatoryBody: 'FSC',
        currentStatus: 'valid',
        expiryDate: '2026-11-25',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP005-3',
        name: 'ISO 14001 Certification',
        type: 'certification',
        mandatory: false,
        description: 'Environmental management systems certification',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'ISO',
        currentStatus: 'valid',
        expiryDate: '2025-11-25',
        lastVerified: '2024-01-01'
      }
    ],
    lastUpdated: '2024-01-25'
  },

  // Equipment Suppliers
  {
    id: 'req-SUP013',
    supplierId: 'SUP013',
    category: 'Equipment',
    region: 'Europe',
    requirements: [
      {
        id: 'req-SUP013-1',
        name: 'CE Marking',
        type: 'certification',
        mandatory: true,
        description: 'CE marking for medical device equipment',
        validityPeriod: 60,
        renewalNotice: 120,
        regulatoryBody: 'EU Notified Body',
        currentStatus: 'valid',
        expiryDate: '2026-05-30',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP013-2',
        name: 'ISO 13485 Certification',
        type: 'certification',
        mandatory: true,
        description: 'Medical devices quality management systems',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'ISO',
        currentStatus: 'valid',
        expiryDate: '2025-05-30',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP013-3',
        name: 'IQ/OQ/PQ Documentation',
        type: 'documentation',
        mandatory: true,
        description: 'Installation, Operational, and Performance Qualification protocols',
        validityPeriod: 24,
        renewalNotice: 60,
        regulatoryBody: 'Internal QA',
        currentStatus: 'valid',
        expiryDate: '2025-05-30',
        lastVerified: '2024-01-01'
      }
    ],
    lastUpdated: '2024-01-30'
  },

  // Testing Services
  {
    id: 'req-SUP018',
    supplierId: 'SUP018',
    category: 'Testing Services',
    region: 'Europe',
    requirements: [
      {
        id: 'req-SUP018-1',
        name: 'ISO 17025 Accreditation',
        type: 'certification',
        mandatory: true,
        description: 'General requirements for the competence of testing and calibration laboratories',
        validityPeriod: 48,
        renewalNotice: 120,
        regulatoryBody: 'National Accreditation Body',
        currentStatus: 'valid',
        expiryDate: '2026-02-28',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP018-2',
        name: 'GLP Certification',
        type: 'certification',
        mandatory: true,
        description: 'Good Laboratory Practice certification',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'National GLP Authority',
        currentStatus: 'valid',
        expiryDate: '2025-02-28',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP018-3',
        name: 'OECD GLP Compliance',
        type: 'documentation',
        mandatory: true,
        description: 'OECD Good Laboratory Practice compliance',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'OECD',
        currentStatus: 'valid',
        expiryDate: '2025-02-28',
        lastVerified: '2024-01-01'
      }
    ],
    lastUpdated: '2024-02-28'
  },

  // Logistics Suppliers
  {
    id: 'req-SUP020',
    supplierId: 'SUP020',
    category: 'Logistics',
    region: 'Europe',
    requirements: [
      {
        id: 'req-SUP020-1',
        name: 'GDP Certification',
        type: 'certification',
        mandatory: true,
        description: 'Good Distribution Practice for pharmaceutical products',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'National Medicines Agency',
        currentStatus: 'valid',
        expiryDate: '2025-06-15',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP020-2',
        name: 'ISO 9001 Certification',
        type: 'certification',
        mandatory: true,
        description: 'Quality management systems certification',
        validityPeriod: 36,
        renewalNotice: 90,
        regulatoryBody: 'ISO',
        currentStatus: 'valid',
        expiryDate: '2025-06-15',
        lastVerified: '2024-01-01'
      },
      {
        id: 'req-SUP020-3',
        name: 'Temperature Mapping Validation',
        type: 'documentation',
        mandatory: true,
        description: 'Cold chain temperature mapping and validation studies',
        validityPeriod: 12,
        renewalNotice: 60,
        regulatoryBody: 'Internal QA',
        currentStatus: 'valid',
        expiryDate: '2024-06-15',
        lastVerified: '2024-01-01'
      }
    ],
    lastUpdated: '2024-01-15'
  }
];

// Helper functions for compliance requirements management
export function getComplianceRequirementsBySupplier(supplierId: string): ComplianceRequirement | undefined {
  return complianceRequirementsMapping.find(req => req.supplierId === supplierId);
}

export function getComplianceRequirementsByCategory(category: string): ComplianceRequirement[] {
  return complianceRequirementsMapping.filter(req => req.category === category);
}

export function getComplianceRequirementsByRegion(region: string): ComplianceRequirement[] {
  return complianceRequirementsMapping.filter(req => req.region === region);
}

export function getExpiringRequirements(daysAhead: number = 90): any[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() + daysAhead);
  
  const expiringReqs: any[] = [];
  
  complianceRequirementsMapping.forEach(compReq => {
    compReq.requirements.forEach(req => {
      if (req.expiryDate) {
        const expiryDate = new Date(req.expiryDate);
        if (expiryDate <= cutoffDate) {
          expiringReqs.push({
            supplierId: compReq.supplierId,
            requirementId: req.id,
            requirementName: req.name,
            expiryDate: req.expiryDate,
            daysUntilExpiry: Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
            mandatory: req.mandatory,
            regulatoryBody: req.regulatoryBody
          });
        }
      }
    });
  });
  
  return expiringReqs.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
}

export function getComplianceStatistics() {
  const totalRequirements = complianceRequirementsMapping.reduce((sum, req) => sum + req.requirements.length, 0);
  let validCount = 0;
  let expiringCount = 0;
  let expiredCount = 0;
  let pendingCount = 0;
  
  complianceRequirementsMapping.forEach(compReq => {
    compReq.requirements.forEach(req => {
      switch (req.currentStatus) {
        case 'valid': validCount++; break;
        case 'expiring': expiringCount++; break;
        case 'expired': expiredCount++; break;
        case 'pending': pendingCount++; break;
      }
    });
  });
  
  return {
    total: totalRequirements,
    valid: validCount,
    expiring: expiringCount,
    expired: expiredCount,
    pending: pendingCount,
    complianceRate: Math.round((validCount / totalRequirements) * 100)
  };
}