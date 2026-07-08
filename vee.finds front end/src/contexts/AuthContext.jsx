import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSettings } from './SettingsContext'

const AuthContext = createContext(null)

const initialUser = {
  email: '',
  phone: '',
  isVerified: false,
}

const getSavedUsers = () => {
  try {
    return JSON.parse(window.localStorage.getItem('vee-users') ?? '{}')
  } catch {
    return {}
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem('vee-auth')
    return saved ? JSON.parse(saved) : initialUser
  })
  const [users, setUsers] = useState(getSavedUsers)
  const { ownerEmail } = useSettings()
  const isAuthenticated = Boolean(user.email && user.isVerified)
  const isOwner = isAuthenticated && user.email?.toLowerCase() === ownerEmail?.toLowerCase()
  const [notification, setNotification] = useState('')

  useEffect(() => {
    window.localStorage.setItem('vee-auth', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    window.localStorage.setItem('vee-users', JSON.stringify(users))
  }, [users])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isOwner,
      notification,
      setNotification,
      registerUser: (payload) => {
        const key = payload.email.toLowerCase()
        const record = { ...payload, isVerified: false }
        setUsers((current) => ({ ...current, [key]: record }))
        setUser(record)
        setNotification(
          `A welcome email has been sent to ${payload.email}. Enter the activation code sent to ${payload.phone}.`,
        )
      },
      verifyCode: (code) => {
        if (code === '123456') {
          const key = user.email.toLowerCase()
          setUsers((current) => ({
            ...current,
            [key]: { ...current[key], isVerified: true },
          }))
          setUser((current) => ({ ...current, isVerified: true }))
          setNotification('Your phone has been verified and account is active.')
          return true
        }
        setNotification('The activation code is incorrect. Please try again.')
        return false
      },
      login: (email) => {
        const key = email.trim().toLowerCase()
        const existing = users[key]

        if (!existing) {
          setNotification('No account found with that email. Please sign up first.')
          return false
        }

        if (!existing.isVerified) {
          setNotification('This account is not verified yet. Please complete phone verification.')
          return false
        }

        setUser(existing)
        setNotification(`Welcome back, ${existing.email}.`)
        return true
      },
      logout: () => {
        setUser(initialUser)
        setNotification('You are logged out.')
      },
    }),
    [user, users, isAuthenticated, notification],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}