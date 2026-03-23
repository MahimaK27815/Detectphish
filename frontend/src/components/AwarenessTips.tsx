import { motion } from 'framer-motion';
import { Lightbulb, ExternalLink, Mail, Link2, Lock, Shield, Eye, Bug } from 'lucide-react';

const tips = [
  { icon: <Shield className="w-5 h-5" />, title: 'How Phishing Works', text: 'Attackers create fake websites that mimic trusted services to steal login credentials, financial info, and personal data.' },
  { icon: <Eye className="w-5 h-5" />, title: 'Spotting Fake Websites', text: 'Check for misspellings in domain names, unusual TLDs (.xyz, .tk), IP addresses in URLs, and excessive subdomains.' },
  { icon: <Lock className="w-5 h-5" />, title: 'Why HTTPS Matters', text: 'HTTPS encrypts data between your browser and the server. Legitimate sites almost always use HTTPS, but phishing sites sometimes do too.' },
  { icon: <Bug className="w-5 h-5" />, title: 'Domain Spoofing', text: 'Attackers use lookalike characters (g00gle, paypa1), hyphens (amazon-login), and subdomains (login.amazon.fake.com) to deceive.' },
  { icon: <Mail className="w-5 h-5" />, title: 'Email Phishing Tactics', text: 'Urgency ("Your account will be suspended!"), fake rewards, and impersonating trusted brands are the most common email phishing tactics.' },
  { icon: <Link2 className="w-5 h-5" />, title: 'URL Inspection', text: 'Always hover over links to see the real URL. Check for redirects, encoded characters, and @ symbols that can mask the true destination.' },
];

export function AwarenessTips() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-warning" />
          Cybersecurity Awareness Center
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-muted/30 rounded-lg p-3 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-2 text-secondary font-semibold text-xs mb-1.5 group-hover:text-primary transition-colors">
                {tip.icon}
                {tip.title}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{tip.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
