import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { featuredProducts } from '../data/products';

export default function HomePage() {
  return (
    <>
      <section className="hero-section section-padding">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <p className="text-uppercase text-secondary-custom fw-semibold mb-2">Premium Quality Since 2005</p>
              <h1 className="section-title">Discover the Ultimate Relaxation Experience</h1>
              <p className="lead">Shop premium hot tubs, wooden tubs, and spa accessories crafted for comfort and hydrotherapy.</p>
              <div className="d-flex gap-3 mt-4">
                <Link className="btn btn-primary-custom" to="/category">
                  Shop Now
                </Link>
                <Link className="btn btn-secondary-custom" to="/product-detail">
                  Explore Products
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1100&q=80"
                alt="Luxury hot tub"
                className="rounded-4 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="p-3 bg-light-custom rounded-3 h-100">
                <h5>Free Shipping</h5>
                <p className="mb-0 text-muted">On orders over $500</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light-custom rounded-3 h-100">
                <h5>5-Year Warranty</h5>
                <p className="mb-0 text-muted">Comprehensive protection</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light-custom rounded-3 h-100">
                <h5>Expert Installation</h5>
                <p className="mb-0 text-muted">Certified technicians</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-light-custom rounded-3 h-100">
                <h5>24/7 Support</h5>
                <p className="mb-0 text-muted">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-custom">
        <div className="container">
          <h2 className="section-title text-center">Shop by Category</h2>
          <div className="row g-4 mt-1">
            <div className="col-lg-4">
              <div className="p-4 bg-white rounded-4 h-100 shadow-sm">
                <h4>Inflatable Hot Tubs</h4>
                <p className="text-muted">24 Products</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-white rounded-4 h-100 shadow-sm">
                <h4>Wooden Hot Tubs</h4>
                <p className="text-muted">18 Products</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-white rounded-4 h-100 shadow-sm">
                <h4>Luxury Spas</h4>
                <p className="text-muted">32 Products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="section-title text-center">Featured Products</h2>
          <p className="section-subtitle text-center mb-5">Best-selling models from our original assignment catalog.</p>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-custom">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Why Choose HotTub Haven?</h2>
              <p>
                18+ years of delivering premium wellness products with trusted guidance and after-sales support.
              </p>
              <ul>
                <li>Premium Materials</li>
                <li>Advanced Technology</li>
                <li>Award-Winning Service</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="row g-3 text-center">
                <div className="col-6">
                  <div className="bg-white rounded-3 p-3 shadow-sm">
                    <h3>5,000+</h3>
                    <p className="mb-0 text-muted">Happy Customers</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-white rounded-3 p-3 shadow-sm">
                    <h3>150+</h3>
                    <p className="mb-0 text-muted">Products</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-white rounded-3 p-3 shadow-sm">
                    <h3>18+</h3>
                    <p className="mb-0 text-muted">Years Experience</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-white rounded-3 p-3 shadow-sm">
                    <h3>50+</h3>
                    <p className="mb-0 text-muted">Awards Won</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-primary-custom text-white text-center">
        <div className="container">
          <h3 className="text-white">Ready to Transform Your Backyard?</h3>
          <p>Find the perfect spa and start your wellness journey today.</p>
          <Link className="btn btn-outline-custom" to="/category">
            Browse Collection
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="section-title text-center">Customer Testimonials</h2>
          <div className="row g-4 mt-2">
            {[
              ['John Davidson', 'The best purchase for our family comfort.'],
              ['Sarah Mitchell', 'Professional team and excellent product quality.'],
              ['Robert Wilson', 'Hydrotherapy jets are amazing after workouts.'],
            ].map((item) => (
              <div className="col-lg-4" key={item[0]}>
                <div className="p-4 bg-light-custom rounded-3 h-100">
                  <p className="mb-2">"{item[1]}"</p>
                  <strong>{item[0]}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-light-custom">
        <div className="container text-center">
          <h4>Subscribe to Our Newsletter</h4>
          <p className="text-muted">Get offers and wellness tips straight to your inbox.</p>
          <form className="row g-2 justify-content-center">
            <div className="col-md-5">
              <input type="email" className="form-control" placeholder="Enter your email address" required />
            </div>
            <div className="col-md-auto">
              <button className="btn btn-primary-custom" type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
