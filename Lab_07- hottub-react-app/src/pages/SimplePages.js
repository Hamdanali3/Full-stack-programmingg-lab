import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import ProductCard from '../components/ProductCard';
import { catalogProducts, cartItems, featuredProducts } from '../data/products';

export function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" />
      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <h2 className="section-title">HotTub Haven Story</h2>
              <p>
                Founded in 2005, HotTub Haven started with a simple vision: to make
                premium hot tubs and spas accessible to every homeowner.
              </p>
              <p>
                Over the years, we have served 5,000+ customers with carefully
                selected products, certified installation, and dedicated support.
              </p>
              <div className="row g-3 mt-2">
                <div className="col-md-6"><div className="p-3 bg-light-custom rounded-3">Mission: Deliver wellness-focused spa experiences.</div></div>
                <div className="col-md-6"><div className="p-3 bg-light-custom rounded-3">Vision: Be the most trusted spa brand in the region.</div></div>
              </div>
            </div>
            <div className="col-lg-5">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
                alt="Water wellness"
                className="rounded-4 shadow"
              />
            </div>
          </div>

          <div className="row g-4 mt-4">
            {[
              ['James Peterson', 'CEO & Founder'],
              ['Emily Chen', 'Head of Design'],
              ['Marcus Thompson', 'Technical Director'],
              ['Olivia Martinez', 'Customer Success'],
            ].map((member) => (
              <div className="col-lg-3 col-md-6" key={member[0]}>
                <div className="p-3 bg-light-custom rounded-3 text-center h-100">
                  <h6 className="mb-1">{member[0]}</h6>
                  <p className="text-muted mb-0">{member[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function CategoryPage() {
  const [sortBy, setSortBy] = useState('default');

  const sorted = useMemo(() => {
    const list = [...catalogProducts];
    if (sortBy === 'low-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return list;
  }, [sortBy]);

  return (
    <>
      <PageBanner title="Shop Collection" />
      <section className="section-padding bg-light-custom">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3">
              <aside className="p-3 bg-white rounded-3 shadow-sm">
                <h5>Categories</h5>
                <ul className="list-unstyled text-muted mb-4">
                  <li>All Hot Tubs (72)</li>
                  <li>Inflatable (24)</li>
                  <li>Wooden Tubs (18)</li>
                  <li>Luxury Spas (22)</li>
                  <li>Accessories (8)</li>
                </ul>
                <h6>Price Range</h6>
                <input type="range" className="form-range" min="0" max="15000" />
                <h6 className="mt-3">Capacity</h6>
                <div className="form-check"><input className="form-check-input" type="checkbox" id="cap2" /><label className="form-check-label" htmlFor="cap2">2-Person</label></div>
                <div className="form-check"><input className="form-check-input" type="checkbox" id="cap4" /><label className="form-check-label" htmlFor="cap4">4-Person</label></div>
                <div className="form-check"><input className="form-check-input" type="checkbox" id="cap6" /><label className="form-check-label" htmlFor="cap6">6-Person</label></div>
                <div className="form-check"><input className="form-check-input" type="checkbox" id="cap8" /><label className="form-check-label" htmlFor="cap8">8+ Person</label></div>
              </aside>
            </div>
            <div className="col-lg-9">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 p-3 bg-white rounded-3 shadow-sm">
                <p className="mb-2 mb-md-0 text-muted">Showing 1-9 of 72 products</p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                  style={{ maxWidth: 240 }}
                >
                  <option value="default">Default sorting</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              <div className="row g-4">
                {sorted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className="page-item active"><span className="page-link">1</span></li>
                  <li className="page-item"><span className="page-link">2</span></li>
                  <li className="page-item"><span className="page-link">3</span></li>
                  <li className="page-item"><span className="page-link">4</span></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ProductDetailPage() {
  const product = featuredProducts[0];
  const [activeTab, setActiveTab] = useState('description');
  return (
    <>
      <PageBanner title="Product Details" />
      <section className="section-padding">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <img src={product.image} alt={product.name} className="rounded-4 shadow" />
              <div className="row g-2 mt-2">
                {[1, 2, 3, 4].map((n) => (
                  <div className="col-3" key={n}>
                    <img src={product.image} alt={`thumb-${n}`} className="rounded-3" />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <h2>{product.name}</h2>
              <p className="text-muted">Category: Hot Tubs</p>
              <p className="text-warning mb-2"><i className="fas fa-star" /> 4.5 (48 Reviews)</p>
              <h4 className="text-secondary-custom mb-3">
                ${product.price.toLocaleString()} <small className="text-muted text-decoration-line-through">${product.oldPrice.toLocaleString()}</small>
              </h4>
              <p>
                60 hydrotherapy jets, energy-smart heating, premium acrylic shell,
                and integrated LED mood lighting for spa-level relaxation at home.
              </p>
              <p className="mb-2"><strong>Color:</strong> Midnight Blue, Storm Gray, Desert Bronze, Arctic White</p>
              <p className="mb-3"><strong>In Stock:</strong> 12 units available</p>
              <button className="btn btn-primary-custom">Add to Cart</button>
              <button className="btn btn-outline-secondary ms-2">Wishlist</button>
            </div>
          </div>

          <div className="mt-5">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className={`nav-link ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>Description</button></li>
              <li className="nav-item"><button className={`nav-link ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>Specifications</button></li>
              <li className="nav-item"><button className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews</button></li>
            </ul>
            <div className="p-4 border border-top-0 rounded-bottom-3">
              {activeTab === 'description' && (
                <ul className="mb-0">
                  <li>60 hydrotherapy jets and ergonomic seating for 6 people.</li>
                  <li>Dual-stage filtration and ozone sanitation system.</li>
                  <li>Weather-resistant cabinet with insulated shell.</li>
                  <li>Bluetooth audio and LED mood lighting package.</li>
                </ul>
              )}
              {activeTab === 'specs' && (
                <table className="table mb-0">
                  <tbody>
                    <tr><th>Dimensions</th><td>84" x 84" x 36"</td></tr>
                    <tr><th>Water Capacity</th><td>325 gallons</td></tr>
                    <tr><th>Jets</th><td>60 stainless jets</td></tr>
                    <tr><th>Electrical</th><td>240V / 50A</td></tr>
                  </tbody>
                </table>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <p className="mb-1"><strong>John D.</strong> - Excellent comfort and fast heating.</p>
                  <p className="mb-1"><strong>Sarah M.</strong> - Build quality is top-notch.</p>
                  <p className="mb-0"><strong>Robert W.</strong> - Perfect hydrotherapy after workouts.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-custom">
        <div className="container">
          <h3 className="mb-4">Related Products</h3>
          <div className="row g-4">
            {featuredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ShoppingCartPage() {
  const [items, setItems] = useState(cartItems);
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = 112;
  const total = subtotal + tax;

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }
        const nextQty = Math.max(1, item.qty + delta);
        return { ...item, qty: nextQty };
      })
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <PageBanner title="Shopping Cart" />
      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Your Cart ({items.length} Items)</h4>
                <Link to="/category">Continue Shopping</Link>
              </div>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img src={item.image} alt={item.name} width="60" className="rounded" />
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td>${item.price.toLocaleString()}</td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Quantity controls">
                            <button className="btn btn-outline-secondary" onClick={() => updateQty(item.id, -1)}>-</button>
                            <span className="btn btn-outline-secondary disabled">{item.qty}</span>
                            <button className="btn btn-outline-secondary" onClick={() => updateQty(item.id, 1)}>+</button>
                          </div>
                        </td>
                        <td>${(item.qty * item.price).toLocaleString()}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>
                            <i className="fas fa-trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-light-custom rounded-3 mt-3">
                <h6>Have a Coupon?</h6>
                <div className="input-group">
                  <input className="form-control" placeholder="Enter coupon code" />
                  <button className="btn btn-secondary" type="button">Apply</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-light-custom rounded-3">
                <h5>Order Summary</h5>
                <p className="mb-1">Subtotal: ${subtotal.toLocaleString()}</p>
                <p className="mb-1">Shipping: Free</p>
                <p className="mb-3">Tax: ${tax.toLocaleString()}</p>
                <h5>Total: ${total.toLocaleString()}</h5>
                <Link className="btn btn-primary-custom w-100" to="/order-summary">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageBanner title="Contact" />
      <section className="section-padding">
        <div className="container">
          <div className="row g-3 mb-4">
            <div className="col-md-4"><div className="p-3 bg-light-custom rounded-3 h-100"><h6>Visit Us</h6><p className="mb-0 text-muted">123 Spa Boulevard, Relaxation City</p></div></div>
            <div className="col-md-4"><div className="p-3 bg-light-custom rounded-3 h-100"><h6>Call Us</h6><p className="mb-0 text-muted">+1 (800) 555-TUBS</p></div></div>
            <div className="col-md-4"><div className="p-3 bg-light-custom rounded-3 h-100"><h6>Email Us</h6><p className="mb-0 text-muted">info@hottubhaven.com</p></div></div>
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              <form className="p-4 bg-light-custom rounded-3">
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Full Name
                  </label>
                  <input className="form-control" id="name" required />
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input type="tel" className="form-control" id="phone" required />
                  </div>
                </div>
                <div className="mb-3 mt-3">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <select className="form-select" id="subject" required>
                    <option value="">Choose...</option>
                    <option>General Inquiry</option>
                    <option>Sales Question</option>
                    <option>Technical Support</option>
                    <option>Returns & Refunds</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="message">
                    Message
                  </label>
                  <textarea className="form-control" id="message" rows="4" required />
                </div>
                <button className="btn btn-primary-custom" type="submit">
                  Send Message
                </button>
              </form>
            </div>
            <div className="col-lg-5">
              <h4>Frequently Asked Questions</h4>
              <div className="accordion" id="contactFaq">
                <div className="accordion-item">
                  <h2 className="accordion-header"><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne">How long does delivery take?</button></h2>
                  <div id="faqOne" className="accordion-collapse collapse show" data-bs-parent="#contactFaq"><div className="accordion-body">Standard delivery takes 5-10 business days.</div></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqTwo">Do you offer installation services?</button></h2>
                  <div id="faqTwo" className="accordion-collapse collapse" data-bs-parent="#contactFaq"><div className="accordion-body">Yes, our certified technicians provide professional setup.</div></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqThree">What warranty is included?</button></h2>
                  <div id="faqThree" className="accordion-collapse collapse" data-bs-parent="#contactFaq"><div className="accordion-body">We provide a 5-year comprehensive warranty on eligible models.</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
