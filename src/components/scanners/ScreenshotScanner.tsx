import React, { useRef, useState } from 'react';
import { Camera, Upload, RefreshCw, Eye, Sparkles, AlertOctagon } from 'lucide-react';
import { scanScreenshot } from '../../lib/api';
import { OCRAnalysisResult } from '../../types';
import { ExplainableAiCard } from '../ExplainableAiCard';

interface ScreenshotScannerProps {
  onScanComplete?: (result: OCRAnalysisResult) => void;
}

export const ScreenshotScanner: React.FC<ScreenshotScannerProps> = ({ onScanComplete }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<OCRAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError('');
    setLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      setImagePreview(base64Data);

      try {
        const res = await scanScreenshot({
          imageBase64: base64Data,
          mimeType: file.type || 'image/png',
          imageName: file.name,
        });
        setResult(res);
        if (onScanComplete) onScanComplete(res);
      } catch (err: any) {
        setError(err?.message || 'Failed to complete OCR screenshot analysis.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-pink-600/20 border border-pink-500/30 rounded-xl text-pink-400">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Screenshot & Visual OCR Scanner</h2>
            <p className="text-xs text-slate-400">
              Upload screenshots of emails, WhatsApp chats, SMS text alerts, or fake bank portals for multimodal AI analysis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-pink-500 bg-slate-950/60 hover:bg-slate-950 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 min-h-[220px]"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="p-4 bg-pink-500/10 rounded-full text-pink-400 border border-pink-500/20">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Upload Screenshot Image</h4>
              <p className="text-xs text-slate-400 mt-1">SMS, Email, WhatsApp, Browser capture</p>
            </div>
          </div>

          {/* Preview Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[220px]">
            {imagePreview ? (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-800">
                <img src={imagePreview} alt="Screenshot Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                  <span className="text-xs font-semibold text-white bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
                    Image Loaded
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 text-slate-600">
                <Eye className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Image preview will appear here</p>
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center gap-3 text-pink-400 text-xs font-semibold">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Running Multimodal Vision OCR & Threat Intelligence Engine...
          </div>
        )}

        {error && <p className="text-xs text-rose-400 font-medium mt-3">{error}</p>}
      </div>

      {result && (
        <ExplainableAiCard
          title={`Screenshot OCR: ${result.imageName}`}
          target={`Detected Type: ${result.detectedType.toUpperCase()}`}
          riskScore={result.riskScore}
          riskLevel={result.riskLevel}
          reasons={result.reasons}
          recommendation={result.recommendation}
          typeLabel="Visual OCR Threat Assessment"
          extraStats={[
            { label: 'Phishing Probability', value: `${Math.round(result.phishingProbability * 100)}%` },
            { label: 'Platform Type', value: result.detectedType.toUpperCase() },
            { label: 'Flagged Words', value: result.suspiciousElements.length },
          ]}
        />
      )}
    </div>
  );
};
