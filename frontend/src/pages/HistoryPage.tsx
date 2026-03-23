import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, ShieldAlert, AlertTriangle, RotateCcw, Search, FileSpreadsheet, FileJson, Filter } from 'lucide-react';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { RiskLevel } from '@/lib/urlAnalyzer';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';

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

const filterOptions = ['all', 'safe', 'suspicious', 'dangerous'] as const;

function getFilterClasses(f: string, isActive: boolean): string {
  if (!isActive) return 'border-border/50 text-muted-foreground hover:text-foreground';
  switch (f) {
    case 'safe': return 'bg-safe/20 border-safe/30 text-safe';
    case 'suspicious': return 'bg-suspicious/20 border-suspicious/30 text-suspicious';
    case 'dangerous': return 'bg-danger/20 border-danger/30 text-danger';
    default: return 'bg-secondary/20 border-secondary/30 text-secondary';
  }
}

export default function HistoryPage() {
  const { results, analyze, exportCSV, exportJSON } = useAnalysis();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all');

  const filtered = results.filter(r => {
    const matchSearch = r.url.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.riskLevel === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-cyber font-bold tracking-wider flex items-center gap-3">
          <Clock className="w-8 h-8 text-secondary" />
          <span className="text-secondary neon-text-blue">Scan</span>{' '}
          <span className="text-foreground">History</span>
        </h1>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          Previously scanned URLs with risk analysis
        </p>
      </motion.div>

      {/* Controls */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search URLs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 bg-muted/30 border-border/50 font-mono text-sm"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {filterOptions.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${getFilterClasses(f, filter === f)}`}
              >
                {f === 'all' ? 'All' : f === 'dangerous' ? 'Phishing' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            <button onClick={exportCSV} className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50" title="Export CSV">
              <FileSpreadsheet className="w-4 h-4" />
            </button>
            <button onClick={exportJSON} className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50" title="Export JSON">
              <FileJson className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-mono">
            {results.length === 0 ? 'No URLs scanned yet. Go to the Scanner to analyze URLs.' : 'No results match your filters.'}
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-muted/30 border-b border-border/50 text-xs font-mono text-muted-foreground font-semibold">
            <div className="col-span-5">URL</div>
            <div className="col-span-2 text-center">Risk Score</div>
            <div className="col-span-2 text-center">Result</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/30 max-h-[500px] overflow-y-auto">
            {filtered.map((r, i) => {
              const Icon = riskIcons[r.riskLevel];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="grid grid-cols-12 gap-4 px-5 py-3.5 items-center text-sm hover:bg-muted/20 transition-colors"
                >
                  <div className="col-span-5 flex items-center gap-2 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${riskColors[r.riskLevel]}`} />
                    <span className="font-mono text-xs truncate text-muted-foreground">{r.url}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className={`font-mono font-bold ${riskColors[r.riskLevel]}`}>
                      {r.confidence.toFixed(0)}%
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className={`risk-badge-${r.riskLevel}`}>
                      {r.riskLevel === 'dangerous' ? 'PHISHING' : r.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-span-2 text-center text-xs text-muted-foreground font-mono">
                    {format(r.timestamp, 'MMM dd, HH:mm')}
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => analyze(r.url)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      title="Re-check"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
