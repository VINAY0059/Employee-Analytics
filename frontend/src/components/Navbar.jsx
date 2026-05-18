import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Users, PlusCircle, BrainCircuit, LogOut, Sun, Moon, Monitor } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const renderThemeIcon = () => {
    if (theme === 'light') return <Sun size={18} />;
    if (theme === 'dark') return <Moon size={18} />;
    return <Monitor size={18} />;
  };

  return (
    <nav className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <BrainCircuit size={28} />
          <span>Employee Analytics</span>
        </Link>
        <div className="nav-links">
          <button onClick={cycleTheme} className="btn" style={{ background: 'transparent', padding: '0.5rem', color: 'var(--text-secondary)' }} title={`Theme: ${theme}`}>
            {renderThemeIcon()}
          </button>
          {user ? (
            <>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                <Users size={18} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/>
                Directory
              </Link>
              <Link to="/add-employee" className={location.pathname === '/add-employee' ? 'active' : ''}>
                <PlusCircle size={18} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/>
                Add Employee
              </Link>
              <Link to="/ai-recommendations" className={location.pathname === '/ai-recommendations' ? 'active' : ''}>
                <BrainCircuit size={18} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/>
                AI Insights
              </Link>
              <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
                <LogOut size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
              <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
