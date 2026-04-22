import React from 'react';
import './StatsCard.css';

export default function StatsCard({ label, value, icon, color, pct }) {
  return (
    <div className="scard" style={{ '--c': color }}>
      <div className="scard-top">
        <div  className="scard-icon">{icon}</div>
        <span className="scard-value">{value}</span>
      </div>
      <span className="scard-label">{label}</span>
      {pct !== undefined && (
        <>
          <div className="scard-bar">
            <div className="scard-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="scard-pct">{pct}% complete</span>
        </>
      )}
    </div>
  );
}
