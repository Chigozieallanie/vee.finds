import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getAssetUrl } from '../utils/assets'
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate()
  const { notification } = useAuth()

  return (
    <div className="home-wrapper">
      {/* ---- HERO ---- */}
      <section className="hero-split">
        <div className="hero-text">
          <span className="hero-kicker">✨ New Season Drop</span>
          <h1 className="hero-headline">
            Bags that turn <span className="highlight">heads</span>,
            not just heels.
          </h1>
          <p className="hero-sub">
            Hand-picked, premium bags for every mood and moment.
            Find it. Love it. Bag it.
          </p>

          <div className="hero-cta-row">
            <button className="button button-primary" onClick={() => navigate('/signup')}>
              Get started — it's free
            </button>
            <button className="button button-outline" onClick={() => navigate('/products')}>
              Browse the collection
            </button>
          </div>

          <div className="hero-trust-row">
            <div className="trust-item">
              <strong>1,200+</strong>
              <span>happy customers</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <strong>4.9★</strong>
              <span>average rating</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <strong>100%</strong>
              <span>authentic pieces</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img src={getAssetUrl('hero-bag.jpg')} alt="Model carrying a VeeFinds bag" />
            <div className="floating-badge badge-top">
              <span className="badge-icon">🔥</span>
              <div>
                <strong>Trending Now</strong>
                <p>Chain-detail hobo bag</p>
              </div>
            </div>
            <div className="floating-badge badge-bottom">
              <span className="badge-icon">⭐</span>
              <div>
                <strong>4.9 / 5</strong>
                <p>from 340 reviews</p>
              </div>
            </div>
          </div>
          <div className="hero-blob" />
        </div>
      </section>

      {/* ---- QUICK NOTICE (kept from before) ---- */}
      {notification && (
        <div className="hero-notification">
          <span className="alert-icon">✓</span>
          {notification}
        </div>
      )}

      {/* ---- HOW IT WORKS ---- */}
      <section className="how-it-works">
        <h2 className="section-title">Getting your bag is easy</h2>
        <div className="steps-row">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Sign up</h3>
            <p>Enter your email &amp; phone — we'll text you a verification code.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Browse &amp; pick</h3>
            <p>Explore real bags with real prices, sizes, and descriptions.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Bag it</h3>
            <p>Add to cart, checkout, and message us anytime you need help.</p>
          </div>
        </div>
      </section>

      {/* ---- FEATURE GRID ---- */}
      <section className="feature-section">
        <h2 className="section-title">Why shop with VeeFinds</h2>
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
            <h3>Direct communication</h3>
            <p>Send your questions straight through the site — no waiting.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">✨</span>
            <h3>Shop your style</h3>
            <p>Real bag photos, honest prices, and full descriptions.</p>
          </div>
        </div>
      </section>

      {/* ---- FINAL CTA BANNER ---- */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Your next favorite bag is one tap away</h2>
          <p>Join VeeFinds today and shop pieces picked for people with taste.</p>
          <button className="button button-light" onClick={() => navigate('/signup')}>
            Create your account
          </button>
        </div>
      </section>
    </div>
  )
}