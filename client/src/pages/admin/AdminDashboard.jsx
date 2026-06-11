import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, tasks: 0, completed: 0, pending: 0 });

  useEffect(() => {
    Promise.all([
      API.get('/admin/users'),
      API.get('/admin/tasks'),
    ]).then(([usersRes, tasksRes]) => {
      const users = usersRes.data.users;
      const tasks = tasksRes.data.tasks;
      setStats({
        users: users.length,
        tasks: tasks.length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        pending: tasks.filter(t => t.status === 'Pending').length,
      });
    });
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.logo}>Task Manager — Admin</h1>
        <div style={styles.headerRight}>
          <span style={styles.welcome}>Hi, {user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>Admin Dashboard</h2>

        <div style={styles.statsGrid}>
          {[
            { label: 'Total Users', value: stats.users, color: '#4f46e5' },
            { label: 'Total Tasks', value: stats.tasks, color: '#3b82f6' },
            { label: 'Completed', value: stats.completed, color: '#10b981' },
            { label: 'Pending', value: stats.pending, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ ...styles.statCard, borderTop: `4px solid ${s.color}` }}>
              <div style={{ ...styles.statNum, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={styles.navGrid}>
          {[
            { to: '/admin/users', label: 'User Management', desc: 'View, activate, deactivate, delete users', color: '#4f46e5' },
            { to: '/admin/tasks', label: 'Task Monitor', desc: 'View all tasks created by users', color: '#3b82f6' },
            { to: '/admin/logs', label: 'Activity Logs', desc: 'Track all login and task activity', color: '#8b5cf6' },
          ].map(item => (
            <Link key={item.to} to={item.to} style={{ ...styles.navCard, borderLeft: `4px solid ${item.color}` }}>
              <h3 style={{ color: item.color, marginBottom: '0.4rem' }}>{item.label}</h3>
              <p style={styles.navDesc}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  header: { background: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  logo: { color: '#4f46e5', fontSize: '1.3rem' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  welcome: { color: '#555', fontSize: '0.95rem' },
  logoutBtn: { padding: '0.4rem 1rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', fontWeight: '600' },
  content: { padding: '2rem' },
  pageTitle: { fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1a1a2e' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem', marginBottom: '2rem' },
  statCard: { background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  statNum: { fontSize: '2.2rem', fontWeight: '700' },
  statLabel: { color: '#888', marginTop: '0.3rem', fontSize: '0.9rem' },
  navGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' },
  navCard: { background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textDecoration: 'none' },
  navDesc: { color: '#888', fontSize: '0.9rem' },
};