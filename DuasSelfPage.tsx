import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGhars } from '@/stores/useGharsStore';
import { duasForSelf } from '@/data/duasData';

export default function DuasSelfPage() {
  const navigate = useNavigate();
  const { completeSection, getTodayCompletion } = useGhars();
  const [showComplete, setShowComplete] = useState(false);
  const completion = getTodayCompletion();

  const handleComplete = () => {
    if (!completion.duaSelf) completeSection('duaSelf');
    setShowComplete(true);
    setTimeout(() => setShowComplete(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] dark:bg-background pb-8">
      <div className="sticky top-0 z-10 bg-[#F4F1EA]/90 dark:bg-background/90 backdrop-blur-md border-b border-border/30 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-lg">→</button>
        <h1 className="text-lg font-bold text-olive">💚 أدعية لنفسي</h1>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {duasForSelf.map((dua, i) => (
          <motion.div key={dua.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className={`p-4 rounded-xl border ${dua.isHighlighted 
              ? 'bg-primary/5 border-primary/20' 
              : 'bg-card border-border/50'
            }`}>
            <p className={`font-amiri leading-8 ${dua.isHighlighted ? 'text-lg font-bold text-foreground' : 'text-base text-foreground'}`}>
              {dua.isHighlighted && <span className="text-xs text-muted-foreground block mb-1 font-tajawal">يقال في السجود</span>}
              {dua.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="px-4 mt-6">
        <button onClick={handleComplete}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-lg font-medium shadow-lg active:scale-95 transition-all">
          تم الدعاء 🤲🏻
        </button>
      </div>

      <AnimatePresence>
        {showComplete && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
            <div className="bg-card rounded-2xl p-8 text-center shadow-xl">
              <p className="text-xl font-bold text-foreground">تقبّل الله دعاءك 💚</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
