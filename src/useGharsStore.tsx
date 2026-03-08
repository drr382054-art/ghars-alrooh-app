import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Leaf {
  date: string;
  type: string;
  isGolden: boolean;
}

export interface DayCompletion {
  morning: boolean;
  evening: boolean;
  afterPrayer: boolean;
  sleep: boolean;
  duaSelf: boolean;
  duaDeceased: boolean;
  ramadan: boolean;
  laylatAlQadr: boolean;
  sadaqah: Record<string, boolean>;
}

export interface UserData {
  name: string;
  email?: string;
  leaves: Leaf[];
  completions: Record<string, DayCompletion>;
  messages: Record<string, string>;
  customDeceased: string[];
  hasSeenAnimation: boolean;
  lastActiveDate: string;
  darkMode: boolean;
  registeredDate: string;
}

const defaultCompletion: DayCompletion = {
  morning: false, evening: false, afterPrayer: false, sleep: false,
  duaSelf: false, duaDeceased: false, ramadan: false, laylatAlQadr: false,
  sadaqah: {},
};

interface GharsContextType {
  user: UserData | null;
  isLoggedIn: boolean;
  login: (name: string, password: string, email?: string) => void;
  logout: () => void;
  completeSection: (section: keyof Omit<DayCompletion, 'sadaqah'>) => void;
  completeSadaqah: (name: string) => void;
  addMessage: (message: string) => void;
  addCustomDeceased: (name: string) => void;
  removeCustomDeceased: (name: string) => void;
  setHasSeenAnimation: () => void;
  toggleDarkMode: () => void;
  getTodayCompletion: () => DayCompletion;
  getLeafCount: () => number;
  getConsecutiveDays: () => number;
  getDaysSinceLastActive: () => number;
  getAllDatesWithActivity: () => { date: string; leaves: Leaf[]; message?: string; completion?: DayCompletion }[];
}

const GharsContext = createContext<GharsContextType | null>(null);

const today = () => new Date().toISOString().split('T')[0];

export function GharsProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [storageKey, setStorageKey] = useState('');

  useEffect(() => {
    const key = localStorage.getItem('ghars_current_key');
    if (key) {
      const stored = localStorage.getItem(key);
      if (stored) {
        try { setUser(JSON.parse(stored)); setStorageKey(key); } catch {}
      }
    }
  }, []);

  useEffect(() => {
    if (user && storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(user));
    }
  }, [user, storageKey]);

  useEffect(() => {
    if (user?.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [user?.darkMode]);

  const login = (name: string, password: string, email?: string) => {
    const key = 'ghars_' + btoa(unescape(encodeURIComponent(name + ':' + password)));
    const stored = localStorage.getItem(key);
    let userData: UserData;
    if (stored) {
      userData = JSON.parse(stored);
    } else {
      userData = {
        name, email, leaves: [], completions: {}, messages: {},
        customDeceased: [], hasSeenAnimation: false,
        lastActiveDate: '', darkMode: false, registeredDate: today(),
      };
    }
    setUser(userData);
    setStorageKey(key);
    localStorage.setItem('ghars_current_key', key);
    localStorage.setItem(key, JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('ghars_current_key');
    setUser(null); setStorageKey('');
    document.documentElement.classList.remove('dark');
  };

  const completeSection = (section: keyof Omit<DayCompletion, 'sadaqah'>) => {
    if (!user) return;
    const d = today();
    const comp = { ...(user.completions[d] || { ...defaultCompletion }) };
    if (comp[section]) return;
    (comp as any)[section] = true;
    const isGolden = section === 'duaDeceased';
    const newLeaf: Leaf = { date: d, type: section, isGolden };
    setUser({
      ...user,
      completions: { ...user.completions, [d]: comp },
      leaves: [...user.leaves, newLeaf],
      lastActiveDate: d,
    });
  };

  const completeSadaqah = (name: string) => {
    if (!user) return;
    const d = today();
    const comp = { ...(user.completions[d] || { ...defaultCompletion }) };
    comp.sadaqah = { ...comp.sadaqah, [name]: true };
    const newLeaf: Leaf = { date: d, type: 'sadaqah_' + name, isGolden: true };
    setUser({
      ...user,
      completions: { ...user.completions, [d]: comp },
      leaves: [...user.leaves, newLeaf],
      lastActiveDate: d,
    });
  };

  const addMessage = (message: string) => {
    if (!user) return;
    const d = today();
    const hasLeaf = user.leaves.some(l => l.date === d && l.type === 'message');
    const newLeaves = hasLeaf ? user.leaves : [...user.leaves, { date: d, type: 'message', isGolden: false }];
    setUser({ ...user, messages: { ...user.messages, [d]: message }, leaves: newLeaves, lastActiveDate: d });
  };

  const addCustomDeceased = (name: string) => {
    if (!user || user.customDeceased.includes(name)) return;
    setUser({ ...user, customDeceased: [...user.customDeceased, name] });
  };

  const removeCustomDeceased = (name: string) => {
    if (!user) return;
    setUser({ ...user, customDeceased: user.customDeceased.filter(n => n !== name) });
  };

  const setHasSeenAnimation = () => { if (user) setUser({ ...user, hasSeenAnimation: true }); };
  const toggleDarkMode = () => { if (user) setUser({ ...user, darkMode: !user.darkMode }); };

  const getTodayCompletion = (): DayCompletion => user?.completions[today()] || { ...defaultCompletion };

  const getLeafCount = () => user ? Math.min(user.leaves.length, 30) : 0;

  const getConsecutiveDays = () => {
    if (!user) return 0;
    let count = 0;
    const d = new Date();
    while (true) {
      const dateStr = d.toISOString().split('T')[0];
      if (user.completions[dateStr] && Object.values(user.completions[dateStr]).some(v => v === true)) {
        count++; d.setDate(d.getDate() - 1);
      } else break;
    }
    return count;
  };

  const getDaysSinceLastActive = () => {
    if (!user || !user.lastActiveDate) return 0;
    return Math.floor((new Date().getTime() - new Date(user.lastActiveDate).getTime()) / 86400000);
  };

  const getAllDatesWithActivity = () => {
    if (!user) return [];
    const dates = new Set<string>();
    user.leaves.forEach(l => dates.add(l.date));
    Object.keys(user.messages).forEach(d => dates.add(d));
    return Array.from(dates).sort().reverse().map(date => ({
      date,
      leaves: user.leaves.filter(l => l.date === date),
      message: user.messages[date],
      completion: user.completions[date],
    }));
  };

  return (
    <GharsContext.Provider value={{
      user, isLoggedIn: !!user, login, logout,
      completeSection, completeSadaqah, addMessage,
      addCustomDeceased, removeCustomDeceased,
      setHasSeenAnimation, toggleDarkMode,
      getTodayCompletion, getLeafCount,
      getConsecutiveDays, getDaysSinceLastActive, getAllDatesWithActivity,
    }}>
      {children}
    </GharsContext.Provider>
  );
}

export function useGhars() {
  const ctx = useContext(GharsContext);
  if (!ctx) throw new Error('useGhars must be used within GharsProvider');
  return ctx;
}
