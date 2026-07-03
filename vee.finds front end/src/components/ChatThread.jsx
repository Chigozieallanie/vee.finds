export default function ChatThread({ messages }) {
  if (!messages?.length) {
    return null
  }

  return (
    <div className="message-thread">
      {messages.map((message) => (
        <article className="message-card" key={message.id}>
          <div className="message-meta">
            <div>
              <strong>{message.subject || 'Support message'}</strong>
              <span>{message.email}</span>
            </div>
            <time dateTime={message.createdAt}>
              {new Date(message.createdAt).toLocaleString()}
            </time>
          </div>

          <p className="message-body">{message.body}</p>

          <div className="message-footer">
            <span className="message-status">{message.status || 'New'}</span>
          </div>
        </article>
      ))}
    </div>
  )
}
