import { useState } from 'react'

const productData = [
  {
    id: 1,
    title: 'React Fundamentals Kit',
    description: 'Starter learning kit with examples and exercises.',
  },
  {
    id: 2,
    title: 'Frontend UI Bundle',
    description: 'Reusable UI blocks for fast web interface design.',
  },
  {
    id: 3,
    title: 'Routing Master Pack',
    description: 'Practical templates for route-based web applications.',
  },
]

function Products() {
  const [cartCount, setCartCount] = useState(0)

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1)
  }

  return (
    <section>
      <h2>Products</h2>
      <p className="cart-count">Cart Items: {cartCount}</p>
      <div className="products-grid">
        {productData.map((product) => (
          <article key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <button type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Products
