import { QuizQuestion, ScanHistoryItem, ThreatFeedItem, UserProfile } from '../types';

export const SAMPLE_URLS = [
  { url: 'https://amazon-login-security.xyz', label: 'Fake Amazon Login (Phishing)' },
  { url: 'https://paypal-verify-account.tk', label: 'Fake PayPal Verification' },
  { url: 'https://apple-id-security-update.com.site', label: 'Apple ID Impersonation' },
  { url: 'https://google.com', label: 'Legitimate Google' },
  { url: 'https://github.com', label: 'Legitimate GitHub' },
  { url: 'https://bank-of-america-alert-urgent.online', label: 'Banking Phishing' },
];

export const SAMPLE_EMAILS = [
  {
    title: 'Urgent PayPal Account Suspension',
    sender: 'support-security@paypaI-verify.net',
    subject: 'Urgent: Your PayPal account has been limited due to suspicious activity',
    body: `Dear Customer,

We detected unauthorized login attempts from IP 185.220.101.4. For your protection, your account features have been suspended.

Please verify your credit card details immediately within 24 hours to prevent permanent account termination:

http://paypal-verify-account.tk/login?id=83921

If you do not update your information, your balance will be frozen.

Sincerely,
PayPal Security Team`,
  },
  {
    title: 'Legitimate Google Security Alert',
    sender: 'no-reply@accounts.google.com',
    subject: 'Security alert for your linked Google Account',
    body: `Hi Alex,

A new device signed into your Google Account on Chrome Linux.

If this was you, you don't need to do anything. If you don't recognize this activity, please check your account activity on https://myaccount.google.com/security.

Thanks,
The Google Accounts team`,
  },
  {
    title: 'AI-Generated Executive Wire Transfer Request',
    sender: 'ceo-office@company-corp.site',
    subject: 'Confidential: Urgent Overseas Acquisition Wire Transfer Request',
    body: `Dear Finance Director,

As discussed briefly, we are closing a time-sensitive acquisition deal this afternoon. Kindly process an immediate wire transfer of $45,000 to the escrow account below before 4:00 PM EST.

Bank: Global Apex Credit
Account: 8849-2019-4820
SWIFT: GACUS33XXX

Do not discuss this with other personnel until the press release is issued tomorrow. Reply with payment confirmation.

Best regards,
Chief Executive Officer`,
  },
];

export const INITIAL_SCAN_HISTORY: ScanHistoryItem[] = [
  {
    id: 'scan-1',
    type: 'URL',
    target: 'https://amazon-login-security.xyz',
    riskScore: 94,
    riskLevel: 'critical',
    timestamp: '2 mins ago',
    reasonsCount: 5,
  },
  {
    id: 'scan-2',
    type: 'Email',
    target: 'support-security@paypaI-verify.net',
    riskScore: 89,
    riskLevel: 'high',
    timestamp: '15 mins ago',
    reasonsCount: 4,
  },
  {
    id: 'scan-3',
    type: 'URL',
    target: 'https://google.com',
    riskScore: 2,
    riskLevel: 'safe',
    timestamp: '1 hour ago',
    reasonsCount: 0,
  },
  {
    id: 'scan-4',
    type: 'QR',
    target: 'http://free-wifi-connect-now.info/login',
    riskScore: 78,
    riskLevel: 'high',
    timestamp: '3 hours ago',
    reasonsCount: 3,
  },
  {
    id: 'scan-5',
    type: 'Screenshot',
    target: 'SMS_BankAlert_Screenshot.png',
    riskScore: 92,
    riskLevel: 'critical',
    timestamp: '5 hours ago',
    reasonsCount: 4,
  },
  {
    id: 'scan-6',
    type: 'File',
    target: 'Invoice_July2026.pdf.exe',
    riskScore: 98,
    riskLevel: 'critical',
    timestamp: '1 day ago',
    reasonsCount: 6,
  },
];

