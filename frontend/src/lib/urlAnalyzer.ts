export interface UrlFeatures {
  urlLength: number;
  hasHttps: boolean;
  specialCharCount: number;
  suspiciousKeywords: string[];
  hasSuspiciousTLD: boolean;
  hasIPAddress: boolean;
  subdomainCount: number;
  hasAtSymbol: boolean;
  hasDoubleSlash: boolean;
  pathLength: number;
  domainLength: number;
  hasHyphenInDomain: boolean;
  queryParamCount: number;
  hasEncodedChars: boolean;
  hasRedirection: boolean;
  brandImpersonation: string | null;
  typosquatting: string | null;
  isTrustedDomain: boolean;
  protocol: string;
  domain: string;
  subdomain: string;
  path: string;
  queryString: string;
  tld: string;
}

export type RiskLevel = 'safe' | 'suspicious' | 'dangerous';

export interface AnalysisResult {
  url: string;
  isPhishing: boolean;
  riskLevel: RiskLevel;
  confidence: number;
  features: UrlFeatures;
  reasons: string[];
  threats: ThreatIndicator[];
  whois: WhoisSimulation;
  timestamp: Date;
}

export interface ThreatIndicator {
  type: 'critical' | 'warning' | 'info';
  message: string;
  category: string;
}

export interface WhoisSimulation {
  domainAge: string;
  trustScore: number;
  registrationRisk: 'low' | 'medium' | 'high';
  message: string;
}

const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'sign-in', 'verify', 'account', 'update', 'secure', 'banking',
  'confirm', 'password', 'credential', 'suspend', 'restrict', 'unlock',
  'alert', 'notification', 'expired', 'urgent', 'immediate',
  'wallet', 'crypto', 'bitcoin', 'free', 'winner', 'prize', 'reward',
  'gift', 'bonus', 'offer', 'limited', 'act-now', 'click-here',
  'reset', 'recovery', 'authenticate', 'validate', 'invoice', 'payment',
];

const SUSPICIOUS_TLDS = [
  '.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.club',
  '.online', '.site', '.icu', '.buzz', '.monster', '.ru', '.cn',
  '.info', '.bid', '.stream', '.download', '.racing', '.win',
];

const TRUSTED_DOMAINS = [
  'google.com', 'www.google.com', 'gmail.com',
  'microsoft.com', 'www.microsoft.com', 'outlook.com', 'live.com',
  'amazon.com', 'www.amazon.com',
  'apple.com', 'www.apple.com', 'icloud.com',
  'paypal.com', 'www.paypal.com',
  'facebook.com', 'www.facebook.com', 'meta.com',
  'twitter.com', 'x.com',
  'github.com', 'www.github.com',
  'linkedin.com', 'www.linkedin.com',
  'youtube.com', 'www.youtube.com',
  'instagram.com', 'www.instagram.com',
  'netflix.com', 'www.netflix.com',
  'stackoverflow.com',
  'wikipedia.org',
  'reddit.com', 'www.reddit.com',
];

const BRAND_NAMES: Record<string, string[]> = {
  'Google': ['google', 'gmail', 'youtube', 'goog1e', 'g00gle', 'gooogle', 'googIe'],
  'Amazon': ['amazon', 'amaz0n', 'amazom', 'arnazon', 'amazonn'],
  'Microsoft': ['microsoft', 'micr0soft', 'microsft', 'microsofit', 'outlook', '0utlook'],
  'PayPal': ['paypal', 'paypa1', 'paypai', 'payp4l', 'paipal', 'paypall'],
  'Apple': ['apple', 'app1e', 'appIe', 'icloud', 'icl0ud'],
  'Facebook': ['facebook', 'faceb00k', 'facebok', 'faceboook'],
  'Netflix': ['netflix', 'netfIix', 'netf1ix', 'nettflix'],
  'Instagram': ['instagram', 'instagr4m', 'instaqram'],
  'WhatsApp': ['whatsapp', 'whatsap', 'wh4tsapp'],
  'Bank': ['bank', 'banking', 'b4nk', 'bnking'],
};

