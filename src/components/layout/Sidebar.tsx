import React from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Flame,
  GitFork,
  Building2,
  Sparkles,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  user: UserProfile;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems: {
    id: NavigationTab;
    label: string;
    description: string;
    icon: React.ElementType;
    badge?: string;
    badgeVariant?: 'blue' | 'emerald' | 'amber';
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Executive risk posture & ROI',
      icon: LayoutDashboard,
    },
    {
      id: 'vulnerabilities',
      label: 'Vulnerabilities',
      description: 'Prioritized by reachability & impact',
      icon: Flame,
      badge: '8 Critical',
      badgeVariant: 'amber',
    },
    {
      id: 'attack-paths',
      label: 'Attack Paths',
      description: 'Choke points to crown jewels',
      icon: GitFork,
      badge: '2 Reachable',
      badgeVariant: 'amber',
    },
    {
      id: 'business-assets',
      label: 'Business Assets',
      description: 'Databases & payment engines',
      icon: Building2,
    },
    {
      id: 'ai-recommendations',
      label: 'AI Recommendations',
      description: 'Smarter remediation decisions',
      icon: Sparkles,
      badge: 'AI Active',
      badgeVariant: 'blue',
    },
    {
      id: 'investments',
      label: 'Investments',
      description: 'Security budget & risk reduction ROI',
      icon: TrendingUp,
      badge: '₹12.4 Cr',
      badgeVariant: 'emerald',
    },
    {
      id: 'reports',
      label: 'Reports',
      description: 'Board & compliance briefings',
      icon: FileText,
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Risk thresholds & multipliers',
      icon: Settings,
    },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const getBadgeClasses = (variant?: 'blue' | 'emerald' | 'amber') => {
    switch (variant) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      default:
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="cyberriskx-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#0E1422] border-r border-slate-800/90 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-xs shadow-blue-500/10">
              <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white">CyberRisk</span>
                <span className="text-lg font-extrabold text-blue-400">X</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
                Smarter Cybersecurity Decisions
              </p>
            </div>
          </div>

          {/* Org & Context Info */}
          <div className="mt-4 p-2.5 rounded-lg bg-[#141C2E] border border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Tenant</span>
              <span className="text-blue-400 font-semibold flex items-center gap-1">
                <Server className="w-3 h-3" />
                Acme Global
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Risk Engine</span>
              <span className="text-emerald-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Calibrated (FAIR)
              </span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Decision Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-xs'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <div className="truncate">
                    <div className="text-xs font-semibold tracking-tight">{item.label}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.description}</div>
                  </div>
                </div>

                {item.badge ? (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium shrink-0 ml-2 ${getBadgeClasses(item.badgeVariant)}`}>
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isActive ? 'opacity-100 text-blue-400' : 'text-slate-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Prototype Assurance Banner */}
        <div className="px-4 py-2 mx-3 mb-3 rounded-lg bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>Hackathon prototype. Illustrative non-offensive simulation data.</span>
        </div>

        {/* User Account footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0B101D]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-blue-400 shrink-0">
                SC
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">{user.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user.role}</div>
              </div>
            </div>

            <button
              id="sidebar-logout-btn"
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors shrink-0"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
