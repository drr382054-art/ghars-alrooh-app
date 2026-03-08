import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';

export default function DuasPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary/5 border-b border-border px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">🤲🏻 الأدعية</h1>
        <p className="text-sm text-muted-foreground mt-1">ادعُ لنفسك ولأحبّتك</p>
      </div>

      <div className="px-4 mt-4 space-y-3">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/duas/self')}
          className="w-full p-5 rounded-2xl bg-card border border-primary/20 text-right hover:shadow-md active:scale-[0.97] transition-all"
        >
          <span className="text-2xl mb-1 block">💚</span>
          <span className="text-base font-bold text-foreground block">أدعية لنفسي</span>
          <span className="text-xs text-muted-foreground">دعوات شخصية من القلب</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/duas/deceased')}
          className="w-full p-5 rounded-2xl bg-card border border-primary/10 text-right hover:shadow-md active:scale-[0.97] transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/[0.03]" />
          <span className="text-2xl mb-1 block relative z-10">🕊️</span>
          <span className="text-base font-bold text-foreground block relative z-10">أدعية للميت</span>
          <span className="text-xs text-muted-foreground relative z-10">وصدقة جارية لأحبتك</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
