// contexts/NotificationContext.jsx
import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext(null)

// notifications: { id, type: 'cart' | 'message' | 'reply', text, forEmail, read, createdAt }
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const pushNotification = ({ type, text, forEmail }) => {
    setNotifications((prev) => [
      {
        id: Date.now() + Math.random(),
        type,
        text,
        forEmail, // 'ADMIN' for owner-facing, or the customer's email for customer-facing
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  const markAllRead = (forEmail) => {
    setNotifications((prev) =>
      prev.map((n) => (n.forEmail === forEmail ? { ...n, read: true } : n)),
    )
  }

  const getNotificationsFor = (forEmail) =>
    notifications.filter((n) => n.forEmail === forEmail)

  const getUnreadCountFor = (forEmail) =>
    notifications.filter((n) => n.forEmail === forEmail && !n.read).length

  return (
    <NotificationContext.Provider
      value={{ pushNotification, markAllRead, getNotificationsFor, getUnreadCountFor }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)