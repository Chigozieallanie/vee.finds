import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useMessages } from '../contexts/MessagesContext'
import ChatThread from '../components/ChatThread'

export default function CommunicationsPage() {
  const { user } = useAuth()
  const { getMessagesForUser } = useMessages()

  const messages = useMemo(
    () => getMessagesForUser(user.email),
    [getMessagesForUser, user.email],
  )

  return (
    <section className="contact-card">
      <h1 className="page-title">My communications</h1>
      <p className="footer-note">
        Find your replies & messages here.
      </p>

      {messages.length ? (
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
      )}
    </section>
  )
}
