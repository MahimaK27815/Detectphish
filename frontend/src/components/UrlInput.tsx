import { useState } from 'react';
import { Search, Loader2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DEMO_URLS } from '@/lib/urlAnalyzer';

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export function UrlInput({ onAnalyze, isAnalyzing }: UrlInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onAnalyze(url.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="max-w-2xl mx-auto px-4 space-y-4"
    >
      <form onSubmit={handleSubmit}>
        <div className="glass-card neon-border p-2 flex gap-2">
          <Input
            type="text"
            placeholder="Paste a URL to analyze..."
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="flex-1 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm h-11"
            disabled={isAnalyzing}
          />
          <Button
            type="submit"
            disabled={!url.trim() || isAnalyzing}
            className="bg-primary text-primary-foreground hover:bg-primary/80 px-6 font-semibold h-11"
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4 mr-1.5" />
                Check URL
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Demo Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
          <Zap className="w-3 h-3" /> Quick Test:
        </span>
        {DEMO_URLS.safe.slice(0, 1).map(u => (
          <DemoBtn key={u} url={u} label="Safe URL" variant="safe" onClick={() => { setUrl(u); onAnalyze(u); }} disabled={isAnalyzing} />
        ))}
        {DEMO_URLS.suspicious.slice(0, 1).map(u => (
          <DemoBtn key={u} url={u} label="Suspicious" variant="suspicious" onClick={() => { setUrl(u); onAnalyze(u); }} disabled={isAnalyzing} />
        ))}
        {DEMO_URLS.phishing.slice(0, 1).map(u => (
          <DemoBtn key={u} url={u} label="Phishing" variant="phishing" onClick={() => { setUrl(u); onAnalyze(u); }} disabled={isAnalyzing} />
        ))}
      </div>
    </motion.div>
  );
}

function DemoBtn({ label, variant, onClick, disabled }: { url: string; label: string; variant: string; onClick: () => void; disabled: boolean }) {
  const colors = {
    safe: 'border-safe/30 text-safe hover:bg-safe/10',
    suspicious: 'border-suspicious/30 text-suspicious hover:bg-suspicious/10',
    phishing: 'border-danger/30 text-danger hover:bg-danger/10',
  }[variant] || '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors disabled:opacity-50 ${colors}`}
    >
      {label}
    </button>
  );
}
