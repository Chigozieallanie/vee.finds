import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import VerifyPage from './pages/VerifyPage'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import ContactPage from './pages/ContactPage'
import CommunicationsPage from './pages/CommunicationsPage'
import AdminInboxPage from './pages/AdminInboxPage'
import OwnerSettingsPage from './pages/OwnerSettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import OwnerRoute from './components/OwnerRoute'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/communications"
            element={
              <ProtectedRoute>
                <CommunicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inbox"
            element={
              <OwnerRoute>
                <AdminInboxPage />
              </OwnerRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <OwnerRoute>
                <OwnerSettingsPage />
              </OwnerRoute>
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
