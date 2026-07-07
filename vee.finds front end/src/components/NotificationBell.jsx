// components/NotificationBell.jsx
import { useState, useRef, useEffect } from 'react'
import { useNotifications } from '../contexts/NotificationContext'
import './NotificationBell.css'

export default function NotificationBell({ forEmail }) {
  const { getNotificationsFor, getUnreadCountFor, markAllRead } = useNotifications()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const notifications = getNotificationsFor(forEmail)
  const unreadCount = getUnreadCountFor(forEmail)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    setOpen((prev) => !prev)
    if (!open) markAllRead(forEmail)
  }

  return (
    <div className="notif-wrapper" ref={wrapperRef}>
      <button className="notif-bell" onClick={handleToggle} aria-label="Notifications">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-dropdown-header">Notifications</div>
          {notifications.length === 0 ? (
            <p className="notif-empty">Nothing yet.</p>
          ) : (
            <ul className="notif-list">
              {notifications.slice(0, 15).map((n) => (
                <li key={n.id} className={`notif-item notif-${n.type}`}>
                  <span className="notif-icon">
                    {n.type === 'cart' ? '🛍️' : n.type === 'message' ? '💬' : '↩️'}
                  </span>
                  <div>
                    <p>{n.text}</p>
                    <span className="notif-time">
                      {new Date(n.createdAt).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}