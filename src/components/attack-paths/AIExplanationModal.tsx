import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Database,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Copy,
  Check,
  RefreshCw,
  X,
  Layers,
  Cpu,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  AIExplanationResult,
  AttackPathContext,
  generateAttackPathExplanation,
} from '../../services/aiExplanationService';

interface AIExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: AttackPathContext;
  onNavigateToSimulator?: () => void;
}

export const AIExplanationModal: React.FC<AIExplanationModalProps> = ({
  isOpen,
  onClose,
  context,
  onNavigateToSimulator,
}) => {
  const [explanation, setExplanation] = useState<AIExplanationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate on open if not already loaded
  React.useEffect(() => {
    if (isOpen && !explanation) {
      handleGenerate();
    }
  }, [isOpen]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateAttackPathExplanation(context);
      setExplanation(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySummary = () => {
    if (!explanation) return;
    const text = `CyberRiskX AI Risk Briefing\n` +
      `Asset: ${context.targetBusinessAsset}\n` +
      `Vulnerability: ${context.vulnerability} (Severity: ${context.technicalSeverity})\n` +
      `Financial Exposure: ${context.financialExposure}\n` +
      `Recommended Control: ${context.recommendedControl}\n\n` +
      `Executive Summary: ${explanation.summary}\n\n` +
      `Business Impact: ${explanation.businessImpact}\n\n` +
      `Action: ${explanation.chokePointRemediation}`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl bg-[#0F1422] border border-slate-700/80 rounded-2xl shadow-2xl shadow-blue-950/40 text-slate-100 z-10 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        id="cyberriskx-ai-explanation-modal"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-5 border-b border-slate-800/80 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/30 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                CyberRiskX AI Explanation
              </h2>
              <Badge variant="info" size="sm">
                Executive Risk Briefing
              </Badge>
              {explanation?.source === 'gemini' ? (
                <Badge variant="success" size="sm" dot>
                  Gemini 3.8 Analysis
                </Badge>
              ) : (
                <Badge variant="neutral" size="sm">
                  Deterministic Demo Mode
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Business-level risk justification synthesized for CISOs, Risk Committees, and Security Managers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Key Context Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Vulnerability</span>
              <span className="font-semibold text-rose-300 truncate block mt-0.5" title={context.vulnerability}>
                {context.vulnerability.split('(')[0]}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">CVSS {context.technicalSeverity.split('/')[0]}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Target Asset</span>
              <span className="font-semibold text-white truncate block mt-0.5" title={context.targetBusinessAsset}>
                {context.targetBusinessAsset.split('(')[0]}
              </span>
              <span className="text-[10px] text-blue-400 font-medium">Tier-1 Crown Jewel</span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Financial Exposure</span>
              <span className="font-mono font-bold text-rose-400 text-sm block mt-0.5">
                {context.financialExposure.split('(')[0]}
              </span>
              <span className="text-[10px] text-slate-500">FAIR Model Loss</span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Recommended Control</span>
              <span className="font-semibold text-emerald-400 truncate block mt-0.5" title={context.recommendedControl}>
                {context.recommendedControl.split('(')[0]}
              </span>
              <span className="text-[10px] text-emerald-400/80 font-mono">₹1.2L • 61% reduction</span>
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="space-y-4 py-8 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-200">
                  Synthesizing business risk narrative...
                </p>
                <p className="text-xs text-slate-500">
                  Correlating CVSS severity with attack reachability, asset criticality, and FAIR financial loss.
                </p>
              </div>
            </div>
          )}

          {/* AI Response Card */}
          {!isLoading && explanation && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {/* Executive Summary Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/30 to-slate-900/90 border border-blue-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Executive Risk Takeaway
                </div>
                <p className="text-sm font-medium text-slate-100 leading-relaxed">
                  {explanation.summary}
                </p>
              </div>

              {/* 3 Structured Sections: Attack Path Reachability, Financial Impact, Strategic Remediation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                
                {/* 1. Attack Path & Technical Reachability */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    Attack Reachability
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {explanation.threatContext}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="font-mono text-amber-400">Path:</span>
                    <span>Internet → Web API → DB</span>
                  </div>
                </div>

                {/* 2. Target Business Asset & Financial Exposure */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
                    <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                    Financial & Asset Impact
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {explanation.businessImpact}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>At Risk:</span>
                    <span className="font-semibold text-rose-300">2.4M Customer Records</span>
                  </div>
                </div>

                {/* 3. Recommended Control & ROI */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Recommended Remediation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {explanation.chokePointRemediation}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Capital Efficiency:</span>
                    <span className="font-mono font-bold text-emerald-400">40x Risk Reduction</span>
                  </div>
                </div>

              </div>

              {/* Safety & Non-Exploit Notice */}
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>
                    Defensive CISO Briefing: Strictly restricted to business risk quantification and control prioritization.
                  </span>
                </div>
                <span className="text-slate-500 shrink-0 hidden sm:inline">
                  Generated at {explanation.timestamp}
                </span>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopySummary}
              disabled={isLoading || !explanation}
              icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              id="btn-copy-ai-explanation"
            >
              {copied ? 'Copied to Clipboard' : 'Copy Briefing'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerate}
              disabled={isLoading}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            >
              Regenerate
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>

            {onNavigateToSimulator && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onClose();
                  onNavigateToSimulator();
                }}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                id="btn-simulate-ai-recommended-control"
              >
                Simulate Recommended Control
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
