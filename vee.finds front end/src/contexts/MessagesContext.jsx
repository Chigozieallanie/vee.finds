import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const MessagesContext = createContext(null)

const getSavedMessages = () => {
  try {
    return JSON.parse(window.localStorage.getItem('vee-messages') ?? '[]')
  } catch {
    return []
  }
}

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState(getSavedMessages)

  useEffect(() => {
    window.localStorage.setItem('vee-messages', JSON.stringify(messages))
  }, [messages])

  const sendMessage = (payload) => {
    const nextMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sender: payload.sender || 'Customer',
      ...payload,
      createdAt: new Date().toISOString(),
    }
    setMessages((current) => [nextMessage, ...current])
  }

  const getMessagesForUser = (email) =>
    messages.filter((message) => message.email?.toLowerCase() === email?.toLowerCase())

  const getThreads = () => {
    const threads = messages.reduce((acc, message) => {
      const email = message.email?.toLowerCase() || 'unknown'
      if (!acc[email]) {
        acc[email] = { email, count: 0, lastMessageAt: message.createdAt }
      }
      acc[email].count += 1
      if (message.createdAt > acc[email].lastMessageAt) {
        acc[email].lastMessageAt = message.createdAt
      }
      return acc
    }, {})

    return Object.values(threads).sort(
      (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt),
    )
  }

  const value = useMemo(
    () => ({ messages, sendMessage, getMessagesForUser, getThreads }),
    [messages],
  )

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error('useMessages must be used inside MessagesProvider')
  }
  return context
}
