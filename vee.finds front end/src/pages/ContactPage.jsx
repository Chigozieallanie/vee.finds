import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMessages } from '../contexts/MessagesContext'

export default function ContactPage() {
  const { isAuthenticated, user } = useAuth()
  const { sendMessage } = useMessages()
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedBody = body.trim()
    const contactEmail = isAuthenticated ? user.email : email.trim()
    const trimmedPhone = phone.trim()

    if (!contactEmail) {
      setStatus('Please provide your email address so we can respond.')
      return
    }

    if (!trimmedBody) {
      setStatus('Please write your message before sending.')
      return
    }

    sendMessage({
      email: contactEmail,
      phone: trimmedPhone,
      subject: subject.trim() || 'General request',
      body: trimmedBody,
      status: 'Sent',
    })

    setStatus('Your message has been submitted. We will respond soon.')
    setSubject('')
    setBody('')
    setPhone('')
    if (!isAuthenticated) {
      setEmail('')
    }

    setTimeout(() => {
      navigate('/communications')
    }, 700)
  }

  return (
    <section className="contact-card">
      <h1 className="page-title">Contact us</h1>
      <p className="footer-note">
        Send us a message about your order, products, or any help you need.
      </p>
      {status && <div className="success">{status}</div>}
      <form onSubmit={handleSubmit}>
        {!isAuthenticated && (
          <div className="input-group">
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
            />
          </div>
        )}

        {isAuthenticated && (
          <div className="input-group">
            <label>Logged in as</label>
            <div className="footer-note">{user.email}</div>
          </div>
        )}

        <div className="input-group">
          <label htmlFor="phone">Your phone number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="07XX XXX XXX"
          />
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

        <button type="submit" className="button button-primary">
          Send message
        </button>
      </form>
    </section>
  )
}