import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { ADMIN_INBOX_ROUTE } from '../config.js'
import NotificationBell from './NotificationBell'

export default function Header() {
  const { isAuthenticated, isOwner, user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()

  return (
    <header className="site-header">
      <div className="brand">
        <NavLink to="/">VeeFinds</NavLink>
      </div>
      <nav className="site-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/bags">Bags</NavLink>
        <NavLink to="/bag-accessories">Bag Accessories</NavLink>
        <NavLink to="/gift-packages">Gift Packages</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {isAuthenticated && <NavLink to="/communications">Communications</NavLink>}
        {isOwner && <>
          <NavLink to={ADMIN_INBOX_ROUTE}>Inbox</NavLink>
          <NavLink to="/admin/settings">Owner settings</NavLink>
        </>}
      </nav>
      <div className="header-actions">
        {isAuthenticated ? (
          <>
            <NotificationBell forEmail={isOwner ? 'ADMIN' : user.email} />
            <span className="user-chip">{user.email || 'Member'}</span>
            <button className="button button-secondary" onClick={() => navigate('/cart')}>
              Cart ({items.length})
            </button>
            <button className="button button-outline" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="button button-outline" onClick={() => navigate('/signup')}>
              Sign up
            </button>
            <button className="button button-primary" onClick={() => navigate('/login')}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  )
}