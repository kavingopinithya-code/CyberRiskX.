import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingDown,
  Building2,
  DollarSign,
  Layers
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('demo@cyberriskx.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === 'demo@cyberriskx.com' && cleanPassword === 'demo123') {
      setErrorMessage('');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin('demo@cyberriskx.com');
      }, 300);
    } else {
      setErrorMessage('Demo login: use demo@cyberriskx.com / demo123');
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('demo@cyberriskx.com');
    setPassword('demo123');
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin('demo@cyberriskx.com');
    }, 250);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F17] flex flex-col justify-between relative overflow-hidden">
      {/* Subtle structural grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#131B2E15_1px,transparent_1px),linear-gradient(to_bottom,#131B2E15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Bar with prototype reassurance */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-[#0B0F17]/80 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-white tracking-tight">CyberRisk</span>
            <span className="text-base font-extrabold text-blue-400">X</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1" />
            Prototype Ready
          </Badge>
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">v1.0-decision-engine</span>
        </div>
      </header>

      {/* Main Login Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero & Product Concept Introduction */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <Badge variant="info" size="sm" className="mb-3">
                Cybersecurity SaaS Platform
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Smarter Cybersecurity <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Risk Decisions.
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                Stop chasing 1,000+ raw CVEs. CyberRiskX prioritizes vulnerabilities based on true business risk: reachability, critical assets, financial loss exposure, and budget ROI.
              </p>
            </div>

            {/* Core Decision Pillars */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#111726] border border-slate-800/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white tracking-tight">Attack-Path Reachability</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Filters out isolated vulnerabilities that cannot reach critical business Crown Jewels.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111726] border border-slate-800/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white tracking-tight">Financial Exposure & ROI</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Translates technical severity into dollars at risk, allocating remediation budget where it delivers the highest risk reduction.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111726] border border-slate-800/90 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white tracking-tight">Choke-Point Remediation</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fix single architectural bottlenecks to break multiple complex attack paths simultaneously.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Login Box */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              
              {/* Quick Demo Login Pill */}
              <div className="mb-6 p-3 rounded-xl bg-blue-950/30 border border-blue-800/50 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-blue-300">Prototype Demo Credentials</div>
                  <div className="text-[11px] text-slate-400 font-mono">demo@cyberriskx.com / demo123</div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleQuickDemoLogin}
                  loading={isLoading}
                  icon={<Zap className="w-3.5 h-3.5" />}
                  id="btn-quick-demo-login"
                >
                  Quick Demo
                </Button>
              </div>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  or sign in with credentials
                </span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2" id="login-error-message">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="font-medium">{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="email-input">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="demo@cyberriskx.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-slate-300" htmlFor="password-input">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('demo@cyberriskx.com');
                        setPassword('demo123');
                        setErrorMessage('');
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Fill demo credentials
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="demo123"
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-[#0B0F17] w-3.5 h-3.5"
                    />
                    <span className="text-xs text-slate-400">Remember corporate session</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full mt-2"
                  loading={isLoading}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  id="btn-login-submit"
                >
                  Login
                </Button>

                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    icon={<Building2 className="w-3.5 h-3.5" />}
                    onClick={handleQuickDemoLogin}
                  >
                    Enterprise Single Sign-On (SAML / Okta)
                  </Button>
                </div>
              </form>

              {/* Safety notice */}
              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Secure SOC2 Type II Certified Prototype Environment</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-4 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <p>CyberRiskX • "Smarter Cybersecurity Decisions" • Business-focused Risk Prioritization Prototype</p>
      </footer>
    </div>
  );
};
