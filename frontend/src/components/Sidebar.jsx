import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, Users, UserPlus, MessageSquare, 
  FileText, CheckCircle, Calendar, DollarSign, 
  Heart, BarChart2, Settings, HelpCircle, LogOut,
  BrainCircuit, Briefcase, FileSignature
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, nested = false }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `sidebar-item ${isActive ? 'active' : ''} ${nested ? 'nested' : ''}`
    }
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
);

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">EA</div>
        <h2 style={{ fontSize: '1.1rem' }}>Employee Analytics</h2>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="section-title">Main</div>
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/employees" icon={Users} label="Employees" />
        </div>

        <div className="sidebar-section">
          <div className="section-title">Recruitment</div>
          <SidebarItem to="/recruitment" icon={UserPlus} label="Recruitment" />
          <SidebarItem to="/ai-screening" icon={FileText} label="AI Screening" nested />
          <SidebarItem to="/ai-interviews" icon={MessageSquare} label="AI Interviews" nested />
          <SidebarItem to="/offer-letters" icon={FileSignature} label="Offer Letters" nested />
          <SidebarItem to="/portfolio" icon={Briefcase} label="Portfolio Evaluati..." nested />
          <SidebarItem to="/candidate-eval" icon={CheckCircle} label="Candidate Evaluation" />
        </div>

        <div className="sidebar-section">
          <div className="section-title">HR Management</div>
          <SidebarItem to="/onboarding" icon={CheckCircle} label="Onboarding" />
          <SidebarItem to="/schedules" icon={Calendar} label="Schedules" />
          <SidebarItem to="/payroll" icon={DollarSign} label="Payroll" />
          <SidebarItem to="/employee-relations" icon={Heart} label="Employee Relations" />
          <SidebarItem to="/hr-analytics" icon={BarChart2} label="HR Analytics" />
          <SidebarItem to="/ai-recommendations" icon={BrainCircuit} label="AI Insights" nested />
        </div>
      </div>

      <div className="sidebar-footer">
        <SidebarItem to="/settings" icon={Settings} label="Settings" />
        <SidebarItem to="/help" icon={HelpCircle} label="Help & Support" />
        <button onClick={handleLogout} className="sidebar-item logout-btn">
          <LogOut size={18} color="#ef4444" />
          <span style={{ color: '#ef4444' }}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
