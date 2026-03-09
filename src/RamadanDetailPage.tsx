import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGhars } from './useGharsStore';
import { ramadanDuas, laylatAlQadrDuas } from './ramadanData';

export default function RamadanDetailPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { completeSection, getTodayCompletion } = useGhars();
  const [showDone, setShowDone] = useState(false);
  const isLaylat = type === 'laylat';
  const duas = isLaylat ? laylatAlQadrDuas : ramadanDuas;
  const title = isLaylat ? '✨ ليلة القدر' : '🏮 أدعية رمضان';
  const section = isLaylat ? 'laylatAlQadr' : 'ramadan';
  const completion = getTodayCompletion();

  const handleComplete = () => {
    if (!(completion as any)[section]) completeSection(section as any);
    setShowDone(true);
    setTimeout(() => setShowDone(false), 2000);
  };

  return (
    <div className="min-h-screen pb-8 relative" style={{ background: 'linear-gradient(180deg, #1a1a3e, #0d0d2b)' }}>
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-amber-200/40" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 40}%` }} />
        ))}
      </div>

      {/* Laylat al-Qadr banner */}
      {isLaylat && (
        <div className="px-4 pt-4">
          <div className="p-3 rounded-xl border border-amber-300/20 text-center" style={{ background: 'rgba(255,215,0,0.05)' }}>
            <p className="text-xs text-amber-200/70">ليلة قد تكون خيرًا من ألف شهر</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 backdrop-blur-md" style={{ background: 'rgba(26,26,62,0.9)' }}>
        <button onClick={() => navigate(-1)} className="text-lg text-amber-100">→</button>
        <h1 className="text-lg font-bold text-amber-100">{title}</h1>
      </div>

      {/* Duas */}
      <div className="px-4 mt-4 space-y-3">
        {duas.map((dua, i) => (
          <motion.div key={dua.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className={`p-4 rounded-xl border ${dua.isMain
              ? 'border-amber-300/20 bg-amber-500/5'
              : 'border-amber-300/10 bg-white/[0.03]'
            }`}>
            <p className={`font-amiri leading-8 ${dua.isMain ? 'text-lg text-amber-100 font-bold' : 'text-base text-amber-100/90'}`}>
              {dua.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="px-4 mt-6">
        <button onClick={handleComplete}
          className="w-full py-3 rounded-xl text-lg font-medium shadow-lg active:scale-95 transition-all bg-amber-500/20 text-amber-100 border border-amber-300/20">
          تم الدعاء 🤲🏻
        </button>
      </div>

      <AnimatePresence>
        {showDone && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="rounded-2xl p-8 text-center shadow-xl" style={{ background: '#1a1a3e' }}>
              <p className="text-xl font-bold text-amber-100">تقبّل الله منك ✨</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
