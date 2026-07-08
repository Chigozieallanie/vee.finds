import { createContext, useContext, useMemo, useState } from 'react'
import { useNotifications } from './NotificationContext'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const { pushNotification } = useNotifications()
  const { user } = useAuth()

  const addToCart = (product, quantity) => {
    if (quantity < 1) return

    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      const updatedItems = existing
        ? current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...current, { ...product, quantity }]

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )

      pushNotification({
        type: 'cart',
        text: `${user?.email || 'A customer'} added ${quantity} × ${product.title}. Cart total: UGX ${newTotal.toLocaleString()}.`,
        forEmail: 'ADMIN',
      })

      return updatedItems
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const removeFromCart = (productId) => {
    setItems((current) => current.filter((item) => item.id !== productId))
  }

  const clearCart = () => setItems([])

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({ items, addToCart, updateQuantity, removeFromCart, clearCart, total }),
    [items, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}