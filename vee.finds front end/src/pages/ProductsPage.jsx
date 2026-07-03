import { useMemo, useState } from 'react'
import { useCart } from '../contexts/CartContext'

const initialProducts = [
  {
    id: 'bag-01',
    title: 'Simple bags',
    price: 50000,
    description: 'Simple everyday bag with a clean, minimal look. Lightweight, easy to carry and perfect for daily use.',
    image: '/simplebag.png',
  },
  {
    id: 'bag-02',
    title: 'Black charm bag',
    price: 44990,
    description: 'Black shoulder bag with cute charm details Simple, stylish and easy to match with any outfit.',
    image: '/black charm.png',
  },
  {
    id: 'bag-03',
    title: 'Coach bags',
    price: 69990,
    description: 'Elegant Coach-inspired shoulder bag with cute charm details 🤍Spacious, classy & easy to style with both casual and dressy outfits 🫶Perfect everyday statement bagRoomy interior with smart compartments for all essentials.',
    image: '/coach bags.png',
  },
  {
    id: 'bag-04',
    title: 'Denim shoulder bag',
    price: 55000,
    description: 'Denim bag with a simple, casual look\nStrong, easy to carry and perfect for everyday use.',
    image: `${import.meta.env.BASE_URL}denmi.png`,
  },
  {
    id: 'accessory-01',
    title: 'Leopard print bag',
    price: 60000,
    description: 'Leopard print bag with a chic, standout design\nEasy to style and perfect for adding a touch of confidence to any look.',
    image: `${import.meta.env.BASE_URL}leopard print bag.jpeg`,
  },
  {
    id: 'accessory-02',
    title: 'Pink y2k shoulder bag',
    price: 45000,
    description: 'Pink Y2K shoulder bag with a trendy, cute vibe\nLightweight, easy to carry and perfect for everyday or going-out looks.',
    image: `${import.meta.env.BASE_URL}pinky y2.png`,
  },
  {
    id: 'bag-01',
    title: 'Light Denim Blue Mini Chelsea Shoulder Bag',
    price: 59000,
    description: 'Handcrafted with premium materials and stylish details.',
    image: `${import.meta.env.BASE_URL}Light Denim Blue Mini Chelsea Shoulder Bag.png`,
  },
  {
    id: 'bag-02',
    title: 'Polo ID Denim Mini Shoulder Bag',
    price: 44000,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: `${import.meta.env.BASE_URL}Polo ID Denim Mini Shoulder Bag.png`,
  },
  {
    id: 'bag-03',
    title: 'Tabby Shoulder Bag',
    price: 69000,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: `${import.meta.env.BASE_URL}Tabby Shoulder Bag.png`,
  },
  {
    id: 'bag-01',
    title: 'Teri Shoulder Bag',
    price: 59000,
    description: 'Handcrafted with premium materials and stylish details.',
    image: `${import.meta.env.BASE_URL}Teri Shoulder Bag.png`,
  },
  {
    id: 'bag-02',
    title: 'Womenz Charm-D Shoulder Bag',
    price: 44000,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: `${import.meta.env.BASE_URL}Womenz Charm-D-Shoulder bag.jpg`,
  },
  {
    id: 'bag-03',
    title: 'Womenz Charm-D Shoulder M Shoulder Bag',
    price: 69000,
    description: 'Roomy interior with smart compartments for all essentials.',
    image: `${import.meta.env.BASE_URL}Womenz Charm-D Shoulder M Shoulder Bag.png`,
  },
  {
    id: 'bag-01',
    title: 'Zebra Print Baguette Bag',
    price: 59000,
    description: 'Handcrafted with premium materials and stylish details.',
    image: `${import.meta.env.BASE_URL}Zebra Print Baguette Bag.jpg`,
  },
  {
    id: 'bag-02',
    title: 'Zebra Print Tapestry Tote Bag',
    price: 44000,
    description: 'Lightweight, secure, and perfect for every journey.',
    image: `${import.meta.env.BASE_URL}Zebra Print Tapestry Tote Bag.jpg`,
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
