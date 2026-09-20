import React, { useState } from 'react';
import {
  Database,
  CreditCard,
  Building2,
  Laptop,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Flame,
  Info,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle2,
  GitFork,
  Search,
  Filter
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge, BadgeVariant } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { NavigationTab } from '../../types';

interface BusinessAssetRiskPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenSimulation?: () => void;
}

interface AssetCardData {
  id: string;
  name: string;
  type: string;
  criticality: 'Tier-1 Crown Jewel' | 'Tier-1 Core System' | 'Tier-2 Enterprise' | 'Tier-3 Internal';
  risk: 'Critical' | 'High' | 'Low';
  riskVariant: BadgeVariant;
  financialExposure: string;
  financialExposureValue: number; // in Lakhs for sorting
  protectionStatus: 'Needs Attention' | 'At Risk' | 'Protected';
  statusVariant: BadgeVariant;
  owner: string;
  description: string;
  connectedVulnerabilities: Array<{ name: string; severity: number }>;
  attackPaths: string[];
  recordsAtRisk?: string;
  dataClassification: string;
  recommendedFix: string;
}

export const BusinessAssetRiskPage: React.FC<BusinessAssetRiskPageProps> = ({
  onNavigate,
  onOpenSimulation,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<AssetCardData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  // Asset Cards data strictly adhering to user prompt
  const assets: AssetCardData[] = [
    {
      id: 'customer-db',
      name: 'Customer Database',
      type: 'PostgreSQL Production Cluster',
      criticality: 'Tier-1 Crown Jewel',
      risk: 'Critical',
      riskVariant: 'danger',
      financialExposure: '₹4.8 Cr',
      financialExposureValue: 480,
      protectionStatus: 'Needs Attention',
      statusVariant: 'warning',
      owner: 'Data Engineering & Compliance',
      description: 'Primary customer identity repository holding encrypted credentials, transaction history, and KYC documentation.',
      connectedVulnerabilities: [
        { name: 'Outdated Web API', severity: 9.8 },
        { name: 'SQL Injection in Search Endpoint', severity: 8.4 },
        { name: 'Over-privileged Service Account', severity: 7.2 },
      ],
      attackPaths: [
        'Internet → Web API → Customer Database',
        'VPN → Staging DB → Production DB Peering',
      ],
      recordsAtRisk: '2.4M Customer Profiles (PII)',
      dataClassification: 'DPDP High-Risk Sensitive Personal Data',
      recommendedFix: 'Upgrade Web API Gateway & apply micro-segmentation to database subnet.',
    },
    {
      id: 'payment-system',
      name: 'Payment System',
      type: 'Core Settlement & Ledger API',
      criticality: 'Tier-1 Core System',
      risk: 'High',
      riskVariant: 'danger',
      financialExposure: '₹3.2 Cr',
      financialExposureValue: 320,
      protectionStatus: 'At Risk',
      statusVariant: 'danger',
      owner: 'Treasury & Payment Ops',
      description: 'Transaction settlement engine processing payment gateway tokens, wire disbursements, and merchant reconciliation.',
      connectedVulnerabilities: [
        { name: 'Weak MFA on Finance Bastion', severity: 8.1 },
        { name: 'Hardcoded API Secret in CI/CD', severity: 7.5 },
      ],
      attackPaths: [
        'Employee → Finance Server → Payment System',
        'Compromised Contractor Laptop → Internal Jumpbox → Payment Ledger',
      ],
      recordsAtRisk: '₹14.2 Cr Daily Transaction Volume',
      dataClassification: 'PCI-DSS Tier-1 Financial Transaction Data',
      recommendedFix: 'Enforce hardware FIDO2 MFA for all privileged finance bastion hosts.',
    },
    {
      id: 'erp-system',
      name: 'ERP System',
      type: 'SAP S/4HANA Enterprise Suite',
      criticality: 'Tier-2 Enterprise',
      risk: 'High',
      riskVariant: 'warning',
      financialExposure: '₹1.9 Cr',
      financialExposureValue: 190,
      protectionStatus: 'Needs Attention',
      statusVariant: 'warning',
      owner: 'Enterprise Supply Chain & Logistics',
      description: 'Central manufacturing planning, billing, supplier vendor portal, and inventory procurement management system.',
      connectedVulnerabilities: [
        { name: 'Server Misconfiguration (SMB Port)', severity: 7.6 },
        { name: 'Unpatched Remote Desktop Service', severity: 6.9 },
      ],
      attackPaths: [
        'VPN → Internal Network → ERP System',
        'Vendor Portal → Partner Tunnel → ERP Middleware',
      ],
      recordsAtRisk: '450+ Vendor Contracts & Logistics Data',
      dataClassification: 'Confidential Business Operations',
      recommendedFix: 'Disable SMBv1 and enforce VPN ingress IP whitelisting.',
    },
    {
      id: 'internal-app',
      name: 'Internal Application',
      type: 'Corporate Intranet & HR Portal',
      criticality: 'Tier-3 Internal',
      risk: 'Low',
      riskVariant: 'info',
      financialExposure: '₹8 Lakh',
      financialExposureValue: 8,
      protectionStatus: 'Protected',
      statusVariant: 'success',
      owner: 'Internal Workplace IT',
      description: 'Employee directory, PTO scheduling, and standard internal administrative announcements wiki.',
      connectedVulnerabilities: [
        { name: 'Old Browser Version on 12 Desktops', severity: 5.4 },
      ],
      attackPaths: [
        'Employee Laptop → Internal Application',
      ],
      recordsAtRisk: 'Internal Staff Directory (Non-Sensitive)',
      dataClassification: 'Internal Operational Only',
      recommendedFix: 'Automated browser fleet policy update via MDM.',
    },
  ];

  // Mapping visual elements (Vulnerabilities -> Vectors -> Assets)
  const connectionMappings = [
    {
      vulnId: 'vuln-1',
      vulnName: 'Outdated Web API',
      vulnSeverity: 9.8,
      vector: 'Internet → Ingress Gateway',
      assetId: 'customer-db',
      assetName: 'Customer Database',
      exposure: '₹4.8 Cr',
      severityColor: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
    },
    {
      vulnId: 'vuln-2',
      vulnName: 'Weak MFA',
      vulnSeverity: 8.1,
      vector: 'Employee Phishing → Finance Bastion',
      assetId: 'payment-system',
      assetName: 'Payment System',
      exposure: '₹3.2 Cr',
      severityColor: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
    },
    {
      vulnId: 'vuln-3',
      vulnName: 'Server Misconfiguration',
      vulnSeverity: 7.6,
      vector: 'VPN Gateway → Lateral Bridge',
      assetId: 'erp-system',
      assetName: 'ERP System',
      exposure: '₹1.9 Cr',
      severityColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    },
    {
      vulnId: 'vuln-4',
      vulnName: 'Old Browser Version',
      vulnSeverity: 5.4,
      vector: 'Local Workstation → Intranet',
      assetId: 'internal-app',
      assetName: 'Internal Application',
      exposure: '₹8 Lakh',
      severityColor: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
    },
  ];

  const getAssetIcon = (id: string) => {
    switch (id) {
      case 'customer-db':
        return <Database className="w-5 h-5 text-blue-400" />;
      case 'payment-system':
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case 'erp-system':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      default:
        return <Laptop className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredAssets = assets.filter((asset) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Critical') return asset.risk === 'Critical';
    if (activeFilter === 'High') return asset.risk === 'High';
    if (activeFilter === 'Protected') return asset.protectionStatus === 'Protected';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="business-assets-view">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Business Asset Risk
            </h1>
            <Badge variant="cyber" size="sm">
              4 Core Assets Analyzed
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed max-w-3xl">
            Understand which business assets are exposed through cybersecurity attack paths.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            Demo data — illustrative values
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('attack-paths')}
            icon={<GitFork className="w-4 h-4" />}
          >
            Trace Attack Paths
          </Button>
        </div>
      </div>

      {/* 4 Asset Cards as explicitly requested */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="asset-summary-cards">
        {assets.map((asset) => (
          <Card
            key={asset.id}
            onClick={() => setSelectedAsset(asset)}
            className="p-5 cursor-pointer hover:border-slate-600 transition-all group relative flex flex-col justify-between"
            id={`asset-card-${asset.id}`}
          >
            <div>
              {/* Card Header: Icon + Name */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getAssetIcon(asset.id)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                      {asset.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 block">
                      {asset.criticality}
                    </span>
                  </div>
                </div>

                {/* Risk Badge */}
                <Badge variant={asset.riskVariant} size="sm" dot={asset.risk !== 'Low'}>
                  {asset.risk} Risk
                </Badge>
              </div>

              {/* Financial Exposure Metric */}
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 mb-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Financial Exposure
                </span>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-xl font-mono font-bold text-white group-hover:text-blue-300 transition-colors">
                    {asset.financialExposure}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {asset.connectedVulnerabilities.length} threat{asset.connectedVulnerabilities.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Protection Status + Action */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Protection Status:</span>
                <Badge variant={asset.statusVariant} size="sm">
                  {asset.protectionStatus}
                </Badge>
              </div>

              <span className="text-xs text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                Details <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Visual Section: How Vulnerabilities Connect to Assets */}
      <Card
        title="Visual Vulnerability-to-Asset Mapping"
        subtitle="Visualizing how discovered technical vulnerabilities propagate through entry vectors directly to business assets."
        className="p-5"
        id="visual-mapping-card"
      >
        <div className="space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span className="font-semibold text-slate-300">Technical Vulnerability (Source)</span>
            <span className="hidden sm:inline font-semibold text-slate-300">Attack Path Propagation</span>
            <span className="font-semibold text-slate-300">Exposed Business Asset (Target)</span>
          </div>

          <div className="space-y-3">
            {connectionMappings.map((conn) => {
              const isHovered = activeHoverNode === conn.vulnId || activeHoverNode === conn.assetId;

              return (
                <div
                  key={conn.vulnId}
                  onMouseEnter={() => setActiveHoverNode(conn.vulnId)}
                  onMouseLeave={() => setActiveHoverNode(null)}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isHovered
                      ? 'bg-slate-800/80 border-blue-500/60 shadow-lg shadow-blue-950/20'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Left: Vulnerability Node */}
                  <div className="flex items-center gap-3 sm:w-1/3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 shrink-0">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">
                          {conn.vulnName}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 border border-slate-700 text-rose-400">
                          {conn.vulnSeverity}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">Source Exploit</span>
                    </div>
                  </div>

                  {/* Middle: Attack Path Connector with Directional Flow */}
                  <div className="flex items-center justify-center gap-2 sm:w-1/3 text-xs text-slate-400 py-1 sm:py-0">
                    <div className="hidden sm:flex items-center gap-1 w-full justify-center">
                      <div className="h-0.5 w-10 bg-slate-700 rounded-full" />
                      <div className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 text-center truncate max-w-[180px]">
                        {conn.vector}
                      </div>
                      <ArrowRight className="w-4 h-4 text-blue-400 shrink-0" />
                    </div>

                    <div className="sm:hidden flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                      <span>Path:</span>
                      <strong className="text-slate-300">{conn.vector}</strong>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  </div>

                  {/* Right: Business Asset Node */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:w-1/3">
                    <div className="text-left sm:text-right">
                      <span className="font-bold text-xs text-white block">
                        {conn.assetName}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        {conn.exposure} at risk
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
                      {getAssetIcon(conn.assetId)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Illustrative map demonstrating asset reachability through multi-hop vulnerabilities.</span>
            <button
              onClick={() => onNavigate('attack-paths')}
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
            >
              Analyze in Attack Path Graph <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Asset Risk Table */}
      <Card
        title="Asset Risk Register"
        subtitle="Comprehensive breakdown of business assets, technical connections, and defensive posture."
        id="asset-risk-table-card"
      >
        {/* Table Filters */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {['All', 'Critical', 'High', 'Protected'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            Showing {filteredAssets.length} of {assets.length} business assets
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Asset</th>
                <th className="py-3 px-4 font-semibold">Criticality</th>
                <th className="py-3 px-4 font-semibold">Connected Vulnerabilities</th>
                <th className="py-3 px-4 font-semibold">Attack Paths</th>
                <th className="py-3 px-4 font-semibold">Financial Exposure</th>
                <th className="py-3 px-4 font-semibold">Security Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => setSelectedAsset(asset)}
                >
                  {/* Asset */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0">
                        {getAssetIcon(asset.id)}
                      </div>
                      <div>
                        <span className="font-bold text-white group-hover:text-blue-400 transition-colors block">
                          {asset.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {asset.type}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Criticality */}
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        asset.criticality.includes('Crown Jewel')
                          ? 'danger'
                          : asset.criticality.includes('Core')
                          ? 'warning'
                          : asset.criticality.includes('Tier-2')
                          ? 'info'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {asset.criticality}
                    </Badge>
                  </td>

                  {/* Connected Vulnerabilities */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <span className="font-mono font-bold text-white text-xs block">
                        {asset.connectedVulnerabilities.length} CVEs Detected
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {asset.connectedVulnerabilities.slice(0, 2).map((vuln, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700/80 text-slate-300"
                          >
                            {vuln.name.split(' ')[0]} ({vuln.severity})
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Attack Paths */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <span className="font-mono text-white text-xs font-semibold block">
                        {asset.attackPaths.length} Active Vector{asset.attackPaths.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[200px] block font-mono">
                        {asset.attackPaths[0]}
                      </span>
                    </div>
                  </td>

                  {/* Financial Exposure */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-white text-sm block">
                      {asset.financialExposure}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      FAIR Value at Risk
                    </span>
                  </td>

                  {/* Security Status */}
                  <td className="py-3.5 px-4">
                    <Badge variant={asset.statusVariant} size="sm" dot={asset.protectionStatus !== 'Protected'}>
                      {asset.protectionStatus}
                    </Badge>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAsset(asset);
                      }}
                      className="text-xs"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Asset Profile Detail Modal */}
      {selectedAsset && (
        <Modal
          isOpen={!!selectedAsset}
          onClose={() => setSelectedAsset(null)}
          title={`Asset Profile: ${selectedAsset.name}`}
          description={`Comprehensive risk telemetry and remediation plan for ${selectedAsset.name}`}
          maxWidth="lg"
          primaryAction={{
            label: 'Simulate Asset Protection',
            onClick: () => {
              setSelectedAsset(null);
              onNavigate('attack-paths');
            },
          }}
        >
          <div className="space-y-4 text-xs text-slate-300">
            
            {/* KPI Ribbon */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Risk Level</span>
                <span className="text-base font-bold text-white">{selectedAsset.risk}</span>
                <Badge variant={selectedAsset.riskVariant} size="sm" className="mt-1">
                  {selectedAsset.criticality}
                </Badge>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Financial Exposure</span>
                <span className="text-base font-mono font-bold text-rose-400">{selectedAsset.financialExposure}</span>
                <span className="text-[10px] text-slate-400 block mt-1">Quantified Impact</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Protection Status</span>
                <span className="text-base font-bold text-white">{selectedAsset.protectionStatus}</span>
                <Badge variant={selectedAsset.statusVariant} size="sm" className="mt-1">
                  Owner: {selectedAsset.owner.split('&')[0]}
                </Badge>
              </div>
            </div>

            {/* Description & Classification */}
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="font-semibold text-white block">System Profile & Business Purpose</span>
              <p className="leading-relaxed">{selectedAsset.description}</p>
              
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Data Classification:</span>
                  <strong className="text-slate-200">{selectedAsset.dataClassification}</strong>
                </div>
                {selectedAsset.recordsAtRisk && (
                  <div>
                    <span className="text-slate-400 block">Records At Risk:</span>
                    <strong className="text-rose-400">{selectedAsset.recordsAtRisk}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Connected Vulnerabilities */}
            <div className="space-y-2">
              <span className="font-semibold text-white block">Connected Vulnerabilities</span>
              <div className="space-y-1.5">
                {selectedAsset.connectedVulnerabilities.map((vuln, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-200">{vuln.name}</span>
                    <Badge variant={vuln.severity >= 8.0 ? 'danger' : 'warning'} size="sm">
                      CVSS {vuln.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Attack Paths */}
            <div className="space-y-2">
              <span className="font-semibold text-white block">Reachable Attack Paths</span>
              <div className="space-y-1.5">
                {selectedAsset.attackPaths.map((path, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2"
                  >
                    <GitFork className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{path}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Defense */}
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
              <span className="font-semibold block mb-0.5">Recommended Remediation Action:</span>
              <p className="text-[11px] leading-relaxed text-slate-300">{selectedAsset.recommendedFix}</p>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};
