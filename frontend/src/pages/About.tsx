import { motion } from 'framer-motion';
import { Info, Code2, Brain, Layers, ArrowRight, Cpu, Database, Globe, Shield, Zap, TrendingUp, Lightbulb, User } from 'lucide-react';

const techStack = [
  { name: 'React', desc: 'Component-based UI library', icon: Code2 },
  { name: 'TypeScript', desc: 'Type-safe JavaScript', icon: Layers },
  { name: 'Vite', desc: 'Fast build tool', icon: Zap },
  { name: 'TailwindCSS', desc: 'Utility-first CSS', icon: Globe },
  { name: 'Recharts', desc: 'Data visualization', icon: TrendingUp },
  { name: 'Framer Motion', desc: 'Animation library', icon: Cpu },
];

const mlConcepts = [
  'Weighted feature extraction from URLs',
  'Heuristic scoring simulating Random Forest classification',
  'Brand impersonation detection via pattern matching',
  'Typosquatting detection using character substitution maps',
  'Domain trust scoring based on reputation simulation',
  'Probability-based risk classification (Safe/Suspicious/Phishing)',
];

const futureWork = [
  'Integration with real ML backend (Python Flask + scikit-learn)',
  'Real WHOIS API integration for domain age verification',
  'Browser extension for real-time URL checking',
  'User authentication and persistent scan history',
  'VirusTotal / Google Safe Browsing API integration',
  'Email header analysis for phishing detection',
];

const archSteps = [
  { label: 'User Input', desc: 'URL entered by user', icon: Globe },
  { label: 'Feature Extraction', desc: '15+ URL features extracted', icon: Database },
  { label: 'Scoring Engine', desc: 'Weighted heuristic analysis', icon: Brain },
  { label: 'Classification', desc: 'Safe / Suspicious / Phishing', icon: Shield },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <Info className="w-12 h-12 text-secondary mx-auto mb-4" />
        <h1 className="text-3xl font-cyber font-bold tracking-wider">
          <span className="text-secondary neon-text-blue">About</span>{' '}
          <span className="text-foreground">PhishGuard AI</span>
        </h1>
        <p className="text-sm text-muted-foreground font-mono mt-2">
          Final Year AI/ML Project — Phishing URL Detection System
        </p>
      </motion.div>

      {/* Project Description */}
      <motion.div className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Project Description
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          PhishGuard AI is an intelligent phishing URL detection system that analyzes URLs using advanced heuristic
          feature extraction techniques to identify potential phishing attacks. The system extracts multiple URL features
          including domain structure, protocol analysis, brand impersonation detection, and suspicious keyword analysis.
        </p>
      </motion.div>

      {/* System Architecture */}
      <motion.div className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-secondary" />
          System Architecture
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {archSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-2 border border-border/50">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-semibold text-foreground">{step.label}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{step.desc}</p>
              </div>
              {i < archSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-secondary" />
          Technologies Used
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {techStack.map((tech, i) => (
            <div key={i} className="bg-muted/30 rounded-lg p-3 flex items-center gap-3">
              <tech.icon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">{tech.name}</p>
                <p className="text-[10px] text-muted-foreground">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ML Concepts */}
      <motion.div className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Machine Learning Concepts Used
        </h2>
        <ul className="space-y-2">
          {mlConcepts.map((concept, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              {concept}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* 👤 SINGLE DEVELOPER SECTION */}
      <motion.div className="glass-card p-6 mb-8 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center justify-center gap-2">
          <User className="w-5 h-5 text-secondary" />
          Project Developer
        </h2>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold mb-4">
            MK
          </div>

          <h3 className="text-lg font-semibold text-foreground">
            Mahima K
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            Full Stack Developer | AI/ML Project
          </p>

          <p className="text-xs text-muted-foreground mt-3 max-w-md">
            Designed and developed the complete phishing URL detection system including frontend, backend integration,
            and machine learning model. Focused on building a real-time, intelligent, and user-friendly cybersecurity solution.
          </p>
        </div>
      </motion.div>

      {/* Future Improvements */}
      <motion.div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-suspicious" />
          Future Improvements
        </h2>
        <ul className="space-y-2">
          {futureWork.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}