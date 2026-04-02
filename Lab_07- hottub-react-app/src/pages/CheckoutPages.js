import PageBanner from '../components/PageBanner';
import { cartItems } from '../data/products';

export function OrderSummaryPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = 112;
  const total = subtotal + tax;
  return (
    <>
      <PageBanner title="Order Confirmed" />
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <h3 className="text-success">Thank You for Your Order!</h3>
            <p className="text-muted mb-0">A confirmation email has been sent to john@example.com</p>
          </div>
          <div className="p-4 bg-light-custom rounded-3">
            <div className="row g-3 mb-4">
              <div className="col-md-4"><strong>Order Date:</strong> Apr 2, 2026</div>
              <div className="col-md-4"><strong>Payment:</strong> Visa ending in 4242</div>
              <div className="col-md-4"><strong>Est. Delivery:</strong> 5-10 business days</div>
            </div>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>${item.price.toLocaleString()}</td>
                      <td>{item.qty}</td>
                      <td>${(item.qty * item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h6>Ships To</h6>
                <p className="text-muted">John Davidson, 456 Oak Avenue, Relaxation City, CA 90210</p>
              </div>
              <div className="col-md-6">
                <h6>Billed To</h6>
                <p className="text-muted">John Davidson, 123 Main Street, Relaxation City, CA 90210</p>
              </div>
            </div>
            <hr />
            <h6>Subtotal: ${subtotal.toLocaleString()}</h6>
            <h6>Shipping: Free</h6>
            <h6>Tax: ${tax.toLocaleString()}</h6>
            <h5>Total: ${total.toLocaleString()}</h5>
          </div>
        </div>
      </section>
    </>
  );
}

export function OrderDetailsPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = 112;
  const total = subtotal + tax;

  return (
    <>
      <PageBanner title="Order Details" />
      <section className="section-padding">
        <div className="container">
          <div className="row g-2 text-center mb-4">
            <div className="col-3"><div className="p-2 rounded-3 bg-success-subtle">Order Placed</div></div>
            <div className="col-3"><div className="p-2 rounded-3 bg-success-subtle">Processing</div></div>
            <div className="col-3"><div className="p-2 rounded-3 bg-success-subtle">Shipped</div></div>
            <div className="col-3"><div className="p-2 rounded-3 bg-success-subtle">Delivered</div></div>
          </div>

          <div className="p-4 bg-light-custom rounded-3">
            <h4>Order #HTH-1234</h4>
            <div className="row g-3 mb-3">
              <div className="col-md-3"><strong>Order Date:</strong><br />Mar 19, 2026</div>
              <div className="col-md-3"><strong>Payment:</strong><br />Visa **** 4242</div>
              <div className="col-md-3"><strong>Tracking #:</strong><br />HTH9987123</div>
              <div className="col-md-3"><strong>Status:</strong><br />Delivered</div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>${item.price.toLocaleString()}</td>
                      <td>{item.qty}</td>
                      <td>${(item.qty * item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row mt-3">
              <div className="col-md-6"><h6>Billing Address</h6><p className="text-muted">John Davidson, 123 Main Street, Relaxation City, CA 90210</p></div>
              <div className="col-md-6"><h6>Shipping Address</h6><p className="text-muted">John Davidson, 456 Oak Avenue, Relaxation City, CA 90210</p></div>
            </div>
            <hr />
            <h6>Subtotal: ${subtotal.toLocaleString()}</h6>
            <h6>Shipping: Free</h6>
            <h6>Tax: ${tax.toLocaleString()}</h6>
            <h5>Total: ${total.toLocaleString()}</h5>
          </div>
        </div>
      </section>
    </>
  );
}

export function PaymentFormPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = 112;
  const total = subtotal + tax;

  return (
    <>
      <PageBanner title="Payment Form" />
      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="d-flex gap-2 mb-3">
                <span className="badge bg-success">1 Cart</span>
                <span className="badge bg-primary">2 Payment</span>
                <span className="badge bg-secondary">3 Confirmation</span>
              </div>
              <form className="p-4 bg-light-custom rounded-3 row g-3">
                <h5>Billing Address</h5>
                <div className="col-md-6"><label className="form-label" htmlFor="firstName">First Name</label><input id="firstName" className="form-control" required /></div>
                <div className="col-md-6"><label className="form-label" htmlFor="lastName">Last Name</label><input id="lastName" className="form-control" required /></div>
                <div className="col-12"><label className="form-label" htmlFor="street">Street Address</label><input id="street" className="form-control" required /></div>
                <div className="col-md-4"><label className="form-label" htmlFor="city">City</label><input id="city" className="form-control" required /></div>
                <div className="col-md-4"><label className="form-label" htmlFor="state">State</label><input id="state" className="form-control" required /></div>
                <div className="col-md-4"><label className="form-label" htmlFor="zip">ZIP</label><input id="zip" className="form-control" required /></div>

                <h5 className="mt-3">Payment Method</h5>
                <div className="col-12">
                  <div className="form-check"><input className="form-check-input" type="radio" name="paymentMethod" id="payCard" defaultChecked /><label className="form-check-label" htmlFor="payCard">Credit / Debit Card</label></div>
                  <div className="form-check"><input className="form-check-input" type="radio" name="paymentMethod" id="payPal" /><label className="form-check-label" htmlFor="payPal">PayPal</label></div>
                  <div className="form-check"><input className="form-check-input" type="radio" name="paymentMethod" id="bankTransfer" /><label className="form-check-label" htmlFor="bankTransfer">Bank Transfer</label></div>
                </div>

                <div className="col-12">
                  <label className="form-label" htmlFor="cardName">
                    Name on Card
                  </label>
                  <input id="cardName" className="form-control" required />
                </div>
                <div className="col-12">
                  <label className="form-label" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <input id="cardNumber" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="expiryDate">
                    Expiry (MM/YY)
                  </label>
                  <input id="expiryDate" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="cvv">
                    CVV
                  </label>
                  <input id="cvv" className="form-control" required />
                </div>

                <div className="col-12 form-check">
                  <input className="form-check-input" type="checkbox" id="saveCard" />
                  <label className="form-check-label" htmlFor="saveCard">Save this card for future purchases</label>
                </div>
                <div className="col-12 form-check">
                  <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                  <label className="form-check-label" htmlFor="agreeTerms">I agree to the Terms & Conditions</label>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary-custom" type="submit">
                    Place Order - ${total.toLocaleString()}
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="p-4 bg-light-custom rounded-3">
                <h5>Order Summary</h5>
                {cartItems.map((item) => (
                  <div className="d-flex justify-content-between mb-2" key={item.id}>
                    <span>{item.name}</span>
                    <span>${(item.qty * item.price).toLocaleString()}</span>
                  </div>
                ))}
                <hr />
                <p className="mb-1">Subtotal: ${subtotal.toLocaleString()}</p>
                <p className="mb-1">Shipping: Free</p>
                <p className="mb-3">Tax: ${tax.toLocaleString()}</p>
                <h5>Total: ${total.toLocaleString()}</h5>
                <p className="text-muted mt-3 mb-0"><i className="fas fa-lock me-1" /> SSL secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
