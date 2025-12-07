import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Briefcase, DollarSign } from 'lucide-react';
import SnowEffect from './SnowEffect';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navItems = [
    { path: '/', label: '行程', icon: <Calendar size={20} /> },
    { path: '/packing', label: '清單', icon: <Briefcase size={20} /> },
    { path: '/currency', label: '匯率', icon: <DollarSign size={20} /> },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#234787] to-[#162d55] text-slate-800 overflow-hidden">
      <SnowEffect />
      
      {/* Scrollable Main Content */}
      <main className="h-full w-full overflow-y-auto overscroll-contain">
        {/* Inner container with substantial bottom padding to clear the nav bar */}
        <div className="max-w-md mx-auto min-h-full pt-6 px-4 pb-32">
            {children}
        </div>
      </main>

      {/* Sticky Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#234787]/95 backdrop-blur-xl border-t border-white/10 z-50 safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.4)]">
        <div className="flex justify-around items-center max-w-md mx-auto h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-full h-full transition-all duration-300
                ${isActive 
                  ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] scale-110' 
                  : 'text-white/40 hover:text-white/70'}
              `}
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;