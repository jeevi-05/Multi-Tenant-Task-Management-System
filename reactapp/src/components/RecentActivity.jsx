import React, { useState, useEffect } from 'react';
import { getActivityLogs } from '../api/activity';
import './RecentActivity.css';

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 10)   return 'Just now';
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/* Detect action type from the log message */
function getActionType(action = '') {
  const a = action.toLowerCase();
  if (a.includes('created'))  return 'created';
  if (a.includes('marked') || a.includes('done') || a.includes('in_progress') || a.includes('todo')) return 'status';
  return 'updated';
}

const ACTION_ICON = {
  created: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  updated: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  status: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

/* Parse "Name did something 'Task title'" into parts for rich rendering */
function parseAction(action = '') {
  // Match pattern: "Name <verb> task 'Title'" or "Name <verb> task \"Title\""
  const match = action.match(/^(.+?)\s+(created|updated|marked)\s+task\s+['"](.+?)['"]/i);
  if (!match) return <span className="ra-action-text">{action}</span>;

  const [, name, verb, title] = match;
  const rest = action.slice(match[0].length); // e.g. " as DONE"

  return (
    <span className="ra-action-text">
      <strong className="ra-name">{name}</strong>
      {' '}{verb} task{' '}
      <span className="ra-task-title">'{title}'</span>
      {rest}
    </span>
  );
}

export default function RecentActivity() {
  const [logs,    setLogs]    = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivityLogs()
      .then(res => setLogs(res.data.slice(0, 5)))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="ra-card">
      {/* Header */}
      <div className="ra-header">
        <div className="ra-header-left">
          <span className="ra-pulse" />
          <h3 className="ra-title">Recent Activity</h3>
        </div>
        {!loading && logs.length > 0 && (
          <span className="ra-count">{logs.length}</span>
        )}
      </div>

      {/* Body */}
      <div className="ra-body">
        {loading ? (
          <div className="ra-loading">
            <div className="ra-spinner" />
          </div>
        ) : logs.length === 0 ? (
          <div className="ra-empty">
            <div className="ra-empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <p className="ra-empty-title">No activity yet</p>
            <p className="ra-empty-sub">Actions will appear here</p>
          </div>
        ) : (
          <ul className="ra-list">
            {logs.map((log, idx) => {
              const type = getActionType(log.action);
              return (
                <li key={log.id} className="ra-item">
                  {/* Action icon */}
                  <div className={`ra-icon ra-icon-${type}`}>
                    {ACTION_ICON[type]}
                  </div>

                  {/* Content */}
                  <div className="ra-content">
                    {parseAction(log.action)}
                    <span className="ra-time">{timeAgo(log.createdAt)}</span>
                  </div>

                  {/* Divider — not on last item */}
                  {idx < logs.length - 1 && <div className="ra-divider" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
