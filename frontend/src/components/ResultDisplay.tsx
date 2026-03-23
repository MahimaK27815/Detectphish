import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Lock,
  LockOpen,
  Hash,
  Globe,
  AtSign,
  Link2,
  Eye,
  RotateCcw,
  Fingerprint,
  Radar,
  ScanLine,
  ShieldBan,
  Skull,
  Bug,
} from 'lucide-react';
import { AnalysisResult } from '@/lib/urlAnalyzer';
import { UrlStructureViz } from './UrlStructureViz';
import { ThreatPanel } from './ThreatPanel';
import { WhoisPanel } from './WhoisPanel';
import { RiskMeterGauge } from './RiskMeterGauge';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const riskConfig = {
  safe: {
    icon: ShieldCheck,
    color: 'text-safe',
    bg: 'bg-safe/10',
    border: 'neon-border',
    label: 'SAFE',
  },
  suspicious: {
    icon: AlertTriangle,
    color: 'text-suspicious',
    bg: 'bg-suspicious/10',
    border: 'neon-border-yellow',
    label: 'SUSPICIOUS',
  },
  dangerous: {
    icon: ShieldAlert,
    color: 'text-danger',
    bg: 'bg-danger/10',
    border: 'neon-border-red',
    label: 'PHISHING DETECTED',
  },
};

export function ResultDisplay({ result }: ResultDisplayProps) {
  const config = riskConfig[result.riskLevel] || riskConfig.safe;
  const Icon = config.icon;

  // ✅ FIX 1: Safe riskScore calculation (no weird values)
  const riskScore =
    result.riskLevel === 'safe'
      ? Math.max(5, 100 - result.confidence)
      : result.riskLevel === 'suspicious'
      ? Math.min(70, Math.max(30, result.confidence))
      : result.confidence;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4 py-4 space-y-4"
    >
      {/* ================= Verdict Card ================= */}
      <div className={`glass-card p-6 ${config.border}`}>
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
            className={`w-16 h-16 rounded-xl flex items-center justify-center ${config.bg}`}
          >
            <Icon className={`w-8 h-8 ${config.color}`} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className={`text-xl font-cyber font-bold ${config.color}`}>
                {config.label}
              </h2>
              <span className={`risk-badge-${result.riskLevel}`}>
                {result.riskLevel.toUpperCase()}
              </span>
            </div>

            <p className="text-muted-foreground text-xs font-mono truncate">
              {result.url}
            </p>
          </div>
        </div>

        {/* ================= Risk Meter ================= */}
        <div className="mt-6 flex justify-center">
          <RiskMeterGauge score={riskScore} riskLevel={result.riskLevel} />
        </div>

        {/* ================= Confidence Bar ================= */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-2 font-mono">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <ScanLine className="w-3.5 h-3.5" />
              Confidence Score
            </span>
            <span className={`font-bold ${config.color}`}>
              {Number(result.confidence || 0).toFixed(1)}%
            </span>
          </div>

          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.confidence || 0}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`h-full ${
                result.riskLevel === 'safe'
                  ? 'bg-green-500'
                  : result.riskLevel === 'suspicious'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
            <span>Safe</span>
            <span>Suspicious</span>
            <span>Phishing</span>
          </div>
        </div>
      </div>

      {/* ================= URL STRUCTURE ================= */}
      {result.features && <UrlStructureViz features={result.features} />}

      {/* ================= THREATS ================= */}
      {result.threats?.length > 0 && <ThreatPanel threats={result.threats} />}

      {/* ================= WHOIS ================= */}
      {result.whois && <WhoisPanel whois={result.whois} />}

      {/* ================= REASONS ================= */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Eye className="w-4 h-4 text-secondary" />
          Analysis Explanation
        </h3>

        <ul className="space-y-2">
          {(result.reasons?.length ? result.reasons : ['No explanation available']).map(
            (reason, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                    result.riskLevel === 'safe'
                      ? 'bg-green-500'
                      : result.riskLevel === 'suspicious'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
                {reason}
              </motion.li>
            )
          )}
        </ul>
      </div>

      {/* ================= FEATURES ================= */}
      {result.features && (
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-secondary" />
            Extracted URL Features
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            <Feat label="URL Length" value={`${result.features.urlLength}`} warn={result.features.urlLength > 100} />
            <Feat label="HTTPS" value={result.features.hasHttps ? 'Yes' : 'No'} good={result.features.hasHttps} />
            <Feat label="Special Chars" value={`${result.features.specialCharCount}`} warn={result.features.specialCharCount > 5} />
            <Feat label="@ Symbol" value={result.features.hasAtSymbol ? 'Yes' : 'No'} good={!result.features.hasAtSymbol} />
            <Feat label="Subdomains" value={`${result.features.subdomainCount}`} warn={result.features.subdomainCount > 2} />
            <Feat label="Keywords" value={`${result.features?.suspiciousKeywords?.length || 0}`} />
            <Feat label="Redirects" value={result.features.hasRedirection ? 'Yes' : 'No'} good={!result.features.hasRedirection} />
            <Feat label="Encoded" value={result.features.hasEncodedChars ? 'Yes' : 'No'} good={!result.features.hasEncodedChars} />
            <Feat label="IP Address" value={result.features.hasIPAddress ? 'Yes' : 'No'} good={!result.features.hasIPAddress} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function Feat({
  label,
  value,
  good,
  warn,
}: {
  label: string;
  value: string;
  good?: boolean;
  warn?: boolean;
}) {
  const color =
    good === true
      ? 'text-green-500'
      : warn || good === false
      ? 'text-red-500'
      : 'text-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-muted/40 rounded-lg p-2.5"
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`font-mono font-semibold text-sm ${color}`}>{value}</p>
    </motion.div>
  );
}