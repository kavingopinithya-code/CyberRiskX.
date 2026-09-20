import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Flame,
  GitFork,
  DollarSign,
  Building2,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Database,
  Server,
  Lock,
  Clock,
  CheckCircle2,
  Info,
  ExternalLink,
  Laptop,
  Check,
  RefreshCw
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { NavigationTab } from '../../types';

interface CyberRiskXDashboardProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenSimulation?: () => void;
}

interface VulnerabilityRiskItem {
  id: string;
  name: string;
  technicalSeverity: number;
  attackPath: string;
  attackPathNodes: string[];
  businessAsset: string;
  financialExposure: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  cveCode: string;
  fixRecommendation: string;
  description: string;
}

interface AssetHealthItem {
  id: string;
  name: string;
  type: string;
  status: 'Critical Risk' | 'High Risk' | 'Moderate Risk' | 'Healthy';
  statusVariant: 'danger' | 'warning' | 'info' | 'success';
  healthScore: number;
  exposure: string;
  activeThreats: number;
  criticality: 'Tier-1 Crown Jewel' | 'Tier-1 Core System' | 'Tier-2 Enterprise' | 'Tier-3 Internal';
  owner: string;
}

export const DashboardPlaceholder: React.FC<CyberRiskXDashboardProps> = ({
  onNavigate,
  onOpenSimulation,
}) => {
  // Modal states
  const [selectedRisk, setSelectedRisk] = useState<VulnerabilityRiskItem | null>(null);
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetHealthItem | null>(null);
  const [isPlanApplied, setIsPlanApplied] = useState<boolean>(false);

  // 1. Top Risks Requiring Action list strictly matching prompt
  const topRisks: VulnerabilityRiskItem[] = [
    {
      id: 'risk-1',
      name: 'Outdated Web API',
      technicalSeverity: 9.8,
      attackPath: 'Internet → Web API → Customer Database',
      attackPathNodes: ['Public Internet', 'Web API (Unauthenticated Gateway)', 'Customer Database (PostgreSQL)'],
      businessAsset: 'Customer Database',
      financialExposure: '₹4.8 Cr',
      priority: 'Critical',
      cveCode: 'CVE-2024-3400',
      fixRecommendation: 'Deploy patch v3.4.2 to Web API gateway and activate WAF inspection rule 8021.',
      description: 'Unauthenticated command injection and RCE on public REST endpoint with direct network route to sensitive customer records.',
    },
    {
      id: 'risk-2',
      name: 'Weak MFA',
      technicalSeverity: 8.1,
      attackPath: 'Employee → Finance Server → Payment System',
      attackPathNodes: ['Compromised Employee Credentials', 'Finance Jump Server', 'Payment System Core Ledger'],
      businessAsset: 'Payment System',
      financialExposure: '₹3.2 Cr',
      priority: 'High',
      cveCode: 'CVE-2023-46805',
      fixRecommendation: 'Enforce hardware FIDO2 security keys and disable SMS-based 2FA fallback for finance accounts.',
      description: 'Legacy SMS verification allows SIM swap and interception, giving adversaries access to internal financial settlement tools.',
    },
    {
      id: 'risk-3',
      name: 'Server Misconfiguration',
      technicalSeverity: 7.6,
      attackPath: 'VPN → Internal Network → ERP System',
      attackPathNodes: ['Contractor VPN Portal', 'Internal VLAN-10 Network', 'ERP System (SAP Cluster)'],
      businessAsset: 'ERP System',
      financialExposure: '₹1.9 Cr',
      priority: 'High',
      cveCode: 'CVE-2024-21887',
      fixRecommendation: 'Restrict default cross-VLAN bridging rules and apply principle of least privilege on ERP ports.',
      description: 'Over-permissive default ACLs allow any connected VPN client to pivot directly to enterprise manufacturing and inventory ERP databases.',
    },
    {
      id: 'risk-4',
      name: 'Old Browser Version',
      technicalSeverity: 5.4,
      attackPath: 'Employee Laptop → Internal Application',
      attackPathNodes: ['Employee Laptop', 'Local Sandbox', 'Internal Application (Intranet)'],
      businessAsset: 'Internal Application',
      financialExposure: '₹8 Lakh',
      priority: 'Low',
      cveCode: 'CVE-2024-1086',
      fixRecommendation: 'Push fleet-wide automated browser update via corporate MDM policy.',
      description: 'Outdated browser on non-privileged workstation with access limited to the corporate cafeteria menu and internal staff directory.',
    },
  ];

  // 2. Business Asset Health list strictly matching prompt
  const assetHealthList: AssetHealthItem[] = [
    {
      id: 'asset-1',
      name: 'Customer Database',
      type: 'Production PostgreSQL Cluster',
      status: 'Critical Risk',
      statusVariant: 'danger',
      healthScore: 38,
      exposure: '₹4.8 Cr',
      activeThreats: 3,
      criticality: 'Tier-1 Crown Jewel',
      owner: 'Data Engineering & Compliance',
    },
    {
      id: 'asset-2',
      name: 'Payment System',
      type: 'Core Settlement Ledger',
      status: 'High Risk',
      statusVariant: 'warning',
      healthScore: 54,
      exposure: '₹3.2 Cr',
      activeThreats: 2,
      criticality: 'Tier-1 Core System',
      owner: 'Treasury & Payment Ops',
    },
    {
      id: 'asset-3',
      name: 'ERP System',
      type: 'SAP S/4HANA Enterprise',
      status: 'Moderate Risk',
      statusVariant: 'info',
      healthScore: 68,
      exposure: '₹1.9 Cr',
      activeThreats: 2,
      criticality: 'Tier-2 Enterprise',
      owner: 'Enterprise Supply Chain',
    },
    {
      id: 'asset-4',
      name: 'Internal Application',
      type: 'Corporate Intranet Portal',
      status: 'Healthy',
      statusVariant: 'success',
      healthScore: 92,
      exposure: '₹8 Lakh',
      activeThreats: 1,
      criticality: 'Tier-3 Internal',
      owner: 'Internal Workplace IT',
    },
  ];

  const getPriorityBadgeVariant = (priority: VulnerabilityRiskItem['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'danger';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const getSeverityBadgeVariant = (score: number) => {
    if (score >= 9.0) return 'danger';
    if (score >= 7.0) return 'warning';
    if (score >= 5.0) return 'cyber';
    return 'neutral';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="cyberriskx-dashboard-view">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              CyberRiskX Dashboard
            </h1>
            <Badge variant="cyber" size="sm">
              Decision Engine
            </Badge>
          </div>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <p className="text-xs sm:text-sm text-slate-400">
              Business-focused cybersecurity risk overview
            </p>
            <span className="text-slate-600 hidden sm:inline">•</span>
            {/* Demo data label */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/80">
              <Info className="w-3 h-3 text-slate-400" />
              Demo data — illustrative values
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSimulation}
            icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
          >
            What-If Simulator
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('vulnerabilities')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            View All Vulnerabilities
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="kpi-cards-grid">
        
        {/* KPI Card 1: Critical Attack Paths */}
        <Card className="hover:border-slate-700/80 transition-all border-rose-500/20 bg-gradient-to-b from-[#121829] to-[#151221]">
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
            <span className="font-semibold flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-rose-400" />
              Critical Attack Paths
            </span>
            <span className="inline-flex items-center text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
              +12%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              8
            </span>
            <span className="text-xs text-slate-400">Reachable Paths</span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Crown jewel targets</span>
            <span className="text-rose-400 font-medium">Immediate priority</span>
          </div>
        </Card>

        {/* KPI Card 2: Potential Financial Exposure */}
        <Card className="hover:border-slate-700/80 transition-all border-blue-500/20 bg-gradient-to-b from-[#121829] to-[#0F172E]">
          <div className="flex items-center justify-between text-xs text-blue-300 mb-2">
            <span className="font-semibold flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-blue-400" />
              Potential Financial Exposure
            </span>
            <span className="inline-flex items-center text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              +4.2%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              ₹12.4 Cr
            </span>
            <span className="text-xs text-slate-400">At-Risk Value</span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">FAIR Loss Quantification</span>
            <span className="text-emerald-400 font-medium font-mono">₹9.2 Cr Remediable</span>
          </div>
        </Card>

        {/* KPI Card 3: High-Risk Business Assets */}
        <Card className="hover:border-slate-700/80 transition-all border-amber-500/20 bg-gradient-to-b from-[#121829] to-[#1A181C]">
          <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
            <span className="font-semibold flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              High-Risk Business Assets
            </span>
            <Badge variant="warning" size="sm">
              Tier-1
            </Badge>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              5
            </span>
            <span className="text-xs text-slate-400">Core Systems</span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Customer DB, Payment, ERP</span>
            <span className="text-amber-400 font-medium">Action required</span>
          </div>
        </Card>

        {/* KPI Card 4: Security Budget */}
        <Card className="hover:border-slate-700/80 transition-all border-emerald-500/20 bg-gradient-to-b from-[#121829] to-[#0E1A1E]">
          <div className="flex items-center justify-between text-xs text-emerald-300 mb-2">
            <span className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Security Budget
            </span>
            <Badge variant="success" size="sm">
              Allocated
            </Badge>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
              ₹25 Lakh
            </span>
            <span className="text-xs text-emerald-400 font-medium">CapEx Ready</span>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Remediation pool</span>
            <span className="text-emerald-400 font-medium font-mono">10% deployed (₹2.5L)</span>
          </div>
        </Card>

      </div>

      {/* Middle Layout: Top Risks Requiring Action (Left 7 Cols) + Recommended Action & Asset Health (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Section: Top Risks Requiring Action (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card
            title="Top Risks Requiring Action"
            subtitle="Ranked by reachable attack paths, crown jewel asset exposure, and FAIR financial quantification."
            className="p-0 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" id="top-risks-table">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4 font-semibold">Vulnerability</th>
                    <th className="py-3 px-3 font-semibold">Severity</th>
                    <th className="py-3 px-3 font-semibold">Attack Path</th>
                    <th className="py-3 px-3 font-semibold">Business Asset</th>
                    <th className="py-3 px-3 font-semibold">Financial Exposure</th>
                    <th className="py-3 px-3 font-semibold">Priority</th>
                    <th className="py-3 px-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {topRisks.map((risk) => (
                    <tr
                      key={risk.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Vulnerability Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {risk.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          {risk.cveCode}
                        </div>
                      </td>

                      {/* Technical Severity */}
                      <td className="py-3.5 px-3">
                        <Badge
                          variant={getSeverityBadgeVariant(risk.technicalSeverity)}
                          size="sm"
                        >
                          <span className="font-mono font-bold text-xs">{risk.technicalSeverity}</span>
                        </Badge>
                      </td>

                      {/* Attack Path */}
                      <td className="py-3.5 px-3">
                        <div className="text-xs text-slate-300 font-mono bg-slate-900/90 px-2 py-1 rounded border border-slate-800 max-w-[190px] truncate" title={risk.attackPath}>
                          {risk.attackPath}
                        </div>
                      </td>

                      {/* Business Asset */}
                      <td className="py-3.5 px-3">
                        <div className="font-medium text-slate-200 flex items-center gap-1.5 whitespace-nowrap">
                          <Database className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{risk.businessAsset}</span>
                        </div>
                      </td>

                      {/* Financial Exposure */}
                      <td className="py-3.5 px-3">
                        <div className="font-mono font-bold text-white whitespace-nowrap">
                          {risk.financialExposure}
                        </div>
                        <div className="text-[10px] text-emerald-400">At-Risk</div>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-3">
                        <Badge
                          variant={getPriorityBadgeVariant(risk.priority)}
                          size="sm"
                          dot={risk.priority === 'Critical'}
                        >
                          {risk.priority}
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedRisk(risk)}
                          className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Link */}
            <div className="p-3 bg-slate-900/40 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Displaying 4 highest-impact vulnerabilities across active vectors
              </span>
              <button
                onClick={() => onNavigate('vulnerabilities')}
                className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 group"
              >
                <span>Full Prioritization View</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </Card>
        </div>

        {/* Right Side: Recommended Action & Business Asset Health (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section: Recommended Action */}
          <Card
            className="border-emerald-500/25 bg-gradient-to-b from-[#111A29] via-[#0E1624] to-[#0A101C] relative overflow-hidden"
            id="recommended-action-card"
          >
            {/* Top Badge & Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Top Recommended Action
                </span>
              </div>
              <Badge variant="cyber" size="sm">
                AI Choke-Point Engine
              </Badge>
            </div>

            {/* Recommendation Title */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Enable MFA for privileged accounts</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Breaks the primary lateral pivot chain from compromised employee credentials to the Payment System core ledger.
              </p>
            </div>

            {/* Stat Row: Estimated Cost & Estimated Risk Reduction */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              
              {/* Estimated Cost */}
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-[11px] font-medium text-slate-400 block mb-1">
                  Estimated Cost
                </span>
                <span className="text-lg font-bold font-mono text-white">
                  ₹2.5 Lakh
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  10% of total security budget
                </span>
              </div>

              {/* Estimated Risk Reduction */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                <span className="text-[11px] font-medium text-emerald-300 block mb-1">
                  Estimated Risk Reduction
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold font-mono text-emerald-400">
                    68%
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    (₹3.2 Cr Saved)
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400/80 block mt-0.5">
                  Protects Payment System
                </span>
              </div>

            </div>

            {/* Action Button */}
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => onNavigate('ai-recommendations')}
              id="btn-view-recommendation"
              icon={<Sparkles className="w-4 h-4" />}
            >
              View Recommendation
            </Button>
          </Card>

          {/* Section: Business Asset Health */}
          <Card
            title="Business Asset Health"
            subtitle="Tiered mission-critical systems and current threat exposure status."
            id="business-asset-health-card"
          >
            <div className="space-y-3">
              {assetHealthList.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors shrink-0" />
                      <span className="font-semibold text-xs text-white group-hover:text-blue-300 transition-colors">
                        {asset.name}
                      </span>
                    </div>

                    {/* Realistic status indicator badge */}
                    <Badge variant={asset.statusVariant} size="sm" dot={asset.status !== 'Healthy'}>
                      {asset.status}
                    </Badge>
                  </div>

                  {/* Health Bar & Exposure Metrics */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">
                        {asset.type}
                      </span>
                      <span className="font-mono text-slate-300">
                        At Risk: <strong className="text-white font-semibold">{asset.exposure}</strong>
                      </span>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          asset.statusVariant === 'danger'
                            ? 'bg-rose-500'
                            : asset.statusVariant === 'warning'
                            ? 'bg-amber-500'
                            : asset.statusVariant === 'info'
                            ? 'bg-blue-500'
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${asset.healthScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Asset Section Footer */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">
                4 core business assets monitored
              </span>
              <button
                onClick={() => onNavigate('business-assets')}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                Inventory Details →
              </button>
            </div>
          </Card>

        </div>

      </div>

      {/* Modal 1: Vulnerability Details */}
      {selectedRisk && (
        <Modal
          isOpen={!!selectedRisk}
          onClose={() => setSelectedRisk(null)}
          title={`Risk Analysis: ${selectedRisk.name}`}
          description={`${selectedRisk.cveCode} • Direct reachability to ${selectedRisk.businessAsset}`}
          maxWidth="lg"
          primaryAction={{
            label: 'View in Vulnerability Engine',
            onClick: () => {
              setSelectedRisk(null);
              onNavigate('vulnerabilities');
            },
          }}
        >
          <div className="space-y-4">
            
            {/* Top 3 Stats */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Severity</span>
                <div className="mt-0.5">
                  <Badge variant={getSeverityBadgeVariant(selectedRisk.technicalSeverity)} size="sm">
                    {selectedRisk.technicalSeverity} / 10.0
                  </Badge>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Financial Exposure</span>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
                  {selectedRisk.financialExposure}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Priority</span>
                <div className="mt-0.5">
                  <Badge variant={getPriorityBadgeVariant(selectedRisk.priority)} size="sm">
                    {selectedRisk.priority}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white block mb-1">Technical Summary:</span>
              {selectedRisk.description}
            </div>

            {/* Attack Path Chain */}
            <div className="p-3 rounded-xl bg-[#0D1322] border border-slate-800">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5 mb-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Verified Attack Path Chain:
              </span>
              <div className="space-y-2">
                {selectedRisk.attackPathNodes.map((node, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center font-mono text-[10px]">
                      {index + 1}
                    </span>
                    <span className="font-mono text-slate-200 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 flex-1">
                      {node}
                    </span>
                    {index < selectedRisk.attackPathNodes.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Fix */}
            <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs">
              <span className="font-semibold text-blue-300 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Recommended Remediation:
              </span>
              <p className="text-slate-300">
                {selectedRisk.fixRecommendation}
              </p>
            </div>

          </div>
        </Modal>
      )}

      {/* Modal 2: Recommended Action Details */}
      <Modal
        isOpen={isRecommendationModalOpen}
        onClose={() => setIsRecommendationModalOpen(false)}
        title="Recommendation: Enable MFA for Privileged Accounts"
        description="High-leverage choke point remediation eliminating multi-hop attack paths"
        maxWidth="lg"
        primaryAction={{
          label: isPlanApplied ? 'Plan Applied ✓' : 'Approve & Allocate ₹2.5 Lakh',
          onClick: () => {
            setIsPlanApplied(true);
            setTimeout(() => {
              setIsRecommendationModalOpen(false);
              onNavigate('investments');
            }, 800);
          },
        }}
      >
        <div className="space-y-4">
          
          {/* Executive Value Ribbon */}
          <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-[#0D1525] border border-blue-500/25">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Cost</span>
              <span className="text-lg font-mono font-bold text-white">₹2.5 Lakh</span>
              <span className="text-[10px] text-slate-400 block">Out of ₹25L Budget</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Risk Reduction</span>
              <span className="text-lg font-mono font-bold text-emerald-400">68%</span>
              <span className="text-[10px] text-emerald-400 block">₹3.2 Cr Saved</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Calculated ROI</span>
              <span className="text-lg font-mono font-bold text-blue-400">128x</span>
              <span className="text-[10px] text-blue-300 block">FAIR Quantified</span>
            </div>
          </div>

          {/* Detailed Justification */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-semibold text-white">Why This Choke Point?</h4>
            <p className="leading-relaxed">
              Enforcing hardware FIDO2 MFA across treasury and payment administration accounts severs the multi-hop attack path 
              from compromised employee workstations to the <strong>Payment System Core Ledger</strong>.
            </p>
            <ul className="space-y-1.5 pt-1 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Eliminates SMS-intercept and session replay vulnerabilities (CVE-2023-46805).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Safeguards ₹45+ Cr daily transaction throughput on global settlement rails.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Satisfies RBI & DPDP privileged identity management compliance mandates.</span>
              </li>
            </ul>
          </div>

          {/* Implementation Timeline */}
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-1 font-medium">Deployment Schedule:</span>
            <div className="flex items-center justify-between text-slate-200">
              <span>Duration: <strong>3 business days</strong></span>
              <span>Required resources: <strong>2 SecOps Engineers</strong></span>
            </div>
          </div>

        </div>
      </Modal>

      {/* Modal 3: Business Asset Health Details */}
      {selectedAsset && (
        <Modal
          isOpen={!!selectedAsset}
          onClose={() => setSelectedAsset(null)}
          title={`Asset Profile: ${selectedAsset.name}`}
          description={`${selectedAsset.type} • ${selectedAsset.criticality}`}
          maxWidth="md"
          primaryAction={{
            label: 'View Connected Attack Paths',
            onClick: () => {
              setSelectedAsset(null);
              onNavigate('attack-paths');
            },
          }}
        >
          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Operational Status</span>
                <div className="mt-1">
                  <Badge variant={selectedAsset.statusVariant} size="sm">
                    {selectedAsset.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase">Financial Exposure At Risk</span>
                <div className="text-base font-mono font-bold text-white mt-0.5">
                  {selectedAsset.exposure}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Business Custodian:</span>
                <span className="text-white font-medium">{selectedAsset.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Vulnerabilities on Path:</span>
                <span className="text-amber-400 font-mono font-semibold">{selectedAsset.activeThreats} Paths</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Resilience Score:</span>
                <span className="text-white font-mono">{selectedAsset.healthScore} / 100</span>
              </div>
            </div>

            <p className="text-slate-400 text-[11px] leading-relaxed">
              This asset is part of the core enterprise Crown Jewels. Any breach could trigger statutory DPDP breach notifications and significant revenue disruption.
            </p>
          </div>
        </Modal>
      )}

    </div>
  );
};
