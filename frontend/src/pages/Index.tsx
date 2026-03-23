import { Header } from '@/components/Header';
import { UrlInput } from '@/components/UrlInput';
import { ResultDisplay } from '@/components/ResultDisplay';
import { ScanningAnimation } from '@/components/ScanningAnimation';
import { StatsDashboard } from '@/components/StatsDashboard';
import { History } from '@/components/History';
import { AwarenessTips } from '@/components/AwarenessTips';
import { useUrlAnalysis } from '@/hooks/useUrlAnalysis';

const Index = () => {
  const {
    analyze, isAnalyzing, scanPhase, currentResult,
    results, stats, exportCSV, exportJSON,
  } = useUrlAnalysis();

  return (
    <div className="min-h-screen gradient-bg grid-pattern">
      <div className="max-w-4xl mx-auto pb-20">
        <Header />
        <UrlInput onAnalyze={analyze} isAnalyzing={isAnalyzing} />

        <div className="mt-8 space-y-5">
          {isAnalyzing && <ScanningAnimation phase={scanPhase} />}
          {!isAnalyzing && currentResult && <ResultDisplay result={currentResult} />}
          <StatsDashboard {...stats} onExportCSV={exportCSV} onExportJSON={exportJSON} />
          <History results={results} onRecheck={analyze} />
          <AwarenessTips />
        </div>

        <footer className="text-center mt-12 text-[10px] text-muted-foreground font-mono">
          PhishGuard v2.0 — AI-Powered URL Security Analysis
        </footer>
      </div>
    </div>
  );
};

export default Index;
