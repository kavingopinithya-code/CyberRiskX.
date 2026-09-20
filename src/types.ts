export type NavigationTab = 
  | 'dashboard'
  | 'vulnerabilities'
  | 'attack-paths'
  | 'business-assets'
  | 'ai-recommendations'
  | 'investments'
  | 'reports'
  | 'settings';

export interface VulnerabilityRecord {
  id: string;
  name: string;
  cveCode?: string;
  technicalSeverity: number;
  attackPath: string;
  attackPathNodes: string[];
  businessAsset: string;
  financialExposure: string;
  financialExposureValue: number; // in Lakhs for sorting/filtering
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  reachabilityStatus: 'Direct External Path' | 'Multi-Hop Pivoting' | 'Internal Perimeter' | 'Isolated Endpoint';
  assetImpactDescription: string;
  remediationAction: string;
  estimatedFixEffort: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  avatarUrl?: string;
  securityClearance: string;
  lastLogin: string;
}

export interface SecurityAsset {
  id: string;
  name: string;
  category: 'Crown Jewel' | 'Tier-1 Infrastructure' | 'Critical Database' | 'Customer Facing';
  owner: string;
  businessImpactValue: number; // e.g., $12.5M
  financialExposure: number;
  reachableAttackPathsCount: number;
  criticalVulnCount: number;
}

export interface PrioritizedVulnerability {
  id: string;
  cveId: string;
  title: string;
  affectedAsset: string;
  assetCriticality: 'Crown Jewel' | 'Tier-1' | 'Tier-2';
  cvssSeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  cvssScore: number;
  // CyberRiskX Core Prioritization Factors:
  attackPathReachable: boolean;
  businessFinancialExposure: number; // in USD
  remediationCostEstimate: number; // in USD
  riskReductionPercentage: number; // e.g. 72%
  prioritizedRiskRank: number; // 1, 2, 3...
  decisionRecommendation: 'Remediate Immediately' | 'Schedule Sprint' | 'Accept Risk & Compensate' | 'Virtual Patch';
}

export interface AttackPathSummary {
  id: string;
  name: string;
  entryPoint: string;
  pivotPoints: string[];
  targetCrownJewel: string;
  estimatedChokePoint: string;
  financialImpact: number;
  remediationAction: string;
  chokePointFixCost: number;
}

export interface RiskBudgetMetric {
  totalBudget: number;
  allocatedBudget: number;
  currentFinancialExposure: number;
  projectedExposureAfterFixes: number;
  projectedRiskReductionDollars: number;
  roiMultiplier: number;
}
