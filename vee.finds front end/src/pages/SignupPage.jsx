import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './SignupPage.css'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { registerUser, notification } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email || !phone) {
      setError('Please enter both email and phone number.')
      return
    }
    setError('')
    setSubmitting(true)
    registerUser({ email, phone })
    navigate('/verify')
  }

  return (
    <div className="signup-wrapper">
      <section className="form-card">
        <div className="form-card-badge">
          <img src="/logo.jpeg" alt="VeeFinds" />
        </div>

        <h1 className="page-title">Create your account</h1>
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
            <label htmlFor="email">Email address</label>
            <div className="input-field">
              <span className="input-icon">✉</span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone number</label>
            <div className="input-field">
              <span className="input-icon">☎</span>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="08123456789"
              />
            </div>
          </div>

          <button type="submit" className="button button-primary" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send activation code'}
          </button>
        </form>

        <p className="form-footer">
          We'll text a 6-digit code to verify your number.
        </p>
      </section>
    </div>
  )
}