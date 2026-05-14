import { Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UIBuilder from './pages/UIBuilder.jsx';
import Docs from './pages/Docs.jsx';
import Billing from './pages/Billing.jsx';
import Projects from './pages/Projects.jsx';
import Users from './pages/Users.jsx';
import APIKeys from './pages/APIKeys.jsx';
import Analytics from './pages/Analytics.jsx';
import Logs from './pages/Logs.jsx';
import Domains from './pages/Domains.jsx';
import Storage from './pages/Storage.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Llama Auth</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/users">Users</Link>
          <Link to="/apikeys">API Keys</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/storage">Storage</Link>
          <Link to="/domains">Domains</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/builder">UI Builder</Link>
          <Link to="/docs">Docs</Link>
          <Link to="/billing">Billing</Link>
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/users" element={<Users />} />
          <Route path="/apikeys" element={<APIKeys />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/builder" element={<UIBuilder />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </main>
      <footer className="footer">
        <div>© 2026 Llama Auth — Built for developers.</div>
      </footer>
    </div>
  );
}

export default App;
