export type RiskLevel = 'safe' | 'medium' | 'high' | 'critical';

export interface XAIReason {
  id: string;
  category: 'domain' | 'ssl' | 'content' | 'ml' | 'reputation' | 'header' | 'urgency';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface URLAnalysisResult {
  url: string;
  domain: string;
  subdomain: string;
  protocol: string;
  urlLength: number;
  hasHttps: boolean;
  sslValid: boolean;
  sslIssuer?: string;
  domainAgeDays: number;
  registrar: string;
  ipAddress: string;
  dnsRecords: string[];
  redirectCount: number;
  entropyScore: number;
  typosquattingTarget?: string;
  virusTotalPositives: number;
  virusTotalTotal: number;
  googleSafeBrowsing: 'clean' | 'phishing' | 'malware' | 'unwanted';
  mlProbability: number;
  mlConfidence: number;
  riskScore: number; // 0 to 100
  riskLevel: RiskLevel;
  reasons: XAIReason[];
  recommendation: string;
  timestamp: string;
}

export interface EmailAnalysisResult {
  sender: string;
  subject: string;
  bodySnippet: string;
  isSpam: boolean;
  isPhishing: boolean;
  isAiGeneratedPhishing: boolean;
  urgencyScore: number; // 0-100
  brandImpersonated?: string;
  suspiciousKeywords: string[];
  grammarRating: 'good' | 'suspicious' | 'poor';
  headerAnalysis: {
    spfPass: boolean;
    dkimPass: boolean;
    dmarcPass: boolean;
  };
  riskScore: number;
  riskLevel: RiskLevel;
  reasons: XAIReason[];
  recommendation: string;
  timestamp: string;
}

export interface OCRAnalysisResult {
  imageName: string;
  extractedText: string;
  detectedType: 'email' | 'whatsapp' | 'sms' | 'browser' | 'other';
  suspiciousElements: string[];
  phishingProbability: number;
  riskScore: number;
  riskLevel: RiskLevel;
  reasons: XAIReason[];
  recommendation: string;
  timestamp: string;
}

export interface FileAnalysisResult {
  fileName: string;
  fileSize: number;
  fileType: string;
  malwareIndicators: string[];
  embeddedUrls: string[];
  hasMacro: boolean;
  doubleExtension: boolean;
  riskScore: number;
  riskLevel: RiskLevel;
  reasons: XAIReason[];
  recommendation: string;
  timestamp: string;
}

export interface VoiceAnalysisResult {
  transcript: string;
  detectedSenderType: string;
  urgencyFlags: string[];
  vishingProbability: number;
  riskScore: number;
  riskLevel: RiskLevel;
  reasons: XAIReason[];
  recommendation: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  totalScans: number;
  threatsDetected: number;
  personalSecurityScore: number; // 0-100
  role: 'user' | 'admin';
  achievements: {
    id: string;
    title: string;
    description: string;
    unlockedAt?: string;
    icon: string;
  }[];
}

export interface BookmarkItem {
  id: string;
  type: 'url' | 'email' | 'file';
  target: string;
  riskLevel: RiskLevel;
  riskScore: number;
  savedAt: string;
  notes?: string;
}

export interface ScanHistoryItem {
  id: string;
  type: 'URL' | 'Email' | 'QR' | 'Screenshot' | 'File' | 'Voice';
  target: string;
  riskScore: number;
  riskLevel: RiskLevel;
  timestamp: string;
  reasonsCount: number;
}

export interface ThreatFeedItem {
  id: string;
  domainOrUrl: string;
  threatType: 'Phishing' | 'Malware' | 'Typosquatting' | 'Credential Harvesting';
  targetBrand: string;
  detectedAt: string;
  country: string;
  ip: string;
  riskLevel: RiskLevel;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
