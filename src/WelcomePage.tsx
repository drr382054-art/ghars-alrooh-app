import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGhars } from '@/stores/useGharsStore';
import TreeSVG from '@/components/TreeSVG';

export default function WelcomePage() {
  const { login, isLoggedIn } = useGhars();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'splash' | 'auth'>('splash');

  if (isLoggedIn) {
    navigate('/home', { replace: true });
    return null;
  }

  const handleLogin = () => {
    if (!name.trim() || !password.trim()) return;
    const validEmail = email.trim() && email.includes('@gmail') ? email : undefined;
    login(name.trim(), password.trim(), validEmail);
    navigate('/seed-animation', { replace: true });
  };

  return (
    <div className="min-h-screen gradient-welcome flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-accent/5 to-transparent" />
      
      <AnimatePresence mode="wait">
        {step === 'splash' ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center"
          >
            <TreeSVG leafCount={15} showGlow />
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold text-primary mt-4 font-amiri"
              style={{ fontStyle: 'italic' }}
            >
              غرس
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mt-3 text-base"
            >
              دعوة وبقاء
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onClick={() => setStep('auth')}
              className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-xl text-lg font-medium hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
              أبدأ غرسك 🌱
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
          >
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-3xl">🌳</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">مرحباً بك في غرس</h2>
              <p className="text-muted-foreground text-sm mt-1">سجّل لتحفظ غرسك</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">اسمك</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="اكتب اسمك هنا"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-right"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">كلمة المرور</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="اختر كلمة مرور"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">البريد الإلكتروني (اختياري)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-left"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={!name.trim() || !password.trim()}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-lg font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg mt-2"
              >
                ابدأ 🌱
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