const TYPOSQUAT_MAP: Record<string, string> = {
  'g00gle': 'Google', 'goog1e': 'Google', 'gooogle': 'Google', 'googIe': 'Google',
  'amaz0n': 'Amazon', 'amazom': 'Amazon', 'arnazon': 'Amazon',
  'micr0soft': 'Microsoft', 'microsft': 'Microsoft',
  'paypa1': 'PayPal', 'paypai': 'PayPal', 'payp4l': 'PayPal', 'paipal': 'PayPal',
  'app1e': 'Apple', 'appIe': 'Apple', 'icl0ud': 'Apple',
  'faceb00k': 'Facebook', 'facebok': 'Facebook',
  'netfIix': 'Netflix', 'netf1ix': 'Netflix',
  'instagr4m': 'Instagram',
  'wh4tsapp': 'WhatsApp',
  'b4nk': 'Bank',
  '0utlook': 'Microsoft',
};

function detectBrandImpersonation(hostname: string, fullUrl: string): string | null {
  const lowerHost = hostname.toLowerCase();
  const lowerUrl = fullUrl.toLowerCase();
  
  // If it's a trusted domain, no impersonation
  if (TRUSTED_DOMAINS.includes(lowerHost)) return null;
  
  for (const [brand, patterns] of Object.entries(BRAND_NAMES)) {
    for (const pattern of patterns) {
      if (lowerHost.includes(pattern) || lowerUrl.includes(pattern)) {
        // Check if it's an actual brand domain
        const brandDomains = TRUSTED_DOMAINS.filter(d => 
          patterns.some(p => d.includes(p) && !Object.keys(TYPOSQUAT_MAP).includes(p))
        );
        if (!brandDomains.includes(lowerHost)) {
          return brand;
        }
      }
    }
  }
  return null;
}

function detectTyposquatting(hostname: string): string | null {
  const lowerHost = hostname.toLowerCase();
  for (const [typo, brand] of Object.entries(TYPOSQUAT_MAP)) {
    if (lowerHost.includes(typo)) return `${brand} (${typo})`;
  }
  return null;
}

function simulateWhois(hostname: string, phishingScore: number): WhoisSimulation {
  const isTrusted = TRUSTED_DOMAINS.includes(hostname.toLowerCase());
  
  if (isTrusted) {
    return {
      domainAge: '10+ years',
      trustScore: 95,
      registrationRisk: 'low',
      message: 'Well-established domain with long registration history.',
    };
  }
  
  if (phishingScore > 60) {
    return {
      domainAge: '< 30 days',
      trustScore: Math.max(5, 30 - phishingScore / 3),
      registrationRisk: 'high',
      message: 'Recently registered domains are commonly used for phishing.',
    };
  }
  
  if (phishingScore > 30) {
    return {
      domainAge: '3-6 months',
      trustScore: 45,
      registrationRisk: 'medium',
      message: 'Relatively new domain. Exercise caution.',
    };
  }
  
  return {
    domainAge: '1-3 years',
    trustScore: 70,
    registrationRisk: 'low',
    message: 'Domain has been registered for a reasonable period.',
  };
}

