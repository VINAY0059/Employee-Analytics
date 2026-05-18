import React from 'react';
import { Plus, CheckSquare } from 'lucide-react';

const onboardingData = [
  { id: 1, name: 'Alex Morgan', role: 'Marketing Specialist', date: '2023-11-15', status: 'In Progress', progress: 7, total: 12 },
  { id: 2, name: 'Jamie Chen', role: 'Software Developer', date: '2023-11-20', status: 'Pending', progress: 0, total: 15 },
  { id: 3, name: 'Taylor Swift', role: 'HR Coordinator', date: '2023-11-01', status: 'Completed', progress: 10, total: 10 },
  { id: 4, name: 'Sam Wilson', role: 'Sales Representative', date: '2023-11-12', status: 'In Progress', progress: 4, total: 10 },
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'In Progress': return <span className="badge badge-blue">In Progress</span>;
    case 'Pending': return <span className="badge badge-yellow">Pending</span>;
    case 'Completed': return <span className="badge badge-green">Completed</span>;
    default: return <span className="badge">{status}</span>;
  }
};

const Onboarding = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Employee Onboarding</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage employee onboarding processes and track progress</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> New Onboarding
        </button>
      </div>

      <div className="card">
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Active Onboarding</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Currently active employee onboarding processes</p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Position</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {onboardingData.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 500 }}>{row.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.role}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.date}</td>
                  <td>{getStatusBadge(row.status)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: '6px', background: 'var(--bg-color)', borderRadius: '3px', overflow: 'hidden', minWidth: '60px' }}>
                        <div style={{ height: '100%', width: `${(row.progress / row.total) * 100}%`, background: row.status === 'Completed' ? 'var(--success)' : (row.status === 'Pending' ? 'var(--warning)' : 'var(--primary-color)') }}></div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.progress}/{row.total}</span>
                    </div>
                  </td>
                  <td>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                      <CheckSquare size={16} /> View Tasks
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
