import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Download, Info, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { RiskLevel, XAIReason } from '../types';
import jsPDF from 'jspdf';

interface ExplainableAiCardProps {
  title: string;
  target: string;
  riskScore: number;
  riskLevel: RiskLevel;
  reasons: XAIReason[];
  recommendation: string;
  typeLabel?: string;
  extraStats?: { label: string; value: string | number }[];
  onBookmark?: () => void;
  isBookmarked?: boolean;
}

export const ExplainableAiCard: React.FC<ExplainableAiCardProps> = ({
  title,
  target,
  riskScore,
  riskLevel,
  reasons,
  recommendation,
  typeLabel = 'Security Scan Result',
  extraStats = [],
  onBookmark,
  isBookmarked = false,
}) => {
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'safe':
        return {
          badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          meter: 'bg-emerald-500',
          bgGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
          icon: ShieldCheck,
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
        };
      case 'medium':
        return {
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          meter: 'bg-amber-500',
          bgGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.15)]',
          icon: Info,
          text: 'text-amber-400',
          border: 'border-amber-500/30',
        };
      case 'high':
        return {
          badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
          meter: 'bg-orange-500',
          bgGlow: 'shadow-[0_0_25px_rgba(249,115,22,0.15)]',
          icon: AlertTriangle,
          text: 'text-orange-400',
          border: 'border-orange-500/30',
        };
      case 'critical':
      default:
        return {
          badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          meter: 'bg-rose-500',
          bgGlow: 'shadow-[0_0_25px_rgba(244,63,94,0.15)]',
          icon: AlertOctagon,
          text: 'text-rose-400',
          border: 'border-rose-500/30',
        };
    }
  };

  const style = getRiskColor(riskLevel);
  const RiskIcon = style.icon;

  const downloadPdfReport = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42); // slate 900
    doc.rect(0, 0, 210, 297, 'F');

    // Header
    doc.setTextColor(168, 85, 247); // purple
    doc.setFontSize(22);
    doc.text('PHISHGUARD AI - THREAT REPORT', 15, 20);

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated: ${new Date().toLocaleString()} | Type: ${typeLabel}`, 15, 28);
    doc.line(15, 32, 195, 32);

    // Target Box
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(15, 38, 180, 25, 3, 3, 'F');
    doc.setTextColor(226, 232, 240);
    doc.setFontSize(11);
    doc.text(`Target Analyzed: ${target.substring(0, 65)}`, 20, 48);

    // Risk Score
    doc.setFontSize(16);
    if (riskLevel === 'safe') doc.setTextColor(52, 211, 153);
    else if (riskLevel === 'medium') doc.setTextColor(251, 191, 36);
    else if (riskLevel === 'high') doc.setTextColor(251, 146, 60);
    else doc.setTextColor(248, 113, 113);

    doc.text(`Risk Score: ${riskScore}/100 [${riskLevel.toUpperCase()}]`, 20, 58);

    // Recommendation
    doc.setTextColor(203, 213, 225);
    doc.setFontSize(11);
    doc.text('AI Recommendation:', 15, 73);
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    const splitRec = doc.splitTextToSize(recommendation, 180);
    doc.text(splitRec, 15, 80);

    // XAI Reasons
    let y = 100;
    doc.setTextColor(226, 232, 240);
    doc.setFontSize(12);
    doc.text('Explainable AI (XAI) Risk Factors:', 15, y);
    y += 8;

    reasons.forEach((reason, index) => {
      doc.setFillColor(30, 41, 59);
      doc.roundedRect(15, y, 180, 20, 2, 2, 'F');
      doc.setFontSize(10);
      doc.setTextColor(244, 114, 182);
      doc.text(`${index + 1}. [${reason.severity.toUpperCase()}] ${reason.title}`, 20, y + 8);
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(8);
      const descLines = doc.splitTextToSize(reason.description, 170);
      doc.text(descLines, 20, y + 14);
      y += 24;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('PhishGuard AI Security Intelligence System — Confidential Hackathon Build', 15, 285);

    doc.save(`PhishGuard_Report_${Date.now()}.pdf`);
  };

  return (
    <div className={`relative bg-slate-900/90 backdrop-blur-xl border ${style.border} rounded-2xl p-6 transition-all duration-300 ${style.bgGlow}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{typeLabel}</span>
            <span className={`px-2.5 py-0.5 text-xs rounded-full font-semibold border ${style.badge} uppercase tracking-wider`}>
              {riskLevel} Risk
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight break-all">{title}</h3>
          <p className="text-sm text-slate-400 mt-1 break-all font-mono">{target}</p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          {onBookmark && (
            <button
              onClick={onBookmark}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-purple-600/30 text-purple-300 border-purple-500/50'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
          )}

          <button
            onClick={downloadPdfReport}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-purple-600/25 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            PDF Report
          </button>
        </div>
      </div>

      {/* Score Meter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        {/* Risk Score Dial */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-medium">Risk Score & Probability</span>
            <RiskIcon className={`w-5 h-5 ${style.text}`} />
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-black ${style.text}`}>{riskScore}%</span>
              <span className="text-xs text-slate-400">Threat Level</span>
            </div>

            {/* Meter Bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 mt-3 overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${style.meter}`}
                style={{ width: `${riskScore}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0% Safe</span>
              <span>50% Med</span>
              <span>100% Critical</span>
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="lg:col-span-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              <Info className="w-4 h-4" />
              AI Security Recommendation
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{recommendation}</p>
          </div>

          {extraStats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 mt-4 border-t border-slate-800/80">
              {extraStats.map((stat, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">{stat.label}</div>
                  <div className="text-xs font-bold text-slate-200 font-mono mt-0.5">{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Explainable AI (XAI) Reasons Breakdown */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          Explainable AI (XAI) Threat Breakdown ({reasons.length} Factors)
        </h4>

        <div className="space-y-3">
          {reasons.map((reason) => {
            const sevBadge =
              reason.severity === 'critical'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : reason.severity === 'high'
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                : reason.severity === 'medium'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700';

            return (
              <div
                key={reason.id}
                className="bg-slate-950/50 hover:bg-slate-950 border border-slate-800/90 rounded-xl p-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-400">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-100">{reason.title}</span>
                        <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${sevBadge}`}>
                          {reason.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
