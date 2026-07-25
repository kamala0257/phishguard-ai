import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Globe, Server, RefreshCw, AlertOctagon, ExternalLink } from 'lucide-react';
import { THREAT_FEED } from '../lib/mockData';
import { ThreatFeedItem } from '../types';
import { fetchThreatMapData } from '../lib/api';

export const ThreatMap: React.FC = () => {
  const [threats, setThreats] = useState<ThreatFeedItem[]>(THREAT_FEED);
  const [loading, setLoading] = useState(false);

  const reloadFeed = async () => {
    setLoading(true);
    try {
      const data = await fetchThreatMapData();
      if (data.activeThreats) {
        setThreats(data.activeThreats);
      }
    } catch (e) {
      console.warn('Threat map reload fallback:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Threat Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4 animate-pulse" /> Live Threat Intelligence Feed
          </div>
          <h2 className="text-2xl font-black text-white">Global Attack Map & Telemetry</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time blacklisted domains, typosquatting vectors, and zero-day threat feeds.</p>
        </div>

        <button
          onClick={reloadFeed}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          Refresh Threat Feed
        </button>
      </div>

      {/* Cyber World Visual Grid Box */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[280px] overflow-hidden flex flex-col justify-between">
        {/* Animated Cyber Map Grid Lines Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b0764_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" /> Active Global Nodes Monitored: 9,241
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Phishing</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Malware</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Typosquatting</span>
          </div>
        </div>

        {/* Live Attack Pulses */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {threats.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full pointer-events-none" />
              <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">{item.threatType}</div>
              <div className="text-xs font-bold text-white mt-1 font-mono break-all">{item.domainOrUrl}</div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                <span>Target: {item.targetBrand}</span>
                <span className="text-slate-500 font-mono">{item.country}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-[11px] text-slate-500 font-mono text-right">
          Telemetry Data Stream: SSL Inspector + Google SafeBrowsing API
        </div>
      </div>

      {/* Threat List Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Latest Blacklisted Infrastructure</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Domain / Host</th>
                <th className="py-3 px-4">Threat Type</th>
                <th className="py-3 px-4">Target Brand</th>
                <th className="py-3 px-4">Origin Country</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Detected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
              {threats.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-all">
                  <td className="py-3 px-4 font-bold text-purple-300 break-all">{t.domainOrUrl}</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">{t.threatType}</td>
                  <td className="py-3 px-4 font-semibold text-slate-200">{t.targetBrand}</td>
                  <td className="py-3 px-4 text-slate-400">{t.country}</td>
                  <td className="py-3 px-4 text-slate-400">{t.ip}</td>
                  <td className="py-3 px-4 text-slate-500">{t.detectedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
