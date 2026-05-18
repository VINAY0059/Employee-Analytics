import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrainCircuit, Loader2 } from 'lucide-react';

const AIRecommendations = () => {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post('http://localhost:5000/api/ai/recommend', {});
      setRecommendation(res.data.recommendation);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch AI recommendations. Make sure you have employees and valid API key.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit size={28} color="var(--primary-color)" />
        <h2>AI Performance Insights</h2>
      </div>

      <div className="card glass">
        {loading ? (
          <div className="text-center py-10 flex flex-col items-center">
            <Loader2 size={40} color="var(--primary-color)" style={{ animation: 'spin 2s linear infinite', marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Analyzing employee data using AI...</p>
            <style>
              {`
                @keyframes spin { 100% { transform: rotate(360deg); } }
              `}
            </style>
          </div>
        ) : error ? (
          <div style={{ color: 'var(--danger)', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
            {error}
            <div className="mt-4">
              <button onClick={fetchRecommendations} className="btn btn-primary">Try Again</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-end">
              <button onClick={fetchRecommendations} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Refresh Analysis</button>
            </div>
            <div style={{ 
              whiteSpace: 'pre-wrap', 
              background: 'var(--surface-color)', 
              padding: '1.5rem', 
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              lineHeight: '1.8'
            }}>
              {recommendation || "No recommendations generated yet."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;
