import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/category', label: 'Shop' },
  { to: '/product-detail', label: 'Products' },
  { to: '/contact', label: 'Contact' },
];

function TopBar() {
  return (
    <div className="top-bar d-none d-lg-block">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <span>
              <i className="fas fa-phone-alt me-2" /> +1 (800) 555-TUBS
            </span>
            <span className="ms-4">
              <i className="fas fa-envelope me-2" /> info@hottubhaven.com
            </span>
          </div>
          <div className="col-md-6 text-end">
            <NavLink to="/login">Sign In</NavLink>
            <span className="mx-2">|</span>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          HotTub<span>Haven</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink className="nav-link" to={item.to} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-icons d-flex align-items-center">
            <NavLink to="/my-account" title="My Account">
              <i className="fas fa-user" />
            </NavLink>
            <NavLink to="/shopping-cart" title="Cart" className="position-relative">
              <i className="fas fa-shopping-bag" />
              <span className="cart-count">3</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer bg-dark-custom text-white mt-5">
      <div className="container section-padding-sm">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5>HotTub Haven</h5>
            <p>
              Premium hot tubs, spas, and wellness accessories crafted for comfort,
              recovery, and year-round relaxation.
            </p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <NavLink to="/category">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/my-account">My Account</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/terms-conditions">Terms</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5>Customer</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <NavLink to="/order-summary">Order Summary</NavLink>
              </li>
              <li>
                <NavLink to="/order-details">Order Details</NavLink>
              </li>
              <li>
                <NavLink to="/payment-form">Payment</NavLink>
              </li>
              <li>
                <NavLink to="/shopping-cart">Cart</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5>Contact Info</h5>
            <ul className="contact-info list-unstyled">
              <li>
                <i className="fas fa-map-marker-alt me-2" />123 Spa Boulevard,
                Relaxation City
              </li>
              <li>
                <i className="fas fa-phone-alt me-2" />+1 (800) 555-TUBS
              </li>
              <li>
                <i className="fas fa-envelope me-2" />info@hottubhaven.com
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom pt-3 mt-3 border-top border-secondary-subtle">
          <p className="mb-0">© 2026 HotTub Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
