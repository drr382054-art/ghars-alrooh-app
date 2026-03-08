import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGhars } from '@/stores/useGharsStore';

export default function SeedAnimationPage() {
  const { user, setHasSeenAnimation, isLoggedIn } = useGhars();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) { navigate('/', { replace: true }); return; }
    if (user?.hasSeenAnimation) { navigate('/home', { replace: true }); return; }
    
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 3500);
    const t3 = setTimeout(() => setPhase(3), 5000);
    const t4 = setTimeout(() => setPhase(4), 6500);
    const t5 = setTimeout(() => { setHasSeenAnimation(); navigate('/home', { replace: true }); }, 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [isLoggedIn, user?.hasSeenAnimation]);

  return (
    <div className="min-h-screen gradient-welcome flex flex-col items-center justify-center relative overflow-hidden">
      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : -20 }}
        className="text-xl font-amiri text-primary mb-12 text-center px-8"
      >
        كلُّ ذِكرٍ اليوم… حياةٌ تُزرع
      </motion.p>

      <div className="relative w-48 h-56 flex items-end justify-center">
        {/* Seed */}
        <motion.div
          animate={{
            scale: phase < 2 ? 1 : 0,
            opacity: phase < 2 ? 1 : 0,
          }}
          className="absolute bottom-4 w-4 h-6 rounded-full bg-tree-trunk"
        />

        {/* Growing trunk */}
        {phase >= 2 && (
          <motion.svg
            viewBox="0 0 100 140"
            className="absolute bottom-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.path
              d="M50,135 Q50,100 50,75"
              stroke="hsl(25, 40%, 30%)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            {phase >= 3 && (
              <>
                <motion.path d="M50,85 Q35,70 20,65" stroke="hsl(25, 35%, 33%)" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                <motion.path d="M50,85 Q65,68 80,62" stroke="hsl(25, 35%, 33%)" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                <motion.path d="M50,95 Q40,82 30,78" stroke="hsl(25, 35%, 33%)" strokeWidth="2.5" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
                <motion.path d="M50,95 Q60,80 70,75" stroke="hsl(25, 35%, 33%)" strokeWidth="2.5" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
                <motion.path d="M50,78 Q45,65 40,55" stroke="hsl(25, 30%, 36%)" strokeWidth="2" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
                <motion.path d="M50,78 Q55,62 60,52" stroke="hsl(25, 30%, 36%)" strokeWidth="2" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.4 }} />
              </>
            )}
            {phase >= 4 && (
              <>
                {[
                  { x: 20, y: 62, r: -20 }, { x: 30, y: 75, r: -30 }, { x: 80, y: 58, r: 20 },
                  { x: 70, y: 72, r: 30 }, { x: 40, y: 52, r: -15 }, { x: 60, y: 48, r: 15 },
                  { x: 50, y: 42, r: 0 }, { x: 35, y: 60, r: -25 }, { x: 65, y: 55, r: 25 },
                  { x: 45, y: 45, r: -10 }, { x: 55, y: 40, r: 10 }, { x: 25, y: 68, r: -35 },
                  { x: 75, y: 64, r: 35 },
                ].map((l, i) => (
                  <motion.g key={i} transform={`translate(${l.x},${l.y}) rotate(${l.r})`}>
                    <motion.path
                      d="M0,0 C2,-4 5,-6 6,-6 C7,-6 7,-3 6,0 C5,3 2,3 0,0 Z"
                      fill="hsl(140, 42%, 45%)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.3, type: 'spring' }}
                    />
                  </motion.g>
                ))}
              </>
            )}
          </motion.svg>
        )}

        {/* Ground */}
        <div className="absolute bottom-0 w-32 h-2 rounded-full bg-tree-trunk/20" />
      </div>
    </div>
  );
}
