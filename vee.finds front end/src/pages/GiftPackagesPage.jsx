// pages/GiftPackagesPage.jsx
import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import './GiftPackagesPage.css'

const bagAccessories = [
  {
    id: 'acc-01',
    title: 'Pink Ribbon Gift Box',
    price: 18000,
    description: 'Elegant pink gift box with a satin ribbon bracelet accent. Perfect for surprising someone special.',
    image: `${import.meta.env.BASE_URL}G1.png`,
  },
  {
    id: 'acc-02',
    title: 'Blush Wrap Gift Set',
    price: 12000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}G2.jpg`,
  },
  {
    id: 'acc-03',
    title: 'Red Gem Keychain Charm',
    price: 13000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}G3.jpeg`,
  },
  {
    id: 'acc-04',
    title: 'Red Gem Keychain Charm',
    price: 14000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}G3.jpg`,
  },
  {
    id: 'acc-05',
    title: 'Red Gem Keychain Charm',
    price: 11000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}g4.jpg`,
  },
  {
    id: 'acc-06',
    title: 'Red Gem Keychain Charm',
    price: 10000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}g5.jpg`,
  },
  {
    id: 'acc-07',
    title: 'Red Gem Keychain Charm',
    price: 9000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}g6.jpg`,
  },
  {
    id: 'acc-08',
    title: 'Red Gem Keychain Charm',
    price: 7000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}g7.jpg`,
  },
  {
    id: 'acc-09',
    title: 'Red Gem Keychain Charm',
    price: 6000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}g8.jpg`,
  },
  {
    id: 'acc-10',
    title: 'Red Gem Keychain Charm',
    price: 5000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}g11.jpg`,
  },
  {
    id: 'acc-11',
    title: 'Red Gem Keychain Charm',
    price: 4000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}g15.jpg`,
  },
  {
    id: 'acc-12',
    title: 'Red Gem Keychain Charm',
    price: 3000,
    description: 'Soft blush wrapping with a clean, minimal finish. Great for birthdays and thank-you gifts.',
    image: `${import.meta.env.BASE_URL}g14.jpg`,
  },
]

export default function BagAccessoriesPage() {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(bagAccessories.map((product) => [product.id, 1])),
  )
  const { addToCart } = useCart()

  return (
    <section>
      <h1 className="page-title">Gift Packages</h1>
      <p className="footer-note">Beautifully wrapped and ready to give. Choose a quantity, then add to your cart.</p>
      <div className="product-grid">
        {bagAccessories.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.title} className="product-img" />
            </div>
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
            <div className="price">UGX {product.price.toLocaleString()}</div>
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
    </section>
  )
}

