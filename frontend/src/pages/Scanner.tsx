import { UrlInput } from '@/components/UrlInput';
import { ResultDisplay } from '@/components/ResultDisplay';
import { ScanningAnimation } from '@/components/ScanningAnimation';
import { useAnalysis } from '@/contexts/AnalysisContext';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function Scanner() {
  const { analyze, isAnalyzing, scanPhase, currentResult } = useAnalysis();

  return (
    <div className="py-10">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-cyber font-bold tracking-wider">
            <span className="text-primary neon-text">URL</span>{' '}
            <span className="text-foreground">Scanner</span>
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          Paste any URL below to analyze it for phishing indicators
        </p>
      </motion.div>

      <UrlInput onAnalyze={analyze} isAnalyzing={isAnalyzing} />

      <div className="mt-8 space-y-5">
        {isAnalyzing && <ScanningAnimation phase={scanPhase} />}
        {!isAnalyzing && currentResult && <ResultDisplay result={currentResult} />}
      </div>
    </div>
  );
}
