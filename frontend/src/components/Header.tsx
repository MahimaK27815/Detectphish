import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center pt-10 pb-8 px-4"
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="relative">
          <Shield className="w-10 h-10 text-primary" />
          <div className="absolute inset-0 w-10 h-10 bg-primary/20 rounded-full blur-xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-cyber font-bold tracking-wider">
          <span className="text-primary neon-text">PHISH</span>
          <span className="text-foreground">GUARD</span>
        </h1>
        <div className="relative">
          <Shield className="w-10 h-10 text-primary" />
          <div className="absolute inset-0 w-10 h-10 bg-primary/20 rounded-full blur-xl" />
        </div>
      </div>
      <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase">
        AI-Powered Phishing URL Detection System
      </p>
      <div className="flex items-center justify-center gap-6 mt-5 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-safe">● Safe</span>
        <span className="flex items-center gap-1.5 text-suspicious">● Suspicious</span>
        <span className="flex items-center gap-1.5 text-danger">● Phishing</span>
      </div>
    </motion.header>
  );
}
