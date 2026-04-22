import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import './Auth.css';

const OrbLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" stroke="url(#ll)" strokeWidth="2.5"/>
    <circle cx="16" cy="16" r="5" fill="url(#ll)"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="url(#ll)" strokeWidth="1.6"
      transform="rotate(-38 16 16)" strokeDasharray="3.5 2.5"/>
    <defs>
      <linearGradient id="ll" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A78BFA"/><stop offset="1" stopColor="#60A5FA"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [msg,  setMsg]        = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({
        name: res.data.name || form.email.split('@')[0],
        email: res.data.email,
        role: res.data.role,
        organizationName: res.data.organizationName,
      }));
      setMsg({ text: 'Login successful! Redirecting…', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 900);
    } catch {
      setMsg({ text: 'Invalid email or password.', type: 'error' });
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
            Manage tasks<br />
            <span>smarter, faster.</span>
          </h1>
          <p className="auth-left-sub">
            WorkOrbit brings your team's work into one place — organized, tracked, and delivered on time.
          </p>
          <div className="auth-features">
            {['Multi-tenant task management', 'Role-based access control', 'Real-time collaboration', 'JWT-secured workspace'].map(f => (
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
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-sub">Sign in to your workspace</p>

            {msg.text && (
              <div className={`auth-alert auth-alert-${msg.type}`}>{msg.text}</div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
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
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <p className="auth-footer">
              No account? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
