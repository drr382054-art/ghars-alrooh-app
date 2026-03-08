import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';

export default function RamadanPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a3e, #0d0d2b)' }}>
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%` }} />
        ))}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl opacity-20">🌙</div>
        <div className="absolute top-20 right-8 text-xl opacity-10">🏮</div>
        <div className="absolute top-24 left-8 text-xl opacity-10">🏮</div>
      </div>

      <div className="relative z-10 px-5 pt-8">
        <h1 className="text-2xl font-bold text-amber-100">🌙 رمضان</h1>
        <p className="text-sm text-amber-200/60 mt-1">أدعية مباركة</p>
      </div>

      <div className="relative z-10 px-4 mt-6 space-y-4">
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/ramadan/ramadan')}
          className="w-full p-5 rounded-2xl text-right active:scale-[0.97] transition-all border border-amber-300/10"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,215,0,0.05))' }}>
          <span className="text-2xl mb-1 block">🏮</span>
          <span className="text-base font-bold text-amber-100 block">أدعية رمضان</span>
          <span className="text-xs text-amber-200/50">أدعية الصيام والإفطار</span>
        </motion.button>

        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onClick={() => navigate('/ramadan/laylat')}
          className="w-full p-5 rounded-2xl text-right active:scale-[0.97] transition-all border border-amber-300/15"
          style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,255,255,0.03))' }}>
          <span className="text-2xl mb-1 block">✨</span>
          <span className="text-base font-bold text-amber-100 block">ليلة القدر</span>
          <span className="text-xs text-amber-200/50">ليلة خير من ألف شهر</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
