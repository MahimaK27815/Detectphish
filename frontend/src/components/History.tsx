import { motion } from 'framer-motion';
import { Clock, ShieldCheck, ShieldAlert, AlertTriangle, RotateCcw } from 'lucide-react';
import { AnalysisResult } from '@/lib/urlAnalyzer';
import { format } from 'date-fns';

interface HistoryProps {
  results: AnalysisResult[];
  onRecheck: (url: string) => void;
}

const riskIcons = {
  safe: ShieldCheck,
  suspicious: AlertTriangle,
  dangerous: ShieldAlert,
};

const riskColors = {
  safe: 'text-safe',
  suspicious: 'text-suspicious',
  dangerous: 'text-danger',
};

export function History({ results, onRecheck }: HistoryProps) {
  if (results.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-secondary" />
          Scan History
          <span className="text-muted-foreground text-xs font-mono">({results.length})</span>
        </h3>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {results.map((r, i) => {
            const Icon = riskIcons[r.riskLevel];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 bg-muted/30 rounded-lg p-3 text-xs group"
              >
                <Icon className={`w-4 h-4 shrink-0 ${riskColors[r.riskLevel]}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-mono truncate text-muted-foreground">{r.url}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                    {format(r.timestamp, 'HH:mm:ss')}
                  </p>
                </div>
                <span className={`risk-badge-${r.riskLevel}`}>
                  {r.riskLevel === 'dangerous' ? 'PHISH' : r.riskLevel.toUpperCase()}
                </span>
                <span className={`font-mono font-bold text-xs ${riskColors[r.riskLevel]}`}>
                  {r.confidence.toFixed(0)}%
                </span>
                <button
                  onClick={() => onRecheck(r.url)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1"
                  title="Re-check"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
