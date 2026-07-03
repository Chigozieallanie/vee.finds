import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { ADMIN_INBOX_ROUTE } from '../config.js'

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
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {isAuthenticated && <NavLink to="/communications">Communications</NavLink>}
        {isOwner && <NavLink to={ADMIN_INBOX_ROUTE}>Inbox</NavLink>}
      </nav>
      <div className="header-actions">
        {isAuthenticated ? (
          <>
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
