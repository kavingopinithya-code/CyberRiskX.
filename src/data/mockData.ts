import { UserProfile, SecurityAsset, PrioritizedVulnerability, RiskBudgetMetric, AttackPathSummary } from '../types';

export const mockCurrentUser: UserProfile = {
  id: 'usr-904',
  name: 'Sarah Chen, CISSP',
  email: 's.chen@acmefinance.io',
  role: 'VP of Cyber Risk & CISO',
  organization: 'Acme Global Financial Tech',
  securityClearance: 'Enterprise Admin',
  lastLogin: 'Today at 08:30 AM EST',
};

export const mockRiskBudget: RiskBudgetMetric = {
  totalBudget: 250000,
  allocatedBudget: 75000,
  currentFinancialExposure: 14800000, // $14.8M
  projectedExposureAfterFixes: 4900000, // drops to $4.9M
  projectedRiskReductionDollars: 9900000, // $9.9M saved
  roiMultiplier: 132, // 132x ROI on remediation spend
};

export const mockAssets: SecurityAsset[] = [
  {
    id: 'ast-101',
    name: 'Primary SWIFT Payment Switchway',
    category: 'Crown Jewel',
    owner: 'Payments Engineering',
    businessImpactValue: 45000000,
    financialExposure: 6800000,
    reachableAttackPathsCount: 2,
    criticalVulnCount: 3,
  },
  {
    id: 'ast-102',
    name: 'Customer PII Data Warehouse (PostgreSQL)',
    category: 'Crown Jewel',
    owner: 'Data Governance',
    businessImpactValue: 30000000,
    financialExposure: 4200000,
    reachableAttackPathsCount: 1,
    criticalVulnCount: 2,
  },
  {
    id: 'ast-103',
    name: 'API Gateway & OAuth Authorizer',
    category: 'Tier-1 Infrastructure',
    owner: 'Cloud Platform Ops',
    businessImpactValue: 18000000,
    financialExposure: 2600000,
    reachableAttackPathsCount: 3,
    criticalVulnCount: 4,
  },
  {
    id: 'ast-104',
    name: 'Internal Employee HR Portal',
    category: 'Tier-1 Infrastructure',
    owner: 'Internal IT',
    businessImpactValue: 2500000,
    financialExposure: 350000,
    reachableAttackPathsCount: 0,
    criticalVulnCount: 6, // High raw CVE count, but unreachable to Crown Jewels!
  },
];

export const mockPrioritizedVulnerabilities: PrioritizedVulnerability[] = [
  {
    id: 'vuln-01',
    cveId: 'CVE-2024-3400',
    title: 'GlobalProtect Authentication Bypass to Core Gateway',
    affectedAsset: 'API Gateway & OAuth Authorizer',
    assetCriticality: 'Crown Jewel',
    cvssSeverity: 'CRITICAL',
    cvssScore: 9.8,
    attackPathReachable: true,
    businessFinancialExposure: 4800000,
    remediationCostEstimate: 12000,
    riskReductionPercentage: 88,
    prioritizedRiskRank: 1,
    decisionRecommendation: 'Remediate Immediately',
  },
  {
    id: 'vuln-02',
    cveId: 'CVE-2023-46805',
    title: 'Ivanti Connect Secure RCE leading to SWIFT Vault',
    affectedAsset: 'Primary SWIFT Payment Switchway',
    assetCriticality: 'Crown Jewel',
    cvssSeverity: 'HIGH',
    cvssScore: 8.2,
    attackPathReachable: true,
    businessFinancialExposure: 3200000,
    remediationCostEstimate: 18000,
    riskReductionPercentage: 79,
    prioritizedRiskRank: 2,
    decisionRecommendation: 'Remediate Immediately',
  },
  {
    id: 'vuln-03',
    cveId: 'CVE-2024-21887',
    title: 'Command Injection in Internal ETL Pipeline',
    affectedAsset: 'Customer PII Data Warehouse',
    assetCriticality: 'Crown Jewel',
    cvssSeverity: 'HIGH',
    cvssScore: 8.8,
    attackPathReachable: true,
    businessFinancialExposure: 2900000,
    remediationCostEstimate: 9500,
    riskReductionPercentage: 74,
    prioritizedRiskRank: 3,
    decisionRecommendation: 'Schedule Sprint',
  },
  {
    id: 'vuln-04',
    cveId: 'CVE-2024-1086',
    title: 'Linux Kernel nf_tables Local Privilege Escalation',
    affectedAsset: 'Internal Employee HR Portal',
    assetCriticality: 'Tier-2',
    cvssSeverity: 'CRITICAL',
    cvssScore: 9.8, // Note: CVSS 9.8 (technically critical), but isolated!
    attackPathReachable: false,
    businessFinancialExposure: 85000,
    remediationCostEstimate: 35000,
    riskReductionPercentage: 8,
    prioritizedRiskRank: 14,
    decisionRecommendation: 'Accept Risk & Compensate',
  },
];

export const mockAttackPaths: AttackPathSummary[] = [
  {
    id: 'path-01',
    name: 'Internet Edge -> Bastion -> SWIFT Payment Engine',
    entryPoint: 'Exposed Edge Firewall (Port 443)',
    pivotPoints: ['DevOps Jumpbox', 'Active Directory Domain Controller'],
    targetCrownJewel: 'Primary SWIFT Payment Switchway',
    estimatedChokePoint: 'Segment DevOps Jumpbox VPC & Enforce MFA',
    financialImpact: 6800000,
    remediationAction: 'Microsegment jumpbox access ($14k fix removes $6.8M exposure)',
    chokePointFixCost: 14000,
  },
  {
    id: 'path-02',
    name: 'Compromised Contractor Credential -> Customer PII Database',
    entryPoint: 'Partner Vendor VPN Gateway',
    pivotPoints: ['Internal Analytics Read-Replica'],
    targetCrownJewel: 'Customer PII Data Warehouse',
    estimatedChokePoint: 'Restrict IAM Role Session Duration on DB Cluster',
    financialImpact: 4200000,
    remediationAction: 'Rotate service keys & enforce temporary STS tokens ($6k fix)',
    chokePointFixCost: 6000,
  },
];
