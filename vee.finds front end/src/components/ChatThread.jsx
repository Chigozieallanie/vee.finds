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
              <span>{message.username}</span>
            </div>
            <time dateTime={message.created_at}>
              {new Date(message.created_at).toLocaleString()}
            </time>
          </div>

          <p className="message-body">{message.body}</p>

          <div className="message-footer">
            <span className="message-status">
              {message.is_from_staff ? 'Reply from VeeFinds' : 'Sent'}
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}