import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_OWNER_EMAIL } from '../config.js'

const SettingsContext = createContext(null)

const getSavedOwnerEmail = () => {
  try {
    return window.localStorage.getItem('vee-owner-email') || DEFAULT_OWNER_EMAIL
  } catch {
    return DEFAULT_OWNER_EMAIL
  }
}

export function SettingsProvider({ children }) {
  const [ownerEmail, setOwnerEmail] = useState(getSavedOwnerEmail)

  useEffect(() => {
    window.localStorage.setItem('vee-owner-email', ownerEmail)
  }, [ownerEmail])

  const value = useMemo(
    () => ({ ownerEmail, setOwnerEmail }),
    [ownerEmail],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used inside SettingsProvider')
  }
  return context
}
