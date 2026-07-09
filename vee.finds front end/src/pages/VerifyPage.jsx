import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getAssetUrl } from '../utils/assets'
import './VerifyPage.css'

export default function VerifyPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const { verifyCode, resendCode, notification } = useAuth()
  const navigate = useNavigate()

  const handleCodeChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(digitsOnly)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    const success = await verifyCode(code)
    setSubmitting(false)

    if (success) {
      setError('')
      navigate('/login')
    } else {
      setError('Invalid or expired activation code. Please try again.')
    }
  }

  const handleResend = async () => {
    setResending(true)
    setError('')
    await resendCode()
    setResending(false)
  }

  return (
    <div className="verify-wrapper">
      <section className="form-card">
        <div className="form-card-badge">
          <img src={getAssetUrl('logo.jpeg')} alt="VeeFinds" />
        </div>

        <h1 className="page-title">Activate your account</h1>
        <p className="page-subtitle">Enter the 6-digit code we texted you</p>

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
            <label htmlFor="activation">Activation code</label>
            <input
              id="activation"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={handleCodeChange}
              placeholder="• • • • • •"
              className="otp-input"
              maxLength={6}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="button button-primary"
            disabled={submitting || code.length < 6}
          >
            {submitting ? 'Verifying…' : 'Verify phone'}
          </button>
        </form>

        <p className="form-footer">
          Didn't get a code?{' '}
          <button
            type="button"
            className="form-link-btn"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? 'Resending…' : 'Resend code'}
          </button>
        </p>
      </section>
    </div>
  )
}