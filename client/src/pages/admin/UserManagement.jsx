import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import toast from 'react-hot-toast';

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => API.get('/admin/users').then(({ data }) => setUsers(data.users));
  useEffect(() => { fetchUsers(); }, []);

  const toggleStatus = async (id, current) => {
    const newStatus = current === 'Active' ? 'Inactive' : 'Active';
    await API.patch(`/admin/users/${id}/status`, { status: newStatus });
    toast.success(`User ${newStatus.toLowerCase()}`);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    await API.delete(`/admin/users/${id}`);
    toast.success('User deleted');
    fetchUsers();
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Link to="/admin" style={styles.back}>← Admin Dashboard</Link>
        <h2 style={styles.title}>User Management</h2>
      </div>
      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Name</span><span>Email</span><span>Role</span><span>Status</span><span>Actions</span>
        </div>
        {users.map(u => (
          <div key={u._id} style={styles.row}>
            <span style={styles.cell}>{u.name}</span>
            <span style={styles.cellMuted}>{u.email}</span>
            <span style={{ ...styles.badge, background: u.role === 'Admin' ? '#4f46e522' : '#e0e7ff', color: u.role === 'Admin' ? '#4f46e5' : '#555' }}>{u.role}</span>
            <span style={{ ...styles.badge, background: u.status === 'Active' ? '#d1fae5' : '#fee2e2', color: u.status === 'Active' ? '#10b981' : '#ef4444' }}>{u.status}</span>
            <div style={styles.actions}>
              <button onClick={() => toggleStatus(u._id, u.status)} style={u.status === 'Active' ? styles.warnBtn : styles.successBtn}>
                {u.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => deleteUser(u._id)} style={styles.deleteBtn}>Delete</button>
            </div>
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
  tableHeader: { display: 'grid', gridTemplateColumns: '1fr 1.5fr 0.7fr 0.7fr 1.2fr', padding: '0.9rem 1.5rem', background: '#f8f9fa', fontWeight: '600', fontSize: '0.85rem', color: '#888' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1.5fr 0.7fr 0.7fr 1.2fr', padding: '0.9rem 1.5rem', borderTop: '1px solid #f0f0f0', alignItems: 'center' },
  cell: { fontSize: '0.9rem', color: '#333' },
  cellMuted: { fontSize: '0.88rem', color: '#666' },
  badge: { padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', width: 'fit-content' },
  actions: { display: 'flex', gap: '0.5rem' },
  warnBtn: { padding: '0.3rem 0.8rem', background: '#fff7ed', color: '#f97316', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.82rem' },
  successBtn: { padding: '0.3rem 0.8rem', background: '#d1fae5', color: '#10b981', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.82rem' },
  deleteBtn: { padding: '0.3rem 0.8rem', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.82rem' },
};