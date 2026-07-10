import { createContext, useContext, useCallback } from 'react'
import { useNotifications } from './NotificationContext'

const MessagesContext = createContext(null)

const authHeaders = () => {
  const token = window.localStorage.getItem('vee-access')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export function MessagesProvider({ children }) {
  const { pushNotification } = useNotifications()

  const fetchMessages = useCallback(async () => {
    const response = await fetch('/api/communications/', {
      headers: authHeaders(),
    })
    if (!response.ok) {
      throw new Error('Could not load messages.')
    }
    return response.json()
  }, [])

  const sendMessage = useCallback(async ({ subject, body, isReplyTo, customer_username }) => {
  const response = await fetch('/api/communications/', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ subject, body, customer_username }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    const firstError = Object.values(data)[0]
    const message = Array.isArray(firstError) ? firstError[0] : (data.detail || 'Could not send message.')
    throw new Error(message)
  }

  const created = await response.json()

  if (created.is_from_staff) {
    pushNotification({
      type: 'reply',
      text: `VeeFinds replied: "${(body || '').slice(0, 60)}"`,
      forEmail: isReplyTo || created.username,
    })
  } else {
    pushNotification({
      type: 'message',
      text: `${created.username || 'A customer'} sent a new message: "${(body || '').slice(0, 60)}"`,
      forEmail: 'ADMIN',
    })
  }

  return created
}, [pushNotification])
  const getMessagesForUser = useCallback(async (username) => {
    const all = await fetchMessages()
    return all.filter((m) => m.username?.toLowerCase() === username?.toLowerCase())
  }, [fetchMessages])

  const getThreads = useCallback(async () => {
    const all = await fetchMessages()
    const threads = all.reduce((acc, message) => {
      const username = message.username?.toLowerCase() || 'unknown'
      if (!acc[username]) {
        acc[username] = { email: username, count: 0, lastMessageAt: message.created_at }
      }
      acc[username].count += 1
      if (message.created_at > acc[username].lastMessageAt) {
        acc[username].lastMessageAt = message.created_at
      }
      return acc
    }, {})

    return Object.values(threads).sort(
      (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt),
    )
  }, [fetchMessages])

  const value = {
    sendMessage,
    getMessagesForUser,
    getThreads,
  }

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error('useMessages must be used inside MessagesProvider')
  }
  return context
}