import { 
  LayoutDashboard, 
  Download, 
  MessageSquare, 
  Users, 
  UserCog
} from 'lucide-react';
import logoLight from 'figma:asset/465c6fc892a7f3f9999f24d1752a33ffeb454245.png';
import logoDark from 'figma:asset/a04661e0798a060c488e80d77cd73e8beca45024.png';
import { UserMenu } from './UserMenu';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'exports', label: 'Exports', icon: Download },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'projects', label: 'Chatbot Projects', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: UserCog },
  ];

  return (
    <aside className="flex flex-col h-full bg-sidebar border-r border-sidebar-border w-60 sm:w-64">
      {/* Logo/Brand Section */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-sidebar-border">
        <img 
          src={logoLight} 
          alt="Juicebox" 
          className="h-6 sm:h-7 w-auto dark:hidden"
        />
        <img 
          src={logoDark} 
          alt="Juicebox" 
          className="h-6 sm:h-7 w-auto hidden dark:block"
        />
        <p className="text-[11px] sm:text-[12px] text-muted-foreground mt-2" style={{ fontFamily: 'var(--font-family-body)' }}>
          Impact Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 sm:px-3 py-3 sm:py-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-colors duration-150 cursor-pointer
                    ${isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/30'
                    }
                  `}
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-[13px] sm:text-[14px]">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-sidebar-border px-2 sm:px-3 py-3 sm:py-4">
        <UserMenu onNavigate={onNavigate} />
      </div>
    </aside>
  );
}