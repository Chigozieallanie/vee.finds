import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const initialUser = {
  email: '',
  phone: '',
  isVerified: false,
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem('vee-auth')
    return saved ? JSON.parse(saved) : initialUser
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    window.localStorage.setItem('vee-auth', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    setIsAuthenticated(Boolean(user.email && user.isVerified))
  }, [user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      notification,
      setNotification,
      registerUser: (payload) => {
        setUser({ ...initialUser, ...payload, isVerified: false })
        setNotification(
          `A welcome email has been sent to ${payload.email}. Enter the activation code sent to ${payload.phone}.`,
        )
      },
      verifyCode: (code) => {
        if (code === '123456') {
          setUser((current) => ({ ...current, isVerified: true }))
          setNotification('Your phone has been verified and account is active.')
          return true
        }
        setNotification('The activation code is incorrect. Please try again.')
        return false
      },
      login: (email) => {
        setUser((current) => ({ ...current, email, isVerified: current.isVerified }))
        setNotification(`Welcome back, ${email}.`)
      },
      logout: () => {
        setUser(initialUser)
        setIsAuthenticated(false)
        setNotification('You are logged out.')
      },
    }),
    [user, isAuthenticated, notification],
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
