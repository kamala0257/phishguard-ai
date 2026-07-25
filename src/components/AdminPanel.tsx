import React, { useState } from 'react';
import { Terminal, Users, Database, ShieldAlert, Download, Trash2, CheckCircle2, BarChart2 } from 'lucide-react';
import { ScanHistoryItem } from '../types';

interface AdminPanelProps {
  scanHistory: ScanHistoryItem[];
  onClearHistory: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ scanHistory, onClearHistory }) => {
  const [activeTab, setActiveTab] = useState<'scans' | 'users' | 'export'>('scans');

  const mockUsers = [
    { id: 'u-1', name: 'Security Operations Center', email: 'soc-lead@company.org', scans: 142, role: 'SOC Admin' },
    { id: 'u-2', name: 'Finance Audit Lead', email: 'audit@company.org', scans: 38, role: 'Auditor' },
    { id: 'u-3', name: 'Alex Johnson', email: 'alex@student.edu', scans: 19, role: 'User' },
  ];

  const exportCsv = () => {
    const headers = 'ID,Type,Target,RiskScore,RiskLevel,Timestamp\n';
    const rows = scanHistory.map((s) => `${s.id},${s.type},"${s.target}",${s.riskScore},${s.riskLevel},${s.timestamp}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PhishGuard_Scan_Logs_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-800/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">
            <Terminal className="w-4 h-4" /> System Administrative Console
          </div>
          <h2 className="text-2xl font-black text-white">PhishGuard Administration</h2>
          <p className="text-xs text-slate-400 mt-1">Manage user activity logs, threat export reports, and system telemetry configuration.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Export Logs CSV
          </button>

          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 px-3 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold rounded-xl transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Audit Logs
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'scans' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Scan Audit Logs ({scanHistory.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'users' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          User Accounts ({mockUsers.length})
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === 'scans' ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Log ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Target Payload</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {scanHistory.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-purple-400">{s.id}</td>
                    <td className="py-3 px-4 font-bold">{s.type}</td>
                    <td className="py-3 px-4 break-all max-w-xs">{s.target}</td>
                    <td className="py-3 px-4 font-black">{s.riskScore}%</td>
                    <td className="py-3 px-4 uppercase text-rose-400 font-bold">{s.riskLevel}</td>
                    <td className="py-3 px-4 text-slate-500">{s.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="space-y-3">
            {mockUsers.map((usr) => (
              <div key={usr.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{usr.name}</div>
                  <div className="text-[11px] text-slate-400">{usr.email}</div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-purple-300 font-mono">{usr.scans} Scans</span>
                  <span className="px-2 py-0.5 bg-purple-600/30 text-purple-200 border border-purple-500/40 rounded text-[10px] uppercase font-bold">
                    {usr.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
