import { useState } from 'react'
import { useSettings } from '../contexts/SettingsContext'
import './OwnerSettingsPage.css'

export default function OwnerSettingsPage() {
  const { ownerEmail, setOwnerEmail } = useSettings()
  const [email, setEmail] = useState(ownerEmail)
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) {
      setStatus('Enter a valid owner email.')
      return
    }
    setOwnerEmail(email.trim())
    setStatus('Owner email updated successfully.')
  }

  return (
    <section className="contact-card">
      <h1 className="page-title">Owner settings</h1>
      {status && <div className="success">{status}</div>}
      <form onSubmit={handleSubmit} className="form-card">
        <div className="input-group">
          <label htmlFor="owner-email">Owner email</label>
          <input
            id="owner-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="owner@example.com"
          />
        </div>
        <button type="submit" className="button button-primary">
          Save owner email
        </button>
      </form>
    </section>
  )
}
