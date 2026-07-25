import React from 'react';
import { Shield, LayoutDashboard, Globe, Mail, QrCode, Camera, FileCode, Bot, Activity, Award, User, Puzzle, Terminal } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openExtension: () => void;
  openChatbot: () => void;
  openProfile: () => void;
  userScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  openExtension,
  openChatbot,
  openProfile,
  userScore,
}) => {
  const navItems = [
    { id: 'landing', label: 'Home', icon: Globe },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'url', label: 'URL Scanner', icon: Globe },
    { id: 'email', label: 'Email Scanner', icon: Mail },
    { id: 'qr', label: 'QR Scanner', icon: QrCode },
    { id: 'screenshot', label: 'Screenshot OCR', icon: Camera },
    { id: 'file', label: 'File Threat', icon: FileCode },
    { id: 'threatmap', label: 'Threat Intelligence', icon: Activity },
    { id: 'quiz', label: 'Academy & Quiz', icon: Award },
    { id: 'admin', label: 'Admin Center', icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      {/* Top Security Status Bar */}
      <div className="bg-purple-950/40 border-b border-purple-900/30 px-4 py-1.5 text-[11px] text-slate-300 flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider">AI Guard Active</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Zero-Day Engine: v4.8.2</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">VirusTotal / SafeBrowsing APIs: Connected</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-purple-300 font-medium">Personal Security Rating: {userScore}/100</span>
          <button
            onClick={openExtension}
            className="px-2.5 py-0.5 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 rounded text-[10px] font-semibold flex items-center gap-1 transition-all"
          >
            <Puzzle className="w-3 h-3 text-purple-400" />
            Browser Plugin Sim
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-all">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                PhishGuard <span className="text-purple-400 font-extrabold">AI</span>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                Zero-Trust Defense
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Quick Chatbot Trigger */}
            <button
              onClick={openChatbot}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-purple-300 text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <Bot className="w-4 h-4 text-purple-400 animate-bounce" />
              <span className="hidden sm:inline">AI Security Chat</span>
            </button>

            {/* Profile Avatar Trigger */}
            <button
              onClick={openProfile}
              className="p-1.5 bg-slate-900 border border-slate-800 hover:border-purple-500 rounded-xl transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Horizontal Scroll Bar */}
        <div className="flex xl:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800/80 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
