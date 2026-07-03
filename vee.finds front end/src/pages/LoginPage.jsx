import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, notification, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/products'

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email) {
      setError('Enter your email to login.')
      return
    }
    if (!user?.isVerified) {
      setError('Please verify your account before logging in.')
      return
    }
    setError('')
    setSubmitting(true)
    login(email)
    navigate(from, { replace: true })
  }

  return (
    <div className="login-wrapper">
      <section className="form-card">
        <div className="form-card-badge">
          <img src="/logo.jpeg" alt="VeeFinds" />
        </div>

        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">find it. love it. bag it.</p>

        {notification && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            {notification}
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">!</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login-email">Email address</label>
            <div className="input-field">
              <span className="input-icon">✉</span>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoFocus
              />
            </div>
          </div>

          <button type="submit" className="button button-primary" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Login to shop'}
          </button>
        </form>

        <p className="form-footer">
          New to VeeFinds? <Link to="/signup" className="form-link">Create an account</Link>
        </p>
      </section>
    </div>
  )
}