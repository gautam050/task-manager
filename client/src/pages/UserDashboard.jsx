import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    API.get('/tasks').then(({ data }) => {
      const tasks = data.tasks;
      setStats({
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'Pending').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length,
        completed: tasks.filter(t => t.status === 'Completed').length,
      });
    });
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.logo}>Task Manager</h1>
        <div style={styles.headerRight}>
          <span style={styles.welcome}>Hi, {user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>My Dashboard</h2>

        <div style={styles.statsGrid}>
          {[
            { label: 'Total Tasks', value: stats.total, color: '#4f46e5' },
            { label: 'Pending', value: stats.pending, color: '#f59e0b' },
            { label: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
            { label: 'Completed', value: stats.completed, color: '#10b981' },
          ].map(s => (
            <div key={s.label} style={{ ...styles.statCard, borderTop: `4px solid ${s.color}` }}>
              <div style={{ ...styles.statNum, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={styles.actions}>
          <Link to="/tasks" style={styles.actionBtn}>View My Tasks</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  header: { background: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  logo: { color: '#4f46e5', fontSize: '1.4rem' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  welcome: { color: '#555', fontSize: '0.95rem' },
  logoutBtn: { padding: '0.4rem 1rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', fontWeight: '600' },
  content: { padding: '2rem' },
  pageTitle: { fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1a1a2e' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', marginBottom: '2rem' },
  statCard: { background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  statNum: { fontSize: '2.2rem', fontWeight: '700' },
  statLabel: { color: '#888', marginTop: '0.3rem', fontSize: '0.9rem' },
  actions: { display: 'flex', gap: '1rem' },
  actionBtn: { padding: '0.75rem 1.8rem', background: '#4f46e5', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' },
};