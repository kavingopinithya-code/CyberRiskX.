import React from 'react';
import { NavigationTab } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ArrowLeft, Sparkles, Layers, ShieldCheck, Database, Sliders } from 'lucide-react';

interface ModulePlaceholderProps {
  tab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenSimulation: () => void;
}

const moduleDetails: Record<
  NavigationTab,
  {
    title: string;
    description: string;
    category: string;
    highlights: string[];
    simulatedStat: string;
    statLabel: string;
  }
> = {
  dashboard: {
    title: 'Executive Dashboard',
    description: 'High-level C-Suite posture and ROI',
    category: 'Executive Layer',
    highlights: ['Quantified financial exposure', 'Prioritized choke points', 'ROI analytics'],
    simulatedStat: '₹12.4 Cr',
    statLabel: 'Current Exposure',
  },
  vulnerabilities: {
    title: 'Vulnerability Prioritization',
    description: 'Prioritize vulnerabilities based on technical severity, attack-path reachability, business impact and financial exposure.',
    category: 'Vulnerability Prioritization',
    highlights: [
      'Correlate raw CVEs with Crown Jewel business assets',
      'Attack-path reachability verification eliminating noise',
      'Calculated financial exposure and ROI-optimized action',
    ],
    simulatedStat: '8 Critical',
    statLabel: 'Critical Business Risks',
  },
  'attack-paths': {
    title: 'Attack Paths',
    description: 'Graph analysis from external attack surfaces to sensitive payment and database systems',
    category: 'Graph Analytics',
    highlights: [
      'Multi-hop path verification from edge firewalls to core databases',
      'Bottleneck detection identifying high-leverage choke points',
      'Remediation cost vs. exposure reduction comparison',
    ],
    simulatedStat: '2 Reachable',
    statLabel: 'Active Vectors to Crown Jewels',
  },
  'business-assets': {
    title: 'Business Assets Inventory',
    description: 'Crown jewels, payment gateways, ERP systems, and customer databases',
    category: 'Asset Valuation',
    highlights: [
      'Customer Database (₹4.8 Cr exposure at risk)',
      'Payment System (₹3.2 Cr exposure at risk)',
      'ERP System (₹1.9 Cr exposure at risk)',
    ],
    simulatedStat: '₹45+ Cr',
    statLabel: 'Total Asset Value',
  },
  'ai-recommendations': {
    title: 'AI Recommendations Engine',
    description: 'Smarter cybersecurity decisions recommending optimal choke-point mitigations',
    category: 'Decision Intelligence',
    highlights: [
      'Automated choke-point identification to break multiple attack paths',
      'Fix effort estimation vs risk reduction quantification',
      'Defensible compliance reporting for board oversight',
    ],
    simulatedStat: '74% Reduction',
    statLabel: 'Risk Reduction Target',
  },
  investments: {
    title: 'Security Budget & Investments',
    description: 'Optimizing security capital allocation for maximum quantified risk reduction',
    category: 'Capital Allocation',
    highlights: [
      'Remediation budget allocation modeling',
      'Prioritized choke-point remediation backlog',
      'Quantified ROI metric on mitigation spend',
    ],
    simulatedStat: '₹9.2 Cr Saved',
    statLabel: 'Mitigated Exposure',
  },
  reports: {
    title: 'Board & Audit Reports',
    description: 'Defensible executive briefings and cyber risk quantification documentation',
    category: 'Governance & Compliance',
    highlights: [
      'Executive Summary for Board Audit Committees',
      'Underwriting defensibility documentation for Cyber Insurance',
      'One-click export ready reports',
    ],
    simulatedStat: '3 Reports Ready',
    statLabel: 'Audit & Board Decks',
  },
  settings: {
    title: 'Risk Engine Settings & Thresholds',
    description: 'Calibrate financial loss values, Crown Jewel definitions, and FAIR model coefficients',
    category: 'Configuration',
    highlights: [
      'Crown Jewel revenue multiplier calibrations',
      'CVSS-to-Exposure weighting curves',
      'Tenant role-based access management',
    ],
    simulatedStat: 'FAIR v3.2',
    statLabel: 'Risk Engine Standard',
  },
};

export const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({
  tab,
  onNavigate,
  onOpenSimulation,
}) => {
  const details = moduleDetails[tab] || moduleDetails.dashboard;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Dashboard
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">{details.title}</h1>
              <Badge variant="info" size="sm">{details.category}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{details.description}</p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onOpenSimulation}
          icon={<Sparkles className="w-3.5 h-3.5" />}
        >
          Run Simulation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <h2 className="text-sm font-semibold text-white mb-2">Module Capabilities</h2>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {details.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Full Module Integration</div>
              <div className="text-[11px] text-slate-400">
                Data pipeline pre-configured with CyberRiskX decision engine.
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('dashboard')}
            >
              Explore Overview
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400">{details.statLabel}</div>
            <div className="text-3xl font-mono font-bold text-white mt-1">
              {details.simulatedStat}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Simulated enterprise telemetry calibrated for Acme Global Financial Tech.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Badge variant="neutral" size="sm" className="w-full justify-center">
              Active Simulation Mode
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};
