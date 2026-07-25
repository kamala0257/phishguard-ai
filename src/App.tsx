import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { UrlScanner } from './components/scanners/UrlScanner';
import { EmailScanner } from './components/scanners/EmailScanner';
import { QrScanner } from './components/scanners/QrScanner';
import { ScreenshotScanner } from './components/scanners/ScreenshotScanner';
import { FileScanner } from './components/scanners/FileScanner';
import { VoiceScanner } from './components/scanners/VoiceScanner';
import { ThreatMap } from './components/ThreatMap';
import { GamifiedLearning } from './components/GamifiedLearning';
import { AdminPanel } from './components/AdminPanel';
import { Chatbot } from './components/Chatbot';
import { ExtensionSimulator } from './components/ExtensionSimulator';
import { UserProfileModal } from './components/UserProfileModal';
import { INITIAL_SCAN_HISTORY, MOCK_USER_PROFILE } from './lib/mockData';
import { BookmarkItem, ScanHistoryItem, UserProfile } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [isExtensionOpen, setIsExtensionOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>(INITIAL_SCAN_HISTORY);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([
    {
      id: 'bm-1',
      type: 'url',
      target: 'https://amazon-login-security.xyz',
      riskScore: 94,
      riskLevel: 'critical',
      savedAt: '2026-07-24',
    },
  ]);
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER_PROFILE);

  const handleScanCompleted = (type: 'URL' | 'Email' | 'QR' | 'Screenshot' | 'File' | 'Voice', target: string, riskScore: number, riskLevel: any, reasonsCount: number) => {
    const newHistoryItem: ScanHistoryItem = {
      id: `scan-${Date.now()}`,
      type,
      target,
      riskScore,
      riskLevel,
      timestamp: 'Just now',
      reasonsCount,
    };

    setScanHistory((prev) => [newHistoryItem, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      totalScans: prev.totalScans + 1,
      threatsDetected: riskScore > 50 ? prev.threatsDetected + 1 : prev.threatsDetected,
    }));
  };

  const handleUpdateScore = (newScore: number) => {
    setUserProfile((prev) => ({ ...prev, personalSecurityScore: newScore }));
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleClearHistory = () => {
    setScanHistory([]);
  };

  return (
    <div className="min-h-screen grid-bg text-slate-100 font-sans selection:bg-purple-600 selection:text-white flex flex-col justify-between">
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openExtension={() => setIsExtensionOpen(true)}
        openChatbot={() => setIsChatbotOpen(true)}
        openProfile={() => setIsProfileOpen(true)}
        userScore={userProfile.personalSecurityScore}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'landing' && (
          <LandingPage
            onStartScan={(tab) => setCurrentTab(tab)}
            onViewDashboard={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            scanHistory={scanHistory}
            onNavigateScanner={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'url' && (
          <UrlScanner
            onScanComplete={(res) =>
              handleScanCompleted('URL', res.url, res.riskScore, res.riskLevel, res.reasons.length)
            }
          />
        )}

        {currentTab === 'email' && (
          <EmailScanner
            onScanComplete={(res) =>
              handleScanCompleted('Email', res.sender, res.riskScore, res.riskLevel, res.reasons.length)
            }
          />
        )}

        {currentTab === 'qr' && (
          <QrScanner
            onScanComplete={(res) =>
              handleScanCompleted('QR', res.url, res.riskScore, res.riskLevel, res.reasons.length)
            }
          />
        )}

        {currentTab === 'screenshot' && (
          <ScreenshotScanner
            onScanComplete={(res) =>
              handleScanCompleted('Screenshot', res.imageName, res.riskScore, res.riskLevel, res.reasons.length)
            }
          />
        )}

        {currentTab === 'file' && (
          <FileScanner
            onScanComplete={(res) =>
              handleScanCompleted('File', res.fileName, res.riskScore, res.riskLevel, res.reasons.length)
            }
          />
        )}

        {currentTab === 'voice' && (
          <VoiceScanner
            onScanComplete={(res) =>
              handleScanCompleted('Voice', res.transcript.substring(0, 30) + '...', res.riskScore, res.riskLevel, res.reasons.length)
            }
          />
        )}

        {currentTab === 'threatmap' && <ThreatMap />}

        {currentTab === 'quiz' && (
          <GamifiedLearning
            userScore={userProfile.personalSecurityScore}
            onUpdateScore={handleUpdateScore}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPanel
            scanHistory={scanHistory}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Floating Modals */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      <ExtensionSimulator isOpen={isExtensionOpen} onClose={() => setIsExtensionOpen(false)} />
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
