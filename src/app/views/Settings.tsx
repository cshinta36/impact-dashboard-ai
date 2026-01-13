import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { User, Lock, Palette, Bell, Sun, Moon, Monitor } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'appearance' | 'notifications'>('profile');
  const { theme, setTheme } = useTheme();

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'security' as const, label: 'Security', icon: Lock },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      <PageHeader 
        title="Settings"
        description="Manage your account preferences"
      />

      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Account Settings Card */}
          <div className="bg-card border border-border rounded-[var(--radius-card)] p-4 sm:p-6 lg:p-8">
            <h2 
              className="text-[18px] sm:text-[20px] text-foreground mb-4 sm:mb-6"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              Account Settings
            </h2>

            {/* Tabs */}
            <div className="flex gap-1 sm:gap-2 border-b border-border mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 sm:py-3 border-b-2 transition-colors whitespace-nowrap flex-shrink-0
                      ${isActive 
                        ? 'border-accent text-accent' 
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                      }
                    `}
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[12px] sm:text-[14px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-[var(--radius-card)] p-6">
                  <h3 
                    className="text-[18px] text-foreground mb-6"
                    style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-normal)' }}
                  >
                    Profile Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label 
                        className="block text-[13px] text-foreground mb-2"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="System Admin"
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ fontFamily: 'var(--font-family-body)' }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block text-[13px] text-foreground mb-2"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@juicebox.ai"
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ fontFamily: 'var(--font-family-body)' }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block text-[13px] text-foreground mb-2"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        value="Administrator"
                        disabled
                        className="w-full px-4 py-2 bg-muted/20 border border-border rounded-lg text-[14px] text-muted-foreground cursor-not-allowed"
                        style={{ fontFamily: 'var(--font-family-body)' }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button variant="primary">Save Changes</Button>
                    <Button variant="secondary">Cancel</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-[var(--radius-card)] p-6">
                  <h3 
                    className="text-[18px] text-foreground mb-6"
                    style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-normal)' }}
                  >
                    Change Password
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label 
                        className="block text-[13px] text-foreground mb-2"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ fontFamily: 'var(--font-family-body)' }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block text-[13px] text-foreground mb-2"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ fontFamily: 'var(--font-family-body)' }}
                      />
                    </div>

                    <div>
                      <label 
                        className="block text-[13px] text-foreground mb-2"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-[14px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        style={{ fontFamily: 'var(--font-family-body)' }}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button variant="primary">Update Password</Button>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-[var(--radius-card)] p-6">
                  <h3 
                    className="text-[18px] text-foreground mb-2"
                    style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-normal)' }}
                  >
                    Two-Factor Authentication
                  </h3>
                  <p 
                    className="text-[14px] text-muted-foreground mb-4"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="secondary">Enable 2FA</Button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-[var(--radius-card)] p-6">
                  <h3 
                    className="text-[18px] text-foreground mb-6"
                    style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-normal)' }}
                  >
                    Theme Preferences
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label 
                        className="block text-[13px] text-foreground mb-3"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {/* Light Theme */}
                        <button 
                          onClick={() => setTheme('light')}
                          className={`
                            flex flex-col items-center gap-2 p-4 rounded-lg transition-colors
                            ${theme === 'light' 
                              ? 'border-2 border-accent bg-accent/5' 
                              : 'border border-border hover:border-accent/50'
                            }
                          `}
                        >
                          <div className="w-12 h-12 bg-white border border-border rounded-md flex items-center justify-center">
                            <Sun className="w-6 h-6 text-foreground" />
                          </div>
                          <span 
                            className={`text-[13px] ${theme === 'light' ? 'text-accent' : 'text-muted-foreground'}`}
                            style={{ fontFamily: 'var(--font-family-body)' }}
                          >
                            Light
                          </span>
                        </button>

                        {/* Dark Theme */}
                        <button 
                          onClick={() => setTheme('dark')}
                          className={`
                            flex flex-col items-center gap-2 p-4 rounded-lg transition-colors
                            ${theme === 'dark' 
                              ? 'border-2 border-accent bg-accent/5' 
                              : 'border border-border hover:border-accent/50'
                            }
                          `}
                        >
                          <div className="w-12 h-12 bg-[#0c0d10] border border-border rounded-md flex items-center justify-center">
                            <Moon className="w-6 h-6 text-white" />
                          </div>
                          <span 
                            className={`text-[13px] ${theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}`}
                            style={{ fontFamily: 'var(--font-family-body)' }}
                          >
                            Dark
                          </span>
                        </button>

                        {/* Auto Theme */}
                        <button 
                          onClick={() => setTheme('auto')}
                          className={`
                            flex flex-col items-center gap-2 p-4 rounded-lg transition-colors
                            ${theme === 'auto' 
                              ? 'border-2 border-accent bg-accent/5' 
                              : 'border border-border hover:border-accent/50'
                            }
                          `}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-white to-[#0c0d10] border border-border rounded-md flex items-center justify-center">
                            <Monitor className="w-6 h-6 text-foreground" />
                          </div>
                          <span 
                            className={`text-[13px] ${theme === 'auto' ? 'text-accent' : 'text-muted-foreground'}`}
                            style={{ fontFamily: 'var(--font-family-body)' }}
                          >
                            Auto
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-[var(--radius-card)] p-6">
                  <h3 
                    className="text-[18px] text-foreground mb-6"
                    style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-normal)' }}
                  >
                    Email Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Export completed', description: 'Receive an email when your export is ready' },
                      { label: 'New project activity', description: 'Get notified about new conversations' },
                      { label: 'Weekly summary', description: 'Receive a weekly digest of your metrics' },
                      { label: 'Security alerts', description: 'Important security and account notifications' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start justify-between py-3 border-b border-border last:border-0">
                        <div className="flex-1">
                          <p 
                            className="text-[14px] text-foreground"
                            style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                          >
                            {item.label}
                          </p>
                          <p 
                            className="text-[13px] text-muted-foreground mt-0.5"
                            style={{ fontFamily: 'var(--font-family-body)' }}
                          >
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                          <input type="checkbox" className="sr-only peer" defaultChecked={index !== 2} />
                          <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-accent transition-colors"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button variant="primary">Save Preferences</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}