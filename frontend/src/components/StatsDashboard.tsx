import { motion } from 'framer-motion';
import { BarChart3, Download, FileJson, FileSpreadsheet, ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface StatsProps {
  total: number;
  safe: number;
  suspicious: number;
  phishing: number;
  onExportCSV: () => void;
  onExportJSON: () => void;
}

export function StatsDashboard({ total, safe, suspicious, phishing, onExportCSV, onExportJSON }: StatsProps) {
  if (total === 0) return null;

  const chartData = [
    { name: 'Safe', value: safe, color: 'hsl(160, 100%, 45%)' },
    { name: 'Suspicious', value: suspicious, color: 'hsl(38, 92%, 50%)' },
    { name: 'Phishing', value: phishing, color: 'hsl(0, 85%, 55%)' },
  ].filter(d => d.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-secondary" />
            Security Dashboard
          </h3>
          <div className="flex gap-1.5">
            <button onClick={onExportCSV} className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted/50" title="Export CSV">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </button>
            <button onClick={onExportJSON} className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted/50" title="Export JSON">
              <FileJson className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5 mb-4">
          <StatCard value={total} label="Total" icon={<BarChart3 className="w-3 h-3" />} color="text-secondary" />
          <StatCard value={safe} label="Safe" icon={<ShieldCheck className="w-3 h-3" />} color="text-safe" />
          <StatCard value={suspicious} label="Suspicious" icon={<AlertTriangle className="w-3 h-3" />} color="text-suspicious" />
          <StatCard value={phishing} label="Phishing" icon={<ShieldAlert className="w-3 h-3" />} color="text-danger" />
        </div>

        {/* Pie Chart */}
        <div className="flex items-center justify-center gap-6">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={25} outerRadius={40} dataKey="value" strokeWidth={0}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'hsl(222, 20%, 9%)', border: '1px solid hsl(222, 15%, 16%)', borderRadius: '8px', fontSize: '11px' }}
                  labelStyle={{ color: 'hsl(210, 40%, 92%)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5">
            {chartData.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name}:</span>
                <span className="text-foreground font-semibold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution bar */}
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden flex">
          {safe > 0 && <div className="bg-safe h-full transition-all" style={{ width: `${(safe / total) * 100}%` }} />}
          {suspicious > 0 && <div className="bg-suspicious h-full transition-all" style={{ width: `${(suspicious / total) * 100}%` }} />}
          {phishing > 0 && <div className="bg-danger h-full transition-all" style={{ width: `${(phishing / total) * 100}%` }} />}
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ value, label, icon, color }: { value: number; label: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-muted/40 rounded-lg p-3 text-center">
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
        {icon} {label}
      </p>
    </div>
  );
}
