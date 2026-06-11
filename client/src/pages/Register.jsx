import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join Task Manager today</p>
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password'].map((field) => (
            <div key={field} style={styles.field}>
              <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                style={styles.input}
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                placeholder={field === 'name' ? 'Your Name ' : field === 'email' ? 'you@example.com' : '••••••'}
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                required
              />
            </div>
          ))}
          <button style={styles.btn} disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p style={styles.link}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' },
  card: { background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: '100%', maxWidth: '420px' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a2e', textAlign: 'center' },
  subtitle: { color: '#666', textAlign: 'center', marginBottom: '1.8rem', marginTop: '0.3rem' },
  field: { marginBottom: '1.2rem' },
  label: { display: 'block', marginBottom: '0.4rem', fontWeight: '500', fontSize: '0.9rem' },
  input: { width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', outline: 'none' },
  btn: { width: '100%', padding: '0.85rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem' },
  link: { textAlign: 'center', marginTop: '1.2rem', color: '#666', fontSize: '0.9rem' },
};