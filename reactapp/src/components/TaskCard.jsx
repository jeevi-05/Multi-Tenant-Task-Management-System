import React from 'react';
import './TaskCard.css';
const STATUS = {
  TODO:        { label: 'To Do',       cls: 'todo' },
  IN_PROGRESS: { label: 'In Progress', cls: 'inprog' },
  DONE:        { label: 'Done',        cls: 'done' },
};
const PRIORITY = {
  HIGH:   { color: '#EF4444', label: 'High' },
  MEDIUM: { color: '#F59E0B', label: 'Medium' },
  LOW:    { color: '#22C55E', label: 'Low' },
};
export default function TaskCard({ task, currentUser, onEdit, onDelete }) {
  const canModify = currentUser?.role === 'ADMIN' || task.createdByEmail === currentUser?.email;
  const s = STATUS[task.status]    || STATUS.TODO;
  const p = PRIORITY[task.priority] || PRIORITY.MEDIUM;
  const initials = task.createdByName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="tcard">
      <div className="tcard-inner">
        {/* Header */}
        <div className="tcard-head">
          <span className={`tcard-status tcard-status-${s.cls}`}>{s.label}</span>
          {canModify && (
            <div className="tcard-acts">
              <button className="tcard-act tcard-act-edit" onClick={() => onEdit(task)} title="Edit">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button className="tcard-act tcard-act-del" onClick={() => onDelete(task.id)} title="Delete">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Top content block */}
        <div className="tcard-body">
          <h3 className="tcard-title">{task.title}</h3>
          {task.description && <p className="tcard-desc">{task.description}</p>}
        </div>

        {/* Footer */}
        <div className="tcard-foot">
          <div className="tcard-author">
            <div className="tcard-av">{initials}</div>
            <span className="tcard-author-name">{task.createdByName}</span>
          </div>
          <div className="tcard-right">
            <span className="tcard-date">
              {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span
              className="tcard-dot"
              style={{ background: p.color }}
              title={`${p.label} priority`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
