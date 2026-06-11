import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';

const STATUSES = ['Pending', 'In Progress', 'Completed'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending', priority: 'Medium' });

  const fetchTasks = () => API.get('/tasks').then(({ data }) => setTasks(data.tasks));
  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, form);
        toast.success('Task updated!');
      } else {
        await API.post('/tasks', form);
        toast.success('Task created!');
      }
      setShowForm(false); setEditTask(null);
      setForm({ title: '', description: '', status: 'Pending', priority: 'Medium' });
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await API.delete(`/tasks/${id}`);
    toast.success('Task deleted');
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setForm({ title: task.title, description: task.description, status: task.status, priority: task.priority });
    setShowForm(true);
  };

  const priorityColor = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };
  const statusColor = { Pending: '#f59e0b', 'In Progress': '#3b82f6', Completed: '#10b981' };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Link to="/dashboard" style={styles.back}>← Dashboard</Link>
        <h2 style={styles.title}>My Tasks</h2>
        <button onClick={() => { setShowForm(true); setEditTask(null); setForm({ title: '', description: '', status: 'Pending', priority: 'Medium' }); }} style={styles.addBtn}>
          + New Task
        </button>
      </div>

      {showForm && (
        <div style={styles.formCard}>
          <h3 style={{ marginBottom: '1rem' }}>{editTask ? 'Edit Task' : 'New Task'}</h3>
          <form onSubmit={handleSubmit}>
            <input style={styles.input} placeholder="Task title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <textarea style={{ ...styles.input, height: '80px', resize: 'vertical' }} placeholder="Description (optional)" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <div style={styles.row}>
              <select style={styles.select} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
              <select style={styles.select} value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                {PRIORITIES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div style={styles.row}>
              <button style={styles.saveBtn} type="submit">{editTask ? 'Update' : 'Create'}</button>
              <button style={styles.cancelBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.taskList}>
        {tasks.length === 0 && <p style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>No tasks yet. Create your first one!</p>}
        {tasks.map(task => (
          <div key={task._id} style={styles.taskCard}>
            <div style={styles.taskTop}>
              <h3 style={styles.taskTitle}>{task.title}</h3>
              <div style={styles.badges}>
                <span style={{ ...styles.badge, background: statusColor[task.status] + '22', color: statusColor[task.status] }}>{task.status}</span>
                <span style={{ ...styles.badge, background: priorityColor[task.priority] + '22', color: priorityColor[task.priority] }}>{task.priority}</span>
              </div>
            </div>
            {task.description && <p style={styles.taskDesc}>{task.description}</p>}
            <div style={styles.taskActions}>
              <button onClick={() => handleEdit(task)} style={styles.editBtn}>Edit</button>
              <button onClick={() => handleDelete(task._id)} style={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5', padding: '1.5rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' },
  back: { color: '#4f46e5', textDecoration: 'none', fontWeight: '500' },
  title: { fontSize: '1.5rem', color: '#1a1a2e' },
  addBtn: { padding: '0.6rem 1.4rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600' },
  formCard: { background: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  input: { width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', marginBottom: '0.8rem', display: 'block' },
  row: { display: 'flex', gap: '0.8rem', marginBottom: '0.8rem' },
  select: { flex: 1, padding: '0.7rem', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '0.95rem' },
  saveBtn: { flex: 1, padding: '0.75rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600' },
  cancelBtn: { flex: 1, padding: '0.75rem', background: '#f3f4f6', color: '#555', border: 'none', borderRadius: '8px', fontWeight: '600' },
  taskList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  taskCard: { background: '#fff', borderRadius: '12px', padding: '1.2rem 1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  taskTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  taskTitle: { fontSize: '1.05rem', fontWeight: '600', color: '#1a1a2e' },
  badges: { display: 'flex', gap: '0.5rem' },
  badge: { padding: '0.2rem 0.7rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' },
  taskDesc: { color: '#666', fontSize: '0.9rem', marginBottom: '0.8rem' },
  taskActions: { display: 'flex', gap: '0.6rem' },
  editBtn: { padding: '0.35rem 1rem', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '6px', fontWeight: '600' },
  deleteBtn: { padding: '0.35rem 1rem', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', fontWeight: '600' },
};