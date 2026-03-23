import { motion } from 'framer-motion';
import { UrlFeatures } from '@/lib/urlAnalyzer';
import { Code2 } from 'lucide-react';

interface Props {
  features: UrlFeatures;
}

export function UrlStructureViz({ features }: Props) {
  const parts = [
    { label: 'Protocol', value: features.protocol + '://', suspicious: !features.hasHttps },
    ...(features.subdomain ? [{ label: 'Subdomain', value: features.subdomain + '.', suspicious: features.subdomainCount > 2 }] : []),
    { label: 'Domain', value: features.domain, suspicious: features.hasIPAddress || features.hasHyphenInDomain || !!features.brandImpersonation },
    ...(features.path && features.path !== '/' ? [{ label: 'Path', value: features.path, suspicious: features.pathLength > 60 }] : []),
    ...(features.queryString ? [{ label: 'Query', value: features.queryString, suspicious: features.queryParamCount > 3 || features.hasRedirection }] : []),
  ];

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Code2 className="w-4 h-4 text-secondary" />
        URL Structure Breakdown
      </h3>
      <div className="bg-background/60 rounded-lg p-3 font-mono text-xs overflow-x-auto">
        <div className="flex flex-wrap gap-0">
          {parts.map((part, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <span className={`${part.suspicious ? 'text-danger bg-danger/10 px-0.5 rounded' : 'text-safe'}`}>
                {part.value}
              </span>
              <span className="absolute -top-5 left-0 text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {part.label} {part.suspicious && '⚠'}
              </span>
            </motion.span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {parts.map((part, i) => (
          <span key={i} className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
            part.suspicious ? 'border-danger/30 text-danger bg-danger/5' : 'border-safe/30 text-safe bg-safe/5'
          }`}>
            {part.label}
          </span>
        ))}
      </div>
    </div>
  );
}
