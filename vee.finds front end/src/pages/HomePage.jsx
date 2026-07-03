import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()
  const { notification } = useAuth()

  return (
    <div className="home-wrapper">
      <section className="page-hero">
        <div className="hero-panel hero-panel-main">
          <img src="/logo.jpeg" alt="VeeFinds" className="hero-logo" />
          <p className="eyebrow">find it. love it. bag it.</p>
          <h1 className="page-title">Welcome to VeeFinds</h1>
          <p className="hero-copy">
            Discover premium bags, accessories, and curated travel essentials. Sign up
            to receive a verification code and unlock your shopping experience.
          </p>

          <div className="card-actions">
            <button className="button button-primary" onClick={() => navigate('/signup')}>
              Get started
            </button>
            <button className="button button-outline" onClick={() => navigate('/products')}>
              Browse products
            </button>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>Secure signup</h3>
              <p>Email notification and SMS verification built in.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🛍️</span>
              <h3>Product-driven cart</h3>
              <p>Select quantity, add items, and manage your bag easily.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💬</span>
              <h3>Contact page</h3>
              <p>Send your communications directly through the site.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">✨</span>
              <h3>Shop your style</h3>
              <p>Showcase your bag images with prices, descriptions, and details.</p>
            </div>
          </div>
        </div>

        <div className="hero-panel hero-panel-side">
          <div className="notice-card">
            <span className="notice-badge">Quick start</span>
            <h3>Ready when you are</h3>
            <p>{notification || 'Create an account, verify your phone, then shop bags and accessories.'}</p>
            <ol className="notice-steps">
              <li>Sign up with your email &amp; phone</li>
              <li>Enter the 6-digit activation code</li>
              <li>Log in and start shopping</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}