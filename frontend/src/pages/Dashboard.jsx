import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import { Search, Filter } from 'lucide-react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:5000/api/employees';
      if (search || department) {
        url = `http://localhost:5000/api/employees/search?q=${search}&department=${department}`;
      }
      const res = await axios.get(url);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, department]);

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp._id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2>Employee Directory</h2>
        <div style={{ background: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Total: {employees.length}
        </div>
      </div>

      <div className="card glass mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Filter size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-secondary)' }} />
            <select 
              className="form-control" 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)}
              style={{ paddingLeft: '2.5rem', appearance: 'none' }}
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-6">Loading employees...</div>
      ) : employees.length === 0 ? (
        <div className="text-center mt-6" style={{ color: 'var(--text-secondary)' }}>No employees found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {employees.map(emp => (
            <EmployeeCard key={emp._id} employee={emp} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
