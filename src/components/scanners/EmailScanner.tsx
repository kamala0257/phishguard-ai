import React, { useState } from 'react';
import { Mail, RefreshCw, Zap, Sparkles, FileText, Send } from 'lucide-react';
import { scanEmail } from '../../lib/api';
import { SAMPLE_EMAILS } from '../../lib/mockData';
import { EmailAnalysisResult } from '../../types';
import { ExplainableAiCard } from '../ExplainableAiCard';

interface EmailScannerProps {
  onScanComplete?: (result: EmailAnalysisResult) => void;
}

export const EmailScanner: React.FC<EmailScannerProps> = ({ onScanComplete }) => {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<EmailAnalysisResult | null>(null);

  const handleScan = async () => {
    if (!body.trim() && !subject.trim()) {
      setError('Please enter at least an email subject or body text.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await scanEmail({ sender, subject, body });
      setResult(res);
      if (onScanComplete) onScanComplete(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to complete email phishing analysis.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sample: typeof SAMPLE_EMAILS[0]) => {
    setSender(sample.sender);
    setSubject(sample.subject);
    setBody(sample.body);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Email Phishing & Synthetic AI Detector</h2>
            <p className="text-xs text-slate-400">
              Evaluates urgency indicators, sender domain spoofing, brand impersonation, and AI-generated social engineering.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Sender Email</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. security-update@paypaI-verify.net"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Urgent: Your account has been limited"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Body Content</label>
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Paste the full email text or suspicious message body here..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all leading-relaxed"
            />
          </div>

          <button
            onClick={handleScan}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing Email Structure & AI Tone...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-300" />
                Analyze Email Phishing Threat
              </>
            )}
          </button>
        </div>

        {error && <p className="text-xs text-rose-400 font-medium mt-3">{error}</p>}

        {/* Preset Email Loaders */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-2">
            Load Sample Phishing Emails:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_EMAILS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => loadSample(sample)}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs rounded-lg transition-all flex items-center gap-1.5"
              >
                <FileText className="w-3 h-3 text-blue-400" />
                {sample.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <ExplainableAiCard
          title={`Email Analysis: ${result.subject}`}
          target={result.sender}
          riskScore={result.riskScore}
          riskLevel={result.riskLevel}
          reasons={result.reasons}
          recommendation={result.recommendation}
          typeLabel="Email Phishing & AI Generator Telemetry"
          extraStats={[
            { label: 'Classification', value: result.isPhishing ? 'PHISHING' : result.isSpam ? 'SPAM' : 'SAFE' },
            { label: 'Urgency Rating', value: `${result.urgencyScore}%` },
            { label: 'AI Generated', value: result.isAiGeneratedPhishing ? 'YES (Synthetic)' : 'Human / Low' },
            { label: 'Impersonation', value: result.brandImpersonated ? result.brandImpersonated.toUpperCase() : 'None' },
            { label: 'SPF / DKIM / DMARC', value: result.headerAnalysis.spfPass ? 'Pass' : 'FAIL / Spoofed' },
          ]}
        />
      )}
    </div>
  );
};
