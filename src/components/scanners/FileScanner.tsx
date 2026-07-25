import React, { useRef, useState } from 'react';
import { FileCode, Upload, RefreshCw, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { scanFile } from '../../lib/api';
import { FileAnalysisResult } from '../../types';
import { ExplainableAiCard } from '../ExplainableAiCard';

interface FileScannerProps {
  onScanComplete?: (result: FileAnalysisResult) => void;
}

export const FileScanner: React.FC<FileScannerProps> = ({ onScanComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<FileAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setSelectedFile(file);
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await scanFile({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || 'application/octet-stream',
      });
      setResult(res);
      if (onScanComplete) onScanComplete(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze file');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-cyan-600/20 border border-cyan-500/30 rounded-xl text-cyan-400">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">File & Attachment Threat Scanner</h2>
            <p className="text-xs text-slate-400">
              Scans PDF, Word (DOCX/DOCM), Excel, ZIP, EXE files for macro payloads, double extension tricks, and malicious embedded links.
            </p>
          </div>
        </div>

        {/* Upload Box */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-cyan-500 bg-slate-950/60 hover:bg-slate-950 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
          />
          <div className="p-4 bg-cyan-500/10 rounded-full text-cyan-400 border border-cyan-500/20">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Click to Select Attachment File</h4>
            <p className="text-xs text-slate-400 mt-1">PDF, DOCX, XLSX, ZIP, EXE, SCR, Images up to 25MB</p>
          </div>
        </div>

        {selectedFile && (
          <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-xs font-bold text-white">{selectedFile.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">{(selectedFile.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <button
              onClick={() => processFile(selectedFile)}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg"
            >
              Re-Scan File
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center gap-3 text-cyan-400 text-xs font-semibold">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Analyzing File Byte Signatures, Double Extensions & Embedded Macros...
          </div>
        )}

        {error && <p className="text-xs text-rose-400 font-medium mt-3">{error}</p>}
      </div>

      {result && (
        <ExplainableAiCard
          title={`File Security Analysis: ${result.fileName}`}
          target={`Type: ${result.fileType} | Size: ${(result.fileSize / 1024).toFixed(1)} KB`}
          riskScore={result.riskScore}
          riskLevel={result.riskLevel}
          reasons={result.reasons}
          recommendation={result.recommendation}
          typeLabel="Attachment Malware Audit"
          extraStats={[
            { label: 'Double Extension', value: result.doubleExtension ? 'FLAGGED (.pdf.exe)' : 'None' },
            { label: 'Macro Payload', value: result.hasMacro ? 'DETECTED' : 'Clean' },
            { label: 'Malware Flags', value: result.malwareIndicators.length },
            { label: 'Embedded URLs', value: result.embeddedUrls.length },
          ]}
        />
      )}
    </div>
  );
};
