import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-explain-risk-api',
    configureServer(server) {
      server.middlewares.use('/api/explain-risk', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const context = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
              res.statusCode = 200;
              res.end(JSON.stringify({ source: 'demo-fallback', explanation: null }));
              return;
            }

            const ai = new GoogleGenAI({ apiKey });
            const prompt = `You are the CyberRiskX AI Risk Advisor. Generate a concise, structured executive risk briefing for a Security Manager or business executive (NOT a cybersecurity researcher) explaining why the following attack path is important.

Context:
- Vulnerability: ${context.vulnerability || 'Outdated Web API'}
- Technical Severity: ${context.technicalSeverity || '9.8 / 10 Critical'}
- Attack Path: ${context.attackPath || 'Public Internet -> Outdated Web API -> Internal Network -> Customer Database'}
- Target Business Asset: ${context.targetBusinessAsset || 'Customer Database (2.4M records)'}
- Financial Exposure: ${context.financialExposure || '₹4.8 Cr'}
- Recommended Control: ${context.recommendedControl || 'Patch Web API Gateway'}

Requirements:
- Written for a CISO, security manager, or business executive.
- Emphasize business impact, reachability, financial risk, and capital efficiency of the control.
- DO NOT provide exploit instructions, code snippets, or offensive security guidance.
- Keep the tone concise, authoritative, objective, and defensible.

Return your response in structured JSON with the following keys:
{
  "summary": "1-2 sentence executive takeaway",
  "threatContext": "concise explanation of attack reachability and why this path matters compared to isolated CVEs",
  "businessImpact": "business and financial impact on the target asset (e.g. data loss, regulatory fines under DPDP, operational downtime)",
  "chokePointRemediation": "actionable rationale for implementing the recommended control and its risk reduction ROI"
}`;

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
              },
            });

            const parsed = JSON.parse(response.text || '{}');
            res.statusCode = 200;
            res.end(JSON.stringify({
              source: 'gemini-api',
              explanation: response.text,
              summary: parsed.summary,
              threatContext: parsed.threatContext,
              businessImpact: parsed.businessImpact,
              chokePointRemediation: parsed.chokePointRemediation,
            }));
          } catch (error: any) {
            console.error('Gemini API execution error:', error?.message || error);
            res.statusCode = 200;
            res.end(JSON.stringify({ source: 'demo-fallback', error: error?.message, explanation: null }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
