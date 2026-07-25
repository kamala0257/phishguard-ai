import React, { useState } from 'react';
import { Puzzle, X, ShieldCheck, ShieldAlert, Globe, Lock, Info, CheckCircle, RefreshCw } from 'lucide-react';
import { scanUrl } from '../lib/api';
import { URLAnalysisResult } from '../types';

interface ExtensionSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtensionSimulator: React.FC<ExtensionSimulatorProps> = ({ isOpen, onClose }) => {
  const [currentTabUrl, setCurrentTabUrl] = useState('https://amazon-login-security.xyz');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<URLAnalysisResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyzeTab = async (urlToTest?: string) => {
    const target = urlToTest || currentTabUrl;
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await scanUrl(target);
      setAnalysis(res);
    } catch (e) {
      console.warn('Extension sim scan error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[380px] bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col backdrop-blur-2xl">
      {/* Extension Header */}
      <div className="p-4 bg-purple-950/60 border-b border-purple-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Puzzle className="w-5 h-5 text-purple-400" />
          PhishGuard Extension Overlay
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto text-xs">
        {/* Simulated Browser URL Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
            Active Browser Tab URL:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentTabUrl}
              onChange={(e) => setCurrentTabUrl(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 font-mono text-[11px] text-slate-100 focus:outline-none"
            />
            <button
              onClick={() => handleAnalyzeTab()}
              disabled={loading}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg"
            >
              Scan
            </button>
          </div>
        </div>

        {/* Quick URL Presets */}
        <div className="flex gap-2 text-[10px]">
          <button
            onClick={() => {
              setCurrentTabUrl('https://amazon-login-security.xyz');
              handleAnalyzeTab('https://amazon-login-security.xyz');
            }}
            className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 font-semibold"
          >
            Fake Amazon
          </button>
          <button
            onClick={() => {
              setCurrentTabUrl('https://google.com');
              handleAnalyzeTab('https://google.com');
            }}
            className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 font-semibold"
          >
            Google
          </button>
        </div>

        {loading && (
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center text-purple-400">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
            Analyzing Active Webpage DOM & SSL Certificates...
          </div>
        )}

        {analysis && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Page Safety Index</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  analysis.riskLevel === 'critical' || analysis.riskLevel === 'high'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {analysis.riskLevel}
              </span>
            </div>

            <div className="text-3xl font-black text-white font-mono">{analysis.riskScore}% <span className="text-xs text-slate-400">Risk</span></div>

            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              {analysis.recommendation}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Domain Age:</span>
                <span className="text-white font-mono">{analysis.domainAgeDays} days</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>HTTPS Certificate:</span>
                <span className={analysis.hasHttps ? 'text-emerald-400' : 'text-rose-400'}>
                  {analysis.hasHttps ? 'Valid HTTPS' : 'Missing SSL'}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Typosquatting Target:</span>
                <span className="text-purple-300">{analysis.typosquattingTarget || 'None'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
