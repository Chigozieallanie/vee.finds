import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const { registerUser, notification } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email || !phone) {
      setError('Please enter both email and phone number.')
      return
    }
    setError('')
    registerUser({ email, phone })
    navigate('/verify')
  }

  return (
    <section className="form-card">
      <h1 className="page-title">Create your account</h1>
      {notification && <div className="success">{notification}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="08123456789"
          />
        </div>
        <button type="submit" className="button button-primary">
          Send activation code
        </button>
      </form>
    </section>
  )
}
