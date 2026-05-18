import React from 'react';
import { Construction } from 'lucide-react';

const FeatureComingSoon = ({ title, description }) => {
  return (
    <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <Construction size={40} color="var(--primary-color)" />
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
        {description || "We're currently building this feature. It will be available in the upcoming release. Stay tuned for updates!"}
      </p>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default FeatureComingSoon;
