import { createContext, useContext, useEffect, useState } from 'react'

const NotificationContext = createContext(null)

const STORAGE_KEY = 'vee-notifications'

const getSavedNotifications = () => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(getSavedNotifications)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  // keep tabs in sync when another tab changes localStorage
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        setNotifications(getSavedNotifications())
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const pushNotification = ({ type, text, forEmail }) => {
    setNotifications((prev) => [
      {
        id: Date.now() + Math.random(),
        type,
        text,
        forEmail,
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