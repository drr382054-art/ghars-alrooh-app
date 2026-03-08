import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGhars } from '@/stores/useGharsStore';
import BottomNav from '@/components/BottomNav';

export default function MessagePage() {
  const { user, addMessage, getAllDatesWithActivity } = useGhars();
  const [text, setText] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const todayMessage = user?.messages[today] || '';
  const allDates = getAllDatesWithActivity();

  const handleSend = () => {
    if (text.trim()) { addMessage(text.trim()); setText(''); }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary/5 border-b border-border px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">📝 رسالة اليوم</h1>
        <p className="text-sm text-muted-foreground mt-1">اكتب ما في خاطرك</p>
      </div>

      {/* Write */}
      <div className="px-4 mt-4">
        <textarea
          value={text || todayMessage}
          onChange={e => setText(e.target.value)}
          placeholder="اكتب دعاء، نية، خاطر، أو كلمة طيبة..."
          className="w-full h-28 px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none text-right font-amiri text-base"
        />
        <button onClick={handleSend}
          className="mt-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium active:scale-95 transition-all">
          حفظ ✨
        </button>
      </div>

      {/* History */}
      <div className="px-4 mt-6">
        <h2 className="text-base font-bold text-foreground mb-3">🍃 سجل الأيام</h2>
        <div className="space-y-3">
          {allDates.map((day, i) => (
            <motion.div key={day.date} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{new Date(day.date).toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="text-sm">🍃</span>
              </div>
              
              {/* What they did */}
              <div className="flex flex-wrap gap-1 mb-2">
                {day.completion?.morning && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">☀️ الصباح</span>}
                {day.completion?.evening && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">🌙 المساء</span>}
                {day.completion?.afterPrayer && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">🕌 الصلاة</span>}
                {day.completion?.sleep && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">😴 النوم</span>}
                {day.completion?.duaSelf && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">🤲🏻 لنفسي</span>}
                {day.completion?.duaDeceased && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">🕊️ للميت</span>}
                {day.completion?.ramadan && <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">🏮 رمضان</span>}
                {day.completion?.laylatAlQadr && <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">✨ القدر</span>}
              </div>

              {/* Message */}
              {day.message && (
                <p className="text-sm font-amiri text-foreground bg-secondary/50 p-2 rounded-lg mt-1">
                  {day.message}
                </p>
              )}
            </motion.div>
          ))}

          {allDates.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">لا توجد أنشطة بعد... ابدأ غرسك اليوم 🌱</p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
