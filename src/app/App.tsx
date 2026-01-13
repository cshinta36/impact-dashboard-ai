import { useState } from 'react';
import { AuthProvider, useAuth } from '@/app/contexts/AuthContext';
import { Layout } from '@/app/components/Layout';
import { Dashboard } from '@/app/views/Dashboard';
import { Exports } from '@/app/views/Exports';
import { Projects } from '@/app/views/Projects';
import { Clients } from '@/app/views/Clients';
import { Users } from '@/app/views/Users';
import { Settings } from '@/app/views/Settings';
import { Login } from '@/app/views/Login';
import { ForgotPassword } from '@/app/views/ForgotPassword';

type View = 'dashboard' | 'exports' | 'projects' | 'clients' | 'users' | 'settings';
type AuthView = 'login' | 'forgot-password';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [authView, setAuthView] = useState<AuthView>('login');

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p 
            className="text-[14px] text-muted-foreground"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Show auth views if not authenticated
  if (!isAuthenticated) {
    if (authView === 'forgot-password') {
      return <ForgotPassword onBackToLogin={() => setAuthView('login')} />;
    }
    return <Login onForgotPassword={() => setAuthView('forgot-password')} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={(view) => setActiveView(view as View)} />;
      case 'exports':
        return <Exports />;
      case 'projects':
        return <Projects />;
      case 'clients':
        return <Clients />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={(view) => setActiveView(view as View)} />;
    }
  };

  return (
    <Layout activeView={activeView} onNavigate={(view) => setActiveView(view as View)}>
      {renderView()}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
