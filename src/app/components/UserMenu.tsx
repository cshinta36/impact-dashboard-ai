import { useState, useRef, useEffect } from 'react';
import { Settings, LogOut, ChevronUp } from 'lucide-react';

interface UserMenuProps {
  onNavigate: (view: string) => void;
  onLogout?: () => void;
}

export function UserMenu({ onNavigate, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSettingsClick = () => {
    setIsOpen(false);
    onNavigate('settings');
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      console.log('Logging out...');
      // Add logout logic here
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent/30 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <span className="text-[12px] text-sidebar-primary-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
            SA
          </span>
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-[13px] text-sidebar-foreground truncate" style={{ fontFamily: 'var(--font-family-body)' }}>
            System Admin
          </p>
          <p className="text-[11px] text-muted-foreground truncate" style={{ fontFamily: 'var(--font-family-body)' }}>
            admin@juicebox.ai
          </p>
        </div>
        <ChevronUp 
          className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Flyout Menu */}
      {isOpen && (
        <div 
          className="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-border rounded-[var(--radius-card)] overflow-hidden"
          style={{ 
            zIndex: 50,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-[12px] text-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
                  SA
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-foreground truncate" style={{ fontFamily: 'var(--font-family-body)' }}>
                  System Admin
                </p>
                <p className="text-[11px] text-muted-foreground truncate" style={{ fontFamily: 'var(--font-family-body)' }}>
                  admin@juicebox.ai
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleSettingsClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-secondary/50 transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="text-[14px] text-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
                Settings
              </span>
            </button>
            
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-secondary/50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-muted-foreground" />
              <span className="text-[14px] text-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
                Log Out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}