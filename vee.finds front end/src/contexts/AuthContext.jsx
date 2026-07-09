import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSettings } from './SettingsContext'

const AuthContext = createContext(null)

const initialUser = null

const getStoredTokens = () => {
  try {
    return {
      access: window.localStorage.getItem('vee-access'),
      refresh: window.localStorage.getItem('vee-refresh'),
    }
  } catch {
    return { access: null, refresh: null }
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem('vee-auth')
    return saved ? JSON.parse(saved) : initialUser
  })
  const [pendingUsername, setPendingUsername] = useState(() =>
    window.localStorage.getItem('vee-pending-username') || '',
  )
  const { ownerEmail } = useSettings()
  const isAuthenticated = Boolean(user?.is_phone_verified)
  const isOwner = isAuthenticated && user?.email?.toLowerCase() === ownerEmail?.toLowerCase()
  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('vee-auth', JSON.stringify(user))
    } else {
      window.localStorage.removeItem('vee-auth')
    }
  }, [user])

  useEffect(() => {
    window.localStorage.setItem('vee-pending-username', pendingUsername)
  }, [pendingUsername])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isOwner,
      notification,
      setNotification,

      registerUser: async ({ email, phone, password }) => {
        const username = email.trim().toLowerCase()
        const response = await fetch('/api/auth/signup/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            email: email.trim(),
            phone_number: phone.trim(),
            password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          const firstError = Object.values(data)[0]
          const message = Array.isArray(firstError) ? firstError[0] : (data.detail || 'Signup failed.')
          throw new Error(message)
        }

        setPendingUsername(username)
        setNotification(data.message || `Check your email, then verify the code sent to ${phone}.`)
      },

      verifyCode: async (code) => {
        if (!pendingUsername) {
          setNotification('No pending signup found. Please sign up again.')
          return false
        }

        const response = await fetch('/api/auth/verify-otp/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: pendingUsername, code }),
        })

        const data = await response.json()

        if (!response.ok) {
          setNotification(data.detail || 'The activation code is incorrect. Please try again.')
          return false
        }

        setNotification('Your phone has been verified and account is active.')
        return true
      },

      resendCode: async () => {
        if (!pendingUsername) {
          setNotification('No pending signup found. Please sign up again.')
          return false
        }

        const response = await fetch('/api/auth/resend-otp/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: pendingUsername }),
        })

        const data = await response.json()

        if (!response.ok) {
          setNotification(data.detail || 'Could not resend the code. Please try again.')
          return false
        }

        setNotification(data.message || 'A new activation code has been sent to your phone.')
        return true
      },

      login: async (email, password) => {
        const username = email.trim().toLowerCase()
        const response = await fetch('/api/auth/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })

        const data = await response.json()

        if (!response.ok) {
          const firstError = Object.values(data)[0]
          const message = Array.isArray(firstError) ? firstError[0] : (data.detail || 'Login failed.')
          setNotification(message)
          return false
        }

        window.localStorage.setItem('vee-access', data.access)
        window.localStorage.setItem('vee-refresh', data.refresh)
        setUser(data.user)
        setNotification(`Welcome back, ${data.user.email}.`)
        return true
      },

      logout: () => {
        window.localStorage.removeItem('vee-access')
        window.localStorage.removeItem('vee-refresh')
        setUser(null)
        setNotification('You are logged out.')
      },
    }),
    [user, isAuthenticated, notification, pendingUsername],
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