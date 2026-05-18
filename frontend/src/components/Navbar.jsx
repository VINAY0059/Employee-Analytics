import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Users, PlusCircle, BrainCircuit, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <BrainCircuit size={28} />
          <span>EmpAnalytics</span>
        </Link>
        <div className="nav-links">
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
