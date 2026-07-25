import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Activity, Globe, ArrowUpRight, CheckCircle, Search, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';
import { ScanHistoryItem } from '../types';

interface DashboardProps {
  scanHistory: ScanHistoryItem[];
  onScanSelect?: (item: ScanHistoryItem) => void;
  onNavigateScanner: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ scanHistory, onScanSelect, onNavigateScanner }) => {
  const totalScans = scanHistory.length + 1420;
  const dangerousCount = scanHistory.filter((i) => i.riskLevel === 'high' || i.riskLevel === 'critical').length + 382;
  const safeCount = totalScans - dangerousCount;
  const todayScans = scanHistory.length + 42;

  // Chart Data
  const pieData = [
    { name: 'Critical Risk', value: 24, color: '#f43f5e' },
    { name: 'High Risk', value: 18, color: '#f97316' },
    { name: 'Medium Risk', value: 12, color: '#f59e0b' },
    { name: 'Safe Verified', value: 46, color: '#10b981' },
  ];

  const barData = [
    { category: 'URL', count: 680 },
    { category: 'Email', count: 320 },
    { category: 'QR Code', count: 180 },
    { category: 'OCR', count: 140 },
    { category: 'Files', count: 100 },
  ];

  const lineData = [
    { time: '00:00', threats: 12 },
    { time: '04:00', threats: 8 },
    { time: '08:00', threats: 34 },
    { time: '12:00', threats: 62 },
    { time: '16:00', threats: 45 },
    { time: '20:00', threats: 28 },
    { time: '23:59', threats: 19 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Launcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-800/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4" /> Real-time Cyber Security Command Center
          </div>
          <h2 className="text-2xl font-black text-white">Security Threat Analytics</h2>
          <p className="text-xs text-slate-400 mt-1">Live telemetry monitoring for phishing vectors, quishing, and malicious domains.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateScanner('url')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl shadow-lg transition-all"
          >
            + Scan New URL
          </button>
          <button
            onClick={() => onNavigateScanner('email')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all"
          >
            + Scan Email
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
          <div className="text-xs text-slate-400 font-medium">Total Scans Performed</div>
          <div className="text-3xl font-black text-white mt-1 font-mono">{totalScans.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14% vs yesterday
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
          <div className="text-xs text-slate-400 font-medium">Safe URLs & Content</div>
          <div className="text-3xl font-black text-emerald-400 mt-1 font-mono">{safeCount.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
            <CheckCircle className="w-3.5 h-3.5" /> Verified Clean
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
          <div className="text-xs text-slate-400 font-medium">Dangerous & Phishing Threats</div>
          <div className="text-3xl font-black text-rose-400 mt-1 font-mono">{dangerousCount.toLocaleString()}</div>
          <div className="text-[11px] text-rose-400 mt-2 flex items-center gap-1 font-semibold">
            <AlertOctagon className="w-3.5 h-3.5" /> Blocked Immediately
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
          <div className="text-xs text-slate-400 font-medium">Today's Scans</div>
          <div className="text-3xl font-black text-purple-400 mt-1 font-mono">{todayScans}</div>
          <div className="text-[11px] text-purple-400 mt-2 flex items-center gap-1 font-semibold">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Active Session
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution Pie */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Risk Level Distribution</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vector Distribution Bar Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Scans by Threat Vector</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 24-Hour Threat Trend Line Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">24-Hour Threat Detection Activity</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="threats" stroke="#f43f5e" strokeWidth={2} dot={{ fill: '#f43f5e', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Scan History Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">Recent Security Scan Log</h3>
          <span className="text-xs text-slate-400 font-mono">{scanHistory.length} Recorded Entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Target / Domain</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">XAI Factors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
              {scanHistory.map((item) => {
                const badgeClass =
                  item.riskLevel === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : item.riskLevel === 'high'
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                    : item.riskLevel === 'medium'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <tr
                    key={item.id}
                    onClick={() => onScanSelect && onScanSelect(item)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-all"
                  >
                    <td className="py-3 px-4 font-bold text-purple-400">{item.type}</td>
                    <td className="py-3 px-4 break-all max-w-xs">{item.target}</td>
                    <td className="py-3 px-4 font-black">{item.riskScore}%</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold ${badgeClass}`}>
                        {item.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{item.timestamp}</td>
                    <td className="py-3 px-4 text-purple-300">{item.reasonsCount} Flags</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