export function extractFeatures(url: string): UrlFeatures {
  let parsedUrl: URL;
  const normalizedUrl = url.startsWith('http') ? url : `http://${url}`;
  
  try {
    parsedUrl = new URL(normalizedUrl);
  } catch {
    return {
      urlLength: url.length, hasHttps: false,
      specialCharCount: (url.match(/[^a-zA-Z0-9./:]/g) || []).length,
      suspiciousKeywords: [], hasSuspiciousTLD: false, hasIPAddress: false,
      subdomainCount: 0, hasAtSymbol: url.includes('@'),
      hasDoubleSlash: false, pathLength: 0, domainLength: url.length,
      hasHyphenInDomain: url.includes('-'), queryParamCount: 0,
      hasEncodedChars: /%[0-9a-fA-F]{2}/.test(url),
      hasRedirection: false, brandImpersonation: null, typosquatting: null,
      isTrustedDomain: false, protocol: 'unknown', domain: url,
      subdomain: '', path: '', queryString: '', tld: '',
    };
  }

  const hostname = parsedUrl.hostname;
  const fullUrl = parsedUrl.href;
  const lowerUrl = fullUrl.toLowerCase();
  const parts = hostname.split('.');
  const tld = parts.length >= 2 ? '.' + parts.slice(-1).join('.') : '';
  const subdomainParts = parts.slice(0, -2);

  return {
    urlLength: fullUrl.length,
    hasHttps: parsedUrl.protocol === 'https:',
    specialCharCount: (fullUrl.match(/[@#$%^&*()=[\]{}<>|\\~`!]/g) || []).length,
    suspiciousKeywords: SUSPICIOUS_KEYWORDS.filter(kw => lowerUrl.includes(kw)),
    hasSuspiciousTLD: SUSPICIOUS_TLDS.some(t => hostname.endsWith(t)),
    hasIPAddress: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname),
    subdomainCount: Math.max(0, subdomainParts.length),
    hasAtSymbol: fullUrl.includes('@'),
    hasDoubleSlash: fullUrl.replace('://', '').includes('//'),
    pathLength: parsedUrl.pathname.length,
    domainLength: hostname.length,
    hasHyphenInDomain: hostname.includes('-'),
    queryParamCount: parsedUrl.search ? parsedUrl.searchParams.toString().split('&').length : 0,
    hasEncodedChars: /%[0-9a-fA-F]{2}/.test(fullUrl),
    hasRedirection: /redirect|redir|url=|goto=|return=|next=|dest=|forward=/i.test(fullUrl),
    brandImpersonation: detectBrandImpersonation(hostname, fullUrl),
    typosquatting: detectTyposquatting(hostname),
    isTrustedDomain: TRUSTED_DOMAINS.includes(hostname.toLowerCase()),
    protocol: parsedUrl.protocol.replace(':', ''),
    domain: parts.slice(-2).join('.'),
    subdomain: subdomainParts.join('.'),
    path: parsedUrl.pathname,
    queryString: parsedUrl.search,
    tld,
  };
}

export function analyzeUrl(url: string): AnalysisResult {
  const features = extractFeatures(url);
  const reasons: string[] = [];
  const threats: ThreatIndicator[] = [];
  let score = 0;

  // Trusted domain bonus
  if (features.isTrustedDomain) {
    score -= 30;
    threats.push({ type: 'info', message: 'Domain is on the trusted whitelist', category: 'Trust' });
  }

  // HTTPS check (weight: 12)
  if (!features.hasHttps) {
    score += 12;
    reasons.push('URL does not use HTTPS encryption');
    threats.push({ type: 'warning', message: 'No HTTPS encryption detected', category: 'Protocol' });
  } else {
    threats.push({ type: 'info', message: 'Secure HTTPS protocol in use', category: 'Protocol' });
  }

  // IP address (weight: 25)
  if (features.hasIPAddress) {
    score += 25;
    reasons.push('Uses IP address instead of domain name');
    threats.push({ type: 'critical', message: 'IP address used instead of domain name — high risk indicator', category: 'Domain' });
  }

  // Brand impersonation (weight: 30)
  if (features.brandImpersonation) {
    score += 30;
    reasons.push(`Possible ${features.brandImpersonation} brand impersonation detected`);
    threats.push({ type: 'critical', message: `Possible brand impersonation detected: ${features.brandImpersonation}`, category: 'Brand' });
  }

  // Typosquatting (weight: 28)
  if (features.typosquatting) {
    score += 28;
    reasons.push(`Typosquatting detected: ${features.typosquatting}`);
    threats.push({ type: 'critical', message: `Typosquatting detected targeting: ${features.typosquatting}`, category: 'Brand' });
  }

  // @ symbol (weight: 20)
  if (features.hasAtSymbol) {
    score += 20;
    reasons.push('Contains @ symbol which can hide real destination');
    threats.push({ type: 'critical', message: '@ symbol can redirect to a different domain', category: 'Redirect' });
  }

  // Suspicious TLD (weight: 18)
  if (features.hasSuspiciousTLD) {
    score += 18;
    reasons.push(`Suspicious top-level domain: ${features.tld}`);
    threats.push({ type: 'warning', message: `Suspicious TLD detected: ${features.tld}`, category: 'Domain' });
  }

  // URL length (weight: 8-15)
  if (features.urlLength > 100) {
    score += 8;
    reasons.push(`Unusually long URL (${features.urlLength} characters)`);
    threats.push({ type: 'warning', message: `URL length is ${features.urlLength} chars — phishing URLs tend to be long`, category: 'Structure' });
  }
  if (features.urlLength > 200) {
    score += 7;
    reasons.push('Extremely long URL is highly suspicious');
  }

  // Subdomains (weight: 8-15)
  if (features.subdomainCount > 2) {
    score += 8 + Math.min((features.subdomainCount - 2) * 3, 7);
    reasons.push(`Excessive subdomains detected (${features.subdomainCount})`);
    threats.push({ type: 'warning', message: `${features.subdomainCount} subdomains detected — common phishing technique`, category: 'Domain' });
  }

  // Hyphens in domain (weight: 8)
  if (features.hasHyphenInDomain) {
    score += 8;
    reasons.push('Domain contains hyphens (common in phishing URLs)');
    threats.push({ type: 'warning', message: 'Hyphens in domain name — often used in phishing', category: 'Domain' });
  }

  // Double slash (weight: 12)
  if (features.hasDoubleSlash) {
    score += 12;
    reasons.push('Contains suspicious double slash redirect in path');
    threats.push({ type: 'warning', message: 'Double slash redirect pattern detected', category: 'Redirect' });
  }

  // Encoded characters (weight: 10)
  if (features.hasEncodedChars) {
    score += 10;
    reasons.push('URL contains encoded characters that may hide content');
    threats.push({ type: 'warning', message: 'Encoded characters detected — may hide malicious content', category: 'Obfuscation' });
  }

  // Redirection patterns (weight: 15)
  if (features.hasRedirection) {
    score += 15;
    reasons.push('URL contains redirection parameters');
    threats.push({ type: 'critical', message: 'URL redirection pattern detected', category: 'Redirect' });
  }

  // Special characters (weight: 5-10)
  if (features.specialCharCount > 5) {
    score += Math.min(features.specialCharCount, 10);
    reasons.push(`High number of special characters (${features.specialCharCount})`);
    threats.push({ type: 'warning', message: `${features.specialCharCount} special characters found`, category: 'Structure' });
  }

  // Suspicious keywords (weight: 4 each, max 20)
  if (features.suspiciousKeywords.length > 0) {
    score += Math.min(features.suspiciousKeywords.length * 4, 20);
    reasons.push(`Suspicious keywords: ${features.suspiciousKeywords.slice(0, 4).join(', ')}`);
    features.suspiciousKeywords.slice(0, 3).forEach(kw => {
      threats.push({ type: 'warning', message: `Suspicious keyword detected: "${kw}"`, category: 'Keywords' });
    });
  }

  // Query parameters (weight: 5)
  if (features.queryParamCount > 3) {
    score += 5;
    reasons.push(`Excessive query parameters (${features.queryParamCount})`);
    threats.push({ type: 'info', message: 'Multiple query parameters detected', category: 'Structure' });
  }

  // Long path (weight: 5)
  if (features.pathLength > 60) {
    score += 5;
    reasons.push('Unusually long URL path');
  }

  // Normalize score to 0-100
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  // Determine risk level
  let riskLevel: RiskLevel;
  if (normalizedScore <= 30) riskLevel = 'safe';
  else if (normalizedScore <= 60) riskLevel = 'suspicious';
  else riskLevel = 'dangerous';

  const isPhishing = normalizedScore > 60;
  
  // Confidence is how certain we are of the classification
  const confidence = normalizedScore <= 15 
    ? 90 + (15 - normalizedScore) * 0.6  // Very safe → high confidence safe
    : normalizedScore >= 70 
      ? 75 + (normalizedScore - 70) * 0.8  // Very phishing → high confidence phishing
      : 50 + Math.abs(normalizedScore - 50) * 0.8; // Middle → moderate confidence

  if (riskLevel === 'safe' && reasons.length === 0) {
    reasons.push('No suspicious indicators detected');
    reasons.push('Domain structure appears legitimate');
  }

  const whois = simulateWhois(features.domain, normalizedScore);

  return {
    url,
    isPhishing,
    riskLevel,
    confidence: Math.min(confidence, 99),
    features,
    reasons,
    threats,
    whois,
    timestamp: new Date(),
  };
}

export const DEMO_URLS = {
  safe: ['https://google.com', 'https://amazon.com', 'https://github.com'],
  phishing: [
    'http://paypal-login-verification.xyz',
    'http://secure-amazon-update.ru',
    'http://192.168.1.10/login',
  ],
  suspicious: [
    'http://g00gle-account-login.tk',
    'http://my-bank-secure-update.online/verify?user=admin',
    'http://free-prize-winner.club/claim?redirect=http://evil.com',
  ],
};
