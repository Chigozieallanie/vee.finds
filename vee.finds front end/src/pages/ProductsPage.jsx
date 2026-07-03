import { useMemo, useState } from 'react'
import { useCart } from '../contexts/CartContext'

const initialProducts = [
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/assets/hero.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/assets/react.svg',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/assets/vite.svg',
  },
  {
    id: 'bag-04',
    title: 'Mini Clutch',
    price: 34.99,
    description: 'Compact evening bag with sleek, modern design.',
    image: '/assets/hero.png',
  },
  {
    id: 'accessory-01',
    title: 'Leather Keychain',
    price: 12.0,
    description: 'A polished finishing touch for any bag or set of keys.',
    image: '/assets/react.svg',
  },
  {
    id: 'accessory-02',
    title: 'Silk Scarf',
    price: 24.0,
    description: 'Luxurious color accent for bags and outfits.',
    image: '/assets/vite.svg',
  },
]

export default function ProductsPage() {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(initialProducts.map((product) => [product.id, 1])),
  )
  const { addToCart } = useCart()

  const featuredProducts = useMemo(
    () => initialProducts.slice(0, 4),
    [],
  )

  return (
    <section>
      <h1 className="page-title">Products</h1>
      <p className="footer-note">Browse bags and accessories, choose a quantity, then add items to your cart.</p>
      <div className="product-grid">
        {initialProducts.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-image">
              <span>{product.title}</span>
            </div>
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
            <div className="price">${product.price.toFixed(2)}</div>
            <div className="card-actions">
              <input
                type="number"
                min="1"
                value={quantities[product.id]}
                onChange={(event) =>
                  setQuantities((current) => ({
                    ...current,
                    [product.id]: Number(event.target.value),
                  }))
                }
              />
              <button
                className="button button-primary"
                type="button"
                onClick={() => addToCart(product, quantities[product.id])}
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="notice-card">
        <h3>Featured collection</h3>
        <p>
          Use your own bag images by replacing the `image` values with the correct asset paths in
          `src/pages/ProductsPage.jsx`.
        </p>
      </div>
    </section>
  )
}
