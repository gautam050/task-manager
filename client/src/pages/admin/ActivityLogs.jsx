import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get('/admin/logs').then(({ data }) => setLogs(data.logs));
  }, []);

  const actionColor = {
    LOGIN: '#3b82f6', REGISTER: '#10b981',
    TASK_CREATED: '#8b5cf6', TASK_UPDATED: '#f59e0b',
    TASK_DELETED: '#ef4444', USER_DELETED: '#ef4444',
    USER_STATUS_UPDATED: '#f97316',
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Link to="/admin" style={styles.back}>← Admin Dashboard</Link>
        <h2 style={styles.title}>Activity Logs</h2>
      </div>
      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>User</span><span>Action</span><span>Details</span><span>Time</span>
        </div>
        {logs.length === 0 && <p style={styles.empty}>No logs found.</p>}
        {logs.map(log => (
          <div key={log._id} style={styles.row}>
            <span style={styles.cell}>{log.userId?.name || 'Unknown'}</span>
            <span style={{ ...styles.badge, background: (actionColor[log.action] || '#888') + '22', color: actionColor[log.action] || '#888' }}>
              {log.action}
            </span>
            <span style={styles.cell}>{log.details}</span>
            <span style={styles.cellMuted}>{new Date(log.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5', padding: '1.5rem' },
  header: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' },
  back: { color: '#4f46e5', textDecoration: 'none', fontWeight: '500' },
  title: { fontSize: '1.5rem', color: '#1a1a2e' },
  table: { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' },
  tableHeader: { display: 'grid', gridTemplateColumns: '1fr 1.2fr 2fr 1.2fr', padding: '0.9rem 1.5rem', background: '#f8f9fa', fontWeight: '600', fontSize: '0.85rem', color: '#888' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1.2fr 2fr 1.2fr', padding: '0.9rem 1.5rem', borderTop: '1px solid #f0f0f0', alignItems: 'center' },
  cell: { fontSize: '0.9rem', color: '#333' },
  cellMuted: { fontSize: '0.85rem', color: '#888' },
  badge: { padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '600', width: 'fit-content' },
  empty: { padding: '2rem', textAlign: 'center', color: '#888' },
};