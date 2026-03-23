import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number; // 0-100
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
}

export function RiskMeterGauge({ score, riskLevel }: RiskMeterProps) {
  const clampedScore = Math.min(Math.max(score, 0), 100);
  // Map 0-100 to -90 to 90 degrees (semicircle)
  const angle = -90 + (clampedScore / 100) * 180;

  const colors = {
    safe: { stroke: 'hsl(160, 100%, 45%)', glow: 'hsl(160, 100%, 45%)' },
    suspicious: { stroke: 'hsl(38, 92%, 50%)', glow: 'hsl(38, 92%, 50%)' },
    dangerous: { stroke: 'hsl(0, 85%, 55%)', glow: 'hsl(0, 85%, 55%)' },
  };

  const { stroke, glow } = colors[riskLevel];

  // Arc segments for the gauge background
  const createArc = (startAngle: number, endAngle: number) => {
    const cx = 100, cy = 100, r = 80;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Needle endpoint
  const needleAngleRad = (angle * Math.PI) / 180;
  const needleLength = 65;
  const nx = 100 + needleLength * Math.cos(((-90 + (clampedScore / 100) * 180) * Math.PI) / 180 - Math.PI / 2 + Math.PI);
  const ny = 100 + needleLength * Math.sin(((-90 + (clampedScore / 100) * 180) * Math.PI) / 180 - Math.PI / 2 + Math.PI);

  // Correct needle calculation: 0% = left (-180°), 100% = right (0°)
  const needleAngle = Math.PI + (clampedScore / 100) * Math.PI; // PI to 0
  const finalNx = 100 + needleLength * Math.cos(Math.PI - needleAngle + Math.PI);
  const finalNy = 100 - needleLength * Math.sin(Math.PI - needleAngle + Math.PI);

  // Simpler approach: 0% points left, 100% points right
  const rotationDeg = -180 + (clampedScore / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-28">
        <svg viewBox="0 15 200 100" className="w-full h-full overflow-visible">
          {/* Gauge track segments */}
          <path
            d={createArc(180, 234)}
            fill="none"
            stroke="hsl(160, 100%, 45%)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.2"
          />
          <path
            d={createArc(236, 306)}
            fill="none"
            stroke="hsl(38, 92%, 50%)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.2"
          />
          <path
            d={createArc(308, 360)}
            fill="none"
            stroke="hsl(0, 85%, 55%)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.2"
          />

          {/* Active arc */}
          <motion.path
            d={createArc(180, 180 + (clampedScore / 100) * 180)}
            fill="none"
            stroke={stroke}
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
          />

          {/* Needle */}
          <motion.g
            initial={{ rotate: -180 }}
            animate={{ rotate: rotationDeg }}
            transition={{ duration: 1.5, ease: 'easeOut', type: 'spring', damping: 15 }}
            style={{ transformOrigin: '100px 100px' }}
          >
            <line
              x1="100"
              y1="100"
              x2="35"
              y2="100"
              stroke={stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 4px ${glow})` }}
            />
          </motion.g>

          {/* Center dot */}
          <circle cx="100" cy="100" r="6" fill="hsl(222, 20%, 9%)" stroke={stroke} strokeWidth="2" />

          {/* Labels */}
          <text x="18" y="108" fontSize="8" fill="hsl(215, 20%, 50%)" fontFamily="monospace">0</text>
          <text x="95" y="20" fontSize="8" fill="hsl(215, 20%, 50%)" fontFamily="monospace" textAnchor="middle">50</text>
          <text x="176" y="108" fontSize="8" fill="hsl(215, 20%, 50%)" fontFamily="monospace">100</text>
        </svg>
      </div>

      {/* Score display */}
      <div className="text-center -mt-2">
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`text-3xl font-cyber font-bold ${
            riskLevel === 'safe' ? 'text-safe' :
            riskLevel === 'suspicious' ? 'text-suspicious' : 'text-danger'
          }`}
          style={{ textShadow: `0 0 15px ${glow}` }}
        >
          {clampedScore.toFixed(0)}%
        </motion.p>
        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">RISK SCORE</p>
      </div>
    </div>
  );
}
