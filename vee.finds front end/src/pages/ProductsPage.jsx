import { useMemo, useState } from 'react'
import { useCart } from '../contexts/CartContext'

const initialProducts = [
  {
    id: 'bag-01',
    title: 'Simple bags',
    price: UGX50000,
    description: 'Simple everyday bag with a clean, minimal look. Lightweight, easy to carry and perfect for daily use.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Black charm bag',
    price: UGX44990,
    description: 'Black shoulder bag with cute charm details Simple, stylish and easy to match with any outfit.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Coach bags',
    price: UGX69990,
    description: 'Elegant Coach-inspired shoulder bag with cute charm details 🤍Spacious, classy & easy to style with both casual and dressy outfits 🫶Perfect everyday statement bagRoomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-04',
    title: 'Mini Clutch',
    price: 34.99,
    description: 'Compact evening bag with sleek, modern design.',
    image: '/denmi.png',
  },
  {
    id: 'accessory-01',
    title: 'Leather Keychain',
    price: 12.0,
    description: 'A polished finishing touch for any bag or set of keys.',
    image: '/leopard print bag.jpeg',
  },
  {
    id: 'accessory-02',
    title: 'Silk Scarf',
    price: 24.0,
    description: 'Luxurious color accent for bags and outfits.',
    image: '/pinky y2.png',
  },
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-01',
    title: 'Signature Tote Bag',
    price: 59.99,
    description: 'Handcrafted with premium materials and stylish details.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Travel Crossbody',
    price: 44.99,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Weekend Backpack',
    price: 69.99,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
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
              <img src={encodeURI(product.image)} alt={product.title} className="product-img" />
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
    </section>
  )
}
