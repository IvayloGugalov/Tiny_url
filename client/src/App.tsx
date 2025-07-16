import { useState } from 'react';
import { LinksTable } from './components/LinksTable';
import { CreateLinkForm } from './components/CreateLinkForm';
import { ClickAnalyticsChart } from './components/ClickAnalyticsChart';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleLinkCreated() {
    setRefreshKey(prev => prev + 1);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔗 TinyURL Dashboard</h1>
        <p>Create and manage your short links</p>
      </header>

      <main className="app-main">
        <CreateLinkForm onLinkCreated={handleLinkCreated} />

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <ClickAnalyticsChart refreshKey={refreshKey} />
          </div>
          <div className="dashboard-section">
            <LinksTable key={refreshKey} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
