import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { WhoisSimulation } from '@/lib/urlAnalyzer';

interface Props {
  whois: WhoisSimulation | null; // ✅ allow null
}

const riskColors = {
  low: 'text-safe',
  medium: 'text-suspicious',
  high: 'text-danger',
};

export function WhoisPanel({ whois }: Props) {

  // ✅ HANDLE NULL SAFELY
  if (!whois) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-secondary" />
          Domain Intelligence (WHOIS)
        </h3>
        <p className="text-xs text-muted-foreground italic">
          No WHOIS data available for this URL.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4 text-secondary" />
        Domain Intelligence (WHOIS)
      </h3>

      <div className="grid grid-cols-3 gap-2.5 mb-3">
        
        {/* Domain Age */}
        <div className="bg-muted/40 rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-muted-foreground font-mono mb-1">
            Domain Age
          </p>
          <p className={`text-sm font-bold font-mono ${riskColors[whois.registrationRisk] || ''}`}>
            {whois.domainAge || 'N/A'}
          </p>
        </div>

        {/* Trust Score */}
        <div className="bg-muted/40 rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-muted-foreground font-mono mb-1">
            Trust Score
          </p>
          <p
            className={`text-sm font-bold font-mono ${
              whois.trustScore > 60
                ? 'text-safe'
                : whois.trustScore > 30
                ? 'text-suspicious'
                : 'text-danger'
            }`}
          >
            {whois.trustScore ?? 0}%
          </p>
        </div>

        {/* Risk Level */}
        <div className="bg-muted/40 rounded-lg p-2.5 text-center">
          <p className="text-[10px] text-muted-foreground font-mono mb-1">
            Risk Level
          </p>
          <p className={`text-sm font-bold font-mono ${riskColors[whois.registrationRisk] || ''}`}>
            {whois.registrationRisk
              ? whois.registrationRisk.toUpperCase()
              : 'UNKNOWN'}
          </p>
        </div>

      </div>

      <p className="text-xs text-muted-foreground italic">
        {whois.message || 'No additional WHOIS insights available.'}
      </p>
    </div>
  );
}