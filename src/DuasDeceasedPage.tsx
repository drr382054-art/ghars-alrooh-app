import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGhars } from './useGharsStore';
import { duasForDeceased, ancestorNames, charityLinks } from './duasData';

export default function DuasDeceasedPage() {
  const navigate = useNavigate();
  const { completeSection, completeSadaqah, addCustomDeceased, removeCustomDeceased, user, getTodayCompletion } = useGhars();
  const [newName, setNewName] = useState('');
  const [showComplete, setShowComplete] = useState(false);
  const completion = getTodayCompletion();

  const allNames = [...ancestorNames, ...(user?.customDeceased || [])];

  const handleAddName = () => {
    if (newName.trim()) { addCustomDeceased(newName.trim()); setNewName(''); }
  };

  const handleCompleteDua = () => {
    if (!completion.duaDeceased) completeSection('duaDeceased');
    setShowComplete(true);
    setTimeout(() => setShowComplete(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] dark:bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#F4F1EA]/90 dark:bg-background/90 backdrop-blur-md border-b border-border/30 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-lg">→</button>
        <h1 className="text-lg font-bold text-olive">🕊️ أدعية للميت</h1>
      </div>

      {/* Ancestors names - horizontal */}
      <div className="px-4 mt-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {ancestorNames.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 px-5 py-3 rounded-xl bg-card border border-primary/15 text-center min-w-[90px] relative">
              <p className="text-sm font-bold text-foreground">{name}</p>
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-l from-transparent via-accent to-transparent rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom deceased */}
      {(user?.customDeceased?.length || 0) > 0 && (
        <div className="px-4 mt-2">
          <div className="flex gap-2 flex-wrap">
            {user?.customDeceased.map(name => (
              <div key={name} className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm flex items-center gap-2">
                <span>{name}</span>
                <button onClick={() => removeCustomDeceased(name)} className="text-destructive text-xs">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add name */}
      <div className="px-4 mt-3 flex gap-2">
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="أضف اسم حبيبك..."
          className="flex-1 px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 text-right" />
        <button onClick={handleAddName} className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium">إضافة</button>
      </div>

      {/* Duas */}
      <div className="px-4 mt-4 space-y-3">
        {duasForDeceased.map((dua, i) => (
          <motion.div key={dua.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="p-4 rounded-xl bg-card border border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/[0.02]" />
            <p className="font-amiri text-base leading-8 text-foreground relative z-10">{dua.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Complete dua button */}
      <div className="px-4 mt-6">
        <button onClick={handleCompleteDua}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-lg font-medium shadow-lg active:scale-95 transition-all">
          تم الدعاء 🤲🏻
        </button>
      </div>

      {/* Charity section */}
      <div className="px-4 mt-8">
        <h2 className="text-base font-bold text-olive mb-3">💚 الصدقة الجارية</h2>
        <div className="space-y-3">
          {charityLinks.map(link => (
            <div key={link.name} className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-foreground">{link.name}</span>
                {completion.sadaqah?.[link.name] && <span className="text-primary text-xs">✓ تم الغرس</span>}
              </div>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline block mb-2">
                رابط التبرع ←
              </a>
              {!completion.sadaqah?.[link.name] && (
                <button onClick={() => completeSadaqah(link.name)}
                  className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium active:scale-95 transition-all">
                  تم الغرس 🌱
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Completion popup */}
      <AnimatePresence>
        {showComplete && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
            <div className="bg-card rounded-2xl p-8 text-center shadow-xl">
              <p className="text-xl font-bold text-foreground">تقبّل الله دعاءك 🕊️</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
