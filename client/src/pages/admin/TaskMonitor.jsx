import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import toast from 'react-hot-toast';

export default function TaskMonitor() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => API.get('/admin/tasks').then(({ data }) => setTasks(data.tasks));
  useEffect(() => { fetchTasks(); }, []);

  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await API.delete(`/admin/tasks/${id}`);
    toast.success('Task deleted');
    fetchTasks();
  };

  const statusColor = { Pending: '#f59e0b', 'In Progress': '#3b82f6', Completed: '#10b981' };
  const priorityColor = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Link to="/admin" style={styles.back}>← Admin Dashboard</Link>
        <h2 style={styles.title}>Task Monitor</h2>
      </div>
      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Title</span><span>User</span><span>Status</span><span>Priority</span><span>Created</span><span>Action</span>
        </div>
        {tasks.length === 0 && <p style={styles.empty}>No tasks found.</p>}
        {tasks.map(task => (
          <div key={task._id} style={styles.row}>
            <span style={styles.cell}>{task.title}</span>
            <span style={styles.cellMuted}>{task.userId?.name || 'Unknown'}</span>
            <span style={{ ...styles.badge, background: (statusColor[task.status] || '#888') + '22', color: statusColor[task.status] || '#888' }}>{task.status}</span>
            <span style={{ ...styles.badge, background: (priorityColor[task.priority] || '#888') + '22', color: priorityColor[task.priority] || '#888' }}>{task.priority}</span>
            <span style={styles.cellMuted}>{new Date(task.createdAt).toLocaleDateString()}</span>
            <button onClick={() => deleteTask(task._id)} style={styles.deleteBtn}>Delete</button>
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
  tableHeader: { display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr 1fr 0.7fr', padding: '0.9rem 1.5rem', background: '#f8f9fa', fontWeight: '600', fontSize: '0.85rem', color: '#888' },
  row: { display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr 1fr 0.7fr', padding: '0.9rem 1.5rem', borderTop: '1px solid #f0f0f0', alignItems: 'center' },
  cell: { fontSize: '0.9rem', color: '#333' },
  cellMuted: { fontSize: '0.88rem', color: '#666' },
  badge: { padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', width: 'fit-content' },
  deleteBtn: { padding: '0.3rem 0.8rem', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.82rem' },
  empty: { padding: '2rem', textAlign: 'center', color: '#888' },
};