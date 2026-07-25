import React, { useState } from 'react';
import { Globe, ShieldAlert, Search, RefreshCw, Zap, CheckCircle, ExternalLink, Database } from 'lucide-react';
import { scanUrl } from '../../lib/api';
import { SAMPLE_URLS } from '../../lib/mockData';
import { URLAnalysisResult } from '../../types';
import { ExplainableAiCard } from '../ExplainableAiCard';

interface UrlScannerProps {
  onScanComplete?: (result: URLAnalysisResult) => void;
}

export const UrlScanner: React.FC<UrlScannerProps> = ({ onScanComplete }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<URLAnalysisResult | null>(null);

  const handleScan = async (urlToScan?: string) => {
    const target = urlToScan || inputUrl;
    if (!target.trim()) {
      setError('Please enter a URL to analyze.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await scanUrl(target);
      setResult(res);
      if (onScanComplete) onScanComplete(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to complete URL analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden glow-purple shadow-2xl">
        <div className="scan-beam"></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-600/20 border border-purple-500/30 rounded-2xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              AI-Powered URL & Domain Scanner
              <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full uppercase tracking-widest bg-cyan-950/40">
                v4.8-active
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Extracts WHOIS, DNS, SSL status, typosquatting vectors, VirusTotal scores, and ML risk probability.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              placeholder="Enter suspicious URL e.g. https://amazon-login-security.xyz"
              className="w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 focus:border-purple-500 rounded-2xl text-sm text-purple-200 placeholder:text-slate-600 focus:outline-none transition-all font-mono"
            />
          </div>
          <button
            onClick={() => handleScan()}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                <span className="glow-text-cyan">ANALYZING TARGET...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-purple-200" />
                SCAN TARGET
              </>
            )}
          </button>
        </div>

        {error && <p className="text-xs text-rose-400 font-medium mt-3">{error}</p>}

        {/* Sample Quick Presets */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-2">
            Try Demo Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_URLS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputUrl(sample.url);
                  handleScan(sample.url);
                }}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs rounded-lg transition-all flex items-center gap-1.5"
              >
                <ExternalLink className="w-3 h-3 text-purple-400" />
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <ExplainableAiCard
          title={`URL Analysis: ${result.domain}`}
          target={result.url}
          riskScore={result.riskScore}
          riskLevel={result.riskLevel}
          reasons={result.reasons}
          recommendation={result.recommendation}
          typeLabel="URL Threat Telemetry"
          extraStats={[
            { label: 'Domain Age', value: `${result.domainAgeDays} days` },
            { label: 'HTTPS SSL', value: result.hasHttps ? 'Valid SSL' : 'NO HTTPS' },
            { label: 'Entropy Score', value: result.entropyScore },
            { label: 'VirusTotal Flags', value: `${result.virusTotalPositives}/${result.virusTotalTotal}` },
            { label: 'Safe Browsing', value: result.googleSafeBrowsing.toUpperCase() },
            { label: 'ML Confidence', value: `${Math.round(result.mlConfidence * 100)}%` },
          ]}
        />
      )}
    </div>
  );
};
