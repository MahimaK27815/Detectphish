import { motion } from 'framer-motion';
import { BookOpen, Shield, Eye, Lock, Bug, Mail, Link2, AlertTriangle, Globe, Server, Key, Fingerprint } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: 'What is Phishing?',
    content: `Phishing is a type of cyber attack where attackers disguise themselves as trustworthy entities to steal sensitive information such as login credentials, credit card numbers, and personal data. These attacks typically arrive through email, text messages, or malicious websites designed to look legitimate.`,
    color: 'text-primary',
  },
  {
    icon: Mail,
    title: 'Common Phishing Techniques',
    content: `
• **Email Phishing**: Mass emails impersonating banks, social media, or services with urgent messages like "Your account has been compromised."
• **Spear Phishing**: Targeted attacks aimed at specific individuals using personal information.
• **Clone Phishing**: Duplicating legitimate emails and replacing links with malicious ones.
• **Vishing & Smishing**: Voice calls and SMS messages directing victims to fake websites.
• **Pharming**: Redirecting website traffic to fraudulent sites by corrupting DNS settings.`,
    color: 'text-danger',
  },
  {
    icon: Eye,
    title: 'How to Identify Fake URLs',
    content: `
• **Check the domain carefully**: Look for misspellings like "g00gle.com" or "paypa1.com".
• **Suspicious TLDs**: Domains ending in .xyz, .tk, .ru, .top are often used in phishing.
• **IP addresses**: Legitimate sites rarely use raw IP addresses (e.g., http://192.168.1.1/login).
• **Excessive subdomains**: "secure.login.verify.bank.com.evil.xyz" is suspicious.
• **Hyphens in domains**: "paypal-secure-login.com" is a red flag.
• **Encoded characters**: %20, %3D in URLs may hide malicious content.
• **@ symbol in URLs**: Can redirect to a completely different domain.`,
    color: 'text-suspicious',
  },
  {
    icon: Bug,
    title: 'Examples of Phishing Attacks',
    content: `
• **PayPal Scam**: "http://paypal-login-verification.xyz" — mimics PayPal with a suspicious domain.
• **Amazon Clone**: "http://secure-amazon-update.ru" — uses a Russian TLD to impersonate Amazon.
• **Banking Fraud**: "http://my-bank-secure-update.online/verify?user=admin" — combines multiple red flags.
• **Google Typosquat**: "http://g00gle-account-login.tk" — uses character substitution.
• **IP-Based Attack**: "http://192.168.1.10/login" — hides behind an IP address.`,
    color: 'text-danger',
  },
  {
    icon: Lock,
    title: 'Why HTTPS Matters',
    content: `HTTPS (Hypertext Transfer Protocol Secure) encrypts data between your browser and the website server. While HTTPS alone doesn't guarantee a site is safe, its absence is a major red flag. Modern legitimate websites almost always use HTTPS. However, attackers can also obtain SSL certificates, so HTTPS should be one of many indicators you check, not the only one.`,
    color: 'text-safe',
  },
  {
    icon: Globe,
    title: 'How Attackers Spoof Domains',
    content: `
• **Typosquatting**: Registering domains with common typos (amazom.com, gogle.com).
• **Homograph attacks**: Using lookalike Unicode characters (аpple.com using Cyrillic 'а').
• **Subdomain abuse**: login.paypal.evil-domain.com — PayPal appears to be the domain but isn't.
• **TLD manipulation**: google.com.phishing.xyz — using the real brand in a subdomain.
• **URL shorteners**: Hiding the real destination behind bit.ly or tinyurl links.`,
    color: 'text-secondary',
  },
];

const tips = [
  { icon: Key, text: 'Never enter credentials on websites you reached via email links.' },
  { icon: Fingerprint, text: 'Enable two-factor authentication on all important accounts.' },
  { icon: Server, text: 'Keep your browser and security software up to date.' },
  { icon: AlertTriangle, text: 'Be suspicious of urgent messages demanding immediate action.' },
  { icon: Link2, text: 'Always hover over links before clicking to see the real URL.' },
  { icon: Shield, text: 'Use a URL scanner like PhishGuard AI to verify suspicious links.' },
];

export default function Education() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <BookOpen className="w-12 h-12 text-secondary mx-auto mb-4" />
        <h1 className="text-3xl font-cyber font-bold tracking-wider">
          <span className="text-secondary neon-text-blue">Cybersecurity</span>{' '}
          <span className="text-foreground">Education</span>
        </h1>
        <p className="text-sm text-muted-foreground font-mono mt-2">
          Learn how phishing works and how to protect yourself online
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-6 mb-16">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center`}>
                <section.icon className={`w-5 h-5 ${section.color}`} />
              </div>
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {section.content.split('**').map((part, j) =>
                j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-cyber font-bold text-center mb-8">
          <span className="text-primary neon-text">Tips to Stay Safe</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 flex items-start gap-3 hover:neon-border transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <tip.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{tip.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
