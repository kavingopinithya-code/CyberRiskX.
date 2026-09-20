import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Info,
  Lock,
  Flame,
  Network,
  Cpu,
  PieChart,
  BarChart3,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { OptimizedSecurityPlanPage } from './OptimizedSecurityPlanPage';
import { NavigationTab } from '../../types';

interface SecurityInvestmentSimulatorPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenSimulation?: () => void;
  initialView?: 'simulator' | 'optimized-plan';
  onViewChange?: (view: 'simulator' | 'optimized-plan') => void;
}

interface SecurityAction {
  id: string;
  name: string;
  costLakhs: number;
  costDisplay: string;
  riskReductionPct: number;
  riskReductionDisplay: string;
  targetAsset: string;
  primaryBenefit: string;
  icon: 'patch' | 'mfa' | 'edr' | 'network';
}

export const SecurityInvestmentSimulatorPage: React.FC<SecurityInvestmentSimulatorPageProps> = ({
  onNavigate,
  onOpenSimulation,
  initialView = 'simulator',
  onViewChange,
}) => {
  // Budget Constants
  const TOTAL_BUDGET_LAKHS = 10.0;
  const BASELINE_EXPOSURE_CR = 12.4;

  // View state: 'simulator' or 'optimized-plan'
  const [currentView, setCurrentView] = useState<'simulator' | 'optimized-plan'>(initialView);

  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
    }
  }, [initialView]);

  const handleViewChange = (view: 'simulator' | 'optimized-plan') => {
    setCurrentView(view);
    if (onViewChange) onViewChange(view);
  };

  // Selected action IDs
  const [selectedActionIds, setSelectedActionIds] = useState<Set<string>>(
    new Set(['patch-api', 'enable-mfa'])
  );

  if (currentView === 'optimized-plan') {
    return (
      <OptimizedSecurityPlanPage
        onNavigate={onNavigate}
        onBackToSimulator={() => handleViewChange('simulator')}
        onOpenSimulation={onOpenSimulation}
      />
    );
  }

  // Security actions strictly matching the user prompt
  const securityActions: SecurityAction[] = [
    {
      id: 'patch-api',
      name: 'Patch Web API',
      costLakhs: 1.2,
      costDisplay: '₹1.2 Lakh',
      riskReductionPct: 61,
      riskReductionDisplay: '61%',
      targetAsset: 'Customer Database',
      primaryBenefit: 'Eliminates unauthenticated CVE-2024-3400 RCE at perimeter ingress.',
      icon: 'patch',
    },
    {
      id: 'enable-mfa',
      name: 'Enable MFA',
      costLakhs: 2.5,
      costDisplay: '₹2.5 Lakh',
      riskReductionPct: 68,
      riskReductionDisplay: '68%',
      targetAsset: 'Payment System & Finance Bastion',
      primaryBenefit: 'Enforces hardware FIDO2 credentials on all privileged accounts.',
      icon: 'mfa',
    },
    {
      id: 'deploy-edr',
      name: 'Deploy EDR',
      costLakhs: 5.0,
      costDisplay: '₹5.0 Lakh',
      riskReductionPct: 38,
      riskReductionDisplay: '38%',
      targetAsset: 'All Production Endpoints',
      primaryBenefit: 'Real-time telemetry and lateral movement detection on 120 endpoints.',
      icon: 'edr',
    },
    {
      id: 'network-segmentation',
      name: 'Network Segmentation',
      costLakhs: 4.5,
      costDisplay: '₹4.5 Lakh',
      riskReductionPct: 42,
      riskReductionDisplay: '42%',
      targetAsset: 'Core Database & ERP Subnets',
      primaryBenefit: 'Isolates internal VLAN-10 from untrusted application tiers.',
      icon: 'network',
    },
  ];

  // Dynamic calculations
  const selectedActionsList = securityActions.filter((a) => selectedActionIds.has(a.id));
  
  const totalInvestmentLakhs = selectedActionsList.reduce((sum, a) => sum + a.costLakhs, 0);
  const remainingBudgetLakhs = Math.max(0, TOTAL_BUDGET_LAKHS - totalInvestmentLakhs);

  // Diminishing returns multi-control formula: Residual = Product(1 - r_i)
  const compoundResidualFactor = selectedActionsList.length === 0
    ? 1.0
    : selectedActionsList.reduce((acc, a) => acc * (1 - a.riskReductionPct / 100), 1.0);

  const compoundRiskReductionPct = selectedActionsList.length === 0
    ? 0
    : Math.round((1 - compoundResidualFactor) * 1000) / 10; // e.g. 87.5%

  const remainingExposureCr = selectedActionsList.length === 0
    ? BASELINE_EXPOSURE_CR
    : Math.round(BASELINE_EXPOSURE_CR * compoundResidualFactor * 100) / 100;

  const exposureSavedCr = Math.max(0, Math.round((BASELINE_EXPOSURE_CR - remainingExposureCr) * 100) / 100);

  // Toggle selection with strict budget enforcement rule:
  // "Prevent the user from selecting combinations that exceed the available budget."
  const handleToggleAction = (action: SecurityAction) => {
    const isCurrentlySelected = selectedActionIds.has(action.id);

    if (isCurrentlySelected) {
      setSelectedActionIds((prev) => {
        const next = new Set(prev);
        next.delete(action.id);
        return next;
      });
    } else {
      // Check if adding this action exceeds the budget
      const projectedCost = totalInvestmentLakhs + action.costLakhs;
      if (projectedCost > TOTAL_BUDGET_LAKHS) {
        // Prevent selection if over budget
        return;
      }
      setSelectedActionIds((prev) => {
        const next = new Set(prev);
        next.add(action.id);
        return next;
      });
    }
  };

  // Reset simulator
  const handleReset = () => {
    setSelectedActionIds(new Set());
  };

  // Optimization helper:
  // Optimal knapsack portfolio within ₹10 Lakh:
  // Patch Web API (1.2L) + Enable MFA (2.5L) + Network Segmentation (4.5L) = 8.2L (Under 10L, covers 92.8% reduction)
  const handleApplyOptimalPlan = () => {
    setSelectedActionIds(new Set(['patch-api', 'enable-mfa', 'network-segmentation']));
    handleViewChange('optimized-plan');
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'patch':
        return <Flame className="w-5 h-5 text-rose-400" />;
      case 'mfa':
        return <Lock className="w-5 h-5 text-emerald-400" />;
      case 'edr':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'network':
        return <Network className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="investment-simulator-view">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {currentView === 'simulator' ? 'Security Investment Simulator' : 'Optimized Security Plan'}
            </h1>
            <Badge variant="cyber" size="sm">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-cyan-400" />
                Deterministic Model
              </span>
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed max-w-3xl">
            {currentView === 'simulator'
              ? 'Compare security actions and see how different investments could reduce business risk within your available budget.'
              : 'Algorithmic knapsack optimization recommending the highest risk reduction portfolio within your ₹10 Lakh budget constraint.'}
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            Illustrative calculations — prototype demo
          </span>

          <Button
            variant="primary"
            size="sm"
            onClick={handleApplyOptimalPlan}
            icon={<Sparkles className="w-4 h-4" />}
          >
            Optimize Plan
          </Button>
        </div>
      </div>

      {/* Top Banner: Available Security Budget + Current Financial Exposure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="top-budget-exposure-cards">
        
        {/* Card 1: Available Security Budget */}
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0F1E24] via-[#111A24] to-[#0D151D] flex items-center justify-between shadow-lg shadow-emerald-950/20">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                Available Security Budget
              </span>
              <span className="text-3xl font-extrabold font-mono text-white tracking-tight mt-0.5 block">
                ₹10 Lakh
              </span>
            </div>
          </div>
          <Badge variant="success" size="md">
            Approved CapEx
          </Badge>
        </div>

        {/* Card 2: Current Financial Exposure */}
        <div className="p-5 rounded-2xl border border-rose-500/30 bg-gradient-to-br from-[#1F111E] via-[#19111C] to-[#140F19] flex items-center justify-between shadow-lg shadow-rose-950/20">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider block">
                Current Financial Exposure
              </span>
              <span className="text-3xl font-extrabold font-mono text-rose-400 tracking-tight mt-0.5 block">
                ₹12.4 Cr
              </span>
            </div>
          </div>
          <Badge variant="danger" size="md" dot>
            Baseline Risk
          </Badge>
        </div>

      </div>

      {/* Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (7 cols): Selectable Security Action Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Select Security Actions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click to select multiple actions. Combinations exceeding ₹10 Lakh are automatically blocked.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
                title="Clear all selected actions"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Selection
              </button>
            </div>

            {/* 4 Security Action Cards */}
            <div className="space-y-3" id="selectable-action-cards">
              {securityActions.map((action, index) => {
                const isSelected = selectedActionIds.has(action.id);
                const projectedCost = totalInvestmentLakhs + action.costLakhs;
                const wouldExceedBudget = !isSelected && projectedCost > TOTAL_BUDGET_LAKHS;

                return (
                  <div
                    key={action.id}
                    onClick={() => {
                      if (!wouldExceedBudget) {
                        handleToggleAction(action);
                      }
                    }}
                    className={`p-4 rounded-xl border transition-all select-none relative group ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#0F1F26] via-[#101926] to-[#0F1622] border-emerald-500/70 shadow-md shadow-emerald-950/20 cursor-pointer'
                        : wouldExceedBudget
                        ? 'bg-slate-900/40 border-slate-800/60 opacity-50 cursor-not-allowed'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 cursor-pointer hover:bg-slate-900/95'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      
                      {/* Checkbox + Title + Number */}
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all mt-0.5 shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : wouldExceedBudget
                              ? 'border border-slate-800 bg-slate-900 text-transparent'
                              : 'border border-slate-700 bg-slate-800 group-hover:border-slate-600 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-400">
                              #{index + 1}
                            </span>
                            <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                              {action.name}
                            </h4>
                            {isSelected && (
                              <Badge variant="success" size="sm">
                                Selected
                              </Badge>
                            )}
                            {wouldExceedBudget && (
                              <Badge variant="danger" size="sm">
                                Exceeds ₹10L Budget
                              </Badge>
                            )}
                          </div>

                          <p className="text-xs text-slate-400 mt-1 leading-normal">
                            {action.primaryBenefit}
                          </p>

                          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 font-mono">
                            <span>Target: <strong className="text-slate-300">{action.targetAsset}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Right Metrics: Cost + Risk Reduction */}
                      <div className="text-right shrink-0">
                        <div className="mb-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                            Cost
                          </span>
                          <span className="text-base font-mono font-bold text-white">
                            {action.costDisplay}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                            Risk Reduction
                          </span>
                          <span className="text-base font-mono font-bold text-emerald-400">
                            {action.riskReductionDisplay}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Button: Optimize Security Plan */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#121A2E] to-[#0E1524] border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Algorithmically Optimize Budget
                </span>
                <p className="text-[11px] text-slate-400">
                  Find the mathematical maximum risk-reduction combination within ₹10 Lakh.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleApplyOptimalPlan}
                icon={<Sparkles className="w-4 h-4" />}
                id="btn-optimize-security-plan"
              >
                Optimize Security Plan
              </Button>
            </div>

          </div>

          {/* Right Column (5 cols): Live Calculation Panel */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Calculation Panel */}
            <Card
              title="Live Calculation Panel"
              subtitle="Real-time exposure reduction & capital utilization model."
              className="border-blue-500/30 bg-gradient-to-b from-[#111827] to-[#0D121F] p-5 sticky top-4"
              id="live-calculation-panel"
            >
              <div className="space-y-4">
                
                {/* 1. Selected Investment (Count & List) */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Selected Investment:</span>
                    <Badge variant={selectedActionsList.length > 0 ? 'cyber' : 'neutral'} size="sm">
                      {selectedActionsList.length} of {securityActions.length} Actions
                    </Badge>
                  </div>

                  {selectedActionsList.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic py-1">
                      No actions selected. Choose actions on the left to simulate.
                    </p>
                  ) : (
                    <div className="space-y-1 pt-1">
                      {selectedActionsList.map((action) => (
                        <div
                          key={action.id}
                          className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60 last:border-0"
                        >
                          <span className="text-slate-300 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            {action.name}
                          </span>
                          <span className="font-mono text-white font-medium">
                            {action.costDisplay}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Total Investment */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">
                      Total Investment
                    </span>
                    <span className="text-xs text-slate-500">
                      CapEx Committed
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono font-extrabold text-white">
                      ₹{totalInvestmentLakhs.toFixed(1)} Lakh
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      of ₹{TOTAL_BUDGET_LAKHS.toFixed(1)} Lakh budget
                    </span>
                  </div>
                </div>

                {/* 3. Remaining Budget */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">
                      Remaining Budget
                    </span>
                    <span className="text-xs text-slate-500">
                      Unallocated Reserve
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono font-extrabold text-emerald-400">
                      ₹{remainingBudgetLakhs.toFixed(1)} Lakh
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono block">
                      {((remainingBudgetLakhs / TOTAL_BUDGET_LAKHS) * 100).toFixed(0)}% available
                    </span>
                  </div>
                </div>

                {/* 4. Estimated Risk Reduction */}
                <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/35 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
                      Estimated Risk Reduction
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Compound mitigation factor
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-mono font-extrabold text-emerald-400">
                      {compoundRiskReductionPct}%
                    </span>
                    <span className="text-[10px] text-emerald-300/80 font-mono block">
                      ₹{exposureSavedCr.toFixed(2)} Cr Saved
                    </span>
                  </div>
                </div>

                {/* 5. Estimated Remaining Exposure */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#1E1120] to-[#141424] border border-rose-500/35 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider block">
                      Estimated Remaining Exposure
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Residual FAIR loss risk
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-mono font-extrabold text-rose-400">
                      ₹{remainingExposureCr.toFixed(2)} Cr
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block line-through">
                      Baseline: ₹{BASELINE_EXPOSURE_CR.toFixed(1)} Cr
                    </span>
                  </div>
                </div>

                {/* Call to Action: Optimize Plan */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={handleApplyOptimalPlan}
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    Optimize Security Plan
                  </Button>
                </div>

                {/* Model Disclaimer */}
                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Deterministic calculations for prototype simulation. Evaluates diminishing returns across multi-vector defense layers.
                </p>

              </div>
            </Card>

          </div>

        </div>

    </div>
  );
};
