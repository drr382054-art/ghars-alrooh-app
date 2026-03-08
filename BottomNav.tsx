import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'home', icon: '🌳', label: 'الشجرة', path: '/home' },
  { id: 'adhkar', icon: '📿', label: 'الأذكار', path: '/adhkar' },
  { id: 'duas', icon: '🤲🏻', label: 'الأدعية', path: '/duas' },
  { id: 'ramadan', icon: '🌙', label: 'رمضان', path: '/ramadan' },
  { id: 'message', icon: '📝', label: 'رسالة', path: '/message' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map(tab => {
          const isActive = current === tab.path || (tab.path !== '/home' && current.startsWith(tab.path));
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-primary scale-105' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className={`text-xl ${isActive ? 'scale-110' : ''} transition-transform`}>{tab.icon}</span>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{tab.label}</span>
              {isActive && <div className="w-4 h-0.5 rounded-full bg-primary mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
