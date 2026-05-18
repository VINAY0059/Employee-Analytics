import React from 'react';
import { Briefcase, Star, Clock, Trash2 } from 'lucide-react';
import axios from 'axios';

const EmployeeCard = ({ employee, onDelete }) => {
  
  const handleDelete = async () => {
    if(window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${employee._id}`);
        onDelete(employee._id);
      } catch (err) {
        console.error('Failed to delete', err);
      }
    }
  };

  return (
    <div className="card glass" style={{ position: 'relative' }}>
      <button 
        onClick={handleDelete}
        style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}
        title="Delete Employee"
      >
        <Trash2 size={18} />
      </button>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--primary-color)' }}>{employee.name}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>{employee.email}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <div className="flex items-center gap-2">
          <Briefcase size={16} color="var(--text-secondary)" />
          <span style={{ fontSize: '0.875rem' }}>{employee.department}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} color="var(--text-secondary)" />
          <span style={{ fontSize: '0.875rem' }}>{employee.experience} Years Experience</span>
        </div>
        <div className="flex items-center gap-2">
          <Star size={16} color="var(--text-secondary)" />
          <span style={{ fontSize: '0.875rem' }}>Performance: <strong>{employee.performanceScore}/100</strong></span>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Skills</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {employee.skills.map((skill, index) => (
            <span key={index} style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
