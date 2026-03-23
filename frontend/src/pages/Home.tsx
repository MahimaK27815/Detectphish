import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Scan, BarChart3, Brain, Zap, Lock, Globe, AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI-Based Detection', desc: 'Advanced heuristic engine simulating ML classification with weighted scoring across 15+ URL features.' },
  { icon: Scan, title: 'Real-Time Analysis', desc: 'Instant URL scanning with live feature extraction, brand impersonation checks, and typosquatting detection.' },
  { icon: BarChart3, title: 'Risk Scoring', desc: 'Probability-based risk scoring model with three severity levels: Safe, Suspicious, and High Risk Phishing.' },
  { icon: Lock, title: 'Threat Intelligence', desc: 'Comprehensive threat reports with WHOIS simulation, domain trust scores, and URL structure visualization.' },
];

const stats = [
  { value: '15+', label: 'Detection Features', icon: Zap },
  { value: '99%', label: 'Analysis Accuracy', icon: ShieldCheck },
  { value: '< 3s', label: 'Scan Time', icon: TrendingUp },
  { value: '10+', label: 'Brand Databases', icon: Globe },
];

export default function Home() {
  return (
    <div className="pb-12">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-20 h-20 text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-cyber font-bold tracking-wider mb-4">
            <span className="text-primary neon-text">PHISH</span>
            <span className="text-foreground">GUARD</span>
            <span className="text-secondary ml-2">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-2">
            AI-Powered Phishing URL Detection System
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8 font-mono">
            Protecting users from phishing attacks with artificial intelligence, advanced heuristic analysis, and real-time threat intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/scanner"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-primary/80 transition-colors pulse-neon"
            >
              <Scan className="w-5 h-5" />
              Scan URL Now
            </Link>
            <Link
              to="/education"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-muted/50 transition-colors"
            >
              Learn About Phishing
            </Link>
          </div>
        </motion.div>

        {/* Animated detection illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="glass-card neon-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-danger" />
              <div className="w-3 h-3 rounded-full bg-suspicious" />
              <div className="w-3 h-3 rounded-full bg-safe" />
              <span className="text-xs font-mono text-muted-foreground ml-2">PhishGuard Scanner Terminal</span>
            </div>
            <div className="bg-background/60 rounded-lg p-4 font-mono text-xs space-y-1.5 text-left">
              {[
                { text: '$ phishguard scan http://paypal-login-verify.xyz', color: 'text-foreground' },
                { text: '> Extracting 15+ URL features...', color: 'text-secondary' },
                { text: '> Brand impersonation detected: PayPal', color: 'text-danger' },
                { text: '> Suspicious TLD: .xyz', color: 'text-suspicious' },
                { text: '> Hyphens in domain detected', color: 'text-suspicious' },
                { text: '> Risk Score: 87% — PHISHING DETECTED', color: 'text-danger' },
                { text: '> Scan complete. Report generated.', color: 'text-safe' },
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.3 }}
                  className={line.color}
                >
                  {line.text}
                </motion.p>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="terminal-cursor text-primary"
              >
                █
              </motion.span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-cyber font-bold text-center mb-12"
        >
          <span className="text-secondary neon-text-blue">Key Features</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:neon-border transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-foreground font-semibold mb-2">{feat.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="glass-card neon-border-blue p-8">
          <h2 className="text-xl font-cyber font-bold text-center mb-8 text-secondary">System Capabilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-cyber font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <AlertTriangle className="w-12 h-12 text-suspicious mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-cyber font-bold mb-4 text-foreground">
            Don't Be a Victim of Phishing
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Over 3.4 billion phishing emails are sent every day. Use PhishGuard AI to check suspicious URLs before clicking them.
          </p>
          <Link
            to="/scanner"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/80 transition-colors"
          >
            <Scan className="w-5 h-5" />
            Start Scanning
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
