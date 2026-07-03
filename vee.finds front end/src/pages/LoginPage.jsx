import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
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
    if (!user.isVerified) {
      setError('Please verify your account before logging in.')
      return
    }
    login(email)
    setError('')
    navigate(from, { replace: true })
  }

  return (
    <section className="form-card">
      <h1 className="page-title">Login</h1>
      {notification && <div className="success">{notification}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <button type="submit" className="button button-primary">
          Login to shop
        </button>
      </form>
    </section>
  )
}
