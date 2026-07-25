import React, { useState } from 'react';
import {
  Shield, Globe, Mail, QrCode, Camera, FileCode, Bot, Activity,
  ArrowRight, CheckCircle2, AlertTriangle, Cpu, Lock, Sparkles, Send, Star
} from 'lucide-react';

interface LandingPageProps {
  onStartScan: (tab: string) => void;
  onViewDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartScan, onViewDashboard }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const features = [
    {
      id: 'url',
      title: 'Real-Time URL Scanner',
      desc: 'Analyses domain age, WHOIS, SSL certificates, typosquatting targets, entropy, and VirusTotal threats.',
      icon: Globe,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'email',
      title: 'Email Phishing & Synthetic AI Detector',
      desc: 'Detects sender spoofing, urgency words, brand impersonation, and synthetic AI-generated phishing content.',
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'qr',
      title: 'QR Code Quishing Scanner',
      desc: 'Extracts encoded matrix links from QR images and automatically executes AI risk analysis before you open them.',
      icon: QrCode,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'screenshot',
      title: 'Screenshot Multimodal OCR',
      desc: 'Upload email, WhatsApp, SMS, or browser captures for vision-based text extraction and phishing detection.',
      icon: Camera,
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'file',
      title: 'File & Attachment Sandbox',
      desc: 'Audits PDF, Word macros, ZIP archives, and double extension tricks (.pdf.exe) for embedded malware.',
      icon: FileCode,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'threatmap',
      title: 'Live Threat Intelligence',
      desc: 'Real-time global attack telemetry, top targeted corporate brands, and blacklisted domain feeds.',
      icon: Activity,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const stats = [
    { label: 'Total URLs Scanned', value: '1,420,890+' },
    { label: 'Phishing Threats Blocked', value: '384,120+' },
    { label: 'Safe Links Verified', value: '1,036,770+' },
    { label: 'Detection Accuracy Rate', value: '99.8%' },
  ];

  const testimonials = [
    {
      quote: 'PhishGuard AI prevented our employees from clicking a sophisticated typosquatted payroll domain. The Explainable AI breakdown showed us exactly why it was dangerous!',
      name: 'Elena Rostova',
      role: 'Chief Information Security Officer, FinTech Corp',
    },
    {
      quote: 'The QR Quishing detector and screenshot OCR are lifesavers. I uploaded an SMS screenshot and PhishGuard flagged the suspicious bank link instantly.',
      name: 'Marcus Vance',
      role: 'Senior Cyber Incident Handler',
    },
    {
      quote: 'Unlike typical blacklists, PhishGuard explains WHY a link is high-risk in plain English. Essential tool for every organization.',
      name: 'Dr. Sarah Jenkins',
      role: 'Cybersecurity Researcher',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 4000);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6 shadow-lg shadow-purple-900/20">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Next-Gen Zero-Trust AI Security Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Protect Yourself From <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Phishing Attacks</span> Using AI
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Real-time AI-powered phishing detection for URLs, emails, QR codes, screenshots, and file attachments. Get instant 0-100% Risk Scores with Explainable AI reasons.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartScan('url')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.02]"
            >
              <Shield className="w-5 h-5" />
              Start Scanning Now
            </button>

            <button
              onClick={onViewDashboard}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-base rounded-2xl shadow-lg transition-all"
            >
              <Activity className="w-5 h-5 text-purple-400" />
              View Threat Dashboard
            </button>
          </div>

          {/* Quick Scanner Tabs */}
          <div className="mt-12 p-2 bg-slate-900/80 border border-slate-800 rounded-2xl max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 backdrop-blur-md">
            <button onClick={() => onStartScan('url')} className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md">
              <Globe className="w-4 h-4" /> URL Scanner
            </button>
            <button onClick={() => onStartScan('email')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all">
              <Mail className="w-4 h-4 text-blue-400" /> Email Phishing
            </button>
            <button onClick={() => onStartScan('qr')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all">
              <QrCode className="w-4 h-4 text-emerald-400" /> QR Quishing
            </button>
            <button onClick={() => onStartScan('screenshot')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all">
              <Camera className="w-4 h-4 text-pink-400" /> Screenshot OCR
            </button>
            <button onClick={() => onStartScan('file')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all">
              <FileCode className="w-4 h-4 text-cyan-400" /> File Scanner
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
          {stats.map((st, idx) => (
            <div key={idx} className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {st.value}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">Multi-Vector AI Defense Capabilities</h2>
          <p className="text-sm text-slate-400 mt-2">
            Comprehensive protection covering every attack surface using Machine Learning classifiers and Generative Explainable AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => onStartScan(feat.id)}
                className="group relative glass-card hover:glow-purple rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} p-3 text-white mb-4 shadow-lg group-hover:scale-110 transition-all`}>
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                  {feat.title}
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-all" />
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">Trusted by Security Professionals</h2>
          <p className="text-sm text-slate-400 mt-2">See what CISOs, developers, and students say about PhishGuard AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic mb-6">"{t.quote}"</p>
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs font-bold text-white">{t.name}</div>
                <div className="text-[11px] text-slate-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-white">Need Custom Enterprise Deployment?</h3>
            <p className="text-xs text-slate-400 mt-1">Get in touch with our AI Security engineering team.</p>
          </div>

          {contactSubmitted ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2" />
              Thank you! Your message has been routed to our SOC team.
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl text-xs text-white"
                />
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl text-xs text-white"
                />
              </div>
              <textarea
                rows={3}
                required
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Describe your security requirements..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl text-xs text-white"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Security Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
