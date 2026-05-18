import React, { useContext } from 'react';
import { Search, Sun, Moon, Monitor, Bell } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

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
    <header className="top-header">
      <div className="search-bar">
        <Search size={18} color="var(--text-secondary)" />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header-actions">
        <button className="icon-btn" onClick={cycleTheme} title={`Theme: ${theme}`}>
          {renderThemeIcon()}
        </button>
        <button className="icon-btn">
          <Bell size={18} />
        </button>
        <div className="user-profile">
          <div className="avatar">
            {user?.email ? user.email.substring(0, 2).toUpperCase() : 'HR'}
          </div>
          <div className="user-info">
            <div className="name" style={{ textTransform: 'capitalize' }}>
              {user?.email ? user.email.split('@')[0] : 'Administrator'}
            </div>
            <div className="role">HR Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
