import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { NavigationTab, UserProfile } from '../../types';
import { mockCurrentUser } from '../../data/mockData';
import { Sliders, AlertTriangle, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

interface AppShellProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  user: UserProfile;
  onLogout: () => void;
  children: (helpers: { openSimulation: () => void }) => React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onSelectTab,
  user,
  onLogout,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeScope, setActiveScope] = useState('Global Production Infrastructure');
  const [simulationModalOpen, setSimulationModalOpen] = useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [simBudgetSlider, setSimBudgetSlider] = useState<number>(500000); // 5 Lakhs

  // Calculate dynamic what-if simulation results based on ₹12.4 Cr baseline exposure
  const simBudgetLakhs = simBudgetSlider / 100000;
  const simulatedReductionCr = Math.min(11.2, Math.round(((simBudgetLakhs / 10) * 8.5 + 1.2) * 10) / 10);
  const remainingExposureCr = Math.max(1.2, Math.round((12.4 - simulatedReductionCr) * 10) / 10);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex">
      {/* Sidebar navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        user={user}
        onLogout={onLogout}
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main App Content Area with left margin on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-200">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          onOpenSimulationModal={() => setSimulationModalOpen(true)}
          onOpenNotificationsModal={() => setNotificationsModalOpen(true)}
          activeScope={activeScope}
          onChangeScope={setActiveScope}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children({ openSimulation: () => setSimulationModalOpen(true) })}
        </main>
      </div>

      {/* Risk Simulation Modal */}
      <Modal
        isOpen={simulationModalOpen}
        onClose={() => setSimulationModalOpen(false)}
        title="What-If Security Budget Simulation"
        description="Model financial exposure reduction by adjusting available remediation spend across prioritized choke points."
        primaryAction={{
          label: 'Apply to Remediation Plan',
          onClick: () => {
            setSimulationModalOpen(false);
            onSelectTab('investments');
          },
        }}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-medium">Simulated Remediation Budget</span>
              <span className="text-sm font-mono font-bold text-blue-400">
                ₹{(simBudgetSlider / 100000).toFixed(1)} Lakh
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={1500000}
              step={50000}
              value={simBudgetSlider}
              onChange={(e) => setSimBudgetSlider(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>₹1.0 Lakh (Essential Choke Points)</span>
              <span>₹15.0 Lakh (Full Enterprise Defense)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400">Projected Risk Reduction</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                ₹{simulatedReductionCr.toFixed(1)} Cr
              </div>
              <div className="text-[10px] text-emerald-500/80 mt-1">
                {Math.round((simulatedReductionCr / 12.4) * 100)}% of total business exposure removed
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400">Residual Exposure</div>
              <div className="text-lg font-bold text-slate-200 font-mono mt-0.5">
                ₹{remainingExposureCr.toFixed(1)} Cr
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Down from ₹12.4 Cr baseline
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Key Decision Insight:</strong> Allocating ₹5.0 Lakh targets primary choke points across Customer Database and Payment System, eliminating the majority of financial exposure without touching 100+ low-impact isolated CVEs.
            </span>
          </div>
        </div>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        isOpen={notificationsModalOpen}
        onClose={() => setNotificationsModalOpen(false)}
        title="Simulated Security Decision Alerts"
        description="Live notifications prioritizing business impact shifts over raw alerts."
      >
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-rose-300">New Reachable Path to Crown Jewel</div>
              <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                A newly reported CVE-2024-3400 has been verified reachable from the Partner VPN to the Customer Database, raising financial exposure by ₹4.8 Cr.
              </div>
              <div className="text-[10px] text-slate-500 mt-1">12 minutes ago • Automated FAIR Model Recalibration</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-emerald-300">Choke Point Remediation Completed</div>
              <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Web API gateway security patch applied. Attack path #01 severed, saving an estimated ₹4.8 Cr in potential breach loss.
              </div>
              <div className="text-[10px] text-slate-500 mt-1">2 hours ago • Verified by SecOps</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
