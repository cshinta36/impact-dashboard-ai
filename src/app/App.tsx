import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { Exports } from './views/Exports';
import { Projects } from './views/Projects';
import { Clients } from './views/Clients';
import { Users } from './views/Users';
import { Settings } from './views/Settings';

type View = 'dashboard' | 'exports' | 'projects' | 'clients' | 'users' | 'settings';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

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