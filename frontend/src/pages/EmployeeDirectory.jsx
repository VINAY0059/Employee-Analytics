import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import { Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmployeeDirectory = () => {
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Employee Directory</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage your organization's employees</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="badge badge-blue">Total: {employees.length}</div>
          <Link to="/add-employee" className="btn btn-primary">
            <Plus size={16} /> Add Employee
          </Link>
        </div>
      </div>

      <div className="card mb-6">
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

export default EmployeeDirectory;
