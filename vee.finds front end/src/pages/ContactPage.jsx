import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMessages } from '../contexts/MessagesContext'

export default function ContactPage() {
  const { user } = useAuth()
  const { sendMessage } = useMessages()
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedBody = body.trim()

    if (!trimmedBody) {
      setError('Please write your message before sending.')
      return
    }

    setError('')
    setSubmitting(true)

    try {
      await sendMessage({
        subject: subject.trim() || 'General request',
        body: trimmedBody,
      })

      setStatus('Your message has been submitted. We will respond soon.')
      setSubject('')
      setBody('')

      setTimeout(() => {
        navigate('/communications')
      }, 700)
    } catch (err) {
      setError(err.message || 'Could not send your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact-card">
      <h1 className="page-title">Contact us</h1>
      <p className="footer-note">
        Send us a message about your order, products, or any help you need.
      </p>
      {status && <div className="success">{status}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Logged in as</label>
          <div className="footer-note">{user.email}</div>
        </div>

        <div className="input-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Order update, product question, shipping, etc."
          />
        </div>

        <div className="input-group">
          <label htmlFor="body">Your message</label>
          <textarea
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Tell us about your order, request, or question"
          />
        </div>

        <button type="submit" className="button button-primary" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </section>
  )
}