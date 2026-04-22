import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';



const OrbLogo = () => (
  <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" stroke="url(#nl)" strokeWidth="2.5"/>
    <circle cx="16" cy="16" r="5" fill="url(#nl)"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="url(#nl)" strokeWidth="1.6"
      transform="rotate(-38 16 16)" strokeDasharray="3.5 2.5"/>
    <defs>
      <linearGradient id="nl" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7C3AED"/><stop offset="1" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function Navbar({ user, search, onSearch, darkMode, onToggleDark }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <nav className="nav">
      {/* Brand */}
      <div className="nav-brand">
        <div className="nav-logo"><OrbLogo /></div>
        <span className="nav-name">WorkOrbit</span>
      </div>

      {/* Search */}
      <div className="nav-search-wrap">
        <svg className="nav-search-ico" width="13" height="13" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="nav-search"
          placeholder="Search tasks…"
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        {search && (
          <button className="nav-search-clear" onClick={() => onSearch('')} aria-label="Clear">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Right */}
      <div className="nav-right">
        <button className="nav-icon-btn" onClick={onToggleDark}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          {darkMode
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
          }
        </button>

        <div className="nav-sep" />

        {/* Profile */}
        <div className="nav-profile" ref={ref}>
          <button className="nav-avatar" onClick={() => setOpen(p => !p)} aria-label="Open profile menu">
            <span className="nav-avatar-text">{initials}</span>
          </button>

          {open && (
            <div className="nav-dropdown">
              {/* User */}
              <div className="dd-user">
                <div className="dd-av">{initials}</div>
                <div>
                  <p className="dd-user-name">{user?.name}</p>
                  <p className="dd-user-email">{user?.email}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="dd-meta">
                <div className="dd-meta-row">
                  <span className="dd-meta-label">Organization</span>
                  <span className="dd-meta-val">{user?.organizationName}</span>
                </div>
                <div className="dd-meta-row">
                  <span className="dd-meta-label">Role</span>
                  <span className={`dd-badge dd-badge-${user?.role?.toLowerCase()}`}>
                    {user?.role}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="dd-actions">
                <button className="dd-btn" onClick={() => { navigate('/profile'); setOpen(false); }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  View Profile
                </button>
                <button className="dd-btn dd-btn-danger" onClick={logout}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
