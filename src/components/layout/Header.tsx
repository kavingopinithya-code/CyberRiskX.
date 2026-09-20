import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  SlidersHorizontal,
  RefreshCw,
  TrendingDown,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  onOpenSimulationModal: () => void;
  onOpenNotificationsModal: () => void;
  activeScope: string;
  onChangeScope: (scope: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  onOpenSimulationModal,
  onOpenNotificationsModal,
  activeScope,
  onChangeScope,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false);

  const scopes = [
    'Global Production Infrastructure',
    'Tier-1 Payment & Core Cloud (AWS/GCP)',
    'Customer PII & Data Warehouses',
    'Edge Gateways & Remote Workforce',
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left side: Hamburger on mobile + Scope switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 lg:hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Scope selector */}
        <div className="relative">
          <button
            onClick={() => setScopeDropdownOpen(!scopeDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="hidden sm:inline text-slate-400">Scope:</span>
            <span className="font-semibold text-white truncate max-w-[170px] sm:max-w-[220px]">
              {activeScope}
            </span>
          </button>

          {scopeDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-[#111726] border border-slate-700 rounded-xl shadow-xl py-2 z-50 animate-in fade-in">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Switch Risk Asset Scope
              </div>
              {scopes.map((scope) => (
                <button
                  key={scope}
                  onClick={() => {
                    onChangeScope(scope);
                    setScopeDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/70 transition-colors ${
                    activeScope === scope ? 'text-blue-400 font-semibold bg-blue-600/10' : 'text-slate-300'
                  }`}
                >
                  <span className="truncate">{scope}</span>
                  {activeScope === scope && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Exposure summary chip */}
        <div className="hidden xl:flex items-center gap-2">
          <Badge variant="danger" size="sm">
            Current Risk: ₹12.4 Cr Exposure
          </Badge>
          <span className="text-slate-600">→</span>
          <Badge variant="success" size="sm">
            <TrendingDown className="w-3 h-3" />
            Remediable: ₹9.2 Cr (74%)
          </Badge>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md items-center relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search CVEs, crown jewels, choke points, or attack paths..."
          className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 text-xs text-slate-500 hover:text-slate-300"
          >
            Clear
          </button>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenSimulationModal}
          icon={<Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
          className="hidden sm:inline-flex"
        >
          Risk Simulation
        </Button>

        <button
          onClick={onOpenNotificationsModal}
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Security Notifications"
          aria-label="Security Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        </button>

        <div className="hidden sm:block h-5 w-px bg-slate-800 mx-1" />

        <div className="hidden lg:flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-200 leading-tight">Sarah Chen</div>
            <div className="text-[10px] text-emerald-400 font-mono">CISO Clearance</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">
            SC
          </div>
        </div>
      </div>
    </header>
  );
};
