import React, { useState, useEffect } from 'react';
import './App.css';

// React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

// Pages & Components
import NoteList from './pages/NoteList';
import NoteDetail from './pages/NoteDetail';
import NoteCreate from './pages/NoteCreate';
import NoteEdit from './pages/NoteEdit';

// PUBLIC_INTERFACE
function ThemeToggle({ theme, toggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

// PUBLIC_INTERFACE
function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">
          <span style={{ color: '#3f51b5', fontWeight: 700 }}>QuickNotes</span>
        </Link>
      </div>
      <div className="navbar-center">
        {location.pathname === '/' && (
          <span className="navbar-description">
            Lightweight Notes <span style={{ color: '#ff9800', fontWeight: 600 }}>·</span> Minimal & Fast
          </span>
        )}
      </div>
      <div className="navbar-right">
        <ThemeToggle theme={theme} toggle={toggleTheme} />
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function AppContent({ theme, toggleTheme }) {
  return (
    <div className="app-root">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/new" element={<NoteCreate />} />
          <Route path="/note/:id" element={<NoteDetail />} />
          <Route path="/edit/:id" element={<NoteEdit />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span>
          &copy; {new Date().getFullYear()} QuickNotes SPA —{' '}
          <a href="https://github.com/" className="footer-link" rel="noopener noreferrer" target="_blank">
            Source
          </a>
        </span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  // Apply theme to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;
