import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0
              ? 'hsl(160, 100%, 45%)'
              : i % 3 === 1
                ? 'hsl(210, 100%, 55%)'
                : 'hsl(0, 85%, 55%)',
            opacity: 0.15 + Math.random() * 0.15,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(160, 100%, 45%, 0.15), transparent)',
        }}
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Hex grid accents */}
      <svg className="absolute top-20 right-10 w-40 h-40 opacity-[0.03]" viewBox="0 0 100 100">
        <motion.path
          d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
          fill="none"
          stroke="hsl(160, 100%, 45%)"
          strokeWidth="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        />
      </svg>
      <svg className="absolute bottom-40 left-10 w-32 h-32 opacity-[0.03]" viewBox="0 0 100 100">
        <motion.path
          d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
          fill="none"
          stroke="hsl(210, 100%, 55%)"
          strokeWidth="0.5"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        />
      </svg>

      {/* Corner glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/[0.02] rounded-full blur-3xl" />
    </div>
  );
}