export const THREAT_FEED: ThreatFeedItem[] = [
  {
    id: 'tf-101',
    domainOrUrl: 'secure-chase-update-verification.top',
    threatType: 'Credential Harvesting',
    targetBrand: 'Chase Bank',
    detectedAt: 'Just now',
    country: 'United States',
    ip: '198.51.100.42',
    riskLevel: 'critical',
  },
  {
    id: 'tf-102',
    domainOrUrl: 'microsoft-office365-pass-reset.site',
    threatType: 'Phishing',
    targetBrand: 'Microsoft',
    detectedAt: '3 mins ago',
    country: 'Russia',
    ip: '185.220.101.5',
    riskLevel: 'high',
  },
  {
    id: 'tf-103',
    domainOrUrl: 'binance-wallet-airdrop-claim.cc',
    threatType: 'Malware',
    targetBrand: 'Binance',
    detectedAt: '8 mins ago',
    country: 'Panama',
    ip: '190.14.38.102',
    riskLevel: 'critical',
  },
  {
    id: 'tf-104',
    domainOrUrl: 'netflix-subscription-renew-now.online',
    threatType: 'Typosquatting',
    targetBrand: 'Netflix',
    detectedAt: '14 mins ago',
    country: 'Netherlands',
    ip: '94.232.41.8',
    riskLevel: 'high',
  },
  {
    id: 'tf-105',
    domainOrUrl: 'dhl-tracking-express-package.tk',
    threatType: 'Phishing',
    targetBrand: 'DHL Express',
    detectedAt: '22 mins ago',
    country: 'Germany',
    ip: '188.165.12.99',
    riskLevel: 'high',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'You receive an email from "security@paypaI-update.com" stating your account will be deleted in 2 hours unless you log in. What is the biggest red flag?',
    options: [
      'The message uses a friendly greeting.',
      'Extreme artificial urgency combined with a misspelled brand domain ("paypaI" with capital I instead of l).',
      'It contains a corporate signature.',
      'It was delivered in your primary inbox.',
    ],
    correctIndex: 1,
    explanation: 'Attackers create typosquatted domains (using uppercase "I" or numbers) and induce panic with artificial time constraints (e.g. 2 hours) to bypass rational verification.',
  },
  {
    id: 2,
    question: 'What is "Typosquatting" in cyber attacks?',
    options: [
      'Sending emails with bad spelling and grammar.',
      'Registering domain names that look almost identical to popular legitimate websites to trick users.',
      'Hacking into a router by typing default passwords.',
      'Encrypting files on a computer until a payment is made.',
    ],
    correctIndex: 1,
    explanation: 'Typosquatting relies on subtle domain misspellings (e.g., amzn-login.com instead of amazon.com) to impersonate trusted portals.',
  },
  {
    id: 3,
    question: 'How does a QR Code Phishing (Quishing) attack typically work?',
    options: [
      'The QR code physically breaks your smartphone camera lens.',
      'The QR code redirects your phone browser to a credential harvesting site or downloads a malicious payload.',
      'QR codes can only be scanned by authorized bank devices.',
      'Scanning a QR code instantly sends your bank balance to the hacker.',
    ],
    correctIndex: 1,
    explanation: 'Quishing bypasses traditional email text filters by embedding malicious redirect links inside image codes that users open on mobile devices.',
  },
  {
    id: 4,
    question: 'Which lock icon in a browser URL bar guarantees that a website is 100% safe and trustworthy?',
    options: [
      'The padlock icon means the site is 100% safe.',
      'The padlock icon only indicates an encrypted HTTPS connection; cybercriminals can easily install free SSL certificates on phishing sites.',
      'Any green URL bar means the site cannot steal passwords.',
      'Padlocks only appear on government websites.',
    ],
    correctIndex: 1,
    explanation: 'HTTPS only guarantees encryption in transit between you and the server—it does NOT mean the server owner is honest. Over 80% of phishing sites today use valid HTTPS/SSL certificates!',
  },
];

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'usr-9021',
  name: 'Cyber Sentinel',
  email: 'kamalaharshithapachhipala@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  totalScans: 48,
  threatsDetected: 19,
  personalSecurityScore: 92,
  role: 'admin',
  achievements: [
    {
      id: 'ach-1',
      title: 'Phish Hunter',
      description: 'Scanned 10+ suspicious URLs successfully',
      unlockedAt: '2026-07-20',
      icon: 'ShieldCheck',
    },
    {
      id: 'ach-2',
      title: 'QR Guardian',
      description: 'Detected a malicious Quishing code',
      unlockedAt: '2026-07-22',
      icon: 'QrCode',
    },
    {
      id: 'ach-3',
      title: 'XAI Master',
      description: 'Reviewed Explainable AI risk factors on 5 threats',
      unlockedAt: '2026-07-23',
      icon: 'BrainCircuit',
    },
    {
      id: 'ach-4',
      title: 'Cyber Awareness Master',
      description: 'Scored 100% on Phishing Defense Quiz',
      unlockedAt: '2026-07-24',
      icon: 'Award',
    },
  ],
};
