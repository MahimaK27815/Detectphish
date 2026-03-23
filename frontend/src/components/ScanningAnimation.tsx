import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface ScanningAnimationProps {
  phase: string;
}

const terminalLines = [
  '> Initializing PhishGuard scanner...',
  '> Resolving domain...',
  '> Extracting URL features...',
  '> Analyzing domain structure...',
  '> Checking brand databases...',
  '> Running ML classification model...',
  '> Generating threat report...',
];

export function ScanningAnimation({ phase }: ScanningAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto px-4 py-6"
    >
      <div className="glass-card neon-border-blue p-6 overflow-hidden relative">
        {/* Scan sweep line */}
        <div className="absolute left-0 right-0 h-px bg-secondary/50 scan-sweep" />

        <div className="flex items-center gap-3 mb-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <Shield className="w-8 h-8 text-secondary" />
          </motion.div>
          <div>
            <p className="text-secondary font-mono font-semibold text-sm">{phase || 'Scanning...'}</p>
            <p className="text-muted-foreground text-xs font-mono">PhishGuard Detection Engine v2.0</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '90%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            className="h-full bg-secondary rounded-full"
          />
        </div>

        {/* Terminal output */}
        <div className="bg-background/60 rounded-lg p-3 font-mono text-xs space-y-1 max-h-40 overflow-hidden">
          {terminalLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.35 }}
              className="text-muted-foreground"
            >
              {line}
              {i === terminalLines.length - 1 && (
                <span className="terminal-cursor text-secondary ml-1">█</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Animated bars */}
        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 1.5 + Math.random() * 1.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08 }}
              className="w-1 h-3 bg-secondary/50 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
