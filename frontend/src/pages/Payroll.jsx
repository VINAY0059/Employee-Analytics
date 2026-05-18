import React from 'react';
import { Play, Download, Send, Filter, MoreHorizontal } from 'lucide-react';

const payrollData = [
  { id: 'EMP001', name: 'Alex Morgan', dept: 'Engineering', base: '$7,500.00', ot: '$450.00', bonus: '$1,000.00', taxes: '$2,235.00', deduct: '$550.00', net: '$6,165.00' },
  { id: 'EMP002', name: 'Jamie Chen', dept: 'Marketing', base: '$5,200.00', ot: '$0.00', bonus: '$500.00', taxes: '$1,410.00', deduct: '$450.00', net: '$3,840.00' },
  { id: 'EMP003', name: 'Taylor Swift', dept: 'Human Resources', base: '$4,800.00', ot: '$250.00', bonus: '$0.00', taxes: '$1,260.00', deduct: '$380.00', net: '$3,410.00' },
  { id: 'EMP004', name: 'Sam Wilson', dept: 'Sales', base: '$4,500.00', ot: '$750.00', bonus: '$2,000.00', taxes: '$1,812.50', deduct: '$425.00', net: '$5,012.50' },
  { id: 'EMP005', name: 'Emma Stone', dept: 'Engineering', base: '$6,200.00', ot: '$180.00', bonus: '$0.00', taxes: '$1,595.00', deduct: '$520.00', net: '$4,265.00' },
];

const Payroll = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Payroll Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Process and manage employee payroll</p>
        </div>
        <button className="btn btn-primary">
          <Play size={16} /> Run Payroll
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Payroll History</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>View and manage past payroll periods</p>
          </div>
          <div>
            <select className="form-control" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
              <option>October 2023</option>
              <option>September 2023</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', padding: '1rem', background: 'var(--bg-color)', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Period</div>
            <div style={{ fontWeight: 500, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>📅</span> October 2023
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Status</div>
            <span className="badge badge-green">Paid</span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Payment Date</div>
            <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>2023-10-30</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <button className="btn" style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>
            <Filter size={16} /> Filter
          </button>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn" style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>
              <Download size={16} /> Export
            </button>
            <button className="btn" style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>
              <Send size={16} /> Send Payslips
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Base Salary</th>
                <th>Overtime</th>
                <th>Bonus</th>
                <th>Taxes</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((row) => (
                <tr key={row.id}>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.id}</td>
                  <td style={{ fontWeight: 500 }}>{row.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.dept}</td>
                  <td>{row.base}</td>
                  <td>{row.ot}</td>
                  <td>{row.bonus}</td>
                  <td>{row.taxes}</td>
                  <td>{row.deduct}</td>
                  <td style={{ fontWeight: 600 }}>{row.net}</td>
                  <td>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <MoreHorizontal size={16} />
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

export default Payroll;
