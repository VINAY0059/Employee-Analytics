import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import AIRecommendations from './pages/AIRecommendations';
import Onboarding from './pages/Onboarding';
import EmployeeDirectory from './pages/EmployeeDirectory';
import Payroll from './pages/Payroll';
import AIScreening from './pages/AIScreening';
import FeatureComingSoon from './pages/FeatureComingSoon';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><EmployeeDirectory /></ProtectedRoute>} />
        <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
        <Route path="/ai-recommendations" element={<ProtectedRoute><AIRecommendations /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/payroll" element={<ProtectedRoute><Payroll /></ProtectedRoute>} />
        <Route path="/ai-screening" element={<ProtectedRoute><AIScreening /></ProtectedRoute>} />
        <Route path="/ai-interviews" element={<ProtectedRoute><FeatureComingSoon title="AI Interviews" description="Our autonomous AI voice and video interviewing agents are currently undergoing final calibration." /></ProtectedRoute>} />
        <Route path="/offer-letters" element={<ProtectedRoute><FeatureComingSoon title="Offer Letter Automation" description="Dynamic offer letter generation with e-signature capabilities will be available shortly." /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><FeatureComingSoon title="Portfolio Evaluation" description="Automated GitHub and design portfolio parsing is arriving in version 2.0." /></ProtectedRoute>} />
        <Route path="/candidate-eval" element={<ProtectedRoute><FeatureComingSoon title="Candidate Evaluation" description="Holistic candidate evaluation matrices and scorecard features are under construction." /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
