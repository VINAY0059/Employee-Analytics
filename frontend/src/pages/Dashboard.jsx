import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, Clock, Smile, Download, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

const dataPie = [
  { name: 'Engineering', value: 45 },
  { name: 'Marketing', value: 31 },
  { name: 'Sales', value: 40 },
  { name: 'Finance', value: 15 },
  { name: 'HR', value: 11 },
  { name: 'Support', value: 20 },
];
const COLORS = ['#3b82f6', '#8b5cf6', '#a855f7', '#10b981', '#f59e0b', '#06b6d4'];

const dataBar = [
  { name: 'Jan', newHires: 4, attrition: 1 },
  { name: 'Feb', newHires: 10, attrition: 3 },
  { name: 'Mar', newHires: 15, attrition: 2 },
  { name: 'Apr', newHires: 12, attrition: 5 },
  { name: 'May', newHires: 18, attrition: 7 },
  { name: 'Jun', newHires: 14, attrition: 4 },
  { name: 'Jul', newHires: 22, attrition: 9 },
];

const StatCard = ({ title, value, icon: Icon, change, trend, colorClass }) => (
  <div className="card">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `var(--${colorClass})`, opacity: 0.1, position: 'absolute' }}></div>
      <Icon size={20} color={`var(--${colorClass})`} style={{ zIndex: 1, margin: '10px' }} />
    </div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{title}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{value}</div>
    <div style={{ fontSize: '0.75rem', color: trend === 'up' ? 'var(--success)' : 'var(--danger)' }}>
      {trend === 'up' ? '↑' : '↓'} {change} from last month
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn" style={{ border: '1px solid var(--border-color)', background: 'var(--surface-color)' }}>
            <Download size={16} /> Export
          </button>
          <Link to="/ai-recommendations" className="btn btn-primary">
            <BrainCircuit size={16} /> AI Insights
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <StatCard title="Total Employees" value="152" icon={Users} change="+12%" trend="up" colorClass="primary-color" />
        <StatCard title="Open Positions" value="24" icon={Briefcase} change="+3%" trend="up" colorClass="primary-color" />
        <StatCard title="Time to Hire (avg)" value="18 days" icon={Clock} change="-2%" trend="down" colorClass="success" />
        <StatCard title="Employee Satisfaction" value="92%" icon={Smile} change="+4%" trend="up" colorClass="primary-color" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Pie Chart Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Department Distribution</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Employee count by department</p>
            </div>
            <div className="badge" style={{ background: 'var(--bg-color)' }}>Total: 162</div>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" label>
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ background: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}/>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Monthly Hiring Overview</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>New hires vs attrition</p>
            </div>
            <div className="badge badge-green">+38% Growth</div>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataBar} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <RechartsTooltip contentStyle={{ background: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} cursor={{ fill: 'var(--bg-color)' }} />
                <Legend />
                <Bar dataKey="newHires" name="New Hires" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="attrition" name="Attrition" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
