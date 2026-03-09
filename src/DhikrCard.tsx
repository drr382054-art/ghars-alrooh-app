import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Dhikr } from './adhkarData';

interface DhikrCardProps {
  dhikr: Dhikr;
  index: number;
  onComplete: () => void;
  noteColor?: string;
}

export default function DhikrCard({ dhikr, index, onComplete, noteColor }: DhikrCardProps) {
  const [remaining, setRemaining] = useState(dhikr.count);
  const isComplete = remaining <= 0;

  const handleTap = () => {
    if (remaining > 0) {
      const next = remaining - 1;
      setRemaining(next);
      if (next === 0) onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleTap}
      className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer select-none ${
        isComplete 
          ? 'bg-primary/5 border-primary/20' 
          : 'bg-card border-border hover:border-primary/30 active:scale-[0.98]'
      }`}
    >
      {/* Complete indicator */}
      {isComplete && (
        <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary text-xs">✓</span>
        </div>
      )}

      {/* Golden line when complete */}
      {isComplete && (
        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-l from-transparent via-accent to-transparent rounded-full" />
      )}

      {/* Dhikr text */}
      <p className="font-amiri text-base leading-8 text-foreground whitespace-pre-line mb-2">
        {dhikr.text}
      </p>

      {/* Note */}
      {dhikr.note && (
        <p className={`text-sm leading-6 mt-2 ${noteColor || 'text-dhikr-note'}`}>
          ({dhikr.note})
        </p>
      )}

      {/* Counter */}
      <div className="flex items-center justify-between mt-3">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          isComplete 
            ? 'bg-primary/10 text-primary' 
            : 'bg-secondary text-muted-foreground'
        }`}>
          <span>{isComplete ? '✓' : remaining}</span>
          {!isComplete && <span className="text-xs opacity-60">/ {dhikr.count}</span>}
        </div>
      </div>
    </motion.div>
  );
}
