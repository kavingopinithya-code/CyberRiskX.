import React, { useState } from 'react';
import {
  AlertTriangle,
  Flame,
  Globe,
  Network,
  Database,
  ShieldCheck,
  ShieldAlert,
  ArrowDown,
  CheckCircle2,
  Sparkles,
  Info,
  DollarSign,
  Lock,
  Layers,
  ChevronRight,
  TrendingDown,
  Server,
  Filter,
  Check,
  RotateCcw,
  Zap,
  Activity
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { NavigationTab } from '../../types';
import { AIExplanationModal } from '../../components/attack-paths/AIExplanationModal';
import { DEFAULT_ATTACK_PATH_CONTEXT, AttackPathContext } from '../../services/aiExplanationService';

interface AttackPathAnalysisPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenSimulation?: () => void;
}

type SuggestedControlId = 'patch-api' | 'segmentation' | 'waf';

interface SuggestedControl {
  id: SuggestedControlId;
  title: string;
  estimatedCost: string;
  costValueLakhs: number;
  riskReduction: string;
  reductionPercentage: number;
  description: string;
  chokePointBreakLocation: string;
}

export const AttackPathAnalysisPage: React.FC<AttackPathAnalysisPageProps> = ({
  onNavigate,
  onOpenSimulation,
}) => {
  // Active selected controls for simulation
  const [activeControls, setActiveControls] = useState<Set<SuggestedControlId>>(new Set());
  const [isSimModalOpen, setIsSimModalOpen] = useState<boolean>(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [selectedNodeDetails, setSelectedNodeDetails] = useState<string | null>(null);

  const attackPathAIContext: AttackPathContext = {
    vulnerability: 'Outdated Web API (CVE-2024-3400)',
    technicalSeverity: '9.8 / 10 (Critical)',
    attackPath: 'Public Internet → Outdated Web API → Internal Network → Customer Database',
    targetBusinessAsset: 'Customer Database (PostgreSQL Production Cluster)',
    financialExposure: '₹4.8 Cr (FAIR Value at Risk)',
    recommendedControl: 'Patch Web API Gateway (₹1.2 Lakh, 61% risk reduction)',
    assetCriticality: 'Tier-1 Crown Jewel',
    dataAtRisk: '2.4M Customer Records (PII & Financial Accounts)',
  };

  const suggestedControls: SuggestedControl[] = [
    {
      id: 'patch-api',
      title: 'Patch Web API',
      estimatedCost: '₹1.2 Lakh',
      costValueLakhs: 1.2,
      riskReduction: '61%',
      reductionPercentage: 61,
      description: 'Upgrades API gateway firmware to v3.4.2 and patches unauthenticated RCE CVE-2024-3400 directly at ingress.',
      chokePointBreakLocation: 'Internet → Web API connection severed',
    },
    {
      id: 'segmentation',
      title: 'Network Segmentation',
      estimatedCost: '₹4.5 Lakh',
      costValueLakhs: 4.5,
      riskReduction: '42%',
      reductionPercentage: 42,
      description: 'Enforces strict micro-segmentation ACLs between web tiers and internal database VLAN-10 cluster.',
      chokePointBreakLocation: 'Internal Network → Customer Database connection severed',
    },
    {
      id: 'waf',
      title: 'Web Application Firewall',
      estimatedCost: '₹3.0 Lakh',
      costValueLakhs: 3.0,
      riskReduction: '35%',
      reductionPercentage: 35,
      description: 'Deploys managed Cloud WAF with signature rule 8021 to virtually patch incoming malicious command payloads.',
      chokePointBreakLocation: 'External traffic sanitized before reaching Web API',
    },
  ];

  const toggleControl = (id: SuggestedControlId) => {
    setActiveControls((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Calculate dynamic simulation stats
  const totalReductionPct = Math.min(
    92,
    Array.from(activeControls).reduce((sum, id) => {
      const c = suggestedControls.find((ctrl) => ctrl.id === id);
      return sum + (c ? c.reductionPercentage * 0.75 : 0);
    }, 0)
  );

  const totalCostLakhs = Array.from(activeControls).reduce((sum, id) => {
    const c = suggestedControls.find((ctrl) => ctrl.id === id);
    return sum + (c ? c.costValueLakhs : 0);
  }, 0);

  const baselineExposure = 4.8; // ₹4.8 Cr
  const simulatedRemainingExposure = (baselineExposure * (1 - totalReductionPct / 100)).toFixed(2);
  const simulatedExposureSaved = (baselineExposure - parseFloat(simulatedRemainingExposure)).toFixed(2);

  const isPathSevered = activeControls.size > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="attack-path-analysis-view">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Attack Path Analysis
            </h1>
            <Badge variant="danger" size="sm" dot>
              Active Vector
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed max-w-3xl">
            Trace how a vulnerability can reach a critical business asset and estimate potential financial exposure.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAIModalOpen(true)}
            icon={<Sparkles className="w-4 h-4 text-blue-400" />}
            className="border-blue-500/40 text-blue-300 hover:bg-blue-950/40 hover:text-white bg-blue-950/20"
            id="btn-explain-risk-ai-header"
          >
            Explain Risk with AI
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSimModalOpen(true)}
            icon={<Zap className="w-4 h-4" />}
            id="btn-open-simulation-modal"
          >
            Simulate Risk Reduction
          </Button>
        </div>
      </div>

      {/* Prominent Warning Banner: "Critical attack path detected" */}
      <div
        id="critical-attack-path-banner"
        className="p-4 rounded-xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-[#19111E] to-[#121626] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-rose-950/20"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-rose-300 tracking-tight">
                Critical attack path detected
              </span>
              <Badge variant="danger" size="sm">
                Direct External Route
              </Badge>
              <span className="text-[11px] font-mono text-slate-400">
                Vector ID: AP-7029
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Adversary can traverse from Public Internet through Outdated Web API and Internal Network to compromise Customer Database.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-rose-500/20">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Financial Loss At Stake</span>
            <span className="text-lg font-mono font-bold text-rose-400">₹4.8 Cr</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Diagram + Why it Matters (Left 8 Cols) vs Attack Path Risk Side Panel (Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Visual Diagram & Narrative */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Visual Attack-Path Diagram Card */}
          <Card
            title="Visual Attack-Path Diagram"
            subtitle="Step-by-step propagation from external surface to Crown Jewel data tier."
            className="p-5"
            id="attack-path-diagram-card"
          >
            {/* Simulation Active Indicator Banner inside diagram */}
            {isPathSevered && (
              <div className="mb-5 p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Simulation Active:</strong> {activeControls.size} control{activeControls.size > 1 ? 's' : ''} applied. Attack path severed.
                  </span>
                </div>
                <button
                  onClick={() => setActiveControls(new Set())}
                  className="text-[11px] text-emerald-400 hover:text-white underline font-mono flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            )}

            {/* Visual Path Flow */}
            <div className="flex flex-col items-center space-y-3 py-2">
              
              {/* NODE 1: Internet */}
              <div
                onClick={() => setSelectedNodeDetails('Internet')}
                className="w-full max-w-md p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/60 transition-all cursor-pointer shadow-md group relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-cyan-400 font-mono font-semibold uppercase tracking-wider block">
                        Origin Node
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        Internet
                      </h4>
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">
                    Public Surface
                  </Badge>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
                  <span>Entry Port: <strong>443 / HTTPS</strong></span>
                  <span className="font-mono text-slate-500">IP: 0.0.0.0/0</span>
                </div>
              </div>

              {/* CONNECTOR 1 */}
              <div className="flex flex-col items-center justify-center my-1 relative">
                {activeControls.has('patch-api') || activeControls.has('waf') ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-400 my-1 animate-pulse">
                    <ShieldCheck className="w-3 h-3" /> PATH SEVERED BY CONTROL
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-rose-400">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 via-rose-500 to-rose-500" />
                    <ArrowDown className="w-4 h-4 -mt-1 text-rose-400 animate-bounce" />
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5">Ingress Traffic</span>
                  </div>
                )}
              </div>

              {/* NODE 2: Outdated Web API */}
              <div
                onClick={() => setSelectedNodeDetails('Outdated Web API')}
                className={`w-full max-w-md p-4 rounded-xl transition-all cursor-pointer shadow-md group relative ${
                  activeControls.has('patch-api')
                    ? 'bg-slate-900/90 border border-emerald-500/40'
                    : 'bg-rose-950/20 border border-rose-500/40 hover:border-rose-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-rose-400 font-mono font-semibold uppercase tracking-wider">
                          Primary Choke Point
                        </span>
                        <Badge variant="danger" size="sm">
                          CVSS 9.8
                        </Badge>
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">
                        Outdated Web API
                      </h4>
                    </div>
                  </div>
                  {activeControls.has('patch-api') ? (
                    <Badge variant="success" size="sm">
                      Patched
                    </Badge>
                  ) : (
                    <Badge variant="danger" size="sm" dot>
                      Exploitable
                    </Badge>
                  )}
                </div>
                <div className="mt-2 text-[11px] text-slate-300 flex items-center justify-between border-t border-slate-800/80 pt-2">
                  <span className="font-mono text-slate-400">CVE-2024-3400</span>
                  <span className="text-rose-400 font-medium">Unauthenticated RCE</span>
                </div>
              </div>

              {/* CONNECTOR 2 */}
              <div className="flex flex-col items-center justify-center my-1 relative">
                {activeControls.has('segmentation') ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-400 my-1 animate-pulse">
                    <Lock className="w-3 h-3" /> LATERAL PIVOT BLOCKED
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-amber-400">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-rose-500 to-amber-500" />
                    <ArrowDown className="w-4 h-4 -mt-1 text-amber-400" />
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5">Lateral Pivot</span>
                  </div>
                )}
              </div>

              {/* NODE 3: Internal Network */}
              <div
                onClick={() => setSelectedNodeDetails('Internal Network')}
                className="w-full max-w-md p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-500/60 transition-all cursor-pointer shadow-md group relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Network className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono font-semibold uppercase tracking-wider block">
                        Transit Node
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        Internal Network
                      </h4>
                    </div>
                  </div>
                  <Badge variant="warning" size="sm">
                    VLAN-10
                  </Badge>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
                  <span>Routing: <strong>Unsegmented Core</strong></span>
                  <span className="text-amber-400">Permissive Bridge</span>
                </div>
              </div>

              {/* CONNECTOR 3 */}
              <div className="flex flex-col items-center justify-center my-1">
                <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-rose-500" />
                <ArrowDown className="w-4 h-4 -mt-1 text-rose-400" />
                <span className="text-[10px] font-mono text-slate-400 mt-0.5">Database Exfiltration Link</span>
              </div>

              {/* NODE 4: Customer Database */}
              <div
                onClick={() => setSelectedNodeDetails('Customer Database')}
                className="w-full max-w-md p-4 rounded-xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-rose-950/30 border border-rose-500/40 hover:border-rose-300 transition-all cursor-pointer shadow-md group relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-blue-400 font-mono font-semibold uppercase tracking-wider">
                          Crown Jewel Target
                        </span>
                        <Badge variant="danger" size="sm">
                          Tier-1
                        </Badge>
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">
                        Customer Database
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Exposure</span>
                    <span className="text-sm font-mono font-bold text-rose-400">₹4.8 Cr</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-slate-300 flex items-center justify-between border-t border-slate-800/80 pt-2">
                  <span>Data at Risk: <strong>2.4M Customer Records</strong></span>
                  <span className="text-slate-400 font-mono">PostgreSQL</span>
                </div>
              </div>

            </div>

            {/* Diagram Footer Controls */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Click any node for node-level vulnerability telemetry</span>
              <button
                onClick={() => setSelectedNodeDetails('Outdated Web API')}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Inspect Choke Point →
              </button>
            </div>
          </Card>

          {/* Section: Why this path matters */}
          <Card
            title="Why this path matters"
            subtitle="Connecting technical vulnerability metrics directly to corporate business exposure."
            id="why-this-path-matters-card"
          >
            <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
              <p>
                In standard cybersecurity scanners, vulnerabilities are ranked strictly by theoretical CVSS severity scores. 
                However, a 9.8 vulnerability isolated on a disconnected test bench causes negligible corporate harm.
              </p>
              
              <div className="p-3.5 rounded-xl bg-[#0F1524] border border-blue-500/20 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">
                    Critical Crown Jewel Reachability:
                  </span>
                  <p className="text-slate-300">
                    This specific vulnerability matters acutely because a fully verified, unsegmented attack path exists 
                    stretching from the <strong>Public Internet</strong> directly into your <strong>Customer Database</strong>. 
                    An external attacker requires zero internal network credentials to execute this sequence.
                  </p>
                </div>
              </div>

              <p>
                Compromise of this asset risks exposure of <strong>2.4M customer records</strong>, triggering mandatory statutory disclosures 
                under India’s Digital Personal Data Protection (DPDP) Act, reputational churn, and an estimated quantifiable business loss of <strong>₹4.8 Cr</strong>. 
                Remediating this choke point breaks the entire chain.
              </p>
            </div>
          </Card>

          {/* Section: Suggested Controls to Break the Path */}
          <div className="space-y-3" id="suggested-controls-section">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Suggested Controls to Break the Path
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select controls to model risk reduction and budget utilization.
                </p>
              </div>
              <Badge variant="cyber" size="sm">
                3 Actionable Choke Points
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {suggestedControls.map((ctrl) => {
                const isSelected = activeControls.has(ctrl.id);

                return (
                  <div
                    key={ctrl.id}
                    onClick={() => toggleControl(ctrl.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900/95 border-emerald-500/60 shadow-md shadow-emerald-950/20'
                        : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    <div>
                      {/* Top status indicator */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-white group-hover:text-blue-300 transition-colors">
                          {ctrl.title}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-white'
                              : 'border border-slate-700 bg-slate-800 text-transparent group-hover:border-slate-600'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-normal">
                        {ctrl.description}
                      </p>
                    </div>

                    {/* Metric Rows */}
                    <div className="pt-2.5 border-t border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Estimated Cost:</span>
                        <span className="font-mono font-bold text-white">
                          {ctrl.estimatedCost}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Risk Reduction:</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {ctrl.riskReduction}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Simulation Trigger Bar */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Active Simulation:</span>
                <span className="font-mono font-bold text-white">
                  {activeControls.size} of 3 controls selected
                </span>
                {activeControls.size > 0 && (
                  <span className="text-emerald-400 font-mono font-semibold">
                    (Severing {totalReductionPct}% of risk)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('investments')}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Simulate Risk Reduction
                </Button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (4 cols): Attack Path Risk Side Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Side Panel: Attack Path Risk */}
          <Card
            title="Attack Path Risk"
            subtitle="Quantitative risk summary and crown jewel impact assessment."
            className="border-rose-500/25 bg-gradient-to-b from-[#121726] to-[#0D121F]"
            id="attack-path-risk-side-panel"
          >
            <div className="space-y-3.5">
              
              {/* Overall Business Risk Callout */}
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-rose-300 uppercase tracking-wider block font-semibold">
                    Overall Business Risk
                  </span>
                  <span className="text-2xl font-extrabold text-rose-400 tracking-tight">
                    Critical
                  </span>
                </div>
                <Badge variant="danger" size="md" dot>
                  Immediate Choke Point
                </Badge>
              </div>

              {/* Data Rows strictly matching prompt */}
              <div className="space-y-2.5 text-xs">
                
                {/* Entry Point */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Entry Point:</span>
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    Public Internet
                  </span>
                </div>

                {/* Primary Vulnerability */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Primary Vulnerability:</span>
                  <span className="font-semibold text-rose-300">
                    Outdated Web API
                  </span>
                </div>

                {/* Technical Severity */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Technical Severity:</span>
                  <Badge variant="danger" size="sm">
                    <span className="font-mono font-bold text-xs">9.8 / 10</span>
                  </Badge>
                </div>

                {/* Attack Probability */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Attack Probability:</span>
                  <Badge variant="warning" size="sm">
                    High
                  </Badge>
                </div>

                {/* Target Asset */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400">Target Asset:</span>
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-400" />
                    Customer Database
                  </span>
                </div>

                {/* Data at Risk */}
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Data at Risk:</span>
                    <span className="font-semibold text-white">
                      2.4M customer records
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block text-right">
                    (illustrative)
                  </span>
                </div>

                {/* Potential Exposure */}
                <div className="p-3 rounded-xl bg-[#0B1324] border border-blue-500/30 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Potential Exposure:</span>
                  <div className="text-right">
                    <span className="text-xl font-mono font-extrabold text-emerald-400 block">
                      ₹4.8 Cr
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-medium">
                      FAIR Quantified Loss
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center border-blue-500/40 text-blue-300 hover:bg-blue-950/40 hover:text-white bg-blue-950/20 font-semibold"
                  onClick={() => setIsAIModalOpen(true)}
                  icon={<Sparkles className="w-4 h-4 text-blue-400" />}
                  id="btn-explain-risk-ai"
                >
                  Explain Risk with AI
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setIsSimModalOpen(true)}
                  icon={<Zap className="w-4 h-4" />}
                  id="btn-sidepanel-simulate-reduction"
                >
                  Simulate Risk Reduction
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center text-xs"
                  onClick={() => onNavigate('vulnerabilities')}
                >
                  View Related Vulnerabilities
                </Button>
              </div>

            </div>
          </Card>

          {/* Quick Context Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Choke Point Remediation Philosophy</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              CyberRiskX prioritizes high-leverage bottlenecks. Patching the Web API or segmenting the internal network 
              renders downstream exploitation physically impossible, eliminating 61%–92% of business exposure for a fraction of full-system overhaul costs.
            </p>
          </div>

        </div>

      </div>

      {/* Simulation Modal */}
      <Modal
        isOpen={isSimModalOpen}
        onClose={() => setIsSimModalOpen(false)}
        title="Simulate Attack Path Risk Reduction"
        description="Model the financial and reachability impact of breaking the Web API → Customer Database path."
        maxWidth="lg"
        primaryAction={{
          label: 'Deploy Selected Controls',
          onClick: () => {
            setIsSimModalOpen(false);
            onNavigate('investments');
          },
        }}
      >
        <div className="space-y-4">
          
          {/* Comparative Exposure Ribbon */}
          <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-[#0D1525] border border-blue-500/25">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Current Exposure</span>
              <span className="text-lg font-mono font-bold text-rose-400">₹4.8 Cr</span>
              <span className="text-[10px] text-rose-400/80 block">Unmitigated</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Post-Control Exposure</span>
              <span className="text-lg font-mono font-bold text-emerald-400">
                {activeControls.size > 0 ? `₹${simulatedRemainingExposure} Cr` : '₹1.87 Cr (Model)'}
              </span>
              <span className="text-[10px] text-emerald-400 block">
                {activeControls.size > 0 ? `${totalReductionPct}% Reduction` : '61% Projected'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Remediation Cost</span>
              <span className="text-lg font-mono font-bold text-white">
                {activeControls.size > 0 ? `₹${totalCostLakhs.toFixed(1)} Lakh` : '₹1.2 Lakh'}
              </span>
              <span className="text-[10px] text-blue-300 block">Capital Required</span>
            </div>
          </div>

          {/* Interactive Controls Selector in Modal */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-white block">
              Toggle Controls to Model Impact:
            </span>
            <div className="space-y-2">
              {suggestedControls.map((ctrl) => {
                const isSelected = activeControls.has(ctrl.id);

                return (
                  <div
                    key={ctrl.id}
                    onClick={() => toggleControl(ctrl.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-emerald-950/20 border-emerald-500/50 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center ${
                          isSelected ? 'bg-emerald-500 text-white' : 'border border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="font-semibold block">{ctrl.title}</span>
                        <span className="text-[11px] text-slate-400">{ctrl.chokePointBreakLocation}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-emerald-400 font-bold block">-{ctrl.riskReduction}</span>
                      <span className="font-mono text-slate-400 text-[10px]">{ctrl.estimatedCost}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-white block mb-1">Executive Takeaway:</span>
            By deploying <strong>Patch Web API</strong> (₹1.2 Lakh), the direct unauthenticated connection between the Internet and internal services is severed, 
            protecting <strong>₹2.9+ Cr</strong> in customer PII liability at an ROI exceeding <strong>240x</strong>.
          </div>

        </div>
      </Modal>

      {/* Node Inspection Modal */}
      {selectedNodeDetails && (
        <Modal
          isOpen={!!selectedNodeDetails}
          onClose={() => setSelectedNodeDetails(null)}
          title={`Node Inspection: ${selectedNodeDetails}`}
          description="Attack path topological node telemetry and configuration"
          maxWidth="md"
        >
          <div className="space-y-3 text-xs text-slate-300">
            {selectedNodeDetails === 'Internet' && (
              <>
                <p>Public ingress layer. Exposes ports 80 and 443 through the Cloud Load Balancer.</p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between"><span>Protocol:</span><strong className="text-white">HTTPS / TLS 1.3</strong></div>
                  <div className="flex justify-between"><span>Traffic:</span><strong className="text-white">Unauthenticated public</strong></div>
                </div>
              </>
            )}
            {selectedNodeDetails === 'Outdated Web API' && (
              <>
                <p>Web API gateway operating firmware v3.3.8 with CVE-2024-3400 command injection vulnerability.</p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between"><span>Severity:</span><strong className="text-rose-400">9.8 Critical</strong></div>
                  <div className="flex justify-between"><span>Choke Point:</span><strong className="text-emerald-400">Patchable at ₹1.2 Lakh</strong></div>
                </div>
              </>
            )}
            {selectedNodeDetails === 'Internal Network' && (
              <>
                <p>Internal VLAN-10 enterprise routing plane. Lacks micro-segmentation barrier to database subnet.</p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between"><span>Segmentation:</span><strong className="text-amber-400">Flat network</strong></div>
                  <div className="flex justify-between"><span>Pivot Risk:</span><strong className="text-rose-400">High</strong></div>
                </div>
              </>
            )}
            {selectedNodeDetails === 'Customer Database' && (
              <>
                <p>High-sensitivity PostgreSQL cluster containing 2.4M customer records and authentication tokens.</p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between"><span>Financial Value:</span><strong className="text-emerald-400">₹4.8 Cr</strong></div>
                  <div className="flex justify-between"><span>Compliance:</span><strong className="text-white">DPDP / RBI Mandated</strong></div>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}

      {/* CyberRiskX AI Explanation Modal */}
      <AIExplanationModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        context={attackPathAIContext}
        onNavigateToSimulator={() => onNavigate('investments')}
      />

    </div>
  );
};
