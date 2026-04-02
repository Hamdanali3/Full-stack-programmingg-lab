import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

export function LoginPage() {
  return (
    <>
      <PageBanner title="Login" />
      <section className="auth-section section-padding">
        <div className="container">
          <div className="auth-card p-4 bg-light-custom rounded-4 shadow-sm" style={{ maxWidth: 560, margin: '0 auto' }}>
            <h3 className="mb-2">Welcome Back</h3>
            <p className="text-muted mb-4">Sign in to your account to continue</p>
            <form>
              <div className="mb-3">
                <label className="form-label" htmlFor="loginEmail">Email Address</label>
                <input id="loginEmail" type="email" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="loginPassword">Password</label>
                <input id="loginPassword" type="password" className="form-control" required />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <button className="btn btn-primary-custom w-100" type="submit">Sign In</button>
            </form>
            <div className="text-center my-3 text-muted">or sign in with</div>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-dark" type="button">Google</button>
              <button className="btn btn-outline-primary" type="button">Facebook</button>
            </div>
            <p className="mt-3 mb-0 text-muted text-center">
              New here? <Link to="/register">Create Account</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function RegisterPage() {
  return (
    <>
      <PageBanner title="Register" />
      <section className="auth-section section-padding">
        <div className="container">
          <div className="auth-card p-4 bg-light-custom rounded-4 shadow-sm" style={{ maxWidth: 560, margin: '0 auto' }}>
            <h3 className="mb-2">Create Account</h3>
            <p className="text-muted mb-4">Join HotTub Haven for exclusive deals and offers</p>
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <input id="firstName" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="lastName">Last Name</label>
                  <input id="lastName" className="form-control" required />
                </div>
              </div>
              <div className="mt-3">
                <label className="form-label" htmlFor="regEmail">Email Address</label>
                <input id="regEmail" type="email" className="form-control" required />
              </div>
              <div className="mt-3">
                <label className="form-label" htmlFor="regPhone">Phone Number</label>
                <input id="regPhone" type="tel" className="form-control" required />
              </div>
              <div className="mt-3">
                <label className="form-label" htmlFor="regPassword">Password</label>
                <input id="regPassword" type="password" className="form-control" required />
              </div>
              <div className="mt-3">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" className="form-control" required />
              </div>
              <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                <label className="form-check-label" htmlFor="agreeTerms">I agree to Terms & Conditions and Privacy Policy</label>
              </div>
              <div className="form-check mt-2 mb-3">
                <input className="form-check-input" type="checkbox" id="subscribeNews" />
                <label className="form-check-label" htmlFor="subscribeNews">Subscribe to newsletter</label>
              </div>
              <button className="btn btn-primary-custom w-100" type="submit">Create Account</button>
            </form>
            <div className="text-center my-3 text-muted">or sign up with</div>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-dark" type="button">Google</button>
              <button className="btn btn-outline-primary" type="button">Facebook</button>
            </div>
            <p className="mt-3 mb-0 text-muted text-center">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function ForgotPasswordPage() {
  return (
    <>
      <PageBanner title="Forgot Password" />
      <section className="auth-section section-padding">
        <div className="container">
          <div className="auth-card p-4 bg-light-custom rounded-4 shadow-sm" style={{ maxWidth: 560, margin: '0 auto' }}>
            <h3 className="mb-2">Reset Password</h3>
            <p className="text-muted mb-4">Enter your email address and we will send a reset link.</p>
            <form>
              <div className="mb-3">
                <label className="form-label" htmlFor="resetEmail">Email Address</label>
                <input id="resetEmail" type="email" className="form-control" required />
              </div>
              <button className="btn btn-primary-custom w-100" type="submit">Send Reset Link</button>
            </form>
            <p className="mt-3 mb-0 text-muted text-center">
              Remember your password? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
