import { motion } from 'framer-motion';
import { BarChart3, ShieldCheck, ShieldAlert, AlertTriangle, PieChart as PieIcon, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { useAnalysis } from '@/contexts/AnalysisContext';

const COLORS = {
  safe: 'hsl(160, 100%, 45%)',
  suspicious: 'hsl(38, 92%, 50%)',
  dangerous: 'hsl(0, 85%, 55%)',
};

const tooltipStyle = {
  contentStyle: { background: 'hsl(222, 20%, 9%)', border: '1px solid hsl(222, 15%, 16%)', borderRadius: '8px', fontSize: '11px' },
  labelStyle: { color: 'hsl(210, 40%, 92%)' },
};

export default function Dashboard() {
  const { results } = useAnalysis();

  // ✅ SAFE DEFAULT
  const safeResults = results || [];

  // ✅ CALCULATE STATS SAFELY
  const stats = safeResults.reduce(
    (acc, r) => {
      if (!r?.riskLevel) return acc;

      if (r.riskLevel === 'safe') acc.safe++;
      else if (r.riskLevel === 'suspicious') acc.suspicious++;
      else if (r.riskLevel === 'dangerous') acc.dangerous++;

      acc.total++;
      return acc;
    },
    { total: 0, safe: 0, suspicious: 0, dangerous: 0 }
  );

  // ✅ EMPTY STATE
  if (stats.total === 0) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        No scan data available yet. Go to Scanner and analyze a URL.
      </div>
    );
  }

  const pieData = [
    { name: 'Safe', value: stats.safe, color: COLORS.safe },
    { name: 'Suspicious', value: stats.suspicious, color: COLORS.suspicious },
    { name: 'Phishing', value: stats.dangerous, color: COLORS.dangerous },
  ].filter(d => d.value > 0);

  const indicatorData = [
    { name: 'No HTTPS', value: 12 },
    { name: 'Suspicious TLD', value: 18 },
    { name: 'Brand Spoof', value: 30 },
    { name: 'IP Address', value: 25 },
    { name: 'Typosquat', value: 28 },
  ];

  const trendData = [
    { month: 'Jan', safe: 45, phishing: 12 },
    { month: 'Feb', safe: 52, phishing: 18 },
    { month: 'Mar', safe: 48, phishing: 25 },
    { month: 'Apr', safe: 61, phishing: 20 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-secondary" />
          Dashboard
        </h1>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, icon: BarChart3 },
          { label: 'Safe', value: stats.safe, icon: ShieldCheck },
          { label: 'Suspicious', value: stats.suspicious, icon: AlertTriangle },
          { label: 'Phishing', value: stats.dangerous, icon: ShieldAlert },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <s.icon className="w-6 h-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="glass-card p-6">
        <h3 className="mb-4">Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}