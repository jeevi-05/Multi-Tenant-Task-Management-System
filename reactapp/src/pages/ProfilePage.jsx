import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ProfilePage.css';

const FIELDS = [
  { icon: '👤', label: 'Full Name',    key: 'name' },
  { icon: '📧', label: 'Email',        key: 'email' },
  { icon: '🏢', label: 'Organization', key: 'organizationName' },
  { icon: '🔑', label: 'Role',         key: 'role' },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('wo-dark') === 'true');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('wo-dark', darkMode);
  }, [darkMode]);

  return (
    <div className="wo-profile-wrap">
      <Navbar
        user={user}
        search=""
        onSearch={() => {}}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
      />

      <div className="wo-profile-content">
        {/* Back */}
        <button className="wo-back-btn" onClick={() => navigate('/dashboard')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Dashboard
        </button>

        {/* Hero */}
        <div className="wo-profile-hero">
          <div className="wo-profile-av">
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="wo-profile-hero-info">
            <h2 className="wo-profile-name">{user?.name}</h2>
            <p className="wo-profile-email">{user?.email}</p>
            <span className={`wo-profile-role wo-role-${user?.role?.toLowerCase()}`}>
              {user?.role}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="wo-profile-card">
          <h3 className="wo-profile-card-title">Account Details</h3>
          {FIELDS.map(({ icon, label, key }) => (
            <div className="wo-profile-row" key={key}>
              <div className="wo-profile-row-icon">{icon}</div>
              <div className="wo-profile-row-body">
                <span className="wo-profile-row-label">{label}</span>
                {key === 'role' ? (
                  <span className={`wo-profile-row-val wo-role-val wo-role-${user[key]?.toLowerCase()}`}>
                    {user[key] || '—'}
                  </span>
                ) : (
                  <span className="wo-profile-row-val">{user[key] || '—'}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Org */}
        <div className="wo-profile-org">
          <div className="wo-profile-org-icon">🏢</div>
          <div className="wo-profile-org-info">
            <span className="wo-profile-org-label">Member of</span>
            <span className="wo-profile-org-name">{user?.organizationName}</span>
          </div>
          <span className={`wo-profile-org-badge wo-role-${user?.role?.toLowerCase()}`}>
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
}
