import React, { useState } from 'react';
import {
  DollarSign,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Info,
  Lock,
  Flame,
  Network,
  Cpu,
  Download,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { NavigationTab } from '../../types';

interface OptimizedSecurityPlanPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onBackToSimulator?: () => void;
  onOpenSimulation?: () => void;
}

interface ActionItem {
  id: string;
  number: number;
  name: string;
  cost: string;
  costLakhs: number;
  description: string;
  targetAsset: string;
  riskReduced: string;
  icon: 'patch' | 'mfa' | 'network' | 'edr';
  priority: 'Critical' | 'High' | 'Medium';
}

export const OptimizedSecurityPlanPage: React.FC<OptimizedSecurityPlanPageProps> = ({
  onNavigate,
  onBackToSimulator,
  onOpenSimulation,
}) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPlanApplied, setIsPlanApplied] = useState(false);
  const [activeActionModal, setActiveActionModal] = useState<ActionItem | null>(null);

  // 4 Recommended Actions strictly adhering to user prompt:
  // 1. Patch Web API: ₹1.2 Lakh, Critical attack path to Customer Database
  // 2. Enable MFA: ₹2.5 Lakh, Protect privileged access to Payment System
  // 3. Network Segmentation: ₹4.5 Lakh, Reduce lateral movement toward ERP System
  // 4. EDR: ₹1.3 Lakh, Improve endpoint visibility
  // Sum = 1.2 + 2.5 + 4.5 + 1.3 = ₹9.5 Lakh (Budget Remaining: ₹50,000 from ₹10 Lakh)
  const recommendedActions: ActionItem[] = [
    {
      id: 'patch-api',
      number: 1,
      name: 'Patch Web API',
      cost: '₹1.2 Lakh',
      costLakhs: 1.2,
      description: 'Critical attack path to Customer Database',
      targetAsset: 'Customer Database',
      riskReduced: '₹3.8 Cr',
      icon: 'patch',
      priority: 'Critical',
    },
    {
      id: 'enable-mfa',
      number: 2,
      name: 'Enable MFA',
      cost: '₹2.5 Lakh',
      costLakhs: 2.5,
      description: 'Protect privileged access to Payment System',
      targetAsset: 'Payment System',
      riskReduced: '₹2.9 Cr',
      icon: 'mfa',
      priority: 'High',
    },
    {
      id: 'network-seg',
      number: 3,
      name: 'Network Segmentation',
      cost: '₹4.5 Lakh',
      costLakhs: 4.5,
      description: 'Reduce lateral movement toward ERP System',
      targetAsset: 'ERP System',
      riskReduced: '₹1.7 Cr',
      icon: 'network',
      priority: 'High',
    },
    {
      id: 'edr',
      number: 4,
      name: 'EDR',
      cost: '₹1.3 Lakh',
      costLakhs: 1.3,
      description: 'Improve endpoint visibility',
      targetAsset: 'Production Workstations & Servers',
      riskReduced: '₹0.5 Cr',
      icon: 'edr',
      priority: 'Medium',
    },
  ];

  const getActionIcon = (type: ActionItem['icon']) => {
    switch (type) {
      case 'patch':
        return <Flame className="w-5 h-5 text-rose-400" />;
      case 'mfa':
        return <Lock className="w-5 h-5 text-emerald-400" />;
      case 'network':
        return <Network className="w-5 h-5 text-amber-400" />;
      case 'edr':
        return <Cpu className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="optimized-security-plan-page">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Recommended Security Investment Plan
            </h1>
            <Badge variant="cyber" size="sm">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Optimized Portfolio
              </span>
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed max-w-3xl">
            A budget-aware security plan designed to reduce the highest-impact business risks.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            Illustrative demo calculations
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={onBackToSimulator}
            icon={<ChevronLeft className="w-4 h-4" />}
            id="btn-back-to-simulator-top"
          >
            Back to Simulator
          </Button>
        </div>
      </div>

      {/* 5 Summary Cards strictly adhering to user prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5" id="plan-summary-kpi-cards">
        
        {/* Card 1: Total Investment */}
        <Card className="p-4 flex flex-col justify-between" id="kpi-total-investment">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Total Investment
          </span>
          <div className="mt-2">
            <span className="text-2xl font-mono font-extrabold text-white block">
              ₹9.5 Lakh
            </span>
            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
              4 controls funded
            </span>
          </div>
        </Card>

        {/* Card 2: Budget Remaining */}
        <Card className="p-4 flex flex-col justify-between" id="kpi-budget-remaining">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Budget Remaining
          </span>
          <div className="mt-2">
            <span className="text-2xl font-mono font-extrabold text-emerald-400 block">
              ₹50,000
            </span>
            <span className="text-[10px] text-emerald-400/80 font-mono block mt-0.5">
              from ₹10 Lakh budget
            </span>
          </div>
        </Card>

        {/* Card 3: Exposure Before */}
        <Card className="p-4 flex flex-col justify-between" id="kpi-exposure-before">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Exposure Before
          </span>
          <div className="mt-2">
            <span className="text-2xl font-mono font-extrabold text-rose-400 block">
              ₹12.4 Cr
            </span>
            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
              Unmitigated baseline
            </span>
          </div>
        </Card>

        {/* Card 4: Estimated Exposure After */}
        <Card className="p-4 flex flex-col justify-between" id="kpi-exposure-after">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Estimated Exposure After
          </span>
          <div className="mt-2">
            <span className="text-2xl font-mono font-extrabold text-blue-300 block">
              ₹3.5 Cr
            </span>
            <span className="text-[10px] text-blue-400/80 font-mono block mt-0.5">
              Residual FAIR risk
            </span>
          </div>
        </Card>

        {/* Card 5: Estimated Risk Reduction */}
        <Card className="p-4 bg-emerald-950/20 border-emerald-500/35 flex flex-col justify-between" id="kpi-risk-reduction">
          <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider block">
            Estimated Risk Reduction
          </span>
          <div className="mt-2">
            <span className="text-2xl font-mono font-extrabold text-emerald-400 block">
              ₹8.9 Cr
            </span>
            <span className="text-[10px] text-emerald-300/80 font-mono block mt-0.5">
              71.8% Loss Prevented
            </span>
          </div>
        </Card>

      </div>

      {/* Recommended Actions Section */}
      <Card
        title="Recommended Actions"
        subtitle="Prioritized deployment sequence maximizing risk reduction within the ₹10 Lakh budget limit."
        id="recommended-actions-card"
        className="p-5"
      >
        <div className="space-y-3">
          {recommendedActions.map((action) => (
            <div
              key={action.id}
              onClick={() => setActiveActionModal(action)}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              id={`action-item-${action.id}`}
            >
              {/* Left: Number + Icon + Title + Description */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold font-mono text-sm text-slate-300 shrink-0 group-hover:border-blue-500/50 transition-colors">
                  {action.number}
                </div>

                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  {getActionIcon(action.icon)}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      {action.name}
                    </h3>
                    <Badge
                      variant={
                        action.priority === 'Critical'
                          ? 'danger'
                          : action.priority === 'High'
                          ? 'warning'
                          : 'info'
                      }
                      size="sm"
                    >
                      {action.priority} Priority
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-300 mt-0.5 leading-normal">
                    {action.description}
                  </p>

                  <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                    Target: <strong className="text-slate-200">{action.targetAsset}</strong> • Mitigates <strong className="text-emerald-400">{action.riskReduced}</strong> exposure
                  </span>
                </div>
              </div>

              {/* Right: Cost and Details arrow */}
              <div className="flex items-center gap-4 sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Allocation
                  </span>
                  <span className="text-base font-mono font-bold text-white block">
                    {action.cost}
                  </span>
                </div>

                <span className="text-xs text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Budget Allocation Progress Bar */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Total Budget Allocation: <strong className="text-white font-mono">₹9.5 Lakh / ₹10.0 Lakh (95%)</strong>
            </span>
            <span className="text-emerald-400 font-mono font-semibold">
              Reserve Buffer: ₹50,000 (5%)
            </span>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800 p-0.5">
            <div style={{ width: '12%' }} className="h-full bg-rose-500 rounded-l-full" title="Patch Web API (₹1.2L)" />
            <div style={{ width: '25%' }} className="h-full bg-emerald-500 ml-0.5" title="Enable MFA (₹2.5L)" />
            <div style={{ width: '45%' }} className="h-full bg-amber-500 ml-0.5" title="Network Segmentation (₹4.5L)" />
            <div style={{ width: '13%' }} className="h-full bg-blue-500 ml-0.5 rounded-r-sm" title="EDR (₹1.3L)" />
            <div style={{ width: '5%' }} className="h-full bg-slate-700/50 ml-0.5 rounded-r-full" title="Remaining Buffer (₹50k)" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2 pt-1 font-mono">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Patch API (1.2L)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> MFA (2.5L)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Segmentation (4.5L)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> EDR (1.3L)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-700 inline-block" /> Buffer (50k)</span>
          </div>
        </div>
      </Card>

      {/* Section: "Why this plan?" strictly adhering to user prompt */}
      <Card
        title="Why this plan?"
        subtitle="Algorithmic justification and strategic risk alignment."
        id="why-this-plan-section"
        className="p-6"
      >
        <div className="space-y-4">
          
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-blue-200 leading-relaxed text-sm">
            <p className="font-semibold text-white mb-1">
              The plan prioritizes actions that address critical attack paths and high-value business assets while staying within the available budget.
            </p>
            <p className="text-xs text-slate-300">
              Rather than spreading cybersecurity capital thinly across non-critical alerts, CyberRiskX identified and severed the two primary attack chains that expose ₹8.9 Cr of enterprise value: external ingress into the Customer Database and privileged pivot into the Payment System.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
            
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Choke-Point Elimination</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Patching the Web API and enforcing MFA removes the single point of entry and the lateral pivot required to compromise core databases.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                <Network className="w-4 h-4 text-amber-400" />
                <span>Defense-in-Depth</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Network Segmentation and EDR contain breach radius if an individual employee workstation is phished, preventing damage to the ERP.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Optimal Capital Efficiency</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Invests ₹9.5 Lakh to preserve ₹8.9 Cr of financial exposure, yielding an exceptional <strong>93.7x return on security investment (ROSI)</strong>.
              </p>
            </div>

          </div>

        </div>
      </Card>

      {/* Bottom Action Buttons strictly adhering to user prompt */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="plan-footer-actions">
        
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {isPlanApplied ? 'Plan currently applied to Active Enterprise Posture.' : 'Ready for executive committee approval and procurement dispatch.'}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            size="md"
            onClick={onBackToSimulator}
            icon={<RotateCcw className="w-4 h-4" />}
            id="btn-back-to-simulator-bottom"
          >
            Back to Simulator
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsExportModalOpen(true)}
            icon={<Download className="w-4 h-4" />}
            id="btn-export-report"
          >
            Export Report
          </Button>

          <Button
            variant={isPlanApplied ? 'secondary' : 'primary'}
            size="md"
            onClick={() => setIsApplyModalOpen(true)}
            icon={isPlanApplied ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
            id="btn-apply-plan"
          >
            {isPlanApplied ? 'Plan Applied ✓' : 'Apply Plan'}
          </Button>
        </div>

      </div>

      {/* Modal: Apply Plan Confirmation */}
      {isApplyModalOpen && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title="Apply Recommended Security Investment Plan"
          description="Commit ₹9.5 Lakh budget allocation to security task force backlogs"
          maxWidth="md"
          primaryAction={{
            label: 'Confirm & Apply Plan',
            onClick: () => {
              setIsPlanApplied(true);
              setIsApplyModalOpen(false);
            },
          }}
        >
          <div className="space-y-3 text-xs text-slate-300">
            <p>
              Applying this plan will generate remediation work tickets across your DevOps, Identity, and Network Infrastructure teams:
            </p>

            <div className="space-y-1.5 p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex justify-between font-mono">
                <span>1. Web API Patching Task</span>
                <span className="text-white font-bold">₹1.2 Lakh</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>2. FIDO2 MFA Rollout</span>
                <span className="text-white font-bold">₹2.5 Lakh</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>3. VLAN Micro-Segmentation</span>
                <span className="text-white font-bold">₹4.5 Lakh</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>4. EDR Agent Fleet Licensing</span>
                <span className="text-white font-bold">₹1.3 Lakh</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-400 font-mono">
                <span>Total Committed CapEx:</span>
                <span>₹9.5 Lakh (Reserve: ₹50,000)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              *Illustrative demo calculations — updates current risk posture telemetry.
            </p>
          </div>
        </Modal>
      )}

      {/* Modal: Export Report */}
      {isExportModalOpen && (
        <Modal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          title="Export Executive Investment Dossier"
          description="Generate Board-ready PDF or CSV summary of the recommended security investment plan"
          maxWidth="md"
          primaryAction={{
            label: 'Download Board Dossier (PDF)',
            onClick: () => {
              setIsExportModalOpen(false);
            },
          }}
        >
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Executive Summary Document Includes:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1 text-[11px]">
                <li>FAIR-aligned loss distribution curves (Before: ₹12.4 Cr vs After: ₹3.5 Cr)</li>
                <li>₹8.9 Cr Risk Reduction breakdown with 93.7x return metrics</li>
                <li>Action implementation schedule and vendor breakdown</li>
                <li>Illustrative demo calculations disclaimer & methodology</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Action Item Details */}
      {activeActionModal && (
        <Modal
          isOpen={!!activeActionModal}
          onClose={() => setActiveActionModal(null)}
          title={`Action Specification: ${activeActionModal.name}`}
          description={`Targeted defense for ${activeActionModal.targetAsset}`}
          maxWidth="md"
          primaryAction={{
            label: 'Done',
            onClick: () => setActiveActionModal(null),
          }}
        >
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Allocated Cost</span>
                <span className="text-base font-mono font-bold text-white block">{activeActionModal.cost}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase">Estimated Loss Prevented</span>
                <span className="text-base font-mono font-bold text-emerald-400 block">{activeActionModal.riskReduced}</span>
              </div>
            </div>

            <p className="leading-relaxed">{activeActionModal.description}</p>

            <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 text-[11px] space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Asset:</span>
                <span className="text-white">{activeActionModal.targetAsset}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Priority Level:</span>
                <span className="text-amber-400">{activeActionModal.priority}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
