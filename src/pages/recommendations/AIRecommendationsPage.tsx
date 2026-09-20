import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Flame,
  Network,
  ShieldAlert,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Database,
  CreditCard,
  Building2,
  GitFork,
  Cpu,
  Layers,
  Check,
  ExternalLink,
  ChevronRight,
  Zap,
  Activity
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { NavigationTab } from '../../types';

interface AIRecommendationsPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenSimulation?: () => void;
}

interface AlternativeRec {
  id: string;
  title: string;
  cost: string;
  costValueLakhs: number;
  riskReduction: string;
  reductionPercentage: number;
  targetAsset: string;
  attackVector: string;
  description: string;
  implementationTime: string;
}

export const AIRecommendationsPage: React.FC<AIRecommendationsPageProps> = ({
  onNavigate,
  onOpenSimulation,
}) => {
  // Plan states
  const [isMainPlanAdded, setIsMainPlanAdded] = useState<boolean>(false);
  const [addedAlternatives, setAddedAlternatives] = useState<Set<string>>(new Set());
  const [selectedAltRec, setSelectedAltRec] = useState<AlternativeRec | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // Alternative recommendations strictly matching user prompt
  const alternativeRecommendations: AlternativeRec[] = [
    {
      id: 'alt-patch-api',
      title: 'Patch Web API',
      cost: '₹1.2 Lakh',
      costValueLakhs: 1.2,
      riskReduction: '61%',
      reductionPercentage: 61,
      targetAsset: 'Customer Database',
      attackVector: 'Internet → Web API → Customer Database',
      description: 'Upgrades API gateway firmware to v3.4.2, eliminating unauthenticated command injection at the external perimeter.',
      implementationTime: '1 day',
    },
    {
      id: 'alt-deploy-edr',
      title: 'Deploy EDR',
      cost: '₹5.0 Lakh',
      costValueLakhs: 5.0,
      riskReduction: '38%',
      reductionPercentage: 38,
      targetAsset: 'Workstations & Core Servers',
      attackVector: 'Employee Workstations → Lateral Movement',
      description: 'Rolls out agent-based endpoint detection & response across 120 production and finance endpoints.',
      implementationTime: '2 weeks',
    },
    {
      id: 'alt-network-segmentation',
      title: 'Network Segmentation',
      cost: '₹4.5 Lakh',
      costValueLakhs: 4.5,
      riskReduction: '42%',
      reductionPercentage: 42,
      targetAsset: 'ERP & Core Database Subnets',
      attackVector: 'VPN / VLAN-10 → Core Production Tier',
      description: 'Installs stateful micro-segmentation firewalls between general office networks and core database VLANs.',
      implementationTime: '3 weeks',
    },
  ];

  const handleToggleAlternative = (id: string) => {
    setAddedAlternatives((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Calculate planned budget metrics
  const totalPlannedBudgetLakhs =
    (isMainPlanAdded ? 2.5 : 0) +
    Array.from(addedAlternatives).reduce((sum, id) => {
      const item = alternativeRecommendations.find((a) => a.id === id);
      return sum + (item ? item.costValueLakhs : 0);
    }, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="ai-recommendations-view">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              AI Security Recommendations
            </h1>
            <Badge variant="cyber" size="sm">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Autonomous Risk Engine
              </span>
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed max-w-3xl">
            Recommended actions based on business impact, attack paths, financial exposure and available budget.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            Demo data — illustrative values
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSimulation}
            icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
          >
            What-If Simulator
          </Button>
        </div>
      </div>

      {/* Main Recommendation Highlight Box */}
      <div
        id="main-recommendation-card"
        className="rounded-2xl border border-emerald-500/35 bg-gradient-to-b from-[#0F1C2B] via-[#0E1724] to-[#0A101C] p-6 shadow-xl shadow-emerald-950/20 relative overflow-hidden"
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Header Row: Label + Priority Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-500/10">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  Top Recommended Action
                </span>
                <span className="text-[11px] text-slate-400">
                  Optimal choke-point intervention prioritized by FAIR financial exposure
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="warning" size="md">
                Priority: High
              </Badge>
              <Badge variant="cyber" size="md">
                FAIR Quantified
              </Badge>
            </div>
          </div>

          {/* Title & Why Description */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Lock className="w-6 h-6 text-emerald-400 shrink-0" />
              <span>Enable MFA for Privileged Accounts</span>
            </h2>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Why:</span>
              </div>
              <p className="text-slate-300">
                Privileged accounts provide access to high-value systems. Strengthening authentication can reduce the probability of unauthorized access.
              </p>
            </div>
          </div>

          {/* Metrics Grid strictly matching user prompt */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* Metric 1: Estimated Cost */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Estimated Cost
              </span>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  ₹2.5 Lakh
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  10% of ₹25L Total Budget
                </span>
              </div>
            </div>

            {/* Metric 2: Estimated Risk Reduction */}
            <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-900/40 flex flex-col justify-between">
              <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider">
                Estimated Risk Reduction
              </span>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                  68%
                </span>
                <span className="text-[11px] text-emerald-400/80 block mt-0.5">
                  Primary Vector Neutralized
                </span>
              </div>
            </div>

            {/* Metric 3: Potential Exposure Addressed */}
            <div className="p-4 rounded-xl bg-blue-950/25 border border-blue-900/40 flex flex-col justify-between">
              <span className="text-[11px] font-medium text-blue-300 uppercase tracking-wider">
                Potential Exposure Addressed
              </span>
              <div className="mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  ₹8.4 Cr
                </span>
                <span className="text-[11px] text-blue-300 block mt-0.5 font-mono">
                  Calculated ROI: 336x
                </span>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Deployment takes approx. 3 days with minimal user disruption.</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('investments')}
                icon={<TrendingUp className="w-4 h-4" />}
                id="btn-add-main-to-investment"
              >
                Add to Investment Plan
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => setIsDetailModalOpen(true)}
              >
                View Reasoning Details
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Alternative Recommendations Section */}
      <div className="space-y-4" id="alternative-recommendations-section">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Alternative Recommendations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Secondary high-leverage security controls evaluated by the AI Risk Engine.
            </p>
          </div>
          <Badge variant="neutral" size="sm">
            3 Alternative Options
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternativeRecommendations.map((alt) => {
            const isAdded = addedAlternatives.has(alt.id);

            return (
              <Card
                key={alt.id}
                className={`p-5 flex flex-col justify-between transition-all group ${
                  isAdded
                    ? 'border-emerald-500/50 bg-slate-900/95'
                    : 'border-slate-800/80 bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Card Header: Title + Cost Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                      {alt.title}
                    </h4>
                    <span className="font-mono text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700 shrink-0">
                      {alt.cost}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    {alt.description}
                  </p>

                  {/* Target & Vector Meta */}
                  <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/70 text-[11px] space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Asset:</span>
                      <strong className="text-slate-200">{alt.targetAsset}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Est. Time:</span>
                      <span className="text-slate-300">{alt.implementationTime}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics & Action Row */}
                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Risk Reduction:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      {alt.riskReduction}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={isAdded ? 'secondary' : 'primary'}
                      size="sm"
                      className="w-full text-xs justify-center"
                      onClick={() => handleToggleAlternative(alt.id)}
                      icon={isAdded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : undefined}
                    >
                      {isAdded ? 'In Plan ✓' : 'Add to Plan'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-2.5"
                      onClick={() => setSelectedAltRec(alt)}
                      title="Inspect control details"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Section: "Why CyberRiskX recommends this" */}
      <Card
        title="Why CyberRiskX recommends this"
        subtitle="Quantitative reasoning connecting business assets, attack reachability, and financial ROI."
        className="p-6"
        id="why-cyberriskx-recommends-card"
      >
        <div className="space-y-4">
          
          <p className="text-xs text-slate-300 leading-relaxed">
            Conventional vulnerability management overwhelms security teams with thousands of raw CVEs. CyberRiskX’s AI Recommendation Engine cuts through the noise by evaluating 5 interconnected business dimensions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
            
            {/* 1. Business Asset */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-2.5">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  1. Business Asset
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Focuses defensive capital on Tier-1 Crown Jewels: the <strong>Payment System</strong> and <strong>Customer Database</strong>.
                </p>
              </div>
              <span className="text-[10px] text-blue-400 mt-2 font-medium">Critical Crown Jewels</span>
            </div>

            {/* 2. Attack Path */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 mb-2.5">
                  <GitFork className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  2. Attack Path
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Breaks the lateral pivot chain: <em>Employee Credential → Finance Server → Core Settlement Ledger</em>.
                </p>
              </div>
              <span className="text-[10px] text-rose-400 mt-2 font-medium">Choke-Point Severance</span>
            </div>

            {/* 3. Financial Exposure */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-2.5">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  3. Financial Exposure
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Directly addresses <strong>₹8.4 Cr</strong> in combined business interruption, regulatory penalties, and customer churn risk.
                </p>
              </div>
              <span className="text-[10px] text-amber-400 mt-2 font-mono font-medium">₹8.4 Cr Shielded</span>
            </div>

            {/* 4. Implementation Cost */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-2.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  4. Implementation Cost
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Requires only <strong>₹2.5 Lakh</strong>, preserving 90% of the available ₹25 Lakh security budget for other controls.
                </p>
              </div>
              <span className="text-[10px] text-cyan-400 mt-2 font-mono font-medium">₹2.5L Allocated</span>
            </div>

            {/* 5. Risk Reduction */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
                  5. Risk Reduction
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Delivers <strong>68%</strong> aggregate loss reduction, producing an unprecedented <strong>336x ROI</strong> on invested capital.
                </p>
              </div>
              <span className="text-[10px] text-emerald-400 mt-2 font-bold">68% Risk Reduction</span>
            </div>

          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
            <span>
              Total Security Budget: <strong className="text-white font-mono">₹25 Lakh</strong> • Planned Allocation: <strong className="text-emerald-400 font-mono">₹{totalPlannedBudgetLakhs.toFixed(1)} Lakh</strong>
            </span>
            <button
              onClick={() => onNavigate('investments')}
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 self-start sm:self-auto"
            >
              Open Investment & ROI Planner <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </Card>

      {/* Modal: Detailed Reasoning Popover */}
      {isDetailModalOpen && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title="Recommendation Deep Dive: Enable MFA for Privileged Accounts"
          description="Algorithmic justification and FAIR loss distribution analysis"
          maxWidth="lg"
          primaryAction={{
            label: isMainPlanAdded ? 'Already in Plan ✓' : 'Add to Investment Plan',
            onClick: () => {
              setIsMainPlanAdded(true);
              setIsDetailModalOpen(false);
            },
          }}
        >
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-[#0D1525] border border-blue-500/25 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Cost</span>
                <span className="text-lg font-mono font-bold text-white block">₹2.5 Lakh</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Loss Reduction</span>
                <span className="text-lg font-mono font-bold text-emerald-400 block">68%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Exposure Addressed</span>
                <span className="text-lg font-mono font-bold text-blue-400 block">₹8.4 Cr</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-white block">Algorithmic Choke-Point Analysis:</span>
              <p className="leading-relaxed">
                By enforcing hardware-backed FIDO2 MFA on all 14 privileged finance operators, the threat actor’s ability to reuse stolen session tokens or execute SIM-swap bypasses on the finance jump server is reduced to near zero.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Affected Critical Systems:</span>
                <strong className="text-white">Payment Core Ledger & Treasury Bastions</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Vulnerability:</span>
                <span className="text-amber-400 font-mono">CVE-2023-46805 (Weak MFA / Bypass)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Compliance Alignment:</span>
                <span className="text-emerald-400">RBI Master Direction & DPDP Act 2023</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Alternative Recommendation Details */}
      {selectedAltRec && (
        <Modal
          isOpen={!!selectedAltRec}
          onClose={() => setSelectedAltRec(null)}
          title={`Control Specification: ${selectedAltRec.title}`}
          description={`Targeted defense on ${selectedAltRec.targetAsset}`}
          maxWidth="md"
          primaryAction={{
            label: addedAlternatives.has(selectedAltRec.id) ? 'Remove from Plan' : 'Add to Plan',
            onClick: () => {
              handleToggleAlternative(selectedAltRec.id);
              setSelectedAltRec(null);
            },
          }}
        >
          <div className="space-y-3.5 text-xs text-slate-300">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Estimated Cost</span>
                <span className="text-base font-mono font-bold text-white block">{selectedAltRec.cost}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase">Risk Reduction</span>
                <span className="text-base font-mono font-bold text-emerald-400 block">{selectedAltRec.riskReduction}</span>
              </div>
            </div>

            <p className="leading-relaxed">{selectedAltRec.description}</p>

            <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Attack Vector:</span>
                <span className="text-white font-mono">{selectedAltRec.attackVector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Deployment Estimate:</span>
                <span className="text-white">{selectedAltRec.implementationTime}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
