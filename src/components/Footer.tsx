import React from 'react';
import { Shield, Lock, Cpu, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-base mb-3">
            <Shield className="w-5 h-5 text-purple-400" />
            PhishGuard AI
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            Next-Generation AI-Powered Phishing, Quishing & Malicious URL Telemetry Platform built with Explainable Machine Learning.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Detection Capabilities</h4>
          <ul className="space-y-2">
            <li>URL & Typosquatting Analysis</li>
            <li>Email Phishing & Synthetic AI Text</li>
            <li>QR Code Quishing Extraction</li>
            <li>Multimodal Screenshot OCR</li>
            <li>Attachment Malware Sandbox</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Threat Intelligence</h4>
          <ul className="space-y-2">
            <li>VirusTotal Heuristic Integration</li>
            <li>Google Safe Browsing Telemetry</li>
            <li>WHOIS & Domain Age Verification</li>
            <li>XGBoost & Random Forest ML Engine</li>
            <li>Real-time Global Attack Feeds</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Compliance & Security</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Zero-Log Data Privacy</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Gemini 3.6 Flash Neural Engine</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Cloud Run Container Deployment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>© 2026 PhishGuard AI. All rights reserved. Designed for Production & Hackathon Demonstration.</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-300 transition-all">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-all">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-all">Security Whitepaper</a>
        </div>
      </div>
    </footer>
  );
};
