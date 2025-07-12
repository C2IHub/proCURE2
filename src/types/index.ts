// Core data models for the proCURE application

export interface Supplier {
  id: string;
  name: string;
  category: string;
  overallScore: number;
  compliance: ScoreDetail;
  quality: ScoreDetail;
  sustainability: ScoreDetail;
  lastAudit: string;
  riskLevel: 'low' | 'medium' | 'high';
  certifications: string[];
}

export interface ScoreDetail {
  score: number;
  trend: 'up' | 'down' | 'stable';
  status: 'compliant' | 'warning' | 'critical' | 'good' | 'excellent';
}

export interface AgentStatus {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'completed' | 'warning' | 'error';
  description?: string;
  task?: string;
  progress?: number;
  confidence?: number;
  lastUpdate: string;
  icon?: string;
}

export interface DecisionBreakdown {
  id: string;
  title: string;
  reasoning: string;
  factors: DecisionFactor[];
  keyFindings: string[];
  recommendations: string[];
  confidence: number;
  supplierId?: string;
}

export interface DecisionFactor {
  factor: string;
  score: number;
  weight: number;
  description?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  type: 'compliance_check' | 'risk_assessment' | 'document_upload' | 'score_update' | 'alert' | 'approval';
  description: string;
  supplierId?: string;
  supplierName?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'completed' | 'failed';
  details?: Record<string, any>;
}

export interface Metric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: 'red' | 'green' | 'yellow' | 'blue';
  category?: 'compliance' | 'risk' | 'quality' | 'sustainability';
}

export interface ComplianceData {
  month: string;
  compliant: number;
  warning: number;
  critical: number;
}

export interface RecentActivityItem {
  id: string;
  type: 'alert' | 'approval' | 'update' | 'upload';
  title: string;
  description: string;
  timestamp: string;
  supplierId?: string;
  priority: 'low' | 'medium' | 'high';
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

// AWS Bedrock Agent types
export interface BedrockAgentConfig {
  region: string;
  agentId: string;
  agentAliasId: string;
}

export interface AgentInvokeRequest {
  prompt: string;
  sessionId?: string;
  context?: Record<string, any>;
}

export interface AgentInvokeResponse {
  response: string;
  sessionId: string;
  confidence?: number;
  sources?: string[];
}

// Supplier Context types
export interface SupplierContextValue {
  currentSupplierId: string | null;
  setCurrentSupplierId: (id: string | null) => void;
  suppliers: Supplier[];
  isLoading: boolean;
  error: Error | null;
}