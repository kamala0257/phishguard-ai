import {
  EmailAnalysisResult,
  FileAnalysisResult,
  OCRAnalysisResult,
  URLAnalysisResult,
  VoiceAnalysisResult
} from '../types';

export async function scanUrl(url: string): Promise<URLAnalysisResult> {
  const res = await fetch('/api/analyze/url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to analyze URL');
  }
  return res.json();
}

export async function scanEmail(data: { sender: string; subject: string; body: string; header?: string }): Promise<EmailAnalysisResult> {
  const res = await fetch('/api/analyze/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to analyze email');
  }
  return res.json();
}

export async function scanScreenshot(data: { imageBase64: string; mimeType?: string; imageName?: string }): Promise<OCRAnalysisResult> {
  const res = await fetch('/api/analyze/ocr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to analyze screenshot');
  }
  return res.json();
}

export async function scanFile(data: { fileName: string; fileSize: number; fileType: string }): Promise<FileAnalysisResult> {
  const res = await fetch('/api/analyze/file', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to scan file');
  }
  return res.json();
}

export async function scanVoice(transcript: string): Promise<VoiceAnalysisResult> {
  const res = await fetch('/api/analyze/voice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to analyze voice transcript');
  }
  return res.json();
}

export async function sendChatMessage(message: string): Promise<{ reply: string }> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw new Error('Chat API communication error');
  }
  return res.json();
}

export async function fetchThreatMapData() {
  const res = await fetch('/api/threats/map');
  if (!res.ok) {
    throw new Error('Threat intelligence feed unavailable');
  }
  return res.json();
}
