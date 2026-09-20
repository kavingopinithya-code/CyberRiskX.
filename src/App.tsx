import React, { useState } from 'react';
import { LoginPage } from './pages/auth/LoginPage';
import { AppShell } from './components/layout/AppShell';
import { DashboardPlaceholder } from './pages/dashboard/DashboardPlaceholder';
import { VulnerabilityPrioritizationPage } from './pages/vulnerabilities/VulnerabilityPrioritizationPage';
import { AttackPathAnalysisPage } from './pages/attack-paths/AttackPathAnalysisPage';
import { BusinessAssetRiskPage } from './pages/assets/BusinessAssetRiskPage';
import { AIRecommendationsPage } from './pages/recommendations/AIRecommendationsPage';
import { SecurityInvestmentSimulatorPage } from './pages/investments/SecurityInvestmentSimulatorPage';
import { ModulePlaceholder } from './pages/modules/ModulePlaceholder';
import { NavigationTab, UserProfile } from './types';
import { mockCurrentUser } from './data/mockData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockCurrentUser);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [investmentView, setInvestmentView] = useState<'simulator' | 'optimized-plan'>('simulator');

  const handleLogin = (email: string) => {
    setCurrentUser({
      ...mockCurrentUser,
      email,
    });
    setIsAuthenticated(true);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNavigate = (tab: NavigationTab) => {
    if (tab === 'investments') {
      setInvestmentView('simulator');
    }
    setCurrentTab(tab);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <AppShell
      currentTab={currentTab}
      onSelectTab={handleNavigate}
      user={currentUser}
      onLogout={handleLogout}
    >
      {({ openSimulation }) => {
        if (currentTab === 'investments') {
          return (
            <SecurityInvestmentSimulatorPage
              onNavigate={handleNavigate}
              onOpenSimulation={openSimulation}
              initialView={investmentView}
              onViewChange={setInvestmentView}
            />
          );
        }
        if (currentTab === 'ai-recommendations') {
          return (
            <AIRecommendationsPage
              onNavigate={handleNavigate}
              onOpenSimulation={openSimulation}
            />
          );
        }
        if (currentTab === 'business-assets') {
          return (
            <BusinessAssetRiskPage
              onNavigate={handleNavigate}
              onOpenSimulation={openSimulation}
            />
          );
        }
        if (currentTab === 'attack-paths') {
          return (
            <AttackPathAnalysisPage
              onNavigate={handleNavigate}
              onOpenSimulation={openSimulation}
            />
          );
        }
        if (currentTab === 'vulnerabilities') {
          return (
            <VulnerabilityPrioritizationPage
              onNavigate={handleNavigate}
              onOpenSimulation={openSimulation}
            />
          );
        }
        if (currentTab === 'dashboard') {
          return (
            <DashboardPlaceholder
              onNavigate={handleNavigate}
              onOpenSimulation={openSimulation}
            />
          );
        }
        return (
          <ModulePlaceholder
            tab={currentTab}
            onNavigate={handleNavigate}
            onOpenSimulation={openSimulation}
          />
        );
      }}
    </AppShell>
  );
}

