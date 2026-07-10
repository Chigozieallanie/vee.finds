import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMessages } from '../contexts/MessagesContext'
import ChatThread from '../components/ChatThread'

export default function CommunicationsPage() {
  const { user } = useAuth()
  const { getMessagesForUser } = useMessages()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadMessages() {
      setLoading(true)
      setError('')
      try {
        const data = await getMessagesForUser(user.username)
        if (isMounted) {
          setMessages(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Could not load your messages.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadMessages()

    return () => {
      isMounted = false
    }
  }, [getMessagesForUser, user.username])

  return (
    <section className="contact-card">
      <h1 className="page-title">My communications</h1>
      <p className="footer-note">
        Find your replies & messages here.
      </p>

      {loading && <div className="alert">Loading your messages…</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        messages.length ? (
          <ChatThread messages={messages} />
        ) : (
          <div className="notice-card">
            <h2>No messages yet</h2>
            <p>
              Start a conversation from the contact page. Your messages will appear here so
              you can track replies.
            </p>
            <Link to="/contact" className="button button-primary">
              Send a message
            </Link>
          </div>
        )
      )}
    </section>
  )
}