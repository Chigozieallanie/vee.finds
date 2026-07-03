import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function VerifyPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const { verifyCode, notification } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (verifyCode(code)) {
      setError('')
      navigate('/login')
    } else {
      setError('Invalid activation code. Use 123456.')
    }
  }

  return (
    <section className="form-card">
      <h1 className="page-title">Activate your account</h1>
      {notification && <div className="alert">{notification}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="activation">Activation code</label>
          <input
            id="activation"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="123456"
          />
        </div>
        <button type="submit" className="button button-primary">
          Verify phone
        </button>
      </form>
    </section>
  )
}
