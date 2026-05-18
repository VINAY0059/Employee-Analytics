import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, AlertCircle, Search } from 'lucide-react';

const candidates = [
  { id: 1, name: 'Sarah Connor', role: 'Senior React Developer', score: 94, status: 'Shortlisted', date: '2023-10-25' },
  { id: 2, name: 'John Smith', role: 'Backend Engineer', score: 88, status: 'Under Review', date: '2023-10-26' },
  { id: 3, name: 'Emily Davis', role: 'UI/UX Designer', score: 72, status: 'Rejected', date: '2023-10-24' },
  { id: 4, name: 'Michael Brown', role: 'Senior React Developer', score: 91, status: 'Shortlisted', date: '2023-10-27' },
];

const AIScreening = () => {
  const [isUploading, setIsUploading] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 90) return 'var(--success)';
    if (score >= 80) return 'var(--primary-color)';
    if (score >= 70) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Shortlisted': return <span className="badge badge-green"><CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }}/>{status}</span>;
      case 'Under Review': return <span className="badge badge-yellow"><Clock size={12} style={{ display: 'inline', marginRight: '4px' }}/>{status}</span>;
      case 'Rejected': return <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px' }}/>{status}</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>AI Resume Screening</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Automatically analyze and rank incoming resumes using AI.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsUploading(true)}>
          <Upload size={16} /> Upload Resumes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1.5rem' }}>
        {/* Sidebar for Screening Rules */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Active Screening Rules</h3>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Senior React Developer</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Keywords: React, Node.js, Next.js, Redux</div>
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Backend Engineer</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Keywords: Express, MongoDB, Postgres, Redis</div>
          </div>

          <button className="btn" style={{ width: '100%', background: 'var(--bg-color)', border: '1px dashed var(--border-color)', color: 'var(--text-secondary)', marginTop: '1rem' }}>
            + Add New Rule
          </button>
        </div>

        {/* Main List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.125rem' }}>Candidate Rankings</h3>
            <div style={{ position: 'relative', width: '250px' }}>
              <Search size={16} style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--text-secondary)' }} />
              <input type="text" className="form-control" placeholder="Search candidates..." style={{ paddingLeft: '2.25rem', padding: '0.5rem 2.25rem' }} />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Candidate Name</th>
                  <th>Applied Role</th>
                  <th>AI Match Score</th>
                  <th>Status</th>
                  <th>Date Analyzed</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => (
                  <tr key={candidate.id}>
                    <td style={{ fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={16} color="var(--primary-color)" />
                        </div>
                        {candidate.name}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{candidate.role}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: getScoreColor(candidate.score) }}>{candidate.score}</div>
                        <div style={{ width: '60px', height: '6px', background: 'var(--bg-color)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${candidate.score}%`, background: getScoreColor(candidate.score) }}></div>
                        </div>
                      </div>
                    </td>
                    <td>{getStatusBadge(candidate.status)}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{candidate.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIScreening;
