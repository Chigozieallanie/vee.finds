// pages/BagAccessoriesPage.jsx
import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import './BagAccessoriesPage.css'

const giftPackages = [
  {
    id: 'gift-01',
    title: 'Pearl & Silver Charm Set',
    price: 35000,
    description: 'A dainty pearl strand with silver chain charms. Clips onto any bag strap or handle.',
    image: `${import.meta.env.BASE_URL}cham1.jpeg`,
  },
  {
    id: 'gift-02',
    title: 'Blue Bow Bag Charm',
    price: 50000,
    description: 'A playful blue bow charm to add a pop of color to your bag.',
    image: `${import.meta.env.BASE_URL}cham2.jpeg`,
  },
  {
    id: 'gift-03',
    title: 'Red Gem Keychain Charm',
    price: 31000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham3.jpeg`,
  },
  {
    id: 'gift-04',
    title: 'Blush Wrap Gift Set',
    price: 38000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham4.jpeg`,
  },
  {
    id: 'gift-05',
    title: 'Pearl & Silver Charm Set',
    price: 34000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham5.jpeg`,
  },
  {
    id: 'gift-06',
    title: 'Pearl & Silver Charm Set',
    price: 35000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham6.jpeg`,
  },
  {
    id: 'gift-07',
    title: 'Pearl & Silver Charm Set',
    price: 23000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accents.',
    image: `${import.meta.env.BASE_URL}cham7.jpg`,
  },
  {
    id: 'gift-08',
    title: 'Pearl & Silver Charm Set',
    price: 20000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham8.jpg`,
  },
  {
    id: 'gift-09',
    title: 'Pearl & Silver Charm Set',
    price: 13000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham9.jpg`,
  },
  {
    id: 'gift-10',
    title: 'Pearl & Silver Charm Set',
    price: 10000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham10.jpg`,
  },
  {
    id: 'gift-11',
    title: 'Pearl & Silver Charm Set',
    price: 15000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham11.jpg`,
  },
  {
    id: 'gift-12',
    title: 'Pearl & Silver Charm Set',
    price: 18000,
    description: 'Gold-tone keychain charm with red gem beads. A bold, eye-catching accent.',
    image: `${import.meta.env.BASE_URL}cham12.jpg`,
  },
]

export default function GiftPackagesPage() {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(giftPackages.map((product) => [product.id, 1])),
  )
  const { addToCart } = useCart()

  return (
    <section>
      <h1 className="page-title">Bag Accessories</h1>
      <p className="footer-note">Charms, chains, and little extras to personalize your bag. Choose a quantity, then add to your cart.</p>
      <div className="product-grid">
        {giftPackages.map((product) => (
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