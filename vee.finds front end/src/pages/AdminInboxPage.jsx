import { useMemo, useState } from 'react'
import { useMessages } from '../contexts/MessagesContext'
import ChatThread from '../components/ChatThread'

export default function AdminInboxPage() {
  const { getThreads, getMessagesForUser, sendMessage } = useMessages()
  const threads = useMemo(() => getThreads(), [getThreads])
  const [selectedEmail, setSelectedEmail] = useState(threads[0]?.email || '')
  const [replyBody, setReplyBody] = useState('')
  const selectedMessages = useMemo(
    () => getMessagesForUser(selectedEmail),
    [getMessagesForUser, selectedEmail],
  )

  const handleReply = (event) => {
    event.preventDefault()
    if (!replyBody.trim() || !selectedEmail) return

    sendMessage({
      email: selectedEmail,
      subject: `Reply from VeeFinds`,
      body: replyBody.trim(),
      status: 'Replied',
      sender: 'Admin',
    })
    setReplyBody('')
  }

  return (
    <section className="contact-card">
      <h1 className="page-title">Admin inbox</h1>
      <p className="footer-note">
        Review customer threads and send a reply. This page is for admin use only.
      </p>

      {threads.length ? (
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
            {selectedEmail && <ChatThread messages={selectedMessages} />}

            {selectedEmail && (
              <form onSubmit={handleReply} className="input-group">
                <label htmlFor="reply">Reply to customer</label>
                <textarea
                  id="reply"
                  value={replyBody}
                  onChange={(event) => setReplyBody(event.target.value)}
                  placeholder="Write a response to the customer"
                />
                <button type="submit" className="button button-primary">
                  Send reply
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
