import { createContext, useContext, ReactNode } from 'react';
import { useUrlAnalysis } from '@/hooks/useUrlAnalysis';

type AnalysisContextType = ReturnType<typeof useUrlAnalysis>;

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const analysis = useUrlAnalysis();
  return (
    <AnalysisContext.Provider value={analysis}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider');
  return ctx;
}
