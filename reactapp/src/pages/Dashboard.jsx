import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Toast from '../components/Toast';
import RecentActivity from '../components/RecentActivity';
import { getAllTasks, getMyTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import './Dashboard.css';

const FILTERS = [
  { value: 'ALL',         label: 'All Tasks' },
  { value: 'TODO',        label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE',        label: 'Done' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function Dashboard() {
  const user    = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  const [tasks,       setTasks]       = useState([]);
  const [filter,      setFilter]      = useState('ALL');
  const [search,      setSearch]      = useState('');
  const [loading,     setLoading]     = useState(true);
  const [showModal,   setShowModal]   = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast,       setToast]       = useState({ message: '', type: '' });
  const [darkMode,    setDarkMode]    = useState(() =>
    localStorage.getItem('wo-dark') === 'true'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('wo-dark', String(darkMode));
  }, [darkMode]);

  const showToast  = (msg, type = 'success') => setToast({ message: msg, type });
  const closeToast = useCallback(() => setToast({ message: '', type: '' }), []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = isAdmin ? await getAllTasks() : await getMyTasks();
      setTasks(res.data);
    } catch {
      showToast('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleCreate = async (form) => {
    try {
      await createTask(form);
      showToast('Task created successfully');
      setShowModal(false);
      fetchTasks();
    } catch { showToast('Failed to create task', 'error'); }
  };

  const handleUpdate = async (form) => {
    try {
      await updateTask(editingTask.id, form);
      showToast('Task updated successfully');
      setEditingTask(null);
      fetchTasks();
    } catch { showToast('Failed to update task', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      showToast('Task deleted');
      fetchTasks();
    } catch { showToast('Failed to delete task', 'error'); }
  };

  const filtered = tasks.filter((t) => {
    const matchFilter = filter === 'ALL' || t.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || t.title.toLowerCase().includes(q) ||
      (t.description || '').toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = {
    ALL:         tasks.length,
    TODO:        tasks.filter(t => t.status === 'TODO').length,
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    DONE:        tasks.filter(t => t.status === 'DONE').length,
  };

  const pct = tasks.length ? Math.round((counts.DONE / tasks.length) * 100) : 0;

  return (
    <div className="wo-db">
      <Navbar
        user={user}
        search={search}
        onSearch={setSearch}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
      />
      <div className="wo-page-body">
        {/* ── Left column (70%) ── */}
        <main className="wo-main">

          {/* Greeting */}
          <div className="wo-greeting">
            <div className="wo-greeting-text">
              <h1 className="wo-greeting-title">
                {getGreeting()}, {user.name?.split(' ')[0]} 👋
              </h1>
              <p className="wo-greeting-sub">
                {loading
                  ? 'Loading your workspace…'
                  : counts.ALL === 0
                    ? 'No tasks yet — create your first one'
                    : `Here's what's on your plate today`}
              </p>
            </div>
            <button className="wo-new-btn" onClick={() => setShowModal(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Task
            </button>
          </div>
          {/* Stats */}
          <div className="wo-stats">
            <StatsCard label="Total Tasks"  value={counts.ALL}         icon="📋" color="#7C3AED" pct={pct} />
            <StatsCard label="To Do"        value={counts.TODO}        icon="○"  color="#6B7280" />
            <StatsCard label="In Progress"  value={counts.IN_PROGRESS} icon="◑"  color="#F59E0B" />
            <StatsCard label="Done"         value={counts.DONE}        icon="●"  color="#22C55E" />
          </div>

          {/* Controls */}
          <div className="wo-controls">
            <select className="wo-filter" value={filter} onChange={e => setFilter(e.target.value)}>
              {FILTERS.map(f => (
                <option key={f.value} value={f.value}>
                  {f.label} ({counts[f.value] ?? counts.ALL})
                </option>
              ))}
            </select>
            <span className="wo-result-count">
              {filtered.length} {filtered.length === 1 ? 'task' : 'tasks'}
              {search && <> matching "<em>{search}</em>"</>}
            </span>
          </div>

          {/* Task content */}
          {loading ? (
            <div className="wo-center">
              <div className="wo-spinner" />
              <p className="wo-loading-txt">Loading tasks…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="wo-empty">
              <div className="wo-empty-icon">🚀</div>
              <p className="wo-empty-title">No tasks yet</p>
              <p className="wo-empty-sub">
                {search ? 'Try a different search term' : 'Create your first task to get started'}
              </p>
              {!search && (
                <button className="wo-new-btn" onClick={() => setShowModal(true)}>
                  + New Task
                </button>
              )}
            </div>
          ) : (
            <div className="wo-grid">
              {filtered.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  currentUser={user}
                  onEdit={setEditingTask}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>

        {/* ── Right column (30%) — sticky activity panel ── */}
        <aside className="wo-sidebar">
          <div className="wo-sidebar-sticky">
            <RecentActivity />
          </div>
        </aside>

      </div>

      {showModal && (
        <TaskModal task={null} onClose={() => setShowModal(false)} onSubmit={handleCreate} />
      )}
      {editingTask && (
        <TaskModal task={editingTask} onClose={() => setEditingTask(null)} onSubmit={handleUpdate} />
      )}

      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
    </div>
  );
}
