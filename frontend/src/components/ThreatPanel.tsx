import { motion } from 'framer-motion';
import { AlertOctagon, AlertTriangle, Info } from 'lucide-react';
import { ThreatIndicator } from '@/lib/urlAnalyzer';

interface Props {
  threats: ThreatIndicator[];
}

const icons = {
  critical: AlertOctagon,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  critical: 'border-danger/30 bg-danger/5 text-danger',
  warning: 'border-suspicious/30 bg-suspicious/5 text-suspicious',
  info: 'border-secondary/30 bg-secondary/5 text-secondary',
};

export function ThreatPanel({ threats }: Props) {
  const sorted = [...threats].sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 };
    return order[a.type] - order[b.type];
  });

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <AlertOctagon className="w-4 h-4 text-danger" />
        Live Threat Intelligence
      </h3>
      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
        {sorted.map((threat, i) => {
          const Icon = icons[threat.type];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 text-xs ${styles[threat.type]}`}
            >
              <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium">{threat.message}</p>
                <p className="text-muted-foreground text-[10px] mt-0.5 font-mono">{threat.category}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
