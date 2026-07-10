import { useEffect, useState, useCallback } from 'react'
import { useMessages } from '../contexts/MessagesContext'
import ChatThread from '../components/ChatThread'

export default function AdminInboxPage() {
  const { getThreads, getMessagesForUser, sendMessage } = useMessages()
  const [threads, setThreads] = useState([])
  const [selectedEmail, setSelectedEmail] = useState('')
  const [selectedMessages, setSelectedMessages] = useState([])
  const [replyBody, setReplyBody] = useState('')
  const [loadingThreads, setLoadingThreads] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const loadThreads = useCallback(async () => {
    setLoadingThreads(true)
    setError('')
    try {
      const data = await getThreads()
      setThreads(data)
      if (!selectedEmail && data.length) {
        setSelectedEmail(data[0].email)
      }
    } catch (err) {
      setError(err.message || 'Could not load conversations.')
    } finally {
      setLoadingThreads(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getThreads])

  useEffect(() => {
    loadThreads()
  }, [loadThreads])

  useEffect(() => {
    if (!selectedEmail) {
      setSelectedMessages([])
      return
    }

    let isMounted = true

    async function loadMessages() {
      setLoadingMessages(true)
      try {
        const data = await getMessagesForUser(selectedEmail)
        if (isMounted) {
          setSelectedMessages(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Could not load this conversation.')
        }
      } finally {
        if (isMounted) {
          setLoadingMessages(false)
        }
      }
    }

    loadMessages()

    return () => {
      isMounted = false
    }
  }, [selectedEmail, getMessagesForUser])

  const handleReply = async (event) => {
    event.preventDefault()
    if (!replyBody.trim() || !selectedEmail) return

    setSending(true)
    setError('')

    try {
      await sendMessage({
        subject: 'Reply from VeeFinds',
        body: replyBody.trim(),
        customer_username: selectedEmail,
        isReplyTo: selectedEmail,
      })
      setReplyBody('')
      const data = await getMessagesForUser(selectedEmail)
      setSelectedMessages(data)
      loadThreads()
    } catch (err) {
      setError(err.message || 'Could not send reply.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact-card">
      <h1 className="page-title">Admin inbox</h1>
      <p className="footer-note">
        Review customer threads and send a reply. This page is for admin use only.
      </p>

      {error && <div className="error">{error}</div>}

      {loadingThreads ? (
        <div className="alert">Loading conversations…</div>
      ) : threads.length ? (
        <div className="admin-inbox-grid">
          <aside className="inbox-list">
            <h2>Customer threads</h2>
            <div className="thread-list">
              {threads.map((thread) => (
                <button
                  key={thread.email}
                  type="button"
                  className={`button button-outline ${thread.email === selectedEmail ? 'active-thread' : ''}`}
                  onClick={() => setSelectedEmail(thread.email)}
                >
                  <strong>{thread.email}</strong>
                  <span>{thread.count} messages</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="inbox-detail">
            <h2>{selectedEmail || 'Select a thread'}</h2>
            {loadingMessages ? (
              <div className="alert">Loading messages…</div>
            ) : (
              selectedEmail && <ChatThread messages={selectedMessages} />
            )}

            {selectedEmail && (
              <form onSubmit={handleReply} className="input-group">
                <label htmlFor="reply">Reply to customer</label>
                <textarea
                  id="reply"
                  value={replyBody}
                  onChange={(event) => setReplyBody(event.target.value)}
                  placeholder="Write a response to the customer"
                />
                <button type="submit" className="button button-primary" disabled={sending}>
                  {sending ? 'Sending…' : 'Send reply'}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="notice-card">
          <h2>No customer messages yet</h2>
          <p>Customer messages will appear here once someone submits a form.</p>
        </div>
      )}
    </section>
  )
}