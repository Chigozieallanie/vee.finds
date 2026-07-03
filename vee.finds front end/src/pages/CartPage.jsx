import { useMemo } from 'react'
import { useCart } from '../contexts/CartContext'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart()

  const hasItems = items.length > 0

  const itemRows = useMemo(
    () =>
      items.map((item) => (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>${item.price.toFixed(2)}</td>
          <td>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
            />
          </td>
          <td>${(item.price * item.quantity).toFixed(2)}</td>
          <td>
            <button className="button button-outline" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </td>
        </tr>
      )),
    [items, removeFromCart, updateQuantity],
  )

  return (
    <section>
      <h1 className="page-title">Your cart</h1>
      {hasItems ? (
        <>
          <div className="table-wrap">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{itemRows}</tbody>
            </table>
          </div>
          <div className="cart-summary">
            <p className="footer-note">Order total</p>
            <p className="price">${total.toFixed(2)}</p>
            <button className="button button-primary" onClick={clearCart}>
              Clear cart
            </button>
          </div>
        </>
      ) : (
        <div className="notice-card">
          <h3>Your cart is empty</h3>
          <p>Add bags and accessories from the products page to start shopping.</p>
        </div>
      )}
    </section>
  )
}
