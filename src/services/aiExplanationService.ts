export interface AttackPathContext {
  vulnerability: string;
  technicalSeverity: string;
  attackPath: string;
  targetBusinessAsset: string;
  financialExposure: string;
  recommendedControl: string;
  assetCriticality?: string;
  dataAtRisk?: string;
}

export interface AIExplanationResult {
  summary: string;
  threatContext: string;
  businessImpact: string;
  chokePointRemediation: string;
  financialExposureSummary: string;
  source: 'gemini' | 'demo';
  timestamp: string;
}

export const DEFAULT_ATTACK_PATH_CONTEXT: AttackPathContext = {
  vulnerability: 'Outdated Web API (CVE-2024-3400)',
  technicalSeverity: '9.8 / 10 (Critical)',
  attackPath: 'Public Internet → Outdated Web API → Internal Network → Customer Database',
  targetBusinessAsset: 'Customer Database (PostgreSQL Production Cluster)',
  financialExposure: '₹4.8 Cr (FAIR Value at Risk)',
  recommendedControl: 'Patch Web API Gateway (₹1.2 Lakh, 61% risk reduction)',
  assetCriticality: 'Tier-1 Crown Jewel',
  dataAtRisk: '2.4M Customer Records (PII & Financial Accounts)',
};

export const DETERMINISTIC_DEMO_EXPLANATION: AIExplanationResult = {
  summary:
    'This attack path demands immediate executive prioritization because an internet-facing vulnerability provides an unauthenticated direct bridge into your Tier-1 Customer Database, exposing ₹4.8 Cr in financial liabilities.',
  threatContext:
    'While standard scanners report thousands of isolated technical vulnerabilities, this path is critical because it is fully reachable from the Public Internet. The Outdated Web API (CVSS 9.8) serves as the initial footholder. Once compromised, an attacker encounters no secondary internal barriers before accessing production databases.',
  businessImpact:
    'The target asset houses 2.4 million confidential customer records. A successful compromise directly triggers severe regulatory penalties under data privacy mandates (DPDP Act), forensic breach recovery costs, mandatory customer remediation, and immediate brand damage estimated at ₹4.8 Crore.',
  chokePointRemediation:
    'Rather than executing costly multi-month infrastructure rewrites, CyberRiskX identifies the Web API as the decisive choke point. Applying the recommended firmware patch costs ₹1.2 Lakh and can be completed in 1 business day, severing the entire attack chain and eliminating 61% of total enterprise breach risk.',
  financialExposureSummary:
    '₹4.8 Cr Total Exposure at Risk • Severable with ₹1.2 Lakh Investment (40x Security ROI)',
  source: 'demo',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export async function generateAttackPathExplanation(
  context: AttackPathContext = DEFAULT_ATTACK_PATH_CONTEXT
): Promise<AIExplanationResult> {
  try {
    const response = await fetch('/api/explain-risk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.explanation && data.source === 'gemini-api') {
        return {
          summary: data.summary || data.explanation.slice(0, 240) + '...',
          threatContext: data.threatContext || data.explanation,
          businessImpact: data.businessImpact || `Compromise of ${context.targetBusinessAsset} exposes ${context.financialExposure} in estimated financial loss.`,
          chokePointRemediation: data.chokePointRemediation || `Implementing ${context.recommendedControl} breaks the attack chain before reachability is achieved.`,
          financialExposureSummary: `${context.financialExposure} Exposure • Mitigated via ${context.recommendedControl.split('(')[0]}`,
          source: 'gemini',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
    }
  } catch (error) {
    console.info('Using deterministic demo explanation fallback (Gemini API offline or not configured).', error);
  }

  // Deterministic Demo Explanation fallback (guarantees no app breakage)
  await new Promise((resolve) => setTimeout(resolve, 450));
  return {
    ...DETERMINISTIC_DEMO_EXPLANATION,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
