import React, { useState, useEffect } from 'react';
import './TaskModal.css';

const EMPTY = { title: '', description: '', status: 'TODO', priority: 'MEDIUM' };

export default function TaskModal({ task, onClose, onSubmit }) {
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(task
      ? { title: task.title, description: task.description || '', status: task.status, priority: task.priority || 'MEDIUM' }
      : EMPTY
    );
  }, [task]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon">{task ? '✏️' : '✨'}</span>
            <h3>{task ? 'Edit Task' : 'Create New Task'}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label>Title <span className="required">*</span></label>
            <input
              name="title" value={form.title} onChange={handleChange}
              placeholder="Enter task title" required
            />
          </div>

          <div className="modal-field">
            <label>Description</label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              placeholder="Enter task description (optional)" rows={3}
            />
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="TODO">○ To Do</option>
                <option value="IN_PROGRESS">◑ In Progress</option>
                <option value="DONE">● Done</option>
              </select>
            </div>

            <div className="modal-field">
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}
                className={`priority-select priority-select-${form.priority.toLowerCase()}`}>
                <option value="LOW">▼ Low</option>
                <option value="MEDIUM">■ Medium</option>
                <option value="HIGH">▲ High</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading
                ? <span className="btn-spinner" />
                : task ? 'Update Task' : 'Create Task'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
