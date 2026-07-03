import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function OwnerRoute({ children }) {
  const { isAuthenticated, isOwner } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isOwner) {
    return <Navigate to="/" replace />
  }

  return children
}
