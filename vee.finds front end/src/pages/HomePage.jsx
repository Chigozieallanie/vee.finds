import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { notification } = useAuth()

  return (
    <section className="page-hero">
      <div className="hero-panel">
        <p className="page-title">Welcome to VeeFinds</p>
        <p>
          Discover premium bags, accessories, and curated travel essentials. Sign up
          to receive a verification code and unlock your shopping experience.
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Secure signup</h3>
            <p>Email notification and SMS verification built in.</p>
          </div>
          <div className="feature-card">
            <h3>Product-driven cart</h3>
            <p>Select quantity, add items, and manage your bag easily.</p>
          </div>
          <div className="feature-card">
            <h3>Contact page</h3>
            <p>Send your communications directly through the site.</p>
          </div>
          <div className="feature-card">
            <h3>Shop your style</h3>
            <p>Showcase your bag images with prices, descriptions, and details.</p>
          </div>
        </div>
        <div className="card-actions">
          <button className="button button-primary" onClick={() => navigate('/signup')}>
            Get started
          </button>
          <button className="button button-outline" onClick={() => navigate('/products')}>
            Browse products
          </button>
        </div>
      </div>
      <div className="hero-panel">
        <div className="notice-card">
          <h3>Quick start</h3>
          <p>{notification || 'Create an account, verify your phone, then shop bags and accessories.'}</p>
        </div>
      </div>
    </section>
  )
}
