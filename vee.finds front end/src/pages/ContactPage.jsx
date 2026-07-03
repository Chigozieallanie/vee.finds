import { useState } from 'react'

export default function ContactPage() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!message.trim()) {
      setStatus('Please write your message before sending.')
      return
    }
    setStatus('Your message has been saved. We will respond soon.')
    setMessage('')
  }

  return (
    <section className="contact-card">
      <h1 className="page-title">Contact us</h1>
      {status && <div className="success">{status}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
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
