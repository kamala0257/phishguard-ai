import React, { useState } from 'react';
import { Mic, MicOff, RefreshCw, Volume2, Sparkles, AlertOctagon } from 'lucide-react';
import { scanVoice } from '../../lib/api';
import { VoiceAnalysisResult } from '../../types';
import { ExplainableAiCard } from '../ExplainableAiCard';

interface VoiceScannerProps {
  onScanComplete?: (result: VoiceAnalysisResult) => void;
}

export const VoiceScanner: React.FC<VoiceScannerProps> = ({ onScanComplete }) => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<VoiceAnalysisResult | null>(null);

  // Web Speech API browser integration
  const startVoiceDictation = () => {
    setError('');
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Web Speech API is not supported in this browser. Please type or paste the spoken transcript below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = (e: any) => {
        setIsRecording(false);
        setError('Voice recognition error: ' + (e.error || 'Check microphone access'));
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e: any) {
      setError('Could not initialize speech recognition.');
    }
  };

  const handleScan = async () => {
    if (!transcript.trim()) {
      setError('Please record or enter a spoken call transcript to analyze.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await scanVoice(transcript);
      setResult(res);
      if (onScanComplete) onScanComplete(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze voice call transcript.');
    } finally {
      setLoading(false);
    }
  };

  const sampleVoiceTexts = [
    'This is Officer Mark from the Internal Revenue Service. A federal warrant has been issued for your arrest due to unpaid back taxes. You must purchase $500 in Target gift cards immediately to stay execution.',
    'Hello, this is Chase Bank Fraud Department. We noticed a $1,200 charge from London. To block this payment, please dictate the 6-digit verification code sent to your phone right now.',
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-amber-600/20 border border-amber-500/30 rounded-xl text-amber-400">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Voice SMS & Call Vishing Detector</h2>
            <p className="text-xs text-slate-400">
              Read a suspicious phone call, voicemail, or SMS aloud via microphone, or paste the transcript for Vishing AI detection.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={startVoiceDictation}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-400" />}
              {isRecording ? 'Listening... (Speak Now)' : 'Record Microphone Speech'}
            </button>

            <span className="text-xs text-slate-500">or paste transcript below</span>
          </div>

          <textarea
            rows={4}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="e.g. This is Officer John from the IRS... (Speak aloud using mic or paste voicemail text)"
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all leading-relaxed"
          />

          <button
            onClick={handleScan}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-amber-600/20 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing Spoken Vishing Indicators & Extortion Risk...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                Analyze Spoken Voice Threat
              </>
            )}
          </button>
        </div>

        {error && <p className="text-xs text-rose-400 font-medium mt-3">{error}</p>}

        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-2">
            Try Sample Vishing Calls:
          </span>
          <div className="space-y-2">
            {sampleVoiceTexts.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => setTranscript(sample)}
                className="w-full text-left p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 text-xs transition-all"
              >
                "{sample.substring(0, 85)}..."
              </button>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <ExplainableAiCard
          title={`Voice Vishing Call Analysis`}
          target={`Sender Classification: ${result.detectedSenderType}`}
          riskScore={result.riskScore}
          riskLevel={result.riskLevel}
          reasons={result.reasons}
          recommendation={result.recommendation}
          typeLabel="Spoken Vishing Telemetry"
          extraStats={[
            { label: 'Vishing Probability', value: `${Math.round(result.vishingProbability * 100)}%` },
            { label: 'Scare Terms', value: result.urgencyFlags.join(', ') || 'None' },
          ]}
        />
      )}
    </div>
  );
};
