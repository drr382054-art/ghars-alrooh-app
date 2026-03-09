import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DhikrCard from './DhikrCard';
import { useGhars } from './useGharsStore';
import { morningAdhkar, eveningAdhkar, afterPrayerAdhkar, sleepAdhkar } from './adhkarData';

const configs: Record<string, { title: string; data: typeof morningAdhkar; bg: string; section: any; completionMsg?: string }> = {
  morning: { title: 'أذكار الصباح', data: morningAdhkar, bg: 'gradient-morning-adhkar', section: 'morning' },
  evening: { title: 'أذكار المساء', data: eveningAdhkar, bg: 'gradient-evening-adhkar', section: 'evening' },
  afterPrayer: { title: 'أذكار بعد الصلاة', data: afterPrayerAdhkar, bg: 'bg-[#F4F1EA] dark:bg-card', section: 'afterPrayer', completionMsg: 'تقبّل الله صلاتك وذكرك ✨' },
  sleep: { title: 'أذكار النوم', data: sleepAdhkar, bg: 'gradient-sleep', section: 'sleep', completionMsg: 'نم وقلبك مطمئن ✨' },
};

export default function AdhkarDetailPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { completeSection, getTodayCompletion } = useGhars();
  const config = configs[type || 'morning'];
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [showDone, setShowDone] = useState(false);

  const alreadyDone = getTodayCompletion()[config.section as keyof ReturnType<typeof getTodayCompletion>];

  const handleDhikrComplete = (id: number) => {
    setCompleted(prev => new Set([...prev, id]));
  };

  const allDone = completed.size >= config.data.length;
  const isSleep = type === 'sleep';
  const isEvening = type === 'evening';

  const handleComplete = () => {
    if (!alreadyDone) {
      completeSection(config.section as any);
    }
    setShowDone(true);
    setTimeout(() => navigate(-1), 2000);
  };

  return (
    <div className={`min-h-screen pb-8 ${config.bg}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-md border-b border-border/30 px-4 py-3 flex items-center gap-3 ${
        isSleep ? 'bg-[#2F3E46]/90' : isEvening ? 'bg-[#D7E0E7]/90 dark:bg-card/90' : 'bg-background/80'
      }`}>
        <button onClick={() => navigate(-1)} className={`text-lg ${isSleep ? 'text-primary-foreground' : ''}`}>→</button>
        <h1 className={`text-lg font-bold ${isSleep ? 'text-primary-foreground' : 'text-olive'}`}>{config.title}</h1>
        <span className={`mr-auto text-xs px-2 py-0.5 rounded-full ${
          isSleep ? 'bg-primary-foreground/10 text-primary-foreground/70' : 'bg-primary/10 text-primary'
        }`}>
          {completed.size}/{config.data.length}
        </span>
      </div>

      {/* Evening decoration */}
      {isEvening && (
        <div className="relative h-16 flex items-center justify-center">
          <span className="text-2xl opacity-40">🌙</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="absolute text-xs opacity-20" style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 2) * 30}%` }}>⭐</span>
          ))}
        </div>
      )}

      {/* Sleep golden dot */}
      {isSleep && <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-accent opacity-60" />}

      {/* Adhkar */}
      <div className="px-4 space-y-3 mt-2">
        {config.data.map((dhikr, i) => (
          <DhikrCard
            key={dhikr.id}
            dhikr={dhikr}
            index={i}
            onComplete={() => handleDhikrComplete(dhikr.id)}
            noteColor={isEvening ? 'text-primary' : isSleep ? 'text-tree-leaf' : undefined}
          />
        ))}
      </div>

      {/* Complete button */}
      <div className="px-4 mt-6">
        <button
          onClick={handleComplete}
          className={`w-full py-3 rounded-xl text-lg font-medium transition-all ${
            allDone || alreadyDone
              ? 'bg-primary text-primary-foreground shadow-lg active:scale-95'
              : 'bg-secondary text-muted-foreground'
          }`}
        >
          أكمل الأذكار ({completed.size}/{config.data.length})
        </button>
      </div>

      {/* Done message */}
      <AnimatePresence>
        {showDone && config.completionMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
          >
            <div className="bg-card rounded-2xl p-8 text-center shadow-xl">
              <p className="text-xl font-bold text-foreground">{config.completionMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
