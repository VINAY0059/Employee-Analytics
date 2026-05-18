import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };
      await axios.post('http://localhost:5000/api/employees', payload);
      setSuccess('Employee added successfully!');
      setError('');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding employee');
      setSuccess('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card glass">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus size={24} color="var(--primary-color)" />
          <h2>Add New Employee</h2>
        </div>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }}>{error}</div>}
        {success && <div style={{ color: 'var(--success)', marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px' }}>{success}</div>}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select name="department" className="form-control" value={formData.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <div className="form-group">
            <label>Years of Experience</label>
            <input type="number" name="experience" className="form-control" value={formData.experience} onChange={handleChange} required min="0" />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Skills (comma separated)</label>
            <input type="text" name="skills" className="form-control" placeholder="e.g. React, Node.js, Python" value={formData.skills} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Performance Score (0-100)</label>
            <input type="number" name="performanceScore" className="form-control" value={formData.performanceScore} onChange={handleChange} required min="0" max="100" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
