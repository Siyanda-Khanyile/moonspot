import { Home, Calendar, MessageSquare, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin?: boolean;
}

const organiserTabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const adminTabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'artists', label: 'Artists', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function BottomNav({ activeTab, onTabChange, isAdmin = false }: BottomNavProps) {
  const tabs = isAdmin ? adminTabs : organiserTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1040] border-t border-white/10">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full transition-colors',
                isActive ? 'text-[#6C3FE0]' : 'text-[#A0A0C0] hover:text-white'
              )}
            >
              <Icon className={cn('w-5 h-5 mb-1', isActive && 'fill-current')} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
