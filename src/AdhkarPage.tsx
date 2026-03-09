import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomNav from './BottomNav';

const categories = [
  { id: 'morning', label: 'أذكار الصباح', icon: '☀️', gradient: 'from-[#F4F1EA] to-[#E6EFE8]' },
  { id: 'evening', label: 'أذكار المساء', icon: '🌙', gradient: 'from-[#E8EAF0] to-[#D7E0E7]' },
  { id: 'afterPrayer', label: 'بعد الصلاة', icon: '🕌', gradient: 'from-[#F4F1EA] to-[#EDE8DC]' },
  { id: 'sleep', label: 'أذكار النوم', icon: '😴', gradient: 'from-[#3A4E56] to-[#2F3E46]' },
];

export default function AdhkarPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header ribbon */}
      <div className="bg-primary/5 border-b border-border px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">📿 الأذكار</h1>
        <p className="text-sm text-muted-foreground mt-1">اختر أذكارك اليوم</p>
      </div>

      {/* Categories as horizontal cards */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/adhkar/${cat.id}`)}
              className={`relative overflow-hidden rounded-2xl p-5 text-right bg-gradient-to-br ${cat.gradient} border border-border/50 hover:shadow-md active:scale-[0.97] transition-all`}
            >
              <span className="text-3xl mb-2 block">{cat.icon}</span>
              <span className={`text-sm font-bold block ${cat.id === 'sleep' ? 'text-primary-foreground' : 'text-foreground'}`}>
                {cat.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
