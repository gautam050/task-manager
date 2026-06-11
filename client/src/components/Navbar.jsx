import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const userLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/tasks', label: 'My Tasks' },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/tasks', label: 'Tasks' },
    { to: '/admin/logs', label: 'Activity Logs' },
  ];

  const links = user?.role === 'Admin' ? adminLinks : userLinks;

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>
          TaskManager
          {user?.role === 'Admin' && (
            <span style={styles.adminBadge}>Admin</span>
          )}
        </span>
        <div style={styles.links}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...styles.link,
                ...(isActive(link.to) ? styles.activeLink : {}),
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={styles.userText}>
            <span style={styles.userName}>{user?.name}</span>
            <span style={styles.userRole}>{user?.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#fff',
    padding: '0 2rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
  },
  logo: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#4f46e5',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  adminBadge: {
    fontSize: '0.7rem',
    background: '#4f46e5',
    color: '#fff',
    padding: '0.15rem 0.5rem',
    borderRadius: '20px',
    fontWeight: '600',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  link: {
    padding: '0.45rem 1rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '0.92rem',
    fontWeight: '500',
    color: '#555',
    transition: 'all 0.15s',
  },
  activeLink: {
    background: '#eff6ff',
    color: '#4f46e5',
    fontWeight: '600',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#4f46e5',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.95rem',
  },
  userText: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#1a1a2e',
    lineHeight: 1.2,
  },
  userRole: {
    fontSize: '0.75rem',
    color: '#888',
    lineHeight: 1.2,
  },
  logoutBtn: {
    padding: '0.4rem 1.1rem',
    background: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.88rem',
  },
};