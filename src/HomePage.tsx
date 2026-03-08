import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGhars } from '@/stores/useGharsStore';
import TreeSVG from '@/components/TreeSVG';
import BottomNav from '@/components/BottomNav';

export default function HomePage() {
  const { user, isLoggedIn, getLeafCount, getConsecutiveDays, getDaysSinceLastActive, getTodayCompletion, toggleDarkMode } = useGhars();
  const navigate = useNavigate();
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [showRain, setShowRain] = useState(false);
  const [selectedLeafDate, setSelectedLeafDate] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn]);

  useEffect(() => {
    const days = getDaysSinceLastActive();
    if (days >= 2) setShowWelcomeBack(true);
  }, []);

  const isMorning = useMemo(() => {
    const h = new Date().getHours();
    return h >= 5 && h < 17;
  }, []);

  const leafCount = getLeafCount();
  const streak = getConsecutiveDays();
  const completion = getTodayCompletion();

  // Show rain effect when message is written today
  useEffect(() => {
    if (user?.messages[new Date().toISOString().split('T')[0]]) {
      setShowRain(true);
      const t = setTimeout(() => setShowRain(false), 3000);
      return () => clearTimeout(t);
    }
  }, [user?.messages]);

  const completedToday = Object.entries(completion).filter(([k, v]) => k !== 'sadaqah' && v === true).length;

  if (!user) return null;

  return (
    <div className={`min-h-screen pb-20 relative overflow-hidden ${isMorning ? 'gradient-morning' : 'gradient-evening'}`}>
      {/* Rain effect */}
      <AnimatePresence>
        {showRain && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="rain-drop" style={{ left: `${Math.random() * 100}%`, animationDuration: `${0.8 + Math.random() * 0.5}s`, animationDelay: `${Math.random() * 1}s` }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome back */}
      <AnimatePresence>
        {showWelcomeBack && (
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="absolute top-12 left-0 right-0 z-30 flex justify-center px-6">
            <div className="bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-border max-w-sm w-full text-center">
              <p className="text-foreground font-medium">اشتقنا لك… شجرتك كانت تنتظرك 🌿</p>
              <button onClick={() => setShowWelcomeBack(false)} className="mt-2 text-sm text-primary font-medium">حسناً</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6">
        <div>
          <h1 className={`text-lg font-bold ${isMorning ? 'text-foreground' : 'text-primary-foreground'}`}>غرس</h1>
          <p className={`text-xs ${isMorning ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
            {isMorning ? '☀️ صباح الخير' : '🌙 مساء النور'}
          </p>
        </div>
        <button onClick={toggleDarkMode} className={`w-8 h-8 rounded-full flex items-center justify-center ${isMorning ? 'bg-secondary' : 'bg-primary-foreground/10'}`}>
          {user.darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Stars for evening */}
      {!isMorning && (
        <div className="absolute top-0 left-0 right-0 h-60 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full bg-primary-foreground/40"
              style={{ left: `${10 + Math.random() * 80}%`, top: `${5 + Math.random() * 35}%`, animationDelay: `${Math.random() * 3}s` }} />
          ))}
          <div className="absolute top-8 left-10 text-2xl opacity-30">🌙</div>
        </div>
      )}

      {/* Tree */}
      <div className="flex flex-col items-center mt-4">
        <TreeSVG leafCount={leafCount} userName={user.name} showGlow={streak >= 30} />
        
        {streak >= 30 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-sm font-medium mt-1">
            غرسك يكبر ✨
          </motion.p>
        )}
      </div>

      {/* Today's summary */}
      <div className="px-5 mt-4">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">اليوم</span>
            <span className="text-xs text-muted-foreground">{streak > 0 ? `🔥 ${streak} يوم متواصل` : ''}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'morning', label: 'الصباح', icon: '☀️' },
              { key: 'evening', label: 'المساء', icon: '🌙' },
              { key: 'afterPrayer', label: 'الصلاة', icon: '🕌' },
              { key: 'sleep', label: 'النوم', icon: '😴' },
              { key: 'duaSelf', label: 'لنفسي', icon: '🤲🏻' },
              { key: 'duaDeceased', label: 'للميت', icon: '🕊️' },
            ].map(item => (
              <div key={item.key} className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                (completion as any)[item.key] ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
              }`}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {(completion as any)[item.key] && <span>✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
