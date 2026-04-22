import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import './Auth.css';

const OrbLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" stroke="url(#rl)" strokeWidth="2.5"/>
    <circle cx="16" cy="16" r="5" fill="url(#rl)"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="url(#rl)" strokeWidth="1.6"
      transform="rotate(-38 16 16)" strokeDasharray="3.5 2.5"/>
    <defs>
      <linearGradient id="rl" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A78BFA"/><stop offset="1" stopColor="#60A5FA"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', organizationName: '', role: 'MEMBER',
  });
  const [msg,  setMsg]        = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      await register(form);
      setMsg({ text: 'Account created! Redirecting to login…', type: 'success' });
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
      setMsg({ text: err.response?.data || 'Registration failed. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-inner">

        {/* Left — branding */}
        <div className="auth-left">
          <div className="auth-left-brand">
            <div className="auth-left-logo"><OrbLogo size={20} /></div>
            <span className="auth-left-brand-name">WorkOrbit</span>
          </div>
          <h1 className="auth-left-headline">
            Your team's<br />
            <span>command center.</span>
          </h1>
          <p className="auth-left-sub">
            Join thousands of teams using WorkOrbit to organize work, track progress, and deliver results.
          </p>
          <div className="auth-features">
            {['Create your organization workspace', 'Invite team members with roles', 'Track tasks with priorities', 'Secure JWT authentication'].map(f => (
              <div className="auth-feature" key={f}>
                <div className="auth-feature-dot" />
                <span className="auth-feature-text">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — glass form */}
        <div className="auth-right">
          <div className="auth-card">
            <h2 className="auth-title">Create your account</h2>
            <p className="auth-sub">Organize. Track. Deliver.</p>

            {msg.text && (
              <div className={`auth-alert auth-alert-${msg.type}`}>{msg.text}</div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Jane Doe"
                  value={form.name} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label>Email address</label>
                <input type="email" name="email" placeholder="you@company.com"
                  value={form.email} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label>Password</label>
                <input type="password" name="password" placeholder="••••••••"
                  value={form.password} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label>Organization</label>
                <input type="text" name="organizationName" placeholder="Acme Corp"
                  value={form.organizationName} onChange={handleChange} required />
              </div>
              <div className="auth-field">
                <label>Role</label>
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="MEMBER">Member</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
